'use client';

import { useState, useCallback } from "react";
import styles from "./page.module.css";

export default function ContactPage() {
  const [status, setStatus] = useState<'idle' | 'submitting' | 'success' | 'error'>('idle');
  const [errorMessage, setErrorMessage] = useState('');

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setStatus('submitting');
    setErrorMessage('');

    const form = e.currentTarget;
    const formData = new FormData(form);

    try {
      const endpoint = process.env.NEXT_PUBLIC_FORMSPREE_ENDPOINT || "https://formspree.io/princemensah915@gmail.com";
      const response = await fetch(endpoint, {
        method: "POST",
        body: formData,
        headers: {
          'Accept': 'application/json'
        }
      });

      if (response.ok) {
        setStatus('success');
        form.reset();
      } else {
        const data = await response.json();
        let msg = data.error || "Failed to send message. Please try again later.";
        if (msg.includes("not active") || msg.includes("Form not found") || msg.toLowerCase().includes("setup") || msg.toLowerCase().includes("set up")) {
          msg = "Formspree setup required: Submissions directly to raw email endpoints are deprecated. Please create a form in your Formspree dashboard, and configure the NEXT_PUBLIC_FORMSPREE_ENDPOINT environment variable with your new Formspree URL (e.g., https://formspree.io/f/your-form-id).";
        }
        setErrorMessage(msg);
        setStatus('error');
      }
    } catch (err) {
      setErrorMessage("Network error. Please check your internet connection and try again.");
      setStatus('error');
    }
  };

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
          {/* Contact Form Container */}
          <div className={styles.formContainer}>
            {status === 'success' ? (
              <div className={styles.successState}>
                <div className={styles.successIcon}>
                  <svg width="48" height="48" viewBox="0 0 24 24" fill="none" stroke="var(--color-success)" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                    <polyline points="20 6 9 17 4 12" />
                  </svg>
                </div>
                <h2 className={styles.successTitle}>Message Sent!</h2>
                <p className={styles.successDesc}>
                  Thank you for reaching out. Your message has been sent successfully to <strong>princemensah915@gmail.com</strong>.
                </p>
                <button onClick={() => setStatus('idle')} className="btn btn-outline">
                  Send Another Message
                </button>
              </div>
            ) : (
              <form
                className={styles.form}
                onSubmit={handleSubmit}
                id="contact-form"
              >
                {status === 'error' && (
                  <div className={styles.errorAlert}>
                    <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
                      <circle cx="12" cy="12" r="10" /><line x1="12" y1="8" x2="12" y2="12" /><line x1="12" y1="16" x2="12.01" y2="16" />
                    </svg>
                    <span>{errorMessage}</span>
                  </div>
                )}

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
                      disabled={status === 'submitting'}
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
                      disabled={status === 'submitting'}
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
                    disabled={status === 'submitting'}
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
                    disabled={status === 'submitting'}
                  />
                </div>
                <button 
                  type="submit" 
                  className={`btn btn-primary ${styles.submitBtn}`} 
                  id="contact-submit"
                  disabled={status === 'submitting'}
                >
                  {status === 'submitting' ? 'Sending Message...' : 'Send Message'}
                  <svg width="14" height="14" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2.5" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <line x1="22" y1="2" x2="11" y2="13" /><polygon points="22 2 15 22 11 13 2 9 22 2" />
                  </svg>
                </button>
              </form>
            )}
          </div>

          {/* Info Panel */}
          <aside className={styles.info}>
            <div className={styles.infoCard}>
              <h2 className={styles.infoTitle}>Contact Info</h2>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true"><rect x="2" y="4" width="20" height="16" rx="2" /><path d="m22 7-8.97 5.7a1.94 1.94 0 0 1-2.06 0L2 7" /></svg>
                </div>
                <div className={styles.infoEmails}>
                  <a href="mailto:princemensah915@gmail.com" className={styles.infoLink} style={{ display: 'flex', alignItems: 'center' }}>
                    {/* eslint-disable-next-line @next/next/no-img-element */}
                    <img src="https://cdn.simpleicons.org/gmail" alt="Gmail" className={styles.emailIcon} />
                    princemensah915@gmail.com <span className={styles.emailTag}>(Primary)</span>
                  </a>
                  <a href="mailto:prince.baah@ashesi.edu.gh" className={styles.infoLink} style={{ display: 'flex', alignItems: 'center' }}>
                    <svg xmlns="http://www.w3.org/2000/svg" id="mdi-microsoft-outlook" viewBox="0 0 24 24" className={styles.emailIcon} style={{ color: '#0078d4', fill: 'currentColor' }} width="16" height="16" aria-hidden="true">
                      <path d="M8.56 12.03Q8.56 12.41 8.5 12.76 8.39 13.1 8.2 13.38 8 13.65 7.71 13.81 7.41 13.97 7 13.97 6.58 13.97 6.29 13.8 6 13.63 5.81 13.35 5.62 13.07 5.54 12.72 5.45 12.37 5.45 12 5.45 11.64 5.54 11.28 5.62 10.93 5.81 10.65 6 10.37 6.31 10.2 6.61 10.03 7.03 10.03 7.46 10.03 7.75 10.2 8.05 10.38 8.23 10.66 8.41 10.95 8.5 11.3 8.56 11.66 8.56 12.03M22 12V19.81Q22 20.2 21.73 20.5 21.45 20.75 21.06 20.75H7.94Q7.55 20.75 7.27 20.5 7 20.2 7 19.81V17H2.83Q2.5 17 2.24 16.76 2 16.5 2 16.17V7.83Q2 7.5 2.24 7.24 2.5 7 2.83 7H8.25V4.13Q8.25 3.76 8.5 3.5 8.76 3.25 9.13 3.25H19.87Q20.24 3.25 20.5 3.5 20.75 3.76 20.75 4.13V11.04L21.79 11.64H21.8Q21.88 11.7 21.94 11.8 22 11.89 22 12M17 5.13V7.63H19.5V5.13M17 8.88V11.38H19.5V8.88M17 12.63V14.15L19.54 12.63M12.63 5.13V7.63H15.75V5.13M12.63 8.88V11.38H15.75V8.88M12.63 12.63V14.32L14.64 15.56L15.75 14.9V12.63M9.5 5.13V7H11.27Q11.33 7 11.38 7.04V5.12M7 15.32Q7.73 15.32 8.32 15.06 8.9 14.8 9.31 14.35 9.71 13.9 9.91 13.28 10.12 12.66 10.13 11.94 10.13 11.25 9.92 10.65 9.72 10.06 9.32 9.62 8.93 9.18 8.37 8.93 7.8 8.68 7.08 8.68 6.31 8.68 5.71 8.93 5.12 9.18 4.71 9.63 4.3 10.09 4.09 10.71 3.88 11.34 3.88 12.08 3.88 12.78 4.09 13.38 4.31 13.97 4.71 14.4 5.11 14.83 5.68 15.08 6.26 15.32 7 15.32M8.25 19.5H18.57L12 15.4V16.17Q12 16.5 11.76 16.76 11.5 17 11.17 17H8.25M20.75 19.39V13.36L15.83 16.31Z" />
                    </svg>
                    prince.baah@ashesi.edu.gh <span className={styles.emailTag}>(Secondary)</span>
                  </a>
                </div>
              </div>

              <div className={styles.infoItem}>
                <div className={styles.infoIcon}>
                  <svg width="18" height="18" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" aria-hidden="true">
                    <path d="M22 16.92v3a2 2 0 0 1-2.18 2 19.79 19.79 0 0 1-8.63-3.07 19.5 19.5 0 0 1-6-6 19.79 19.79 0 0 1-3.07-8.67A2 2 0 0 1 4.11 2h3a2 2 0 0 1 2 1.72 12.84 12.84 0 0 0 .7 2.81 2 2 0 0 1-.45 2.11L8.09 9.91a16 16 0 0 0 6 6l1.27-1.27a2 2 0 0 1 2.11-.45 12.84 12.84 0 0 0 2.81.7A2 2 0 0 1 22 16.92z" />
                  </svg>
                </div>
                <div className={styles.phoneDetails}>
                  <a href="tel:+233593420602" className={styles.infoLink}>
                    +233 593420602
                  </a>
                  <div className={styles.phoneTagsContainer}>
                    <span className={`${styles.phoneTag} ${styles.whatsappTag}`}>
                      <svg width="12" height="12" viewBox="0 0 24 24" fill="currentColor" aria-hidden="true" style={{ marginRight: '4px', verticalAlign: 'middle', display: 'inline-block' }}>
                        <path d="M17.472 14.382c-.297-.149-1.758-.867-2.03-.967-.273-.099-.471-.148-.67.15-.197.297-.767.966-.94 1.164-.173.199-.347.223-.644.075-.297-.15-1.255-.463-2.39-1.475-.883-.788-1.48-1.761-1.653-2.059-.173-.297-.018-.458.13-.606.134-.133.298-.347.446-.52.149-.174.198-.298.298-.497.099-.198.05-.371-.025-.52-.075-.149-.669-1.612-.916-2.207-.242-.579-.487-.5-.669-.51-.173-.008-.371-.01-.57-.01-.198 0-.52.074-.792.372-.272.297-1.04 1.016-1.04 2.479 0 1.462 1.065 2.875 1.213 3.074.149.198 2.096 3.2 5.077 4.487.709.306 1.262.489 1.694.625.712.227 1.36.195 1.871.118.571-.085 1.758-.719 2.006-1.413.248-.694.248-1.289.173-1.413-.074-.124-.272-.198-.57-.347m-5.421 7.403h-.004a9.87 9.87 0 01-5.031-1.378l-.361-.214-3.741.982.998-3.648-.235-.374a9.86 9.86 0 01-1.51-5.26c.001-5.45 4.436-9.884 9.888-9.884 2.64 0 5.122 1.03 6.988 2.898a9.825 9.825 0 012.893 6.994c-.003 5.45-4.437 9.884-9.885 9.884m8.413-18.297A11.815 11.815 0 0012.05 0C5.495 0 .16 5.335.157 11.892c0 2.096.547 4.142 1.588 5.945L0 24l6.335-1.662c1.746.953 3.71 1.458 5.704 1.459h.005c6.554 0 11.89-5.335 11.893-11.893a11.821 11.821 0 00-3.48-8.413z" />
                      </svg>
                      WhatsApp
                    </span>
                    <span className={`${styles.phoneTag} ${styles.callTag}`}>
                      Voice Call
                    </span>
                  </div>
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
                  href="https://github.com/Baah134"
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
                  href="https://linkedin.com/in/prince-baah-mensah"
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
