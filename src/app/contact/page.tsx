import type { Metadata } from "next";
import styles from "./page.module.css";

export const metadata: Metadata = {
  title: "Contact",
  description:
    "Get in touch with Prince Baah-Mensah for research collaborations, internships, or speaking opportunities.",
};

export default function ContactPage() {
  return (
    <div className={styles.page}>
      <div className="container">
        <header className={styles.header}>
          <h1 className={styles.title}>Get in Touch</h1>
          <p className={styles.subtitle}>
            Have a project idea, research collaboration, or just want to say hello?
            I&apos;d love to hear from you.
          </p>
        </header>

        <div className={styles.grid}>
          {/* Contact Form */}
          <form
            className={styles.form}
            action="https://formspree.io/f/PLACEHOLDER"
            method="POST"
            id="contact-form"
          >
            <div className={styles.formRow}>
              <div className={styles.formGroup}>
                <label htmlFor="contact-name" className={styles.label}>Name</label>
                <input
                  type="text"
                  id="contact-name"
                  name="name"
                  required
                  className={styles.input}
                  placeholder="Your name"
                />
              </div>
              <div className={styles.formGroup}>
                <label htmlFor="contact-email" className={styles.label}>Email</label>
                <input
                  type="email"
                  id="contact-email"
                  name="email"
                  required
                  className={styles.input}
                  placeholder="your@email.com"
                />
              </div>
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contact-subject" className={styles.label}>Subject</label>
              <input
                type="text"
                id="contact-subject"
                name="subject"
                required
                className={styles.input}
                placeholder="Research collaboration, Internship, etc."
              />
            </div>
            <div className={styles.formGroup}>
              <label htmlFor="contact-message" className={styles.label}>Message</label>
              <textarea
                id="contact-message"
                name="message"
                required
                rows={6}
                className={styles.textarea}
                placeholder="Tell me about your project or idea..."
              />
            </div>
            <button type="submit" className={`btn btn-primary ${styles.submitBtn}`} id="contact-submit">
              Send Message
              <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
              </svg>
            </button>
          </form>

          {/* Info Panel */}
          <aside className={styles.info}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Contact Info</h2>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <div className={styles.infoEmails}>
                  <a href="mailto:prince.baah@ashesi.edu.gh" className={styles.infoLink}>
                    prince.baah@ashesi.edu.gh
                  </a>
                  <a href="mailto:princemensah915@gmail.com" className={styles.infoLink}>
                    princemensah915@gmail.com
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><path d="M20 10c0 6-8 12-8 12s-8-6-8-12a8 8 0 0 1 16 0Z" /><circle cx="12" cy="10" r="3" /></svg>
                </div>
                <span>Ashesi University, Berekuso, Ghana</span>
              </div>

              <div className={styles.socials}>
                <a
                  href="https://github.com/princebaah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  id="contact-github"
                  aria-label="GitHub"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M12 0C5.374 0 0 5.373 0 12c0 5.302 3.438 9.8 8.207 11.387.599.111.793-.261.793-.577v-2.234c-3.338.726-4.033-1.416-4.033-1.416-.546-1.387-1.333-1.756-1.333-1.756-1.089-.745.083-.729.083-.729 1.205.084 1.839 1.237 1.839 1.237 1.07 1.834 2.807 1.304 3.492.997.107-.775.418-1.305.762-1.604-2.665-.305-5.467-1.334-5.467-5.931 0-1.311.469-2.381 1.236-3.221-.124-.303-.535-1.524.117-3.176 0 0 1.008-.322 3.301 1.23A11.509 11.509 0 0 1 12 5.803c1.02.005 2.047.138 3.006.404 2.291-1.552 3.297-1.23 3.297-1.23.653 1.653.242 2.874.118 3.176.77.84 1.235 1.911 1.235 3.221 0 4.609-2.807 5.624-5.479 5.921.43.372.823 1.102.823 2.222v3.293c0 .319.192.694.801.576C20.566 21.797 24 17.3 24 12c0-6.627-5.373-12-12-12z" />
                  </svg>
                  <span>GitHub</span>
                </a>
                <a
                  href="https://linkedin.com/in/princebaah-mensah"
                  target="_blank"
                  rel="noopener noreferrer"
                  className={styles.socialLink}
                  id="contact-linkedin"
                  aria-label="LinkedIn"
                >
                  <svg width="20" height="20" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true">
                    <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 0 1-2.063-2.065 2.064 2.064 0 1 1 2.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                  </svg>
                  <span>LinkedIn</span>
                </a>
              </div>
            </div>

            <div className={styles.availabilityCard}>
              <div className={styles.availHeader}>
                <div className={styles.availDot} />
                <h3 className={styles.availTitle}>Currently Open To</h3>
              </div>
              <ul className={styles.availList}>
                <li>Research Collaborations</li>
                <li>Internship Opportunities</li>
                <li>Speaking Engagements</li>
                <li>Open Source Projects</li>
              </ul>
            </div>
          </aside>
        </div>
      </div>
    </div>
  );
}
