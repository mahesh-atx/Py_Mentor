export const dataVisualizationLesson = {
  title: "Data Visualization - Matplotlib, Seaborn & Plotly",
  slug: "data-visualization",
  content: `# Data Visualization

Data visualization is the graphical representation of data and information. It helps you understand patterns, trends, and outliers in data, and communicate findings effectively.

> [!NOTE]
> **Why this matters:** Your model or summary table might say "accuracy = 0.94", but a single plot often reveals what the number hides — a skewed distribution, a suspicious cluster, a relationship between two variables. Visualization is how you *explore* data and how you *convince* others. The three libraries form a ladder: **Matplotlib** (fine control), **Seaborn** (statistical shortcuts on top of Matplotlib), and **Plotly** (interactive, web-ready).

## Matplotlib - The Foundation

Matplotlib is Python's most widely used plotting library. It provides fine-grained control over every element of a plot.

### Installation

\`\`\`bash
pip install matplotlib
\`\`\`

### Line Charts

\`\`\`python
import matplotlib.pyplot as plt
import numpy as np

x = np.linspace(0, 10, 100)
y = np.sin(x)

plt.figure(figsize=(10, 6))
plt.plot(x, y, label='sin(x)', color='blue', linewidth=2)
plt.title('Sine Wave', fontsize=16)
plt.xlabel('X-axis', fontsize=12)
plt.ylabel('Y-axis', fontsize=12)
plt.legend()
plt.grid(True, alpha=0.3)
plt.show()
\`\`\`

### Bar Charts

\`\`\`python
categories = ['Product A', 'Product B', 'Product C', 'Product D']
sales = [350, 480, 290, 520]

plt.figure(figsize=(10, 6))
plt.bar(categories, sales, color=['#2196F3', '#4CAF50', '#FF9800', '#F44336'])
plt.title('Sales by Product', fontsize=16)
plt.xlabel('Product', fontsize=12)
plt.ylabel('Sales ($)', fontsize=12)

# Add value labels on bars
for i, v in enumerate(sales):
    plt.text(i, v + 10, str(v), ha='center', fontweight='bold')

plt.tight_layout()
plt.show()

# Horizontal bar chart
plt.barh(categories, sales, color='steblue')
plt.title('Sales by Product (Horizontal)')
plt.xlabel('Sales ($)')
plt.show()
\`\`\`

> [!WARNING]
> **You must call \`plt.show()\` (or \`%matplotlib inline\` in a notebook).** Until you do, Matplotlib is *accumulating* draw commands on the current figure. Reuse the same \`plt\` calls across cells without clearing and you'll stack plots on top of each other. Use \`plt.clf()\` / \`plt.close()\` between figures, or prefer the object-oriented \`fig, ax = plt.subplots()\` style where each plot owns its own \`Axes\`. (Note the typo \`color='steblue'\` above would raise a ValueError — the correct name is \`'steelblue'\`.)

### Scatter Plots

\`\`\`python
np.random.seed(42)
x = np.random.randn(100)
y = 2 * x + np.random.randn(100)
colors = np.random.rand(100)
sizes = 1000 * np.random.rand(100)

plt.figure(figsize=(10, 6))
plt.scatter(x, y, c=colors, s=sizes, alpha=0.6, cmap='viridis')
plt.title('Scatter Plot with Color and Size', fontsize=16)
plt.xlabel('X values', fontsize=12)
plt.ylabel('Y values', fontsize=12)
plt.colorbar(label='Color Scale')
plt.show()
\`\`\`

### Histograms

\`\`\`python
data = np.random.normal(100, 15, 1000)  # Mean=100, Std=15

plt.figure(figsize=(10, 6))
plt.hist(data, bins=30, edgecolor='black', alpha=0.7, color='steelblue')
plt.title('Distribution of Values', fontsize=16)
plt.xlabel('Value', fontsize=12)
plt.ylabel('Frequency', fontsize=12)
plt.axvline(data.mean(), color='red', linestyle='--', label=f'Mean: {data.mean():.1f}')
plt.legend()
plt.show()
\`\`\`

### Pie Charts

\`\`\`python
labels = ['Python', 'JavaScript', 'Java', 'C++', 'Other']
sizes = [35, 25, 20, 12, 8]
colors = ['#3776AB', '#F7DF1E', '#ED8B00', '#00599C', '#9E9E9E']
explode = (0.1, 0, 0, 0, 0)  # Explode first slice

plt.figure(figsize=(8, 8))
plt.pie(sizes, explode=explode, labels=labels, colors=colors,
        autopct='%1.1f%%', shadow=True, startangle=90)
plt.title('Programming Language Popularity', fontsize=16)
plt.show()
\`\`\`

### Subplots

\`\`\`python
fig, axes = plt.subplots(2, 2, figsize=(12, 10))

# Top-left: Line plot
x = np.linspace(0, 10, 50)
axes[0, 0].plot(x, np.sin(x))
axes[0, 0].set_title('Sine Wave')

# Top-right: Bar chart
axes[0, 1].bar(['A', 'B', 'C'], [10, 20, 15])
axes[0, 1].set_title('Bar Chart')

# Bottom-left: Scatter plot
axes[1, 0].scatter(np.random.rand(50), np.random.rand(50))
axes[1, 0].set_title('Scatter Plot')

# Bottom-right: Histogram
axes[1, 1].hist(np.random.randn(1000), bins=20)
axes[1, 1].set_title('Histogram')

plt.tight_layout()
plt.show()
\`\`\`

## Seaborn - Statistical Visualization

Seaborn is built on Matplotlib and provides a high-level interface for attractive statistical graphics.

### Installation

\`\`\`bash
pip install seaborn
\`\`\`

### Heatmaps

\`\`\`python
import seaborn as sns
import numpy as np

# Correlation matrix heatmap
np.random.seed(42)
data = np.random.randn(10, 10)
correlation = np.corrcoef(data)

plt.figure(figsize=(10, 8))
sns.heatmap(correlation, annot=True, cmap='coolwarm', center=0,
            fmt='.2f', square=True, linewidths=0.5)
plt.title('Correlation Heatmap', fontsize=16)
plt.show()
\`\`\`

### Pair Plots

\`\`\`python
import seaborn as sns

# Load sample dataset
iris = sns.load_dataset('iris')

# Pair plot colored by species
sns.pairplot(iris, hue='species', diag_kind='kde', height=2.5)
plt.suptitle('Iris Dataset Pair Plot', y=1.02, fontsize=16)
plt.show()
\`\`\`

### Box Plots

\`\`\`python
tips = sns.load_dataset('tips')

plt.figure(figsize=(10, 6))
sns.boxplot(x='day', y='total_bill', data=tips, palette='Set2')
plt.title('Total Bill by Day', fontsize=16)
plt.xlabel('Day of Week', fontsize=12)
plt.ylabel('Total Bill ($)', fontsize=12)
plt.show()

# Grouped box plot
plt.figure(figsize=(10, 6))
sns.boxplot(x='day', y='total_bill', hue='sex', data=tips, palette='Set1')
plt.title('Total Bill by Day and Gender', fontsize=16)
plt.show()
\`\`\`

### Distribution Plots

\`\`\`python
data = np.random.normal(0, 1, 1000)

# Histogram with KDE
plt.figure(figsize=(10, 6))
sns.histplot(data, kde=True, color='steelblue', bins=30)
plt.title('Distribution with KDE', fontsize=16)
plt.show()

# KDE plot only
plt.figure(figsize=(10, 6))
sns.kdeplot(data, fill=True, color='purple')
plt.title('Kernel Density Estimate', fontsize=16)
plt.show()

# Violin plot (combination of box plot and KDE)
tips = sns.load_dataset('tips')
plt.figure(figsize=(10, 6))
sns.violinplot(x='day', y='total_bill', data=tips, palette='muted', inner='quartile')
plt.title('Violin Plot of Total Bill by Day', fontsize=16)
plt.show()
\`\`\`

### Categorical Plots

\`\`\`python
tips = sns.load_dataset('tips')

# Count plot
plt.figure(figsize=(8, 5))
sns.countplot(x='day', data=tips, palette='deep')
plt.title('Count of Bills by Day', fontsize=16)
plt.show()

# Bar plot with confidence intervals
plt.figure(figsize=(8, 5))
sns.barplot(x='day', y='total_bill', data=tips, palette='bright', ci=95)
plt.title('Average Total Bill by Day', fontsize=16)
plt.show()

# Strip plot
plt.figure(figsize=(8, 5))
sns.stripplot(x='day', y='total_bill', data=tips, jitter=True, alpha=0.6)
plt.title('Strip Plot of Total Bill by Day', fontsize=16)
plt.show()

# Swarm plot
plt.figure(figsize=(8, 5))
sns.swarmplot(x='day', y='total_bill', data=tips, palette='Set2')
plt.title('Swarm Plot of Total Bill by Day', fontsize=16)
plt.show()
\`\`\`

## Plotly - Interactive Visualizations

Plotly creates interactive, web-based visualizations that can be embedded in dashboards and notebooks.

### Installation

\`\`\`bash
pip install plotly
\`\`\`

### Interactive Line Chart

\`\`\`python
import plotly.express as px
import pandas as pd

df = px.data.gapminder()
fig = px.line(df, x='year', y='lifeExp', color='continent',
              title='Life Expectancy Over Time by Continent')
fig.show()
\`\`\`

### Interactive Scatter Plot

\`\`\`python
df = px.data.iris()
fig = px.scatter(df, x='sepal_width', y='sepal_length',
                 color='species', size='petal_length',
                 hover_data=['petal_width'],
                 title='Iris Dataset Interactive Scatter')
fig.show()
\`\`\`

### Interactive Bar Chart

\`\`\`python
df = px.data.tips()
fig = px.bar(df, x='day', y='total_bill', color='sex',
             barmode='group', title='Total Bill by Day and Gender')
fig.show()
\`\`\`

### Interactive Histogram

\`\`\`python
df = px.data.tips()
fig = px.histogram(df, x='total_bill', nbins=30, color='sex',
                   title='Distribution of Total Bill')
fig.show()
\`\`\`

### 3D Scatter Plot

\`\`\`python
df = px.data.iris()
fig = px.scatter_3d(df, x='sepal_length', y='sepal_width', z='petal_width',
                    color='species', size='petal_length',
                    title='3D Iris Dataset Visualization')
fig.show()
\`\`\`

### Choropleth Map

\`\`\`python
df = px.data.gapminder().query('year == 2007')
fig = px.choropleth(df, locations='iso_alpha', color='lifeExp',
                    hover_name='country', color_continuous_scale='Viridis',
                    title='World Life Expectancy 2007')
fig.show()
\`\`\`

## Real-World Example: Choosing the Right Chart

You surveyed 200 people on their favorite language and want to (a) show popularity and (b) explore whether age relates to hours coded per week.

\`\`\`python
import pandas as pd
import matplotlib.pyplot as plt
import seaborn as sns

df = pd.DataFrame({
    'language': ['Python', 'JS', 'Python', 'Java', 'Python', 'JS'],
    'age':      [24, 31, 28, 45, 22, 35],
    'hours':    [12, 6, 15, 3, 20, 8],
})

# (a) Popularity -> count plot (categorical)
sns.countplot(x='language', data=df, palette='deep')
plt.title('Favorite Language')
plt.show()

# (b) Relationship -> scatter (two numeric variables)
sns.scatterplot(x='age', y='hours', hue='language', data=df)
plt.title('Age vs Hours Coded/Week')
plt.show()
\`\`\`

Rule of thumb: **one categorical + counts → bar/count plot; two numeric → scatter/histogram; distribution → histogram/KDE; correlation matrix → heatmap.**

## Your Turn!

1. Take the \`df\` above and make a histogram of \`hours\` with \`sns.histplot(df['hours'], kde=True)\`.
2. Build a correlation heatmap from a numeric DataFrame with \`sns.heatmap(df.corr(), annot=True)\`.
3. Try \`px.scatter(px.data.iris(), x='sepal_width', y='sepal_length', color='species')\` in Plotly and hover the points — notice the interactivity Matplotlib can't give you.

> [!TIP]
> Use Matplotlib for publication-quality static plots, Seaborn for quick statistical visualizations, and Plotly for interactive dashboards and web applications.`,
  objectives: [
    "Create line, bar, scatter, histogram, and pie charts with Matplotlib.",
    "Build subplots and customize plot appearance.",
    "Create heatmaps, pair plots, and box plots with Seaborn.",
    "Visualize distributions with KDE and violin plots.",
    "Build interactive visualizations with Plotly.",
    "Choose the appropriate visualization library for each task."
  ],
  difficulty: "intermediate",
  xpReward: 70,
};
