"use client";

import { useState, useEffect } from "react";
import styles from "./pyq.module.css";
import rawData from "@/data/pyq_data.json";

// ─── Types ────────────────────────────────────────────────────────────────────
interface MCQQuestion {
  q: string;
  opts: string[];
  answer: number;
  difficulty: "Easy" | "Medium" | "Hard";
  explanation: string;
}

interface CodingQuestion {
  q: string;
  approach: string;
  solution: string;
  difficulty: "Easy" | "Medium" | "Hard";
  nqtTag?: string;
}

type Question = MCQQuestion | CodingQuestion;

interface Section {
  section: string;
  desc: string;
  questions: Question[];
}

// ─── Icon map ─────────────────────────────────────────────────────────────────
const ICONS: Record<string, string> = {
  "Numerical Ability": "🔢",
  "Verbal Ability": "📝",
  "Reasoning Ability": "🧩",
  "Programming Logic MCQs": "💻",
  "Coding Round (Hands-on)": "🚀",
};

function getIcon(section: string): string {
  return ICONS[section] ?? "📌";
}

function isMCQ(q: Question): q is MCQQuestion {
  return "opts" in q;
}

// ─── localStorage key ─────────────────────────────────────────────────────────
const LS_KEY = "tcs-nqt-pyq-revealed";
const LS_BOOKMARKS_KEY = "tcs-nqt-pyq-bookmarks";

function loadRevealedFromStorage(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(LS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveRevealedToStorage(revealed: Record<string, boolean>) {
  try {
    localStorage.setItem(LS_KEY, JSON.stringify(revealed));
  } catch {
    // ignore storage errors
  }
}

function loadBookmarksFromStorage(): Record<string, boolean> {
  try {
    return JSON.parse(localStorage.getItem(LS_BOOKMARKS_KEY) || "{}");
  } catch {
    return {};
  }
}

function saveBookmarksToStorage(bookmarks: Record<string, boolean>) {
  try {
    localStorage.setItem(LS_BOOKMARKS_KEY, JSON.stringify(bookmarks));
  } catch {
    // ignore storage errors
  }
}

// ─── Typed sections ───────────────────────────────────────────────────────────
const SECTIONS = rawData as Section[];

// ─── MCQ Question Card ────────────────────────────────────────────────────────
function MCQCard({
  item,
  idx,
  sectionIdx,
  revealed,
  onToggle,
  bookmarks,
  onBookmark,
}: {
  item: MCQQuestion;
  idx: number;
  sectionIdx: number;
  revealed: Record<string, boolean>;
  onToggle: (key: string) => void;
  bookmarks: Record<string, boolean>;
  onBookmark: (key: string) => void;
}) {
  const key = `${sectionIdx}-${idx}`;
  const isRevealed = !!revealed[key];
  const isBookmarked = !!bookmarks[key];
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  return (
    <div className={styles.qItem}>
      <div className={styles.qHeader}>
        <span className={styles.qNum}>Q{idx + 1}</span>
        <p className={styles.qText}>{item.q}</p>
        <span className={`badge badge-${item.difficulty.toLowerCase()} ${styles.diffBadge}`}>
          {item.difficulty}
        </span>
        <button 
          onClick={() => onBookmark(key)} 
          style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: isBookmarked ? 1 : 0.4, fontSize: '1.2rem', padding: '0 8px', margin: 0, outline: 'none' }}
          title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
        >
          🔖
        </button>
      </div>

      {/* MCQ option buttons */}
      <div className={styles.optGrid}>
        {item.opts.map((opt, oi) => {
          const isCorrect = oi === item.answer;
          let optClass = styles.optBtn;
          
          if (isRevealed) {
            optClass += isCorrect ? ` ${styles.optCorrect}` : ` ${styles.optWrong}`;
          } else if (selectedOpt === oi) {
            optClass += ` ${styles.optSelected}`;
          }
          return (
            <button
              key={oi}
              className={optClass}
              onClick={() => setSelectedOpt(oi)}
              disabled={isRevealed}
            >
              <span className={styles.optLabel}>{String.fromCharCode(65 + oi)}.</span>
              {opt}
            </button>
          );
        })}
      </div>

      <div style={{ display: 'flex', gap: '8px', marginTop: '12px' }}>
        {!isRevealed && selectedOpt !== null && (
          <button
            className={`btn btn-primary ${styles.ansBtn}`}
            style={{ marginTop: 0 }}
            onClick={() => onToggle(key)}
          >
            Check Answer
          </button>
        )}
        {!isRevealed && (
          <button
            className={`btn btn-ghost ${styles.ansBtn}`}
            style={{ marginTop: 0 }}
            onClick={() => onToggle(key)}
          >
            Show Answer
          </button>
        )}
      </div>

      {isRevealed && (
        <div className={styles.answer}>
          <span className={styles.ansLabel}>
            ✓ Correct: {item.opts[item.answer]}
          </span>
          <pre className={styles.ansPre}>{item.explanation}</pre>
          <button
            className={`btn btn-ghost ${styles.ansBtn}`}
            onClick={() => onToggle(key)}
            style={{ marginTop: 8 }}
          >
            Hide Answer
          </button>
        </div>
      )}
    </div>
  );
}

