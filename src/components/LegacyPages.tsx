import type { ReactNode } from 'react';
import { Link } from 'react-router-dom';
import '../css/legacy-pages.css';

type LegacyLayoutProps = {
  children: ReactNode;
};

const albumsBasePath = `${import.meta.env.BASE_URL}albums`;

const albumItems = [
  {
    slug: 'songsforthelongdrivehome',
    image: 'sftldh-cover.jpg',
    alt: 'Songs for the Long Drive Home',
  },
  { slug: 'vivalosbeefalos', image: 'vivalosbeefalos.gif', alt: 'Viva Los Beefalos' },
  { slug: 'elementaryphysics', image: 'elemphys.gif', alt: 'Elementary Physics' },
  { slug: 'liveatbinghamton', image: 'live-at-binghamton.gif', alt: 'Live at Binghamton' },
  { slug: 'bellabellabella', image: 'bellabellabella.gif', alt: 'Bella Bella Bella' },
  { slug: 'iota', image: 'iota.gif', alt: 'Iota' },
  { slug: 'liveatlamberton', image: 'live-at-lambo.gif', alt: 'Live at Lamberton' },
  { slug: 'simultaneousorganisms', image: 'simorg.gif', alt: 'Simultaneous Organisms' },
];

function LegacyLayout({ children }: LegacyLayoutProps) {
  const headerBackground = { backgroundImage: `url(${albumsBasePath}/images/elements/header.jpg)` };
  const contentBackground = {
    backgroundImage: `url(${albumsBasePath}/images/elements/content-background.jpg)`,
  };

  return (
    <div className="legacy-page">
      <div className="legacy-header" style={headerBackground} />
      <div className="legacy-container" style={contentBackground}>
        <nav className="legacy-nav">
          <ul>
            <li>
              <Link to="/albums">Albums</Link>
            </li>
            <li>
              <Link to="/biography">Biography</Link>
            </li>
            <li>
              <Link to="/contact">Contact</Link>
            </li>
          </ul>
        </nav>
        <main className="legacy-content">{children}</main>
      </div>
      <footer className="legacy-footer">
        &copy;1999-{new Date().getFullYear()} the unpronounceable
      </footer>
    </div>
  );
}

export function AlbumsPage() {
  return (
    <LegacyLayout>
      <p className="legacy-blurb">
        Every album The Unpronounceable recorded can be found right here.
        <br />
        Click on an album cover to stream or download for free.
      </p>
      <div className="legacy-albums">
        {albumItems.map((album) => (
          <a key={album.slug} href={`${albumsBasePath}/music/${album.slug}/index.html`}>
            <img src={`${albumsBasePath}/images/albums/${album.image}`} alt={album.alt} />
          </a>
        ))}
      </div>
    </LegacyLayout>
  );
}

export function BiographyPage() {
  return (
    <LegacyLayout>
      <h2>1999-2008</h2>
      <p className="legacy-bio">
        Formed in 1999 somewhere between Bethlehem, PA and West Orange, NJ, The Unpronounceable
        entertained thousands...er...at least a thousand fans with its tribute to those lost years
        when Elvis sang Hank Williams tunes with Black Sabbath while Duke and Satchmo called out the
        changes. They called it COUNTRIFUNKED JAZZABILLY, but it is really just what rock and roll
        would have been if it had not wasted all that time on hairspray.
        <br />
        <br />
        The members included vocalist/guitarist/upright-bassist Pete Gustavson (Jorge Beefalo),
        guitarist/banjoist/upright-bassist Adam Gustavson (Chip Beefalo),
        guitarist/upright-bassist/pianist Dan Kinsley (Chet Beefalo) and drummers Phil Guidi (Chuck
        Beefalo), Justin Riddle (Charlamagne Beefalo) and Matt Scheller (Chugga Beefalo). The
        Unpronounceable&apos;s entire catalog was recorded, mixed and engineered by Rob Badenoch
        (Butch Beefalo). Sarah Wolfe (Delilah Beefalo) managed The Unpronounceable and Mogens Music
        business affairs.
        <br />
        <br />
        The Unpronounceable played its last show (kind of) in the spring of 2008 at the mythical
        South Bethlehem epicenter of the Lehigh Valley music scene: The Funhouse. If you missed them
        there, you can console yourself here by downloading all of the albums for free and playing
        them on repeat forever and always.
      </p>
    </LegacyLayout>
  );
}

export function ContactPage() {
  return (
    <LegacyLayout>
      <h2>Contact</h2>
      <p className="legacy-blurb">
        To reach the unpronounceable or members thereof, email{' '}
        <a href="mailto:unpronounceable@mogensmusic.com">unpronounceable@mogensmusic.com</a> or find
        us on{' '}
        <a
          href="https://www.facebook.com/people/The-Unpronounceable/100063957675509/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        .
      </p>
    </LegacyLayout>
  );
}
