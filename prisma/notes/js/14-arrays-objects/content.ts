export const chapter14ArraysObjects = {
  title: "4. Arrays & Objects (Deep Dive)",
  slug: "js-14-arrays-objects",
  content: `
# JavaScript — Chapter 14: Arrays & Objects (Deep Dive)

## 1. Introduction
Arrays and Objects are the most common data structures in JavaScript. Arrays store ordered collections, while objects store key-value pairs.

## 2. Arrays in JavaScript

**Creating Arrays**
\`\`\`javascript
let arr1 = [1, 2, 3, 4];
let arr2 = new Array("a", "b", "c");
\`\`\`

**Accessing Elements**
\`\`\`javascript
let fruits = ["Apple", "Banana", "Mango"];
console.log(fruits[0]); // Apple
console.log(fruits[fruits.length - 1]); // Mango
\`\`\`

**Common Array Methods**
- \`push()\` → Add to end
- \`pop()\` → Remove from end
- \`shift()\` → Remove from start
- \`unshift()\` → Add to start
- \`indexOf()\` → Get index of element
- \`slice()\` → Copy part of array
- \`splice()\` → Add/remove elements
- \`reverse()\` → Reverse array
- \`sort()\` → Sort array
- \`join()\` → Convert to string
- \`toString()\` → Convert to string

\`\`\`javascript
let numbers = [1, 2, 3];
numbers.push(4); // [1,2,3,4]
numbers.pop(); // [1,2,3]
numbers.shift(); // [2,3]
numbers.unshift(0); // [0,2,3]
\`\`\`

**Higher-Order Methods**

- \`map()\`
\`\`\`javascript
let nums = [1, 2, 3];
let squares = nums.map(n => n * n); // [1,4,9]
\`\`\`

- \`filter()\`
\`\`\`javascript
let evens = nums.filter(n => n % 2 === 0); // [2]
\`\`\`

- \`reduce()\`
\`\`\`javascript
let sum = nums.reduce((acc, curr) => acc + curr, 0); // 6
\`\`\`

- \`some()\` / \`every()\`
\`\`\`javascript
console.log(nums.some(n => n > 2)); // true
console.log(nums.every(n => n > 0)); // true
\`\`\`

- \`forEach()\`
\`\`\`javascript
nums.forEach(n => console.log(n));
\`\`\`

**Array Destructuring**
\`\`\`javascript
let [first, second] = [10, 20];
console.log(first, second); // 10 20
\`\`\`

## 3. Iterating Over Arrays

- **For Loop**
\`\`\`javascript
for (let i = 0; i < nums.length; i++) {
  console.log(nums[i]);
}
\`\`\`

- **forEach**
\`\`\`javascript
nums.forEach(n => console.log(n));
\`\`\`

- **for...of**
\`\`\`javascript
for (let n of nums) console.log(n);
\`\`\`

## 4. Objects in JavaScript

**Creating Objects**
\`\`\`javascript
let person = { name: "Mahesh", age: 22, city: "Pune" };
\`\`\`

**Accessing Properties**
\`\`\`javascript
console.log(person.name); // Mahesh
console.log(person["age"]); // 22
\`\`\`

**Adding & Deleting Properties**
\`\`\`javascript
person.country = "India";
delete person.city;
\`\`\`

**Nested Objects**
\`\`\`javascript
let user = {
  name: "Mahesh",
  address: { city: "Pune", pin: 411001 }
};
console.log(user.address.city);
\`\`\`

**Traversing Objects**
\`\`\`javascript
for (let key in person) {
  console.log(key, person[key]);
}
\`\`\`

**Object Methods**
\`\`\`javascript
let car = {
  brand: "Tesla",
  start: function() {
    console.log(\`\${this.brand} started\`);
  }
};
car.start(); // Tesla started
\`\`\`

**Object Utilities**
- \`Object.keys(obj)\` → Get keys
- \`Object.values(obj)\` → Get values
- \`Object.entries(obj)\` → Key-value pairs
- \`Object.freeze(obj)\` → Prevent modifications
- \`Object.seal(obj)\` → Allow change but no new properties

**Object Destructuring**
\`\`\`javascript
let {name, age} = person;
console.log(name, age);
\`\`\`

**\`this\` Keyword**
\`this\` refers to the object that is calling the function.
\`\`\`javascript
let student = {
  name: "Aman",
  greet: function() { console.log(\`Hi, I am \${this.name}\`); }
};
student.greet();
\`\`\`

## 5. Timing Events

- \`setTimeout()\`
\`\`\`javascript
setTimeout(() => console.log("Hello after 2s"), 2000);
\`\`\`

- \`setInterval()\`
\`\`\`javascript
let count = 0;
let timer = setInterval(() => {
  console.log(++count);
  if (count === 5) clearInterval(timer);
}, 1000);
\`\`\`
> [!NOTE]
> \`clearTimeout()\` / \`clearInterval()\` cancel timers.

## 6. Exercises
1. Create an array of 5 fruits and print them using a \`for...of\` loop.
2. Write a function to find the maximum number in an array using \`reduce()\`.
3. Create an object for a book with properties (title, author, year) and log them.
4. Add a method to the book object that prints the book's details.
5. Write a program that uses \`setInterval()\` to print numbers 1–10.

## 7. Exercise Solutions

**1. Array of fruits**
\`\`\`javascript
let fruits = ["Apple", "Banana", "Mango", "Orange", "Grapes"];
for (let fruit of fruits) console.log(fruit);
\`\`\`

**2. Max number using reduce**
\`\`\`javascript
function maxNum(arr) {
  return arr.reduce((a, b) => a > b ? a : b);
}
\`\`\`

**3. Book object**
\`\`\`javascript
let book = { title: "JS Basics", author: "John", year: 2022 };
console.log(book.title, book.author, book.year);
\`\`\`

**4. Book details method**
\`\`\`javascript
book.details = function() {
  console.log(\`\${this.title} by \${this.author}, published in \${this.year}\`);
};
book.details();
\`\`\`

**5. SetInterval 1-10**
\`\`\`javascript
let num = 1;
let interval = setInterval(() => {
  console.log(num++);
  if (num > 10) clearInterval(interval);
}, 1000);
\`\`\`

## 8. Mini Project: To-Do List (Array + Object)
Build a simple to-do list using arrays & objects:

\`\`\`javascript
let todos = [];

function addTask(task) {
  todos.push({ task, completed: false });
}

function completeTask(index) {
  todos[index].completed = true;
}

function showTasks() {
  todos.forEach((todo, i) => {
    console.log(\`\${i + 1}. \${todo.task} - \${todo.completed ? "Done" : "Pending"}\`);
  });
}

addTask("Learn JavaScript");
addTask("Build Project");
completeTask(0);
showTasks();
\`\`\`
> [!TIP]
> Enhance it later with DOM to make an interactive webpage.
`,
  objectives: [
    "Master JavaScript Arrays and common manipulation methods.",
    "Understand Array higher-order functions (map, filter, reduce).",
    "Learn to create, traverse, and destructure Objects.",
    "Understand the 'this' keyword and timing events."
  ],
  difficulty: "intermediate",
  xpReward: 150
};
