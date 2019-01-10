import React,{PureComponent} from 'react'
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import cn from 'astro-classname';

let prefixCls = 'nui-message';
export class Message extends PureComponent{
    
    static propTypes={
        content:PropTypes.string,
        duration:PropTypes.number,
        onClose:PropTypes.function
    }
    static defaultProps={
        content:'',
        duration:3
    }

}