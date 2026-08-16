import type { Metadata } from "next";
import "./globals.css";
import { AppShell } from "@/components/layout/AppShell";

export const metadata: Metadata = {
  title: "SnitchGram | Social, reimagined.",
  description: "A cinematic social network built for the next generation of the web.",
  openGraph: { title: "SnitchGram", description: "Social, reimagined.", type: "website" }
};

export default function RootLayout({ children }: Readonly<{ children: React.ReactNode }>) {
  return (
    <html lang="en">
      <body><AppShell>{children}</AppShell></body>
    </html>
  );
}
