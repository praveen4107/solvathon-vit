from django.db import models

class Team(models.Model):
    HOSTEL_CHOICES = [
        ("A Block", "A Block"),
        ("C Block", "C Block"),
        ("D1 Block", "D1 Block"),
        ("D2 Block", "D2 Block"),
    ]

    team_name = models.CharField(max_length=200, unique=True)
    hostel_block = models.CharField(max_length=10, choices=HOSTEL_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-created_at"]

    def __str__(self):
        return self.team_name

    def member_count(self):
        return self.members.count()


class TeamMember(models.Model):
    HOSTEL_CHOICES = Team.HOSTEL_CHOICES
    ROLE_CHOICES = [
        ("leader", "Team Leader"),
        ("member", "Team Member"),
    ]

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="members")
    registration_number = models.CharField(max_length=9)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    hostel_block = models.CharField(max_length=10, choices=HOSTEL_CHOICES)
    room_no = models.CharField(max_length=20, blank=True, null=True)
    is_leader = models.BooleanField(default=False)
    created_at = models.DateTimeField(auto_now_add=True)

    class Meta:
        ordering = ["-is_leader", "created_at"]
        constraints = [
            models.UniqueConstraint(fields=["team", "registration_number"], name="unique_reg_per_team")
        ]

    def __str__(self):
        role = "Leader" if self.is_leader else "Member"
        return f"{self.name} ({role}) - {self.team.team_name}"
