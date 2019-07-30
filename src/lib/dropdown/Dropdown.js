import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import DropdownTrigger from './DropdownTrigger'
import DropdownMenu from './DropdownMenu'
import DropdownMenuItem from './DropdownMenuItem'
import DropdownMenuDivider from './DropdownMenuDivider'
import * as System from '../utils/system'
import "./index.scss"
export default class Dropdown extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    System.manager(this)

    this.state = {
      active: undefined === props.active ? false : props.active,
    }
  }

  static propTypes = {
    active: PropTypes.bool,
    trigger: PropTypes.oneOf(['click', 'hover']),
    children: PropTypes.array.isRequired,
    className: PropTypes.string,
  }
  static defaultProps = {
    active: false,
    trigger: 'click',
  }

  toggleOptionsHandle = flag => {
    let { active } = this.state

    this.setState({
      active: typeof flag === 'boolean' ? flag : !active,
    })
  }

  hideOptionsHandle = () => {
    this.setState({
      active: false,
    })
  }

  componentWillUnmount() {
    System.unmanager(this)
  }

  render() {
    const { trigger, className, ...others } = this.props
    const { active } = this.state
    let { children } = this.props

    children = React.Children.map(children, child => {
      if (!child) {
        return child
      }

      return React.cloneElement(child, {
        trigger,
        toggleMenu: this.toggleOptionsHandle,
      })
    })

    if (trigger === 'hover') {
      others.onMouseOver = () => this.toggleOptionsHandle(true)
      others.onMouseOut = () => this.toggleOptionsHandle(false)
    }

    delete others.active

    return (
      <div
        {...others}
        className={classnames('nui-dropdown', { active }, className)}
      >
        {children}
      </div>
    )
  }
}

Dropdown.Trigger = DropdownTrigger
Dropdown.Menu = DropdownMenu
Dropdown.MenuItem = DropdownMenuItem
Dropdown.MenuDivider = DropdownMenuDivider
