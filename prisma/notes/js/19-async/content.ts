export const chapter19Async = {
  title: "9. Asynchronous Programming (Deep Dive)",
  slug: "js-19-async",
  content: `
# JavaScript — Chapter 19: Asynchronous Programming (Deep Dive)

Asynchronous programming allows JavaScript to **perform tasks without blocking the main thread**, e.g., fetching data from servers or handling timers.

## 1. Introduction to Asynchrony
- JavaScript is **single-threaded**, but asynchronous operations prevent UI freezing.
- Examples: API calls, timers, reading files.

**Synchronous vs Asynchronous**

\`\`\`javascript
// Synchronous
console.log("Start");
console.log("Middle");
console.log("End");

// Asynchronous
console.log("Start");
setTimeout(() => console.log("Middle"), 2000);
console.log("End");
\`\`\`

**Output of Asynchronous code:**
\`\`\`text
Start
End
Middle
\`\`\`

## 2. Callbacks
A **callback** is a function passed as an argument to another function.

\`\`\`javascript
function greet(name, callback) {
  console.log("Hello " + name);
  callback();
}

greet("Mahesh", () => console.log("Callback executed"));
\`\`\`

**Problem: Callback Hell**
Nested callbacks can become unreadable.
\`\`\`javascript
login(user, pass, (userData) => {
  fetchData(userData, (data) => {
    process(data, (result) => {
      display(result);
    });
  });
});
\`\`\`

## 3. Promises
**Promises** represent future completion/failure of asynchronous operations.

**States:**
1. Pending
2. Resolved (fulfilled)
3. Rejected

\`\`\`javascript
const promise = new Promise((resolve, reject) => {
  let success = true;
  if(success) resolve("Task completed");
  else reject("Task failed");
});

promise
  .then(msg => console.log(msg))
  .catch(err => console.error(err));
\`\`\`

## 4. Async/Await
Cleaner syntax to handle promises.

\`\`\`javascript
function fetchData() {
  return new Promise(resolve => {
    setTimeout(() => resolve("Data fetched"), 2000);
  });
}

async function getData() {
  const data = await fetchData();
  console.log(data);
}

getData();
\`\`\`

## 5. \`setInterval\` & \`setTimeout\`
- \`setTimeout(callback, ms)\` → Execute once after delay.
- \`setInterval(callback, ms)\` → Execute repeatedly every ms.
- \`clearTimeout()\` / \`clearInterval()\` → Cancel timers.

\`\`\`javascript
let timer = setInterval(() => console.log("Hello"), 1000);
setTimeout(() => clearInterval(timer), 5000);
\`\`\`
*Output: Prints "Hello" 5 times at 1s interval.*

## 6. Exercises
1. Use \`setTimeout\` to log "Hello after 3 seconds".
2. Create a promise that resolves after 2 seconds with the message "Done".
3. Fetch data from \`https://jsonplaceholder.typicode.com/posts/1\` using \`async/await\`.
4. Use \`setInterval\` to count from 1 to 10, then stop.

## 7. Exercise Solutions
**1. setTimeout**
\`\`\`javascript
setTimeout(() => console.log("Hello after 3 seconds"), 3000);
\`\`\`

**2. Promise**
\`\`\`javascript
const promise = new Promise(resolve => setTimeout(() => resolve("Done"), 2000));
promise.then(msg => console.log(msg));
\`\`\`

**3. Fetch**
\`\`\`javascript
async function getPost() {
  const response = await fetch('https://jsonplaceholder.typicode.com/posts/1');
  const data = await response.json();
  console.log(data);
}
getPost();
\`\`\`

**4. Interval counter**
\`\`\`javascript
let count = 1;
let interval = setInterval(() => {
  console.log(count);
  if(count++ === 10) clearInterval(interval);
}, 1000);
\`\`\`

## 8. Mini Project: Random Quote Generator ✅
**Goal:** Fetch a random quote every 5 seconds.

**HTML:**
\`\`\`html
<div id="quote"></div>
\`\`\`

**JavaScript:**
\`\`\`javascript
const quoteDiv = document.getElementById("quote");

async function getQuote() {
  try {
    const response = await fetch('https://api.quotable.io/random');
    const data = await response.json();
    quoteDiv.textContent = \`\${data.content} — \${data.author}\`;
  } catch(err) {
    console.error(err);
  }
}

getQuote();
setInterval(getQuote, 5000);
\`\`\`

> [!NOTE]
> **That's Chapter 19! You learned:** Asynchronous programming concepts, Callbacks, Promises, \`async/await\`, Timers with \`setTimeout\` & \`setInterval\`, Built a random quote generator.
`,
  objectives: [
    "Understand the event loop and asynchronous nature of JavaScript.",
    "Solve the callback hell problem using Promises.",
    "Master the async/await syntax for cleaner asynchronous code.",
    "Use timers and intervals correctly."
  ],
  difficulty: "advanced",
  xpReward: 200
};
