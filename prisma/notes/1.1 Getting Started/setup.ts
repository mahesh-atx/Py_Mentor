export const setupLesson = {
  title: "Setup & Installation",
  slug: "setup",
  content: `# Setup & Installation

Before we can write Python code, we need to install Python on your computer and set up a good environment to write our code in.

## 1. Installing Python

Python is completely free. To install it:
1. Go to the official website: [python.org/downloads](https://www.python.org/downloads/)
2. Download the latest version for your operating system (Windows, macOS, or Linux).
3. **CRITICAL STEP FOR WINDOWS**: When you run the installer, make sure to check the box that says **"Add Python to PATH"** at the very bottom before clicking Install. If you miss this, you won't be able to run Python from your terminal!

## 2. Setting up a Code Editor

You can write Python in a simple text editor like Notepad, but a good code editor will highlight your code with colors, catch errors, and make your life much easier. 

The industry standard is **Visual Studio Code (VS Code)**.
1. Download VS Code from [code.visualstudio.com](https://code.visualstudio.com/)
2. Open VS Code, go to the Extensions tab on the left.
3. Search for "Python" (the official extension by Microsoft) and click Install.

## 3. Running Your First Script

1. Create a new folder on your computer for your Python projects.
2. Open that folder in VS Code.
3. Create a new file called \`app.py\` (the \`.py\` extension tells the computer it's a Python file).
4. Write some simple code, like \`print("Hello, World!")\`.
5. Open the terminal inside VS Code (\`Ctrl + \`\`) and type:
   
   \`\`\`bash
   python app.py
   \`\`\`

You should see your output directly in the terminal!`,
  objectives: [
    "Install Python on your computer.",
    "Set up a code editor (VS Code or PyCharm)."
  ],
  difficulty: "beginner",
  xpReward: 50,
};
