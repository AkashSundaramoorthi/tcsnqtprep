"use client";

import { useEffect, useState } from "react";
import Link from "next/link";
import styles from "./progress-summary.module.css";

export default function ProgressSummary() {
  const [stats, setStats] = useState({
    coding: 0,
    aptitude: 0,
    pyq: 0,
    exam: 0,
    totalProgress: false,
  });

  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    try {
      const codingProgress = JSON.parse(localStorage.getItem("tcs-nqt-coding-progress") || "{}");
      // Coding keys are problem IDs, value is "success"
      const codingCount = Object.values(codingProgress).filter(v => v === "success").length;

      const aptProgress = JSON.parse(localStorage.getItem("tcs-nqt-apt-progress") || "{}");
      // Aptitude keys are slugs, value is boolean (true if mastered)
      const aptCount = Object.values(aptProgress).filter(Boolean).length;

      const pyqProgress = JSON.parse(localStorage.getItem("tcs-nqt-pyq-revealed") || "{}");
      // PYQ keys are item IDs, value is boolean (true if revealed)
      const pyqCount = Object.values(pyqProgress).filter(Boolean).length;

      const examHistory = JSON.parse(localStorage.getItem("tcs-nqt-exam-history") || "[]");
      const examCount = Array.isArray(examHistory) ? examHistory.length : 0;

      const hasProgress = codingCount > 0 || aptCount > 0 || pyqCount > 0 || examCount > 0;

      setStats({
        coding: codingCount,
        aptitude: aptCount,
        pyq: pyqCount,
        exam: examCount,
        totalProgress: hasProgress,
      });
    } catch {
    }
    setMounted(true);
  }, []);

  if (!mounted) {
    return <div className={styles.skeleton} />;
  }

  if (!stats.totalProgress) {
    return (
      <div className={styles.emptyState}>
        <p>No progress yet.</p>
        <Link href="/tcs/aptitude" className="btn btn-primary">Start your prep →</Link>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h3 className={styles.title}>Your Progress</h3>
      <div className={styles.grid}>
        <div className={styles.barWrap}>
          <div className={styles.barHeader}>
            <span className={styles.label}>Coding Practice</span>
            <span className={styles.count}>{stats.coding} / 51</span>
          </div>
          <div className="progress-track" style={{ height: 6 }}>
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(100, (stats.coding / 51) * 100)}%`,
                background: "var(--blue)"
              }}
            />
          </div>
        </div>
        
        <div className={styles.barWrap}>
          <div className={styles.barHeader}>
            <span className={styles.label}>Aptitude Guide</span>
            <span className={styles.count}>{stats.aptitude} / 30</span>
          </div>
          <div className="progress-track" style={{ height: 6 }}>
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(100, (stats.aptitude / 30) * 100)}%`,
                background: "var(--purple)"
              }}
            />
          </div>
        </div>

        <div className={styles.barWrap}>
          <div className={styles.barHeader}>
            <span className={styles.label}>PYQs Revealed</span>
            <span className={styles.count}>{stats.pyq} / 120</span>
          </div>
          <div className="progress-track" style={{ height: 6 }}>
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(100, (stats.pyq / 120) * 100)}%`,
                background: "var(--yellow)"
              }}
            />
          </div>
        </div>

        <div className={styles.barWrap}>
          <div className={styles.barHeader}>
            <span className={styles.label}>Mock Exams Taken</span>
            <span className={styles.count}>{stats.exam}</span>
          </div>
          <div className="progress-track" style={{ height: 6 }}>
            <div
              className="progress-fill"
              style={{
                width: `${Math.min(100, (stats.exam / 5) * 100)}%`, // Capped max for visual purposes
                background: "var(--accent)"
              }}
            />
          </div>
        </div>
      </div>
    </div>
  );
}
