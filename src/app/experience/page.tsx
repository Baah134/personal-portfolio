'use client';

import { useState, useCallback } from "react";
import Image from "next/image";
import TransitionLink from "@/components/ui/TransitionLink";
import { flushSync } from "react-dom";
import styles from "./page.module.css";

const experiences = [
  {
    role: "Student Researcher",
    company: "Automation, Robotics & Control Lab — Ashesi University",
    date: "Jan 2026 – Present",
    type: "Research",
    category: "research",
    logo: "/images/ashesi.jpg",
    points: [
      "Formulate and execute control system frameworks under faculty guidance, focusing on the optimization of classical control theories through modern machine learning integration.",
      "Design, simulate, and benchmark multi-loop architectures and automated parameter-tuning algorithms to minimize overshoot, reduce settling time, and prevent actuator saturation in non-linear physical systems.",
      "Collaborate with peer researchers to validate control system robustness and manage simulation pipelines.",
    ],
    link: "/research",
  },
  {
    role: "Student Researcher",
    company: "Creative/Entrepreneurship and Research Internship (CaRINE) — Ashesi University",
    date: "Aug 2025 – Present",
    type: "Research",
    category: "research",
    logo: "/images/ashesi.jpg",
    points: [
      "Conduct structured investigations into deep learning architectures optimized for high-dimensional acoustic data, evaluating model performance on complex, low-resource signal streams.",
      "Engineer rigorous evaluation protocols, including Speaker-Strict comparative analysis, to identify, measure, and systematically mitigate generalization failures across diverse neural network models.",
      "Manage the lifecycle of data-driven research projects from initial dataset benchmarking to compiling comprehensive technical manuscripts targeted for international engineering publications.",
    ],
    link: "/research",
  },
  {
    role: "Global Finalist",
    company: "IEEE MYOSA 4.0 Competition",
    date: "Dec 2025",
    type: "Competition",
    category: "competitions",
    logo: "/images/sensors_council.png",
    points: [
      "Selected as one of the Global Finalists for the MYOSA 4.0 competition at IEEE APSCON 2026 for developing Lumina, an intelligent ambient monitoring system.",
      "Engineered a full-stack IoT architecture utilizing ESP32 microcontrollers, a local SQL database, and the Nvidia Nemotron-30B LLM to translate sensor feeds into behavioral safety insights.",
    ],
    link: "/projects/lumina",
    linkLabel: "View Lumina Project Details",
  },
  {
    role: "Competitor & Project Lead",
    company: "2025 IEEE Grand Metaverse Challenge",
    date: "Jun – Aug 2025",
    type: "Competition",
    category: "competitions",
    logo: "/images/ieee-metaverse.webp",
    points: [
      "Designed and implemented an AI-driven virtual learning environment in Unreal Engine 5 with GPT-backed conversational NPCs acting as intelligent subject-matter tutors.",
      "Developed a prototype featuring dynamic assessments and adaptive learning path recommendations, which served as the foundation for our accepted research publication.",
    ],
    link: "/research/metaverse-education",
    linkLabel: "View Metaverse Classroom Research",
  },
  {
    role: "Workshop Intern",
    company: "CFAO Mobility PLC Ghana",
    date: "Aug – Sep 2025",
    type: "Industry",
    category: "work",
    logo: "/images/cfao.png",
    image: "/images/cfao.jpeg",
    points: [
      "Gained hands-on experience in the automotive workshop, assisting with servicing, maintenance, and fault diagnosis of vehicles while learning the function and integration of key vehicle components.",
      "Rotated across store, sales, and front desk operations, gaining insight into company structure, accountability processes, and customer relations.",
    ],
  },
];

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<"research" | "work" | "competitions">("research");

  const filteredExperiences = experiences.filter((exp) => exp.category === activeTab);

  const handleTabChange = useCallback((tab: "research" | "work" | "competitions") => {
    const documentWithTransition = document as any;
    if (typeof window !== "undefined" && "startViewTransition" in document) {
      documentWithTransition.startViewTransition(() => {
        flushSync(() => {
          setActiveTab(tab);
        });
      });
    } else {
      setActiveTab(tab);
    }
  }, []);

  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Work Experience &amp; Achievements</h1>
          <p className={styles.subtitle}>
            Professional experience spanning research, engineering, industry, and global competitions.
          </p>
        </header>

        {/* Tab Controls */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsList}>
            <button
              onClick={() => handleTabChange("research")}
              className={`${styles.tabBtn} ${activeTab === "research" ? styles.activeTab : ""}`}
            >
              Research
            </button>
            <button
              onClick={() => handleTabChange("work")}
              className={`${styles.tabBtn} ${activeTab === "work" ? styles.activeTab : ""}`}
            >
              Work &amp; Industry
            </button>
            <button
              onClick={() => handleTabChange("competitions")}
              className={`${styles.tabBtn} ${activeTab === "competitions" ? styles.activeTab : ""}`}
            >
              Competitions
            </button>
          </div>
        </div>
        
        <div className={styles.experienceList}>
          {filteredExperiences.map((exp, i) => (
            <article
              key={i}
              className={styles.expCard}
            >
              <div className={styles.expLeft}>
                <span className={styles.expDate}>{exp.date}</span>
                <span className={styles.expType}>{exp.type}</span>
              </div>
              <div className={styles.expDivider} aria-hidden="true">
                <div className={styles.expDot} />
                <div className={styles.expLine} />
              </div>
              <div className={styles.expContent} data-date={exp.date}>
                <div className={styles.expHeader}>
                  {exp.logo && (
                    <div className={styles.expLogoContainer}>
                      {/* eslint-disable-next-line @next/next/no-img-element */}
                      <img src={exp.logo} alt="" className={styles.expLogo} />
                    </div>
                  )}
                  <div>
                    <h2 className={styles.expRole}>{exp.role}</h2>
                    <p className={styles.expCompany}>{exp.company}</p>
                  </div>
                </div>
                <ul className={styles.expPoints}>
                  {exp.points.map((point, j) => (
                    <li key={j}>{point}</li>
                  ))}
                </ul>
                {exp.image && (
                  <div className={styles.expImageWrap}>
                    <Image
                      src={exp.image}
                      alt={exp.role}
                      width={480}
                      height={270}
                      className={styles.expImage}
                    />
                  </div>
                )}
                {exp.link && (
                  <TransitionLink href={exp.link} className={styles.cardLink}>
                    {exp.linkLabel || "View Research Outputs & Publications"}
                    <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                      <path d="M5 12h14" /><path d="m12 5 7 7-7 7" />
                    </svg>
                  </TransitionLink>
                )}
              </div>
            </article>
          ))}
        </div>
      </div>
    </div>
  );
}