// ─── Coding Question Card ─────────────────────────────────────────────────────
function CodingCard({
  item,
  idx,
  sectionIdx,
  revealed,
  onToggle,
  bookmarks,
  onBookmark,
}: {
  item: CodingQuestion;
  idx: number;
  sectionIdx: number;
  revealed: Record<string, boolean>;
  onToggle: (key: string) => void;
  bookmarks: Record<string, boolean>;
  onBookmark: (key: string) => void;
}) {
  const key = `${sectionIdx}-${idx}`;
  const isRevealed = !!revealed[key];
  const isBookmarked = !!bookmarks[key];

  return (
    <div className={styles.qItem}>
      <div className={styles.qHeader}>
        <span className={styles.qNum}>Q{idx + 1}</span>
        <div style={{ flex: 1 }}>
          <pre className={`${styles.qText} ${styles.qPre}`}>{item.q}</pre>
        </div>
        <div className={styles.badgeGroup}>
          <span className={`badge badge-${item.difficulty.toLowerCase()} ${styles.diffBadge}`}>
            {item.difficulty}
          </span>
          {item.nqtTag && (
            <span className={styles.nqtTag}>{item.nqtTag}</span>
          )}
          <button 
            onClick={() => onBookmark(key)} 
            style={{ background: 'none', border: 'none', cursor: 'pointer', opacity: isBookmarked ? 1 : 0.4, fontSize: '1.2rem', padding: '0 8px', margin: 0, outline: 'none' }}
            title={isBookmarked ? "Remove Bookmark" : "Bookmark"}
          >
            🔖
          </button>
        </div>
      </div>

      <button
        className={`btn btn-ghost ${styles.ansBtn}`}
        onClick={() => onToggle(key)}
      >
        {isRevealed ? "Hide Solution" : "Show Solution"}
      </button>

      {isRevealed && (
        <div className={styles.answer}>
          <span className={styles.ansLabel}>Approach</span>
          <p className={styles.approachText}>{item.approach}</p>
          <span className={styles.ansLabel} style={{ marginTop: 12 }}>
            Python Solution
          </span>
          <pre className={styles.solutionPre}>
            <code>{item.solution}</code>
          </pre>
        </div>
      )}
    </div>
  );
}

// ─── Main Component ───────────────────────────────────────────────────────────
type Filter = "all" | string;

