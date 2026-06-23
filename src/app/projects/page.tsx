import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Technical projects by Prince Baah-Mensah spanning IoT, AI/ML, embedded systems, and robotics.",
};

const projects = [
  {
    slug: "lumina",
    title: "Lumina – AI Ambient Intelligence System",
    date: "Dec 2025",
    category: "IoT",
    desc: "Intelligent ambient monitoring system for assisted living that translates raw motion and environmental data into human-readable safety insights using AI.",
    tags: ["ESP32", "SQL", "Nvidia Nemotron LLM", "IoT"],
    badge: "IEEE MYOSA 2025 Global Finalist",
    image: "/images/lumina-dashboard.jpg",
  },
  {
    slug: "whisper",
    title: "Fine-tuning Whisper for African Accents",
    date: "May – Jun 2025",
    category: "AI/ML",
    desc: "Systematic evaluation and LoRA-based fine-tuning of OpenAI's Whisper, achieving a 64% reduction in Word Error Rate for African accents.",
    tags: ["PyTorch", "LoRA", "PEFT", "ASR"],
    badge: "64% WER Reduction",
    image: "/images/whisper.png",
  },
  {
    slug: "coastal-odes",
    title: "Modeling Climate Change in Coastal Communities using ODEs",
    date: "Feb – May 2025",
    category: "Math Modeling",
    desc: "Implemented a system of four non-linear coupled Ordinary Differential Equations (ODEs) in MATLAB to model interactions between human populations, greenhouse gas concentrations, atmospheric temperature, and forest ecosystems in coastal areas, introducing carbon mitigation policies and natural disaster feedback terms.",
    tags: ["MATLAB", "ODE45", "Numerical Analysis", "LaTeX"],
    badge: "Academic Project",
    image: "/images/climate change.jpeg",
  },
  {
    slug: "hydrogel",
    title: "Hydrogel Salinity Research & IoT Monitoring",
    date: "Nov – Dec 2024",
    category: "Environmental Science",
    desc: "Evaluated the impact of NaCl and MgCl2 salinity on biodegradable starch-PVA hydrogels using One-Way ANOVA and Tukey HSD post-hoc testing, analyzing non-linear polymer collapse in polluted irrigation water.",
    tags: ["ANOVA", "Tukey HSD", "IoT", "Arduino", "Data Analysis"],
    badge: "Environmental Research",
    image: "/images/hydrogel-analysis.png",
  },
  {
    slug: "aquablue",
    title: "AquaBlue – Water Filtration System",
    date: "Jan – Aug 2024",
    category: "Product Dev",
    desc: "Led business strategy and product development for a low-cost water filtration system prototype targeting rural communities in Ghana.",
    tags: ["Product Development", "Market Research", "Prototyping"],
    badge: "CTO",
    image: "/images/aquablue.jpeg",
  },
];

export default function ProjectsPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Projects</h1>
          <p className={styles.subtitle}>
            A collection of technical projects spanning IoT, artificial intelligence,
            embedded systems, and robotics. Click any project to explore in depth.
          </p>
        </header>

        <div className={styles.grid}>
          {projects.map((project) => (
            <Link
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={styles.card}
            >
              <div className={styles.cardImageWrap}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className={styles.cardImage}
                />
                <span className={styles.badge}>{project.badge}</span>
              </div>
              <div className={styles.cardBody}>
                <div className={styles.cardTop}>
                  <span className={styles.category}>{project.category}</span>
                  <span className={styles.date}>{project.date}</span>
                </div>
                <h2 className={styles.cardTitle}>{project.title}</h2>
                <p className={styles.cardDesc}>{project.desc}</p>
                <div className={styles.cardTags}>
                  {project.tags.map((tag) => (
                    <span key={tag} className="tag">
                      {tag}
                    </span>
                  ))}
                </div>
                <span className={styles.readMore}>
                  Read More
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                </span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
}
