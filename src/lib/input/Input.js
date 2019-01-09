import React, {PureComponent} from 'react'
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import cn from 'astro-classname';

export default class Input extends PureComponent{
    static defaultProps={
       prefixCls: 'nui-input',
       type: 'text',
       disabled: false
    };
    static PropTypes={
        type: PropTypes.string,
    id: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    size: PropTypes.oneOf(['small', 'default', 'large']),
    maxLength: PropTypes.oneOfType([
      PropTypes.string,
      PropTypes.number,
    ]),
    disabled: PropTypes.bool,
    value: PropTypes.any,
    defaultValue: PropTypes.any,
    className: PropTypes.string,
    addonBefore: PropTypes.node,
    addonAfter: PropTypes.node,
    prefixCls: PropTypes.string,
    onPressEnter: PropTypes.func,
    onKeyDown: PropTypes.func,
    onKeyUp: PropTypes.func,
    onFocus: PropTypes.func,
    onBlur: PropTypes.func,
    prefix: PropTypes.node,
    suffix: PropTypes.node,
    }
    handleKeyDown = (e) => {
        const { onPressEnter, onKeyDown } = this.props;
        if (e.keyCode === 13 && onPressEnter) {
          onPressEnter(e);
        }
        if (onKeyDown) {
          onKeyDown(e);
        }
      }
    
      focus() {
        this.input.focus();
      }
    
      blur() {
        this.input.blur();
      }
    
      select() {
        this.input.select();
      }
    
    getInputClassName() {
        const { prefixCls, size, disabled } = this.props;
        return cn(prefixCls, {
          [`${prefixCls}-small`]: size === 'small',
          [`${prefixCls}-large`]: size === 'large',
          [`${prefixCls}-disabled`]: disabled,
        });
      }
    
}