export default function PYQClient() {
  const [filter, setFilter] = useState<Filter>("all");
  const [diffFilter, setDiffFilter] = useState<'All' | 'Easy' | 'Medium' | 'Hard'>('All');
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

  // Hydrate from localStorage on mount
  useEffect(() => {
    setRevealed(loadRevealedFromStorage());
    setBookmarks(loadBookmarksFromStorage());
  }, []);

  const toggleReveal = (key: string) => {
    setRevealed((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveRevealedToStorage(next);
      return next;
    });
  };

  const toggleBookmark = (key: string) => {
    setBookmarks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      saveBookmarksToStorage(next);
      return next;
    });
  };

  const visibleSections = SECTIONS.map((s, realIdx) => {
    const filteredQs = s.questions
      .map((q, qIdx) => ({ q, qIdx }))
      .filter(({ q, qIdx }) => {
        if (showBookmarkedOnly && !bookmarks[`${realIdx}-${qIdx}`]) return false;
        if (diffFilter !== 'All' && q.difficulty !== diffFilter) return false;
        return true;
      });
    return {
      ...s,
      filteredQs,
      realIdx,
    };
  }).filter((s) => {
    if (filter !== "all" && s.section !== filter) return false;
    return s.filteredQs.length > 0;
  });

  const totalQ = SECTIONS.reduce((acc, s) => acc + s.questions.length, 0);

  return (
    <div className={`container section`}>
      <div className={styles.pageHeader}>
        <div>
          <h1 className={styles.pageTitle}>Previous Year Questions</h1>
          <p className={styles.pageSub}>
            {totalQ}+ curated TCS NQT PYQs with worked solutions. Click any answer to reveal it.
          </p>
        </div>
        <div className={styles.warningBadge}>
          ⚠️ For pattern practice — not official papers
        </div>
      </div>

      {/* Section filters */}
      <div className="filter-group" style={{ marginBottom: 12 }}>
        <button
          className={`filter-pill ${showBookmarkedOnly ? styles.active : ""}`}
          onClick={() => { setShowBookmarkedOnly(!showBookmarkedOnly); setDiffFilter('All'); }}
        >
          🔖 Bookmarked
        </button>
        <button
          className={`filter-pill ${filter === "all" ? styles.active : ""}`}
          onClick={() => { setFilter("all"); setDiffFilter('All'); }}
        >
          All Sections
        </button>
        {SECTIONS.map((s) => (
          <button
            key={s.section}
            className={`filter-pill ${filter === s.section ? styles.active : ""}`}
            onClick={() => { setFilter(s.section); setDiffFilter('All'); }}
          >
            {getIcon(s.section)} {s.section}
          </button>
        ))}
      </div>

      {/* Difficulty filters */}
      <div className="filter-group" style={{ marginBottom: 36 }}>
        {['All', 'Easy', 'Medium', 'Hard'].map((diff) => (
          <button
            key={diff}
            className={`filter-pill ${diffFilter === diff ? styles.active : ""}`}
            onClick={() => setDiffFilter(diff as any)}
          >
            {diff === 'All' ? 'All Difficulties' : diff}
          </button>
        ))}
      </div>

      {/* Sections */}
      <div className={styles.sections}>
        {visibleSections.map((section) => {
          const realIdx = section.realIdx;
          return (
            <div key={section.section} className={styles.section}>
              <div className={styles.sectionHeader}>
                <div className={styles.sectionIcon}>{getIcon(section.section)}</div>
                <div>
                  <h2 className={styles.sectionTitle}>{section.section}</h2>
                  <p className={styles.sectionDesc}>{section.desc}</p>
                </div>
                <span className={styles.sectionCount}>{section.filteredQs.length} Qs</span>
              </div>

              <div className={styles.qList}>
                {section.filteredQs.map(({ q: item, qIdx: idx }) =>
                  isMCQ(item) ? (
                    <MCQCard
                      key={idx}
                      item={item}
                      idx={idx}
                      sectionIdx={realIdx}
                      revealed={revealed}
                      onToggle={toggleReveal}
                      bookmarks={bookmarks}
                      onBookmark={toggleBookmark}
                    />
                  ) : (
                    <CodingCard
                      key={idx}
                      item={item as CodingQuestion}
                      idx={idx}
                      sectionIdx={realIdx}
                      revealed={revealed}
                      onToggle={toggleReveal}
                      bookmarks={bookmarks}
                      onBookmark={toggleBookmark}
                    />
                  )
                )}
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
}
