export const deepLearningLesson = {
  title: "Deep Learning Basics",
  slug: "deep-learning",
  content: `# Deep Learning Basics

Deep learning is a subset of machine learning that uses neural networks with many layers ("deep" networks) to learn complex patterns in data. It powers image recognition, natural language processing, and many AI applications.

## What is Deep Learning?

Deep learning uses:
- **Neural Networks**: Layers of interconnected nodes (neurons)
- **Backpropagation**: Algorithm to train networks by adjusting weights
- **Activation Functions**: Non-linear functions (ReLU, sigmoid, softmax)
- **Optimizers**: Algorithms to minimize loss (SGD, Adam)
- **GPUs**: Hardware acceleration for training large models

> [!NOTE]
> **Why this matters:** Traditional ML makes you *engineer features* by hand ("combine columns X and Y into a ratio"). Deep learning flips that: you feed in raw data and the network *learns its own features* through layered transformations. That's why it dominates images, audio, and text — domains where hand-crafting features is impractical. The cost is data hunger, compute, and a loss of interpretability. You're trading explainability for raw capability.

## Neural Networks - The Basics

A neural network consists of:
- **Input Layer**: Receives the data
- **Hidden Layers**: Transform the data through weights and activations
- **Output Layer**: Produces the prediction

\`\`\`python
# Simple neural network concept
import numpy as np

# Forward pass through a single neuron
def neuron(inputs, weights, bias):
    """Compute output of a single neuron."""
    z = np.dot(inputs, weights) + bias
    return max(0, z)  # ReLU activation

# Example: AND gate with a neuron
inputs = np.array([1, 1])
weights = np.array([0.5, 0.5])
bias = -0.7
output = neuron(inputs, weights, bias)
print(f"AND(1,1) = {output}")  # Should be close to 1
\`\`\`

> [!TIP]
> **The whole network is just this, repeated.** A neuron = weighted sum + activation. Stack thousands of them in layers, adjust the weights via backpropagation so the output gets closer to the truth, and you have deep learning. \`ReLU\` (\`max(0, z)\`) is the most common activation because it's cheap and avoids the "vanishing gradient" problem that plagued older \`sigmoid\` networks.

## TensorFlow

TensorFlow is Google's open-source deep learning framework. It provides both high-level (Keras) and low-level APIs.

### Installation

\`\`\`bash
pip install tensorflow
\`\`\`

### Basic Neural Network with Keras

\`\`\`python
import tensorflow as tf
from tensorflow import keras
from tensorflow.keras import layers
import numpy as np

# Build a simple neural network
model = keras.Sequential([
    layers.Dense(64, activation='relu', input_shape=(10,)),
    layers.Dense(32, activation='relu'),
    layers.Dense(1, activation='sigmoid')
])

# Compile the model
model.compile(
    optimizer='adam',
    loss='binary_crossentropy',
    metrics=['accuracy']
)

# Summary
model.summary()

# Generate dummy data
X_train = np.random.rand(1000, 10)
y_train = np.random.randint(0, 2, (1000, 1))

# Train the model
history = model.fit(X_train, y_train, epochs=10, batch_size=32, validation_split=0.2)
\`\`\`

### Image Classification with CNN

\`\`\`python
from tensorflow.keras import layers, models

# Convolutional Neural Network for image classification
model = models.Sequential([
    # Convolutional layers
    layers.Conv2D(32, (3, 3), activation='relu', input_shape=(28, 28, 1)),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),
    layers.MaxPooling2D((2, 2)),
    layers.Conv2D(64, (3, 3), activation='relu'),

    # Dense layers
    layers.Flatten(),
    layers.Dense(64, activation='relu'),
    layers.Dense(10, activation='softmax')  # 10 classes
])

model.compile(optimizer='adam',
              loss='sparse_categorical_crossentropy',
              metrics=['accuracy'])

model.summary()
\`\`\`

### Training and Evaluation

\`\`\`python
from tensorflow.keras.datasets import mnist

# Load MNIST dataset
(X_train, y_train), (X_test, y_test) = mnist.load_data()

# Preprocess
X_train = X_train.reshape(-1, 28, 28, 1).astype('float32') / 255
X_test = X_test.reshape(-1, 28, 28, 1).astype('float32') / 255

# Train
history = model.fit(X_train, y_train, epochs=5, batch_size=64, validation_split=0.2)

# Evaluate
test_loss, test_acc = model.evaluate(X_test, y_test)
print(f"Test accuracy: {test_acc:.4f}")
\`\`\`

## PyTorch

PyTorch is Facebook's deep learning framework, popular in research for its dynamic computation graphs.

### Installation

\`\`\`bash
pip install torch torchvision
\`\`\`

### Basic Neural Network with PyTorch

\`\`\`python
import torch
import torch.nn as nn
import torch.optim as optim

# Define a neural network
class NeuralNetwork(nn.Module):
    def __init__(self, input_size, hidden_size, num_classes):
        super(NeuralNetwork, self).__init__()
        self.fc1 = nn.Linear(input_size, hidden_size)
        self.relu = nn.ReLU()
        self.fc2 = nn.Linear(hidden_size, hidden_size)
        self.fc3 = nn.Linear(hidden_size, num_classes)

    def forward(self, x):
        out = self.fc1(x)
        out = self.relu(out)
        out = self.fc2(out)
        out = self.relu(out)
        out = self.fc3(out)
        return out

# Create model
model = NeuralNetwork(input_size=10, hidden_size=64, num_classes=2)

# Loss and optimizer
criterion = nn.CrossEntropyLoss()
optimizer = optim.Adam(model.parameters(), lr=0.001)

# Dummy data
X = torch.randn(100, 10)
y = torch.randint(0, 2, (100,))

# Training loop
for epoch in range(100):
    # Forward pass
    outputs = model(X)
    loss = criterion(outputs, y)

    # Backward pass
    optimizer.zero_grad()
    loss.backward()
    optimizer.step()

    if (epoch + 1) % 20 == 0:
        print(f'Epoch [{epoch+1}/100], Loss: {loss.item():.4f}')
\`\`\`

### CNN with PyTorch

\`\`\`python
import torch.nn as nn

class CNN(nn.Module):
    def __init__(self, num_classes=10):
        super(CNN, self).__init__()
        self.features = nn.Sequential(
            nn.Conv2d(1, 32, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
            nn.Conv2d(32, 64, kernel_size=3, padding=1),
            nn.ReLU(),
            nn.MaxPool2d(2),
        )
        self.classifier = nn.Sequential(
            nn.Flatten(),
            nn.Linear(64 * 7 * 7, 128),
            nn.ReLU(),
            nn.Linear(128, num_classes)
        )

    def forward(self, x):
        x = self.features(x)
        x = self.classifier(x)
        return x

model = CNN(num_classes=10)
print(model)
\`\`\`

## Key Concepts

### Activation Functions

\`\`\`python
import numpy as np
import matplotlib.pyplot as plt

x = np.linspace(-5, 5, 100)

# ReLU: max(0, x)
relu = np.maximum(0, x)

# Sigmoid: 1 / (1 + e^(-x))
sigmoid = 1 / (1 + np.exp(-x))

# Tanh: (e^x - e^(-x)) / (e^x + e^(-x))
tanh = np.tanh(x)

# Softmax (for multi-class classification)
def softmax(x):
    exp_x = np.exp(x - np.max(x))
    return exp_x / exp_x.sum()

# Plot
fig, axes = plt.subplots(1, 3, figsize=(15, 4))
axes[0].plot(x, relu); axes[0].set_title('ReLU')
axes[1].plot(x, sigmoid); axes[1].set_title('Sigmoid')
axes[2].plot(x, tanh); axes[2].set_title('Tanh')
plt.tight_layout()
plt.show()
\`\`\`

### Loss Functions

\`\`\`python
# Common loss functions:
# - Mean Squared Error (MSE): Regression
# - Binary Cross-Entropy: Binary classification
# - Categorical Cross-Entropy: Multi-class classification
# - Hinge Loss: SVMs

import torch.nn as nn

mse_loss = nn.MSELoss()
bce_loss = nn.BCELoss()
ce_loss = nn.CrossEntropyLoss()
\`\`\`

### Optimizers

\`\`\`python
# Common optimizers:
# - SGD: Stochastic Gradient Descent
# - Adam: Adaptive Moment Estimation (most popular)
# - RMSprop: Root Mean Square Propagation
# - AdamW: Adam with weight decay

import torch.optim as optim

# optimizer = optim.SGD(model.parameters(), lr=0.01, momentum=0.9)
# optimizer = optim.Adam(model.parameters(), lr=0.001)
# optimizer = optim.RMSprop(model.parameters(), lr=0.001)
\`\`\`

### Overfitting Prevention

\`\`\`python
from tensorflow.keras import layers, callbacks

model = keras.Sequential([
    layers.Dense(128, activation='relu', input_shape=(10,)),
    layers.Dropout(0.3),  # Dropout for regularization
    layers.Dense(64, activation='relu'),
    layers.Dropout(0.3),
    layers.Dense(1, activation='sigmoid')
])

# Early stopping
early_stop = callbacks.EarlyStopping(
    monitor='val_loss',
    patience=5,
    restore_best_weights=True
)

# Learning rate scheduling
lr_scheduler = callbacks.ReduceLROnPlateau(
    monitor='val_loss',
    factor=0.5,
    patience=3
)

model.fit(X_train, y_train, epochs=100, batch_size=32,
          validation_split=0.2, callbacks=[early_stop, lr_scheduler])
\`\`\`

## Transfer Learning

\`\`\`python
from tensorflow.keras.applications import ResNet50
from tensorflow.keras import layers, models

# Load pre-trained model (without top classification layer)
base_model = ResNet50(weights='imagenet', include_top=False, input_shape=(224, 224, 3))

# Freeze base model layers
base_model.trainable = False

# Add custom classification head
model = models.Sequential([
    base_model,
    layers.GlobalAveragePooling2D(),
    layers.Dense(256, activation='relu'),
    layers.Dropout(0.5),
    layers.Dense(10, activation='softmax')  # 10 classes
])

model.compile(optimizer='adam',
              loss='categorical_crossentropy',
              metrics=['accuracy'])
\`\`\`

## When to Use Deep Learning

| Use Deep Learning | Use Traditional ML |
|-------------------|--------------------|
| Large datasets | Small/medium datasets |
| Images, audio, text | Tabular data |
| Complex patterns | Simple patterns |
| GPU available | CPU sufficient |
| Time to train | Quick results needed |

## Real-World Example: Building a Spam Classifier with Keras

Binary classification is the most common DL task. Here's the minimal shape of a text spam filter.

\`\`\`python
import numpy as np
import tensorflow as tf
from tensorflow.keras import layers

# Toy data: 1 = spam, 0 = ham (in practice you'd vectorize text first)
X = np.random.rand(500, 20)          # 500 emails, 20 features each
y = np.random.randint(0, 2, 500)

model = tf.keras.Sequential([
    layers.Dense(32, activation='relu', input_shape=(20,)),
    layers.Dropout(0.3),              # fight overfitting
    layers.Dense(1, activation='sigmoid')  # sigmoid -> probability of spam
])

model.compile(optimizer='adam', loss='binary_crossentropy', metrics=['accuracy'])
model.fit(X, y, epochs=10, batch_size=32, validation_split=0.2, verbose=0)

print(f"Trained on {len(X)} samples; ready to predict spam probability.")
\`\`\`

The architecture pattern — \`Dense → Dropout → Dense(sigmoid)\` — is the workhorse for tabular/binary problems. Swap \`sigmoid\` for \`softmax\` and you have multi-class.

## Your Turn!

1. Change the \`AND\` neuron's weights/bias and predict \`AND(0,1)\` — confirm it's near 0.
2. In the Keras spam model, remove the \`Dropout\` layer and watch whether validation accuracy gets *worse* — that's overfitting in action.
3. Convert the spam model to multi-class by using \`softmax\` in the last layer and \`sparse_categorical_crossentropy\` loss.

> [!TIP]
> Start with TensorFlow/Keras for its simpler API. Use PyTorch if you need more flexibility or are doing research. Always try traditional ML methods first — deep learning isn't always the answer.`,
  objectives: [
    "Understand neural network fundamentals.",
    "Build models with TensorFlow/Keras.",
    "Build models with PyTorch.",
    "Apply CNNs for image classification.",
    "Prevent overfitting with regularization.",
    "Use transfer learning for practical applications."
  ],
  difficulty: "expert",
  xpReward: 85,
};
