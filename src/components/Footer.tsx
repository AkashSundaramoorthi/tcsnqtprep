import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>Prep</span>
            <span className={styles.logoSlash}>/</span>
            <span className={styles.logoWord}>Hub</span>
          </div>
          <p className={styles.tagline}>
            Independent TCS Prep preparation platform with practice questions, coding IDE, mock tests and formula sheets.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h4>Practice</h4>
            <Link href="/tcs/coding">Coding IDE</Link>
            <Link href="/tcs/aptitude">Aptitude Guide</Link>
            <Link href="/tcs/exam">Mock Exam</Link>
            <Link href="/tcs/pyq">PYQ Bank</Link>
          </div>
          <div className={styles.col}>
            <h4>Info</h4>
            <Link href="/about">About</Link>
            <Link href="/feedback">Feedback</Link>
            <a href="https://www.tcs.com/tcs-ion/tcs-ion-career-agility" target="_blank" rel="noopener noreferrer">
              TCS iON Portal
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} Akash Sundaramoorthi · Not affiliated with TCS.</p>
      </div>
    </footer>
  );
}
