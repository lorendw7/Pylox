# Architecture

Status: proposed. No components have been implemented.

## Goals

Pylox is a personal programming language project implemented mainly in Python.
Python owns the front end, the reference interpreter, and the bytecode compiler.
A bytecode virtual machine and its garbage collector are planned in C.

The initial implementation targets a small scripting language and a
tree-walking execution model in Python with no third-party runtime dependencies.
The design separates source processing from execution so each component can be
tested independently.

## Language division

| Part | Language | Reason |
| --- | --- | --- |
| Lexer, parser, resolver, type checker | Python | Program analysis is easiest to write, test, and change in Python |
| Tree-walking interpreter | Python | Defines the language semantics; Python manages its memory |
| Bytecode compiler | Python | Shares the AST and diagnostics with the rest of the front end |
| Virtual machine and garbage collector | C | Needs direct control over memory layout, stacks, and pointers |
| Prelude | Pylox | Library functions exercise the language itself |

C was chosen over Rust, Zig, C++, and Go for the virtual machine because a
garbage collector needs unrestricted pointer manipulation, the C toolchain is
stable and widely available, and Python's standard library can load C shared
libraries through `ctypes` without third-party packages.

The standard-library-only constraint applies to both sides: the Python code uses
only the Python standard library, and the C code uses only the C standard
library. Building the virtual machine will require a C compiler; running the
Python interpreter will not.

## Execution pipeline

```text
Source text -> Lexer -> Tokens -> Parser -> AST -> Resolver -> Type checker
                                                                    |
                         +------------------------------------------+
                         |                                          |
                         v                                          v
              Tree-walking interpreter                      Bytecode compiler
                     (Python)                                   (Python)
                         |                                          |
                         v                                          v
                      Result                                 Bytecode file
                                                                    |
                                                                    v
                                                      Virtual machine + GC (C)
                                                                    |
                                                                    v
                                                                 Result
```

The first milestone implements only the lexer, parser, and tree-walking
interpreter. The resolver arrives with functions and closures. The type checker,
bytecode compiler, and virtual machine arrive in later milestones; see the
[roadmap](roadmap.md).

## Component boundaries

The following paths are planned, not existing modules.

### Python package

| Path | Responsibility |
| --- | --- |
| `pylox/tokens.py` | Token kinds, source lexemes, literal values, and source locations |
| `pylox/lexer.py` | Character scanning, comments, newlines, and lexical diagnostics |
| `pylox/ast_nodes.py` | Expression and statement data structures |
| `pylox/parser.py` | Recursive-descent parsing, precedence, and syntax diagnostics |
| `pylox/environment.py` | Variable bindings, lookup, assignment, and enclosing scopes |
| `pylox/interpreter.py` | AST evaluation and runtime operations |
| `pylox/errors.py` | Structured language diagnostics |
| `pylox/resolver.py` | Future lexical binding and static semantic checks |
| `pylox/typecheck.py` | Future static type inference |
| `pylox/bytecode.py` | Future instruction set definition and bytecode file serialization |
| `pylox/compiler.py` | Future translation from AST to bytecode |
| `pylox/prelude/` | Future library functions written in Pylox |
| `pylox/repl.py` | Interactive input and persistent session state |
| `pylox/__main__.py` | Command-line entry point and script execution |

### C virtual machine

| Path | Responsibility |
| --- | --- |
| `vm/` | Future C sources and build files for the virtual machine |

The virtual machine is expected to contain a bytecode loader, a value and object
representation, an instruction dispatch loop with call frames, a garbage
collector, and a command-line entry point. File names are left to the
implementation.

Modules should be added with their implementation and tests. Empty scaffolding is
not required to establish the design.

## Data and error contracts

- Tokens retain their exact lexeme, parsed literal value where applicable, and
  starting source location. Token locations remain anchored to their start even
  when a string spans several lines.
- The lexer emits significant newlines and one final EOF token. Comments do not
  consume the newline that terminates them.
- The parser constructs an AST without executing user code. Operator precedence
  and statement boundaries belong to the parser.
- Runtime environments own bindings; AST nodes represent syntax rather than
  mutable execution state.
- Language errors should carry a message and source location. The command-line
  boundary renders them without exposing a Python traceback for expected user
  errors. Unexpected implementation failures must remain diagnosable.

## Bytecode contract

The bytecode format is the only interface between the Python and C parts. The C
code does not read source text or the AST.

- The format carries a version number. The virtual machine rejects a file whose
  version it does not support.
- The instruction set is defined in one place. The C header for opcodes should be
  generated from the Python definition rather than maintained by hand.
- Bytecode retains source locations so that runtime errors from the virtual
  machine report the same positions as the tree-walking interpreter.
- Both runtimes must produce the same output, the same error messages, and the
  same exit status for the same program.

### Virtual machine form

The virtual machine is a standalone executable. The Python compiler writes a
bytecode file and the command-line entry point runs the executable on it as a
subprocess.

- A crash in C code ends the subprocess only; the Python side can still report
  the failure.
- The executable can run directly under a debugger, a memory checker, or an
  address sanitizer.
- Both runtimes present the same shape to tests: one command, its output, and
  its exit status.

The C code keeps the runtime core separate from a thin `main` entry point, so a
shared library loaded through `ctypes` can be added later without restructuring.
A shared library is not part of the planned work.

### Open decisions

- The value representation in C, such as tagged unions or NaN boxing.
- How built-in functions and the prelude are provided to the virtual machine.

## Reference interpreter parity

The tree-walking interpreter implements every supported language feature,
including those motivated by the virtual machine, so that all features can be
tested differentially. It aims for correct semantics, not speed.

- Tail calls use a trampoline: a call in tail position returns a pending-call
  object that the calling loop executes, so tail recursion does not grow the
  Python stack.
- Each generator runs in its own Python thread and hands control back and forth
  with locks from the standard library. Threads are daemon threads, because a
  generator that is abandoned before it finishes leaves its thread suspended.

## Type checking

Type checking is an optional pass. When requested, a program that fails the
check is rejected before execution; otherwise the program runs without static
checks. Both runtimes remain dynamically typed and the checker never changes
runtime behavior, so it does not affect differential tests. The command-line
flag that requests the check will be chosen with the implementation.

## Verification approach

Implementation work should introduce tests alongside each component:

- Lexer cases cover literal values, keyword boundaries, longest-match operators,
  comments, LF and CRLF input, EOF, and malformed input.
- Parser cases cover precedence, grouping, statement boundaries, and diagnostics.
- Runtime cases cover bindings, evaluation, branch selection, loops, and errors.
- End-to-end cases cover script output, exit status, and REPL state across inputs.
- Differential cases run each test program through the tree-walking interpreter
  and the virtual machine and fail on any difference in output or exit status.
- Garbage collector cases include a stress mode that collects on every
  allocation.

The test runner, supported Python versions, package metadata, and CI configuration
will be established with the first implementation. The C compiler requirements
and build commands will be established with the virtual machine. There is
currently no test suite or runnable entry point.

## Related documents

- [Language design](language.md)
- [Development roadmap](roadmap.md)
- [Lesson plan](lessons.md)
