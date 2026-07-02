"use client";

import { useState, useEffect, useRef, useCallback } from "react";
import dynamic from "next/dynamic";
import { Question, Difficulty } from "@/lib/questions";
import { Lang } from "@/components/CodeEditor";
import styles from "./coding.module.css";
import confetti from "canvas-confetti";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });

const STORAGE_KEY = "tcs-nqt-coding-progress";
const SOLUTIONS_KEY = "tcs-nqt-coding-solutions";
const NAVBAR_H = 60;

const STARTERS: Record<Lang, string> = {
  python:
    "# Use input() to read a line, print() to output\n\n",
  javascript:
    "// Use input() to read a line, print(...) to output\n\n",
  c:
    "#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}\n",
  cpp:
    "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    return 0;\n}\n",
  java:
    "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n    }\n}\n",
  csharp:
    "using System;\n\nclass Program {\n    static void Main(string[] args) {\n        \n    }\n}\n",
};

const LANG_LABELS: Record<Lang, string> = {
  python: "Python 3",
  javascript: "JavaScript",
  c: "C",
  cpp: "C++",
  java: "Java",
  csharp: "C#",
};

// ─── JS runner ───────────────────────────────────────────────────────────────
function runJS(code: string, stdinText: string): string {
  const lines = stdinText.length ? stdinText.replace(/\n$/, "").split("\n") : [];
  let i = 0;
  let out = "";
  const input = () => (i < lines.length ? lines[i++] : "");
  const print = (...a: unknown[]) => { out += a.map(String).join(" ") + "\n"; };
  try {
    // eslint-disable-next-line no-new-func
    new Function("input", "print", "console", code)(input, print, {
      log: print, error: print, warn: print,
    });
  } catch (e) {
    out += "Runtime Error: " + String(e);
  }
  return out;
}

// ─── Pyodide runner ──────────────────────────────────────────────────────────
declare global {
  interface Window {
    loadPyodide?: (opts?: { indexURL?: string }) => Promise<PyodideInterface>;
    _pyodideInstance?: PyodideInterface;
  }
}
interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: { set: (k: string, v: unknown) => void };
}

let pyodidePromise: Promise<PyodideInterface> | null = null;

function loadPyodideOnce(onStatus: (s: string) => void): Promise<PyodideInterface> {
  if (window._pyodideInstance) return Promise.resolve(window._pyodideInstance);
  if (!pyodidePromise) {
    onStatus("Loading Python runtime (first run takes ~5 s)…");
    pyodidePromise = new Promise<PyodideInterface>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
      script.onload = () => {
        window.loadPyodide!({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/" })
          .then((py) => { window._pyodideInstance = py; resolve(py); })
          .catch(reject);
      };
      script.onerror = () => reject(new Error("Could not load Python runtime (needs internet)."));
      document.head.appendChild(script);
    });
  }
  return pyodidePromise;
}

async function runPython(
  code: string,
  stdinText: string,
  onStatus: (s: string) => void,
): Promise<string> {
  const py = await loadPyodideOnce(onStatus);
  onStatus("Running…");
  py.globals.set("__user_code", code);
  py.globals.set("__user_stdin", stdinText);
  const result = await py.runPythonAsync(`
import sys, io, traceback
sys.stdin = io.StringIO(__user_stdin)
_buf = io.StringIO()
_old, _err = sys.stdout, sys.stderr
sys.stdout = sys.stderr = _buf
try:
    exec(__user_code, {'__name__': '__main__'})
except Exception:
    traceback.print_exc(file=_buf)
finally:
    sys.stdout = _old
    sys.stderr = _err
_buf.getvalue()
`);
  return String(result ?? "");
}

// ─── Piston runner ───────────────────────────────────────────────────────────
const PISTON_URL = "https://emkc.org/api/v2/piston";
const PISTON_CFG: Record<string, { language: string; file: string }> = {
  c:      { language: "c",      file: "main.c" },
  cpp:    { language: "c++",    file: "main.cpp" },
  java:   { language: "java",   file: "Main.java" },
  csharp: { language: "csharp", file: "main.cs" },
};

let pistonRuntimes: Array<{ language: string; version: string; aliases?: string[] }> | null = null;

