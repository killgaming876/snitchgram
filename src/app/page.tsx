"use client";

import Link from "next/link";
import { motion } from "framer-motion";
import { ArrowRight, Camera, MessageCircle, Sparkles, Users } from "lucide-react";
import { SocialWorld } from "@/components/webgl/SocialWorld";

export default function LandingPage() {
  return <div className="landing">
    <SocialWorld/>
    <div className="landing-overlay"/>
    <header className="topbar glass">
      <Link href="/" className="brand"><span className="brand-mark"/><span>SNITCH<b>GRAM</b></span></Link>
      <div className="desktop-nav"><Link href="#world" className="nav-link">The world</Link><Link href="#features" className="nav-link">Features</Link></div>
      <Link href="/login" className="btn btn-ghost">Sign in</Link>
    </header>

    <main>
      <section className="hero">
        <motion.div className="hero-copy" initial={{opacity:0,y:45}} animate={{opacity:1,y:0}} transition={{duration:1.05,ease:[.16,1,.3,1]}}>
          <div className="eyebrow"><span className="dot"/> SNAP + INSTA + DISCORD</div>
          <h1>Social,<br/><em>but alive.</em></h1>
          <p>A social world built around real people, instant conversations, stories, posts and communities. Yellow energy on the surface. Serious product underneath.</p>
          <div className="ctas"><Link className="btn btn-primary" href="/register">Create your account <ArrowRight size={16}/></Link><Link className="btn btn-ghost" href="/explore">Explore <Sparkles size={15}/></Link></div>
        </motion.div>
        <motion.div className="hero-float-card card-one" animate={{y:[0,-18,0],rotate:[-4,0,-4]}} transition={{duration:5,repeat:Infinity,ease:'easeInOut'}}><Camera size={20}/><b>Stories</b><small>24h moments</small></motion.div>
        <motion.div className="hero-float-card card-two" animate={{y:[0,14,0],rotate:[4,0,4]}} transition={{duration:5.8,repeat:Infinity,ease:'easeInOut'}}><MessageCircle size={20}/><b>Messages</b><small>Realtime</small></motion.div>
        <motion.div className="hero-float-card card-three" animate={{y:[0,-10,0],x:[0,8,0]}} transition={{duration:4.6,repeat:Infinity,ease:'easeInOut'}}><Users size={20}/><b>Community</b><small>Real users</small></motion.div>
      </section>

      <section id="world" className="landing-section">
        <span className="snap-eyebrow">ONE WORLD</span><h2>One identity.<br/><em>Many ways to connect.</em></h2>
        <p>Stories for the moment. Posts for the feed. Discord-like conversations for the people who matter. Everything belongs to one account and one social graph.</p>
      </section>
      <section id="features" className="feature-strip">
        <article><Sparkles/><b>Interactive</b><span>3D depth, camera motion and responsive surfaces.</span></article>
        <article><Camera/><b>Visual first</b><span>Stories, reels and media stay at the center.</span></article>
        <article><MessageCircle/><b>Realtime</b><span>Fast messaging with delivery and presence architecture.</span></article>
      </section>
    </main>
  </div>;
}
