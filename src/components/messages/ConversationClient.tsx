"use client";

import { useEffect, useRef, useState } from "react";
import { Check, Loader2, SmilePlus } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Message = { id: string; sender_id: string; body: string | null; status: string; created_at: string };

export default function ConversationClient({ conversationId }: { conversationId: string }) {
  const [messages, setMessages] = useState<Message[]>([]);
  const [draft, setDraft] = useState("");
  const [sending, setSending] = useState(false);
  const [userId, setUserId] = useState<string | null>(null);
  const [allowed, setAllowed] = useState(true);
  const bottomRef = useRef<HTMLDivElement>(null);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;
    async function load() {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) { setAllowed(false); return; }
      if (mounted) setUserId(auth.user.id);
      const { data: membership } = await supabase.from("conversation_members").select("user_id").eq("conversation_id", conversationId).eq("user_id", auth.user.id).maybeSingle();
      if (!membership) { setAllowed(false); return; }
      const { data } = await supabase.from("messages").select("id,sender_id,body,status,created_at").eq("conversation_id", conversationId).order("created_at", { ascending: true });
      if (mounted) setMessages(data ?? []);

      const channel = supabase.channel(`conversation:${conversationId}`)
        .on("postgres_changes", { event: "INSERT", schema: "public", table: "messages", filter: `conversation_id=eq.${conversationId}` }, (payload) => {
          const incoming = payload.new as Message;
          setMessages((current) => current.some((item) => item.id === incoming.id) ? current : [...current, incoming]);
        })
        .subscribe();

      return () => { supabase.removeChannel(channel); };
    }
    const cleanupPromise = load();
    return () => { mounted = false; void cleanupPromise; };
  }, [conversationId, supabase]);

  useEffect(() => bottomRef.current?.scrollIntoView({ behavior: "smooth" }), [messages.length]);

  async function send() {
    const body = draft.trim();
    if (!body || !userId || sending) return;
    setSending(true);
    setDraft("");
    const optimistic: Message = { id: `local-${Date.now()}`, sender_id: userId, body, status: "sending", created_at: new Date().toISOString() };
    setMessages((current) => [...current, optimistic]);
    const { data, error } = await supabase.from("messages").insert({ conversation_id: conversationId, sender_id: userId, body, status: "sent" }).select("id,sender_id,body,status,created_at").single();
    setMessages((current) => current.filter((item) => item.id !== optimistic.id).concat(data ? [data as Message] : []));
    if (error) setDraft(body);
    setSending(false);
  }

  if (!allowed) return <div className="product-page"><div className="page-inner"><div className="side-panel"><h2>Conversation unavailable.</h2><p>You are not a member of this conversation.</p><a href="/messages" className="btn btn-primary">Back to messages</a></div></div></div>;

  return <div className="chat-page"><div className="chat-shell">
    <header className="chat-header"><a href="/messages" className="chat-back">‹</a><div><b>Conversation</b><span>realtime channel</span></div><span className="chat-live"><i/> LIVE</span></header>
    <div className="chat-messages">
      {!messages.length && <div className="chat-empty"><div className="empty-orb"/><p>Say hello. This conversation is empty.</p></div>}
      {messages.map((message) => {
        const mine = message.sender_id === userId;
        return <div className={`message-row ${mine ? "mine" : "theirs"}`} key={message.id}><div className="message-bubble"><span>{message.body}</span><small>{new Date(message.created_at).toLocaleTimeString([], { hour: "2-digit", minute: "2-digit" })} {mine && <Check size={11}/>}</small></div></div>;
      })}
      <div ref={bottomRef}/>
    </div>
    <div className="chat-composer"><button aria-label="Emoji"><SmilePlus size={19}/></button><textarea value={draft} onChange={(e)=>setDraft(e.target.value)} onKeyDown={(e)=>{if(e.key==='Enter'&&!e.shiftKey){e.preventDefault();send()}}} placeholder="Message…" rows={1}/><button className="send-pill" onClick={send} disabled={sending}>{sending ? <Loader2 className="spin" size={17}/> : "Send"}</button></div>
  </div></div>;
}
