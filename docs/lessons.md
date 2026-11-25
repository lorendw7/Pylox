# Lesson Plan

Status: proposed. No lessons have been completed and no code exists yet.

This document divides the [development roadmap](roadmap.md) into lessons. The
roadmap defines what is built and in what order; this plan defines the size of
each step.

## Assumptions

- One lesson is about two hours of focused work.
- Each lesson ends with working code, passing tests, and updated documentation
  for anything that became supported.
- Lesson counts are estimates. Expect the total to vary by about a quarter in
  either direction, with the C lessons the least predictable.

## Summary

| Milestone | Language | Lessons | Running total |
| --- | --- | --- | --- |
| 1. Core interpreter | Python | 12 | 12 |
| 2. Functions and collections | Python | 8 | 20 |
| 3. Runtime quality | Python | 4 | 24 |
| 4. Expressive language features | Python, Pylox | 8 | 32 |
| 5. Bytecode compiler and virtual machine | Python, C | 18 | 50 |
| 6. Generators and tail calls | C, Python | 5 | 55 |
| 7. Static type inference | Python | 6 | 61 |
| 8. Backend experiment | Depends on choice | 6 to 8 | 67 to 69 |

Milestones 1 through 7 take about 61 lessons. With the backend experiment the
plan takes about 67 to 69 lessons. Useful stopping points:

- After lesson 12, scripts and the REPL run the initial language.
- After lesson 20, the language has functions, closures, and collections.
- After lesson 50, the same programs run on the Python interpreter and the C
  virtual machine.

## 1. Core interpreter (12 lessons)

| Lesson | Topic | Result |
| --- | --- | --- |
| 1 | Language decisions | The open decisions in the language design are settled: numbers, truthiness, scope, newlines |
| 2 | Project setup and tokens | Python package, test runner, token kinds, source locations |
| 3 | Lexer | Source text becomes tokens: numbers, strings, identifiers, operators, newlines |
| 4 | Lexical diagnostics | Malformed input reports an error with its location; lexer test suite is complete |
| 5 | Grammar and AST | Written grammar and the expression and statement node classes |
| 6 | Parsing expressions | Recursive descent with precedence and grouping |
| 7 | Parsing statements | `let`, assignment, blocks, `if`, `while`, statement boundaries, syntax errors |
| 8 | Evaluating expressions | Arithmetic and comparisons produce values; runtime errors carry locations |
| 9 | Bindings and scope | Environments, `let`, assignment, block scope |
| 10 | Control flow and output | `if`/`else`, `while`, and the built-in `print`; the initial example runs |
| 11 | Script execution | Command-line entry point, exit status, error rendering without tracebacks |
| 12 | REPL | Interactive session with state that persists across inputs |

## 2. Functions and collections (8 lessons)

| Lesson | Topic | Result |
| --- | --- | --- |
| 13 | Function declarations and calls | `fn` syntax, arguments, arity checks |
| 14 | Returns and recursion | `return`, call depth, recursive functions |
| 15 | Closures | Functions capture bindings from enclosing scopes |
| 16 | Resolver, part 1 | A pass that resolves each name to its scope before execution |
| 17 | Resolver, part 2 | Static checks such as use before declaration and invalid `return` |
| 18 | Arrays | Literals, indexing, assignment to elements, bounds errors |
| 19 | Dictionaries | Literals, lookup, insertion, missing-key behavior |
| 20 | Logical operators and `for` | Short-circuit operators and iteration over collections |

## 3. Runtime quality (4 lessons)

| Lesson | Topic | Result |
| --- | --- | --- |
| 21 | End-to-end tests | A directory of test programs with expected output and exit status |
| 22 | Diagnostics | Clearer messages, source excerpts, multi-line input in the REPL |
| 23 | Continuous integration | Tests run automatically on the declared Python versions and systems |
| 24 | Baseline measurements | Representative workloads and recorded timings |

## 4. Expressive language features (8 lessons)

