import { useEffect, useMemo, useRef, useState } from 'react';
import { Link, Navigate, useParams } from 'react-router-dom';

type Track = {
  title: string;
  file: string;
};

type AlbumSection = {
  title?: string;
  tracks: Track[];
  zipLabel: string;
  zipFile: string;
};

type Album = {
  slug: string;
  title: string;
  year: string;
  cover: string;
  note?: string;
  sections: AlbumSection[];
};

const albumsBasePath = `${import.meta.env.BASE_URL}albums`;

const albumCatalog: Album[] = [
  {
    slug: 'songsforthelongdrivehome',
    title: 'Songs for the Long Drive Home',
    year: '2008',
    cover: 'sftldh-cover.jpg',
    sections: [
      {
        title: 'Volume I',
        tracks: [
          { title: 'House of the Rising Sun', file: '1-01 House of the Rising Sun.mp3' },
          { title: 'The Way You Make Me Feel', file: '1-02 The Way You Make Me Feel.mp3' },
          { title: 'Prologue', file: '1-03 Prologue.mp3' },
          { title: "Andy's Oxtails", file: "1-04 Andy's Oxtails.mp3" },
          { title: 'Tragedy', file: '1-05 Tragedy.mp3' },
          {
            title: 'Madly Deeply & St. James Infirmary',
            file: '1-06 Madly Deeply _ St. James Infirm.mp3',
          },
          { title: 'Groundhog', file: '1-07 Groundhog.mp3' },
          { title: 'Dream On', file: '1-08 Dream On.mp3' },
          { title: "Sad Sack's Lament", file: "1-09 Sad Sack's Lament.mp3" },
          { title: 'Summertime', file: '1-10 Summertime.mp3' },
          { title: 'Six Eight', file: '1-11 Six Eight.mp3' },
          { title: 'Ironman', file: '1-12 Ironman.mp3' },
          { title: 'Ugly', file: '1-13 Ugly.mp3' },
        ],
        zipLabel: 'Download Volume I (ZIP)',
        zipFile: 'SFTLDH_Volume_1.zip',
      },
      {
        title: 'Volume II',
        tracks: [
          { title: 'Folsom Prison Blues', file: '2-01 Folsom Prison Blues.mp3' },
          { title: 'Ah Leah', file: '2-02 Ahh Leah.mp3' },
          { title: 'Orange Moon', file: '2-03 Orange Moon.mp3' },
          { title: "I Don't Think So", file: "2-04 I Don't Think So.mp3" },
          { title: "Stayin' Alive", file: "2-05 Stayin' Alive.mp3" },
          { title: 'Meet Me in the Morning', file: '2-06 Meet Me in the Morning.mp3' },
          { title: 'Caldonia', file: '2-07 Caldonia.mp3' },
          { title: 'A Little Me and You', file: '2-08 A Little Me and You.mp3' },
          { title: 'Red Sonja', file: '2-09 Red Sonja.mp3' },
          { title: "Don't Mess Around with Jim", file: "2-10 Don't Mess Around with Jim.mp3" },
          { title: 'Too Much', file: '2-11 Too Much.mp3' },
          { title: "Monkey's Got a Big Car Now", file: "2-12 Monkey's Got a Big Car Now.mp3" },
        ],
        zipLabel: 'Download Volume II (ZIP)',
        zipFile: 'SFTLDH_Volume_2.zip',
      },
    ],
  },
  {
    slug: 'vivalosbeefalos',
    title: 'Viva Los Beefalos',
    year: '2005',
    cover: 'vivalosbeefalos.gif',
    note: 'Special thanks to Tim Fite for his contributions to this record.',
    sections: [
      {
        tracks: [
          { title: 'Kill Myself', file: '01 Kill Myself.mp3' },
          { title: 'Sweet Embraceable You', file: '02 Sweet Embraceable You.mp3' },
          { title: 'Wrong', file: '03 Wrong.mp3' },
          { title: 'Body In The Lake', file: '04 Body In The Lake.mp3' },
          { title: 'Homesick', file: '05 Homesick.mp3' },
          { title: 'Red Sonja', file: '06 Red Sonja.mp3' },
          { title: 'What I Desire', file: '07 What I Desire.mp3' },
          { title: 'A Little Me And You', file: '08 A Little Me And You.mp3' },
          { title: 'If I Do', file: '09 If I Do.mp3' },
          { title: 'Will The Circle Be Unbroken', file: '10 Will The Circle Be Unbroken.mp3' },
        ],
        zipLabel: 'Download Album (ZIP)',
        zipFile: 'vivalosbeefalos.zip',
      },
    ],
  },
  {
    slug: 'elementaryphysics',
    title: 'Elementary Physics',
    year: '2001',
    cover: 'elemphys.gif',
    sections: [
      {
        tracks: [
          { title: 'Prologue', file: '01 Prologue.mp3' },
          { title: 'Orange Moon', file: '02 Orange Moon.mp3' },
          { title: 'Iron Man', file: '03 Iron Man.mp3' },
          { title: 'Too Much', file: '04 Too Much.mp3' },
          { title: 'Big Blue Demon', file: '05 Big Blue Demon.mp3' },
          { title: 'Ugly (live)', file: '06 Ugly (live version).mp3' },
        ],
        zipLabel: 'Download Album (ZIP)',
        zipFile: 'elementaryphysics.zip',
      },
    ],
  },
  {
    slug: 'liveatbinghamton',
    title: 'Live at Binghamton',
    year: '2002',
    cover: 'live-at-binghamton.gif',
    sections: [
      {
        tracks: [
          { title: 'House of the Rising Sun', file: '01 hotrs.mp3' },
          { title: 'The Way You Make Me Feel', file: '02 the way you make me feel.mp3' },
          { title: 'Alabama Must Be Nice', file: '03 alabama must be nice.mp3' },
          { title: 'Capable Arms', file: '04 capable arms.mp3' },
          { title: 'Tragedy', file: '05 tragedy.mp3' },
          {
            title: 'Madly Deeply (St. James Infirmary)',
            file: '06 madly deeply_st. james infirmary.mp3',
          },
          { title: "Andy's Oxtails", file: "07 andy's oxtails.mp3" },
          { title: 'Iron Man', file: '08 iron man.mp3' },
          { title: "Monkey's Got a Big Car Now", file: "09 monkey's got a big car now.mp3" },
          { title: 'Summertime', file: '10 summertime.mp3' },
          { title: 'rpm', file: '12 rpm.mp3' },
          { title: 'As It Seems', file: '13 as it seems.mp3' },
        ],
        zipLabel: 'Download Album (ZIP)',
        zipFile: 'liveatbinghamton.zip',
      },
    ],
  },
  {
    slug: 'bellabellabella',
    title: 'Bella! Bella! Bella!',
    year: '2002',
    cover: 'bellabellabella.gif',
    sections: [
      {
        tracks: [
          { title: 'Red Light Rhodie', file: '01 Red Light Rhodie.mp3' },
          { title: 'Junebug', file: '02 Junebug.mp3' },
          { title: 'Clay Roofs of Firenze', file: '03 Clay Roofs of Firenze.mp3' },
        ],
        zipLabel: 'Download Album (ZIP)',
        zipFile: 'bellabellabella.zip',
      },
    ],
  },
  {
    slug: 'iota',
    title: 'Iota',
    year: '2001',
    cover: 'iota.gif',
    sections: [
      {
        tracks: [
          { title: 'Ugly', file: '01 - the unpronounceable - Ugly - Iota.mp3' },
          { title: 'Capable Arms', file: '02 - the unpronounceable - Capable Arms - Iota.mp3' },
          { title: 'Ennui', file: '03 - the unpronounceable - Ennui - Iota.mp3' },
          {
            title: "The Song That I'm Writing",
            file: "04 - the unpronounceable - The Song That I'm Writing - Iota.mp3",
          },
        ],
        zipLabel: 'Download Album (ZIP)',
        zipFile: 'iota.zip',
      },
    ],
  },
  {
    slug: 'liveatlamberton',
    title: 'Live at Lamberton',
    year: '2001',
    cover: 'live-at-lambo.gif',
    sections: [
      {
        tracks: [
          { title: 'Cold Summer Lite', file: '01 cold summer lite.mp3' },
          { title: 'Vertebra', file: '02 vertebra.mp3' },
          { title: 'The Showoff', file: '03 the showoff.mp3' },
          { title: "Monkey's Got a Big Car Now", file: '04 monkeys got a big car now.mp3' },
        ],
        zipLabel: 'Download Album (ZIP)',
        zipFile: 'liveatlamberton.zip',
      },
    ],
  },
  {
    slug: 'simultaneousorganisms',
    title: 'Simultaneous Organisms',
    year: '1999',
    cover: 'simorg.gif',
    sections: [
      {
        tracks: [
          { title: 'Simultaneous Organisms', file: '01 Simultaneous Organisms.mp3' },
          { title: 'Days Like These', file: '02 Days Like These.mp3' },
          { title: 'Poison Tree', file: '03 Poison Tree.mp3' },
          { title: 'Simmer', file: '04 Simmer.mp3' },
          { title: "And We'll Laugh", file: "05 And We'll Laugh.mp3" },
          { title: 'Useless', file: '06 Useless.mp3' },
          { title: 'The Showoff', file: '07 The Showoff.mp3' },
          { title: 'Sweetness', file: '08 Sweetness.mp3' },
          { title: 'This Is Standard', file: '09 This Is Standard.mp3' },
          { title: 'Slap Me', file: '10 Slap Me.mp3' },
          { title: 'Anatomy of Anger', file: '11 Anatomy Of Anger.mp3' },
          { title: 'Anna', file: '12 Anna.mp3' },
          { title: 'Nocturne', file: '13 Nocturne.mp3' },
        ],
        zipLabel: 'Download Album (ZIP)',
        zipFile: 'simorg.zip',
      },
    ],
  },
];

