export const operatorModuleLesson = {
  title: "operator Module",
  slug: "operator-module",
  content: `# operator Module

The \`operator\` module provides function equivalents of Python's built-in operators. These are faster than lambdas and work well with \`map()\`, \`filter()\`, \`sorted()\`, and \`functools.reduce()\`.

\`\`\`python
import operator
# or import specific functions
from operator import add, mul, lt, gt, itemgetter, attrgetter, methodcaller
\`\`\`

## Arithmetic Operator Functions

\`\`\`python
from operator import add, sub, mul, truediv, floordiv, mod, pow, neg, abs

print(add(5, 3))         # 8    (5 + 3)
print(sub(10, 4))        # 6    (10 - 4)
print(mul(3, 4))         # 12   (3 * 4)
print(truediv(10, 3))    # 3.333...  (10 / 3)
print(floordiv(10, 3))   # 3    (10 // 3)
print(mod(10, 3))        # 1    (10 % 3)
print(pow(2, 10))        # 1024 (2 ** 10)
print(neg(-5))           # 5    (-(-5))
print(abs(-7))           # 7    (abs(-7))

# With functools.reduce
from functools import reduce
numbers = [1, 2, 3, 4, 5]

print(reduce(add, numbers))   # 15  (1+2+3+4+5)
print(reduce(mul, numbers))   # 120 (1*2*3*4*5)
\`\`\`

## Comparison Operator Functions

\`\`\`python
from operator import eq, ne, lt, le, gt, ge

print(eq(5, 5))    # True   (5 == 5)
print(ne(5, 3))    # True   (5 != 3)
print(lt(3, 5))    # True   (3 < 5)
print(le(5, 5))    # True   (5 <= 5)
print(gt(7, 3))    # True   (7 > 3)
print(ge(5, 5))    # True   (5 >= 5)

# Useful with filter and sorted
numbers = [3, 1, 4, 1, 5, 9, 2, 6]

# Sort using operator functions
print(sorted(numbers, key=neg))    # Sort descending by negating

# Filter using partial + operator
from functools import partial
is_positive = partial(lt, 0)   # lt(0, x) means 0 < x
print(list(filter(is_positive, [-3, -1, 0, 2, 5])))   # [2, 5]
\`\`\`

## Logical and Bitwise Operator Functions

\`\`\`python
from operator import and_, or_, xor, not_, lshift, rshift

print(and_(0b1010, 0b1100))    # 8  (bitwise AND)
print(or_(0b1010, 0b1100))     # 14 (bitwise OR)
print(xor(0b1010, 0b1100))     # 6  (bitwise XOR)
print(not_(True))               # False
print(lshift(1, 4))             # 16 (1 << 4)
print(rshift(16, 2))            # 4  (16 >> 2)
\`\`\`

## itemgetter() - Get Items from Sequences or Dicts

\`itemgetter\` creates a callable that retrieves specific items. It is faster than lambda for dict/sequence access.

\`\`\`python
from operator import itemgetter

# Get single item
get_name = itemgetter("name")
get_score = itemgetter("score")

students = [
    {"name": "Alice",   "score": 88, "age": 25},
    {"name": "Bob",     "score": 72, "age": 30},
    {"name": "Charlie", "score": 95, "age": 22},
]

print(get_name(students[0]))    # Alice
print(get_score(students[2]))   # 95

# Sort by field using itemgetter (faster than lambda!)
by_name  = sorted(students, key=itemgetter("name"))
by_score = sorted(students, key=itemgetter("score"), reverse=True)

print([s["name"] for s in by_name])    # ['Alice', 'Bob', 'Charlie']
print([s["name"] for s in by_score])   # ['Charlie', 'Alice', 'Bob']

# Get multiple items at once
get_name_score = itemgetter("name", "score")
print(get_name_score(students[0]))   # ('Alice', 88)

# Sort by multiple fields
by_score_name = sorted(students, key=itemgetter("score", "name"))
\`\`\`

### itemgetter() with Sequences

\`\`\`python
from operator import itemgetter

# Works with lists, tuples, strings
data = [(3, "charlie"), (1, "alice"), (2, "bob")]

# Sort by first element (index 0)
sorted_by_num = sorted(data, key=itemgetter(0))
print(sorted_by_num)   # [(1, 'alice'), (2, 'bob'), (3, 'charlie')]

# Sort by second element (index 1)
sorted_by_name = sorted(data, key=itemgetter(1))
print(sorted_by_name)  # [(1, 'alice'), (2, 'bob'), (3, 'charlie')]

# Get multiple indices
get_01 = itemgetter(0, 1)
print(get_01((10, 20, 30)))   # (10, 20)

# With map
matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]
first_cols = list(map(itemgetter(0), matrix))
print(first_cols)   # [1, 4, 7]  (first column)
\`\`\`

## attrgetter() - Get Object Attributes

\`attrgetter\` creates a callable that retrieves attributes from objects.

\`\`\`python
from operator import attrgetter

class Student:
    def __init__(self, name, score, grade):
        self.name = name
        self.score = score
        self.grade = grade
    def __repr__(self):
        return f"Student({self.name}, {self.score})"

students = [
    Student("Charlie", 72, "C"),
    Student("Alice", 88, "B"),
    Student("Bob", 95, "A"),
]

get_name = attrgetter("name")
get_score = attrgetter("score")

print(get_name(students[0]))    # Charlie
print(get_score(students[1]))   # 88

# Sort by attribute
by_score = sorted(students, key=attrgetter("score"), reverse=True)
print(by_score)   # [Student(Bob, 95), Student(Alice, 88), Student(Charlie, 72)]

# Sort by multiple attributes
by_grade_score = sorted(students, key=attrgetter("grade", "score"))

# Nested attributes
class Department:
    def __init__(self, name, head):
        self.name = name
        self.head = head

class Person:
    def __init__(self, name, age):
        self.name = name
        self.age = age

dept = Department("Engineering", Person("Alice", 35))
get_head_name = attrgetter("head.name")   # Dotted path!
print(get_head_name(dept))   # Alice
\`\`\`

## methodcaller() - Call Methods on Objects

\`methodcaller\` creates a callable that calls a method on objects.

\`\`\`python
from operator import methodcaller

# Create method callers
upper = methodcaller("upper")
strip = methodcaller("strip")
split_by_comma = methodcaller("split", ",")

words = ["  hello  ", "  WORLD  ", "  python  "]
print(list(map(strip, words)))    # ['hello', 'WORLD', 'python']
print(list(map(upper, words)))    # ['  HELLO  ', '  WORLD  ', '  PYTHON  ']

csv_lines = ["Alice,25,London", "Bob,30,Paris"]
parsed = list(map(split_by_comma, csv_lines))
print(parsed)   # [['Alice', '25', 'London'], ['Bob', '30', 'Paris']]

# Sort using methodcaller
class Product:
    def __init__(self, name, price):
        self.name = name
        self.price = price
    def get_price(self):
        return self.price
    def __repr__(self):
        return f"Product({self.name}, \${self.price})"

products = [
    Product("Laptop", 999),
    Product("Mouse", 29),
    Product("Keyboard", 79),
]

# Sort using methodcaller to call get_price()
by_price = sorted(products, key=methodcaller("get_price"))
print(by_price)   # [Product(Mouse, $29), Product(Keyboard, $79), Product(Laptop, $999)]
\`\`\`

## operator vs lambda - Performance

\`\`\`python
from operator import add, itemgetter
from functools import reduce
import timeit

data = list(range(1000))
dicts = [{"val": i} for i in range(1000)]

# Summing: operator vs lambda
time_op  = timeit.timeit(lambda: reduce(add, data), number=10000)
time_lam = timeit.timeit(lambda: reduce(lambda a, b: a + b, data), number=10000)
print(f"operator.add: {time_op:.4f}s")
print(f"lambda add  : {time_lam:.4f}s")
# operator.add is typically 10-20% faster

# Sorting: itemgetter vs lambda
time_ig  = timeit.timeit(lambda: sorted(dicts, key=itemgetter("val")), number=1000)
time_lam = timeit.timeit(lambda: sorted(dicts, key=lambda d: d["val"]), number=1000)
print(f"itemgetter: {time_ig:.4f}s")
print(f"lambda    : {time_lam:.4f}s")
# itemgetter is typically 20-30% faster for sorting
\`\`\`

## Practical Example: Data Analysis with operator

\`\`\`python
from operator import itemgetter, attrgetter
from functools import reduce
import operator

sales_data = [
    {"product": "Laptop",   "price": 999, "quantity": 5,  "region": "North"},
    {"product": "Mouse",    "price":  30, "quantity": 50, "region": "South"},
    {"product": "Keyboard", "price":  80, "quantity": 20, "region": "North"},
    {"product": "Monitor",  "price": 350, "quantity": 8,  "region": "South"},
    {"product": "Headset",  "price":  60, "quantity": 30, "region": "North"},
]

# Add total revenue to each record
for item in sales_data:
    item["revenue"] = item["price"] * item["quantity"]

# Sort by revenue descending
by_revenue = sorted(sales_data, key=itemgetter("revenue"), reverse=True)

print("Top products by revenue:")
for rank, item in enumerate(by_revenue, 1):
    print(f"  #{rank} {item['product']:<12} \${item['revenue']:>8,}")

# Group by region and sum revenue (using only operator module tools)
north = list(filter(lambda x: x["region"] == "North", sales_data))
south = list(filter(lambda x: x["region"] == "South", sales_data))

north_revenue = reduce(operator.add, map(itemgetter("revenue"), north))
south_revenue = reduce(operator.add, map(itemgetter("revenue"), south))

print(f"\nNorth revenue: \${north_revenue:,}")
print(f"South revenue: \${south_revenue:,}")

# Find product with highest unit price
most_expensive = max(sales_data, key=itemgetter("price"))
print(f"Most expensive: {most_expensive['product']} (\${most_expensive['price']})")
\`\`\`

Output:
\`\`\`
Top products by revenue:
  #1 Laptop       $ 4,995
  #2 Monitor      $ 2,800
  #3 Mouse        $ 1,500
  #4 Headset      $ 1,800
  #5 Keyboard     $ 1,600

North revenue: $8,395
South revenue: $4,300
Most expensive: Laptop ($999)
\`\`\`

> [!TIP]
> Use \`itemgetter\` instead of \`lambda d: d['key']\` for faster sorting and map operations. Use \`attrgetter\` instead of \`lambda obj: obj.attr\` for objects. Use operator functions with \`reduce()\` for cleaner accumulation. These functions are not just cleaner - they are measurably faster than their lambda equivalents.`,
  objectives: [
    "Use operator functions (add, mul, lt) as function arguments.",
    "Use itemgetter() to efficiently access dict values or sequence elements.",
    "Use attrgetter() to access object attributes.",
    "Use methodcaller() to call methods on a sequence of objects.",
    "Understand that operator functions are faster than equivalent lambdas."
  ],
  difficulty: "intermediate",
  xpReward: 60,
};