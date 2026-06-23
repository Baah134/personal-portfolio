import type { Metadata, Viewport } from 'next';
import { inter, oswald } from './fonts';
import Navbar from '@/components/layout/Navbar';
import Footer from '@/components/layout/Footer';
import './globals.css';

export const metadata: Metadata = {
  title: {
    default: 'Prince Baah-Mensah | Electrical Engineer & Researcher',
    template: '%s | Prince Baah-Mensah',
  },
  description:
    'Portfolio of Prince Baah-Mensah — Electrical & Electronics Engineering student at Ashesi University. Building intelligent systems at the intersection of hardware, embedded systems, and machine learning. IEEE MYOSA Finalist, Kufuor Scholar, and published researcher.',
  keywords: [
    'Prince Baah-Mensah',
    'Electrical Engineer',
    'Machine Learning',
    'Embedded Systems',
    'Ashesi University',
    'IEEE',
    'Robotics',
    'AI',
    'Portfolio',
  ],
  authors: [{ name: 'Prince Baah-Mensah' }],
  creator: 'Prince Baah-Mensah',
  metadataBase: new URL('https://princebaah.vercel.app'),
  openGraph: {
    type: 'website',
    locale: 'en_US',
    title: 'Prince Baah-Mensah | Electrical Engineer & Researcher',
    description:
      'Building intelligent systems at the intersection of hardware, embedded systems, and machine learning.',
    siteName: 'Prince Baah-Mensah',
  },
  twitter: {
    card: 'summary_large_image',
    title: 'Prince Baah-Mensah | Electrical Engineer & Researcher',
    description:
      'Building intelligent systems at the intersection of hardware, embedded systems, and machine learning.',
  },
  robots: {
    index: true,
    follow: true,
  },
};

export const viewport: Viewport = {
  themeColor: '#ffffff',
  width: 'device-width',
  initialScale: 1,
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  return (
    <html lang="en" className={`${inter.variable} ${oswald.variable}`}>
      <head>
        <script
          dangerouslySetInnerHTML={{
            __html: `
              (function() {
                var theme = localStorage.getItem('theme');
                if (!theme) {
                  theme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
                }
                if (theme === 'dark') {
                  document.documentElement.setAttribute('data-theme', 'dark');
                } else {
                  document.documentElement.removeAttribute('data-theme');
                }
              })();
            `,
          }}
        />
      </head>
      <body>
        <Navbar />
        <main id="main-content">{children}</main>
        <Footer />
      </body>
    </html>
  );
}
