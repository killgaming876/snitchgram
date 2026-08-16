import { createBrowserClient } from "@supabase/ssr";

const FALLBACK_URL = "https://dypatwknxmxhyofeetbm.supabase.co";
const FALLBACK_PUBLISHABLE_KEY = "sb_publishable_kR9F3huAm59Vxoyh6NBjdg_qkGz22M8";

export function createClient() {
  const url = process.env.NEXT_PUBLIC_SUPABASE_URL || FALLBACK_URL;
  const key = process.env.NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY || FALLBACK_PUBLISHABLE_KEY;
  return createBrowserClient(url, key);
}
