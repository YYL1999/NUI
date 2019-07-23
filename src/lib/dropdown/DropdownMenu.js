import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

export default class DropdownMenu extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    right: PropTypes.bool,
    toggleMenu: PropTypes.func,
  }

  static defaultProps = {
    right: false,
  }

  render() {
    const { toggleMenu, right, className } = this.props
    let { children } = this.props

    children = React.Children.map(children, child => {
      if (!child) {
        return child
      }

      return React.cloneElement(child, {
        toggleMenu,
      })
    })

    return (
      <div className='nui-dropdown-picker'>
        <div className='nui-dropdown-gap' />
        <ul
          className={classnames(
            'nui-dropdown-menu',
            { 'nui-dropdown-menu-right': right },
            className
          )}
        >
          {children}
        </ul>
      </div>
    )
  }
}