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
    title: "Constraint-Aware Bayesian Optimization for PID Tuning: Discovering Plant-Specific Control Strategies",
    date: "October 2026",
    category: "Control Systems & Machine Learning",
    status: "Accepted (IEEE IECON 2026)",
    statusType: "accepted",
    venue: "52nd Annual Conference of the IEEE Industrial Electronics Society (IECON 2026) — Flagship Conference of the IEEE Industrial Electronics Society",
    image: "/images/pid.png",
    tags: ["PID Control", "Bayesian Optimization", "Optuna", "Python", "Control Theory", "Genetic Algorithms", "CMA-ES"],
    overview:
      "This research project bridges the gap between machine learning and control engineering by reformulating the classic PID controller tuning problem. Traditionally, engineers rely on bandwidth-maximization heuristics (like MATLAB's pidtune) that treat engineering specifications such as overshoot, steady-state error, and actuator force limits as implicit byproducts. This project instead frames PID tuning as a strictly constrained black-box optimization problem, solved using constraint-aware Bayesian Optimization (BO).",
    problem:
      "Classical PID tuning methods (such as MATLAB's pidtune) rely on bandwidth-maximization heuristics that treat explicit engineering specifications—such as overshoot, steady-state error, and peak actuator force limits—as implicit byproducts. Consequently, when baseline conditions are violated or under severe parametric uncertainty, classical methods exhibit severe specification compliance failures (dropping to 1–38% compliance), risking instability or actuator saturation.",
    approach: [
      "Formulated PID tuning as a strictly constrained black-box optimization problem, solved using constraint-aware Bayesian Optimization (BO) in Optuna and python-control.",
      "Conducted a comprehensive study across four distinct linear SISO plants: a mass-spring-damper, 3rd-order system, non-minimum phase system, and a resonant plant.",
      "Implemented strict penalty formulations for violating engineering constraints including maximum overshoot, steady-state error tolerance, and peak actuator force limits.",
      "Benchmarked Bayesian Optimization against classical MATLAB pidtune heuristics as well as population-based evolutionary algorithms (Genetic Algorithms and CMA-ES) to evaluate sample efficiency and optimization performance.",
    ],
    results: [
      "Proved that the constraint formulation—not just the choice of optimizer—is the primary driver of robust, plant-specific control strategies across diverse dynamic systems.",
      "Maintained 75–100% specification compliance under severe parametric uncertainty, compared to just 1–38% for the classical pidtune baseline.",
      "Validated the framework against Genetic Algorithms and CMA-ES, proving that BO achieves optimal performance with 4–20× greater sample efficiency.",
      "Established critical sample efficiency required for future deployments on physical Hardware-in-the-Loop (HIL) testbeds where physical evaluations are costly and time-consuming.",
    ],
    techStack: ["Python", "Optuna", "python-control", "NumPy", "SciPy", "MATLAB", "Genetic Algorithms", "CMA-ES"],
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
  "tinyml-aal": {
    title: "Multi-Label Health State Classification in Ambient Assisted Living: Comparing TinyML Edge Deployment and Cloud LLM Inference",
    date: "Jan 2026 – Present",
    category: "IoT & Edge AI · TinyML",
    status: "Paper Under Preparation (Targeting IEEE Jul 2026)",
    statusType: "ongoing",
    venue: "Ashesi University Capstone Research — Target Submission: IEEE Conference (July 2026)",
    image: "/images/tinyml-aal.jpg",
    tags: [
      "TinyML",
      "TensorFlow Lite Micro",
      "ESP32",
      "LLM Benchmarking",
      "IoT Hardware",
      "Model Quantization",
      "Arduino IDE",
      "NVIDIA Build API"
    ],
    overview:
      "This capstone research project systematically evaluates and compares two competing architectural paradigms for deploying real-time health monitoring intelligence in Ambient Assisted Living (AAL) environments: on-device TinyML edge inference versus cloud-hosted Large Language Model (LLM) reasoning.",
    problem:
      "Deploying continuous health monitoring in Ambient Assisted Living requires real-time responsiveness, strict data privacy, and robust reliability under network dropouts. While cloud-hosted LLMs offer vast general-purpose reasoning, they suffer from high latency, API rate-limiting vulnerabilities, and edge cases where general reasoning conflicts with domain-specific, operationally defined health states. Conversely, edge microcontrollers face extreme RAM and flash storage constraints.",
    approach: [
      "Hardware & Sensor Integration: Built a multi-sensor IoT edge system on an ESP32 microcontroller incorporating an MPU6050 accelerometer, LDR light sensor, DHT11 temperature/humidity sensor, and MQ gas sensor for non-intrusive environment and activity tracking.",
      "Model Compression & TinyML Deployment: Trained a 1D Convolutional Neural Network (CNN) in TensorFlow and compressed it to 75.6 KB via one-shot magnitude pruning and INT8 quantization, enabling direct deployment on ESP32 via TensorFlow Lite Micro and Arduino/C++ firmware.",
      "Head-to-Head Cloud LLM Benchmarking: Benchmarked the edge CNN against three cloud-hosted LLMs (Google Gemma 4, Meta Llama 3.1, and Mistral Medium 3.5 via the NVIDIA Build API) evaluated on identical, synchronous multi-sensor data streams.",
      "Evaluation & Failure Mode Analysis: Conducted rigorous performance, availability, and failure-mode analysis across six multi-label health states (e.g., active movement, daytime inactivity, environmental anomaly).",
    ],
    results: [
      "Edge CNN Performance: Achieved a Macro F1 score of 1.00 with 100% inference availability and sub-millisecond on-device latency.",
      "Cloud LLM Performance: The best-performing cloud LLM (Mistral Medium 3.5) achieved a Macro F1 score of 0.84, with inference availability dropping to 60% under API rate limiting.",
      "Critical Reasoning Deficit Identified: Uncovered a systematic failure mode across all tested cloud LLMs during daytime inactivity detection, where general-purpose LLM reasoning consistently misinterpreted operational health definitions.",
      "Publication Target: Authoring a full research paper targeting submission to an IEEE conference in July 2026.",
    ],
    techStack: [
      "TensorFlow",
      "TensorFlow Lite Micro",
      "ESP32",
      "C++ / Arduino IDE",
      "Python",
      "NVIDIA Build API",
      "MPU6050 / DHT11 / MQ Sensors",
      "Quantization & Pruning"
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
