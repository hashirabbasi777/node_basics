const express = require("express");
const app = express();

app.use(express.json());

// ========== STUDENT MANAGEMENT API ==========
// Learn CRUD operations with students database

let students = [
  { id: 1, name: "Ali", age: 20, course: "Computer Science", grade: "A" },
  { id: 2, name: "Sara", age: 19, course: "Engineering", grade: "B+" },
  { id: 3, name: "Ahmed", age: 21, course: "Business", grade: "A-" },
];

// ========== ROUTES ==========

// 1. HOME ROUTE - Show all available endpoints
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Student Management API",
    totalStudents: students.length,
    endpoints: {
      getAll: "GET /students",
      getById: "GET /students/:id",
      create: "POST /students",
      update: "PUT /students/:id",
      delete: "DELETE /students/:id",
      searchByGrade: "GET /students/filter/grade/:grade",
      statistics: "GET /stats",
    },
  });
});

// 2. GET ALL STUDENTS
app.get("/students", (req, res) => {
  res.json({
    success: true,
    message: "All students retrieved",
    count: students.length,
    students,
  });
});

// 3. GET SINGLE STUDENT BY ID
app.get("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      success: false,
      error: `Student with ID ${studentId} not found`,
    });
  }

  res.json({
    success: true,
    student,
  });
});

// 4. CREATE NEW STUDENT
app.post("/students", (req, res) => {
  const { name, age, course, grade } = req.body;

  // Validation
  if (!name || !age || !course || !grade) {
    return res.status(400).json({
      error: "Please provide all required fields: name, age, course, grade",
    });
  }

  if (age < 15 || age > 60) {
    return res.status(400).json({
      error: "Age must be between 15 and 60",
    });
  }

  // Check if student with same name already exists
  if (students.some((s) => s.name.toLowerCase() === name.toLowerCase())) {
    return res.status(400).json({
      error: "Student with this name already exists",
    });
  }

  const newStudent = {
    id: students.length > 0 ? Math.max(...students.map((s) => s.id)) + 1 : 1,
    name,
    age,
    course,
    grade,
  };

  students.push(newStudent);

  res.status(201).json({
    success: true,
    message: "Student created successfully",
    student: newStudent,
  });
});

// 5. UPDATE STUDENT
app.put("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const student = students.find((s) => s.id === studentId);

  if (!student) {
    return res.status(404).json({
      error: `Student with ID ${studentId} not found`,
    });
  }

  // Update only provided fields
  if (req.body.name) student.name = req.body.name;
  if (req.body.age) {
    if (req.body.age < 15 || req.body.age > 60) {
      return res.status(400).json({ error: "Age must be between 15 and 60" });
    }
    student.age = req.body.age;
  }
  if (req.body.course) student.course = req.body.course;
  if (req.body.grade) student.grade = req.body.grade;

  res.json({
    success: true,
    message: "Student updated successfully",
    student,
  });
});

// 6. DELETE STUDENT
app.delete("/students/:id", (req, res) => {
  const studentId = parseInt(req.params.id);
  const index = students.findIndex((s) => s.id === studentId);

  if (index === -1) {
    return res.status(404).json({
      error: `Student with ID ${studentId} not found`,
    });
  }

  const deletedStudent = students.splice(index, 1);

  res.json({
    success: true,
    message: "Student deleted successfully",
    student: deletedStudent[0],
  });
});

// 7. FILTER STUDENTS BY GRADE
app.get("/students/filter/grade/:grade", (req, res) => {
  const grade = req.params.grade.toUpperCase();
  const filtered = students.filter((s) => s.grade.toUpperCase() === grade);

  if (filtered.length === 0) {
    return res.status(404).json({
      message: `No students found with grade ${grade}`,
    });
  }

  res.json({
    grade,
    count: filtered.length,
    students: filtered,
  });
});

// 8. GET STATISTICS
app.get("/stats", (req, res) => {
  const courses = {};
  const grades = {};

  students.forEach((s) => {
    courses[s.course] = (courses[s.course] || 0) + 1;
    grades[s.grade] = (grades[s.grade] || 0) + 1;
  });

  const averageAge =
    students.reduce((sum, s) => sum + s.age, 0) / students.length;

  res.json({
    totalStudents: students.length,
    averageAge: averageAge.toFixed(2),
    courseDistribution: courses,
    gradeDistribution: grades,
  });
});

// 404 Handler
app.use((req, res) => {
  res.status(404).json({
    error: "Route not found. Visit GET / for available endpoints.",
  });
});

// Start Server
const PORT = 5001;
app.listen(PORT, () => {
  console.log(`\n✅ Student Management API running on http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT}/ for all endpoints`);
});
