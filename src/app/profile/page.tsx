"use client";

import { useEffect, useState } from "react";
import { createClient } from "@/lib/supabase/client";
import ProfileClient from "@/components/profile/ProfileClient";

type AuthResult = {
  data: { user: { id: string } | null };
  error: { message: string } | null;
};

type ProfileRow = { username: string | null };

export default function MyProfilePage() {
  const [username, setUsername] = useState<string | null>(null);
  const [loading, setLoading] = useState(true);
  const supabase = createClient();

  useEffect(() => {
    let mounted = true;

    async function loadProfile() {
      const auth = (await supabase.auth.getUser()) as AuthResult;
      if (!auth.data.user) {
        if (mounted) setLoading(false);
        return;
      }

      const { data: profile } = await supabase
        .from("profiles")
        .select("username")
        .eq("id", auth.data.user.id)
        .maybeSingle() as { data: ProfileRow | null };

      if (mounted) {
        setUsername(profile?.username ?? null);
        setLoading(false);
      }
    }

    void loadProfile();
    return () => {
      mounted = false;
    };
  }, [supabase]);

  if (loading) return <div className="product-page"><div className="page-inner"><div className="side-panel">Loading your profile…</div></div></div>;
  if (!username) return <div className="product-page"><div className="page-inner"><div className="side-panel"><h2>Create your profile.</h2><p>Finish onboarding to see your real SnitchGram profile.</p><a className="btn btn-primary" href="/onboarding">Continue</a></div></div></div>;
  return <ProfileClient username={username} />;
}
