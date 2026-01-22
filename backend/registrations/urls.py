from django.urls import path
from .views import (
    TeamRegisterView,
    AdminTeamsListView,
    AdminTeamDetailView,
    AdminDeleteTeamView,
    AdminExportView,
)

urlpatterns = [
    # Public - team registration only
    path("register/team/", TeamRegisterView.as_view(), name="register_team"),

    # Admin (protected)
    path("admin/teams/", AdminTeamsListView.as_view(), name="admin_teams"),
    path("admin/teams/<int:pk>/", AdminTeamDetailView.as_view(), name="admin_team_detail"),
    path("admin/teams/<int:pk>/delete/", AdminDeleteTeamView.as_view(), name="admin_delete_team"),
    path("admin/export/", AdminExportView.as_view(), name="admin_export"),
]
