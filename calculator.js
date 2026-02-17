const express = require("express");
const app = express();

app.use(express.json());

// ========== CALCULATOR API ==========
// Simple calculator endpoints for learning CRUD and routing

// GET: Calculate addition
app.get("/add/:a/:b", (req, res) => {
  try {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: "Please provide valid numbers" });
    }

    const result = a + b;
    res.json({
      operation: "addition",
      a,
      b,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Calculate subtraction
app.get("/subtract/:a/:b", (req, res) => {
  try {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: "Please provide valid numbers" });
    }

    const result = a - b;
    res.json({
      operation: "subtraction",
      a,
      b,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Calculate multiplication
app.get("/multiply/:a/:b", (req, res) => {
  try {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: "Please provide valid numbers" });
    }

    const result = a * b;
    res.json({
      operation: "multiplication",
      a,
      b,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// GET: Calculate division
app.get("/divide/:a/:b", (req, res) => {  try {
    const a = parseFloat(req.params.a);
    const b = parseFloat(req.params.b);

    if (isNaN(a) || isNaN(b)) {
      return res.status(400).json({ error: "Please provide valid numbers" });
    }

    if (b === 0) {
      return res.status(400).json({ error: "Cannot divide by zero" });
    }

    const result = a / b;
    res.json({
      operation: "division",
      a,
      b,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// POST: Advanced calculation with multiple operations
app.post("/calculate", (req, res) => {
  try {
    const { numbers, operation } = req.body;

    if (!numbers || !Array.isArray(numbers) || numbers.length === 0) {
      return res.status(400).json({ error: "Please provide a numbers array" });
    }

    if (!operation) {
      return res.status(400).json({ error: "Please specify an operation" });
    }

    let result;

    switch (operation.toLowerCase()) {
      case "sum":
        result = numbers.reduce((acc, num) => acc + num, 0);
        break;
      case "product":
        result = numbers.reduce((acc, num) => acc * num, 1);
        break;
      case "average":
        result = numbers.reduce((acc, num) => acc + num, 0) / numbers.length;
        break;
      case "max":
        result = Math.max(...numbers);
        break;
      case "min":
        result = Math.min(...numbers);
        break;
      default:
        return res.status(400).json({ error: "Unknown operation" });
    }

    res.json({
      numbers,
      operation,
      result,
    });
  } catch (error) {
    res.status(500).json({ error: "Internal server error" });
  }
});

// Home route
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Calculator API - Learn Node.js!",
    endpoints: {
      addition: "GET /add/:a/:b",
      subtraction: "GET /subtract/:a/:b",
      multiplication: "GET /multiply/:a/:b",
      division: "GET /divide/:a/:b",
      advanced: "POST /calculate",
    },
    examples: {
      addition: "http://localhost:5000/add/10/5",
      subtraction: "http://localhost:5000/subtract/10/5",
      multiplication: "http://localhost:5000/multiply/10/5",
      division: "http://localhost:5000/divide/10/5",
      advanced: "POST to http://localhost:5000/calculate with body: {\"numbers\": [1,2,3,4,5], \"operation\": \"sum\"}",
    },
  });
});

// 404 handler
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start server
const PORT = 5000;
app.listen(PORT, () => {
  console.log(`\n✅ Calculator API running on http://localhost:${PORT}`);
  console.log(`Visit http://localhost:${PORT}/ for all endpoints`);
});
