import os
import re

def find_multiple_test_cases():
    root_dir = r"c:\Users\Mahesh\Desktop\py\pymentor\prisma"
    
    for subdir, dirs, files in os.walk(root_dir):
        for file in files:
            if file.endswith('.ts') or file.endswith('.js'):
                path = os.path.join(subdir, file)
                with open(path, 'r', encoding='utf-8') as f:
                    content = f.read()
                
                # regex to find testCases array
                # this is a bit brittle, but we can look for testCases: [ ... ]
                # We can just count the number of { input: ... } inside each testCases array
                
                # Let's find occurrences of testCases: [ ... ]
                matches = re.finditer(r'testCases:\s*\[(.*?)\]', content, re.DOTALL)
                for i, match in enumerate(matches):
                    inner = match.group(1)
                    # count how many '{' are inside inner (assuming one { per test case, or more if nested)
                    # Better: count occurrences of "input:" or "expectedOutput:"
                    cases = inner.count('expectedOutput')
                    if cases > 1:
                        print(f"File: {path}, match index: {i}, cases: {cases}")

if __name__ == '__main__':
    find_multiple_test_cases()
