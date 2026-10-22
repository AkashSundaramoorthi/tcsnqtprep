import type { Metadata } from "next";
import Link from "next/link";
import styles from "../page.module.css";
import { TRACKS } from "@/lib/tracks";

const track = TRACKS["tcs-nqt"];

export const metadata: Metadata = {
  title: `${track.label} - PlacementPrepHub — Coding, Aptitude & Mock Exam`,
  description: track.description,
  alternates: {
    canonical: "/tcs",
  },
};

const FEATURES = [
  {
    title: "Coding Practice",
    desc: "50+ problems from Easy to Hard. Write code in Python, JavaScript, C, C++, Java, or C# and run against real test cases right in your browser.",
    href: "/tcs/coding",
    badge: "50+ Problems · 6 Languages",
    num: "01",
  },
  {
    title: "Aptitude Guide",
    desc: "30 topics covering Numerical, Verbal, Reasoning, and Advanced sections. Step-by-step method guides with solved practice problems.",
    href: "/tcs/aptitude",
    badge: "30 Topics",
    num: "02",
  },
  {
    title: "Mock Exam",
    desc: "45 questions across Numerical, Reasoning, Verbal, and Advanced — plus a live coding round. Full NQT simulation with timers.",
    href: "/tcs/exam",
    badge: "45 Qs + Coding",
    num: "03",
  },
  {
    title: "Previous Year Questions",
    desc: "Curated PYQs from past TCS NQT exams across all sections with worked explanations and difficulty badges.",
    href: "/tcs/pyq",
    badge: "120+ PYQs",
    num: "04",
  },
];

export default function TCSTrackPage() {
  return (
    <div className={styles.page}>
      <section className={styles.hero} style={{ paddingBottom: "2rem" }}>
        <div className="container">
          <div className="fade-up" style={{ maxWidth: "800px", margin: "0 auto", textAlign: "center" }}>
            <div style={{ display: "inline-block", padding: "0.25rem 0.75rem", borderRadius: "999px", background: "var(--surface-2)", color: "var(--accent)", fontSize: "0.85rem", fontWeight: 600, marginBottom: "1rem", border: "1px solid var(--border)" }}>
              {track.company} Track
            </div>
            <h1 className={styles.heroTitle} style={{ fontSize: "3rem" }}>
              {track.label} <span className="gradient-text">Preparation Hub</span>
            </h1>
            <p className={styles.heroSub} style={{ margin: "1rem auto 2rem", maxWidth: "600px" }}>
              {track.description} Choose a section below to begin practicing.
            </p>
            <div className={styles.heroCtas} style={{ justifyContent: "center" }}>
              <Link href="/tcs/coding" className="btn btn-primary">
                Open Coding IDE
              </Link>
              <Link href="/tcs/exam" className="btn btn-ghost">
                Start Mock Exam →
              </Link>
            </div>
          </div>
        </div>
      </section>

      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>Track Sections</h2>
            <p className={styles.sectionSub}>Everything you need to master the {track.label} exam.</p>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <Link key={i} href={f.href} className={styles.featureCard}>
                <div className={styles.featureNum}>{f.num}</div>
                <div className={styles.featureBody}>
                  <div className={styles.featureTop}>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <span style={{ fontSize: "0.8rem", color: "var(--text-3)" }}>{f.badge}</span>
                  </div>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
                <span className={styles.featureArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>
    </div>
  );
}
