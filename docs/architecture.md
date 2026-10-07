# Architecture

Status: proposed. No runtime components have been implemented.

## Goals

Pylox is a personal programming language project with an interpreter written in
Python. The initial implementation targets a small scripting language, a
tree-walking execution model, and no third-party runtime dependencies.

The design separates source processing from execution so each component can be
tested independently. Python owns memory management in the initial runtime.

## Execution pipeline

```text
Source text -> Lexer -> Tokens -> Parser -> AST -> Interpreter -> Result
```

Lexical scope resolution will become a separate pass between parsing and
interpretation when functions and closures require it. A future bytecode backend
may consume the same AST; it is outside the initial implementation scope.

## Component boundaries

The following paths are planned, not existing modules.

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
| `pylox/repl.py` | Interactive input and persistent session state |
| `pylox/__main__.py` | Command-line entry point and script execution |

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

## Verification approach

Implementation work should introduce tests alongside each component:

- Lexer cases cover literal values, keyword boundaries, longest-match operators,
  comments, LF and CRLF input, EOF, and malformed input.
- Parser cases cover precedence, grouping, statement boundaries, and diagnostics.
- Runtime cases cover bindings, evaluation, branch selection, loops, and errors.
- End-to-end cases cover script output, exit status, and REPL state across inputs.

The test runner, supported Python versions, package metadata, and CI configuration
will be established with the first implementation. There is currently no test
suite or runnable entry point.

## Related documents

- [Language design](language.md)
- [Development roadmap](roadmap.md)
