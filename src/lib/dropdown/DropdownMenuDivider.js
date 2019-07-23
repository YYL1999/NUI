import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'

const DropdownMenuDivider = ({ className }) => {
  return <li className={classnames('nui-dropdown-divider', className)} />
}

DropdownMenuDivider.propTypes = {
  className: PropTypes.string,
}

export default DropdownMenuDivider
