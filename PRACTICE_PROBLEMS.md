# 🏋️ Node.js Practice Problems & Solutions

## Level 1: Beginner (Days 1-7)

### Problem 1.1: Simple Echo Server
**Difficulty:** ⭐ Easy

**Task:** Create a server that echoes back whatever message you send in query parameter.

**Endpoint:** `GET /echo?message=hello`
**Expected Response:** `{ "echo": "hello" }`

**Hint:** Use `req.query.message` to get query parameter

**Solution:**
```javascript
app.get("/echo", (req, res) => {
  const message = req.query.message || "No message";
  res.json({ echo: message });
});
```

---

### Problem 1.2: HTTP Status Code Practice
**Difficulty:** ⭐ Easy

**Task:** Create endpoints that return different status codes.

- `GET /success` → 200 OK
- `GET /created` → 201 Created
- `GET /bad` → 400 Bad Request
- `GET /notfound` → 404 Not Found
- `GET /error` → 500 Server Error

**Solution:**
```javascript
app.get("/success", (req, res) => {
  res.status(200).json({ message: "OK" });
});

app.get("/created", (req, res) => {
  res.status(201).json({ message: "Created" });
});

app.get("/bad", (req, res) => {
  res.status(400).json({ error: "Bad Request" });
});

app.get("/notfound", (req, res) => {
  res.status(404).json({ error: "Not Found" });
});

app.get("/error", (req, res) => {
  res.status(500).json({ error: "Server Error" });
});
```

---

### Problem 1.3: URL Parameter Extraction
**Difficulty:** ⭐ Easy

**Task:** Extract URL parameters and return them

**Endpoint:** `GET /user/:name/:age`
**Example:** `GET /user/Ali/25`
**Expected Response:** `{ "name": "Ali", "age": "25" }`

**Solution:**
```javascript
app.get("/user/:name/:age", (req, res) => {
  res.json({
    name: req.params.name,
    age: req.params.age
  });
});
```

---

## Level 2: Intermediate (Days 8-14)

### Problem 2.1: Array Manipulation API
**Difficulty:** ⭐⭐ Medium

**Task:** Create an API that manipulates arrays

**Endpoints:**
- `POST /array/push` - Add item to array
- `POST /array/pop` - Remove last item
- `GET /array/length` - Get array length
- `GET /array/sum` - Sum all numbers
- `GET /array` - Get all items

**Request Body for POST:**
```json
{ "value": 5 }
```

**Solution:**
```javascript
let myArray = [1, 2, 3, 4, 5];

app.post("/array/push", (req, res) => {
  const { value } = req.body;
  if (value === undefined) {
    return res.status(400).json({ error: "value required" });
  }
  myArray.push(value);
  res.json({ array: myArray, message: "Item added" });
});

app.post("/array/pop", (req, res) => {
  const removed = myArray.pop();
  res.json({ removed, array: myArray });
});

app.get("/array/length", (req, res) => {
  res.json({ length: myArray.length });
});

app.get("/array/sum", (req, res) => {
  const sum = myArray.reduce((a, b) => a + b, 0);
  res.json({ sum });
});

app.get("/array", (req, res) => {
  res.json({ array: myArray });
});
```

---

### Problem 2.2: Todo List API
**Difficulty:** ⭐⭐ Medium

**Task:** Build a TODO list with CRUD operations

**Endpoints:**
- `GET /todos` - Get all todos
- `GET /todos/:id` - Get single todo
- `POST /todos` - Create todo
- `PUT /todos/:id` - Update todo
- `DELETE /todos/:id` - Delete todo

**Create Request Body:**
```json
{ "title": "Learn Node.js", "completed": false }
```

