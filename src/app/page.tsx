import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";

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
  { value: "50+", label: "Coding Problems", sub: "With in-browser compilation" },
  { value: "120+", label: "Practice Questions", sub: "Covering all TCS NQT topics" },
  { value: "80", label: "Mock Test Questions", sub: "Full timed simulation" },
  { value: "1", label: "Formula Sheet", sub: "Downloadable PDF guide" },
];

const RESOURCES = [
  {
    title: "Formula Cheat Sheet",
    desc: "Quick revision of all essential formulas for Numerical and Reasoning.",
    badge: "PDF Guide",
    href: "/assets/TCS-NQT-Formula-Cheat-Sheet.pdf",
    download: true,
  },
  {
    title: "Coding Bank",
    desc: "Practice real TCS NQT coding questions in our built-in IDE.",
    badge: "Interactive",
    href: "/coding",
  },
  {
    title: "Mock Simulator",
    desc: "Experience the exact UI and timing of the real TCS NQT exam.",
    badge: "Simulation",
    href: "/exam",
  },
  {
    title: "Study Roadmap",
    desc: "A structured 30-day plan to cover all aptitude and coding topics.",
    badge: "Guide",
    href: "/about",
  },
];

const FAQ = [
  { q: "Is this platform completely free?", a: "Yes, all resources, mock tests, and the coding IDE are completely free without any ads." },
  { q: "Does the coding IDE support my language?", a: "We support Python, JavaScript, C, C++, Java, and C# — the exact languages allowed in the actual NQT." },
  { q: "Are the questions from previous years?", a: "Yes, our question bank is heavily curated from past TCS NQT papers to ensure realistic difficulty." },
  { q: "How does the Mock Test work?", a: "It simulates the real exam environment with 80 aptitude questions and 2 coding problems, complete with strict section timers." },
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
            <div className={styles.heroBadge}>
              <span className={styles.dot} /> Free Educational Platform
            </div>
            <h1 className={styles.heroTitle}>Everything You Need to Crack TCS NQT</h1>
            <p className={styles.heroSub}>
              Master Numerical Aptitude, Logical Reasoning, Verbal Ability, Coding, Mock Tests, Interview Preparation, Formula Sheets, and Study Roadmaps — all in one place.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/coding" className="btn btn-primary">Start Practicing</Link>
              <a href="/assets/TCS-NQT-Formula-Cheat-Sheet.pdf" download className="btn btn-ghost">Download Formula Sheet</a>
            </div>
          </div>
          
          <div className={`${styles.heroRight} fade-up fade-up-2`}>
            <div className={styles.dashboardPreview}>
              <div className={styles.widgetHeader}>
                <div className={styles.windowControls}>
                   <span/><span/><span/>
                </div>
                <div className={styles.widgetTitle}>Student Dashboard</div>
              </div>
              <div className={styles.widgetBody}>
                 <div className={styles.widgetRow}>
                    <div className={styles.widgetCard}>
                       <span className={styles.widgetLabel}>Numerical Progress</span>
                       <div className={styles.widgetTrack}><div className={styles.widgetFill} style={{width: "75%"}}></div></div>
                    </div>
                    <div className={styles.widgetCard}>
                       <span className={styles.widgetLabel}>Coding Progress</span>
                       <div className={styles.widgetTrack}><div className={styles.widgetFill} style={{width: "40%"}}></div></div>
                    </div>
                 </div>
                 <div className={styles.widgetRow}>
                    <div className={styles.widgetCardLarge}>
                       <div className={styles.widgetCardHeader}>
                          <span className={styles.widgetLabel}>Upcoming Mock Test</span>
                          <span className={`badge ${styles.widgetBadge}`}>In 2 Days</span>
                       </div>
                       <p className={styles.widgetText}>Full NQT Simulation (190 mins)</p>
                    </div>
                 </div>
                 <div className={styles.widgetRow}>
                    <div className={styles.widgetCard}>
                       <span className={styles.widgetLabel}>Current Streak</span>
                       <div className={styles.widgetValue}>🔥 12 Days</div>
                    </div>
                    <div className={styles.widgetCard}>
                       <span className={styles.widgetLabel}>Today's Goal</span>
                       <div className={styles.widgetValue}>2/5 Problems</div>
                    </div>
                 </div>
              </div>
            </div>
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
            <h2 className={styles.sectionTitle}>Why Choose Us</h2>
            <p className={styles.sectionSub}>A premium, structured toolkit designed specifically for the TCS NQT pattern.</p>
          </div>
          <div className={styles.bentoGrid}>
             <div className={`${styles.bentoCard} ${styles.bentoLarge}`}>
                <div className={styles.bentoContent}>
                   <h3>Structured Roadmap</h3>
                   <p>A step-by-step curriculum that takes you from basic aptitude concepts to advanced coding in 30 days.</p>
                </div>
                <div className={styles.bentoArt}>
                   <div className={styles.bentoRoadmapArt}>
                      <div className={styles.bLine}></div>
                      <div className={`${styles.bNode} ${styles.bNodeActive}`}></div>
                      <div className={styles.bNode}></div>
                      <div className={styles.bNode}></div>
                   </div>
                </div>
             </div>
             
             <div className={styles.bentoCard}>
                <div className={styles.bentoContent}>
                   <h3>Built-in IDE</h3>
                   <p>Write, compile, and run code directly in your browser with real test cases.</p>
                </div>
             </div>

             <div className={styles.bentoCard}>
                <div className={styles.bentoContent}>
                   <h3>Full Mock Tests</h3>
                   <p>Simulate the exact 190-minute timed environment of the real NQT exam.</p>
                </div>
             </div>

             <div className={styles.bentoCard}>
                <div className={styles.bentoContent}>
                   <h3>Formula Sheets</h3>
                   <p>Downloadable PDFs for quick revision before the exam day.</p>
                </div>
             </div>
             
             <div className={`${styles.bentoCard} ${styles.bentoWide}`}>
                <div className={styles.bentoContent}>
                   <h3>Interview Preparation</h3>
                   <p>Past interview experiences, HR questions, and technical deep-dives to clear the final round.</p>
                </div>
             </div>
          </div>
        </div>
      </section>

      <section className={styles.resources}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Featured Resources</h2>
            <p className={styles.sectionSub}>Premium study materials to accelerate your preparation.</p>
          </div>
          <div className={styles.resourceGrid}>
            {RESOURCES.map((r, i) => (
              <div key={i} className={styles.resourceCard}>
                <div className={styles.resourceThumb}>
                   <div className={styles.thumbPattern} data-type={i}></div>
                </div>
                <div className={styles.resourceBody}>
                  <span className={styles.resourceBadge}>{r.badge}</span>
                  <h3 className={styles.resourceTitle}>{r.title}</h3>
                  <p className={styles.resourceDesc}>{r.desc}</p>
                  {r.download ? (
                    <a href={r.href} download className={styles.resourceAction}>Download Now &rarr;</a>
                  ) : (
                    <Link href={r.href} className={styles.resourceAction}>Explore &rarr;</Link>
                  )}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.faq}>
        <div className="container">
           <div className={styles.faqInner}>
              <div className={styles.faqHeader}>
                 <h2 className={styles.sectionTitle}>Frequently Asked Questions</h2>
                 <p className={styles.sectionSub}>Everything you need to know about the platform.</p>
              </div>
              <div className={styles.faqList}>
                 {FAQ.map((f, i) => (
                    <details key={i} className={styles.faqItem}>
                       <summary className={styles.faqQuestion}>{f.q}</summary>
                       <div className={styles.faqAnswer}>{f.a}</div>
                    </details>
                 ))}
              </div>
           </div>
        </div>
      </section>

    </div>
  );
}
