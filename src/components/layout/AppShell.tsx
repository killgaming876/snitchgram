"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { Bell, Compass, Home, MessageCircle, Plus, Search, UserRound, Volume2, VolumeX } from "lucide-react";
import { useUIStore } from "@/lib/store";

const items = [
  ["home", "/home", Home], ["explore", "/explore", Compass], ["search", "/search", Search],
  ["create", "/create", Plus], ["messages", "/messages", MessageCircle], ["notifications", "/notifications", Bell], ["profile", "/profile/demo", UserRound]
] as const;

export function AppShell({ children }: { children: React.ReactNode }) {
  const pathname = usePathname();
  const { audioEnabled, toggleAudio } = useUIStore();
  const isLanding = pathname === "/";
  return (
    <div className="app-root">
      {!isLanding && <nav className="topbar glass">
        <Link href="/" className="brand"><span className="brand-mark">S</span><span>SNITCH<span>GRAM</span></span></Link>
        <div className="desktop-nav">{items.map(([key, href, Icon]) => <Link key={key} href={href} className={pathname.startsWith(href) ? "nav-link active" : "nav-link"}><Icon size={17}/><span>{key}</span></Link>)}</div>
        <button className="icon-button" onClick={toggleAudio} aria-label="Toggle sound">{audioEnabled ? <Volume2 size={18}/> : <VolumeX size={18}/>}</button>
      </nav>}
      <main>{children}</main>
      {!isLanding && <div className="mobile-nav glass">{items.slice(0, 6).map(([key, href, Icon]) => <Link key={key} href={href} className={pathname.startsWith(href) ? "active" : ""}><Icon size={20}/><span>{key}</span></Link>)}</div>}
    </div>
  );
}
