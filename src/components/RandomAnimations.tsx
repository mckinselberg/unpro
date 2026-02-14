import { useMemo } from 'react';
import { sample } from 'lodash';
import { Link } from 'react-router-dom';
import splashlogo from '../img/vivalosbeefalos.jpg';

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

export default function RandomAnimations() {
  const randomAnimation = useMemo(() => sample(animations) ?? animations[0], []);

  return (
    <div>
      <div className="splash">
        <img className={`animated ${randomAnimation}`} src={splashlogo} alt="the unpronounceable" />
      </div>
      <div className={`experience animated ${randomAnimation}`}>
        <h1>the unpronounceable</h1>
      </div>
      <br />
      <br />
      <div className={`experience animated ${randomAnimation}`}>
        <a
          className="link"
          href="https://music.apple.com/us/artist/the-unpronounceable/1580673897"
          target="_blank"
          rel="noopener noreferrer"
        >
          Find Viva Los Beefalos on Apple Music
        </a>
      </div>
      <br />
      <br />
      <div className={`experience animated ${randomAnimation}`}>
        <Link className="link" to="/albums">
          Find our other albums here
        </Link>
      </div>
      <br />
      <br />
      <div className={`experience animated ${randomAnimation}`}>
        <Link className="link" to="/contact">
          Contact
        </Link>{' '}
        &nbsp;{' '}
        <a
          className="link"
          href="https://www.facebook.com/people/The-Unpronounceable/100063957675509/"
          target="_blank"
          rel="noopener noreferrer"
        >
          Facebook
        </a>
      </div>
      <br />
      <br />
      <div className={`experience animated ${randomAnimation} white copyright`}>
        &copy;1999-{new Date().getFullYear()} the unpronounceable
      </div>
    </div>
  );
}
