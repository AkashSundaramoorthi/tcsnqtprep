# TCS NQT App - Project Context & Memory

This file serves as the automatic context for Antigravity (agy). Whenever you start a new session in this folder, you will be aware of the following architecture and history:

## 1. Aptitude Guide Architecture & UI
- **Two-Panel Layout:** Built a professional layout with a persistent sidebar for topic navigation and a main content area.
- **Interactive Learning Flow:** Features a Formula Strip at the top, Step-by-Step Methods & Examples, and Interactive Practice Problems where answers are revealed step-by-step.
- **Data Model:** Comprehensive data for 30 topics (covering Numerical, Reasoning, Verbal, and Advanced sections) stored in `src/lib/aptitude.ts`, each enhanced with highly detailed, plain-English conceptual introductions.
- **Stable Persistence:** Uses a `slugify` helper in `AptitudeClient.tsx` to generate safe keys for `localStorage`, preventing progress loss if a topic's title changes.

## 2. Coding Practice
- **Data:** 50 coding problems stored in `src/lib/questions.ts`. IDs are strictly ordered 1 to 50, sorted logically by difficulty (14 Easy, 21 Medium, 15 Hard).
- **UI Enhancements:** Problem descriptions and hints utilize `pre-line` formatting to preserve readability. Concrete 3-step hints (Approach, Pseudocode, Key Line) guide users, with the final line rendering as monospace code.
- **Sorting Logic:** In `CodingClient.tsx`, when a difficulty filter is clicked, problems sort sequentially by `Easy -> Medium -> Hard` rather than insertion order.

## 3. Exam System
- **Balanced Mock Exam:** `src/lib/exam.ts` contains exactly 45 questions (20 Numerical, 10 Reasoning, 10 Verbal, 5 Advanced).
- **Dynamic Randomization:** Uses Fisher-Yates to completely shuffle both the 45 questions AND their individual multiple-choice options (`opts`) the moment an attempt starts.
- **Two-Phase Exam Flow:** A 20-minute MCQ section automatically transitions into a 30-minute Coding Round. The coding round randomly selects an Easy/Medium problem and uses a fully embedded CodeMirror editor.
- **State & History Persistence:** Exam timers and states (`tcs-nqt-exam-start`, `tcs-nqt-exam-coding-start`, `tcs-nqt-exam-history`) reliably handle page refreshes. The history array tracks MCQ section breakdowns alongside Coding pass/fail status.

## 4. PDF Generation (Cheat Sheet)
- **Client-Side PDF:** Uses `html2pdf.js` with a strictly typed `Html2PdfOptions` interface to generate a neatly styled A4-optimized 2-column layout PDF of all formulas, grouped by category.

## Tech Stack Quick Reference
- **Framework:** Next.js (App Router), React (`use client` heavy)
- **State:** React `useState`/`useEffect`, synced to browser `localStorage`.
- **Styling:** Modular CSS (`.module.css`), plain CSS variables, no external UI libraries.
- **Code Execution:** Python (Pyodide), JS (`new Function`), C/C++/Java/C# (Piston API). The core execution logic has been extracted to `src/lib/runner.ts` for clean reuse across `CodingClient.tsx` and `ExamClient.tsx`.


## 5. Recent Refinements & Features
- **Exam System:** Tuned the Numerical section to exactly 20 questions. Added a weak-area callout on the results screen that calculates sections scoring under 50% and links users directly to the Aptitude Guide for review.
- **Homepage & UI:** Updated homepage stats to reflect the exact exam configuration (45 MCQ + Coding Round).
- **PYQ Filtering:** Added a stateful difficulty filter (Easy, Medium, Hard) to the PYQ section that automatically resets when changing tabs.
- **Coding Practice:** Completed a comprehensive rewrite of all 50 coding hints in `src/lib/questions.ts`, strictly adhering to the [Concept, Algorithm, Code] 3-step hint format.
- **TypeScript:** Typed the `html2pdf.js` integration by fully defining the `Html2PdfOptions` interface and fixing implicit `any` errors in the Aptitude client.
- **Analytics IP Filtering:** Implemented an `IGNORED_IP` environment variable check in `src/app/api/analytics/track/route.ts` to silently drop internal traffic, and added a `clean_my_ip.mjs` script to purge existing IP-associated events from the Postgres database.
