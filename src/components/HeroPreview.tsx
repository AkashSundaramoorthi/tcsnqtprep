"use client";

import { useState } from "react";
import styles from "@/app/page.module.css";
import { Play, Calculator, FileText, CheckCircle2 } from "lucide-react";

export default function HeroPreview() {
  const [activeTab, setActiveTab] = useState("ide");

  return (
    <div className={styles.browserWindow}>
      <div className={styles.browserHeader}>
        <div className={styles.windowControls}>
          <span /><span /><span />
        </div>
        <div className={styles.browserTabs}>
          <button 
            className={`${styles.browserTab} ${activeTab === "ide" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("ide")}
          >
            Code IDE
          </button>
          <button 
            className={`${styles.browserTab} ${activeTab === "mock" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("mock")}
          >
            Mock Test
          </button>
          <button 
            className={`${styles.browserTab} ${activeTab === "pdf" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("pdf")}
          >
            Formula Sheet
          </button>
          <button 
            className={`${styles.browserTab} ${activeTab === "calc" ? styles.activeTab : ""}`}
            onClick={() => setActiveTab("calc")}
          >
            Calculator
          </button>
        </div>
      </div>

      <div className={styles.browserBody}>
        {activeTab === "ide" && (
          <div className={styles.ideMockup}>
            <div className={styles.ideSidebar}>
              <div className={`${styles.ideFile} ${styles.ideFileActive}`}>main.py</div>
              <div className={styles.ideFile}>solution.js</div>
            </div>
            <div className={styles.ideEditor}>
              <pre><code>
<span className={styles.keyword}>def</span> <span className={styles.function}>solve_nqt</span>(arr):
    <span className={styles.comment}># Find the maximum element</span>
    <span className={styles.keyword}>return</span> <span className={styles.builtin}>max</span>(arr)

<span className={styles.builtin}>print</span>(solve_nqt([<span className={styles.number}>10</span>, <span className={styles.number}>24</span>, <span className={styles.number}>8</span>]))
              </code></pre>
              <div className={styles.ideOutput}>
                <div className={styles.ideOutputHeader}><Play size={12} className={styles.outputIcon} /> Output</div>
                <div className={styles.ideOutputBody}>24</div>
              </div>
            </div>
          </div>
        )}

        {activeTab === "mock" && (
          <div className={styles.mockMockup}>
            <div className={styles.mockHeader}>
              <div className={styles.mockTimer}>12:45 remaining</div>
              <div className={styles.mockSection}>Numerical Ability</div>
            </div>
            <div className={styles.mockQuestion}>
              <strong>Q14.</strong> If the speed of a boat in still water is 15 km/hr and the rate of current is 3 km/hr, find the distance travelled downstream in 12 minutes.
            </div>
            <div className={styles.mockOptions}>
              <div className={styles.mockOption}><div className={styles.radio}></div> 1.8 km</div>
              <div className={styles.mockOption}><div className={styles.radio}></div> 2.4 km</div>
              <div className={`${styles.mockOption} ${styles.mockOptionSelected}`}><div className={`${styles.radio} ${styles.radioSelected}`}></div> 3.6 km</div>
              <div className={styles.mockOption}><div className={styles.radio}></div> 4.2 km</div>
            </div>
          </div>
        )}

        {activeTab === "pdf" && (
          <div className={styles.pdfMockup}>
             <div className={styles.pdfToolbar}>
                <FileText size={14} /> TCS-NQT-Formula-Cheat-Sheet.pdf
             </div>
             <div className={styles.pdfPage}>
                <h2>Numerical Formulas</h2>
                <div className={styles.pdfContent}>
                   <p><strong>Speed, Distance, Time:</strong></p>
                   <code>D = S × T</code>
                   <p><strong>Downstream Speed:</strong></p>
                   <code>u + v</code>
                   <p><strong>Upstream Speed:</strong></p>
                   <code>u - v</code>
                </div>
             </div>
          </div>
        )}

        {activeTab === "calc" && (
          <div className={styles.calcMockup}>
            <div className={styles.calcInner}>
              <div className={styles.calcDisplay}>1024</div>
              <div className={styles.calcGrid}>
                {["7","8","9","/","4","5","6","*","1","2","3","-","0",".","=","+"].map(btn => (
                  <div key={btn} className={`${styles.calcBtn} ${["/","*","-","+","="].includes(btn) ? styles.calcBtnOp : ""}`}>{btn}</div>
                ))}
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
