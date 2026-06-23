import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Blog & Notes",
  description:
    "Technical write-ups and notes by Prince Baah-Mensah on embedded systems, AI/ML, and engineering.",
};

const upcomingTopics = [
  "EfficientML: Quantization and Pruning for Edge AI",
  "Real-time ML Inference on Embedded Microcontrollers",
  "Hardware Acceleration: Deploying Neural Networks on FPGAs",
  "Co-designing Hardware and Software for Intelligent Systems",
];

export default function BlogPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Blog &amp; Notes</h1>
          <p className={styles.subtitle}>
            Technical write-ups, project retrospectives, and learning notes.
          </p>
        </header>

        <div className={styles.comingSoon}>
          <div className={styles.comingSoonContent}>
            <div className={styles.comingSoonIcon}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M17 3a2.85 2.83 0 1 1 4 4L7.5 20.5 2 22l1.5-5.5Z" />
                <path d="m15 5 4 4" />
              </svg>
            </div>
            <h2 className={styles.comingSoonTitle}>Coming Soon</h2>
            <p className={styles.comingSoonDesc}>
              I&apos;m currently working on some technical write-ups. Check back soon for
              in-depth articles on embedded systems, AI research, and engineering lessons learned.
            </p>
          </div>

          <div className={styles.topics}>
            <h3 className={styles.topicsTitle}>Upcoming Topics</h3>
            <ul className={styles.topicsList}>
              {upcomingTopics.map((topic) => (
                <li key={topic} className={styles.topicItem}>
                  <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.topicIcon}>
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                  {topic}
                </li>
              ))}
            </ul>
          </div>

          <div className={styles.notify}>
            <p className={styles.notifyText}>
              Want to know when new posts drop? Reach out via the{" "}
              <a href="/contact" className={styles.notifyLink}>contact page</a>.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
}
