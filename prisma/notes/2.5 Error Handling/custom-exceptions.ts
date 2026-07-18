export const customExceptionsLesson = {
  title: "Custom Exception Classes",
  slug: "custom-exceptions",
  content: `# Custom Exception Classes

Custom exceptions let you name a *specific* failure so callers can react precisely, since exceptions are ordinary classes that inherit \`Exception\` and \`except\` matches by class and parent — a shared base \`AppError\` can catch an entire hierarchy. The pitfall is inheriting from \`BaseException\` instead of \`Exception\`, which can interfere with interpreter-level signals such as program exit.

## Why Custom Exceptions?

Built-in exceptions like \`ValueError\` and \`TypeError\` are generic. Custom exceptions let you:
1. **Be specific** - callers know exactly what went wrong
2. **Carry extra data** - include error codes, field names, context
3. **Build hierarchies** - organize related errors
4. **Catch selectively** - catch only your specific errors, not all ValueErrors

\`\`\`python
# Generic exception - hard to handle selectively
def connect():
    raise ValueError("Connection failed")  # Too generic

# Custom exception - callers can be specific
class ConnectionError(Exception):
    pass

def connect():
    raise ConnectionError("Database server unreachable")

# Now callers can catch only YOUR errors
try:
    connect()
except ConnectionError:
    print("DB is down, switching to cache")
# This won't catch other ValueErrors from unrelated code
\`\`\`

## Creating a Basic Custom Exception

Custom exceptions inherit from \`Exception\` (or another exception class):

\`\`\`python
class MyError(Exception):
    pass

# Raise it
raise MyError("Something went wrong")

# Catch it
try:
    raise MyError("Something went wrong")
except MyError as e:
    print(f"Caught: {e}")   # Caught: Something went wrong

# Has all standard exception behavior
e = MyError("test")
print(str(e))       # test
print(repr(e))      # MyError('test')
print(e.args)       # ('test',)
\`\`\`

## Custom Exceptions with Extra Data

Customize \`__init__\` to carry relevant context:

\`\`\`python
class ValidationError(Exception):
    """Raised when data validation fails."""

    def __init__(self, field, value, reason):
        self.field = field
        self.value = value
        self.reason = reason
        message = f"Field '{field}': {reason} (got {value!r})"
        super().__init__(message)

    def __str__(self):
        return f"ValidationError: {self.args[0]}"

try:
    raise ValidationError("age", -5, "must be positive")
except ValidationError as e:
    print(e)             # ValidationError: Field 'age': must be positive (got -5)
    print(e.field)       # age
    print(e.value)       # -5
    print(e.reason)      # must be positive
\`\`\`

\`\`\`python
class HttpError(Exception):
    """Raised for HTTP-related errors."""

    def __init__(self, status_code, message, url=None):
        self.status_code = status_code
        self.url = url
        super().__init__(f"HTTP {status_code}: {message}")
        if url:
            self.args = (f"HTTP {status_code}: {message} (URL: {url})",)

def fetch_data(url):
    # Simulated HTTP errors
    if "404" in url:
        raise HttpError(404, "Not Found", url)
    elif "500" in url:
        raise HttpError(500, "Internal Server Error", url)
    return {"data": "some data"}

try:
    fetch_data("https://api.example.com/404/endpoint")
except HttpError as e:
    print(e)                       # HTTP 404: Not Found (URL: ...)
    print(f"Status: {e.status_code}")   # Status: 404
    if e.status_code == 404:
        print("Resource not found - check the URL")
    elif e.status_code == 500:
        print("Server error - try again later")
\`\`\`

## Building an Exception Hierarchy

Organize related exceptions in a tree:

\`\`\`python
# Base exception for your application
class AppError(Exception):
    """Base class for all application errors."""
    pass

# Domain-specific base exceptions
class DatabaseError(AppError):
    """Database-related errors."""
    pass

class AuthError(AppError):
    """Authentication and authorization errors."""
    pass

class ValidationError(AppError):
    """Data validation errors."""
    pass

# Specific exceptions
class ConnectionError(DatabaseError):
    """Cannot connect to database."""
    def __init__(self, host, port, original_error=None):
        self.host = host
        self.port = port
        self.original_error = original_error
        super().__init__(f"Cannot connect to {host}:{port}")

class QueryError(DatabaseError):
    """Database query failed."""
    def __init__(self, query, error):
        self.query = query
        super().__init__(f"Query failed: {error}\\nQuery: {query[:100]}")

class AuthenticationError(AuthError):
    """Login failed."""
    pass

class PermissionError(AuthError):
    """User doesn't have permission."""
    def __init__(self, user, action, resource):
        self.user = user
        self.action = action
        self.resource = resource
        super().__init__(f"User '{user}' cannot {action} on {resource}")

class FieldValidationError(ValidationError):
    def __init__(self, field, value, expected):
        super().__init__(f"Field '{field}': expected {expected}, got {value!r}")
        self.field = field

class MultiValidationError(ValidationError):
    """Multiple validation errors."""
    def __init__(self, errors):
        self.errors = errors
        message = "\\n".join(f"  - {e}" for e in errors)
        super().__init__(f"Validation failed:\\n{message}")

# Usage - caller can catch at different levels
def run_query(query):
    raise QueryError(query, "syntax error near 'SLECT'")

try:
    run_query("SLECT * FROM users")
except QueryError as e:
    print(f"Query problem: {e}")
except DatabaseError as e:
    print(f"DB problem: {e}")    # Catches any DatabaseError
except AppError as e:
    print(f"App problem: {e}")   # Catches any app error
\`\`\`

## Custom Exceptions with Useful Methods

\`\`\`python
class APIError(Exception):
    """Error from an external API."""

    STATUS_MESSAGES = {
        400: "Bad Request",
        401: "Unauthorized",
        403: "Forbidden",
        404: "Not Found",
        429: "Too Many Requests",
        500: "Internal Server Error",
        503: "Service Unavailable",
    }

    def __init__(self, status_code, message=None, response_body=None):
        self.status_code = status_code
        self.response_body = response_body
        self.message = message or self.STATUS_MESSAGES.get(status_code, "Unknown Error")
        super().__init__(f"API Error {status_code}: {self.message}")

    @property
    def is_client_error(self):
        """Returns True for 4xx errors (our fault)."""
        return 400 <= self.status_code < 500

    @property
    def is_server_error(self):
        """Returns True for 5xx errors (server's fault)."""
        return 500 <= self.status_code < 600

    @property
    def is_retryable(self):
        """Returns True if the request should be retried."""
        return self.status_code in {429, 500, 502, 503, 504}

    def to_dict(self):
        return {
            "status_code": self.status_code,
            "message": self.message,
            "is_client_error": self.is_client_error,
            "is_retryable": self.is_retryable,
        }

# Usage
try:
    raise APIError(429, response_body={"retry_after": 60})
except APIError as e:
    print(e)
    if e.is_retryable:
        print(f"Will retry...")
    elif e.is_client_error:
        print("Fix the request parameters")
    print(e.to_dict())
\`\`\`

## Real-World Example: E-commerce Error System

\`\`\`python
class ShopError(Exception):
    """Base exception for the shop."""
    def __init__(self, message, error_code=None):
        self.error_code = error_code
        super().__init__(message)

class ProductError(ShopError):
    pass

class OrderError(ShopError):
    pass

class PaymentError(ShopError):
    pass

class ProductNotFoundError(ProductError):
    def __init__(self, product_id):
        self.product_id = product_id
        super().__init__(
            f"Product #{product_id} not found",
            error_code="PRODUCT_NOT_FOUND"
        )

class OutOfStockError(ProductError):
    def __init__(self, product_id, product_name, requested, available):
        self.product_id = product_id
        self.requested = requested
        self.available = available
        super().__init__(
            f"Insufficient stock for '{product_name}': "
            f"requested {requested}, only {available} available",
            error_code="OUT_OF_STOCK"
        )

class PaymentDeclinedError(PaymentError):
    def __init__(self, reason, amount):
        self.reason = reason
        self.amount = amount
        super().__init__(
            f"Payment of \${amount:.2f} declined: {reason}",
            error_code="PAYMENT_DECLINED"
        )

class OrderItemError(OrderError):
    def __init__(self, item_errors):
        self.item_errors = item_errors
        messages = [str(e) for e in item_errors]
        super().__init__(
            f"Order has {len(item_errors)} item error(s):\\n" +
            "\\n".join(f"  - {m}" for m in messages),
            error_code="ORDER_ITEM_ERRORS"
        )

# Product catalog (simplified)
PRODUCTS = {
    "P001": {"name": "Python Book", "price": 39.99, "stock": 5},
    "P002": {"name": "USB Cable",   "price":  9.99, "stock": 0},
    "P003": {"name": "Keyboard",    "price": 89.99, "stock": 10},
}

def get_product(product_id):
    if product_id not in PRODUCTS:
        raise ProductNotFoundError(product_id)
    return PRODUCTS[product_id]

def check_stock(product_id, quantity):
    product = get_product(product_id)
    if product["stock"] < quantity:
        raise OutOfStockError(
            product_id,
            product["name"],
            quantity,
            product["stock"]
        )
    return product

def process_order(items, payment_method):
    """
    items: list of {"product_id": str, "quantity": int}
    payment_method: dict with payment info
    """
    item_errors = []
    total = 0.0

    # Validate all items first
    for item in items:
        try:
            product = check_stock(item["product_id"], item["quantity"])
            total += product["price"] * item["quantity"]
        except (ProductNotFoundError, OutOfStockError) as e:
            item_errors.append(e)

    if item_errors:
        raise OrderItemError(item_errors)

    # Process payment
    if payment_method.get("type") == "credit" and total > 500:
        raise PaymentDeclinedError("Credit limit exceeded", total)

    return {"order_id": "ORD-001", "total": total, "status": "confirmed"}

# Test the system
test_cases = [
    # Valid order
    ([{"product_id": "P001", "quantity": 2}], {"type": "credit"}),
    # Out of stock
    ([{"product_id": "P002", "quantity": 1}], {"type": "credit"}),
    # Product not found
    ([{"product_id": "P999", "quantity": 1}], {"type": "credit"}),
    # Multiple errors
    ([{"product_id": "P002", "quantity": 5}, {"product_id": "P999", "quantity": 1}], {"type": "credit"}),
]

for i, (items, payment) in enumerate(test_cases, 1):
    print(f"\\n=== Order {i} ===")
    try:
        result = process_order(items, payment)
        print(f"Success! Order ID: {result['order_id']}, Total: \${result['total']:.2f}")
    except OrderItemError as e:
        print(f"Order failed: {e}")
        print(f"Error code: {e.error_code}")
    except PaymentError as e:
        print(f"Payment failed: {e}")
    except ShopError as e:
        print(f"Shop error: {e}")
\`\`\`

Output:
\`\`\`
=== Order 1 ===
Success! Order ID: ORD-001, Total: $79.98

=== Order 2 ===
Order failed: Order has 1 item error(s):
  - Insufficient stock for 'USB Cable': requested 1, only 0 available
Error code: ORDER_ITEM_ERRORS

=== Order 3 ===
Order failed: Order has 1 item error(s):
  - Product #P999 not found
Error code: ORDER_ITEM_ERRORS

=== Order 4 ===
Order failed: Order has 2 item error(s):
  - Insufficient stock for 'USB Cable': requested 5, only 0 available
  - Product #P999 not found
Error code: ORDER_ITEM_ERRORS
\`\`\`

> [!TIP]
> Always inherit from \`Exception\` (not \`BaseException\`) for custom exceptions. Name your exceptions with the \`Error\` suffix (e.g., \`ValidationError\`, \`ConnectionError\`). Build a hierarchy with a base application exception so callers can catch all your errors with one \`except AppError\`. Add meaningful attributes to carry context - not just a string message.`,
  objectives: [
    "Create custom exception classes by inheriting from Exception.",
    "Add extra attributes to exceptions for carrying context data.",
    "Build exception hierarchies for organized error handling.",
    "Use custom exceptions to make error handling more selective.",
    "Design a real-world exception system for a domain-specific application."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};