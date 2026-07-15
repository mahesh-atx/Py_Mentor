export const chapter12Loops = {
  title: "2. Loops & Conditionals in JavaScript",
  slug: "js-12-loops",
  content: `
# Chapter 12 — Loops & Conditionals in JavaScript

## Learning objectives
By the end of this chapter you will be able to:
- Use conditional statements (\`if\`, \`else if\`, \`else\`, ternary, \`switch\`) to control program flow.
- Write and reason about the main loop types in JavaScript (\`for\`, \`while\`, \`do...while\`, \`forEach\`, \`for...in\`, \`for...of\`).
- Understand recursion and when to use it.
- Use loop control statements (\`break\`, \`continue\`) correctly.
- Avoid common pitfalls (off-by-one errors, mutating while iterating, infinite loops).

## 1. Conditionals

### \`if\`, \`else if\`, \`else\`

**Syntax & example**
\`\`\`javascript
const age = 20;
if (age >= 18) {
  console.log('Adult');
} else if (age >= 13) {
  console.log('Teen');
} else {
  console.log('Child');
}
\`\`\`

**Notes:**
- Conditions are expressions that evaluate to truthy/falsy values.
- Use \`===\` for strict equality to avoid type-coercion surprises (\`==\` does type coercion).

**Truthy / Falsy quick list:**
- **Falsy:** \`false\`, \`0\`, \`''\` (empty string), \`null\`, \`undefined\`, \`NaN\`
- **Everything else is truthy:** (including \`'0'\`, \`[]\`, \`{}\`, functions).

### Ternary operator
Compact conditional expression useful for short assignments.

\`\`\`javascript
const message = age >= 18 ? 'Adult' : 'Not adult';
\`\`\`
> [!WARNING]
> Avoid long or nested ternaries — they hurt readability.

### \`switch\` statement
Good for checking one expression against many values.

\`\`\`javascript
switch (day) {
  case 'Mon':
    console.log('Start week');
    break;
  case 'Fri':
    console.log('Weekend soon');
    break;
  default:
    console.log('Other day');
}
\`\`\`

**Notes:**
- \`switch\` uses strict comparison (\`===\`).
- Remember \`break\` to avoid "fall-through" unless you intentionally want it.

## 2. Loops
Loops repeat actions. Choose the loop that best expresses the intent.

### \`for\` loop
Classic indexed loop.

\`\`\`javascript
for (let i = 0; i < 5; i++) {
  console.log(i);
}
\`\`\`

**Pattern for arrays (safe length caching):**
\`\`\`javascript
for (let i = 0, len = arr.length; i < len; i++) {
  console.log(arr[i]);
}
\`\`\`
This avoids recalculating \`arr.length\` on each iteration in older engines (micro-optimization).

### \`while\` loop
\`\`\`javascript
let i = 0;
while (i < 3) {
  console.log(i);
  i++;
}
\`\`\`

### \`do...while\` loop
Runs body at least once.

\`\`\`javascript
let j = 0;
do {
  console.log(j);
  j++;
} while (j < 1);
\`\`\`

### \`forEach\` (array method)
\`\`\`javascript
[1,2,3].forEach((value, index) => {
  console.log(value, index);
});
\`\`\`

**Important differences:**
- \`forEach\` accepts a callback and **cannot** be exited early with \`break\` or \`continue\` — to break, use a \`for\` loop or \`some()\` / \`every()\` pattern.
- \`forEach\` callback receives \`(value, index, array)\` and an optional \`thisArg\`.

### \`for...in\` vs \`for...of\`
- \`for...in\` iterates **enumerable property keys** (strings) — often used for objects.
- \`for...of\` iterates **iterable values** (arrays, strings, Maps, Sets).

\`\`\`javascript
const arr = ['a','b'];
for (const i in arr) console.log(i); // '0', '1' (keys as strings)
for (const v of arr) console.log(v); // 'a', 'b' (values)

const obj = {a:1, b:2};
for (const k in obj) console.log(k, obj[k]);
\`\`\`

> [!WARNING]
> \`for...in\` will also iterate inherited enumerable properties. Use \`Object.keys()\` or \`Object.entries()\` for a safe object iteration.

**Iterator example (\`for...of\`) with Map/Set**
\`\`\`javascript
const s = new Set([1,2,3]);
for (const v of s) console.log(v);

const m = new Map([['a',1], ['b',2]]);
for (const [k,v] of m) console.log(k, v);
\`\`\`

## Recursion
A function that calls itself. Useful for tree-like structures, divide & conquer.

\`\`\`javascript
function factorial(n) {
  if (n <= 1) return 1;
  return n * factorial(n - 1);
}
\`\`\`

**Always have a base case** to avoid infinite recursion.
*Note: JavaScript engines may not reliably optimize tail recursion — recursion depth still matters.*

## Loop control: \`break\` and \`continue\`
- \`break\` exits the nearest loop.
- \`continue\` skips to the next iteration.

\`\`\`javascript
for (let i=0;i<10;i++){
  if (i === 5) break;
  if (i % 2 === 0) continue; // skip even
  console.log(i);
}
\`\`\`

> [!TIP]
> To emulate \`break\` in \`forEach\`, use a thrown error or switch to a \`for\` / \`for...of\` loop — but throwing for control flow is not recommended.

## 3. Common pitfalls & best practices
- **Off-by-one errors:** double-check loop boundaries (\`<\` vs \`<=\`).
- **Modifying an array while iterating** can skip items — iterate backwards when removing elements.
\`\`\`javascript
for (let i = arr.length - 1; i >= 0; i--) {
  if (shouldRemove(arr[i])) arr.splice(i, 1);
}
\`\`\`
- **Infinite loops:** always ensure loop termination conditions are reachable.
- **Prefer \`for...of\`** for arrays when you need values, \`for\` when you need index control.
- **Use descriptive variable names** (\`i\`, \`j\` only for tiny loops). Keep loops small and focused.

## 4. Exercises (Practice problems)

**Easy**
1. **FizzBuzz (1–30):** Print numbers 1–30; for multiples of 3 print \`Fizz\`, for multiples of 5 print \`Buzz\`, for both print \`FizzBuzz\`.
2. **Sum array:** Write \`sum(arr)\` that returns sum of number array.
3. **Find max:** Implement \`max(arr)\`.
4. **Reverse string:** Write \`reverse(str)\` using a loop (not \`split\` / \`reverse\`).

**Medium**
1. **Flatten one-level:** \`flattenOnce(arr)\` — flattens an array with nested arrays only one level deep.
2. **Count chars:** \`countChars(str)\` returns an object \`{char: count}\` for a string.
3. **Range:** \`range(start, end, step=1)\` returns an array from start to end inclusive using loops.
4. **First duplicate:** Given an array, return the first duplicated value (or \`null\`). Must stop as soon as found.

**Harder**
1. **Implement \`map\`:** \`myMap(arr, fn)\` returns new array — do not use built-in \`map\`.
2. **Remove duplicates (no Set):** \`unique(arr)\` using objects/maps and loops.
3. **Recursive sum:** Implement \`recursiveSum(arr)\` that returns the sum using recursion (assume arr of numbers).
4. **Chunk:** \`chunk(arr, size)\` — split array into chunks of \`size\`.
`,
  objectives: [
    "Master flow control with conditionals (if/else/switch).",
    "Understand difference between for, while, and do-while loops.",
    "Solve common algorithm challenges (FizzBuzz, Find Max, Recursion)."
  ],
  difficulty: "beginner",
  xpReward: 100
};
