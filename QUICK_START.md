# 🎓 Node.js Learning - Quick Start Guide

## What You Have Now

Your workspace has been enhanced with practical learning materials:

### 📁 Files & What They Do

| File | Purpose | Port | Command |
|------|---------|------|---------|
| `httpserver.js` | Basic HTTP server with routing | 3000 | `node httpserver.js` |
| `express.js` | Express framework with CRUD API | 4000 | `node express.js` |
| `calculator.js` | Practice API - Math operations | 5000 | `node calculator.js` |
| `student.js` | Practice API - Student management | 5001 | `node student.js` |
| `math.js` | Module example - Reusable functions | N/A | `require('./math.js')` |

### 📚 Learning Documents

| File | Content |
|------|---------|
| `LEARNING_GUIDE.md` | Complete Node.js fundamentals & concepts |
| `CURL_TESTING_GUIDE.md` | How to test APIs from terminal |
| `QUICK_START.md` | This file! |

---

## 🚀 Getting Started (5 Minutes)

### Step 1: Start Your First Server
```bash
cd /Users/fusionlogics/node_basics
node express.js
```

**You should see:**
```
✅ Express Server running on http://localhost:4000
```

### Step 2: Open Another Terminal & Test
```bash
# Get all users
curl http://localhost:4000/users

# Create a user
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Your Name", "email": "your@email.com"}'

# Get all users again to see your new user
curl http://localhost:4000/users
```

### Step 3: Stop the Server
```bash
Press Ctrl + C in the terminal running the server
```

---

## 📖 Learning Path (4 Weeks)

### Week 1: HTTP & Basics
- [ ] Read: `LEARNING_GUIDE.md` (Sections 1-3)
- [ ] Run: `node httpserver.js`
- [ ] Test: All URLs in browser
- [ ] Understand: Request-Response cycle

### Week 2: Express & Routing
- [ ] Read: `LEARNING_GUIDE.md` (Section 4)
- [ ] Run: `node express.js`
- [ ] Learn cURL: `CURL_TESTING_GUIDE.md`
- [ ] Test: All 6 Express routes with cURL

### Week 3: CRUD Operations
- [ ] Create: New user with POST
- [ ] Read: Get all & single user with GET
- [ ] Update: User data with PUT
- [ ] Delete: User with DELETE
- [ ] Practice: Try all operations multiple times

### Week 4: Build Your Own
- [ ] Build: `calculator.js` (Already provided!)
- [ ] Build: `student.js` (Already provided!)
- [ ] Extend: Add more features
- [ ] Challenge: Create your own API

---

## 🧪 Testing Your Servers

### Quick Test - Express Server (Port 4000)

**Terminal 1 - Start Server:**
```bash
node express.js
```

**Terminal 2 - Test Operations:**
```bash
# Test 1: Get all users
curl http://localhost:4000/users

# Test 2: Create new user
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "John", "email": "john@example.com"}'

# Test 3: Update user 1
curl -X PUT http://localhost:4000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Ali Khan"}'

# Test 4: Delete user 2
curl -X DELETE http://localhost:4000/users/2

# Test 5: Get all users again
curl http://localhost:4000/users
```

---

## 💡 Key Concepts You're Learning

### 1. **Modules**
```javascript
// Import
const express = require("express");

// Export
module.exports = { add, subtract };
```

### 2. **HTTP Methods**
- `GET` - Retrieve data
- `POST` - Create data
- `PUT` - Update data
- `DELETE` - Remove data

### 3. **Routing**
```javascript
app.get("/users", (req, res) => {
  // Handle GET /users
});

app.post("/users", (req, res) => {
  // Handle POST /users
});
```

### 4. **Status Codes**
- `200` - Success
- `201` - Created
- `400` - Bad Request
- `404` - Not Found
- `500` - Server Error

### 5. **JSON Response**
```javascript
res.json({
  success: true,
  message: "Operation successful",
  data: { id: 1, name: "Ali" }
});
```

---

## 📋 Practical Exercises

### Exercise 1: Calculator API ✅ Ready
**File:** `calculator.js`
```bash
node calculator.js
curl http://localhost:5000/add/10/5
```

**Learn:**
- URL parameters (`:a`, `:b`)
- Error handling
- POST requests with JSON body

---

### Exercise 2: Student Management API ✅ Ready
**File:** `student.js`
```bash
node student.js
curl http://localhost:5001/students
```

