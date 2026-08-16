"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ProfileClient from "@/components/profile/ProfileClient";

export default function MyProfilePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    supabase.auth.getUser().then(async ({ data }) => {
      if (!data.user) { setLoading(false); return; }
      const { data: profile } = await supabase.from("profiles").select("username").eq("id", data.user.id).maybeSingle();
      setUsername(profile?.username ?? null);
      setLoading(false);
    });
  }, [supabase]);

  if (loading) return <div className="product-page"><div className="page-inner"><div className="side-panel">Loading your profile…</div></div></div>;
  if (!username) return <div className="product-page"><div className="page-inner"><div className="side-panel"><h2>Create your profile.</h2><p>Finish onboarding to see your real SnitchGram profile.</p><a className="btn btn-primary" href="/onboarding">Continue</a></div></div></div>;
  return <ProfileClient username={username} />;
}
