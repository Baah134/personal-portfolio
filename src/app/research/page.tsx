'use client';

import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import styles from "./page.module.css";

const publications = [
  {
    slug: "bayesian-pid",
    title: "Constraint-Aware Bayesian Optimization for PID Tuning: Discovering Plant-Specific Control Strategies",
    date: "Dec 2025",
    venue: "52nd Annual Conference of the IEEE Industrial Electronics Society (IECON 2026)",
    image: "/images/pid.png",
    status: "Accepted",
    statusType: "accepted",
    desc: "Bridges machine learning and control engineering by framing PID tuning as a strictly constrained black-box optimization problem. Proves across four linear SISO plants that BO maintains 75–100% specification compliance under parametric uncertainty (vs. 1–38% for pidtune) with 4–20× sample efficiency over GA and CMA-ES.",
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
    slug: "tinyml-aal",
    title: "Multi-Label Health State Classification in Ambient Assisted Living: Comparing TinyML Edge Deployment and Cloud LLM Inference",
    date: "Jan 2026 – Present",
    meta: "Ashesi University · Capstone Research",
    image: "/images/tinyml-aal.jpg",
    desc: "A capstone research project comparing TinyML edge deployment (ESP32) vs. cloud LLM inference (Gemma 4, Llama 3.1, Mistral Medium 3.5) for real-time health state classification. Demonstrates 1.00 Macro F1 and 100% availability for a 75.6 KB INT8 1D-CNN vs. 0.84 F1 for cloud LLMs.",
    tags: ["TinyML", "TensorFlow Lite Micro", "ESP32", "LLMs", "IoT Sensors", "C++"],
  },
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

function ResearchSkillLogo({ name }: { name: string }) {
  const normalized = name.toLowerCase();

  // Custom SVGs for concepts
  if (normalized === 'nlp') {
    return (
      <svg className={`${styles.researchSkillSvg} ${styles.nlpSvg}`} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M8 7h8M8 11h6"></path>
      </svg>
    );
  }
  if (normalized === 'asr') {
    return (
      <svg className={`${styles.researchSkillSvg} ${styles.asrSvg}`} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"></path>
      </svg>
    );
  }
  if (normalized === 'signal processing') {
    return (
      <svg className={`${styles.researchSkillSvg} ${styles.signalSvg}`} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12h3l3-9 4 18 3-12 5 3"></path>
      </svg>
    );
  }
  if (normalized === 'computer vision') {
    return (
      <svg className={`${styles.researchSkillSvg} ${styles.cvSvg}`} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M3 3h2M3 21h2M21 3h-2M21 21h-2"></path>
      </svg>
    );
  }
  if (normalized === 'matlab') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg"
        alt={name}
        className={styles.researchSkillLogo}
        loading="lazy"
      />
    );
  }

  // Custom concept SVGs for research
  if (normalized === 'pid control') {
    return (
      <svg className={styles.researchSkillSvg} style={{ color: '#3b82f6' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M2.5 12c4-8 4 8 8 0s4-4 8 0 3-1 3-1" />
        <line x1="2" y1="2" x2="2" y2="22" />
        <line x1="2" y1="22" x2="22" y2="22" />
      </svg>
    );
  }
  if (normalized === 'bayesian optimization') {
    return (
      <svg className={styles.researchSkillSvg} style={{ color: '#10b981' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 20c3-1 5-16 9-16s6 15 9 16" />
        <line x1="12" y1="4" x2="12" y2="20" />
      </svg>
    );
  }
  if (normalized === 'optuna') {
    return (
      <svg className={styles.researchSkillSvg} style={{ color: '#00b4d8' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="12" r="6" />
        <circle cx="12" cy="12" r="2" />
      </svg>
    );
  }
  if (normalized === 'rest api') {
    return (
      <svg className={styles.researchSkillSvg} style={{ color: '#10b981' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="8" rx="2" ry="2" />
        <rect x="2" y="14" width="20" height="8" rx="2" ry="2" />
        <line x1="6" y1="10" x2="6" y2="14" />
        <line x1="18" y1="10" x2="18" y2="14" />
      </svg>
    );
  }
  if (normalized === 'metaverse') {
    return (
      <svg className={styles.researchSkillSvg} style={{ color: '#ec4899' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 8h16l1 6H3l1-6z" />
        <circle cx="8" cy="11" r="2" />
        <circle cx="16" cy="11" r="2" />
      </svg>
    );
  }
  if (normalized === 'deep learning' || normalized === 'tinyml') {
    return (
      <svg className={styles.researchSkillSvg} style={{ color: '#8b5cf6' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="5" r="2.5" />
        <circle cx="5" cy="12" r="2.5" />
        <circle cx="19" cy="12" r="2.5" />
        <circle cx="12" cy="19" r="2.5" />
        <line x1="12" y1="7.5" x2="12" y2="16.5" />
        <line x1="7.2" y1="10.8" x2="16.8" y2="13.2" />
        <line x1="7.2" y1="13.2" x2="16.8" y2="10.8" />
      </svg>
    );
  }
  if (normalized === 'iot sensors' || normalized === 'iot') {
    return (
      <svg className={styles.researchSkillSvg} style={{ color: '#0ea5e9' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2" />
        <rect x="9" y="9" width="6" height="6" />
        <line x1="9" y1="1" x2="9" y2="4" />
        <line x1="15" y1="1" x2="15" y2="4" />
        <line x1="9" y1="20" x2="9" y2="23" />
        <line x1="15" y1="20" x2="15" y2="23" />
      </svg>
    );
  }
  if (normalized === 'llms' || normalized === 'llm benchmarking') {
    return (
      <svg className={styles.researchSkillSvg} style={{ color: '#ec4899' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10" />
        <circle cx="12" cy="10" r="3" />
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z" />
        <path d="M2 12h20" />
      </svg>
    );
  }

  // Brand logos via Simple Icons CDN
  let iconSlug = '';
  switch (normalized) {
    case 'pytorch':
      iconSlug = 'pytorch';
      break;
    case 'python':
      iconSlug = 'python';
      break;
    case 'unreal engine 5':
      iconSlug = 'unrealengine';
      break;
    case 'openai gpt api':
      iconSlug = 'openai';
      break;
    case 'tensorflow':
    case 'tensorflow lite micro':
      iconSlug = 'tensorflow';
      break;
    case 'esp32':
      iconSlug = 'espressif';
      break;
    case 'c++':
      iconSlug = 'cplusplus';
      break;
    case 'arduino':
    case 'arduino ide':
      iconSlug = 'arduino';
      break;
    case 'nvidia':
    case 'nvidia build api':
      iconSlug = 'nvidia';
      break;
    default:
      iconSlug = '';
  }

  if (iconSlug) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://cdn.simpleicons.org/${iconSlug}`}
        alt={name}
        className={styles.researchSkillLogo}
        loading="lazy"
      />
    );
  }

  // Fallback icon
  return (
    <svg viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}

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
                  <div className={styles.researchLogosGrid}>
                    {pub.tags.map((tag) => (
                      <div key={tag} className={styles.researchSkillItem} onClick={(e) => e.preventDefault()}>
                        <div className={styles.researchSkillIconWrap}>
                          <ResearchSkillLogo name={tag} />
                        </div>
                        <span className={styles.researchSkillTooltip}>{tag}</span>
                      </div>
                    ))}
                  </div>
                  <span className={styles.readMore}>
                    Click to read more <span className={styles.readMoreArrow}>→</span>
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
                  <div className={styles.researchLogosGrid}>
                    {res.tags.map((tag) => (
                      <div key={tag} className={styles.researchSkillItem} onClick={(e) => e.preventDefault()}>
                        <div className={styles.researchSkillIconWrap}>
                          <ResearchSkillLogo name={tag} />
                        </div>
                        <span className={styles.researchSkillTooltip}>{tag}</span>
                      </div>
                    ))}
                  </div>
                  <span className={styles.readMore}>
                    Click to read more <span className={styles.readMoreArrow}>→</span>
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

