import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import * as System from '../../utils/system'
import * as R from 'ramda'
import {DebounceInput} from 'react-debounce-input'
import PerfectScrollbar from 'perfect-scrollbar'
import Tag from '../tag'
import Popper from 'popper.js'
import SelectOption from './selectOption'
import './index.scss'
const isContainer = (text,array)=>{
    return array.some(item => {
        return item.name.toLocaleUpperCase().indexOf(text.toLocaleUpperCase())> -1
    })
}

export default class Select extends React.PureComponent{
    constructor(props,context){
        super(props,context)
        System.manager(this)
        this.isPuppet=props.value !==undefined
        this.selectPopper = null
        this.options =[]
        this.selectScrollbar = null
        const initValue = {
            showOption: false,
            value: this.isPuppet ? undefined : props.defaultValue,
            isSearch: false,
            selectText: '', // 选中字段
            options: [],
            optionGroup: [],
            selectedItem: this.props.multiple ? [] : {},
            optionList: [],
            currentPlaceholder: this.props.placeholder,
            queryText: '', // 搜索字段
            showClear: false,
          }
      
          this.state = {
            ...initValue,
          }
    }
    static propTypes = {
        value: PropTypes.any,
        defaultValue: PropTypes.any,
        multiple: PropTypes.bool,
        disabled: PropTypes.bool,
        clearable: PropTypes.bool,
        searchable: PropTypes.bool,
        style: PropTypes.object,
        className: PropTypes.string,
        required: PropTypes.bool,
        placeholder: PropTypes.string,
        onChange: PropTypes.func,
        onDelete: PropTypes.func,
        filterMethod: PropTypes.func,
        children: PropTypes.node,
      }
      static defaultProps = {
        disabled: false,
        placeholder: '请选择',
      }
    
      componentDidMount() {
       
        this.handleInit()
      }
     
      /**
       * @description 初始化
       * @memberof Select
       */
      handleInit = props => {
        this.handleValueChange(props)
      }
      getChildContext() {
        return {
          componentSelect: this,
        }
      }
    
      getOptionList = (arr = []) => {
        return arr.map(option => {
          const { value, children = '' } = option.props
          return { value, name: children.toString() }
        })
      }
    
      /**
       * @description 隐藏菜单
       * @memberof Select
       */
      hideOptionsHandle = () => {
        this.setState({ showOption: false }, () => {
          const { optionGroup, options } = this.state
          options.forEach(option => {
            option.queryChange('')
          })
          optionGroup.forEach(option => {
            option.queryChange('')
          })
          this.selectPopper && this.selectPopper.destroy()
          this.handleDestroySelectScroll()
        })
      }
    
      handleValueChange(props) {
        const { options } = this.state
        const optionList = this.getOptionList(options)
        const { multiple } = this.props
        const originValue = this.isPuppet
          ? props !== undefined
            ? props.value
            : this.props.value
          : this.state.value
        let dataToSet
        if (!multiple) {
          let selectedItem
          if (optionList.length > 0) {
            selectedItem = optionList.find(option => {
              return option.value === originValue
            })
          }
          if (selectedItem) {
            dataToSet = {
              selectedItem,
              selectText: selectedItem.name || selectedItem.value,
            }
          } else {
            dataToSet = {
              selectedItem: {},
              selectText: '',
            }
          }
        } else {
          let selectList = []
          originValue &&
            originValue.length > 0 &&
            optionList.length > 0 &&
            originValue.forEach(val => {
              const item = optionList.find(option => {
                return option.value === val
              })
              item && selectList.push(item)
            })
          if (!this.isPuppet) {
            dataToSet = {
              selectedItem: selectList || [],
              selectText: '',
              value: originValue || [],
            }
          } else {
            dataToSet = {
              selectedItem: selectList || [],
              selectText: '',
              value: '',
            }
          }
        }
        this.setState(dataToSet, () => {
          this.options.forEach(option => option.handleActive())
        })
      }
      getValue() {
        return this.isPuppet ? this.props.value : this.state.value
      }
    
      setValue(value) {
        const { options } = this.state
        const optionList = this.getOptionList(options)
        if (!this.isPuppet) {
          if (!this.props.multiple) {
            if (!value) {
              this.setState({
                selectText: '',
              })
            } else {
              optionList.forEach(option => {
                if (value === option.value) {
                  this.setState({
                    selectText: option.value,
                  })
                }
              })
            }
            this.setState(
              {
                value,
              },
              () => {
                options.forEach(option => option.handleActive())
              }
            )
          } else {
            let selected = []
            let valueList = []
            optionList.forEach(option => {
              if (value === option.value) {
                selected.push(option)
                valueList.push(option.value)
              }
            })
            this.setState(
              {
                value: valueList,
                selectedItem: selected,
              },
              () => {
                options.forEach(option => option.handleActive())
              }
            )
          }
        }
      }
    
      /**
       * @description  focus
       * @memberof Select
       */
      focus() {
        this.refs.main.focus()
      }
    
