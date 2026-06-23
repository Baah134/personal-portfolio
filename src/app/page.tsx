import styles from "./page.module.css";
import Image from "next/image";
import Link from "next/link";

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
    desc: "Evaluated the impact of NaCl and MgCl2 salinity on biodegradable starch-PVA hydrogels using One-Way ANOVA and Tukey HSD post-hoc tests to model agricultural viability under galamsey pollution.",
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
    skills: ["Python", "C/C++", "TypeScript", "MQTT", "SQL", "Git"],
  },
];

const stats = [
  { value: "IEEE", label: "MYOSA 2025 Finalist" },
  { value: "75+", label: "IEEE Community" },
  { value: "2", label: "IEEE Publications" },
  { value: "6+", label: "Technical Projects" },
];

export default function Home() {
  return (
    <>
      {/* ===== HERO ===== */}
      <section id="hero" className={styles.hero}>
        <div className={styles.heroContent}>
          <div className={styles.heroText}>
            <p className={styles.heroLabel}>Electrical Engineer · Researcher</p>
            <h1 className={styles.heroTitle}>
              Prince<br />
              <span className={styles.heroTitleAccent}>Baah-Mensah</span>
            </h1>
            <p className={styles.heroDesc}>
              Building intelligent systems at the intersection of hardware and AI.
              Third-year Electrical &amp; Electronics Engineering student at Ashesi University,
              focused on control systems, IoT, and speech processing research.
            </p>
            <div className={styles.heroCtas}>
              <Link href="/projects" className="btn btn-primary" id="hero-cta-projects">
                View Projects
                <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                  <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                </svg>
              </Link>
              {/* CV button hidden per request
              <a href="/CV.pdf" download className="btn btn-outline" id="hero-cta-cv">
                Download CV
              </a>
              */}
            </div>
          </div>
          <div className={styles.heroImage}>
            <Image
              src="/images/Prince.jpeg"
              alt="Prince Baah-Mensah"
              width={600}
              height={600}
              priority
              className={styles.heroImg}
            />
          </div>
        </div>
      </section>

      {/* ===== ABOUT ===== */}
      <section id="about" className={`${styles.about} section`}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionHeading}`}>About Me</h2>
          <div className={styles.aboutGrid}>
            <div className={styles.aboutText}>
              <p>
                I&apos;m a <strong>Mastercard Foundation Scholar</strong> and <strong>Kufuor Scholar</strong> studying
                Electrical &amp; Electronics Engineering at Ashesi University in Ghana.
                My research spans <strong>control systems</strong>, <strong>speech emotion recognition</strong>,
                and <strong>AI for education</strong>.
              </p>
              <p>
                As <strong>Co-founder &amp; Chair of IEEE Ashesi</strong> and <strong>President of the Ashesi Engineering Student Association</strong>,
                I&apos;m passionate about building both technology and community.
              </p>
            </div>
            <div className={styles.statsGrid}>
              {stats.map((stat) => (
                <div key={stat.label} className={styles.statCard}>
                  <span className={styles.statValue}>{stat.value}</span>
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
          <h2 className={`section-title ${styles.sectionHeading}`}>Featured Projects</h2>
          <p className="section-subtitle">
            A selection of projects spanning IoT, AI, and embedded systems.
          </p>
          <div className={styles.projectGrid}>
            {featuredProjects.map((project) => (
              <Link key={project.title} href={project.href} className={styles.projectCard}>
                <div className={styles.projectImageWrap}>
                  <Image
                    src={project.image}
                    alt={project.title}
                    width={400}
                    height={300}
                    className={styles.projectImage}
                  />
                  <span className={styles.projectBadge}>{project.badge}</span>
                </div>
                <div className={styles.projectInfo}>
                  <h3 className={styles.projectTitle}>{project.title}</h3>
                  <p className={styles.projectDesc}>{project.desc}</p>
                </div>
              </Link>
            ))}
          </div>
          <div className={styles.viewAll}>
            <Link href="/projects" className={styles.viewAllLink}>
              View All Projects
              <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>

      {/* ===== SKILLS ===== */}
      <section id="skills" className={`${styles.skills} section`}>
        <div className="container">
          <h2 className={`section-title ${styles.sectionHeading}`}>Technical Skills</h2>
          <div className={styles.skillsGrid}>
            {skillCategories.map((cat) => (
              <div key={cat.title} className={styles.skillCategory}>
                <h3 className={styles.skillCatTitle}>{cat.title}</h3>
                <div className={styles.skillTags}>
                  {cat.skills.map((skill) => (
                    <span key={skill} className="tag">{skill}</span>
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
            <h2 className={styles.ctaTitle}>Let&apos;s Connect</h2>
            <p className={styles.ctaDesc}>
              Open to research collaborations, internships, and speaking opportunities.
              Let&apos;s build something meaningful together.
            </p>
            <Link href="/contact" className="btn btn-primary" id="cta-contact">
              Get in Touch
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
              </svg>
            </Link>
          </div>
        </div>
      </section>
    </>
  );
}
