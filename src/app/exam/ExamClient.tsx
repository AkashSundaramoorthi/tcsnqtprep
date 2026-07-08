
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ExamQuestion } from "@/lib/exam";
import styles from "./exam.module.css";
import { QUESTIONS, Question } from "@/lib/questions";
import { Lang, STARTERS, LANG_LABELS, runJS, runPython, runPiston, normalize } from "@/lib/runner";
import dynamic from "next/dynamic";
import Calculator from "@/components/Calculator";
import { analytics } from "@/lib/analytics";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });

const PHASES = [
  { id: "start", duration: 0, title: "TCS NQT Mock Exam" },
  
  { id: "mcq-numerical", duration: 25 * 60, title: "Numerical Ability", calc: true, section: "Numerical" },
  { id: "mcq-reasoning", duration: 25 * 60, title: "Reasoning Ability", calc: true, section: "Reasoning" },
  { id: "mcq-advquant", duration: 25 * 60, title: "Advanced Quant & Reasoning", calc: true, section: "AdvQuant" },
  
  { id: "verbal-instruct-sentence", duration: 25, title: "Instructions: Sentence Completion", calc: false },
  { id: "verbal-sentence", duration: 25, title: "Sentence Completion", calc: false, section: "Verbal", vType: "sentence", perQuestion: true },
  
  { id: "verbal-instruct-passage", duration: 15, title: "Instructions: Passage Recall", calc: false },
  { id: "verbal-passage", duration: 30, title: "Passage Recall", calc: false, section: "Verbal", vType: "passage", perQuestion: true },
  
  { id: "verbal-email", duration: 540, title: "Email Writing", calc: false, section: "Verbal", vType: "email" },
  
  { id: "coding-easy", duration: 20 * 60, title: "Advanced Coding (Easy)", calc: false },
  { id: "break", duration: 60, title: "1-Minute Break", calc: false },
  { id: "coding-medium", duration: 25 * 60, title: "Advanced Coding (Medium)", calc: false },
  
  { id: "results", duration: 0, title: "Exam Results" }
];

