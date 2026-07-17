export const virtualEnvironmentsLesson = {
  title: "Virtual Environments (venv)",
  slug: "virtual-environments",
  content: `# Virtual Environments (venv)

A **virtual environment** is an isolated Python installation that lets you manage dependencies for different projects separately. It prevents package conflicts and ensures reproducibility.

## Why Use Virtual Environments?

**Problem without virtual environments:**
\`\`\`bash
# Project A needs requests==2.25.0
# Project B needs requests==2.30.0
# System can only have one version installed!
\`\`\`

**Solution with virtual environments:**
\`\`\`bash
# Each project has its own isolated environment
project_a/venv/  → requests==2.25.0
project_b/venv/  → requests==2.30.0
\`\`\`

## Creating a Virtual Environment

\`\`\`bash
# Create a virtual environment
python -m venv myenv

# Specify Python version (if multiple installed)
python3.11 -m venv myenv
\`\`\`

This creates a directory \`myenv/\` containing:
- A copy of the Python interpreter
- A site-packages directory for installed packages
- Activation scripts

## Activating the Virtual Environment

\`\`\`bash
# Linux / macOS
source myenv/bin/activate

# Windows (Command Prompt)
myenv\\Scripts\\activate.bat

# Windows (PowerShell)
myenv\\Scripts\\Activate.ps1

# You'll see the environment name in your prompt:
(myenv) $
\`\`\`

## Working in the Virtual Environment

\`\`\`bash
# After activation, 'python' and 'pip' use the environment's versions
(myenv) $ which python
/path/to/myenv/bin/python

(myenv) $ pip install requests
# Installs to myenv/lib/python3.x/site-packages/

(myenv) $ pip list
# Shows only packages installed in this environment

(myenv) $ python my_script.py
# Runs with the environment's Python and packages
\`\`\`

## Deactivating

\`\`\`bash
# Leave the virtual environment
(myenv) $ deactivate

# Back to system Python
$
\`\`\`

## Practical Workflow

\`\`\`bash
# 1. Create project directory
mkdir my_project
cd my_project

# 2. Create virtual environment
python -m venv venv

# 3. Activate it
source venv/bin/activate  # Linux/Mac
# venv\\Scripts\\activate  # Windows

# 4. Install dependencies
pip install requests flask

# 5. Work on your project
# ... write code ...

# 6. Save dependencies
pip freeze > requirements.txt

# 7. Deactivate when done
deactivate
\`\`\`

## Recreating an Environment

\`\`\`bash
# On another machine or after cloning a repo:
git clone project.git
cd project

python -m venv venv
source venv/bin/activate
pip install -r requirements.txt
# Now you have the exact same environment!
\`\`\`

## Virtual Environment Options

\`\`\`bash
# --system-site-packages: Also access system packages
python -m venv --system-site-packages myenv

# --clear: Delete and recreate the environment
python -m venv --clear myenv

# --prompt: Custom prompt name
python -m venv --prompt "dev" myenv
\`\`\`

## Common Locations and Conventions

\`\`\`bash
# Common names for the environment directory:
venv/           # Most common
.venv/          # Hidden, keeps project root clean
env/            # Simple alternative

# Add to .gitignore:
# .gitignore
venv/
.venv/
env/
\`\`\`

## Using Virtual Environments in Scripts

\`\`\`python
#!/usr/bin/env python3
# This shebang uses the first python3 in PATH
# When venv is activated, it uses the venv's Python

import sys
print(f"Python: {sys.executable}")
print(f"Version: {sys.version}")
\`\`\`

## Troubleshooting

\`\`\`bash
# Permission denied on activation (Linux/Mac)
chmod +x venv/bin/activate
source venv/bin/activate

# PowerShell execution policy (Windows)
Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser

# ModuleNotFoundError after activation
# Make sure you activated the environment!
which python  # Should show venv path

# Wrong Python version
# Create with specific version:
python3.11 -m venv venv
\`\`\`

## Alternatives to venv

| Tool | Description |
|------|-------------|
| **venv** | Built-in, lightweight (recommended for most cases) |
| **virtualenv** | Third-party, more features, supports older Python |
| **conda** | Package + environment manager (popular for data science) |
| **pipenv** | Combines pip + virtualenv, uses Pipfile |
| **poetry** | Modern dependency management and packaging |
| **pyenv** | Manage multiple Python versions |

> [!TIP]
> Always use a virtual environment for every project. It's a Python best practice that saves hours of debugging dependency conflicts. Name it \`venv\` or \`.venv\` and add it to \`.gitignore\`.`,
  objectives: [
    "Understand why virtual environments are important.",
    "Create and activate virtual environments with venv.",
    "Install and manage packages within a virtual environment.",
    "Deactivate and recreate environments.",
    "Follow best practices for project isolation."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
