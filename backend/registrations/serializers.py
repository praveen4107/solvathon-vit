from rest_framework import serializers
from .models import IndividualRegistration, Team, TeamMember

VIT_EMAIL_SUFFIX = "@vitstudent.ac.in"

class IndividualRegistrationSerializer(serializers.ModelSerializer):
    class Meta:
        model = IndividualRegistration
        fields = "__all__"
        read_only_fields = ("created_at",)

    def validate_email(self, value):
        if not value.lower().endswith(VIT_EMAIL_SUFFIX):
            raise serializers.ValidationError(f"Email must end with {VIT_EMAIL_SUFFIX}")
        return value

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number must be exactly 10 digits.")
        return value

    def validate_registration_number(self, value):
        if len(value) != 9:
            raise serializers.ValidationError("Registration number must be exactly 9 characters.")
        return value

class TeamMemberSerializer(serializers.ModelSerializer):
    class Meta:
        model = TeamMember
        exclude = ("team",)

    def validate_email(self, value):
        if not value.lower().endswith(VIT_EMAIL_SUFFIX):
            raise serializers.ValidationError(f"Email must end with {VIT_EMAIL_SUFFIX}")
        return value

    def validate_phone(self, value):
        if not value.isdigit() or len(value) != 10:
            raise serializers.ValidationError("Phone number must be exactly 10 digits.")
        return value

    def validate_registration_number(self, value):
        if len(value) != 9:
            raise serializers.ValidationError("Registration number must be exactly 9 characters.")
        return value

class TeamSerializer(serializers.ModelSerializer):
    members = TeamMemberSerializer(many=True)

    class Meta:
        model = Team
        fields = ("id", "team_name", "hostel_block", "members", "created_at")
        read_only_fields = ("created_at",)

    def validate_members(self, value):
        if not isinstance(value, list) or len(value) == 0:
            raise serializers.ValidationError("At least one member is required.")
        if len(value) > 4:
            raise serializers.ValidationError("Team size cannot exceed 4 members.")
        return value

    def validate(self, data):
        members = data.get("members", [])
        team_block = data.get("hostel_block")

        # Ensure every member has vit email & 10-digit phone enforced by member serializer
        # Ensure all members belong to same block and that it matches team_block (if provided)
        blocks = {m.get("hostel_block") for m in members}
        if len(blocks) > 1:
            raise serializers.ValidationError({"members": ["All team members must belong to the same hostel block."]})
        if team_block and list(blocks)[0] != team_block:
            raise serializers.ValidationError({"members": ["Team block must match members' hostel block."]})
        return data

    def create(self, validated_data):
        members_data = validated_data.pop("members")
        team = Team.objects.create(**validated_data)
        for mem in members_data:
            TeamMember.objects.create(team=team, **mem)
        return team
