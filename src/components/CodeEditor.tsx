"use client";

import { useEffect, useRef } from "react";
import { EditorView, basicSetup } from "codemirror";
import { EditorState } from "@codemirror/state";
import { python } from "@codemirror/lang-python";
import { javascript } from "@codemirror/lang-javascript";
import { cpp } from "@codemirror/lang-cpp";
import { java } from "@codemirror/lang-java";
import { csharp } from "@replit/codemirror-lang-csharp";
import { oneDark } from "@codemirror/theme-one-dark";
import { keymap } from "@codemirror/view";
import { insertTab, indentLess } from "@codemirror/commands";

export type Lang = "javascript" | "python" | "c" | "cpp" | "java" | "csharp";

interface Props {
  value: string;
  onChange: (val: string) => void;
  lang: Lang;
  height?: string;
}

const customTheme = EditorView.theme({
  "&": {
    fontSize: "13.5px",
    fontFamily: "'JetBrains Mono', 'Fira Mono', monospace",
    backgroundColor: "transparent !important",
    color: "var(--text-2) !important",
    height: "100%",
    minHeight: "100%",
  },
  ".cm-content": { padding: "12px 0", caretColor: "var(--accent)" },
  ".cm-cursor, .cm-dropCursor": { borderLeftColor: "var(--accent)" },
  "&.cm-focused .cm-selectionBackground, .cm-selectionBackground, .cm-content ::selection": {
    backgroundColor: "rgba(79,142,255,0.25) !important",
  },
  ".cm-gutters": {
    backgroundColor: "transparent !important",
    borderRight: "1px solid var(--border)",
    color: "var(--text-3)",
  },
  ".cm-lineNumbers .cm-gutterElement": { paddingLeft: "16px", paddingRight: "10px", minWidth: "42px" },
  ".cm-activeLine": { backgroundColor: "rgba(255,255,255,0.02)" },
  ".cm-activeLineGutter": { backgroundColor: "rgba(255,255,255,0.02)" },
  ".cm-foldPlaceholder": { backgroundColor: "var(--bg-2)", border: "none", color: "var(--text-3)" },
  ".cm-tooltip": {
    backgroundColor: "var(--surface) !important",
    border: "1px solid rgba(255, 255, 255, 0.12) !important",
    borderRadius: "8px !important",
    boxShadow: "0 12px 32px rgba(0, 0, 0, 0.6) !important",
    overflow: "hidden !important",
  },
  ".cm-tooltip-autocomplete > ul": {
    fontFamily: "'JetBrains Mono', monospace",
    fontSize: "13px",
    maxHeight: "220px",
  },
  ".cm-tooltip-autocomplete > ul > li": {
    padding: "6px 12px",
    color: "var(--text-2)",
    display: "flex",
    alignItems: "center",
    cursor: "pointer",
  },
  ".cm-tooltip-autocomplete > ul > li[aria-selected]": {
    backgroundColor: "var(--accent) !important",
    color: "#fff !important",
  },
  ".cm-tooltip-autocomplete > ul > li:hover:not([aria-selected])": {
    backgroundColor: "rgba(255, 255, 255, 0.05) !important",
  },
  ".cm-completionIcon": {
    display: "inline-flex !important",
    alignItems: "center",
    justifyContent: "center",
    width: "16px !important",
    height: "16px !important",
    borderRadius: "4px !important",
    fontSize: "11px !important",
    fontWeight: "800 !important",
    textTransform: "uppercase",
    marginRight: "10px !important",
    fontFamily: "system-ui, sans-serif",
  },
  ".cm-completionIcon-function, .cm-completionIcon-method": {
    backgroundColor: "rgba(197, 134, 192, 0.2) !important",
    color: "#c586c0 !important",
  },
  ".cm-completionIcon-class, .cm-completionIcon-interface, .cm-completionIcon-type": {
    backgroundColor: "rgba(78, 201, 176, 0.2) !important",
    color: "#4ec9b0 !important",
  },
  ".cm-completionIcon-variable, .cm-completionIcon-property": {
    backgroundColor: "rgba(156, 220, 254, 0.2) !important",
    color: "#9cdcfe !important",
  },
  ".cm-completionIcon-keyword": {
    backgroundColor: "rgba(212, 212, 212, 0.2) !important",
    color: "#d4d4d4 !important",
  },
  ".cm-completionIcon-constant, .cm-completionIcon-enum": {
    backgroundColor: "rgba(79, 193, 255, 0.2) !important",
    color: "#4fc1ff !important",
  },
  ".cm-tooltip-autocomplete > ul > li[aria-selected] .cm-completionIcon": {
    
    opacity: "1 !important",
  },
  ".cm-completionDetail": {
    marginLeft: "auto",
    paddingLeft: "16px",
    color: "var(--text-3) !important",
    fontSize: "11px !important",
    fontStyle: "italic",
    fontFamily: "'Inter', sans-serif",
  },
  ".cm-tooltip-autocomplete > ul > li[aria-selected] .cm-completionDetail": {
    color: "rgba(255, 255, 255, 0.8) !important",
  },
  ".cm-completionMatchedText": {
    color: "var(--accent) !important",
    fontWeight: "bold !important",
    textDecoration: "none",
  },
  ".cm-tooltip-autocomplete > ul > li[aria-selected] .cm-completionMatchedText": {
    color: "#fff !important",
  },
  ".cm-scroller": { overflowX: "auto" },
});

export default function CodeEditor({ value, onChange, lang, height = "220px" }: Props) {
  const containerRef = useRef<HTMLDivElement>(null);
  const viewRef = useRef<EditorView | null>(null);

  // Create / recreate the editor whenever the language changes
  useEffect(() => {
    if (!containerRef.current) return;

    // Destroy previous instance
    if (viewRef.current) {
      viewRef.current.destroy();
      viewRef.current = null;
    }

    let langExtension;
    switch (lang) {
      case "javascript": langExtension = javascript(); break;
      case "c":
      case "cpp": langExtension = cpp(); break;
      case "java": langExtension = java(); break;
      case "csharp": langExtension = csharp(); break;
      case "python":
      default: langExtension = python(); break;
    }

    const state = EditorState.create({
      doc: value,
      extensions: [
        basicSetup,
        langExtension,
        oneDark,
        customTheme,
        keymap.of([
          { key: "Tab", preventDefault: true, run: insertTab },
          { key: "Shift-Tab", preventDefault: true, run: indentLess }
        ]),
        EditorView.updateListener.of((update) => {
          if (update.docChanged) {
            onChange(update.state.doc.toString());
          }
        }),
        EditorView.lineWrapping,
      ],
    });

    const view = new EditorView({ state, parent: containerRef.current });
    viewRef.current = view;

    return () => {
      view.destroy();
      viewRef.current = null;
    };
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [lang]);

  // Sync external value changes into the editor (when question changes)
  useEffect(() => {
    const view = viewRef.current;
    if (!view) return;
    const current = view.state.doc.toString();
    if (current !== value) {
      view.dispatch({
        changes: { from: 0, to: current.length, insert: value },
      });
    }
  }, [value]);

  return (
    <div
      ref={containerRef}
      style={{
        height,
        width: "100%",
        background: "var(--bg)",
        overflow: "hidden",
      }}
    />
  );
}
