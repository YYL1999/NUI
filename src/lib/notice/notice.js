import classnames from 'classnames'
import React, { PureComponent } from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon'
 //import '../notification/index.scss'
/**
 * Notice组件.
 */
export default class Notice extends PureComponent {
  static propTypes = {
    className: PropTypes.string,
    children: PropTypes.node,
    theme: PropTypes.oneOf(['info', 'success', 'warning', 'danger']),
    title: PropTypes.string,
    message: PropTypes.string,
    close: PropTypes.func,
    closeable: PropTypes.bool,
    onMouseEnter: PropTypes.func,
  }

  static defaultProps = {
    theme: 'info',
    title: '通知',
  }

  /**
   * 获取图标样式
   * @return Array 图标样式
   */
  getTitleIcon() {
    const themeMap = {
      info: [ 'message'],
      success: [ 'success'],
      warning: [ 'warning'],
      danger: [ 'error'],
    }

    return themeMap[this.props.theme]
  }

  render() {
    const iconClass = this.getTitleIcon()
    return (
      <div
        className={classnames(
          'nui-notice',
          `nui-notice-${this.props.theme}`,
          this.props.className
        )}
        onMouseEnter={this.props.onMouseEnter}
      >
        <div className='nui-notice-header'>
          {/* <i className={classnames(iconClass)} /> */}
          <Icon type={classnames(iconClass)}></Icon>
        </div>
        <div className='nui-notice-body'>
          {this.props.closeable && (
            <button type='button' className='nui-close' onClick={this.props.close}>
              &times;
            </button>
          )}
          <div className='nui-notice-title'>{this.props.title}</div>
          <div className='nui-notice-content'>
            {this.props.message || this.props.children}
          </div>
        </div>
      </div>
    )
  }
}
