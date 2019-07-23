import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import ReactCSSTransitionGroup from 'react-addons-css-transition-group'
import Notice from '../notice'
import './index.scss'
let _notification

 class Notification extends React.Component {
  constructor(props, context) {
    super(props, context)

    this.state = {}
    this.key = 0
    this.timers = []
    _notification = this
  }
  static propTypes = {
    className: PropTypes.string,
    closeable: PropTypes.bool,
  }

  static defaultProps = {
    closeable: true,
  }
  componentWillUnmount() {
    this.timers.forEach(timer => {
      clearTimeout(timer)
    })
  }

  /**
   * 添加通知
   * @param title
   * @param message
   * @param duration {number} [duration=2000] - 通知显示时长，单位ms.
   * @param closeable
   * @param theme
   */
  addNotice=(
    { title, message, duration = 2000, closeable = this.props.closeable },
    theme
  ) =>{
    const key = this.key++
    const state = { ...this.state }

    state[key] = {
      title,
      message,
      theme,
      closeable,
    }
    this.setState(state)
    this.timeToRemoveNotice(key, duration)
  }
  /**
   * 移除通知
   * @param key
   */
  removeNotice = key => {
    delete this.state[key]
     this.setState(this.state)
  
  }

  /**
   * 移除通知
   * @param key
   * @param duration
   */
  timeToRemoveNotice(key, duration) {
    this.timers.push(
      setTimeout(() => {
        this.removeNotice(key)
      }, duration)
    )
  }

  handleClearTimer = key => {
    const stateData = this.state[key]
    if (stateData && stateData.closeable) {
      clearTimeout(this.timers[key])
    }
  }

  render() {
    const { className } = this.props
    return (
      <div className={classnames('nui-notification', className)}>
        <ReactCSSTransitionGroup
          component='div'
          transitionName='nui-notice'
          transitionEnterTimeout={200}
          transitionLeaveTimeout={800}
        >
          {Object.keys(this.state).map(key => (
            <Notice
              key={key}
              theme={this.state[key].theme}
              closeable={this.state[key].closeable}
              title={this.state[key].title}
              close={() => this.removeNotice(key)}
              onMouseEnter={() => this.handleClearTimer(key)}
            >
              {this.state[key].message}
            </Notice>
          ))}
        </ReactCSSTransitionGroup>
      </div>
    )
  }
}

  
Notification.info = options => {

 _notification.addNotice(options, 'info')
}
Notification.success = options => {
  _notification.addNotice(options, 'success')
}
Notification.warning = options => {
  _notification.addNotice(options, 'warning')
}
Notification.error = options => {
  _notification.addNotice(options, 'danger')
}
export default Notification