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

        </div>
      </div>

      <div className={styles.browserBody}>
        {activeTab === "ide" && (
          <div className={styles.ideMockup}>
            <div className={styles.ideEditor}>
              <pre><code>
                <span className={styles.keyword}>def</span> <span className={styles.function}>check_odd_even</span>(n):{"\n"}
                {"    "}<span className={styles.keyword}>if</span> n % <span className={styles.number}>2</span> == <span className={styles.number}>0</span>:{"\n"}
                {"        "}<span className={styles.keyword}>return</span> <span className={styles.string}>"Even"</span>{"\n"}
                {"    "}<span className={styles.keyword}>return</span> <span className={styles.string}>"Odd"</span>{"\n\n"}
                <span className={styles.builtin}>print</span>(check_odd_even(<span className={styles.number}>10</span>))
              </code></pre>
              <div className={styles.ideOutput}>
                <div className={styles.ideOutputHeader}><Play size={12} className={styles.outputIcon} /> Output</div>
                <div className={styles.ideOutputBody}>Even</div>
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


      </div>
    </div>
  );
}
