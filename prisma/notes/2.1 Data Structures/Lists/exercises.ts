export const exercises: Record<string, any[]> = {
  "list-creating": [
    {
      "title": "Create and Print a List",
      "prompt": "Create a list called `colors` containing `'red'`, `'green'`, and `'blue'`. Print the list and its length on separate lines.",
      "starterCode": "# Create the colors list and print it with its length\n",
      "solutionCode": "colors = ['red', 'green', 'blue']\nprint(colors)\nprint(len(colors))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "['red', 'green', 'blue']\n3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "List from Range",
      "prompt": "Create a list of all even numbers from 2 to 20 (inclusive) using `list()` and `range()`. Print the list.",
      "starterCode": "# Create a list of even numbers from 2 to 20\n",
      "solutionCode": "evens = list(range(2, 21, 2))\nprint(evens)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[2, 4, 6, 8, 10, 12, 14, 16, 18, 20]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "List Stats",
      "prompt": "Read N integers from input (N given first, then one number per line). Print the minimum, maximum, sum, and average (2 decimal places) on separate lines. If N is 0 or negative, print `No data`.",
      "starterCode": "# Read N numbers and print their statistics\n",
      "solutionCode": "n = int(input())\nif n <= 0:\n    print('No data')\nelse:\n    numbers = [int(input()) for _ in range(n)]\n    print(min(numbers))\n    print(max(numbers))\n    print(sum(numbers))\n    print(f'{sum(numbers)/len(numbers):.2f}')",
      "testCases": [
        {
          "input": "5\n10\n3\n8\n1\n6\n",
          "expectedOutput": "1\n10\n28\n5.60\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "Shopping Cart Builder",
      "prompt": "Read items into a list until the user types `done`. Print the final cart as a list and the total number of items. If no items were entered, print `Cart is empty`.\n\nInputs are one per line, last input is `done`.\n\n(Input: `apple`, `milk`, `bread`, `done` → Output: `['apple', 'milk', 'bread']` then `3 items`)",
      "starterCode": "# Read items until 'done', build and print the cart\n",
      "solutionCode": "cart = []\nwhile True:\n    item = input()\n    if item.lower() == 'done':\n        break\n    cart.append(item)\nif not cart:\n    print('Cart is empty')\nelse:\n    print(cart)\n    print(f'{len(cart)} items')",
      "testCases": [
        {
          "input": "apple\nmilk\nbread\ndone\n",
          "expectedOutput": "['apple', 'milk', 'bread']\n3 items\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Empty List",
      "prompt": "Create an empty list called `my_list` and print it.",
      "starterCode": "# Create an empty list and print it\n",
      "solutionCode": "my_list = []\nprint(my_list)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 10
    },
    {
      "title": "Mixed Data Types",
      "prompt": "Create a list named `mixed` containing the integer 1, the string 'hello', and the boolean True. Print the list.",
      "starterCode": "# Create mixed list and print\n",
      "solutionCode": "mixed = [1, 'hello', True]\nprint(mixed)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 'hello', True]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "list-indexing-slicing": [
    {
      "title": "First and Last",
      "prompt": "Given `items = [10, 20, 30, 40, 50]`, print the first item and the last item using indexing (not slicing).",
      "starterCode": "items = [10, 20, 30, 40, 50]\n# Print first item\n# Print last item\n",
      "solutionCode": "items = [10, 20, 30, 40, 50]\nprint(items[0])\nprint(items[-1])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "10\n50\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Middle Slice",
      "prompt": "Read N numbers from input (N given first). Using slicing, print the middle third of the list. If N < 3, print `Too small`.\n\nFor a list of 9 items, the middle third is indices 3 to 5 (inclusive).\n\n(Input: `9`, then `1-9` → Output: `[4, 5, 6]`)",
      "starterCode": "# Read N numbers and print the middle third\n",
      "solutionCode": "n = int(input())\nif n < 3:\n    print('Too small')\nelse:\n    numbers = [int(input()) for _ in range(n)]\n    third = n // 3\n    print(numbers[third:2*third])",
      "testCases": [
        {
          "input": "9\n1\n2\n3\n4\n5\n6\n7\n8\n9\n",
          "expectedOutput": "[4, 5, 6]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "Reverse and Slice",
      "prompt": "Read a list of N integers. Print:\n1. The list reversed (using slicing)\n2. Every other element from the original (using step slicing)\n3. The last 3 elements\n\nIf N < 3, print `List too short` instead of the last 3 elements.\n\n(Input: N=6, items: 1,2,3,4,5,6)",
      "starterCode": "# Read N numbers and print reversed, every other, and last 3\n",
      "solutionCode": "n = int(input())\nnumbers = [int(input()) for _ in range(n)]\nprint(numbers[::-1])\nprint(numbers[::2])\nif n < 3:\n    print('List too short')\nelse:\n    print(numbers[-3:])",
      "testCases": [
        {
          "input": "6\n1\n2\n3\n4\n5\n6\n",
          "expectedOutput": "[6, 5, 4, 3, 2, 1]\n[1, 3, 5]\n[4, 5, 6]\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Paginator",
      "prompt": "Read a page size and page number from input, then read N items. Print the items for that page (1-indexed). If the page number is out of range, print `Invalid page`. Each item prints on its own line.\n\n(Input: page_size=3, page=2, N=7, items 1-7 → prints 4, 5, 6)",
      "starterCode": "# Read page_size, page number, then N items - print the page\n",
      "solutionCode": "page_size = int(input())\npage_num = int(input())\nn = int(input())\nitems = [input() for _ in range(n)]\ntotal_pages = (n + page_size - 1) // page_size\nif page_num < 1 or page_num > total_pages:\n    print('Invalid page')\nelse:\n    start = (page_num - 1) * page_size\n    end = start + page_size\n    for item in items[start:end]:\n        print(item)",
      "testCases": [
        {
          "input": "3\n2\n7\na\nb\nc\nd\ne\nf\ng\n",
          "expectedOutput": "d\ne\nf\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Access by Index",
      "prompt": "Given `colors = ['red', 'green', 'blue', 'yellow']`. Print the first element and the last element on separate lines using positive and negative indexing.",
      "starterCode": "colors = ['red', 'green', 'blue', 'yellow']\n# Print first and last elements\n",
      "solutionCode": "colors = ['red', 'green', 'blue', 'yellow']\nprint(colors[0])\nprint(colors[-1])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "red\nyellow\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "List Slicing",
      "prompt": "Given `nums = [0, 1, 2, 3, 4, 5]`. Print a slice containing the middle three elements: `[2, 3, 4]`.",
      "starterCode": "nums = [0, 1, 2, 3, 4, 5]\n# Slice and print\n",
      "solutionCode": "nums = [0, 1, 2, 3, 4, 5]\nprint(nums[2:5])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[2, 3, 4]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "list-methods-add": [
    {
      "title": "Append to List",
      "prompt": "Start with `numbers = [1, 2, 3]`. Append the value `4` to it, then print the list.",
      "starterCode": "numbers = [1, 2, 3]\n# Append 4 and print\n",
      "solutionCode": "numbers = [1, 2, 3]\nnumbers.append(4)\nprint(numbers)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 2, 3, 4]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Extend vs Append",
      "prompt": "Given `list_a = [1, 2, 3]` and `list_b = [4, 5, 6]`:\n1. Create `list_c` by using `extend()` to add list_b into list_a's copy\n2. Create `list_d` by using `append()` to add list_b as a whole into another copy\nPrint list_c then list_d.",
      "starterCode": "list_a = [1, 2, 3]\nlist_b = [4, 5, 6]\n# Create list_c using extend, list_d using append\n",
      "solutionCode": "list_a = [1, 2, 3]\nlist_b = [4, 5, 6]\nlist_c = list_a.copy()\nlist_c.extend(list_b)\nlist_d = list_a.copy()\nlist_d.append(list_b)\nprint(list_c)\nprint(list_d)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 2, 3, 4, 5, 6]\n[1, 2, 3, [4, 5, 6]]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Priority Insert",
      "prompt": "Read N tasks from input (one per line, N given first). Then read a priority task. Insert the priority task at the beginning of the list. Print the final list, one item per line with its position number.\n\nIf N is 0, the priority task is still inserted as item 1.",
      "starterCode": "# Read N tasks, then a priority task, insert at front and print\n",
      "solutionCode": "n = int(input())\ntasks = [input() for _ in range(n)]\npriority = input()\ntasks.insert(0, priority)\nfor i, task in enumerate(tasks, 1):\n    print(f'{i}. {task}')",
      "testCases": [
        {
          "input": "3\nWalk dog\nBuy groceries\nRead book\nSubmit report\n",
          "expectedOutput": "1. Submit report\n2. Walk dog\n3. Buy groceries\n4. Read book\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 55
    },
    {
      "title": "Merge Sorted Lists",
      "prompt": "Read two sorted lists of integers (M then M items, N then N items). Merge them by extending one with the other, then sort the combined list and print it. Also print the total count.\n\nIf both lists are empty, print `Both lists are empty`.",
      "starterCode": "# Read two sorted lists, merge, sort, and print\n",
      "solutionCode": "m = int(input())\nlist1 = [int(input()) for _ in range(m)]\nn = int(input())\nlist2 = [int(input()) for _ in range(n)]\nif not list1 and not list2:\n    print('Both lists are empty')\nelse:\n    merged = list1.copy()\n    merged.extend(list2)\n    merged.sort()\n    print(merged)\n    print(f'Total: {len(merged)}')",
      "testCases": [
        {
          "input": "3\n1\n3\n5\n3\n2\n4\n6\n",
          "expectedOutput": "[1, 2, 3, 4, 5, 6]\nTotal: 6\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 75
    },
    {
      "title": "Append an Element",
      "prompt": "Given `fruits = ['apple']`. Use `.append()` to add 'banana' to the list, then print `fruits`.",
      "starterCode": "fruits = ['apple']\n# Append 'banana' and print\n",
      "solutionCode": "fruits = ['apple']\nfruits.append('banana')\nprint(fruits)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "['apple', 'banana']\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Extend a List",
      "prompt": "Given `list1 = [1, 2]` and `list2 = [3, 4]`. Use `.extend()` to add `list2` to `list1`, then print `list1`.",
      "starterCode": "list1 = [1, 2]\nlist2 = [3, 4]\n# Extend list1 with list2 and print\n",
      "solutionCode": "list1 = [1, 2]\nlist2 = [3, 4]\nlist1.extend(list2)\nprint(list1)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 2, 3, 4]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "list-methods-remove": [
    {
      "title": "Remove an Item",
      "prompt": "Given `fruits = ['apple', 'banana', 'cherry', 'banana']`, remove the first occurrence of `'banana'` and print the result.",
      "starterCode": "fruits = ['apple', 'banana', 'cherry', 'banana']\n# Remove first 'banana' and print\n",
      "solutionCode": "fruits = ['apple', 'banana', 'cherry', 'banana']\nfruits.remove('banana')\nprint(fruits)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "['apple', 'cherry', 'banana']\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Stack Pop",
      "prompt": "Read N integers into a list (N given first). Use `pop()` to remove and print the last 3 items one by one (most recent first). Then print the remaining list. If N < 3, print `Not enough items`.",
      "starterCode": "# Read N integers, pop last 3, print each, then print remaining\n",
      "solutionCode": "n = int(input())\nstack = [int(input()) for _ in range(n)]\nif n < 3:\n    print('Not enough items')\nelse:\n    for _ in range(3):\n        print(stack.pop())\n    print(stack)",
      "testCases": [
        {
          "input": "5\n10\n20\n30\n40\n50\n",
          "expectedOutput": "50\n40\n30\n[10, 20]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Safe Item Remover",
      "prompt": "Read a list of N strings (N given first). Then read M removal requests (M given next, one item name per line). For each item, if it exists in the list remove it and print `Removed: ITEM`, otherwise print `Not found: ITEM`. Print the final list at the end.",
      "starterCode": "# Read a list, then removal requests, handle each and print final list\n",
      "solutionCode": "n = int(input())\nitems = [input() for _ in range(n)]\nm = int(input())\nfor _ in range(m):\n    item = input()\n    if item in items:\n        items.remove(item)\n        print(f'Removed: {item}')\n    else:\n        print(f'Not found: {item}')\nprint(items)",
      "testCases": [
        {
          "input": "4\napple\nbanana\ncherry\nmango\n2\nbanana\ngrape\n",
          "expectedOutput": "Removed: banana\nNot found: grape\n['apple', 'cherry', 'mango']\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Queue Simulator",
      "prompt": "Simulate a customer service queue. Read commands one per line until `quit`:\n- `add NAME` → add to queue, print `NAME joined the queue`\n- `serve` → remove and print `Serving: NAME`. If empty, print `Queue is empty`\n- `status` → print `Queue: [list]` and `Length: N`\n- `quit` → stop\n\n(Commands stop at `quit`)",
      "starterCode": "# Simulate a queue with add, serve, status, and quit commands\n",
      "solutionCode": "queue = []\nwhile True:\n    command = input().strip()\n    if command == 'quit':\n        break\n    elif command.startswith('add '):\n        name = command[4:]\n        queue.append(name)\n        print(f'{name} joined the queue')\n    elif command == 'serve':\n        if not queue:\n            print('Queue is empty')\n        else:\n            print(f'Serving: {queue.pop(0)}')\n    elif command == 'status':\n        print(f'Queue: {queue}')\n        print(f'Length: {len(queue)}')",
      "testCases": [
        {
          "input": "add Alice\nadd Bob\nstatus\nserve\nstatus\nserve\nserve\nquit\n",
          "expectedOutput": "Alice joined the queue\nBob joined the queue\nQueue: ['Alice', 'Bob']\nLength: 2\nServing: Alice\nQueue: ['Bob']\nLength: 1\nServing: Bob\nQueue is empty\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Pop an Element",
      "prompt": "Given `nums = [10, 20, 30]`. Use `.pop()` to remove the last element, print the popped element, then print the modified list.",
      "starterCode": "nums = [10, 20, 30]\n# Pop, print popped value, print list\n",
      "solutionCode": "nums = [10, 20, 30]\nval = nums.pop()\nprint(val)\nprint(nums)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "30\n[10, 20]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Remove Specific Value",
      "prompt": "Given `names = ['Alice', 'Bob', 'Alice']`. Use `.remove()` to remove the first occurrence of 'Alice'. Print the list.",
      "starterCode": "names = ['Alice', 'Bob', 'Alice']\n# Remove 'Alice' and print\n",
      "solutionCode": "names = ['Alice', 'Bob', 'Alice']\nnames.remove('Alice')\nprint(names)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "['Bob', 'Alice']\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "list-methods-organize": [
    {
      "title": "Sort a List",
      "prompt": "Given `numbers = [5, 2, 8, 1, 9, 3]`, sort it in descending order and print the result.",
      "starterCode": "numbers = [5, 2, 8, 1, 9, 3]\n# Sort in descending order and print\n",
      "solutionCode": "numbers = [5, 2, 8, 1, 9, 3]\nnumbers.sort(reverse=True)\nprint(numbers)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[9, 8, 5, 3, 2, 1]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Sort and Keep Original",
      "prompt": "Read N integers. Print the original list, then a sorted ascending copy, then a sorted descending copy. The original must remain unchanged.\n\n(Input: N=4, items: 3,1,4,2 → original, ascending, descending)",
      "starterCode": "# Read N numbers, print original, sorted asc, sorted desc\n",
      "solutionCode": "n = int(input())\nnumbers = [int(input()) for _ in range(n)]\nprint(numbers)\nprint(sorted(numbers))\nprint(sorted(numbers, reverse=True))",
      "testCases": [
        {
          "input": "4\n3\n1\n4\n2\n",
          "expectedOutput": "[3, 1, 4, 2]\n[1, 2, 3, 4]\n[4, 3, 2, 1]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Leaderboard",
      "prompt": "Read N players (N given first). Each line has `name score` (space-separated). Sort by score descending and print the leaderboard with rank, name, and score. If scores are equal, maintain original order.\n\n(Input: 3 players → ranked output)",
      "starterCode": "# Read N players with scores, sort and print leaderboard\n",
      "solutionCode": "n = int(input())\nplayers = []\nfor _ in range(n):\n    parts = input().split()\n    name = parts[0]\n    score = int(parts[1])\n    players.append((name, score))\nplayers.sort(key=lambda x: x[1], reverse=True)\nfor rank, (name, score) in enumerate(players, 1):\n    print(f'#{rank} {name}: {score}')",
      "testCases": [
        {
          "input": "3\nAlice 1500\nBob 2300\nCharlie 1800\n",
          "expectedOutput": "#1 Bob: 2300\n#2 Charlie: 1800\n#3 Alice: 1500\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Sort Words by Multiple Criteria",
      "prompt": "Read N words. Sort them by:\n1. Length (ascending)\n2. If same length, alphabetically (ascending)\n\nPrint the sorted list. Also print how many words were longer than 5 characters.\n\nIf N is 0, print `No words`.",
      "starterCode": "# Read N words, sort by length then alphabetically, print sorted and count\n",
      "solutionCode": "n = int(input())\nif n == 0:\n    print('No words')\nelse:\n    words = [input() for _ in range(n)]\n    sorted_words = sorted(words, key=lambda w: (len(w), w))\n    print(sorted_words)\n    long_count = sum(1 for w in words if len(w) > 5)\n    print(f'Words longer than 5 chars: {long_count}')",
      "testCases": [
        {
          "input": "5\nbanana\nfig\napple\nkiwi\ncherry\n",
          "expectedOutput": "['fig', 'kiwi', 'apple', 'banana', 'cherry']\nWords longer than 5 chars: 2\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    },
    {
      "title": "Sort a List",
      "prompt": "Given `nums = [4, 1, 3, 2]`. Use `.sort()` to sort it in ascending order and print the list.",
      "starterCode": "nums = [4, 1, 3, 2]\n# Sort and print\n",
      "solutionCode": "nums = [4, 1, 3, 2]\nnums.sort()\nprint(nums)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 2, 3, 4]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Reverse Sort",
      "prompt": "Given `nums = [4, 1, 3, 2]`. Use `.sort(reverse=True)` to sort it in descending order and print.",
      "starterCode": "nums = [4, 1, 3, 2]\n# Sort descending and print\n",
      "solutionCode": "nums = [4, 1, 3, 2]\nnums.sort(reverse=True)\nprint(nums)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[4, 3, 2, 1]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "list-methods-search": [
    {
      "title": "Find an Item",
      "prompt": "Given `colors = ['red', 'green', 'blue', 'green', 'yellow']`, print the index of the first occurrence of `'green'`.",
      "starterCode": "colors = ['red', 'green', 'blue', 'green', 'yellow']\n# Print the index of the first 'green'\n",
      "solutionCode": "colors = ['red', 'green', 'blue', 'green', 'yellow']\nprint(colors.index('green'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Vote Counter",
      "prompt": "Read N votes from input (N given first, one candidate name per line). Print each unique candidate and their vote count in alphabetical order. Then print the winner. If there is a tie, print `Tie between: NAME1, NAME2` (sorted).",
      "starterCode": "# Read N votes, count and print results, determine winner\n",
      "solutionCode": "n = int(input())\nvotes = [input() for _ in range(n)]\ncandidates = sorted(set(votes))\ncounts = {c: votes.count(c) for c in candidates}\nfor name in candidates:\n    print(f'{name}: {counts[name]}')\nmax_votes = max(counts.values())\nwinners = sorted([c for c, v in counts.items() if v == max_votes])\nif len(winners) == 1:\n    print(f'Winner: {winners[0]}')\nelse:\n    print(f'Tie between: {\", \".join(winners)}')",
      "testCases": [
        {
          "input": "5\nAlice\nBob\nAlice\nCharlie\nAlice\n",
          "expectedOutput": "Alice: 3\nBob: 1\nCharlie: 1\nWinner: Alice\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Find Index",
      "prompt": "Given `letters = ['a', 'b', 'c', 'd']`. Use `.index()` to find the index of 'c' and print it.",
      "starterCode": "letters = ['a', 'b', 'c', 'd']\n# Print index of 'c'\n",
      "solutionCode": "letters = ['a', 'b', 'c', 'd']\nprint(letters.index('c'))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "2\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Count Occurrences",
      "prompt": "Given `data = [1, 2, 1, 3, 1]`. Use `.count()` to find how many times `1` appears and print it.",
      "starterCode": "data = [1, 2, 1, 3, 1]\n# Print count of 1\n",
      "solutionCode": "data = [1, 2, 1, 3, 1]\nprint(data.count(1))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "list-comprehension": [
    {
      "title": "Squares with Comprehension",
      "prompt": "Using a list comprehension, create a list of squares of numbers from 1 to 10 and print it.",
      "starterCode": "# Create a list of squares 1-10 using list comprehension\n",
      "solutionCode": "squares = [x ** 2 for x in range(1, 11)]\nprint(squares)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 4, 9, 16, 25, 36, 49, 64, 81, 100]\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Filter Passing Scores",
      "prompt": "Read N scores (N given first). Using a list comprehension, create a list of only the passing scores (>= 60). Print the passing scores list and the count. If none pass, print `All failed`.",
      "starterCode": "# Read N scores, filter passing ones using list comprehension\n",
      "solutionCode": "n = int(input())\nscores = [int(input()) for _ in range(n)]\npassing = [s for s in scores if s >= 60]\nif not passing:\n    print('All failed')\nelse:\n    print(passing)\n    print(f'Count: {len(passing)}')",
      "testCases": [
        {
          "input": "5\n85\n42\n92\n58\n78\n",
          "expectedOutput": "[85, 92, 78]\nCount: 3\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Grade Converter",
      "prompt": "Read N scores (N given first). Using a list comprehension with if-else, convert each score to a letter grade (A>=90, B>=80, C>=70, D>=60, F<60). Print the grade list. Also print the count of each grade on separate lines in order A, B, C, D, F.",
      "starterCode": "# Read N scores and convert to letter grades using comprehension\n",
      "solutionCode": "n = int(input())\nscores = [int(input()) for _ in range(n)]\ngrades = ['A' if s >= 90 else 'B' if s >= 80 else 'C' if s >= 70 else 'D' if s >= 60 else 'F' for s in scores]\nprint(grades)\nfor g in ['A', 'B', 'C', 'D', 'F']:\n    print(f'{g}: {grades.count(g)}')",
      "testCases": [
        {
          "input": "5\n95\n83\n72\n61\n45\n",
          "expectedOutput": "['A', 'B', 'C', 'D', 'F']\nA: 1\nB: 1\nC: 1\nD: 1\nF: 1\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Email Processor",
      "prompt": "Read N email addresses (N given first). Using list comprehensions:\n1. Extract usernames (before @) of all gmail.com addresses\n2. Convert all emails to lowercase\n3. Find emails with username longer than 5 characters\n\nPrint each result list on a separate line. If a list is empty, print `None`.",
      "starterCode": "# Read N emails, process with comprehensions\n",
      "solutionCode": "n = int(input())\nemails = [input().strip() for _ in range(n)]\ngmail_users = [e.split('@')[0] for e in emails if e.lower().endswith('@gmail.com')]\nlowercase = [e.lower() for e in emails]\nlong_users = [e for e in emails if len(e.split('@')[0]) > 5]\nprint(gmail_users if gmail_users else 'None')\nprint(lowercase)\nprint(long_users if long_users else 'None')",
      "testCases": [
        {
          "input": "4\nalice@gmail.com\nBOB@yahoo.com\ncharlie@gmail.com\ndi@test.com\n",
          "expectedOutput": "['alice', 'charlie']\n['alice@gmail.com', 'bob@yahoo.com', 'charlie@gmail.com', 'di@test.com']\n['charlie@gmail.com']\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Basic Comprehension",
      "prompt": "Use a list comprehension to create a list of numbers from 0 to 4 (using `range(5)`). Print the list.",
      "starterCode": "# Create list using comprehension and print\n",
      "solutionCode": "my_list = [i for i in range(5)]\nprint(my_list)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[0, 1, 2, 3, 4]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Square Numbers",
      "prompt": "Given `nums = [1, 2, 3]`. Use a list comprehension to create a new list where each number is squared. Print the new list.",
      "starterCode": "nums = [1, 2, 3]\n# Square elements and print\n",
      "solutionCode": "nums = [1, 2, 3]\nsquares = [x**2 for x in nums]\nprint(squares)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[1, 4, 9]\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    },
    {
      "title": "Filter with Comprehension",
      "prompt": "Given `nums = [1, 2, 3, 4, 5]`. Use a list comprehension with an `if` condition to keep only the even numbers. Print the new list.",
      "starterCode": "nums = [1, 2, 3, 4, 5]\n# Filter evens and print\n",
      "solutionCode": "nums = [1, 2, 3, 4, 5]\nevens = [x for x in nums if x % 2 == 0]\nprint(evens)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[2, 4]\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 50
    }
  ],
  "nested-lists": [
    {
      "title": "Access 2D Element",
      "prompt": "Given the matrix below, print the element at row 1, column 2 (0-indexed).\n```python\nmatrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n```",
      "starterCode": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\n# Print element at row 1, col 2\n",
      "solutionCode": "matrix = [[1, 2, 3], [4, 5, 6], [7, 8, 9]]\nprint(matrix[1][2])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "6\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Row Sums",
      "prompt": "Read an NxN matrix from input (N given first, then N rows of N space-separated integers). Print the sum of each row on a separate line, then print the total sum of all elements.",
      "starterCode": "# Read NxN matrix and print row sums and total\n",
      "solutionCode": "n = int(input())\nmatrix = [[int(x) for x in input().split()] for _ in range(n)]\nfor row in matrix:\n    print(sum(row))\nprint(sum(sum(row) for row in matrix))",
      "testCases": [
        {
          "input": "3\n1 2 3\n4 5 6\n7 8 9\n",
          "expectedOutput": "6\n15\n24\n45\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 45
    },
    {
      "title": "Matrix Operations",
      "prompt": "Read a 3x3 matrix. Print:\n1. The matrix row by row (space-separated values)\n2. The main diagonal elements (top-left to bottom-right)\n3. The maximum value and its position as `max: VALUE at [R][C]`",
      "starterCode": "# Read 3x3 matrix, print it, diagonal, and max with position\n",
      "solutionCode": "matrix = [[int(x) for x in input().split()] for _ in range(3)]\nfor row in matrix:\n    print(' '.join(str(x) for x in row))\nprint([matrix[i][i] for i in range(3)])\nmax_val = max(x for row in matrix for x in row)\nfor r in range(3):\n    for c in range(3):\n        if matrix[r][c] == max_val:\n            print(f'max: {max_val} at [{r}][{c}]')",
      "testCases": [
        {
          "input": "3 7 1\n9 2 8\n4 6 5\n",
          "expectedOutput": "3 7 1\n9 2 8\n4 6 5\n[3, 2, 5]\nmax: 9 at [1][0]\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 70
    },
    {
      "title": "Grade Book Analyzer",
      "prompt": "Read N students (N given first). Each line: `Name score1 score2 score3`. Calculate each student's average and grade (A>=90,B>=80,C>=70,D>=60,F<60). Print a formatted table, then print the class average and top student.\n\nIf any score is outside 0-100, print `Invalid score for NAME`.",
      "starterCode": "# Read N students with 3 scores each and print analysis\n",
      "solutionCode": "n = int(input())\nstudents = []\nvalid = True\nfor _ in range(n):\n    parts = input().split()\n    name = parts[0]\n    scores = [int(x) for x in parts[1:]]\n    if any(s < 0 or s > 100 for s in scores):\n        print(f'Invalid score for {name}')\n        valid = False\n        break\n    students.append((name, scores))\nif valid:\n    avgs = []\n    for name, scores in students:\n        avg = sum(scores) / len(scores)\n        avgs.append(avg)\n        grade = 'A' if avg >= 90 else 'B' if avg >= 80 else 'C' if avg >= 70 else 'D' if avg >= 60 else 'F'\n        print(f'{name:<12} {avg:>6.1f}  {grade}')\n    class_avg = sum(avgs) / len(avgs)\n    print(f'Class average: {class_avg:.1f}')\n    top = students[avgs.index(max(avgs))][0]\n    print(f'Top student: {top}')",
      "testCases": [
        {
          "input": "3\nAlice 88 92 85\nBob 72 68 79\nCharlie 95 91 98\n",
          "expectedOutput": "Alice          88.3  B\nBob            73.0  C\nCharlie        94.7  A\nClass average: 85.3\nTop student: Charlie\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 90
    },
    {
      "title": "Access Nested Elements",
      "prompt": "Given a matrix `grid = [[1, 2], [3, 4]]`. Print the number `4` by accessing the correct row and column indices.",
      "starterCode": "grid = [[1, 2], [3, 4]]\n# Print 4\n",
      "solutionCode": "grid = [[1, 2], [3, 4]]\nprint(grid[1][1])",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "4\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    }
  ],
  "list-unpacking": [
    {
      "title": "Basic Unpack",
      "prompt": "Given `point = [10, 20, 30]`, unpack it into variables `x`, `y`, `z` and print each on a separate line.",
      "starterCode": "point = [10, 20, 30]\n# Unpack into x, y, z and print each\n",
      "solutionCode": "point = [10, 20, 30]\nx, y, z = point\nprint(x)\nprint(y)\nprint(z)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "10\n20\n30\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Star Unpack",
      "prompt": "Read a list of N integers. Using star unpacking, unpack the first item into `first`, the last into `last`, and the rest into `middle`. Print first, middle, and last on separate lines. If N < 2, print `Too few items`.",
      "starterCode": "# Read N integers and unpack first, middle, last\n",
      "solutionCode": "n = int(input())\nif n < 2:\n    print('Too few items')\nelse:\n    numbers = [int(input()) for _ in range(n)]\n    first, *middle, last = numbers\n    print(first)\n    print(middle)\n    print(last)",
      "testCases": [
        {
          "input": "5\n10\n20\n30\n40\n50\n",
          "expectedOutput": "10\n[20, 30, 40]\n50\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "CSV Unpacker",
      "prompt": "Read N CSV records (N given first). Each record: `name,age,city,score`. Unpack each and print:\n`NAME (AGE) from CITY scored SCORE%`\n\nIf a record does not have exactly 4 comma-separated fields, print `Invalid record: LINE`.",
      "starterCode": "# Read N CSV records, unpack and format each\n",
      "solutionCode": "n = int(input())\nfor _ in range(n):\n    line = input()\n    parts = line.split(',')\n    if len(parts) != 4:\n        print(f'Invalid record: {line}')\n    else:\n        name, age, city, score = parts\n        print(f'{name} ({age}) from {city} scored {score}%')",
      "testCases": [
        {
          "input": "3\nAlice,25,New York,88\nBob,30,London,92\nInvalidRecord\n",
          "expectedOutput": "Alice (25) from New York scored 88%\nBob (30) from London scored 92%\nInvalid record: InvalidRecord\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 60
    },
    {
      "title": "Swap Sort",
      "prompt": "Read N integers. Sort them using only variable swapping (bubble sort style - swap adjacent elements). Print the list after each full pass that made at least one swap, and the final sorted list.\n\nPrint `Steps: N` where N is the number of passes made.",
      "starterCode": "# Read N integers, sort by swapping, print each pass and step count\n",
      "solutionCode": "n = int(input())\nnumbers = [int(input()) for _ in range(n)]\nsteps = 0\nfor i in range(n):\n    swapped = False\n    for j in range(n - i - 1):\n        if numbers[j] > numbers[j+1]:\n            numbers[j], numbers[j+1] = numbers[j+1], numbers[j]\n            swapped = True\n    if swapped:\n        steps += 1\n        print(numbers)\nprint(f'Steps: {steps}')",
      "testCases": [
        {
          "input": "4\n3\n1\n4\n2\n",
          "expectedOutput": "[1, 3, 2, 4]\n[1, 2, 3, 4]\nSteps: 2\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 85
    },
    {
      "title": "Basic Unpacking",
      "prompt": "Given `data = [10, 20, 30]`. Unpack this list into three variables `x, y, z` and print `y`.",
      "starterCode": "data = [10, 20, 30]\n# Unpack and print y\n",
      "solutionCode": "data = [10, 20, 30]\nx, y, z = data\nprint(y)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "20\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Unpack with *rest",
      "prompt": "Given `data = [1, 2, 3, 4, 5]`. Unpack the first element into `first`, the last element into `last`, and all elements in between into a list called `middle` using `*`. Print `middle`.",
      "starterCode": "data = [1, 2, 3, 4, 5]\n# Unpack first, *middle, last and print middle\n",
      "solutionCode": "data = [1, 2, 3, 4, 5]\nfirst, *middle, last = data\nprint(middle)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[2, 3, 4]\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 40
    }
  ],
  "list-vs-array": [
    {
      "title": "Mixed-Type List",
      "prompt": "Create a Python list `data = [1, 'hello', 3.14, True]` which holds mixed types. Print its length, then print the type name of the first element using `type(data[0]).__name__`.",
      "starterCode": "# Create a mixed-type list and inspect it\n",
      "solutionCode": "data = [1, 'hello', 3.14, True]\nprint(len(data))\nprint(type(data[0]).__name__)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "4\nint\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Typed Integer Array",
      "prompt": "Use the `array` module to create an integer array `arr = array.array('i', [10, 20, 30])`. Append `40` to it, then convert it to a list and print that list. (Shows how typed arrays still enforce one type.)",
      "starterCode": "import array\n# Create array, append, and print as a list\n",
      "solutionCode": "import array\narr = array.array('i', [10, 20, 30])\narr.append(40)\nprint(list(arr))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "[10, 20, 30, 40]\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "Float Array Average",
      "prompt": "Create a typed array of doubles `arr = array.array('d', [2.5, 7.5, 10.0, 5.0])`. Compute and print the average (sum divided by length) rounded to 2 decimal places.",
      "starterCode": "import array\n# Compute and print the average of the double array\n",
      "solutionCode": "import array\narr = array.array('d', [2.5, 7.5, 10.0, 5.0])\nprint(round(sum(arr) / len(arr), 2))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "6.25\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 35
    },
    {
      "title": "List vs Array: Mixed Data",
      "prompt": "A record needs to store a name (str) and an age (int) together. Demonstrate that a Python list can hold both: create `person = ['Alice', 30]` and print it, then print the message 'Lists allow mixed types'.",
      "starterCode": "# Show that a list can hold mixed types\n",
      "solutionCode": "person = ['Alice', 30]\nprint(person)\nprint('Lists allow mixed types')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "['Alice', 30]\nLists allow mixed types\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Multiple Types in List",
      "prompt": "To prove lists can hold multiple types unlike standard arrays, create a list with `[1, 'two', 3.0]`. Print its length.",
      "starterCode": "# Create list with int, str, float and print len()\n",
      "solutionCode": "lst = [1, 'two', 3.0]\nprint(len(lst))",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "3\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 20
    }
  ],
  "list-iterating": [
    {
      "title": "Print with Index",
      "prompt": "Given `animals = ['cat', 'dog', 'bird', 'fish']`, use `enumerate()` starting from 1 to print each animal with its number.\n\nFormat: `1. cat`",
      "starterCode": "animals = ['cat', 'dog', 'bird', 'fish']\n# Print each animal with its number using enumerate\n",
      "solutionCode": "animals = ['cat', 'dog', 'bird', 'fish']\nfor i, animal in enumerate(animals, 1):\n    print(f'{i}. {animal}')",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "1. cat\n2. dog\n3. bird\n4. fish\n"
        }
      ],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Parallel Lists",
      "prompt": "Read two lists of N integers each (N given first, then list 1 items, then list 2 items). Use `zip()` to print the sum of each pair on a separate line. Then print the total of all pair sums.",
      "starterCode": "# Read two lists of N items, zip and print pair sums and total\n",
      "solutionCode": "n = int(input())\nlist1 = [int(input()) for _ in range(n)]\nlist2 = [int(input()) for _ in range(n)]\ntotal = 0\nfor a, b in zip(list1, list2):\n    pair_sum = a + b\n    print(pair_sum)\n    total += pair_sum\nprint(f'Total: {total}')",
      "testCases": [
        {
          "input": "3\n1\n2\n3\n4\n5\n6\n",
          "expectedOutput": "5\n7\n9\nTotal: 21\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 40
    },
    {
      "title": "Running Statistics",
      "prompt": "Read N numbers. As you iterate, maintain and print a running minimum, maximum, and average after each number is added. Print in format: `min=X max=X avg=X.XX`.\n\nIf N is 0, print `No data`.",
      "starterCode": "# Read N numbers and print running min, max, avg after each\n",
      "solutionCode": "n = int(input())\nif n == 0:\n    print('No data')\nelse:\n    numbers = []\n    for _ in range(n):\n        num = float(input())\n        numbers.append(num)\n        print(f'min={min(numbers):.0f} max={max(numbers):.0f} avg={sum(numbers)/len(numbers):.2f}')",
      "testCases": [
        {
          "input": "4\n10\n3\n8\n5\n",
          "expectedOutput": "min=10 max=10 avg=10.00\nmin=3 max=10 avg=6.50\nmin=3 max=10 avg=7.00\nmin=3 max=10 avg=6.50\n"
        }
      ],
      "difficulty": "advanced",
      "xpReward": 65
    },
    {
      "title": "Inventory Report",
      "prompt": "Read N products (N given first). Each line: `name price quantity`. Iterate through and:\n1. Print each item: `NAME: QTY units @ $PRICE each = $TOTAL`\n2. Mark items with quantity 0 as `[OUT OF STOCK]` after the name\n3. At the end print total inventory value and number of out-of-stock items\n\nIf any price or qty is negative, print `Invalid data` and stop.",
      "starterCode": "# Read N products and generate inventory report\n",
      "solutionCode": "n = int(input())\nproducts = []\nfor _ in range(n):\n    parts = input().split()\n    name = parts[0]\n    price = float(parts[1])\n    qty = int(parts[2])\n    if price < 0 or qty < 0:\n        print('Invalid data')\n        break\n    products.append((name, price, qty))\nelse:\n    total_value = 0\n    out_of_stock = 0\n    for name, price, qty in products:\n        item_total = price * qty\n        total_value += item_total\n        label = f'{name} [OUT OF STOCK]' if qty == 0 else name\n        print(f'{label}: {qty} units @ ${price:.2f} each = ${item_total:.2f}')\n        if qty == 0:\n            out_of_stock += 1\n    print(f'Total inventory value: ${total_value:.2f}')\n    print(f'Out of stock: {out_of_stock}')",
      "testCases": [
        {
          "input": "3\nLaptop 999.99 5\nMouse 29.99 0\nKeyboard 79.99 8\n",
          "expectedOutput": "Laptop: 5 units @ $999.99 each = $4999.95\nMouse [OUT OF STOCK]: 0 units @ $29.99 each = $0.00\nKeyboard: 8 units @ $79.99 each = $639.92\nTotal inventory value: $5639.87\nOut of stock: 1\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 95
    },
    {
      "title": "Enumerate",
      "prompt": "Given `items = ['a', 'b']`. Use `for i, val in enumerate(items):` to print `i` and `val` on the same line, separated by a space.",
      "starterCode": "items = ['a', 'b']\n# Loop with enumerate and print\n",
      "solutionCode": "items = ['a', 'b']\nfor i, val in enumerate(items):\n    print(i, val)",
      "testCases": [
        {
          "input": "",
          "expectedOutput": "0 a\n1 b\n"
        }
      ],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Inventory Manager",
      "prompt": "You are given `inventory = ['sword', 'shield']`. Read two commands from input on separate lines. First command adds an item (e.g., 'potion'). Second command is either 'sort' to sort alphabetically or 'pop' to remove the last item. Print the final inventory list.",
      "starterCode": "inventory = ['sword', 'shield']\n# Read 2 inputs, apply logic, print inventory\n",
      "solutionCode": "inventory = ['sword', 'shield']\nitem_to_add = input().strip()\ncmd = input().strip()\ninventory.append(item_to_add)\nif cmd == 'sort':\n    inventory.sort()\nelif cmd == 'pop':\n    inventory.pop()\nprint(inventory)",
      "testCases": [
        {
          "input": "potion\nsort\n",
          "expectedOutput": "['potion', 'shield', 'sword']\n"
        }
      ],
      "difficulty": "expert",
      "xpReward": 80
    }
  ]
};
