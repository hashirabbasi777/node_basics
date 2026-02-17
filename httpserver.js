const http = require("http");
const url = require("url");

// Create an HTTP server
const server = http.createServer((req, res) => {
  // Parse the URL
  const parsedUrl = url.parse(req.url, true);
  const pathname = parsedUrl.pathname;

  // Set response headers
  res.setHeader("Content-Type", "application/json");

  // Simple routing
  if (pathname === "/" && req.method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "Welcome to Node.js HTTP Server" }));
  } else if (pathname === "/about" && req.method === "GET") {
    res.statusCode = 200;
    res.end(JSON.stringify({ message: "This is the About page" }));
  } else if (pathname === "/user" && req.method === "GET") {
    // Get query parameters
    const name = parsedUrl.query.name || "Guest";
    res.statusCode = 200;
    res.end(JSON.stringify({ message: `Hello, ${name}!` }));
  } else {
    // 404 Not Found
    res.statusCode = 404;
    res.end(JSON.stringify({ error: "Route not found" }));
  }
});

// Start the server
const PORT = 3000;
server.listen(PORT, () => {
  console.log(`\n✅ HTTP Server running on http://localhost:${PORT}`);
  console.log(`Try these URLs:`);
  console.log(`  http://localhost:${PORT}/`);
  console.log(`  http://localhost:${PORT}/about`);
  console.log(`  http://localhost:${PORT}/user?name=Ali`);
});
