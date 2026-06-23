'use client';

import { useCallback } from "react";
import Image from "next/image";
import styles from "./page.module.css";

const awards = [
  { title: "IEEE MYOSA 2025 Competition Finalist", org: "IEEE Sensors Council", date: "Dec 2025" },
  { title: "Second Place, Ashesi Experiential Transcript Challenge", org: "Ashesi University", date: "Nov 2025" },
  { title: "Kufuor Scholar Program", org: "John A. Kufuor Foundation", date: "Dec 2024 – Jun 2027" },
  { title: "Mastercard Foundation Scholars Program", org: "Ashesi University", date: "Jan 2024 – Jun 2027" },
];

const ieeeRoles = [
  {
    role: "Co-founder & Chair",
    org: "IEEE Ashesi Student Branch",
    date: "Nov 2024 – Present",
    image: "/images/ieee_SB_Chair.jpeg",
    points: [
      "Founded and scaled Ashesi's first IEEE chapter from zero to 75+ active members — the largest IEEE student branch in Ghana.",
      "Spearheading the organization of workshops and technical competitions, fostering student-led research in emerging fields like AI and robotics.",
    ],
  },
  {
    role: "Regional Coordinator, TechX 2026",
    org: "IEEE Computer Society Region 8 (Europe, Middle East, Africa)",
    date: "Apr 2026 – Present",
    image: "/images/techx.jpeg",
    points: [
      "Coordinate for TechX, a regional initiative focused on fostering technical excellence and professional development within the IEEE Computer Society across Europe, the Middle East, and Africa.",
      "Manage planning and execution of technical deliverables through active collaboration with international team members.",
    ],
  },
  {
    role: "Volunteer – IEEE Day",
    org: "IEEE — Ashesi University",
    date: "Jun – Oct 2025",
    image: "/images/ieee day picture.jpeg",
    certificate: "/images/IEEE Day.pdf",
    points: [
      "Led planning and execution of Ashesi's first IEEE Day celebration, coordinating activities and outreach for 80+ student participants.",
    ],
  },
  {
    role: "Organizer – IEEE Region 8 ASYPC 2025",
    org: "IEEE — Ashesi University",
    date: "Jun – Oct 2025",
    image: "/images/Asypc.jpeg",
    points: [
      "Coordinated Ashesi University's student delegation, overseeing logistics and protocol.",
      "Strengthened Ashesi's presence within Region 8 by engaging with professionals and technical societies.",
    ],
  },
  {
    role: "Peer Reviewer",
    org: "IEEE IECON 2026",
    date: "2026 – Present",
    points: [
      "Evaluating technical paper submissions in control systems, robotics, and artificial intelligence tracks for the 52nd Annual Conference of the IEEE Industrial Electronics Society (IECON 2026).",
    ],
  },
  {
    role: "Ambassador – Humanitarian Technologies",
    org: "IEEE Region 8 — Ashesi University",
    date: "Jun 2025 – Present",
    certificate: "/images/humanitarin.jpeg",
    points: [
      "Facilitated the creation of the first IEEE SIGHT (Special Interest Group on Humanitarian Technology) student chapter in Ghana.",
      "Leading efforts to secure an EPICS in IEEE grant for a student-led project developing an offline, personalized AI educational system for rural learners.",
    ],
  },
  {
    role: "Ambassador – IEEE Xtreme 19.0",
    org: "IEEE — Ashesi University",
    date: "Jun – Oct 2025",
    certificate: "/images/IEEE Xtreme.pdf",
    points: [
      "Recruited 5 teams — the highest in the Ghana Section — for the global 24-hour programming competition.",
      "Ranked Ambassador of the Month twice for IEEE Xtreme 19.0.",
    ],
  },
];

const studentClubs = [
  {
    role: "President",
    org: "Ashesi Engineering Student Association (AESA)",
    dates: [
      "Jan 2026 – Present (President)",
      "Sep 2024 – Dec 2025 (Organizer)",
    ],
    image: "/images/AESA.JPEG",
    points: [
      "Leading the primary engineering student body at Ashesi University, coordinating academic, technical, and industry-facing initiatives across engineering disciplines.",
      "Organizer (Sep 2024 – Dec 2025): Organized two 6-hour hackathons with 100+ participants, fostering innovation through CAD, programming, and electronics competitions.",
      "Revitalized the inFocus program at Ashesi, an initiative to introduce 60 freshmen to various technology fields such as power and energy, robotics through mentoring, projects, and research.",
    ],
  },
  {
    role: "President",
    org: "Effective Altruism Ashesi",
    date: "Jan 2026 – Present",
    image: "/images/EA.jpeg",
    points: [
      "Facilitate high-level discussions and fellowships on global EA priorities, including AI Safety, Biosecurity, fostering rigorous debate and evidence-based inquiry.",
      "Mentoring a cohort of 15 students through the Introduction to Effective Altruism fellowship.",
    ],
  },
  {
    role: "Kufour Scholar",
    org: "John A. Kufour Foundation",
    date: "Dec 2024 – Jun 2027",
    image: "/images/Kufour.jpeg",
    certificate: "/images/Kufour_Certificate.jpeg",
    points: [
      "Established by Former President His Excellency John Agyekum Kufour, the Kufour Scholar Program is a leadership program designed to train students to tackle Africa's problem.",
      "Privileged to be selected as 1 of 31 from a pool of 4000 applicants nationwide from all universities in Ghana.",
    ],
  },
  {
    role: "Brand Advocate",
    org: "MasterCard Foundation Scholars Community Platform, Baobab",
    date: "Jul 2024 – Present",
    image: "/images/kenya.jpeg",
    points: [
      "Selected as one of the few Mastercard Foundation Scholars to represent Ashesi University at the 2025 Baobab Summit ('Baobab Rising') in Nairobi, Kenya.",
      "Collaborated with scholars and alumni across the continent on driving Africa's transformation through youth-led leadership and collective action.",
      "Participated in storytelling circles, wellness workshops, and reflective sessions on driving sustainable social impact.",
      "Support platform engagement by helping scholars locate and apply for professional courses, certifications, and internships.",
    ],
  },
  {
    role: "Course Representative",
    org: "Academic Committee — Ashesi University",
    date: "Feb – Aug 2024",
    points: [
      "Liaised between 80 engineering students and academic council, providing feedback on student's academic status.",
    ],
  },
];

