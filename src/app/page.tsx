"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { SocialWorld } from "@/components/webgl/SocialWorld";

export default function LandingPage() {
  return <div className="landing"><SocialWorld/><div className="landing-overlay"/>
    <header className="topbar glass">
      <Link href="/" className="brand"><span className="brand-mark">S</span><span>SNITCH<span>GRAM</span></span></Link>
      <div className="desktop-nav"><Link href="/explore" className="nav-link">Explore</Link><Link href="/about" className="nav-link">Manifesto</Link></div>
      <Link href="/login" className="btn btn-ghost" style={{padding:'9px 14px'}}>Sign in</Link>
    </header>
    <section className="hero">
      <motion.div className="hero-copy" initial={{opacity:0,y:30}} animate={{opacity:1,y:0}} transition={{duration:.9,ease:[.22,1,.36,1]}}>
        <div className="eyebrow"><span className="dot"/> a social world in motion</div>
        <h1>Social,<br/><em>reimagined.</em></h1>
        <p>SnitchGram turns connection into an interactive digital world. Share moments, discover people, and move through your social graph without losing the speed and clarity of a real product.</p>
        <div className="ctas"><Link className="btn btn-primary" href="/register">Enter SnitchGram ↗</Link><Link className="btn btn-ghost" href="/home">Explore the world</Link></div>
      </motion.div>
      <div className="hero-meta"><span>LIVE SYSTEM <strong>01</strong></span><span>WEBGL <strong>ON</strong></span><span>16.08.26</span></div>
    </section>
  </div>;
}
