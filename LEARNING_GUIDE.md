# 📚 Complete Node.js Learning Guide for Beginners

## Table of Contents
1. [What is Node.js?](#what-is-nodejs)
2. [Setup & Installation](#setup--installation)
3. [Core Concepts](#core-concepts)
4. [Running Your Servers](#running-your-servers)
5. [Testing with cURL](#testing-with-curl)
6. [Progressive Learning Path](#progressive-learning-path)
7. [Practice Exercises](#practice-exercises)

---

## What is Node.js?

**Node.js** is a JavaScript runtime that allows you to run JavaScript outside the browser (on servers).

### Key Benefits:
- ✅ Use JavaScript for backend development
- ✅ Event-driven, non-blocking I/O model
- ✅ Great for building APIs and real-time applications
- ✅ Large package ecosystem (npm)

---

## Setup & Installation

### 1. Install Node.js
```bash
# Check if Node.js is installed
node --version
npm --version
```

### 2. Install Dependencies
```bash
cd /Users/fusionlogics/node_basics
npm install
```

### 3. Check Installed Packages
```bash
cat package.json
npm list
```

---

## Core Concepts

### 1. **Modules & Require**
```javascript
// Import a module
const express = require("express");

// Export from a module (in math.js)
module.exports = {
  add,
  subtract
};

// Use exported function
const { add } = require("./math.js");
add(2, 3); // Returns 5
```

### 2. **HTTP & Express**
- **HTTP Module**: Low-level web server creation
- **Express**: Framework that simplifies HTTP server creation

### 3. **Request-Response Cycle**
```
Client → HTTP Request → Server → Process → HTTP Response → Client
```

### 4. **Routes & Methods**
- `GET`: Retrieve data
- `POST`: Create data
- `PUT`: Update data
- `DELETE`: Remove data

### 5. **Status Codes**
- `200`: OK (success)
- `201`: Created
- `400`: Bad Request (client error)
- `404`: Not Found
- `500`: Internal Server Error

---

## Running Your Servers

### Start HTTP Server (Port 3000)
```bash
node httpserver.js
```

**Then test these URLs in your browser or terminal:**
```bash
http://localhost:3000/
http://localhost:3000/about
http://localhost:3000/user?name=Ali
```

### Start Express Server (Port 4000)
```bash
node express.js
```

**Available Routes:**
- `GET /` - Home page with all endpoints
- `GET /users` - Get all users
- `GET /users/1` - Get user with ID 1
- `POST /users` - Create a new user
- `PUT /users/1` - Update user with ID 1
- `DELETE /users/1` - Delete user with ID 1

---

## Testing with cURL

### Open Terminal and Use cURL Commands

#### 1. GET All Users
```bash
curl http://localhost:4000/users
```

#### 2. GET Single User
```bash
curl http://localhost:4000/users/1
```

#### 3. CREATE New User
```bash
curl -X POST http://localhost:4000/users \
  -H "Content-Type: application/json" \
  -d '{"name": "Ahmed", "email": "ahmed@example.com"}'
```

#### 4. UPDATE User
```bash
curl -X PUT http://localhost:4000/users/1 \
  -H "Content-Type: application/json" \
  -d '{"name": "Ali Updated", "email": "ali_new@example.com"}'
```

#### 5. DELETE User
```bash
curl -X DELETE http://localhost:4000/users/1
```

---

## Progressive Learning Path

### Week 1: Fundamentals
- [ ] Understand what Node.js is
- [ ] Run httpserver.js and test URLs
- [ ] Learn about modules and `require()`
- [ ] Understand request-response cycle

### Week 2: Express Basics
- [ ] Run express.js
- [ ] Learn Express routing
- [ ] Test GET requests with browser/cURL
- [ ] Understand HTTP methods

### Week 3: CRUD Operations
- [ ] Create data with POST
- [ ] Read data with GET
- [ ] Update data with PUT
- [ ] Delete data with DELETE
- [ ] Test all operations with cURL

### Week 4: Middleware & Error Handling
- [ ] Understand middleware
- [ ] Learn error handling
- [ ] Validate user input
- [ ] Handle 404 errors

### Week 5: Project Practice
- [ ] Build a simple TODO API
- [ ] Build a Product Management API
- [ ] Add error handling
- [ ] Test all operations

---

## Practice Exercises

### Exercise 1: Simple Calculator API
**File:** `calculator.js`

```javascript
const express = require("express");
const app = express();

app.use(express.json());

// Calculate addition
app.get("/add/:a/:b", (req, res) => {
  const result = parseInt(req.params.a) + parseInt(req.params.b);
  res.json({ result });
});

// Calculate subtraction
app.get("/subtract/:a/:b", (req, res) => {
  const result = parseInt(req.params.a) - parseInt(req.params.b);
  res.json({ result });
});

app.listen(5000, () => console.log("Calculator running on port 5000"));
```

**Test:**
```bash
curl http://localhost:5000/add/10/5
curl http://localhost:5000/subtract/10/5
```

---

### Exercise 2: Student Management API
**Create:** `student.js`

```javascript
const express = require("express");
const app = express();

app.use(express.json());

let students = [
  { id: 1, name: "Ali", grade: "A" },
  { id: 2, name: "Sara", grade: "B" },
];

// Get all students
app.get("/students", (req, res) => {
  res.json(students);
});

// Add a new student
app.post("/students", (req, res) => {
  const { name, grade } = req.body;
  if (!name || !grade) {
    return res.status(400).json({ error: "Name and grade required" });
  }
  const newStudent = {
    id: students.length + 1,
    name,
    grade,
  };
  students.push(newStudent);
  res.status(201).json(newStudent);
});

// Update student
app.put("/students/:id", (req, res) => {
  const student = students.find((s) => s.id === parseInt(req.params.id));
  if (!student) {
    return res.status(404).json({ error: "Student not found" });
  }
  if (req.body.name) student.name = req.body.name;
  if (req.body.grade) student.grade = req.body.grade;
  res.json(student);
});

// Delete student
app.delete("/students/:id", (req, res) => {
  const index = students.findIndex((s) => s.id === parseInt(req.params.id));
  if (index === -1) {
    return res.status(404).json({ error: "Student not found" });
  }
  const deleted = students.splice(index, 1);
  res.json(deleted[0]);
});

app.listen(5001, () => console.log("Student API running on port 5001"));
```

**Test:**
```bash
# Get all
curl http://localhost:5001/students

# Add
curl -X POST http://localhost:5001/students \
  -H "Content-Type: application/json" \
  -d '{"name": "Ahmed", "grade": "A+"}'

# Update
curl -X PUT http://localhost:5001/students/1 \
  -H "Content-Type: application/json" \
  -d '{"grade": "A+"}'

# Delete
curl -X DELETE http://localhost:5001/students/1
```

---

### Exercise 3: Blog API
**Create:** `blog.js`

Create a blog API with:
- GET `/posts` - Get all posts
- GET `/posts/:id` - Get single post
- POST `/posts` - Create new post (title, content, author)
- PUT `/posts/:id` - Update post
- DELETE `/posts/:id` - Delete post

---

### Exercise 4: Environment Variables
**Create:** `.env` file
```
PORT=5000
NODE_ENV=development
```

**Install dotenv:**
```bash
npm install dotenv
```

**Use in code:**
```javascript
require("dotenv").config();
const PORT = process.env.PORT || 3000;
```

---

## Important Tips 💡

1. **Always validate input**: Check if data exists before using
2. **Use proper HTTP status codes**: 200, 201, 400, 404, etc.
3. **Return JSON responses**: Users expect structured data
4. **Handle errors gracefully**: Don't crash the server
5. **Use meaningful variable names**: Make code readable
6. **Test thoroughly**: Use cURL or Postman to test all routes
7. **Use console.log() for debugging**: Track data flow

---

## Next Steps

1. ✅ Run both servers and test them
2. ✅ Modify the code to understand it better
3. ✅ Complete Exercise 1 (Calculator API)
4. ✅ Complete Exercise 2 (Student Management)
5. ✅ Build your own API based on Exercise 3 or 4
6. ✅ Learn about Database Integration (MongoDB/PostgreSQL)
7. ✅ Learn about Authentication & Security
8. ✅ Deploy your API to cloud (Heroku, AWS, etc.)

---

## Useful Resources

- **Official Node.js Docs**: https://nodejs.org/docs/
- **Express Documentation**: https://expressjs.com/
- **cURL Documentation**: https://curl.se/docs/
- **HTTP Status Codes**: https://developer.mozilla.org/en-US/docs/Web/HTTP/Status

---

## Quick Reference

### Running Servers
```bash
# HTTP Server
node httpserver.js          # Port 3000

# Express Server
node express.js             # Port 4000

# Stop any server
Press Ctrl + C
```

### Quick cURL Commands
```bash
GET:    curl http://localhost:4000/users
POST:   curl -X POST http://localhost:4000/users -H "Content-Type: application/json" -d '{"name":"Ali"}'
PUT:    curl -X PUT http://localhost:4000/users/1 -H "Content-Type: application/json" -d '{"name":"Updated"}'
DELETE: curl -X DELETE http://localhost:4000/users/1
```

---

## Happy Coding! 🚀