function toAssetPath(slug: string, file: string) {
  return encodeURI(`${albumsBasePath}/music/${slug}/mp3/${file}`);
}

export function AlbumDetailPage() {
  const { albumSlug } = useParams();
  const album = albumCatalog.find((item) => item.slug === albumSlug);
  const audioRef = useRef<HTMLAudioElement>(null);
  const albumSlugKey = album?.slug ?? '';

  const playlist = useMemo(
    () => album?.sections.flatMap((section) => section.tracks) ?? [],
    [album],
  );
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [isPlaying, setIsPlaying] = useState(false);
  const currentTrack = playlist[currentTrackIndex] ?? null;
  const hasPrevious = currentTrackIndex > 0;
  const hasNext = currentTrackIndex < playlist.length - 1;

  const playTrack = (trackIndex: number) => {
    setCurrentTrackIndex(trackIndex);
    setIsPlaying(true);
  };

  const togglePlayPause = () => {
    setIsPlaying((prev) => !prev);
  };

  const goToPrevious = () => {
    if (!hasPrevious) {
      return;
    }

    setCurrentTrackIndex((prev) => prev - 1);
    setIsPlaying(true);
  };

  const goToNext = () => {
    if (!hasNext) {
      setIsPlaying(false);
      return;
    }

    setCurrentTrackIndex((prev) => prev + 1);
    setIsPlaying(true);
  };

  const onTrackEnded = () => {
    if (!hasNext) {
      setIsPlaying(false);
      return;
    }

    setCurrentTrackIndex((prev) => prev + 1);
    setIsPlaying(true);
  };

  useEffect(() => {
    setCurrentTrackIndex(0);
    setIsPlaying(false);
  }, [albumSlugKey]);

  useEffect(() => {
    const audio = audioRef.current;

    if (!audio) {
      return;
    }

    if (isPlaying) {
      void audio.play().catch(() => {
        setIsPlaying(false);
      });
      return;
    }

    audio.pause();
  }, [isPlaying, currentTrackIndex, albumSlugKey]);

  if (!album || !currentTrack) {
    return <Navigate to="/albums" replace />;
  }

  return (
    <main className="album-page">
      <header className="album-header">
        <p className="album-kicker">Album Archive</p>
        <h1>{album.title}</h1>
        <p className="album-year">{album.year}</p>
      </header>

      <nav className="album-nav">
        <Link to="/albums">Back to Archive</Link>
        <Link to="/biography">Biography</Link>
        <Link to="/contact">Contact</Link>
      </nav>

      <section className="album-layout">
        <aside className="album-cover-wrap">
          <img
            className="album-cover"
            src={`${albumsBasePath}/images/albums/${album.cover}`}
            alt={album.title}
          />
          {album.note ? <p className="album-note">{album.note}</p> : null}

          <section className="album-player">
            <p className="album-player-label">Inline Album Player</p>
            <p className="album-player-track">
              {currentTrackIndex + 1}. {currentTrack.title}
            </p>
            <div className="album-player-controls">
              <button type="button" onClick={() => playTrack(0)}>
                Play Album
              </button>
              <button type="button" onClick={goToPrevious} disabled={!hasPrevious}>
                Prev
              </button>
              <button type="button" onClick={togglePlayPause}>
                {isPlaying ? 'Pause' : 'Play'}
              </button>
              <button type="button" onClick={goToNext} disabled={!hasNext}>
                Next
              </button>
            </div>
            <audio
              ref={audioRef}
              controls
              preload="none"
              src={toAssetPath(album.slug, currentTrack.file)}
              onEnded={onTrackEnded}
              onPlay={() => setIsPlaying(true)}
              onPause={() => setIsPlaying(false)}
            />
          </section>
        </aside>

        <div className="album-sections">
          {(() => {
            let trackOffset = 0;

            return album.sections.map((section) => {
              const sectionStart = trackOffset;
              trackOffset += section.tracks.length;

              return (
                <article key={section.title ?? section.zipFile} className="album-card">
                  {section.title ? <h2>{section.title}</h2> : null}
                  <ol>
                    {section.tracks.map((track, sectionTrackIndex) => {
                      const playlistIndex = sectionStart + sectionTrackIndex;
                      const isActiveTrack = currentTrackIndex === playlistIndex;

                      return (
                        <li
                          key={track.file}
                          className={
                            isActiveTrack ? 'album-track-row album-track-active' : 'album-track-row'
                          }
                        >
                          <button type="button" onClick={() => playTrack(playlistIndex)}>
                            {isActiveTrack && isPlaying ? 'Playing' : 'Play'}
                          </button>{' '}
                          <span>{track.title}</span>{' '}
                          <a href={toAssetPath(album.slug, track.file)}>Download</a>
                        </li>
                      );
                    })}
                  </ol>
                  <a className="album-download" href={toAssetPath(album.slug, section.zipFile)}>
                    {section.zipLabel}
                  </a>
                </article>
              );
            });
          })()}
        </div>
      </section>
    </main>
  );
}

export function LegacyAlbumRedirect() {
  const { albumSlug } = useParams();

  if (!albumSlug) {
    return <Navigate to="/albums" replace />;
  }

  return <Navigate to={`/albums/${albumSlug}`} replace />;
}
