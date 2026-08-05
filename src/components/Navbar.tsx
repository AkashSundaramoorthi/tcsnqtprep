"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { useState } from "react";
import styles from "./Navbar.module.css";
import ThemeToggle from "./ThemeToggle";

const getNavLinks = (track: string) => {
  const links = [
    { href: `/${track}/coding`, label: "Coding" },
  ];
  if (track !== "infosys") {
    links.push({ href: `/${track}/aptitude`, label: "Aptitude" });
  }
  links.push(
    { href: `/${track}/exam`, label: "Exam" },
    { href: `/${track}/pyq`, label: "PYQ" },
    { href: `/${track}/about`, label: "About" },
    { href: "/feedback", label: "Feedback" }
  );
  return links;
};

export default function Navbar() {
  const pathname = usePathname();
  const [menuOpen, setMenuOpen] = useState(false);

  const track = pathname.startsWith("/infosys") ? "infosys" : "tcs";
  const NAV_LINKS = getNavLinks(track);
  
  return (
    <header className={styles.header}>
      <div className={styles.inner}>
        <div style={{ display: "flex", alignItems: "center", gap: "24px" }}>
          <Link href="/" className={styles.logo}>
            <span className={styles.logoMark}>Prep</span>
            <span className={styles.logoDivider}>/</span>
            <span className={styles.logoSub}>Hub</span>
          </Link>
          
          <div className={styles.trackSwitch} style={{ display: "flex", background: "var(--surface-2)", borderRadius: "20px", padding: "2px" }}>
            <Link 
              href={pathname.startsWith("/tcs/") || pathname.startsWith("/infosys/") ? pathname.replace(/^\/(tcs|infosys)\//, "/tcs/") : "/tcs/coding"}
              className={track === "tcs" ? styles.trackBtnActive : styles.trackBtn}
              style={{ padding: "4px 12px", borderRadius: "18px", fontSize: "0.85rem", fontWeight: track === "tcs" ? 600 : 400, background: track === "tcs" ? "var(--surface)" : "transparent", color: track === "tcs" ? "var(--text)" : "var(--text-3)" }}
            >
              TCS
            </Link>
            <Link 
              href={pathname.includes("/aptitude") ? "/infosys/coding" : (pathname.startsWith("/tcs/") || pathname.startsWith("/infosys/") ? pathname.replace(/^\/(tcs|infosys)\//, "/infosys/") : "/infosys/coding")}
              className={track === "infosys" ? styles.trackBtnActive : styles.trackBtn}
              style={{ padding: "4px 12px", borderRadius: "18px", fontSize: "0.85rem", fontWeight: track === "infosys" ? 600 : 400, background: track === "infosys" ? "var(--surface)" : "transparent", color: track === "infosys" ? "var(--text)" : "var(--text-3)" }}
            >
              Infosys
            </Link>
          </div>
        </div>

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

        <ThemeToggle />

        <Link href={`/${track}/exam`} className={`btn btn-primary ${styles.ctaBtn}`}>
          Take Exam
        </Link>
      </div>
    </header>
  );
}
