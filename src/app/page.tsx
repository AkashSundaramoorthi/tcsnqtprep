import type { Metadata } from "next";
import Link from "next/link";
import styles from "./page.module.css";
import HeroPreview from "@/components/HeroPreview";
import { Play, Download } from "lucide-react";

export const metadata: Metadata = {
  title: "Placement Prep Hub — TCS NQT & Infosys",
  description:
    "Free placement preparation platform. Practice coding problems with an in-browser IDE supporting Python, JS, C, C++, Java and C#. Study aptitude topics and take timed mock exams.",
  alternates: {
    canonical: "/",
  },
  openGraph: {
    title: "Placement Prep Hub — TCS NQT & Infosys",
    description: "Free placement preparation platform with coding IDE, aptitude guides, and mock exams.",
    url: "/",
  },
  twitter: {
    title: "Placement Prep Hub",
    description: "Free placement preparation platform with coding IDE, aptitude guides, and mock exams.",
  },
};

const STATS = [
  { value: "50+", label: "Coding Problems" },
  { value: "6", label: "Languages" },
  { value: "30+", label: "Aptitude Topics" },
  { value: "150+", label: "Previous Year Qs" },
];

const FEATURES_TCS = [
  {
    title: "TCS Coding Practice",
    desc: "Problems from Easy to Hard. Write code in Python, JavaScript, C, C++, Java, or C# and run against real test cases right in your browser.",
    href: "/tcs/coding",
    badge: "53 Problems",
    num: "01",
  },
  {
    title: "TCS Aptitude Guide",
    desc: "Topics covering Numerical, Verbal, Reasoning, and Advanced sections. Step-by-step method guides with solved practice problems.",
    href: "/tcs/aptitude",
    badge: "27 Topics",
    num: "02",
  },
  {
    title: "TCS Mock Exam",
    desc: "Full NQT simulation with timed, sequentially-locked sections across Aptitude and live Coding problems.",
    href: "/tcs/exam",
    badge: "80 Qs + Coding",
    num: "03",
  },
  {
    title: "TCS Previous Year Qs",
    desc: "Curated PYQs from past TCS NQT exams across all sections with worked solutions.",
    href: "/tcs/pyq",
    badge: "120+ PYQs",
    num: "04",
  },
];

const FEATURES_INFY = [
  {
    title: "Infosys Coding Practice",
    desc: "DSA-focused competitive programming challenges typical of HackWithInfy. Test your algorithms in multiple languages.",
    href: "/infosys/coding",
    badge: "DSA Focus",
    num: "01",
  },
  {
    title: "Infosys Aptitude",
    desc: "Preparation for Infosys specific puzzle-solving and logical reasoning rounds.",
    href: "/infosys/aptitude",
    badge: "Logic & Puzzles",
    num: "02",
  },
  {
    title: "HackWithInfy Mock",
    desc: "Simulate the intensive coding rounds seen in HackWithInfy with full automated testing.",
    href: "/infosys/exam",
    badge: "4 Problems · 180m",
    num: "03",
  },
  {
    title: "Infosys PYQs",
    desc: "Previous year questions from HackWithInfy and standard Infosys placements.",
    href: "/infosys/pyq",
    badge: "Past Papers",
    num: "04",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Study the aptitude methods",
    body: "Don't just memorise formulas. Each topic has a method guide that shows you how to think through the problem type.",
  },
  {
    step: "02",
    title: "Practice coding daily",
    body: "Pick a few problems each day. Run them against test cases. The in-browser IDE supports all allowed languages.",
  },
  {
    step: "03",
    title: "Go through PYQs",
    body: "Past questions repeat patterns. Study them with solutions — understanding the reasoning matters more than the answer.",
  },
  {
    step: "04",
    title: "Simulate with the mock exam",
    body: "Take the mock exams under real conditions. Review every wrong answer. Repeat until you're consistently above 60%.",
  },
];

const STRUCTURED_DATA = {
  "@context": "https://schema.org",
  "@type": "WebSite",
  name: "Placement Prep Hub",
  url: "https://tcsnqtprep.vercel.app",
  description: "Free placement preparation platform with coding IDE, aptitude guides, and mock exams."
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
            <h1 className={styles.heroTitle}>
              Crack your placements.<br />
              <span className="gradient-text">Prepare smart. Score high.</span>
            </h1>
            <p className={`${styles.heroSub} fade-up fade-up-2`}>
              Coding problems with a real in-browser IDE, aptitude method guides, previous year questions with solutions, and timed mock exams for TCS NQT and Infosys HackWithInfy.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/tcs/coding" className="btn btn-primary">
                TCS Prep
              </Link>
              <Link href="/infosys/coding" className="btn btn-ghost">
                Infosys Prep →
              </Link>
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
              </div>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>TCS NQT Track</h2>
            <p className={styles.sectionSub}>Everything you need to clear the National Qualifier Test.</p>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURES_TCS.map((f, i) => (
              <Link key={i} href={f.href} className={styles.featureCard}>
                <div className={styles.featureNum}>{f.num}</div>
                <div className={styles.featureBody}>
                  <div className={styles.featureTop}>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{f.badge}</span>
                  </div>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
                <span className={styles.featureArrow}>→</span>
              </Link>
            ))}
          </div>
          
          <div className={styles.sectionHead} style={{ marginTop: '64px' }}>
            <h2 className={styles.sectionTitle}>Infosys HackWithInfy Track</h2>
            <p className={styles.sectionSub}>Master DSA and logical puzzles for Infosys placements.</p>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURES_INFY.map((f, i) => (
              <Link key={i} href={f.href} className={styles.featureCard}>
                <div className={styles.featureNum}>{f.num}</div>
                <div className={styles.featureBody}>
                  <div className={styles.featureTop}>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <span style={{ fontSize: '0.8rem', color: 'var(--text-3)' }}>{f.badge}</span>
                  </div>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
                <span className={styles.featureArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.plan}>
        <div className="container">
          <div className={styles.planGrid}>
            <div className={styles.planText}>
              <h2 className={styles.planTitle}>Suggested study plan</h2>
              <p className={styles.planSub}>
                Most students have 2–4 weeks before their exams. Here&apos;s a
                structure that actually works.
              </p>
              <Link href="/about" className={styles.planLink}>
                Read about the exam structures →
              </Link>
            </div>

            <div className={styles.planSteps}>
              {STEPS.map((s) => (
                <div key={s.step} className={styles.step}>
                  <span className={styles.stepNum}>{s.step}</span>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>{s.title}</h4>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
    </div>
  );
}
