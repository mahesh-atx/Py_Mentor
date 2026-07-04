import sys

file_path = 'prisma/notes/module-02/print-formatting.ts'

with open(file_path, 'r', encoding='utf-8') as f:
    content = f.read()

# Replace two backslashes followed by ${ with one backslash followed by ${
content = content.replace('\\\\${', '\\${')

with open(file_path, 'w', encoding='utf-8') as f:
    f.write(content)

print("Done")
