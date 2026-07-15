export const chapter11Basics = {
  title: "1. Basics of JavaScript with ES6+ Features",
  slug: "js-11-basics",
  content: `
# JavaScript — Chapter 11: Basics of JavaScript with ES6+ Features 🚀

This chapter covers core JavaScript concepts and ES6+ features, providing a foundation for modern web development.

## 1. Introduction to JavaScript
- JavaScript is a **high-level, interpreted scripting language**.
- Enables dynamic behavior on websites: DOM manipulation, events, animations, API calls.
- Can run in **browsers, Node.js**, and server environments.

**Example:**
\`\`\`javascript
console.log("Hello, JavaScript!");
\`\`\`

## 2. Linking JavaScript Files
**Inline:**
\`\`\`html
<script>
  console.log("Hello World");
</script>
\`\`\`

**External File:**
\`\`\`html
<script src="script.js"></script>
\`\`\`

## 3. Running JS in Browser Console
- Open browser → Right-click → Inspect → Console.
- Can execute JS code directly.

## 4. Variables & Keywords
\`var\`, \`let\`, \`const\`

\`\`\`javascript
var name = "Mahesh"; // Function scoped
let age = 22;        // Block scoped, reassignable
const pi = 3.14;     // Block scoped, immutable
\`\`\`

## 5. Logging & Alerts
\`\`\`javascript
console.log("Log message");
console.info("Info message");
console.warn("Warning message");
alert("Alert box");
prompt("Enter your name:");
\`\`\`

## 6. Working with Strings
\`\`\`javascript
let str = "Hello World";
console.log(str.length);
console.log(str.slice(0,5));       // 'Hello'
console.log(str.split(" "));       // ['Hello','World']
console.log(str.replace("World", "JS"));
console.log(\`Template String: \${str}\`);
console.log(str.includes("Hello"));
\`\`\`
> [!NOTE]
> \`splice\` is actually for arrays, not strings.

## 7. Statements, Semicolons & Comments
- **Statement:** Complete instruction (\`let a=5;\`)
- **Expression:** Evaluates to a value (\`5+2\`)
- **Semicolons:** Optional but recommended
- **Comments:**
\`\`\`javascript
// Single line comment
/* Multi-line
   comment */
\`\`\`

## 8. JavaScript Data Types
- **Primitive:** string, number, boolean, null, undefined, Symbol
- **Reference:** object, array, function

**Important Values:**
\`\`\`javascript
let a;
console.log(a);         // undefined
console.log(null);      // null
console.log(NaN);       // Not a Number
console.log(Infinity);  // Infinity
\`\`\`

## 9. Operators

**Arithmetic**
\`\`\`javascript
let x = 5 + 3; // 8
let y = 5 * 3; // 15
let z = 5 / 2; // 2.5
\`\`\`

**Assignment**
\`\`\`javascript
let a = 10; a += 5; // 15
a -= 2; // 13
a *= 2; // 26
a /= 2; // 13
\`\`\`

**Increment/Decrement**
\`\`\`javascript
let i = 5; i++; i--; ++i; --i;
\`\`\`

**Comparison**
\`\`\`javascript
5 == '5';  // true (value only)
5 === '5'; // false (value + type)
5 != 6;    // true
5 !== 6;   // true
\`\`\`

**Logical**
\`\`\`javascript
true && false; // false
true || false; // true
!true;         // false
\`\`\`

**Bitwise (Basics)**
\`\`\`javascript
5 & 1; // 1
5 | 1; // 5
\`\`\`

## 10. Variable Hoisting
- **Hoisting:** JS moves variable/function declarations to top.

\`\`\`javascript
console.log(x); // undefined
var x = 5;
\`\`\`
- \`let\` and \`const\` are not hoisted in the same way (Temporal Dead Zone).

## 11. Exercises
1. Declare variables using \`var\`, \`let\`, \`const\` and log them.
2. Create a string and perform \`slice\`, \`replace\`, \`split\` operations.
3. Demonstrate type coercion with \`==\` and \`===\`.
4. Log \`undefined\`, \`null\`, \`NaN\`, \`Infinity\`.

## 12. Mini Project: Simple Calculator
**Goal:** Take two numbers and an operator, then compute the result.

\`\`\`html
<input type="number" id="num1" placeholder="Number 1">
<input type="number" id="num2" placeholder="Number 2">
<select id="operator">
  <option value="+">+</option>
  <option value="-">-</option>
  <option value="*">*</option>
  <option value="/">/</option>
</select>
<button id="calcBtn">Calculate</button>
<p id="result"></p>
\`\`\`

\`\`\`javascript
const num1 = document.getElementById('num1');
const num2 = document.getElementById('num2');
const operator = document.getElementById('operator');
const result = document.getElementById('result');
const calcBtn = document.getElementById('calcBtn');

calcBtn.addEventListener('click', () => {
  let a = Number(num1.value);
  let b = Number(num2.value);
  let op = operator.value;
  let res;

  switch(op){
    case '+': res = a + b; break;
    case '-': res = a - b; break;
    case '*': res = a * b; break;
    case '/': res = a / b; break;
    default: res = 'Invalid Operator';
  }
  result.textContent = \`Result: \${res}\`;
});
\`\`\`

> [!TIP]
> **Chapter 11 covers:** Basics of JS and ES6 features, Variables, keywords, logging, Strings and operators, Statements, expressions, comments, Data types and hoisting, Built a simple calculator.
`,
  objectives: [
    "Understand JavaScript syntax and fundamentals.",
    "Learn about variables (var, let, const) and hoisting.",
    "Perform basic string manipulation and operator math.",
    "Build a simple calculator mini-project."
  ],
  difficulty: "beginner",
  xpReward: 50
};
