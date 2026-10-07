# Development Roadmap

The repository is in the design stage. All implementation milestones below are
pending; their order expresses dependencies, not release dates.

## 1. Core interpreter

- Establish the Python package, supported Python versions, and test runner.
- Implement tokens, source locations, and lexical diagnostics.
- Define the grammar and AST, then implement the parser.
- Implement bindings, arithmetic, comparisons, control flow, and built-in output.
- Add script execution and an interactive REPL.

Completion means that the initial example in the [language design](language.md)
runs, invalid input produces useful diagnostics, and automated tests cover each
stage of the execution pipeline.

## 2. Functions and collections

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

## 4. Execution experiments

Possible work after a stable interpreter and baseline measurements:

- A bytecode compiler and stack-based virtual machine.
- Comparisons against the tree-walking runtime using the same programs.
- An explicit heap and garbage collector if a future VM needs them; the initial
  runtime relies on Python's memory management.
- Profiling and specialization of frequently executed paths.
- Python-generated execution paths and, separately, optional platform-specific
  native code generation.

These experiments have no promised performance outcome. Native code generation
would require revisiting portability and runtime dependency constraints.

## 5. Language extensions

Possible extensions after functions and closures are stable:

- Higher-order functions such as `map`, `filter`, and `reduce`.
- Anonymous functions and expression-valued conditionals and blocks.
- Immutable bindings and an explicit approach to side effects.
- Pattern matching and algebraic data types.
- Pipelines, composition, currying, and partial application.
- Tail-call optimization.

Language extensions can target the tree-walking runtime independently of the
execution experiments. Each extension needs a design, implementation, tests,
and updated language documentation before it is considered supported.
