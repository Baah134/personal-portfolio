import type { Metadata } from "next";

export const metadata: Metadata = {
  title: "Leadership & Volunteering",
  description:
    "Prince Baah-Mensah's leadership roles, scholarships, awards, and volunteering initiatives.",
};

export default function LeadershipLayout({ children }: { children: React.ReactNode }) {
  return children;
}
