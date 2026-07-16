export const listVsArrayLesson = {
  title: "List vs Array",
  slug: "list-vs-array",
  content: `# List vs Array

Python has both **lists** (built-in) and **arrays** (from the \`array\` module or \`numpy\`). Understanding when to use each is important. Under the hood, a Python list is a resizable array of object references (so it mixes types but costs memory per item), while \`array\`/\`numpy\` store raw values compactly in one declared type and NumPy adds vectorized operations. The pitfall is assuming lists are automatically fast for math — they aren't, and a typed array can no longer mix data types.

## Python Lists - The Default Choice

Lists are Python's built-in sequence type. They are flexible, easy to use, and work for most situations.

\`\`\`python
# Lists can hold any mix of types
mixed = [1, "hello", 3.14, True, None]

# Easy to create and modify
numbers = [1, 2, 3, 4, 5]
numbers.append(6)
numbers.insert(0, 0)
print(numbers)   # Output: [0, 1, 2, 3, 4, 5, 6]
\`\`\`

## The array Module - Typed Arrays

The \`array\` module provides arrays that hold **only one type** of value. They use less memory than lists for large numeric data.

\`\`\`python
import array

# Create an array of integers ('i' = signed int)
int_array = array.array('i', [1, 2, 3, 4, 5])
print(int_array)         # Output: array('i', [1, 2, 3, 4, 5])
print(int_array[0])      # Output: 1
print(int_array[1:3])    # Output: array('i', [2, 3])

# Only integers allowed
int_array.append(6)      # OK
# int_array.append(3.14)  # TypeError - floats not allowed!
\`\`\`

### Type Codes for array Module

\`\`\`
Code    C Type           Python Type    Min Bytes
----    -----------      -----------    ---------
'b'     signed char      int            1
'B'     unsigned char    int            1
'i'     signed int       int            2
'I'     unsigned int     int            2
'l'     signed long      int            4
'f'     float            float          4
'd'     double           float          8
\`\`\`

\`\`\`python
import array

# Array of floats ('d' = double)
temps = array.array('d', [36.5, 37.0, 36.8, 37.2])
print(temps)    # Output: array('d', [36.5, 37.0, 36.8, 37.2])
print(sum(temps) / len(temps))   # Output: 36.875

# Array of bytes ('B' = unsigned char)
bytes_arr = array.array('B', [72, 101, 108, 108, 111])
print(bytes_arr.tobytes().decode())   # Output: Hello
\`\`\`

## NumPy Arrays - The Powerful Choice

For numerical computing, \`numpy\` arrays are the standard. They support mathematical operations on entire arrays at once (vectorization).

\`\`\`python
import numpy as np

# Create NumPy arrays
arr = np.array([1, 2, 3, 4, 5])
print(arr)          # Output: [1 2 3 4 5]
print(type(arr))    # Output: <class 'numpy.ndarray'>

# Mathematical operations on whole array at once
print(arr * 2)      # Output: [ 2  4  6  8 10]
print(arr + 10)     # Output: [11 12 13 14 15]
print(arr ** 2)     # Output: [ 1  4  9 16 25]
\`\`\`

\`\`\`python
import numpy as np

# Vectorized operations (no loop needed!)
prices = np.array([10.0, 25.0, 8.5, 14.99])
tax_rate = 0.08

prices_with_tax = prices * (1 + tax_rate)
print(prices_with_tax)   # Output: [10.8   27.    9.18  16.1892]

# Statistical functions
print(np.mean(prices))    # Output: 14.6225
print(np.std(prices))     # Output: 6.081...
print(np.max(prices))     # Output: 25.0
\`\`\`

### 2D NumPy Arrays (Matrices)

\`\`\`python
import numpy as np

matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(matrix)
# Output:
# [[1 2 3]
#  [4 5 6]
#  [7 8 9]]

print(matrix.shape)    # Output: (3, 3)
print(matrix.T)        # Transpose

# Matrix multiplication
a = np.array([[1, 2], [3, 4]])
b = np.array([[5, 6], [7, 8]])
print(np.dot(a, b))
# Output: [[19 22]
#           [43 50]]
\`\`\`

## Comparison: List vs array vs NumPy

\`\`\`
Feature              list        array       numpy
-------------------  ----------  ----------  ----------
Types allowed        Any         One type    One type
Memory efficiency    Low         High        High
Math operations      Manual      Manual      Vectorized
Multidimensional     Manual      No          Yes
Speed (math)         Slow        Medium      Very fast
Ease of use          Very easy   Easy        Moderate
Standard library     Yes         Yes         No (install)
Best for             General     Simple nums Scientific
\`\`\`

## Performance Comparison

\`\`\`python
import time
import array
import numpy as np

n = 1_000_000

# Python list - squaring each number
python_list = list(range(n))
start = time.time()
result = [x ** 2 for x in python_list]
list_time = time.time() - start

# NumPy array - squaring each number
numpy_arr = np.arange(n)
start = time.time()
result = numpy_arr ** 2
numpy_time = time.time() - start

print(f"List time  : {list_time:.4f} seconds")
print(f"NumPy time : {numpy_time:.4f} seconds")
print(f"NumPy is ~{list_time/numpy_time:.0f}x faster")
# NumPy is typically 10-100x faster for numerical operations
\`\`\`

## When to Use Which

\`\`\`python
# Use list when:
# - Storing mixed types
# - General purpose data storage
# - Small to medium sized data
# - Need list-specific methods (append, remove, etc.)
shopping_cart = ["apple", "milk", 2, True]
names = ["Alice", "Bob", "Charlie"]

# Use array module when:
# - Large amounts of numeric data, one type
# - Memory is a concern
# - No need for math operations
import array
sensor_readings = array.array('f', [1.1, 2.2, 3.3, 4.4])

# Use NumPy when:
# - Scientific/mathematical computing
# - Matrix operations
# - Need vectorized math (no loops)
# - Large numerical datasets
import numpy as np
image_pixels = np.zeros((1920, 1080, 3), dtype=np.uint8)
stock_prices = np.array([150.25, 152.30, 148.90, 153.45])
\`\`\`

## Memory Usage Comparison

\`\`\`python
import sys
import array
import numpy as np

n = 1000

python_list = list(range(n))
array_module = array.array('i', range(n))
numpy_array = np.arange(n, dtype=np.int32)

print(f"Python list : {sys.getsizeof(python_list):,} bytes")
print(f"array module: {array_module.buffer_info()[1] * array_module.itemsize:,} bytes")
print(f"NumPy array : {numpy_array.nbytes:,} bytes")
\`\`\`

Typical output:
\`\`\`
Python list : 8,056 bytes
array module: 4,000 bytes
NumPy array : 4,000 bytes
\`\`\`

## Practical Decision Guide

\`\`\`python
def choose_data_structure(description):
    """
    Quick guide for choosing between list, array, and numpy
    """
    print("Use PYTHON LIST when:")
    print("  - Storing mixed types (names, ages, flags)")
    print("  - General purpose collections")
    print("  - Small datasets")
    print()
    print("Use ARRAY MODULE when:")
    print("  - Large uniform numeric data (same type)")
    print("  - Memory efficiency matters")
    print("  - Simple sequential storage")
    print()
    print("Use NUMPY ARRAY when:")
    print("  - Mathematical/scientific computations")
    print("  - Matrix operations")
    print("  - Large numerical datasets")
    print("  - Need performance for math operations")

choose_data_structure("")
\`\`\`

> [!TIP]
> For most Python programs, the built-in **list** is what you need. Only reach for \`array\` module when memory is tight and you have lots of same-type numbers. Use **NumPy** when you are doing data science, machine learning, or any mathematical computing - it is dramatically faster for those use cases.`,
  objectives: [
    "Understand the difference between Python lists, array module arrays, and NumPy arrays.",
    "Know that Python lists accept any type while arrays require uniform types.",
    "Understand that NumPy arrays support vectorized mathematical operations.",
    "Know which structure to use based on your use case.",
    "Understand the memory and performance trade-offs."
  ],
  difficulty: "intermediate",
  xpReward: 55,
};
