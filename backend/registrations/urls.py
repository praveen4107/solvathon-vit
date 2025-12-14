from django.urls import path
from .views import (
    IndividualRegisterView,
    TeamRegisterView,
    AdminIndividualsListView,
    AdminTeamsListView,
    AdminTeamDetailView,
    AdminDeleteTeamView,
    AdminDeleteIndividualView,
    AdminExportView,
)

urlpatterns = [
    # public
    path("register/individual/", IndividualRegisterView.as_view(), name="register_individual"),
    path("register/team/", TeamRegisterView.as_view(), name="register_team"),

    # admin (protected)
    path("admin/individuals/", AdminIndividualsListView.as_view(), name="admin_individuals"),
    path("admin/individuals/<int:pk>/delete/", AdminDeleteIndividualView.as_view(), name="admin_delete_individual"),
    path("admin/teams/", AdminTeamsListView.as_view(), name="admin_teams"),
    path("admin/teams/<int:pk>/", AdminTeamDetailView.as_view(), name="admin_team_detail"),
    path("admin/teams/<int:pk>/delete/", AdminDeleteTeamView.as_view(), name="admin_delete_team"),
    path("admin/export/", AdminExportView.as_view(), name="admin_export"),
]
