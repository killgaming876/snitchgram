"use client";
import { Heart, MessageCircle, Send, Bookmark, MoreHorizontal } from "lucide-react";
import { useState } from "react";

const people = ["maya", "zane", "ria", "noah", "kira", "dev", "luna"];

export function Stories(){return <div className="story-row">{people.map((p,i)=><div className="story" key={p}><div className="story-ring"><div>{p[0].toUpperCase()}</div></div>{p}</div>)}</div>}

export function Post({name="maya", index=0}:{name?:string;index?:number}){
 const [liked,setLiked]=useState(false); const [saved,setSaved]=useState(false);
 return <article className="post"><div className="post-head"><div className="avatar">{name[0].toUpperCase()}</div><div><b>{name}</b><small>{index?"24 min ago":"2 min ago"}</small></div><MoreHorizontal size={17} style={{marginLeft:'auto',color:'#666'}}/></div><div className="media"/><div className="post-actions"><button onClick={()=>setLiked(!liked)} aria-label="Like"><Heart size={20} fill={liked?'#ffd43b':'none'} color={liked?'#ffd43b':'currentColor'}/></button><button aria-label="Comment"><MessageCircle size={20}/></button><button aria-label="Share"><Send size={20}/></button><button onClick={()=>setSaved(!saved)} aria-label="Save" style={{marginLeft:'auto'}}><Bookmark size={20} fill={saved?'#ffd43b':'none'} color={saved?'#ffd43b':'currentColor'}/></button></div><div className="post-body"><b>{name}</b> Building a little corner of the internet where every connection has a pulse. <span style={{color:'#777'}}>#snitchgram</span></div></article>
}

export function Suggestions(){return <aside className="side-panel"><div className="side-title">People to connect</div>{people.slice(0,5).map((p)=><div className="suggest" key={p}><div className="avatar">{p[0].toUpperCase()}</div><div className="suggest-info"><b>{p}</b><span>Suggested for you</span></div><button className="follow">Follow</button></div>)}<div className="side-title" style={{marginTop:22}}>The Social Pulse</div><div style={{height:120,display:'grid',placeItems:'center',border:'1px solid var(--line)',borderRadius:18,background:'radial-gradient(circle,rgba(255,212,59,.15),transparent 35%)'}}><div style={{width:12,height:12,borderRadius:'50%',background:'#ffd43b',boxShadow:'0 0 32px #ffd43b'}}/></div></aside>}
