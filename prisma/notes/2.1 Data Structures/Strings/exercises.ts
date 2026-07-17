export const exercises: Record<string, any[]> = {
  "strings-complete": [
    {
      "title": "String Creation",
      "prompt": "Create a string variable `message` with the value 'Hello Python' and print it.",
      "starterCode": "# Create message and print\n",
      "solutionCode": "message = 'Hello Python'\nprint(message)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Hello Python\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 10
    },
    {
      "title": "String Length",
      "prompt": "Given `text = 'Data Structures'`. Use the `len()` function to print its length.",
      "starterCode": "text = 'Data Structures'\n# Print the length of text\n",
      "solutionCode": "text = 'Data Structures'\nprint(len(text))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "15\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "String Indexing",
      "prompt": "Given `word = 'Programming'`. Print the first character and the last character on separate lines.",
      "starterCode": "word = 'Programming'\n# Print first and last characters\n",
      "solutionCode": "word = 'Programming'\nprint(word[0])\nprint(word[-1])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "P\ng\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "String Slicing",
      "prompt": "Given `word = 'Python'`. Print the first 3 characters using slicing.",
      "starterCode": "word = 'Python'\n# Slice and print the first 3 characters\n",
      "solutionCode": "word = 'Python'\nprint(word[:3])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Pyt\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Negative Slicing",
      "prompt": "Given `word = 'Development'`. Print the last 4 characters using negative slicing.",
      "starterCode": "word = 'Development'\n# Slice and print the last 4 characters\n",
      "solutionCode": "word = 'Development'\nprint(word[-4:])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "ment\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Reverse a String",
      "prompt": "Given `word = 'hello'`. Use slicing with a negative step (`[::-1]`) to reverse the string and print it.",
      "starterCode": "word = 'hello'\n# Reverse word and print\n",
      "solutionCode": "word = 'hello'\nprint(word[::-1])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "olleh\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "String Immutability",
      "prompt": "Strings cannot be changed. Try to change the first letter of `s = 'cat'` to 'b'. Catch the `TypeError` and print 'Immutable'.",
      "starterCode": "s = 'cat'\ntry:\n    # Try to change s[0] to 'b'\n    pass\nexcept TypeError:\n    print('Immutable')",
      "solutionCode": "s = 'cat'\ntry:\n    s[0] = 'b'\nexcept TypeError:\n    print('Immutable')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Immutable\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "String Concatenation",
      "prompt": "Given `a = 'Py'` and `b = 'thon'`. Concatenate them using `+` and print the result.",
      "starterCode": "a = 'Py'\nb = 'thon'\n# Concatenate and print\n",
      "solutionCode": "a = 'Py'\nb = 'thon'\nprint(a + b)",
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
      "title": "String Repetition",
      "prompt": "Given `star = '*'`. Print the star repeated 10 times using the `*` operator.",
      "starterCode": "star = '*'\n# Print star 10 times\n",
      "solutionCode": "star = '*'\nprint(star * 10)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "**********\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "String Lower and Upper",
      "prompt": "Given `text = 'MixEd CaSe'`. Print it in all lowercase, then all uppercase on separate lines.",
      "starterCode": "text = 'MixEd CaSe'\n# Print lower then upper\n",
      "solutionCode": "text = 'MixEd CaSe'\nprint(text.lower())\nprint(text.upper())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "mixed case\nMIXED CASE\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "String Strip",
      "prompt": "Given `text = '  padded  '`. Use `.strip()` to remove the leading and trailing whitespace and print the result.",
      "starterCode": "text = '  padded  '\n# Strip and print\n",
      "solutionCode": "text = '  padded  '\nprint(text.strip())",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "padded\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "String Replace",
      "prompt": "Given `text = 'I like apples'`. Use `.replace()` to replace 'apples' with 'oranges'. Print the new string.",
      "starterCode": "text = 'I like apples'\n# Replace and print\n",
      "solutionCode": "text = 'I like apples'\nprint(text.replace('apples', 'oranges'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "I like oranges\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "String Split",
      "prompt": "Given `csv = 'apple,banana,cherry'`. Use `.split(',')` to split it into a list and print the list.",
      "starterCode": "csv = 'apple,banana,cherry'\n# Split by comma and print list\n",
      "solutionCode": "csv = 'apple,banana,cherry'\nprint(csv.split(','))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "['apple', 'banana', 'cherry']\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "String Join",
      "prompt": "Given `words = ['Python', 'is', 'fun']`. Use `' '.join(words)` to combine them into a single string separated by spaces, and print it.",
      "starterCode": "words = ['Python', 'is', 'fun']\n# Join with a space and print\n",
      "solutionCode": "words = ['Python', 'is', 'fun']\nprint(' '.join(words))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "Python is fun\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "String Find",
      "prompt": "Given `text = 'find the needle in the haystack'`. Use `.find('needle')` to get the index where it starts and print it.",
      "starterCode": "text = 'find the needle in the haystack'\n# Find 'needle' and print index\n",
      "solutionCode": "text = 'find the needle in the haystack'\nprint(text.find('needle'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "9\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Palindrome Checker",
      "prompt": "Read a string from input. A palindrome reads the same forwards and backwards (e.g. 'racecar'). Ignore case by making it lowercase, and remove any spaces. Print 'True' if it's a palindrome, 'False' otherwise.",
      "starterCode": "# Read input, format it, check if palindrome, print True/False\n",
      "solutionCode": "text = input().lower().replace(' ', '')\nprint(text == text[::-1])",
      "testCases": [
        {
          "input": "Race car\n",
          "expectedOutput": "True\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Module Integration: Vowel and Consonant Counter",
      "prompt": "Read a string from input. Count the number of vowels (a, e, i, o, u) and consonants (letters that are not vowels). Ignore spaces and numbers. Print 'Vowels: [v_count]' on one line and 'Consonants: [c_count]' on the next.",
      "starterCode": "# Read string, count vowels and consonants, print results\n",
      "solutionCode": "text = input().lower()\nvowels = 'aeiou'\nv_count = 0\nc_count = 0\nfor char in text:\n    if char.isalpha():\n        if char in vowels:\n            v_count += 1\n        else:\n            c_count += 1\nprint(f'Vowels: {v_count}')\nprint(f'Consonants: {c_count}')",
      "testCases": [
        {
          "input": "Hello World 123!\n",
          "expectedOutput": "Vowels: 3\nConsonants: 7\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    }
  ]
};
