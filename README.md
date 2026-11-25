# Pylox

A personal programming language project implemented mainly in Python, with a
bytecode virtual machine planned in C.

Pylox explores a compact scripting language, starting with a tree-walking
interpreter and a standard-library-only runtime. The language is inspired by Lox
but has its own syntax and development direction.

## Status

**Design stage.** This repository currently contains project documentation and
an MIT license. The lexer, parser, interpreter, command-line interface, virtual
machine, and tests have not been implemented. There is no installable package or
runnable command at this stage.

## Planned scope

The first milestone targets variables, arithmetic, comparisons, blocks,
conditionals, loops, built-in output, script execution, and a REPL. Functions,
closures, and collections follow after the core interpreter is working.

Later milestones add pattern matching, pipelines, a prelude written in Pylox, a
bytecode compiler in Python, a virtual machine and garbage collector in C,
generators, tail-call optimization, and static type inference. These are plans,
not supported features or release commitments.

## Division of work

| Part | Language |
| --- | --- |
| Lexer, parser, resolver, type checker | Python |
| Tree-walking interpreter (reference semantics) | Python |
| Bytecode compiler | Python |
| Bytecode virtual machine and garbage collector | C |
| Prelude (standard library functions) | Pylox |

The bytecode format is the only interface between the Python and C parts. The
same test programs will run on both runtimes and must behave identically.

## Documentation

- [Language design](docs/language.md): proposed syntax, lexical rules, planned features, and open decisions.
- [Architecture](docs/architecture.md): language division, component boundaries, bytecode contract, and verification approach.
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
will be documented when the first implementation is available. C compiler
requirements and build commands will be documented with the virtual machine.

## License

[MIT](LICENSE). Copyright (c) 2026 lorendw7.
