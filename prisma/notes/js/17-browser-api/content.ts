export const chapter17BrowserAPI = {
  title: "7. Using Browser Functionalities (Deep Dive)",
  slug: "js-17-browser-api",
  content: `
# JavaScript — Chapter 17: Using Browser Functionalities (Deep Dive)

This chapter covers interacting with browser features through JavaScript using the **Browser Object Model (BOM)** and Web APIs.

## 1. Browser Object Model (BOM)
The BOM allows JavaScript to interact with the browser window and its components.

**Main BOM Objects:**
- \`window\` → The browser window
- \`navigator\` → Browser information
- \`history\` → Browser history
- \`location\` → Current URL information
- \`document\` → The DOM (covered earlier)

## 2. Window Object
\`\`\`javascript
console.log(window.innerWidth, window.innerHeight); // Size of the window
console.log(window.location.href); // Current URL
\`\`\`

**Navigation**
\`\`\`javascript
// Redirect to another page
window.location.href = "https://example.com";

// Reload the page
window.location.reload();
\`\`\`

**History**
\`\`\`javascript
// Go back
window.history.back();

// Go forward
window.history.forward();
\`\`\`

## 3. Working with Storage

**Local Storage**
Stores data permanently (even after browser is closed)
\`\`\`javascript
localStorage.setItem("username", "Mahesh");
console.log(localStorage.getItem("username"));
localStorage.removeItem("username");
localStorage.clear();
\`\`\`

**Session Storage**
Stores data for the current session only
\`\`\`javascript
sessionStorage.setItem("sessionName", "Mahesh");
console.log(sessionStorage.getItem("sessionName"));
sessionStorage.clear();
\`\`\`

**Cookies**
\`\`\`javascript
document.cookie = "username=Mahesh; expires=Fri, 31 Dec 2025 12:00:00 UTC; path=/";
console.log(document.cookie);
\`\`\`

## 4. Web APIs in DOM

**Fetch API (AJAX)**
Fetch data from server without page reload
\`\`\`javascript
fetch('https://jsonplaceholder.typicode.com/todos/1')
  .then(response => response.json())
  .then(data => console.log(data))
  .catch(err => console.error(err));
\`\`\`

**Using async/await**
\`\`\`javascript
async function getData() {
  try {
    let response = await fetch('https://jsonplaceholder.typicode.com/todos/1');
    let data = await response.json();
    console.log(data);
  } catch(err) {
    console.error(err);
  }
}
getData();
\`\`\`

## 5. Exercises
1. Save a user's favorite color in \`localStorage\` and retrieve it.
2. Redirect the browser to another page using \`window.location\`.
3. Fetch data from a public API and log it.
4. Set a cookie that expires in 1 day.

## 6. Mini Project: Simple Note App ✅
**Goal:** Use \`localStorage\` to save notes.

**HTML:**
\`\`\`html
<input type="text" id="noteInput" placeholder="Enter note">
<button id="addNote">Add Note</button>
<ul id="noteList"></ul>
\`\`\`

**JavaScript:**
\`\`\`javascript
const input = document.getElementById('noteInput');
const btn = document.getElementById('addNote');
const list = document.getElementById('noteList');

function loadNotes() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  list.innerHTML = '';
  
  notes.forEach((note, index) => {
    const li = document.createElement('li');
    li.textContent = note;
    
    const removeBtn = document.createElement('button');
    removeBtn.textContent = ' ❌ ';
    removeBtn.onclick = () => removeNote(index);
    
    li.appendChild(removeBtn);
    list.appendChild(li);
  });
}

function addNote() {
  const notes = JSON.parse(localStorage.getItem('notes') || '[]');
  notes.push(input.value);
  localStorage.setItem('notes', JSON.stringify(notes));
  input.value = '';
  loadNotes();
}

function removeNote(index) {
  const notes = JSON.parse(localStorage.getItem('notes'));
  notes.splice(index, 1);
  localStorage.setItem('notes', JSON.stringify(notes));
  loadNotes();
}

btn.addEventListener('click', addNote);
loadNotes();
\`\`\`

> [!NOTE]
> **That's Chapter 17! You learned:** BOM objects (window, navigator, history, location), Storage (localStorage, sessionStorage, cookies), Fetch API for AJAX requests, and built a persistent notes app.
`,
  objectives: [
    "Interact with the Browser Object Model (BOM).",
    "Understand the differences between LocalStorage, SessionStorage, and Cookies.",
    "Make network requests using the Fetch API.",
    "Build a persistent application using LocalStorage."
  ],
  difficulty: "intermediate",
  xpReward: 150
};
