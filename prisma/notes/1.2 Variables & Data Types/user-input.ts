export const userInputLesson = {
  title: "Input from User",
  slug: "user-input",
  content: `# Input from User

\`input()\` is the bridge from the keyboard to your program, and Python treats everything that crosses it as raw text by design, since it cannot know in advance what the user will type. A frequent pitfall is doing arithmetic directly on the result — it looks like \`25\` but is really \`"25"\`, so an addition will concatenate text or raise an error instead of computing a number.

## The input() Function

Programs become much more useful when they can interact with users. The \`input()\` function pauses your program and waits for the user to type something and press Enter. Whatever the user types is returned as a **string**.

### Basic Usage

\`\`\`python
name = input("What is your name? ")
print("Hello, " + name + "!")
\`\`\`

When you run this:
\`\`\`
What is your name? Alice
Hello, Alice!
\`\`\`

The text inside \`input()\` is called the **prompt** - it tells the user what to type.

### input() Always Returns a String

This is the most important thing to remember about \`input()\`:

\`\`\`python
age = input("Enter your age: ")
print(age)          # Output: 25  (looks like a number)
print(type(age))    # Output: <class 'str'>  (but it's a string!)
\`\`\`

Even if the user types a number, Python stores it as a string.

## Converting Input to a Number

To do math with user input, you must convert it using \`int()\` or \`float()\`.

### Converting to int

\`\`\`python
age_text = input("Enter your age: ")
age = int(age_text)

years_to_100 = 100 - age
print("You need " + str(years_to_100) + " more years to reach 100.")
\`\`\`

Or in one step:
\`\`\`python
age = int(input("Enter your age: "))
print("Next year you will be", age + 1)
\`\`\`

### Converting to float

\`\`\`python
price = float(input("Enter the price: "))
tax = price * 0.1
total = price + tax
print("Total with tax:", total)
\`\`\`

## Handling Input Errors

If the user types letters when you expect a number, your program will crash. You can handle this safely:

\`\`\`python
try:
    age = int(input("Enter your age: "))
    print("Valid age:", age)
except ValueError:
    print("That is not a valid number. Please enter digits only.")
\`\`\`

Run 1 (valid input):
\`\`\`
Enter your age: 25
Valid age: 25
\`\`\`

Run 2 (invalid input):
\`\`\`
Enter your age: hello
That is not a valid number. Please enter digits only.
\`\`\`

## Taking Multiple Inputs

### One by one

\`\`\`python
first_name = input("Enter your first name: ")
last_name = input("Enter your last name: ")
full_name = first_name + " " + last_name
print("Full name:", full_name)
\`\`\`

### Multiple values on one line (using split)

\`\`\`python
# User types: 10 20 30
numbers = input("Enter three numbers separated by spaces: ").split()
print(numbers)  # Output: ['10', '20', '30']  (list of strings)

# Convert to integers
a, b, c = int(numbers[0]), int(numbers[1]), int(numbers[2])
print(a + b + c)  # Output: 60
\`\`\`

Or more cleanly:
\`\`\`python
# map() applies int() to each value from split()
a, b, c = map(int, input("Enter three numbers: ").split())
print(a, b, c)
\`\`\`

## Practical Example: Simple Calculator

\`\`\`python
print("Simple Calculator")
print("------------------")

num1 = float(input("Enter first number: "))
num2 = float(input("Enter second number: "))

print("Sum:", num1 + num2)
print("Difference:", num1 - num2)
print("Product:", num1 * num2)
if num2 != 0:
    print("Division:", num1 / num2)
else:
    print("Cannot divide by zero!")
\`\`\`

Sample run:
\`\`\`
Simple Calculator
------------------
Enter first number: 15
Enter second number: 4
Sum: 19.0
Difference: 11.0
Product: 60.0
Division: 3.75
\`\`\`

## Practical Example: Personal Greeter

\`\`\`python
name = input("What is your name? ")
age = int(input("How old are you? "))
city = input("What city are you from? ")

print()
print("Nice to meet you, " + name + "!")
print("You are " + str(age) + " years old.")
print("You are from " + city + ".")
print("In 10 years, you will be " + str(age + 10) + " years old.")
\`\`\`

> [!TIP]
> Always remember: \`input()\` returns a string. If you need a number, convert it immediately using \`int()\` or \`float()\`. This is one of the most common mistakes beginners make.`,
  objectives: [
    "Use the input() function to get data from the user.",
    "Understand that input() always returns a string.",
    "Convert user input to int or float for numeric operations.",
    "Handle invalid user input gracefully.",
    "Take multiple inputs from the user."
  ],
  difficulty: "beginner",
  xpReward: 60,
};