import styles from "./about.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — TCS NQT Prep Hub",
  description: "Learn about the TCS NQT structure, sections, profile offers, and the creator behind this platform.",
};

export default function AboutPage() {
  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>About the Platform & Creator</h1>
        <p className={styles.pageSub}>
          Everything you need to know about the TCS National Qualifier Test and the developer who built this prep hub.
        </p>
      </div>

      <div className={styles.sections}>
        {/* Creator Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>👨‍💻</div>
            <div>
              <h2 className={styles.sectionTitle}>About the Creator</h2>
              <p className={styles.sectionDesc}>Built with passion by Akash Sundaramoorthi</p>
            </div>
          </div>
          <div className={styles.sectionContent}>
            <div className={styles.creatorProfile}>
              <div className={styles.creatorInfo}>
                <h3 className={styles.creatorName}>Akash Sundaramoorthi</h3>
                <p className={styles.creatorRole}>Full-Stack Developer & Cybersecurity Researcher (Bug Bounty Hunter)</p>
                <p className={styles.creatorBio}>
                  Pursuing B.Tech CSE (Cybersecurity) at SRM Institute of Science and Technology (2023–2027). 
                  I build secure, high-performance web applications by day and break them by night. My core focus lies in MERN stack development and vulnerability research, with rewarded disclosures from platforms like Pilgrim and MoneyTun.
                </p>
                <div className={styles.creatorSkills}>
                  <div className={styles.skillGroup}>
                    <h4>Security & Testing</h4>
                    <p>Vulnerability Assessment, OSINT, Burp Suite, Postman, Nmap</p>
                  </div>
                  <div className={styles.skillGroup}>
                    <h4>Development</h4>
                    <p>Python, JavaScript, React.js, Node.js, SQL, Express.js</p>
                  </div>
                </div>
                <div className={styles.creatorLinks}>
                  <a href="https://akash-sundaramoorthi.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Portfolio</a>
                  <a href="https://github.com/AkashSundaramoorthi" target="_blank" rel="noreferrer" className="btn btn-ghost">GitHub</a>
                  <a href="https://www.linkedin.com/in/akash-sundaramoorthi-958279290/" target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn</a>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* TCS NQT Info Section */}
        <section className={styles.section}>
          <div className={styles.sectionHeader}>
            <div className={styles.sectionIcon}>🏢</div>
            <div>
              <h2 className={styles.sectionTitle}>About the TCS NQT</h2>
              <p className={styles.sectionDesc}>National Qualifier Test — structure, sections, profiles, and rules.</p>
            </div>
          </div>
          <div className={styles.sectionContent}>
            <p className={styles.introText}>
              The <strong>TCS NQT (National Qualifier Test)</strong> is an integrated assessment made up of two
              mandatory parts: a <strong>Foundation Section</strong> (75 minutes) and an <strong>Advanced Section</strong>{" "}
              (115 minutes). Your performance across these sections determines your eligibility and the
              profile you are offered. There is <strong>no negative marking</strong>.
            </p>

            <h3 className={styles.subHeading}>TCS All India NQT Hiring (Batch of 2026, 2025 & 2024)</h3>
            <p className={styles.sectionNote} style={{ marginBottom: "16px" }}>
              TCS invites top talent to apply for Prime & Digital Cadre opportunities. Launch your career with higher CTC opportunities at TCS — Prime & Digital*.
            </p>
            <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead>
                  <tr>
                    <th rowSpan={2} style={{ borderRight: "1px solid var(--border)", verticalAlign: "middle" }}>Offer Category</th>
                    <th colSpan={2} style={{ borderRight: "1px solid var(--border)", textAlign: "center" }}>Experience: 0 to 1 year</th>
                    <th colSpan={2} style={{ textAlign: "center" }}>Experience: 1 to 2 years</th>
                  </tr>
                  <tr>
                    <th style={{ borderTop: "1px solid var(--border)" }}>CTC Range - UG</th>
                    <th style={{ borderTop: "1px solid var(--border)", borderRight: "1px solid var(--border)" }}>CTC Range - PG</th>
                    <th style={{ borderTop: "1px solid var(--border)" }}>CTC Range - UG</th>
                    <th style={{ borderTop: "1px solid var(--border)" }}>CTC Range - PG</th>
                  </tr>
                </thead>
                <tbody>
                  <tr>
                    <td style={{ borderRight: "1px solid var(--border)" }}><strong>Prime</strong></td>
                    <td>9.09 LPA - 9.30 LPA</td>
                    <td style={{ borderRight: "1px solid var(--border)" }}>11.59 LPA - 11.80 LPA</td>
                    <td>9.45 LPA - 9.66 LPA</td>
                    <td>12.05 LPA - 12.26 LPA</td>
                  </tr>
                  <tr>
                    <td style={{ borderRight: "1px solid var(--border)" }}><strong>Digital</strong></td>
                    <td>7.09 LPA - 7.30 LPA</td>
                    <td style={{ borderRight: "1px solid var(--border)" }}>7.39 LPA - 7.60 LPA</td>
                    <td>7.50 LPA - 7.72 LPA</td>
                    <td>7.82 LPA - 8.04 LPA</td>
                  </tr>
                </tbody>
              </table>
            </div>
            <p style={{ fontSize: "0.8rem", color: "var(--text-3)", marginTop: "8px", marginBottom: "24px" }}>
              * Actual Compensation basis relevant work experience and job location.
            </p>

            <h3 className={styles.subHeading}>Part A — Foundation Section <span className="badge badge-easy">75 mins</span></h3>
            <p className={styles.sectionNote}>Evaluates core aptitude and communication skills. Compulsory for all.</p>
            <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead>
                  <tr><th>Section</th><th>Questions</th><th>Duration</th><th>Syllabus highlights</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Numerical Ability</strong></td><td>20</td><td>25 mins</td>
                    <td>Number System, Percentages, Profit & Loss, Time & Work, Speed Distance, Averages.</td>
                  </tr>
                  <tr>
                    <td><strong>Verbal Ability</strong></td><td>25</td><td>25 mins</td>
                    <td>Reading Comprehension, Para Jumbles, Error Spotting, Sentence Correction.</td>
                  </tr>
                  <tr>
                    <td><strong>Reasoning Ability</strong></td><td>20</td><td>25 mins</td>
                    <td>Seating Arrangement, Blood Relations, Coding-Decoding, Syllogisms.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className={styles.subHeading}>Part B — Advanced Section <span className="badge badge-hard">115 mins</span></h3>
            <p className={styles.sectionNote}>High-level programming and analytical ability — typically required for Digital and Prime roles.</p>
            <div className={styles.tableWrap}>
              <table className={styles.dataTable}>
                <thead>
                  <tr><th>Section</th><th>Questions</th><th>Duration</th><th>Syllabus highlights</th></tr>
                </thead>
                <tbody>
                  <tr>
                    <td><strong>Adv. Quantitative & Reasoning</strong></td><td>15</td><td>25 mins</td>
                    <td>Advanced Puzzles, Permutation & Combination, Probability, Algebra, Geometry.</td>
                  </tr>
                  <tr>
                    <td><strong>Advanced Coding</strong></td><td>2</td><td>90 mins</td>
                    <td>Data Structures & Algorithms. Languages allowed: C, C++, Java, Python, and Perl.</td>
                  </tr>
                </tbody>
              </table>
            </div>

            <h3 className={styles.subHeading}>Key Exam Rules</h3>
            <ul className={styles.rulesList}>
              <li><strong>No negative marking</strong> — no penalty for incorrect answers.</li>
              <li><strong>Sectional navigation</strong> — switching between sections or returning to previous questions is strictly not allowed.</li>
              <li><strong>Score validity</strong> — the NQT scorecard is valid for <strong>2 years</strong>.</li>
            </ul>
          </div>
        </section>
      </div>
    </div>
  );
}
