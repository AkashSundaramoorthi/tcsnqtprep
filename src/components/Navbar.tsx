"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/coding", label: "Coding" },
  { href: "/aptitude", label: "Aptitude" },
  { href: "/exam", label: "Exam" },
  { href: "/pyq", label: "PYQ" },
  { href: "/about", label: "About" },
  { href: "https://github.com/AkashSundaramoorthi/tcs-nqt", label: "GitHub" },
];

export default function Navbar() {
  const pathname = usePathname();

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>NQT</span>
          <span className={styles.logoDivider}>/</span>
          <span className={styles.logoSub}>Prep Hub</span>
        </Link>

        <nav className={styles.nav}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
            >
              {link.label}
            </Link>
          ))}
        </nav>

        <Link href="/exam" className={`btn btn-primary ${styles.ctaBtn}`}>
          Take Exam
        </Link>
      </div>
    </header>
  );
}
