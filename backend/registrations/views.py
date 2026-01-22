from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import Team, TeamMember
from .serializers import TeamSerializer
from django.http import HttpResponse
import csv
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser


# Public endpoint: team registration only
class TeamRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            team = serializer.save()
            return Response(
                {
                    "success": True,
                    "message": "Team registered successfully.",
                    "data": TeamSerializer(team).data,
                },
                status=status.HTTP_201_CREATED,
            )
        return Response(
            {"success": False, "errors": serializer.errors},
            status=status.HTTP_400_BAD_REQUEST,
        )


# Admin endpoints
class AdminTeamsListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        qs = Team.objects.all().order_by("-created_at")
        block = request.query_params.get("block")
        if block:
            qs = qs.filter(hostel_block=block)

        # Optional search by team name
        search = request.query_params.get("search")
        if search:
            qs = qs.filter(team_name__icontains=search)

        data = []
        for team in qs:
            members_data = []
            for member in team.members.all():
                members_data.append(
                    {
                        "id": member.id,
                        "registration_number": member.registration_number,
                        "name": member.name,
                        "email": member.email,
                        "phone": member.phone,
                        "hostel_block": member.hostel_block,
                        "room_no": member.room_no,
                        "is_leader": member.is_leader,
                    }
                )

            data.append(
                {
                    "id": team.id,
                    "team_name": team.team_name,
                    "hostel_block": team.hostel_block,
                    "member_count": team.members.count(),
                    "members": members_data,
                    "created_at": team.created_at,
                }
            )
        return Response({"success": True, "data": data}, status=status.HTTP_200_OK)


class AdminTeamDetailView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request, pk):
        team = get_object_or_404(Team, pk=pk)
        members = team.members.all()
        members_data = [
            {
                "id": m.id,
                "registration_number": m.registration_number,
                "name": m.name,
                "email": m.email,
                "phone": m.phone,
                "hostel_block": m.hostel_block,
                "room_no": m.room_no,
                "is_leader": m.is_leader,
            }
            for m in members
        ]
        return Response(
            {
                "success": True,
                "data": {
                    "team": {
                        "id": team.id,
                        "team_name": team.team_name,
                        "hostel_block": team.hostel_block,
                        "created_at": team.created_at,
                    },
                    "members": members_data,
                },
            },
            status=status.HTTP_200_OK,
        )


class AdminDeleteTeamView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        team = get_object_or_404(Team, pk=pk)
        team_name = team.team_name
        team.delete()
        return Response(
            {
                "success": True,
                "message": f"Team '{team_name}' deleted successfully.",
            },
            status=status.HTTP_200_OK,
        )


# CSV export endpoint
class AdminExportView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        export_type = request.query_params.get("type", "teams")  # teams or members
        block = request.query_params.get("block")  # e.g. "A Block"

        # Teams export (summary)
        if export_type == "teams":
            teams = Team.objects.all()
            if block:
                teams = teams.filter(hostel_block=block)

            response = HttpResponse(content_type="text/csv")
            response[
                "Content-Disposition"
            ] = f'attachment; filename="teams_{block or "all"}.csv"'
            writer = csv.writer(response)
            writer.writerow(
                ["team_id", "team_name", "hostel_block", "member_count", "created_at"]
            )
            for team in teams:
                writer.writerow(
                    [
                        team.id,
                        team.team_name,
                        team.hostel_block,
                        team.members.count(),
                        team.created_at,
                    ]
                )
            return response

        # Members export (detailed)
        if export_type == "members":
            members = TeamMember.objects.select_related("team").all()
            if block:
                members = members.filter(hostel_block=block)

            response = HttpResponse(content_type="text/csv")
            response[
                "Content-Disposition"
            ] = f'attachment; filename="team_members_{block or "all"}.csv"'
            writer = csv.writer(response)
            writer.writerow(
                [
                    "team_id",
                    "team_name",
                    "registration_number",
                    "name",
                    "email",
                    "phone",
                    "hostel_block",
                    "room_no",
                    "is_leader",
                ]
            )
            for member in members:
                writer.writerow(
                    [
                        member.team.id,
                        member.team.team_name,
                        member.registration_number,
                        member.name,
                        member.email,
                        member.phone,
                        member.hostel_block,
                        member.room_no or "",
                        "Yes" if member.is_leader else "No",
                    ]
                )
            return response

        return Response(
            {
                "success": False,
                "errors": {
                    "type": [
                        "Invalid export type. Use teams or members"
                    ]
                },
            },
            status=status.HTTP_400_BAD_REQUEST,
        )
