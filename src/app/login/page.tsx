"use client";

import Link from "next/link";
import { useState } from "react";
import { ArrowRight, LockKeyhole } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

export default function LoginPage() {
  const [email,setEmail]=useState(""); const [password,setPassword]=useState(""); const [error,setError]=useState(""); const [busy,setBusy]=useState(false);
  async function submit(e:React.FormEvent){e.preventDefault();setBusy(true);setError("");const {error:authError}=await createClient().auth.signInWithPassword({email,password});if(authError){setError(authError.message);setBusy(false);return}window.location.href="/home";}
  return <div className="auth-shell"><section className="auth-visual"><div className="auth-orb"/><span className="snap-eyebrow">SNITCHGRAM / LOGIN</span><h1>Back to the<br/><span style={{color:'#fffc00'}}>good stuff.</span></h1><p>Your feed, stories, communities and conversations are waiting. One identity. Every part of the world connected.</p></section><section className="auth-panel"><form className="auth-card" onSubmit={submit}><div className="auth-brand"><i><LockKeyhole size={18}/></i><span>SNITCHGRAM</span></div><div style={{marginTop:26}}><div className="snap-eyebrow">SECURE ACCESS</div><h2>Welcome back.</h2><p className="sub">Sign in to your real account.</p></div><label>Email<input required type="email" value={email} onChange={e=>setEmail(e.target.value)} placeholder="you@example.com" autoComplete="email"/></label><label style={{display:'block',marginTop:14}}>Password<input required type="password" value={password} onChange={e=>setPassword(e.target.value)} placeholder="Your password" autoComplete="current-password"/></label>{error&&<p style={{color:'#ff7c7c',fontSize:11,marginTop:12}}>{error}</p>}<button className="btn btn-primary" disabled={busy} style={{width:'100%',marginTop:18,display:'flex',justifyContent:'center',alignItems:'center',gap:8}}>{busy?'Signing in…':<>Enter SnitchGram <ArrowRight size={16}/></>}</button><p className="auth-footer">New here? <Link href="/register">Create an account</Link></p></form></section></div>;
}
