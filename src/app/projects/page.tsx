'use client';

import { useState, useCallback } from "react";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import styles from "./page.module.css";

const projects = [
  {
    slug: "fpga-autoresearch",
    title: "FPGA Autoresearch – Autonomous Vivado RTL Loop",
    date: "Jul 2026",
    category: "AI Agent",
    desc: "An agentic loop that autonomously runs Vivado experiments overnight and iterates toward better hardware designs, powered by free NVIDIA NIM LLMs.",
    tags: ["Python", "Verilog", "Vivado Tcl", "NVIDIA NIM", "Git"],
    badge: "Active Dev",
    image: "/images/project-fpga-autoresearch.jpg",
    filters: ["IoT & Embedded", "Mini Projects"],
  },
  {
    slug: "sparse-compute-accelerator",
    title: "Sparse-Compute AI Hardware Accelerator",
    date: "Jul 2026 – Present",
    category: "AI Hardware",
    desc: "An ASIC/FPGA-targeted compute engine designed in Verilog that dynamically skips zero-valued activations to save clock cycles and operational power on edge devices.",
    tags: ["Verilog", "Vivado Tcl", "FSM Control", "Block RAM", "Simulink"],
    badge: "Work in Progress",
    image: "/images/project-sparse-accelerator.jpg",
    filters: ["IoT & Embedded"],
  },
  {
    slug: "llm-wiki",
    title: "LLM Wiki — Personal AI Knowledge Base",
    date: "Jun 2026",
    category: "AI Agent",
    desc: "AI agent that synthesises articles and papers into a compounding personal wiki, built with NVIDIA's free API.",
    tags: ["Python", "LLM Agents", "Flask", "NVIDIA NIM"],
    badge: "Open Source",
    image: "/images/project-llm-wiki.jpg",
    filters: ["Mini Projects"],
  },
  {
    slug: "lumina",
    title: "Lumina – AI Ambient Intelligence System",
    date: "Dec 2025",
    category: "IoT",
    desc: "Intelligent ambient monitoring system for assisted living that translates raw motion and environmental data into human-readable safety insights using AI.",
    tags: ["ESP32", "SQL", "Nvidia Nemotron LLM", "IoT"],
    badge: "IEEE MYOSA 2025 Global Finalist",
    image: "/images/lumina-dashboard.jpg",
    filters: ["AI & Machine Learning", "IoT & Embedded"],
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
    filters: ["AI & Machine Learning"],
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
    filters: ["Mathematical Modeling"],
  },
  {
    slug: "hydrogel",
    title: "Hydrogel Salinity Research & IoT Monitoring",
    date: "Nov – Dec 2024",
    category: "Environmental Science",
    desc: "Designed an IoT-based monitoring system using soil-moisture sensors to collect real-time absorption data, modeling the non-linear collapse of biodegradable starch-PVA hydrogels under saline conditions using ANOVA and Tukey HSD testing.",
    tags: ["Arduino", "Sensors", "IoT Data Logging", "ANOVA", "Tukey HSD"],
    badge: "Environmental Research",
    image: "/images/hydrogel-analysis.png",
    filters: ["IoT & Embedded", "Mathematical Modeling"],
  },
  {
    slug: "aquablue",
    title: "AquaRevive – Water Filtration System",
    date: "Jan – Aug 2024",
    category: "Product Dev",
    desc: "Led technical strategy and development as CTO for AquaRevive, a low-cost, eco-friendly water filtration system. Applied design thinking and entrepreneurship concepts (BMC, MVP validation, financial ROI modeling) for community launch.",
    tags: ["Water Filtration", "Design Thinking", "MVP Validation", "SolidWorks"],
    badge: "CTO & Co-founder",
    image: "/images/aquablue.jpeg",
    filters: ["Product Development"],
  },
];

