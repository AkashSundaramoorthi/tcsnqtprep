import styles from "./about.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — PlacementPrepHub",
  description: "Learn about the TCS NQT structure, sections, profile offers, and the platform.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — PlacementPrepHub",
    description: "Learn about the TCS NQT structure, sections, profile offers, and the platform.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>About PlacementPrepHub</h1>
        <p className={styles.subtitle}>
          PlacementPrepHub is a free preparation platform designed to help students prepare for various placement exams through coding practice, aptitude resources, mock tests, previous year questions, interview preparation, and quick revision material.
        </p>
      </header>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Platform Overview</h2>
        <div className={styles.overviewGrid}>
          <div className={styles.overviewItem}>
            <h3>Coding Practice</h3>
            <p>Practice coding questions with an in-browser IDE.</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Aptitude Guide</h3>
            <p>Topic-wise concepts with solved examples.</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Mock Test</h3>
            <p>Timed practice based on the latest pattern.</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Previous Year Questions</h3>
            <p>Curated questions with solutions.</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Formula Sheet</h3>
            <p>Quick revision before exams.</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Interview Preparation</h3>
            <p>HR and technical interview resources.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why This Platform?</h2>
        <p className={styles.paragraph}>
          Most TCS NQT preparation resources are scattered across multiple websites, disjointed PDFs, and long videos.
        </p>
        <p className={styles.paragraph}>
          Students waste valuable time switching between resources and environments. PlacementPrepHub combines everything into one clean, distraction-free platform, significantly reducing friction so you can focus entirely on preparation.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>TCS NQT Overview</h2>
        <p className={styles.paragraph}>
          The TCS National Qualifier Test is an integrated assessment consisting of two mandatory parts: a Foundation Section and an Advanced Section. Performance across both sections determines your eligibility and the final profile offered.
        </p>

        <h3 className={styles.subHeading}>Foundation Section (75 mins)</h3>
        <p className={styles.paragraph}>Evaluates core aptitude and communication skills. Compulsory for all.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Section</th>
                <th>Questions</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Numerical Ability</td>
                <td>20</td>
                <td>25 mins</td>
              </tr>
              <tr>
                <td>Verbal Ability</td>
                <td>25</td>
                <td>25 mins</td>
              </tr>
              <tr>
                <td>Reasoning Ability</td>
                <td>20</td>
                <td>25 mins</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={styles.subHeading}>Advanced Section (115 mins)</h3>
        <p className={styles.paragraph}>High-level programming and analytical ability typically required for Digital and Prime roles.</p>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Section</th>
                <th>Questions</th>
                <th>Duration</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>Advanced Quantitative & Reasoning</td>
                <td>15</td>
                <td>25 mins</td>
              </tr>
              <tr>
                <td>Advanced Coding</td>
                <td>2</td>
                <td>90 mins</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={styles.subHeading}>Exam Rules</h3>
        <ul className={styles.list}>
          <li><strong>No negative marking:</strong> There is no penalty for incorrect answers.</li>
          <li><strong>Sectional navigation:</strong> Switching between sections or returning to previous questions is strictly not allowed.</li>
          <li><strong>Score validity:</strong> The NQT scorecard is valid for 2 years.</li>
        </ul>

        <h3 className={styles.subHeading}>Compensation Categories</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Offer Category</th>
                <th>Experience: 0 to 1 year</th>
                <th>Experience: 1 to 2 years</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Prime</strong></td>
                <td>9.09 LPA - 11.80 LPA</td>
                <td>9.45 LPA - 12.26 LPA</td>
              </tr>
              <tr>
                <td><strong>Digital</strong></td>
                <td>7.09 LPA - 7.60 LPA</td>
                <td>7.50 LPA - 8.04 LPA</td>
              </tr>
              <tr>
                <td><strong>Ninja</strong></td>
                <td>3.36 LPA - 3.53 LPA</td>
                <td>3.36 LPA - 3.53 LPA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.creatorSection}>
        <h3 className={styles.creatorName}>Built by Akash Sundaramoorthi</h3>
        <p className={styles.creatorRole}>Full-Stack Developer and Cybersecurity Researcher.</p>
        <p className={styles.creatorBio}>
          PlacementPrepHub was built to provide students with a clean and centralized platform for placement exam preparation.
        </p>
        <div className={styles.creatorLinks}>
          <a href="https://akash-sundaramoorthi.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Portfolio</a>
          <a href="https://www.linkedin.com/in/akash-sundaramoorthi-958279290/" target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn</a>
        </div>
      </section>
    </div>
  );
}
