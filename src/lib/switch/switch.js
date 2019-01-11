import React, {PureComponent} from 'react'
import PropTypes from 'prop-types'
import RcSwitch from 'rc-switch'
import omit from 'lodash/omit'
import Icon from '../icon/index'
import cn from 'astro-classname'
import './index.scss'

export default class Switch extends PureComponent{
   static defaultProps={
    prefixCls: 'nui-switch'
   }
   static propsTypes={
       prefixCls:PropTypes.string,
       size:PropTypes.oneOf(["small","default","large"]),
       className:PropTypes.string
   }
   focus() {
    this.rcSwitch.focus();
  }

  blur() {
    this.rcSwitch.blur();
  }

  saveSwitch = (node) => {
    this.rcSwitch = node;
  }
   render() {
    const { prefixCls, size, loading, className = '' } = this.props;
    const classes = cn(className, {
      [`${prefixCls}-small`]: size === 'small',
      [`${prefixCls}-loading`]: loading,
    });
    const loadingIcon = loading ? (
      <Icon
        type="loading"
        className={`${prefixCls}-loading-icon`}
      />
    ) : null;
    return (
    //   <Wave insertExtraNode>
        <RcSwitch
          {...omit(this.props, ['loading'])}
          className={classes}
          ref={this.saveSwitch}
          loadingIcon={loadingIcon}
        />
    //   </Wave>
    );
  }
}
