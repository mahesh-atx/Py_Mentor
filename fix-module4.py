import os
import glob
import re

def fix_ts_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # First, let's handle already escaped ones first by unescaping them to avoid double escaping
    content = content.replace('\\${', '${')
    # Then escape them all properly
    content = content.replace('${', '\\${')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

folder_path = 'prisma/notes/module-04/**/*.ts'
files = glob.glob(folder_path, recursive=True)

for file in files:
    fix_ts_file(file)

print("Fixed all module 4 files.")
