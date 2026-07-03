
/**
 * Module 1 – Topic 1.1: Getting Started
 *
 * Lessons:
 *   1. What is Python?
 *   2. Installing Python
 *   3. Python Interpreter
 *   4. VS Code Setup
 *   5. Running Python Files
 */

export const gettingStartedLessons = [
  // ── Lesson 1: What is Python? ──────────────────────────────────
  {
    title: "What is Python?",
    slug: "what-is-python",
    content: `# What is Python?

Python is a **high-level, general-purpose, interpreted programming language** created by **Guido van Rossum**. Development began in the late 1980s, and the first public release appeared in **1991**. The language was named after the British comedy group *Monty Python*, reflecting the author's intention to make programming approachable and even enjoyable.

Python was designed around a core philosophy summarised in the document known as the **Zen of Python** (accessible by running \`import this\` in any Python shell). Central principles include:

- Readability counts.
- Explicit is better than implicit.
- Simple is better than complex.
- There should be one — and preferably only one — obvious way to do something.

These principles mean that Python code tends to be concise, self-documenting, and easy for other developers to read and maintain.

---

## Why Learn Python?

| Reason | Details |
|---|---|
| **Gentle Learning Curve** | Python's syntax is deliberately close to plain English. Beginners spend time learning programming concepts rather than fighting cryptic syntax. |
| **Versatility** | The same language is used for quick automation scripts, large-scale web applications, scientific research, and production machine-learning systems. |
| **Rich Ecosystem** | The Python Package Index (PyPI) hosts over 500,000 packages covering virtually every domain imaginable. |
| **Strong Community** | Python consistently ranks among the top three most-used languages worldwide, ensuring abundant tutorials, forums, and professional support. |
| **Market Demand** | Roles in data engineering, machine learning, backend development, and DevOps routinely list Python as a primary or preferred skill. |
| **Cross-Platform Compatibility** | A Python program written on Windows runs without modification on macOS or Linux, provided it uses the standard library or cross-platform packages. |

---

## Where is Python Used?

Python's breadth of application is one of its defining strengths. The following table outlines its major domains along with representative frameworks or tools:

| Domain | Common Tools & Frameworks |
|---|---|
| **Web Development** | Django, Flask, FastAPI |
| **Data Analysis** | Pandas, NumPy, Polars |
| **Machine Learning & AI** | Scikit-learn, TensorFlow, PyTorch, Keras |
| **Data Visualisation** | Matplotlib, Seaborn, Plotly |
| **Automation & Scripting** | Built-in libraries, Selenium, Playwright |
| **Scientific Computing** | SciPy, SymPy, Jupyter Notebooks |
| **DevOps & Cloud** | Ansible, AWS Boto3, Azure SDK |
| **Cybersecurity** | Scapy, Impacket, custom tooling |
| **Desktop Applications** | Tkinter, PyQt, wxPython |
| **Game Development** | Pygame, Panda3D |

---

## Interpreted vs. Compiled Languages

Understanding how Python executes code clarifies several of its behaviours.

### Compiled Languages (e.g., C, C++, Go)

1. You write source code.
2. A **compiler** translates the entire source into machine code (a binary executable).
3. The operating system runs the binary directly.
4. Compilation errors must be resolved before any code runs.

### Interpreted Languages (e.g., Python, Ruby)

1. You write source code in a \`.py\` file.
2. The **Python interpreter** reads and executes the code **line by line** at runtime.
3. There is no separate compilation step visible to the developer.

\`\`\`
Source Code (.py)  →  Python Interpreter  →  Output
\`\`\`

**Practical consequences of interpretation:**

- **Rapid development:** No build step means you can test changes immediately.
- **Interactive exploration:** Code can be executed one expression at a time in the REPL.
- **Runtime errors:** Certain errors (such as incorrect variable names) are only discovered when that specific line is reached during execution.
- **Performance trade-off:** Pure interpreted execution is generally slower than compiled machine code; however, performance-critical Python libraries (NumPy, TensorFlow) are implemented in C/C++ under the hood, largely eliminating this gap for data-intensive work.

> **Note:** Python actually compiles source code to an intermediate format called **bytecode** (\`.pyc\` files stored in \`__pycache__\`), which the **CPython Virtual Machine** then interprets. This step is invisible to developers but improves repeated execution speed.

\`\`\`python
# A complete, runnable Python program — no boilerplate, no class declarations required.
print("Hello, World!")
\`\`\`

---

## Python Versions

| Version Series | Status |
|---|---|
| **Python 2.x** | Officially end-of-life since **1 January 2020**. No security patches are issued. Legacy codebases may still use it, but all new development must target Python 3. |
| **Python 3.x** | The current, actively maintained line. New features, performance improvements, and security fixes are released regularly. |

> **Important:** Throughout this course, all examples and exercises target **Python 3**. If you encounter Python 2 syntax in older tutorials online (e.g., \`print "Hello"\` without parentheses), recognise it as outdated and do not follow that style.

---

## A Brief Timeline of Python

| Year | Milestone |
|---|---|
| 1991 | Python 0.9.0 released by Guido van Rossum |
| 1994 | Python 1.0 — added lambda, map, filter, reduce |
| 2000 | Python 2.0 — list comprehensions, garbage collection |
| 2008 | Python 3.0 — major redesign; broke backward compatibility intentionally |
| 2020 | Python 2 reaches end-of-life |
| 2023–present | Python 3.11+ with significant performance improvements (up to 60% faster than 3.10) |`,

    objectives: [
      "Describe what Python is and summarise its history and design philosophy",
      "Articulate the key reasons Python is widely adopted in both industry and academia",
      "Identify the primary application domains where Python is used professionally",
      "Explain the difference between interpreted and compiled languages and describe how Python executes code",
      "Distinguish between Python 2 and Python 3 and explain why Python 3 must always be used",
    ],
    examples: [
      {
        title: "Hello, World",
        code: 'print("Hello, World!")',
        output: "Hello, World!",
      },
      {
        title: "Variables and String Formatting",
        code: 'language = "Python"\nyear = 1991\nprint(f"{language} was first released in {year}.")',
        output: "Python was first released in 1991.",
      },
      {
        title: "Viewing the Zen of Python",
        code: "import this",
        output:
          "The Zen of Python, by Tim Peters\n\nBeautiful is better than ugly.\nExplicit is better than implicit.\nSimple is better than complex.\n...",
      },
    ],
  },

  // ── Lesson 2: Installing Python ────────────────────────────────
  {
    title: "Installing Python",
    slug: "installing-python",
    content: `# Installing Python

Before writing or executing any Python code, you must install the Python interpreter on your machine. This lesson covers the complete installation procedure for **Windows**, **macOS**, and **Linux**, as well as how to verify a successful installation.

---

## Obtaining the Installer

Always download Python from the **official source** to avoid modified or malicious distributions:

\`\`\`
https://www.python.org/downloads/
\`\`\`

The website automatically detects your operating system and presents the latest stable release. As of this writing, the current release is in the **Python 3.12.x** series.

---

## Installation on Windows

### Step-by-Step

1. Run the downloaded \`.exe\` installer (e.g., \`python-3.12.4-amd64.exe\`).
2. On the first screen, enable the checkbox labelled **"Add Python 3.x to PATH"** before proceeding. This is the most common source of post-installation issues if omitted.
3. Select **"Install Now"** for the default installation, which includes pip and the standard library.
4. If prompted by User Account Control, click **Yes**.
5. When the installer reports success, click **Close**.

### Verifying on Windows

Open **Command Prompt** (search for \`cmd\` in the Start menu) and run:

\`\`\`bash
python --version
\`\`\`

Expected output:

\`\`\`
Python 3.12.4
\`\`\`

> **PATH Explained:** The PATH environment variable is a list of directories the operating system searches when you type a command. Adding Python to PATH means typing \`python\` in any terminal will find the interpreter regardless of which folder you are currently in. If you skipped this step, you must either reinstall or manually add Python's installation directory to PATH through System Properties.

---

## Installation on macOS

macOS ships with a legacy Python 2.7 installation for internal system use. You must install Python 3 separately and should not alter the system Python.

### Using the Official Installer

Download the \`.pkg\` installer from \`python.org\`, double-click it, and follow the prompts. After installation, verify with:

\`\`\`bash
python3 --version
\`\`\`

### Using Homebrew (Recommended for Developers)

Homebrew is a widely used package manager for macOS that simplifies installing and updating developer tools:

\`\`\`bash
# Install Homebrew if not already present
/bin/bash -c "$(curl -fsSL https://raw.githubusercontent.com/Homebrew/install/HEAD/install.sh)"

# Install Python 3
brew install python3

# Verify
python3 --version
pip3 --version
\`\`\`

> **Note:** On macOS, the command \`python\` may refer to the system Python 2. Always use \`python3\` and \`pip3\` on macOS unless you have configured an alias or virtual environment.

---

## Installation on Linux

Most Linux distributions include Python 3 in their default installation. Confirm with:

\`\`\`bash
python3 --version
\`\`\`

If it is absent or outdated, install it using your distribution's package manager:

\`\`\`bash
# Debian / Ubuntu
sudo apt update
sudo apt install python3 python3-pip

# Fedora / RHEL
sudo dnf install python3 python3-pip

# Arch Linux
sudo pacman -S python python-pip
\`\`\`

---

## Verifying pip

**pip** (Pip Installs Packages) is Python's standard package manager. It is bundled with Python 3 installers from \`python.org\` and most Linux packages.

\`\`\`bash
pip --version
# or, on macOS/Linux:
pip3 --version
\`\`\`

Example output:

\`\`\`
pip 24.0 from /usr/local/lib/python3.12/site-packages/pip (python 3.12)
\`\`\`

You will use pip extensively throughout the course to install third-party libraries:

\`\`\`bash
pip install requests
pip install numpy pandas
\`\`\`

---

## Checking Installation from Within Python

You can confirm the exact interpreter version from inside a Python script, which is useful for debugging environment issues:

\`\`\`python
import sys
print(sys.version)
print(sys.executable)
\`\`\`

---

## Recommended: Using Virtual Environments

A **virtual environment** is an isolated Python environment for a specific project. It prevents dependency conflicts between projects and is considered professional best practice.

\`\`\`bash
# Create a virtual environment named 'venv'
python -m venv venv

# Activate on Windows
venv\\Scripts\\activate

# Activate on macOS/Linux
source venv/bin/activate

# Your prompt changes to indicate the active environment
(venv) $

# Deactivate when done
deactivate
\`\`\`

> Virtual environments are covered in depth in a later module. For now, focus on confirming that Python is installed and accessible globally.

---

## Installation Checklist

| Task | Command to Verify |
|---|---|
| Python 3 installed | \`python --version\` or \`python3 --version\` |
| pip available | \`pip --version\` or \`pip3 --version\` |
| Python accessible from any directory | Open a new terminal and run \`python --version\` |`,

    objectives: [
      "Download the correct Python 3 installer from the official Python website",
      "Install Python on Windows, ensuring it is added to the system PATH",
      "Install Python on macOS using either the official installer or Homebrew",
      "Install Python on Linux using the appropriate package manager",
      "Verify the installation of both Python and pip from the command line",
      "Understand the purpose of virtual environments and how to create one",
    ],
    examples: [
      {
        title: "Verify Python Version from a Script",
        code: "import sys\nprint('Python version:', sys.version)\nprint('Interpreter path:', sys.executable)",
        output:
          "Python version: 3.12.4 (main, Jun  6 2024, 18:26:44)\nInterpreter path: /usr/local/bin/python3",
      },
      {
        title: "Check Available Modules",
        code: "import sys\nprint('Total built-in modules:', len(sys.stdlib_module_names))",
        output: "Total built-in modules: 305",
      },
    ],
  },

  // ── Lesson 3: Python Interpreter ───────────────────────────────
  {
    title: "Python Interpreter",
    slug: "python-interpreter",
    content: `# The Python Interpreter

The Python interpreter is the core program responsible for **reading, parsing, and executing** Python source code. Understanding how it works — and how to interact with it directly — is foundational to becoming an effective Python developer.

---

## How the Interpreter Works

When you run a Python program, the following sequence occurs internally:

1. **Lexing:** The source code is broken into tokens (keywords, operators, identifiers, literals).
2. **Parsing:** Tokens are analysed against Python's grammar to produce an **Abstract Syntax Tree (AST)**.
3. **Compilation:** The AST is compiled to **bytecode** — a lower-level, platform-independent set of instructions.
4. **Execution:** The **CPython Virtual Machine** reads and executes the bytecode line by line.

\`\`\`
Source Code (.py)
      |
      v
   Lexer / Tokeniser
      |
      v
   Parser -> Abstract Syntax Tree (AST)
      |
      v
   Compiler -> Bytecode (.pyc in __pycache__)
      |
      v
   CPython Virtual Machine -> Output
\`\`\`

This process happens automatically every time you run a \`.py\` file. The bytecode cache (\`__pycache__\`) avoids re-compiling unchanged files, improving startup performance.

---

## CPython: The Reference Implementation

**CPython** is the default and most widely used implementation of Python, written in C. When people say "Python", they almost always mean CPython.

Other implementations exist for specialised use cases:

| Implementation | Language | Use Case |
|---|---|---|
| **CPython** | C | Standard, general-purpose Python |
| **PyPy** | Python/RPython | High-performance execution via JIT compilation |
| **Jython** | Java | Python running on the Java Virtual Machine |
| **IronPython** | C# | Python integrated with the .NET ecosystem |
| **MicroPython** | C | Python for microcontrollers and embedded systems |

---

## Interactive Mode — The REPL

The interpreter can operate in **interactive mode**, commonly called the **REPL** (Read-Eval-Print Loop). It reads an expression, evaluates it, prints the result, and loops back for the next input.

### Launching the REPL

\`\`\`bash
python
\`\`\`

On macOS/Linux where \`python\` may refer to Python 2:

\`\`\`bash
python3
\`\`\`

You will see a prompt similar to:

\`\`\`
Python 3.12.4 (main, Jun  6 2024, 18:26:44)
[GCC 13.2.0] on linux
Type "help", "copyright", "credits" or "license" for more information.
>>>
\`\`\`

The \`>>>\` symbol is the **primary prompt**, indicating the interpreter is ready for input.

---

## Using the REPL

\`\`\`python
>>> 2 + 3
5

>>> 10 ** 2
100

>>> "Python" + " " + "Interpreter"
'Python Interpreter'

>>> len("Hello, World!")
13

>>> type(3.14)
<class 'float'>

>>> name = "Alice"
>>> print(f"Hello, {name}!")
Hello, Alice!
\`\`\`

Notice that **expressions** (like \`2 + 3\`) automatically display their result in the REPL without requiring \`print()\`. In a script file, you must use \`print()\` explicitly to see output.

### Multi-Line Input in the REPL

The **secondary prompt** \`...\` appears when the interpreter expects more input (e.g., inside a function, loop, or conditional):

\`\`\`python
>>> for i in range(3):
...     print(i)
...
0
1
2
\`\`\`

Press **Enter** on an empty \`...\` line to execute the block.

---

## Exiting the REPL

\`\`\`python
>>> exit()
\`\`\`

Alternatively:
- **Windows:** \`Ctrl + Z\`, then \`Enter\`
- **macOS / Linux:** \`Ctrl + D\`

---

## Script Mode

While the REPL is invaluable for experimentation, real programs are written in \`.py\` files and executed in **script mode**:

\`\`\`bash
python app.py
\`\`\`

The interpreter reads the entire file, compiles it to bytecode, and executes it. Output is only shown via explicit \`print()\` calls.

---

## Comparing Interactive Mode and Script Mode

| Characteristic | Interactive Mode (REPL) | Script Mode |
|---|---|---|
| **How to launch** | Type \`python\` in terminal | Type \`python filename.py\` |
| **Code persistence** | Lost when session ends | Saved in a \`.py\` file |
| **Output** | Expressions auto-displayed | Must use \`print()\` |
| **Best suited for** | Quick tests, exploration, debugging snippets | Building complete programs and projects |
| **Error handling** | One statement at a time; errors are isolated | Unhandled errors terminate the entire script |

---

## Useful Built-in REPL Helpers

The REPL includes several built-in utilities for self-documentation:

\`\`\`python
# View documentation for any object or function
>>> help(print)

# List all attributes and methods of an object
>>> dir([])

# Check the type of any object
>>> type(42)
<class 'int'>

# Get the memory address of an object
>>> id("hello")
140234567890
\`\`\`

> **Professional Tip:** Developing the habit of using \`help()\` and \`dir()\` directly in the REPL reduces the need to switch to a browser for documentation lookup on standard library functions.`,

    objectives: [
      "Describe the internal steps the Python interpreter takes when executing source code",
      "Explain what CPython is and how it differs from other Python implementations",
      "Launch and use the Python REPL (interactive mode) effectively",
      "Distinguish between the primary prompt and secondary prompt in the REPL",
      "Compare interactive mode and script mode and determine when to use each",
      "Use built-in REPL utilities such as help(), dir(), and type()",
    ],
    examples: [
      {
        title: "Arithmetic in the REPL",
        code: "print(2 + 3)\nprint(10 ** 2)\nprint(100 / 4)\nprint(17 % 5)",
        output: "5\n100\n25.0\n2",
      },
      {
        title: "Inspecting Types",
        code: 'print(type(42))\nprint(type(3.14))\nprint(type("hello"))\nprint(type(True))',
        output:
          "<class 'int'>\n<class 'float'>\n<class 'str'>\n<class 'bool'>",
      },
      {
        title: "Using dir() to Explore an Object",
        code: "methods = [m for m in dir(str) if not m.startswith('_')]\nprint(methods[:8])",
        output:
          "['capitalize', 'casefold', 'center', 'count', 'encode', 'endswith', 'expandtabs', 'find']",
      },
    ],
  },

  // ── Lesson 4: VS Code Setup ────────────────────────────────────
  {
    title: "VS Code Setup",
    slug: "vs-code-setup",
    content: `# Setting Up Visual Studio Code for Python

**Visual Studio Code (VS Code)** is a free, open-source, cross-platform code editor developed by Microsoft. It has become the most popular editor for Python development due to its lightweight footprint, extensive extension ecosystem, integrated terminal, debugging tools, and active community.

This lesson walks through a professional VS Code configuration for Python development from scratch.

---

## Step 1: Download and Install VS Code

Download the appropriate installer for your operating system from the official website:

\`\`\`
https://code.visualstudio.com/
\`\`\`

| Operating System | Installer Type |
|---|---|
| Windows | \`.exe\` user or system installer |
| macOS | \`.dmg\` or install via \`brew install --cask visual-studio-code\` |
| Linux | \`.deb\`, \`.rpm\`, or Snap package |

Follow the installer prompts. On Windows, enable the options **"Add to PATH"** and **"Open with Code"** context menu entries for convenience.

---

## Step 2: Install the Python Extension

The Python extension (published by Microsoft) transforms VS Code into a fully featured Python IDE.

1. Open VS Code.
2. Open the Extensions panel: **View → Extensions** or press \`Ctrl + Shift + X\`.
3. In the search bar, type \`Python\`.
4. Locate the extension published by **Microsoft** (identified by the verified badge and millions of installs).
5. Click **Install**.

**Capabilities provided by this extension:**

| Feature | Description |
|---|---|
| Syntax Highlighting | Keywords, strings, functions, and operators rendered in distinct colours |
| IntelliSense | Context-aware auto-completion for variables, functions, and module members |
| Linting | Real-time detection of syntax errors and style violations (via Pylint or Flake8) |
| Code Formatting | Automatic formatting on save using Black, autopep8, or yapf |
| Debugging | Visual breakpoints, variable inspection, call stack navigation |
| Test Integration | Run and debug Pytest or unittest test suites from the editor |
| Jupyter Support | Execute Jupyter notebooks directly inside VS Code |

---

## Step 3: Install Pylance

**Pylance** is a high-performance language server for Python that significantly enhances IntelliSense beyond what the base Python extension provides.

1. Search for \`Pylance\` in the Extensions panel.
2. Install the extension published by Microsoft.
3. When prompted, set Pylance as the default language server.

Pylance provides:
- Fast, accurate auto-completion
- Type inference and static type checking
- Import suggestions
- Detailed hover documentation

---

## Step 4: Select the Python Interpreter

VS Code must know which Python installation to use. If you have multiple versions installed (common on macOS/Linux), this step is essential.

1. Press \`Ctrl + Shift + P\` to open the **Command Palette**.
2. Type \`Python: Select Interpreter\` and press \`Enter\`.
3. A list of detected Python installations appears. Select the version you installed (e.g., \`Python 3.12.4\`).

The selected interpreter is shown in the **status bar** at the bottom-left of the window. Click it at any time to change the interpreter.

> **Virtual Environments:** If you create a virtual environment inside your project folder (\`python -m venv venv\`), VS Code will detect it automatically and prompt you to select it as the workspace interpreter. Always accept this for project-specific work.

---

## Step 5: Configure Settings for Python

Open VS Code settings with \`Ctrl + ,\` and configure the following recommended options:

\`\`\`json
{
  "editor.formatOnSave": true,
  "editor.tabSize": 4,
  "editor.insertSpaces": true,
  "editor.rulers": [79, 99],
  "python.linting.enabled": true,
  "python.linting.pylintEnabled": true,
  "python.formatting.provider": "black",
  "files.trimTrailingWhitespace": true,
  "editor.renderWhitespace": "boundary"
}
\`\`\`

| Setting | Purpose |
|---|---|
| \`formatOnSave\` | Automatically format code when saving a file |
| \`tabSize: 4\` | Python convention uses 4-space indentation (PEP 8) |
| \`rulers\` | Visual guides at 79 and 99 characters (PEP 8 line length recommendations) |
| \`trimTrailingWhitespace\` | Removes invisible trailing spaces, keeping files clean |

---

## Step 6: Create and Run Your First File

1. Open a project folder: **File → Open Folder** and select or create an empty directory.
2. Create a new file: click the **New File** icon in the Explorer panel or use **File → New File**.
3. Save the file as \`hello.py\` — VS Code will automatically activate Python mode.
4. Enter the following code:

\`\`\`python
# hello.py
message = "Hello from Visual Studio Code!"
print(message)
\`\`\`

5. Run the file using one of the following methods:
   - Click the **Run Python File** button (triangle icon) in the top-right corner.
   - Right-click in the editor and select **Run Python File in Terminal**.
   - Open the integrated terminal (\`Ctrl + \`\`\`) and type \`python hello.py\`.

---

## Essential Keyboard Shortcuts

| Shortcut | Action |
|---|---|
| \`Ctrl + S\` | Save the current file |
| \`Ctrl + \`\`\` | Open / close the integrated terminal |
| \`Ctrl + Shift + P\` | Open the Command Palette |
| \`Ctrl + Shift + X\` | Open the Extensions panel |
| \`Ctrl + /\` | Toggle line comment |
| \`Alt + Shift + F\` | Format the entire document |
| \`F5\` | Start debugging |
| \`F9\` | Toggle a breakpoint on the current line |
| \`Ctrl + D\` | Select the next occurrence of the current selection |
| \`Ctrl + Shift + K\` | Delete the current line |
| \`Alt + Up / Down\` | Move the current line up or down |

---

## Recommended Extensions

| Extension | Publisher | Purpose |
|---|---|---|
| **Python** | Microsoft | Core Python language support |
| **Pylance** | Microsoft | Enhanced IntelliSense and type checking |
| **Black Formatter** | Microsoft | Opinionated, PEP 8–compliant code formatter |
| **GitLens** | GitKraken | Advanced Git history and blame annotations |
| **indent-rainbow** | oderwat | Colour-coded indentation levels for readability |
| **Error Lens** | Alexander | Inline display of errors and warnings |
| **Path IntelliSense** | Christian Kohler | Auto-complete for file paths in code |

---

## The Integrated Terminal

VS Code's built-in terminal runs a real shell (PowerShell, Bash, Zsh) inside the editor, eliminating the need to switch windows. Open it with \`Ctrl + \`\`\` and run Python commands directly:

\`\`\`bash
python hello.py
python --version
pip install requests
\`\`\`

You can open multiple terminal instances and switch between them using the dropdown in the terminal panel.`,

    objectives: [
      "Download and install VS Code on Windows, macOS, or Linux",
      "Install and configure the Python and Pylance extensions",
      "Select the correct Python interpreter for a project",
      "Configure VS Code settings to align with Python best practices (PEP 8)",
      "Create, save, and run a Python file using VS Code",
      "Use essential keyboard shortcuts to work efficiently in VS Code",
    ],
    examples: [
      {
        title: "First VS Code Program",
        code: '# hello.py\nmessage = "Hello from Visual Studio Code!"\nprint(message)\nprint("Python environment is configured correctly.")',
        output:
          "Hello from Visual Studio Code!\nPython environment is configured correctly.",
      },
      {
        title: "Displaying Environment Information",
        code: "import sys\nimport os\n\nprint('Python version :', sys.version)\nprint('Interpreter    :', sys.executable)\nprint('Working dir    :', os.getcwd())",
        output:
          "Python version : 3.12.4 (main, Jun  6 2024, 18:26:44)\nInterpreter    : /usr/local/bin/python3\nWorking dir    : /home/user/projects/my-project",
      },
    ],
  },

  // ── Lesson 5: Running Python Files ─────────────────────────────
  {
    title: "Running Python Files",
    slug: "running-python-files",
    content: `# Running Python Files

With Python installed and VS Code configured, you are ready to write and execute complete Python programs. This lesson covers every method of running Python files, explains the file execution model, and addresses the most common errors you will encounter.

---

## Python File Conventions

Python source files use the \`.py\` extension. File names should follow these conventions to align with Python community standards (PEP 8):

- Use **lowercase letters** only.
- Separate words with **underscores** (snake_case).
- Avoid spaces, hyphens, and special characters.

| Recommended | Avoid |
|---|---|
| \`app.py\` | \`App.py\` |
| \`data_processor.py\` | \`data-processor.py\` |
| \`user_authentication.py\` | \`User Authentication.py\` |

---

## Creating a Python File

Create a file named \`app.py\` with the following content:

\`\`\`python
# app.py
print("Hello, Python!")
print("This is my first Python program.")
print("Running Python files is straightforward.")
\`\`\`

The \`#\` symbol marks a **comment**. Comments are ignored by the interpreter and serve as documentation for human readers.

---

## Method 1: Running from the System Terminal

This is the most fundamental and universally available method.

1. Open a terminal (Command Prompt, PowerShell, Bash, Zsh, etc.).
2. Navigate to the directory containing your file using \`cd\`:

\`\`\`bash
cd path/to/your/project
\`\`\`

3. Run the file:

\`\`\`bash
python app.py
\`\`\`

Output:

\`\`\`
Hello, Python!
This is my first Python program.
Running Python files is straightforward.
\`\`\`

---

## Method 2: Using the VS Code Run Button

1. Open the file in VS Code.
2. Click the **Run Python File** button (a triangle icon) in the top-right corner of the editor.
3. VS Code opens the integrated terminal automatically and executes the file.

This method is equivalent to running \`python app.py\` in the terminal but requires no manual navigation.

---

## Method 3: Using the VS Code Integrated Terminal

1. With the file open in VS Code, press \`Ctrl + \`\`\` to open the integrated terminal.
2. The terminal opens at the root of your project folder automatically.
3. Run the file:

\`\`\`bash
python app.py
\`\`\`

This approach is preferred when you need to pass **command-line arguments** or observe the terminal environment alongside the code.

---

## Method 4: Using the Right-Click Context Menu

Right-click anywhere in the editor body (not the tab) and select:

\`\`\`
Run Python File in Terminal
\`\`\`

VS Code executes the file in the integrated terminal.

---

## Passing Command-Line Arguments

Python programs can receive arguments from the terminal via \`sys.argv\`:

\`\`\`python
# greet.py
import sys

if len(sys.argv) > 1:
    name = sys.argv[1]
else:
    name = "World"

print(f"Hello, {name}!")
\`\`\`

\`\`\`bash
python greet.py Alice
\`\`\`

\`\`\`
Hello, Alice!
\`\`\`

---

## Understanding the \`__name__\` Variable

Every Python module has a built-in variable called \`__name__\`. Its value depends on how the file is being used:

| Scenario | Value of \`__name__\` |
|---|---|
| File is run directly | \`"__main__"\` |
| File is imported as a module | The file's name without \`.py\` (e.g., \`"app"\`) |

This distinction allows a file to behave differently depending on whether it is executed directly or imported by another module — a pattern used extensively in professional Python development:

\`\`\`python
# app.py

def greet(name):
    return f"Hello, {name}!"

def main():
    print(greet("Python"))

if __name__ == "__main__":
    main()
\`\`\`

When you run \`python app.py\`, \`main()\` is called. When another file imports \`app\`, \`main()\` is **not** called automatically — only the \`greet\` function becomes available as an imported function.

---

## Diagnosing Common Errors

### 1. FileNotFoundError

\`\`\`
python: can't open file 'app.py': [Errno 2] No such file or directory
\`\`\`

**Cause:** The interpreter cannot find the specified file in the current directory.

**Fix:** Verify you are in the correct directory with \`pwd\` (macOS/Linux) or \`cd\` (Windows), and confirm the filename and extension are correct.

---

### 2. SyntaxError

\`\`\`
  File "app.py", line 2
    print("Hello)
               ^
SyntaxError: unterminated string literal detected at line 2
\`\`\`

**Cause:** A structural error in the code — missing closing quote, bracket, or colon.

**Fix:** Read the error message carefully. It specifies the file name, line number, and the location of the problem. Fix the indicated line.

---

### 3. IndentationError

\`\`\`
  File "app.py", line 4
    print("Indented incorrectly")
    ^
IndentationError: unexpected indent
\`\`\`

**Cause:** Python uses indentation (whitespace) to define code blocks. Mixed tabs and spaces, or incorrect indentation, cause this error.

**Fix:** Use 4 spaces consistently. Configure VS Code to convert tabs to spaces automatically (\`editor.insertSpaces: true\`).

---

### 4. ModuleNotFoundError

\`\`\`
ModuleNotFoundError: No module named 'requests'
\`\`\`

**Cause:** You are attempting to import a third-party library that has not been installed.

**Fix:** Install the library using pip:

\`\`\`bash
pip install requests
\`\`\`

---

### 5. "python is not recognised"

\`\`\`
'python' is not recognized as an internal or external command,
operable program or batch file.
\`\`\`

**Cause (Windows):** Python was not added to PATH during installation.

**Fix:** Reinstall Python and check "Add Python to PATH", or manually add the Python installation directory to the PATH environment variable through System Properties.

---

## Organising Multiple Files

Larger projects consist of multiple \`.py\` files. Each file can be run independently or imported by other files:

\`\`\`bash
python module_one.py
python module_two.py
python main.py
\`\`\`

File organisation becomes increasingly important as projects grow. Python uses **packages** (directories containing an \`__init__.py\` file) to group related modules — a concept covered in later modules.

---

## Summary: Running Methods Compared

| Method | Command / Action | Best For |
|---|---|---|
| System terminal | \`python app.py\` | Full control, scripting, automation |
| VS Code Run button | Click triangle icon | Quick one-click execution |
| VS Code terminal | \`python app.py\` inside VS Code | Integrated workflow |
| Right-click menu | "Run Python File in Terminal" | Fast execution without shortcuts |

> **Best Practice:** Always save your file with \`Ctrl + S\` before executing it. VS Code can be configured to auto-save, but developing the habit of explicit saving prevents confusion when changes are not reflected in output.`,

    objectives: [
      "Create correctly named Python source files following PEP 8 conventions",
      "Run Python files using the system terminal, VS Code run button, and VS Code integrated terminal",
      "Pass command-line arguments to a Python script and access them via sys.argv",
      "Explain the purpose and behaviour of the __name__ variable",
      "Apply the if __name__ == '__main__' pattern correctly",
      "Diagnose and resolve the five most common errors encountered when running Python files",
    ],
    examples: [
      {
        title: "Basic Script Execution",
        code: '# app.py\nprint("Hello, Python!")\nprint("This is my first Python program.")\nprint("Running Python files is straightforward.")',
        output:
          "Hello, Python!\nThis is my first Python program.\nRunning Python files is straightforward.",
      },
      {
        title: "The __name__ Guard Pattern",
        code: 'def greet(name):\n    return f"Hello, {name}!"\n\ndef main():\n    result = greet("Python Developer")\n    print(result)\n\nif __name__ == "__main__":\n    main()',
        output: "Hello, Python Developer!",
      },
      {
        title: "Reading Command-Line Arguments",
        code: 'import sys\n\nargs = sys.argv[1:]  # Exclude the script name itself\nprint("Arguments received:", args)\nprint("Number of arguments:", len(args))',
        output: "Arguments received: []\nNumber of arguments: 0",
      },
    ],
  },
];

