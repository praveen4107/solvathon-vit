from django.contrib import admin
from .models import Team, TeamMember


class TeamMemberInline(admin.TabularInline):
    model = TeamMember
    extra = 0
    fields = (
        "registration_number",
        "name",
        "email",
        "phone",
        "hostel_block",
        "room_no",
        "is_leader",
    )


@admin.register(Team)
class TeamAdmin(admin.ModelAdmin):
    list_display = ("team_name", "hostel_block", "created_at")
    inlines = [TeamMemberInline]
    search_fields = ("team_name",)
    list_filter = ("hostel_block",)
    readonly_fields = ("created_at",)

@admin.register(TeamMember)
class TeamMemberAdmin(admin.ModelAdmin):
    list_display = ("registration_number", "name", "team", "email", "phone", "hostel_block")
    search_fields = ("registration_number", "name", "email", "team__team_name")
    list_filter = ("hostel_block",)
