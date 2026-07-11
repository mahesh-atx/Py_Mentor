export const exercises: Record<string, any[]> = {
  "reading-files": [
    {
      title: "Count Lines, Words, and Characters",
      prompt: "Write a function `analyze_text(text: str)` that accepts text content (as a string, simulating file content). Return a dict with `lines` (int), `words` (int), `chars` (int), and `non_empty_lines` (int).\n\nRead N lines of text from input (N given first) as the file content, call the function, and print each stat sorted alphabetically.",
      starterCode: "# Define analyze_text and process input\n",
      solutionCode: "def analyze_text(text: str) -> dict:\n    all_lines = text.splitlines()\n    words = text.split()\n    return {\n        'chars': len(text),\n        'lines': len(all_lines),\n        'non_empty_lines': sum(1 for l in all_lines if l.strip()),\n        'words': len(words)\n    }\n\nn = int(input())\nlines = [input() for _ in range(n)]\ncontent = '\\n'.join(lines)\nstats = analyze_text(content)\nfor key in sorted(stats):\n    print(f'{key}: {stats[key]}')",
      testCases: [
        {
          input: "4\nHello World\n\nPython is great\nFile handling\n",
          expectedOutput: "chars: 40\nlines: 4\nnon_empty_lines: 3\nwords: 6\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "Log File Analyzer",
      prompt: "Simulate reading a log file. Read N log lines from input (N given first). Each line starts with `[LEVEL]` where LEVEL is `INFO`, `WARNING`, or `ERROR`. Count each level and print the counts sorted alphabetically, then print the last ERROR line (or `No errors found` if none).",
      starterCode: "# Read N log lines and analyze them\n",
      solutionCode: "n = int(input())\nlines = [input() for _ in range(n)]\ncounts = {'ERROR': 0, 'INFO': 0, 'WARNING': 0}\nlast_error = None\nfor line in lines:\n    for level in counts:\n        if f'[{level}]' in line:\n            counts[level] += 1\n            if level == 'ERROR':\n                last_error = line\n            break\nfor level in sorted(counts):\n    print(f'{level}: {counts[level]}')\nprint(last_error if last_error else 'No errors found')",
      testCases: [
        {
          input: "5\n[INFO] App started\n[WARNING] High memory\n[ERROR] DB failed\n[INFO] Retry\n[ERROR] Timeout\n",
          expectedOutput: "ERROR: 2\nINFO: 2\nWARNING: 1\n[ERROR] Timeout\n"
        },
        {
          input: "2\n[INFO] OK\n[WARNING] Low disk\n",
          expectedOutput: "ERROR: 0\nINFO: 1\nWARNING: 1\nNo errors found\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 60
    }
  ],

  "writing-appending-files": [
    {
      title: "Write and Verify",
      prompt: "Simulate writing to a file. Read N lines of content (N given first). Write them to a string buffer (list), then 'read back' by joining with newlines. Print the total number of lines written and the total character count of the content (not counting the final newline).",
      starterCode: "# Simulate file write and read back\n",
      solutionCode: "n = int(input())\nlines = [input() for _ in range(n)]\ncontent = '\\n'.join(lines)\nprint(f'Lines written: {n}')\nprint(f'Characters: {len(content)}')",
      testCases: [
        {
          input: "3\nHello World\nPython rocks\nFile handling is easy\n",
          expectedOutput: "Lines written: 3\nCharacters: 46\n"
        }
      ],
      difficulty: "beginner",
      xpReward: 20
    },
    {
      title: "Append Log Simulator",
      prompt: "Simulate a logging system. Read commands until `quit`:\n- `write MSG` → add `[INFO] MSG` to log\n- `error MSG` → add `[ERROR] MSG` to log\n- `show` → print all log entries\n- `count` → print total entries\n- `clear` → clear the log\n- `quit` → stop\n\nStore entries in a list (simulating a file).",
      starterCode: "# Simulate append-mode file logging\n",
      solutionCode: "log = []\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split(' ', 1)\n    cmd = parts[0]\n    if cmd == 'write':\n        log.append(f'[INFO] {parts[1]}')\n    elif cmd == 'error':\n        log.append(f'[ERROR] {parts[1]}')\n    elif cmd == 'show':\n        for entry in log:\n            print(entry)\n    elif cmd == 'count':\n        print(f'Entries: {len(log)}')\n    elif cmd == 'clear':\n        log.clear()\n        print('Log cleared')",
      testCases: [
        {
          input: "write App started\nerror DB failed\nwrite Retrying\ncount\nshow\nquit\n",
          expectedOutput: "Entries: 3\n[INFO] App started\n[ERROR] DB failed\n[INFO] Retrying\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "File Content Merger",
      prompt: "Simulate merging multiple text sources. Read K sources (K given first). Each source: first line is a filename, then N lines of content (N given), then a blank line. Merge ALL content into one output, with a separator `--- FILENAME ---` before each source's content. Print the merged result and the total line count.",
      starterCode: "# Merge multiple sources with separators\n",
      solutionCode: "k = int(input())\nmerged = []\ntotal_lines = 0\nfor _ in range(k):\n    filename = input().strip()\n    n = int(input())\n    lines = [input() for _ in range(n)]\n    input()  # blank line\n    merged.append(f'--- {filename} ---')\n    merged.extend(lines)\n    total_lines += n\nfor line in merged:\n    print(line)\nprint(f'Total content lines: {total_lines}')",
      testCases: [
        {
          input: "2\nfile1.txt\n2\nHello\nWorld\n\nfile2.txt\n2\nPython\nRocks\n\n",
          expectedOutput: "--- file1.txt ---\nHello\nWorld\n--- file2.txt ---\nPython\nRocks\nTotal content lines: 4\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    }
  ],

  "context-manager-with": [
    {
      title: "Context Manager Pattern",
      prompt: "Implement a `FileBuffer` class that acts as a context manager (implements `__enter__` and `__exit__`). It stores lines written to it. `__enter__` prints `Opening buffer` and returns self. `__exit__` prints `Closing buffer` and the line count. Methods: `write(line)` and `read_all() -> list[str]`.\n\nRead N lines, write each to buffer inside a `with` block, then print all lines.",
      starterCode: "# Implement FileBuffer as a context manager\n",
      solutionCode: "class FileBuffer:\n    def __init__(self):\n        self._lines = []\n    \n    def __enter__(self):\n        print('Opening buffer')\n        return self\n    \n    def __exit__(self, exc_type, exc_val, exc_tb):\n        print(f'Closing buffer ({len(self._lines)} lines)')\n        return False\n    \n    def write(self, line: str) -> None:\n        self._lines.append(line)\n    \n    def read_all(self) -> list:\n        return self._lines.copy()\n\nn = int(input())\nlines = [input() for _ in range(n)]\n\nwith FileBuffer() as buf:\n    for line in lines:\n        buf.write(line)\n    for line in buf.read_all():\n        print(line)",
      testCases: [
        {
          input: "3\nHello\nWorld\nPython\n",
          expectedOutput: "Opening buffer\nHello\nWorld\nPython\nClosing buffer (3 lines)\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    }
  ],

  "working-with-csv": [
    {
      title: "Parse CSV Data",
      prompt: "Simulate reading a CSV file. Read N lines of CSV data (N given first, first line is header). Parse using Python's csv module from a string. Print each row as a dict, then print summary: total rows, and average of any numeric columns.\n\nFor this exercise, use `csv.DictReader` with `io.StringIO`.",
      starterCode: "import csv\nimport io\n# Parse N CSV lines and summarize\n",
      solutionCode: "import csv\nimport io\n\nn = int(input())\nlines = [input() for _ in range(n)]\ncontent = '\\n'.join(lines)\n\nreader = csv.DictReader(io.StringIO(content))\nrows = list(reader)\n\nfor row in rows:\n    print(dict(row))\n\nprint(f'Total rows: {len(rows)}')\n\nif rows:\n    numeric_cols = {k for k in rows[0] if rows[0][k].replace('.','',1).lstrip('-').isdigit()}\n    for col in sorted(numeric_cols):\n        values = [float(r[col]) for r in rows]\n        avg = sum(values) / len(values)\n        print(f'Average {col}: {avg:.1f}')",
      testCases: [
        {
          input: "4\nname,age,score\nAlice,25,88\nBob,30,72\nCharlie,22,95\n",
          expectedOutput: "{'name': 'Alice', 'age': '25', 'score': '88'}\n{'name': 'Bob', 'age': '30', 'score': '72'}\n{'name': 'Charlie', 'age': '22', 'score': '95'}\nTotal rows: 3\nAverage age: 25.7\nAverage score: 85.0\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "CSV to Report",
      prompt: "Read CSV data (first line: N, then N+1 lines: header + N data lines). Each row has `name,subject,score`. Using csv.DictReader with io.StringIO:\n1. Find the highest score per subject\n2. Find each student's average score\n3. Print a report: subject winners, then student averages sorted by average descending\n\nIf any score is outside 0-100, print `Invalid score`.",
      starterCode: "import csv\nimport io\n# Read CSV and generate a report\n",
      solutionCode: "import csv\nimport io\n\nn = int(input())\nlines = [input() for _ in range(n + 1)]\ncontent = '\\n'.join(lines)\n\ntry:\n    reader = csv.DictReader(io.StringIO(content))\n    rows = list(reader)\n    \n    for row in rows:\n        if not (0 <= int(row['score']) <= 100):\n            print('Invalid score')\n            raise ValueError\n    \n    subjects = {}\n    students = {}\n    \n    for row in rows:\n        name = row['name']\n        subj = row['subject']\n        score = int(row['score'])\n        \n        if subj not in subjects or score > subjects[subj]['score']:\n            subjects[subj] = {'winner': name, 'score': score}\n        \n        students.setdefault(name, []).append(score)\n    \n    print('Subject Winners:')\n    for subj in sorted(subjects):\n        info = subjects[subj]\n        print(f'  {subj}: {info[\"winner\"]} ({info[\"score\"]})')\n    \n    print('Student Averages:')\n    avgs = [(n, sum(s)/len(s)) for n, s in students.items()]\n    for name, avg in sorted(avgs, key=lambda x: x[1], reverse=True):\n        print(f'  {name}: {avg:.1f}')\nexcept ValueError:\n    pass",
      testCases: [
        {
          input: "6\nname,subject,score\nAlice,Math,92\nBob,Math,78\nAlice,Science,88\nCharlie,Math,95\nBob,Science,65\n",
          expectedOutput: "Subject Winners:\n  Math: Charlie (95)\n  Science: Alice (88)\nStudent Averages:\n  Alice: 90.0\n  Bob: 71.5\n  Charlie: 95.0\n"
        }
      ],
      difficulty: "expert",
      xpReward: 85
    }
  ],

  "working-with-json": [
    {
      title: "JSON Round-Trip",
      prompt: "Read a Python-dict-like structure from input as key-value pairs. Build a dict, convert to JSON with indent=2 using `json.dumps`, print it, then parse it back with `json.loads` and print the type and length.\n\nRead N key-value pairs (N given first). Values that are digits should be stored as int, `true`/`false` as bool, `null` as None, otherwise as str.",
      starterCode: "import json\n# Read key-value pairs, build dict, JSON round-trip\n",
      solutionCode: "import json\n\nn = int(input())\ndata = {}\nfor _ in range(n):\n    parts = input().split(' ', 1)\n    key = parts[0]\n    val = parts[1]\n    if val.lstrip('-').isdigit():\n        data[key] = int(val)\n    elif val.replace('.','',1).lstrip('-').isdigit():\n        data[key] = float(val)\n    elif val == 'true':\n        data[key] = True\n    elif val == 'false':\n        data[key] = False\n    elif val == 'null':\n        data[key] = None\n    else:\n        data[key] = val\n\njson_str = json.dumps(data, indent=2)\nprint(json_str)\n\nparsed = json.loads(json_str)\nprint(f'Type: {type(parsed).__name__}')\nprint(f'Keys: {len(parsed)}')",
      testCases: [
        {
          input: "4\nname Alice\nage 25\nactive true\nscore null\n",
          expectedOutput: "{\n  \"name\": \"Alice\",\n  \"age\": 25,\n  \"active\": true,\n  \"score\": null\n}\nType: dict\nKeys: 4\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 45
    },
    {
      title: "JSON Config Manager",
      prompt: "Simulate a JSON config system using a string (no actual files). Read commands until `quit`:\n- `set KEY VALUE` → set a config key (auto-type: int/float/bool/str)\n- `get KEY` → print the value or `Key not found`\n- `delete KEY` → remove key or `Key not found`\n- `show` → print formatted JSON with indent=2\n- `keys` → print sorted list of keys\n- `reset` → clear all config\n- `quit` → stop",
      starterCode: "import json\n# Implement JSON config manager\n",
      solutionCode: "import json\n\nconfig = {}\n\ndef parse_value(v):\n    if v.lstrip('-').isdigit(): return int(v)\n    try: return float(v)\n    except ValueError: pass\n    if v == 'true': return True\n    if v == 'false': return False\n    if v == 'null': return None\n    return v\n\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split(' ', 2)\n    cmd = parts[0]\n    if cmd == 'set':\n        config[parts[1]] = parse_value(parts[2])\n    elif cmd == 'get':\n        key = parts[1]\n        print(config[key] if key in config else 'Key not found')\n    elif cmd == 'delete':\n        key = parts[1]\n        if key in config:\n            del config[key]\n        else:\n            print('Key not found')\n    elif cmd == 'show':\n        print(json.dumps(config, indent=2))\n    elif cmd == 'keys':\n        print(sorted(config.keys()))\n    elif cmd == 'reset':\n        config.clear()\n        print('Config reset')",
      testCases: [
        {
          input: "set name Alice\nset age 25\nset debug true\nget name\nget missing\nkeys\ndelete age\nshow\nquit\n",
          expectedOutput: "Alice\nKey not found\n['age', 'debug', 'name']\n{\n  \"name\": \"Alice\",\n  \"debug\": true\n}\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 70
    },
    {
      title: "JSON Data Processor",
      prompt: "Read a JSON array string from input (entire JSON on one line). Parse it. Each item is an object with `name` (str), `scores` (list of ints), and `active` (bool). Compute for each active user: average score, grade (A>=90,B>=80,C>=70,F<70). Print sorted by average descending. Print overall active count and grand average. If JSON is invalid, print `Invalid JSON`.",
      starterCode: "import json\n# Parse JSON array and compute stats for active users\n",
      solutionCode: "import json\n\ntry:\n    data = json.loads(input())\n    active = [u for u in data if u.get('active', False)]\n    \n    if not active:\n        print('No active users')\n    else:\n        results = []\n        for user in active:\n            avg = sum(user['scores']) / len(user['scores'])\n            grade = 'A' if avg >= 90 else 'B' if avg >= 80 else 'C' if avg >= 70 else 'F'\n            results.append((user['name'], avg, grade))\n        \n        results.sort(key=lambda x: x[1], reverse=True)\n        for name, avg, grade in results:\n            print(f'{name}: {avg:.1f} ({grade})')\n        \n        grand_avg = sum(r[1] for r in results) / len(results)\n        print(f'Active users: {len(active)}')\n        print(f'Grand average: {grand_avg:.1f}')\nexcept json.JSONDecodeError:\n    print('Invalid JSON')",
      testCases: [
        {
          input: "[{\"name\":\"Alice\",\"scores\":[88,92,85],\"active\":true},{\"name\":\"Bob\",\"scores\":[70,65,72],\"active\":false},{\"name\":\"Charlie\",\"scores\":[95,98,92],\"active\":true}]\n",
          expectedOutput: "Charlie: 95.0 (A)\nAlice: 88.3 (B)\nActive users: 2\nGrand average: 91.7\n"
        },
        { input: "invalid json\n", expectedOutput: "Invalid JSON\n" }
      ],
      difficulty: "expert",
      xpReward: 90
    }
  ],

  "file-directory-operations": [
    {
      title: "Path Operations",
      prompt: "Using `os.path` or `pathlib.Path`, write a function `analyze_path(path_str: str) -> dict` that returns: `basename` (filename), `dirname` (directory part), `stem` (name without extension), `extension` (the extension), `is_absolute` (bool).\n\nRead N path strings and print each analysis sorted by key.",
      starterCode: "from pathlib import Path\n# Analyze path strings using pathlib\n",
      solutionCode: "from pathlib import Path\n\ndef analyze_path(path_str: str) -> dict:\n    p = Path(path_str)\n    return {\n        'basename': p.name,\n        'dirname': str(p.parent),\n        'extension': p.suffix,\n        'is_absolute': p.is_absolute(),\n        'stem': p.stem,\n    }\n\nn = int(input())\nfor _ in range(n):\n    path = input().strip()\n    result = analyze_path(path)\n    print(f'Path: {path}')\n    for key in sorted(result):\n        print(f'  {key}: {result[key]}')",
      testCases: [
        {
          input: "2\n/home/alice/document.pdf\nreport.txt\n",
          expectedOutput: "Path: /home/alice/document.pdf\n  basename: document.pdf\n  dirname: /home/alice\n  extension: .pdf\n  is_absolute: True\n  stem: document\nPath: report.txt\n  basename: report.txt\n  dirname: .\n  extension: .txt\n  is_absolute: False\n  stem: report\n"
        }
      ],
      difficulty: "intermediate",
      xpReward: 40
    },
    {
      title: "File Organizer Simulator",
      prompt: "Simulate a file organizer using dictionaries (no actual file I/O). Read N filenames (N given first). Categorize each by extension:\n- Images: jpg, jpeg, png, gif\n- Documents: pdf, doc, docx, txt\n- Code: py, js, html, css\n- Other: everything else\n\nPrint each category (sorted) and its files (sorted). Then print total files and the most populated category.",
      starterCode: "# Simulate file organizer with categorization\n",
      solutionCode: "n = int(input())\nfiles = [input().strip() for _ in range(n)]\n\ncategories = {\n    'Images': {'jpg', 'jpeg', 'png', 'gif'},\n    'Documents': {'pdf', 'doc', 'docx', 'txt'},\n    'Code': {'py', 'js', 'html', 'css'},\n}\n\norganized = {cat: [] for cat in categories}\norganized['Other'] = []\n\nfor filename in files:\n    ext = filename.rsplit('.', 1)[-1].lower() if '.' in filename else ''\n    categorized = False\n    for cat, exts in categories.items():\n        if ext in exts:\n            organized[cat].append(filename)\n            categorized = True\n            break\n    if not categorized:\n        organized['Other'].append(filename)\n\nfor cat in sorted(organized):\n    file_list = sorted(organized[cat])\n    if file_list:\n        print(f'{cat} ({len(file_list)}):')\n        for f in file_list:\n            print(f'  {f}')\n\nprint(f'Total: {n}')\nbusiest = max(organized, key=lambda c: len(organized[c]))\nprint(f'Most files: {busiest} ({len(organized[busiest])})')",
      testCases: [
        {
          input: "7\nphoto.jpg\nreport.pdf\nscript.py\nimage.png\nnotes.txt\napp.js\nvideo.mp4\n",
          expectedOutput: "Code (2):\n  app.js\n  script.py\nDocuments (2):\n  notes.txt\n  report.pdf\nImages (2):\n  image.png\n  photo.jpg\nOther (1):\n  video.mp4\nTotal: 7\nMost files: Code (2)\n"
        }
      ],
      difficulty: "advanced",
      xpReward: 65
    },
    {
      title: "Directory Tree Builder",
      prompt: "Simulate a directory tree. Read commands until `quit`:\n- `mkdir PATH` → create a directory (e.g. `mkdir docs/reports`)\n- `touch PATH` → create a file\n- `ls PATH` → list contents of a directory (files and dirs sorted, dirs with /)\n- `exists PATH` → print `yes` or `no`\n- `tree` → print the full tree indented\n- `quit` → stop\n\nStore structure in nested dicts. Use `None` for files, `{}` for directories.",
      starterCode: "# Simulate a directory tree with nested dicts\n",
      solutionCode: "def get_node(tree, path):\n    parts = [p for p in path.split('/') if p]\n    node = tree\n    for part in parts:\n        if part not in node or node[part] is None:\n            return None\n        node = node[part]\n    return node\n\ndef set_node(tree, path, value):\n    parts = [p for p in path.split('/') if p]\n    node = tree\n    for part in parts[:-1]:\n        if part not in node:\n            node[part] = {}\n        node = node[part]\n    node[parts[-1]] = value\n\ndef print_tree(node, prefix='', name='root'):\n    print(prefix + name + '/')\n    if isinstance(node, dict):\n        items = sorted(node.items())\n        for k, v in items:\n            if v is None:\n                print(prefix + '  ' + k)\n            else:\n                print_tree(v, prefix + '  ', k)\n\ntree = {}\nwhile True:\n    line = input().strip()\n    if line == 'quit': break\n    parts = line.split(' ', 1)\n    cmd = parts[0]\n    if cmd == 'mkdir':\n        set_node(tree, parts[1], {})\n    elif cmd == 'touch':\n        set_node(tree, parts[1], None)\n    elif cmd == 'ls':\n        path = parts[1] if len(parts) > 1 else ''\n        node = get_node(tree, path) if path else tree\n        if node is None or not isinstance(node, dict):\n            print('Not a directory')\n        else:\n            for name in sorted(node):\n                suffix = '/' if isinstance(node[name], dict) else ''\n                print(f'{name}{suffix}')\n    elif cmd == 'exists':\n        path = parts[1]\n        parts2 = [p for p in path.split('/') if p]\n        node = tree\n        found = True\n        for p in parts2:\n            if isinstance(node, dict) and p in node:\n                node = node[p]\n            else:\n                found = False\n                break\n        print('yes' if found else 'no')\n    elif cmd == 'tree':\n        print_tree(tree)",
      testCases: [
        {
          input: "mkdir docs\nmkdir docs/reports\ntouch docs/readme.txt\ntouch docs/reports/q1.pdf\nls docs\nexists docs/reports\nexists docs/missing\ntree\nquit\n",
          expectedOutput: "readme.txt\nreports/\nyes\nno\nroot/\n  docs/\n    readme.txt\n    reports/\n      q1.pdf\n"
        }
      ],
      difficulty: "expert",
      xpReward: 95
    }
  ]
};