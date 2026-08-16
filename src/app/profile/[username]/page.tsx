import ProfileClient from "@/components/profile/ProfileClient";

type ProfilePageProps = {
  params: Promise<{ username: string }>;
};

export function generateStaticParams() {
  return ["snitchgram", "demo", "maya", "zane", "ria"].map((username) => ({ username }));
}

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  return <ProfileClient username={username} />;
}