**Solution:**
```javascript
let todos = [
  { id: 1, title: "Learn JavaScript", completed: true },
  { id: 2, title: "Learn Express", completed: false }
];

app.get("/todos", (req, res) => {
  res.json(todos);
});

app.get("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Not found" });
  res.json(todo);
});

app.post("/todos", (req, res) => {
  const { title, completed } = req.body;
  if (!title) return res.status(400).json({ error: "Title required" });
  
  const newTodo = {
    id: Math.max(...todos.map(t => t.id)) + 1,
    title,
    completed: completed || false
  };
  todos.push(newTodo);
  res.status(201).json(newTodo);
});

app.put("/todos/:id", (req, res) => {
  const todo = todos.find(t => t.id === parseInt(req.params.id));
  if (!todo) return res.status(404).json({ error: "Not found" });
  
  if (req.body.title) todo.title = req.body.title;
  if (req.body.completed !== undefined) todo.completed = req.body.completed;
  
  res.json(todo);
});

app.delete("/todos/:id", (req, res) => {
  const index = todos.findIndex(t => t.id === parseInt(req.params.id));
  if (index === -1) return res.status(404).json({ error: "Not found" });
  
  const deleted = todos.splice(index, 1);
  res.json(deleted[0]);
});
```

---

### Problem 2.3: Product Store API
**Difficulty:** ⭐⭐ Medium

**Task:** Create a product store with inventory management

**Data:** Each product has: `id`, `name`, `price`, `quantity`

**Endpoints:**
- `GET /products` - List all
- `POST /products` - Add product
- `GET /products/:id` - Get single
- `PUT /products/:id` - Update
- `DELETE /products/:id` - Delete
- `PUT /products/:id/buy` - Decrease quantity

**Solution Example:**
```javascript
let products = [
  { id: 1, name: "Laptop", price: 1000, quantity: 5 },
  { id: 2, name: "Mouse", price: 25, quantity: 50 }
];

app.post("/products/:id/buy", (req, res) => {
  const product = products.find(p => p.id === parseInt(req.params.id));
  if (!product) return res.status(404).json({ error: "Not found" });
  
  if (product.quantity < 1) {
    return res.status(400).json({ error: "Out of stock" });
  }
  
  product.quantity--;
  res.json({ message: "Purchased", product });
});
```

---

## Level 3: Advanced (Days 15-21)

### Problem 3.1: Input Validation API
**Difficulty:** ⭐⭐⭐ Hard

**Task:** Create an API with comprehensive input validation

**Create endpoint requires:**
- `name` - string, 2-50 characters
- `email` - valid email format
- `age` - number, 18-100
- `phone` - 10 digits
- `password` - min 6 characters

**Solution:**
```javascript
function validateUser(data) {
  const errors = {};
  
  if (!data.name || data.name.length < 2 || data.name.length > 50) {
    errors.name = "Name must be 2-50 characters";
  }
  
  if (!data.email || !data.email.includes("@")) {
    errors.email = "Valid email required";
  }
  
  if (!data.age || data.age < 18 || data.age > 100) {
    errors.age = "Age must be 18-100";
  }
  
  if (!data.phone || !/^\d{10}$/.test(data.phone)) {
    errors.phone = "Phone must be 10 digits";
  }
  
  if (!data.password || data.password.length < 6) {
    errors.password = "Password must be at least 6 characters";
  }
  
  return {
    isValid: Object.keys(errors).length === 0,
    errors
  };
}

app.post("/register", (req, res) => {
  const validation = validateUser(req.body);
  
  if (!validation.isValid) {
    return res.status(400).json({ errors: validation.errors });
  }
  
  // Create user...
  res.status(201).json({ message: "User created" });
});
```

---

### Problem 3.2: Blog API with Comments
**Difficulty:** ⭐⭐⭐ Hard

**Task:** Create a blog with nested comments

**Data Structure:**
```javascript
{
  id: 1,
  title: "My First Post",
  content: "...",
  author: "Ali",
  comments: [
    { id: 1, author: "Sara", text: "Great post!" }
  ]
}
```

