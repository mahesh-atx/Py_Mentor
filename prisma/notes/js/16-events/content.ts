export const chapter16Events = {
  title: "6. Event Handling (Deep Dive)",
  slug: "js-16-events",
  content: `
# JavaScript — Chapter 16: Event Handling (Deep Dive)

Event handling lets us make web pages **interactive**. An *event* is any user action (click, key press, scroll, etc.) or browser action (page load, resize).

## 1. What is an Event?
An event is a **signal** that something has happened.
- **User actions:** clicks, typing, scrolling
- **Browser actions:** page load, resize

**Example:**
\`\`\`html
<button id="btn">Click Me</button>
\`\`\`
\`\`\`javascript
const button = document.getElementById("btn");
button.addEventListener("click", () => {
  alert("Button Clicked!");
});
\`\`\`

## 2. Adding Event Listeners

**Syntax:**
\`\`\`javascript
element.addEventListener(event, callback);
\`\`\`

**Example:**
\`\`\`javascript
document.body.addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);
});
\`\`\`

## 3. Event Object & Properties
When an event occurs, JavaScript passes an **event object** with useful properties.

**Example:**
\`\`\`javascript
button.addEventListener("click", (event) => {
  console.log("Event Type:", event.type);
  console.log("Target Element:", event.target);
});
\`\`\`

## 4. Event Bubbling & Capturing
- **Bubbling:** Event travels from **child → parent** (default).
- **Capturing:** Event travels from **parent → child**.

**Example:**
\`\`\`html
<div id="parent">
  <button id="child">Click</button>
</div>
\`\`\`
\`\`\`javascript
const parent = document.getElementById("parent");
const child = document.getElementById("child");

parent.addEventListener("click", () => {
  console.log("Parent clicked!");
});

child.addEventListener("click", () => {
  console.log("Child clicked!");
});
\`\`\`
> [!TIP]
> If you click the child, both child & parent fire (bubbling).

## 5. Common Events

**Scroll Events**
\`\`\`javascript
window.addEventListener("scroll", () => {
  console.log("Scrolling...");
});
\`\`\`

**Mouse Events**
\`\`\`javascript
document.addEventListener("mousemove", (e) => {
  console.log(\`Mouse at (\${e.clientX}, \${e.clientY})\`);
});
\`\`\`

**Key Events**
\`\`\`javascript
document.addEventListener("keydown", (e) => {
  console.log("Key pressed:", e.key);
});
\`\`\`

## 6. Working with Forms & Input

**Example:**
\`\`\`html
<form id="myForm">
  <input type="text" name="username">
  <button type="submit">Submit</button>
</form>
\`\`\`
\`\`\`javascript
const form = document.getElementById("myForm");

form.addEventListener("submit", (e) => {
  e.preventDefault(); // Prevents page reload
  const data = new FormData(form);
  console.log("Username:", data.get("username"));
});
\`\`\`
> [!IMPORTANT]
> \`preventDefault()\` stops default browser actions (like reload on form submit).

## 7. Class Manipulation with Events
\`\`\`javascript
const box = document.querySelector("#box");

box.addEventListener("click", () => {
  box.classList.toggle("highlight");
});
\`\`\`

## 8. Browser Events

- **DOMContentLoaded:** Runs when HTML is loaded.
\`\`\`javascript
document.addEventListener("DOMContentLoaded", () => {
  console.log("DOM Ready");
});
\`\`\`

- **Load Event:** Runs when all resources (images, CSS, etc.) are loaded.
\`\`\`javascript
window.addEventListener("load", () => {
  console.log("Page fully loaded");
});
\`\`\`

- **Resize Event:**
\`\`\`javascript
window.addEventListener("resize", () => {
  console.log("Window resized");
});
\`\`\`

## 9. Exercises
**Q1: Log a message when the user scrolls the page.**
**Answer:**
\`\`\`javascript
window.addEventListener("scroll", () => console.log("User is scrolling!"));
\`\`\`

**Q2: Prevent a form from submitting and log the input value instead.**
**Answer:**
\`\`\`javascript
form.addEventListener("submit", (e) => {
  e.preventDefault();
  console.log(document.querySelector("input").value);
});
\`\`\`

**Q3: Change the background color of a \`div\` when the mouse hovers over it.**
**Answer:**
\`\`\`javascript
const div = document.querySelector("#hoverBox");
div.addEventListener("mouseover", () => div.style.background = "lightblue");
div.addEventListener("mouseout", () => div.style.background = "white");
\`\`\`

## 10. Mini Project: Interactive Form ✅
**Goal:** Build a simple login form with validation.

**HTML:**
\`\`\`html
<form id="loginForm">
  <input type="text" id="username" placeholder="Enter username">
  <input type="password" id="password" placeholder="Enter password">
  <button type="submit">Login</button>
  <p id="msg"></p>
</form>
\`\`\`

**JavaScript:**
\`\`\`javascript
const loginForm = document.getElementById("loginForm");
const msg = document.getElementById("msg");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();
  const user = document.getElementById("username").value;
  const pass = document.getElementById("password").value;

  if(user === "" || pass === "") {
    msg.textContent = "All fields are required!";
    msg.style.color = "red";
  } else if(pass.length < 6) {
    msg.textContent = "Password must be at least 6 characters!";
    msg.style.color = "orange";
  } else {
    msg.textContent = \`Welcome, \${user}!\`;
    msg.style.color = "green";
  }
});
\`\`\`
> [!TIP]
> Extend it: Save user data in \`localStorage\`, or show/hide password with a toggle button.

> [!NOTE]
> **That's the Event Handling chapter! You learned:** Adding event listeners, Bubbling & capturing, Form handling, Class toggling, Browser-level events, Built an interactive form.
`,
  objectives: [
    "Learn to capture and handle browser events.",
    "Understand event bubbling and capturing.",
    "Manipulate CSS classes dynamically based on user interaction.",
    "Handle forms and prevent default browser behaviors."
  ],
  difficulty: "intermediate",
  xpReward: 150
};
