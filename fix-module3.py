import os
import glob
import re

def fix_ts_file(filepath):
    with open(filepath, 'r', encoding='utf-8') as f:
        content = f.read()
    
    # We want to replace unescaped ${ with \${
    # A simple way to do this is to replace all ${ with \${, 
    # but we must be careful not to replace already escaped ones (\\${).
    # Since this is a simple script, we'll just replace all occurrences of ${
    # that are not preceded by a backslash.
    # Regex: (?<!\\)\$\{
    
    # First, let's just do a naive replace of all ${ to \${
    # But wait, we might have actual template literals in the file outside the markdown block!
    # Let's look at the files. They are just exporting an object with a backtick string.
    # So replacing all `${` with `\${` is safe.
    
    # Let's handle already escaped ones first by unescaping them to avoid double escaping
    content = content.replace('\\${', '${')
    # Then escape them all properly
    content = content.replace('${', '\\${')
    
    with open(filepath, 'w', encoding='utf-8') as f:
        f.write(content)

folder_path = 'prisma/notes/module-03/**/*.ts'
files = glob.glob(folder_path, recursive=True)

for file in files:
    fix_ts_file(file)

print("Fixed all module 3 files.")
