# 🧪 Testing Your APIs - Complete cURL Guide

## What is cURL?
cURL is a command-line tool for making HTTP requests. It's perfect for testing APIs without needing a GUI tool.

---

## How to Use This Guide

1. Start a server in one terminal: `node express.js`
2. Open another terminal and paste the cURL commands
3. See the JSON responses
4. Modify and experiment!

---

## 1️⃣ EXPRESS SERVER (Port 4000)

### Test Home Route
```bash
curl http://localhost:4000/
```

### GET ALL USERS
```bash
curl http://localhost:4000/users
```

### GET SINGLE USER
```bash
curl http://localhost:4000/users/1
```

### CREATE NEW USER (POST)
```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Ahmed", "email": "ahmed@example.com"}'
```

### UPDATE USER (PUT)
```bash
curl -X PUT http://localhost:4000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Ali Updated", "email": "ali_updated@example.com"}'
```

### DELETE USER
```bash
curl -X DELETE http://localhost:4000/users/1
```

---

## 2️⃣ HTTP SERVER (Port 3000)

### Home Route
```bash
curl http://localhost:3000/
```

### About Route
```bash
curl http://localhost:3000/about
```

### User Route with Query Parameter
```bash
curl http://localhost:3000/user?name=Ali
```

### User Route with Different Name
```bash
curl http://localhost:3000/user?name=Sara
```

---

## 3️⃣ CALCULATOR API (Port 5000)

### Start Server
```bash
node calculator.js
```

### Addition
```bash
curl http://localhost:5000/add/10/5
```

### Subtraction
```bash
curl http://localhost:5000/subtract/10/5
```

### Multiplication
```bash
curl http://localhost:5000/multiply/10/5
```

### Division
```bash
curl http://localhost:5000/divide/10/5
```

### Division by Zero (Error Case)
```bash
curl http://localhost:5000/divide/10/0
```

### Advanced Calculation - Sum
```bash
curl -X POST http://localhost:5000/calculate \
  -H "Content-Type: application/json" \
  -d '{"numbers": [1, 2, 3, 4, 5], "operation": "sum"}'
```

### Advanced Calculation - Average
```bash
curl -X POST http://localhost:5000/calculate \
  -H "Content-Type: application/json" \
  -d '{"numbers": [10, 20, 30, 40, 50], "operation": "average"}'
```

### Advanced Calculation - Max
```bash
curl -X POST http://localhost:5000/calculate \
  -H "Content-Type: application/json" \
  -d '{"numbers": [15, 32, 8, 45, 23], "operation": "max"}'
```

### Advanced Calculation - Min
```bash
curl -X POST http://localhost:5000/calculate \
  -H "Content-Type: application/json" \
  -d '{"numbers": [15, 32, 8, 45, 23], "operation": "min"}'
```

---

## 4️⃣ STUDENT MANAGEMENT API (Port 5001)

### Start Server
```bash
node student.js
```

### Home Route
```bash
curl http://localhost:5001/
```

### GET ALL STUDENTS
```bash
curl http://localhost:5001/students
```

### GET SINGLE STUDENT
```bash
curl http://localhost:5001/students/1
```

### CREATE NEW STUDENT
```bash
curl -X POST http://localhost:5001/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Fatima", "age": 20, "course": "Mathematics", "grade": "A+"}'
```

### UPDATE STUDENT
```bash
curl -X PUT http://localhost:5001/students/1 \
  -H "Content-Type: application/json" \
  -d '{"grade": "A+", "age": 21}'
```

### DELETE STUDENT
```bash
curl -X DELETE http://localhost:5001/students/2
```

### FILTER BY GRADE
```bash
curl http://localhost:5001/students/filter/grade/A
```

### GET STATISTICS
```bash
curl http://localhost:5001/stats
```

---

## Understanding cURL Syntax

```bash
curl [OPTIONS] URL

Options:
-X METHOD        : HTTP method (GET, POST, PUT, DELETE, etc.)
-H HEADER        : Add a header (e.g., Content-Type)
-d DATA          : Send data in request body
-v               : Verbose (shows more details)
-i               : Show response headers
```

### Example Breakdown
```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Ali", "email": "ali@example.com"}'
```

- `-X POST` : Use POST method
- `http://localhost:4000/users` : Target URL
- `-H "Content-Type: application/json"` : Tell server we're sending JSON
- `-d '...'` : The data we're sending

---

## Quick Test Workflow

### 1. Start Express Server
```bash
terminal 1: node express.js
```

### 2. Test in Another Terminal
```bash
terminal 2:

# Get all users
curl http://localhost:4000/users

# Create user
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Test User", "email": "test@example.com"}'

# Get all users again
curl http://localhost:4000/users

# Update user
curl -X PUT http://localhost:4000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'

# Delete user
curl -X DELETE http://localhost:4000/users/1
```

---

## Tips & Tricks

### 1. Pretty Print JSON Output
```bash
curl http://localhost:4000/users | json_pp
# or
curl http://localhost:4000/users | python -m json.tool
```

### 2. Save Response to File
```bash
curl http://localhost:4000/users > users.json
```

### 3. Check Headers Only
```bash
curl -i http://localhost:4000/users
```

### 4. Verbose Mode (Debugging)
```bash
curl -v http://localhost:4000/users
```

### 5. Send Form Data
```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d @- << EOF
{
  "name": "Ali",
  "email": "ali@example.com"
}
EOF
```

---

## Common Errors & Solutions

| Error | Cause | Solution |
|-------|-------|----------|
| `Connection refused` | Server not running | Start server first: `node express.js` |
| `404 Not Found` | Wrong route | Check route spelling |
| `400 Bad Request` | Invalid data | Check JSON format |
| `500 Internal Error` | Server error | Check server logs |

---

## Learning Checklist

- [ ] Understand HTTP methods (GET, POST, PUT, DELETE)
- [ ] Test GET request to retrieve data
- [ ] Test POST request to create data
- [ ] Test PUT request to update data
- [ ] Test DELETE request to remove data
- [ ] Handle validation errors (400 status)
- [ ] Handle not found errors (404 status)
- [ ] Read HTTP status codes correctly

---

## Next Steps

1. ✅ Test all provided examples
2. ✅ Modify data and test again
3. ✅ Try invalid data (missing fields, wrong types)
4. ✅ Check how server responds to errors
5. ✅ Build your own API
6. ✅ Learn about Postman (GUI alternative to cURL)

---

## Happy Testing! 🚀