function ProjectSkillLogo({ name }: { name: string }) {
  const normalized = name.toLowerCase();

  // Custom SVGs for concepts
  if (normalized === 'sql') {
    return (
      <svg className={`${styles.projectSkillSvg} ${styles.sqlSvg}`} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
      </svg>
    );
  }
  if (normalized === 'nlp') {
    return (
      <svg className={`${styles.projectSkillSvg} ${styles.nlpSvg}`} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M8 7h8M8 11h6"></path>
      </svg>
    );
  }
  if (normalized === 'asr') {
    return (
      <svg className={`${styles.projectSkillSvg} ${styles.asrSvg}`} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"></path>
      </svg>
    );
  }
  if (normalized === 'signal processing') {
    return (
      <svg className={`${styles.projectSkillSvg} ${styles.signalSvg}`} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12h3l3-9 4 18 3-12 5 3"></path>
      </svg>
    );
  }
  if (normalized === 'computer vision') {
    return (
      <svg className={`${styles.projectSkillSvg} ${styles.cvSvg}`} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M3 3h2M3 21h2M21 3h-2M21 21h-2"></path>
      </svg>
    );
  }
  if (normalized === 'verilog') {
    return (
      <svg className={styles.projectSkillSvg} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="15" x2="23" y2="15"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="15" x2="4" y2="15"></line>
      </svg>
    );
  }
  if (normalized === 'fsm control') {
    return (
      <svg className={styles.projectSkillSvg} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="6" cy="12" r="3" />
        <circle cx="18" cy="12" r="3" />
        <path d="M9 12h6M12 9l3 3-3 3M18 12c0-3.3-2.7-6-6-6-3.3 0-6 2.7-6 6" />
      </svg>
    );
  }
  if (normalized === 'block ram') {
    return (
      <svg className={styles.projectSkillSvg} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" />
        <path d="M3 9h18M3 15h18M9 3v18M15 3v18" />
      </svg>
    );
  }
  if (normalized === 'matlab') {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src="https://cdn.jsdelivr.net/gh/devicons/devicon@latest/icons/matlab/matlab-original.svg"
        alt={name}
        className={styles.projectSkillLogo}
        loading="lazy"
      />
    );
  }

  // Project-specific custom SVGs
  if (normalized === 'iot') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#0ea5e9' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <rect x="9" y="9" width="6" height="6"></rect>
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="15" x2="23" y2="15"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="15" x2="4" y2="15"></line>
      </svg>
    );
  }
  if (normalized === 'lora') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#f43f5e' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <line x1="12" y1="6" x2="12" y2="18"></line>
        <line x1="8" y1="10" x2="16" y2="10"></line>
        <line x1="8" y1="14" x2="16" y2="14"></line>
      </svg>
    );
  }
  if (normalized === 'peft') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#10b981' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M4 15s1-1 4-1 5 2 8 2 4-1 4-1V3s-1 1-4 1-5-2-8-2-4 1-4 1z"></path>
        <line x1="4" y1="22" x2="4" y2="15"></line>
      </svg>
    );
  }
  if (normalized === 'ode45') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#f43f5e' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3v18h18"></path>
        <path d="M18.7 8l-5.1 5.2-2.8-2.7L7 14.3"></path>
      </svg>
    );
  }
  if (normalized === 'numerical analysis') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#6366f1' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="18" y1="20" x2="18" y2="10"></line>
        <line x1="12" y1="20" x2="12" y2="4"></line>
        <line x1="6" y1="20" x2="6" y2="14"></line>
      </svg>
    );
  }
  if (normalized === 'sensors') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#f59e0b' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M5 12.5a3.5 3.5 0 1 1 7 0M1.3 9.6a8.5 8.5 0 1 1 14.3 0M9 16.5a1.5 1.5 0 1 1 3 0"></path>
      </svg>
    );
  }
  if (normalized === 'iot data logging') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#8b5cf6' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 20v-6M9 17h6M21 11.5a8.38 8.38 0 0 1-.9 3.8 8.5 8.5 0 0 1-7.6 4.7 8.38 8.38 0 0 1-3.8-.9L3 21l1.9-5.7a8.38 8.38 0 0 1-.9-3.8 8.5 8.5 0 0 1 4.7-7.6 8.38 8.38 0 0 1 3.8-.9h.5a8.48 8.48 0 0 1 8 8v.5z"></path>
      </svg>
    );
  }
  if (normalized === 'anova') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#ec4899' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="3" y="3" width="18" height="18" rx="2" ry="2"></rect>
        <line x1="9" y1="9" x2="15" y2="15"></line>
        <line x1="15" y1="9" x2="9" y2="15"></line>
      </svg>
    );
  }
  if (normalized === 'tukey hsd') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#3b82f6' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 3h18v18H3zM21 9H3M21 15H3M12 3v18"></path>
      </svg>
    );
  }
  if (normalized === 'water filtration') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#06b6d4' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22a7 7 0 0 0 7-7c0-4.3-7-9-7-9s-7 4.7-7 9a7 7 0 0 0 7 7z"></path>
      </svg>
    );
  }
  if (normalized === 'design thinking') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#eab308' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 14c.2-1 .7-1.7 1.5-2.5 1-.9 1.5-2.2 1.5-3.5A5 5 0 0 0 8 8c0 1 .4 2.5 1.5 3.5.7.8 1.3 1.5 1.5 2.5"></path>
        <line x1="9" y1="18" x2="15" y2="18"></line>
        <line x1="10" y1="22" x2="14" y2="22"></line>
      </svg>
    );
  }
  if (normalized === 'mvp validation') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#10b981' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 22s8-4 8-10V5l-8-3-8 3v7c0 6 8 10 8 10z"></path>
        <polyline points="9 11 11 13 15 9"></polyline>
      </svg>
    );
  }
  if (normalized === 'llm agents') {
    return (
      <svg className={styles.projectSkillSvg} style={{ color: '#ec4899' }} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="10"></circle>
        <circle cx="12" cy="10" r="3"></circle>
        <path d="M12 2a15.3 15.3 0 0 1 4 10 15.3 15.3 0 0 1-4 10 15.3 15.3 0 0 1-4-10 15.3 15.3 0 0 1 4-10z"></path>
        <path d="M2 12h20"></path>
      </svg>
    );
  }
  if (normalized === 'vivado tcl' || normalized === 'vivado') {
    return (
      <svg className={styles.projectSkillSvg} viewBox="0 0 24 24" width="22" height="22" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" style={{ color: '#005cb9' }}>
        <rect x="4" y="4" width="16" height="16" rx="2" ry="2"></rect>
        <path d="M9 9l3 6 3-6" />
        <line x1="9" y1="1" x2="9" y2="4"></line>
        <line x1="15" y1="1" x2="15" y2="4"></line>
        <line x1="9" y1="20" x2="9" y2="23"></line>
        <line x1="15" y1="20" x2="15" y2="23"></line>
        <line x1="20" y1="9" x2="23" y2="9"></line>
        <line x1="20" y1="15" x2="23" y2="15"></line>
        <line x1="1" y1="9" x2="4" y2="9"></line>
        <line x1="1" y1="15" x2="4" y2="15"></line>
      </svg>
    );
  }

  // Brand logos via Simple Icons CDN
  let iconSlug = '';
  switch (normalized) {
    case 'tensorflow':
      iconSlug = 'tensorflow';
      break;
    case 'pytorch':
      iconSlug = 'pytorch';
      break;
    case 'pcb design':
    case 'fusion 360':
      iconSlug = 'autodesk';
      break;
    case 'eagle / kicad':
      iconSlug = 'kicad';
      break;
    case 'esp32':
      iconSlug = 'espressif';
      break;
    case 'arduino':
      iconSlug = 'arduino';
      break;
    case 'solidworks':
      iconSlug = 'dassaultsystemes';
      break;
    case 'python':
      iconSlug = 'python';
      break;
    case 'c/c++':
      iconSlug = 'cplusplus';
      break;
    case 'nvidia':
    case 'nvidia nim':
    case 'nvidia nemotron llm':
      iconSlug = 'nvidia';
      break;
    case 'latex':
      iconSlug = 'latex';
      break;
    case 'flask':
      iconSlug = 'flask';
      break;
    case 'git':
      iconSlug = 'git';
      break;
    case 'tcl':
      iconSlug = 'tcl';
      break;
    case 'simulink':
      iconSlug = 'simulink';
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
        className={styles.projectSkillLogo}
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

export default function ProjectsPage() {
  const [activeFilter, setActiveFilter] = useState("All");

  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = (yc - y) / 80;
    const rotateY = (x - xc) / 80;
    
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLAnchorElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  }, []);

  const filteredProjects = activeFilter === "All"
    ? projects
    : projects.filter(project => project.filters.includes(activeFilter));

  const filterCategories = ["All", "AI & Machine Learning", "IoT & Embedded", "Mathematical Modeling", "Product Development", "Mini Projects"];

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

        {/* Filter Navigation */}
        <div className={styles.filterContainer}>
          {filterCategories.map((filter) => (
            <button
              key={filter}
              className={`${styles.filterBtn} ${activeFilter === filter ? styles.activeFilterBtn : ""}`}
              onClick={() => setActiveFilter(filter)}
            >
              {filter}
            </button>
          ))}
        </div>

        <div className={styles.grid}>
          {filteredProjects.map((project) => (
            <TransitionLink
              key={project.slug}
              href={`/projects/${project.slug}`}
              className={`${styles.card} scroll-reveal`}
              onMouseMove={handleMouseMove}
              onMouseLeave={handleMouseLeave}
            >
              <div className={styles.cardImageWrap}>
                <Image
                  src={project.image}
                  alt={project.title}
                  width={600}
                  height={400}
                  className={styles.cardImage}
                  style={{ viewTransitionName: `project-image-${project.slug}` }}
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
                <div className={styles.projectLogosGrid}>
                  {project.tags.map((tag) => (
                    <div key={tag} className={styles.projectSkillItem} onClick={(e) => e.preventDefault()}>
                      <div className={styles.projectSkillIconWrap}>
                        <ProjectSkillLogo name={tag} />
                      </div>
                      <span className={styles.projectSkillTooltip}>{tag}</span>
                    </div>
                  ))}
                </div>
                <span className={styles.readMore}>
                  Read More <span className={styles.readMoreArrow}>→</span>
                </span>
              </div>
            </TransitionLink>
          ))}
        </div>
      </div>
    </div>
  );
}


