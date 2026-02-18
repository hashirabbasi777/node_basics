const express = require("express");
const app = express();

// Middleware to parse JSON
app.use(express.json());

// In-memory database (array)
let users = [
  { id: 1, name: "Ali", email: "ali@example.com" },
  { id: 2, name: "Sara", email: "sara@example.com" },
  { id: 3, name: "John", email: "john@example.com"},
];

// ========== ROUTES ==========

// 1. HOME ROUTE
app.get("/", (req, res) => {
  res.json({
    message: "Welcome to Express Server",
    endpoints: {
      getAllUsers: "GET /users",
      getUserById: "GET /users/:id",
      createUser: "POST /users",
      updateUser: "PUT /users/:id",
      deleteUser: "DELETE /users/:id",
    },
  });
});

// 2. GET ALL USERS
app.get("/users", (req, res) => {
  res.json({
    success: true,
    message: "All users retrieved",
    count: users.length,
    users,
  });
});

// 3. GET SINGLE USER BY ID
app.get("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  res.json({ success: true, user });
});

// 4. CREATE NEW USER
app.post("/users", (req, res) => {
  const { name, email } = req.body;

  // Validation
  if (!name || !email) {
    return res.status(400).json({ error: "Name and email are required" });
  }

  // Check if email already exists
  if (users.some((u) => u.email === email)) {
    return res.status(400).json({ error: "Email already exists" });
  }

  const newUser = {
    id: users.length > 0 ? Math.max(...users.map((u) => u.id)) + 1 : 1,
    name,
    email,
  };

  users.push(newUser);

  res.status(201).json({
    success: true,
    message: "User created successfully",
    user: newUser,
  });
});

// 5. UPDATE USER
app.put("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const user = users.find((u) => u.id === userId);

  if (!user) {
    return res.status(404).json({ error: "User not found" });
  }

  // Update fields if provided
  if (req.body.name) user.name = req.body.name;
  if (req.body.email) user.email = req.body.email;

  res.json({
    success: true,
    message: "User updated successfully",
    user,
  });
});

// 6. DELETE USER
app.delete("/users/:id", (req, res) => {
  const userId = parseInt(req.params.id);
  const index = users.findIndex((u) => u.id === userId);

  if (index === -1) {
    return res.status(404).json({ error: "User not found" });
  }

  const deletedUser = users.splice(index, 1);

  res.json({
    success: true,
    message: "User deleted successfully",
    user: deletedUser[0],
  });
});

// 7. ERROR HANDLING (404)
app.use((req, res) => {
  res.status(404).json({ error: "Route not found" });
});

// Start the server
const PORT = 4000;
app.listen(PORT, () => {
  console.log(`\n✅ Express Server running on http://localhost:${PORT}`);
});

app.listen(3000, () => {
  console.log("Express server running on port 3000");
});