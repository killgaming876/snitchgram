"use client";
import { useState } from "react";

export function generateStaticParams() {
  return [{ conversationId: "demo" }];
}

export default function Conversation({ params }: { params: { conversationId: string } }) {
  const [messages, setMessages] = useState(["You found the new signal.", "This interface is wild."]);
  const [draft, setDraft] = useState("");

  function send() {
    const value = draft.trim();
    if (!value) return;
    setMessages((current) => [...current, value]);
    setDraft("");
  }

  return (
    <div className="product-page">
      <div className="page-inner" style={{ maxWidth: 760 }}>
        <div className="page-heading">
          <div>
            <div className="eyebrow">
              <span className="dot" /> conversation / {params.conversationId}
            </div>
            <h2>Maya Chen.</h2>
          </div>
        </div>
        <div className="side-panel">
          <div style={{ minHeight: 420, display: "flex", flexDirection: "column", justifyContent: "flex-end", gap: 10 }}>
            {messages.map((message, index) => (
              <div
                key={`${message}-${index}`}
                style={{
                  alignSelf: index % 2 ? "flex-end" : "flex-start",
                  maxWidth: "75%",
                  padding: "11px 14px",
                  borderRadius: 16,
                  background: index % 2 ? "#ffd43b" : "#1a1a18",
                  color: index % 2 ? "#080806" : "#ddd",
                  fontSize: 12,
                }}
              >
                {message}
              </div>
            ))}
          </div>
          <div style={{ display: "flex", gap: 8, marginTop: 18 }}>
            <input
              value={draft}
              onChange={(event) => setDraft(event.target.value)}
              onKeyDown={(event) => {
                if (event.key === "Enter") send();
              }}
              placeholder="Write a message…"
            />
            <button className="btn btn-primary" onClick={send}>
              Send
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
