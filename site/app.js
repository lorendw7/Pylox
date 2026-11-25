(function () {
  'use strict';
  var D = window.PYLOX;
  var $ = function (s) { return document.querySelector(s); };
  var lang = 'zh';

  function store(key, value) {
    try {
      if (value === undefined) return localStorage.getItem(key);
      localStorage.setItem(key, value);
    } catch (e) { return null; }
  }
  function t(pair) { return pair[lang === 'zh' ? 0 : 1]; }
  function esc(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;');
  }

  /* ---------- static text ---------- */
  var EN = {
    'nav.demo': 'Demo', 'nav.split': 'Design', 'nav.progress': 'Progress', 'nav.features': 'Features',
    'hero.status': 'Design stage',
    'hero.title': 'A small language,<br>under construction',
    'hero.lead': 'Pylox is a scripting language built from scratch. The parts that understand a program are written in Python; the virtual machine that runs it fast is written in C. No implementation code exists yet, and this site will grow along with it.',
    'hero.cta1': 'Watch a program run ↓', 'hero.cta2': 'The 61-lesson plan',
    'demo.title': 'From text to result in three steps',
    'demo.sub': 'An interpreter cuts source code into tokens, assembles them into a syntax tree, then walks the tree to run it. Press Run to follow this program all the way through.',
    'demo.tab0': 'Tokens', 'demo.tab1': 'Syntax tree', 'demo.tab2': 'Run',
    'demo.step': 'Step', 'demo.reset': 'Reset', 'demo.source': 'Source',
    'demo.note': 'This demo is an illustration: every step is scripted for this one program, and details such as token names may change in the real implementation. Once the interpreter exists, this will become real Pylox running in your browser.',
    'split.title': 'Three languages, one job each',
    'split.sub': 'Python is the main language. C handles only the virtual machine and garbage collection. The bytecode file is the only interface between them.',
    'split.src': 'Source', 'split.lexer': 'Lexer', 'split.parser': 'Parser', 'split.resolver': 'Resolver',
    'split.types': 'Type checker', 'split.result': 'Result',
    'split.laneA': 'Path A · reference', 'split.interp': 'Tree-walking interpreter',
    'split.laneAdesc': 'Runs the syntax tree directly. Slow, but the easiest to get right, so it defines the correct answer.',
    'split.laneB': 'Path B · bytecode', 'split.compiler': 'Bytecode compiler', 'split.file': 'bytecode file',
    'split.vm': 'Virtual machine + GC',
    'split.laneBdesc': 'Translates the program into compact instructions, then hands them to a virtual machine written in C that also reclaims its own memory.',
    'split.same': '<b>Both paths must give exactly the same result.</b> The same test programs run on each side, and any difference in output or exit status means there is a bug.',
    'split.prelude': 'Prelude',
    'split.preludeDesc': 'Library functions such as <code>map</code>, <code>filter</code>, and <code>reduce</code> are written in Pylox itself, which also tests whether the language is good enough.',
    'prog.title': 'Progress: one dot per lesson',
    'prog.sub': 'The plan is 61 lessons of about two hours each. Every lesson ends with working code and passing tests. Select a dot to see what that lesson covers.',
    'feat.title': 'Planned features',
    'feat.sub': 'Everything below is a plan; none of it works yet. The tag shows where each feature is mainly implemented.',
    'foot.note': 'A personal project · MIT License',
    'foot.lang': 'Language design', 'foot.arch': 'Architecture', 'foot.road': 'Roadmap', 'foot.lessons': 'Lesson plan'
  };
  var ZH = {};
  var statics = document.querySelectorAll('[data-i18n]');
  statics.forEach(function (el) {
    var k = el.getAttribute('data-i18n');
    if (!(k in ZH)) ZH[k] = el.innerHTML;
  });
  var UI = {
    run: ['▶ 运行', '▶ Run'], pause: ['❚❚ 暂停', '❚❚ Pause'], replay: ['↻ 重播', '↻ Replay'],
    idle: ['点“运行”开始，或者点“单步”一步一步看。', 'Press Run to start, or Step to go one step at a time.'],
    paneTitle: [['TOKEN 流', 'Token stream'], ['语法树', 'Syntax tree'], ['运行状态', 'Runtime state']],
    idleTitle: ['输出', 'Output'],
    vars: ['变量', 'Variables'], output: ['输出', 'Output'],
    lesson: ['第 {n} 节', 'Lesson {n}'], next: ['下一节', 'Up next'], done: ['已完成', 'Done'], todo: ['未开始', 'Not started'],
    lessonsDone: ['已完成 {a} / {b} 节', '{a} / {b} lessons done'],
    count: ['{n} 节', '{n} lessons'],
    tags: { py: ['Python 前端', 'Python front end'], c: ['C 虚拟机', 'C virtual machine'], both: ['两个运行时', 'Both runtimes'], lox: ['Pylox', 'Pylox'] },
    langName: { py: 'Python', c: 'C', both: 'Python + C', lox: 'Pylox' },
    title: ['Pylox — 一门小语言的建造现场', 'Pylox — a small language, under construction']
  };
  function fmt(pair, vals) {
    return t(pair).replace(/\{(\w+)\}/g, function (_, k) { return vals[k]; });
  }

  /* ---------- demo ---------- */
  var demo = D.demo;
  var lines = demo.source.split('\n');
  var KW = { LET: 1, IF: 1, ELSE: 1, WHILE: 1 };

  function buildSource() {
    var html = '';
    lines.forEach(function (text, li) {
      var n = li + 1, pos = 0, out = '';
      function gap(end) {
        var s = text.slice(pos, end);
        if (!s) return;
        out += s.indexOf('#') >= 0 ? '<span class="com">' + esc(s) + '</span>' : esc(s);
      }
      demo.tokens.forEach(function (tok, i) {
        if (tok[2] !== n) return;
        if (tok[0] === 'NEWLINE' || tok[0] === 'EOF') {
          gap(text.length); pos = text.length;
          out += '<span class="nl" data-i="' + i + '">' + (tok[0] === 'EOF' ? '␄' : '↵') + '</span>';
          return;
        }
        gap(tok[3]);
        var cls = KW[tok[0]] ? ' kw' : tok[0] === 'NUMBER' ? ' num' : tok[0] === 'STRING' ? ' str' : '';
        out += '<span class="tok' + cls + '" data-i="' + i + '">' + esc(tok[1]) + '</span>';
        pos = tok[3] + tok[1].length;
      });
      gap(text.length);
      html += '<div class="ln" data-line="' + n + '"><span class="no">' + n + '</span><span class="src">' + (out || ' ') + '</span></div>';
    });
    $('#source').innerHTML = html;
  }

  // The execution trace is written out for this one program; it is not an interpreter.
  function buildTrace() {
    var steps = [], total, i, out = [];
    function push(line, changed, zh, en) {
      steps.push({ line: line, total: total, i: i, out: out.slice(), changed: changed, note: [zh, en] });
    }
    total = 0; push(2, 'total', '声明 total，初始值 0', 'declare total with the value 0');
    i = 0; push(3, 'i', '声明 i，初始值 0', 'declare i with the value 0');
    while (i < 5) {
      push(5, '', '检查 i < 5：' + i + ' < 5 成立，进入循环体', 'check i < 5: ' + i + ' < 5 is true, enter the body');
      var old = total; total = total + i;
      push(6, 'total', 'total = ' + old + ' + ' + i + '，得到 ' + total, 'total = ' + old + ' + ' + i + ', giving ' + total);
      i = i + 1;
      push(7, 'i', 'i = ' + (i - 1) + ' + 1，得到 ' + i, 'i = ' + (i - 1) + ' + 1, giving ' + i);
    }
    push(5, '', '检查 i < 5：5 < 5 不成立，离开循环', 'check i < 5: 5 < 5 is false, leave the loop');
    push(10, '', '检查 total >= 10：10 >= 10 成立，走第一个分支', 'check total >= 10: 10 >= 10 is true, take the first branch');
    out.push('done'); push(11, 'out', '调用 print("done")', 'call print("done")');
    push(14, '', '程序结束', 'end of program');
    return steps;
  }
  var trace = buildTrace();
  var counts = [demo.tokens.length, demo.ast.length, trace.length];
  var starts = [0, counts[0], counts[0] + counts[1]];
  var totalFrames = counts[0] + counts[1] + counts[2];
  var delays = [170, 280, 620];
  var frame = -1, timer = null;

  function where(f) {
    var p = f >= starts[2] ? 2 : f >= starts[1] ? 1 : 0;
    return { p: p, k: f - starts[p] };
  }

  function treeLine(node, isLast) {
    var guide = '';
    for (var d = 0; d < node[0]; d++) guide += '│ ';
    if (node[0] > 0) guide = guide.slice(0, -2) + '├ ';
    return '<div' + (isLast ? ' class="last-node"' : '') + '><span class="guide">' + guide + '</span><span class="kind">' +
      node[1] + '</span>' + (node[2] ? ' <span class="val">' + esc(node[2]) + '</span>' : '') + '</div>';
  }

  function render() {
    var src = $('#source');
    src.querySelectorAll('.active').forEach(function (el) { el.classList.remove('active'); });
    var tabs = document.querySelectorAll('.tab');
    $('#track-fill').style.width = (frame < 0 ? 0 : (frame + 1) / totalFrames * 100) + '%';

    if (frame < 0) {
      tabs.forEach(function (b) { b.classList.remove('on', 'done'); });
      $('#out-title').textContent = t(UI.idleTitle);
      $('#stage').innerHTML = '<p class="idle">' + t(UI.idle) + '</p>';
      $('#caption').textContent = '';
      setPlayLabel();
      return;
    }
    var w = where(frame), p = w.p, k = w.k;
    tabs.forEach(function (b, i) {
      b.classList.toggle('on', i === p);
      b.classList.toggle('done', i < p);
    });
    $('#out-title').textContent = t(UI.paneTitle[p]);
    var stage = $('#stage'), cap = '';

    if (p === 0) {
      var tok = demo.tokens[k], html = '<div class="chips">';
      for (var i = 0; i <= k; i++) {
        var tk = demo.tokens[i], bare = tk[0] === 'NEWLINE' || tk[0] === 'EOF';
        html += '<span class="chip' + (bare ? ' dim' : '') + (i === k ? ' last' : '') + '"><b>' + tk[0] + '</b>' +
          (bare ? '' : esc(tk[1])) + '</span>';
      }
      stage.innerHTML = html + '</div>';
      var el = src.querySelector('[data-i="' + k + '"]');
      if (el) el.classList.add('active');
      cap = lang === 'zh'
        ? 'token ' + (k + 1) + ' / ' + counts[0] + '：' + tok[0] + (tok[1] ? '  ' + tok[1] : '') + '（第 ' + tok[2] + ' 行）'
        : 'token ' + (k + 1) + ' / ' + counts[0] + ': ' + tok[0] + (tok[1] ? '  ' + tok[1] : '') + ' (line ' + tok[2] + ')';
    } else if (p === 1) {
      var node = demo.ast[k], th = '<div class="tree">';
      for (var j = 0; j <= k; j++) th += treeLine(demo.ast[j], j === k);
      stage.innerHTML = th + '</div>';
      for (var n = node[3]; n <= node[4]; n++) src.querySelector('[data-line="' + n + '"]').classList.add('active');
      var label = node[1] + (node[2] ? ' ' + node[2] : '');
      cap = lang === 'zh'
        ? '节点 ' + (k + 1) + ' / ' + counts[1] + '：' + label + '（第 ' + node[3] + (node[4] > node[3] ? '–' + node[4] : '') + ' 行）'
        : 'node ' + (k + 1) + ' / ' + counts[1] + ': ' + label + ' (line' + (node[4] > node[3] ? 's ' + node[3] + '–' + node[4] : ' ' + node[3]) + ')';
    } else {
      var s = trace[k];
      function row(name, v) {
        return '<tr' + (s.changed === name ? ' class="changed"' : '') + '><td>' + name + '</td><td>' + (v === undefined ? '—' : v) + '</td></tr>';
      }
      stage.innerHTML = '<div class="run"><div><p class="pane-title">' + t(UI.vars) + '</p><table class="vars">' +
        row('total', s.total) + row('i', s.i) + '</table></div><div><p class="pane-title">' + t(UI.output) +
        '</p><div class="console">' + esc(s.out.join('\n')) + '</div></div></div>';
      src.querySelector('[data-line="' + s.line + '"]').classList.add('active');
      cap = (lang === 'zh' ? '第 ' + s.line + ' 行：' : 'line ' + s.line + ': ') + t(s.note);
    }
    $('#caption').textContent = cap;
    setPlayLabel();
  }

  function setPlayLabel() {
    $('#play').textContent = t(timer ? UI.pause : frame >= totalFrames - 1 ? UI.replay : UI.run);
  }
  function stop() { if (timer) { clearTimeout(timer); timer = null; } }
  function tick() {
    if (frame >= totalFrames - 1) { stop(); setPlayLabel(); return; }
    frame++;
    render();
    if (frame >= totalFrames - 1) { stop(); setPlayLabel(); return; }
    var next = where(frame + 1).p, pause = next !== where(frame).p ? 900 : delays[next];
    timer = setTimeout(tick, pause);
  }
  $('#play').addEventListener('click', function () {
    if (timer) { stop(); setPlayLabel(); return; }
    if (frame >= totalFrames - 1) frame = -1;
    timer = setTimeout(tick, 0);
    setPlayLabel();
  });
  $('#step').addEventListener('click', function () {
    stop();
    if (frame < totalFrames - 1) frame++;
    render();
  });
  $('#reset').addEventListener('click', function () { stop(); frame = -1; render(); });
  document.querySelectorAll('.tab').forEach(function (b) {
    b.addEventListener('click', function () {
      stop();
      var p = +b.getAttribute('data-phase');
      // Jump to the end of the chosen step so its full result is visible.
      frame = starts[p] + counts[p] - 1;
      render();
    });
  });

  /* ---------- progress map ---------- */
  var all = [];
  D.milestones.forEach(function (m) { m.lessons.forEach(function (l) { all.push(l); }); });
  var done = Math.max(0, Math.min(D.completed, all.length));
  var selected = Math.min(done, all.length - 1);

  function showLesson(n) {
    selected = n;
    var l = all[n];
    var state = n < done ? t(UI.done) : n === done ? t(UI.next) : t(UI.todo);
    $('#lesson-info').innerHTML = '<span class="li-n">' + fmt(UI.lesson, { n: n + 1 }) + ' · ' + UI.langName[l[2]] + ' · ' + state +
      '</span><span class="li-t">' + esc(t(l)) + '</span>';
    document.querySelectorAll('.dot').forEach(function (d) {
      d.classList.toggle('sel', +d.getAttribute('data-n') === n);
    });
  }
  function buildMap() {
    var html = '', n = 0;
    D.milestones.forEach(function (m, mi) {
      html += '<div class="ms"><div><p class="ms-name"><span class="ms-i">' + (mi + 1) + '</span>' + esc(t(m.name)) +
        '</p><p class="ms-meta">' + m.lang + ' · ' + fmt(UI.count, { n: m.lessons.length }) + '</p></div><div class="dots">';
      m.lessons.forEach(function (l) {
        var cls = 'dot ' + l[2] + (n < done ? ' done' : '') + (n === done ? ' next' : '');
        html += '<button type="button" class="' + cls + '" data-n="' + n + '" aria-label="' +
          esc(fmt(UI.lesson, { n: n + 1 }) + ' ' + t(l)) + '"></button>';
        n++;
      });
      html += '</div></div>';
    });
    var x = D.experiment, ghosts = '';
    for (var g = 0; g < x.dots; g++) ghosts += '<span class="dot ghost"></span>';
    html += '<div class="ms"><div><p class="ms-name"><span class="ms-i">' + (D.milestones.length + 1) + '</span>' +
      esc(t(x.name)) + '</p><p class="ms-meta">' + esc(t(x.meta)) + '</p></div><div class="dots">' + ghosts + '</div></div>';
    $('#map').innerHTML = html;
    $('#done-n').textContent = done;
    $('#hero-count').textContent = fmt(UI.lessonsDone, { a: done, b: all.length });
    showLesson(selected);
  }
  $('#map').addEventListener('click', function (e) {
    var d = e.target.closest('button.dot');
    if (d) showLesson(+d.getAttribute('data-n'));
  });
  $('#map').addEventListener('mouseover', function (e) {
    var d = e.target.closest('button.dot');
    if (d) showLesson(+d.getAttribute('data-n'));
  });
  $('#map').addEventListener('focusin', function (e) {
    var d = e.target.closest('button.dot');
    if (d) showLesson(+d.getAttribute('data-n'));
  });

  /* ---------- features ---------- */
  function buildFeatures() {
    $('#feat-grid').innerHTML = D.features.map(function (f) {
      return '<article class="feat"><h3>' + esc(t(f.name)) + '</h3><p>' + esc(t(f.text)) +
        '</p><span class="tag ' + f.tag + '">' + t(UI.tags[f.tag]) + '</span></article>';
    }).join('');
  }

  /* ---------- language and theme ---------- */
  function applyLang() {
    document.documentElement.lang = lang === 'zh' ? 'zh-CN' : 'en';
    document.title = t(UI.title);
    statics.forEach(function (el) {
      var k = el.getAttribute('data-i18n');
      el.innerHTML = lang === 'zh' ? ZH[k] : (EN[k] || ZH[k]);
    });
    $('#lang-btn').textContent = lang === 'zh' ? 'EN' : '中文';
    buildMap();
    buildFeatures();
    render();
  }
  $('#lang-btn').addEventListener('click', function () {
    lang = lang === 'zh' ? 'en' : 'zh';
    store('pylox-lang', lang);
    applyLang();
  });
  $('#theme-btn').addEventListener('click', function () {
    var root = document.documentElement;
    var cur = root.getAttribute('data-theme') ||
      (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light');
    var next = cur === 'dark' ? 'light' : 'dark';
    root.setAttribute('data-theme', next);
    store('pylox-theme', next);
  });

  if (store('pylox-lang') === 'en') lang = 'en';
  buildSource();
  applyLang();
})();
