import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Research & Publications",
  description:
    "Explore Prince Baah-Mensah's research in control systems, speech emotion recognition, and AI-powered adaptive learning for education.",
};

export default function ResearchPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        {/* Page Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Research &amp; Publications</h1>
          <p className={styles.subtitle}>
            My research spans control systems engineering, speech emotion recognition
            using deep learning, and AI-powered education. I&apos;m driven by the
            intersection of intelligent systems and real-world impact.
          </p>
        </header>

        {/* Publications Section */}
        <section className={styles.section} id="publications" aria-labelledby="publications-heading">
          <h2 className={styles.sectionTitle} id="publications-heading">Publications</h2>

          <div className={styles.publicationsGrid}>
            <article className={styles.publicationCard}>
              <div className={styles.pubAccent} aria-hidden="true" />
              <div className={styles.pubContent}>
                <div className={styles.pubHeader}>
                  <span className={styles.statusBadgeReview}>
                    <span className={styles.statusDotReview} aria-hidden="true" />
                    Under Review
                  </span>
                  <span className={styles.pubYear}>2026</span>
                </div>
                <h3 className={styles.pubTitle}>
                  Constraint-Aware Bayesian Optimization for PID Controller Tuning:
                  A Multi-Plant Comparative Study
                </h3>
                <p className={styles.pubAuthors}>
                  <strong>Baah-Mensah, P.</strong>
                </p>
                <p className={styles.pubVenue}>
                  52nd Annual Conference of the IEEE Industrial Electronics Society (IECON 2026) — October 18 – 21, 2026
                </p>
                <p className={styles.pubDescription}>
                  Formulates PID tuning as a constrained black-box optimization problem
                  with explicit engineering specifications (overshoot, steady-state error,
                  peak actuator force) and solves it using constraint-aware Bayesian
                  Optimization. A four-plant comparative study against MATLAB&apos;s{" "}
                  <em>pidtune</em> demonstrates that the constrained BO formulation
                  discovers qualitatively distinct control strategies per plant and
                  reduces settling time by up to 34× while satisfying all specifications.
                </p>
                <div className={styles.tags}>
                  {["PID Control", "Bayesian Optimization", "MATLAB", "Python", "Control Theory"].map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>

            <article className={styles.publicationCard}>
              <div className={styles.pubAccent} aria-hidden="true" />
              <div className={styles.pubContent}>
                <div className={styles.pubHeader}>
                  <span className={styles.statusBadge}>
                    <span className={styles.statusDot} aria-hidden="true" />
                    Accepted
                  </span>
                  <span className={styles.pubYear}>2026</span>
                </div>
                <h3 className={styles.pubTitle}>
                  Design of an AI-Powered Adaptive Learning System for Education
                  in the Metaverse Classroom
                </h3>
                <p className={styles.pubAuthors}>
                  <strong>Baah-Mensah, P.</strong>, Tawia, E., Ansah, J. O.
                </p>
                <p className={styles.pubVenue}>
                  IEEE International Conference on Smart Sustainable Systems for Computer and Engineering Applications (3SCEA) — April 19 – 21, 2026
                </p>
                <p className={styles.pubDescription}>
                  Designs and implements an AI-driven virtual learning environment in Unreal Engine 5,
                  integrating preloaded instructional media with GPT-backed conversational NPCs for
                  real-time academic support. Employs an adaptive assessment engine and gamification
                  framework to dynamically adjust question difficulty and recommend personalized learning
                  paths without a hard-coded curriculum.
                </p>
                <div className={styles.tags}>
                  {["Unreal Engine 5", "OpenAI GPT API", "Python", "Blueprints", "REST API", "AI", "Education", "Metaverse", "Adaptive Learning"].map((tag) => (
                    <span key={tag} className="tag">{tag}</span>
                  ))}
                </div>
              </div>
            </article>
          </div>
        </section>

        {/* Current Research Section */}
        <section className={styles.section} id="current-research" aria-labelledby="current-research-heading">
          <h2 className={styles.sectionTitle} id="current-research-heading">Current Research</h2>

          <div className={styles.researchSingle}>
            <article className={styles.researchCard}>
              <div className={styles.cardHeader}>
                <h3 className={styles.cardTitle}>
                  Speech Emotion Recognition Research
                </h3>
                <div className={styles.cardMeta}>
                  <span className={styles.metaItem}>Ashesi University</span>
                  <span className={styles.metaDot}>·</span>
                  <span className={styles.metaItem}>Aug 2025 – Present</span>
                </div>
              </div>
              <ul className={styles.workList}>
                <li>Doing research on the development of deep learning systems capable of classifying human emotion from speech, utilizing advanced signal processing and neural network architectures.</li>
                <li>Addressed the critical generalization gap where state-of-the-art models fail on unseen speakers; currently authoring a research paper for IEEE publication that conducts a rigorous Speaker-Strict comparative analysis of state-of-the-art Transformer, CNN, and RNN architectures.</li>
                <li>Engineering a robust, speaker-agnostic SER framework by benchmarking diverse methodologies including Self-Supervised Learning and Hybrid CNN-Transformers to establish a new baseline for real-world model deployment.</li>
              </ul>
              <div className={styles.tags}>
                {["Deep Learning", "Signal Processing", "PyTorch", "NLP"].map((tag) => (
                  <span key={tag} className="tag">{tag}</span>
                ))}
              </div>
            </article>
          </div>
        </section>
      </div>
    </div>
  );
}
