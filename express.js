const express = require("express");

const app = express();

app.use(express.json());


app.get("/", (req, res) => {
  res.send("Hello from Express server");
});


// In-memory database (array)
let users = [
  { id: 1, name: "Ali" },
  { id: 2, name: "Sara" },
];


let products = [
  { id: 1, name: "Laptop", price: 999 },
  { id: 2, name: "Phone", price: 499 },
];



// Users route
app.get("/users", (req, res) => {
  res.json({
    success: true,
    users,
  });
});


app.get("/products", (req, res) => {
  res.json({
    success: true,
    products,
  });
});


// POST user
app.post("/users", (req, res) => {
  const { name } = req.body;

  if(!name){
    return res.status(400).json({ error: "Name is required" });
  }

  const newUser = {
    id: users.length + 1,
    name,  
  }

  users.push(newUser);

  res.json({
    message: "User created successfully from the Express server",
    user: newUser,
  });
});

app.listen(3000, () => {
  console.log("Express server running on port 3000");
});