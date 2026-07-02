"use client";

import { useState, useEffect } from "react";
import styles from "./pyq.module.css";
import rawData from "@/data/pyq_data.json";
import { Search, Bookmark, ChevronDown, ChevronUp, CheckCircle2, Circle } from "lucide-react";

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

function isMCQ(q: Question): q is MCQQuestion {
  return "opts" in q;
}

const LS_KEY = "tcs-nqt-pyq-revealed";
const LS_BOOKMARKS_KEY = "tcs-nqt-pyq-bookmarks";

function loadRevealedFromStorage(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(LS_KEY) || "{}"); } catch { return {}; }
}
function saveRevealedToStorage(revealed: Record<string, boolean>) {
  try { localStorage.setItem(LS_KEY, JSON.stringify(revealed)); } catch {}
}
function loadBookmarksFromStorage(): Record<string, boolean> {
  try { return JSON.parse(localStorage.getItem(LS_BOOKMARKS_KEY) || "{}"); } catch { return {}; }
}
function saveBookmarksToStorage(bookmarks: Record<string, boolean>) {
  try { localStorage.setItem(LS_BOOKMARKS_KEY, JSON.stringify(bookmarks)); } catch {}
}

const SECTIONS = rawData as Section[];

function MCQCard({
  item, idx, sectionIdx, revealed, onToggle, bookmarks, onBookmark,
}: {
  item: MCQQuestion; idx: number; sectionIdx: number;
  revealed: Record<string, boolean>; onToggle: (key: string) => void;
  bookmarks: Record<string, boolean>; onBookmark: (key: string) => void;
}) {
  const key = `${sectionIdx}-${idx}`;
  const isRevealed = !!revealed[key];
  const isBookmarked = !!bookmarks[key];
  const [selectedOpt, setSelectedOpt] = useState<number | null>(null);

  const diffColor = item.difficulty === "Easy" ? "var(--green)" : item.difficulty === "Medium" ? "var(--yellow)" : "var(--red)";

  return (
    <div className={styles.qItem}>
      <div className={styles.qHeader}>
        <div className={styles.qHeaderLeft}>
          <span className={styles.qNum}>{idx + 1}.</span>
          <p className={styles.qText}>{item.q}</p>
        </div>
        <div className={styles.qHeaderRight}>
          <span className={styles.diffBadge} style={{ color: diffColor }}>{item.difficulty}</span>
          <button className={styles.bookmarkBtn} onClick={() => onBookmark(key)}>
            <Bookmark size={18} fill={isBookmarked ? "var(--text)" : "none"} color={isBookmarked ? "var(--text)" : "var(--text-3)"} />
          </button>
        </div>
      </div>

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
            <button key={oi} className={optClass} onClick={() => setSelectedOpt(oi)} disabled={isRevealed}>
              <span className={styles.optLabel}>{String.fromCharCode(65 + oi)}</span>
              <span className={styles.optText}>{opt}</span>
            </button>
          );
        })}
      </div>

      <div className={styles.actionRow}>
        {!isRevealed && selectedOpt !== null && (
          <button className={`btn btn-primary`} onClick={() => onToggle(key)}>Check Answer</button>
        )}
        {!isRevealed && (
          <button className={`btn btn-ghost`} onClick={() => onToggle(key)}>Show Answer</button>
        )}
      </div>

      {isRevealed && (
        <div className={styles.answer}>
          <div className={styles.ansHeader}>
            <CheckCircle2 size={16} className={styles.correctIcon} />
            <span className={styles.ansLabel}>Correct Answer: {item.opts[item.answer]}</span>
          </div>
          <pre className={styles.ansPre}>{item.explanation}</pre>
        </div>
      )}
    </div>
  );
}

