"use client";

import { useState, useEffect, useCallback, useMemo } from "react";
import { TOPICS, Topic } from "@/lib/aptitude";
import s from "./aptitude.module.css";

const STORAGE_KEY      = "tcs-nqt-apt-progress";
const PROB_STORAGE_KEY = "tcs-nqt-apt-prob-progress";

type Cat = "All" | "Numerical" | "Reasoning" | "Verbal" | "Advanced";
const CATS: Cat[] = ["All", "Numerical", "Reasoning", "Verbal", "Advanced"];

const CAT_COLOR: Record<string, string> = {
  Numerical: "var(--blue)",
  Reasoning: "var(--purple)",
  Verbal:    "var(--yellow)",
  Advanced:  "var(--accent)",
};
const CAT_BADGE: Record<string, string> = {
  Numerical: "badge-numerical",
  Reasoning: "badge-reasoning",
  Verbal:    "badge-verbal",
  Advanced:  "badge-advanced",
};
const DIFF_CLASS: Record<string, string> = {
  Easy:   s.diffEasy,
  Medium: s.diffMedium,
  Hard:   s.diffHard,
};

const parseSteps = (text: string) =>
  text.split("\n").map(l => l.trim()).filter(Boolean);

function slugify(title: string): string {
  return title
    .toLowerCase()
    .replace(/[^a-z0-9\s-]/g, "")
    .trim()
    .replace(/\s+/g, "-");
}

