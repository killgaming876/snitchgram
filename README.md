# SnitchGram

SnitchGram is a cinematic social-network product built with Next.js, TypeScript, React Three Fiber, Three.js, Framer Motion, GSAP-ready architecture, Zustand and Supabase.

## Run locally

```bash
pnpm install
pnpm dev
```

If pnpm is not installed, use npm temporarily.

## Environment

Create `.env.local`:

```env
NEXT_PUBLIC_SUPABASE_URL=your-project-url
NEXT_PUBLIC_SUPABASE_PUBLISHABLE_KEY=your-publishable-key
```

Apply `supabase/schema.sql` and `supabase/realtime.sql` in a Supabase project.

## Architecture

- `src/app` routes and application surfaces
- `src/components/webgl` procedural R3F world
- `src/components/social` reusable social UI
- `src/components/layout` application shell
- `src/lib` client state and Supabase utilities
- `supabase` relational schema, RLS, realtime and storage policies

## Product principle

3D is an atmospheric layer. Core social interactions remain readable, fast and interruptible.
