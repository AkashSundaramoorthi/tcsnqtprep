const fs = require('fs');
const file = fs.readFileSync('src/app/page.tsx', 'utf8');

const newStats = `const STATS = [
  { value: "50", label: "Coding Problems" },
  { value: "6", label: "Languages" },
  { value: "30", label: "Aptitude Topics" },
  { value: "120+", label: "Previous Year Qs" },
];`;

const featuresAndSteps = `
const FEATURES = [
  {
    title: "Coding Practice",
    desc: "48 problems from Easy to Hard. Write code in Python, JavaScript, C, C++, Java, or C# and run against real test cases right in your browser — no setup needed.",
    href: "/coding",
    badge: "50 Problems · 6 Languages",
    badgeClass: "badge-easy",
    num: "01",
  },
  {
    title: "Aptitude Guide",
    desc: "30 topics covering Numerical, Verbal, Reasoning, and Advanced sections. Step-by-step method guides with solved practice problems for each topic.",
    href: "/aptitude",
    badge: "30 Topics",
    badgeClass: "badge-numerical",
    num: "02",
  },
  {
    title: "Mock Exam",
    desc: "80 questions across Numerical, Reasoning, Verbal, and Advanced — plus 2 live coding problems. Full NQT simulation with timed, sequentially-locked sections and a detailed results screen.",
    href: "/exam",
    badge: "80 Qs + Coding · 190 min",
    badgeClass: "badge-hard",
    num: "03",
  },
  {
    title: "Previous Year Questions",
    desc: "Curated PYQs from past TCS NQT exams across all sections — Numerical, Verbal, Reasoning, Coding, and Advanced — with worked solutions.",
    href: "/pyq",
    badge: "120+ PYQs",
    badgeClass: "badge-reasoning",
    num: "04",
  },
];

const STEPS = [
  {
    step: "01",
    title: "Study the aptitude methods",
    body: "Don't just memorise formulas. Each topic has a method guide that shows you how to think through the problem type.",
  },
  {
    step: "02",
    title: "Practice coding daily",
    body: "Pick a few problems each day. Run them against test cases. The in-browser IDE supports all NQT-allowed languages.",
  },
  {
    step: "03",
    title: "Go through PYQs",
    body: "Past questions repeat patterns. Study them with solutions — understanding the reasoning matters more than the answer.",
  },
  {
    step: "04",
    title: "Simulate with the mock exam",
    body: "Take the 20-minute mock under real conditions. Review every wrong answer. Repeat until you're consistently above 60%.",
  },
];
`;

let newContent = file.replace(/const STATS = \[[^\]]+\];/, newStats + featuresAndSteps);

// Update Hero text
newContent = newContent.replace(
  /<h1 className=\{styles.heroTitle\}>Everything You Need to Crack TCS NQT<\/h1>/,
  '<h1 className={styles.heroTitle}>Crack TCS NQT.<br />\\n            <span className="gradient-text">Prepare smart. Score high.</span></h1>'
);

newContent = newContent.replace(
  /<p className=\{styles.heroSub\}>[\s\S]*?<\/p>/,
  '<p className={`${styles.heroSub} fade-up fade-up-2`}>\\n            Coding problems with a real in-browser IDE, aptitude method guides, previous year questions with solutions, and a timed mock exam. Everything you need, nothing you don\\'t.\\n          </p>'
);

// Update stats mapping
newContent = newContent.replace(
  /<div className=\{styles.statSub\}>\{s.sub\}<\/div>/g,
  ''
);

// Update bento grid to Features & Steps
const featuresSection = `
      <section className={styles.features}>
        <div className="container">
          <div className={styles.sectionHead}>
            <h2 className={styles.sectionTitle}>What's inside</h2>
            <p className={styles.sectionSub}>Four focused tools, one goal: get you through the NQT.</p>
          </div>

          <div className={styles.featuresGrid}>
            {FEATURES.map((f, i) => (
              <Link key={i} href={f.href} className={styles.featureCard}>
                <div className={styles.featureNum}>{f.num}</div>
                <div className={styles.featureBody}>
                  <div className={styles.featureTop}>
                    <h3 className={styles.featureTitle}>{f.title}</h3>
                    <span className={\`badge \${f.badgeClass}\`}>{f.badge}</span>
                  </div>
                  <p className={styles.featureDesc}>{f.desc}</p>
                </div>
                <span className={styles.featureArrow}>→</span>
              </Link>
            ))}
          </div>
        </div>
      </section>

      <section className={styles.plan}>
        <div className="container">
          <div className={styles.planGrid}>
            <div className={styles.planText}>
              <h2 className={styles.planTitle}>Suggested study plan</h2>
              <p className={styles.planSub}>
                Most students have 2–4 weeks before the NQT. Here's a structure that actually works.
              </p>
              <Link href="/about" className={styles.planLink}>
                Read about the exam structure →
              </Link>
            </div>

            <div className={styles.planSteps}>
              {STEPS.map((s) => (
                <div key={s.step} className={styles.step}>
                  <span className={styles.stepNum}>{s.step}</span>
                  <div className={styles.stepContent}>
                    <h4 className={styles.stepTitle}>{s.title}</h4>
                    <p className={styles.stepBody}>{s.body}</p>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>
`;

newContent = newContent.replace(
  /<section className=\{styles.bento\}>[\s\S]*?<\/section>/,
  featuresSection
);

fs.writeFileSync('src/app/page.tsx', newContent);
