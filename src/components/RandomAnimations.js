import React, {Component} from 'react';
import { sample } from 'lodash';
import splashlogo from '../img/vivalosbeefalos.jpg';
 
export default class RandomAnimation extends Component {
  constructor(props) {
    super(props)
    this.state = {
      animations:[
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
        //'hinge',
        'rollIn',
        'zoomIn',
        'zoomInDown',
        'zoomInLeft',
        'zoomInRight',
        'zoomInUp',
        'slideInDown',
        'slideInLeft',
        'slideInRight',
        'slideInUp'],
      randomAnimation:null
    }
    this.randomAnimation = sample(this.state.animations);
  }
 
  render() {
    return (
      <div>
        <div className={`splash`}>
          <img className={`animated ${this.randomAnimation}`} src={splashlogo} alt={`the unpronounceable`}/>
        </div>
        <div className={`experience animated  ${this.randomAnimation}`} >
          <h1>the unpronounceable</h1>
        </div>
        <br/>
        <br/>
        <div className={`experience animated  ${this.randomAnimation}`} >
          <a class="link" href="https://music.apple.com/us/artist/the-unpronounceable/1580673897" target="_blank" rel="noopener noreferrer">Find Viva Los Beefalos on Apple Music</a>
        </div>
        <br/>
        <br/>
        <div className={`experience animated  ${this.randomAnimation}`} >
          <a class="link" href="./albums/index.html">Find our other albums here</a>
        </div>
        <br/>
        <br/>

        <div className={`experience animated  ${this.randomAnimation}`} >
          <a class="link" href="./albums/contact.html" rel="noopener noreferrer">Contact</a> &nbsp; <a class="link" href="https://www.facebook.com/people/The-Unpronounceable/100063957675509/" target="_blank" rel="noopener noreferrer">Facebook</a
          >
        </div>
        <br/>
        <br/>
        <div className={`experience animated ${this.randomAnimation} white copyright`} >
          &copy;1999-{new Date().getFullYear()} the unpronounceable
        </div>
      </div>
    );
  }
}
