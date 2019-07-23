import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import './index.scss'
const Breadcrumb = ({children, className, ...others})=>{
    const _children = React.Children.map(children,(child,index)=>{
        if(!child){
            return child
        }
        return (
            <li key={index} className='nui-breadcrumb-item'>
                {child}
            </li>
        )
    })
    return (
        <ol
        {...others}
        className={classnames('nui-breadcrumb nui-breadcrumb-arrow',className)}
        >
            {_children}
        </ol>
    )
}
Breadcrumb.PropTypes={
    className:PropTypes.string,
    children:PropTypes.node
}
export default Breadcrumb
