from django.db import models

class IndividualRegistration(models.Model):
    HOSTEL_CHOICES = [
        ("A Block", "A Block"),
        ("C Block", "C Block"),
        ("D1 Block", "D1 Block"),
        ("D2 Block", "D2 Block"),
    ]

    registration_number = models.CharField(max_length=9)  # length requirement 9
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    hostel_block = models.CharField(max_length=10, choices=HOSTEL_CHOICES)
    room_no = models.CharField(max_length=20, blank=True, null=True)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return f"{self.registration_number} - {self.name}"

class Team(models.Model):
    HOSTEL_CHOICES = IndividualRegistration.HOSTEL_CHOICES

    team_name = models.CharField(max_length=200)
    hostel_block = models.CharField(max_length=10, choices=HOSTEL_CHOICES)
    created_at = models.DateTimeField(auto_now_add=True)

    def __str__(self):
        return self.team_name

class TeamMember(models.Model):
    HOSTEL_CHOICES = IndividualRegistration.HOSTEL_CHOICES

    team = models.ForeignKey(Team, on_delete=models.CASCADE, related_name="members")
    registration_number = models.CharField(max_length=9)
    name = models.CharField(max_length=200)
    email = models.EmailField()
    phone = models.CharField(max_length=10)
    hostel_block = models.CharField(max_length=10, choices=HOSTEL_CHOICES)
    room_no = models.CharField(max_length=20, blank=True, null=True)

    def __str__(self):
        return f"{self.registration_number} - {self.name}"
