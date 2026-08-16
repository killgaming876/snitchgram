"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Conversation = { id: string; member: { username: string; display_name: string; avatar_url: string | null } | null; lastMessage: string };

export default function Messages() {
  const [conversations, setConversations] = useState<Conversation[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: auth } = await supabase.auth.getUser();
      if (!auth.user) { setLoading(false); return; }
      const { data: memberships } = await supabase.from("conversation_members").select("conversation_id,user_id").eq("user_id", auth.user.id);
      const rows: Conversation[] = [];
      for (const membership of memberships ?? []) {
        const { data: other } = await supabase.from("conversation_members").select("user_id").eq("conversation_id", membership.conversation_id).neq("user_id", auth.user.id).limit(1).maybeSingle();
        const { data: profile } = other ? await supabase.from("profiles").select("username,display_name,avatar_url").eq("id", other.user_id).maybeSingle() : { data: null };
        const { data: message } = await supabase.from("messages").select("body").eq("conversation_id", membership.conversation_id).order("created_at", { ascending: false }).limit(1).maybeSingle();
        rows.push({ id: membership.conversation_id, member: profile, lastMessage: message?.body ?? "Start a conversation" });
      }
      setConversations(rows);
      setLoading(false);
    }
    load();
  }, [supabase]);

  return <div className="product-page"><div className="page-inner" style={{maxWidth:900}}>
    <div className="page-heading"><span className="snap-eyebrow">CHAT</span><h2>Messages.</h2><p>Real conversations, realtime delivery, no placeholder accounts.</p></div>
    <div className="side-panel">
      {loading ? <p className="empty-copy">Loading conversations…</p> : conversations.length ? conversations.map((conversation) => <a href={`/messages/${conversation.id}`} className="user-row" key={conversation.id}><span className="user-avatar">{conversation.member?.username?.slice(0,1).toUpperCase() ?? '?'}</span><span><b>{conversation.member?.username ?? 'Unknown user'}</b><small>{conversation.lastMessage}</small></span></a>) : <div className="empty-state"><div className="empty-orb"/><h3>No conversations yet.</h3><p>Find someone in Discover and start a real conversation.</p><a href="/search" className="snap-button">Find people</a></div>}
    </div>
  </div></div>;
}
