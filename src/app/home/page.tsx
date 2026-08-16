import HomeFeed from "@/components/social/HomeFeed";

export default function HomePage() {
  return (
    <div className="social-page">
      <div className="social-page-inner">
        <div className="social-heading">
          <div>
            <span className="snap-eyebrow">FOR YOU</span>
            <h1>Stay in the loop.</h1>
            <p>Real people. Real posts. Real conversations.</p>
          </div>
        </div>
        <HomeFeed />
      </div>
    </div>
  );
}