**Endpoints:**
- `GET /posts` - All posts with comments
- `POST /posts/:postId/comments` - Add comment
- `DELETE /posts/:postId/comments/:commentId` - Delete comment

**Hint:** Comments are nested inside posts!

---

### Problem 3.3: Search & Filter API
**Difficulty:** ⭐⭐⭐ Hard

**Task:** Implement search and filtering

**Data:** Array of products

**Endpoints:**
- `GET /products?search=laptop` - Search by name
- `GET /products?minPrice=100&maxPrice=500` - Filter by price
- `GET /products?category=electronics` - Filter by category
- `GET /products?sort=price` - Sort results

**Solution Idea:**
```javascript
app.get("/products", (req, res) => {
  let result = [...products];
  
  // Search
  if (req.query.search) {
    result = result.filter(p =>
      p.name.toLowerCase().includes(req.query.search.toLowerCase())
    );
  }
  
  // Filter by price
  if (req.query.minPrice) {
    result = result.filter(p => p.price >= parseInt(req.query.minPrice));
  }
  if (req.query.maxPrice) {
    result = result.filter(p => p.price <= parseInt(req.query.maxPrice));
  }
  
  // Sort
  if (req.query.sort === "price") {
    result.sort((a, b) => a.price - b.price);
  }
  
  res.json(result);
});
```

---

## Level 4: Expert (Days 22-28)

### Problem 4.1: Rate Limiting
**Difficulty:** ⭐⭐⭐⭐ Very Hard

**Task:** Implement rate limiting (max 5 requests per minute)

**Hint:** Track requests by IP or user ID

---

### Problem 4.2: JWT Authentication
**Difficulty:** ⭐⭐⭐⭐ Very Hard

**Task:** Implement login with JWT tokens

**Endpoints:**
- `POST /auth/login` - Get token
- `GET /protected` - Needs valid token
- `POST /auth/logout` - Invalidate token

---

### Problem 4.3: Pagination
**Difficulty:** ⭐⭐⭐⭐ Very Hard

**Task:** Implement pagination for large datasets

**Endpoints:**
- `GET /products?page=1&limit=10`

**Response should include:**
```json
{
  "data": [...],
  "page": 1,
  "limit": 10,
  "total": 100,
  "pages": 10
}
```

---

## Testing Your Solutions

For each problem, test with cURL:

```bash
# Test GET
curl http://localhost:4000/endpoint

# Test POST
curl -X POST http://localhost:4000/endpoint \
  -H "Content-Type: application/json" \
  -d '{"key": "value"}'

# Test with query params
curl "http://localhost:4000/endpoint?search=test&page=1"
```

---

## How to Use This File

1. **Pick a problem** based on your level
2. **Try to solve it** without looking at solution
3. **Test it** with cURL
4. **Check solution** if stuck
5. **Modify it** to practice further
6. **Move to next problem** when comfortable

---

## Learning Order Recommended

**Week 1:**
- Problem 1.1, 1.2, 1.3

**Week 2:**
- Problem 2.1, 2.2, 2.3

**Week 3:**
- Problem 3.1, 3.2, 3.3

**Week 4:**
- Problem 4.1, 4.2, 4.3

---

## Getting Stuck?

1. ✅ Re-read the problem
2. ✅ Check examples in `express.js`, `calculator.js`, `student.js`
3. ✅ Read relevant section in `LEARNING_GUIDE.md`
4. ✅ Test small parts separately
5. ✅ Use `console.log()` to debug
6. ✅ Check the solution

---

## Challenge Yourself

After solving each problem:
- [ ] Add more features
- [ ] Add error handling
- [ ] Add validation
- [ ] Combine multiple problems
- [ ] Create your own variation

---

## Real-World Applications

These problems teach you to build:
- ✅ REST APIs
- ✅ Data management
- ✅ User validation
- ✅ Search & filtering
- ✅ Security & authentication
- ✅ Performance optimization

---

**Happy Problem Solving! 🚀**
