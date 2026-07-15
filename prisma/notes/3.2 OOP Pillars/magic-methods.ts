export const magicMethodsLesson = {
  title: "Important Magic Methods",
  slug: "magic-methods",
  content: `# Important Magic Methods

Magic methods (also called dunder methods - **d**ouble **under**score) are special methods that Python calls automatically in response to specific operations. They give your objects superpowers.

## The Theory — Building the Logic

Magic (dunder) methods are Python's mechanism for letting your own objects plug into the language's built-in operations. When you write \`a + b\`, Python does not hardcode addition—it looks for a \`__add__\` method on \`a\` and calls it, passing \`b\` as an argument. This means operators like \`+\`, indexing with \`[]\`, and even \`len()\` are really just friendly syntax for ordinary method calls, so custom objects can feel "native" to the language. The dispatch is also cooperative: if the left object cannot handle the right one, it returns \`NotImplemented\` and Python tries the reflected method on the other side. A key pitfall is raising an error instead of returning \`NotImplemented\` for unsupported types, which blocks Python from falling back to the other object's operator.

## __add__, __sub__, __mul__ - Arithmetic

\`\`\`python
class Money:
    """Represents monetary value with currency."""

    def __init__(self, amount, currency="USD"):
        self.amount = round(amount, 2)
        self.currency = currency

    def __add__(self, other):
        if isinstance(other, Money):
            if self.currency != other.currency:
                raise ValueError(f"Cannot add {self.currency} and {other.currency}")
            return Money(self.amount + other.amount, self.currency)
        if isinstance(other, (int, float)):
            return Money(self.amount + other, self.currency)
        return NotImplemented

    def __sub__(self, other):
        if isinstance(other, Money):
            return Money(self.amount - other.amount, self.currency)
        return NotImplemented

    def __mul__(self, factor):
        return Money(self.amount * factor, self.currency)

    def __rmul__(self, factor):    # For: factor * money
        return self.__mul__(factor)

    def __truediv__(self, divisor):
        return Money(self.amount / divisor, self.currency)

    def __str__(self):
        return f"\${self.amount:.2f} {self.currency}"

    def __repr__(self):
        return f"Money({self.amount}, {self.currency!r})"

price = Money(10.99)
tax   = Money(0.88)
total = price + tax
print(total)          # $11.87 USD
print(total * 3)      # $35.61 USD
print(4 * price)      # $43.96 USD
print(total / 2)      # $5.94 USD
\`\`\`

## __len__, __getitem__, __setitem__ - Container Behavior

\`\`\`python
class Matrix:
    """2D matrix that supports len() and [] indexing."""

    def __init__(self, rows, cols, default=0):
        self.rows = rows
        self.cols = cols
        self._data = [[default] * cols for _ in range(rows)]

    def __len__(self):
        """len(matrix) returns number of rows."""
        return self.rows

    def __getitem__(self, index):
        """matrix[row] returns a row, matrix[row, col] returns a cell."""
        if isinstance(index, tuple):
            row, col = index
            return self._data[row][col]
        return self._data[index]

    def __setitem__(self, index, value):
        """matrix[row, col] = value sets a cell."""
        if isinstance(index, tuple):
            row, col = index
            self._data[row][col] = value
        else:
            self._data[index] = value

    def __contains__(self, value):
        """value in matrix checks all cells."""
        return any(value in row for row in self._data)

    def __iter__(self):
        """for row in matrix - iterate rows."""
        return iter(self._data)

    def __str__(self):
        return "\\n".join([str(row) for row in self._data])

    def __repr__(self):
        return f"Matrix({self.rows}, {self.cols})"

m = Matrix(3, 3)
m[0, 0] = 1   # Set cell
m[1, 1] = 5
m[2, 2] = 9

print(len(m))       # 3 (number of rows)
print(m[0, 0])      # 1
print(m[1])         # [0, 5, 0]
print(5 in m)       # True
print(7 in m)       # False

for row in m:       # Iteration
    print(row)
\`\`\`

## __eq__, __lt__, __gt__ - Comparison

\`\`\`python
from functools import total_ordering

@total_ordering   # Auto-generates __le__, __ge__, __ne__ from __eq__ and __lt__
class Student:
    def __init__(self, name, gpa):
        self.name = name
        self.gpa = gpa

    def __eq__(self, other):
        if not isinstance(other, Student):
            return NotImplemented
        return self.gpa == other.gpa

    def __lt__(self, other):
        if not isinstance(other, Student):
            return NotImplemented
        return self.gpa < other.gpa

    def __str__(self):
        return f"{self.name} (GPA: {self.gpa})"

    def __repr__(self):
        return f"Student({self.name!r}, {self.gpa})"

students = [
    Student("Charlie", 3.2),
    Student("Alice", 3.8),
    Student("Bob", 3.5),
    Student("Diana", 3.8),
]

print(sorted(students))             # Sorted by GPA
print(max(students))                # Highest GPA
print(min(students))                # Lowest GPA
print(students[0] < students[1])    # True (3.2 < 3.8)
print(students[1] == students[3])   # True (both 3.8)
\`\`\`

## __bool__ - Truth Value Testing

\`\`\`python
class Queue:
    def __init__(self):
        self._items = []

    def enqueue(self, item):
        self._items.append(item)

    def dequeue(self):
        return self._items.pop(0)

    def __len__(self):
        return len(self._items)

    def __bool__(self):
        """Queue is True if it has items, False if empty."""
        return len(self._items) > 0

    def __str__(self):
        return f"Queue({self._items})"

q = Queue()
print(bool(q))   # False (empty)

if not q:
    print("Queue is empty!")

q.enqueue("task1")
print(bool(q))   # True (has items)

if q:
    print("Queue has tasks!")

# Note: if __bool__ is not defined, Python uses __len__
# (truthy if len > 0, falsy if len == 0)
\`\`\`

## __enter__ and __exit__ - Context Managers

Context managers work with the \`with\` statement. They automatically run setup and teardown code.

\`\`\`python
# __enter__ runs when entering the 'with' block
# __exit__ runs when leaving the 'with' block (even if an exception occurs)

class Timer:
    """Times code execution."""
    import time

    def __init__(self, name=""):
        self.name = name

    def __enter__(self):
        import time
        self.start = time.perf_counter()
        print(f"Timer '{self.name}' started")
        return self   # The value returned is bound to the 'as' variable

    def __exit__(self, exc_type, exc_value, traceback):
        import time
        elapsed = time.perf_counter() - self.start
        print(f"Timer '{self.name}' finished: {elapsed:.4f}s")
        # Return True to suppress exceptions, False (or None) to propagate
        return False

# Using the context manager
with Timer("computation"):
    # Code inside the 'with' block
    result = sum(range(1_000_000))
    print(f"Sum: {result}")

# Timer prints elapsed time even if an exception occurs
\`\`\`

Output:
\`\`\`
Timer 'computation' started
Sum: 499999500000
Timer 'computation' finished: 0.0412s
\`\`\`

### File-Like Context Manager

\`\`\`python
class ManagedFile:
    """A file-like context manager."""

    def __init__(self, filename, mode="r"):
        self.filename = filename
        self.mode = mode
        self.file = None

    def __enter__(self):
        self.file = open(self.filename, self.mode)
        print(f"Opened {self.filename}")
        return self.file   # Returned to the 'as' variable

    def __exit__(self, exc_type, exc_val, exc_tb):
        if self.file:
            self.file.close()
            print(f"Closed {self.filename}")
        if exc_type:
            print(f"Exception occurred: {exc_type.__name__}: {exc_val}")
        return False   # Don't suppress exceptions

# Usage
with ManagedFile("example.txt", "w") as f:
    f.write("Hello, World!")
# File is automatically closed here

# With exception handling
try:
    with ManagedFile("nonexistent.txt", "r") as f:
        content = f.read()
except FileNotFoundError:
    print("File not found!")
\`\`\`

### Database Connection Context Manager

\`\`\`python
class DatabaseConnection:
    """Manages database connection lifecycle."""

    def __init__(self, host, database):
        self.host = host
        self.database = database
        self.connection = None
        self.transaction_active = False

    def __enter__(self):
        # Simulate connecting
        print(f"Connecting to {self.host}/{self.database}...")
        self.connection = f"<connection to {self.database}>"
        self.transaction_active = True
        print("Connection established. Transaction started.")
        return self

    def __exit__(self, exc_type, exc_val, exc_tb):
        if exc_type:
            # Exception occurred - rollback
            print(f"Error occurred: {exc_val}")
            print("Rolling back transaction...")
        else:
            # Success - commit
            print("Committing transaction...")

        self.transaction_active = False
        self.connection = None
        print("Connection closed.")
        return False   # Don't suppress exceptions

    def execute(self, query):
        if not self.connection:
            raise RuntimeError("Not connected!")
        print(f"Executing: {query}")
        return [{"id": 1, "name": "Alice"}]   # Simulated result

# Successful transaction
with DatabaseConnection("localhost", "mydb") as db:
    users = db.execute("SELECT * FROM users")
    db.execute("UPDATE users SET active = 1")
print()

# Failed transaction
try:
    with DatabaseConnection("localhost", "mydb") as db:
        db.execute("DELETE FROM users")
        raise ValueError("Something went wrong!")  # Simulated error
except ValueError:
    pass
\`\`\`

Output:
\`\`\`
Connecting to localhost/mydb...
Connection established. Transaction started.
Executing: SELECT * FROM users
Executing: UPDATE users SET active = 1
Committing transaction...
Connection closed.

Connecting to localhost/mydb...
Connection established. Transaction started.
Executing: DELETE FROM users
Error occurred: Something went wrong!
Rolling back transaction...
Connection closed.
\`\`\`

## __call__ - Make Objects Callable

\`\`\`python
class Multiplier:
    """An object that can be called like a function."""

    def __init__(self, factor):
        self.factor = factor

    def __call__(self, value):
        return value * self.factor

double = Multiplier(2)
triple = Multiplier(3)

print(double(5))    # 10  - calling the object like a function!
print(triple(5))    # 15
print(callable(double))   # True

# Use it like a function
numbers = [1, 2, 3, 4, 5]
print(list(map(double, numbers)))   # [2, 4, 6, 8, 10]
\`\`\`

## __hash__ - Dictionary Keys and Sets

\`\`\`python
class Point:
    def __init__(self, x, y):
        self.x = x
        self.y = y

    def __eq__(self, other):
        return isinstance(other, Point) and self.x == other.x and self.y == other.y

    def __hash__(self):
        """Makes Point usable as dictionary key and in sets."""
        return hash((self.x, self.y))   # Hash of a tuple

    def __str__(self):
        return f"({self.x}, {self.y})"

# Can use as dict key!
locations = {
    Point(0, 0): "Origin",
    Point(1, 0): "Right",
    Point(0, 1): "Up",
}
print(locations[Point(0, 0)])   # Origin

# Can use in sets!
points = {Point(1, 2), Point(3, 4), Point(1, 2)}
print(len(points))   # 2  (duplicates removed)
\`\`\`

> [!IMPORTANT]
> If you define \`__eq__\`, you should ALSO define \`__hash__\`. Python sets \`__hash__\` to \`None\` if you define \`__eq__\` without \`__hash__\`, making objects unhashable.

## Complete Magic Methods Reference

\`\`\`python
class FullExample:
    # Initialization
    def __init__(self): pass        # Called when creating object
    def __del__(self): pass         # Called when object is deleted

    # String representation
    def __str__(self): pass         # str(obj), print(obj)
    def __repr__(self): pass        # repr(obj), interactive shell
    def __format__(self, spec): pass # f"{obj:spec}"

    # Arithmetic
    def __add__(self, other): pass  # obj + other
    def __sub__(self, other): pass  # obj - other
    def __mul__(self, other): pass  # obj * other
    def __truediv__(self, other): pass  # obj / other
    def __floordiv__(self, other): pass # obj // other
    def __mod__(self, other): pass  # obj % other
    def __pow__(self, other): pass  # obj ** other
    def __neg__(self): pass         # -obj
    def __abs__(self): pass         # abs(obj)

    # Right-hand arithmetic (when obj is on the right)
    def __radd__(self, other): pass # other + obj
    def __rmul__(self, other): pass # other * obj

    # Augmented assignment
    def __iadd__(self, other): pass # obj += other
    def __imul__(self, other): pass # obj *= other

    # Comparison
    def __eq__(self, other): pass   # obj == other
    def __ne__(self, other): pass   # obj != other
    def __lt__(self, other): pass   # obj < other
    def __le__(self, other): pass   # obj <= other
    def __gt__(self, other): pass   # obj > other
    def __ge__(self, other): pass   # obj >= other

    # Container / sequence
    def __len__(self): pass         # len(obj)
    def __getitem__(self, key): pass # obj[key]
    def __setitem__(self, key, val): pass # obj[key] = val
    def __delitem__(self, key): pass # del obj[key]
    def __contains__(self, item): pass # item in obj
    def __iter__(self): pass        # iter(obj), for x in obj
    def __next__(self): pass        # next(obj)

    # Context manager
    def __enter__(self): pass       # with obj as x:
    def __exit__(self, *args): pass # end of with block

    # Callable
    def __call__(self, *args): pass # obj(args)

    # Hashing (for dict keys and sets)
    def __hash__(self): pass        # hash(obj)

    # Truth value
    def __bool__(self): pass        # bool(obj), if obj:
\`\`\`

## Practical Example: Interval Class

\`\`\`python
class Interval:
    """Represents a closed interval [start, end]."""

    def __init__(self, start, end):
        if start > end:
            raise ValueError(f"Start must be <= end: [{start}, {end}]")
        self.start = start
        self.end = end

    def __str__(self):
        return f"[{self.start}, {self.end}]"

    def __repr__(self):
        return f"Interval({self.start}, {self.end})"

    def __len__(self):
        return self.end - self.start

    def __contains__(self, value):
        return self.start <= value <= self.end

    def __iter__(self):
        """Allow iteration if interval is integer-based."""
        return iter(range(self.start, self.end + 1))

    def __eq__(self, other):
        if not isinstance(other, Interval):
            return NotImplemented
        return self.start == other.start and self.end == other.end

    def __lt__(self, other):
        return self.end < other.start  # self is entirely before other

    def __add__(self, other):
        """Union of two overlapping intervals."""
        if not self.overlaps(other):
            raise ValueError("Cannot union non-overlapping intervals")
        return Interval(min(self.start, other.start), max(self.end, other.end))

    def __and__(self, other):
        """Intersection of two intervals."""
        start = max(self.start, other.start)
        end = min(self.end, other.end)
        if start > end:
            return None
        return Interval(start, end)

    def overlaps(self, other):
        return not (self.end < other.start or other.end < self.start)

    def __bool__(self):
        return self.start != self.end

a = Interval(1, 10)
b = Interval(5, 15)
c = Interval(11, 20)

print(a)              # [1, 10]
print(len(a))         # 9
print(7 in a)         # True
print(15 in a)        # False
print(list(Interval(1, 5)))  # [1, 2, 3, 4, 5]

union = a + b
print(f"Union: {union}")         # Union: [1, 15]

intersection = a & b
print(f"Intersection: {intersection}")  # Intersection: [5, 10]

no_intersection = a & c
print(f"No intersection: {no_intersection}")  # No intersection: None
\`\`\`

> [!TIP]
> Return \`NotImplemented\` (not raise it!) from comparison and arithmetic methods when the other type is not supported. This lets Python try the reflected operation on the other object. Use \`@functools.total_ordering\` to avoid implementing all 6 comparison methods - just define \`__eq__\` and \`__lt__\`.`,
  objectives: [
    "Implement arithmetic magic methods like __add__, __mul__, and __neg__.",
    "Implement container magic methods: __len__, __getitem__, __contains__, __iter__.",
    "Implement comparison magic methods: __eq__, __lt__, __gt__.",
    "Create context managers using __enter__ and __exit__.",
    "Use __call__ to make objects callable like functions."
  ],
  difficulty: "advanced",
  xpReward: 80,
};