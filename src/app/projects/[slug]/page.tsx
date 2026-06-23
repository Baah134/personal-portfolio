import type { Metadata } from "next";
import Image from "next/image";
import Link from "next/link";
import { notFound } from "next/navigation";
import styles from "./page.module.css";

/* ───────────── project data ───────────── */
const projects: Record<
  string,
  {
    title: string;
    date: string;
    category: string;
    badge: string;
    image: string;
    tags: string[];
    overview: string;
    problem: string;
    approach: string[];
    results: string[];
    techStack: string[];
    links?: { label: string; href: string }[];
  }
> = {
  lumina: {
    title: "Lumina – AI Ambient Intelligence System",
    date: "December 2025",
    category: "IoT · Assisted Living",
    badge: "IEEE MYOSA 2025 Global Finalist",
    image: "/images/lumina-dashboard.jpg",
    tags: ["ESP32", "SQL", "Nvidia Nemotron LLM", "IoT", "MQTT", "Python"],
    overview:
      "Lumina is an intelligent ambient monitoring system for assisted living that translates raw motion and environmental data into human-readable safety insights using AI. The system bridges the gap between basic sensor readings and behavioral analysis, allowing for the detection of critical events like falls or high-heat risks.",
    problem:
      "Elderly individuals living alone face risks from falls, overheating, and other environmental hazards. Traditional monitoring systems either require wearable devices (which many resist) or produce raw data streams that caregivers struggle to interpret in real time.",
    approach: [
      "Engineered a full-stack IoT architecture utilizing ESP32 microcontrollers with PIR motion sensors and DHT environmental sensors for non-intrusive ambient monitoring.",
      "Designed a local SQL database pipeline for continuous data logging with configurable sampling rates.",
      "Integrated the Nvidia Nemotron-30B LLM to interpret sensor patterns and generate natural-language safety summaries for caregivers.",
      "Implemented alert thresholds for fall detection (sudden motion absence) and heat-risk scenarios (sustained high temperature + inactivity).",
    ],
    results: [
      "Selected as a Global Finalist for the MYOSA 4.0 competition at IEEE APSCON 2026.",
      "Successfully demonstrated real-time ambient intelligence with sub-second response times for critical event detection.",
      "Achieved reliable fall-event detection with minimal false positives in controlled testing environments.",
    ],
    techStack: ["ESP32", "PIR Sensors", "DHT Sensors", "SQL", "Python", "MQTT", "Nvidia Nemotron-30B"],
  },
  "coastal-odes": {
    title: "Modeling Climate Change in Coastal Communities using ODEs",
    date: "February – May 2025",
    category: "Mathematical Modeling",
    badge: "Academic Project",
    image: "/images/climate change.jpeg",
    tags: ["MATLAB", "ODE45", "Numerical Analysis", "LaTeX", "Differential Equations"],
    overview:
      "Implemented a system of four non-linear coupled Ordinary Differential Equations (ODEs) in MATLAB to simulate the interactions between human populations, greenhouse gases, atmospheric temperature, and forest ecosystems. Replicated the model from 'A Mathematical Model to Investigate the Frequent Impact of Global Warming on Coastal Lives' and extended it by incorporating active carbon mitigation policy factors and natural disaster feedback terms.",
    problem:
      "Original environmental models often depict a dire, irreversible trajectory of runaway greenhouse gas buildup and ecosystem collapse without accounting for the adaptive impact of climate policies, or they utilize unrealistic emission parameters (such as overestimating animal GHG emission rates relative to human contributions).",
    approach: [
      "Replicated the base four-compartment ODE system (Humans, GHG, Temperature, Forest) from literature using MATLAB's ode45 numerical solver.",
      "Readjusted the animal GHG emission parameter (lower delta_2 from 0.029 to 0.004) to align with empirical emission ratios showing human dominance.",
      "Modified the differential equation for greenhouse gases by introducing a policy mitigation term (-k) to simulate active carbon abatement strategies.",
      "Added natural disaster feedback terms (w_4 * N_H and epsilon_6 * N_H) to capture the direct negative feedback of climate-induced events on both human populations and forest ecosystems.",
      "Conducted a parameter sensitivity analysis comparing the runaway original model with the policy-stabilized scenario.",
    ],
    results: [
      "Simulated a dire baseline trajectory where greenhouse gases surge past 0.8 units, temperatures spike +125%, human populations fall by 40%, and forest coverage collapses to 10% by year 100.",
      "Validated that the modified scenario achieves stable equilibrium, plateauing GHGs at 0.5 units, slowing temperature rise by 33%, and stabilizing human and forest systems near 50% of original capacity.",
      "Demonstrated quantitatively how policy-driven intervention can disrupt environmental tipping points and lead to a manageable climate trajectory.",
    ],
    techStack: ["MATLAB", "ode45", "Simulink", "Numerical Integration", "LaTeX"],
    links: [
      { label: "Project Website", href: "https://sirsunantsalot.wixsite.com/my-site-5/the-model" },
    ],
  },
  whisper: {
    title: "Fine-tuning Whisper for African Accents",
    date: "May – June 2025",
    category: "AI · Speech Processing",
    badge: "64% WER Reduction",
    image: "/images/whisper.png",
    tags: ["PyTorch", "LoRA", "PEFT", "ASR", "Hugging Face"],
    overview:
      "A systematic evaluation and fine-tuning of OpenAI's Whisper model on African-accented English. The project identified a significant performance gap and applied Parameter-Efficient Fine-Tuning (PEFT) with LoRA to dramatically improve recognition accuracy.",
    problem:
      "OpenAI's Whisper, while achieving near-human accuracy on standard English, exhibits a significant performance gap on African accents with a Word Error Rate (WER) of 0.50. This bias limits the utility of state-of-the-art ASR systems for over 1.4 billion potential users across Africa.",
    approach: [
      "Systematically evaluated baseline Whisper performance across multiple African accent categories to quantify the performance gap.",
      "Implemented LoRA (Low-Rank Adaptation) — a Parameter-Efficient Fine-Tuning method — to adapt the large-scale model under a limited computational budget without full model retraining.",
      "Curated a diverse African-accented English dataset for fine-tuning, ensuring representation across West, East, and Southern African accent categories.",
      "Conducted ablation studies on LoRA hyperparameters (rank, alpha, target modules) to identify optimal adaptation configurations.",
    ],
    results: [
      "Reduced Word Error Rate by 64% — from 0.50 to 0.18 — validating the efficacy of PEFT for domain-specific ASR adaptation.",
      "Demonstrated that LoRA fine-tuning with less than 1% additional parameters can significantly close accent bias gaps.",
      "Established a reproducible pipeline for accent-aware ASR adaptation applicable to other underrepresented language varieties.",
    ],
    techStack: ["PyTorch", "Hugging Face Transformers", "LoRA / PEFT", "Whisper", "Python"],
  },
  hydrogel: {
    title: "Hydrogel Salinity Research & IoT Monitoring",
    date: "November – December 2024",
    category: "IoT · Environmental Science",
    badge: "Environmental Research",
    image: "/images/hydrogel-analysis.png",
    tags: ["IoT", "Soil Sensors", "Data Analysis", "Python", "Arduino"],
    overview:
      "An investigation into the impact of dissolved salts on hydrogel water-absorption kinetics, paired with an IoT-based monitoring system for real-time data collection. The research addresses water contamination challenges faced by Ghanaian farmers due to illegal mining (galamsey).",
    problem:
      "Ghana's galamsey (illegal mining) has contaminated water bodies with dissolved salts, making agricultural water unsafe. Hydrogels can help retain moisture in soil, but their effectiveness under saline conditions was poorly understood — limiting their adoption by affected farmers.",
    approach: [
      "Investigated the impact of dissolved salts (NaCl and MgCl₂) on the water-absorption and release kinetics of hydrogels at various concentrations.",
      "Implemented an IoT-based monitoring system using soil-moisture sensors and Arduino to collect real-time absorption data at configurable intervals.",
      "Built a data pipeline to store, analyze, and visualize hydrogel performance metrics across different saline conditions.",
      "Conducted comparative analysis between distilled water and various saline solutions to quantify salinity impact on hydrogel efficacy.",
    ],
    results: [
      "Demonstrated that dissolved salts significantly reduced hydrogel water absorption and release rates across all tested concentrations.",
      "Distilled water consistently outperformed all saline conditions, providing a baseline for optimal hydrogel use.",
      "The IoT monitoring system enabled continuous, hands-free data collection — reducing manual measurement errors.",
    ],
    techStack: ["Arduino", "Soil Moisture Sensors", "Python", "Data Visualization", "IoT"],
  },
  aquablue: {
    title: "AquaBlue – Water Filtration System",
    date: "January – August 2024",
    category: "Product Development · Social Impact",
    badge: "CTO & Co-founder",
    image: "/images/aquablue.jpeg",
    tags: ["Product Development", "Market Research", "Prototyping", "SolidWorks"],
    overview:
      "Led technical strategy and product development for Aqua Revive (AquaBlue) — a low-cost water filtration system prototype targeting rural communities in Ghana. The project combined engineering design with market research and business strategy.",
    problem:
      "Many rural communities in Ghana lack access to clean drinking water. Existing filtration solutions are either too expensive or require infrastructure that is unavailable in underserved areas. There is a need for affordable, portable, and effective water purification.",
    approach: [
      "Conducted market research and customer discovery interviews to validate product-market fit for water accessibility solutions in rural Ghana.",
      "Designed filtration system prototypes using SolidWorks, iterating through multiple designs based on user feedback and material constraints.",
      "Developed the business model canvas and go-to-market strategy for targeting peri-urban and rural markets.",
      "Managed prototyping iterations using 3D printing and laser cutting, presenting final designs at Ashesi D:Lab Demo Day.",
    ],
    results: [
      "Delivered a functional prototype that demonstrated effective particulate filtration at a fraction of commercial costs.",
      "Validated demand through customer discovery interviews with target communities.",
      "Presented to investors and faculty at the D:Lab Demo Day, receiving positive feedback on viability.",
    ],
    techStack: ["SolidWorks", "3D Printing", "Laser Cutting", "Market Analysis"],
  },
};

