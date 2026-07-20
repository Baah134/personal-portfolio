import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import TransitionLink from "@/components/ui/TransitionLink";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

/* ───────────── research project database ───────────── */
const researchProjects: Record<
  string,
  {
    title: string;
    date: string;
    category: string;
    status: string;
    statusType: "accepted" | "review" | "completed" | "ongoing";
    venue?: string;
    image?: string;
    tags: string[];
    overview: string;
    problem: string;
    approach: string[];
    results: string[];
    techStack: string[];
    links?: { label: string; href: string }[];
  }
> = {
  "bayesian-pid": {
    title: "Constraint-Aware Bayesian Optimization for PID Tuning",
    date: "October 2026",
    category: "Control Systems & Machine Learning",
    status: "Under Review",
    statusType: "review",
    venue: "52nd Annual Conference of the IEEE Industrial Electronics Society (IECON 2026)",
    image: "/images/pid.png",
    tags: ["PID Control", "Bayesian Optimization", "Optuna", "Python", "Control Theory"],
    overview:
      "Formulates PID tuning as a constrained black-box optimization problem with explicit engineering specifications and solves it using constraint-aware Bayesian Optimization, demonstrating up to 34× reduction in settling time.",
    problem:
      "Classical PID tuning methods (such as MATLAB's pidtune) often struggle to optimize control parameters under non-linear physical constraints (e.g. preventing actuator saturation or limiting overshoot). This leads to sub-optimal settling times or unstable control strategies under real-world scenarios where baseline conditions are violated.",
    approach: [
      "Formulated PID tuning as a constrained black-box optimization problem using Optuna and python-control.",
      "Implemented strict penalties for violating explicit engineering specifications such as overshoot, steady-state error, and peak actuator force.",
      "Conducted a rigorous four-plant comparative study benchmarking the proposed framework against standard MATLAB tools.",
    ],
    results: [
      "Discovered qualitatively distinct control parameters for different plant systems.",
      "Achieved up to 34× reduction in settling time while satisfying all physical system constraints.",
      "Validated controller robustness under nominal and perturbed plant conditions.",
    ],
    techStack: ["Python", "Optuna", "python-control", "NumPy", "SciPy", "MATLAB"],
  },
  "metaverse-education": {
    title: "AI-Powered Adaptive Learning System for Education in the Metaverse Classroom",
    date: "April 2026",
    category: "Virtual Environments & AI",
    status: "Accepted",
    statusType: "accepted",
    venue: "IEEE International Conference on Smart Sustainable Systems for Computer and Engineering Applications (3SCEA)",
    image: "/images/metaverse.png",
    tags: ["Unreal Engine 5", "OpenAI GPT API", "REST API", "Adaptive Learning", "Metaverse"],
    overview:
      "An AI-driven virtual learning environment built in Unreal Engine 5, integrating preloaded instructional media with GPT-backed conversational NPCs for real-time academic support and adaptive assessment.",
    problem:
      "Traditional online classrooms lack interactive engagement and personalization, typically relying on rigid, static curricula. There is a need for intelligent, immersive classrooms that adapt in real-time to individual student performance levels and learning speed.",
    approach: [
      "Designed and developed a virtual metaverse classroom environment in Unreal Engine 5 using Blueprints.",
      "Integrated OpenAI GPT-4 API to power conversational NPCs acting as intelligent subject-matter tutors.",
      "Engineered an adaptive assessment engine that dynamically adjusts quiz difficulties based on real-time student responses.",
      "Implemented gamified progression tracking with performance-based experience points (XP) to motivate learners.",
    ],
    results: [
      "Developed initially as a key project for the 2025 IEEE Grand Metaverse Challenge, later expanded into a full research publication.",
      "Demonstrated real-time tutoring and personalized topic recommendations without a hard-coded curriculum.",
      "Reduced learner friction by matching quiz difficulty dynamically to individual user capacity.",
      "Successfully presented and accepted at the IEEE 3SCEA 2026 conference.",
    ],
    techStack: ["Unreal Engine 5", "Blueprints", "OpenAI API", "Python", "REST API", "JSON"],
    links: [
      { label: "IEEE Xplore", href: "https://ieeexplore.ieee.org/document/11602834" }
    ],
  },
  "speech-emotion": {
    title: "Speech Emotion Recognition Research",
    date: "August 2025 – Present",
    category: "Speech Processing & Deep Learning",
    status: "Ongoing",
    statusType: "ongoing",
    venue: "Ashesi University Research Initiative",
    image: "/images/ser.png",
    tags: ["Deep Learning", "Signal Processing", "PyTorch", "Audio Analysis", "Transformers"],
    overview:
      "Researching and developing deep learning systems capable of classifying human emotion from speech, focusing on closing the generalization gap for unseen speakers using Speaker-Strict comparative analysis.",
    problem:
      "Speech Emotion Recognition (SER) models display high accuracy when tested on speakers they were trained on, but suffer massive generalization drops (often over 30%) when evaluated on unseen speakers due to personal differences in vocal pitch and speech patterns.",
    approach: [
      "Engineered advanced audio feature extraction pipelines (MFCCs, log-mel spectrograms) in Python using Librosa.",
      "Implemented Speaker-Strict cross-validation protocols to ensure models are benchmarked under rigorous, real-world generalization conditions.",
      "Trained and compared RNN (LSTM), CNN, and Transformer architectures in PyTorch, developing hybrid CNN-Transformers for spatial-temporal capture.",
    ],
    results: [
      "Constructed a robust speaker-agnostic SER framework leveraging Self-Supervised Learning (SSL) representations.",
      "Significantly reduced the generalization performance drop on unseen test speakers.",
      "Authoring a comprehensive technical manuscript for submission to IEEE publications.",
    ],
    techStack: ["PyTorch", "Librosa", "Python", "Audio Processing", "Transformers", "CNNs"],
  },
};

