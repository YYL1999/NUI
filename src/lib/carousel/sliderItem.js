import React, { PureComponent } from 'react';

export default class SliderItem extends PureComponent {

  render() {
    let { count, item } = this.props;
    let width = 100 / count + '%';
    return (
      <li className="slider-item" style={{width: width}}>
        <img src={item.src} alt={item.alt} />
      </li>
    );
  }
}
