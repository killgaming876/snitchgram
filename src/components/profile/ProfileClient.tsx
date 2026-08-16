"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";

type Profile = { id: string; username: string; display_name: string; bio: string; avatar_url: string | null };

export default function ProfileClient({ username }: { username: string }) {
  const [profile, setProfile] = useState<Profile | null>(null);
  const [posts, setPosts] = useState<{ id: string; caption: string; created_at: string }[]>([]);
  const [following, setFollowing] = useState(false);
  const [busy, setBusy] = useState(false);
  const supabase = createClient();

  useEffect(() => {
    async function load() {
      const { data: found } = await supabase.from("profiles").select("id,username,display_name,bio,avatar_url").eq("username", username).maybeSingle();
      setProfile(found);
      if (!found) return;
      const { data: user } = await supabase.auth.getUser();
      if (user.user) {
        const { data: relation } = await supabase.from("follows").select("follower_id").eq("follower_id", user.user.id).eq("following_id", found.id).maybeSingle();
        setFollowing(Boolean(relation));
      }
      const { data: feed } = await supabase.from("posts").select("id,caption,created_at").eq("user_id", found.id).order("created_at", { ascending: false });
      setPosts(feed ?? []);
    }
    load();
  }, [username, supabase]);

  async function toggleFollow() {
    if (!profile || busy) return;
    const { data: user } = await supabase.auth.getUser();
    if (!user.user || user.user.id === profile.id) return;
    setBusy(true);
    if (following) await supabase.from("follows").delete().eq("follower_id", user.user.id).eq("following_id", profile.id);
    else await supabase.from("follows").insert({ follower_id: user.user.id, following_id: profile.id, status: "accepted" });
    setFollowing((value) => !value);
    setBusy(false);
  }

  if (!profile) return <div className="product-page"><div className="page-inner"><div className="side-panel"><h2>User not found.</h2><p>This username does not exist on SnitchGram.</p></div></div></div>;

  return (
    <div className="product-page">
      <div className="page-inner">
        <div className="profile-hero">
          <div className="profile-avatar">{profile.avatar_url ? <img src={profile.avatar_url} alt="" style={{width:'100%',height:'100%',objectFit:'cover',borderRadius:30}}/> : profile.username.slice(0,1).toUpperCase()}</div>
          <div style={{flex:1}}>
            <div className="snap-eyebrow">PROFILE</div>
            <h2 style={{margin:'8px 0 0'}}>@{profile.username}</h2>
            <p style={{color:'#a0a097',fontSize:13,maxWidth:560}}>{profile.bio || 'No bio yet.'}</p>
            <div className="stats"><div><strong>{posts.length}</strong><span>posts</span></div><div><strong>—</strong><span>followers</span></div><div><strong>—</strong><span>following</span></div></div>
          </div>
          <button className="btn btn-primary" disabled={busy} onClick={toggleFollow}>{following ? 'Following' : 'Add friend'}</button>
        </div>
        <div style={{marginTop:22}} className="explore-grid">
          {posts.length ? posts.map((post) => <article key={post.id} className="tile" style={{display:'flex',alignItems:'flex-end',padding:16}}><span>{post.caption || 'Post'} · {new Date(post.created_at).toLocaleDateString()}</span></article>) : <div className="side-panel" style={{gridColumn:'1/-1'}}><h3>No posts yet.</h3><p className="empty-copy">This profile has not published anything.</p></div>}
        </div>
      </div>
    </div>
  );
}