| Lesson | Topic | Result |
| --- | --- | --- |
| 25 | Anonymous functions | Function expressions usable as values and arguments |
| 26 | Prelude | `map`, `filter`, and `reduce` written in Pylox and loaded at startup |
| 27 | Pattern matching, part 1 | `match` over literals and bindings |
| 28 | Pattern matching, part 2 | Array and dictionary patterns |
| 29 | Pattern matching, part 3 | Unmatched cases, diagnostics, and tests |
| 30 | Pipelines | A value passes through a chain of calls |
| 31 | String interpolation | Expressions embedded in string literals |
| 32 | Destructuring and ranges | Several names bound from one collection; compact integer sequences |

## 5. Bytecode compiler and virtual machine (18 lessons)

| Lesson | Topic | Language | Result |
| --- | --- | --- | --- |
| 33 | Bytecode format | Python | Specified instruction set, constant pool, file layout, version number |
| 34 | Compiling expressions | Python | Arithmetic and comparisons become stack instructions |
| 35 | Compiling statements | Python | Variables, blocks, and jumps for `if` and `while` |
| 36 | Compiling functions | Python | Function objects, calls, and returns |
| 37 | Compiling closures | Python | Captured variables resolved at compile time |
| 38 | C project setup | C | Build files, the value representation, a generated opcode header |
| 39 | Bytecode loader | C | The executable reads and validates a bytecode file |
| 40 | Dispatch loop | C | Arithmetic and comparison instructions execute; `print` works |
| 41 | Variables and control flow | C | Globals, locals, and jumps |
| 42 | Calls and frames | C | Call frames, arguments, returns, stack traces for runtime errors |
| 43 | Closures, part 1 | C | Captured variables that live on the stack |
| 44 | Closures, part 2 | C | Captured variables that outlive their function |
| 45 | Strings and hash tables | C | Heap strings, interning, and a hash table |
| 46 | Arrays and dictionaries | C | Collection objects and their instructions |
| 47 | Garbage collector, part 1 | C | Marking from roots and sweeping unreachable objects |
| 48 | Garbage collector, part 2 | C | Stress mode, collection thresholds, memory checker runs clean |
| 49 | Milestone 4 features | Python, C | Pattern matching, pipelines, and the prelude run on the virtual machine |
| 50 | Differential tests | Python | Every test program runs on both runtimes in CI; timings recorded for both |

## 6. Generators and tail calls (5 lessons)

| Lesson | Topic | Language | Result |
| --- | --- | --- | --- |
| 51 | Generator semantics | Python | Specified `yield` behavior; compiler support |
| 52 | Generators, part 1 | C | A generator suspends and resumes on its own stack |
| 53 | Generators, part 2 | C | Generators in `for` loops, completion, and collection by the garbage collector |
| 54 | Generators in the interpreter | Python | Thread-based generators with matching behavior |
| 55 | Tail calls | C, Python | Frame reuse in the virtual machine and a trampoline in the interpreter |

## 7. Static type inference (6 lessons)

| Lesson | Topic | Result |
| --- | --- | --- |
| 56 | Types and unification | Type representation, type variables, and the unification algorithm |
| 57 | Inferring expressions | Literals, operators, and variables |
| 58 | Inferring functions | Parameter and return types, recursion |
| 59 | Generic functions | One function used at several types |
| 60 | Collections and annotations | Homogeneous arrays and dictionaries; optional annotations checked |
| 61 | Integration | The optional check on the command line, with readable type errors |

## 8. Backend experiment (6 to 8 lessons)

The lessons are planned once the experiment is chosen. Rough sizes:

| Choice | Lessons |
| --- | --- |
| Native backend through LLVM IR | 6 |
| WebAssembly backend | 6 |
| JIT to x86-64 machine code in C | 8 |

## Related documents

- [Language design](language.md)
- [Architecture](architecture.md)
- [Development roadmap](roadmap.md)
