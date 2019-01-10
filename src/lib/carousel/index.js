import React,{PureComponent} from 'react';
import Slider from './slider';
import PropTypes from 'prop-types';

export default class Carousel extends PureComponent{
    
    static propTypes = {
        item: PropTypes.object,
        speed:PropTypes.number,
        delay:PropTypes.number,
        pause:PropTypes.bool,
        autoplay:PropTypes.bool,
        dots:PropTypes.bool,
        arrows:PropTypes.bool
      }
    
      static defaultProps = {
        item: {},
        speed:3,
        delay:1.3,
        pause:true,
        autoplay:true,
        dots:true,
        arrows:true
      }
    render(){
    const {speed,delay,pause,autoplay,dots,arrows}=this.props
    const image_Date=this.props.items
    return(
      <div>
        <Slider
    items={image_Date}
    speed={speed}
    delay={delay}
    pause={pause}
    autoplay={autoplay}
    dots={dots}
    arrows={arrows}
  />
      </div>
    )
   }
}