async function downloadFormulaSheet(topics: Topic[]) {
  const html2pdf = (await import("html2pdf.js")).default;

  const cats = ["Numerical", "Reasoning", "Verbal", "Advanced"];
  const catColors: Record<string, string> = {
    Numerical: "#3b82f6", Reasoning: "#a855f7",
    Verbal: "#f59e0b",    Advanced: "#8b5cf6",
  };

  // Define A4 proportions (approx 96 DPI)
  const PAGE_WIDTH = 794;
  const PAGE_HEIGHT = 1123;
  const MARGIN = 40;
  const COL_GAP = 20;
  const COL_WIDTH = (PAGE_WIDTH - (MARGIN * 2) - COL_GAP) / 2;
  const MAX_COL_HEIGHT = PAGE_HEIGHT - (MARGIN * 2);

  // Hidden off-screen container for exact height measurement
  const offscreen = document.createElement("div");
  offscreen.style.position = "absolute";
  offscreen.style.top = "-9999px";
  offscreen.style.left = "-9999px";
  offscreen.style.width = `${PAGE_WIDTH}px`;
  offscreen.style.backgroundColor = "white";
  offscreen.style.fontFamily = "'Segoe UI', system-ui, sans-serif";
  document.body.appendChild(offscreen);

  const measureCol = document.createElement("div");
  measureCol.style.width = `${COL_WIDTH}px`;
  offscreen.appendChild(measureCol);

  const measureHtml = (html: string, isFullWidth = false) => {
    measureCol.style.width = isFullWidth ? `${PAGE_WIDTH - MARGIN * 2}px` : `${COL_WIDTH}px`;
    measureCol.innerHTML = html;
    return measureCol.getBoundingClientRect().height;
  };

  const titleHtml = `
    <div style="text-align: center; margin-bottom: 24px; border-bottom: 2px solid #f3f4f6; padding-bottom: 16px;">
      <h1 style="font-size: 26px; font-weight: 800; color: #111; margin: 0 0 6px 0; text-transform: uppercase; letter-spacing: -0.5px;">TCS NQT Formula Cheat Sheet</h1>
      <div style="color: #6b7280; font-size: 12px; font-weight: 500;">Comprehensive Quick Reference Guide for Exam Preparation</div>
    </div>
  `;

  const titleHeight = measureHtml(titleHtml, true);

  type Page = { left: string[]; right: string[] };
  const pages: Page[] = [{ left: [], right: [] }];
  let currentColumn: "left" | "right" = "left";
  let currentHeight = 0;
  
  // Page 1 has less space because the title spans across the top
  let currentMaxHeight = MAX_COL_HEIGHT - titleHeight;

  const pushToColumn = (html: string, height: number) => {
    // If it doesn't fit, jump to the next column or page
    if (currentHeight + height > currentMaxHeight) {
      if (currentColumn === "left") {
        currentColumn = "right";
      } else {
        currentColumn = "left";
        currentMaxHeight = MAX_COL_HEIGHT;
        pages.push({ left: [], right: [] });
      }
      currentHeight = 0;
    }
    
    const page = pages[pages.length - 1];
    if (currentColumn === "left") page.left.push(html);
    else page.right.push(html);
    
    currentHeight += height;
  };

  cats.forEach(cat => {
    const topicsInCat = topics.filter(t => t.cat === cat);
    if (topicsInCat.length === 0) return;

    const catHtml = `
      <div style="margin-bottom: 12px;">
        <div style="font-size: 16px; font-weight: 800; color: ${catColors[cat]}; text-transform: uppercase; letter-spacing: 1px; margin-bottom: 4px; border-left: 4px solid ${catColors[cat]}; padding-left: 8px;">
          ${cat} Aptitude
        </div>
      </div>`;
      
    const catHeight = measureHtml(catHtml);
    let pendingCatHeader: { html: string, height: number } | null = { html: catHtml, height: catHeight };

    topicsInCat.forEach(t => {
      const topicHtml = `
        <div style="margin-bottom: 16px;">
          <div style="font-size: 13px; font-weight: 700; color: #1f2937; margin-bottom: 6px; padding-bottom: 2px; border-bottom: 1px solid #e5e7eb;">
            ${t.title.split("—")[0].trim()}
          </div>
          <ul style="list-style: none; padding: 0; margin: 0;">
            ${t.formula.map(f => `
              <li style="font-size: 10.5px; color: #374151; margin-bottom: 5px; padding-left: 12px; position: relative; line-height: 1.4;">
                <span style="position: absolute; left: 0; top: 0; color: ${catColors[cat]};">&#8226;</span>
                ${f.replace(/</g, "&lt;").replace(/>/g, "&gt;")}
              </li>
            `).join("")}
          </ul>
        </div>`;
      
      const topicHeight = measureHtml(topicHtml);
      
      // If we have a pending category header, ensure it doesn't get orphaned
      // Check if both the header and the first topic fit together
      if (pendingCatHeader) {
        if (currentHeight + pendingCatHeader.height + topicHeight > currentMaxHeight) {
          if (currentColumn === "left") currentColumn = "right";
          else {
            currentColumn = "left";
            currentMaxHeight = MAX_COL_HEIGHT;
            pages.push({ left: [], right: [] });
          }
          currentHeight = 0;
        }
        pushToColumn(pendingCatHeader.html, pendingCatHeader.height);
        pendingCatHeader = null;
      }
      
      pushToColumn(topicHtml, topicHeight);
    });
  });

  const finalContainer = document.createElement("div");
  finalContainer.style.width = `${PAGE_WIDTH}px`;
  finalContainer.style.backgroundColor = "white";
  finalContainer.style.fontFamily = "'Segoe UI', system-ui, sans-serif";

  pages.forEach((p, idx) => {
    const pageDiv = document.createElement("div");
    pageDiv.style.width = `${PAGE_WIDTH}px`;
    pageDiv.style.height = `${PAGE_HEIGHT}px`;
    pageDiv.style.padding = `${MARGIN}px`;
    pageDiv.style.boxSizing = "border-box";
    pageDiv.style.position = "relative";
    
    // Tell html2pdf to hard break pages here
    if (idx > 0) pageDiv.style.pageBreakBefore = "always";

    if (idx === 0) pageDiv.innerHTML += titleHtml;

    const columnsContainer = document.createElement("div");
    columnsContainer.style.display = "flex";
    columnsContainer.style.gap = `${COL_GAP}px`;
    columnsContainer.style.alignItems = "flex-start";
    
    const leftCol = document.createElement("div");
    leftCol.style.flex = "1";
    leftCol.innerHTML = p.left.join("");
    
    const rightCol = document.createElement("div");
    rightCol.style.flex = "1";
    rightCol.innerHTML = p.right.join("");
    
    columnsContainer.appendChild(leftCol);
    columnsContainer.appendChild(rightCol);
    
    pageDiv.appendChild(columnsContainer);
    finalContainer.appendChild(pageDiv);
  });

  document.body.removeChild(offscreen);

  const opt: Html2PdfOptions = {
    margin:       0, // We handle margins dynamically in the DOM
    filename:     'TCS-NQT-Formula-Cheat-Sheet.pdf',
    image:        { type: 'jpeg', quality: 0.98 },
    html2canvas:  { scale: 2, useCORS: true },
    jsPDF:        { unit: 'mm', format: 'a4', orientation: 'portrait' }
  };

  html2pdf().set(opt).from(finalContainer).save();
}

interface Html2PdfOptions {
  margin?: number;
  filename?: string;
  image?: { type: string; quality: number };
  html2canvas?: { scale: number; useCORS: boolean };
  jsPDF?: { unit: string; format: string; orientation: string };
  [key: string]: unknown;
}

