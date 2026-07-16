export const compositionVsInheritanceLesson = {
  title: "Composition vs Inheritance",
  slug: "composition-vs-inheritance",
  content: `# Composition vs Inheritance

Inheritance and composition are two reuse strategies answering different questions: inheritance means "B *is a kind of* A" and shares its identity, while composition means "B *uses* an A as one of its parts." The pitfall is forcing an IS-A relationship just to borrow a method, reaching for inheritance when the objects are only loosely related and HAS-A would be more honest and flexible.

## The Key Question

When designing classes, you face a choice: should class B **inherit from** class A (B IS-A A), or should class B **contain** class A (B HAS-A A)?

\`\`\`
Inheritance = "IS-A" relationship
  - A Dog IS-A Animal
  - A Manager IS-A Employee
  - A Circle IS-A Shape

Composition = "HAS-A" relationship
  - A Car HAS-A Engine
  - A Library HAS-A Book (many)
  - A Student HAS-A GradeBook
\`\`\`

## What is Composition?

**Composition** means a class contains instances of other classes as attributes, rather than inheriting from them. The container delegates work to the contained objects.

\`\`\`python
# Inheritance approach
class Animal:
    def __init__(self, name):
        self.name = name

    def breathe(self):
        return "breathing"

class Dog(Animal):    # Dog IS-A Animal
    def bark(self):
        return "Woof!"

# Composition approach
class Legs:
    def __init__(self, count):
        self.count = count

    def walk(self):
        return f"walking on {self.count} legs"

class Voice:
    def __init__(self, sound):
        self.sound = sound

    def make_sound(self):
        return self.sound

class Dog:            # Dog HAS-A Legs, HAS-A Voice
    def __init__(self, name):
        self.name = name
        self.legs = Legs(4)        # Composition
        self.voice = Voice("Woof") # Composition

    def walk(self):
        return f"{self.name} is {self.legs.walk()}"

    def speak(self):
        return f"{self.name} says: {self.voice.make_sound()}"

dog = Dog("Rex")
print(dog.walk())    # Rex is walking on 4 legs
print(dog.speak())   # Rex says: Woof
\`\`\`

## Why Composition is Often Better

### Problem with Inheritance: Tight Coupling

\`\`\`python
# Inheritance creates TIGHT coupling - changing parent breaks children
class Employee:
    def __init__(self, name, salary):
        self.name = name
        self.salary = salary

    def get_salary(self):
        return self.salary

    def work(self):
        return f"{self.name} is working"

class Manager(Employee):
    def __init__(self, name, salary, bonus):
        super().__init__(name, salary)
        self.bonus = bonus

    def get_salary(self):
        return self.salary + self.bonus  # Uses parent's self.salary

# If we rename salary to base_pay in Employee, Manager breaks!
# All subclasses break when parent changes
\`\`\`

### Composition: Loosely Coupled

\`\`\`python
class SalaryCalculator:
    def __init__(self, base, bonus=0):
        self.base = base
        self.bonus = bonus

    def total(self):
        return self.base + self.bonus

    def with_bonus(self, amount):
        return SalaryCalculator(self.base, self.bonus + amount)

class Employee:
    def __init__(self, name, salary_calculator):
        self.name = name
        self.salary = salary_calculator   # HAS-A relationship

    def get_total_pay(self):
        return self.salary.total()    # Delegate to the calculator

# Can easily swap different salary calculation strategies
standard_calc = SalaryCalculator(75000)
manager_calc = SalaryCalculator(100000, 25000)

emp = Employee("Alice", standard_calc)
mgr = Employee("Bob", manager_calc)

print(emp.get_total_pay())   # 75000
print(mgr.get_total_pay())   # 125000

# Want a raise? Just change the calculator
emp.salary = emp.salary.with_bonus(5000)
print(emp.get_total_pay())   # 80000
\`\`\`

## Real-World Example: Car System

\`\`\`python
# Bad: Deep inheritance hierarchy
class Vehicle:
    pass
class MotorVehicle(Vehicle):
    pass
class Car(MotorVehicle):
    pass
class ElectricCar(Car):
    pass
class LuxuryElectricCar(ElectricCar):
    pass
# Adding features means modifying inheritance chain - fragile!

# Good: Composition
class Engine:
    def __init__(self, type_, hp):
        self.type_ = type_
        self.hp = hp

    def start(self):
        return f"{self.type_} engine started ({self.hp}hp)"

    def __str__(self):
        return f"{self.type_} engine ({self.hp}hp)"

class Battery:
    def __init__(self, capacity_kwh):
        self.capacity_kwh = capacity_kwh
        self.charge_level = 100

    def charge(self, percent):
        self.charge_level = min(100, self.charge_level + percent)

    def __str__(self):
        return f"{self.capacity_kwh}kWh battery ({self.charge_level}% charged)"

class GPS:
    def navigate(self, destination):
        return f"Navigating to {destination}"

class AudioSystem:
    def __init__(self, brand):
        self.brand = brand

    def play(self, song):
        return f"{self.brand} playing: {song}"

class Car:
    def __init__(self, make, model):
        self.make = make
        self.model = model
        self.engine = None
        self.battery = None
        self.gps = None
        self.audio = None

    def add_engine(self, engine):
        self.engine = engine
        return self

    def add_battery(self, battery):
        self.battery = battery
        return self

    def add_gps(self):
        self.gps = GPS()
        return self

    def add_audio(self, brand):
        self.audio = AudioSystem(brand)
        return self

    def start(self):
        if self.engine:
            return self.engine.start()
        elif self.battery:
            return f"Silent electric start ({self.battery})"
        return "No power source!"

    def navigate_to(self, dest):
        if self.gps:
            return self.gps.navigate(dest)
        return "No GPS installed"

    def __str__(self):
        return f"{self.make} {self.model}"

# Build different cars by composing components
gas_car = (Car("Toyota", "Corolla")
           .add_engine(Engine("Petrol", 140))
           .add_gps()
           .add_audio("Sony"))

electric_car = (Car("Tesla", "Model 3")
                .add_battery(Battery(75))
                .add_gps()
                .add_audio("Premium"))

print(gas_car.start())           # Petrol engine started (140hp)
print(electric_car.start())      # Silent electric start (75kWh battery (100% charged))
print(gas_car.navigate_to("London"))   # Navigating to London
print(electric_car.audio.play("Song")) # Premium playing: Song
\`\`\`

## When to Use Inheritance vs Composition

\`\`\`python
# USE INHERITANCE when:
# 1. True IS-A relationship (Dog IS-A Animal)
class Animal:
    def breathe(self): pass

class Dog(Animal):    # Correct: Dog IS-A Animal
    def bark(self): pass

# 2. You want to specialize existing behavior
class Shape:
    def area(self): return 0

class Circle(Shape):  # Correct: Circle IS-A Shape
    def area(self):
        return math.pi * self.radius ** 2

# USE COMPOSITION when:
# 1. HAS-A relationship (Car HAS-A Engine)
class Car:
    def __init__(self):
        self.engine = Engine()  # HAS-A: better than Car inheriting Engine

# 2. You want to reuse functionality without IS-A
class EmailSender:
    def send(self, to, message): pass

class UserNotifier:
    def __init__(self):
        self.email = EmailSender()   # HAS-A, not IS-A

    def notify(self, user, msg):
        self.email.send(user.email, msg)

# 3. You need multiple behaviors (Python supports multiple inheritance,
#    but composition is often cleaner for complex cases)
class LoggingMixin:
    def log(self, msg): print(f"LOG: {msg}")

class ValidationMixin:
    def validate(self, data): pass

# Mixin via inheritance (acceptable)
class Service(LoggingMixin, ValidationMixin):
    pass

# Composition alternative (sometimes cleaner)
class Service:
    def __init__(self):
        self.logger = Logger()
        self.validator = Validator()
\`\`\`

## The "Fragile Base Class" Problem

\`\`\`python
# The fragile base class problem with inheritance
class Stack(list):   # Stack IS-A list (inheriting from list)
    def push(self, item):
        self.append(item)

    def pop(self):
        return super().pop()

s = Stack()
s.push(1)
s.push(2)
s.push(3)

# BUG: list.extend bypasses our push logic!
s.extend([4, 5, 6])   # Works, but if push had validation/logging, it's bypassed!
print(s)               # [1, 2, 3, 4, 5, 6]

# Better: composition
class Stack:
    def __init__(self):
        self._items = []   # HAS-A list, not IS-A list

    def push(self, item):
        # We control ALL modifications through our methods
        self._items.append(item)

    def pop(self):
        if not self._items:
            raise IndexError("Stack is empty")
        return self._items.pop()

    def peek(self):
        if not self._items:
            raise IndexError("Stack is empty")
        return self._items[-1]

    def __len__(self):
        return len(self._items)

    def __str__(self):
        return f"Stack({self._items})"

s = Stack()
s.push(1)
s.push(2)
# s.extend([3,4])  # AttributeError! Can't bypass our interface
\`\`\`

## Practical Example: Game Character System

\`\`\`python
# Using composition to build flexible game characters

class Health:
    def __init__(self, max_hp):
        self.max_hp = max_hp
        self.current_hp = max_hp

    def take_damage(self, amount):
        self.current_hp = max(0, self.current_hp - amount)

    def heal(self, amount):
        self.current_hp = min(self.max_hp, self.current_hp + amount)

    def is_alive(self):
        return self.current_hp > 0

    def __str__(self):
        return f"HP: {self.current_hp}/{self.max_hp}"

class Weapon:
    def __init__(self, name, damage, weapon_type):
        self.name = name
        self.damage = damage
        self.type = weapon_type

    def attack(self):
        return self.damage

    def __str__(self):
        return f"{self.name} ({self.damage} dmg)"

class MagicAbility:
    def __init__(self, spell_name, mana_cost, damage):
        self.spell_name = spell_name
        self.mana_cost = mana_cost
        self.damage = damage
        self.mana = 100

    def cast(self):
        if self.mana < self.mana_cost:
            return 0, "Not enough mana!"
        self.mana -= self.mana_cost
        return self.damage, f"Casts {self.spell_name}!"

class Character:
    def __init__(self, name, max_hp):
        self.name = name
        self.health = Health(max_hp)    # HAS-A Health
        self.weapon = None               # Optional weapon
        self.magic = None                # Optional magic

    def equip_weapon(self, weapon):
        self.weapon = weapon

    def learn_magic(self, ability):
        self.magic = ability

    def attack(self, target):
        if not self.weapon:
            damage = 5   # Bare hands
            print(f"{self.name} punches for {damage} damage")
        else:
            damage = self.weapon.attack()
            print(f"{self.name} attacks with {self.weapon} for {damage} damage")
        target.health.take_damage(damage)

    def cast_spell(self, target):
        if not self.magic:
            print(f"{self.name} has no magic!")
            return
        damage, message = self.magic.cast()
        print(f"{self.name} {message} for {damage} damage")
        target.health.take_damage(damage)

    def __str__(self):
        return f"{self.name}: {self.health}"

# Build different character types through composition
warrior = Character("Arthur", 150)
warrior.equip_weapon(Weapon("Excalibur", 40, "sword"))

mage = Character("Merlin", 80)
mage.equip_weapon(Weapon("Staff", 15, "staff"))
mage.learn_magic(MagicAbility("Fireball", 20, 60))

print("=== Battle! ===")
print(warrior)
print(mage)
print()

warrior.attack(mage)
print(mage)
mage.cast_spell(warrior)
print(warrior)
warrior.attack(mage)
print(mage)
\`\`\`

Output:
\`\`\`
=== Battle! ===
Arthur: HP: 150/150
Merlin: HP: 80/80

Arthur attacks with Excalibur (40 dmg) for 40 damage
Merlin: HP: 40/80
Merlin Casts Fireball! for 60 damage
Arthur: HP: 90/150
Arthur attacks with Excalibur (40 dmg) for 40 damage
Merlin: HP: 0/80
\`\`\`

## Golden Rule

\`\`\`
Prefer Composition over Inheritance

When in doubt:
- Inheritance: "Is this genuinely an IS-A relationship?"
              "Will my child class be used everywhere the parent is?"
- Composition: "Does this class USE another class?"
              "Do I need flexibility to swap implementations?"

Famous quote: "Favor object composition over class inheritance"
                                          - Gang of Four Design Patterns
\`\`\`

> [!TIP]
> Inheritance is powerful but creates tight coupling. Composition is more flexible and easier to change. The best advice: when in doubt, use composition. You can always refactor to inheritance later, but untangling deep inheritance hierarchies is painful.`,
  objectives: [
    "Understand the difference between IS-A (inheritance) and HAS-A (composition) relationships.",
    "Implement composition by containing instances of other classes.",
    "Know when to choose composition over inheritance.",
    "Recognize the fragile base class problem that comes with inheritance.",
    "Build flexible systems using composition to combine behaviors."
  ],
  difficulty: "intermediate",
  xpReward: 65,
};