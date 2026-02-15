import { Link } from 'react-router-dom';

export default function PressKitOnePager() {
  const handlePrint = () => {
    window.print();
  };

  return (
    <main className="onepager-page">
      <div className="onepager-actions no-print">
        <button type="button" className="onepager-print-btn" onClick={handlePrint}>
          Download PDF
        </button>
        <Link className="onepager-back-link" to="/presskit">
          Back to Press Kit
        </Link>
      </div>

      <article className="onepager-sheet">
        <header className="onepager-header">
          <p className="onepager-tag">One-Sheet</p>
          <h1>the unpronounceable</h1>
          <p>Countrifunked Jazzabilly | Bethlehem, PA + West Orange, NJ | 1999-2008</p>
        </header>

        <section className="onepager-section">
          <h2>About</h2>
          <p>
            The unpronounceable blended roots, swing, punk urgency, and art-rock weirdness into a
            sound they named countrifunked jazzabilly. Across a run from 1999 to 2008, they built a
            catalog that still feels unruly, melodic, and unmistakably theirs.
          </p>
        </section>

        <section className="onepager-columns">
          <div>
            <h2>Highlights</h2>
            <ul>
              <li>Independent catalog spanning multiple full-length releases</li>
              <li>Known for live unpredictability and genre collision</li>
              <li>Archive available for free streaming/download</li>
            </ul>
          </div>
          <div>
            <h2>Recommended Links</h2>
            <ul>
              <li>Apple Music: music.apple.com/us/artist/the-unpronounceable/1580673897</li>
              <li>Archive: theunpronounceable.com/albums</li>
              <li>Press Kit: theunpronounceable.com/presskit</li>
            </ul>
          </div>
        </section>

        <section className="onepager-section">
          <h2>Selected Personnel</h2>
          <p>
            Pete Gustavson, Adam Gustavson, Dan Kinsley, Matt Scheller. Former members: Phil Guidi,
            Justin Riddle. Recorded/mixed/engineered by Rob Badenoch.
          </p>
        </section>

        <footer className="onepager-footer">
          <p>Contact: mattdavidscheller@gmail.com</p>
          <p>&copy;1999-{new Date().getFullYear()} the unpronounceable</p>
        </footer>
      </article>
    </main>
  );
}
