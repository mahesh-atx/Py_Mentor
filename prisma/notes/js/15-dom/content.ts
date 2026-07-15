export const chapter15Dom = {
  title: "5. DOM Manipulation (Deep Dive)",
  slug: "js-15-dom",
  content: `
# JavaScript — Chapter 15: DOM Manipulation (Deep Dive)

The **Document Object Model (DOM)** allows JavaScript to interact with and manipulate the structure, style, and content of a webpage.

## 1. Introduction to DOM
- DOM is a **tree-like representation** of an HTML document.
- Every element, attribute, and text inside HTML is represented as a **node**.
- The \`document\` object is the **entry point** to the DOM.

**Example HTML:**
\`\`\`html
<!DOCTYPE html>
<html>
  <body>
    <h1 id="title">Hello World</h1>
    <p class="para">This is a paragraph.</p>
  </body>
</html>
\`\`\`

**JavaScript can access and modify these elements:**
\`\`\`javascript
const heading = document.getElementById("title");
heading.textContent = "Changed by JavaScript!";
\`\`\`

## 2. DOM Structure & Tree
- **Nodes:** Everything in the DOM (elements, attributes, text).
- **Elements:** HTML tags (\`<div>\`, \`<h1>\`).
- **Document:** The root object (\`document\`).

## 3. Fetching Elements
Methods to Select Elements:

**1. By ID:**
\`\`\`javascript
document.getElementById("title");
\`\`\`

**2. By Class Name:**
\`\`\`javascript
document.getElementsByClassName("para");
\`\`\`

**3. By Tag Name:**
\`\`\`javascript
document.getElementsByTagName("p");
\`\`\`

**4. Query Selector (returns first match):**
\`\`\`javascript
document.querySelector(".para");
\`\`\`

**5. Query Selector All (returns NodeList):**
\`\`\`javascript
document.querySelectorAll("p");
\`\`\`

## 4. DOM Tree Traversal

**Parent Node:**
\`\`\`javascript
const el = document.getElementById("title");
console.log(el.parentNode);
\`\`\`

**Child Nodes:**
\`\`\`javascript
console.log(el.childNodes);
\`\`\`

**First Child:**
\`\`\`javascript
console.log(el.firstChild);
\`\`\`

**Next Sibling:**
\`\`\`javascript
console.log(el.nextSibling);
\`\`\`

## 5. Manipulating DOM Elements

**innerHTML:**
\`\`\`javascript
document.getElementById("title").innerHTML = "<em>Italic Text</em>";
\`\`\`

**textContent:**
\`\`\`javascript
document.getElementById("title").textContent = "Plain Text";
\`\`\`

**Attributes:**
\`\`\`javascript
const link = document.querySelector("a");
link.setAttribute("href", "https://example.com");
console.log(link.getAttribute("href"));
\`\`\`

**Style Property:**
\`\`\`javascript
heading.style.color = "red";
heading.style.fontSize = "30px";
\`\`\`

**classList Methods:**
\`\`\`javascript
heading.classList.add("highlight");
heading.classList.remove("hidden");
heading.classList.toggle("active");
\`\`\`

## 6. Creating & Removing Elements

**Create Element:**
\`\`\`javascript
const newEl = document.createElement("p");
newEl.textContent = "I am new!";
document.body.appendChild(newEl);
\`\`\`

**Insert Before:**
\`\`\`javascript
const parent = document.body;
const ref = document.getElementById("title");
parent.insertBefore(newEl, ref);
\`\`\`

**Remove Element:**
\`\`\`javascript
parent.removeChild(ref);
\`\`\`

## 7. Exercises

**Q1:** Change the background color of a \`<div id="box">\` to blue using JavaScript.
**Answer:**
\`\`\`javascript
document.getElementById("box").style.backgroundColor = "blue";
\`\`\`

**Q2:** Add a new list item \`<li>JavaScript</li>\` to an existing \`<ul>\`.
**Answer:**
\`\`\`javascript
const ul = document.querySelector("ul");
const li = document.createElement("li");
li.textContent = "JavaScript";
ul.appendChild(li);
\`\`\`

**Q3:** Remove the last child of a \`<ul>\`.
**Answer:**
\`\`\`javascript
const ul = document.querySelector("ul");
ul.removeChild(ul.lastChild);
\`\`\`

## 8. Mini Project: Dynamic To-Do List ✅
**Goal:** Build a simple To-Do list where you can add and remove tasks.

**HTML:**
\`\`\`html
<input type="text" id="taskInput" placeholder="Enter task">
<button id="addBtn">Add Task</button>
<ul id="taskList"></ul>
\`\`\`

**JavaScript:**
\`\`\`javascript
const input = document.getElementById("taskInput");
const btn = document.getElementById("addBtn");
const list = document.getElementById("taskList");

btn.addEventListener("click", () => {
  const task = input.value;
  if(task === "") return;
  
  const li = document.createElement("li");
  li.textContent = task;
  
  // Add remove button
  const removeBtn = document.createElement("button");
  removeBtn.textContent = " ❌ ";
  removeBtn.onclick = () => list.removeChild(li);
  
  li.appendChild(removeBtn);
  list.appendChild(li);
  
  input.value = "";
});
\`\`\`
> [!TIP]
> Try extending it: Add \`edit\` functionality or save tasks in \`localStorage\`.

> [!NOTE]
> **That's the DOM Manipulation chapter! You've learned:** Selecting elements, Traversing DOM tree, Editing content & styles, Creating & deleting nodes, Building a To-Do list.
`,
  objectives: [
    "Understand the Document Object Model (DOM).",
    "Select, create, and remove HTML elements using JavaScript.",
    "Traverse the DOM tree (parents, children, siblings).",
    "Build a dynamic To-Do list UI."
  ],
  difficulty: "intermediate",
  xpReward: 200
};