function CodingCard({
  item, idx, sectionIdx, revealed, onToggle, bookmarks, onBookmark,
}: {
  item: CodingQuestion; idx: number; sectionIdx: number;
  revealed: Record<string, boolean>; onToggle: (key: string) => void;
  bookmarks: Record<string, boolean>; onBookmark: (key: string) => void;
}) {
  const key = `${sectionIdx}-${idx}`;
  const isRevealed = !!revealed[key];
  const isBookmarked = !!bookmarks[key];
  const diffColor = item.difficulty === "Easy" ? "var(--green)" : item.difficulty === "Medium" ? "var(--yellow)" : "var(--red)";

  return (
    <div className={styles.qItem}>
      <div className={styles.qHeader}>
        <div className={styles.qHeaderLeft}>
          <span className={styles.qNum}>{idx + 1}.</span>
          <pre className={`${styles.qText} ${styles.qPre}`}>{item.q}</pre>
        </div>
        <div className={styles.qHeaderRight}>
          <span className={styles.diffBadge} style={{ color: diffColor }}>{item.difficulty}</span>
          <button className={styles.bookmarkBtn} onClick={() => onBookmark(key)}>
            <Bookmark size={18} fill={isBookmarked ? "var(--text)" : "none"} color={isBookmarked ? "var(--text)" : "var(--text-3)"} />
          </button>
        </div>
      </div>

      <div className={styles.actionRow}>
        <button className={`btn btn-ghost`} onClick={() => onToggle(key)}>
          {isRevealed ? "Hide Solution" : "Show Solution"}
        </button>
      </div>

      {isRevealed && (
        <div className={styles.answer}>
          <span className={styles.ansLabel}>Approach</span>
          <p className={styles.approachText}>{item.approach}</p>
          <span className={styles.ansLabel} style={{ marginTop: 16, display: 'block' }}>Python Solution</span>
          <pre className={styles.solutionPre}><code>{item.solution}</code></pre>
        </div>
      )}
    </div>
  );
}

type Filter = "All" | string;
type DiffFilter = "All" | "Easy" | "Medium" | "Hard";

export default function PYQClient() {
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState<Filter>("All");
  const [diffFilter, setDiffFilter] = useState<DiffFilter>("All");
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});

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
        if (search) {
          const qText = q.q.toLowerCase();
          if (!qText.includes(search.toLowerCase())) return false;
        }
        return true;
      });
    return { ...s, filteredQs, realIdx };
  }).filter((s) => {
    if (filter !== "All" && s.section !== filter) return false;
    return s.filteredQs.length > 0;
  });

  return (
    <div className={`container section ${styles.pyqLayout}`}>
      <div className={styles.sidebar}>
         <div className={styles.filterCard}>
            <div className={styles.searchBox}>
               <Search size={16} className={styles.searchIcon} />
               <input 
                 type="text" 
                 placeholder="Search questions..." 
                 value={search}
                 onChange={(e) => setSearch(e.target.value)}
                 className={styles.searchInput}
               />
            </div>
            
            <div className={styles.filterGroup}>
               <h4>Difficulty</h4>
               <div className={styles.filterOptions}>
                  {['All', 'Easy', 'Medium', 'Hard'].map(d => (
                     <button key={d} className={`${styles.filterBtn} ${diffFilter === d ? styles.filterBtnActive : ''}`} onClick={() => setDiffFilter(d as any)}>
                        {d}
                     </button>
                  ))}
               </div>
            </div>

            <div className={styles.filterGroup}>
               <h4>Category</h4>
               <div className={styles.filterOptions}>
                  <button className={`${styles.filterBtn} ${filter === 'All' ? styles.filterBtnActive : ''}`} onClick={() => setFilter('All')}>
                     All Categories
                  </button>
                  {SECTIONS.map(s => (
                     <button key={s.section} className={`${styles.filterBtn} ${filter === s.section ? styles.filterBtnActive : ''}`} onClick={() => setFilter(s.section)}>
                        {s.section}
                     </button>
                  ))}
               </div>
            </div>

            <div className={styles.filterGroup}>
               <button 
                  className={`${styles.filterBtn} ${styles.bookmarkFilterBtn} ${showBookmarkedOnly ? styles.filterBtnActive : ''}`} 
                  onClick={() => setShowBookmarkedOnly(!showBookmarkedOnly)}
               >
                  <Bookmark size={14} fill={showBookmarkedOnly ? "currentColor" : "none"} /> 
                  Bookmarked Only
               </button>
            </div>
         </div>
      </div>

      <div className={styles.mainContent}>
        {visibleSections.length === 0 ? (
           <div className={styles.emptyState}>
              <p>No questions match your filters.</p>
           </div>
        ) : (
           visibleSections.map((section) => (
             <div key={section.section} className={styles.sectionBlock}>
               <h2 className={styles.sectionTitle}>{section.section}</h2>
               
               <div className={styles.qList}>
                 {section.filteredQs.map(({ q: item, qIdx: idx }) =>
                   isMCQ(item) ? (
                     <MCQCard key={idx} item={item} idx={idx} sectionIdx={section.realIdx} revealed={revealed} onToggle={toggleReveal} bookmarks={bookmarks} onBookmark={toggleBookmark} />
                   ) : (
                     <CodingCard key={idx} item={item as CodingQuestion} idx={idx} sectionIdx={section.realIdx} revealed={revealed} onToggle={toggleReveal} bookmarks={bookmarks} onBookmark={toggleBookmark} />
                   )
                 )}
               </div>
             </div>
           ))
        )}
      </div>
    </div>
  );
}
