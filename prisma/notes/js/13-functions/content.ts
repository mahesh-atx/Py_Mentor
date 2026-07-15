export const chapter13Functions = {
  title: "3. Functions in JavaScript (Deep Dive)",
  slug: "js-13-functions",
  content: `
# JavaScript — Chapter 13: Functions (Deep Dive)

## 1. Introduction to Functions
Functions are one of the most powerful and widely used features in JavaScript. They allow you to group a block of code, give it a name, and reuse it whenever needed.

**Why Functions?**
- Code reusability.
- Cleaner and more organized code.
- Easier debugging and maintenance.
- Encapsulation of logic.

## 2. Function Basics

**Syntax**
\`\`\`javascript
function functionName(parameters) {
  // function body
  return value;
}
\`\`\`

**Example:**
\`\`\`javascript
function greet(name) {
  return \`Hello, \${name}!\`;
}

console.log(greet("Mahesh")); // Hello, Mahesh!
\`\`\`

## 3. Parameters and Arguments

### Parameters
Variables defined in the function definition.

- **Required Parameters:** Must be provided.
\`\`\`javascript
function add(a, b) {
  return a + b;
}
console.log(add(2, 3)); // 5
\`\`\`

- **Default Parameters:** Provide default values if not passed.
\`\`\`javascript
function multiply(a, b = 1) {
  return a * b;
}
console.log(multiply(5)); // 5
\`\`\`

- **Rest Parameters:** Collect multiple arguments into an array.
\`\`\`javascript
function sum(...numbers) {
  return numbers.reduce((acc, curr) => acc + curr, 0);
}
console.log(sum(1, 2, 3, 4)); // 10
\`\`\`

- **Destructured Parameters:** Extract values directly.
\`\`\`javascript
function display({name, age}) {
  console.log(\`\${name} is \${age} years old.\`);
}
display({name: "Mahesh", age: 22});
\`\`\`

### Arguments
Values passed to the function.
- **Positional Arguments:** Order matters.
- **Spread Operator:** Expand arrays into arguments.
\`\`\`javascript
let nums = [1, 2, 3];
console.log(sum(...nums)); // 6
\`\`\`

## 4. Hoisting in Functions
- **Variable Hoisting:** Variables declared with \`var\` are hoisted with \`undefined\`.
- **Function Hoisting:** Function declarations are hoisted fully.

**Example:**
\`\`\`javascript
sayHello(); // Works
function sayHello() {
  console.log("Hello!");
}
\`\`\`

But with function expressions:
\`\`\`javascript
sayHi(); // Error: Cannot access 'sayHi' before initialization
let sayHi = function() {
  console.log("Hi!");
}
\`\`\`

## 5. Types of Functions

**Classic Function**
\`\`\`javascript
function greet() { return "Hello!"; }
\`\`\`

**Nested Function**
\`\`\`javascript
function outer() {
  function inner() {
    return "Inner Function";
  }
  return inner();
}
console.log(outer());
\`\`\`

**Arrow Function**
\`\`\`javascript
let square = (x) => x * x;
console.log(square(5)); // 25
\`\`\`

**Anonymous Function**
\`\`\`javascript
setTimeout(function() {
  console.log("Hello after 2s");
}, 2000);
\`\`\`

**Higher Order Functions**
Functions that take other functions as arguments or return them.
\`\`\`javascript
function apply(fn, value) {
  return fn(value);
}
console.log(apply(x => x * 2, 5)); // 10
\`\`\`

**Callback Functions**
\`\`\`javascript
function fetchData(callback) {
  setTimeout(() => callback("Data loaded"), 1000);
}
fetchData(msg => console.log(msg));
\`\`\`

**Pure vs Impure Functions**
- **Pure:** Same input → same output, no side effects.
\`\`\`javascript
function pureAdd(a, b) { return a + b; }
\`\`\`
- **Impure:** Depends on external state.
\`\`\`javascript
let count = 0;
function impureIncrement() { return ++count; }
\`\`\`

## 6. Scoping

**Global Scope**
Variables accessible everywhere.
\`\`\`javascript
let x = 10;
function show() { console.log(x); }
\`\`\`

**Function Scope**
Variables inside functions are not accessible outside.
\`\`\`javascript
function demo() {
  let y = 20;
}
console.log(y); // Error
\`\`\`

**Closures**
A function remembering its lexical scope.
\`\`\`javascript
function counter() {
  let count = 0;
  return function() {
    count++;
    return count;
  };
}
let inc = counter();
console.log(inc()); // 1
console.log(inc()); // 2
\`\`\`

## 7. Exercises
1. Write a function to calculate factorial using recursion.
2. Create a function that takes an array of numbers and returns the largest.
3. Implement a function with default parameters.
4. Write a function that returns another function (closure).
5. Demonstrate a higher-order function that filters even numbers from an array.

## 8. Exercise Solutions
**1. Factorial**
\`\`\`javascript
function factorial(n) {
  if (n === 0) return 1;
  return n * factorial(n - 1);
}
\`\`\`

**2. Largest number**
\`\`\`javascript
function largest(arr) {
  return Math.max(...arr);
}
\`\`\`

**3. Default parameters**
\`\`\`javascript
function greet(name = "Guest") {
  return \`Hello, \${name}\`;
}
\`\`\`

**4. Closure (Multiplier)**
\`\`\`javascript
function multiplier(factor) {
  return function(num) { return num * factor; };
}
\`\`\`

**5. Higher Order (Filter even)**
\`\`\`javascript
function filterEven(arr) {
  return arr.filter(n => n % 2 === 0);
}
\`\`\`

## 9. Mini Project: Calculator Functions
Build a simple calculator using functions:
\`\`\`javascript
function add(a, b) { return a + b; }
function subtract(a, b) { return a - b; }
function multiply(a, b) { return a * b; }
function divide(a, b) { return b !== 0 ? a / b : "Error: Divide by 0"; }

console.log(add(10, 5)); // 15
console.log(subtract(10, 5)); // 5
console.log(multiply(10, 5)); // 50
console.log(divide(10, 0)); // Error
\`\`\`
> [!TIP]
> Enhance it by accepting user input via \`prompt()\` or form fields in HTML.
`,
  objectives: [
    "Understand the difference between parameters, arguments, and default values.",
    "Master arrow functions, anonymous functions, and callbacks.",
    "Learn scope and closures in JavaScript.",
    "Build a modular calculator using separate functions."
  ],
  difficulty: "intermediate",
  xpReward: 150
};
