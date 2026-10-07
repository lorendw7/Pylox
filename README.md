# Pylox

A personal programming language project with an interpreter written in Python.

Pylox explores a compact scripting language, starting with a tree-walking
interpreter and a standard-library-only runtime. The language is inspired by Lox
but has its own syntax and development direction.

## Status

**Design stage.** This repository currently contains project documentation and
an MIT license. The lexer, parser, interpreter, command-line interface, and tests
have not been implemented. There is no installable package or runnable command
at this stage.

## Planned scope

The first milestone targets variables, arithmetic, comparisons, blocks,
conditionals, loops, built-in output, script execution, and a REPL. Functions,
closures, and collections follow after the core interpreter is working.

Bytecode execution, runtime specialization, and functional language features are
longer-term possibilities. They are not supported features or release commitments.

## Documentation

- [Language design](docs/language.md): proposed syntax, lexical rules, and open decisions.
- [Architecture](docs/architecture.md): component boundaries, data flow, and verification approach.
- [Development roadmap](docs/roadmap.md): implementation milestones and possible extensions.

## Repository layout

```text
Pylox/
|-- .gitattributes
|-- .gitignore
|-- LICENSE
|-- README.md
`-- docs/
    |-- architecture.md
    |-- language.md
    `-- roadmap.md
```

Implementation modules and tests will be added as development begins. Proposed
module paths are recorded in the architecture document rather than represented
as empty files.

## Development

This is a personal development project. Repository documentation is maintained
in English and describes project behavior, design decisions, and implementation
status. Keep supported behavior distinct from proposals, and update the relevant
document when a design or implementation changes.

Python version requirements, environment setup, run commands, and test commands
will be documented when the first implementation is available.

## License

[MIT](LICENSE). Copyright (c) 2026 lorendw7.
