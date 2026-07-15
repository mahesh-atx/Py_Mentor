export const chapter18OOP = {
  title: "8. Object-Oriented Concepts (Deep Dive)",
  slug: "js-18-oop",
  content: `
# JavaScript — Chapter 18: Object-Oriented Concepts (Deep Dive)

Object-Oriented Programming (OOP) in JavaScript allows structuring code using **classes, objects, and methods**, promoting reusability and maintainability.

## 1. Introduction to OOP
- OOP focuses on **objects** that contain data (properties) and behavior (methods).
- Core principles: **Encapsulation, Inheritance, Polymorphism**.

## 2. Classes and Objects

**Class Syntax**
\`\`\`javascript
class Person {
  constructor(name, age) {
    this.name = name;
    this.age = age;
  }
  greet() {
    console.log(\`Hi, I am \${this.name} and I am \${this.age} years old.\`);
  }
}
\`\`\`

**Creating Objects**
\`\`\`javascript
const mahesh = new Person('Mahesh', 22);
mahesh.greet(); // Hi, I am Mahesh and I am 22 years old.
\`\`\`

## 3. Constructor & Prototypes
- **Constructor:** Method called when creating a new object using \`new\`.
- **Prototype:** Shared methods across all instances.

\`\`\`javascript
function Car(brand) {
  this.brand = brand;
}

Car.prototype.start = function() {
  console.log(\`\${this.brand} started\`);
}

const tesla = new Car("Tesla");
tesla.start(); // Tesla started
\`\`\`

## 4. \`this\`, \`call\`, \`apply\`, \`bind\`
- **this:** Refers to the current object context.
- **call:** Calls a function with a given \`this\` and arguments.
- **apply:** Similar to call but arguments as array.
- **bind:** Returns a new function with bound \`this\`.

\`\`\`javascript
const person = { name: 'Mahesh' };

function greet(age, city) {
  console.log(\`Hi, I am \${this.name}, \${age} years old from \${city}\`);
}

greet.call(person, 22, 'Pune');
greet.apply(person, [22, 'Pune']);

const boundGreet = greet.bind(person);
boundGreet(22, 'Pune');
\`\`\`

## 5. More OOP Topics

**Class Expression**
\`\`\`javascript
const Animal = class {
  constructor(type) { this.type = type; }
  sound() { console.log(\`\${this.type} makes sound\`); }
};

const dog = new Animal("Dog");
dog.sound();
\`\`\`

**Inheritance**
\`\`\`javascript
class Animal {
  constructor(name) { this.name = name; }
  speak() { console.log(\`\${this.name} makes a sound\`); }
}

class Dog extends Animal {
  speak() { console.log(\`\${this.name} barks\`); }
}

const dog = new Dog('Rex');
dog.speak(); // Rex barks
\`\`\`

**Getter & Setter**
\`\`\`javascript
class Student {
  constructor(name) { this._name = name; }
  get name() { return this._name; }
  set name(value) { this._name = value; }
}

const s = new Student("Mahesh");
console.log(s.name);
s.name = "Aman";
console.log(s.name);
\`\`\`

## 6. Exercises
1. Create a class \`Rectangle\` with width, height and a method to calculate area.
2. Implement inheritance with \`Rectangle\` → \`Square\`.
3. Use \`call\` to borrow a method from another object.
4. Create a class with getter and setter for a property.

## 7. Mini Project: Library Management ✅
**Goal:** Manage books using OOP concepts.

\`\`\`javascript
class Book {
  constructor(title, author) {
    this.title = title;
    this.author = author;
  }
  info() {
    console.log(\`\${this.title} by \${this.author}\`);
  }
}

class Library {
  constructor() {
    this.books = [];
  }
  addBook(book) {
    this.books.push(book);
  }
  showBooks() {
    this.books.forEach(b => b.info());
  }
}

const lib = new Library();
const book1 = new Book('JS Basics', 'John');
const book2 = new Book('Advanced JS', 'Mahesh');

lib.addBook(book1);
lib.addBook(book2);
lib.showBooks();
\`\`\`

> [!NOTE]
> **That's Chapter 18! You learned:** Classes & objects, Constructor & prototype, \`this\`, \`call\`, \`apply\`, \`bind\`, Class expressions & inheritance, Getter & setter, Built a library management system.
`,
  objectives: [
    "Understand Object-Oriented Programming (OOP) principles in JavaScript.",
    "Create and instantiate Classes.",
    "Understand prototypical inheritance and the 'this' keyword.",
    "Use call, apply, and bind to manipulate function context."
  ],
  difficulty: "advanced",
  xpReward: 200
};