      /**
       * @description 显示/隐藏菜单
       * @memberof Select
       */
      toggleOptionsHandle = () => {
        const { optionGroup } = this.state
        if (this.props.disabled) return
        this.setState(
          {
            showOption: !this.state.showOption,
            queryText: '',
          },
          () => {
            optionGroup.forEach(option => {
              option.queryChange('')
            })
            if (this.state.showOption) {
              this.selectPopper = new Popper(this.selectMain, this.selectOption, {
                positionFixed: true,
                placement: 'bottom-start',
                modifiers: {
                  offset: { offset: '0, 10' },
                },
              })
              this.handleInitSelectScroll()
            } else {
              this.selectPopper && this.selectPopper.destroy()
              this.handleDestroySelectScroll()
            }
          }
        )
      }
    
      /**
       * @description 多选删除
       * @param {*} newVal
       * @param {*} e
       * @returns
       * @memberof Select
       */
      selectMultipleDelete(newVal, e) {
        const { placeholder, onDelete, disabled } = this.props
        const { selectedItem, value, options } = this.state
        if (disabled) return
        if (this.isPuppet) {
          onDelete && onDelete(newVal)
          if (e) e.stopPropagation()
    
          return false
        }
    
        let list = selectedItem.filter(item => item.value !== newVal)
        let val = value.filter(item => item !== newVal)
        this.setState({ selectedItem: list, value: val }, () => {
          options.forEach(option => {
            option.handleActive()
          })
    
          onDelete && onDelete(newVal)
        })
        if (list.length <= 0) {
          this.setState({ currentPlaceholder: placeholder })
        }
        this.selectPopper && this.selectPopper.update()
        this.selectInner.scrollTop = 0
        this.handleUpdateSelectScroll()
        if (e) e.stopPropagation()
      }
    
      /**
       * option选中回调
       * @param {String} 值
       * @param {String} 显示文本
       * @param {Number} 索引
       */
      selectOptionHandle(result) {
        const { onChange, value, multiple } = this.props
        const { options, selectedItem, optionGroup } = this.state
        const originValue = this.isPuppet ? value : this.state.value
        if (multiple) {
          this.setState({ currentPlaceholder: '' })
        }
        // 木偶组件
        if (!this.isPuppet) {
          this.setState(
            {
              value: multiple ? [...originValue, result.value] : result.value,
              selectText: multiple ? '' : result.name,
              selectedItem: multiple ? [...selectedItem, result.node] : result.node,
            },
            () => {
              options.forEach(option => option.handleActive())
              onChange &&
                result.value !== originValue &&
                onChange(result.value, result.name)
            }
          )
        } else {
          onChange &&
            result.value !== originValue &&
            onChange(result.value, result.name)
        }
        this.setState(
          {
            showOption: !!multiple,
            queryText: '',
          },
          () => {
            optionGroup.forEach(option => {
              option.queryChange('')
            })
            this.selectPopper && this.selectPopper.update()
            this.handleUpdateSelectScroll()
          }
        )
      }
    
      /**
       * 清空组件管理
       */
      componentWillUnmount() {
        System.unmanager(this)
      }
    
      componentWillReceiveProps(nextProps) {
        const { options } = this.state
        if (!R.equals(nextProps.children, this.props.children)) {
          if (!this.isPuppet) {
            this.setState(
              {
                value: '',
                selectedItem: [],
                selectText: '',
              },
              () => options.forEach(option => option.handleActive(nextProps))
            )
          }
        }
        if (!R.equals(nextProps.value, this.props.value)) {
          this.handleInit(nextProps)
          options.forEach(option => option.handleActive(nextProps))
        }
      }
    
      onOptionCreate(option) {
        this.state.options.push(option)
        this.forceUpdate()
        this.handleInit()
      }
    
      onOptionGroupCreate(option) {
        this.state.optionGroup.push(option)
        this.forceUpdate()
      }
    
      onOptionGroupDestroy(option) {
        const { optionGroup } = this.state
        const index = optionGroup.indexOf(option)
        if (index > -1) {
          optionGroup.splice(index, 1)
        }
        this.forceUpdate()
      }
    
      onOptionDestroy(option) {
        const { options } = this.state
        const index = options.indexOf(option)
        if (index > -1) {
          options.splice(index, 1)
        }
        this.forceUpdate()
        this.handleInit()
      }
    
      handleQuery(event) {
        const val = event.target.value
        const { options, optionGroup } = this.state
        const { filterMethod } = this.props
        this.setState({ queryText: val }, () => {
          options.forEach(option => {
            option.queryChange(val, filterMethod)
          })
          optionGroup.forEach(option => {
            option.queryChange(val)
          })
          this.selectPopper && this.selectPopper.update()
          this.selectInner.scrollTop = 0
          this.handleUpdateSelectScroll()
        })
      }
    
      handleInitSelectScroll = () => {
        window.requestAnimationFrame(() => {
          this.selectInner.scrollTop = 0
          this.selectScrollbar = new PerfectScrollbar(this.selectInner, {
            suppressScrollX: true,
          })
        })
      }
    
