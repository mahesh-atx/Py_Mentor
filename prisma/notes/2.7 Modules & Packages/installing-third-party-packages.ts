export const installingThirdPartyPackagesLesson = {
  title: "Installing Third-Party Packages (pip)",
  slug: "installing-third-party-packages",
  content: `# Installing Third-Party Packages (pip)

**pip** (Pip Installs Packages) is Python's package manager. It installs and manages libraries from the **Python Package Index (PyPI)** — a repository of over 400,000 packages created by the Python community.

## What is pip?

\`\`\`bash
# pip comes bundled with Python 3.4+
# Check if pip is installed
pip --version
# or
python -m pip --version
\`\`\`

## Installing Packages

\`\`\`bash
# Install a package
pip install requests

# Install a specific version
pip install requests==2.28.0

# Install a version range
pip install requests>=2.25.0,<3.0.0

# Upgrade a package
pip install --upgrade requests

# Install multiple packages
pip install requests numpy pandas
\`\`\`

## Common pip Commands

\`\`\`bash
# List installed packages
pip list

# Show details about a package
pip show requests

# Search for packages (deprecated on PyPI, use website instead)
# pip search requests

# Uninstall a package
pip uninstall requests

# Output installed packages to a file
pip freeze > requirements.txt

# Install from requirements file
pip install -r requirements.txt
\`\`\`

## Using Installed Packages

\`\`\`python
# After: pip install requests
import requests

# Make HTTP requests easily
response = requests.get("https://api.github.com")
print(response.status_code)  # 200
print(response.json())       # Parse JSON response

# POST request
data = {"name": "Alice", "age": 25}
response = requests.post("https://httpbin.org/post", json=data)
\`\`\`

## Popular Third-Party Packages

| Package | Purpose | Install Command |
|---------|---------|-----------------|
| **requests** | HTTP requests | `pip install requests` |
| **numpy** | Numerical computing | `pip install numpy` |
| **pandas** | Data analysis | `pip install pandas` |
| **matplotlib** | Plotting | `pip install matplotlib` |
| **flask** | Web framework | `pip install flask` |
| **django** | Web framework | `pip install django` |
| **pytest** | Testing | `pip install pytest` |
| **black** | Code formatting | `pip install black` |
| **pillow** | Image processing | `pip install pillow` |
| **pyyaml** | YAML parsing | `pip install pyyaml` |

## Package Versions and SemVer

Most packages use **Semantic Versioning** (SemVer): \`MAJOR.MINOR.PATCH\`

\`\`\`bash
# MAJOR.MINOR.PATCH
# 2.28.1
# │ │ │
# │ │ └── Patch: Bug fixes (backward compatible)
# │ └──── Minor: New features (backward compatible)
# └────── Major: Breaking changes

# Version specifiers
pip install requests==2.28.1    # Exact version
pip install requests>=2.25.0    # Minimum version
pip install requests~=2.28.0    # Compatible release (>=2.28.0, <2.29.0)
pip install requests!=2.27.0    # Exclude version
\`\`\`

## Troubleshooting

\`\`\`bash
# Permission errors — use --user flag
pip install --user requests

# Or use a virtual environment (recommended)
python -m venv myenv
source myenv/bin/activate  # Linux/Mac
myenv\\Scripts\\activate     # Windows
pip install requests

# Cache issues
pip install --no-cache-dir requests

# Verbose output for debugging
pip install -v requests
\`\`\`

> [!TIP]
> Always use virtual environments for projects (covered in the next lesson). This prevents package conflicts between projects and keeps your system Python clean.`,
  objectives: [
    "Install packages using pip.",
    "Manage package versions and upgrades.",
    "Use common pip commands (list, show, freeze, uninstall).",
    "Understand semantic versioning for packages.",
    "Troubleshoot common pip issues."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
