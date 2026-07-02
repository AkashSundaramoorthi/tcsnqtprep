"use client";

import { useState, FormEvent } from "react";
import styles from "./feedback.module.css";
import Link from "next/link";

const CATEGORIES = [
  "General Feedback",
  "Bug Report",
  "Feature Request",
  "Content Issue (Wrong Answer / Typo)",
  "UI / UX Suggestion",
  "Other",
];

export default function FeedbackClient() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [category, setCategory] = useState(CATEGORIES[0]);
  const [rating, setRating] = useState(0);
  const [message, setMessage] = useState("");
  const [submitting, setSubmitting] = useState(false);
  const [submitted, setSubmitted] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    setError("");

    if (!message.trim()) {
      setError("Please write your feedback before submitting.");
      return;
    }

    setSubmitting(true);

    try {
      const res = await fetch("/api/feedback", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          subject: `[TCS NQT Prep] ${category}`,
          from_name: name || "Anonymous",
          email: email || "no-reply@tcsnqt.app",
          category,
          rating: rating > 0 ? `${rating}/5 stars` : "Not rated",
          message,
        }),
      });

      const data = await res.json();

      if (data.success) {
        setSubmitted(true);
      } else {
        setError(data.message || "Something went wrong. Please try again.");
      }
    } catch {
      setError("Network error. Please check your connection and try again.");
    } finally {
      setSubmitting(false);
    }
  };

  if (submitted) {
    return (
      <div className="container">
        <div className={styles.pageHeader}>
          <h1 className={styles.pageTitle}>Feedback</h1>
        </div>
        <div className={styles.successCard}>
          <span className={styles.successIcon}>✅</span>
          <h2 className={styles.successTitle}>Thank you!</h2>
          <p className={styles.successMsg}>
            Your feedback has been submitted successfully. It means a lot and
            helps make this platform better for everyone.
          </p>
          <div style={{ display: "flex", gap: "12px", justifyContent: "center" }}>
            <button className="btn btn-primary" onClick={() => { setSubmitted(false); setName(""); setEmail(""); setCategory(CATEGORIES[0]); setRating(0); setMessage(""); }}>
              Send Another
            </button>
            <Link href="/" className="btn btn-ghost">
              Back to Home
            </Link>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="container">
      <div className={styles.pageHeader}>
        <h1 className={styles.pageTitle}>Share Your Feedback</h1>
        <p className={styles.pageSub}>
          Found a bug? Have a suggestion? Want to say something nice? This form goes straight to the developer.
        </p>
      </div>

      <div className={styles.formCard}>
        <div className={styles.formHeader}>
          <div className={styles.formIcon}>💬</div>
          <div>
            <h2 className={styles.formTitle}>Feedback Form</h2>
            <p className={styles.formDesc}>All fields except message are optional</p>
          </div>
        </div>

        <div className={styles.formBody}>
          <form className={styles.form} onSubmit={handleSubmit}>
            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="fb-name">Name</label>
                <input
                  id="fb-name"
                  className={styles.input}
                  type="text"
                  placeholder="Your name (optional)"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  autoComplete="name"
                />
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="fb-email">Email</label>
                <input
                  id="fb-email"
                  className={styles.input}
                  type="email"
                  placeholder="you@example.com (optional)"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  autoComplete="email"
                />
              </div>
            </div>

            <div className={styles.fieldRow}>
              <div className={styles.fieldGroup}>
                <label className={styles.label} htmlFor="fb-category">Category</label>
                <select
                  id="fb-category"
                  className={styles.select}
                  value={category}
                  onChange={(e) => setCategory(e.target.value)}
                >
                  {CATEGORIES.map((c) => (
                    <option key={c} value={c}>{c}</option>
                  ))}
                </select>
              </div>
              <div className={styles.fieldGroup}>
                <label className={styles.label}>Rating</label>
                <div className={styles.ratingGroup}>
                  {[1, 2, 3, 4, 5].map((star) => (
                    <button
                      key={star}
                      type="button"
                      className={`${styles.ratingStar} ${rating >= star ? styles.ratingStarActive : ""}`}
                      onClick={() => setRating(star === rating ? 0 : star)}
                      aria-label={`Rate ${star} star${star > 1 ? "s" : ""}`}
                    >
                      ★
                    </button>
                  ))}
                </div>
              </div>
            </div>

            <div className={styles.fieldGroup}>
              <label className={styles.label} htmlFor="fb-message">
                Message<span className={styles.required}>*</span>
              </label>
              <textarea
                id="fb-message"
                className={styles.textarea}
                placeholder="Tell us what's on your mind — bug reports, feature ideas, exam content issues, or just a quick note..."
                value={message}
                onChange={(e) => setMessage(e.target.value)}
                required
              />
            </div>

            <div className={styles.submitRow}>
              <button
                type="submit"
                className={styles.submitBtn}
                disabled={submitting}
              >
                {submitting ? "Sending…" : "Submit Feedback"}
              </button>
              {error && <span className={styles.errorText}>{error}</span>}
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}
