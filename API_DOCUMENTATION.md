# 📚 API DOCUMENTATION - SOLVATHON'26 TEAM REGISTRATION

## Base URL
```
http://localhost:8000/api
```

---

## Public Endpoints

### 1. Register Team
**Endpoint**: `POST /register/team/`

**Description**: Create a new team with members

**Authentication**: None (Public)

**Request Headers**:
```
Content-Type: application/json
```

**Request Body**:
```json
{
  "team_name": "string (unique, 2+ chars)",
  "hostel_block": "enum (A Block | C Block | D1 Block | D2 Block)",
  "members": [
    {
      "registration_number": "string (9 chars)",
      "name": "string",
      "email": "string (must end with @vitstudent.ac.in)",
      "phone": "string (10 digits)",
      "hostel_block": "enum (A Block | C Block | D1 Block | D2 Block)",
      "room_no": "string (optional)",
      "is_leader": "boolean (exactly 1 must be true)"
    }
  ]
}
```

**Success Response (201 Created)**:
```json
{
  "success": true,
  "message": "Team registered successfully.",
  "data": {
    "id": 1,
    "team_name": "Team Name",
    "hostel_block": "A Block",
    "members": [
      {
        "registration_number": "23BBS0001",
        "name": "Leader",
        "email": "leader@vitstudent.ac.in",
        "phone": "9876543210",
        "hostel_block": "A Block",
        "room_no": "A101",
        "is_leader": true
      }
    ],
    "created_at": "2026-01-13T13:14:06.104666+05:30"
  }
}
```

**Error Response (400 Bad Request)**:
```json
{
  "success": false,
  "errors": {
    "team_name": ["Team name already exists. Please choose a different name."],
    "members": [
      "All team members must belong to the same hostel block.",
      "Team must have exactly one team leader.",
      "Team size must be between 2 and 6 members."
    ]
  }
}
```

**Validation Errors**:
| Field | Error Message | Cause |
|-------|---------------|-------|
| team_name | "Team name already exists" | Duplicate name |
| team_name | "Team name must be at least 2 characters" | Too short |
| members | "Team size must be between 2 and 6 members" | <2 or >6 members |
| members | "Team must have exactly one team leader" | 0 or 2+ leaders |
| members | "All team members must belong to the same hostel block" | Different blocks |
| email | "Email must end with @vitstudent.ac.in" | Wrong domain |
| phone | "Phone number must be exactly 10 digits" | Invalid format |
| registration_number | "Registration number must be exactly 9 characters" | Wrong length |

**Example Request**:
```bash
curl -X POST http://localhost:8000/api/register/team/ \
  -H "Content-Type: application/json" \
  -d '{
    "team_name": "Code Warriors",
    "hostel_block": "A Block",
    "members": [
      {
        "registration_number": "23BBS0001",
        "name": "Alice",
        "email": "alice@vitstudent.ac.in",
        "phone": "9876543210",
        "hostel_block": "A Block",
        "room_no": "A101",
        "is_leader": true
      },
      {
        "registration_number": "23BBS0002",
        "name": "Bob",
        "email": "bob@vitstudent.ac.in",
        "phone": "9876543211",
        "hostel_block": "A Block",
        "room_no": "A102",
        "is_leader": false
      }
    ]
  }'
```

---

## Admin Endpoints

### 1. List Teams
**Endpoint**: `GET /admin/teams/`

**Authentication**: Admin user required

**Query Parameters**:
- `block` (optional): Filter by hostel block (A Block, C Block, D1 Block, D2 Block)
- `search` (optional): Search by team name

**Success Response (200 OK)**:
```json
{
  "success": true,
  "data": [
    {
      "id": 1,
      "team_name": "Team Alpha",
      "hostel_block": "A Block",
      "member_count": 3,
      "members": [
        {
          "id": 1,
          "registration_number": "23BBS0001",
          "name": "Alice",
          "email": "alice@vitstudent.ac.in",
          "phone": "9876543210",
          "hostel_block": "A Block",
          "room_no": "A101",
          "is_leader": true
        }
      ],
      "created_at": "2026-01-13T13:14:06.104666+05:30"
    }
  ]
}
```

**Example Request**:
```bash
curl -X GET "http://localhost:8000/api/admin/teams/?block=A%20Block" \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 2. Get Team Details
**Endpoint**: `GET /admin/teams/<id>/`

**Authentication**: Admin user required

**URL Parameters**:
- `id` (integer): Team ID

**Success Response (200 OK)**:
```json
{
  "success": true,
  "data": {
    "team": {
      "id": 1,
      "team_name": "Team Alpha",
      "hostel_block": "A Block",
      "created_at": "2026-01-13T13:14:06.104666+05:30"
    },
    "members": [
      {
        "id": 1,
        "registration_number": "23BBS0001",
        "name": "Alice",
        "email": "alice@vitstudent.ac.in",
        "phone": "9876543210",
        "hostel_block": "A Block",
        "room_no": "A101",
        "is_leader": true
      },
      {
        "id": 2,
        "registration_number": "23BBS0002",
        "name": "Bob",
        "email": "bob@vitstudent.ac.in",
        "phone": "9876543211",
        "hostel_block": "A Block",
        "room_no": "A102",
        "is_leader": false
      }
    ]
  }
}
```

**Example Request**:
```bash
curl -X GET http://localhost:8000/api/admin/teams/1/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 3. Delete Team
**Endpoint**: `DELETE /admin/teams/<id>/delete/`

