import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon'

const DropdownTrigger = ({
  trigger,
  toggleMenu,
  className,
  children,
  ...others
}) => {
  let options = {}

  if (trigger === 'click') {
    options.onClick = toggleMenu
  }

  children = React.cloneElement(
    children,
    options,
    <span>
      {children.props.children}
      <Icon className='nui-dropdown-caret' right type='xiala' />
    </span>
  )

  return (
    <span {...others} className={classnames('nui-dropdown-toggle', className)}>
      {children}
    </span>
  )
}

DropdownTrigger.propTypes = {
  children: PropTypes.element.isRequired,
  className: PropTypes.string,
  trigger: PropTypes.oneOf(['click', 'hover']),
  toggleMenu: PropTypes.func,
}

export default DropdownTrigger
