import styles from "./about.module.css";
import { Metadata } from "next";

export const metadata: Metadata = {
  title: "About — NQT Prep Hub",
  description: "Learn about the TCS NQT structure, sections, profile offers, and the platform.",
  alternates: {
    canonical: "/about",
  },
  openGraph: {
    title: "About — NQT Prep Hub",
    description: "Learn about the TCS NQT structure, sections, profile offers, and the platform.",
    url: "/about",
  },
};

export default function AboutPage() {
  return (
    <div className={styles.pageContainer}>
      <header className={styles.header}>
        <h1 className={styles.title}>About NQT Prep Hub</h1>
        <p className={styles.subtitle}>
          NQT Prep Hub is a free preparation platform designed to help students prepare for the TCS National Qualifier Test through coding practice, aptitude resources, mock tests, previous year questions, interview preparation, and quick revision material.
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
            <h3>Mock Test</h3>
            <p>Timed practice based on the HackWithInfy pattern.</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Previous Year Questions</h3>
            <p>Curated questions with solutions.</p>
          </div>
          <div className={styles.overviewItem}>
            <h3>Interview Preparation</h3>
            <p>Technical interview resources.</p>
          </div>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Why This Platform?</h2>
        <p className={styles.paragraph}>
          Infosys HackWithInfy and standard recruitment resources are often scattered across multiple websites, disjointed PDFs, and long videos.
        </p>
        <p className={styles.paragraph}>
          Students waste valuable time switching between resources and environments. NQT Prep Hub combines everything into one clean, distraction-free platform, significantly reducing friction so you can focus entirely on preparation.
        </p>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>Infosys Campus Recruitment Overview</h2>
        <p className={styles.paragraph}>
          Infosys conducts its campus recruitment primarily evaluating candidates on their technical and coding skills. HackWithInfy is a flagship coding competition that offers pre-placement interviews (PPIs) for niche technical roles.
        </p>

        <h3 className={styles.subHeading}>HackWithInfy Coding Round (3 hours)</h3>
        <p className={styles.paragraph}>Evaluates high-level programming and algorithm skills.</p>
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
                <td>Advanced Coding</td>
                <td>3</td>
                <td>3 hours</td>
              </tr>
            </tbody>
          </table>
        </div>

        <h3 className={styles.subHeading}>Exam Rules</h3>
        <ul className={styles.list}>
          <li><strong>Languages:</strong> C, C++, Java, Python, JavaScript.</li>
          <li><strong>Evaluation:</strong> Code must pass both public and private hidden test cases.</li>
          <li><strong>Roles:</strong> Top performers get interviews for Specialist Programmer and Digital Specialist Engineer roles.</li>
        </ul>

        <h3 className={styles.subHeading}>Compensation Categories</h3>
        <div className={styles.tableWrap}>
          <table className={styles.table}>
            <thead>
              <tr>
                <th>Offer Category</th>
                <th>Salary Package</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td><strong>Specialist Programmer (SP)</strong></td>
                <td>9.5 LPA</td>
              </tr>
              <tr>
                <td><strong>Digital Specialist Engineer (DSE)</strong></td>
                <td>6.25 LPA</td>
              </tr>
              <tr>
                <td><strong>Systems Engineer (SE)</strong></td>
                <td>3.6 LPA</td>
              </tr>
            </tbody>
          </table>
        </div>
      </section>

      <section className={styles.section}>
        <h2 className={styles.sectionTitle}>FAQ</h2>
        <div className={styles.faqList}>
          <div className={styles.faqItem}>
            <h4>Is this affiliated with TCS?</h4>
            <p>No. This is an independent preparation platform.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Is the platform free?</h4>
            <p>Yes.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Will more questions be added?</h4>
            <p>Yes. The platform will continue to receive regular updates.</p>
          </div>
          <div className={styles.faqItem}>
            <h4>Is the syllabus updated?</h4>
            <p>Yes, it follows the latest publicly available TCS NQT pattern.</p>
          </div>
        </div>
      </section>

      <section className={styles.creatorSection}>
        <h3 className={styles.creatorName}>Built by Akash Sundaramoorthi</h3>
        <p className={styles.creatorRole}>Full-Stack Developer and Cybersecurity Researcher.</p>
        <p className={styles.creatorBio}>
          NQT Prep Hub was built to provide students with a clean and centralized platform for TCS NQT preparation.
        </p>
        <div className={styles.creatorLinks}>
          <a href="https://akash-sundaramoorthi.vercel.app/" target="_blank" rel="noreferrer" className="btn btn-primary">Portfolio</a>
          <a href="https://www.linkedin.com/in/akash-sundaramoorthi-958279290/" target="_blank" rel="noreferrer" className="btn btn-ghost">LinkedIn</a>
        </div>
      </section>
    </div>
  );
}