interface Props { questions: ExamQuestion[]; }

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ExamClient({ questions }: Props) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [shuffledExam, setShuffledExam] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | string | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [viewedQuestions, setViewedQuestions] = useState<Record<number, boolean>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  
  const [showCalc, setShowCalc] = useState(false);
  const [confirmingSubmit, setConfirmingSubmit] = useState(false);
  
  const [codingQEasy, setCodingQEasy] = useState<Question | null>(null);
  const [codingQMedium, setCodingQMedium] = useState<Question | null>(null);
  const [lang, setLang] = useState<Lang>("python");
  const [code, setCode] = useState(STARTERS["python"]);
  const [runOutput, setRunOutput] = useState("");
  const [testResults, setTestResults] = useState<any[] | null>(null);
  const [running, setRunning] = useState(false);
  const [codingPassedEasy, setCodingPassedEasy] = useState(0);
  const [codingPassedMedium, setCodingPassedMedium] = useState(0);
  
  const [passageMode, setPassageMode] = useState<"read" | "write">("read");
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const currentPhase = PHASES[phaseIdx];

  const sectionIndices = useMemo(() => {
    const indices: Record<string, { start: number; end: number }> = {};
    PHASES.forEach(p => {
      if (!p.section) return;
      let start = -1, end = 0;
      shuffledExam.forEach((q, i) => {
        if (q.section === p.section) {
          if (p.vType && q.verbalType !== p.vType) return;
          if (start === -1) start = i;
          end = i + 1;
        }
      });
      indices[p.id] = start === -1 ? { start: 0, end: 0 } : { start, end };
    });
    return indices;
  }, [shuffledExam]);

  const advancePhase = () => {
    if (phaseIdx < PHASES.length - 1) {
      const nextPhase = PHASES[phaseIdx + 1];
      setPhaseIdx(idx => idx + 1);
      
      let nextDuration = nextPhase.duration;
      if (nextPhase.id === "verbal-passage") {
        setPassageMode("read");
        nextDuration = 30;
      }
      setTimeLeft(nextDuration);
      
      if (nextPhase.section) {
         setCurrent(sectionIndices[nextPhase.id]?.start || 0);
      } else {
         setCurrent(0);
      }
      
      setConfirmingSubmit(false);
      setCode(STARTERS[lang]);
      setRunOutput("");
      setTestResults(null);
    }
  };

  useEffect(() => {
    setViewedQuestions(prev => ({ ...prev, [current]: true }));
  }, [current]);

  useEffect(() => {
    analytics.trackEvent("exam_page_opened");
  }, []);

  useEffect(() => {
    if (phaseIdx === 0 || phaseIdx === PHASES.length - 1) return;
    
    timerRef.current = setInterval(() => {
      setTimeLeft(t => {
        if (t <= 1) {
          if (currentPhase.id === "verbal-passage" && passageMode === "read") {
            setPassageMode("write");
            return 90;
          }
          
          if (currentPhase.perQuestion) {
            const indices = sectionIndices[currentPhase.id];
            if (indices && current < indices.end - 1) {
               setCurrent(c => c + 1);
               if (currentPhase.id === "verbal-passage") {
                 setPassageMode("read");
                 return 30;
               }
               return currentPhase.duration;
            } else {
               advancePhase();
               return 0; 
            }
          }
          
          advancePhase();
          return 0;
        }
        return t - 1;
      });
    }, 1000);
    return () => { if (timerRef.current) clearInterval(timerRef.current); };
  }, [phaseIdx, current, passageMode, sectionIndices, currentPhase]);

  const updateAnswer = (index: number, val: string | number | null) => {
    setAnswers(prev => {
      const next = [...prev];
      next[index] = val;
      return next;
    });
  };

  const handleNextPerQuestion = () => {
    if (currentPhase.id === "verbal-passage" && passageMode === "read") {
       setPassageMode("write");
       setTimeLeft(90);
       return;
    }
    
    const indices = sectionIndices[currentPhase.id];
    if (indices && current < indices.end - 1) {
       setCurrent(c => c + 1);
       if (currentPhase.id === "verbal-passage") {
         setPassageMode("read");
         setTimeLeft(30);
       } else {
         setTimeLeft(currentPhase.duration);
       }
    } else {
       advancePhase();
    }
  };

  const startExam = () => {
    analytics.trackEvent("exam_started");
    const mapped = questions.map(q => {
      if (q.isTyped || q.verbalType) return { ...q };
      const optObjs = q.opts.map((opt, idx) => ({ text: opt, isCorrect: idx === q.answer }));
      const shuffledOpts = shuffleArray(optObjs);
      return {
        ...q,
        opts: shuffledOpts.map(o => o.text),
        answer: shuffledOpts.findIndex(o => o.isCorrect)
      };
    });
    
    setShuffledExam(mapped);
    setAnswers(Array(mapped.length).fill(null));
    
    const easyPool = QUESTIONS.filter(q => q.level === 'Easy');
    const medPool = QUESTIONS.filter(q => q.level === 'Medium');
    setCodingQEasy(easyPool[Math.floor(Math.random() * easyPool.length)]);
    setCodingQMedium(medPool[Math.floor(Math.random() * medPool.length)]);
    
    setPhaseIdx(1);
    setTimeLeft(PHASES[1].duration);
    setCurrent(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const currentCodingQ = currentPhase.id === "coding-easy" ? codingQEasy : codingQMedium;

  const handleRunCode = async () => {
    if (!currentCodingQ) return;
    setRunning(true);
    setTestResults(null);
    setRunOutput("Compiling & Testing...");
    
    try {
      const tests = [...currentCodingQ.tests];
      while (tests.length < 7) {
        tests.push({ ...tests[tests.length - 1], hidden: true });
      }
      tests.forEach((t, i) => t.hidden = i >= 2);
      
      let passedCount = 0;
      let passedPrivate = 0;
      let logs = "";
      const resultsArray: any[] = [];
      
      for (let i = 0; i < tests.length; i++) {
        const test = tests[i];
        let out = "";
        if (lang === "javascript") out = runJS(code, test.in);
        else if (lang === "python") out = await runPython(code, test.in, setRunOutput);
        else out = await runPiston(lang, code, test.in, setRunOutput);
        
        const isPass = normalize(out) === normalize(test.out);
        
        if (!test.hidden) {
          resultsArray.push({
            id: i + 1,
            in: test.in,
            expected: test.out,
            actual: out,
            isPass
          });
        } else {
          if (isPass) passedPrivate++;
        }
        
        if (isPass) passedCount++;
      }
      
      if (passedCount === tests.length) {
        logs = "All test cases (public and private) have passed successfully! ✅";
      } else {
        logs = "Some test cases have failed (either public or private test cases) ❌";
      }
      
      if (currentPhase.id === "coding-easy") setCodingPassedEasy(passedPrivate);
      else setCodingPassedMedium(passedPrivate);
      
      setRunOutput(logs);
      setTestResults(resultsArray);
    } finally {
      setRunning(false);
    }
  };

  if (phaseIdx === 0) {
    return (
      <div className="container section">
        <div className={styles.startCard}>
          <h1 className={styles.startTitle}>TCS NQT Full Mock Exam</h1>
          <p className={styles.startSub}>
            Complete the assessment in one sitting. The timer cannot be paused.
          </p>
          <div className={styles.startTips}>
            <ul style={{ textAlign: "left", lineHeight: "1.6", margin: "10px 0 10px 20px", color: "var(--text-2)" }}>
              <li><strong>Numerical Ability:</strong> 20 questions (25 mins)</li>
              <li><strong>Reasoning Ability:</strong> 20 questions (25 mins)</li>
              <li><strong>Adv Quant & Reasoning:</strong> 14 questions (25 mins)</li>
              <li><strong>Verbal Ability:</strong> 25 questions (26 mins, strict per-question timers)</li>
              <li><strong>Coding:</strong> 2 questions (Easy/Medium, auto-saving test cases)</li>
            </ul>
            <p style={{ marginTop: "10px" }}>💡 Note: Sections are locked sequentially. You cannot return to previous sections once submitted.</p>
          </div>
          <button className="btn btn-primary" style={{ fontSize: "1rem", padding: "13px 36px" }} onClick={startExam}>
            Start Full Exam →
          </button>
        </div>
      </div>
    );
  }

  if (phaseIdx === PHASES.length - 1) {
    const calcScore = (id: string) => {
      const indices = sectionIndices[id];
      if (!indices) return { score: 0, total: 0 };
      let score = 0;
      for (let i = indices.start; i < indices.end; i++) {
        const q = shuffledExam[i];
        if (q.isTyped || q.verbalType === "sentence") {
           const ans = (answers[i] as string || "").toLowerCase().trim();
           const correct = q.answer.toString().toLowerCase().trim();
           if (ans === correct) score++;
        } else {
           if (answers[i] === q.answer) score++;
        }
      }
      return { score, total: indices.end - indices.start };
    };

    const num = calcScore("mcq-numerical");
    const reas = calcScore("mcq-reasoning");
    const adv = calcScore("mcq-advquant");
    const verb = calcScore("verbal-sentence");

    return (
      <div className="container section">
        <div className={styles.startCard}>
          <h1 className={styles.startTitle}>Exam Completed! 🎉</h1>
          <p className={styles.startSub}>Great job making it to the end.</p>
          
          <div style={{ background: "var(--surface-2)", padding: "20px", borderRadius: "8px", margin: "20px 0 10px 0", width: "100%" }}>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--text)" }}>Aptitude & Verbal Scores</h2>
            <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(130px, 1fr))", gap: "20px", textAlign: "center" }}>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "var(--primary)" }}>{num.score} / {num.total}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-3)", textTransform: "uppercase" }}>Numerical</div>
              </div>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "var(--primary)" }}>{reas.score} / {reas.total}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-3)", textTransform: "uppercase" }}>Reasoning</div>
              </div>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "var(--primary)" }}>{adv.score} / {adv.total}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-3)", textTransform: "uppercase" }}>Adv. Quant</div>
              </div>
              <div>
                <div style={{ fontSize: "1.8rem", fontWeight: "bold", color: "var(--primary)" }}>{verb.score} / {verb.total}</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-3)", textTransform: "uppercase" }}>Sentence Comp.</div>
              </div>
            </div>
            <p style={{ marginTop: "16px", fontSize: "0.85rem", color: "var(--text-3)", textAlign: "center", fontStyle: "italic" }}>
              * Passage Recall and Email Writing require manual subjective grading.
            </p>
          </div>

          <div style={{ background: "var(--surface-2)", padding: "20px", borderRadius: "8px", margin: "10px 0 20px 0", width: "100%" }}>
            <h2 style={{ fontSize: "1.1rem", marginBottom: "16px", color: "var(--text)" }}>Coding Results (Private Tests)</h2>
            <div style={{ display: "flex", justifyContent: "space-around" }}>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: codingPassedEasy === 5 ? "var(--success, #10b981)" : "var(--accent)" }}>{codingPassedEasy} / 5</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-3)", textTransform: "uppercase" }}>Easy Passed</div>
              </div>
              <div style={{ textAlign: "center" }}>
                <div style={{ fontSize: "2rem", fontWeight: "bold", color: codingPassedMedium === 5 ? "var(--success, #10b981)" : "var(--accent)" }}>{codingPassedMedium} / 5</div>
                <div style={{ fontSize: "0.8rem", color: "var(--text-3)", textTransform: "uppercase" }}>Medium Passed</div>
              </div>
            </div>
          </div>
          
          <button className="btn btn-primary" onClick={() => window.location.reload()}>Return Home</button>
        </div>
      </div>
    );
  }

  const q = shuffledExam[current];
  const indices = sectionIndices[currentPhase.id] || { start: 0, end: 0 };
  const sectionLength = indices.end - indices.start;
  const answeredCount = Array.from({ length: sectionLength }).filter((_, i) => answers[indices.start + i] !== null && answers[indices.start + i] !== "").length;
  const showSidebar = !currentPhase.id.startsWith("coding-") && !currentPhase.id.startsWith("verbal-instruct") && currentPhase.id !== "break";

  return (
    <div className={styles.examPage}>
      {showCalc && currentPhase.calc && <Calculator onClose={() => setShowCalc(false)} />}
      
      <div className={styles.examBar}>
        <div className={`container ${styles.examBarInner}`}>
          <span className={styles.examTitle}>{currentPhase.title}</span>
          <div className={`${styles.timer} ${timeLeft <= 60 ? styles.timerLow : ""}`}>
            {formatTime(timeLeft)}
          </div>
          <div style={{ display: "flex", gap: "8px" }}>
            {currentPhase.calc && (
              <button className={`btn btn-secondary ${styles.examActionBtn}`} onClick={() => setShowCalc(true)}>
                🖩 <span className={styles.hideMobile}>Calculator</span>
              </button>
            )}
            {!currentPhase.perQuestion && (
              <button className={`btn btn-primary ${styles.examActionBtn}`} onClick={() => setConfirmingSubmit(true)}>
                Submit<span className={styles.hideMobile}> Section</span>
              </button>
            )}
          </div>
        </div>
      </div>
      
      <div className={`container ${styles.examLayout}`} style={{ display: showSidebar ? "grid" : "block" }}>
        <div className={styles.examMainCol} style={{ height: currentPhase.id.startsWith("coding-") ? "calc(100vh - 120px)" : "auto" }}>
          
          {confirmingSubmit && !currentPhase.perQuestion && (
            <div style={{ background: "var(--surface-2)", border: "1px solid var(--border)", padding: "20px", borderRadius: "8px", display: "flex", flexDirection: "column", gap: "12px" }}>
              <div style={{ color: "var(--text)", fontWeight: 500 }}>
                Are you sure you want to submit {currentPhase.title}? You cannot return.
              </div>
              <div style={{ display: "flex", gap: "12px" }}>
                <button className="btn btn-primary" onClick={() => advancePhase()}>Confirm Submit</button>
                <button className="btn btn-ghost" onClick={() => setConfirmingSubmit(false)}>Cancel</button>
              </div>
            </div>
          )}

          {/* INSTRUCTIONS */}
          {currentPhase.id.startsWith("verbal-instruct") && (
            <div className={styles.instructScreen}>
              <h2>Read carefully before proceeding</h2>
              {currentPhase.id === "verbal-instruct-sentence" && (
                <p>Instructions for "Sentence Completion": Please type one word that best fits the meaning of the sentence. Type only one word. You will have 25 seconds for each sentence.</p>
              )}
              {currentPhase.id === "verbal-instruct-passage" && (
                <p>Instructions for "Passage Recall": You will have 30 seconds to read a paragraph. After 30 seconds, it will disappear. Then, you will have 90 seconds to reconstruct the paragraph. Your answer will be scored for clear and accurate content, not word-for-word memorization.</p>
              )}
            </div>
          )}
          
          {/* VERBAL - SENTENCE COMPLETION */}
          {currentPhase.id === "verbal-sentence" && q && (
            <div className={styles.qCard}>
              <div className={styles.qTop}>
                 <span className={styles.qNum}>Question {current + 1 - indices.start}</span>
              </div>
              <div className={styles.qText}>{q.q}</div>
              <input 
                type="text" 
                className={styles.typedInput} 
                placeholder="Type exactly one word..."
                value={(answers[current] as string) || ""}
                onChange={(e) => updateAnswer(current, e.target.value.trim())}
                onKeyDown={(e) => { if (e.key === 'Enter') handleNextPerQuestion(); }}
                autoFocus
              />
              <div className={styles.navRow} style={{ justifyContent: "flex-end", marginTop: "20px" }}>
                <button className="btn btn-primary" onClick={handleNextPerQuestion}>Next →</button>
              </div>
            </div>
          )}
          
          {/* VERBAL - PASSAGE RECALL */}
          {currentPhase.id === "verbal-passage" && q && (
            <div className={styles.qCard}>
              <div className={styles.qTop}>
                 <span className={styles.qNum}>Question {current + 1 - indices.start}</span>
              </div>
              <div className={styles.qText}>{q.q}</div>
              {passageMode === "read" ? (
                <div className={styles.passageReadBox}>
                  <p>{q.passageText}</p>
                  <div style={{ color: "#ef4444", marginTop: "12px" }}>The text will disappear when the timer hits zero. Read carefully.</div>
                  <div className={styles.navRow} style={{ justifyContent: "flex-end", marginTop: "20px" }}>
                    <button className="btn btn-primary" onClick={handleNextPerQuestion}>Start Writing →</button>
                  </div>
                </div>
              ) : (
                <div style={{ display: "flex", flexDirection: "column", gap: "10px" }}>
                  <textarea 
                    className={styles.passageWriteBox}
                    placeholder="Rewrite the passage in your own words..."
                    value={(answers[current] as string) || ""}
                    onChange={(e) => updateAnswer(current, e.target.value)}
                    autoFocus
                  />
                  <div className={styles.navRow} style={{ justifyContent: "flex-end", marginTop: "10px" }}>
                    <button className="btn btn-primary" onClick={handleNextPerQuestion}>Next →</button>
                  </div>
                </div>
              )}
            </div>
          )}
          
          {/* VERBAL - EMAIL WRITING */}
          {currentPhase.id === "verbal-email" && q && (
            <div className={styles.qCard}>
              <div className={styles.qText}><strong>Email Writing.</strong> {q.q}</div>
              <textarea 
                style={{ width: "100%", height: "300px", padding: "12px", marginTop: "16px", marginBottom: "24px", background: "var(--bg-1)", color: "var(--text)", border: "1px solid var(--border)", borderRadius: "6px", outline: "none" }}
                placeholder="Write your email here..."
                value={(answers[current] as string) || ""}
                onChange={(e) => updateAnswer(current, e.target.value)}
              />
              <div style={{ marginTop: "8px", fontWeight: "bold" }}>
                Word Count: {((answers[current] as string) || "").split(/\s+/).filter(Boolean).length} / 100 minimum
              </div>
            </div>
          )}

          {/* REGULAR MCQ */}
          {currentPhase.id.startsWith("mcq-") && q && !q.verbalType && (
            <div className={styles.qCard}>
              <div className={styles.qTop}>
                <span className={styles.qNum}>Question {current + 1 - indices.start}</span>
              </div>
              <div className={styles.qText}>{q.q}</div>
              {q.image && (
                <div style={{ margin: "20px 0" }}>
                  <img src={q.image} alt="Question figure" style={{ maxWidth: "100%", maxHeight: "300px", borderRadius: "8px" }} />
                </div>
              )}
              {q.isTyped ? (
                <input 
                  type="text" 
                  className={styles.typedInput} 
                  value={(answers[current] as string) || ""}
                  onChange={(e) => updateAnswer(current, e.target.value)}
                />
              ) : (
                <div className={styles.options}>
                  {q.opts.map((opt, idx) => (
                    <label key={idx} className={`${styles.option} ${answers[current] === idx ? styles.optionSelected : ""}`}>
                      <input style={{display:"none"}} type="radio" name={`q-${current}`} checked={answers[current] === idx} onChange={() => updateAnswer(current, idx)} />
                      <div className={styles.optKey}>{String.fromCharCode(65 + idx)}</div>
                      <div style={{ flex: 1 }}>
                        {opt.endsWith('.svg') ? (
                          <img src={opt} alt={`Option ${String.fromCharCode(65 + idx)}`} style={{ maxHeight: "80px" }} />
                        ) : (
                          opt
                        )}
                      </div>
                    </label>
                  ))}
                </div>
              )}
              
              <div className={styles.navRow}>
                <button className="btn btn-secondary" onClick={() => setCurrent(c => c - 1)} disabled={current === indices.start}>Previous</button>
                <button 
                  className={`btn btn-review ${markedForReview[current] ? 'active' : ''}`}
                  onClick={() => setMarkedForReview(prev => ({ ...prev, [current]: !prev[current] }))}
                >
                  {markedForReview[current] ? "Unmark Review" : "Mark for Review"}
                </button>
                <button className="btn btn-secondary" onClick={() => setCurrent(c => c + 1)} disabled={current === indices.end - 1}>Next</button>
              </div>
            </div>
          )}

          {/* CODING */}
          {currentPhase.id.startsWith("coding-") && currentCodingQ && (
            <div className={styles.codingGrid}>
              <div className={styles.codingDesc}>
                <h3>{currentCodingQ.title}</h3>
                <p style={{ whiteSpace: "pre-line" }}>{currentCodingQ.desc}</p>
                <h4 style={{marginTop: "20px", marginBottom: "8px"}}>Format</h4>
                <p>{currentCodingQ.fmt}</p>
              </div>
              <div className={styles.codingEditor}>
                <div className={styles.editorToolbar}>
                  <select value={lang} onChange={(e) => {
                    setLang(e.target.value as Lang);
                    setCode(STARTERS[e.target.value as Lang]);
                  }}>
                    {Object.entries(LANG_LABELS).map(([k, v]) => <option key={k} value={k}>{v}</option>)}
                  </select>
                  <button className="btn btn-primary" onClick={handleRunCode} disabled={running}>
                    {running ? "Compiling..." : "Compile & Test (Auto-saves)"}
                  </button>
                </div>
                <div style={{ flex: 1, overflow: "hidden" }}>
                  <CodeEditor value={code} onChange={setCode} lang={lang} />
                </div>
                <div className={styles.outputBox}>
                  <strong>Test Results:</strong>
                  {!testResults && <pre>{runOutput || "Run code to see public test cases and private score..."}</pre>}
                  {testResults && (
                    <div style={{ display: "flex", flexDirection: "column", gap: "12px", marginTop: "12px" }}>
                      <div style={{ padding: "16px", background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "8px", fontWeight: "bold", textAlign: "center", color: runOutput.includes("✅") ? "var(--success, #10b981)" : "var(--error, #ef4444)" }}>
                        {runOutput}
                      </div>
                      {testResults.map((tr: any) => (
                        <div key={tr.id} style={{ background: "var(--surface)", border: `1px solid ${tr.isPass ? "var(--success, #10b981)" : "var(--error, #ef4444)"}`, borderRadius: "8px", padding: "12px" }}>
                          <div style={{ display: "flex", justifyContent: "space-between", fontWeight: "bold", marginBottom: "8px", color: tr.isPass ? "var(--success, #10b981)" : "var(--error, #ef4444)" }}>
                            <span>Test Case {tr.id}</span>
                            <span>{tr.isPass ? "PASSED ✅" : "FAILED ❌"}</span>
                          </div>
                          <div style={{ fontSize: "0.9rem", color: "var(--text-2)" }}>
                            <div style={{ marginBottom: "4px" }}><strong>Input:</strong></div>
                            <pre style={{ background: "var(--bg-1)", padding: "8px", borderRadius: "4px", marginBottom: "8px", whiteSpace: "pre-wrap" }}>{tr.in}</pre>
                            
                            <div style={{ marginBottom: "4px" }}><strong>Expected Output:</strong></div>
                            <pre style={{ background: "var(--bg-1)", padding: "8px", borderRadius: "4px", marginBottom: "8px", whiteSpace: "pre-wrap" }}>{tr.expected}</pre>
                            
                            <div style={{ marginBottom: "4px" }}><strong>Actual Output:</strong></div>
                            <pre style={{ background: "var(--bg-1)", padding: "8px", borderRadius: "4px", margin: 0, whiteSpace: "pre-wrap" }}>{tr.actual || "No output"}</pre>
                          </div>
                        </div>
                      ))}
                    </div>
                  )}
                </div>
              </div>
            </div>
          )}
          
          {/* BREAK */}
          {currentPhase.id === "break" && (
             <div className="container section" style={{ textAlign: "center" }}>
               <h1>Time for a quick break!</h1>
               <p style={{ color: "var(--text-2)", fontSize: "1.2rem", margin: "20px 0" }}>Take a deep breath. The next section starts automatically in:</p>
               <div style={{ fontSize: "3rem", fontWeight: "bold", color: "var(--primary)" }}>{timeLeft}s</div>
               <button className="btn btn-ghost" style={{ marginTop: "30px" }} onClick={advancePhase}>Skip Break</button>
             </div>
          )}
        </div>
        
        {/* PALETTE / SIDEBAR */}
        {showSidebar && (
          <aside className={styles.palette}>
            <div className={styles.paletteLabel}>Question Palette</div>
            <div className={styles.paletteGrid}>
              {Array.from({ length: sectionLength }).map((_, i) => {
                const globalIdx = indices.start + i;
                return (
                  <button
                    key={i}
                    className={`${styles.palBtn} ${
                      globalIdx === current ? styles.palCurrent : 
                      markedForReview[globalIdx] ? styles.palReview : 
                      (answers[globalIdx] !== null && answers[globalIdx] !== "") ? styles.palAnswered : 
                      viewedQuestions[globalIdx] ? styles.palViewed : ""
                    }`}
                    onClick={() => {
                      if (!currentPhase.perQuestion) setCurrent(globalIdx);
                    }}
                    style={{ cursor: currentPhase.perQuestion ? "default" : "pointer" }}
                  >
                    {i + 1}
                  </button>
                );
              })}
            </div>
            <div className={styles.answeredCount} style={{ textAlign: "center", fontSize: "0.85rem", color: "var(--text-3)", marginBottom: "16px" }}>
              {answeredCount} / {sectionLength} answered
            </div>
            {!currentPhase.perQuestion && (
              <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setConfirmingSubmit(true)}>Submit Section</button>
            )}
          </aside>
        )}
      </div>
    </div>
  );
}