**Authentication**: Admin user required

**URL Parameters**:
- `id` (integer): Team ID

**Success Response (200 OK)**:
```json
{
  "success": true,
  "message": "Team 'Team Alpha' deleted successfully."
}
```

**Example Request**:
```bash
curl -X DELETE http://localhost:8000/api/admin/teams/1/delete/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

### 4. Export Data
**Endpoint**: `GET /admin/export/`

**Authentication**: Admin user required

**Query Parameters**:
- `type` (required): `teams` or `members`
- `block` (optional): Filter by hostel block

**Success Response**: CSV file download

**CSV Format (Teams)**:
```csv
team_id,team_name,hostel_block,member_count,created_at
1,Team Alpha,A Block,3,2026-01-13 13:14:06
2,Team Beta,C Block,2,2026-01-13 13:15:00
```

**CSV Format (Members)**:
```csv
team_id,team_name,registration_number,name,email,phone,hostel_block,room_no,is_leader
1,Team Alpha,23BBS0001,Alice,alice@vitstudent.ac.in,9876543210,A Block,A101,Yes
1,Team Alpha,23BBS0002,Bob,bob@vitstudent.ac.in,9876543211,A Block,A102,No
```

**Example Request**:
```bash
curl -X GET "http://localhost:8000/api/admin/export/?type=teams&block=A%20Block" \
  -H "Authorization: Bearer YOUR_TOKEN" \
  -o teams_export.csv
```

---

## Response Codes

| Code | Meaning | Scenario |
|------|---------|----------|
| 201 | Created | Team registered successfully |
| 200 | OK | Data retrieved or deleted successfully |
| 400 | Bad Request | Validation error in request |
| 401 | Unauthorized | Missing or invalid authentication |
| 403 | Forbidden | Insufficient permissions |
| 404 | Not Found | Team or resource not found |
| 500 | Server Error | Unexpected server error |

---

## Error Response Format

All error responses follow this format:
```json
{
  "success": false,
  "errors": {
    "field_name": ["Error message 1", "Error message 2"],
    "nested.field": ["Error message"]
  }
}
```

---

## Authentication

Admin endpoints require authentication. Obtain a token:

```bash
curl -X POST http://localhost:8000/api/token/ \
  -H "Content-Type: application/json" \
  -d '{
    "username": "admin",
    "password": "password"
  }'
```

Include token in requests:
```bash
curl -X GET http://localhost:8000/api/admin/teams/ \
  -H "Authorization: Bearer YOUR_TOKEN"
```

---

## Rate Limiting

No rate limiting currently implemented. Contact admin for production setup.

---

## Field Constraints

| Field | Type | Length | Required | Constraints |
|-------|------|--------|----------|-------------|
| team_name | String | 200 | Yes | Unique, 2+ chars |
| hostel_block | Enum | - | Yes | A Block, C Block, D1 Block, D2 Block |
| registration_number | String | 9 | Yes | Exactly 9 characters |
| name | String | 200 | Yes | Any content |
| email | Email | 254 | Yes | Must end with @vitstudent.ac.in |
| phone | String | 10 | Yes | 10 digits only |
| room_no | String | 20 | No | Optional |
| is_leader | Boolean | - | Yes | Exactly 1 per team |

---

## Common Scenarios

### Scenario 1: Register a 3-member team
```json
{
  "team_name": "Coding Ninjas",
  "hostel_block": "C Block",
  "members": [
    {
      "registration_number": "23BCS0101",
      "name": "Priya",
      "email": "priya@vitstudent.ac.in",
      "phone": "9876543210",
      "hostel_block": "C Block",
      "room_no": "C201",
      "is_leader": true
    },
    {
      "registration_number": "23BCS0102",
      "name": "Rahul",
      "email": "rahul@vitstudent.ac.in",
      "phone": "9876543211",
      "hostel_block": "C Block",
      "room_no": "C202",
      "is_leader": false
    },
    {
      "registration_number": "23BCS0103",
      "name": "Ananya",
      "email": "ananya@vitstudent.ac.in",
      "phone": "9876543212",
      "hostel_block": "C Block",
      "room_no": "C203",
      "is_leader": false
    }
  ]
}
```

### Scenario 2: Get all D1 Block teams
```bash
GET /api/admin/teams/?block=D1%20Block
```

### Scenario 3: Export all team members
```bash
GET /api/admin/export/?type=members
```

---

## Testing Tools

### Using cURL
```bash
curl -X POST http://localhost:8000/api/register/team/ \
  -H "Content-Type: application/json" \
  -d @team_payload.json
```

### Using Python Requests
```python
import requests

response = requests.post(
    "http://localhost:8000/api/register/team/",
    json={
        "team_name": "Team Name",
        "hostel_block": "A Block",
        "members": [...]
    }
)
print(response.status_code)
print(response.json())
```

### Using Postman
1. Create new POST request to `http://localhost:8000/api/register/team/`
2. Set header: `Content-Type: application/json`
3. Paste JSON payload in body
4. Click Send

---

**Version**: 1.0  
**Last Updated**: January 13, 2026  
**Status**: Production Ready
