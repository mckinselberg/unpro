import { useEffect, useMemo, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { sample } from 'lodash';
import { Link } from 'react-router-dom';

const animations = [
  'bounce',
  'flash',
  'pulse',
  'rubberBand',
  'shake',
  'headShake',
  'swing',
  'tada',
  'wobble',
  'jello',
  'bounceIn',
  'bounceInDown',
  'bounceInLeft',
  'bounceInRight',
  'bounceInUp',
  'fadeIn',
  'fadeInDown',
  'fadeInDownBig',
  'fadeInLeft',
  'fadeInLeftBig',
  'fadeInRight',
  'fadeInRightBig',
  'fadeInUp',
  'fadeInUpBig',
  'flipInX',
  'flipInY',
  'lightSpeedIn',
  'rotateIn',
  'rotateInDownLeft',
  'rotateInDownRight',
  'rotateInUpLeft',
  'rotateInUpRight',
  'rollIn',
  'zoomIn',
  'zoomInDown',
  'zoomInLeft',
  'zoomInRight',
  'zoomInUp',
  'slideInDown',
  'slideInLeft',
  'slideInRight',
  'slideInUp',
];

export default function HomePage() {
  type Rgb = [number, number, number];
  type GradientPalette = {
    a: Rgb;
    b: Rgb;
    c: Rgb;
    glowLeft: Rgb;
    glowRight: Rgb;
  };

  const lerp = (from: number, to: number, t: number) => from + (to - from) * t;
  const lerpRgb = (from: Rgb, to: Rgb, t: number): Rgb => [
    Math.round(lerp(from[0], to[0], t)),
    Math.round(lerp(from[1], to[1], t)),
    Math.round(lerp(from[2], to[2], t)),
  ];

  const randomAnimation = useMemo(() => sample(animations) ?? animations[0], []);
  const heroImages = useMemo(
    () =>
      [
        '20210807_IronMan-poster.jpg',
        'Ugly (Funhouse 2021)-poster.jpg',
        '20210807_AfterDark-poster.jpg',
      ].map((fileName) => encodeURI(`${import.meta.env.BASE_URL}vids/${fileName}`)),
    [],
  );
  const [currentSlide, setCurrentSlide] = useState(0);
  const [gradientColors, setGradientColors] = useState<GradientPalette>({
    a: [183, 83, 9],
    b: [15, 118, 110],
    c: [20, 16, 13],
    glowLeft: [180, 83, 9],
    glowRight: [15, 118, 110],
  });
  const paletteRef = useRef<GradientPalette>(gradientColors);
  const transitionFrameRef = useRef<number | null>(null);

  useEffect(() => {
    paletteRef.current = gradientColors;
  }, [gradientColors]);

  useEffect(() => {
    const intervalId = window.setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % heroImages.length);
    }, 3800);

    return () => window.clearInterval(intervalId);
  }, [heroImages.length]);

  useEffect(() => {
    const activeImageUrl = heroImages[currentSlide];
    const image = new Image();

    image.onload = () => {
      const canvas = document.createElement('canvas');
      const context = canvas.getContext('2d');

      if (!context) {
        return;
      }

      canvas.width = 64;
      canvas.height = 36;
      context.drawImage(image, 0, 0, canvas.width, canvas.height);
      const { data } = context.getImageData(0, 0, canvas.width, canvas.height);

      const createBucket = () => ({ r: 0, g: 0, b: 0, weight: 0 });
      const all = createBucket();
      const left = createBucket();
      const right = createBucket();
      const vivid = createBucket();

      const addToBucket = (
        bucket: { r: number; g: number; b: number; weight: number },
        r: number,
        g: number,
        b: number,
        weight: number,
      ) => {
        bucket.r += r * weight;
        bucket.g += g * weight;
        bucket.b += b * weight;
        bucket.weight += weight;
      };

      const getSaturation = (r: number, g: number, b: number) => {
        const max = Math.max(r, g, b);
        const min = Math.min(r, g, b);
        if (max === 0) {
          return 0;
        }
        return (max - min) / max;
      };

      const boostColor = (r: number, g: number, b: number, minSat = 0.33) => {
        const currentSat = getSaturation(r, g, b);
        if (currentSat >= minSat) {
          return [r, g, b] as const;
        }

        const avg = (r + g + b) / 3;
        const factor = 1 + (minSat - currentSat) * 1.4;
        const clamp = (value: number) => Math.max(0, Math.min(255, Math.round(value)));
        return [
          clamp(avg + (r - avg) * factor),
          clamp(avg + (g - avg) * factor),
          clamp(avg + (b - avg) * factor),
        ] as const;
      };

      for (let i = 0; i < data.length; i += 4) {
        const pixelIndex = i / 4;
        const x = pixelIndex % canvas.width;
        const r = data[i];
        const g = data[i + 1];
        const b = data[i + 2];
        const alpha = data[i + 3];

        if (alpha < 10) {
          continue;
        }

        const luminance = 0.299 * r + 0.587 * g + 0.114 * b;
        const saturation = getSaturation(r, g, b);
        const weighted = 0.3 + saturation * 1.5 + (luminance / 255) * 0.4;
        addToBucket(all, r, g, b, weighted);

        if (x < canvas.width / 2) {
          addToBucket(left, r, g, b, weighted);
        } else {
          addToBucket(right, r, g, b, weighted);
        }

        if (saturation > 0.28 && luminance > 60) {
          addToBucket(vivid, r, g, b, weighted + saturation);
        }
      }

      if (all.weight === 0 || left.weight === 0 || right.weight === 0) {
        return;
      }

      const bucketToRgb = (bucket: { r: number; g: number; b: number; weight: number }): Rgb => {
        const toChannel = (value: number) =>
          Math.max(0, Math.min(255, Math.round(value / bucket.weight)));
        const [r, g, b] = boostColor(toChannel(bucket.r), toChannel(bucket.g), toChannel(bucket.b));
        return [r, g, b];
      };

      const allColor = bucketToRgb(all);
      const leftColor = bucketToRgb(left);
      const rightColor = bucketToRgb(right);
      const vividColor = vivid.weight > 0 ? bucketToRgb(vivid) : allColor;

      const targetPalette: GradientPalette = {
        a: leftColor,
        b: rightColor,
        c: allColor,
        glowLeft: vividColor,
        glowRight: rightColor,
      };

      if (transitionFrameRef.current !== null) {
        window.cancelAnimationFrame(transitionFrameRef.current);
      }

      const fromPalette = paletteRef.current;
      const startedAt = performance.now();
      const transitionDurationMs = 1500;

      const step = (now: number) => {
        const t = Math.min((now - startedAt) / transitionDurationMs, 1);

        setGradientColors({
          a: lerpRgb(fromPalette.a, targetPalette.a, t),
          b: lerpRgb(fromPalette.b, targetPalette.b, t),
          c: lerpRgb(fromPalette.c, targetPalette.c, t),
          glowLeft: lerpRgb(fromPalette.glowLeft, targetPalette.glowLeft, t),
          glowRight: lerpRgb(fromPalette.glowRight, targetPalette.glowRight, t),
        });

        if (t < 1) {
          transitionFrameRef.current = window.requestAnimationFrame(step);
        } else {
          transitionFrameRef.current = null;
        }
      };

      transitionFrameRef.current = window.requestAnimationFrame(step);
    };

    image.src = activeImageUrl;
  }, [currentSlide, heroImages]);

  useEffect(
    () => () => {
      if (transitionFrameRef.current !== null) {
        window.cancelAnimationFrame(transitionFrameRef.current);
      }
    },
    [],
  );

  const homeStyle = {
    '--home-grad-a': gradientColors.a.join(', '),
    '--home-grad-b': gradientColors.b.join(', '),
    '--home-grad-c': gradientColors.c.join(', '),
    '--home-glow-left': gradientColors.glowLeft.join(', '),
    '--home-glow-right': gradientColors.glowRight.join(', '),
  } as CSSProperties;

  return (
    <main className="home-page" style={homeStyle}>
      <div className="home-glow home-glow-left" aria-hidden />
      <div className="home-glow home-glow-right" aria-hidden />

      <section className="home-hero">
        <div className="splash">
          {heroImages.map((imageUrl, index) => (
            <div
              key={imageUrl}
              className={`home-slide ${index === currentSlide ? 'is-active' : ''}`}
            >
              <img
                className="home-slide-image"
                src={imageUrl}
                alt="the unpronounceable live poster"
              />
            </div>
          ))}
        </div>

        <div className={`experience animated ${randomAnimation}`}>
          <p className="home-kicker">Countrifunked Jazzabilly since 1999</p>
          <h1>the unpronounceable</h1>
          <p className="home-summary">Every album, every era, and every glorious wrong turn.</p>
        </div>
      </section>

      <section className="home-actions">
        <a
          className="home-button home-button-primary"
          href="https://music.apple.com/us/artist/the-unpronounceable/1580673897"
          target="_blank"
          rel="noopener noreferrer"
        >
          Listen on Apple Music
        </a>
        <Link className="home-button home-button-secondary" to="/albums">
          Browse Albums
        </Link>
        <Link className="home-button home-button-secondary" to="/presskit">
          Press Kit
        </Link>
        <Link className="home-button home-button-secondary" to="/contact">
          Contact
        </Link>
      </section>

      <section className="home-socials">
        <a
          className="home-social-link"
          href="https://www.facebook.com/people/The-Unpronounceable/100063957675509/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
        <a
          className="home-social-link"
          href="https://www.instagram.com/the.unpronounceable/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Instagram
        </a>
      </section>

      <footer className="home-footer">
        &copy;1999-{new Date().getFullYear()} the unpronounceable
      </footer>
    </main>
  );
}
