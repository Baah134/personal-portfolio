import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Work Experience",
  description:
    "Prince Baah-Mensah's professional experience in engineering, research, and technology.",
};

export default function ExperienceLayout({ children }: { children: React.ReactNode }) {
  return children;
}
