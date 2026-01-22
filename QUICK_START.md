# 🚀 QUICK START GUIDE - SOLVATHON'26 TEAM REGISTRATION

## System Overview

A **team-only registration system** for SOLVATHON'26 hackathon with:
- **Team Size**: 2-6 members (1 leader + 1-5 members)
- **Email**: All must use @vitstudent.ac.in
- **Hostel Block**: All from same block (A, C, D1, D2)
- **Team Name**: Required and unique

---

## Starting the System

### Backend
```bash
cd backend
python manage.py runserver 0.0.0.0:8000
```
Server runs on: `http://localhost:8000`

### Frontend
```bash
cd frontend
npm run dev
```
Frontend runs on: `http://localhost:3000`

---

## API Endpoints

### 📝 Registration (Public)
```
POST /api/register/team/
```

**Request Body**:
```json
{
  "team_name": "Team Name",
  "hostel_block": "A Block",
  "members": [
    {
      "registration_number": "23BBS0001",
      "name": "Leader Name",
      "email": "leader@vitstudent.ac.in",
      "phone": "9876543210",
      "hostel_block": "A Block",
      "room_no": "A101",
      "is_leader": true
    },
    {
      "registration_number": "23BBS0002",
      "name": "Member Name",
      "email": "member@vitstudent.ac.in",
      "phone": "9876543211",
      "hostel_block": "A Block",
      "room_no": "A102",
      "is_leader": false
    }
  ]
}
```

**Success Response (201)**:
```json
{
  "success": true,
  "message": "Team registered successfully.",
  "data": { /* team details */ }
}
```

**Error Response (400)**:
```json
{
  "success": false,
  "errors": { /* validation errors */ }
}
```

### 👨‍💼 Admin Endpoints (Protected)
```
GET  /api/admin/teams/                    - List all teams
GET  /api/admin/teams/<id>/               - Get team details
DELETE /api/admin/teams/<id>/delete/      - Delete team
GET  /api/admin/export/?type=teams|members - Export to CSV
```

---

## Validation Rules

### ✅ Must Pass
| Rule | Example |
|------|---------|
| Team Size | 2-6 members |
| Members | All same hostel block |
| Email | name@**vitstudent.ac.in** |
| Phone | **10 digits** |
| Reg Number | **9 characters** |
| Team Leader | **Exactly 1** per team |
| Team Name | **Unique**, 2+ chars |

### ❌ Will Fail
| Reason | Error |
|--------|-------|
| 1 member | "Team size must be between 2 and 6" |
| 7 members | "Team size must be between 2 and 6" |
| Different blocks | "All team members must belong to same block" |
| Gmail address | "Email must end with @vitstudent.ac.in" |
| 0 leaders | "Team must have exactly 1 leader" |
| 2+ leaders | "Team must have exactly 1 leader" |
| Duplicate team name | "Team name already exists" |

---

## Testing

### Run API Tests
```bash
cd d:\Projects\solvathon26
python test_api.py
```

### Expected Results
- ✅ Valid team registration → 201
- ✅ Invalid email → 400
- ✅ Different blocks → 400
- ✅ No leader → 400
- ✅ Too many members → 400

---

## Database

### Models
1. **Team**
   - team_name (unique)
   - hostel_block
   - created_at

2. **TeamMember**
   - team (FK)
   - registration_number
   - name
   - email
   - phone
   - hostel_block
   - room_no
   - is_leader
   - created_at

### Run Migrations
```bash
cd backend
python manage.py migrate
```

---

## Files Structure

```
backend/
├── registrations/
│   ├── models.py          ← Team & TeamMember models
│   ├── serializers.py     ← Validation logic
│   ├── views.py           ← API endpoints
│   ├── urls.py            ← Routes
│   ├── admin.py           ← Admin interface
│   └── migrations/        ← Database migrations
└── db.sqlite3             ← Database

frontend/
├── app/
│   ├── register/
│   │   └── page.tsx       ← Team registration form
│   ├── layout.tsx
│   └── page.tsx
├── components/
│   ├── Card.tsx
│   └── ...
└── package.json
```

---

## Environment Setup

### Backend Requirements
```
Django 5.2.4
djangorestframework 3.16.1
django-cors-headers 4.9.0
djangorestframework-simplejwt 5.5.1
```

### Frontend Requirements
```
Next.js 15.x
TypeScript 5.x
Tailwind CSS
Lucide React Icons
```

---

## Admin Access

### Create Superuser
```bash
cd backend
python manage.py createsuperuser
```

### Access Admin Panel
```
http://localhost:8000/admin/
```

### View Teams
1. Go to "Teams" section
2. See all registered teams
3. Click team to view members
4. Edit team or delete

---

## Troubleshooting

### Issue: "Email must end with @vitstudent.ac.in"
- **Solution**: Make sure all member emails use @vitstudent.ac.in domain

### Issue: "Team size must be between 2 and 6 members"
- **Solution**: Add at least 2 members (1 leader + 1 member) and max 6 total

### Issue: "All team members must belong to the same hostel block"
- **Solution**: Ensure all members select the same hostel block

### Issue: "Team must have exactly one team leader"
- **Solution**: Mark exactly 1 member as is_leader: true

### Issue: Server won't start
- **Solution**: 
  ```bash
  cd backend
  python manage.py migrate
  python manage.py runserver
  ```

---

## Key Points to Remember

1. **Team-Only** - No individual registration anymore
2. **2-6 Members** - Minimum 2, maximum 6
3. **One Leader** - Exactly 1 team leader required
4. **Same Block** - All members must be from same hostel block
5. **VIT Email** - All emails must end with @vitstudent.ac.in
6. **Unique Name** - Each team name must be unique

---

## Success Example

```
✅ Valid Registration:
- Team: "Code Warriors"
- Block: "A Block"
- Members: 3 (1 leader + 2 members)
- All emails: @vitstudent.ac.in
- All blocks: A Block
- Response: 201 Created
```

---

*For detailed information, see:*
- [IMPLEMENTATION_SUMMARY.md](IMPLEMENTATION_SUMMARY.md)
- [REQUIREMENTS_CHECKLIST.md](REQUIREMENTS_CHECKLIST.md)
- [CHANGES_SUMMARY.md](CHANGES_SUMMARY.md)

