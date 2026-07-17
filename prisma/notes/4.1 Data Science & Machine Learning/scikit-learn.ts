export const scikitLearnLesson = {
  title: "Scikit-Learn - Machine Learning",
  slug: "scikit-learn",
  content: `# Scikit-Learn - Machine Learning

Scikit-Learn is Python's most popular machine learning library. It provides simple and efficient tools for predictive data analysis, including classification, regression, clustering, and model evaluation.

## What is Scikit-Learn?

Scikit-Learn provides:
- **Supervised Learning**: Classification and regression algorithms
- **Unsupervised Learning**: Clustering and dimensionality reduction
- **Model Selection**: Cross-validation, hyperparameter tuning
- **Preprocessing**: Scaling, encoding, feature extraction
- **Pipeline**: Chain preprocessing and modeling steps
- **Metrics**: Accuracy, precision, recall, F1, ROC, etc.

## Installation

\`\`\`bash
pip install scikit-learn
\`\`\`

## Supervised Learning

Supervised learning uses labeled data to train models that can predict outcomes for new data.

### Linear Regression

\`\`\`python
from sklearn.linear_model import LinearRegression
from sklearn.model_selection import train_test_split
from sklearn.metrics import mean_squared_error, r2_score
import numpy as np

# Sample data: predict y from X
X = np.array([[1], [2], [3], [4], [5], [6], [7], [8], [9], [10]])
y = np.array([2, 4, 5, 4, 5, 8, 7, 9, 10, 12])

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LinearRegression()
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
print(f"Coefficient: {model.coef_[0]:.2f}")
print(f"Intercept: {model.intercept_:.2f}")
print(f"MSE: {mean_squared_error(y_test, y_pred):.2f}")
print(f"R²: {r2_score(y_test, y_pred):.2f}")
\`\`\`

### Logistic Regression (Classification)

\`\`\`python
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.metrics import accuracy_score, classification_report

# Load data
iris = load_iris()
X, y = iris.data, iris.target

# Split data
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Train model
model = LogisticRegression(max_iter=200)
model.fit(X_train, y_train)

# Predict
y_pred = model.predict(X_test)

# Evaluate
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
print(classification_report(y_test, y_pred, target_names=iris.target_names))
\`\`\`

### Decision Trees

\`\`\`python
from sklearn.tree import DecisionTreeClassifier, plot_tree
import matplotlib.pyplot as plt

# Train decision tree
model = DecisionTreeClassifier(max_depth=3, random_state=42)
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")

# Visualize tree
plt.figure(figsize=(20, 10))
plot_tree(model, feature_names=iris.feature_names, class_names=iris.target_names, filled=True)
plt.title('Decision Tree Visualization')
plt.show()
\`\`\`

### Random Forest

\`\`\`python
from sklearn.ensemble import RandomForestClassifier

# Train random forest
model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")

# Feature importance
importances = model.feature_importances_
for name, importance in zip(iris.feature_names, importances):
    print(f"{name}: {importance:.3f}")
\`\`\`

### Support Vector Machines (SVM)

\`\`\`python
from sklearn.svm import SVC

# Train SVM
model = SVC(kernel='rbf', C=1.0, gamma='scale')
model.fit(X_train, y_train)

# Predict and evaluate
y_pred = model.predict(X_test)
print(f"Accuracy: {accuracy_score(y_test, y_pred):.2f}")
\`\`\`

## Unsupervised Learning

Unsupervised learning finds patterns in data without labeled outcomes.

### K-Means Clustering

\`\`\`python
from sklearn.cluster import KMeans
from sklearn.datasets import make_blobs
import matplotlib.pyplot as plt

# Generate sample data
X, _ = make_blobs(n_samples=300, centers=4, random_state=42)

# Fit K-Means
kmeans = KMeans(n_clusters=4, random_state=42)
labels = kmeans.fit_predict(X)

# Visualize clusters
plt.figure(figsize=(10, 6))
plt.scatter(X[:, 0], X[:, 1], c=labels, cmap='viridis', alpha=0.6)
plt.scatter(kmeans.cluster_centers_[:, 0], kmeans.cluster_centers_[:, 1],
            c='red', marker='X', s=200, label='Centroids')
plt.title('K-Means Clustering', fontsize=16)
plt.legend()
plt.show()
\`\`\`

### Hierarchical Clustering

\`\`\`python
from scipy.cluster.hierarchy import dendrogram, linkage
from sklearn.datasets import make_blobs

X, _ = make_blobs(n_samples=20, centers=3, random_state=42)

# Create linkage matrix
Z = linkage(X, method='ward')

# Plot dendrogram
plt.figure(figsize=(12, 6))
dendrogram(Z)
plt.title('Hierarchical Clustering Dendrogram', fontsize=16)
plt.xlabel('Sample Index')
plt.ylabel('Distance')
plt.show()
\`\`\`

### Principal Component Analysis (PCA)

\`\`\`python
from sklearn.decomposition import PCA
from sklearn.datasets import load_iris

iris = load_iris()
X, y = iris.data, iris.target

# Apply PCA
pca = PCA(n_components=2)
X_pca = pca.fit_transform(X)

# Visualize
plt.figure(figsize=(10, 6))
scatter = plt.scatter(X_pca[:, 0], X_pca[:, 1], c=y, cmap='viridis', alpha=0.7)
plt.xlabel(f'PC1 ({pca.explained_variance_ratio_[0]:.1%} variance)')
plt.ylabel(f'PC2 ({pca.explained_variance_ratio_[1]:.1%} variance)')
plt.title('PCA of Iris Dataset', fontsize=16)
plt.colorbar(scatter, label='Species')
plt.show()
\`\`\`

## Model Evaluation

### Cross-Validation

\`\`\`python
from sklearn.model_selection import cross_val_score
from sklearn.ensemble import RandomForestClassifier
from sklearn.datasets import load_iris

iris = load_iris()
X, y = iris.data, iris.target

model = RandomForestClassifier(n_estimators=100, random_state=42)

# 5-fold cross-validation
scores = cross_val_score(model, X, y, cv=5)
print(f"Cross-validation scores: {scores}")
print(f"Mean accuracy: {scores.mean():.2f} (+/- {scores.std():.2f})")
\`\`\`

### Confusion Matrix

\`\`\`python
from sklearn.metrics import confusion_matrix, ConfusionMatrixDisplay
from sklearn.ensemble import RandomForestClassifier
from sklearn.model_selection import train_test_split

X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = RandomForestClassifier(n_estimators=100, random_state=42)
model.fit(X_train, y_train)
y_pred = model.predict(X_test)

# Confusion matrix
cm = confusion_matrix(y_test, y_pred)
disp = ConfusionMatrixDisplay(confusion_matrix=cm, display_labels=iris.target_names)
disp.plot(cmap='Blues')
plt.title('Confusion Matrix')
plt.show()
\`\`\`

### ROC Curve (Binary Classification)

\`\`\`python
from sklearn.metrics import roc_curve, auc
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import make_classification

# Binary classification data
X, y = make_classification(n_samples=1000, n_classes=2, random_state=42)
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

model = LogisticRegression()
model.fit(X_train, y_train)

# Get probabilities
y_prob = model.predict_proba(X_test)[:, 1]

# ROC curve
fpr, tpr, thresholds = roc_curve(y_test, y_prob)
roc_auc = auc(fpr, tpr)

plt.figure(figsize=(8, 6))
plt.plot(fpr, tpr, color='darkorange', lw=2, label=f'ROC curve (AUC = {roc_auc:.2f})')
plt.plot([0, 1], [0, 1], color='navy', lw=2, linestyle='--', label='Random')
plt.xlabel('False Positive Rate')
plt.ylabel('True Positive Rate')
plt.title('Receiver Operating Characteristic (ROC) Curve')
plt.legend()
plt.show()
\`\`\`

## Preprocessing

### Feature Scaling

\`\`\`python
from sklearn.preprocessing import StandardScaler, MinMaxScaler

data = [[1, 200], [2, 300], [3, 500], [4, 800], [5, 1000]]

# Standardization (mean=0, std=1)
scaler = StandardScaler()
scaled = scaler.fit_transform(data)
print("Standardized:\n", scaled)

# Normalization (0 to 1 range)
normalizer = MinMaxScaler()
normalized = normalizer.fit_transform(data)
print("Normalized:\n", normalized)
\`\`\`

### Encoding Categorical Variables

\`\`\`python
from sklearn.preprocessing import LabelEncoder, OneHotEncoder

# Label encoding (ordinal categories)
le = LabelEncoder()
colors = ['red', 'blue', 'green', 'red', 'blue']
encoded = le.fit_transform(colors)
print(f"Label encoded: {encoded}")

# One-hot encoding (nominal categories)
from sklearn.preprocessing import OneHotEncoder
import numpy as np

colors = np.array([['red'], ['blue'], ['green'], ['red']])
encoder = OneHotEncoder(sparse_output=False)
onehot = encoder.fit_transform(colors)
print(f"One-hot encoded:\n{onehot}")
\`\`\`

## Pipeline

\`\`\`python
from sklearn.pipeline import Pipeline
from sklearn.preprocessing import StandardScaler
from sklearn.decomposition import PCA
from sklearn.linear_model import LogisticRegression
from sklearn.datasets import load_iris
from sklearn.model_selection import train_test_split

iris = load_iris()
X, y = iris.data, iris.target
X_train, X_test, y_train, y_test = train_test_split(X, y, test_size=0.2, random_state=42)

# Create pipeline
pipeline = Pipeline([
    ('scaler', StandardScaler()),
    ('pca', PCA(n_components=2)),
    ('classifier', LogisticRegression())
])

# Train and evaluate
pipeline.fit(X_train, y_train)
accuracy = pipeline.score(X_test, y_test)
print(f"Pipeline accuracy: {accuracy:.2f}")
\`\`\`

## Hyperparameter Tuning

\`\`\`python
from sklearn.model_selection import GridSearchCV
from sklearn.ensemble import RandomForestClassifier

# Define parameter grid
param_grid = {
    'n_estimators': [50, 100, 200],
    'max_depth': [3, 5, 10, None],
    'min_samples_split': [2, 5, 10]
}

# Grid search
model = RandomForestClassifier(random_state=42)
grid_search = GridSearchCV(model, param_grid, cv=5, scoring='accuracy')
grid_search.fit(X_train, y_train)

print(f"Best parameters: {grid_search.best_params_}")
print(f"Best score: {grid_search.best_score_:.2f}")
\`\`\`

> [!TIP]
> Start with simple models (linear regression, logistic regression) before trying complex ones. Always use cross-validation for reliable evaluation, and tune hyperparameters with GridSearchCV or RandomizedSearchCV.`,
  objectives: [
    "Train supervised learning models (regression and classification).",
    "Apply unsupervised learning (clustering, PCA).",
    "Evaluate models using cross-validation and metrics.",
    "Preprocess data with scaling and encoding.",
    "Build pipelines for reproducible workflows.",
    "Tune hyperparameters for optimal performance."
  ],
  difficulty: "advanced",
  xpReward: 80,
};
