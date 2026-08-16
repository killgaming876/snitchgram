"use client";

import { useEffect, useState } from "react";
import { Bookmark, Heart, MessageCircle, Send } from "lucide-react";
import { createClient } from "@/lib/supabase/client";

type Profile = { id: string; username: string; display_name: string; avatar_url: string | null };
type Post = { id: string; user_id: string; caption: string; created_at: string };

export default function HomeFeed() {
  const [profiles, setProfiles] = useState<Profile[]>([]);
  const [posts, setPosts] = useState<Post[]>([]);
  const [likes, setLikes] = useState<Set<string>>(new Set());
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let cancelled = false;
    async function load() {
      const [{ data: people }, { data: feed }] = await Promise.all([
        supabase.from("profiles").select("id,username,display_name,avatar_url").order("created_at", { ascending: false }).limit(24),
        supabase.from("posts").select("id,user_id,caption,created_at").order("created_at", { ascending: false }).limit(30),
      ]);
      if (!cancelled) {
        setProfiles(people ?? []);
        setPosts(feed ?? []);
        setLoading(false);
      }
    }
    load();
    return () => { cancelled = true; };
  }, [supabase]);

  const profileById = new Map(profiles.map((p) => [p.id, p]));

  if (loading) return <div className="snaptile loading-card"><div className="shimmer"/><div className="shimmer short"/></div>;

  return (
    <div className="social-layout">
      <main className="feed-column">
        <div className="story-shelf">
          {profiles.length ? profiles.slice(0, 12).map((profile) => (
            <a href={`/profile/${profile.username}`} className="story-chip" key={profile.id}>
              <span className="story-avatar"><span>{profile.username.slice(0, 1).toUpperCase()}</span></span>
              <b>{profile.username}</b>
            </a>
          )) : <div className="empty-copy">No stories yet. Create the first one.</div>}
        </div>

        {posts.length ? posts.map((post) => {
          const author = profileById.get(post.user_id);
          if (!author) return null;
          const liked = likes.has(post.id);
          return (
            <article className="snappost" key={post.id}>
              <div className="snappost-head">
                <a href={`/profile/${author.username}`} className="avatar-large">
                  {author.avatar_url ? <img src={author.avatar_url} alt="" /> : author.username.slice(0, 1).toUpperCase()}
                </a>
                <div><a href={`/profile/${author.username}`} className="post-author">{author.username}</a><span className="post-time">{new Date(post.created_at).toLocaleString()}</span></div>
                <button className="more-button" aria-label="More">•••</button>
              </div>
              <div className="snappost-media">
                <div className="media-sun"/>
                <span>SNITCHGRAM</span>
              </div>
              <div className="snappost-actions">
                <button onClick={async () => {
                  const { data: user } = await supabase.auth.getUser();
                  if (!user.user) return;
                  if (liked) {
                    await supabase.from("likes").delete().eq("post_id", post.id).eq("user_id", user.user.id);
                    setLikes((current) => { const next = new Set(current); next.delete(post.id); return next; });
                  } else {
                    await supabase.from("likes").insert({ post_id: post.id, user_id: user.user.id });
                    setLikes((current) => new Set(current).add(post.id));
                  }
                }} aria-label="Like"><Heart size={22} fill={liked ? "currentColor" : "none"}/></button>
                <button aria-label="Comment"><MessageCircle size={22}/></button>
                <button aria-label="Share"><Send size={22}/></button>
                <button aria-label="Save" className="save-button"><Bookmark size={22}/></button>
              </div>
              <div className="snappost-copy"><b>{author.username}</b> {post.caption || "shared a moment on SnitchGram."}</div>
            </article>
          );
        }) : (
          <div className="snaptile empty-state"><div className="empty-orb"/><h3>Your feed is empty.</h3><p>Follow real people or publish your first post. SnitchGram will fill this space with real content.</p><a href="/search" className="snap-button">Find people</a></div>
        )}
      </main>

      <aside className="real-users-panel">
        <div className="panel-kicker">PEOPLE ON SNITCHGRAM</div>
        {profiles.length ? profiles.slice(0, 8).map((profile) => (
          <a className="user-row" href={`/profile/${profile.username}`} key={profile.id}>
            <span className="user-avatar">{profile.username.slice(0, 1).toUpperCase()}</span>
            <span><b>{profile.username}</b><small>{profile.display_name || "SnitchGram member"}</small></span>
          </a>
        )) : <p className="empty-copy">No other accounts yet.</p>}
      </aside>
    </div>
  );
}
