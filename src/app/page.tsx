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

  // 1. MATLAB (Devicon original vector)
  if (normalized === 'matlab') {
    return (
      <svg className={styles.skillSvg} viewBox="0 0 128 128" width="32" height="32" xmlns="http://www.w3.org/2000/svg">
        <defs>
          <linearGradient id="matlab-original-a" gradientUnits="userSpaceOnUse" x1="16.803" y1="16.631" x2="15.013" y2="22.411" gradientTransform="matrix(4 0 0 -4 0 128)">
            <stop offset="0" stopColor="#512"/>
            <stop offset=".23" stopColor="#523"/>
            <stop offset=".36" stopColor="#534"/>
            <stop offset=".51" stopColor="#645"/>
            <stop offset=".66" stopColor="#568"/>
            <stop offset=".84" stopColor="#29d"/>
          </linearGradient>
          <linearGradient id="matlab-original-b" gradientUnits="userSpaceOnUse" x1="29.71" y1="18.983" x2="11.71" y2="14.563" gradientTransform="scale(4)">
            <stop offset=".081" stopColor="#c33"/>
            <stop offset=".189" stopColor="#de5239"/>
            <stop offset=".313" stopColor="#f06e3e"/>
            <stop offset=".421" stopColor="#fa8042"/>
            <stop offset=".5" stopColor="#fe8643"/>
            <stop offset=".58" stopColor="#fa7f42"/>
            <stop offset=".696" stopColor="#ef6c3e"/>
            <stop offset=".833" stopColor="#dc4c37"/>
            <stop offset=".916" stopColor="#cf3633"/>
          </linearGradient>
        </defs>
        <path d="M8 70.2l31.879-12.88a82.62 82.62 0 0110.883-11.8c2.636-1.399 7.597-.641 16.68-11.918 8.796-11 11.597-20.403 15.718-20.403 6.52 0 11.32 14.082 18.602 35.403A461.75 461.75 0 00120 96.48c-7.602-7.082-14.078-14.718-21.48-14.52-6.88.161-14.52 8.321-22.88 18.802C69 109.16 60.2 114.922 56.763 114.8c0 0-8.883-25.121-16.32-29.2a10.563 10.563 0 00-9.563.797L8 70.16zm0 0" fill="#49d"/>
        <path d="M79.2 16.078c-2.68 3.602-5.92 10.203-11.76 17.524-9.082 11.277-14 10.52-16.68 11.918a78.673 78.673 0 00-10.882 11.8l13.2 9.64C64.28 51.68 70.28 35.122 74.96 24.399a54.649 54.649 0 014.238-8.32zm0 0" fill="url(#matlab-original-a)"/>
        <path d="M83.2 13.2c-8.72 0-14.68 45.921-46.88 71.562 9.04-1.48 16.88 20.957 20.48 30.039 16-2.723 28.802-33.32 41.72-32.84 7.402.277 13.878 7.437 21.48 14.52C102.64 60 94.52 13.198 83.2 13.198zm0 0" fill="url(#matlab-original-b)"/>
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

  // 7. TensorFlow (Official brand path)
  if (normalized === 'tensorflow') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="#ff6f00" aria-hidden="true">
        <path d="M1.292 5.856L11.54 0v24l-4.095-2.378V7.603l-6.168 3.564.015-5.31zm21.43 5.311l-.014-5.31L12.46 0v24l4.095-2.378V14.87l3.092 1.788-.018-4.618-3.074-1.756V7.603l6.168 3.564z" />
      </svg>
    );
  }

  // 8. PyTorch (Official brand path)
  if (normalized === 'pytorch') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="#ee4c2c" aria-hidden="true">
        <path d="M12.005 0L4.952 7.053a9.865 9.865 0 000 14.022 9.866 9.866 0 0014.022 0c3.984-3.9 3.986-10.205.085-14.023l-1.744 1.743c2.904 2.905 2.904 7.634 0 10.538s-7.634 2.904-10.538 0-2.904-7.634 0-10.538l4.647-4.646.582-.665zm3.568 3.899a1.327 1.327 0 00-1.327 1.327 1.327 1.327 0 001.327 1.328A1.327 1.327 0 0016.9 5.226 1.327 1.327 0 0015.573 3.9z" />
      </svg>
    );
  }

  // 9. Python (Official dual snake)
  if (normalized === 'python') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="currentColor" aria-hidden="true">
        <path d="M11.93 2C6.88 2 7.15 4.18 7.15 4.18L7.17 6.4H12V7.07H5.1C5.1 7.07 2 7.37 2 12.38C2 17.39 4.67 17.15 4.67 17.15H6.28V14.9C6.28 14.9 6.09 11.96 11.23 11.96H16.03V7.07C16.03 7.07 16.42 2 11.93 2ZM9.03 4.17C9.53 4.17 9.93 4.57 9.93 5.07C9.93 5.57 9.53 5.97 9.03 5.97C8.53 5.97 8.13 5.57 8.13 5.07C8.13 4.57 8.53 4.17 9.03 4.17Z" fill="#3776ab"/>
        <path d="M12.07 22C17.12 22 16.85 19.82 16.85 19.82L16.83 17.6H12V16.93H18.9C18.9 16.93 22 16.63 22 11.62C22 6.61 19.33 6.85 19.33 6.85H17.72V9.1C17.72 9.1 17.91 12.04 12.77 12.04H7.97V16.93C7.97 16.93 7.58 22 12.07 22ZM14.97 19.83C14.47 19.83 14.07 18.93C14.07 18.43 14.47 18.03 14.97 18.03C15.47 18.03 15.87 18.43 15.87 18.93C15.87 19.43 15.47 19.83 14.97 19.83Z" fill="#ffd343"/>
      </svg>
    );
  }

  // 10. C/C++ (Official brand path)
  if (normalized === 'c/c++') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="#00599c" aria-hidden="true">
        <path d="M22.394 6c-.167-.29-.398-.543-.652-.69L12.926.22c-.509-.294-1.34-.294-1.848 0L2.26 5.31c-.508.293-.923 1.013-.923 1.6v10.18c0 .294.104.62.271.91.167.29.398.543.652.69l8.816 5.09c.508.293 1.34.293 1.848 0l8.816-5.09c.254-.147.485-.4.652-.69.167-.29.27-.616.27-.91V6.91c.003-.294-.1-.62-.268-.91zM12 19.11c-3.92 0-7.109-3.19-7.109-7.11 0-3.92 3.19-7.11 7.11-7.11a7.133 7.133 0 016.156 3.553l-3.076 1.78a3.567 3.567 0 00-3.08-1.78A3.56 3.56 0 008.444 12 3.56 3.56 0 0012 15.555a3.57 3.57 0 003.08-1.778l3.078 1.78A7.135 7.135 0 0112 19.11zm7.11-6.715h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79zm2.962 0h-.79v.79h-.79v-.79h-.79v-.79h.79v-.79h.79v.79h.79z" />
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

  // 12. Eagle / KiCad (Official KiCad brand path)
  if (normalized === 'eagle / kicad') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="#145a94" aria-hidden="true">
        <path d="M7.4668 7.3039c-.472.0238-.8477.4142-.8477.8906 0 .4918.3994.8906.8926.8906.4933 0 .8926-.3988.8926-.8906 0-.4918-.3993-.8906-.8926-.8906-.0154 0-.0297-.0008-.0449 0zM.25 8.0109c-.1394 0-.25.1214-.25.254v8.1777c0 .1325.1106.2539.25.2539h8.5215c.1394 0 .248-.1214.248-.254V8.2649c0-.1327-.1083-.2539-.248-.2539h-.2598c.011.0595.0176.121.0176.1836 0 .0605-.0054.1201-.0156.1777h.1445v7.963H.3613v-7.963h6.1485a1.0179 1.0179 0 0 1-.0157-.1777c0-.0628.0066-.1238.0176-.1836zm.2617.5117v7.664h7.9961v-7.664h-.0332a1.025 1.025 0 0 1-.4883.5703.8482.8482 0 0 1-.4746.1426.8483.8483 0 0 1-.4746-.1426 1.025 1.025 0 0 1-.4883-.5703zm21.5606.252c.0966.1084.1562.2266.1797.3555.0116.0615.0175.1992.0175.4101v1.664c-.2753-.2606-.6554-.3906-1.1386-.3906-.3662 0-.6896.1007-.9707.3028-.5946.4276-.8926 1.2249-.8926 2.3906 0 .3515.0469.67.1406.957.1347.41.3487.7335.6387.9707.3075.252.669.379 1.0879.379.495 0 .9034-.1574 1.2226-.4708v.373H24c-.1347-.1492-.2012-.4072-.2012-.7733v-6.168Zm-9.6328.2988c-.785 0-1.463.2873-2.0372.8613-.6209.621-.9316 1.4593-.9316 2.5137 0 .9402.253 1.7238.7598 2.3535.5447.6795 1.2746 1.0196 2.1914 1.0196.577 0 1.0987-.131 1.5644-.3946.2636-.1494.414-.22.4492-.211l-.7304-1.1952c-.3456.3807-.7404.5703-1.1856.5703-.249 0-.4834-.0782-.703-.2363-.4717-.3398-.7071-.9749-.7071-1.9063 0-.328.0322-.628.0996-.9004.205-.8318.6447-1.248 1.3183-1.248.4306 0 .7755.1641 1.0332.4922l.7872-1.1426c-.085-.009-.1964-.0508-.334-.127-.536-.2987-1.0617-.4492-1.5742-.4492zM.5605 9.175H2.625c-.164.164-.2461.4474-.246.8515v1.6133l1.2616-1.5957c.2578-.325.3867-.5674.3867-.7285 0-.0585-.0088-.1054-.0234-.1406h2.2012c-.167.0937-.375.2901-.627.5918-.0673.079-.1856.2247-.3554.4355L3.5703 12.259l1.9727 2.7148c.12.164.2725.3497.457.5547.0498.0527.1211.1144.2148.1875H3.957a.7156.7156 0 0 0 .0254-.1797c0-.1611-.1114-.3946-.334-.6992L2.379 13.1066v1.754c0 .407.082.6914.2461.8554H.5605c.1143-.1142.1866-.2442.2188-.3906.0175-.082.0273-.2355.0273-.461v-4.8379c0-.2255-.0098-.3789-.0273-.4609-.0322-.1464-.1045-.2764-.2188-.3906zm16.2032 1.6386c-.2373 0-.4561.0195-.6582.0605l-.5977.1504c-.2812.0703-.4717.1055-.5683.1055l.4355 1.0488c.41-.2167.8019-.3242 1.1738-.3242.4364 0 .6543.2511.6543.752-.2167-.0116-.3691-.0176-.457-.0176-.618 0-1.0987.083-1.4414.25-.5946.29-.8906.7384-.8906 1.3476 0 .2666.0469.506.1406.7168.1318.2959.3409.5244.6308.6856.2754.1522.5831.2276.92.2246.4745-.006.8623-.1632 1.164-.4707v.373h1.6387c-.0996-.1083-.1621-.2276-.1855-.3594-.0117-.0644-.0176-.2031-.0176-.414V12.794c0-.4305-.0587-.791-.1758-1.084-.2402-.5974-.8284-.8964-1.7656-.8964zm-10.211.0957h1.7266v4.0332c0 .211.0059.3497.0176.4141.0234.1318.086.251.1855.3594H6.5488c.0996-.1083.1602-.2276.1836-.3594.0117-.0644.0176-.2032.0176-.414V11.675c0-.2109-.0059-.3467-.0176-.4082-.0234-.1289-.083-.249-.1797-.3574zM21.623 11.929c.2373 0 .4532.082.6465.246v2.1934c-.2284.1845-.4668.2754-.7129.2754-.4715 0-.707-.4025-.707-1.211 0-1.0016.258-1.5038.7734-1.5038zm-4.793 1.6484c.123 0 .2403.009.3516.0293v.7617c-.1464.252-.38.377-.6992.377-.1728 0-.3154-.046-.4297-.1367-.126-.0996-.1894-.2315-.1894-.3985 0-.2226.1114-.3906.334-.502.1757-.0878.3867-.1308.6328-.1308z" />
      </svg>
    );
  }

  // 13. ESP32 (Official Espressif brand path)
  if (normalized === 'esp32') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="#e0123c" aria-hidden="true">
        <path d="M12.926 19.324a7.6 7.6 0 00-2.983-6.754 7.44 7.44 0 00-3.828-1.554.697.697 0 01-.606-.731.674.674 0 01.743-.617 8.97 8.97 0 018 9.805 7.828 7.828 0 01-.298 1.542l1.989.56a11.039 11.039 0 001.714-.651 12.159 12.159 0 00.217-2.343A12.57 12.57 0 007.212 6.171a5.53 5.53 0 00-2 0 4.354 4.354 0 00-2.1 1.254c-.696.657-1.129 1.517-1.229 2.457H.141A12.924 12.924 0 0012.927 22.8c.883 0 1.747-.089 2.583-.257l-.56-1.989a11.139 11.139 0 01-1.986.759 12.534 12.534 0 00-.038-2.289zm-5.714-7.24a5.556 5.556 0 012.871 1.163l1.411-1.411A7.472 7.472 0 007.212 10.5a7.279 7.279 0 00-1.786.223 2.584 2.584 0 01.905.743.682.682 0 01.123.367c0 .121-.035.234-.1.332A5.559 5.559 0 017.212 12.08zm4.305 4.305a5.525 5.525 0 01-1.163-2.871l-1.411 1.411a7.472 7.472 0 001.336 4.282 7.279 7.279 0 001.786-.223 2.584 2.584 0 01-.905-.743.682.682 0 01-.123-.367c0-.122.035-.235.1-.333a5.526 5.526 0 01.38-.956zM12.926.141A12.923 12.923 0 00.141 12.927c0 .883.089 1.747.257 2.583l1.989-.56a11.139 11.139 0 01-.759-1.986 12.534 12.534 0 002.289-.038A7.6 7.6 0 0010.67 6.17a7.442 7.442 0 003.828 1.554.697.697 0 01.606.731.674.674 0 01-.743.617 8.97 8.97 0 01-8 9.805c0 .522.1 1.037.298 1.542l-1.989-.56a11.039 11.039 0 00-1.714.651 12.159 12.159 0 00-.217 2.343c6.046.223 11.238-3.989 12.228-9.805a5.53 5.53 0 002 0 4.354 4.354 0 002.1-1.254c.696-.657 1.129-1.517 1.229-2.457h1.743A12.924 12.924 0 0012.927.14zm5.714 7.24a5.556 5.556 0 01-2.871-1.163l-1.411 1.411A7.472 7.472 0 0018.641 9a7.279 7.279 0 001.786-.223 2.584 2.584 0 01-.905-.743.682.682 0 01-.123-.367c0-.121.035-.234.1-.332a5.559 5.559 0 01-.859-.206zm-4.305-4.305a5.525 5.525 0 011.163 2.871l1.411-1.411A7.472 7.472 0 0015.573 1.3a7.279 7.279 0 00-1.786.223 2.584 2.584 0 01.905.743.682.682 0 01.123.367c0 .122-.035.235-.1.333a5.526 5.526 0 01-.38.956z" />
      </svg>
    );
  }

  // 14. Arduino (Official brand path)
  if (normalized === 'arduino') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="#00979d" aria-hidden="true">
        <path d="M18.087 6.146c-.3 0-.607.017-.907.069-2.532.367-4.23 2.239-5.18 3.674-.95-1.435-2.648-3.307-5.18-3.674a6.49 6.49 0 0 0-.907-.069C2.648 6.146 0 8.77 0 12s2.656 5.854 5.913 5.854c.3 0 .607-.017.916-.069 2.531-.376 4.23-2.247 5.18-3.683.949 1.436 2.647 3.307 5.18 3.683.299.043.607.069.915.069C21.344 17.854 24 15.23 24 12s-2.656-5.854-5.913-5.854zM6.53 15.734a3.837 3.837 0 0 1-.625.043c-2.148 0-3.889-1.7-3.889-3.777 0-2.085 1.749-3.777 3.898-3.777.208 0 .416.017.624.043 2.39.35 3.847 2.768 4.347 3.734-.508.974-1.974 3.384-4.355 3.734zm11.558.043c-.208 0-.416-.017-.624-.043-2.39-.35-3.856-2.768-4.347-3.734.491-.966 1.957-3.384 4.347-3.734.208-.026.416-.043.624-.043 2.149 0 3.89 1.7 3.89 3.777 0 2.085-1.75 3.777-3.89 3.777zm1.65-4.404v1.134h-1.205v1.182h-1.156v-1.182H16.17v-1.134h1.206V10.19h1.156v1.183h1.206zM4.246 12.498H7.82v-1.125H4.245v1.125z" />
      </svg>
    );
  }

  // 15. SolidWorks (Official Dassault Systèmes brand path)
  if (normalized === 'solidworks') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="#00538a" aria-hidden="true">
        <path d="M21.1854 8.0254c1.064.192 1.9321.34 2.1311.79.223.51-.936.541-1.52.552-2.7992.054-4.4862.11-4.5712 1.061-.11 1.2241 1.196 2.4572 2.486 4.1852 1.1781 1.577 2.5172 3.1351 2.1322 4.5862-.482 1.809-2.6991 2.192-4.8102 2.192-2.0211.001-3.9382-.323-4.7432-.482-1.002-.199-.852-.694-.585-.853.298-.178 2.002-.182 3.187-.252.9751-.058 3.8052-.056 4.2463-.781.54-.889-.783-2.4081-2.0001-4.0002-1.519-1.984-3.1862-4.0341-2.3031-5.5322 1.14-1.936 4.4842-1.803 6.3502-1.466m-13.6905 2.95c1.772-.104 3.9261.206 5.1342 1.1301a2.172 2.172 0 01.78 2.2771c-.698 2.7521-3.3041 6.0833-9.0933 8.6434-1.8411.813-3.2892 1.125-3.5932.906-.326-.234.624-2.052.909-2.6541.9251-1.952 2.0791-3.8532 3.2052-5.5952.414-.64 1.055-1.7521 1.634-1.6621.519.08-.089 1.26-.488 2.011-.672 1.2601-2.523 4.7603-1.912 4.9693 1.35.462 7.6803-4.3542 6.7462-7.0363-.432-1.245-3.1801-1.363-4.9122-1.363-.787 0-2.508.186-2.603-.417-.102-.5561 2.613-1.1161 4.192-1.2101M11.8672.013c2.068-.098 4.5141.342 4.9702 1.8021.747 2.3901-3.0402 5.8772-6.3383 7.5873-.809.42-1.3.536-1.504.507-.195-.027-.225-.221-.162-.355.118-.252.65-.764 1.361-1.322 3.7151-2.9001 4.9232-5.0282 4.2212-5.8903-.45-.552-2.3321-.937-4.2872-.937-.53 0-1.925.123-2.068-.367C7.942.634 9.814.108 11.866.012" />
      </svg>
    );
  }

  // 16. Fusion 360 (Official Autodesk brand path)
  if (normalized === 'fusion 360') {
    return (
      <svg className={`${styles.skillSvg}`} viewBox="0 0 24 24" width="32" height="32" fill="#0696d7" aria-hidden="true">
        <path d="m.129 20.202 14.7-9.136h7.625c.235 0 .445.188.445.445 0 .21-.092.305-.21.375l-7.222 4.323c-.47.283-.633.845-.633 1.265l-.008 2.725H24V4.362a.561.561 0 0 0-.585-.562h-8.752L0 12.893V20.2h.129z" />
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
