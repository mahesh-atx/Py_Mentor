export const advancedTypeFeaturesLesson = {
  title: "Type Aliases, Annotated, Literal, TypedDict & Protocol",
  slug: "advanced-type-features",
  content: `# Type Aliases, Annotated, Literal, TypedDict & Protocol

## Type Aliases - Give Complex Types a Name

A **type alias** gives a complex type a shorter, meaningful name, making annotations more readable.

\`\`\`python
# Without alias - hard to read
def process(
    data: list[tuple[str, int, float]],
    config: dict[str, list[int]]
) -> dict[str, list[tuple[str, int, float]]]:
    pass

# With type aliases - much clearer
from typing import TypeAlias   # Python 3.10+

Record = tuple[str, int, float]         # Name, age, score
Config = dict[str, list[int]]           # Setting name -> list of values
GroupedRecords = dict[str, list[Record]] # Group name -> records

def process(
    data: list[Record],
    config: Config
) -> GroupedRecords:
    pass
\`\`\`

\`\`\`python
# Python 3.9 style (simple assignment)
Vector = list[float]
Matrix = list[list[float]]
Point2D = tuple[float, float]
Point3D = tuple[float, float, float]
JSON = dict[str, object]

# Python 3.10+ explicit alias
from typing import TypeAlias
Vector: TypeAlias = list[float]

# Usage
def dot_product(v1: Vector, v2: Vector) -> float:
    return sum(a * b for a, b in zip(v1, v2))

def matrix_multiply(a: Matrix, b: Matrix) -> Matrix:
    pass

def distance(p1: Point2D, p2: Point2D) -> float:
    return ((p1[0]-p2[0])**2 + (p1[1]-p2[1])**2) ** 0.5

# Real-world example
UserId = int
ProductId = int
Price = float
Quantity = int
OrderLine = tuple[ProductId, Price, Quantity]
Order = dict[str, object]  # Order metadata
Cart = list[OrderLine]

def add_to_cart(cart: Cart, product_id: ProductId, price: Price, qty: Quantity) -> Cart:
    return cart + [(product_id, price, qty)]

def calculate_total(cart: Cart) -> Price:
    return sum(price * qty for _, price, qty in cart)
\`\`\`

## Variable Annotations - Declare Without Assigning

\`\`\`python
from typing import ClassVar

class Student:
    # Class variable annotation - shared by all instances
    school_name: ClassVar[str] = "Python Academy"
    total_students: ClassVar[int] = 0

    # Instance variable annotations (declared in class body, set in __init__)
    name: str
    age: int
    scores: list[float]
    grade: str | None

    def __init__(self, name: str, age: int) -> None:
        self.name = name         # Fulfills 'name: str' declaration
        self.age = age           # Fulfills 'age: int' declaration
        self.scores = []         # Fulfills 'scores: list[float]'
        self.grade = None        # Fulfills 'grade: str | None'
        Student.total_students += 1

# See all class annotations
print(Student.__annotations__)
# {'school_name': ClassVar[str], 'total_students': ClassVar[int],
#  'name': str, 'age': int, 'scores': list[float], 'grade': str | None}
\`\`\`

## Annotated - Adding Metadata to Types

\`Annotated[type, metadata]\` lets you attach extra information to a type. The type checker uses the first argument (the type), and the rest is metadata that tools or your own code can read.

\`\`\`python
from typing import Annotated

# Add constraints as metadata (not enforced by Python, but readable by tools)
Age = Annotated[int, "must be between 0 and 150"]
Score = Annotated[float, "must be between 0.0 and 100.0"]
Email = Annotated[str, "must contain @ and a domain"]
PositiveInt = Annotated[int, "must be > 0"]

def create_user(
    name: str,
    age: Age,
    score: Score,
    email: Email
) -> dict[str, object]:
    # Can read the annotation metadata at runtime
    return {"name": name, "age": age, "score": score, "email": email}

# Pydantic (popular library) uses Annotated for validation
# from pydantic import Field
# Age = Annotated[int, Field(ge=0, le=150)]

# Access metadata
import typing
hints = typing.get_type_hints(create_user, include_extras=True)
print(hints["age"])     # Annotated[int, 'must be between 0 and 150']
\`\`\`

## Literal - Restrict to Specific Values

\`Literal[v1, v2, v3]\` means the value must be one of the specified literals. Great for string enums, status codes, and mode parameters.

\`\`\`python
from typing import Literal

# Only these exact string values are valid
Direction = Literal["north", "south", "east", "west"]
Status = Literal["pending", "active", "completed", "cancelled"]
Color = Literal["red", "green", "blue"]
HttpMethod = Literal["GET", "POST", "PUT", "DELETE", "PATCH"]

def move(direction: Direction, steps: int) -> str:
    return f"Moved {steps} steps {direction}"

move("north", 5)     # OK
# move("up", 5)      # mypy error: "up" is not in Literal

def create_request(
    url: str,
    method: HttpMethod = "GET",
    status: Status = "pending"
) -> dict[str, str]:
    return {"url": url, "method": method, "status": status}

create_request("https://api.example.com", "POST")  # OK
# create_request("...", "FLYING")  # mypy error!
\`\`\`

\`\`\`python
# Literal with numbers and booleans
from typing import Literal

SuccessCode = Literal[200, 201, 204]
ErrorCode = Literal[400, 401, 403, 404, 500]
Flag = Literal[True, False]   # Same as bool but more restrictive

def handle_response(
    status_code: int,
    expected: SuccessCode
) -> bool:
    return status_code == expected

# Overloading based on literal return type
from typing import overload

@overload
def parse(mode: Literal["int"]) -> int: ...
@overload
def parse(mode: Literal["str"]) -> str: ...
@overload
def parse(mode: Literal["float"]) -> float: ...

def parse(mode):
    if mode == "int": return 42
    if mode == "str": return "hello"
    if mode == "float": return 3.14
\`\`\`

## TypedDict - Dictionary with Known Structure

\`TypedDict\` creates a dictionary type with specific known keys and their types. It is like a struct for dicts.

\`\`\`python
from typing import TypedDict

# Define a TypedDict - all keys are required by default
class UserDict(TypedDict):
    name: str
    age: int
    email: str
    active: bool

# Usage - type checker knows the structure
def create_user(name: str, age: int, email: str) -> UserDict:
    return {
        "name": name,
        "age": age,
        "email": email,
        "active": True
    }

user: UserDict = create_user("Alice", 25, "alice@example.com")
print(user["name"])    # Alice - type checker knows this is str
print(user["age"])     # 25 - type checker knows this is int
# user["unknown"]      # mypy error: 'unknown' is not a valid key
\`\`\`

### Optional Keys in TypedDict

\`\`\`python
from typing import TypedDict, Required, NotRequired

# Python 3.11+: use Required and NotRequired
class ProfileDict(TypedDict):
    name: Required[str]          # Must be present
    age: Required[int]           # Must be present
    bio: NotRequired[str]        # Optional
    avatar_url: NotRequired[str] # Optional

# Python 3.8-3.10: use total=False for all optional
class PartialProfile(TypedDict, total=False):
    bio: str         # All fields optional
    avatar_url: str

# Combine required and optional using inheritance
class BaseProfile(TypedDict):
    name: str    # Required
    age: int     # Required

class FullProfile(BaseProfile, total=False):
    bio: str          # Optional
    avatar_url: str   # Optional

def update_profile(profile: FullProfile) -> None:
    print(f"Updating {profile['name']}")
    if "bio" in profile:
        print(f"Bio: {profile['bio']}")

update_profile({"name": "Alice", "age": 25})  # OK - bio is optional
update_profile({"name": "Bob", "age": 30, "bio": "Developer"})  # Also OK
\`\`\`

\`\`\`python
from typing import TypedDict

# Nested TypedDicts
class AddressDict(TypedDict):
    street: str
    city: str
    country: str
    zip_code: str

class ContactDict(TypedDict):
    name: str
    email: str
    phone: str
    address: AddressDict   # Nested TypedDict

def format_contact(contact: ContactDict) -> str:
    addr = contact["address"]
    return (
        f"{contact['name']} <{contact['email']}>\n"
        f"{addr['street']}, {addr['city']}, {addr['country']}"
    )

contact: ContactDict = {
    "name": "Alice",
    "email": "alice@example.com",
    "phone": "555-1234",
    "address": {
        "street": "123 Main St",
        "city": "London",
        "country": "UK",
        "zip_code": "SW1A 1AA"
    }
}
print(format_contact(contact))
\`\`\`

## Protocol Classes - Structural Subtyping (Duck Typing with Types)

A \`Protocol\` defines what methods/attributes an object must have - without requiring inheritance. This is typed duck typing.

\`\`\`python
from typing import Protocol

# Define what a "readable" object looks like
class Readable(Protocol):
    def read(self) -> str: ...   # Must have a read() method returning str

# Define what a "closeable" object looks like
class Closeable(Protocol):
    def close(self) -> None: ...

# Now ANY class with these methods satisfies the protocol
class FileReader:
    def read(self) -> str:
        return "file content"

class NetworkReader:
    def read(self) -> str:
        return "network data"

class StringReader:
    def read(self) -> str:
        return "string data"

# Works with ANY class that has read() - no inheritance needed!
def process(reader: Readable) -> str:
    return reader.read().upper()

print(process(FileReader()))    # FILE CONTENT
print(process(NetworkReader())) # NETWORK DATA
print(process(StringReader()))  # STRING DATA
\`\`\`

\`\`\`python
from typing import Protocol, runtime_checkable

# @runtime_checkable makes isinstance() work with protocols
@runtime_checkable
class Drawable(Protocol):
    def draw(self) -> None: ...
    def resize(self, factor: float) -> None: ...

class Circle:
    def draw(self) -> None:
        print("Drawing circle")
    def resize(self, factor: float) -> None:
        print(f"Resizing circle by {factor}")

class Square:
    def draw(self) -> None:
        print("Drawing square")
    def resize(self, factor: float) -> None:
        print(f"Resizing square by {factor}")

class NotDrawable:
    def hello(self) -> None:
        print("Hello")

def render_all(shapes: list[Drawable]) -> None:
    for shape in shapes:
        shape.draw()

shapes: list[Drawable] = [Circle(), Square()]
render_all(shapes)

# Runtime check works with @runtime_checkable
print(isinstance(Circle(), Drawable))      # True
print(isinstance(NotDrawable(), Drawable)) # False
\`\`\`

### Protocol with Attributes

\`\`\`python
from typing import Protocol

class Named(Protocol):
    name: str    # Must have a 'name' attribute

class Animal:
    def __init__(self, name: str) -> None:
        self.name = name   # Has 'name' attribute - satisfies Named protocol

class Vehicle:
    def __init__(self, name: str, speed: int) -> None:
        self.name = name   # Has 'name' attribute - also satisfies Named

def greet_named(thing: Named) -> str:
    return f"Hello, {thing.name}!"

print(greet_named(Animal("Rex")))       # Hello, Rex!
print(greet_named(Vehicle("Tesla", 200)))  # Hello, Tesla!
\`\`\`

## Complete Example: Typed API Client

\`\`\`python
from typing import TypedDict, Literal, Optional, Protocol, Any
from typing import TypeVar

# TypedDicts for API responses
class ApiError(TypedDict):
    code: int
    message: str

class User(TypedDict):
    id: int
    name: str
    email: str
    role: Literal["user", "admin", "moderator"]
    active: bool

class PaginatedResponse(TypedDict):
    data: list[User]
    total: int
    page: int
    per_page: int
    has_next: bool

# Type aliases
UserId = int
Token = str
HttpMethod = Literal["GET", "POST", "PUT", "DELETE"]

# Protocol for HTTP clients (allows swapping implementations)
class HttpClient(Protocol):
    def request(
        self,
        method: HttpMethod,
        url: str,
        data: Optional[dict[str, Any]] = None
    ) -> dict[str, Any]: ...

# The actual API client using the protocol
class UserAPI:
    def __init__(self, client: HttpClient, base_url: str, token: Token) -> None:
        self.client = client
        self.base_url = base_url
        self.token = token

    def get_user(self, user_id: UserId) -> Optional[User]:
        try:
            response = self.client.request("GET", f"{self.base_url}/users/{user_id}")
            return response  # type: ignore
        except Exception:
            return None

    def list_users(
        self,
        page: int = 1,
        role: Optional[Literal["user", "admin"]] = None
    ) -> PaginatedResponse:
        params: dict[str, Any] = {"page": page}
        if role:
            params["role"] = role
        response = self.client.request("GET", f"{self.base_url}/users", data=params)
        return response  # type: ignore

    def create_user(
        self,
        name: str,
        email: str,
        role: Literal["user", "admin", "moderator"] = "user"
    ) -> User:
        data = {"name": name, "email": email, "role": role}
        response = self.client.request("POST", f"{self.base_url}/users", data=data)
        return response  # type: ignore

# Mock client satisfies HttpClient protocol
class MockHttpClient:
    def request(
        self,
        method: HttpMethod,
        url: str,
        data: Optional[dict[str, Any]] = None
    ) -> dict[str, Any]:
        print(f"[MOCK] {method} {url} {data or ''}")
        return {"id": 1, "name": "Alice", "email": "alice@example.com",
                "role": "admin", "active": True}

api = UserAPI(MockHttpClient(), "https://api.example.com", "token123")
user = api.get_user(1)
if user:
    print(f"Found: {user['name']} ({user['role']})")
\`\`\`

Output:
\`\`\`
[MOCK] GET https://api.example.com/users/1
Found: Alice (admin)
\`\`\`

> [!TIP]
> Use \`TypedDict\` instead of plain \`dict\` when a dictionary has a known, fixed structure - it gives you autocompletion and error checking on key access. Use \`Literal\` for parameters that can only be specific values (like modes, statuses, directions). Use \`Protocol\` for duck typing with type safety - it lets you specify WHAT methods an object needs without requiring inheritance.`,
  objectives: [
    "Create type aliases to give complex types readable names.",
    "Use Annotated to attach metadata to type hints.",
    "Use Literal to restrict values to specific constants.",
    "Define TypedDict classes for dictionaries with known structure.",
    "Use Protocol to express structural typing (typed duck typing)."
  ],
  difficulty: "advanced",
  xpReward: 75,
};