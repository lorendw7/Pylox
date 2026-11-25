# Development Roadmap

The repository is in the design stage. All implementation milestones below are
pending; their order expresses dependencies, not release dates.

## Division of work

Python is the main implementation language. Other languages implement specific
components behind a documented boundary.

| Part | Language | Role |
| --- | --- | --- |
| Front end: lexer, parser, resolver, type checker | Python | Understands and checks programs |
| Tree-walking interpreter | Python | Reference implementation of the language semantics |
| Bytecode compiler | Python | Translates the AST into the bytecode format |
| Bytecode virtual machine | C | Executes bytecode produced by the Python compiler |
| Garbage collector | C | Manages the virtual machine's heap |
| Prelude (standard library functions) | Pylox | Library functions written in the language itself |

The bytecode format is the only contract between the Python and C parts. See the
[architecture](architecture.md) for the boundary and the reasons for choosing C.

## 1. Core interpreter (Python)

- Establish the Python package, supported Python versions, and test runner.
- Implement tokens, source locations, and lexical diagnostics.
- Define the grammar and AST, then implement the parser.
- Implement bindings, arithmetic, comparisons, control flow, and built-in output.
- Add script execution and an interactive REPL.

Completion means that the initial example in the [language design](language.md)
runs, invalid input produces useful diagnostics, and automated tests cover each
stage of the execution pipeline.

## 2. Functions and collections (Python)

- Specify and implement `fn`, calls, returns, lexical scope, and closures.
- Add a resolver for lexical bindings and applicable static checks.
- Specify and implement arrays, indexing, and dictionaries.
- Extend control flow with logical operators and `for` loops.

Completion requires tests for captured bindings, recursion, collection behavior,
and failure cases, plus documentation of the supported syntax and semantics.

## 3. Runtime quality

- Expand regression tests and end-to-end command-line coverage.
- Refine diagnostics and interactive input handling.
- Add CI for the declared Python versions and operating systems.
- Establish representative workloads and baseline measurements.

Testing and diagnostics start in the first milestone; this milestone expands
coverage and operational reliability after the core language exists.

## 4. Expressive language features (Python)

- Anonymous functions and a prelude written in Pylox that provides `map`,
  `filter`, and `reduce`.
- Pattern matching with `match` over literals, arrays, and dictionaries.
- Pipelines for chaining calls.
- String interpolation, destructuring bindings, and ranges.

Each feature needs a design in the language document, an implementation in the
tree-walking interpreter, and tests before it is considered supported. The
interpreter at the end of this milestone is the reference for the virtual
machine.

## 5. Bytecode compiler (Python) and virtual machine (C)

- Specify the bytecode format: instruction set, constant pool, function
  representation, file layout, and a version number.
- Implement the compiler from AST to bytecode in Python.
- Implement the virtual machine in C as a standalone executable that reads
  bytecode files: bytecode loader, value representation, instruction dispatch
  loop, call frames, closures, and runtime errors.
- Run the executable as a subprocess from the Python command-line entry point.
- Implement a mark-and-sweep garbage collector in C.
- Add differential tests that run the same programs through the tree-walking
  interpreter and the virtual machine and compare output and exit status.
- Add the C build and the differential tests to CI.

Completion means every supported language feature runs on both runtimes with
identical observable behavior, and the baseline workloads from milestone 3 have
measurements for both.

## 6. Generators and tail calls (C and Python)

- Generators and coroutines: functions that suspend with `yield` and resume
  later. The virtual machine gives each its own stack; the tree-walking
  interpreter runs each in its own Python thread.
- Tail-call optimization so that tail-recursive functions run in constant stack
  space. The virtual machine reuses the call frame; the tree-walking interpreter
  uses a trampoline.

The semantics are specified in the language document first. Both runtimes
implement both features so that they are covered by differential tests.

## 7. Static type inference (Python)

- Infer types without mandatory annotations and report type errors before
  execution (Hindley-Milner style inference).
- Accept optional annotations and check them against the inferred types.
- Require homogeneous arrays and dictionaries; provide no dynamic `any` type.
- Run as an optional pass after resolution. Unchecked programs still run, and
  the checker never changes runtime behavior.

The rules are recorded in the [language design](language.md).

## 8. Backend experiment

One of the following, chosen after the virtual machine is stable:

- A simple JIT in C that translates frequently executed bytecode to x86-64
  machine code.
- A native backend: Python emits textual LLVM IR and `clang` produces an
  executable.
- A WebAssembly backend: Python emits WebAssembly so programs run in a browser.

These experiments have no promised performance outcome. Each adds toolchain or
platform requirements that must be documented before work starts.

## Unscheduled extensions

Possible work with no position in the sequence:

- A C foreign function interface (`extern fn`) for calling shared libraries.
- Compile-time evaluation of marked code using the Python interpreter.
- Units of measure checked by the type checker.
- Algebraic data types and immutable bindings.
- Currying, partial application, and function composition.
- Green threads with channels, scheduled by the virtual machine.
- Time-travel debugging in the virtual machine.
- A generational or copying garbage collector, compared against mark-and-sweep.
- Macros, algebraic effects, or continuations. Each reshapes the language
  design, so at most one of the three should be attempted.

Each extension needs a design, implementation, tests, and updated language
documentation before it is considered supported.
