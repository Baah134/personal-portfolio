import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Research & Publications",
  description:
    "Explore Prince Baah-Mensah's research in control systems, speech emotion recognition, and adaptive learning systems.",
};

export default function ResearchLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return <>{children}</>;
}
