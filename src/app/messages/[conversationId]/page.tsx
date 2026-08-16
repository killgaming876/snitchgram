import ConversationClient from "@/components/messages/ConversationClient";

type ConversationPageProps = {
  params: Promise<{ conversationId: string }>;
};

export function generateStaticParams() {
  return ["1", "2", "3", "4", "demo"].map((conversationId) => ({ conversationId }));
}

export default async function ConversationPage({ params }: ConversationPageProps) {
  const { conversationId } = await params;
  return <ConversationClient conversationId={conversationId} />;
}
