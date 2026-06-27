'use client';

import { useState, useCallback } from "react";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import styles from "./page.module.css";
import NetworkBackground from "@/components/ui/NetworkBackground";
import TextScramble from "@/components/ui/TextScramble";
import StatCounter from "@/components/ui/StatCounter";

const featuredProjects = [
  {
    title: "Lumina – AI Ambient Intelligence",
    desc: "Intelligent ambient monitoring system for assisted living using ESP32, sensors, and Nvidia Nemotron LLM.",
    image: "/images/lumina-dashboard.jpg",
    badge: "IEEE MYOSA 2025 Global Finalist",
    href: "/projects/lumina",
  },
  {
    title: "Hydrogel Salinity Research & IoT Monitoring",
    desc: "Designed an IoT-based monitoring system using soil-moisture sensors to collect real-time absorption data, modeling biodegradable hydrogel viability under varying salinity and galamsey pollution conditions.",
    image: "/images/hydrogel-analysis.png",
    badge: "Environmental Research",
    href: "/projects/hydrogel",
  },
  {
    title: "Fine-tuning Whisper for African Accents",
    desc: "LoRA-based fine-tuning of OpenAI's Whisper achieving 64% reduction in Word Error Rate.",
    image: "/images/whisper.png",
    badge: "64% WER Reduction",
    href: "/projects/whisper",
  },
];

const skillCategories = [
  {
    title: "AI & Machine Learning",
    skills: ["TensorFlow", "PyTorch", "NLP", "ASR", "Signal Processing"],
  },
  {
    title: "Hardware & Embedded",
    skills: ["PCB Design", "Eagle / KiCad", "Verilog", "ESP32", "Arduino", "SolidWorks", "Fusion 360"],
  },
  {
    title: "Software & Tools",
    skills: ["Python", "C/C++", "SQL"],
  },
];

const stats = [
  { value: "IEEE", label: "MYOSA 2025 Finalist" },
  { value: "75+", label: "IEEE Community" },
  { value: "1", label: "IEEE Publication" },
  { value: "6+", label: "Technical Projects" },
];

interface TimelineEvent {
  year: string;
  role: string;
  org: string;
  type: string;
  desc: string;
  link: string;
}

const timelineEvents: TimelineEvent[] = [
  {
    year: "2026 - Present",
    role: "Student Researcher",
    org: "Automation, Robotics & Control Lab",
    type: "Research",
    desc: "Formulating PID tuning using constraint-aware Bayesian Optimization to reduce settling time.",
    link: "/research#bayesian-pid"
  },
  {
    year: "2026 - Present",
    role: "President",
    org: "Effective Altruism Ashesi",
    type: "Leadership",
    desc: "Facilitating discussions on AI Safety and Biosecurity, and mentoring introductory fellowship cohorts.",
    link: "/leadership#student-clubs"
  },
  {
    year: "2026 - Present",
    role: "AESA President",
    org: "Ashesi Engineering Student Association",
    type: "Leadership",
    desc: "Leading engineering student branch, academic initiatives, and industry collaborations.",
    link: "/leadership#aesa"
  },
  {
    year: "2026",
    role: "Research Author",
    org: "IEEE 3SCEA Conference",
    type: "Publication",
    desc: "Published and presented research on agricultural solar drone co-design for rural farming systems.",
    link: "/research#publications"
  },
  {
    year: "2025 - Present",
    role: "Student Researcher",
    org: "CaRINE Internship",
    type: "Research",
    desc: "Building speaker-strict deep learning speech emotion classification frameworks using Transformers.",
    link: "/research#speech-emotion"
  },
  {
    year: "2025 (Aug - Sep)",
    role: "Workshop Intern",
    org: "CFAO Mobility PLC Ghana",
    type: "Industry",
    desc: "Rotated through automotive diagnostics, servicing, and workshop operations.",
    link: "/experience#cfao"
  },
  {
    year: "2024 - Present",
    role: "Co-founder & Chair",
    org: "IEEE Ashesi Student Branch",
    type: "Leadership",
    desc: "Scaling Ashesi's first IEEE chapter to 75+ active members branch-wide.",
    link: "/leadership#ieee"
  }
];

