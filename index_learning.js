// ========== LEARNING: MODULE SYSTEM & EXPORTS ==========
// This file demonstrates how to use Node.js modules
// Run: node index_learning.js

// Import built-in modules
const fs = require("fs");
const path = require("path");

// Import our custom module (math.js)
const math = require("./math");

console.log("\n========== MODULE SYSTEM LEARNING ==========\n");

// 1. Using our custom math module
console.log("1. Using Custom Module (math.js):");
console.log("   add(5, 3) =", math.add(5, 3));
console.log("   subtract(10, 4) =", math.subtract(10, 4));

// 2. Using built-in modules
console.log("\n2. Using Built-in Modules:");
console.log("   Current directory:", __dirname);
console.log("   Current file:", __filename);
console.log("   Path separator:", path.sep);

// 3. Reading files
console.log("\n3. Reading Files:");
try {
  const data = fs.readFileSync("./package.json", "utf8");
  console.log("   ✅ Successfully read package.json");
  const packageJson = JSON.parse(data);
  console.log("   Project name:", packageJson.name);
  console.log("   Version:", packageJson.version);
} catch (error) {
  console.log("   ❌ Error reading file:", error.message);
}

// 4. File and Directory Information
console.log("\n4. File System Information:");
try {
  const stats = fs.statSync("./");
  console.log("   Directory size:", stats.size, "bytes");
  console.log("   Created:", stats.birthtime);
  console.log("   Is directory:", stats.isDirectory());
} catch (error) {
  console.log("   Error:", error.message);
}

// 5. List files in current directory
console.log("\n5. Files in Current Directory:");
try {
  const files = fs.readdirSync("./");
  console.log("   Files found:", files.length);
  files.forEach((file) => {
    console.log("   - " + file);
  });
} catch (error) {
  console.log("   Error:", error.message);
}

// 6. Environmental Information
console.log("\n6. Node.js Environment:");
console.log("   Node version:", process.version);
console.log("   Platform:", process.platform);
console.log("   Available CPUs:", require("os").cpus().length);

console.log("\n========== END OF LEARNING ==========\n");

// ========== EXERCISE: Try these modifications ==========
/*
Exercise 1: Create a new function in math.js
  1. Add multiply(a, b) function
  2. Add divide(a, b) function
  3. Export them
  4. Use them here: math.multiply(10, 5)

Exercise 2: Create a new module
  1. Create a file: string-utils.js
  2. Export a function: capitalize(str) that capitalizes first letter
  3. Import it here
  4. Use it: stringUtils.capitalize("hello")

Exercise 3: Read data.txt
  1. Use fs.readFileSync("./data.txt", "utf8")
  2. Log the contents
  3. Try to parse it as JSON

Tips:
  - Every function you export should be used in this file
  - Test by running: node index_learning.js
  - Check the output to verify everything works
  - Don't be afraid to add console.log() everywhere to debug
*/
