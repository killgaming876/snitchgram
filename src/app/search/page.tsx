"use client";

import { useEffect, useState } from "react";
import { Search as SearchIcon } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Profile = { id: string; username: string; display_name: string; bio: string };

export default function SearchPage() {
  const [q, setQ] = useState("");
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data } = await supabase.from("profiles").select("id,username,display_name,bio").order("created_at", { ascending: false }).limit(50);
      setProfiles(data ?? []);
      setLoading(false);
    }
    load();
  }, [supabase]);

  const results = profiles.filter((p) => {
    const needle = q.toLowerCase().trim();
    return !needle || p.username.toLowerCase().includes(needle) || p.display_name.toLowerCase().includes(needle) || p.bio.toLowerCase().includes(needle);
  });

  return (
    <div className="product-page">
      <div className="page-inner" style={{ maxWidth: 820 }}>
        <div className="page-heading"><span className="snap-eyebrow">DISCOVER</span><h2>Find your people.</h2><p>Search the actual SnitchGram community. No generated identities.</p></div>
        <div style={{position:'relative'}}><SearchIcon size={18} style={{position:'absolute',left:16,top:22,color:'#777'}}/><input autoFocus value={q} onChange={(e)=>setQ(e.target.value)} placeholder="Search usernames, names or bios…" style={{paddingLeft:46}}/></div>
        <div className="side-panel" style={{marginTop:14}}>
          {loading ? <p className="empty-copy">Loading community…</p> : results.length ? results.map((profile)=><a key={profile.id} href={`/profile/${profile.username}`} className="user-row"><span className="user-avatar">{profile.username.slice(0,1).toUpperCase()}</span><span><b>@{profile.username}</b><small>{profile.display_name || profile.bio || 'SnitchGram member'}</small></span></a>) : <p className="empty-copy">No users match “{q}”.</p>}
        </div>
      </div>
    </div>
  );
}
