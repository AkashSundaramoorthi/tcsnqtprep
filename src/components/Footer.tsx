import Link from "next/link";
import styles from "./Footer.module.css";

export default function Footer() {
  return (
    <footer className={styles.footer}>
      <div className={styles.inner}>
        <div className={styles.brand}>
          <div className={styles.logo}>
            <span className={styles.logoMark}>NQT</span>
            <span className={styles.logoSlash}>/</span>
            <span className={styles.logoWord}>Prep Hub</span>
          </div>
          <p className={styles.tagline}>
            Free TCS NQT preparation platform — coding IDE, aptitude guides, mock exam, and PYQs.
            Not affiliated with TCS.
          </p>
        </div>

        <div className={styles.links}>
          <div className={styles.col}>
            <h4>Practice</h4>
            <Link href="/coding">Coding IDE</Link>
            <Link href="/aptitude">Aptitude Guide</Link>
            <Link href="/exam">Mock Exam</Link>
            <Link href="/pyq">PYQ Bank</Link>
          </div>
          <div className={styles.col}>
            <h4>Info</h4>
            <Link href="/about">About</Link>
            <a href="https://www.tcs.com/tcs-ion/tcs-ion-career-agility" target="_blank" rel="noopener noreferrer">
              TCS iON Portal
            </a>
            <a href="https://github.com/AkashSundaramoorthi" target="_blank" rel="noopener noreferrer">
              GitHub
            </a>
          </div>
        </div>
      </div>

      <div className={styles.bottom}>
        <p>© {new Date().getFullYear()} NQT Prep Hub · Built by Akash Sundaramoorthi · This is an independent platform, not affiliated with TCS.</p>
      </div>
    </footer>
  );
}
