export const numpyLesson = {
  title: "NumPy - Arrays, Operations & Vectorization",
  slug: "numpy",
  content: `# NumPy - Numerical Python

NumPy (Numerical Python) is the foundation of data science in Python. It provides fast, memory-efficient arrays and a vast library of mathematical operations that run at C speed.

## What is NumPy?

NumPy provides:
- **ndarray**: A fast, N-dimensional array object
- **Broadcasting**: Operations on arrays of different shapes
- **Vectorization**: Operations without explicit Python loops
- **Mathematical functions**: Linear algebra, statistics, Fourier transforms
- **C/C++ integration**: Bridge to low-level code

> [!NOTE]
> **Why this matters:** A Python list stores each number as a separate object, so doing math on a million numbers means a million Python-level operations. NumPy stores data in one contiguous block of memory and runs the math in compiled C — so the same operation is often **10–100× faster** and uses far less RAM. Almost every other data-science library (Pandas, Scikit-Learn, PyTorch) is built on top of NumPy arrays, so learning them well pays off everywhere.

## Installation

\`\`\`bash
pip install numpy
\`\`\`

## Creating Arrays

\`\`\`python
import numpy as np

# From a Python list
arr1 = np.array([1, 2, 3, 4, 5])
print(arr1)          # [1 2 3 4 5]
print(type(arr1))    # <class 'numpy.ndarray'>

# 2D array (matrix)
arr2 = np.array([[1, 2, 3], [4, 5, 6]])
print(arr2)
# [[1 2 3]
#  [4 5 6]]

# Arrays with specific values
zeros = np.zeros((3, 4))        # 3x4 array of zeros
ones = np.ones((2, 3))          # 2x3 array of ones
full = np.full((2, 2), 7)       # 2x2 array of 7s
identity = np.eye(3)            # 3x3 identity matrix

# Range-based arrays
range_arr = np.arange(0, 10, 2)   # [0, 2, 4, 6, 8]
linspace = np.linspace(0, 1, 5)   # [0, 0.25, 0.5, 0.75, 1]

# Random arrays
rand = np.random.rand(3, 3)       # Uniform [0, 1)
randn = np.random.randn(3, 3)     # Standard normal
randint = np.random.randint(1, 10, (3, 3))  # Random integers
\`\`\`

> [!TIP]
> **arange vs linspace** — use arange when you know the *step* (like Python's range), and linspace when you know the *number of points* you want between two ends. linspace(0, 1, 5) is guaranteed to include both 0 and 1.

## Array Attributes

\`\`\`python
arr = np.array([[1, 2, 3], [4, 5, 6]])

print(arr.shape)    # (2, 3) — dimensions
print(arr.ndim)     # 2 — number of dimensions
print(arr.size)     # 6 — total elements
print(arr.dtype)    # int64 — data type
print(arr.itemsize) # 8 — bytes per element
print(arr.nbytes) # 48 — total bytes
\`\`\`

> [!TIP]
> **\`shape\` is your best friend.** When an operation "doesn't work", the answer is almost always a shape mismatch. Print \`arr.shape\` whenever you're confused — it tells you the exact dimensions you're working with.

## Indexing & Slicing

\`\`\`python
arr = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90])

# Basic indexing
print(arr[0])     # 10
print(arr[-1])    # 90

# Slicing [start:stop:step]
print(arr[2:7])    # [30 40 50 60 70]
print(arr[::2])    # [10 30 50 70 90]
print(arr[::-1])   # [90 80 70 60 50 40 30 20 10]

# 2D indexing
matrix = np.array([[1, 2, 3], [4, 5, 6], [7, 8, 9]])
print(matrix[0, 1])     # 2 (row 0, col 1)
print(matrix[1, :])     # [4 5 6] (entire row 1)
print(matrix[:, 2])     # [3 6 9] (entire column 2)
print(matrix[0:2, 1:3]) # [[2 3], [5 6]] (sub-matrix)

# Boolean indexing
arr = np.array([1, 2, 3, 4, 5, 6, 7, 8])
mask = arr > 5
print(arr[mask])         # [6 7 8]
print(arr[arr % 2 == 0]) # [2 4 6 8] (even numbers)

# Fancy indexing
arr = np.array([10, 20, 30, 40, 50])
indices = [0, 2, 4]
print(arr[indices])      # [10 30 50]
\`\`\`

> [!WARNING]
> **Slices return a *view*, not a copy.** Modifying a slice changes the original array:
> \`\`\`python
> arr = np.array([1, 2, 3, 4])
> view = arr[1:3]
> view[0] = 99
> print(arr)   # [1 99 3 4]  ← original changed!
> \`\`\`
> If you need an independent copy, use \`arr.copy()\`.

## Broadcasting

Broadcasting lets you perform operations on arrays of different shapes without creating copies.

\`\`\`python
# Scalar broadcasting
arr = np.array([1, 2, 3, 4, 5])
print(arr + 10)   # [11 12 13 14 15]
print(arr * 2)    # [2 4 6 8 10]

# Array broadcasting
a = np.array([[1, 2, 3], [4, 5, 6]])    # Shape: (2, 3)
b = np.array([10, 20, 30])              # Shape: (3,)
print(a + b)
# [[11 22 33]
#  [14 25 36]]

# Column vector broadcasting
a = np.array([[1, 2, 3], [4, 5, 6]])    # Shape: (2, 3)
b = np.array([[10], [20]])              # Shape: (2, 1)
print(a + b)
# [[11 12 13]
#  [24 25 26]]
\`\`\`

> [!NOTE]
> **How broadcasting decides shapes:** NumPy aligns dimensions from the *right*. A \`(2, 1)\` vector is "stretched" to match a \`(2, 3)\` matrix because the trailing dimension \`1\` can broadcast to \`3\`. When shapes are incompatible (e.g. \`(2, 3)\` + \`(2, 4)\`), you get a \`ValueError\`. Broadcasting is why you rarely need loops when working with arrays.

## Vectorization

Vectorization means performing operations on entire arrays instead of using Python loops — it's much faster.

\`\`\`python
import time

# Slow: Python loop
def square_loop(arr):
    result = []
    for x in arr:
        result.append(x ** 2)
    return result

# Fast: NumPy vectorized
def square_vectorized(arr):
    return arr ** 2

# Performance comparison
data = np.arange(1000000)

start = time.time()
square_loop(data)
print(f"Loop: {time.time() - start:.4f}s")

start = time.time()
square_vectorized(data)
print(f"Vectorized: {time.time() - start:.4f}s")
# Vectorized is typically 10-100x faster!
\`\`\`

## Mathematical Operations

\`\`\`python
a = np.array([1, 2, 3, 4])
b = np.array([5, 6, 7, 8])

# Element-wise operations
print(a + b)     # [6 8 10 12]
print(a - b)     # [-4 -4 -4 -4]
print(a * b)     # [5 12 21 32]
print(a / b)     # [0.2 0.333... 0.428... 0.5]
print(a ** 2)    # [1 4 9 16]
print(a % 2)     # [1 0 1 0]

# Universal functions (ufuncs)
arr = np.array([0, np.pi/6, np.pi/4, np.pi/3, np.pi/2])
print(np.sin(arr))   # Sine
print(np.cos(arr))   # Cosine
print(np.exp(arr))   # Exponential
print(np.log(arr + 1))  # Natural log
print(np.sqrt(arr))  # Square root

# Aggregation functions
arr = np.array([[1, 2, 3], [4, 5, 6]])
print(np.sum(arr))       # 21
print(np.mean(arr))      # 3.5
print(np.std(arr))       # Standard deviation
print(np.min(arr))       # 1
print(np.max(arr))       # 6
print(np.median(arr))    # 3.5

# Axis-based aggregation
print(np.sum(arr, axis=0))  # [5 7 9] (sum along rows)
print(np.sum(arr, axis=1))  # [6 15] (sum along columns)
print(np.mean(arr, axis=0)) # [2.5 3.5 4.5]
\`\`\`

## Real-World Example: Normalizing Sensor Readings

Imagine you collect temperature readings from 3 sensors over 4 days, and you want each sensor's values on a 0–1 scale for fair comparison.

\`\`\`python
import numpy as np

# Rows = days, columns = sensor A, B, C
readings = np.array([
    [22.1, 18.5, 30.2],
    [21.8, 19.0, 31.0],
    [23.0, 17.9, 29.5],
    [22.4, 18.8, 30.8],
])

# Min-max normalize each sensor (column) independently
col_min = readings.min(axis=0)
col_max = readings.max(axis=0)
normalized = (readings - col_min) / (col_max - col_min)

print(normalized)
# Every column now ranges from 0.0 to 1.0
\`\`\`

Notice how a single vectorized expression \`(readings - col_min) / (col_max - col_min)\` replaces what would otherwise be nested loops — and \`axis=0\` tells NumPy to compute the min/max *per column* rather than over the whole array.

## Your Turn!

1. Create a 3×3 identity matrix with \`np.eye(3)\` and multiply it by a vector — confirm the vector is unchanged.
2. Generate 1,000,000 random numbers with \`np.random.randn\` and compute the mean and standard deviation. How do they compare to \`0\` and \`1\`?
3. Take \`arr = np.array([5, 2, 9, 1, 7])\` and use boolean indexing to keep only values greater than the median.

## Linear Algebra

\`\`\`python
A = np.array([[1, 2], [3, 4]])
B = np.array([[5, 6], [7, 8]])

# Matrix multiplication
print(np.dot(A, B))       # or A @ B
# [[19 22]
#  [43 50]]

# Transpose
print(A.T)
# [[1 3]
#  [2 4]]

# Inverse
print(np.linalg.inv(A))
# [[-2.   1. ]
#  [ 1.5 -0.5]]

# Determinant
print(np.linalg.det(A))   # -2.0

# Eigenvalues and eigenvectors
eigenvalues, eigenvectors = np.linalg.eig(A)
print(eigenvalues)

# Solve linear equations: Ax = b
A = np.array([[2, 1], [1, 3]])
b = np.array([4, 5])
x = np.linalg.solve(A, b)
print(x)  # Solution to the system
\`\`\`

## Reshaping Arrays

\`\`\`python
arr = np.arange(12)
print(arr)  # [0 1 2 3 4 5 6 7 8 9 10 11]

# Reshape
reshaped = arr.reshape(3, 4)
print(reshaped)
# [[0 1 2 3]
#  [4 5 6 7]
#  [8 9 10 11]]

# Flatten
print(reshaped.flatten())     # Back to 1D
print(reshaped.ravel())       # Returns view when possible

# Transpose
print(reshaped.T)

# Stack arrays
a = np.array([1, 2, 3])
b = np.array([4, 5, 6])
print(np.vstack([a, b]))  # Vertical stack
print(np.hstack([a, b]))  # Horizontal stack
\`\`\`

## Random Sampling

\`\`\`python
# Set seed for reproducibility
np.random.seed(42)

# Random samples
print(np.random.rand(5))           # Uniform [0, 1)
print(np.random.randn(5))          # Standard normal
print(np.random.randint(1, 100, 5))  # Random integers

# Random choice
items = ['apple', 'banana', 'cherry', 'date']
print(np.random.choice(items, 3))           # Sample 3 items
print(np.random.choice(items, 3, replace=False))  # Without replacement

# Shuffle
arr = np.arange(10)
np.random.shuffle(arr)  # Shuffles in place
print(arr)

# Distributions
print(np.random.normal(0, 1, 1000))    # Normal (mean=0, std=1)
print(np.random.uniform(0, 10, 1000))  # Uniform
print(np.random.poisson(5, 1000))      # Poisson
print(np.random.binomial(10, 0.5, 1000))  # Binomial
\`\`\`

> [!TIP]
> NumPy is the foundation for almost all data science in Python. Master array creation, indexing, broadcasting, and vectorization — they're the building blocks for Pandas, Scikit-Learn, and beyond.`,
  objectives: [
    "Create NumPy arrays using various methods.",
    "Use indexing and slicing to access array elements.",
    "Apply broadcasting for operations on different-shaped arrays.",
    "Perform vectorized operations for fast computation.",
    "Use mathematical and aggregation functions.",
    "Reshape and manipulate array structures."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};
