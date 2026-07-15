export const chapter21Advanced = {
  title: "11. Advanced Concepts (Deep Dive)",
  slug: "js-21-advanced",
  content: `
# JavaScript — Chapter 21: Advanced Concepts

## 1. Throttling & Debouncing

- **Throttling:** Limits a function to execute **once in a specific interval**.
- **Debouncing:** Ensures a function executes **only after a delay since last call**.

**Debounce Example**
\`\`\`javascript
function debounce(fn, delay) {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  }
}

window.addEventListener('resize', debounce(() => console.log('Resized!'), 500));
\`\`\`

**Throttle Example**
\`\`\`javascript
function throttle(fn, limit) {
  let lastFunc;
  let lastRan;
  return function(...args) {
    if(!lastRan) {
      fn.apply(this, args);
      lastRan = Date.now();
    } else {
      clearTimeout(lastFunc);
      lastFunc = setTimeout(() => {
        if((Date.now() - lastRan) >= limit){
          fn.apply(this, args);
          lastRan = Date.now();
        }
      }, limit - (Date.now() - lastRan));
    }
  }
}
\`\`\`

## 2. JSON Handling

**Parse JSON:** Convert string to object
\`\`\`javascript
const jsonString = '{"name":"Mahesh","age":22}';
const obj = JSON.parse(jsonString);
console.log(obj.name); // Mahesh
\`\`\`

**Stringify JSON:** Convert object to string
\`\`\`javascript
const data = { name: "Mahesh", age: 22 };
const jsonStr = JSON.stringify(data);
console.log(jsonStr);
\`\`\`

## 3. Exercises
1. Implement a search input with **debounce** that logs value after 500ms.
2. Create a scroll event listener with **throttle** to log scroll position.
3. Parse a JSON string and update its property, then convert it back to string.

## 4. Mini Project: Live Search with Debounce ✅

**HTML:**
\`\`\`html
<input type="text" id="search" placeholder="Search...">
<div id="result"></div>
\`\`\`

**JavaScript:**
\`\`\`javascript
const search = document.getElementById('search');
const result = document.getElementById('result');

const debounce = (fn, delay) => {
  let timer;
  return function(...args) {
    clearTimeout(timer);
    timer = setTimeout(() => fn.apply(this, args), delay);
  };
};

function searchData() {
  result.textContent = \`You typed: \${search.value}\`;
}

search.addEventListener('input', debounce(searchData, 500));
\`\`\`

> [!NOTE]
> **That's Chapter 21! You learned:** Throttling & Debouncing, \`JSON.parse()\` & \`JSON.stringify()\`, and a Live search implementation using debouncing to optimize performance.
`,
  objectives: [
    "Understand the difference between Debouncing and Throttling.",
    "Implement Debounce and Throttle to optimize event listeners.",
    "Parse and Stringify JSON data safely."
  ],
  difficulty: "advanced",
  xpReward: 200
};
