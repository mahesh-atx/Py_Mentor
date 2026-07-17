export const dataCleaningLesson = {
  title: "Data Cleaning Techniques",
  slug: "data-cleaning",
  content: `# Data Cleaning Techniques

Real-world data is messy. Data cleaning — also called data preparation or data wrangling — is the process of detecting and correcting corrupt, inaccurate, or irrelevant records. It's often 60-80% of a data scientist's work.

## Why Clean Data?

- **Accuracy**: Dirty data leads to wrong conclusions
- **Consistency**: Standardized formats enable analysis
- **Completeness**: Missing values can break algorithms
- **Validity**: Outliers and errors skew results

> [!NOTE]
> **Why this matters:** A famous study estimated data scientists spend **60–80% of their time** on data preparation, not modeling. A single unhandled \`NaN\` or mis-encoded category can crash a training run or, worse, produce a confidently wrong model. Cleaning isn't glamorous, but it's where most real projects succeed or fail.

## Handling Null Values

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'name': ['Alice', 'Bob', None, 'Diana', 'Eve'],
    'age': [25, np.nan, 35, np.nan, 28],
    'salary': [50000, 60000, 75000, np.nan, 55000],
    'dept': ['HR', 'IT', 'IT', 'HR', None]
})

# Detect missing values
print(df.isnull())           # Boolean DataFrame
print(df.isnull().sum())     # Count per column
print(df.isnull().sum() / len(df) * 100)  # Percentage missing

# Strategy 1: Drop missing values
df.dropna()                  # Drop rows with ANY missing values
df.dropna(how='all')        # Drop rows where ALL values are missing
df.dropna(subset=['age'])    # Drop rows where 'age' is missing
df.dropna(thresh=3)          # Keep rows with at least 3 non-null values

# Strategy 2: Fill with constant
df['dept'].fillna('Unknown', inplace=True)

# Strategy 3: Fill with statistical measures
df['age'].fillna(df['age'].mean(), inplace=True)      # Mean
df['age'].fillna(df['age'].median(), inplace=True)    # Median
df['salary'].fillna(df['salary'].median(), inplace=True)

# Strategy 4: Forward/backward fill (good for time series)
df.fillna(method='ffill', inplace=True)  # Use previous value
df.fillna(method='bfill', inplace=True)  # Use next value

# Strategy 5: Interpolation
df['age'].interpolate(method='linear', inplace=True)

# Strategy 6: Fill based on group
df['salary'] = df.groupby('dept')['salary'].transform(
    lambda x: x.fillna(x.mean())
)
\`\`\`

> [!WARNING]
> **\`inplace=True\` is a trap.** It mutates the DataFrame and returns \`None\`, so \`df = df.fillna(0, inplace=True)\` sets \`df\` to \`None\`. Prefer the copy-returning style \`df['col'] = df['col'].fillna(0)\` — it's explicit, chainable, and far easier to debug. Also: filling with the *mean* hides missingness; only do it when the missing values are plausibly random, not structural.

## Removing Duplicates

\`\`\`python
df = pd.DataFrame({
    'name': ['Alice', 'Bob', 'Alice', 'Bob', 'Charlie'],
    'age': [25, 30, 25, 30, 35],
    'city': ['NYC', 'LA', 'NYC', 'LA', 'Chicago']
})

# Detect duplicates
print(df.duplicated())               # Boolean Series
print(df.duplicated(subset=['name'])) # Based on specific columns
print(df.duplicated().sum())          # Count of duplicates

# Remove duplicates
df.drop_duplicates()                  # Keep first occurrence
df.drop_duplicates(keep='last')       # Keep last occurrence
df.drop_duplicates(keep=False)        # Remove ALL duplicates
df.drop_duplicates(subset=['name'])   # Based on specific columns

# Reset index after dropping
df.drop_duplicates().reset_index(drop=True)
\`\`\`

## Outlier Detection & Treatment

\`\`\`python
import numpy as np

df = pd.DataFrame({
    'value': [10, 12, 11, 13, 100, 11, 12, 9, 11, 200]
})

# Method 1: Z-Score (values > 3 standard deviations from mean)
from scipy import stats
z_scores = np.abs(stats.zscore(df['value']))
outliers_z = df[z_scores > 3]
print(f"Z-score outliers: {outliers_z['value'].tolist()}")

# Method 2: IQR (Interquartile Range)
Q1 = df['value'].quantile(0.25)
Q3 = df['value'].quantile(0.75)
IQR = Q3 - Q1
lower_bound = Q1 - 1.5 * IQR
upper_bound = Q3 + 1.5 * IQR
outliers_iqr = df[(df['value'] < lower_bound) | (df['value'] > upper_bound)]
print(f"IQR outliers: {outliers_iqr['value'].tolist()}")

# Method 3: Percentile-based
lower = df['value'].quantile(0.05)
upper = df['value'].quantile(0.95)
outliers_pct = df[(df['value'] < lower) | (df['value'] > upper)]

# Treatment strategies
# 1. Remove outliers
df_clean = df[(z_scores <= 3)]

# 2. Cap outliers (winsorization)
df['value_capped'] = df['value'].clip(lower=lower_bound, upper=upper_bound)

# 3. Replace with median
df['value_clean'] = df['value'].where(z_scores <= 3, df['value'].median())

# 4. Log transformation (for skewed data)
df['value_log'] = np.log1p(df['value'])
\`\`\`

## Feature Formatting

\`\`\`python
df = pd.DataFrame({
    'date': ['2024-01-15', '2024/02/20', '15-03-2024', '2024.04.10'],
    'price': ['$1,234.56', '$2,345.67', '€3,456.78', '£4,567.89'],
    'phone': ['(123) 456-7890', '123-456-7890', '1234567890', '+1-123-456-7890'],
    'category': ['  Electronics  ', 'electronics', 'ELECTRONICS', 'Electronics']
})

# Standardize dates
df['date_parsed'] = pd.to_datetime(df['date'], infer_datetime_format=True)
df['date_standard'] = df['date_parsed'].dt.strftime('%Y-%m-%d')

# Clean currency values
df['price_clean'] = df['price'].str.replace(r'[^\d.]', '', regex=True).astype(float)

# Standardize phone numbers
df['phone_clean'] = df['phone'].str.replace(r'[^\d]', '', regex=True)
df['phone_formatted'] = df['phone_clean'].apply(
    lambda x: f'({x[:3]}) {x[3:6]}-{x[6:]}' if len(x) == 10 else x
)

# Standardize categories (strip whitespace, lowercase)
df['category_clean'] = df['category'].str.strip().str.lower().str.title()
\`\`\`

> [!TIP]
> **Clean strings *before* you dedupe or map.** \`'  Electronics  '\` and \`'electronics'\` look identical to a human but are different strings to Pandas — so \`drop_duplicates()\` won't catch them. Standardize case and whitespace first, then remove duplicates, and your counts will finally make sense.

## Data Type Conversion

\`\`\`python
df = pd.DataFrame({
    'id': ['1', '2', '3', '4'],
    'price': ['10.99', '20.50', '15.75', '30.00'],
    'quantity': ['100', '200', '150', '300'],
    'date': ['2024-01-01', '2024-02-01', '2024-03-01', '2024-04-01'],
    'category': ['A', 'B', 'A', 'C']
})

# Convert types
df['id'] = df['id'].astype(int)
df['price'] = df['price'].astype(float)
df['quantity'] = df['quantity'].astype(int)
df['date'] = pd.to_datetime(df['date'])
df['category'] = df['category'].astype('category')

# Convert to numeric (handles errors)
df['value'] = pd.to_numeric(df['value'], errors='coerce')  # Invalid → NaN

# Convert to datetime with specific format
df['date'] = pd.to_datetime(df['date'], format='%Y-%m-%d')

# Downcast to save memory
df['quantity'] = pd.to_numeric(df['quantity'], downcast='integer')
df['price'] = pd.to_numeric(df['price'], downcast='float')
\`\`\`

## String Cleaning

\`\`\`python
df = pd.DataFrame({
    'text': ['  Hello World  ', 'PYTHON', 'data-science', '123 Main St.', None]
})

# Strip whitespace
df['text'] = df['text'].str.strip()
df['text'] = df['text'].str.lstrip()  # Left only
df['text'] = df['text'].str.rstrip()  # Right only

# Case conversion
df['text'] = df['text'].str.lower()
df['text'] = df['text'].str.upper()
df['text'] = df['text'].str.title()
df['text'] = df['text'].str.capitalize()

# Replace characters
df['text'] = df['text'].str.replace('-', ' ')
df['text'] = df['text'].str.replace(r'[^a-zA-Z ]', '', regex=True)

# Extract patterns
df['numbers'] = df['text'].str.extract(r'(\d+)')
df['words'] = df['text'].str.findall(r'[a-zA-Z]+')

# Check patterns
df['has_number'] = df['text'].str.contains(r'\d', regex=True)
df['starts_with'] = df['text'].str.startswith('H')
df['ends_with'] = df['text'].str.endswith('e')

# Split strings
df['split'] = df['text'].str.split(' ')
df['first_word'] = df['text'].str.split(' ').str[0]
\`\`\`

## Handling Inconsistent Data

\`\`\`python
df = pd.DataFrame({
    'country': ['USA', 'United States', 'US', 'America', 'U.S.A.',
                'UK', 'United Kingdom', 'Britain', 'Great Britain',
                'France', 'FR', 'france']
})

# Create a mapping for standardization
country_map = {
    'USA': 'United States', 'United States': 'United States',
    'US': 'United States', 'America': 'United States',
    'U.S.A.': 'United States',
    'UK': 'United Kingdom', 'United Kingdom': 'United Kingdom',
    'Britain': 'United Kingdom', 'Great Britain': 'United Kingdom',
    'France': 'France', 'FR': 'France', 'france': 'France'
}

df['country_standard'] = df['country'].map(country_map)

# Fuzzy matching for approximate matches
from difflib import get_close_matches
def fuzzy_match(value, choices, cutoff=0.8):
    matches = get_close_matches(value, choices, n=1, cutoff=cutoff)
    return matches[0] if matches else value

standard_names = ['United States', 'United Kingdom', 'France']
df['country_fuzzy'] = df['country'].apply(lambda x: fuzzy_match(x, standard_names))
\`\`\`

## Real-World Example: Cleaning a Messy Survey Export

A CSV export has names in mixed case, salaries as \`"$1,234"\` strings, and some missing ages. Here's a focused cleaning pass:

\`\`\`python
import pandas as pd
import numpy as np

df = pd.DataFrame({
    'name':   ['  alice ', 'BOB', 'Charlie', None],
    'salary': ['$50,000', '$60,000', 'N/A', '$55,000'],
    'age':    [25, np.nan, 35, 28],
})

# 1. Strip + title-case names (None stays None)
df['name'] = df['name'].str.strip().str.title()

# 2. Strip $, commas, convert to number; 'N/A' -> NaN
df['salary'] = (
    df['salary']
      .str.replace(r'[^\\d.]', '', regex=True)
      .replace('', np.nan)
      .astype(float)
)

# 3. Fill missing age with median
df['age'] = df['age'].fillna(df['age'].median())

print(df)
\`\`\`

Notice the \`.replace('', np.nan)\` step — after stripping currency symbols, \`'N/A'\` became \`''\` (empty string), which \`astype(float)\` would reject. Cleaning is full of these small traps.

## Your Turn!

1. Take a DataFrame with a \`'price'\` column like \`'$1,234.56'\` and convert it to a float.
2. Given \`df\` with duplicate \`'email'\` rows, keep only the first occurrence.
3. Use the IQR method from above to find outliers in \`[10, 12, 11, 13, 100, 11, 12, 9]\` and cap them with \`clip()\`.

## Complete Cleaning Pipeline

\`\`\`python
def clean_data(df):
    \"\"\"Complete data cleaning pipeline.\"\"\"
    # 1. Make a copy
    df = df.copy()

    # 2. Remove exact duplicates
    df = df.drop_duplicates().reset_index(drop=True)

    # 3. Strip whitespace from string columns
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].str.strip()

    # 4. Standardize case for categorical columns
    for col in df.select_dtypes(include='object').columns:
        if df[col].nunique() < 20:  # Likely categorical
            df[col] = df[col].str.title()

    # 5. Convert date columns
    for col in df.columns:
        if 'date' in col.lower():
            df[col] = pd.to_datetime(df[col], errors='coerce')

    # 6. Fill missing numeric values with median
    for col in df.select_dtypes(include='number').columns:
        df[col] = df[col].fillna(df[col].median())

    # 7. Fill missing categorical values with mode
    for col in df.select_dtypes(include='object').columns:
        df[col] = df[col].fillna(df[col].mode()[0] if not df[col].mode().empty else 'Unknown')

    # 8. Remove outliers using IQR for numeric columns
    for col in df.select_dtypes(include='number').columns:
        Q1 = df[col].quantile(0.25)
        Q3 = df[col].quantile(0.75)
        IQR = Q3 - Q1
        lower = Q1 - 1.5 * IQR
        upper = Q3 + 1.5 * IQR
        df[col] = df[col].clip(lower=lower, upper=upper)

    return df
\`\`\`

> [!TIP]
> Always explore your data first with \`df.info()\`, \`df.describe()\`, and \`df.isnull().sum()\` before cleaning. Document every cleaning step for reproducibility.`,
  objectives: [
    "Handle missing values using various strategies.",
    "Detect and remove duplicate records.",
    "Identify and treat outliers using statistical methods.",
    "Standardize and format features for consistency.",
    "Convert data types appropriately.",
    "Build a complete data cleaning pipeline."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};
