import { TrackId } from "./tracks";

export interface Phase {
  id: string;
  duration: number;
  title: string;
  calc?: boolean;
  section?: string;
  vType?: string;
  perQuestion?: boolean;
}

export const EXAM_PHASES: Record<TrackId, Phase[]> = {
  "tcs-nqt": [
    { id: "start", duration: 0, title: "TCS NQT Mock Exam" },
    { id: "mcq-numerical", duration: 25 * 60, title: "Numerical Ability", calc: true, section: "Numerical" },
    { id: "mcq-reasoning", duration: 25 * 60, title: "Reasoning Ability", calc: true, section: "Reasoning" },
    { id: "mcq-advquant", duration: 25 * 60, title: "Advanced Quant & Reasoning", calc: true, section: "AdvQuant" },
    { id: "verbal-instruct-sentence", duration: 25, title: "Instructions: Sentence Completion", calc: false },
    { id: "verbal-sentence", duration: 25, title: "Sentence Completion", calc: false, section: "Verbal", vType: "sentence", perQuestion: true },
    { id: "verbal-instruct-passage", duration: 15, title: "Instructions: Passage Recall", calc: false },
    { id: "verbal-passage", duration: 30, title: "Passage Recall", calc: false, section: "Verbal", vType: "passage", perQuestion: true },
    { id: "verbal-email", duration: 540, title: "Email Writing", calc: false, section: "Verbal", vType: "email" },
    { id: "coding-easy", duration: 20 * 60, title: "Advanced Coding (Easy)", calc: false },
    { id: "break", duration: 60, title: "1-Minute Break", calc: false },
    { id: "coding-medium", duration: 25 * 60, title: "Advanced Coding (Medium)", calc: false },
    { id: "results", duration: 0, title: "Exam Results" }
  ],
  "hackwithinfy": [
    { id: "start", duration: 0, title: "HackWithInfy Mock Round" },
    { id: "coding-1", duration: 60 * 60, title: "DSA Problem 1 (Easy)", calc: false },
    { id: "coding-2", duration: 60 * 60, title: "DSA Problem 2 (Medium)", calc: false },
    { id: "coding-3", duration: 60 * 60, title: "DSA Problem 3 (Hard/Complex)", calc: false },
    { id: "results", duration: 0, title: "Round Results" },
  ],
};
