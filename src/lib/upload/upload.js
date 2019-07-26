import classnames from 'classnames'
import React from 'react'
import PropTypes from 'prop-types'
import Icon from '../icon'
import './index.scss'
export default class Upload extends React.PureComponent {
  static propTypes = {
    className: PropTypes.string,
    btnText: PropTypes.string,
    placeholder: PropTypes.string,
    btnStyle: PropTypes.string,
    preview: PropTypes.bool,
    message: PropTypes.string,
    src: PropTypes.string,
    accept: PropTypes.string,
    children: PropTypes.node,
    onChange: PropTypes.func.isRequired,
  }

  static defaultProps = {
    btnText: '浏览',
    btnStyle: 'default',
    placeholder: '请选择要上传的附件',
    preview: false,
  }

  constructor(props, context) {
    super(props, context)

    this.fileRef = element => {
      this.fileInput = element
    }
    this.state = {
      file: '',
      previewImageUrl: this.props.src,
    }
  }

  getValue() {
    return this.fileInput.files[0]
  }

  setValue(value) {
    this.fileInput.files[0] = value
  }

  componentWillReceiveProps(newProps) {
    this.setState({
      previewImageUrl: newProps.src,
    })
  }

  /**
   * 打开文件浏览器对话框
   */
  handleOpenFileDialog = () => {
    this.fileInput.click()
  }

  /**
   * 设置文件名
   */
  handleFileChange = event => {
    const { onChange } = this.props

    this.setState({
      file: event.target.files[0].name,
    })

    onChange(event)
  }

  /**
   * 图片预览处理
   */
  handleImagePreview = event => {
    const { onChange } = this.props
    onChange(event)
  }

  handleRemoveImg = event => {
    event.stopPropagation()
    const { onChange } = this.props
    this.fileInput.value = ''
    this.setState({
      previewImageUrl: '',
    })

    onChange(event)
  }

  render() {
    const {
      preview,
      message,
      btnText,
      btnStyle,
      placeholder,
      className,
      accept,
      ...others
    } = this.props
    delete others.onChange
    const { file, previewImageUrl } = this.state
    let { children } = this.props

    if (preview) {
      if (children) {
        children = React.cloneElement(children, {
          className: classnames(
            'nui-upload-preview-addon',
            children.props.className
          ),
        })
      }

      return (
        <div className='nui-upload-preview' onClick={this.handleOpenFileDialog}>
          <input
            type='file'
            accept={accept}
            ref={this.fileRef}
            onChange={this.handleImagePreview}
          />
          {previewImageUrl ? (
            <div className='nui-upload-preview-inner nui-upload-preview-img'>
              <img src={previewImageUrl} />
              <div
                className='nui-upload-preview-remove'
                onClick={this.handleRemoveImg}
              >
                <Icon type='trash' />
              </div>
            </div>
          ) : (
            <div className='nui-upload-preview-inner nui-upload-preview-tool'>
              {children || (
                <Icon type='camera' className='nui-upload-preview-addon' />
              )}
              {!!message && (
                <span className='nui-upload-preview-text'>{message}</span>
              )}
            </div>
          )}
        </div>
      )
    }

    return (
      <div
        {...others}
        className={classnames('nui-input-group', 'nui-input-group-upload', className)}
        onClick={this.handleOpenFileDialog}
      >
        <span className='nui-form-control'>
          <Icon type='upload' className='nui-upload-addon' />
          {file || placeholder}
        </span>
        {/* 此处input只能放在中间，否则圆角样式会有问题 */}
        <input
          type='file'
          accept={accept}
          ref={this.fileRef}
          onChange={this.handleFileChange}
        />
        <span className='nui-input-group-btn'>
          <button
            type='button'
            className={classnames('nui-btn', `nui-btn-${btnStyle}`)}
          >
            {btnText}
          </button>
        </span>
      </div>
    )
  }
}

Upload.getValue = ref => {
  if (!ref) return undefined

  return ref.getValue()
}

Upload.setValue = (ref, value) => {
  if (!ref) return

  ref.setValue(value)
}
