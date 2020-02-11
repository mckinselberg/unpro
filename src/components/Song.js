import React, {Component} from 'react';
import { sample } from 'lodash';
import splashlogo from '../img/vivalosbeefalos.gif';
 
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
      randomAnimation1:null,
      randomAnimation2:null
    }
    this.randomAnimation = sample(this.state.animations);
  }
  componentDidMount() {
    //setTimeout(()=> {
      //this.setState({
        //randomAnimation1:sample(this.state.animations),
        //randomAnimation2:sample(this.state.animations)
      //})
    //},1000)
  }
  render() {
    return (
      <div class="songs">
        <a>Kill Myself</a>
      </div>
    );
  }
}
