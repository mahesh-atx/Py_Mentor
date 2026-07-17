export const requirementsTxtLesson = {
  title: "requirements.txt",
  slug: "requirements-txt",
  content: `# requirements.txt

\`requirements.txt\` is a file that lists all the dependencies (packages and their versions) needed for a Python project. It ensures consistent environments across development, testing, and production.

## What is requirements.txt?

\`\`\`text
# requirements.txt
requests==2.31.0
flask==3.0.0
numpy==1.24.3
pandas==2.0.3
\`\`\`

This file tells anyone (or any system) exactly which packages and versions to install.

## Generating requirements.txt

\`\`\`bash
# Install packages first
pip install requests flask numpy

# Generate from currently installed packages
pip freeze > requirements.txt

# View the file
cat requirements.txt
# requests==2.31.0
# flask==3.0.0
# numpy==1.24.3
# ...
\`\`\`

## Installing from requirements.txt

\`\`\`bash
# Install all dependencies
pip install -r requirements.txt

# This installs exact versions specified
\`\`\`

## Version Specifiers

\`\`\`text
# requirements.txt

# Exact version (most common)
requests==2.31.0

# Minimum version
requests>=2.30.0

# Version range
requests>=2.30.0,<3.0.0

# Compatible release (>=X.Y.Z, <X.(Y+1).0)
requests~=2.31.0  # >=2.31.0, <2.32.0

# Any version
requests
\`\`\`

## Best Practices for requirements.txt

### 1. Pin Exact Versions

\`\`\`text
# ✅ Good - reproducible builds
requests==2.31.0
flask==3.0.0

# ❌ Risky - may break with updates
requests>=2.0.0
flask
\`\`\`

### 2. Separate Development and Production Dependencies

\`\`\`text
# requirements.txt (production)
requests==2.31.0
flask==3.0.0
gunicorn==21.2.0

# requirements-dev.txt (development)
-r requirements.txt          # Include production deps
pytest==7.4.0
black==23.7.0
flake8==6.1.0
mypy==1.5.0
\`\`\`

### 3. Use Comments

\`\`\`text
# requirements.txt
# Web framework
flask==3.0.0

# HTTP client
requests==2.31.0

# Database
sqlalchemy==2.0.19
psycopg2-binary==2.9.7  # PostgreSQL adapter
\`\`\`

## Example Project Workflow

\`\`\`bash
# 1. Clone the repository
git clone https://github.com/user/project.git
cd project

# 2. Create and activate virtual environment
python -m venv venv
source venv/bin/activate  # Linux/Mac

# 3. Install dependencies
pip install -r requirements.txt

# 4. Run the project
python main.py

# 5. When you add a new package
pip install new-package
pip freeze > requirements.txt

# 6. Commit the updated requirements
git add requirements.txt
git commit -m "Add new-package dependency"
\`\`\`

## Advanced: Using pip-tools

\`\`\`bash
# Install pip-tools
pip install pip-tools

# requirements.in (high-level dependencies)
# requests
# flask

# Compile to pinned versions
pip-compile requirements.in
# Creates requirements.txt with all transitive dependencies pinned

# Sync environment to match requirements.txt
pip-sync requirements.txt
\`\`\`

## requirements.txt vs Other Dependency Files

| File | Format | Use Case |
|------|--------|----------|
| **requirements.txt** | pip format | Simple projects, deployment |
| **Pipfile** | TOML | Pipenv projects |
| **pyproject.toml** | TOML | Modern Python packaging |
| **setup.py** | Python | Library distribution |
| **conda environment.yml** | YAML | Conda environments |

## Sample requirements.txt Files

### Web Application

\`\`\`text
# Web Application Requirements
flask==3.0.0
flask-sqlalchemy==3.0.5
flask-login==0.6.2
gunicorn==21.2.0
python-dotenv==1.0.0
\`\`\`

### Data Science Project

\`\`\`text
# Data Science Requirements
numpy==1.24.3
pandas==2.0.3
matplotlib==3.7.2
scikit-learn==1.3.0
jupyter==1.0.0
\`\`\`

### API Client

\`\`\`text
# API Client Requirements
requests==2.31.0
python-dateutil==2.8.2
pydantic==2.1.1
\`\`\`

## Common Issues and Solutions

\`\`\`bash
# Issue: Package not found during install
# Solution: Check package name spelling
pip search package-name  # Or check PyPI website

# Issue: Version conflict
# Solution: Use compatible version specifiers
# Or use virtual environments for isolation

# Issue: Different OS requirements
# Solution: Use environment markers
pywin32==306 ; sys_platform == 'win32'
pyobjc==9.2 ; sys_platform == 'darwin'

# Issue: Large requirements.txt
# Solution: Separate into multiple files
# - requirements-base.txt
# - requirements-dev.txt
# - requirements-test.txt
\`\`\`

> [!TIP]
> Always commit \`requirements.txt\` to version control. It's the single source of truth for your project's dependencies and ensures everyone (including CI/CD systems) uses the same package versions.`,
  objectives: [
    "Understand the purpose of requirements.txt.",
    "Generate requirements.txt with pip freeze.",
    "Install dependencies from requirements.txt.",
    "Use appropriate version specifiers.",
    "Organize dependencies for different environments."
  ],
  difficulty: "beginner",
  xpReward: 45,
};