// ============================================================
// Module 1 – Topic 1.1: Getting Started
// Practice Questions & Quiz Questions
// ============================================================

export const gettingStartedPractice = {
  topicSlug: "getting-started",
  lessons: [
    {
      lessonSlug: "what-is-python",
      quiz: [
        {
          id: "gs-q1-1",
          type: "multiple-choice",
          difficulty: "beginner",
          question: "Who created Python?",
          options: [
            "Linus Torvalds",
            "Guido van Rossum",
            "Dennis Ritchie",
            "James Gosling",
          ],
          answer: "Guido van Rossum",
          explanation:
            "Python was created by Guido van Rossum. Development began in the late 1980s and the first public release appeared in 1991.",
        },
        {
          id: "gs-q1-2",
          type: "multiple-choice",
          difficulty: "beginner",
          question: "What does 'interpreted language' mean?",
          options: [
            "The code is translated to machine code before running",
            "The code is executed line by line at runtime",
            "The code must be compiled into a binary file",
            "The language requires a virtual machine to install",
          ],
          answer: "The code is executed line by line at runtime",
          explanation:
            "An interpreter processes and executes source code line by line at runtime, unlike a compiler which translates the entire program before execution.",
        },
        {
          id: "gs-q1-3",
          type: "true-false",
          difficulty: "beginner",
          question: "Python 2 is still actively maintained and receives security updates.",
          answer: false,
          explanation:
            "Python 2 reached official end-of-life on 1 January 2020. It no longer receives any updates, security patches, or new features.",
        },
        {
          id: "gs-q1-4",
          type: "multiple-choice",
          difficulty: "beginner",
          question: "Which of the following is NOT a domain where Python is commonly used?",
          options: [
            "Machine Learning",
            "Web Development",
            "Operating System Kernel Development",
            "Data Analysis",
          ],
          answer: "Operating System Kernel Development",
          explanation:
            "OS kernels are typically written in low-level languages like C. Python is widely used in ML, web development, automation, and data analysis but is not suited for kernel-level programming.",
        },
        {
          id: "gs-q1-5",
          type: "multiple-choice",
          difficulty: "intermediate",
          question:
            "When Python runs a .py file, what intermediate format does it compile to before execution?",
          options: ["Assembly code", "Machine code", "Bytecode", "HTML"],
          answer: "Bytecode",
          explanation:
            "Python compiles source code to bytecode (.pyc files stored in __pycache__), which is then executed by the CPython Virtual Machine.",
        },
      ],
    },
    {
      lessonSlug: "installing-python",
      quiz: [
        {
          id: "gs-q2-1",
          type: "multiple-choice",
          difficulty: "beginner",
          question: "Where should you always download Python from?",
          options: [
            "python.com",
            "python.org",
            "github.com/python",
            "pypi.org",
          ],
          answer: "python.org",
          explanation:
            "Always download Python from the official website python.org to avoid unofficial or potentially modified distributions.",
        },
        {
          id: "gs-q2-2",
          type: "true-false",
          difficulty: "beginner",
          question:
            "On Windows, forgetting to check 'Add Python to PATH' during installation prevents you from running Python from the command line.",
          answer: true,
          explanation:
            "If Python is not added to PATH, the operating system cannot find the python command. You would need to reinstall or manually add the Python directory to PATH.",
        },
        {
          id: "gs-q2-3",
          type: "multiple-choice",
          difficulty: "beginner",
          question: "What is the purpose of pip?",
          options: [
            "To compile Python code",
            "To install and manage Python packages",
            "To run Python scripts",
            "To format Python code",
          ],
          answer: "To install and manage Python packages",
          explanation:
            "pip is Python's package manager. It is used to install, upgrade, and remove third-party libraries from the Python Package Index (PyPI).",
        },
        {
          id: "gs-q2-4",
          type: "multiple-choice",
          difficulty: "intermediate",
          question:
            "Which command creates a virtual environment named 'venv' in the current directory?",
          options: [
            "python --venv venv",
            "python -m venv venv",
            "pip create venv",
            "virtualenv --create venv",
          ],
          answer: "python -m venv venv",
          explanation:
            "The -m flag tells Python to run a module as a script. `python -m venv venv` runs the venv module to create a virtual environment in a folder named venv.",
        },
        {
          id: "gs-q2-5",
          type: "multiple-choice",
          difficulty: "beginner",
          question:
            "On macOS, why should you NOT use the pre-installed Python for development?",
          options: [
            "It is Python 2, which is end-of-life",
            "It requires a paid license",
            "It does not support pip",
            "It only runs in the browser",
          ],
          answer: "It is Python 2, which is end-of-life",
          explanation:
            "macOS ships with Python 2.7 for internal system use. This version is end-of-life and should not be used for development. Install Python 3 separately using the official installer or Homebrew.",
        },
      ],
    },
    {
      lessonSlug: "python-interpreter",
      quiz: [
        {
          id: "gs-q3-1",
          type: "multiple-choice",
          difficulty: "beginner",
          question: "What does the >>> symbol indicate in a Python terminal?",
          options: [
            "An error has occurred",
            "The interpreter is ready for input",
            "A comment in the code",
            "Output from the program",
          ],
          answer: "The interpreter is ready for input",
          explanation:
            "The >>> is the primary prompt of the Python REPL (interactive interpreter), indicating it is waiting for you to type a command or expression.",
        },
        {
          id: "gs-q3-2",
          type: "multiple-choice",
          difficulty: "beginner",
          question: "What does REPL stand for?",
          options: [
            "Run, Execute, Print, Loop",
            "Read, Eval, Print, Loop",
            "Read, Execute, Process, Loop",
            "Run, Evaluate, Parse, Launch",
          ],
          answer: "Read, Eval, Print, Loop",
          explanation:
            "REPL stands for Read-Eval-Print Loop — the interpreter reads input, evaluates it, prints the result, and loops back for the next input.",
        },
        {
          id: "gs-q3-3",
          type: "true-false",
          difficulty: "beginner",
          question:
            "In a .py script file, typing a bare expression like `2 + 3` on its own line will display the result when the file is run.",
          answer: false,
          explanation:
            "In script mode, bare expressions produce no output. You must use print(2 + 3) to see the result. This is different from the REPL where expressions automatically display their value.",
        },
        {
          id: "gs-q3-4",
          type: "multiple-choice",
          difficulty: "beginner",
          question:
            "Which keyboard shortcut exits the Python interactive interpreter on macOS and Linux?",
          options: ["Ctrl + C", "Ctrl + D", "Ctrl + Z", "Ctrl + Q"],
          answer: "Ctrl + D",
          explanation:
            "Ctrl + D sends an EOF (End of File) signal on Unix-based systems, which exits the REPL. On Windows, the equivalent is Ctrl + Z followed by Enter. You can also type exit().",
        },
        {
          id: "gs-q3-5",
          type: "multiple-choice",
          difficulty: "intermediate",
          question:
            "What is the secondary prompt ... (three dots) in the Python REPL used for?",
          options: [
            "Indicating that Python is processing a long calculation",
            "Indicating that more input is expected to complete a multi-line block",
            "Showing the previous result",
            "Indicating a syntax error",
          ],
          answer:
            "Indicating that more input is expected to complete a multi-line block",
          explanation:
            "The ... prompt appears when the interpreter is waiting for the continuation of a multi-line statement such as a for loop, function definition, or if statement.",
        },
      ],
    },
    {
      lessonSlug: "vs-code-setup",
      quiz: [
        {
          id: "gs-q4-1",
          type: "multiple-choice",
          difficulty: "beginner",
          question:
            "Which keyboard shortcut opens the integrated terminal in VS Code?",
          options: ["Ctrl + T", "Ctrl + `", "Ctrl + Shift + T", "Ctrl + Alt + T"],
          answer: "Ctrl + `",
          explanation:
            "Ctrl + ` (backtick) opens and closes the integrated terminal in VS Code, providing a full shell inside the editor.",
        },
        {
          id: "gs-q4-2",
          type: "multiple-choice",
          difficulty: "beginner",
          question:
            "What keyboard shortcut toggles a line comment in VS Code?",
          options: ["Ctrl + /", "Ctrl + C", "Ctrl + K", "Alt + C"],
          answer: "Ctrl + /",
          explanation:
            "Ctrl + / toggles a comment on the selected line(s). It adds or removes the # character based on whether the line is already commented.",
        },
        {
          id: "gs-q4-3",
          type: "true-false",
          difficulty: "beginner",
          question:
            "You can run a Python file in VS Code without opening a terminal by using the Run Python File button.",
          answer: true,
          explanation:
            "The triangle Run button in the top-right corner of the editor executes the current Python file. VS Code opens an integrated terminal automatically and runs the file.",
        },
        {
          id: "gs-q4-4",
          type: "multiple-choice",
          difficulty: "beginner",
          question: "Which extension publisher should you choose for the Python extension?",
          options: ["Google", "Microsoft", "JetBrains", "Python Foundation"],
          answer: "Microsoft",
          explanation:
            "The official Python extension is published by Microsoft. It is identified by a verified badge and has tens of millions of installs.",
        },
        {
          id: "gs-q4-5",
          type: "multiple-choice",
          difficulty: "intermediate",
          question:
            "What VS Code setting should you enable to ensure Python files always use 4 spaces instead of tab characters?",
          options: [
            "editor.tabSize: 4 only",
            'editor.insertSpaces: true and editor.tabSize: 4',
            "python.formatting.indent: 4",
            "editor.detectIndentation: false",
          ],
          answer: 'editor.insertSpaces: true and editor.tabSize: 4',
          explanation:
            "Setting editor.insertSpaces to true converts tab key presses into spaces. Combined with editor.tabSize: 4, this ensures the Python PEP 8 standard of 4-space indentation is always used.",
        },
      ],
    },
    {
      lessonSlug: "running-python-files",
      quiz: [
        {
          id: "gs-q5-1",
          type: "multiple-choice",
          difficulty: "beginner",
          question:
            "What file extension do Python source files use?",
          options: [".python", ".py", ".pyt", ".pt"],
          answer: ".py",
          explanation:
            "Python source files use the .py extension. This is recognised by the interpreter and by editors like VS Code to activate Python-specific features.",
        },
        {
          id: "gs-q5-2",
          type: "multiple-choice",
          difficulty: "beginner",
          question:
            "What terminal command runs a Python file called `main.py`?",
          options: [
            "run main.py",
            "execute main.py",
            "python main.py",
            "start main.py",
          ],
          answer: "python main.py",
          explanation:
            "python main.py tells the Python interpreter to execute the file main.py. On macOS/Linux where python may refer to Python 2, use python3 main.py.",
        },
        {
          id: "gs-q5-3",
          type: "multiple-choice",
          difficulty: "beginner",
          question:
            "What is the value of `__name__` when a Python file is executed directly from the terminal?",
          options: [
            "The filename without .py",
            "'__main__'",
            "'__direct__'",
            "None",
          ],
          answer: "'__main__'",
          explanation:
            "When a file is run directly (e.g., python app.py), Python sets __name__ to '__main__'. When the same file is imported, __name__ is set to the module's name instead.",
        },
        {
          id: "gs-q5-4",
          type: "true-false",
          difficulty: "beginner",
          question:
            "You must save a Python file before running it — unsaved changes will not be executed.",
          answer: true,
          explanation:
            "Python executes the file as it exists on disk. Any unsaved changes in the editor are not visible to the interpreter. Always save (Ctrl + S) before running.",
        },
        {
          id: "gs-q5-5",
          type: "multiple-choice",
          difficulty: "intermediate",
          question:
            "Which error is raised when the user types text where an integer was expected and int() is called?",
          options: ["TypeError", "ValueError", "NameError", "SyntaxError"],
          answer: "ValueError",
          explanation:
            "int('hello') raises ValueError: invalid literal for int() with base 10: 'hello'. A ValueError occurs when a function receives an argument of the correct type but an inappropriate value.",
        },
      ],
    },
  ],
};