export const exercises: Record<string, any[]> = {
  "string-creation-and-accessing": [
    {
      "title": "First and Last Character",
      "prompt": "Given the string `word = 'Python'`, print the first character on one line and the last character on the next line using indexing.",
      "starterCode": "word = 'Python'\n# Print first character\n# Print last character\n",
      "solutionCode": "word = 'Python'\nprint(word[0])\nprint(word[-1])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "P\nn\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Character at Index",
      "prompt": "Read a string and an integer index from input. Print the character at that index. If the index is out of range, print `Index out of range`.",
      "starterCode": "# Read a string then an index\n# Print the character or 'Index out of range'\n",
      "solutionCode": "text = input()\nindex = int(input())\nif -len(text) <= index < len(text):\n    print(text[index])\nelse:\n    print('Index out of range')",
      "testCases": [
        {
          "input": "Hello\n1\n",
          "expectedOutput": "e\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "String Info Card",
      "prompt": "Read a string from input. Print the following on separate lines:\n1. The length of the string\n2. The first character\n3. The middle character (use integer division for the index)\n4. The last character\n\nIf the string is empty, print `Empty string`.\n\n(Input: `Python` → Output: `6`, `P`, `h`, `n`)",
      "starterCode": "# Read a string and print its info\n",
      "solutionCode": "text = input()\nif not text:\n    print('Empty string')\nelse:\n    print(len(text))\n    print(text[0])\n    print(text[len(text) // 2])\n    print(text[-1])",
      "testCases": [
        {
          "input": "Python\n",
          "expectedOutput": "6\nP\nh\nn\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 50
    },
    {
      "title": "Vowel or Consonant",
      "prompt": "Read a single character from input. Using membership operators (`in`) and the string `'aeiouAEIOU'`, determine if it is a vowel, consonant, or neither (digit/symbol). Print the result.\n\n(Input: `a` → Output: `Vowel`)",
      "starterCode": "# Read a character and classify it\n",
      "solutionCode": "char = input()\nif len(char) != 1:\n    print('Invalid input')\nelif char in 'aeiouAEIOU':\n    print('Vowel')\nelif char.isalpha():\n    print('Consonant')\nelse:\n    print('Neither')",
      "testCases": [
        {
          "input": "a\n",
          "expectedOutput": "Vowel\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Name Formatter",
      "prompt": "Read a full name from input (first and last separated by a space). Print:\n1. Total character count (including space)\n2. First character of first name\n3. First character of last name\n4. Initials in format `X.Y.`\n\nIf the input does not contain exactly one space, print `Invalid name`.\n\n(Input: `John Doe` → Output: `8`, `J`, `D`, `J.D.`)",
      "starterCode": "# Read a full name and extract info\n",
      "solutionCode": "name = input()\nparts = name.split(' ')\nif len(parts) != 2 or not parts[0] or not parts[1]:\n    print('Invalid name')\nelse:\n    print(len(name))\n    print(parts[0][0])\n    print(parts[1][0])\n    print(f'{parts[0][0]}.{parts[1][0]}.')",
      "testCases": [
        {
          "input": "John Doe\n",
          "expectedOutput": "8\nJ\nD\nJ.D.\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 75
    },
    {
      "title": "Create Multi-line String",
      "prompt": "Create a multi-line string using triple quotes `'''Line1\\nLine2'''` and assign it to `text`. Print it.",
      "starterCode": "# Create multi-line string and print\n",
      "solutionCode": "text = '''Line1\nLine2'''\nprint(text)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Line1\nLine2\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ,
    {
      "title": "Quote Mix",
      "prompt": "Print exactly: It's \"fine\"  (single quote inside, double quotes around fine — choose your string quoting carefully.)",
      "starterCode": "# Mixed quotes\n",
      "solutionCode": "print('It\\'s \"fine\"')",
      "testCases": [{ "input": "", "expectedOutput": "It's \"fine\"\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    }
  ],
  "string-indexing-and-slicing": [
    {
      "title": "Reverse a String",
      "prompt": "Given `text = 'Hello'`, print the string reversed using slicing.",
      "starterCode": "text = 'Hello'\n# Print the reversed string using slicing\n",
      "solutionCode": "text = 'Hello'\nprint(text[::-1])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "olleH\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Slice from Input",
      "prompt": "Read a string, a start index, and a stop index from input. Print the slice `text[start:stop]`. If start or stop are out of valid range (0 to len), print `Invalid range`.\n\n(Input: `Python`, `1`, `4` → Output: `yth`)",
      "starterCode": "# Read string, start, stop - print the slice\n",
      "solutionCode": "text = input()\nstart = int(input())\nstop = int(input())\nif 0 <= start <= len(text) and 0 <= stop <= len(text):\n    print(text[start:stop])\nelse:\n    print('Invalid range')",
      "testCases": [
        {
          "input": "Python\n1\n4\n",
          "expectedOutput": "yth\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Palindrome Checker",
      "prompt": "Read a string from input. Using slicing (not a loop), check if it is a palindrome (reads the same forwards and backwards). Ignore case. Print `Palindrome` or `Not a palindrome`.\n\n(Input: `Racecar` → Output: `Palindrome`)",
      "starterCode": "# Read a string and check if it is a palindrome using slicing\n",
      "solutionCode": "text = input().lower()\nif text == text[::-1]:\n    print('Palindrome')\nelse:\n    print('Not a palindrome')",
      "testCases": [
        {
          "input": "Racecar\n",
          "expectedOutput": "Palindrome\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "File Extension Extractor",
      "prompt": "Read a filename from input. Using slicing and the `find()` method (from previous lesson), extract and print the filename (without extension) and the extension separately. If there is no dot in the filename, print `No extension`.\n\n(Input: `report_2024.xlsx` → Output: `report_2024` then `.xlsx`)",
      "starterCode": "# Read filename, split into name and extension\n",
      "solutionCode": "filename = input()\ndot_pos = filename.rfind('.')\nif dot_pos == -1:\n    print('No extension')\nelse:\n    print(filename[:dot_pos])\n    print(filename[dot_pos:])",
      "testCases": [
        {
          "input": "report_2024.xlsx\n",
          "expectedOutput": "report_2024\n.xlsx\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Credit Card Masker",
      "prompt": "Read a credit card number (exactly 16 digits) from input. Using slicing:\n1. Validate it contains only digits and is exactly 16 characters long. If not, print `Invalid card number`.\n2. If valid, print it masked as `****-****-****-XXXX` where XXXX is the last 4 digits.\n\n(Input: `1234567890123456` → Output: `****-****-****-3456`)",
      "starterCode": "# Read a 16-digit card number and mask it\n",
      "solutionCode": "card = input().strip()\nif not card.isdigit() or len(card) != 16:\n    print('Invalid card number')\nelse:\n    last4 = card[-4:]\n    print(f'****-****-****-{last4}')",
      "testCases": [
        {
          "input": "1234567890123456\n",
          "expectedOutput": "****-****-****-3456\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 75
    },
    {
      "title": "Step Slicing",
      "prompt": "Given `s = 'abcdef'`. Use slicing with a step of 2 to print every other character (should print 'ace').",
      "starterCode": "s = 'abcdef'\n# Slice with step 2 and print\n",
      "solutionCode": "s = 'abcdef'\nprint(s[::2])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "ace\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Every Second Char",
      "prompt": "Given s = 'abcdefgh', print every second character starting from the first (use slicing with a step).",
      "starterCode": "# s[::2]\n",
      "solutionCode": "s = 'abcdefgh'\nprint(s[::2])",
      "testCases": [{ "input": "", "expectedOutput": "aceg\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Build: Word Reverser",
      "prompt": "Read a word and print it reversed using slicing with a negative step.",
      "starterCode": "# s[::-1]\n",
      "solutionCode": "word = input()\nprint(word[::-1])",
      "testCases": [{ "input": "Python\n", "expectedOutput": "nohtyP\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "string-methods-case-strip": [
    {
      "title": "To Uppercase",
      "prompt": "Given `text = 'hello, world!'`, print it in uppercase.",
      "starterCode": "text = 'hello, world!'\n# Print in uppercase\n",
      "solutionCode": "text = 'hello, world!'\nprint(text.upper())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "HELLO, WORLD!\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Strip and Title Case",
      "prompt": "Read a name from input that may have extra spaces at the start and end. Strip the whitespace and convert to title case, then print it.\n\n(Input: `  john doe  ` → Output: `John Doe`)",
      "starterCode": "# Read a name, strip whitespace, convert to title case\n",
      "solutionCode": "name = input()\nprint(name.strip().title())",
      "testCases": [
        {
          "input": "  john doe  \n",
          "expectedOutput": "John Doe\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Case-Insensitive Login",
      "prompt": "Read a username and password from input. The stored username is `Admin` and password is `Secret123`. Compare case-insensitively for the username, but case-sensitively for the password. Print `Login successful` or `Login failed`.\n\n(Input: `admin`, `Secret123` → Output: `Login successful`)",
      "starterCode": "# Read username and password, validate login\n",
      "solutionCode": "stored_user = 'Admin'\nstored_pass = 'Secret123'\nusername = input()\npassword = input()\nif username.lower() == stored_user.lower() and password == stored_pass:\n    print('Login successful')\nelse:\n    print('Login failed')",
      "testCases": [
        {
          "input": "admin\nSecret123\n",
          "expectedOutput": "Login successful\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Username Normalizer",
      "prompt": "Read a username from input. Apply these rules in order:\n1. Strip leading and trailing whitespace\n2. Convert to lowercase\n3. If the result is empty, print `Invalid username`\n4. If length is less than 3, print `Too short`\n5. If length is more than 20, print `Too long`\n6. Otherwise print the normalized username\n\n(Input: `  Alice_2024  ` → Output: `alice_2024`)",
      "starterCode": "# Read and normalize a username\n",
      "solutionCode": "username = input().strip().lower()\nif not username:\n    print('Invalid username')\nelif len(username) < 3:\n    print('Too short')\nelif len(username) > 20:\n    print('Too long')\nelse:\n    print(username)",
      "testCases": [
        {
          "input": "  Alice_2024  \n",
          "expectedOutput": "alice_2024\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 75
    },
    {
      "title": "Capitalize and Title",
      "prompt": "Given `s = 'hello world'`. Print `s.capitalize()` and `s.title()` on separate lines.",
      "starterCode": "s = 'hello world'\n# Print capitalize and title\n",
      "solutionCode": "s = 'hello world'\nprint(s.capitalize())\nprint(s.title())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Hello world\nHello World\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Lstrip and Rstrip",
      "prompt": "Given `s = '  text  '`. Print `s.lstrip()` (removes left spaces) and `s.rstrip()` (removes right spaces) on separate lines.",
      "starterCode": "s = '  text  '\n# Print lstrip and rstrip\n",
      "solutionCode": "s = '  text  '\nprint(s.lstrip())\nprint(s.rstrip())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "text  \n  text\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ,
    {
      "title": "Shout It",
      "prompt": "Read a line of text (it has extra spaces around it). Strip the whitespace and print it in UPPERCASE.",
      "starterCode": "# strip + upper\n",
      "solutionCode": "text = input()\nprint(text.strip().upper())",
      "testCases": [{ "input": "  hey  \n", "expectedOutput": "HEY\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "string-methods-search": [
    {
      "title": "Find a Character",
      "prompt": "Given `text = 'programming'`, print the index of the first occurrence of the character `'g'` using `find()`.",
      "starterCode": "text = 'programming'\n# Print the index of the first 'g'\n",
      "solutionCode": "text = 'programming'\nprint(text.find('g'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Count Occurrences",
      "prompt": "Read a sentence and a word from input. Print how many times the word appears in the sentence (case-insensitive).\n\n(Input: `I love Python and Python is great`, `python` → Output: `2`)",
      "starterCode": "# Read a sentence and a word, count occurrences (case-insensitive)\n",
      "solutionCode": "sentence = input().lower()\nword = input().lower()\nprint(sentence.count(word))",
      "testCases": [
        {
          "input": "I love Python and Python is great\npython\n",
          "expectedOutput": "2\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Email Domain Extractor",
      "prompt": "Read an email address from input. Using `find()` and slicing:\n1. If `@` is not found, print `Invalid email`\n2. If valid, print the username (before @) and domain (after @) on separate lines\n\n(Input: `alice@example.com` → Output: `alice` then `example.com`)",
      "starterCode": "# Read an email and extract username and domain\n",
      "solutionCode": "email = input().strip()\nat_pos = email.find('@')\nif at_pos == -1 or at_pos == 0 or at_pos == len(email) - 1:\n    print('Invalid email')\nelse:\n    print(email[:at_pos])\n    print(email[at_pos + 1:])",
      "testCases": [
        {
          "input": "alice@example.com\n",
          "expectedOutput": "alice\nexample.com\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "URL Validator and Parser",
      "prompt": "Read a URL from input. Check the following and print results on separate lines:\n1. `Starts with https: True/False`\n2. `Ends with valid domain: True/False` (check for `.com`, `.org`, `.net`, `.io`)\n3. `Contains www: True/False`\n4. `Dot count: N`\n\n(Input: `https://www.example.com` → Output as shown)",
      "starterCode": "# Read a URL and analyze it\n",
      "solutionCode": "url = input().strip().lower()\nprint(f'Starts with https: {url.startswith(\"https:/\")}')\nprint(f'Ends with valid domain: {url.endswith((\".com\", \".org\", \".net\", \".io\"))}')\nprint(f'Contains www: {\"www\" in url}')\nprint(f'Dot count: {url.count(\".\")}')",
      "testCases": [
        {
          "input": "https://www.example.com\n",
          "expectedOutput": "Starts with https: True\nEnds with valid domain: True\nContains www: True\nDot count: 2\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Count Substring",
      "prompt": "Given `s = 'banana'`. Use `.count('a')` to find how many 'a's are in the string and print the result.",
      "starterCode": "s = 'banana'\n# Print count of 'a'\n",
      "solutionCode": "s = 'banana'\nprint(s.count('a'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Startswith and Endswith",
      "prompt": "Given `s = 'report.pdf'`. Print whether it starts with 'repo' and ends with '.pdf' on separate lines (using `.startswith()` and `.endswith()`).",
      "starterCode": "s = 'report.pdf'\n# Check start and end, print both\n",
      "solutionCode": "s = 'report.pdf'\nprint(s.startswith('repo'))\nprint(s.endswith('.pdf'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\nTrue\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Find the Needle",
      "prompt": "Given s = 'where is the cat', print the index where 'cat' first appears (use .find()).",
      "starterCode": "# .find()\n",
      "solutionCode": "s = 'where is the cat'\nprint(s.find('cat'))",
      "testCases": [{ "input": "", "expectedOutput": "13\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ,
    {
      "title": "Build: Count Double-S",
      "prompt": "Given s = 'mississippi', print how many times 'ss' appears using .count().",
      "starterCode": "# .count() a substring\n",
      "solutionCode": "s = 'mississippi'\nprint(s.count('ss'))",
      "testCases": [{ "input": "", "expectedOutput": "2\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "string-methods-modify": [
    {
      "title": "Replace Characters",
      "prompt": "Given `text = 'hello world'`, replace all spaces with underscores and print the result.",
      "starterCode": "text = 'hello world'\n# Replace spaces with underscores\n",
      "solutionCode": "text = 'hello world'\nprint(text.replace(' ', '_'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "hello_world\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Word Counter",
      "prompt": "Read a sentence from input. Using `split()`, count and print the number of words. If the input is empty or only spaces, print `0`.\n\n(Input: `Hello World Python` → Output: `3`)",
      "starterCode": "# Read a sentence and count the words\n",
      "solutionCode": "sentence = input()\nwords = sentence.split()\nprint(len(words))",
      "testCases": [
        {
          "input": "Hello World Python\n",
          "expectedOutput": "3\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "CSV to Formatted Table",
      "prompt": "Read a CSV line from input in the format `name,age,city`. Split it by comma and print each field on a new line with a label. If the CSV does not have exactly 3 fields, print `Invalid format`.\n\n(Input: `Alice,25,New York` → Output: `Name: Alice`, `Age: 25`, `City: New York`)",
      "starterCode": "# Read a CSV line and format it as a table\n",
      "solutionCode": "line = input().strip()\nparts = line.split(',')\nif len(parts) != 3:\n    print('Invalid format')\nelse:\n    print(f'Name: {parts[0]}')\n    print(f'Age: {parts[1]}')\n    print(f'City: {parts[2]}')",
      "testCases": [
        {
          "input": "Alice,25,New York\n",
          "expectedOutput": "Name: Alice\nAge: 25\nCity: New York\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "URL Slug Generator",
      "prompt": "Read a blog post title from input. Generate a URL slug by:\n1. Stripping whitespace\n2. Converting to lowercase\n3. Replacing all spaces with hyphens\n4. Removing any character that is not alphanumeric or a hyphen (use replace for common punctuation: `.`, `,`, `!`, `?`, `'`)\n5. If the result is empty, print `Invalid title`\n\n(Input: `Hello, World! Python's Best` → Output: `hello-world-pythons-best`)",
      "starterCode": "# Read a title and generate a URL slug\n",
      "solutionCode": "title = input().strip()\nslug = title.lower()\nfor char in ['.', ',', '!', '?', \"'\", '\"', ':', ';']:\n    slug = slug.replace(char, '')\nslug = slug.replace(' ', '-')\nif not slug:\n    print('Invalid title')\nelse:\n    print(slug)",
      "testCases": [
        {
          "input": "Hello, World! Python's Best\n",
          "expectedOutput": "hello-world-pythons-best\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Zfill",
      "prompt": "Given `s = '42'`. Use `.zfill(5)` to pad it with zeros on the left until it has a length of 5. Print the result.",
      "starterCode": "s = '42'\n# Zfill to length 5 and print\n",
      "solutionCode": "s = '42'\nprint(s.zfill(5))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "00042\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Splitlines",
      "prompt": "Given `s = 'line1\\nline2'`. Use `.splitlines()` to split it into a list of lines. Print the list.",
      "starterCode": "s = 'line1\\nline2'\n# Split lines and print\n",
      "solutionCode": "s = 'line1\\nline2'\nprint(s.splitlines())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "['line1', 'line2']\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Underscore Join",
      "prompt": "Use .join() to print the word 'python' with underscores between letters: p_y_t_h_o_n",
      "starterCode": "# '_'.join(...)\n",
      "solutionCode": "print('_'.join('python'))",
      "testCases": [{ "input": "", "expectedOutput": "p_y_t_h_o_n\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ,
    {
      "title": "Build: Snake Case",
      "prompt": "Read a phrase, convert it to lowercase and replace every space with an underscore. Print the result.",
      "starterCode": "# lower + replace\n",
      "solutionCode": "phrase = input()\nprint(phrase.lower().replace(' ', '_'))",
      "testCases": [{ "input": "Hello World\n", "expectedOutput": "hello_world\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "string-methods-validation": [
    {
      "title": "Is It All Digits?",
      "prompt": "Given `value = '12345'`, print `True` if it contains only digits, otherwise print `False`.",
      "starterCode": "value = '12345'\n# Check if value is all digits\n",
      "solutionCode": "value = '12345'\nprint(value.isdigit())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Username Validator",
      "prompt": "Read a username from input. It is valid if:\n- It contains only letters and digits (`isalnum()`)\n- It is between 3 and 15 characters long\nPrint `Valid` or `Invalid`. If empty, print `Invalid`.\n\n(Input: `alice123` → Output: `Valid`)",
      "starterCode": "# Read a username and validate it\n",
      "solutionCode": "username = input().strip()\nif username and username.isalnum() and 3 <= len(username) <= 15:\n    print('Valid')\nelse:\n    print('Invalid')",
      "testCases": [
        {
          "input": "alice123\n",
          "expectedOutput": "Valid\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Safe Integer Input",
      "prompt": "Read a string from input. If it represents a valid positive integer (digits only, not empty, not zero), convert it and print it doubled. Otherwise:\n- Empty input → print `Empty input`\n- Non-digit input → print `Not a number`\n- Zero → print `Must be positive`\n\n(Input: `21` → Output: `42`)",
      "starterCode": "# Read a string, validate, and print doubled if valid positive integer\n",
      "solutionCode": "text = input().strip()\nif not text:\n    print('Empty input')\nelif not text.isdigit():\n    print('Not a number')\nelif int(text) == 0:\n    print('Must be positive')\nelse:\n    print(int(text) * 2)",
      "testCases": [
        {
          "input": "21\n",
          "expectedOutput": "42\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Password Strength Checker",
      "prompt": "Read a password from input. Check and print each condition on a new line:\n1. `Length OK: True/False` (at least 8 characters)\n2. `Has uppercase: True/False`\n3. `Has lowercase: True/False`\n4. `Has digit: True/False`\n5. `Has special: True/False` (contains any of `!@#$%^&*`)\n\nThen print `Strong password` if all are True, else `Weak password`.",
      "starterCode": "# Read a password and check its strength\n",
      "solutionCode": "password = input()\nlength_ok = len(password) >= 8\nhas_upper = any(c.isupper() for c in password)\nhas_lower = any(c.islower() for c in password)\nhas_digit = any(c.isdigit() for c in password)\nhas_special = any(c in '!@#$%^&*' for c in password)\nprint(f'Length OK: {length_ok}')\nprint(f'Has uppercase: {has_upper}')\nprint(f'Has lowercase: {has_lower}')\nprint(f'Has digit: {has_digit}')\nprint(f'Has special: {has_special}')\nif all([length_ok, has_upper, has_lower, has_digit, has_special]):\n    print('Strong password')\nelse:\n    print('Weak password')",
      "testCases": [
        {
          "input": "Abc@1234\n",
          "expectedOutput": "Length OK: True\nHas uppercase: True\nHas lowercase: True\nHas digit: True\nHas special: True\nStrong password\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Is Digit",
      "prompt": "Given `s1 = '123'` and `s2 = '12a'`. Print `s1.isdigit()` and `s2.isdigit()` on separate lines.",
      "starterCode": "s1 = '123'\ns2 = '12a'\n# Print isdigit for both\n",
      "solutionCode": "s1 = '123'\ns2 = '12a'\nprint(s1.isdigit())\nprint(s2.isdigit())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\nFalse\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Is Alpha",
      "prompt": "Given `s = 'Hello'`. Print `s.isalpha()`.",
      "starterCode": "s = 'Hello'\n# Print isalpha\n",
      "solutionCode": "s = 'Hello'\nprint(s.isalpha())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ,
    {
      "title": "Digits Only",
      "prompt": "Read a string and print whether it contains only digits (use .isdigit()).",
      "starterCode": "# .isdigit()\n",
      "solutionCode": "s = input()\nprint(s.isdigit())",
      "testCases": [{ "input": "12345\n", "expectedOutput": "True\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    }
  ,
    {
      "title": "Build: Username Check",
      "prompt": "Read a username. Print Valid if it is alphanumeric (use .isalnum()) AND at least 4 characters long; otherwise print Invalid.",
      "starterCode": "# Validation chain\n",
      "solutionCode": "name = input()\nif name.isalnum() and len(name) >= 4:\n    print('Valid')\nelse:\n    print('Invalid')",
      "testCases": [{ "input": "user1\n", "expectedOutput": "Valid\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "string-concatenation-repetition": [
    {
      "title": "Build a Greeting",
      "prompt": "Given `name = 'Alice'`, build and print the string `Hello, Alice!` using string concatenation with `+`.",
      "starterCode": "name = 'Alice'\n# Build the greeting using concatenation\n",
      "solutionCode": "name = 'Alice'\nprint('Hello, ' + name + '!')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Hello, Alice!\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Repeat a Separator",
      "prompt": "Read a separator character and a repeat count from input. Print the separator repeated that many times. If the count is 0 or negative, print `Invalid count`.\n\n(Input: `-`, `5` → Output: `-----`)",
      "starterCode": "# Read a character and count, print repeated character\n",
      "solutionCode": "char = input()\ncount = int(input())\nif count <= 0:\n    print('Invalid count')\nelse:\n    print(char * count)",
      "testCases": [
        {
          "input": "-\n5\n",
          "expectedOutput": "-----\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Dynamic Banner",
      "prompt": "Read a title from input. Create a banner:\n- A line of `=` the same length as the title plus 4 (padding)\n- The title centered in the middle with a space on each side\n- Another line of `=`\n\nIf the title is empty after stripping, print `Invalid title`.\n\n(Input: `Python` → a 10-wide banner)",
      "starterCode": "# Read a title and print a banner around it\n",
      "solutionCode": "title = input().strip()\nif not title:\n    print('Invalid title')\nelse:\n    width = len(title) + 4\n    border = '=' * width\n    print(border)\n    print(f'  {title}  ')\n    print(border)",
      "testCases": [
        {
          "input": "Python\n",
          "expectedOutput": "==========\n  Python  \n==========\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Receipt Builder",
      "prompt": "Read N (number of items) from input, then N lines each containing `item_name price quantity` (space-separated). Build and print a receipt:\n- A header `RECEIPT` centered in 40 chars\n- A line of `=` (40 chars)\n- Each item: `item_name` left-aligned 20 chars, total right-aligned\n- A separator and `TOTAL: $X.XX` at the end\n\nIf N is 0 or negative, print `No items`.",
      "starterCode": "# Read items and build a receipt\n",
      "solutionCode": "n = int(input())\nif n <= 0:\n    print('No items')\nelse:\n    items = []\n    for _ in range(n):\n        parts = input().split()\n        name = parts[0]\n        price = float(parts[1])\n        qty = int(parts[2])\n        items.append((name, price, qty))\n    print('RECEIPT'.center(40))\n    print('=' * 40)\n    total = 0\n    for name, price, qty in items:\n        item_total = price * qty\n        total += item_total\n        print(f'{name:<20} ${item_total:>8.2f}')\n    print('-' * 40)\n    print(f'TOTAL:{\" \" * 24}${total:>8.2f}')",
      "testCases": [
        {
          "input": "2\nCoffee 4.50 2\nSandwich 8.99 1\n",
          "expectedOutput": "                RECEIPT                 \n========================================\nCoffee               $    9.00\nSandwich             $    8.99\n----------------------------------------\nTOTAL:                        $   17.99\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Join with Comma",
      "prompt": "Given `words = ['a', 'b', 'c']`. Use `','.join(words)` to create 'a,b,c' and print it.",
      "starterCode": "words = ['a', 'b', 'c']\n# Join with comma and print\n",
      "solutionCode": "words = ['a', 'b', 'c']\nprint(','.join(words))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "a,b,c\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Fence Line",
      "prompt": "Use the repetition operator to print '+-' repeated 10 times (a 20-character fence).",
      "starterCode": "# '+-' * 10\n",
      "solutionCode": "print('+-' * 10)",
      "testCases": [{ "input": "", "expectedOutput": "+-+-+-+-+-+-+-+-+-+-\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    }
  ],
  "string-immutability": [
    {
      "title": "Spot the Bug",
      "prompt": "The code below tries to capitalize the first letter of a string but does NOT save the result. Fix it so that `text` holds the capitalized version and print it.\n\n```python\ntext = 'python'\ntext.capitalize()  # This does nothing useful!\nprint(text)\n```",
      "starterCode": "text = 'python'\ntext.capitalize()\nprint(text)\n",
      "solutionCode": "text = 'python'\ntext = text.capitalize()\nprint(text)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Python\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Replace Without Modifying Original",
      "prompt": "Read a sentence from input. Create a censored version by replacing the word `bad` with `***` (case-insensitive). Print the original sentence first, then the censored version. The original must remain unchanged.\n\n(Input: `This is bad and BAD` → prints original then censored)",
      "starterCode": "# Read a sentence, print original then censored version\n",
      "solutionCode": "original = input()\ncensored = original.replace('bad', '***').replace('BAD', '***').replace('Bad', '***')\nprint(original)\nprint(censored)",
      "testCases": [
        {
          "input": "This is bad and BAD\n",
          "expectedOutput": "This is bad and BAD\nThis is *** and ***\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "String Builder via List",
      "prompt": "Read N words from input (one per line, N given first). Build a sentence by joining them with a space using a list (demonstrating why lists are used for building strings). Then print:\n1. The sentence\n2. The sentence reversed (each character reversed using slicing)\n3. The word count\n\nIf N is 0, print `No words`.",
      "starterCode": "# Read N words, build a sentence, print sentence, reversed, and count\n",
      "solutionCode": "n = int(input())\nif n <= 0:\n    print('No words')\nelse:\n    parts = []\n    for _ in range(n):\n        parts.append(input())\n    sentence = ' '.join(parts)\n    print(sentence)\n    print(sentence[::-1])\n    print(len(parts))",
      "testCases": [
        {
          "input": "3\nHello\nWorld\nPython\n",
          "expectedOutput": "Hello World Python\nnohtyP dlroW olleH\n3\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Text Transformer Pipeline",
      "prompt": "Read a raw text input. Apply these transformations in order and print each step on a new line:\n1. Original (as-is)\n2. Stripped\n3. Lowercased (from stripped)\n4. Title cased (from lowercased)\n5. Replace spaces with `-` (from title cased)\n\nEach step should use the result of the PREVIOUS step, demonstrating chained transformation without mutating.\n\nIf the stripped version is empty, print `Empty input` and stop.",
      "starterCode": "# Read text and apply a chain of transformations, printing each step\n",
      "solutionCode": "original = input()\nprint(original)\nstripped = original.strip()\nif not stripped:\n    print('Empty input')\nelse:\n    print(stripped)\n    lowered = stripped.lower()\n    print(lowered)\n    titled = lowered.title()\n    print(titled)\n    hyphenated = titled.replace(' ', '-')\n    print(hyphenated)",
      "testCases": [
        {
          "input": "  hello world  \n",
          "expectedOutput": "  hello world  \nhello world\nhello world\nHello World\nHello-World\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Replacing instead of Modifying",
      "prompt": "Given `s = 'bat'`. Since strings are immutable, we cannot do `s[0] = 'c'`. Instead, use `.replace('b', 'c')` and reassign it to `s`. Print `s`.",
      "starterCode": "s = 'bat'\n# Replace b with c, reassign, and print\n",
      "solutionCode": "s = 'bat'\ns = s.replace('b', 'c')\nprint(s)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "cat\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Replace Returns New",
      "prompt": "Given s = 'hello', create t = s.replace('l', 'L'). Print s and t separated by a space — notice s is unchanged (immutability).",
      "starterCode": "# Strings are immutable\n",
      "solutionCode": "s = 'hello'\nt = s.replace('l', 'L')\nprint(s, t)",
      "testCases": [{ "input": "", "expectedOutput": "hello heLLo\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "escape-characters": [
    {
      "title": "Print with Newline",
      "prompt": "Print `Hello` and `World` on separate lines using a single `print()` statement with `\\n`.",
      "starterCode": "# Print Hello and World on separate lines using one print() and \\n\n",
      "solutionCode": "print('Hello\\nWorld')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Hello\nWorld\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Tab-Formatted Table",
      "prompt": "Print the following table using `\\t` (tab) for alignment in a single multi-line string or multiple print statements:\n```\nName    Age     City\nAlice   25      New York\nBob     30      London\n```",
      "starterCode": "# Print the table using tabs for alignment\n",
      "solutionCode": "print('Name\\tAge\\tCity')\nprint('Alice\\t25\\tNew York')\nprint('Bob\\t30\\tLondon')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Name\tAge\tCity\nAlice\t25\tNew York\nBob\t30\tLondon\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Windows Path Printer",
      "prompt": "Read a username from input. Print a Windows-style file path in the format:\n`C:\\Users\\USERNAME\\Documents\\file.txt`\nusing escape characters for backslashes. The username should be in title case.\n\n(Input: `alice` → Output: `C:\\Users\\Alice\\Documents\\file.txt`)",
      "starterCode": "# Read a username and print a Windows file path with escape characters\n",
      "solutionCode": "username = input().strip().title()\nprint(f'C:\\\\Users\\\\{username}\\\\Documents\\\\file.txt')",
      "testCases": [
        {
          "input": "alice\n",
          "expectedOutput": "C:\\Users\\Alice\\Documents\\file.txt\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 55
    },
    {
      "title": "Quote Formatter",
      "prompt": "Read an author name and a quote from input. Print it formatted as:\n`\"QUOTE\" - Author Name`\nwhere the quote is surrounded by double quotes (using escape characters) and the author is in title case. If either input is empty after stripping, print `Invalid input`.\n\n(Input: `john doe`, `life is beautiful` → Output: `\"life is beautiful\" - John Doe`)",
      "starterCode": "# Read author and quote, print formatted with escaped quotes\n",
      "solutionCode": "author = input().strip()\nquote = input().strip()\nif not author or not quote:\n    print('Invalid input')\nelse:\n    print(f'\"{quote}\" - {author.title()}')",
      "testCases": [
        {
          "input": "john doe\nlife is beautiful\n",
          "expectedOutput": "\"life is beautiful\" - John Doe\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 70
    },
    {
      "title": "Escape Quotes",
      "prompt": "Print the string: `He said, \"Hello!\"` using single quotes for the outer string and escaping the inner double quotes.",
      "starterCode": "# Print the string with escaped double quotes\n",
      "solutionCode": "print('He said, \\\"Hello!\\\"')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "He said, \"Hello!\"\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Tab and Newline",
      "prompt": "Print `A\\tB\\nC` (A, tab, B, newline, C).",
      "starterCode": "# Print the string with tab and newline escapes\n",
      "solutionCode": "print('A\\tB\\nC')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "A\tB\nC\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ,
    {
      "title": "Tabbed Columns",
      "prompt": "Use escape sequences to print A, tab, B, newline, C, tab, D (4 letters in a 2x2 tab-separated grid).",
      "starterCode": "# \\t and \\n\n",
      "solutionCode": "print('A\\tB\\nC\\tD')",
      "testCases": [{ "input": "", "expectedOutput": "A\tB\nC\tD\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    }
  ],
  "raw-strings": [
    {
      "title": "Raw vs Regular",
      "prompt": "Print the following two lines:\n1. Using a regular string: `C:\\new\\text` (hint: use `\\n` and `\\t` carefully)\n2. Using a raw string: `C:\\new\\text` (the literal characters)\n\nNotice the difference in output.",
      "starterCode": "# Print using regular string (escape characters apply)\n# Print using raw string (no escape processing)\n",
      "solutionCode": "print('C:\\\\new\\\\text')\nprint(r'C:\\new\\text')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "C:\\new\\text\nC:\\new\\text\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Path Builder",
      "prompt": "Read a username and a filename from input. Build and print a Windows path:\n`C:\\Users\\USERNAME\\Documents\\FILENAME`\nUse a raw string for the base path `C:\\Users\\` and concatenate the rest. Apply title case to username. If either input is empty, print `Invalid input`.",
      "starterCode": "# Read username and filename, build a Windows path using raw string\n",
      "solutionCode": "username = input().strip()\nfilename = input().strip()\nif not username or not filename:\n    print('Invalid input')\nelse:\n    base = r'C:\\Users' + '\\\\'\n    path = base + username.title() + r'\\Documents' + '\\\\' + filename\n    print(path)",
      "testCases": [
        {
          "input": "alice\nreport.pdf\n",
          "expectedOutput": "C:\\Users\\Alice\\Documents\\report.pdf\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "Regex Pattern Checker",
      "prompt": "Using the `re` module and a raw string pattern, read a string from input and check if it matches a valid phone number pattern: exactly `XXX-XXX-XXXX` where X is a digit. Print `Valid phone number` or `Invalid phone number`.\n\n(Input: `123-456-7890` → Output: `Valid phone number`)",
      "starterCode": "import re\n# Read a string and check if it matches XXX-XXX-XXXX pattern\n",
      "solutionCode": "import re\nphone = input().strip()\npattern = r'^\\d{3}-\\d{3}-\\d{4}$'\nif re.match(pattern, phone):\n    print('Valid phone number')\nelse:\n    print('Invalid phone number')",
      "testCases": [
        {
          "input": "123-456-7890\n",
          "expectedOutput": "Valid phone number\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Multi-Pattern Validator",
      "prompt": "Using the `re` module with raw strings, read a string from input and check it against all three patterns. Print results on separate lines:\n1. `Email: True/False` (pattern: `word@word.word`)\n2. `Phone: True/False` (pattern: `XXX-XXX-XXXX`)\n3. `Postcode: True/False` (pattern: exactly 5 digits)\n\n(Input: `hello@test.com` → Email: True, Phone: False, Postcode: False)",
      "starterCode": "import re\n# Read a string and check against three patterns\n",
      "solutionCode": "import re\ntext = input().strip()\nemail_ok = bool(re.match(r'^[\\w.]+@[\\w.]+\\.[a-z]{2,}$', text, re.IGNORECASE))\nphone_ok = bool(re.match(r'^\\d{3}-\\d{3}-\\d{4}$', text))\npost_ok = bool(re.match(r'^\\d{5}$', text))\nprint(f'Email: {email_ok}')\nprint(f'Phone: {phone_ok}')\nprint(f'Postcode: {post_ok}')",
      "testCases": [
        {
          "input": "hello@test.com\n",
          "expectedOutput": "Email: True\nPhone: False\nPostcode: False\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Raw String Usage",
      "prompt": "Print the Windows path `C:\\new\\folder` using a raw string `r'...'` so the backslashes don't act as escape characters.",
      "starterCode": "# Print the path using a raw string\n",
      "solutionCode": "print(r'C:\\new\\folder')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "C:\\new\\folder\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "string-formatting-fstrings": [
    {
      "title": "Basic f-string",
      "prompt": "Given `name = 'Alice'` and `age = 25`, use an f-string to print: `Alice is 25 years old.`",
      "starterCode": "name = 'Alice'\nage = 25\n# Print using an f-string\n",
      "solutionCode": "name = 'Alice'\nage = 25\nprint(f'{name} is {age} years old.')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alice is 25 years old.\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Formatted Price",
      "prompt": "Read a price as a float from input. Print it formatted as a dollar amount with exactly 2 decimal places, like `$X.XX`. If the price is negative, print `Invalid price`.\n\n(Input: `9.5` → Output: `$9.50`)",
      "starterCode": "# Read a price and print it formatted\n",
      "solutionCode": "price = float(input())\nif price < 0:\n    print('Invalid price')\nelse:\n    print(f'${price:.2f}')",
      "testCases": [
        {
          "input": "9.5\n",
          "expectedOutput": "$9.50\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Student Report Card",
      "prompt": "Read a student name and 3 subject scores (as floats) from input. Print a formatted report:\n- Name right-aligned in 20 chars\n- Each score with 1 decimal place\n- Average with 2 decimal places\n- Grade: A(>=90), B(>=80), C(>=70), D(>=60), F(<60)\n\nIf any score is outside 0-100, print `Invalid score`.",
      "starterCode": "# Read name and 3 scores, print a formatted report card\n",
      "solutionCode": "name = input().strip()\nscores = [float(input()) for _ in range(3)]\nif any(s < 0 or s > 100 for s in scores):\n    print('Invalid score')\nelse:\n    avg = sum(scores) / 3\n    grade = 'A' if avg >= 90 else 'B' if avg >= 80 else 'C' if avg >= 70 else 'D' if avg >= 60 else 'F'\n    print(f\"{'Name':<10}: {name:>20}\")\n    print(f\"{'Score 1':<10}: {scores[0]:>19.1f}\")\n    print(f\"{'Score 2':<10}: {scores[1]:>19.1f}\")\n    print(f\"{'Score 3':<10}: {scores[2]:>19.1f}\")\n    print(f\"{'Average':<10}: {avg:>19.2f}\")\n    print(f\"{'Grade':<10}: {grade:>20}\")",
      "testCases": [
        {
          "input": "Alice\n85\n90\n78\n",
          "expectedOutput": "Name      :                Alice\nScore 1   :                85.0\nScore 2   :                90.0\nScore 3   :                78.0\nAverage   :               84.33\nGrade     :                    B\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 70
    },
    {
      "title": "Invoice Generator",
      "prompt": "Read N items (N given first). Each item is on one line: `name price quantity` (space-separated). Generate an invoice:\n- Header: `INVOICE` centered in 45 chars with `=` borders\n- Each row: name left-aligned 20, qty right-aligned 5, unit price right-aligned 9 with $, total right-aligned 9 with $\n- Footer: subtotal, tax (8%), and total\n- If N is 0 or any price/qty is negative, print `Invalid invoice`\n\nRound all money to 2 decimal places.",
      "starterCode": "# Read N items and generate a formatted invoice\n",
      "solutionCode": "n = int(input())\nif n <= 0:\n    print('Invalid invoice')\nelse:\n    items = []\n    valid = True\n    for _ in range(n):\n        parts = input().split()\n        name = parts[0]\n        price = float(parts[1])\n        qty = int(parts[2])\n        if price < 0 or qty < 0:\n            valid = False\n            break\n        items.append((name, price, qty))\n    if not valid:\n        print('Invalid invoice')\n    else:\n        print('INVOICE'.center(45))\n        print('=' * 45)\n        print(f\"{'Item':<20} {'Qty':>5} {'Price':>9} {'Total':>8}\")\n        print('-' * 45)\n        subtotal = 0\n        for name, price, qty in items:\n            total = price * qty\n            subtotal += total\n            print(f'{name:<20} {qty:>5} ${price:>8.2f} ${total:>7.2f}')\n        tax = subtotal * 0.08\n        grand = subtotal + tax\n        print('=' * 45)\n        print(f\"{'Subtotal':>36} ${subtotal:>7.2f}\")\n        print(f\"{'Tax (8%)':>36} ${tax:>7.2f}\")\n        print(f\"{'TOTAL':>36} ${grand:>7.2f}\")",
      "testCases": [
        {
          "input": "2\nCoffee 4.50 2\nSandwich 8.99 1\n",
          "expectedOutput": "                   INVOICE                   \n=============================================\nItem                   Qty     Price    Total\n---------------------------------------------\nCoffee                   2 $    4.50 $   9.00\nSandwich                 1 $    8.99 $   8.99\n=============================================\n                            Subtotal $  17.99\n                            Tax (8%) $   1.44\n                               TOTAL $  19.43\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 95
    },
    {
      "title": "Basic f-string",
      "prompt": "Given `name = 'Alice'` and `age = 25`. Use an f-string to print `'Alice is 25 years old.'`",
      "starterCode": "name = 'Alice'\nage = 25\n# Print using f-string\n",
      "solutionCode": "name = 'Alice'\nage = 25\nprint(f'{name} is {age} years old.')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Alice is 25 years old.\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "f-string Expressions",
      "prompt": "Given `x = 10` and `y = 5`. Use an f-string to print `'10 + 5 = 15'`, evaluating the math directly inside the `{}`.",
      "starterCode": "x = 10\ny = 5\n# Evaluate math in f-string\n",
      "solutionCode": "x = 10\ny = 5\nprint(f'{x} + {y} = {x + y}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "10 + 5 = 15\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "f-string Float Formatting",
      "prompt": "Given `pi = 3.14159`. Use an f-string to print `pi` rounded to 2 decimal places using `{pi:.2f}`.",
      "starterCode": "pi = 3.14159\n# Print formatted to 2 decimals\n",
      "solutionCode": "pi = 3.14159\nprint(f'{pi:.2f}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "3.14\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Data Sanitizer",
      "prompt": "Read a dirty string from input (e.g. `'   john.doe@EMAIL.com   '`). You must sanitize it: strip all whitespace, convert the whole string to lowercase. Then, use an f-string to print `'Sanitized Email: [email]'`.",
      "starterCode": "# Read, strip, lower, and format the output\n",
      "solutionCode": "raw_email = input()\nclean = raw_email.strip().lower()\nprint(f'Sanitized Email: {clean}')",
      "testCases": [
        {
          "input": "   john.doe@EMAIL.com   \n",
          "expectedOutput": "Sanitized Email: john.doe@email.com\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Module Integration: Formatted Receipt",
      "prompt": "Read `item_name` (string) and `price` (float). Print a receipt line where the item name is padded to exactly 15 characters (left aligned) and the price is formatted to 2 decimal places. Use f-strings like `{item_name:<15}`. Example output: 'apple           $1.50'.",
      "starterCode": "# Read inputs, format using f-strings with alignment and precision\n",
      "solutionCode": "item_name = input().strip()\nprice = float(input())\nprint(f'{item_name:<15}${price:.2f}')",
      "testCases": [
        {
          "input": "apple\n1.5\n",
          "expectedOutput": "apple          $1.50\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 100
    }
  ,
    {
      "title": "Formatted Price",
      "prompt": "Given price = 9.5, use an f-string to print: Price: $9.50  (format with 2 decimal places.)",
      "starterCode": "# f-string formatting\n",
      "solutionCode": "price = 9.5\nprint(f'Price: ${price:.2f}')",
      "testCases": [{ "input": "", "expectedOutput": "Price: $9.50\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
    {
      "title": "Build: Score Line",
      "prompt": "Read a name and an integer score. Print one formatted line: name left-aligned in 10 chars, a pipe |, then the score right-aligned in 5 chars. Example: 'Alice     |   95'",
      "starterCode": "# f-string alignment\n",
      "solutionCode": "name = input()\nscore = int(input())\nprint(f'{name:<10}|{score:>5}')",
      "testCases": [{ "input": "Alice\n95\n", "expectedOutput": "Alice     |   95\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
{
      "title": "Build: Anagram Checker",
      "prompt": "## What To Do\n\nTwo strings are **anagrams** if they contain the same characters in the same frequency, just in a different order. Write a program that checks if two strings are anagrams.\n\n## Requirements\n\n- Read two strings from input (one per line)\n- Print `Anagrams` if they are anagrams, otherwise print `Not anagrams`\n- Ignore case and spaces when checking\n- Use **character frequency counting** (dictionary or Counter) — sorting both strings and comparing is not the intended approach\n\n## Example\n\n**Input:**\n```\nlisten\nsilent\n```\n**Output:**\n```\nAnagrams\n```\n\n**Input:**\n```\nhello\nworld\n```\n**Output:**\n```\nNot anagrams\n```",
      "starterCode": "# Read two strings and check if they are anagrams\ns1 = input().strip()\ns2 = input().strip()\n",
      "solutionCode": "s1 = input().strip().lower().replace(' ', '')\ns2 = input().strip().lower().replace(' ', '')\nfrom collections import Counter\nif Counter(s1) == Counter(s2):\n    print('Anagrams')\nelse:\n    print('Not anagrams')",
      "testCases": [
        {
          "input": "listen\nsilent\n",
          "expectedOutput": "Anagrams\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    }
  ,
{
      "title": "Pangram Checker",
      "prompt": "## What To Do\n\nA **pangram** is a sentence that contains every letter of the alphabet at least once. Write a program that checks if a given sentence is a pangram.\n\n## Requirements\n\n- Read a sentence from input (may contain spaces, punctuation, mixed case)\n- Print `Pangram` if it uses all 26 English letters, otherwise print `Not a pangram`\n- Ignore case — treat 'A' and 'a' the same\n- Use a **set** of characters for efficient checking\n\n## Examples\n\n**Input:**\n```\nThe quick brown fox jumps over the lazy dog\n```\n**Output:**\n```\nPangram\n```\n\n**Input:**\n```\nHello World\n```\n**Output:**\n```\nNot a pangram\n```",
      "starterCode": "# Check if the input sentence is a pangram\nsentence = input()\n",
      "solutionCode": "sentence = input().lower()\nletters = set(c for c in sentence if c.isalpha())\nif len(letters) == 26:\n    print('Pangram')\nelse:\n    print('Not a pangram')",
      "testCases": [
        {
          "input": "The quick brown fox jumps over the lazy dog\n",
          "expectedOutput": "Pangram\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    }
  ,
{
      "title": "Build: Longest Word in Sentence",
      "prompt": "## What To Do\n\nRead a sentence from input and find the **longest word** in it. If there are multiple words with the same maximum length, print the one that appears **first**.\n\n## Requirements\n\n- A sentence may contain punctuation — clean each word of non-alphabetic characters\n- Print the longest word in lowercase\n- If the sentence is empty, print `No words`\n\n## Example\n\n**Input:**\n```\nPython programming is amazing!\n```\n**Output:**\n```\nprogramming\n```\n*(Because 'programming' has 11 characters, the longest)*",
      "starterCode": "# Read sentence and find longest word\nsentence = input().strip()\n",
      "solutionCode": "import re\nsentence = input().strip()\nif not sentence:\n    print('No words')\nelse:\n    words = re.findall(r'[A-Za-z]+', sentence)\n    if not words:\n        print('No words')\n    else:\n        longest = max(words, key=len)\n        print(longest.lower())",
      "testCases": [
        {
          "input": "Python programming is amazing!\n",
          "expectedOutput": "programming\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ,
{
      "title": "Build: Caesar Cipher",
      "prompt": "## What To Do\n\nImplement a **Caesar cipher** encoder. Shift each letter in the input text by a given number of positions in the alphabet, wrapping around from Z to A.\n\n## Requirements\n\n- First input: the text to encode (may include spaces and punctuation)\n- Second input: the shift amount (integer)\n- Output: the encoded text\n- Preserve case (uppercase stays uppercase, lowercase stays lowercase)\n- Non-alphabetic characters (spaces, punctuation) remain unchanged\n- If shift is negative or larger than 26, handle it correctly using modulo\n\n## Example\n\n**Input:**\n```\nHello, World!\n3\n```\n**Output:**\n```\nKhoor, Zruog!\n```\n*(Each letter shifted forward by 3: H→K, e→h, l→o, l→o, o→r, etc.)*",
      "starterCode": "# Caesar cipher encoder\ntext = input()\nshift = int(input())\n",
      "solutionCode": "text = input()\nshift = int(input()) % 26\nresult = []\nfor ch in text:\n    if 'a' <= ch <= 'z':\n        result.append(chr((ord(ch) - ord('a') + shift) % 26 + ord('a')))\n    elif 'A' <= ch <= 'Z':\n        result.append(chr((ord(ch) - ord('A') + shift) % 26 + ord('A')))\n    else:\n        result.append(ch)\nprint(''.join(result))",
      "testCases": [
        {
          "input": "Hello, World!\n3\n",
          "expectedOutput": "Khoor, Zruog!\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    }
  ,
{
      "title": "Build: Extract Hashtags",
      "prompt": "## What To Do\n\nExtract all **hashtags** from a tweet/post. A hashtag starts with `#` followed by letters and digits (no spaces). Write a program that finds and prints all hashtags from the input.\n\n## Requirements\n\n- Read text from input (single line)\n- Find all words that start with `#` and contain only letters and digits\n- Print each hashtag on its own line, sorted alphabetically\n- If no hashtags are found, print `No hashtags`\n- Remove the `#` prefix when printing (just the tag word)\n\n## Example\n\n**Input:**\n```\nLoving #Python and #coding! Also #100DaysOfCode\n```\n**Output:**\n```\n100DaysOfCode\nPython\ncoding\n```\n\n> **Hint:** Use `re.findall(r'#([A-Za-z0-9_]+)', text)` to extract hashtags.",
      "starterCode": "import re\n# Extract and print hashtags\ntext = input()\n",
      "solutionCode": "import re\ntext = input()\nhashtags = re.findall(r'#([A-Za-z0-9_]+)', text)\nif hashtags:\n    for tag in sorted(hashtags):\n        print(tag)\nelse:\n    print('No hashtags')",
      "testCases": [
        {
          "input": "Loving #Python and #coding! Also #100DaysOfCode\n",
          "expectedOutput": "100DaysOfCode\nPython\ncoding\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    }
  ,
{
      "title": "Build: Run-Length Encoding",
      "prompt": "## What To Do\n\n**Run-length encoding (RLE)** is a simple compression algorithm. It replaces consecutive repeated characters with the character and its count. Write a program that encodes a string using RLE.\n\n## Requirements\n\n- Read a string from input\n- For each run of consecutive identical characters, print the character followed by the count\n- If the string is empty, print `Empty input`\n- Case matters: `AAA` and `aaa` are different runs\n\n## Example\n\n**Input:**\n```\nAAABBBCCCCA\n```\n**Output:**\n```\nA3B3C4A1\n```\n*(Breakdown: AAA→A3, BBB→B3, CCCCC→C5, A→A1)*\n\n> RLE works well for data with many repeated characters (like simple images or ASCII art).",
      "starterCode": "# Run-length encode a string\ntext = input().strip()\n",
      "solutionCode": "text = input().strip()\nif not text:\n    print('Empty input')\nelse:\n    result = []\n    count = 1\n    for i in range(1, len(text)):\n        if text[i] == text[i - 1]:\n            count += 1\n        else:\n            result.append(f'{text[i - 1]}{count}')\n            count = 1\n    result.append(f'{text[-1]}{count}')\n    print(''.join(result))",
      "testCases": [
        {
          "input": "AAABBBCCCCA\n",
          "expectedOutput": "A3B3C4A1\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    }
  ]
};
