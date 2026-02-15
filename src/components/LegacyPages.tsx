import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../css/legacy-pages.css';

type LegacyLayoutProps = {
  title: string;
  subtitle: string;
  children: ReactNode;
};

const albumsBasePath = `${import.meta.env.BASE_URL}albums`;

const albumItems = [
  {
    slug: 'songsforthelongdrivehome',
    image: 'sftldh-cover.jpg',
    alt: 'Songs for the Long Drive Home',
    year: '2003-2007',
  },
  { slug: 'vivalosbeefalos', image: 'vivalosbeefalos.gif', alt: 'Viva Los Beefalos', year: '2005' },
  { slug: 'elementaryphysics', image: 'elemphys.gif', alt: 'Elementary Physics', year: '2003' },
  {
    slug: 'liveatbinghamton',
    image: 'live-at-binghamton.gif',
    alt: 'Live at Binghamton',
    year: '2002',
  },
  { slug: 'bellabellabella', image: 'bellabellabella.gif', alt: 'Bella Bella Bella', year: '2002' },
  { slug: 'iota', image: 'iota.gif', alt: 'Iota', year: '2001' },
  { slug: 'liveatlamberton', image: 'live-at-lambo.gif', alt: 'Live at Lamberton', year: '2000' },
  {
    slug: 'simultaneousorganisms',
    image: 'simorg.gif',
    alt: 'Simultaneous Organisms',
    year: '1999',
  },
];

function LegacyLayout({ title, subtitle, children }: LegacyLayoutProps) {
  return (
    <main className="legacy2-page">
      <header className="legacy2-header">
        <p className="legacy2-kicker">Archive</p>
        <h1>{title}</h1>
        <p className="legacy2-subtitle">{subtitle}</p>
      </header>

      <nav className="legacy2-nav">
        <Link to="/albums">Albums</Link>
        <Link to="/biography">Biography</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/presskit">Press Kit</Link>
      </nav>

      <section className="legacy2-content">{children}</section>

      <footer className="legacy2-footer">
        &copy;1999-{new Date().getFullYear()} the unpronounceable
      </footer>
    </main>
  );
}

export function AlbumsPage() {
  return (
    <LegacyLayout
      title="Album Archive"
      subtitle="Every release in one place. Click any cover to stream or download."
    >
      <div className="legacy2-albums-grid">
        {albumItems.map((album) => (
          <Link key={album.slug} className="legacy2-album-card" to={`/albums/${album.slug}`}>
            <img src={`${albumsBasePath}/images/albums/${album.image}`} alt={album.alt} />
            <div className="legacy2-album-meta">
              <p>{album.alt}</p>
              <span>{album.year}</span>
            </div>
          </Link>
        ))}
      </div>
    </LegacyLayout>
  );
}

export function BiographyPage() {
  return (
    <LegacyLayout title="Biography" subtitle="Countrifunked jazzabilly from 1999 to 2008.">
      <article className="legacy2-card">
        <h2>1999-2008</h2>
        <p>
          Formed between Bethlehem, PA and West Orange, NJ, The Unpronounceable built a catalog
          around collision: Elvis with Hank, Black Sabbath with jazz language, and roots songs with
          noise and humor. The name they gave it was countrifunked jazzabilly.
        </p>
        <p>
          The lineup included Pete Gustavson, Adam Gustavson, Dan Kinsley, Phil Guidi, Justin
          Riddle, and Matt Scheller. Their catalog was recorded, mixed, and engineered by Rob
          Badenoch, with business affairs managed by Sarah Wolfe.
        </p>
        <p>
          Their final show was in spring 2008 at The Funhouse in South Bethlehem. The archive
          remains online as a free record of the project.
        </p>
      </article>
    </LegacyLayout>
  );
}

export function ContactPage() {
  return (
    <LegacyLayout title="Contact" subtitle="Booking, press, interviews, and archive requests.">
      <div className="legacy2-contact-grid">
        <article className="legacy2-card">
          <h2>Email</h2>
          <p>
            <a href="mailto:mattdavidscheller@gmail.com">mattdavidscheller@gmail.com</a>
          </p>
        </article>

        <article className="legacy2-card">
          <h2>Social</h2>
          <p>
            <a
              href="https://www.facebook.com/people/The-Unpronounceable/100063957675509/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Facebook
            </a>
            <br />
            <a
              href="https://www.instagram.com/the.unpronounceable/"
              target="_blank"
              rel="noopener noreferrer"
            >
              Instagram
            </a>
          </p>
        </article>

        <article className="legacy2-card">
          <h2>Press Resources</h2>
          <p>
            Use the <Link to="/presskit">press kit</Link> for approved bio, links, and downloadable
            one-pager.
          </p>
        </article>
      </div>
    </LegacyLayout>
  );
}
