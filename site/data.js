// Site data. Every text entry is a [Chinese, English] pair.
window.PYLOX = {
  // Number of lessons finished. Update this after each lesson.
  completed: 0,

  // Lessons mirror docs/lessons.md. Each entry: [Chinese, English, language].
  // language: 'py' = Python, 'c' = C, 'both' = Python and C, 'lox' = Pylox.
  milestones: [
    { name: ['核心解释器', 'Core interpreter'], lang: 'Python', lessons: [
      ['语言设计决定', 'Language decisions', 'py'],
      ['项目搭建与 token', 'Project setup and tokens', 'py'],
      ['词法分析器', 'Lexer', 'py'],
      ['词法错误诊断', 'Lexical diagnostics', 'py'],
      ['语法与 AST', 'Grammar and AST', 'py'],
      ['解析表达式', 'Parsing expressions', 'py'],
      ['解析语句', 'Parsing statements', 'py'],
      ['表达式求值', 'Evaluating expressions', 'py'],
      ['绑定与作用域', 'Bindings and scope', 'py'],
      ['控制流与输出', 'Control flow and output', 'py'],
      ['脚本执行', 'Script execution', 'py'],
      ['REPL', 'REPL', 'py'] ] },
    { name: ['函数与集合', 'Functions and collections'], lang: 'Python', lessons: [
      ['函数声明与调用', 'Function declarations and calls', 'py'],
      ['返回与递归', 'Returns and recursion', 'py'],
      ['闭包', 'Closures', 'py'],
      ['作用域解析器（上）', 'Resolver, part 1', 'py'],
      ['作用域解析器（下）', 'Resolver, part 2', 'py'],
      ['数组', 'Arrays', 'py'],
      ['字典', 'Dictionaries', 'py'],
      ['逻辑运算符与 for', 'Logical operators and for', 'py'] ] },
    { name: ['运行时质量', 'Runtime quality'], lang: 'Python', lessons: [
      ['端到端测试', 'End-to-end tests', 'py'],
      ['诊断信息', 'Diagnostics', 'py'],
      ['持续集成', 'Continuous integration', 'py'],
      ['性能基线', 'Baseline measurements', 'py'] ] },
    { name: ['表达力功能', 'Expressive language features'], lang: 'Python · Pylox', lessons: [
      ['匿名函数', 'Anonymous functions', 'py'],
      ['预置库', 'Prelude', 'lox'],
      ['模式匹配（一）', 'Pattern matching, part 1', 'py'],
      ['模式匹配（二）', 'Pattern matching, part 2', 'py'],
      ['模式匹配（三）', 'Pattern matching, part 3', 'py'],
      ['管道', 'Pipelines', 'py'],
      ['字符串插值', 'String interpolation', 'py'],
      ['解构与区间', 'Destructuring and ranges', 'py'] ] },
    { name: ['字节码编译器与虚拟机', 'Bytecode compiler and virtual machine'], lang: 'Python · C', lessons: [
      ['字节码格式', 'Bytecode format', 'py'],
      ['编译表达式', 'Compiling expressions', 'py'],
      ['编译语句', 'Compiling statements', 'py'],
      ['编译函数', 'Compiling functions', 'py'],
      ['编译闭包', 'Compiling closures', 'py'],
      ['C 项目搭建', 'C project setup', 'c'],
      ['字节码加载器', 'Bytecode loader', 'c'],
      ['指令分发循环', 'Dispatch loop', 'c'],
      ['变量与控制流', 'Variables and control flow', 'c'],
      ['调用与栈帧', 'Calls and frames', 'c'],
      ['闭包（上）', 'Closures, part 1', 'c'],
      ['闭包（下）', 'Closures, part 2', 'c'],
      ['字符串与哈希表', 'Strings and hash tables', 'c'],
      ['数组与字典', 'Arrays and dictionaries', 'c'],
      ['垃圾回收器（上）', 'Garbage collector, part 1', 'c'],
      ['垃圾回收器（下）', 'Garbage collector, part 2', 'c'],
      ['阶段 4 的功能搬上虚拟机', 'Milestone 4 features on the VM', 'both'],
      ['差分测试', 'Differential tests', 'py'] ] },
    { name: ['生成器与尾调用', 'Generators and tail calls'], lang: 'C · Python', lessons: [
      ['生成器语义', 'Generator semantics', 'py'],
      ['生成器（上）', 'Generators, part 1', 'c'],
      ['生成器（下）', 'Generators, part 2', 'c'],
      ['解释器中的生成器', 'Generators in the interpreter', 'py'],
      ['尾调用', 'Tail calls', 'both'] ] },
    { name: ['静态类型推断', 'Static type inference'], lang: 'Python', lessons: [
      ['类型与合一', 'Types and unification', 'py'],
      ['推断表达式', 'Inferring expressions', 'py'],
      ['推断函数', 'Inferring functions', 'py'],
      ['泛型函数', 'Generic functions', 'py'],
      ['集合与标注', 'Collections and annotations', 'py'],
      ['集成', 'Integration', 'py'] ] }
  ],

  // The backend experiment has no lesson list until one option is chosen.
  experiment: {
    name: ['后端实验', 'Backend experiment'],
    meta: ['JIT、LLVM、WebAssembly 三选一 · 6–8 节', 'One of JIT, LLVM, WebAssembly · 6–8 lessons'],
    dots: 6
  },

  // Planned features. tag: 'py' | 'c' | 'both' | 'lox'.
  features: [
    { name: ['闭包', 'Closures'], tag: 'both',
      text: ['函数会记住它被创建时周围的变量。', 'A function remembers the variables around the place it was created.'] },
    { name: ['模式匹配', 'Pattern matching'], tag: 'py',
      text: ['用 match 按数据的形状来分支。', 'Branch on the shape of data with match.'] },
    { name: ['管道', 'Pipelines'], tag: 'py',
      text: ['让一个值顺着一串函数调用流下去。', 'Send a value through a chain of function calls.'] },
    { name: ['字符串插值', 'String interpolation'], tag: 'py',
      text: ['在字符串里直接写表达式。', 'Write expressions directly inside a string.'] },
    { name: ['预置库', 'Prelude'], tag: 'lox',
      text: ['map、filter、reduce 用 Pylox 自己写。', 'map, filter, and reduce, written in Pylox itself.'] },
    { name: ['生成器', 'Generators'], tag: 'both',
      text: ['用 yield 暂停一个函数，之后接着跑。', 'Pause a function with yield and resume it later.'] },
    { name: ['尾调用优化', 'Tail-call optimization'], tag: 'both',
      text: ['尾递归不会再把调用栈撑爆。', 'Tail recursion no longer overflows the call stack.'] },
    { name: ['类型推断', 'Type inference'], tag: 'py',
      text: ['不用写类型，运行前也能查出类型错误。', 'Catch type errors before running, without writing types.'] }
  ],

  // Scripted demo for one fixed program (the example in docs/language.md).
  // Tokens: [type, lexeme, line, column]. AST nodes: [depth, kind, value, firstLine, lastLine].
  demo: {
    source: "# Accumulate the integers from 0 through 4.\nlet total = 0\nlet i = 0\n\nwhile i < 5 {\n    total = total + i\n    i = i + 1\n}\n\nif total >= 10 {\n    print(\"done\")\n} else {\n    print(total)\n}",
    tokens: [["LET","let",2,0],["IDENTIFIER","total",2,4],["ASSIGN","=",2,10],["NUMBER","0",2,12],["NEWLINE","",2,13],["LET","let",3,0],["IDENTIFIER","i",3,4],["ASSIGN","=",3,6],["NUMBER","0",3,8],["NEWLINE","",3,9],["WHILE","while",5,0],["IDENTIFIER","i",5,6],["LESS","<",5,8],["NUMBER","5",5,10],["LEFT_BRACE","{",5,12],["NEWLINE","",5,13],["IDENTIFIER","total",6,4],["ASSIGN","=",6,10],["IDENTIFIER","total",6,12],["PLUS","+",6,18],["IDENTIFIER","i",6,20],["NEWLINE","",6,21],["IDENTIFIER","i",7,4],["ASSIGN","=",7,6],["IDENTIFIER","i",7,8],["PLUS","+",7,10],["NUMBER","1",7,12],["NEWLINE","",7,13],["RIGHT_BRACE","}",8,0],["NEWLINE","",8,1],["IF","if",10,0],["IDENTIFIER","total",10,3],["GREATER_EQUAL",">=",10,9],["NUMBER","10",10,12],["LEFT_BRACE","{",10,15],["NEWLINE","",10,16],["IDENTIFIER","print",11,4],["LEFT_PAREN","(",11,9],["STRING","\"done\"",11,10],["RIGHT_PAREN",")",11,16],["NEWLINE","",11,17],["RIGHT_BRACE","}",12,0],["ELSE","else",12,2],["LEFT_BRACE","{",12,7],["NEWLINE","",12,8],["IDENTIFIER","print",13,4],["LEFT_PAREN","(",13,9],["IDENTIFIER","total",13,10],["RIGHT_PAREN",")",13,15],["NEWLINE","",13,16],["RIGHT_BRACE","}",14,0],["EOF","",14,1]],
    ast: [
      [0, 'Program', '', 1, 14],
      [1, 'Let', 'total', 2, 2],
      [2, 'Number', '0', 2, 2],
      [1, 'Let', 'i', 3, 3],
      [2, 'Number', '0', 3, 3],
      [1, 'While', '', 5, 8],
      [2, 'Binary', '<', 5, 5],
      [3, 'Variable', 'i', 5, 5],
      [3, 'Number', '5', 5, 5],
      [2, 'Block', '', 5, 8],
      [3, 'Assign', 'total', 6, 6],
      [4, 'Binary', '+', 6, 6],
      [5, 'Variable', 'total', 6, 6],
      [5, 'Variable', 'i', 6, 6],
      [3, 'Assign', 'i', 7, 7],
      [4, 'Binary', '+', 7, 7],
      [5, 'Variable', 'i', 7, 7],
      [5, 'Number', '1', 7, 7],
      [1, 'If', '', 10, 14],
      [2, 'Binary', '>=', 10, 10],
      [3, 'Variable', 'total', 10, 10],
      [3, 'Number', '10', 10, 10],
      [2, 'Block', '', 10, 12],
      [3, 'Call', '', 11, 11],
      [4, 'Variable', 'print', 11, 11],
      [4, 'String', '"done"', 11, 11],
      [2, 'Block', '', 12, 14],
      [3, 'Call', '', 13, 13],
      [4, 'Variable', 'print', 13, 13],
      [4, 'Variable', 'total', 13, 13]
    ]
  }
};
