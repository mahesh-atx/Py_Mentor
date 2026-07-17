export const jupyterNotebookLesson = {
  title: "Jupyter Notebook",
  slug: "jupyter-notebook",
  content: `# Jupyter Notebook

Jupyter Notebook is an interactive computing environment that lets you create and share documents containing live code, equations, visualizations, and narrative text. It's the standard tool for data science exploration and communication.

## What is Jupyter?

Jupyter provides:
- **Interactive code execution**: Run code cell by cell
- **Rich output**: Display tables, plots, images inline
- **Markdown support**: Write documentation alongside code
- **Kernel support**: Python, R, Julia, and 100+ languages
- **Shareable notebooks**: Export as .ipynb, HTML, PDF, slides

> [!NOTE]
> **Why this matters:** In a normal Python script, you run everything top-to-bottom. In a notebook, you run *cell by cell*, and the variables you create in one cell persist in the kernel for the next. That's liberating for exploration — tweak one step, re-run just that cell — but it's also a trap: the order you *ran* cells in can differ from the order they *appear* in, so a notebook can work for you but fail for someone who runs it top-to-bottom. Understanding the kernel is the key to using notebooks well.

## Installation

\`\`\`bash
pip install notebook
# Or for the newer interface:
pip install jupyterlab
\`\`\`

## Starting Jupyter

\`\`\`bash
# Start Jupyter Notebook
jupyter notebook

# Start JupyterLab (modern interface)
jupyter lab
\`\`\`

This opens a browser window at \`http://localhost:8888\`.

## Notebook Structure

A notebook consists of **cells**:

### Code Cells

\`\`\`python
# This is a code cell
import numpy as np
import pandas as pd

data = np.random.randn(100, 3)
df = pd.DataFrame(data, columns=['A', 'B', 'C'])
df.head()
\`\`\`

### Markdown Cells

\`\`\`markdown
# Heading 1
## Heading 2
### Heading 3

**Bold text** and *italic text*

- Bullet point 1
- Bullet point 2

1. Numbered item
2. Numbered item

[Link text](https://example.com)

![Image alt text](image.png)

\`\`\`python
# Code block in markdown
print("Hello")
\`\`\`

$$
E = mc^2
$$
\`\`\`

## Keyboard Shortcuts

| Shortcut | Action |
|----------|--------|
| \`Shift + Enter\` | Run cell and select below |
| \`Ctrl + Enter\` | Run cell and stay |
| \`Alt + Enter\` | Run cell and insert below |
| \`Esc\` | Enter command mode |
| \`Enter\` | Enter edit mode |
| \`A\` | Insert cell above |
| \`B\` | Insert cell below |
| \`D, D\` | Delete cell |
| \`M\` | Change to Markdown |
| \`Y\` | Change to Code |
| \`Z\` | Undo cell deletion |

## Magic Commands

Magic commands are special commands that start with \`%\` (line magic) or \`%%\` (cell magic).

### Line Magic Commands

\`\`\`python
%timeit sum(range(1000))      # Time execution
%time sum(range(1000))        # Time single execution
%who                          # List all variables
%whos                         # List variables with details
%reset                        # Clear all variables
%pwd                          # Print working directory
%ls                           # List files
%cd path/to/dir               # Change directory
%mkdir new_folder             # Create directory
%env                          # Show environment variables
%pip install package          # Install package in notebook
%matplotlib inline            # Show plots inline
\`\`\`

### Cell Magic Commands

\`\`\`python
%%time                          # Time entire cell
result = sum(range(1000000))

%%writefile script.py           # Write cell content to file
print("Hello from script!")

%%bash                          # Run bash commands
echo "Hello from bash"
ls -la

%%html                          # Render HTML
<h1 style="color: blue;">Hello</h1>

%%latex                         # Render LaTeX
$E = mc^2$
\`\`\`

## Working with Data

\`\`\`python
import pandas as pd
import numpy as np

# Load data
df = pd.read_csv('data.csv')

# Quick exploration
df.head()           # First 5 rows
df.tail()           # Last 5 rows
df.info()           # Column info and types
df.describe()       # Summary statistics
df.shape            # (rows, columns)
df.columns          # Column names
df.dtypes           # Data types
df.isnull().sum()   # Missing values per column
\`\`\`

> [!WARNING]
> **"Restart & Run All" is your truth test.** Because cells share a kernel, you can end up relying on a variable defined three cells ago in a run you've since forgotten. Before sharing or committing a notebook, hit *Kernel → Restart & Run All*. If it doesn't reproduce from scratch, neither will anyone else's. Notebooks also store *output* inside the \`.ipynb\` file, which makes Git diffs noisy — tools like \`nbstripout\` or Jupytext fix that.

## Inline Visualizations

\`\`\`python
import matplotlib.pyplot as plt
import seaborn as sns

# Display plots inline in the notebook
%matplotlib inline

# Create a plot
fig, axes = plt.subplots(1, 2, figsize=(12, 5))

# Histogram
axes[0].hist(df['column'], bins=30, edgecolor='black')
axes[0].set_title('Distribution')

# Scatter plot
axes[1].scatter(df['x'], df['y'], alpha=0.5)
axes[1].set_title('Scatter Plot')

plt.tight_layout()
plt.show()
\`\`\`

## Interactive Widgets

\`\`\`python
import ipywidgets as widgets
from IPython.display import display

# Slider
slider = widgets.IntSlider(value=5, min=0, max=10, step=1)
display(slider)

# Dropdown
dropdown = widgets.Dropdown(
    options=['Option 1', 'Option 2', 'Option 3'],
    value='Option 1',
    description='Choose:'
)
display(dropdown)

# Button
button = widgets.Button(description="Click Me!")
display(button)

# Interactive function
from ipywidgets import interact

@interact(x=(0, 10), y='Hello')
def greet(x, y):
    print(f"{y}! x = {x}")
\`\`\`

## Exporting Notebooks

\`\`\`bash
# Export to various formats
jupyter nbconvert --to html notebook.ipynb
jupyter nbconvert --to pdf notebook.ipynb
jupyter nbconvert --to script notebook.ipynb    # Python script
jupyter nbconvert --to slides notebook.ipynb     # Slides
jupyter nbconvert --to markdown notebook.ipynb   # Markdown
\`\`\`

## Jupyter vs IDEs

| Feature | Jupyter | IDE (VS Code/PyCharm) |
|---------|---------|----------------------|
| Interactive exploration | ✅ Excellent | ⚠️ Limited |
| Code organization | ⚠️ Basic | ✅ Excellent |
| Debugging | ⚠️ Limited | ✅ Excellent |
| Visualizations | ✅ Inline | ⚠️ Separate window |
| Documentation | ✅ Markdown cells | ⚠️ Comments |
| Version control | ⚠️ Difficult | ✅ Git integration |
| Large projects | ⚠️ Not ideal | ✅ Designed for it |

## Best Practices

1. **Restart and run all** before sharing — ensures reproducibility
2. **Keep cells focused** — one task per cell
3. **Use markdown** — document your thought process
4. **Clear output** — remove unnecessary output before sharing
5. **Version control** — use \`nbstripout\` or Jupytext for clean diffs
6. **Name notebooks clearly** — \`01_data_exploration.ipynb\`, \`02_modeling.ipynb\`
7. **Split large notebooks** — one notebook per analysis phase

## Jupytext — Pair Notebooks with Scripts

\`\`\`bash
pip install jupytext
\`\`\`

\`\`\`python
# Pair a notebook with a Python script
# Edit in either, changes sync automatically

# In notebook:
import jupytext
jupytext.write(notebook, 'script.py')

# Convert between formats
jupytext --to notebook script.py      # .py → .ipynb
jupytext --to py script.ipynb         # .ipynb → .py
\`\`\`

## Real-World Example: A Reproducible Analysis Notebook

A clean analysis notebook follows a predictable cell order so anyone can re-run it:

\`\`\`python
# Cell 1 — imports (always first)
import pandas as pd
import seaborn as sns
%matplotlib inline

# Cell 2 — load (never hardcode results)
df = pd.read_csv('survey.csv')

# Cell 3 — explore
print(df.shape)
print(df.isnull().sum())

# Cell 4 — visualize
sns.histplot(df['age'])
plt.show()
\`\`\`

Each cell does *one* job, imports come first, and nothing depends on a cell you ran by hand earlier. That discipline is what separates a shareable notebook from a personal scratchpad.

## Your Turn!

1. Open JupyterLab, create a notebook, and use \`%timeit\` on \`sum(range(10_000_000))\` to see how fast it is.
2. Write a Markdown cell explaining what your analysis does — future-you will thank you.
3. Run *Restart & Run All* and confirm your notebook still works from a clean kernel.

> [!TIP]
> Use Jupyter for exploration, visualization, and sharing results. Use a full IDE for production code, large projects, and debugging. Many data scientists use both — Jupyter for analysis, IDE for building packages and pipelines.`,
  objectives: [
    "Create and navigate Jupyter Notebooks.",
    "Use keyboard shortcuts for efficient workflow.",
    "Apply magic commands for common tasks.",
    "Create inline visualizations.",
    "Export notebooks to various formats.",
    "Follow best practices for reproducible notebooks."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
