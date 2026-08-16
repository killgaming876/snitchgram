import ProfileClient from "@/components/profile/ProfileClient";

type ProfilePageProps = { params: Promise<{ username: string }> };

export default async function ProfilePage({ params }: ProfilePageProps) {
  const { username } = await params;
  return <ProfileClient username={decodeURIComponent(username)} />;
}