function SkillLogo({ name }: { name: string }) {
  const normalized = name.toLowerCase();

  // 1. MATLAB
  if (normalized === 'matlab') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#e05915" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 20h18M3 4v16" strokeWidth="1.5" />
        <path d="M3 14 Q 7 4, 11 12 T 19 8" strokeWidth="2.5" />
      </svg>
    );
  }

  // 2. SQL
  if (normalized === 'sql') {
    return (
      <svg className={`${styles.skillSvg} ${styles.sqlSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
      </svg>
    );
  }

  // 3. NLP
  if (normalized === 'nlp') {
    return (
      <svg className={`${styles.skillSvg} ${styles.nlpSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M8 7h8M8 11h6"></path>
      </svg>
    );
  }

  // 4. ASR
  if (normalized === 'asr') {
    return (
      <svg className={`${styles.skillSvg} ${styles.asrSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"></path>
      </svg>
    );
  }

  // 5. Signal Processing
  if (normalized === 'signal processing') {
    return (
      <svg className={`${styles.skillSvg} ${styles.signalSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <line x1="2" y1="12" x2="22" y2="12" strokeWidth="1" strokeDasharray="2 2" />
        <line x1="12" y1="2" x2="12" y2="22" strokeWidth="1" strokeDasharray="2 2" />
        <path d="M2 12 C 4.5 4, 7 4, 9.5 12 C 12 20, 14.5 20, 17 12 C 19.5 4, 22 4, 24 12" strokeWidth="2.5" />
      </svg>
    );
  }

  // 6. Verilog
  if (normalized === 'verilog') {
    return (
      <svg className={`${styles.skillSvg} ${styles.verilogSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
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

  // 7. TensorFlow
  if (normalized === 'tensorflow') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#ff6f00" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L4 6.5v9L12 20l8-4.5v-9L12 2z" fill="#ff6f00" fillOpacity="0.15" />
        <path d="M12 2L4 6.5v9l8 4.5" />
        <path d="M12 2l8 4.5v9L12 20" />
        <path d="M12 2v18" strokeDasharray="2 2" strokeWidth="1.5" />
        <path d="M4 6.5L12 11l8-4.5" />
      </svg>
    );
  }

  // 8. PyTorch
  if (normalized === 'pytorch') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#ee4c2c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2C8.5 6 5 9.5 5 13.5A7 7 0 0 0 12 20.5A7 7 0 0 0 19 13.5C19 9.5 15.5 6 12 2Z" fill="#ee4c2c" fillOpacity="0.15" />
        <path d="M12 2.5C9 6.5 6 9.5 6 13.5C6 16.8 8.7 19.5 12 19.5C15.3 19.5 18 16.8 18 13.5C18 9.5 15 6.5 12 2.5Z" />
        <circle cx="12" cy="12.5" r="2.5" fill="#ee4c2c" stroke="none" />
      </svg>
    );
  }

  // 9. Python
  if (normalized === 'python') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
        <path d="M11.93 2C6.88 2 7.15 4.18 7.15 4.18L7.17 6.4H12V7.07H5.1C5.1 7.07 2 7.37 2 12.38C2 17.39 4.67 17.15 4.67 17.15H6.28V14.9C6.28 14.9 6.09 11.96 11.23 11.96H16.03V7.07C16.03 7.07 16.42 2 11.93 2ZM9.03 4.17C9.53 4.17 9.93 4.57 9.93 5.07C9.93 5.57 9.53 5.97 9.03 5.97C8.53 5.97 8.13 5.57 8.13 5.07C8.13 4.57 8.53 4.17 9.03 4.17Z" fill="#3776ab"/>
        <path d="M12.07 22C17.12 22 16.85 19.82 16.85 19.82L16.83 17.6H12V16.93H18.9C18.9 16.93 22 16.63 22 11.62C22 6.61 19.33 6.85 19.33 6.85H17.72V9.1C17.72 9.1 17.91 12.04 12.77 12.04H7.97V16.93C7.97 16.93 7.58 22 12.07 22ZM14.97 19.83C14.47 19.83 14.07 19.43 14.07 18.93C14.07 18.43 14.47 18.03 14.97 18.03C15.47 18.03 15.87 18.43 15.87 18.93C15.87 19.43 15.47 19.83 14.97 19.83Z" fill="#ffd343"/>
      </svg>
    );
  }

  // 10. C/C++
  if (normalized === 'c/c++') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#00599c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M15 6 A 6 6 0 1 0 15 18" strokeWidth="3.5" />
        <path d="M17 10h4M19 8v4M17 14h4M19 12v4" strokeWidth="2" />
      </svg>
    );
  }

  // 11. PCB Design
  if (normalized === 'pcb design') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#00a38d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="2" y="2" width="20" height="20" rx="3" />
        <circle cx="8" cy="8" r="2" fill="#00a38d" stroke="none" />
        <circle cx="16" cy="16" r="2" fill="#00a38d" stroke="none" />
        <path d="M10 8h4a2 2 0 0 1 2 2v4" />
        <path d="M14 16H10a2 2 0 0 1-2-2V10" />
      </svg>
    );
  }

  // 12. Eagle / KiCad
  if (normalized === 'eagle / kicad') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#3d6cb9" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M6 6 L6 18 L18 12 Z" />
        <line x1="2" y1="9" x2="6" y2="9" />
        <line x1="2" y1="15" x2="6" y2="15" />
        <line x1="18" y1="12" x2="22" y2="12" />
        <text x="8" y="11" fontSize="6" fontFamily="monospace" fill="#3d6cb9" stroke="none">+</text>
        <text x="8" y="16" fontSize="6" fontFamily="monospace" fill="#3d6cb9" stroke="none">-</text>
      </svg>
    );
  }

  // 13. ESP32
  if (normalized === 'esp32') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#e0123c" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <rect x="4" y="4" width="16" height="16" rx="2" />
        <path d="M9 2v2M15 2v2M9 20v2M15 20v2M2 9h2M2 15h2M20 9h2M20 15h2" />
        <path d="M10 12 A 2 2 0 0 1 14 12" />
        <path d="M8 10 A 4 4 0 0 1 16 10" />
      </svg>
    );
  }

  // 14. Arduino
  if (normalized === 'arduino') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#00979d" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 12 C 9 6, 4 6, 4 12 C 4 18, 9 18, 12 12 C 15 6, 20 6, 20 12 C 20 18, 15 18, 12 12 Z" />
        <path d="M7 12h2M8 11v2M15 12h2" />
      </svg>
    );
  }

  // 15. SolidWorks
  if (normalized === 'solidworks') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#e61c24" strokeWidth="2" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 2L3 7v10l9 5 9-5V7l-9-5Z" />
        <path d="M12 22V12" />
        <path d="M3 7l9 5 9-5" />
        <path d="M12 12l6.5-3.5M12 12l-6.5-3.5" strokeDasharray="1.5 1.5" />
      </svg>
    );
  }

  // 16. Fusion 360
  if (normalized === 'fusion 360') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="#f68b1f" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <circle cx="12" cy="12" r="8" />
        <path d="M12 2v2M12 20v2M2 12h2M20 12h2M5 5l1.5 1.5M17.5 17.5l1.5 1.5M5 19l1.5-1.5M17.5 6.5l1.5-1.5" />
        <circle cx="12" cy="12" r="3" fill="#f68b1f" stroke="none" />
      </svg>
    );
  }

  // Fallback icon
  return (
    <svg viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <circle cx="12" cy="12" r="10"></circle>
      <line x1="12" y1="16" x2="12" y2="12"></line>
      <line x1="12" y1="8" x2="12.01" y2="8"></line>
    </svg>
  );
}

export default function Home() {
  const [glowStyle, setGlowStyle] = useState<React.CSSProperties>({});
  const [magnetStyle, setMagnetStyle] = useState<React.CSSProperties>({});

  const handleHeroMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    setGlowStyle({
      "--mouse-x": `${x}px`,
      "--mouse-y": `${y}px`,
    } as React.CSSProperties);
  }, []);

  const handleMagnetMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const container = e.currentTarget;
    const btn = container.querySelector("#hero-cta-contact") as HTMLAnchorElement | null;
    if (!btn) return;

    const rect = btn.getBoundingClientRect();
    const btnX = rect.left + rect.width / 2;
    const btnY = rect.top + rect.height / 2;

    const dx = e.clientX - btnX;
    const dy = e.clientY - btnY;
    const dist = Math.sqrt(dx * dx + dy * dy);

    if (dist < 120) {
      const pullX = Math.max(-15, Math.min(15, dx * 0.25));
      const pullY = Math.max(-15, Math.min(15, dy * 0.25));
      setMagnetStyle({
        transform: `translate(${pullX}px, ${pullY}px)`,
        transition: "transform 0.1s ease-out",
      });
    } else {
      setMagnetStyle({
        transform: "translate(0px, 0px)",
        transition: "transform 0.3s ease-out",
      });
    }
  }, []);

  const handleMagnetLeave = useCallback(() => {
    setMagnetStyle({
      transform: "translate(0px, 0px)",
      transition: "transform 0.3s ease-out",
    });
  }, []);

  return (
    <>
      {/* ===== HERO ===== */}
      <section id="hero" className={styles.hero} onMouseMove={handleHeroMouseMove}>
        <NetworkBackground />
        <div className={styles.heroGlow} style={glowStyle} />
        
        <div className={styles.heroLayout}>
          {/* Top Center Header */}
          <div className={styles.heroHeader}>
            <h1 className={styles.heroTitle}>
              Hi I&apos;m <TextScramble text="Prince" />
            </h1>
            <div className={styles.heroSubtitle}>
              Electrical Engineer
            </div>
          </div>

          {/* Center Portrait Image (greyscale & bottom-faded) */}
          <div className={styles.portraitContainer}>
            <Image
              src="/images/altered-removebg-preview.png"
              alt="Prince Baah-Mensah"
              width={700}
              height={700}
              priority
              className={styles.portraitImg}
            />
          </div>

          {/* Left/Right Grid Layout */}
          <div className={styles.heroGrid}>
            {/* Left Column: Status Pill & Social Proof */}
            <div className={styles.leftCol}>
              <div className={styles.socialProof}>
                <div className={styles.avatarGroup}>
                  <div className={`${styles.avatar} ${styles.avatar1}`}>IEEE</div>
                  <div className={`${styles.avatar} ${styles.avatar2}`}>MCF</div>
                  <div className={`${styles.avatar} ${styles.avatar3}`}>AU</div>
                </div>
                <p className={styles.proofText}>
                  Co-founder &amp; Chair of IEEE Ashesi, President of AESA.
                </p>
              </div>
            </div>

            {/* Right Column: Mini Bio & CTA */}
            <div className={styles.rightCol} onMouseMove={handleMagnetMove} onMouseLeave={handleMagnetLeave}>
              <p className={styles.rightDesc}>
                Passionate about building intelligent edge hardware, hardware-software co-design, and accelerating ML inference on FPGAs.
              </p>
              
              <div className={styles.ctaWrapper}>
                <TransitionLink
                  href="/contact"
                  className={styles.ctaButton}
                  id="hero-cta-contact"
                  style={magnetStyle}
                >
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true" className={styles.ctaArrow}>
                    <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                  </svg>
                  <span>Get in Touch</span>
                </TransitionLink>
              </div>
            </div>
          </div>
        </div>

        {/* Organization Partner Bar */}
        <div className={styles.logosRow}>
          <span className={styles.logoItem}>Ashesi University</span>
          <span className={styles.logoItem}>IEEE CS Region 8</span>
          <span className={styles.logoItem}>Mastercard Foundation</span>
          <span className={styles.logoItem}>CFAO Mobility</span>
          <span className={styles.logoItem}>EA Ashesi</span>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className={`${styles.about} section`}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionHeading}`}>
            <TextScramble text="About Me" />
          </h2>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p>
                I am a Mastercard Foundation Scholar studying Electrical &amp; Electronics Engineering at Ashesi University.
                While my early research and projects focused on IoT, Artificial Intelligence, and Speech Emotion Recognition (SER), 
                I am currently shifting my focus toward machine learning inference, hardware-software co-design, and FPGA-accelerated systems.
              </p>
              <p>
                As Co-founder and Chair of IEEE Ashesi and President of the Ashesi Engineering Student Association, 
                I am passionate about building both intelligent edge technology and collaborative engineering communities.
              </p>
            </div>
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={`${styles.statCard} scroll-reveal`}>
                  <span className={styles.statValue}>
                    <StatCounter value={stat.value} />
                  </span>
                  <span className={styles.statLabel}>{stat.label}</span>
                </div>
              ))}
            </div>
          </div>
        </div>
      </section>

      {/* ===== TIMELINE ===== */}
      <section id="timeline" className={`${styles.timeline} section`}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionHeading} text-center`}>
            <TextScramble text="Works Timeline" />
          </h2>
          <p className={`${styles.timelineSubtitle} section-subtitle text-center`}>
            A chronological summary of my research, leadership, and industrial highlights.
          </p>

          <div className={styles.timelineContainer}>
            <div className={styles.timelineLine} />
            
            {timelineEvents.map((event, index) => {
              const isLeft = index % 2 === 0;
              return (
                <div 
                  key={`${event.org}-${event.year}`} 
                  className={`${styles.timelineItem} ${isLeft ? styles.left : styles.right} scroll-reveal`}
                >
                  <div className={styles.timelineNode} />
                  <div className={styles.timelineContentCard}>
                    <span className={styles.timelineBadge}>{event.type}</span>
                    <span className={styles.timelineYear}>{event.year}</span>
                    <h3 className={styles.timelineRole}>{event.role}</h3>
                    <h4 className={styles.timelineOrg}>{event.org}</h4>
                    <p className={styles.timelineDesc}>{event.desc}</p>
                    <TransitionLink href={event.link} className={styles.timelineLink}>
                      Read Details →
                    </TransitionLink>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ===== FEATURED PROJECTS ===== */}
      <section id="featured-projects" className={`${styles.projects} section`}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionHeading}`}>
            <TextScramble text="Featured Projects" />
          </h2>
          <p className="section-subtitle">
            A selection of projects spanning IoT, AI, and embedded systems.
          </p>
          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => (
              <TransitionLink key={project.title} href={project.href} className={`${styles.projectCard} scroll-reveal`}>
                <div className={styles.projectImageWrap}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className={styles.projectImage}
                    style={{ viewTransitionName: `project-image-${project.href.split("/").pop()}` }}
                  />
                  <span className={styles.projectBadge}>{project.badge}</span>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.desc}</p>
                </div>
              </TransitionLink>
            ))}
          </div>
          <div className={styles.viewAll}>
            <TransitionLink href="/projects" className={styles.viewAllLink}>
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </TransitionLink>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className={`${styles.skills} section`}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionHeading}`}>
            <TextScramble text="Technical Skills" />
          </h2>
          <div className={styles.skillsGrid}>
            {skillCategories.map((cat) => (
              <div key={cat.title} className={`${styles.skillCategory} scroll-reveal`}>
                <h3 className={styles.skillCatTitle}>{cat.title}</h3>
                <div className={styles.skillLogosGrid}>
                  {cat.skills.map((skill) => (
                    <div key={skill} className={styles.skillItem}>
                      <div className={styles.skillIconWrap}>
                        <SkillLogo name={skill} />
                      </div>
                      <span className={styles.skillTooltip}>{skill}</span>
                    </div>
                  ))}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ===== CTA ===== */}
      <section id="cta" className={styles.cta}>
        <div className="container">
          <div className={styles.ctaContent}>
            <h2 className={styles.ctaTitle}>
              <TextScramble text="Let's Connect" />
            </h2>
            <p className={styles.ctaDesc}>
              Open to research collaborations, internships, and speaking opportunities.
              Let&apos;s build something meaningful together.
            </p>
            <TransitionLink href="/contact" className="btn btn-primary" id="cta-contact">
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </TransitionLink>
          </div>
        </div>
      </section>
    </>
  );
}