      handleDestroySelectScroll = () => {
        if (this.selectScrollbar) {
          this.selectScrollbar.destroy()
          this.selectScrollbar = null
        }
      }
    
      handleUpdateSelectScroll = () => {
        window.requestAnimationFrame(() => {
          this.selectScrollbar && this.selectScrollbar.update()
        })
      }
    
      get emptyText() {
        const { searchable, filterMethod } = this.props
        const { options, queryText } = this.state
        const optionList = this.getOptionList(options)
        if (options.length === 0) {
          return '暂无数据'
        }
        if (searchable && !isContainer(queryText, optionList) && !filterMethod) {
          return '暂无数据'
        }
    
        return null
      }
    
      get wrapClass() {
        const { multiple } = this.props
        if (!multiple) return 'nui-select-options-normal'
        if (multiple) return 'nui-select-options-multiple'
      }
      /**
       * @description 显示清空按钮
       * @memberof Select
       */
      handleShowClear = () => {
        const showClear = !this.props.disabled && this.refMain && this.refMain.value
        this.setState({ showClear })
      }
    
      /**
       * @description 隐藏清空按钮
       * @memberof Select
       */
      handleHideClear = () => {
        this.setState({
          showClear: false,
        })
      }
    
      /**
       * @description 清空选项事件
       * @memberof Select
       */
      handleClearSelect = () => {
        const { disabled, onChange } = this.props
        const { options } = this.state
    
        if (disabled) {
          return
        }
        if (!this.isPuppet) {
          this.refMain && (this.refMain.value = '')
        }
        this.setState(
          {
            showClear: false,
            selectText: '',
            value: '',
            showOption: false,
          },
          () => {
            options.forEach(option => option.handleActive())
            onChange && onChange('')
          }
        )
      }
    
      render() {
        const {
          disabled,
          style,
          className,
          searchable,
          multiple,
          required,
          placeholder,
          clearable,
        } = this.props
        const {
          showOption,
          selectText,
          queryText,
          currentPlaceholder,
          selectedItem,
          showClear,
        } = this.state
        let { children } = this.props
        const optionWidth = this.selectMain && this.selectMain.offsetWidth
        return (

            <div
            style={style}
            className={classnames(
              'nui-select',
              { 'nui-select-multiple': multiple },
              { disabled },
              { required },
              { open: showOption },
              className
            )}
            disabled={disabled}
            ref={ref => (this.selectMain = ref)}
            onMouseEnter={this.handleShowClear}
            onMouseLeave={this.handleHideClear}
          >
            {multiple && (
              <div className='nui-select-tags' onClick={this.toggleOptionsHandle}>
                {selectedItem.length <= 0 && (
                  <span className='nui-select-placeholder'>{placeholder}</span>
                )}
                {selectedItem.length > 0 &&
                  selectedItem.map(item => {
                    const val = item.value
                    return (
                      <Tag
                        closable
                        theme='default'
                        onClose={e => this.selectMultipleDelete(val, e)}
                        className='nui-offset-l'
                        key={item.value}
                      >
                        {item.name}
                      </Tag>
                    )
                  })}
              </div>
            )}
            {!multiple && (
              <input
                type='text'
                value={selectText}
                readOnly
                placeholder={currentPlaceholder}
                disabled={disabled}
                className={classnames('nui-select-selection')}
                onClick={this.toggleOptionsHandle}
                ref={ref => (this.refMain = ref)}
              />
            )}
            {(!showClear || !clearable) && (
              <i
                className='nui-fa nui-fa-chevron-down nui-select-addon'
                onClick={this.toggleOptionsHandle}
              />
            )}
    
            {clearable && showClear && !multiple && (
              <i
                className='nui-fa nui-fa-times nui-select-addon'
                onClick={this.handleClearSelect}
              />
            )}
            <div
              className={classnames(
                {
                  hidden: !showOption,
                },
                'nui-select-option-outer'
              )}
              ref={ref => (this.selectOption = ref)}
              style={{ width: optionWidth }}
            >
              <div className={classnames(this.wrapClass, 'nui-select-options-wrap')}>
                {searchable && (
                  <div className='nui-select-search-wrap'>
                    <DebounceInput
                      debounceTimeout={500}
                      value={queryText}
                      onChange={e => this.handleQuery(e)}
                      className={classnames('nui-select-search-input')}
                    />
                    <i className='nui-fa nui-fa-search nui-select-search' />
                  </div>
                )}
                <ul
                  className='nui-select-options'
                  ref={ref => (this.selectInner = ref)}
                >
                  {children}
                  {this.emptyText && (
                    <p className='nui-select-empty'>{this.emptyText}</p>
                  )}
                </ul>
              </div>
            </div>
          </div>
        )
      }
}

Select.getValue = ref => {
    if (!ref) return undefined
  
    return ref.getValue()
  }
  
  Select.setValue = (ref, value) => {
    if (!ref) return
  
    ref.setValue(value)
  }
  
  Select.childContextTypes = {
    componentSelect: PropTypes.any,
  }
  Select.Option = SelectOption