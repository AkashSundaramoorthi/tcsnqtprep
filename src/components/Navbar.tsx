"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";

const NAV_LINKS = [
  { href: "/coding", label: "Coding" },
  { href: "/aptitude", label: "Aptitude" },
  { href: "/exam", label: "Exam" },
  { href: "/pyq", label: "PYQ" },
  { href: "/about", label: "About" },
  { href: "/feedback", label: "Feedback" },
];

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <Link href="/" className={styles.logo}>
          <span className={styles.logoMark}>NQT</span>
          <span className={styles.logoDivider}>/</span>
          <span className={styles.logoSub}>Prep Hub</span>
        </Link>

        <button 
          className={styles.hamburger} 
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Toggle menu"
        >
          {menuOpen ? "✕" : "☰"}
        </button>

        <nav className={`${styles.nav} ${menuOpen ? styles.navOpen : ""}`}>
          {NAV_LINKS.map((link) => (
            <Link
              key={link.href}
              href={link.href}
              className={`${styles.navLink} ${pathname === link.href ? styles.active : ""}`}
              onClick={() => setMenuOpen(false)}
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
