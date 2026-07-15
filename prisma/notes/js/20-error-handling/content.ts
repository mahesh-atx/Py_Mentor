export const chapter20ErrorHandling = {
  title: "10. Error Handling (Deep Dive)",
  slug: "js-20-error-handling",
  content: `
# JavaScript — Chapter 20: Error Handling (Deep Dive)

Error handling in JavaScript ensures your code can **gracefully handle unexpected situations** without crashing.

## 1. Introduction
- Errors can occur due to syntax mistakes, logical mistakes, or runtime exceptions.
- Handling errors ensures better UX and robust code.

## 2. Types of Errors

**Syntax Errors:** Mistakes in code structure.
\`\`\`javascript
// console.log("Hello"
// Missing closing parenthesis
\`\`\`

**Runtime Errors:** Code cannot execute.
\`\`\`javascript
console.log(a); // ReferenceError if a is not defined
\`\`\`

**Logical Errors:** Code runs but gives wrong output.
\`\`\`javascript
console.log(2 + 2 == 5); // true/false wrong logic
\`\`\`

## 3. The Error Object
Contains information about the error.

\`\`\`javascript
try {
  throw new Error("Something went wrong");
} catch(e) {
  console.log(e.name);    // Error
  console.log(e.message); // Something went wrong
  console.log(e.stack);   // Stack trace
}
\`\`\`

## 4. try-catch & try-catch-finally

\`\`\`javascript
try {
  let result = riskyFunction();
} catch(err) {
  console.error("Caught an error:", err.message);
} finally {
  console.log("This runs always");
}
\`\`\`
> [!NOTE]
> The **finally** block always executes, whether an error occurred or not.

## 5. Throwing Errors

\`\`\`javascript
function divide(a, b) {
  if(b === 0) throw new Error("Cannot divide by zero");
  return a / b;
}

try {
  console.log(divide(5, 0));
} catch(err) {
  console.error(err.message);
}
\`\`\`

## 6. Custom Errors

\`\`\`javascript
class CustomError extends Error {
  constructor(message) {
    super(message);
    this.name = "CustomError";
  }
}

try {
  throw new CustomError("This is a custom error");
} catch(err) {
  console.log(err.name, err.message);
}
\`\`\`

## 7. Error Handling in Asynchronous Code

**Using Promises**
\`\`\`javascript
fetch('https://jsonplaceholder.typicode.com/invalidurl')
  .then(res => res.json())
  .catch(err => console.error("Promise Error:", err));
\`\`\`

**Using async/await**
\`\`\`javascript
async function fetchData() {
  try {
    let res = await fetch('https://jsonplaceholder.typicode.com/invalidurl');
    let data = await res.json();
  } catch(err) {
    console.error("Async Error:", err);
  }
}
fetchData();
\`\`\`

## 8. Exercises
1. Write a function that throws an error if a negative number is passed.
2. Handle a fetch request to an invalid URL with \`try-catch\`.
3. Create a custom error for invalid email input.

## 9. Mini Project: Robust Calculator ✅
**Goal:** Handle divide by zero and invalid inputs.

\`\`\`javascript
function calculator(a, b, operation) {
  try {
    if(typeof a !== 'number' || typeof b !== 'number') {
      throw new Error("Inputs must be numbers");
    }
    switch(operation) {
      case 'add': return a+b;
      case 'sub': return a-b;
      case 'mul': return a*b;
      case 'div':
        if(b===0) throw new Error("Cannot divide by zero");
        return a/b;
      default: throw new Error("Invalid operation");
    }
  } catch(err) {
    return \`Error: \${err.message}\`;
  }
}

console.log(calculator(5, 0, 'div'));
console.log(calculator(5, 'a', 'add'));
\`\`\`
`,
  objectives: [
    "Learn to gracefully handle expected and unexpected errors.",
    "Understand the Error object and its properties.",
    "Throw standard and Custom Errors.",
    "Handle errors in asynchronous code correctly."
  ],
  difficulty: "intermediate",
  xpReward: 100
};
