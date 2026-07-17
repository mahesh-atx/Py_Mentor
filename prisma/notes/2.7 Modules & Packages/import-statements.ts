export const importStatementsLesson = {
  title: "import, from...import, import...as",
  slug: "import-statements",
  content: `# import, from...import, import...as

Python provides several ways to import modules and their contents. Each syntax serves different use cases and has different effects on your namespace.

## Basic import

\`\`\`python
import math

# Access with module name prefix
print(math.pi)        # 3.141592653589793
print(math.sqrt(16))  # 4.0
print(math.factorial(5))  # 120
\`\`\`

The entire module is loaded, but you must prefix names with the module name.

## from...import

\`\`\`python
from math import pi, sqrt, factorial

# Access directly without module prefix
print(pi)             # 3.141592653589793
print(sqrt(16))       # 4.0
print(factorial(5))   # 120
\`\`\`

Import specific names directly into your namespace. More convenient but risks name conflicts.

## from...import *

\`\`\`python
from math import *

# All public names are imported directly
print(pi)       # 3.141592653589793
print(sqrt(16)) # 4.0
print(e)        # 2.718281828459045
print(cos(0))   # 1.0
\`\`\`

> [!WARNING]
> Avoid \`from module import *\` in production code. It pollutes your namespace, makes it unclear where names come from, and can cause unexpected name conflicts.

## import...as (Aliasing)

\`\`\`python
import math as m
import numpy as np
import pandas as pd
import matplotlib.pyplot as plt

# Use the alias instead of the full module name
print(m.pi)    # 3.141592653589793
print(m.sqrt(25))  # 5.0
\`\`\`

Aliasing is common with long module names and is standard practice for popular libraries.

## from...import...as

\`\`\`python
from math import sqrt as square_root
from math import factorial as fact

print(square_root(16))  # 4.0
print(fact(5))          # 120
\`\`\`

Rename individual imports to avoid conflicts or improve clarity.

## Choosing the Right Import Style

\`\`\`python
# Use 'import module' when:
# - Using many names from the module
# - Want to avoid name conflicts
import os
import sys

# Use 'from module import name' when:
# - Using a few specific names
# - Want cleaner code
from math import pi, sqrt
from datetime import datetime

# Use 'import module as alias' when:
# - Module name is long
# - Following community conventions
import numpy as np
import pandas as pd

# Avoid 'from module import *' because:
# - Makes code harder to read
# - Can cause name conflicts
# - Makes debugging difficult
\`\`\`

## Practical Examples

\`\`\`python
# Multiple imports on one line
import os, sys, math

# Multiple specific imports
from collections import defaultdict, Counter, namedtuple

# Relative imports (within packages)
# from . import sibling_module
# from .. import parent_module

# Conditional imports
try:
    import ujson as json  # Faster JSON library if available
except ImportError:
    import json
\`\`\`

## Import Order Convention

Follow PEP 8 import ordering:

\`\`\`python
# 1. Standard library imports
import os
import sys
from datetime import datetime

# 2. Related third-party imports
import numpy as np
import requests

# 3. Local application/library imports
from my_package import my_module
\`\`\`

> [!TIP]
> Use \`import module\` for clarity when using many items, and \`from module import name\` for convenience when using just a few. Always use aliases for well-known conventions like \`import numpy as np\`.`,
  objectives: [
    "Use the basic import statement to load modules.",
    "Import specific names with from...import.",
    "Understand when to avoid from...import *.",
    "Apply aliasing with import...as and from...import...as.",
    "Follow PEP 8 import ordering conventions."
  ],
  difficulty: "beginner",
  xpReward: 45,
};
