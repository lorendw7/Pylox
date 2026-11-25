# Language Design

Status: draft. This document records the intended initial language and open
decisions. None of the examples can be executed by this repository yet.

Pylox takes inspiration from Lox but uses its own syntax. Compatibility with Lox
is not a project requirement.

## Initial syntax

```text
# Accumulate the integers from 0 through 4.
let total = 0
let i = 0

while i < 5 {
    total = total + i
    i = i + 1
}

if total >= 10 {
    print("done")
} else {
    print(total)
}
```

The initial target includes `let` declarations, reassignment, arithmetic,
comparisons, blocks, `if`/`else`, `while`, and calls to the built-in `print`.
Newlines separate statements; braces delimit blocks. Semicolons are not part of
the initial syntax. Exact grammar and boundary cases remain to be specified
before the parser is implemented.

## Lexical rules

| Category | Draft rule |
| --- | --- |
| Comments | `#` through the end of the line; the following newline remains significant |
| Whitespace | Spaces and tabs are ignored; CRLF is treated as one line break |
| Identifiers | A letter or underscore followed by letters, digits, or underscores; the character set remains to be finalized |
| Reserved words | `let`, `if`, `else`, `while` |
| Numbers | Integer literals initially; the decimal syntax and numeric model remain open |
| Strings | Double-quoted text; multiline strings are proposed; escape syntax remains open |
| Arithmetic | `+`, `-`, `*`, `/` |
| Assignment | `=` |
| Comparisons | `==`, `!=`, `<`, `<=`, `>`, `>=` |
| Delimiters | `(`, `)`, `{`, `}` |
| Stream boundaries | Significant newline tokens and one final EOF token |

Operators use the longest valid match. A standalone `!` is invalid in the initial
syntax. `print` is an ordinary identifier bound to a built-in function, not a
reserved word. Keywords are recognized only after scanning a complete identifier,
so `letx` remains a single identifier.

Unexpected characters and unterminated strings must produce lexical diagnostics
with source locations.

## Initial token contract

| Field | Meaning |
| --- | --- |
| `type` | Token kind |
| `lexeme` | Exact source text, including quotes for a string token |
| `literal` | Parsed literal value, or `None` for tokens without a literal value |
| `line` | One-based starting line |

Column or offset tracking should be settled with the diagnostics implementation.
Scanning `let x = 10` is expected to produce `LET`, `IDENTIFIER`, `ASSIGN`,
`NUMBER`, and `EOF`; the number token has lexeme `10` and integer value `10`.

## Decisions required before runtime implementation

- Numeric types, division behavior, and mixed-type arithmetic.
- Boolean values, truthiness, equality, and invalid operand handling.
- Block scope, redeclaration, assignment to unknown names, and built-in shadowing.
- String escapes, multiline behavior, and output formatting.
- Newlines inside parentheses, blank lines, and the boundary before `else`.
- Call argument syntax and arity rules, including whether commas are introduced.

## Later language extensions

None of the features in this section are part of the initial language contract.
Syntax shown here is a proposal. See the [roadmap](roadmap.md) for sequencing.

### Functions and collections

Functions will use `fn` as the proposed shared keyword for named and anonymous
forms. Function syntax, returns, closures, arrays, dictionaries, logical
operators, and `for` loops require separate design decisions and tests.

### Planned features

| Feature | Summary | Implemented in |
| --- | --- | --- |
| Higher-order prelude | `map`, `filter`, and `reduce` written in Pylox | Pylox prelude |
| Pattern matching | `match` over literals, arrays, and dictionaries | Python front end and interpreter |
| Pipelines | Pass a value through a chain of calls | Python front end |
| String interpolation | Embed expressions inside string literals | Python lexer and parser |
| Destructuring | Bind several names from an array or dictionary | Python front end |
| Ranges | A compact form for integer sequences | Python front end |
| Generators and coroutines | `yield` suspends a function; it can be resumed later | C virtual machine |
| Tail-call optimization | Tail calls reuse the current call frame | C virtual machine |
| Type inference | Types are inferred and checked before execution | Python type checker |

Open decisions for these features:

- The pipeline operator and whether it passes the value as the first or last
  argument.
- Whether `match` must be exhaustive and how a failed match is reported.
- The delimiter for interpolated expressions and its interaction with string
  escapes.
- Whether `yield` makes a function a generator implicitly or a marker is
  required.
- Whether type annotations are allowed, and how inference treats dictionaries
  and other dynamic values.
- Whether generators and tail calls are also implemented in the tree-walking
  interpreter.

### Possible extensions

A C foreign function interface, compile-time evaluation, units of measure,
algebraic data types, immutable bindings, expression-valued blocks, currying,
partial application, composition, green threads with channels, and time-travel
debugging remain possible. Macros, algebraic effects, and continuations are also
possible, but at most one of the three should be attempted.
