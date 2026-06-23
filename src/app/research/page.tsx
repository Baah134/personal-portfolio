import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TransitionLink from "@/components/ui/TransitionLink";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Research & Publications",
  description:
    "Explore Prince Baah-Mensah's research in control systems, speech emotion recognition, and adaptive learning systems.",
};

const publications = [
  {
    slug: "bayesian-pid",
    title: "Constraint-Aware Bayesian Optimization for PID Tuning",
    date: "Dec 2025",
    venue: "52nd Annual Conference of the IEEE Industrial Electronics Society (IECON 2026)",
    image: "/images/pid.png",
    status: "Under Review",
    statusType: "review",
    desc: "Formulates PID tuning as a constrained black-box optimization problem with explicit engineering specifications and solves it using constraint-aware Bayesian Optimization, demonstrating up to 34× reduction in settling time.",
    tags: ["PID Control", "Bayesian Optimization", "Optuna", "MATLAB", "Python"],
  },
  {
    slug: "metaverse-education",
    title: "AI-Powered Adaptive Learning System for Education in the Metaverse Classroom",
    date: "2026",
    venue: "IEEE International Conference on Smart Sustainable Systems for Computer and Engineering Applications (3SCEA)",
    image: "/images/metaverse.png",
    status: "Accepted",
    statusType: "accepted",
    desc: "Designs and implements an AI-driven virtual learning environment in Unreal Engine 5, integrating preloaded instructional media with GPT-backed conversational NPCs for real-time academic support.",
    tags: ["Unreal Engine 5", "OpenAI GPT API", "REST API", "Metaverse"],
  },
];

const currentResearch = [
  {
    slug: "speech-emotion",
    title: "Speech Emotion Recognition Research",
    date: "Aug 2025 – Present",
    meta: "Ashesi University",
    image: "/images/ser.png",
    desc: "Development of deep learning systems capable of classifying human emotion from speech, utilizing advanced signal processing and neural network architectures, benchmarking RNN, CNN, and Transformer models.",
    tags: ["Deep Learning", "Signal Processing", "PyTorch", "NLP"],
  },
];

export default function ResearchPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        {/* Page Header */}
        <header className={styles.header}>
          <h1 className={styles.title}>Research &amp; Publications</h1>
          <p className={styles.subtitle}>
            My research spans control systems engineering, embedded hardware acceleration (FPGAs), 
            speech emotion recognition using deep learning, and AI-powered educational metaverse design.
          </p>
        </header>

        {/* Publications Section */}
        <section className={styles.section} id="publications">
          <h2 className={styles.sectionTitle}>Publications</h2>
          <div className={styles.grid}>
            {publications.map((pub) => (
              <TransitionLink key={pub.slug} href={`/research/${pub.slug}`} className={`${styles.pubCard} scroll-reveal`}>
                <div className={styles.cardImageWrap}>
                  {pub.image ? (
                    <Image
                      src={pub.image}
                      alt={pub.title}
                      width={600}
                      height={400}
                      className={styles.cardImage}
                      style={{ viewTransitionName: `research-image-${pub.slug}` }}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <span>Photo coming soon</span>
                    </div>
                  )}
                  {pub.statusType === 'review' ? (
                    <span className={styles.statusBadgeReview}>
                      <span className={styles.statusDotReview} aria-hidden="true" />
                      {pub.status}
                    </span>
                  ) : (
                    <span className={styles.statusBadge}>
                      <span className={styles.statusDot} aria-hidden="true" />
                      {pub.status}
                    </span>
                  )}
                </div>
                <div className={styles.pubContent}>
                  <h3 className={styles.pubTitle}>{pub.title}</h3>
                  <p className={styles.pubVenue}>{pub.venue}</p>
                  <p className={styles.pubDescription}>{pub.desc}</p>
                  <div className={styles.tags}>
                    {pub.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <span className={styles.readMore}>
                    Click to read more
                  </span>
                </div>
              </TransitionLink>
            ))}
          </div>
        </section>

        {/* Current Research Section */}
        <section className={styles.section} id="current-research">
          <h2 className={styles.sectionTitle}>Current Research</h2>
          <div className={styles.grid}>
            {currentResearch.map((res) => (
              <TransitionLink key={res.slug} href={`/research/${res.slug}`} className={`${styles.pubCard} scroll-reveal`}>
                <div className={styles.cardImageWrap}>
                  {res.image ? (
                    <Image
                      src={res.image}
                      alt={res.title}
                      width={600}
                      height={400}
                      className={styles.cardImage}
                      style={{ viewTransitionName: `research-image-${res.slug}` }}
                    />
                  ) : (
                    <div className={styles.imagePlaceholder}>
                      <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                        <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
                      </svg>
                      <span>Research Image Placeholder</span>
                    </div>
                  )}
                  <span className={styles.statusBadgeGeneric}>
                    {res.date}
                  </span>
                </div>
                <div className={styles.pubContent}>
                  <div className={styles.pubTop}>
                    <span className={styles.pubMeta}>{res.meta}</span>
                  </div>
                  <h3 className={styles.pubTitle}>{res.title}</h3>
                  <p className={styles.pubDescription}>{res.desc}</p>
                  <div className={styles.tags}>
                    {res.tags.map((tag) => (
                      <span key={tag} className="tag">{tag}</span>
                    ))}
                  </div>
                  <span className={styles.readMore}>
                    Click to read more
                  </span>
                </div>
              </TransitionLink>
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
