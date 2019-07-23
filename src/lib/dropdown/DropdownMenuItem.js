import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

export default class DropdownMenuItem extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    disabled: PropTypes.bool,
    onClick: PropTypes.func,
    toggleMenu: PropTypes.func,
  }
  static defaultProps = {
    disabled: false,
  }
  onClickHandle = () => {
    const { disabled, onClick, toggleMenu } = this.props
    !disabled && onClick && onClick()
    toggleMenu()
  }

  render() {
    const { disabled, className, children } = this.props

    return (
      <li
        onClick={this.onClickHandle}
        className={classnames('nui-dropdown-item', { disabled }, className)}
      >
        {children}
      </li>
    )
  }
}
