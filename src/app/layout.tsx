import type { Metadata } from "next";
import "./globals.css";
import "./snitchgram-overrides.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "SnitchGram | Social, but alive.",
  description: "Snap energy, Instagram media, Discord-like conversations, reimagined as one social world.",
  openGraph: { title: "SnitchGram", description: "Social, but alive.", type: "website" },
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return <html lang="en"><body><AppShell>{children}</AppShell></body></html>;
}