/* ───────────── metadata ───────────── */
type PageProps = { params: Promise<{ slug: string }> };

export async function generateStaticParams() {
  return Object.keys(projects).map((slug) => ({ slug }));
}

export async function generateMetadata({ params }: PageProps): Promise<Metadata> {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) return { title: "Project Not Found" };
  return {
    title: project.title,
    description: project.overview.slice(0, 160),
  };
}

/* ───────────── component ───────────── */
export default async function ProjectDetail({ params }: PageProps) {
  const { slug } = await params;
  const project = projects[slug];
  if (!project) notFound();

  return (
    <div className={styles.page}>
      <div className="container">
        {/* Breadcrumb */}
        <nav className={styles.breadcrumb} aria-label="Breadcrumb">
          <Link href="/projects" className={styles.breadcrumbLink}>Projects</Link>
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
            <span className={styles.badge}>{project.badge}</span>
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
                    id={`project-link-${link.label.toLowerCase().replace(/\s+/g, '-')}`}
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
          <div className={styles.heroImage}>
            <Image
              src={project.image}
              alt={project.title}
              width={600}
              height={450}
              className={styles.heroImg}
              priority
            />
          </div>
        </header>

        {/* Content */}
        <div className={styles.content}>
          {/* Problem */}
          <section className={styles.section} id="problem">
            <h2 className={styles.sectionTitle}>The Problem</h2>
            <p className={styles.sectionText}>{project.problem}</p>
          </section>

          {/* Approach */}
          <section className={styles.section} id="approach">
            <h2 className={styles.sectionTitle}>Approach &amp; Methodology</h2>
            <ul className={styles.list}>
              {project.approach.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Results */}
          <section className={styles.section} id="results">
            <h2 className={styles.sectionTitle}>Results &amp; Impact</h2>
            <ul className={styles.list}>
              {project.results.map((item, i) => (
                <li key={i}>{item}</li>
              ))}
            </ul>
          </section>

          {/* Tech Stack */}
          <section className={styles.section} id="tech-stack">
            <h2 className={styles.sectionTitle}>Technology Stack</h2>
            <div className={styles.techGrid}>
              {project.techStack.map((tech) => (
                <div key={tech} className={styles.techItem}>{tech}</div>
              ))}
            </div>
          </section>
        </div>

        {/* Navigation */}
        <div className={styles.nav}>
          <Link href="/projects" className={styles.backLink}>
            <svg width="16" height="16" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
              <path d="M19 12H5" /><path d="m12 19-7-7 7-7" />
            </svg>
            All Projects
          </Link>
        </div>
      </div>
    </div>
  );
}
