export const basicTypeAnnotationsLesson = {
  title: "Basic Type Annotations & Function Annotations",
  slug: "basic-type-annotations",
  content: `# Basic Type Annotations & Function Annotations

## Variable Annotations

The syntax for annotating a variable is \`variable: type\` or \`variable: type = value\`.

\`\`\`python
# Basic primitive types
name: str = "Alice"
age: int = 25
height: float = 5.11
is_active: bool = True
nothing: None = None

# You can annotate WITHOUT assigning a value (just declares intent)
score: int   # Declared but not assigned yet

# Annotate and assign later
score = 95   # Now assigned
\`\`\`

### Built-in Collection Types (Python 3.9+)

In Python 3.9+, you can use built-in types directly for collections:

\`\`\`python
# Python 3.9+ - use built-ins directly
names: list[str] = ["Alice", "Bob", "Charlie"]
scores: dict[str, int] = {"Alice": 88, "Bob": 72}
coordinates: tuple[int, int] = (10, 20)
unique_ids: set[int] = {1, 2, 3}

# Nested collections
matrix: list[list[int]] = [[1, 2], [3, 4]]
config: dict[str, list[str]] = {"admins": ["alice", "bob"]}
\`\`\`

\`\`\`python
# Python 3.7-3.8 - must import from typing
from typing import List, Dict, Tuple, Set

names: List[str] = ["Alice", "Bob"]
scores: Dict[str, int] = {"Alice": 88}
coords: Tuple[int, int] = (10, 20)
unique: Set[int] = {1, 2, 3}
\`\`\`

## Function Annotations

### Parameter and Return Types

\`\`\`python
# Syntax: def function(param: type, ...) -> return_type:

def greet(name: str) -> str:
    return f"Hello, {name}!"

def add(a: int, b: int) -> int:
    return a + b

def divide(a: float, b: float) -> float:
    return a / b

def is_valid(email: str) -> bool:
    return "@" in email and "." in email.split("@")[1]

def print_info(name: str, age: int) -> None:  # No return value
    print(f"{name} is {age} years old")
\`\`\`

### Default Parameters with Annotations

\`\`\`python
def greet(name: str, greeting: str = "Hello") -> str:
    return f"{greeting}, {name}!"

def connect(host: str, port: int = 5432, timeout: float = 30.0) -> bool:
    print(f"Connecting to {host}:{port} (timeout: {timeout}s)")
    return True

# Can still use keyword arguments normally
result = greet("Alice")
result = greet("Bob", greeting="Hi")
result = connect("localhost", timeout=60.0)
\`\`\`

### *args and **kwargs Annotations

\`\`\`python
# *args - tuple of the specified type
def sum_all(*numbers: int) -> int:
    return sum(numbers)

# **kwargs - dict where values are the specified type
def create_tag(tag: str, **attributes: str) -> str:
    attrs = " ".join(f'{k}="{v}"' for k, v in attributes.items())
    return f"<{tag} {attrs}>" if attrs else f"<{tag}>"

print(sum_all(1, 2, 3, 4, 5))              # 15
print(create_tag("a", href="https://example.com", target="_blank"))
# <a href="https://example.com" target="_blank">
\`\`\`

## Common Annotation Patterns

### Functions with Multiple Parameters

\`\`\`python
from typing import Optional

def create_student(
    name: str,
    age: int,
    score: float,
    grade: str,
    email: Optional[str] = None,  # Optional means str or None
    active: bool = True
) -> dict[str, object]:
    return {
        "name": name,
        "age": age,
        "score": score,
        "grade": grade,
        "email": email,
        "active": active,
    }

student = create_student("Alice", 20, 88.5, "B")
student_with_email = create_student("Bob", 22, 72.0, "C", email="bob@example.com")
\`\`\`

### Class Method Annotations

\`\`\`python
class BankAccount:
    def __init__(self, owner: str, balance: float = 0.0) -> None:
        self.owner: str = owner
        self.balance: float = balance
        self.transactions: list[float] = []

    def deposit(self, amount: float) -> float:
        """Deposit money and return new balance."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        self.balance += amount
        self.transactions.append(amount)
        return self.balance

    def withdraw(self, amount: float) -> bool:
        """Withdraw money. Returns True if successful, False if insufficient funds."""
        if amount <= 0:
            raise ValueError("Amount must be positive")
        if amount > self.balance:
            return False
        self.balance -= amount
        self.transactions.append(-amount)
        return True

    def get_history(self) -> list[float]:
        return self.transactions.copy()

    @classmethod
    def from_dict(cls, data: dict[str, object]) -> "BankAccount":
        return cls(str(data["owner"]), float(data.get("balance", 0.0)))

    def __str__(self) -> str:
        return f"Account({self.owner}, \${self.balance:.2f})"
\`\`\`

## Accessing Annotations

\`\`\`python
def greet(name: str, age: int) -> str:
    return f"Hello {name}, you are {age}"

# Access annotations at runtime
print(greet.__annotations__)
# {'name': <class 'str'>, 'age': <class 'int'>, 'return': <class 'str'>}

# get_type_hints() resolves forward references and string annotations
import typing
hints = typing.get_type_hints(greet)
print(hints)
# {'name': <class 'str'>, 'age': <class 'int'>, 'return': <class 'str'>}

# Variable annotations on classes
class Point:
    x: int
    y: int

print(Point.__annotations__)
# {'x': <class 'int'>, 'y': <class 'int'>}
\`\`\`

## Forward References (Referring to Not-Yet-Defined Classes)

\`\`\`python
# Problem: Node refers to itself - class not defined yet when annotation is processed
class Node:
    def __init__(self, value: int, next_node: "Node") -> None:  # Use string!
        self.value = value
        self.next = next_node

# Python 3.10+ solution: from __future__ import annotations
from __future__ import annotations

class Node:
    def __init__(self, value: int, next_node: Node) -> None:  # No quotes needed!
        self.value = value
        self.next = next_node

# Two mutually-referencing classes
class Employee:
    def __init__(self, name: str, manager: "Manager") -> None:
        self.name = name
        self.manager = manager

class Manager:
    def __init__(self, name: str, team: list["Employee"]) -> None:
        self.name = name
        self.team = team
\`\`\`

## Practical Example: Fully Annotated Module

\`\`\`python
from typing import Optional
from datetime import datetime

class Task:
    """A task in a task management system."""

    _id_counter: int = 0   # Class variable annotation

    def __init__(
        self,
        title: str,
        description: str = "",
        priority: int = 1,
        due_date: Optional[datetime] = None
    ) -> None:
        Task._id_counter += 1
        self.id: int = Task._id_counter
        self.title: str = title
        self.description: str = description
        self.priority: int = priority
        self.due_date: Optional[datetime] = due_date
        self.completed: bool = False
        self.tags: list[str] = []

    def complete(self) -> None:
        self.completed = True

    def add_tag(self, tag: str) -> None:
        if tag not in self.tags:
            self.tags.append(tag)

    def is_overdue(self) -> bool:
        if self.due_date is None:
            return False
        return datetime.now() > self.due_date and not self.completed

    def to_dict(self) -> dict[str, object]:
        return {
            "id": self.id,
            "title": self.title,
            "description": self.description,
            "priority": self.priority,
            "completed": self.completed,
            "tags": self.tags,
        }

    def __str__(self) -> str:
        status = "✓" if self.completed else "○"
        return f"[{status}] Task #{self.id}: {self.title} (P{self.priority})"

class TaskManager:
    def __init__(self) -> None:
        self.tasks: list[Task] = []

    def add_task(self, task: Task) -> int:
        """Add a task and return its ID."""
        self.tasks.append(task)
        return task.id

    def get_task(self, task_id: int) -> Optional[Task]:
        """Get task by ID, returns None if not found."""
        for task in self.tasks:
            if task.id == task_id:
                return task
        return None

    def get_by_priority(self, priority: int) -> list[Task]:
        return [t for t in self.tasks if t.priority == priority]

    def get_pending(self) -> list[Task]:
        return [t for t in self.tasks if not t.completed]

    def complete_task(self, task_id: int) -> bool:
        task = self.get_task(task_id)
        if task:
            task.complete()
            return True
        return False

# Usage
manager = TaskManager()
t1 = Task("Write tests", "Unit tests for the API", priority=2)
t2 = Task("Deploy to prod", priority=1)
t3 = Task("Update docs", priority=3)

manager.add_task(t1)
manager.add_task(t2)
manager.add_task(t3)

t1.add_tag("testing")
t1.add_tag("backend")

manager.complete_task(1)

for task in manager.tasks:
    print(task)
print(f"Pending: {len(manager.get_pending())}")
\`\`\`

Output:
\`\`\`
[✓] Task #1: Write tests (P2)
[○] Task #2: Deploy to prod (P1)
[○] Task #3: Update docs (P3)
Pending: 2
\`\`\`

> [!TIP]
> Use the built-in types (\`list[str]\`, \`dict[str, int]\`) in Python 3.9+. For older Python, import from \`typing\` (\`List[str]\`, \`Dict[str, int]\`). Always annotate function signatures - parameters and return types. Use string literals \`"ClassName"\` for forward references or add \`from __future__ import annotations\` at the top of the file.`,
  objectives: [
    "Annotate variables with their types using the colon syntax.",
    "Annotate function parameters and return types.",
    "Use built-in collection types like list[str] and dict[str, int].",
    "Handle default parameters, *args, and **kwargs with annotations.",
    "Use forward references with string literals for self-referencing classes."
  ],
  difficulty: "beginner",
  xpReward: 55,
};