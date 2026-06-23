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
    video?: string;
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
    category: "Environmental Science · Statistical Analysis",
    badge: "Environmental Research",
    image: "/images/hydrogel-analysis.png",
    tags: ["ANOVA", "Tukey HSD", "Bartlett Test", "IoT", "Data Analysis", "Arduino"],
    overview:
      "Evaluated the impact of dissolved ionic impurities (NaCl and MgCl2) on the water absorption and release kinetics of biodegradable starch-PVA-borax hydrogels. The research integrated a custom IoT-based monitoring system using soil-moisture sensors and an Arduino microcontroller to automate real-time absorption data collection, storing readings to analyze hydrogel performance across varying saline conditions and assist farmers dealing with galamsey water pollution.",
    problem:
      "Galamsey has heavily contaminated water bodies with ionic impurities. While hydrogels are effective for drought resilience in clean conditions, dissolved salts disrupt the polymer's hydrogen bonding network and osmotic gradient—reducing water absorption and release rates in a manner that was previously unquantified.",
    approach: [
      "Synthesized biodegradable hydrogels in a 2:1:1 ratio by volume (15% starch, 5% Polyvinyl Alcohol, and 10% borax crosslinker) and dried at 40°C.",
      "Implemented a custom IoT monitoring system using an Arduino microcontroller and capacitive soil-moisture sensors to collect real-time water absorption data under varying saline conditions.",
      "Automated the data logging process by programming the IoT controller to record and store sensor readings at 5-minute intervals for continuous performance evaluation.",
      "Tested hydrogel samples in NaCl and MgCl2 solutions at 5%, 10%, and 15% (w/v) concentrations, with distilled water as a control.",
      "Monitored release kinetics under 40°C incubator conditions to model long-term soil moisture preservation.",
      "Performed Kolmogorov-Smirnov (KS) normality testing (p > 0.05) and Bartlett's test for homoscedasticity (p > 0.05) to validate parametric statistical assumptions.",
      "Conducted One-Way ANOVA and post-hoc Tukey's Honestly Significant Difference (HSD) tests to determine statistically significant differences.",
      "Executed an unpaired t-test to evaluate baseline variance between control groups (p > 0.05).",
    ],
    results: [
      "Validated the reliability of the IoT sensor monitoring system for high-fidelity, real-time data collection of moisture dynamics under saline conditions.",
      "Confirmed that dissolved salts statistically decrease water absorption and release kinetics compared to distilled water (p < 0.05).",
      "Disproved the linear concentration hypothesis: 15% concentrations of both NaCl and MgCl2 outperformed 10% concentrations, showing non-linear collapse of the polymer network.",
      "Quantified that MgCl2 salts caused uniform release rates across all concentrations (p > 0.05), while NaCl release rates varied significantly.",
      "Provided scientific proof that ionic contamination delays absorption and release, which can lead to crop dehydration during critical growth phases.",
    ],
    techStack: ["Arduino", "Soil-Moisture Sensors", "IoT Data Logging", "One-Way ANOVA", "Tukey HSD", "Statistical Modeling"],
    links: [
      { label: "Read Research Paper (PDF)", href: "/Final_Paper_Statistical_Sapiens-1.pdf" },
    ],
  },
  aquablue: {
    title: "AquaRevive – Water Filtration System",
    date: "January – August 2024",
    category: "Product Development · Engineering & Business",
    badge: "CTO & Co-founder",
    image: "/images/aquablue.jpeg",
    video: "/cad-design.mp4",
    tags: ["Water Filtration", "Design Thinking", "Entrepreneurship", "MVP Validation", "SolidWorks"],
    overview:
      "AquaRevive is a low-cost, eco-friendly water filtration solution designed to address the issue of limited access to clean drinking water in underserved rural communities. Developed as part of a year-long project under Ashesi University's FDE program, AquaRevive combines engineering innovation with business strategy to create a sustainable and impactful product.",
    problem:
      "Underserved rural communities face severe health risks due to limited access to clean drinking water, combined with high costs and complexity associated with existing commercial water purification systems.",
    approach: [
      "Led the technical design and development of the water filtration system as CTO, designing a system that utilizes natural materials such as sand, charcoal, and zeolite to purify water.",
      "Followed a full design thinking process—empathizing with rural community users, defining the core problem, prototyping solutions, and testing/iterating based on feedback.",
      "Collaborated with cross-functional teammates to apply core entrepreneurship concepts, developing a Business Model Canvas and defining the product-market fit.",
      "Conducted extensive customer discovery and market segmentation to identify specific pain points and validation parameters.",
      "Created detailed pricing strategies, financial modeling, and ROI projections to ensure economic sustainability.",
      "Organized and executed community launches and live product demonstrations, partnering with local leaders and healthcare professionals.",
    ],
    results: [
      "Successfully launched the MVP prototype in a rural community, receiving praise for its affordability, simplicity, and environmental sustainability.",
      "Partnered with local health professionals and community leaders to run educational campaigns promoting clean water practices.",
      "Utilized post-launch feedback from community members to drive product refinement and strategic adjustments.",
      "Demonstrated a highly viable, low-cost solution that significantly improves accessibility to purified water without complex infrastructure.",
    ],
    techStack: [
      "Zeolite/Charcoal/Sand Media",
      "Design Thinking",
      "SolidWorks & Prototyping",
      "Business Model Canvas (BMC)",
      "MVP Validation",
      "Financial Modeling & ROI",
      "Customer Discovery",
      "Community Launch",
    ],
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
            {project.video ? (
              <video
                src={project.video}
                controls
                autoPlay
                muted
                loop
                playsInline
                className={styles.heroImg}
                style={{ display: "block", width: "100%", height: "auto", aspectRatio: "4/3", objectFit: "cover", viewTransitionName: `project-image-${slug}` }}
              />
            ) : (
              <Image
                src={project.image}
                alt={project.title}
                width={600}
                height={450}
                className={styles.heroImg}
                priority
                style={{ viewTransitionName: `project-image-${slug}` }}
              />
            )}
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
