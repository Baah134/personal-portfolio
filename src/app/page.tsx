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
    skills: ["TensorFlow", "PyTorch", "NLP", "ASR", "Signal Processing", "Computer Vision"],
  },
  {
    title: "Hardware & Embedded",
    skills: ["PCB Design", "Eagle / KiCad", "ESP32", "Arduino", "SolidWorks", "Fusion 360"],
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

function SkillLogo({ name }: { name: string }) {
  const normalized = name.toLowerCase();

  // Custom SVGs for concepts
  if (normalized === 'sql') {
    return (
      <svg className={`${styles.skillSvg} ${styles.sqlSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <ellipse cx="12" cy="5" rx="9" ry="3"></ellipse>
        <path d="M3 5v14c0 1.66 4 3 9 3s9-1.34 9-3V5"></path>
        <path d="M3 12c0 1.66 4 3 9 3s9-1.34 9-3"></path>
      </svg>
    );
  }
  if (normalized === 'nlp') {
    return (
      <svg className={`${styles.skillSvg} ${styles.nlpSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M21 15a2 2 0 0 1-2 2H7l-4 4V5a2 2 0 0 1 2-2h14a2 2 0 0 1 2 2z"></path>
        <path d="M8 7h8M8 11h6"></path>
      </svg>
    );
  }
  if (normalized === 'asr') {
    return (
      <svg className={`${styles.skillSvg} ${styles.asrSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M12 1a3 3 0 0 0-3 3v8a3 3 0 0 0 6 0V4a3 3 0 0 0-3-3z"></path>
        <path d="M19 10v2a7 7 0 0 1-14 0v-2M12 19v4M8 23h8"></path>
      </svg>
    );
  }
  if (normalized === 'signal processing') {
    return (
      <svg className={`${styles.skillSvg} ${styles.signalSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M3 12h3l3-9 4 18 3-12 5 3"></path>
      </svg>
    );
  }
  if (normalized === 'computer vision') {
    return (
      <svg className={`${styles.skillSvg} ${styles.cvSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
        <path d="M1 12s4-8 11-8 11 8 11 8-4 8-11 8-11-8-11-8z"></path>
        <circle cx="12" cy="12" r="3"></circle>
        <path d="M3 3h2M3 21h2M21 3h-2M21 21h-2"></path>
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
    default:
      iconSlug = '';
  }

  if (iconSlug) {
    return (
      // eslint-disable-next-line @next/next/no-img-element
      <img
        src={`https://cdn.simpleicons.org/${iconSlug}`}
        alt={name}
        className={styles.skillLogo}
        loading="lazy"
      />
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
              <div className={styles.statusPill}>
                <span className={styles.pulseDot} />
                <span>Available for new opportunities</span>
              </div>
              
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
