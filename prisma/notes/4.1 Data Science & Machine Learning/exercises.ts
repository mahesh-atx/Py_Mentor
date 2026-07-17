export const exercises: Record<string, any[]> = {
  "numpy": [
    {
      "title": "Create a NumPy Array",
      "prompt": "Import NumPy and create an array from the list [10, 20, 30, 40, 50]. Print the array and its shape.",
      "starterCode": "# Import NumPy and create an array\n",
      "solutionCode": "import numpy as np\narr = np.array([10, 20, 30, 40, 50])\nprint(arr)\nprint(arr.shape)",
      "testCases": [{ "input": "", "expectedOutput": "[10 20 30 40 50]\n(5,)\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Array Indexing",
      "prompt": "Given arr = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90]), print the element at index 2 and the last element.",
      "starterCode": "import numpy as np\narr = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90])\n# Print element at index 2 and last element\n",
      "solutionCode": "import numpy as np\narr = np.array([10, 20, 30, 40, 50, 60, 70, 80, 90])\nprint(arr[2])\nprint(arr[-1])",
      "testCases": [{ "input": "", "expectedOutput": "30\n90\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Array Operations",
      "prompt": "Given arr = np.array([1, 2, 3, 4, 5]), print the sum, mean, and standard deviation of the array.",
      "starterCode": "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\n# Calculate sum, mean, and std\n",
      "solutionCode": "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\nprint(np.sum(arr))\nprint(np.mean(arr))\nprint(np.std(arr))",
      "testCases": [{ "input": "", "expectedOutput": "15\n3.0\n1.4142135623730951\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Broadcasting",
      "prompt": "Given arr = np.array([1, 2, 3, 4, 5]), multiply every element by 10 using broadcasting. Print the result.",
      "starterCode": "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\n# Multiply by 10 using broadcasting\n",
      "solutionCode": "import numpy as np\narr = np.array([1, 2, 3, 4, 5])\nresult = arr * 10\nprint(result)",
      "testCases": [{ "input": "", "expectedOutput": "[10 20 30 40 50]\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Boolean Indexing",
      "prompt": "Given arr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10]), use boolean indexing to select only even numbers. Print the result.",
      "starterCode": "import numpy as np\narr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\n# Select even numbers using boolean indexing\n",
      "solutionCode": "import numpy as np\narr = np.array([1, 2, 3, 4, 5, 6, 7, 8, 9, 10])\nevens = arr[arr % 2 == 0]\nprint(evens)",
      "testCases": [{ "input": "", "expectedOutput": "[ 2  4  6  8 10]\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "Module Integration: Statistics Calculator",
      "prompt": "Read N numbers from input (N given first). Create a NumPy array and print: sum, mean, min, max, and standard deviation. (Input: 5, 10, 20, 30, 40, 50 → Output: Sum: 150, Mean: 30.0, Min: 10, Max: 50, Std: 14.14)",
      "starterCode": "import numpy as np\n# Read N numbers and calculate statistics\n",
      "solutionCode": "import numpy as np\nn = int(input())\nnumbers = [int(input()) for _ in range(n)]\narr = np.array(numbers)\nprint(f'Sum: {np.sum(arr)}')\nprint(f'Mean: {np.mean(arr)}')\nprint(f'Min: {np.min(arr)}')\nprint(f'Max: {np.max(arr)}')\nprint(f'Std: {np.std(arr):.2f}')",
      "testCases": [
        { "input": "5\n10\n20\n30\n40\n50\n", "expectedOutput": "Sum: 150\nMean: 30.0\nMin: 10\nMax: 50\nStd: 14.14\n" }
      ],
      "difficulty": "expert",
      "xpReward": 60
    }
  ],
  "pandas": [
    {
      "title": "Create a DataFrame",
      "prompt": "Import Pandas and create a DataFrame from a dictionary with columns 'name' and 'age'. Print the DataFrame.\nData: {'name': ['Alice', 'Bob', 'Charlie'], 'age': [25, 30, 35]}",
      "starterCode": "import pandas as pd\n# Create a DataFrame\n",
      "solutionCode": "import pandas as pd\ndf = pd.DataFrame({'name': ['Alice', 'Bob', 'Charlie'], 'age': [25, 30, 35]})\nprint(df)",
      "testCases": [{ "input": "", "expectedOutput": "      name  age\n0    Alice   25\n1      Bob   30\n2  Charlie   35\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Select Columns",
      "prompt": "Given df with columns 'name', 'age', 'city', select and print only the 'name' and 'age' columns.",
      "starterCode": "import pandas as pd\ndf = pd.DataFrame({'name': ['Alice', 'Bob'], 'age': [25, 30], 'city': ['NYC', 'LA']})\n# Select name and age columns\n",
      "solutionCode": "import pandas as pd\ndf = pd.DataFrame({'name': ['Alice', 'Bob'], 'age': [25, 30], 'city': ['NYC', 'LA']})\nprint(df[['name', 'age']])",
      "testCases": [{ "input": "", "expectedOutput": "    name  age\n0  Alice   25\n1    Bob   30\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Filter Rows",
      "prompt": "Given df with 'name' and 'age' columns, filter and print only rows where age is greater than 28.\ndf = pd.DataFrame({'name': ['Alice', 'Bob', 'Charlie'], 'age': [25, 30, 35]})",
      "starterCode": "import pandas as pd\ndf = pd.DataFrame({'name': ['Alice', 'Bob', 'Charlie'], 'age': [25, 30, 35]})\n# Filter rows where age > 28\n",
      "solutionCode": "import pandas as pd\ndf = pd.DataFrame({'name': ['Alice', 'Bob', 'Charlie'], 'age': [25, 30, 35]})\nfiltered = df[df['age'] > 28]\nprint(filtered)",
      "testCases": [{ "input": "", "expectedOutput": "      name  age\n1      Bob   30\n2  Charlie   35\n" }],
      "difficulty": "intermediate",
      "xpReward": 25
    },
    {
      "title": "GroupBy Aggregation",
      "prompt": "Given df with 'dept' and 'salary' columns, calculate the average salary per department and print the result.\ndf = pd.DataFrame({'dept': ['HR', 'IT', 'IT', 'HR'], 'salary': [50000, 60000, 70000, 55000]})",
      "starterCode": "import pandas as pd\ndf = pd.DataFrame({'dept': ['HR', 'IT', 'IT', 'HR'], 'salary': [50000, 60000, 70000, 55000]})\n# Calculate average salary per department\n",
      "solutionCode": "import pandas as pd\ndf = pd.DataFrame({'dept': ['HR', 'IT', 'IT', 'HR'], 'salary': [50000, 60000, 70000, 55000]})\navg = df.groupby('dept')['salary'].mean()\nprint(avg)",
      "testCases": [{ "input": "", "expectedOutput": "dept\nHR     52500.0\nIT     65000.0\nName: salary, dtype: float64\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Data Analysis",
      "prompt": "Read N records from input (N given first, each line: 'name,age,score'). Create a DataFrame and print: (1) average age, (2) highest score, (3) name of person with highest score. (Input: 3, Alice,25,85, Bob,30,92, Charlie,28,78 → Output: Avg age: 27.67, Max score: 92, Top scorer: Bob)",
      "starterCode": "import pandas as pd\n# Read records and analyze\n",
      "solutionCode": "import pandas as pd\nn = int(input())\nrecords = []\nfor _ in range(n):\n    name, age, score = input().split(',')\n    records.append({'name': name, 'age': int(age), 'score': int(score)})\ndf = pd.DataFrame(records)\nprint(f\"Avg age: {df['age'].mean():.2f}\")\nprint(f\"Max score: {df['score'].max()}\")\nprint(f\"Top scorer: {df.loc[df['score'].idxmax(), 'name']}\")",
      "testCases": [
        { "input": "3\nAlice,25,85\nBob,30,92\nCharlie,28,78\n", "expectedOutput": "Avg age: 27.67\nMax score: 92\nTop scorer: Bob\n" }
      ],
      "difficulty": "expert",
      "xpReward": 65
    }
  ],
  "data-cleaning": [
    {
      "title": "Handle Missing Values",
      "prompt": "Given a DataFrame with missing values, fill NaN values in the 'age' column with the mean age. Print the result.\ndf = pd.DataFrame({'name': ['Alice', 'Bob', None], 'age': [25, None, 35]})",
      "starterCode": "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({'name': ['Alice', 'Bob', None], 'age': [25, np.nan, 35]})\n# Fill missing age values with mean\n",
      "solutionCode": "import pandas as pd\nimport numpy as np\ndf = pd.DataFrame({'name': ['Alice', 'Bob', None], 'age': [25, np.nan, 35]})\ndf['age'] = df['age'].fillna(df['age'].mean())\nprint(df)",
      "testCases": [{ "input": "", "expectedOutput": "    name   age\n0  Alice  25.0\n1    Bob  30.0\n2   None  35.0\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Remove Duplicates",
      "prompt": "Given a DataFrame with duplicate rows, remove duplicates and print the result.\ndf = pd.DataFrame({'A': [1, 1, 2, 3], 'B': [4, 4, 5, 6]})",
      "starterCode": "import pandas as pd\ndf = pd.DataFrame({'A': [1, 1, 2, 3], 'B': [4, 4, 5, 6]})\n# Remove duplicates\n",
      "solutionCode": "import pandas as pd\ndf = pd.DataFrame({'A': [1, 1, 2, 3], 'B': [4, 4, 5, 6]})\ndf = df.drop_duplicates()\nprint(df)",
      "testCases": [{ "input": "", "expectedOutput": "   A  B\n0  1  4\n2  2  5\n3  3  6\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Detect Outliers",
      "prompt": "Given arr = np.array([10, 12, 11, 13, 100, 11, 12, 9, 11, 200]), use the IQR method to identify outliers. Print the outlier values.",
      "starterCode": "import numpy as np\narr = np.array([10, 12, 11, 13, 100, 11, 12, 9, 11, 200])\n# Detect outliers using IQR\n",
      "solutionCode": "import numpy as np\narr = np.array([10, 12, 11, 13, 100, 11, 12, 9, 11, 200])\nQ1 = np.percentile(arr, 25)\nQ3 = np.percentile(arr, 75)\nIQR = Q3 - Q1\nlower = Q1 - 1.5 * IQR\nupper = Q3 + 1.5 * IQR\noutliers = arr[(arr < lower) | (arr > upper)]\nprint(outliers)",
      "testCases": [{ "input": "", "expectedOutput": "[100 200]\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Clean Dataset",
      "prompt": "Read N records from input (N given first, each line: 'name,age,score'). Create a DataFrame, drop rows with missing values, and print the cleaned DataFrame shape and average score. (Input: 4, Alice,25,85, Bob,,92, Charlie,28,, Diana,30,88 → Output: Shape: (2, 3), Avg score: 86.5)",
      "starterCode": "import pandas as pd\n# Read records, clean data, and analyze\n",
      "solutionCode": "import pandas as pd\nn = int(input())\nrecords = []\nfor _ in range(n):\n    parts = input().split(',')\n    name = parts[0] if parts[0] else None\n    age = float(parts[1]) if parts[1] else None\n    score = float(parts[2]) if parts[2] else None\n    records.append({'name': name, 'age': age, 'score': score})\ndf = pd.DataFrame(records)\ndf = df.dropna()\nprint(f'Shape: {df.shape}')\nprint(f'Avg score: {df[\"score\"].mean()}')",
      "testCases": [
        { "input": "4\nAlice,25,85\nBob,,92\nCharlie,28,\nDiana,30,88\n", "expectedOutput": "Shape: (2, 3)\nAvg score: 86.5\n" }
      ],
      "difficulty": "expert",
      "xpReward": 65
    }
  ],
  "data-visualization": [
    {
      "title": "Create a Line Plot",
      "prompt": "Import matplotlib.pyplot as plt. Create a line plot of y = x^2 for x values [1, 2, 3, 4, 5]. Add title 'Square Function' and show the plot (use plt.show()).",
      "starterCode": "import matplotlib.pyplot as plt\nimport numpy as np\n# Create a line plot\n",
      "solutionCode": "import matplotlib.pyplot as plt\nimport numpy as np\nx = np.array([1, 2, 3, 4, 5])\ny = x ** 2\nplt.plot(x, y)\nplt.title('Square Function')\nplt.xlabel('x')\nplt.ylabel('x^2')\nplt.show()",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Create a Bar Chart",
      "prompt": "Create a bar chart with categories ['A', 'B', 'C', 'D'] and values [25, 40, 30, 50]. Add title 'Category Values' and show the plot.",
      "starterCode": "import matplotlib.pyplot as plt\n# Create a bar chart\n",
      "solutionCode": "import matplotlib.pyplot as plt\ncategories = ['A', 'B', 'C', 'D']\nvalues = [25, 40, 30, 50]\nplt.bar(categories, values)\nplt.title('Category Values')\nplt.xlabel('Category')\nplt.ylabel('Value')\nplt.show()",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Create a Scatter Plot",
      "prompt": "Create a scatter plot with x = [1, 2, 3, 4, 5] and y = [2, 4, 6, 8, 10]. Add title 'Linear Relationship' and show the plot.",
      "starterCode": "import matplotlib.pyplot as plt\n# Create a scatter plot\n",
      "solutionCode": "import matplotlib.pyplot as plt\nx = [1, 2, 3, 4, 5]\ny = [2, 4, 6, 8, 10]\nplt.scatter(x, y)\nplt.title('Linear Relationship')\nplt.xlabel('X')\nplt.ylabel('Y')\nplt.show()",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Module Integration: Multi-Plot Dashboard",
      "prompt": "Create a 2x2 subplot dashboard with: (1) line plot of sin(x), (2) bar chart of ['A','B','C'] with values [10,20,15], (3) histogram of 100 random normal values, (4) scatter plot of random points. Add titles to each subplot.",
      "starterCode": "import matplotlib.pyplot as plt\nimport numpy as np\n# Create a 2x2 subplot dashboard\n",
      "solutionCode": "import matplotlib.pyplot as plt\nimport numpy as np\nfig, axes = plt.subplots(2, 2, figsize=(10, 8))\n\nx = np.linspace(0, 10, 50)\naxes[0, 0].plot(x, np.sin(x))\naxes[0, 0].set_title('Sine Wave')\n\naxes[0, 1].bar(['A', 'B', 'C'], [10, 20, 15])\naxes[0, 1].set_title('Bar Chart')\n\naxes[1, 0].hist(np.random.randn(100), bins=15)\naxes[1, 0].set_title('Histogram')\n\naxes[1, 1].scatter(np.random.rand(30), np.random.rand(30))\naxes[1, 1].set_title('Scatter Plot')\n\nplt.tight_layout()\nplt.show()",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "expert",
      "xpReward": 65
    }
  ],
  "scikit-learn": [
    {
      "title": "Train a Linear Regression",
      "prompt": "Import LinearRegression from sklearn. Create X = [[1], [2], [3], [4], [5]] and y = [2, 4, 6, 8, 10]. Train the model and print the coefficient and intercept.",
      "starterCode": "from sklearn.linear_model import LinearRegression\nimport numpy as np\n# Train a linear regression model\n",
      "solutionCode": "from sklearn.linear_model import LinearRegression\nimport numpy as np\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([2, 4, 6, 8, 10])\nmodel = LinearRegression()\nmodel.fit(X, y)\nprint(f'Coefficient: {model.coef_[0]:.2f}')\nprint(f'Intercept: {model.intercept_:.2f}')",
      "testCases": [{ "input": "", "expectedOutput": "Coefficient: 2.00\nIntercept: 0.00\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Make Predictions",
      "prompt": "Using the trained model from the previous exercise, predict the y-values for X_test = [[6], [7], [8]]. Print the predictions.",
      "starterCode": "from sklearn.linear_model import LinearRegression\nimport numpy as np\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([2, 4, 6, 8, 10])\nmodel = LinearRegression()\nmodel.fit(X, y)\n# Make predictions\n",
      "solutionCode": "from sklearn.linear_model import LinearRegression\nimport numpy as np\nX = np.array([[1], [2], [3], [4], [5]])\ny = np.array([2, 4, 6, 8, 10])\nmodel = LinearRegression()\nmodel.fit(X, y)\nX_test = np.array([[6], [7], [8]])\npredictions = model.predict(X_test)\nprint(predictions)",
      "testCases": [{ "input": "", "expectedOutput": "[12. 14. 16.]\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Evaluate Model Accuracy",
      "prompt": "Train a LogisticRegression on X = [[1], [2], [3], [4], [5], [6]] and y = [0, 0, 0, 1, 1, 1]. Calculate and print the accuracy score on the training data.",
      "starterCode": "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\nimport numpy as np\n# Train and evaluate a classifier\n",
      "solutionCode": "from sklearn.linear_model import LogisticRegression\nfrom sklearn.metrics import accuracy_score\nimport numpy as np\nX = np.array([[1], [2], [3], [4], [5], [6]])\ny = np.array([0, 0, 0, 1, 1, 1])\nmodel = LogisticRegression()\nmodel.fit(X, y)\ny_pred = model.predict(X)\naccuracy = accuracy_score(y, y_pred)\nprint(f'Accuracy: {accuracy:.2f}')",
      "testCases": [{ "input": "", "expectedOutput": "Accuracy: 1.00\n" }],
      "difficulty": "intermediate",
      "xpReward": 30
    },
    {
      "title": "Module Integration: Classification Pipeline",
      "prompt": "Use sklearn to: (1) load the iris dataset, (2) split into train/test (80/20), (3) train a RandomForestClassifier, (4) predict on test set, (5) print accuracy. Use random_state=42 for reproducibility.",
      "starterCode": "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\n# Complete classification pipeline\n",
      "solutionCode": "from sklearn.datasets import load_iris\nfrom sklearn.model_selection import train_test_split\nfrom sklearn.ensemble import RandomForestClassifier\nfrom sklearn.metrics import accuracy_score\niris = load_iris()\nX_train, X_test, y_train, y_test = train_test_split(iris.data, iris.target, test_size=0.2, random_state=42)\nmodel = RandomForestClassifier(random_state=42)\nmodel.fit(X_train, y_train)\ny_pred = model.predict(X_test)\naccuracy = accuracy_score(y_test, y_pred)\nprint(f'Accuracy: {accuracy:.2f}')",
      "testCases": [{ "input": "", "expectedOutput": "Accuracy: 1.00\n" }],
      "difficulty": "expert",
      "xpReward": 75
    }
  ],
  "deep-learning": [
    {
      "title": "Neural Network Concept",
      "prompt": "Create a simple function `neuron(inputs, weights, bias)` that computes the weighted sum and applies ReLU activation (max(0, x)). Test with inputs=[1, 2], weights=[0.5, 0.5], bias=-1. Print the output.",
      "starterCode": "import numpy as np\n# Create a simple neuron function\n",
      "solutionCode": "import numpy as np\ndef neuron(inputs, weights, bias):\n    z = np.dot(inputs, weights) + bias\n    return max(0, z)\n\ninputs = np.array([1, 2])\nweights = np.array([0.5, 0.5])\nbias = -1\noutput = neuron(inputs, weights, bias)\nprint(output)",
      "testCases": [{ "input": "", "expectedOutput": "0.5\n" }],
      "difficulty": "beginner",
      "xpReward": 20
    },
    {
      "title": "Activation Functions",
      "prompt": "Implement the sigmoid activation function: sigmoid(x) = 1 / (1 + exp(-x)). Test with x = 0 and print the result (should be 0.5).",
      "starterCode": "import numpy as np\n# Implement sigmoid function\n",
      "solutionCode": "import numpy as np\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))\n\nprint(sigmoid(0))",
      "testCases": [{ "input": "", "expectedOutput": "0.5\n" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Module Integration: Build a Simple Network",
      "prompt": "Create a function `forward_pass(inputs, weights1, bias1, weights2, bias2)` that implements a 2-layer neural network with ReLU activation in the hidden layer and sigmoid in the output layer. Test with inputs=[1, 2], weights1=[[0.1, 0.2], [0.3, 0.4]], bias1=[0.1, 0.2], weights2=[0.5, 0.6], bias2=0.1. Print the output.",
      "starterCode": "import numpy as np\n# Build a 2-layer neural network\n",
      "solutionCode": "import numpy as np\ndef sigmoid(x):\n    return 1 / (1 + np.exp(-x))\n\ndef forward_pass(inputs, weights1, bias1, weights2, bias2):\n    # Hidden layer with ReLU\n    hidden = np.dot(inputs, weights1) + bias1\n    hidden = np.maximum(0, hidden)\n    # Output layer with sigmoid\n    output = sigmoid(np.dot(hidden, weights2) + bias2)\n    return output\n\ninputs = np.array([1, 2])\nweights1 = np.array([[0.1, 0.2], [0.3, 0.4]])\nbias1 = np.array([0.1, 0.2])\nweights2 = np.array([0.5, 0.6])\nbias2 = 0.1\noutput = forward_pass(inputs, weights1, bias1, weights2, bias2)\nprint(f'{output:.4f}')",
      "testCases": [{ "input": "", "expectedOutput": "0.6682\n" }],
      "difficulty": "expert",
      "xpReward": 80
    }
  ],
  "jupyter-notebook": [
    {
      "title": "Magic Commands",
      "prompt": "Use the `%timeit` magic command to time the execution of `sum(range(1000))`. Print the result (the magic command itself will output timing info).",
      "starterCode": "# Use %timeit magic command\n",
      "solutionCode": "%timeit sum(range(1000))",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "List Variables",
      "prompt": "Create variables x = 10, y = 20, z = 30. Then use the `%who` magic command to list all variables.",
      "starterCode": "# Create variables and list them\n",
      "solutionCode": "x = 10\ny = 20\nz = 30\n%who",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "beginner",
      "xpReward": 15
    },
    {
      "title": "Module Integration: Notebook Analysis",
      "prompt": "In a Jupyter notebook cell: (1) import pandas and numpy, (2) create a DataFrame with 5 rows of random data, (3) use `%timeit` to time calculating the mean of a column, (4) print the DataFrame head. (This exercise tests multiple notebook concepts.)",
      "starterCode": "# Jupyter notebook analysis cell\n",
      "solutionCode": "import pandas as pd\nimport numpy as np\n\nnp.random.seed(42)\ndf = pd.DataFrame({'A': np.random.randn(5), 'B': np.random.randn(5)})\nprint(df.head())\n%timeit df['A'].mean()",
      "testCases": [{ "input": "", "expectedOutput": "IGNORE_OUTPUT_CHECK" }],
      "difficulty": "expert",
      "xpReward": 55
    }
  ]
};