async function getPistonRuntimes() {
  if (pistonRuntimes) return pistonRuntimes;
  const res = await fetch(`${PISTON_URL}/runtimes`);
  pistonRuntimes = await res.json();
  return pistonRuntimes!;
}

async function runPiston(
  langKey: string,
  code: string,
  stdin: string,
  onStatus: (s: string) => void,
): Promise<string> {
  const cfg = PISTON_CFG[langKey];
  if (!cfg) throw new Error(`No Piston config for ${langKey}`);
  onStatus(`Compiling ${LANG_LABELS[langKey as Lang]}…`);

  const runtimes = await getPistonRuntimes();
  const rt = runtimes.find(
    (r) => r.language === cfg.language || r.aliases?.includes(cfg.language),
  );

  const res = await fetch(`${PISTON_URL}/execute`, {
    method: "POST",
    headers: { "Content-Type": "application/json" },
    body: JSON.stringify({
      language: rt?.language ?? cfg.language,
      version: rt?.version ?? "*",
      files: [{ name: cfg.file, content: code }],
      stdin,
    }),
  });
  const data = await res.json();
  onStatus("");

  if (data.compile && data.compile.code !== 0) {
    return `Compilation Error:\n${data.compile.stderr || data.compile.stdout}`;
  }
  let out = data.run?.stdout ?? "";
  if (data.run?.stderr) out += data.run.stderr;
  return out;
}

// ─── Output normalizer ────────────────────────────────────────────────────────
function normalize(s: string): string {
  const lines = s.split('\n').map(line => line.trimEnd());
  let start = 0, end = lines.length - 1;
  while (start <= end && lines[start] === '') start++;
  while (end >= start && lines[end] === '') end--;
  return lines.slice(start, end + 1).join('\n');
}

// ─── Types ───────────────────────────────────────────────────────────────────
interface Props { questions: Question[]; }
type TestResult = { ok: boolean; input: string; expected: string; got: string; hidden?: boolean };
type PanelTab = "tests" | "output";

