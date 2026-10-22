import styles from "@/app/tcs/pyq/pyq.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "Infosys Previous Year Questions (PYQ)",
  description: "Browse previous year questions and sample papers for Infosys HackWithInfy placements.",
  alternates: { canonical: "/infosys/pyq" },
};

export default function InfosysPYQPage() {
  const pdfs = [
    { name: "HackWithInfy Practice Questions 2025 - Part 1", file: "HackWithInfy Practice Questions 2025_Part 1 (1).pdf" },
    { name: "HackWithInfy Practice Questions 2025 - Part 2", file: "HackWithInfy Practice Questions 2025_Part 2 (1).pdf" },
    { name: "HackWithInfy Practice Questions 2025 - Part 3", file: "HackWithInfy Practice Questions 2025_Part 3 (1).pdf" },
    { name: "HackWithInfy Practice Questions 2026 - Part 1", file: "HackWithInfy Practice Questions 2026_Part 1 (2).pdf" },
    { name: "Level Up Questions", file: "Level up Question (1).pdf" }
  ];

  return (
    <div className="container section">
      <div className={styles.sectionBlock} style={{ marginBottom: "40px" }}>
        <h1 className={styles.sectionTitle} style={{ fontSize: "2rem", borderBottom: "none", paddingBottom: "0" }}>
          Infosys Sample Questions
        </h1>
        <p className={styles.sectionSub} style={{ fontSize: "1.1rem", marginTop: "8px" }}>
          Download the official sample and previous year question papers for Infosys HackWithInfy to practice advanced coding problems.
        </p>
      </div>
      
      <div className={styles.sectionBlock}>
        <div className={styles.paperList}>
          {pdfs.map((pdf, idx) => (
            <div key={idx} className={styles.paperItem}>
              <div className={styles.paperInfo}>
                <div className={styles.paperIcon}>
                  <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"></path>
                    <polyline points="14 2 14 8 20 8"></polyline>
                    <line x1="16" y1="13" x2="8" y2="13"></line>
                    <line x1="16" y1="17" x2="8" y2="17"></line>
                    <polyline points="10 9 9 9 8 9"></polyline>
                  </svg>
                </div>
                <div className={styles.paperDetails}>
                  <h3 className={styles.paperTitle}>{pdf.name}</h3>
                  <p className={styles.paperMeta}>Official HackWithInfy Resource • PDF</p>
                </div>
              </div>
              <div className={styles.paperActions}>
                <a 
                  href={`/infosys-pyq/${encodeURIComponent(pdf.file)}`} 
                  target="_blank" 
                  rel="noreferrer"
                  className={styles.paperBtnPrimary}
                >
                  View PDF
                </a>
                <a 
                  href={`/infosys-pyq/${encodeURIComponent(pdf.file)}`} 
                  download
                  className={styles.paperBtnGhost}
                >
                  Download
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
