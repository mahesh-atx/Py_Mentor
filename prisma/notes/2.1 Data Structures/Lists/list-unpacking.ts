export const listUnpackingLesson = {
  title: "List Unpacking",
  slug: "list-unpacking",
  content: `# List Unpacking

**List unpacking** (also called destructuring) lets you assign individual list items to separate variables in a single line. It is clean, readable, and very Pythonic.

## The Theory — Building the Logic

List unpacking works because Python lets an iterable on the right of an assignment be matched position by position to variables on the left. It is not list-specific magic — any iterable sequence can be unpacked the same way. The \`*\` operator collects a variable number of leftover items into a list, letting you split "the rest" without knowing its length in advance. The common pitfall is mismatching the number of variables and values, which raises a \`ValueError\` unless a star target absorbs the extra items.

## Basic Unpacking

\`\`\`python
coordinates = [10, 20, 30]

x, y, z = coordinates
print(x)   # Output: 10
print(y)   # Output: 20
print(z)   # Output: 30
\`\`\`

This is equivalent to:
\`\`\`python
x = coordinates[0]
y = coordinates[1]
z = coordinates[2]
\`\`\`

More examples:
\`\`\`python
fruits = ["apple", "banana", "cherry"]
first, second, third = fruits
print(first)    # Output: apple
print(second)   # Output: banana
print(third)    # Output: cherry
\`\`\`

\`\`\`python
# Unpack a date
date = [2024, 1, 15]
year, month, day = date
print(f"{year}-{month:02d}-{day:02d}")   # Output: 2024-01-15
\`\`\`

## The Number of Variables Must Match

\`\`\`python
numbers = [1, 2, 3]

a, b = numbers        # ValueError: too many values to unpack
a, b, c, d = numbers  # ValueError: not enough values to unpack
a, b, c = numbers     # Correct!
\`\`\`

## The Star Operator (*) - Catch the Rest

Use \`*\` before a variable name to collect the remaining items into a list:

\`\`\`python
numbers = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

first, *rest = numbers
print(first)   # Output: 1
print(rest)    # Output: [2, 3, 4, 5, 6, 7, 8, 9, 10]
\`\`\`

\`\`\`python
first, *middle, last = numbers
print(first)    # Output: 1
print(middle)   # Output: [2, 3, 4, 5, 6, 7, 8, 9]
print(last)     # Output: 10
\`\`\`

\`\`\`python
*beginning, second_last, last = numbers
print(beginning)     # Output: [1, 2, 3, 4, 5, 6, 7, 8]
print(second_last)   # Output: 9
print(last)          # Output: 10
\`\`\`

### Ignoring Values with _

Use \`_\` as a throwaway variable name for values you do not need:

\`\`\`python
data = ["Alice", 25, "New York", "Engineer", "alice@email.com"]

name, age, *_, email = data
print(name)    # Output: Alice
print(age)     # Output: 25
print(email)   # Output: alice@email.com
# city and job were ignored
\`\`\`

\`\`\`python
# Ignore the middle values
first, _, _, last = [10, 20, 30, 40]
print(first)   # Output: 10
print(last)    # Output: 40
\`\`\`

## Swapping Variables

Unpacking provides an elegant way to swap two variables:

\`\`\`python
a = 5
b = 10

# Traditional swap (needs temporary variable)
temp = a
a = b
b = temp

# Pythonic swap using unpacking
a, b = b, a
print(a, b)   # Output: 10 5
\`\`\`

\`\`\`python
# Sort two numbers without sort()
x = 8
y = 3
if x < y:
    x, y = y, x   # Ensure x is always the larger
print(f"Larger: {x}, Smaller: {y}")   # Output: Larger: 8, Smaller: 3
\`\`\`

## Unpacking in Loops

Very common pattern - unpacking tuples/lists inside a \`for\` loop:

\`\`\`python
students = [
    ["Alice", 88],
    ["Bob", 72],
    ["Charlie", 95]
]

for name, score in students:
    print(f"{name}: {score}")
\`\`\`

Output:
\`\`\`
Alice: 88
Bob: 72
Charlie: 95
\`\`\`

\`\`\`python
# With enumerate (unpacking the (index, value) tuple)
fruits = ["apple", "banana", "cherry"]

for index, fruit in enumerate(fruits, 1):
    print(f"{index}. {fruit}")
\`\`\`

\`\`\`python
# Unpacking in zip
names  = ["Alice", "Bob", "Charlie"]
scores = [88, 72, 95]
cities = ["New York", "London", "Paris"]

for name, score, city in zip(names, scores, cities):
    print(f"{name} from {city}: {score}")
\`\`\`

Output:
\`\`\`
Alice from New York: 88
Bob from London: 72
Charlie from Paris: 95
\`\`\`

## Unpacking Function Return Values

Functions that return lists or tuples can be unpacked directly:

\`\`\`python
def get_min_max(numbers):
    return [min(numbers), max(numbers)]

data = [5, 3, 8, 1, 9, 2, 7]
minimum, maximum = get_min_max(data)
print(f"Min: {minimum}, Max: {maximum}")   # Output: Min: 1, Max: 9
\`\`\`

\`\`\`python
def get_stats(numbers):
    return [min(numbers), max(numbers), sum(numbers)/len(numbers)]

low, high, average = get_stats([85, 92, 78, 95, 88])
print(f"Low: {low}, High: {high}, Avg: {average:.1f}")
# Output: Low: 78, High: 95, Avg: 87.6
\`\`\`

## Nested Unpacking

\`\`\`python
# Unpack nested structure
data = [1, [2, 3], 4]
a, (b, c), d = data
print(a, b, c, d)   # Output: 1 2 3 4

# Unpack a 2D point
points = [[1, 2], [3, 4]]
(x1, y1), (x2, y2) = points
print(f"Point 1: ({x1}, {y1})")   # Output: Point 1: (1, 2)
print(f"Point 2: ({x2}, {y2})")   # Output: Point 2: (3, 4)
\`\`\`

## Practical Example: CSV Record Processor

\`\`\`python
records = [
    ["Alice Johnson", "28", "Engineering", "95000"],
    ["Bob Smith",     "34", "Marketing",   "72000"],
    ["Charlie Brown", "22", "Intern",      "35000"],
]

print(f"{'Name':<20} {'Age':>5} {'Dept':<15} {'Salary':>10}")
print("-" * 55)

for record in records:
    name, age, dept, salary = record
    salary_num = int(salary)
    print(f"{name:<20} {age:>5} {dept:<15} \${salary_num:>9,}")

print("-" * 55)

all_salaries = [int(r[3]) for r in records]
total_salary = sum(all_salaries)
print(f"{'Total Payroll':<41} \${total_salary:>9,}")
\`\`\`

Output:
\`\`\`
Name                  Age Dept            Salary
-------------------------------------------------------
Alice Johnson          28 Engineering     $ 95,000
Bob Smith              34 Marketing       $ 72,000
Charlie Brown          22 Intern          $ 35,000
-------------------------------------------------------
Total Payroll                             $202,000
\`\`\`

> [!TIP]
> List unpacking makes your code more readable by giving meaningful names to positions in a list. Use \`*variable\` to capture multiple remaining items. Use \`_\` for values you want to ignore. Unpacking in loops (\`for name, score in students\`) is especially clean and Pythonic.`,
  objectives: [
    "Unpack a list into individual variables in one line.",
    "Use the * operator to capture remaining elements.",
    "Use _ to ignore unwanted values during unpacking.",
    "Swap two variables using unpacking.",
    "Apply unpacking in for loops with enumerate() and zip()."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};