// ─── Main Component ───────────────────────────────────────────────────────────
export default function CodingClient({ questions }: Props) {
  const [done, setDone] = useState<Record<number, boolean>>({});
  const [solutions, setSolutions] = useState<Record<number, { lang: Lang; code: string }>>({});
  const [filter, setFilter] = useState<"all" | Difficulty>("all");
  const [selected, setSelected] = useState<Question | null>(null);
  const [lang, setLang] = useState<Lang>("python");
  const [code, setCode] = useState(STARTERS.python);
  const [stdin, setStdin] = useState("");
  const [output, setOutput] = useState("");
  const [status, setStatus] = useState("");
  const [results, setResults] = useState<TestResult[]>([]);
  const [running, setRunning] = useState(false);
  const [allPassed, setAllPassed] = useState(false);
  const [activePanel, setActivePanel] = useState<PanelTab>("tests");
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [selectedTestIdx, setSelectedTestIdx] = useState<number>(0);
  const [confirmLangSwitch, setConfirmLangSwitch] = useState<Lang | null>(null);
  const [nqtTagFilter, setNqtTagFilter] = useState<string>("all");
  const [hintsRevealed, setHintsRevealed] = useState<Record<number, number>>({});

  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
      setSolutions(JSON.parse(localStorage.getItem(SOLUTIONS_KEY) || "{}"));
      setHintsRevealed(JSON.parse(localStorage.getItem("tcs-nqt-coding-hints") || "{}"));
    } catch { /* empty */ }
  }, []);

  const saveDone = (d: Record<number, boolean>) => {
    setDone(d);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  };

  const saveSolution = (sols: Record<number, { lang: Lang; code: string }>) => {
    setSolutions(sols);
    localStorage.setItem(SOLUTIONS_KEY, JSON.stringify(sols));
  };

  const openQuestion = (q: Question) => {
    setSelected(q);
    if (solutions[q.id]) {
      setLang(solutions[q.id].lang);
      setCode(solutions[q.id].code);
    } else {
      setCode(STARTERS[lang]);
    }
    setStdin(q.tests[0].in);
    setSelectedTestIdx(0);
    setOutput("");
    setStatus("");
    setResults([]);
    setAllPassed(false);
  };

  const switchLang = (l: Lang) => {
    if (code !== STARTERS[lang]) {
      setConfirmLangSwitch(l);
      return;
    }
    setLang(l);
    setCode(STARTERS[l]);
    setOutput("");
    setStatus("");
    setResults([]);
    setAllPassed(false);
  };

  const handleCodeChange = useCallback((val: string) => { setCode(val); }, []);

  const runCode = async (customStdin?: string) => {
    const inp = customStdin ?? stdin;
    setRunning(true);
    setOutput("");
    setStatus("");
    setActivePanel("output");
    try {
      let out: string;
      if (lang === "javascript") out = runJS(code, inp);
      else if (lang === "python") out = await runPython(code, inp, setStatus);
      else out = await runPiston(lang, code, inp, setStatus);
      setOutput(out.trimEnd() || "(no output)");
    } catch (e) {
      setOutput("Error: " + String(e));
    } finally {
      setRunning(false);
      setStatus("");
    }
  };

  const runTests = async () => {
    if (!selected) return;
    setRunning(true);
    setResults([]);
    setStatus("");
    setActivePanel("tests");
    try {
      const res: TestResult[] = [];
      for (const t of selected.tests) {
        let got = "";
        try {
          if (lang === "javascript") got = runJS(code, t.in);
          else if (lang === "python") got = await runPython(code, t.in, setStatus);
          else got = await runPiston(lang, code, t.in, setStatus);
        } catch (e) { got = "Error: " + String(e); }
        res.push({ ok: normalize(got) === normalize(t.out), input: t.in, expected: t.out, got: got.trimEnd() });
      }
      setResults(res);
      const passed = res.every((r) => r.ok);
      setAllPassed(passed);
      const firstFail = res.findIndex((r, idx) => !r.ok && !selected.tests[idx].hidden);
      setSelectedTestIdx(firstFail >= 0 ? firstFail : 0);
      if (passed) {
        saveDone({ ...done, [selected.id]: true });
        saveSolution({ ...solutions, [selected.id]: { lang, code } });
        confetti({ particleCount: 140, spread: 75, origin: { y: 0.6 }, colors: ["#8b5cf6", "#22c55e", "#3b82f6"] });
      }
    } finally {
      setRunning(false);
      setStatus("");
    }
  };

  const solvedCount = questions.filter((q) => done[q.id]).length;
  const LEVEL_ORDER: Record<Difficulty, number> = { Easy: 0, Medium: 1, Hard: 2 };

  const visible = questions
    .filter((q) => filter === "all" || q.level === filter)
    .filter((q) => nqtTagFilter === "all" || q.nqtTag === nqtTagFilter)
    .sort((a, b) => LEVEL_ORDER[a.level] - LEVEL_ORDER[b.level] || a.id - b.id);
  const FILTERS: Array<"all" | Difficulty> = ["all", "Easy", "Medium", "Hard"];
  const ALL_TAGS = Array.from(new Set(questions.map((q) => q.nqtTag).filter(Boolean))) as string[];
  const currentIndex = selected ? visible.findIndex((q) => q.id === selected.id) : -1;
  const prevQ = currentIndex > 0 ? visible[currentIndex - 1] : null;
  const nextQ = currentIndex >= 0 && currentIndex < visible.length - 1 ? visible[currentIndex + 1] : null;

  return (
    <div
      className={styles.page}
      style={{
        height: `calc(100vh - ${NAVBAR_H}px)`,
        gridTemplateColumns: sidebarOpen ? "248px 1fr" : "0 1fr",
      }}
    >
      {/* ── Problem list sidebar ── */}
      <aside className={styles.sidebar}>
        <div className={styles.sidebarHead}>
          <h1 className={styles.sidebarTitle}>Coding</h1>
          <div className={styles.progress}>
            <span className={styles.progressText}>{solvedCount} / {questions.length}</span>
            <div className={styles.progressBar}>
              <div className={styles.progressFill} style={{ width: `${(solvedCount / questions.length) * 100}%` }} />
            </div>
          </div>
        </div>

        <div className={styles.filterRow}>
          {FILTERS.map((f) => (
            <button
              key={f}
              className={`filter-pill ${filter === f ? "active" : ""}`}
              onClick={() => setFilter(f)}
            >
              {f === "all" ? "All" : f}
            </button>
          ))}
        </div>

        {ALL_TAGS.length > 0 && (
          <div className={styles.filterRow} style={{ marginTop: "8px" }}>
            {["all", ...ALL_TAGS].map((t) => (
              <button
                key={t}
                className={`filter-pill ${nqtTagFilter === t ? "active" : ""}`}
                onClick={() => setNqtTagFilter(t)}
              >
                {t === "all" ? "All Tags" : t}
              </button>
            ))}
          </div>
        )}

        <ul className={styles.qList}>
          {visible.map((q) => (
            <li key={q.id}>
              <button
                className={`${styles.qRow} ${selected?.id === q.id ? styles.qRowActive : ""}`}
                onClick={() => openQuestion(q)}
              >
                <span className={`${styles.qNum} ${done[q.id] ? styles.qNumDone : ""}`}>
                  {done[q.id] ? "✓" : String(q.id).padStart(2, "0")}
                </span>
                <span className={`${styles.qTitle} ${done[q.id] ? styles.qTitleDone : ""}`}>
                  {q.title}
                </span>
                <span className={`badge badge-${q.level.toLowerCase()}`}>{q.level}</span>
              </button>
            </li>
          ))}
        </ul>
      </aside>

      {/* ── Main content ── */}
      {!selected ? (
        <div className={styles.emptyState}>
          <div className={styles.emptyIcon}>{"{ }"}</div>
          <h2 className={styles.emptyTitle}>Pick a problem</h2>
          <p className={styles.emptySub}>
            Select any problem from the list to open the IDE.
            Supports Python, JavaScript, C, C++, Java, and C#.
          </p>
          <div className={styles.emptyStats}>
            <span>{solvedCount} solved</span>
            <span className={styles.emptyDot}>·</span>
            <span>{questions.length - solvedCount} remaining</span>
          </div>
        </div>
      ) : (
        <div className={styles.splitPane}>
          {/* ── Problem panel ── */}
          <div className={styles.problemPane}>
            <div className={styles.problemNav}>
              <button
                className={styles.sidebarToggle}
                onClick={() => setSidebarOpen(!sidebarOpen)}
                title={sidebarOpen ? "Close problem list" : "Open problem list"}
              >
                {sidebarOpen ? "‹" : "›"}
              </button>
              <button
                className={styles.navBtn}
                disabled={!prevQ}
                onClick={() => prevQ && openQuestion(prevQ)}
              >
                ← Prev
              </button>
              <span className={styles.navCount}>
                {currentIndex + 1} / {visible.length}
              </span>
              <button
                className={styles.navBtn}
                disabled={!nextQ}
                onClick={() => nextQ && openQuestion(nextQ)}
              >
                Next →
              </button>
            </div>

            <div className={styles.problemHeader}>
              <h2 className={styles.problemTitle}>
                <span className={styles.problemId}>Q{selected.id}.</span> {selected.title}
              </h2>
              <div className={styles.problemMeta}>
                <span className={`badge badge-${selected.level.toLowerCase()}`}>{selected.level}</span>
                {selected.nqtTag && (
                  <span className={styles.nqtTag}>{selected.nqtTag}</span>
                )}
                {(allPassed || done[selected.id]) && (
                  <span className={styles.solvedBadge}>✓ Solved</span>
                )}
              </div>
            </div>

            <div className={styles.problemDesc}>
              <p style={{ whiteSpace: "pre-line" }}>{selected.desc}</p>
            </div>

            <div className={styles.formatNote}>
              <span className={styles.formatLabel}>Output format</span>
              <span>{selected.fmt}</span>
            </div>

            <div className={styles.examples}>
              <h3 className={styles.examplesTitle}>Examples</h3>
              <div className={styles.ioGrid}>
                <div>
                  <div className={styles.ioLabel}>Input</div>
                  <pre className="code-block">{selected.tests[0].in || "(none)"}</pre>
                </div>
                <div>
                  <div className={styles.ioLabel}>Output</div>
                  <pre className="code-block">{selected.tests[0].out}</pre>
                </div>
              </div>
            </div>

            {selected.note && (
              <div className={styles.noteBox}>
                <span className={styles.noteLabel}>Note</span>
                <p>{selected.note}</p>
              </div>
            )}

            {selected.hints && (
              <div className={styles.hintsBox} style={{ marginTop: "16px", display: "flex", flexDirection: "column", gap: "8px" }}>
                {selected.hints.map((hint, i) => {
                  const isRevealed = (hintsRevealed[selected.id] || 0) > i;
                  const canReveal = (hintsRevealed[selected.id] || 0) === i;
                  
                  if (isRevealed) {
                    return (
                      <div key={i} className={styles.noteBox} style={{ borderLeftColor: "#f59e0b", background: "rgba(245, 158, 11, 0.1)" }}>
                        <strong>💡 Hint {i + 1}:</strong> <span style={{ whiteSpace: "pre-line", fontFamily: i === 2 ? "monospace" : "inherit" }}>{hint}</span>
                      </div>
                    );
                  }
                  
                  if (canReveal) {
                    return (
                      <button
                        key={i}
                        className="btn btn-ghost"
                        style={{ alignSelf: "flex-start", color: "#f59e0b", border: "1px solid #f59e0b", margin: "0 20px" }}
                        onClick={() => {
                          const nextHints = { ...hintsRevealed, [selected.id]: i + 1 };
                          setHintsRevealed(nextHints);
                          localStorage.setItem("tcs-nqt-coding-hints", JSON.stringify(nextHints));
                        }}
                      >
                        💡 Reveal Hint {i + 1}
                      </button>
                    );
                  }
                  return null;
                })}
              </div>
            )}

            {done[selected.id] && (
              <button
                className={`btn btn-danger ${styles.resetBtn}`}
                onClick={() => {
                  const d = { ...done }; delete d[selected.id];
                  const s = { ...solutions }; delete s[selected.id];
                  saveDone(d); saveSolution(s);
                  setAllPassed(false);
                  setCode(STARTERS[lang]);
                }}
              >
                Reset progress
              </button>
            )}
          </div>

          {/* ── Editor panel ── */}
          <div className={styles.editorPane}>
            {confirmLangSwitch && (
              <div style={{ padding: "12px 16px", background: "rgba(239, 68, 68, 0.1)", borderBottom: "1px solid rgba(239, 68, 68, 0.2)", display: "flex", alignItems: "center", justifyContent: "space-between" }}>
                <span style={{ color: "#fca5a5", fontSize: "14px" }}>Are you sure? Your current code will be lost.</span>
                <div style={{ display: "flex", gap: "8px" }}>
                  <button className="btn btn-danger" onClick={() => {
                    const l = confirmLangSwitch;
                    setConfirmLangSwitch(null);
                    setLang(l);
                    setCode(STARTERS[l]);
                    setOutput("");
                    setStatus("");
                    setResults([]);
                    setAllPassed(false);
                  }}>Confirm</button>
                  <button className="btn btn-ghost" onClick={() => setConfirmLangSwitch(null)}>Cancel</button>
                </div>
              </div>
            )}
            {/* Language selector + action buttons */}
            <div className={styles.langBar}>
              {(Object.entries(LANG_LABELS) as [Lang, string][]).map(([l, label]) => (
                <button
                  key={l}
                  className={`${styles.langPill} ${lang === l ? styles.langPillActive : ""}`}
                  onClick={() => switchLang(l)}
                  disabled={running}
                >
                  {label}
                </button>
              ))}
              <div className={styles.langSpacer} />
              {status && <span className={styles.statusText}>{status}</span>}
              <button
                className={`btn btn-ghost ${styles.runBtn}`}
                onClick={() => runCode()}
                disabled={running}
              >
                {running ? "Running…" : "▷ Run"}
              </button>
              <button
                className={`btn btn-primary ${styles.testBtn}`}
                onClick={runTests}
                disabled={running}
              >
                {running ? "Testing…" : "Submit"}
              </button>
              {(allPassed || done[selected.id]) && nextQ && (
                <button
                  className={`btn btn-success ${styles.nextBtn}`}
                  onClick={() => openQuestion(nextQ)}
                >
                  Next →
                </button>
              )}
            </div>

            {/* CodeMirror fills flex space */}
            <div className={styles.editorWrap}>
              <CodeEditor
                value={code}
                onChange={handleCodeChange}
                lang={lang}
                height="100%"
              />
            </div>

            {/* I/O panel with tabs */}
            <div className={styles.ioPanel}>
              <div className={styles.ioTabs}>
                <button
                  className={`${styles.ioTab} ${activePanel === "tests" ? styles.ioTabActive : ""}`}
                  onClick={() => setActivePanel("tests")}
                >
                  Test Cases
                  {results.length > 0 && (
                    <span className={`${styles.ioTabCount} ${results.every((r) => r.ok) ? styles.countPass : styles.countFail}`}>
                      {results.filter((r) => r.ok).length}/{results.length}
                    </span>
                  )}
                </button>
                <button
                  className={`${styles.ioTab} ${activePanel === "output" ? styles.ioTabActive : ""}`}
                  onClick={() => setActivePanel("output")}
                >
                  Output
                </button>
              </div>

              <div className={styles.ioContent}>
                {activePanel === "output" ? (
                  <pre className={styles.outputPre}>{output || "Run your code to see output here."}</pre>
                ) : results.length === 0 ? (
                  /* ── Pre-submit: input editor (LeetCode style) ── */
                  <div className={styles.testInputView}>
                    <div className={styles.casePills}>
                      {selected.tests.map((t, i) => !t.hidden && (
                        <button
                          key={i}
                          className={`${styles.casePill} ${selectedTestIdx === i ? styles.casePillActive : ""}`}
                          onClick={() => { setSelectedTestIdx(i); setStdin(selected.tests[i].in); }}
                        >
                          Case {i + 1}
                        </button>
                      ))}
                    </div>
                    <div className={styles.testInputBlock}>
                      <span className={styles.ioLabel}>Input</span>
                      <textarea
                        className={styles.testInputArea}
                        value={stdin}
                        onChange={(e) => setStdin(e.target.value)}
                        spellCheck={false}
                        rows={4}
                      />
                    </div>
                    {output && (
                      <div className={styles.testInputBlock}>
                        <span className={styles.ioLabel}>Output</span>
                        <pre className={styles.outputPre}>{output}</pre>
                      </div>
                    )}
                  </div>
                ) : (
                  /* ── Post-submit: results per case ── */
                  <div className={styles.testResultView}>
                    <div className={styles.casePills}>
                      {results.map((r, i) => !selected.tests[i].hidden && (
                        <button
                          key={i}
                          className={`${styles.casePill} ${selectedTestIdx === i ? styles.casePillActive : ""} ${r.ok ? styles.casePillPass : styles.casePillFail}`}
                          onClick={() => setSelectedTestIdx(i)}
                        >
                          {r.ok ? "✓" : "✗"} Case {i + 1}
                        </button>
                      ))}
                    </div>
                    {results[selectedTestIdx] && !selected.tests[selectedTestIdx].hidden ? (
                      <div className={styles.caseDetail}>
                        <div className={styles.caseDetailRow}>
                          <span className={styles.ioLabel}>Input</span>
                          <pre className={styles.caseDetailPre}>{results[selectedTestIdx].input}</pre>
                        </div>
                        <div className={styles.caseDetailRow}>
                          <span className={styles.ioLabel}>Output</span>
                          <pre className={`${styles.caseDetailPre} ${!results[selectedTestIdx].ok ? styles.testGot : ""}`}>
                            {results[selectedTestIdx].got || "(no output)"}
                          </pre>
                        </div>
                        <div className={styles.caseDetailRow}>
                          <span className={styles.ioLabel}>Expected</span>
                          <pre className={styles.caseDetailPre}>{results[selectedTestIdx].expected}</pre>
                        </div>
                      </div>
                    ) : (
                      <div className={styles.caseDetail}>
                        <p style={{ padding: "16px", color: "var(--text-muted)" }}>This is a hidden test case.</p>
                      </div>
                    )}
                    <div className={`${styles.resultSummary} ${allPassed ? styles.resultPass : styles.resultFail}`}>
                      {allPassed
                        ? `✓ All ${results.length} tests passed`
                        : `✗ ${results.filter((r) => r.ok).length} of ${results.length} tests passed`}
                    </div>
                  </div>
                )}
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}
