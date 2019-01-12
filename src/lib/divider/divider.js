import React,{PureComponent} from 'react'
import classNames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'
export default class Divider extends PureComponent{
  static propTypes={
     dashed:PropTypes.bool,
     orientation:PropTypes.oneOf(['left','center','right']),
     type:PropTypes.oneOf(['horizontal','vertical'])
  }
  static defaultProps={
     dashed:false,
     orientation:'',
     type:'horizontal'
  }
  render(){
    const {
        prefixCls = 'nui',
        type = 'horizontal',
        orientation = '',
        className,
        children,
        dashed,
        ...restProps
      } = this.props;
  
      const orientationPrefix = (orientation.length > 0) ? '-' + orientation : orientation;
      const classString = classNames (
        className, `${prefixCls}-divider`, `${prefixCls}-divider-${type}`, {
        [`${prefixCls}-divider-with-text${orientationPrefix}`]: children,
        [`${prefixCls}-divider-dashed`]: !!dashed,
      });
      return(
        <div className={classString} {...restProps}>
        {children && <span className={`${prefixCls}-divider-inner-text`}>{children}</span>}
      </div>
      )
  }
}