export default function AptitudeClient({ topics = TOPICS }: { topics?: Topic[] }) {
  const [done, setDone]               = useState<Record<string, boolean>>({});
  const [filter, setFilter]           = useState<Cat>("All");
  const [active, setActive]           = useState<Topic>(topics[0]);
  const [probIdx, setProbIdx]         = useState(0);
  const [mobilePanel, setMobilePanel] = useState<"list" | "content">("list");
  const [probSteps, setProbSteps]     = useState<Record<string, number>>({});

  useEffect(() => {
    try {
      setDone(JSON.parse(localStorage.getItem(STORAGE_KEY) || "{}"));
      setProbSteps(JSON.parse(localStorage.getItem(PROB_STORAGE_KEY) || "{}"));
    } catch {}
  }, []);

  const saveDone = useCallback((d: Record<string, boolean>) => {
    setDone(d);
    localStorage.setItem(STORAGE_KEY, JSON.stringify(d));
  }, []);

  const saveProbSteps = useCallback((ps: Record<string, number>) => {
    setProbSteps(ps);
    localStorage.setItem(PROB_STORAGE_KEY, JSON.stringify(ps));
  }, []);

  const openTopic = (t: Topic) => {
    setActive(t);
    setProbIdx(0);
    setMobilePanel("content");
    window.scrollTo({ top: 0, behavior: "smooth" });
  };

  const topicsMap = useMemo(() => {
    const map = new Map<string, Topic>();
    topics.forEach(t => map.set(t.title, t));
    return map;
  }, [topics]);

  const visibleTopics = topics.filter(t => filter === "All" || t.cat === filter);
  const masteredCount = topics.filter(t => done[slugify(t.title)]).length;
  const isMastered    = done[slugify(active.title)];
  const curProblem    = active.problems[probIdx];
  const probKey       = `${slugify(active.title)}-${probIdx}`;
  const probSolSteps  = parseSteps(curProblem.sol);
  const probRevCount  = probSteps[probKey] ?? -1;

  const isFullySolved = useCallback((topicTitle: string, idx: number) => {
    const topic = topicsMap.get(topicTitle);
    if (!topic) return false;
    const steps = parseSteps(topic.problems[idx].sol);
    return (probSteps[`${slugify(topicTitle)}-${idx}`] ?? -1) >= steps.length - 1;
  }, [topicsMap, probSteps]);

  return (
    <div className={s.shell}>

      
      <div className={s.topBar}>
        <div>
          <h1 className={s.pageTitle}>Aptitude Guide</h1>
          <p className={s.pageSub}>{topics.length} topics · Numerical, Reasoning, Verbal, Advanced</p>
        </div>
        <div className={s.topBarRight}>
          <div className={s.progressArea}>
            <span className={s.progressLabel}>{masteredCount} / {topics.length} mastered</span>
            <div className="progress-track" style={{ width: 130 }}>
              <div className="progress-fill" style={{ width: `${(masteredCount / topics.length) * 100}%` }} />
            </div>
          </div>
          <button
            className={`btn btn-ghost ${s.downloadBtn}`}
            onClick={() => downloadFormulaSheet(topics)}
            title="Download Formula Sheet"
          >
            Download Formula Sheet
          </button>
        </div>
      </div>

      
      <div className={s.mobileToggle}>
        <button
          className={`${s.toggleBtn} ${mobilePanel === "list" ? s.toggleActive : ""}`}
          onClick={() => setMobilePanel("list")}
        >Topics</button>
        <button
          className={`${s.toggleBtn} ${mobilePanel === "content" ? s.toggleActive : ""}`}
          onClick={() => setMobilePanel("content")}
        >{active.title.split("—")[0].trim()}</button>
      </div>

      
      <div className={s.layout}>

        
        <aside className={`${s.sidebar} ${mobilePanel === "list" ? s.sidebarVisible : s.sidebarHidden}`}>
          <div className={s.catFilters}>
            {CATS.map(c => (
              <button key={c} className={`${s.catBtn} ${filter === c ? s.catBtnActive : ""}`} onClick={() => setFilter(c)}>
                {c}
              </button>
            ))}
          </div>
          <div className={s.topicList}>
            {visibleTopics.map(t => (
              <button
                key={t.title}
                className={`${s.topicRow} ${active.title === t.title ? s.topicRowActive : ""} ${done[slugify(t.title)] ? s.topicRowDone : ""}`}
                onClick={() => openTopic(t)}
              >
                <span className={s.topicDot} style={{ background: done[slugify(t.title)] ? "var(--green)" : CAT_COLOR[t.cat] }} />
                <div className={s.topicRowText}>
                  <span className={s.topicRowTitle}>{t.title.split("—")[0].trim()}</span>
                  <span className={s.topicRowSub}>{t.title.split("—")[1]?.trim() || t.desc.split(",")[0]}</span>
                </div>
                {done[slugify(t.title)] && <span className={s.doneCheck}>✓</span>}
              </button>
            ))}
          </div>
        </aside>

        
        <main className={`${s.content} ${mobilePanel === "content" ? s.contentVisible : s.contentHidden}`}>

          
          <div className={s.contentHeader}>
            <div className={s.contentHeaderLeft}>
              <span className={`badge ${CAT_BADGE[active.cat]}`}>{active.cat}</span>
              <h2 className={s.contentTitle}>{active.title}</h2>
              <p className={s.contentDesc}>{active.desc}</p>
            </div>
            <button
              className={`btn ${isMastered ? "btn-danger" : "btn-success"}`}
              onClick={() => saveDone({ ...done, [slugify(active.title)]: !isMastered })}
            >
              {isMastered ? "Unmark" : "Mark Mastered"}
            </button>
          </div>

          
          <section className={s.formulaStrip}>
            <div className={s.formulaHeader}>
              <span className={s.formulaLabel}>Key Formulas</span>
              <span className={s.formulaHint}>Memorise these before attempting problems</span>
            </div>
            <div className={s.formulaGrid}>
              {active.formula.map((f, i) => (
                <div key={i} className={s.formulaCard}>
                  <span className={s.formulaIdx}>{i + 1}</span>
                  <span className={s.formulaText}>{f}</span>
                </div>
              ))}
            </div>
          </section>

          
          <section className={s.section}>
            <h3 className={s.sectionLabel}>Method — Step by Step</h3>
            <ol className={s.methodList}>
              {active.method.map((m, i) => (
                <li key={i} className={s.methodItem}>
                  <span className={s.methodNum}>{i + 1}</span>
                  <span className={s.methodText}>{m}</span>
                </li>
              ))}
            </ol>
          </section>

          
          <section className={s.section}>
            <h3 className={s.sectionLabel}>Worked Example</h3>
            <div className={s.exampleCard}>
              <p className={s.exampleQ}>{active.example.problem}</p>
              <div className={s.stepBlock}>
                {parseSteps(active.example.solution).map((line, i) => (
                  <div key={i} className={s.stepLine}>
                    <span className={s.stepBullet}>{i + 1}</span>
                    <span className={s.stepText}>{line}</span>
                  </div>
                ))}
              </div>
            </div>
          </section>

          
          <section className={s.section}>
            <div className={s.probHeader}>
              <h3 className={s.sectionLabel}>Practice Problems</h3>
              <div className={s.probNav}>
                {active.problems.map((_, i) => {
                  const solved = isFullySolved(active.title, i);
                  return (
                    <button
                      key={i}
                      className={`${s.navDot} ${i === probIdx ? s.navDotActive : ""} ${solved ? s.navDotSolved : ""}`}
                      onClick={() => setProbIdx(i)}
                    >{i + 1}</button>
                  );
                })}
              </div>
            </div>

            <div className={s.probCard}>
              <div className={s.probTopRow}>
                <span className={s.probCount}>Problem {probIdx + 1} of {active.problems.length}</span>
                <span className={`${s.diffBadge} ${DIFF_CLASS[curProblem.difficulty]}`}>
                  {curProblem.difficulty}
                </span>
              </div>
              <p className={s.probQ}>{curProblem.q}</p>

              {probRevCount === -1 ? (
                <button
                  className={`btn btn-primary ${s.showSolBtn}`}
                  onClick={() => saveProbSteps({ ...probSteps, [probKey]: 0 })}
                >
                  Show Answer Step by Step
                </button>
              ) : (
                <div className={s.stepBlock}>
                  {probSolSteps.slice(0, probRevCount + 1).map((line, i) => (
                    <div key={i} className={`${s.stepLine} ${i === probRevCount ? s.stepLineNew : ""}`}>
                      <span className={s.stepBullet}>{i + 1}</span>
                      <span className={s.stepText}>{line}</span>
                    </div>
                  ))}
                  {probRevCount < probSolSteps.length - 1 ? (
                    <button
                      className={`btn btn-ghost ${s.nextStepBtn}`}
                      onClick={() => saveProbSteps({ ...probSteps, [probKey]: probRevCount + 1 })}
                    >
                      Next Step &nbsp;·&nbsp; {probRevCount + 1} / {probSolSteps.length}
                    </button>
                  ) : (
                    <div className={s.solComplete}>All steps shown</div>
                  )}
                </div>
              )}

              <div className={s.probActions}>
                <button className="btn btn-ghost" onClick={() => setProbIdx(p => Math.max(0, p - 1))} disabled={probIdx === 0}>Previous</button>
                <button className="btn btn-ghost" onClick={() => setProbIdx(p => Math.min(active.problems.length - 1, p + 1))} disabled={probIdx === active.problems.length - 1}>Next</button>
              </div>
            </div>
          </section>

        </main>
      </div>
    </div>
  );
}
