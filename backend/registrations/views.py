from rest_framework.views import APIView
from rest_framework.response import Response
from rest_framework import status, permissions
from .models import IndividualRegistration, Team, TeamMember
from .serializers import IndividualRegistrationSerializer, TeamSerializer
from django.http import HttpResponse
import csv
from django.shortcuts import get_object_or_404
from rest_framework.permissions import IsAdminUser

# Public endpoint: individual registration
class IndividualRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = IndividualRegistrationSerializer(data=request.data)
        if serializer.is_valid():
            serializer.save()
            return Response({"success": True, "message": "Individual registered successfully.", "data": serializer.data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Public endpoint: team registration
class TeamRegisterView(APIView):
    permission_classes = [permissions.AllowAny]

    def post(self, request):
        serializer = TeamSerializer(data=request.data)
        if serializer.is_valid():
            team = serializer.save()
            return Response({"success": True, "message": "Team registered successfully.", "data": TeamSerializer(team).data}, status=status.HTTP_201_CREATED)
        return Response({"success": False, "errors": serializer.errors}, status=status.HTTP_400_BAD_REQUEST)

# Admin endpoints
class AdminIndividualsListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        qs = IndividualRegistration.objects.all().order_by("-created_at")
        block = request.query_params.get("block")
        if block:
            qs = qs.filter(hostel_block=block)
        # optional search
        search = request.query_params.get("search")
        if search:
            qs = qs.filter(name__icontains=search) | qs.filter(registration_number__icontains=search) | qs.filter(phone__icontains=search)
        data = [
            {
                "id": i.id,
                "registration_number": i.registration_number,
                "name": i.name,
                "email": i.email,
                "phone": i.phone,
                "hostel_block": i.hostel_block,
                "room_no": i.room_no,
                "created_at": i.created_at,
            }
            for i in qs
        ]
        return Response({"success": True, "data": data}, status=status.HTTP_200_OK)

class AdminTeamsListView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        qs = Team.objects.all().order_by("-created_at")
        block = request.query_params.get("block")
        if block:
            qs = qs.filter(hostel_block=block)
        data = []
        for t in qs:
            data.append({
                "id": t.id,
                "team_name": t.team_name,
                "hostel_block": t.hostel_block,
                "member_count": t.members.count(),
                "created_at": t.created_at,
            })
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
            }
            for m in members
        ]
        return Response({"success": True, "data": {"team": {"id": team.id, "team_name": team.team_name, "hostel_block": team.hostel_block, "created_at": team.created_at}, "members": members_data}}, status=status.HTTP_200_OK)

class AdminDeleteTeamView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        team = get_object_or_404(Team, pk=pk)
        team_name = team.team_name
        team.delete()
        return Response({"success": True, "message": f"Team '{team_name}' deleted successfully."}, status=status.HTTP_200_OK)

class AdminDeleteIndividualView(APIView):
    permission_classes = [IsAdminUser]

    def delete(self, request, pk):
        individual = get_object_or_404(IndividualRegistration, pk=pk)
        name = individual.name
        individual.delete()
        return Response({"success": True, "message": f"Individual registration for '{name}' deleted successfully."}, status=status.HTTP_200_OK)

# CSV export endpoint - filter by block and type
class AdminExportView(APIView):
    permission_classes = [IsAdminUser]

    def get(self, request):
        export_type = request.query_params.get("type", "all")  # individuals, teams, members, all
        block = request.query_params.get("block")  # e.g. "A Block"
        filename = "export.csv"

        # Individuals export
        if export_type in ("individuals", "all"):
            inds = IndividualRegistration.objects.all()
            if block:
                inds = inds.filter(hostel_block=block)
            # stream csv for individuals
            response = HttpResponse(content_type="text/csv")
            response["Content-Disposition"] = f'attachment; filename="individuals_{block or "all"}.csv"'
            writer = csv.writer(response)
            writer.writerow(["registration_number", "name", "email", "phone", "hostel_block", "room_no", "created_at"])
            for i in inds:
                writer.writerow([i.registration_number, i.name, i.email, i.phone, i.hostel_block, i.room_no or "", i.created_at])
            return response

        # Teams export (summary)
        if export_type == "teams":
            teams = Team.objects.all()
            if block:
                teams = teams.filter(hostel_block=block)
            response = HttpResponse(content_type="text/csv")
            response["Content-Disposition"] = f'attachment; filename="teams_{block or "all"}.csv"'
            writer = csv.writer(response)
            writer.writerow(["team_id", "team_name", "hostel_block", "member_count", "created_at"])
            for t in teams:
                writer.writerow([t.id, t.team_name, t.hostel_block, t.members.count(), t.created_at])
            return response

        # Members export (detailed)
        if export_type == "members":
            members = TeamMember.objects.select_related("team").all()
            if block:
                members = members.filter(hostel_block=block)
            response = HttpResponse(content_type="text/csv")
            response["Content-Disposition"] = f'attachment; filename="team_members_{block or "all"}.csv"'
            writer = csv.writer(response)
            writer.writerow(["team_id", "team_name", "registration_number", "name", "email", "phone", "hostel_block", "room_no"])
            for m in members:
                writer.writerow([m.team.id, m.team.team_name, m.registration_number, m.name, m.email, m.phone, m.hostel_block, m.room_no or ""])
            return response

        return Response({"success": False, "errors": {"type": ["Invalid export type. Use individuals|teams|members|all"]}}, status=status.HTTP_400_BAD_REQUEST)
