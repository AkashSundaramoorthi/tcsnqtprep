export type Lang = "python" | "javascript" | "c" | "cpp" | "java" | "csharp";

export const STARTERS: Record<Lang, string> = {
  python: "# Use input() to read a line, print() to output\n\n",
  javascript: "// Use input() to read a line, print(...) to output\n\n",
  c: "#include <stdio.h>\n\nint main() {\n    \n    return 0;\n}\n",
  cpp: "#include <bits/stdc++.h>\nusing namespace std;\n\nint main() {\n    ios_base::sync_with_stdio(false);\n    cin.tie(NULL);\n    \n    return 0;\n}\n",
  java: "import java.util.*;\n\npublic class Main {\n    public static void main(String[] args) {\n        Scanner sc = new Scanner(System.in);\n        \n    }\n}\n",
  csharp: "using System;\n\nclass Program {\n    static void Main(string[] args) {\n        \n    }\n}\n",
};

export const LANG_LABELS: Record<Lang, string> = {
  python: "Python 3",
  javascript: "JavaScript",
  c: "C",
  cpp: "C++",
  java: "Java",
  csharp: "C#",
};

const JS_TIMEOUT_MS = 5000;

export function runJS(code: string, stdinText: string): Promise<string> {
  return new Promise((resolve) => {
    // Run user JS in a blob Worker so an infinite loop can't freeze the page.
    const workerSrc = `
self.onmessage = function(e) {
  var code = e.data.code;
  var stdinText = e.data.stdinText;
  var lines = stdinText.length ? stdinText.replace(/\\n$/, "").split("\\n") : [];
  var i = 0;
  var out = "";
  var input = function() { return i < lines.length ? lines[i++] : ""; };
  var print = function() {
    var args = Array.prototype.slice.call(arguments);
    out += args.map(String).join(" ") + "\\n";
  };
  try {
    new Function("input", "print", "console", code)(input, print, {
      log: print, error: print, warn: print
    });
    self.postMessage({ out: out });
  } catch(err) {
    self.postMessage({ out: "Runtime Error: " + String(err) });
  }
};
`;
    const blob = new Blob([workerSrc], { type: "application/javascript" });
    const url = URL.createObjectURL(blob);
    const worker = new Worker(url);

    const timer = setTimeout(() => {
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve("⏱ Execution timed out (5 s). Check for infinite loops.");
    }, JS_TIMEOUT_MS);

    worker.onmessage = (e) => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve(e.data.out);
    };

    worker.onerror = (e) => {
      clearTimeout(timer);
      worker.terminate();
      URL.revokeObjectURL(url);
      resolve("Runtime Error: " + e.message);
    };

    worker.postMessage({ code, stdinText });
  });
}


interface PyodideInterface {
  runPythonAsync: (code: string) => Promise<unknown>;
  globals: { set: (k: string, v: unknown) => void };
}
declare global {
  interface Window {
    loadPyodide?: (opts?: { indexURL?: string }) => Promise<PyodideInterface>;
    _pyodideInstance?: PyodideInterface;
  }
}

let pyodidePromise: Promise<PyodideInterface> | null = null;
export function loadPyodideOnce(onStatus: (s: string) => void): Promise<PyodideInterface> {
  if (window._pyodideInstance) return Promise.resolve(window._pyodideInstance);
  if (!pyodidePromise) {
    onStatus("Loading Python runtime (first run takes ~5 s)…");
    pyodidePromise = new Promise<PyodideInterface>((resolve, reject) => {
      const script = document.createElement("script");
      script.src = "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/pyodide.js";
      script.onload = () => {
        window.loadPyodide!({ indexURL: "https://cdn.jsdelivr.net/pyodide/v0.26.2/full/" })
          .then((py: any) => { window._pyodideInstance = py; resolve(py); })
          .catch(reject);
      };
      script.onerror = () => reject(new Error("Could not load Python runtime (needs internet)."));
      document.head.appendChild(script);
    });
  }
  return pyodidePromise;
}

const PYTHON_TIMEOUT_MS = 10000;

export async function runPython(
  code: string,
  stdinText: string,
  onStatus: (s: string) => void,
): Promise<string> {
  const py = await loadPyodideOnce(onStatus);
  onStatus("Running…");
  py.globals.set("__user_code", code);
  py.globals.set("__user_stdin", stdinText);

  const execPromise = py.runPythonAsync(`
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

  const timeoutPromise = new Promise<string>((_, reject) =>
    setTimeout(() => reject(new Error("⏱ Execution timed out (10 s). Check for infinite loops.")), PYTHON_TIMEOUT_MS)
  );

  try {
    const result = await Promise.race([execPromise, timeoutPromise]);
    return String(result ?? "");
  } catch (err) {
    return String(err);
  }
}

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

export async function runPiston(
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

export function normalize(s: string): string {
  const lines = s.split('\n').map(line => line.trimEnd());
  let start = 0, end = lines.length - 1;
  while (start <= end && lines[start] === '') start++;
  while (end >= start && lines[end] === '') end--;
  return lines.slice(start, end + 1).join('\n');
}
