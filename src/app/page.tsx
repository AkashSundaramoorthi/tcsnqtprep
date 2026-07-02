import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import HeroPreview from "@/components/HeroPreview";
import { Play, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "TCS NQT Prep Hub — Coding, Aptitude & Mock Exam",
  description:
    "Free TCS NQT preparation platform. Practice 50 coding problems with an in-browser IDE supporting Python, JS, C, C++, Java and C#. Study 30 aptitude topics and take a timed mock exam.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "TCS NQT Prep Hub — Coding, Aptitude & Mock Exam",
    description: "Free TCS NQT preparation platform with coding IDE, aptitude guides, and mock exam.",
    url: "/",
  },
  twitter: {
    title: "TCS NQT Prep Hub",
    description: "Free TCS NQT preparation platform with coding IDE, aptitude guides, and mock exam.",
  },
};

const STATS = [
  { value: "120+", label: "Practice Questions", sub: "Covering all TCS NQT topics" },
  { value: "50+", label: "Coding Problems", sub: "With in-browser compilation" },
  { value: "80", label: "Mock Test Questions", sub: "Full timed simulation" },
  { value: "1", label: "Formula Cheat Sheet", sub: "Downloadable PDF guide" },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "TCS NQT Prep Hub",
  url: "https://tcsnqtprep.vercel.app",
  description: "Free TCS NQT preparation platform with coding IDE, aptitude guides, and mock exam."
};

export default function HomePage() {
  return (
    <div className={styles.page}>
      <script
        type="application/ld+json"
        dangerouslySetInnerHTML={{ __html: JSON.stringify(STRUCTURED_DATA) }}
      />

      <section className={styles.hero}>
        <div className={`container ${styles.heroGrid}`}>
          <div className={`${styles.heroLeft} fade-up`}>
            <h1 className={styles.heroTitle}>Everything You Need to Crack TCS NQT</h1>
            <p className={styles.heroSub}>
              Master Numerical Aptitude, Logical Reasoning, Verbal Ability, Coding, Mock Tests, Interview Preparation, Formula Sheets, and Study Roadmaps — all in one place.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/coding" className="btn btn-primary">
                <Play size={16} /> Start Practicing
              </Link>
              <a href="/assets/TCS-NQT-Formula-Cheat-Sheet.pdf" download className="btn btn-ghost">
                <Download size={16} /> Download Formula Sheet
              </a>
            </div>
          </div>
          
          <div className={`${styles.heroRight} fade-up fade-up-2`}>
            <HeroPreview />
          </div>
        </div>
      </section>

      <section className={styles.stats}>
        <div className="container">
          <div className={styles.statsGrid}>
            {STATS.map((s, i) => (
              <div key={i} className={styles.statCard}>
                <div className={styles.statValue}>{s.value}</div>
                <div className={styles.statLabel}>{s.label}</div>
                <div className={styles.statSub}>{s.sub}</div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.bento}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Complete Preparation Toolkit</h2>
            <p className={styles.sectionSub}>A structured set of resources designed specifically for the TCS NQT pattern.</p>
          </div>
          <div className={styles.bentoGrid}>
             <div className={`${styles.bentoCard} ${styles.bentoLarge}`}>
                <div className={styles.bentoContent}>
                   <h3>Structured Roadmap</h3>
                   <p>A step-by-step curriculum that goes from basic aptitude concepts to advanced coding in 30 days.</p>
                </div>
                <div className={styles.bentoArt}>
                   <div className={styles.bentoRoadmapArt}>
                      <div className={styles.bLine}></div>
                      <div className={`${styles.bNode} ${styles.bNodeActive}`}>
                         <div className={styles.bNodeTooltip}>Day 12: Percentages</div>
                      </div>
                      <div className={styles.bNode}></div>
                      <div className={styles.bNode}></div>
                   </div>
                </div>
             </div>
             
             <div className={styles.bentoCard}>
                <div className={styles.bentoContent}>
                   <h3>Built-in IDE</h3>
                   <p>Write, compile, and run code directly in the browser.</p>
                </div>
                <div className={styles.bentoArtMini}>
                   <pre className={styles.miniIde}><code><span className={styles.keyword}>int</span> <span className={styles.function}>main</span>() {'{\n'}  <span className={styles.builtin}>printf</span>(<span className={styles.string}>"Hello"</span>);{'\n}'}</code></pre>
                </div>
             </div>

             <div className={styles.bentoCard}>
                <div className={styles.bentoContent}>
                   <h3>Full Mock Tests</h3>
                   <p>Simulate the exact 190-minute timed environment.</p>
                </div>
                <div className={styles.bentoArtMini}>
                   <div className={styles.miniMock}>
                      <div className={styles.miniRadio}></div>
                      <div className={`${styles.miniRadio} ${styles.miniRadioActive}`}></div>
                      <div className={styles.miniRadio}></div>
                   </div>
                </div>
             </div>

             <div className={styles.bentoCard}>
                <div className={styles.bentoContent}>
                   <h3>Formula Sheets</h3>
                   <p>Downloadable PDFs for quick revision.</p>
                </div>
                <div className={styles.bentoArtMini}>
                   <div className={styles.miniPdf}>
                      <div className={styles.miniPdfLine}></div>
                      <div className={styles.miniPdfLine}></div>
                      <div className={`${styles.miniPdfLine} ${styles.miniPdfLineShort}`}></div>
                   </div>
                </div>
             </div>
             
             <div className={`${styles.bentoCard} ${styles.bentoWide}`}>
                <div className={styles.bentoContent}>
                   <h3>Interview Preparation</h3>
                   <p>Past interview experiences, HR questions, and technical deep-dives to clear the final round.</p>
                </div>
                <div className={styles.bentoArtMiniWide}>
                   <div className={styles.miniChat}>
                      <div className={styles.miniMsg}>Explain Polymorphism.</div>
                      <div className={`${styles.miniMsg} ${styles.miniMsgReply}`}>It allows objects to...</div>
                   </div>
                </div>
             </div>
          </div>
        </div>
      </section>
    </div>
  );
}
