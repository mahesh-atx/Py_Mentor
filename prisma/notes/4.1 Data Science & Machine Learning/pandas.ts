export const pandasLesson = {
  title: "Pandas - DataFrames, Wrangling & Analysis",
  slug: "pandas",
  content: `# Pandas - Data Analysis Library

Pandas is Python's most powerful data manipulation library. It provides **DataFrame** (2D) and **Series** (1D) structures that make data cleaning, transformation, and analysis intuitive and efficient.

## What is Pandas?

Pandas provides:
- **Series**: 1D labeled array
- **DataFrame**: 2D labeled data structure (like a spreadsheet)
- **Data I/O**: Read/write CSV, Excel, SQL, JSON, Parquet
- **Data cleaning**: Handle missing values, duplicates, type conversion
- **Data manipulation**: Filter, sort, group, merge, pivot
- **Time series**: Date/time functionality
- **Integration**: Works with NumPy, Matplotlib, Scikit-Learn

## Installation

\`\`\`bash
pip install pandas
\`\`\`

## Series - 1D Labeled Array

\`\`\`python
import pandas as pd

# Create a Series
s = pd.Series([10, 20, 30, 40, 50])
print(s)
# 0    10
# 1    20
# 2    30
# 3    40
# 4    50

# With custom index
s = pd.Series([10, 20, 30], index=['a', 'b', 'c'])
print(s)
# a    10
# b    20
# c    30

# From a dictionary
s = pd.Series({'apple': 3.5, 'banana': 2.0, 'cherry': 5.0})
print(s)

# Series operations
s = pd.Series([1, 2, 3, 4, 5])
print(s.sum())       # 15
print(s.mean())      # 3.0
print(s.std())       # Standard deviation
print(s.describe())  # Summary statistics
\`\`\`

## DataFrame - 2D Labeled Structure

\`\`\`python
# From a dictionary
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'age': [25, 30, 35, 28],
    'city': ['New York', 'London', 'Paris', 'Tokyo'],
    'salary': [50000, 60000, 75000, 55000]
})
print(df)

# From a list of lists
df = pd.DataFrame(
    [['Alice', 25], ['Bob', 30], ['Charlie', 35]],
    columns=['name', 'age']
)

# From a NumPy array
import numpy as np
df = pd.DataFrame(
    np.random.randn(5, 3),
    columns=['A', 'B', 'C']
)

# Basic info
print(df.shape)       # (rows, columns)
print(df.columns)     # Column names
print(df.dtypes)      # Data types
print(df.index)       # Row index
print(df.info())      # Detailed info
print(df.describe())  # Summary statistics
\`\`\`

## Reading and Writing Data

\`\`\`python
# Read CSV
df = pd.read_csv('data.csv')

# Read Excel
df = pd.read_excel('data.xlsx', sheet_name='Sheet1')

# Read JSON
df = pd.read_json('data.json')

# Read SQL
import sqlite3
conn = sqlite3.connect('database.db')
df = pd.read_sql('SELECT * FROM table', conn)

# Write data
df.to_csv('output.csv', index=False)
df.to_excel('output.xlsx', index=False)
df.to_json('output.json')
\`\`\`

## Selecting Data

\`\`\`python
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'Diana'],
    'age': [25, 30, 35, 28],
    'salary': [50000, 60000, 75000, 55000]
})

# Select a column (returns Series)
print(df['name'])
print(df.name)  # Alternative (no spaces/special chars)

# Select multiple columns
print(df[['name', 'age']])

# Select rows by index
print(df.iloc[0])      # First row (by position)
print(df.iloc[0:2])    # First two rows
print(df.loc[0])       # Row with index label 0

# Select by condition
print(df[df['age'] > 28])
print(df[(df['age'] > 25) & (df['salary'] > 55000)])

# Select specific rows and columns
print(df.loc[0:2, ['name', 'age']])
print(df.iloc[0:2, 0:2])
\`\`\`

## Data Cleaning

\`\`\`python
# Handling missing values
df = pd.DataFrame({
    'A': [1, 2, None, 4],
    'B': [5, None, None, 8],
    'C': [9, 10, 11, 12]
})

print(df.isnull())       # Check for missing values
print(df.isnull().sum()) # Count missing per column

# Fill missing values
df.fillna(0)                    # Fill with 0
df.fillna(df.mean())            # Fill with column mean
df.fillna(method='ffill')       # Forward fill
df.fillna(method='bfill')       # Backward fill

# Drop missing values
df.dropna()                     # Drop rows with any NaN
df.dropna(axis=1)               # Drop columns with any NaN
df.dropna(thresh=2)             # Keep rows with at least 2 non-NaN

# Remove duplicates
df = pd.DataFrame({'A': [1, 1, 2, 3], 'B': [4, 4, 5, 6]})
df.drop_duplicates()            # Remove duplicate rows
df.drop_duplicates(subset=['A']) # Based on specific column
df.drop_duplicates(keep='last')  # Keep last occurrence

# Data type conversion
df['age'] = df['age'].astype(int)
df['date'] = pd.to_datetime(df['date'])
df['category'] = df['category'].astype('category')
\`\`\`

## Data Manipulation

\`\`\`python
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Charlie', 'Diana', 'Eve'],
    'age': [25, 30, 35, 28, 32],
    'dept': ['HR', 'IT', 'IT', 'HR', 'Sales'],
    'salary': [50000, 60000, 75000, 55000, 62000]
})

# Add new column
df['bonus'] = df['salary'] * 0.1
df['total_comp'] = df['salary'] + df['bonus']

# Apply a function
df['age_group'] = df['age'].apply(lambda x: 'Young' if x < 30 else 'Senior')

# Sort by column
df.sort_values('age')                    # Ascending
df.sort_values('age', ascending=False)   # Descending
df.sort_values(['dept', 'salary'])       # Multiple columns

# Rename columns
df.rename(columns={'name': 'employee_name', 'salary': 'base_salary'})

# Replace values
df['dept'].replace({'HR': 'Human Resources', 'IT': 'Technology'})

# String operations
df['name_lower'] = df['name'].str.lower()
df['name_upper'] = df['name'].str.upper()
df['name_length'] = df['name'].str.len()
\`\`\`

## GroupBy Operations

\`\`\`python
df = pd.DataFrame({
    'dept': ['HR', 'IT', 'IT', 'HR', 'Sales', 'Sales'],
    'salary': [50000, 60000, 75000, 55000, 62000, 58000],
    'age': [25, 30, 35, 28, 32, 29]
})

# Group and aggregate
print(df.groupby('dept')['salary'].mean())
print(df.groupby('dept')['salary'].agg(['mean', 'min', 'max', 'count']))

# Multiple aggregations
print(df.groupby('dept').agg({
    'salary': ['mean', 'sum'],
    'age': ['mean', 'min', 'max']
}))

# Group by multiple columns
print(df.groupby(['dept']).agg({'salary': 'mean', 'age': 'mean'}))

# Filter groups
print(df.groupby('dept').filter(lambda x: x['salary'].mean() > 55000))
\`\`\`

## Merge & Join

\`\`\`python
df1 = pd.DataFrame({'id': [1, 2, 3], 'name': ['Alice', 'Bob', 'Charlie']})
df2 = pd.DataFrame({'id': [1, 2, 4], 'salary': [50000, 60000, 70000]})

# Inner join (only matching rows)
pd.merge(df1, df2, on='id', how='inner')

# Left join (all rows from left)
pd.merge(df1, df2, on='id', how='left')

# Right join (all rows from right)
pd.merge(df1, df2, on='id', how='right')

# Outer join (all rows from both)
pd.merge(df1, df2, on='id', how='outer')

# Merge on multiple keys
pd.merge(df1, df2, on=['id', 'name'])

# Join on index
df1.join(df2, lsuffix='_left', rsuffix='_right')
\`\`\`

## Pivot Tables

\`\`\`python
df = pd.DataFrame({
    'date': ['2024-01', '2024-01', '2024-02', '2024-02'],
    'product': ['A', 'B', 'A', 'B'],
    'sales': [100, 150, 120, 180]
})

# Create pivot table
pivot = df.pivot_table(
    values='sales',
    index='date',
    columns='product',
    aggfunc='sum'
)
print(pivot)
# Product    A    B
# Date
# 2024-01  100  150
# 2024-02  120  180

# With margins (totals)
df.pivot_table(values='sales', index='date', columns='product',
               aggfunc='sum', margins=True)

# Multiple aggregations
df.pivot_table(values='sales', index='date', columns='product',
               aggfunc=['sum', 'mean'])
\`\`\`

## apply(), map(), and lambda

\`\`\`python
df = pd.DataFrame({
    'name': ['alice', 'bob', 'charlie'],
    'score': [85, 92, 78]
})

# apply() on a Series
df['name_upper'] = df['name'].apply(lambda x: x.upper())

# apply() on a DataFrame (column-wise)
df[['score']].apply(lambda x: x * 2)

# apply() row-wise
df['pass'] = df.apply(lambda row: row['score'] >= 80, axis=1)

# map() on a Series (element-wise)
df['name'] = df['name'].map({'alice': 'Alice', 'bob': 'Bob', 'charlie': 'Charlie'})

# applymap() on entire DataFrame (element-wise)
df.applymap(lambda x: str(x).upper() if isinstance(x, str) else x)
\`\`\`

## Handling Missing Values - Deep Dive

\`\`\`python
df = pd.DataFrame({
    'A': [1, np.nan, 3, np.nan, 5],
    'B': [np.nan, 2, np.nan, 4, np.nan],
    'C': [1, 2, 3, 4, 5]
})

# Detect missing values
print(df.isna())       # or df.isnull()
print(df.notna())      # or df.notnull()
print(df.isna().sum()) # Count per column

# Drop missing values
df.dropna()                    # Drop rows with any NaN
df.dropna(axis=1)              # Drop columns with any NaN
df.dropna(subset=['A'])        # Drop rows where 'A' is NaN
df.dropna(thresh=2)            # Keep rows with at least 2 non-NaN

# Fill missing values
df.fillna(0)                   # Fill with constant
df.fillna({'A': 0, 'B': 99})   # Different fill per column
df.fillna(method='ffill')      # Forward fill (use previous value)
df.fillna(method='bfill')      # Backward fill (use next value)
df['A'].fillna(df['A'].mean()) # Fill with column mean
df['A'].fillna(df['A'].median()) # Fill with column median
df['A'].fillna(df['A'].mode()[0]) # Fill with most common value
\`\`\`

> [!TIP]
> Pandas is the workhorse of data science. Master DataFrames, groupby, merge, and pivot tables — you'll use them in almost every data project.`,
  objectives: [
    "Create and manipulate Series and DataFrames.",
    "Read and write data from various file formats.",
    "Select and filter data using indexing and conditions.",
    "Clean data by handling missing values and duplicates.",
    "Use GroupBy for aggregation and analysis.",
    "Merge, join, and pivot data tables."
  ],
  difficulty: "intermediate",
  xpReward: 75,
};
