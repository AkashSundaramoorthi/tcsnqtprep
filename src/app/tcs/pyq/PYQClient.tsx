"use client";

import { useState, useEffect } from "react";
import styles from "./pyq.module.css";
import rawData from "@/data/pyq_data.json";
import { Search, Bookmark, ChevronDown, ChevronUp, CheckCircle2, Circle, FileText, Download } from "lucide-react";
import { analytics } from "@/lib/analytics";

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

export interface Section {
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

function MCQCard({
  item, idx, displayIdx, sectionIdx, sectionName, revealed, onToggle, bookmarks, onBookmark,
}: {
  item: MCQQuestion; idx: number; displayIdx?: number; sectionIdx: number; sectionName: string;
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
          <span className={styles.qNum}>{(displayIdx ?? idx) + 1}.</span>
          <p className={styles.qText}>{item.q}</p>
        </div>
        <div className={styles.qHeaderRight}>
          <span className={styles.diffBadge} style={{ color: diffColor }}>{item.difficulty} • {sectionName}</span>
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
  item, idx, displayIdx, sectionIdx, sectionName, revealed, onToggle, bookmarks, onBookmark,
}: {
  item: CodingQuestion; idx: number; displayIdx?: number; sectionIdx: number; sectionName: string;
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
          <span className={styles.qNum}>{(displayIdx ?? idx) + 1}.</span>
          <pre className={`${styles.qText} ${styles.qPre}`}>{item.q}</pre>
        </div>
        <div className={styles.qHeaderRight}>
          <span className={styles.diffBadge} style={{ color: diffColor }}>{item.difficulty} • {sectionName}</span>
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

export default function PYQClient({ data }: { data?: Section[] }) {
  const SECTIONS = data || (rawData as Section[]);
  const [search, setSearch] = useState("");  const [filter, setFilter] = useState<Filter>("All");
  const [diffFilter, setDiffFilter] = useState<DiffFilter>("All");
  const [showBookmarkedOnly, setShowBookmarkedOnly] = useState(false);
  const [revealed, setRevealed] = useState<Record<string, boolean>>({});
  const [bookmarks, setBookmarks] = useState<Record<string, boolean>>({});
  const [limits, setLimits] = useState<Record<string, number>>({});

  useEffect(() => {
    setLimits({});
  }, [search, filter, diffFilter, showBookmarkedOnly]);

  useEffect(() => {
    analytics.trackEvent("pyq_page_opened");
    setRevealed(loadRevealedFromStorage());
    setBookmarks(loadBookmarksFromStorage());
  }, []);

  const toggleReveal = (key: string) => {
    setRevealed((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (next[key]) {
         analytics.trackEvent("pyq_answer_revealed");
      }
      saveRevealedToStorage(next);
      return next;
    });
  };

  const toggleBookmark = (key: string) => {
    setBookmarks((prev) => {
      const next = { ...prev, [key]: !prev[key] };
      if (next[key]) {
        analytics.trackEvent("pyq_bookmark_added");
      } else {
        analytics.trackEvent("pyq_bookmark_removed");
      }
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
                  <button className={`${styles.filterBtn} ${filter === 'All' ? styles.filterBtnActive : ''}`} onClick={() => { setFilter('All'); analytics.trackEvent("pyq_category_selected", { category: 'All' }); }}>
                     All Categories
                  </button>
                  {SECTIONS.map(s => (
                     <button key={s.section} className={`${styles.filterBtn} ${filter === s.section ? styles.filterBtnActive : ''}`} onClick={() => { setFilter(s.section); analytics.trackEvent("pyq_category_selected", { category: s.section }); }}>
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
        ) : filter === "All" ? (
           <div className={styles.sectionBlock}>
             <h2 className={styles.sectionTitle}>All Categories</h2>
             
             <div className={styles.qList}>
               {(() => {
                 const allFilteredQs = visibleSections.flatMap(s => s.filteredQs.map(q => ({...q, sectionName: s.section, realIdx: s.realIdx})));
                 const limit = limits['All'] || 5;
                 const displayedQs = allFilteredQs.slice(0, limit);
                 const hasMore = allFilteredQs.length > limit;

                 return (
                   <>
                     {displayedQs.map(({ q: item, qIdx: idx, realIdx, sectionName }, combinedIdx) =>
                       isMCQ(item) ? (
                         <MCQCard key={`${realIdx}-${idx}`} item={item} idx={idx} displayIdx={combinedIdx} sectionIdx={realIdx} sectionName={sectionName} revealed={revealed} onToggle={toggleReveal} bookmarks={bookmarks} onBookmark={toggleBookmark} />
                       ) : (
                         <CodingCard key={`${realIdx}-${idx}`} item={item as CodingQuestion} idx={idx} displayIdx={combinedIdx} sectionIdx={realIdx} sectionName={sectionName} revealed={revealed} onToggle={toggleReveal} bookmarks={bookmarks} onBookmark={toggleBookmark} />
                       )
                     )}
                     {hasMore && (
                       <button 
                         className="btn btn-ghost" 
                         onClick={() => setLimits(prev => ({...prev, ['All']: limit + 5}))}
                         style={{ alignSelf: 'center', marginTop: '16px' }}
                       >
                         Load More Questions
                       </button>
                     )}
                   </>
                 );
               })()}
             </div>
           </div>
        ) : (
           visibleSections.map((section) => {
             const limit = limits[section.section] || 5;
             const displayedQs = section.filteredQs.slice(0, limit);
             const hasMore = section.filteredQs.length > limit;

             return (
               <div key={section.section} className={styles.sectionBlock}>
                 <h2 className={styles.sectionTitle}>{section.section}</h2>
                 
                 <div className={styles.qList}>
                   {displayedQs.map(({ q: item, qIdx: idx }) =>
                     isMCQ(item) ? (
                       <MCQCard key={idx} item={item} idx={idx} sectionIdx={section.realIdx} sectionName={section.section} revealed={revealed} onToggle={toggleReveal} bookmarks={bookmarks} onBookmark={toggleBookmark} />
                     ) : (
                       <CodingCard key={idx} item={item as CodingQuestion} idx={idx} sectionIdx={section.realIdx} sectionName={section.section} revealed={revealed} onToggle={toggleReveal} bookmarks={bookmarks} onBookmark={toggleBookmark} />
                     )
                   )}
                 </div>

                 {hasMore && (
                   <button 
                     className="btn btn-ghost" 
                     onClick={() => setLimits(prev => ({...prev, [section.section]: limit + 5}))}
                     style={{ alignSelf: 'center', marginTop: '16px' }}
                   >
                     Load More Questions
                   </button>
                 )}
               </div>
             );
           })
        )}
        
        <div className={styles.sectionBlock} style={{ marginTop: '32px' }}>
          <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '8px' }}>
            <h2 className={styles.sectionTitle} style={{ margin: 0 }}>Previous Papers</h2>
            <a href="/pdfs/TCS-NQT-All-Papers.zip" download className={styles.paperBtnGhost} style={{ display: 'flex', alignItems: 'center', gap: '8px' }} onClick={() => analytics.trackEvent("pyq_download_all_clicked")}>
              <Download size={16} /> Download All
            </a>
          </div>
          <p className={styles.sectionSub}>
            Practice with complete TCS NQT papers in PDF format. Open them directly in your browser or download them for offline practice.
          </p>
          
          <div className={styles.paperList}>
            {Array.from({length: 10}).map((_, i) => {
              const num = 10 - i;
              return (
                <div key={num} className={styles.paperItem}>
                   <div className={styles.paperInfo}>
                     <div className={styles.paperIcon}>
                       <FileText size={24} />
                     </div>
                     <div className={styles.paperDetails}>
                       <h3 className={styles.paperTitle}>TCS NQT Paper {num}</h3>
                       <p className={styles.paperMeta}>Complete Previous Year Paper • PDF</p>
                     </div>
                   </div>
                   <div className={styles.paperActions}>
                     <a href={`/pdfs/TCS-NQT-Paper-${num}.pdf`} target="_blank" rel="noopener noreferrer" className={styles.paperBtnPrimary} onClick={() => analytics.trackEvent("pyq_paper_viewed", { paper: `Paper ${num}` })}>
                       View PDF
                     </a>
                     <a href={`/pdfs/TCS-NQT-Paper-${num}.pdf`} download className={styles.paperBtnGhost} onClick={() => analytics.trackEvent("pyq_paper_downloaded", { paper: `Paper ${num}`, filename: `TCS-NQT-Paper-${num}.pdf` })}>
                       Download
                     </a>
                   </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>
    </div>
  );
}
