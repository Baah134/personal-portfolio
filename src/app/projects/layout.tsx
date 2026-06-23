import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Projects",
  description:
    "Technical projects by Prince Baah-Mensah spanning IoT, AI/ML, embedded systems, and robotics.",
};

export default function ProjectsLayout({ children }: { children: React.ReactNode }) {
  return children;
}
