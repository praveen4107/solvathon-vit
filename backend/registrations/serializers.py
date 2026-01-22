from rest_framework import serializers
from .models import Team, TeamMember

VIT_EMAIL_SUFFIX = "@vitstudent.ac.in"


class TeamMemberSerializer(serializers.ModelSerializer):
    """Serializer for team members"""

    class Meta:
        model = TeamMember
        fields = (
            "registration_number",
            "name",
            "email",
            "phone",
            "hostel_block",
            "room_no",
            "is_leader",
        )

    def validate_email(self, value):
        if not value.lower().endswith(VIT_EMAIL_SUFFIX):
            raise serializers.ValidationError(
                f"Email must end with {VIT_EMAIL_SUFFIX}"
            )
        return value

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError(
                "Phone number must be exactly 10 digits."
            )
        return value

    def validate_registration_number(self, value):
        if len(value) != 9:
            raise serializers.ValidationError(
                "Registration number must be exactly 9 characters."
            )
        return value


class TeamSerializer(serializers.ModelSerializer):
    """Serializer for team registration with members"""

    members = TeamMemberSerializer(many=True)

    class Meta:
        model = Team
        fields = ("id", "team_name", "hostel_block", "members", "created_at")
        read_only_fields = ("id", "created_at")

    def validate_team_name(self, value):
        if Team.objects.filter(team_name=value).exists():
            raise serializers.ValidationError("Team name already exists. Please choose a different name.")
        if len(value.strip()) < 2:
            raise serializers.ValidationError("Team name must be at least 2 characters long.")
        return value

    def validate_members(self, value):
        if not isinstance(value, list) or len(value) == 0:
            raise serializers.ValidationError("At least one member is required.")
        if len(value) < 2 or len(value) > 6:
            raise serializers.ValidationError(
                "Team size must be between 2 and 6 members."
            )

        # Check that exactly one leader exists
        leaders = [m for m in value if m.get("is_leader", False)]
        if len(leaders) != 1:
            raise serializers.ValidationError(
                "Team must have exactly one team leader."
            )

        return value

    def validate(self, data):
        members = data.get("members", [])
        team_block = data.get("hostel_block")

        # Validate all members have VIT email and 10-digit phone (handled by member serializer)
        # Validate all members belong to same block
        blocks = {m.get("hostel_block") for m in members}
        if len(blocks) > 1:
            raise serializers.ValidationError(
                {
                    "members": [
                        "All team members must belong to the same hostel block."
                    ]
                }
            )

        # Validate team block matches members' block
        if team_block and list(blocks)[0] != team_block:
            raise serializers.ValidationError(
                {
                    "members": [
                        "Team hostel block must match all members' hostel block."
                    ]
                }
            )

        # Validate no duplicate registration numbers
        reg_numbers = [m.get("registration_number") for m in members]
        if len(reg_numbers) != len(set(reg_numbers)):
            raise serializers.ValidationError(
                {"members": ["Duplicate registration numbers in team."]}
            )

        return data

    def create(self, validated_data):
        members_data = validated_data.pop("members")
        team = Team.objects.create(**validated_data)

        for mem_data in members_data:
            TeamMember.objects.create(team=team, **mem_data)

        return team
