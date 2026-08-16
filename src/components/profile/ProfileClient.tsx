"use client";

import { useState } from "react";

export default function ProfileClient({ username }: { username: string }) {
  const [following, setFollowing] = useState(false);

  return (
    <div className="product-page">
      <div className="page-inner">
        <div className="profile-hero">
          <div className="profile-avatar">{username[0]?.toUpperCase()}</div>
          <div style={{ flex: 1 }}>
            <div className="eyebrow">creator / public profile</div>
            <h2 style={{ margin: "8px 0 0", fontSize: 34, letterSpacing: "-.05em" }}>{username}</h2>
            <p style={{ color: "#8b8b84", fontSize: 12, maxWidth: 500 }}>
              A profile living inside the SnitchGram social graph. Share, connect, and discover.
            </p>
            <div className="stats">
              <div><strong>128</strong><span>posts</span></div>
              <div><strong>4.8K</strong><span>followers</span></div>
              <div><strong>391</strong><span>following</span></div>
            </div>
          </div>
          <button className="btn btn-primary" onClick={() => setFollowing((value) => !value)}>
            {following ? "Following" : "Follow"}
          </button>
        </div>
        <div className="explore-grid" style={{ marginTop: 22 }}>
          {Array.from({ length: 9 }, (_, index) => (
            <div className="tile" key={index}>
              <span>{username} / {index + 1}</span>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
