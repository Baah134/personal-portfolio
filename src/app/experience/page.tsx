'use client';

import { useState, useCallback } from "react";
import Image from "next/image";
import Link from "next/link";
import TransitionLink from "@/components/ui/TransitionLink";
import styles from "./page.module.css";

const experiences = [
  {
    role: "Student Researcher",
    company: "Automation, Robotics & Control Lab — Ashesi University",
    date: "Jan 2026 – Present",
    type: "Research",
    category: "research",
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
    points: [
      "Conduct structured investigations into deep learning architectures optimized for high-dimensional acoustic data, evaluating model performance on complex, low-resource signal streams.",
      "Engineer rigorous evaluation protocols, including Speaker-Strict comparative analysis, to identify, measure, and systematically mitigate generalization failures across diverse neural network models.",
      "Manage the lifecycle of data-driven research projects from initial dataset benchmarking to compiling comprehensive technical manuscripts targeted for international engineering publications.",
    ],
    link: "/research",
  },
  {
    role: "Workshop Intern",
    company: "CFAO Mobility PLC Ghana",
    date: "Aug – Sep 2025",
    type: "Industry",
    category: "work",
    image: "/images/cfao.jpeg",
    points: [
      "Gained hands-on experience in the automotive workshop, assisting with servicing, maintenance, and fault diagnosis of vehicles while learning the function and integration of key vehicle components.",
      "Rotated across store, sales, and front desk operations, gaining insight into company structure, accountability processes, and customer relations.",
    ],
  },
  {
    role: "CTO & Co-founder",
    company: "AquaRevive",
    date: "Jan – Aug 2024",
    type: "Startup",
    category: "entrepreneurship",
    points: [
      "Led the technical design and development of the filtration system as CTO, utilizing natural materials including sand, charcoal, and zeolite to purify water.",
      "Applied design thinking (empathizing, defining, prototyping, testing) and entrepreneurship concepts like the Business Model Canvas and MVP validation.",
      "Conducted customer discovery, market segmentation, pricing strategies, financial modeling, and ROI projections.",
      "Partnered with health professionals and local leaders to run educational campaigns and launch the MVP in a rural community.",
    ],
    link: "/projects/aquablue",
    linkLabel: "View AquaRevive Project Details",
  },
];

export default function ExperiencePage() {
  const [activeTab, setActiveTab] = useState<"research" | "work" | "entrepreneurship">("research");

  const filteredExperiences = experiences.filter((exp) => exp.category === activeTab);



  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Work Experience</h1>
          <p className={styles.subtitle}>
            Professional experience spanning research, engineering, industry, and entrepreneurship.
          </p>
        </header>

        {/* Tab Controls */}
        <div className={styles.tabsContainer}>
          <div className={styles.tabsList}>
            <button
              onClick={() => setActiveTab("research")}
              className={`${styles.tabBtn} ${activeTab === "research" ? styles.activeTab : ""}`}
            >
              Research
            </button>
            <button
              onClick={() => setActiveTab("work")}
              className={`${styles.tabBtn} ${activeTab === "work" ? styles.activeTab : ""}`}
            >
              Work &amp; Industry
            </button>
            <button
              onClick={() => setActiveTab("entrepreneurship")}
              className={`${styles.tabBtn} ${activeTab === "entrepreneurship" ? styles.activeTab : ""}`}
            >
              Entrepreneurship
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
                <h2 className={styles.expRole}>{exp.role}</h2>
                <p className={styles.expCompany}>{exp.company}</p>
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