/* ───────────── metadata ───────────── */
type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(researchProjects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = researchProjects[slug];
  if (!project) return { title: "Research Not Found" };
  return {
    title: project.title,
    description: project.overview.slice(0, 160),
  };
}

/* ───────────── component ───────────── */
export default async function ResearchDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = researchProjects[slug];
  if (!project) notFound();

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/research" className={styles.breadcrumbLink}>Research</Link>
          <span className={styles.breadcrumbSep} aria-hidden="true">/</span>
          <span className={styles.breadcrumbCurrent}>{project.title}</span>
        </nav>

        {/* Hero */}
        <header className={styles.hero}>
          <div className={styles.heroText}>
            <div className={styles.heroMeta}>
              <span className={styles.category}>{project.category}</span>
              <span className={styles.date}>{project.date}</span>
            </div>
            <h1 className={styles.title}>{project.title}</h1>
            
            {/* Status Badges */}
            <div style={{ margin: 'var(--space-4) 0' }}>
              {project.statusType === "accepted" && (
                <span className={styles.statusBadge}>
                  <span className={styles.statusDot} aria-hidden="true" />
                  {project.status}
                </span>
              )}
              {project.statusType === "review" && (
                <span className={styles.statusBadgeReview}>
                  <span className={styles.statusDotReview} aria-hidden="true" />
                  {project.status}
                </span>
              )}
              {(project.statusType === "completed" || project.statusType === "ongoing") && (
                <span className={styles.statusBadgeGeneric}>
                  {project.status}
                </span>
              )}
            </div>

            {project.venue && <p className={styles.venue}><strong>Venue/Award:</strong> {project.venue}</p>}
            <p className={styles.overview}>{project.overview}</p>
            <div className={styles.tags}>
              {project.tags.map((tag) => (
                <span key={tag} className="tag">{tag}</span>
              ))}
            </div>
            {project.links && (
              <div className={styles.links} style={{ marginTop: 'var(--space-6)', display: 'flex', gap: 'var(--space-3)' }}>
                {project.links.map((link) => (
                  <a
                    key={link.href}
                    href={link.href}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="btn btn-outline"
                    id={`research-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
                  >
                    {link.label}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ marginLeft: '6px' }}>
                      <path d="M15 3h6v6" /><path d="M10 14 21 3" /><path d="M18 13v6a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2V8a2 2 0 0 1 2-2h6" />
                    </svg>
                  </a>
                ))}
              </div>
            )}
          </div>
          
          {project.image ? (
            <div className={styles.heroImage}>
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={450}
                className={styles.heroImg}
                priority
                style={{ viewTransitionName: `research-image-${slug}` }}
              />
            </div>
          ) : (
            <div className={styles.heroImagePlaceholder}>
              <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
              </svg>
              <span>Image Placeholder</span>
            </div>
          )}
        </header>

        {/* Content */}
        <div className={styles.content}>
          {/* Problem */}
          <section className={styles.section} id="problem">
            <h2 className={styles.sectionTitle}>The Research Problem</h2>
            <p className={styles.sectionText}>{project.problem}</p>
          </section>

          {/* Approach */}
          <section className={styles.section} id="approach">
            <h2 className={styles.sectionTitle}>Methodology &amp; Approach</h2>
            <ul className={styles.list}>
              {project.approach.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Results */}
          <section className={styles.section} id="results">
            <h2 className={styles.sectionTitle}>Results &amp; Findings</h2>
            <ul className={styles.list}>
              {project.results.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className={styles.section} id="tech-stack">
            <h2 className={styles.sectionTitle}>Tools &amp; Technologies</h2>
            <div className={styles.techGrid}>
              {project.techStack.map((tech) => (
                <div key={tech} className={styles.techItem}>{tech}</div>
              ))}
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className={styles.nav}>
          <TransitionLink href="/research" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            All Research
          </TransitionLink>
        </div>
      </div>
    </div>
  );
}
