import React,{PureComponent} from 'react'
import PropTypes from 'prop-types';
import omit from 'lodash/omit';
import cn from 'astro-classname';

let prefixCls = 'nui-message';
export default class Message extends PureComponent{
    
    static propTypes={
        content:PropTypes.string,
        duration:PropTypes.number,
        onClose:PropTypes.function
    }
    static defaultProps={
        content:'',
        duration:3
    }
    success=(content,duration,onClose)=>{
        let className=`${prefixCls}-successs`
        setImmediate(function(){
            className=prefixCls
            // onClose()
        },duration||2)
        return(
            <div>
                <span className={className}>{content}</span>
            </div>
        )
    }
    error=(content,duration,onClose)=>{
        let className=`${prefixCls}-error`
        setImmediate(function(){
            className=prefixCls
            // onClose()
        },duration||2)
        return(
            <div>
                <span className={className}>{content}</span>
            </div>
        )
    }
    // message={
    //     success:this.success,
    //     error:this.error
    // }
    render(){
       let message={
            success:this.success,
            error:this.error
        }
        return (
            <div>
                xcas
            </div>
        )
    }
}