const teaching = [
  {
    role: "Engineering Coach",
    org: "Ashesi Innovation Experience (AIX)",
    date: "Jul – Aug 2025",
    image: "/images/AIX.jpeg",
    certificate: "/images/AIX Certificate.jpeg",
    points: [
      "Introduced 25+ high school students to Arduino programming, circuit design, and 3D modeling fundamentals.",
      "Guided a team project building a smart high-speed train prototype using CAD design, laser cutting, and rapid prototyping.",
    ],
  },
  {
    role: "Volunteer",
    org: "Graduate Guidance Group — University of Nottingham, UK",
    date: "Mar 2024",
    image: "/images/nottingham.jpeg",
    points: [
      "Promoted engineering education by guiding 8 high schools in engineering design competition.",
      "Aided students to build vertical structures using simple materials like wood and glue.",
    ],
  },
  {
    role: "Calculus Tutor",
    org: "Math Resource Center — Ashesi University",
    date: "Jan – May 2025",
    points: [
      "Provided one-on-one and group academic support to 100+ freshmen in Calculus I and II.",
    ],
  },
];

const community = [
  {
    role: "Volunteer Teacher",
    org: "Berekuso STEM Project — Ashesi University",
    date: "Sep – Dec 2024",
    points: [
      "Facilitate teaching and learning of STEM topics such as Physics for 20+ high school students in underserved communities such as Berekuso.",
    ],
  },
  {
    role: "Volunteer & Member",
    org: "EducationUSA — Kumasi",
    date: "Oct 2022 – Dec 2023",
    points: [
      "Organized HIV/AIDS awareness walk and seminar with 60+ participants.",
      "Volunteered at primary schools teaching general knowledge in hygiene and health.",
      "Ensured success of the 2023 EducationUSA Ghana College Fair featuring 40 U.S. universities by facilitating ushering of over 2000+ visitors.",
    ],
  },
];

/* SVG Icons */
const IconMedal = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><circle cx="12" cy="8" r="6" /><path d="M15.477 12.89 17 22l-5-3-5 3 1.523-9.11" /></svg>
);
const IconBolt = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M13 2 3 14h9l-1 8 10-12h-9l1-8z" /></svg>
);
const IconUsers = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M16 21v-2a4 4 0 0 0-4-4H6a4 4 0 0 0-4 4v2" /><circle cx="9" cy="7" r="4" /><path d="M22 21v-2a4 4 0 0 0-3-3.87" /><path d="M16 3.13a4 4 0 0 1 0 7.75" /></svg>
);
const IconBook = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M4 19.5v-15A2.5 2.5 0 0 1 6.5 2H20v20H6.5a2.5 2.5 0 0 1 0-5H20" /></svg>
);
const IconHeart = () => (
  <svg width="22" height="22" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M19 14c1.49-1.46 3-3.21 3-5.5A5.5 5.5 0 0 0 16.5 3c-1.76 0-3 .5-4.5 2-1.5-1.5-2.74-2-4.5-2A5.5 5.5 0 0 0 2 8.5c0 2.3 1.5 4.05 3 5.5l7 7Z" /></svg>
);
const ImagePlaceholder = () => (
  <div className={styles.imagePlaceholder}>
    <svg width="32" height="32" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="1.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
      <rect x="3" y="3" width="18" height="18" rx="2" ry="2" /><circle cx="9" cy="9" r="2" /><path d="m21 15-3.086-3.086a2 2 0 0 0-2.828 0L6 21" />
    </svg>
    <span>Photo coming soon</span>
  </div>
);

type RoleEntry = {
  role: string;
  org: string;
  date?: string;
  dates?: string[];
  points: string[];
  image?: string;
  certificate?: string;
  placeholder?: boolean;
};

