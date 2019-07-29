import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import LoadingAddon from './loadingAddon'
import './index.scss'
let _loading
let _startDate
let _endDate
let _duration = 1000

export default class Loading extends React.PureComponent {
  constructor(props, context) {
    super(props, context)
    _loading = this

    props.duration && (_duration = props.duration)
    this.state = {
      show: false,
    }
  }

  static propTypes = {
    className: PropTypes.string,
    type: PropTypes.oneOf(['fountain', 'wave', 'pendule', 'cyclone', 'circle']),
    loadingMsg: PropTypes.string,
    closeable: PropTypes.bool,
    duration: PropTypes.number,
  }

  static defaultProps = {
    type: 'cyclone',
    closeable: false,
    loadingMsg: '加载中',
  }

  /**
   * 关闭loading.
   */
  hideHandle = () => {
    const { closeable } = this.props

    closeable &&
      this.setState({
        show: false,
      })
  }

  render() {
    const { type, loadingMsg, className } = this.props
    const { show } = this.state

    return (
      <div
        className={classnames('nui-loading-mask', { invisible: !show }, className)}
        onClick={this.hideHandle}
      >
        <LoadingAddon type={type} show={show} loadingMsg={loadingMsg} />
      </div>
    )
  }
}

Loading.Addon = LoadingAddon
Loading.show = () => {
  _startDate = new Date()
  _loading.setState({
    show: true,
  })
}

Loading.hide = () => {
  _endDate = new Date()
  if (_endDate - _startDate < _duration) {
    setTimeout(() => {
      _loading.setState({
        show: false,
      })
    }, _duration - (_endDate - _startDate))

    return
  }

  _loading.setState({
    show: false,
  })
}
