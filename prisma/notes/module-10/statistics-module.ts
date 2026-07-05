export const statisticsModuleLesson = {
  title: "statistics Module",
  slug: "statistics-module",
  content: `# statistics Module

The \`statistics\` module (Python 3.4+) provides functions for calculating mathematical statistics. It is part of the standard library - no installation needed.

\`\`\`python
import statistics
\`\`\`

## Central Tendency - Where is the Middle?

### mean() - Arithmetic Average

\`\`\`python
import statistics

scores = [85, 92, 78, 95, 88, 76, 91, 84, 89, 90]

mean = statistics.mean(scores)
print(mean)             # 86.8

# Works with integers and floats
prices = [10.99, 5.49, 8.00, 14.99, 3.25]
print(statistics.mean(prices))    # 8.544

# Works with fractions too
from fractions import Fraction
fractions_data = [Fraction(1, 2), Fraction(1, 3), Fraction(1, 4)]
print(statistics.mean(fractions_data))   # 13/36
\`\`\`

### fmean() - Fast Floating Point Mean (Python 3.8+)

\`\`\`python
import statistics

data = [1, 2, 3, 4, 5]
print(statistics.mean(data))     # 3    (returns Fraction or int when exact)
print(statistics.fmean(data))    # 3.0  (always returns float, faster)

# fmean is faster for large datasets
\`\`\`

### median() - Middle Value

The median is the middle value when data is sorted. Unlike mean, it is not affected by extreme values.

\`\`\`python
import statistics

# Odd number of items - exact middle
odd_data = [1, 3, 5, 7, 9]
print(statistics.median(odd_data))     # 5

# Even number of items - average of two middle values
even_data = [1, 3, 5, 7, 9, 11]
print(statistics.median(even_data))    # 6.0  ((5+7)/2)

# Unsorted data - median sorts it for you
unsorted = [92, 78, 85, 91, 88, 76]
print(statistics.median(unsorted))     # 86.5

# With outliers - median is more robust than mean
salaries = [30000, 35000, 40000, 42000, 45000, 500000]  # CEO salary outlier
print(f"Mean:   \${statistics.mean(salaries):,.0f}")     # Mean:   $115,333  (skewed!)
print(f"Median: \${statistics.median(salaries):,.0f}")   # Median: $41,000   (more representative)
\`\`\`

### median_low() and median_high()

\`\`\`python
import statistics

even_data = [1, 3, 5, 7]

print(statistics.median(even_data))       # 4.0    (average of 3 and 5)
print(statistics.median_low(even_data))   # 3      (lower middle value)
print(statistics.median_high(even_data))  # 5      (higher middle value)
\`\`\`

### mode() - Most Frequent Value

\`\`\`python
import statistics

data = [1, 2, 2, 3, 3, 3, 4, 4]
print(statistics.mode(data))    # 3  (appears 3 times)

grades = ["A", "B", "A", "C", "A", "B"]
print(statistics.mode(grades))  # A  (appears 3 times)

# Python 3.8+: multimode() - all modes when there are ties
data_with_ties = [1, 1, 2, 2, 3]
print(statistics.multimode(data_with_ties))   # [1, 2]

# In older Python, mode() raises StatisticsError on multiple modes
# In Python 3.8+, mode() returns the first encountered mode
\`\`\`

## Spread - How Spread Out is the Data?

### variance() - Variance

Variance measures how far each value is from the mean, on average (squared).

\`\`\`python
import statistics

data = [2, 4, 4, 4, 5, 5, 7, 9]

# variance() - sample variance (divides by N-1)
print(statistics.variance(data))     # 4.571...

# pvariance() - population variance (divides by N)
print(statistics.pvariance(data))    # 4.0

# When to use which:
# variance() - when data is a SAMPLE from a larger population
# pvariance() - when data IS the entire population
\`\`\`

### stdev() - Standard Deviation

Standard deviation is the square root of variance - in the same units as the data.

\`\`\`python
import statistics

data = [2, 4, 4, 4, 5, 5, 7, 9]

# stdev() - sample standard deviation
stdev = statistics.stdev(data)
print(f"Stdev: {stdev:.4f}")      # Stdev: 2.1381

# pstdev() - population standard deviation
pstdev = statistics.pstdev(data)
print(f"PStdev: {pstdev:.4f}")    # PStdev: 2.0000

# Interpretation: about 68% of data falls within 1 stdev of mean
mean = statistics.mean(data)
print(f"Mean: {mean}")
print(f"Range: {mean - stdev:.2f} to {mean + stdev:.2f}")
# Range: 2.86 to 7.14
\`\`\`

\`\`\`python
# Practical: comparing consistency of two batches
import statistics

batch_a = [98, 100, 99, 101, 97, 102, 98, 100]   # Manufacturing output
batch_b = [85, 115, 92, 108, 78, 122, 90, 110]

print("=== Quality Control ===")
for name, batch in [("Batch A", batch_a), ("Batch B", batch_b)]:
    mean = statistics.mean(batch)
    stdev = statistics.stdev(batch)
    print(f"{name}: Mean={mean:.1f}, StDev={stdev:.2f}")
# Batch A is more consistent (lower stdev)
\`\`\`

## Correlation and Regression (Python 3.10+)

\`\`\`python
import statistics

# correlation() - Pearson correlation coefficient (-1 to 1)
hours_studied = [1, 2, 3, 4, 5, 6, 7, 8]
scores        = [50, 55, 65, 70, 75, 82, 88, 95]

corr = statistics.correlation(hours_studied, scores)
print(f"Correlation: {corr:.4f}")   # ~0.99  (strong positive correlation)

# linear_regression() - find best fit line
slope, intercept = statistics.linear_regression(hours_studied, scores)
print(f"y = {slope:.2f}x + {intercept:.2f}")

# Predict score for 9 hours studied
predicted = slope * 9 + intercept
print(f"Predicted score for 9 hours: {predicted:.1f}")
\`\`\`

## Quantiles (Python 3.8+)

\`\`\`python
import statistics

data = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]

# Quartiles (4 equal parts)
quartiles = statistics.quantiles(data, n=4)
print(quartiles)   # [3.25, 5.5, 7.75]  (Q1, Q2, Q3)

q1, q2, q3 = quartiles
iqr = q3 - q1
print(f"Q1: {q1}, Median: {q2}, Q3: {q3}")
print(f"IQR: {iqr}")

# Deciles (10 equal parts)
deciles = statistics.quantiles(data, n=10)
print([round(d, 2) for d in deciles])
\`\`\`

## Practical Example: Complete Data Analysis

\`\`\`python
import statistics

# Student exam scores across 3 classes
class_a = [85, 92, 78, 95, 88, 76, 91, 84, 89, 90, 72, 96]
class_b = [70, 65, 82, 74, 68, 79, 71, 83, 67, 75, 80, 73]
class_c = [55, 98, 60, 95, 58, 92, 62, 88, 57, 90, 59, 85]

def analyze_class(name, scores):
    mean   = statistics.mean(scores)
    median = statistics.median(scores)
    stdev  = statistics.stdev(scores)
    mode_vals = statistics.multimode(scores)
    variance = statistics.variance(scores)

    q1, q2, q3 = statistics.quantiles(scores, n=4)
    iqr = q3 - q1

    print(f"\\n=== {name} ===")
    print(f"  Count     : {len(scores)}")
    print(f"  Mean      : {mean:.2f}")
    print(f"  Median    : {median:.2f}")
    print(f"  Mode      : {mode_vals}")
    print(f"  Std Dev   : {stdev:.2f}")
    print(f"  Variance  : {variance:.2f}")
    print(f"  Range     : {min(scores)} - {max(scores)}")
    print(f"  Q1/Q3     : {q1:.1f} / {q3:.1f}  (IQR: {iqr:.1f})")

    # Grade distribution
    grade_dist = {"A": 0, "B": 0, "C": 0, "D": 0, "F": 0}
    for s in scores:
        if s >= 90:   grade_dist["A"] += 1
        elif s >= 80: grade_dist["B"] += 1
        elif s >= 70: grade_dist["C"] += 1
        elif s >= 60: grade_dist["D"] += 1
        else:         grade_dist["F"] += 1

    dist_str = " | ".join(f"{g}:{c}" for g, c in grade_dist.items())
    print(f"  Grades    : {dist_str}")

for cls_name, cls_data in [("Class A", class_a), ("Class B", class_b), ("Class C", class_c)]:
    analyze_class(cls_name, cls_data)
\`\`\`

Output:
\`\`\`
=== Class A ===
  Count     : 12
  Mean      : 86.33
  Median    : 88.50
  Mode      : [85, 92, 78, ...]
  Std Dev   : 7.38
  Variance  : 54.42
  Range     : 72 - 96
  Q1/Q3     : 80.5 / 91.8  (IQR: 11.2)
  Grades    : A:4 | B:5 | C:3 | D:0 | F:0

=== Class C ===
  Count     : 12
  Mean      : 74.92
  ...
  Std Dev   : 17.68    (much higher - very spread out!)
\`\`\`

> [!TIP]
> Use \`mean()\` for normally distributed data. Use \`median()\` when data has outliers (like income or house prices). Use \`stdev()\` to measure consistency - a low standard deviation means data points are clustered near the mean. Use \`variance()\` when data is a sample (not the entire population) to avoid bias.`,
  objectives: [
    "Calculate central tendency using mean(), median(), and mode().",
    "Understand when to use mean vs median (outliers).",
    "Measure spread using variance() and stdev().",
    "Use multimode() for data with multiple modes.",
    "Apply statistics functions to real-world data analysis."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};