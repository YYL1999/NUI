import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
export default class SelectOption extends React.PureComponent{
    static propTypes = {
        disabled:PropTypes.bool,
        classname:PropTypes.string,
        active:PropTypes.bool,
        value:PropTypes.any.isRequired,
        children:PropTypes.node
    }
    static defaultProps = {
        disabled:false
    }
   constructor(props){
     super(props)
     this.state = {
      active: this.props.active || false,
      visible : true
  }
   }
    get labelName() {
        return (this.props.children || '').toString()
    }
    isEqual (a,b) {
        return a===b
    }
    contains (target,arr=[]){
        return arr.indexOf(target)>-1
    }
    findIndex (val,array) {
        let ind =-1
        if (array.length<=0) return ind
        array.foreach((item,index) => {
          if(item.value===val){
              ind=index
              return ind
          }
        })
        return ind
    }
    parent () {
      console.log(this)
        return this.context.componentSelect
    }
    optionClickHandle = () => {
        const { active } = this.state
        const { value } = this.props
        const { multiple } = this.parent() ? this.parent().props : false
        if (active && !multiple) {
          this.parent().toggleOptionsHandle()
          return
        }
        if (active && multiple) {
          this.parent().selectMultipleDelete(value)
          return
        }
        const index = this.findIndex(value, this.parent().state.optionList)
        if (this.props.disabled) return
        this.parent().selectOptionHandle({
          value: value,
          name: this.labelName,
          index,
          node: { value, name: this.labelName },
        })
      }
      handleActive = props => {
        if (!this.parent().props.multiple) {
          this.setState({
            active:
              this.isEqual(this.props.value, this.parent().state.value) ||
              this.isEqual(
                this.props.value,
                props ? props.value : this.parent().props.value
              ),
            visible: true,
          })
        } else {
          this.setState({
            active:
              this.contains(this.props.value, this.parent().state.value) ||
              this.contains(
                this.props.value,
                props ? props.value : this.parent().props.value
              ),
            visible: true,
          })
        }
      }
      componentWillMount() {
        if (this.parent()) {
          this.parent().onOptionCreate(this)
        }
      }
      componentDidMount() {
        this.parent() && this.handleActive()
      }
      componentWillUnmount() {
        this.parent().onOptionDestroy(this)
      }
      queryChange(query, filterMethod) {
        if (!this.parent().props.searchable) return
        let defaultMethod = (input = '', option) => {
          if (option) {
            return option.toLowerCase().indexOf(input.toLowerCase()) > -1
          }
          return false
        }
    
        if (typeof filterMethod === 'function') {
          defaultMethod = filterMethod
          defaultMethod(query, this.getLabel())
        } else {
          const visible = defaultMethod(query, this.getLabel())
    
          this.setState({ visible })
        }
      }
      getLabel() {
        return (
          this.labelName ||
          (typeof this.props.value === 'string' ||
          typeof this.props.value === 'number'
            ? this.props.value.toString()
            : '')
        )
      }
      render() {
        const { disabled, className, children, ...others } = this.props
        const { active } = this.state
        const { visible } = this.state
        const displayStyle = visible ? {} : { display: 'none' }
        return (
              <li
              {...others}
              style={displayStyle}
              className={classnames('nui-select-option', { active, disabled }, className)}
              onClick={this.optionClickHandle}
            >
              {children}
            </li>
        )
      }
}
SelectOption.contextTypes = {
    componentSelect:PropTypes.any
}