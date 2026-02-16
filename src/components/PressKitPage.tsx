import { Link } from 'react-router-dom';

type PressVideo = {
  title: string;
  file: string;
  poster?: string;
};

const toPublicAssetUrl = (path: string) => encodeURI(`${import.meta.env.BASE_URL}${path}`);
const latestPressPhotoUrl = toPublicAssetUrl(
  'img/487095095_1105971228211456_6044861209878856982_n.jpg',
);
const blankPosterDataUrl =
  "data:image/svg+xml;charset=UTF-8,%3Csvg xmlns='http://www.w3.org/2000/svg' width='1280' height='720' viewBox='0 0 1280 720'%3E%3Crect width='1280' height='720' fill='%23000'/%3E%3C/svg%3E";

const featuredVideos: PressVideo[] = [
  {
    title: 'Iron Man (2021-08-07)',
    file: '20210807_IronMan.mp4',
    poster: 'vids/20210807_IronMan-poster.jpg',
  },
  {
    title: 'Ugly (Funhouse 2021)',
    file: 'Ugly (Funhouse 2021).mp4',
    poster: 'vids/Ugly (Funhouse 2021)-poster.jpg',
  },
  {
    title: 'After Dark (2021-08-07)',
    file: '20210807_AfterDark.mp4',
    poster: 'vids/20210807_AfterDark-poster.jpg',
  },
];

export default function PressKitPage() {
  return (
    <main className="presskit-page">
      <header className="presskit-hero">
        <p className="presskit-label">Official Press Kit</p>
        <h1>the unpronounceable</h1>
        <p className="presskit-subtitle">
          American countrifunked jazzabilly project from Bethlehem, Pennsylvania.
        </p>
      </header>

      <section className="presskit-grid">
        <article className="presskit-card">
          <h2>Quick Facts</h2>
          <ul>
            <li>Origin: Bethlehem, PA + West Orange, NJ</li>
            <li>Active: 1999-2008</li>
            <li>Style: Countrifunked Jazzabilly</li>
            <li>Known for: Genre collision, free archive releases</li>
          </ul>
        </article>

        <article className="presskit-card">
          <h2>Band Bio</h2>
          <p>
            Formed in 1999, the unpronounceable fused roots, swing, punk energy, and art-rock
            instincts into a sound they called countrifunked jazzabilly. Their catalog captures a
            full era of DIY experimentation and live chemistry.
          </p>
        </article>

        <article className="presskit-card">
          <h2>Members</h2>
          <ul>
            <li>Pete Gustavson (Jorge Beefalo)</li>
            <li>Adam Gustavson (Chip Beefalo)</li>
            <li>Dan Kinsley (Chet Beefalo)</li>
            <li>Matt Scheller</li>
            <li>Former members: Phil Guidi, Justin Riddle</li>
            <li>Recorded/mixed by Rob Badenoch</li>
          </ul>
        </article>

        <article className="presskit-card">
          <h2>Press Links</h2>
          <div className="presskit-links">
            <a
              href="https://music.apple.com/us/artist/the-unpronounceable/1580673897"
              target="_blank"
              rel="noreferrer"
            >
              Apple Music artist page
            </a>
            <a
              href="https://www.facebook.com/people/The-Unpronounceable/100063957675509/"
              target="_blank"
              rel="noreferrer"
            >
              Facebook
            </a>
            <a
              href="https://www.instagram.com/the.unpronounceable/"
              target="_blank"
              rel="noreferrer"
            >
              Instagram
            </a>
            <Link to="/albums">Full album archive</Link>
          </div>
        </article>

        <article className="presskit-card presskit-video-card">
          <h2>Featured Video</h2>
          {featuredVideos.map((video) => {
            const videoUrl = toPublicAssetUrl(`vids/${video.file}`);
            const posterUrl = video.poster ? toPublicAssetUrl(video.poster) : blankPosterDataUrl;

            return (
              <div key={video.file} className="presskit-video-item">
                <p className="presskit-small">{video.title}</p>
                <div className="presskit-video-frame">
                  <video controls preload="metadata" poster={posterUrl}>
                    <source src={videoUrl} type="video/mp4" />
                    Your browser does not support the video tag.
                  </video>
                </div>
                <p className="presskit-small">
                  <a href={videoUrl} target="_blank" rel="noreferrer">
                    Open video in new tab
                  </a>
                </p>
              </div>
            );
          })}
        </article>

        <article className="presskit-card">
          <h2>Assets</h2>
          <div className="presskit-links">
            <Link to="/presskit/one-pager">Downloadable one-pager (PDF)</Link>
            <a href={latestPressPhotoUrl} target="_blank" rel="noreferrer">
              Promo image (latest)
            </a>
          </div>
        </article>

        <article className="presskit-card">
          <h2>Contact</h2>
          <p>
            For interviews, features, sync, and archive use, contact:
            <br />
            <a href="mailto:mattdavidscheller@gmail.com">mattdavidscheller@gmail.com</a>
          </p>
          <p className="presskit-small">
            Please include publication, deadline, and requested deliverables.
          </p>
        </article>
      </section>

      <nav className="presskit-nav">
        <Link to="/">Home</Link>
        <Link to="/albums">Albums</Link>
        <Link to="/contact">Contact</Link>
      </nav>
    </main>
  );
}