**Learn:**
- Full CRUD operations
- Data validation
- Filtering data
- Generating statistics

---

### Exercise 3: Create Your Own API 📝

**Try building a TODO API:**
```javascript
let todos = [
  { id: 1, title: "Learn Node.js", completed: false },
  { id: 2, title: "Build an API", completed: false }
];

app.get("/todos");           // Get all
app.get("/todos/:id");       // Get single
app.post("/todos");          // Create
app.put("/todos/:id");       // Update
app.delete("/todos/:id");    // Delete
```

---

## 🔧 Running Multiple Servers

You can run multiple servers at the same time on different ports:

**Terminal 1:**
```bash
node express.js
# Running on port 4000
```

**Terminal 2:**
```bash
node calculator.js
# Running on port 5000
```

**Terminal 3:**
```bash
node student.js
# Running on port 5001
```

**Terminal 4 - Test Them All:**
```bash
curl http://localhost:4000/users
curl http://localhost:5000/add/10/5
curl http://localhost:5001/students
```

---

## 🎯 Common Tasks

### View All Users
```bash
curl http://localhost:4000/users
```

### Add New User
```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Your Name", "email": "you@email.com"}'
```

### Update Specific User
```bash
curl -X PUT http://localhost:4000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Updated Name"}'
```

### Delete Specific User
```bash
curl -X DELETE http://localhost:4000/users/3
```

### View Pretty JSON (Mac/Linux)
```bash
curl http://localhost:4000/users | json_pp
```

---

## 🐛 Debugging Tips

### 1. Check If Server Started
```bash
# You should see:
✅ Server running on http://localhost:4000
```

### 2. Connection Refused Error?
- Make sure server is running
- Use correct port number
- Check `node express.js` is still running

### 3. 404 Error?
- Check the route path is correct
- Check method (GET, POST, PUT, DELETE)
- Check port number

### 4. 400 Error?
- Check JSON format is correct
- Check all required fields are provided
- Check data types

### 5. View Detailed Request/Response
```bash
curl -v http://localhost:4000/users
# Shows headers, status, and body
```

---

## 📚 Files to Read

1. **Start Here:** `LEARNING_GUIDE.md`
2. **Testing:** `CURL_TESTING_GUIDE.md`
3. **Concepts:** Look at code comments in `.js` files

---

## ✅ Your Learning Checklist

### Week 1
- [ ] Understand what Node.js is
- [ ] Run `httpserver.js` 
- [ ] Test HTTP routes in browser
- [ ] Understand `require()` and modules

### Week 2
- [ ] Run `express.js`
- [ ] Learn cURL commands
- [ ] Test GET requests
- [ ] Understand routing

### Week 3
- [ ] Test POST (create)
- [ ] Test PUT (update)
- [ ] Test DELETE (remove)
- [ ] Handle errors

### Week 4
- [ ] Build `calculator.js` (understand it!)
- [ ] Build `student.js` (understand it!)
- [ ] Modify existing APIs
- [ ] Create your own API

---

## 🚀 Next Level: Advanced Topics

Once you're comfortable:
1. **Databases**: MongoDB, PostgreSQL
2. **Authentication**: JWT, Sessions
3. **Validation**: Schema validation
4. **Deployment**: Heroku, AWS
5. **Testing**: Jest, Mocha
6. **Error Handling**: Try-catch, custom errors
7. **Middleware**: Custom middleware functions
8. **Environment Variables**: .env files

---

## 💬 Tips for Success

1. **Don't memorize**, understand the concepts
2. **Experiment**, try modifying the code
3. **Break things**, then fix them (best way to learn!)
4. **Test everything**, use cURL to verify
5. **Read documentation**, Node.js docs are excellent
6. **Build projects**, apply what you learn
7. **Ask questions**, Google and Stack Overflow are your friends
8. **Be consistent**, practice daily!

---

## 📞 Need Help?

- Read: `LEARNING_GUIDE.md`
- Test: `CURL_TESTING_GUIDE.md`
- Experiment: Modify the code and test
- Debug: Use `curl -v` to see details
- Google: "Node.js [your question]"

---

## 🎉 You're Ready!

You now have:
✅ Working HTTP server
✅ Working Express server
✅ Practice projects (Calculator, Student API)
✅ Complete learning guides
✅ Testing examples

**Start with:** `node express.js` and test with cURL

**Next:** Read `LEARNING_GUIDE.md` for concepts

**Then:** Build your own API!

---

Happy Learning! 🚀
