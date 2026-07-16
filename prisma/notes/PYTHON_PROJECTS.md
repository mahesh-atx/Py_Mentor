# PyMentor — Practice Projects by Phase

One project per concept is good; building something end-to-end cements it. Pick the ones that interest you and extend them.

## Phase 1 — Foundations (Modules 1.1–1.5)
*Getting Started, Variables & Data Types, Operators, Control Flow, Loops*

1. **Tip Calculator** — Read bill, tip %, and party size; compute per-person share. Practices variables, operators, f-strings, rounding.
2. **Number Guessing Game** — Computer picks a secret number; player guesses with "too high / too low" hints using `if/elif/else` and a `while` loop.
3. **Grade Classifier** — Input a score (0–100); print letter grade with nested `if` and a ternary for the pass/fail label.
4. **Multiplication Table Generator** — For a given `n`, print its `1..12` table using a `for` loop and f-string alignment.
5. **FizzBuzz Variants** — Print 1–100, replacing multiples of 3/5 with Fizz/Buzz; add a `match/case` version and a custom rule.
6. **Simple ATM Simulator** — Menu loop (check balance, deposit, withdraw) with a max-withdrawal guard using control flow + loops.

## Phase 2 — Core Python (Modules 2.1–2.5)
*Data Structures, Functions, String Manipulation, File Handling, Error Handling*

1. **Contacts Manager (CLI)** — Store contacts in a `dict`; add/search/delete; persist to a JSON file with `try/except` for missing/corrupt files.
2. **Word Frequency Counter** — Read a text file, clean it with string methods, count word frequencies in a `dict`/`Counter`, print top 10.
3. **To-Do List with File Persistence** — Tasks as a `list` of `dict`s; save/load from a file; handle `IndexError` on bad IDs gracefully.
4. **Custom `stats` Module** — Write functions `mean/median/mode/variance`; raise `ValueError` on empty input; reuse across a small driver script.
5. **Log Analyzer** — Parse a log file line by line; extract levels (INFO/WARN/ERROR) with regex/string ops; report counts and the first error.
6. **Quiz Bank from CSV** — Load questions from a CSV, ask them in random order, score the user, and `assert` the file shape on load.

## Phase 3 — Object-Oriented Python (Modules 3.1–3.2)
*OOP Fundamentals, OOP Pillars*

1. **Bank Account Hierarchy** — `Account` base class with `SavingsAccount`/`CheckingAccount` subclasses; override interest/withdrawal rules (inheritance + polymorphism).
2. **Library System** — `Book`, `Member`, `Library` classes; borrow/return with encapsulation (`__balance`-style private state) and composition (Library *has* many Books).
3. **Shape Calculator** — `Shape` base with `area()`/`perimeter()`; `Circle`, `Rectangle`, `Triangle` override them; iterate a list polymorphically.
4. **Inventory & Product Model** — `Product` with `__str__`/`__repr__` and rich comparison (`__lt__`); sort a catalog by price/stock.
5. **Task Tracker (OOP)** — `Task` with status; `Project` composes tasks; compute progress %; use `@property` for derived state.
6. **Mini Game (e.g., Rock-Paper-Scissors or Blackjack)** — `Player` and `Dealer`/`Computer` classes; encapsulate state; polymorphism for move resolution.

## Stretch / Capstone Ideas (combine phases)
- **Expense Tracker** — OOP + file persistence + error handling + a CLI menu (Phase 2 + 3).
- **Text Adventure Game** — Rooms as objects, player state, save/load to file (Phase 2 + 3).
- **Markdown Notes App** — Parse notes with string ops, store as objects, export to HTML (Phase 2 + 3).
