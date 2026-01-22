#!/usr/bin/env python
"""Test script for team registration API"""

import requests
import json

BASE_URL = "http://localhost:8000/api"

# Test 1: Valid team registration with 2 members
test_payload_valid = {
    "team_name": "Test Team Alpha",
    "hostel_block": "A Block",
    "members": [
        {
            "registration_number": "23BBS0001",
            "name": "Alice Leader",
            "email": "alice.leader@vitstudent.ac.in",
            "phone": "9876543210",
            "hostel_block": "A Block",
            "room_no": "A101",
            "is_leader": True
        },
        {
            "registration_number": "23BBS0002",
            "name": "Bob Member",
            "email": "bob.member@vitstudent.ac.in",
            "phone": "9876543211",
            "hostel_block": "A Block",
            "room_no": "A102",
            "is_leader": False
        }
    ]
}

# Test 2: Invalid - email without @vitstudent.ac.in
test_payload_invalid_email = {
    "team_name": "Invalid Email Team",
    "hostel_block": "A Block",
    "members": [
        {
            "registration_number": "23BBS0003",
            "name": "Charlie",
            "email": "charlie@gmail.com",
            "phone": "9876543212",
            "hostel_block": "A Block",
            "room_no": "A103",
            "is_leader": True
        }
    ]
}

# Test 3: Invalid - different hostel blocks
test_payload_different_blocks = {
    "team_name": "Different Blocks Team",
    "hostel_block": "A Block",
    "members": [
        {
            "registration_number": "23BBS0004",
            "name": "Diana",
            "email": "diana@vitstudent.ac.in",
            "phone": "9876543213",
            "hostel_block": "A Block",
            "room_no": "A104",
            "is_leader": True
        },
        {
            "registration_number": "23BBS0005",
            "name": "Eve",
            "email": "eve@vitstudent.ac.in",
            "phone": "9876543214",
            "hostel_block": "C Block",
            "room_no": "C101",
            "is_leader": False
        }
    ]
}

# Test 4: Invalid - no team leader
test_payload_no_leader = {
    "team_name": "No Leader Team",
    "hostel_block": "A Block",
    "members": [
        {
            "registration_number": "23BBS0006",
            "name": "Frank",
            "email": "frank@vitstudent.ac.in",
            "phone": "9876543215",
            "hostel_block": "A Block",
            "room_no": "A105",
            "is_leader": False
        }
    ]
}

# Test 5: Invalid - too many members (> 6)
test_payload_too_many = {
    "team_name": "Too Many Team",
    "hostel_block": "A Block",
    "members": [
        {
            "registration_number": f"23BBS{100+i:04d}",
            "name": f"Member {i}",
            "email": f"member{i}@vitstudent.ac.in",
            "phone": f"987654321{i}",
            "hostel_block": "A Block",
            "room_no": f"A{100+i}",
            "is_leader": i == 0
        }
        for i in range(7)
    ]
}

def test_api(name, payload, expected_status=None):
    print(f"\n{'='*60}")
    print(f"TEST: {name}")
    print(f"{'='*60}")
    print("Payload:")
    print(json.dumps(payload, indent=2))
    
    try:
        response = requests.post(
            f"{BASE_URL}/register/team/",
            json=payload,
            headers={"Content-Type": "application/json"}
        )
        
        print(f"\nStatus Code: {response.status_code}")
        print("Response:")
        print(json.dumps(response.json(), indent=2))
        
        if expected_status and response.status_code != expected_status:
            print(f"⚠️ Expected {expected_status}, got {response.status_code}")
        else:
            print("✅ PASS")
            
    except Exception as e:
        print(f"❌ ERROR: {str(e)}")

if __name__ == "__main__":
    print("\n" + "="*60)
    print("TEAM REGISTRATION API TESTS")
    print("="*60)
    
    # Test valid registration
    test_api("Valid Team Registration (2 members)", test_payload_valid, 201)
    
    # Test invalid email
    test_api("Invalid Email Domain", test_payload_invalid_email, 400)
    
    # Test different blocks
    test_api("Members from Different Blocks", test_payload_different_blocks, 400)
    
    # Test no leader
    test_api("No Team Leader", test_payload_no_leader, 400)
    
    # Test too many members
    test_api("Too Many Members (7)", test_payload_too_many, 400)
    
    print("\n" + "="*60)
    print("TESTS COMPLETE")
    print("="*60)
