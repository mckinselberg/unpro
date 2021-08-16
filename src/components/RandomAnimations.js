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
  componentDidMount() {

    setTimeout(()=> {
      // document.body.style.overflowY = "auto";
      this.setState({
        //randomAnimation1:sample(this.state.animations),
        //randomAnimation2:sample(this.state.animations)
      })
    },1000)
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
        <div className={`songs animated ${this.randomAnimation}`}>
          <ul>
            <li><a href="/mp3/01 Kill Myself.mp3">Kill Myself</a></li>
            <li><a href="/mp3/02 Sweet Embraceable You.mp3">Sweet Embraceable You</a></li>
            <li><a href="/mp3/03 Wrong.mp3">Wrong</a></li>
            <li><a href="/mp3/04 Body In The Lake.mp3">Body In The Lake</a></li>
            <li><a href="/mp3/05 Homesick.mp3">Homesick</a></li>
            <li><a href="/mp3/06 Red Sonja.mp3">Red Sonja</a></li>
            <li><a href="/mp3/08 A Little Me And You.mp3">A Little Me And You</a></li>
            <li><a href="/mp3/09 If I Do.mp3">If I Do</a></li>
            <li><a href="/mp3/10 Will The Circle Be Unbroken.mp3">Will The Circle Be Unbroken</a></li>
          </ul>
        </div>
        <br/>
        <br/>
        <div className={`experience animated  ${this.randomAnimation}`} >
          <a class="link" href="https://music.apple.com/us/artist/the-unpronounceable/1580673897" target="_blank" rel="noopener noreferrer">Apple Music</a>
        </div>
        <br/>
        <br/>
        <div className={`experience animated ${this.randomAnimation} white copyright`} >
          &copy;1999-2021 the unpronounceable
        </div>
      </div>
    );
  }
}
