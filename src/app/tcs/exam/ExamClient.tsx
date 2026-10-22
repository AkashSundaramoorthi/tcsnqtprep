
"use client";

import { useState, useEffect, useRef, useMemo } from "react";
import { ExamQuestion } from "@/lib/exam";
import styles from "./exam.module.css";
import { QUESTIONS, Question } from "@/lib/questions";
import { Lang, STARTERS, LANG_LABELS, runJS, runPython, runJudge0, normalize } from "@/lib/runner";
import dynamic from "next/dynamic";
import Calculator from "@/components/Calculator";
import { CalculatorIcon } from "lucide-react";
import { analytics } from "@/lib/analytics";

const CodeEditor = dynamic(() => import("@/components/CodeEditor"), { ssr: false });

import { EXAM_PHASES } from "@/lib/exam-config";
import { TrackId } from "@/lib/tracks";

interface Props { 
  questions: ExamQuestion[]; 
  track: TrackId;
}

function shuffleArray<T>(array: T[]): T[] {
  const arr = [...array];
  for (let i = arr.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [arr[i], arr[j]] = [arr[j], arr[i]];
  }
  return arr;
}

export default function ExamClient({ questions, track }: Props) {
  const [phaseIdx, setPhaseIdx] = useState(0);
  const [timeLeft, setTimeLeft] = useState(0);
  const [shuffledExam, setShuffledExam] = useState<ExamQuestion[]>([]);
  const [answers, setAnswers] = useState<(number | string | null)[]>([]);
  const [current, setCurrent] = useState(0);
  const [viewedQuestions, setViewedQuestions] = useState<Record<number, boolean>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  
  const [showCalc, setShowCalc] = useState(false);
  const [confirmingSubmit, setConfirmingSubmit] = useState(false);
  const [aptMissedPage, setAptMissedPage] = useState(1);
  const [verbMissedPage, setVerbMissedPage] = useState(1);
  
  const [codingFinalCodeEasy, setCodingFinalCodeEasy] = useState("");
  const [codingFinalCodeMedium, setCodingFinalCodeMedium] = useState("");
  const [codingFinalCodeHard, setCodingFinalCodeHard] = useState("");
  const [codingFinalCodeComplex, setCodingFinalCodeComplex] = useState("");
  
  const [codingQEasy, setCodingQEasy] = useState<Question | null>(null);
  const [codingQMedium, setCodingQMedium] = useState<Question | null>(null);
  const [codingQHard, setCodingQHard] = useState<Question | null>(null);
  const [codingQComplex, setCodingQComplex] = useState<Question | null>(null);
  const [lang, setLang] = useState<Lang>("python");
  const [code, setCode] = useState(STARTERS["python"]);
  const [runOutput, setRunOutput] = useState("");
  const [testResults, setTestResults] = useState<any[] | null>(null);
  const [running, setRunning] = useState(false);
  const [codingPassedEasy, setCodingPassedEasy] = useState(0);
  const [codingPassedMedium, setCodingPassedMedium] = useState(0);
  const [codingPassedHard, setCodingPassedHard] = useState(0);
  const [codingPassedComplex, setCodingPassedComplex] = useState(0);
  
  const [passageMode, setPassageMode] = useState<"read" | "write">("read");
  
  const timerRef = useRef<ReturnType<typeof setInterval> | null>(null);

  const phases = EXAM_PHASES[track];
  const currentPhase = phases[phaseIdx];

  const sectionIndices = useMemo(() => {
    const indices: Record<string, { start: number; end: number }> = {};
    phases.forEach(p => {
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
  }, [shuffledExam, phases]);

  const advancePhase = () => {
    if (phaseIdx < phases.length - 1) {
      if (currentPhase.id === "coding-easy" || currentPhase.id === "coding-1") setCodingFinalCodeEasy(code);
      if (currentPhase.id === "coding-medium" || currentPhase.id === "coding-2") setCodingFinalCodeMedium(code);
      if (currentPhase.id === "coding-3") setCodingFinalCodeHard(code);
      if (currentPhase.id === "coding-4") setCodingFinalCodeComplex(code);
      
      const nextPhase = phases[phaseIdx + 1];
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
    if (phaseIdx === 0 || phaseIdx === phases.length - 1) return;
    
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
    
    // Group questions into a pool and randomly sample based on phases
    const finalExamQuestions: ExamQuestion[] = [];
    
    // Process each phase and extract random questions
    phases.forEach(p => {
      if (p.section) {
        // Filter questions matching the section and vType
        let pool = questions.filter(q => q.section === p.section && (!p.vType || q.verbalType === p.vType));
        // Shuffle the pool
        pool = shuffleArray(pool);
        
        // Take the required count, or all if count is undefined/greater
        const count = p.count || pool.length;
        const selected = pool.slice(0, count);
        
        selected.forEach(q => {
          if (q.isTyped || q.verbalType) {
            finalExamQuestions.push({ ...q });
          } else {
            // Shuffle options
            const optObjs = q.opts.map((opt, idx) => ({ text: opt, isCorrect: idx === q.answer }));
            const shuffledOpts = shuffleArray(optObjs);
            finalExamQuestions.push({
              ...q,
              opts: shuffledOpts.map(o => o.text),
              answer: shuffledOpts.findIndex(o => o.isCorrect)
            });
          }
        });
      }
    });
    
    // If no phases had sections (e.g. Infosys), fallback to the old way for safety
    if (finalExamQuestions.length === 0) {
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
    } else {
      setShuffledExam(finalExamQuestions);
      setAnswers(Array(finalExamQuestions.length).fill(null));
    }
    
    const easyPool = QUESTIONS.filter(q => q.level === 'Easy');
    const medPool = QUESTIONS.filter(q => q.level === 'Medium');
    const hardPool = QUESTIONS.filter(q => q.level === 'Hard');
    
    if (track === "hackwithinfy") {
      let p1 = QUESTIONS.filter(q => q.track === "hackwithinfy" && q.level === 'Easy');
      let p2 = QUESTIONS.filter(q => q.track === "hackwithinfy" && q.level === 'Medium');
      let p3 = QUESTIONS.filter(q => q.track === "hackwithinfy" && q.level === 'Hard');
      let p4 = QUESTIONS.filter(q => q.track === "hackwithinfy" && q.level === 'Complex');
      if (p1.length === 0) p1 = easyPool; // Fallback to TCS questions until populated
      if (p2.length === 0) p2 = medPool; // Fallback to TCS questions until populated
      if (p3.length === 0) p3 = hardPool;
      if (p4.length === 0) p4 = hardPool;
      setCodingQEasy(p1[Math.floor(Math.random() * p1.length)]);
      setCodingQMedium(p2[Math.floor(Math.random() * p2.length)]);
      setCodingQHard(p3[Math.floor(Math.random() * p3.length)]);
      setCodingQComplex(p4[Math.floor(Math.random() * p4.length)]);
    } else {
      let p1 = QUESTIONS.filter(q => q.track === "tcs-nqt" && q.level === 'Easy');
      let p2 = QUESTIONS.filter(q => q.track === "tcs-nqt" && q.level === 'Medium');
      if (p1.length === 0) p1 = easyPool;
      if (p2.length === 0) p2 = medPool;
      setCodingQEasy(p1[Math.floor(Math.random() * p1.length)]);
      setCodingQMedium(p2[Math.floor(Math.random() * p2.length)]);
    }
    
    setPhaseIdx(1);
    setTimeLeft(phases[1].duration);
    setCurrent(0);
  };

  const formatTime = (s: number) => {
    const m = Math.floor(s / 60).toString().padStart(2, "0");
    const sec = (s % 60).toString().padStart(2, "0");
    return `${m}:${sec}`;
  };

  const currentCodingQ = (currentPhase.id === "coding-easy" || currentPhase.id === "coding-1") ? codingQEasy : (currentPhase.id === "coding-2" ? codingQMedium : (currentPhase.id === "coding-3" ? codingQHard : codingQComplex));

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
      
      if (lang === "python") {
        for (let i = 0; i < tests.length; i++) {
          const test = tests[i];
          let out = "";
          try {
            out = await runPython(code, test.in, setRunOutput);
          } catch (e) { out = String(e); }
          
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
      } else {
        const promises = tests.map(async (test, i) => {
          let out = "";
          try {
            if (lang === "javascript") out = await runJS(code, test.in);
            else out = await runJudge0(lang, code, test.in, setRunOutput);
          } catch (e) { out = String(e); }
          
          const isPass = normalize(out) === normalize(test.out);
          return { id: i + 1, in: test.in, expected: test.out, actual: out, isPass, hidden: test.hidden };
        });
        
        const resolved = await Promise.all(promises);
        for (const r of resolved) {
          if (!r.hidden) {
            resultsArray.push({ id: r.id, in: r.in, expected: r.expected, actual: r.actual, isPass: r.isPass });
          } else {
            if (r.isPass) passedPrivate++;
          }
          if (r.isPass) passedCount++;
        }
      }
      
      if (passedCount === tests.length) {
        logs = "All test cases (public and private) have passed successfully! ✅";
      } else {
        logs = "Some test cases have failed (either public or private test cases) ❌";
      }
      
      if (currentPhase.id === "coding-easy" || currentPhase.id === "coding-1") setCodingPassedEasy(passedPrivate);
      else if (currentPhase.id === "coding-3") setCodingPassedHard(passedPrivate);
      else if (currentPhase.id === "coding-4") setCodingPassedComplex(passedPrivate);
      else setCodingPassedMedium(passedPrivate);
      
      setRunOutput(logs);
      setTestResults(resultsArray);
    } catch (err) {
      setRunOutput("Something went wrong while running your code: " + String(err instanceof Error ? err.message : err) + ". Please try again.");
    } finally {
      setRunning(false);
    }
  };

  if (phaseIdx === 0) {
    return (
      <div className="container section">
        <div className={styles.startCard}>
          <h1 className={styles.startTitle}>{track === "hackwithinfy" ? "HackWithInfy Mock Round" : "TCS NQT Full Mock Exam"}</h1>
          <p className={styles.startSub}>
            Complete the assessment in one sitting. The timer cannot be paused.
          </p>
          <div className={styles.startTips}>
            <ul style={{ textAlign: "left", lineHeight: "1.6", margin: "10px 0 10px 20px", color: "var(--text-2)" }}>
              {track === "hackwithinfy" ? (
                <>
                  <li><strong>Problem 1:</strong> Easy DSA (45 mins)</li>
                  <li><strong>Problem 2:</strong> Medium DSA (45 mins)</li>
                  <li><strong>Problem 3:</strong> Hard DSA (45 mins)</li>
                  <li><strong>Problem 4:</strong> Complex DSA (45 mins)</li>
                </>
              ) : (
                <>
                  <li><strong>Numerical Ability:</strong> 20 questions (25 mins)</li>
                  <li><strong>Reasoning Ability:</strong> 20 questions (25 mins)</li>
                  <li><strong>Adv Quant & Reasoning:</strong> 14 questions (25 mins)</li>
                  <li><strong>Verbal Ability:</strong> 25 questions (26 mins, strict per-question timers)</li>
                  <li><strong>Coding:</strong> 2 questions (Easy/Medium, auto-saving test cases)</li>
                </>
              )}
            </ul>
            <p style={{ marginTop: "10px" }}>💡 Note: Sections are locked sequentially. You cannot return to previous sections once submitted.</p>
          </div>
          <button className="btn btn-primary" style={{ fontSize: "1rem", padding: "13px 36px" }} onClick={startExam}>
            {track === "hackwithinfy" ? "Start Round →" : "Start Full Exam →"}
          </button>
        </div>
      </div>
    );
  }

  if (phaseIdx === phases.length - 1) {
    const calcScore = (id: string) => {
      const indices = sectionIndices[id];
      if (!indices) return { score: 0, total: 0 };
      let score = 0;
      for (let i = indices.start; i < indices.end; i++) {
        const q = shuffledExam[i];
        if (q.isTyped || q.verbalType === "sentence") {
           const ans = (answers[i] as string || "").toLowerCase().trim();
           const correct = (q.typedAnswer || q.answer.toString()).toLowerCase().trim();
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

    const analyzeWeakAreas = () => {
      const weakTopics = new Set<string>();
      phases.forEach(p => {
        if (!p.section) return;
        const indices = sectionIndices[p.id];
        if (!indices) return;
        for (let i = indices.start; i < indices.end; i++) {
          const q = shuffledExam[i];
          let correct = false;
          if (q.isTyped || q.verbalType === "sentence") {
             const ans = (answers[i] as string || "").toLowerCase().trim();
             const right = (q.typedAnswer || q.answer.toString()).toLowerCase().trim();
             if (ans === right) correct = true;
          } else {
             if (answers[i] === q.answer) correct = true;
          }
          
          if (!correct && q.q) {
            const text = q.q.toLowerCase();
            if (p.section === "Numerical") {
               if (text.includes("profit") || text.includes("loss") || text.includes("discount") || text.includes("marked price")) weakTopics.add("Profit, Loss & Discount");
               else if (text.includes("ratio") || text.includes("proportion") || text.includes("age")) weakTopics.add("Ratio, Proportion & Age Problems");
               else if (text.includes("percent") || text.includes("increase") || text.includes("decrease")) weakTopics.add("Percentages");
               else if (text.includes("work") || text.includes("pipe") || text.includes("days") || text.includes("efficiency")) weakTopics.add("Time & Work");
               else if (text.includes("speed") || text.includes("train") || text.includes("distance") || text.includes("boat")) weakTopics.add("Speed, Distance & Time");
               else if (text.includes("average") || text.includes("mixture") || text.includes("alloy")) weakTopics.add("Averages, Mixtures & Alligation");
               else weakTopics.add("Number System");
            } else if (p.section === "Reasoning" || p.section === "AdvQuant") {
               if (text.includes("blood") || text.includes("brother") || text.includes("sister") || text.includes("mother")) weakTopics.add("Blood Relations");
               else if (text.includes("direction") || text.includes("north") || text.includes("south")) weakTopics.add("Directions & Distances");
               else if (text.includes("syllogism") || text.includes("statement") || text.includes("conclusion")) weakTopics.add("Syllogism");
               else if (text.includes("code") || text.includes("decode") || text.includes("language")) weakTopics.add("Coding-Decoding");
               else if (text.includes("series") || text.includes("next in") || text.includes("pattern")) weakTopics.add("Number & Letter Series");
               else if (text.includes("sit") || text.includes("table") || text.includes("row")) weakTopics.add("Seating Arrangements");
               else weakTopics.add("Data Sufficiency & Logical Puzzles");
            } else if (p.section === "Verbal") {
               if (text.includes("error") || text.includes("correct") || text.includes("grammar")) weakTopics.add("Error Spotting & Sentence Correction");
               else if (text.includes("synonym") || text.includes("antonym") || text.includes("meaning")) weakTopics.add("Vocabulary");
               else if (text.includes("order") || text.includes("jumble") || text.includes("sequence")) weakTopics.add("Para Jumbles");
               else weakTopics.add("Cloze Test / Reading Comprehension");
            }
          }
        }
      });
      return Array.from(weakTopics).slice(0, 5);
    };

    const weakAreas = track !== "hackwithinfy" ? analyzeWeakAreas() : [];

    const getMissedQuestions = () => {
      const missed: any[] = [];
      phases.forEach(p => {
        if (!p.section) return;
        const indices = sectionIndices[p.id];
        if (!indices) return;
        for (let i = indices.start; i < indices.end; i++) {
          const q = shuffledExam[i];
          let correct = false;
          let userAnsText = "Not answered";
          let correctAnsText = "";
          
          if (q.isTyped || q.verbalType === "sentence") {
             const ans = (answers[i] as string || "").trim();
             const right = (q.typedAnswer || q.answer.toString()).trim();
             if (ans.toLowerCase() === right.toLowerCase()) correct = true;
             userAnsText = ans || "Not answered";
             correctAnsText = right;
          } else {
             if (answers[i] === q.answer) correct = true;
             if (answers[i] !== null && answers[i] !== undefined) {
               const idx = answers[i] as number;
               userAnsText = q.opts[idx] || "Unknown";
             }
             correctAnsText = q.opts[q.answer] || "Unknown";
          }
          
          if (!correct && q.q && p.id !== "verbal-email" && p.id !== "verbal-passage") {
            // Get topic based on section rules from weakAreas
            let topic = "General";
            const text = q.q.toLowerCase();
            if (p.section === "Numerical") {
               if (text.includes("profit") || text.includes("loss") || text.includes("discount") || text.includes("marked price")) topic = "Profit, Loss & Discount";
               else if (text.includes("ratio") || text.includes("proportion") || text.includes("age")) topic = "Ratio, Proportion & Age Problems";
               else if (text.includes("percent") || text.includes("increase") || text.includes("decrease")) topic = "Percentages";
               else if (text.includes("work") || text.includes("pipe") || text.includes("days") || text.includes("efficiency")) topic = "Time & Work";
               else if (text.includes("speed") || text.includes("train") || text.includes("distance") || text.includes("boat")) topic = "Speed, Distance & Time";
               else if (text.includes("average") || text.includes("mixture") || text.includes("alloy")) topic = "Averages, Mixtures & Alligation";
               else topic = "Number System";
            } else if (p.section === "Reasoning" || p.section === "AdvQuant") {
               if (text.includes("blood") || text.includes("brother") || text.includes("sister") || text.includes("mother")) topic = "Blood Relations";
               else if (text.includes("direction") || text.includes("north") || text.includes("south")) topic = "Directions & Distances";
               else if (text.includes("syllogism") || text.includes("statement") || text.includes("conclusion")) topic = "Syllogism";
               else if (text.includes("code") || text.includes("decode") || text.includes("language")) topic = "Coding-Decoding";
               else if (text.includes("series") || text.includes("next in") || text.includes("pattern")) topic = "Number & Letter Series";
               else if (text.includes("sit") || text.includes("table") || text.includes("row")) topic = "Seating Arrangements";
               else topic = "Data Sufficiency & Logical Puzzles";
            } else if (p.section === "Verbal") {
               if (text.includes("error") || text.includes("correct") || text.includes("grammar")) topic = "Error Spotting & Sentence Correction";
               else if (text.includes("synonym") || text.includes("antonym") || text.includes("meaning")) topic = "Vocabulary";
               else if (text.includes("order") || text.includes("jumble") || text.includes("sequence")) topic = "Para Jumbles";
               else topic = "Cloze Test / Reading Comprehension";
            }
            
            missed.push({
              section: p.section === "AdvQuant" ? "Advanced Quantitative & Reasoning" : p.section,
              question: q.q,
              topic,
              userAnsText,
              correctAnsText,
              exp: q.exp || "No detailed explanation available."
            });
          }
        }
      });
      return missed;
    };
    
    const missedQuestions = track !== "hackwithinfy" ? getMissedQuestions() : [];


    const aptitudeMissed = missedQuestions.filter(q => q.section !== "Verbal");
    const verbalMissed = missedQuestions.filter(q => q.section === "Verbal");

    return (
      <div className="container section" style={{ maxWidth: "1200px", width: "100%", margin: "0 auto", paddingBottom: "60px" }}>
        <div style={{ textAlign: "center", marginBottom: "40px" }}>
          <h1 className={styles.startTitle}>Exam Completed! 🎉</h1>
          <p className={styles.startSub}>Great job making it to the end.</p>
        </div>
        
        <div style={{ display: "flex", flexDirection: "column", gap: "40px" }}>
          
          {track !== "hackwithinfy" && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "32px" }}>
              <h2 style={{ fontSize: "1.6rem", marginBottom: "24px", color: "var(--text)", borderBottom: "2px solid var(--border)", paddingBottom: "12px" }}>Aptitude Performance</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "repeat(auto-fit, minmax(150px, 1fr))", gap: "24px", marginBottom: "32px" }}>
                <div style={{ background: "var(--surface-2)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "var(--primary)" }}>{num.score} / {num.total}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-3)", textTransform: "uppercase", marginTop: "8px" }}>Numerical</div>
                </div>
                <div style={{ background: "var(--surface-2)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "var(--primary)" }}>{reas.score} / {reas.total}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-3)", textTransform: "uppercase", marginTop: "8px" }}>Reasoning</div>
                </div>
                <div style={{ background: "var(--surface-2)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "var(--primary)" }}>{adv.score} / {adv.total}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-3)", textTransform: "uppercase", marginTop: "8px" }}>Adv. Quant</div>
                </div>
              </div>

              {weakAreas.length > 0 && (
                <div style={{ background: "var(--surface-2)", padding: "20px", borderRadius: "8px", marginBottom: "32px", borderLeft: "4px solid var(--orange)" }}>
                  <h3 style={{ fontSize: "1.2rem", marginBottom: "12px", color: "var(--text)" }}>Areas for Improvement</h3>
                  <p style={{ fontSize: "0.95rem", color: "var(--text-2)", marginBottom: "12px" }}>Based on your mistakes, review these exact topics in the Aptitude Guide:</p>
                  <ul style={{ paddingLeft: "20px", display: "flex", flexDirection: "column", gap: "8px" }}>
                    {weakAreas.map((topic, i) => (
                      <li key={i} style={{ fontSize: "1rem", color: "var(--text)" }}>{topic}</li>
                    ))}
                  </ul>
                  <div style={{ marginTop: "16px" }}>
                    <a href={`/tcs/aptitude`} className="btn btn-secondary" style={{ fontSize: "0.9rem", padding: "8px 16px" }}>Go to Aptitude Guide →</a>
                  </div>
                </div>
              )}

              {aptitudeMissed.length > 0 && (
                <div>
                  <h3 style={{ fontSize: "1.3rem", marginBottom: "20px", color: "var(--error, #ef4444)" }}>Aptitude Questions You Missed</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {aptitudeMissed.slice((aptMissedPage - 1) * 5, aptMissedPage * 5).map((mq, index, arr) => {
                      const i = index + (aptMissedPage - 1) * 5;
                      const showHeading = i === 0 || mq.section !== arr[i - 1].section;
                      return (
                        <div key={i}>
                          {showHeading && (
                            <h4 style={{ fontSize: "1.15rem", color: "var(--text)", paddingBottom: "8px", marginBottom: "16px", borderBottom: "1px solid var(--border)" }}>
                              {mq.section} Ability
                            </h4>
                          )}
                          <div style={{ padding: "20px", background: "var(--surface-2)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                            <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "1.1rem" }}>{i + 1}. {mq.question}</div>
                            <div style={{ fontSize: "0.9rem", color: "var(--primary)", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px" }}>Topic: {mq.topic}</div>
                            
                            <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                              <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                                <div style={{ fontSize: "0.85rem", color: "var(--error, #ef4444)", fontWeight: "bold", textTransform: "uppercase", marginBottom: "6px" }}>Your Answer</div>
                                <div style={{ color: "var(--text)", fontSize: "1rem" }}>{mq.userAnsText}</div>
                              </div>
                              <div style={{ padding: "12px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "6px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                                <div style={{ fontSize: "0.85rem", color: "var(--success, #10b981)", fontWeight: "bold", textTransform: "uppercase", marginBottom: "6px" }}>Correct Answer</div>
                                <div style={{ color: "var(--text)", fontSize: "1rem" }}>{mq.correctAnsText}</div>
                              </div>
                            </div>
                            
                            <div style={{ fontSize: "1rem", color: "var(--text-2)", background: "var(--surface)", border: "1px solid var(--border)", padding: "16px", borderRadius: "8px" }}>
                              <strong>Explanation:</strong> {mq.exp}
                            </div>
                          </div>
                        </div>
                      );
                    })}
                  </div>
                  {aptitudeMissed.length > 5 && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                      <button className="btn btn-secondary" onClick={() => setAptMissedPage(p => Math.max(1, p - 1))} disabled={aptMissedPage === 1}>← Previous</button>
                      <span style={{ fontSize: "0.9rem", color: "var(--text-3)" }}>Page {aptMissedPage} of {Math.ceil(aptitudeMissed.length / 5)}</span>
                      <button className="btn btn-secondary" onClick={() => setAptMissedPage(p => Math.min(Math.ceil(aptitudeMissed.length / 5), p + 1))} disabled={aptMissedPage === Math.ceil(aptitudeMissed.length / 5)}>Next →</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          {track !== "hackwithinfy" && (
            <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "32px" }}>
              <h2 style={{ fontSize: "1.6rem", marginBottom: "24px", color: "var(--text)", borderBottom: "2px solid var(--border)", paddingBottom: "12px" }}>Verbal Performance</h2>
              
              <div style={{ display: "grid", gridTemplateColumns: "1fr", gap: "24px", marginBottom: "32px", maxWidth: "300px" }}>
                <div style={{ background: "var(--surface-2)", padding: "20px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.2rem", fontWeight: "bold", color: "var(--primary)" }}>{verb.score} / {verb.total}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-3)", textTransform: "uppercase", marginTop: "8px" }}>Sentence Comp.</div>
                </div>
              </div>
              
              <p style={{ fontSize: "0.9rem", color: "var(--text-3)", fontStyle: "italic", marginBottom: "32px" }}>
                * Passage Recall and Email Writing require manual subjective grading.
              </p>

              {verbalMissed.length > 0 && (
                <div>
                  <h3 style={{ fontSize: "1.3rem", marginBottom: "20px", color: "var(--error, #ef4444)" }}>Verbal Questions You Missed</h3>
                  <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
                    {verbalMissed.slice((verbMissedPage - 1) * 5, verbMissedPage * 5).map((mq, index) => {
                      const i = index + (verbMissedPage - 1) * 5;
                      return (
                      <div key={i} style={{ padding: "20px", background: "var(--surface-2)", borderRadius: "8px", border: "1px solid var(--border)" }}>
                        <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "1.1rem" }}>{i + 1}. {mq.question}</div>
                        <div style={{ fontSize: "0.9rem", color: "var(--primary)", fontWeight: "bold", textTransform: "uppercase", marginBottom: "16px" }}>Topic: {mq.topic}</div>
                        
                        <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr", gap: "16px", marginBottom: "16px" }}>
                          <div style={{ padding: "12px", background: "rgba(239, 68, 68, 0.1)", borderRadius: "6px", border: "1px solid rgba(239, 68, 68, 0.2)" }}>
                            <div style={{ fontSize: "0.85rem", color: "var(--error, #ef4444)", fontWeight: "bold", textTransform: "uppercase", marginBottom: "6px" }}>Your Answer</div>
                            <div style={{ color: "var(--text)", fontSize: "1rem" }}>{mq.userAnsText}</div>
                          </div>
                          <div style={{ padding: "12px", background: "rgba(16, 185, 129, 0.1)", borderRadius: "6px", border: "1px solid rgba(16, 185, 129, 0.2)" }}>
                            <div style={{ fontSize: "0.85rem", color: "var(--success, #10b981)", fontWeight: "bold", textTransform: "uppercase", marginBottom: "6px" }}>Correct Answer</div>
                            <div style={{ color: "var(--text)", fontSize: "1rem" }}>{mq.correctAnsText}</div>
                          </div>
                        </div>
                        
                        <div style={{ fontSize: "1rem", color: "var(--text-2)", background: "var(--surface)", border: "1px solid var(--border)", padding: "16px", borderRadius: "8px" }}>
                          <strong>Explanation:</strong> {mq.exp}
                        </div>
                      </div>
                    );})}
                  </div>
                  {verbalMissed.length > 5 && (
                    <div style={{ display: "flex", justifyContent: "space-between", alignItems: "center", marginTop: "24px", paddingTop: "16px", borderTop: "1px solid var(--border)" }}>
                      <button className="btn btn-secondary" onClick={() => setVerbMissedPage(p => Math.max(1, p - 1))} disabled={verbMissedPage === 1}>← Previous</button>
                      <span style={{ fontSize: "0.9rem", color: "var(--text-3)" }}>Page {verbMissedPage} of {Math.ceil(verbalMissed.length / 5)}</span>
                      <button className="btn btn-secondary" onClick={() => setVerbMissedPage(p => Math.min(Math.ceil(verbalMissed.length / 5), p + 1))} disabled={verbMissedPage === Math.ceil(verbalMissed.length / 5)}>Next →</button>
                    </div>
                  )}
                </div>
              )}
            </div>
          )}

          <div style={{ background: "var(--surface)", border: "1px solid var(--border)", borderRadius: "12px", padding: "32px" }}>
            <h2 style={{ fontSize: "1.6rem", marginBottom: "24px", color: "var(--text)", borderBottom: "2px solid var(--border)", paddingBottom: "12px" }}>Coding Performance</h2>
            
            <div style={{ display: "flex", flexWrap: "wrap", gap: "24px", marginBottom: "40px" }}>
              <div style={{ flex: 1, minWidth: "150px", background: "var(--surface-2)", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: codingPassedEasy === 5 ? "var(--success, #10b981)" : "var(--accent)" }}>{codingPassedEasy} / 5</div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-3)", textTransform: "uppercase", marginTop: "8px" }}>{track === "hackwithinfy" ? "Problem 1 Passed" : "Easy Passed"}</div>
              </div>
              <div style={{ flex: 1, minWidth: "150px", background: "var(--surface-2)", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
                <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: codingPassedMedium === 5 ? "var(--success, #10b981)" : "var(--accent)" }}>{codingPassedMedium} / 5</div>
                <div style={{ fontSize: "0.9rem", color: "var(--text-3)", textTransform: "uppercase", marginTop: "8px" }}>{track === "hackwithinfy" ? "Problem 2 Passed" : "Medium Passed"}</div>
              </div>
              {track === "hackwithinfy" && (
                <>
                <div style={{ flex: 1, minWidth: "150px", background: "var(--surface-2)", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: codingPassedHard === 5 ? "var(--success, #10b981)" : "var(--accent)" }}>{codingPassedHard} / 5</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-3)", textTransform: "uppercase", marginTop: "8px" }}>Problem 3 Passed</div>
                </div>
                <div style={{ flex: 1, minWidth: "150px", background: "var(--surface-2)", padding: "24px", borderRadius: "8px", textAlign: "center" }}>
                  <div style={{ fontSize: "2.5rem", fontWeight: "bold", color: codingPassedComplex === 5 ? "var(--success, #10b981)" : "var(--accent)" }}>{codingPassedComplex} / 5</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text-3)", textTransform: "uppercase", marginTop: "8px" }}>Problem 4 Passed</div>
                </div>
                </>
              )}
            </div>
            
            <h3 style={{ fontSize: "1.3rem", marginBottom: "20px", color: "var(--text)" }}>Coding Problems Reference</h3>
            <div style={{ display: "flex", flexDirection: "column", gap: "24px" }}>
              {codingQEasy && (
                <div style={{ padding: "24px", background: "var(--surface-2)", borderRadius: "8px", border: "1px solid var(--border)", textAlign: "left" }}>
                  <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "1.2rem" }}>{track === "hackwithinfy" ? "Problem 1" : "Easy Problem"}: {codingQEasy.title}</div>
                  <div style={{ fontSize: "1rem", color: "var(--text-2)", whiteSpace: "pre-line", marginBottom: "20px" }}>{codingQEasy.desc}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text)", background: "#1e1e1e", padding: "16px", borderRadius: "8px", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                    <strong style={{ color: "var(--text-3)" }}>Submitted Code:</strong>
                    <pre style={{ margin: 0, marginTop: "12px", color: "#d4d4d4" }}>{codingFinalCodeEasy || "No code submitted."}</pre>
                  </div>
                </div>
              )}
              {codingQMedium && (
                <div style={{ padding: "24px", background: "var(--surface-2)", borderRadius: "8px", border: "1px solid var(--border)", textAlign: "left" }}>
                  <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "1.2rem" }}>{track === "hackwithinfy" ? "Problem 2" : "Medium Problem"}: {codingQMedium.title}</div>
                  <div style={{ fontSize: "1rem", color: "var(--text-2)", whiteSpace: "pre-line", marginBottom: "20px" }}>{codingQMedium.desc}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text)", background: "#1e1e1e", padding: "16px", borderRadius: "8px", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                    <strong style={{ color: "var(--text-3)" }}>Submitted Code:</strong>
                    <pre style={{ margin: 0, marginTop: "12px", color: "#d4d4d4" }}>{codingFinalCodeMedium || "No code submitted."}</pre>
                  </div>
                </div>
              )}
              {track === "hackwithinfy" && codingQHard && (
                <div style={{ padding: "24px", background: "var(--surface-2)", borderRadius: "8px", border: "1px solid var(--border)", textAlign: "left" }}>
                  <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "1.2rem" }}>Problem 3: {codingQHard.title}</div>
                  <div style={{ fontSize: "1rem", color: "var(--text-2)", whiteSpace: "pre-line", marginBottom: "20px" }}>{codingQHard.desc}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text)", background: "#1e1e1e", padding: "16px", borderRadius: "8px", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                    <strong style={{ color: "var(--text-3)" }}>Submitted Code:</strong>
                    <pre style={{ margin: 0, marginTop: "12px", color: "#d4d4d4" }}>{codingFinalCodeHard || "No code submitted."}</pre>
                  </div>
                </div>
              )}
              {track === "hackwithinfy" && codingQComplex && (
                <div style={{ padding: "24px", background: "var(--surface-2)", borderRadius: "8px", border: "1px solid var(--border)", textAlign: "left", marginTop: "24px" }}>
                  <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "1.2rem" }}>Problem 4: {codingQComplex.title}</div>
                  <div style={{ fontSize: "1rem", color: "var(--text-2)", whiteSpace: "pre-line", marginBottom: "20px" }}>{codingQComplex.desc}</div>
                  <div style={{ fontSize: "0.9rem", color: "var(--text)", background: "#1e1e1e", padding: "16px", borderRadius: "8px", overflowX: "auto", whiteSpace: "pre-wrap" }}>
                    <strong style={{ color: "var(--text-3)" }}>Submitted Code:</strong>
                    <pre style={{ margin: 0, marginTop: "12px", color: "#d4d4d4" }}>{codingFinalCodeComplex || "No code submitted."}</pre>
                  </div>
                </div>
              )}
            </div>
          </div>
          
        </div>
        
        <div style={{ textAlign: "center", marginTop: "40px" }}>
          <button className="btn btn-primary" onClick={() => window.location.reload()} style={{ padding: "14px 40px", fontSize: "1.1rem" }}>Return Home</button>
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
                <CalculatorIcon size={16} style={{ marginRight: '4px', verticalAlign: 'text-bottom' }} />
                <span className={styles.hideMobile}>Calculator</span>
              </button>
            )}
            <div style={{ position: "relative" }}>
              <button className={`btn btn-primary ${styles.examActionBtn}`} onClick={() => setConfirmingSubmit(true)}>
                Submit<span className={styles.hideMobile}> Section</span>
              </button>
              {confirmingSubmit && (
                <div className={styles.popupConfirm}>
                  <div style={{ fontSize: "0.85rem", color: "var(--text)", fontWeight: 500, textAlign: "center" }}>Submit section?</div>
                  <div className={styles.popupActions} style={{ justifyContent: "center", marginTop: "4px" }}>
                    <button className="btn btn-ghost" style={{ padding: "4px 12px", fontSize: "0.8rem", minHeight: "32px" }} onClick={() => setConfirmingSubmit(false)}>No</button>
                    <button className="btn btn-primary" style={{ padding: "4px 12px", fontSize: "0.8rem", minHeight: "32px" }} onClick={() => advancePhase()}>Yes</button>
                  </div>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
      
      <div className={`container ${styles.examLayout}`} style={{ display: showSidebar ? "grid" : "block" }}>
        <div className={styles.examMainCol} style={{ height: currentPhase.id.startsWith("coding-") ? "calc(100vh - 120px)" : "auto" }}>

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
                <p style={{ whiteSpace: "pre-line", marginBottom: "16px", lineHeight: "1.6" }}>
                  {currentCodingQ.desc.replace(/([a-zA-Z,.\s])\n([a-zA-Z])/g, '$1 $2')}
                </p>
                
                {currentCodingQ.fmt && (
                  <>
                    <h4 style={{marginTop: "20px", marginBottom: "8px"}}>Format</h4>
                    <p style={{ lineHeight: "1.6" }}>{currentCodingQ.fmt}</p>
                  </>
                )}

                <div style={{ marginTop: "24px", display: "flex", flexDirection: "column", gap: "24px" }}>
                  {currentCodingQ.tests.slice(0, 2).map((test, idx) => {
                    if (test.hidden) return null;
                    
                    let inStr = test.in || "";
                    let outStr = test.out || "";
                    let explanation = "";
                    
                    const splitRegex = /(Sample Output|Sample output|Explanation|Input Format|Constraints|Sample Test Cases|External Document)/i;
                    
                    const inMatch = inStr.match(splitRegex);
                    if (inMatch && inMatch.index !== undefined) {
                      explanation += inStr.substring(inMatch.index);
                      inStr = inStr.substring(0, inMatch.index).trim();
                    }

                    const outMatch = outStr.match(splitRegex);
                    if (outMatch && outMatch.index !== undefined) {
                      explanation += (explanation ? "\n" : "") + outStr.substring(outMatch.index);
                      outStr = outStr.substring(0, outMatch.index).trim();
                    }

                    // Strip stray "Output:" strings that leaked into the input
                    inStr = inStr.replace(/\n?\s*Output:\s*.*$/i, '').trim();
                    
                    const finalExplanation = currentCodingQ.note ? currentCodingQ.note + (explanation ? "\n" + explanation : "") : explanation;
                    
                    return (
                      <div key={idx}>
                        <div style={{ fontWeight: "bold", marginBottom: "12px", fontSize: "1rem" }}>Example {idx + 1}:</div>
                        <div style={{ 
                          paddingLeft: "16px", 
                          borderLeft: "2px solid var(--border)", 
                          fontSize: "0.95rem", 
                          color: "var(--text-2)",
                          lineHeight: "1.6",
                          whiteSpace: "pre-wrap"
                        }}>
                          <div><strong style={{color: "var(--text)", fontFamily: "var(--font-mono)"}}>Input:</strong> <span style={{fontFamily: "var(--font-mono)"}}>{inStr}</span></div>
                          <div><strong style={{color: "var(--text)", fontFamily: "var(--font-mono)"}}>Output:</strong> <span style={{fontFamily: "var(--font-mono)"}}>{outStr}</span></div>
                          {finalExplanation && (
                            <div><strong style={{color: "var(--text)"}}>Explanation:</strong> {finalExplanation.trim()}</div>
                          )}
                        </div>
                      </div>
                    )
                  })}
                </div>
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
            <button className="btn btn-primary" style={{ width: "100%" }} onClick={() => setConfirmingSubmit(true)}>Submit Section</button>
          </aside>
        )}
      </div>
    </div>
  );
}