function RoleCard({ entry }: { entry: RoleEntry }) {
  const handleMouseMove = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    const rect = card.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    card.style.setProperty("--mouse-x", `${x}px`);
    card.style.setProperty("--mouse-y", `${y}px`);

    const xc = rect.width / 2;
    const yc = rect.height / 2;
    const rotateX = (yc - y) / 35;
    const rotateY = (x - xc) / 35;
    
    card.style.setProperty("--rotate-x", `${rotateX}deg`);
    card.style.setProperty("--rotate-y", `${rotateY}deg`);
  }, []);

  const handleMouseLeave = useCallback((e: React.MouseEvent<HTMLDivElement>) => {
    const card = e.currentTarget;
    card.style.setProperty("--rotate-x", "0deg");
    card.style.setProperty("--rotate-y", "0deg");
  }, []);

  return (
    <div
      className={styles.roleCard}
      onMouseMove={handleMouseMove}
      onMouseLeave={handleMouseLeave}
    >
      {entry.image ? (
        <Image
          src={entry.image}
          alt={entry.role}
          width={600}
          height={338}
          className={styles.cardImage}
        />
      ) : entry.placeholder ? (
        <ImagePlaceholder />
      ) : null}
      <div className={styles.roleContent}>
        <div className={styles.roleHeader}>
          <h3 className={styles.roleName}>{entry.role}</h3>
          {entry.dates ? (
            <div className={styles.roleDatesList}>
              {entry.dates.map((d, index) => (
                <span key={index} className={styles.roleDate}>
                  {d}
                  {index === 0 && entry.certificate && (
                    <a href={entry.certificate} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                      [View Certificate ↗]
                    </a>
                  )}
                </span>
              ))}
            </div>
          ) : (
            <span className={styles.roleDate}>
              {entry.date}
              {entry.certificate && (
                <a href={entry.certificate} target="_blank" rel="noopener noreferrer" className={styles.certLink}>
                  [View Certificate ↗]
                </a>
              )}
            </span>
          )}
        </div>
        <p className={styles.roleOrg}>{entry.org}</p>
        <ul className={styles.rolePoints}>
          {entry.points.map((point, i) => (
            <li key={i}>{point}</li>
          ))}
        </ul>
      </div>
    </div>
  );
}

export default function LeadershipPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Leadership &amp; Volunteering</h1>
          <p className={styles.subtitle}>
            Building communities, organizing initiatives, and empowering the next generation
            of engineers across Ghana and the IEEE global network.
          </p>
        </header>

        {/* Awards */}
        <section className={styles.section} id="awards">
          <div className={styles.categoryHeader}>
            <div className={styles.categoryIcon}><IconMedal /></div>
            <h2 className={styles.categoryTitle}>Awards &amp; Scholarships</h2>
          </div>
          <div className={styles.awardsGrid}>
            {awards.map((award) => (
              <div key={award.title} className={styles.awardCard}>
                <div className={styles.awardIcon}><IconMedal /></div>
                <div>
                  <h3 className={styles.awardTitle}>{award.title}</h3>
                  <p className={styles.awardOrg}>{award.org}</p>
                  <p className={styles.awardDate}>{award.date}</p>
                </div>
              </div>
            ))}
          </div>
        </section>

        {/* IEEE Leadership */}
        <section className={styles.section} id="ieee">
          <div className={styles.categoryHeader}>
            <div className={styles.categoryIconAccent}><IconBolt /></div>
            <h2 className={styles.categoryTitle}>IEEE Leadership</h2>
          </div>
          <div className={styles.rolesGrid}>
            {ieeeRoles.map((entry, i) => (
              <RoleCard key={i} entry={entry} />
            ))}
          </div>
        </section>

        {/* Student Clubs & Associations */}
        <section className={styles.section} id="student-clubs">
          <div className={styles.categoryHeader}>
            <div className={styles.categoryIconAccent}><IconUsers /></div>
            <h2 className={styles.categoryTitle}>Student Clubs and Associations</h2>
          </div>
          <div className={styles.rolesGrid}>
            {studentClubs.map((entry, i) => (
              <RoleCard key={i} entry={entry} />
            ))}
          </div>
        </section>

        {/* Teaching & Mentoring */}
        <section className={styles.section} id="teaching">
          <div className={styles.categoryHeader}>
            <div className={styles.categoryIconAccent}><IconBook /></div>
            <h2 className={styles.categoryTitle}>Teaching &amp; Mentoring</h2>
          </div>
          <div className={styles.rolesGrid}>
            {teaching.map((entry, i) => (
              <RoleCard key={i} entry={entry} />
            ))}
          </div>
        </section>

        {/* Community Service */}
        <section className={styles.section} id="community">
          <div className={styles.categoryHeader}>
            <div className={styles.categoryIconAccent}><IconHeart /></div>
            <h2 className={styles.categoryTitle}>Community Service</h2>
          </div>
          <div className={styles.rolesGrid}>
            {community.map((entry, i) => (
              <RoleCard key={i} entry={entry} />
            ))}
          </div>
        </section>
      </div>
    </div>
  );
}
