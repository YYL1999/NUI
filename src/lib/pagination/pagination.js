import React from 'react'
import classnames from 'classnames'
import PropTypes from 'prop-types'
import Input from '../input'
import './index.scss'
export default class Pagination extends React.PureComponent {
    static propTypes = {
        scope: PropTypes.number,
        activePage: PropTypes.number,
        totalPage: PropTypes.number,
        total: PropTypes.number,
        lastContent: PropTypes.node,
        nextContent: PropTypes.node,
        onSelect: PropTypes.func,
        showQuickJumper: PropTypes.bool,
        showTotal: PropTypes.bool,
        className: PropTypes.string,
    }
    constructor(props) {
        super(props)
        this.state = {
            currentPage: this.props.activePage,
            skipPageNo: ''
        }
    }
    prevPageHandle = () => {
        let {
            onSelect,
            activePage
        } = this.props
        activePage -= 1
        activePage >= 1 && onSelect && onSelect(activePage)
    }
    nextPageHandle = () => {
        let {
            onSelect,
            activePage,
            totalPage = 1
        } = this.props
        activePage += 1
        activePage <= totalPage && onSelect && onSelect(activePage)
    }
    goPageHandle = page => {
        const {
            currentPage
        } = this.state
        if (Number(currentPage) === Number(page)) return
        const {
            onSelect
        } = this.props
        onSelect && onSelect(page)
    }
    componentWillReceiveProps(nextProps) {
        if (Number(nextProps.activePage) !== Number(this.props.activePage)) {
            this.setState({
                currentPage: nextProps.activePage,
            })
        }
    }
    getPageList = () => {
        const {
            scope,
            totalPage,
            activePage
        } = this.props
        const pageList = []
        const scopeLength = scope * 2
        //页数少于不出现省略号
        if (totalPage <= 3 + scopeLength) {
            const totalPageNumber = totalPage || 1
            for (let i = 1; i <= totalPageNumber; i++) {
                pageList.push(i)
            }
            return pageList
        }
        // 有"..."的情况下，中间部分页数的范围 [scopeLeft，scopeRight]
        let scopeLeft = Math.max(1, activePage - scope)
        let scopeRight = Math.min(activePage + scope, totalPage)
        // scopeLeft或scopeRight为总页数的左端或右端，特殊处理
        if (scopeLeft === 1) {
            scopeRight = scopeLeft + scopeLength
        }
        if (scopeRight === totalPage) {
            scopeLeft = scopeRight - scopeLength
        }
        // 首页页码必须为 1
        scopeLeft !== 1 && pageList.push(1)
        // 显示"..."的情况，考虑到scope=1的特殊情况所以current也不能等于3
        if (activePage >= 1 + scopeLength && activePage !== 3) {
            pageList.push('')
        }
        for (let i = scopeLeft; i <= scopeRight; i++) {
            pageList.push(i)
        }
        // 显示"..."的情况
        if (activePage <= totalPage - scopeLength && activePage !== totalPage - 2) {
            pageList.push('')
        }
        // 尾页页码必须为 totalPage
        scopeRight !== totalPage && pageList.push(totalPage)

        return pageList
    }
    handleInputChange = value => {
        this.setState({ skipPageNo: value })
      }
    
      handleSkip = () => {
        const { totalPage, onSelect } = this.props
        const pageNo = +this.state.skipPageNo
        if (isNaN(pageNo) || pageNo < 1 || pageNo > totalPage) {
          this.setState({ skipPageNo: '' })
          return
        }
        onSelect(pageNo)
      }
    
      render() {
        const {
          totalPage = 1,
          total,
          className,
          activePage,
          lastContent,
          nextContent,
          showQuickJumper,
          showTotal,
          ...others
        } = this.props
    
        const pageList = this.getPageList()
    
        return (
          <div className={classnames('text-center', className)}>
            <ul {...others} className='nui-pagination'>
              <li
                className={classnames('nui-page-item', { disabled: activePage <= 1 })}
              >
                <span className='nui-page-link' onClick={this.prevPageHandle}>
                  {lastContent || <i className='nui-fa nui-fa-chevron-left' />}
                </span>
              </li>
              {pageList.map((child, index) =>
                child ? (
                  <li
                    key={`${child}-${index}`}
                    className={classnames('nui-page-item', {
                      active: child === (activePage || 1),
                    })}
                  >
                    <span
                      className='nui-page-link'
                      onClick={() => this.goPageHandle(child)}
                    >
                      {child}
                    </span>
                  </li>
                ) : (
                  <li key={`${child}-${index}`} className='nui-page-item disabled'>
                    <i className='nui-fa nui-fa-ellipsis-h' />
                  </li>
                )
              )}
              <li
                className={classnames('nui-page-item', {
                  disabled: activePage >= totalPage,
                })}
              >
                <span className='nui-page-link' onClick={this.nextPageHandle}>
                  {nextContent || <i className='nui-fa nui-fa-chevron-right' />}
                </span>
              </li>
            </ul>
    
            {showTotal && (
              <div className='nui-pagination-total'>
                共<span>{totalPage || 1}</span>页<span>/</span>
                <span>{total || 0}</span>条
              </div>
            )}
    
            {showQuickJumper && (
              <div className='nui-pagination-jumper'>
                <span>跳转</span>
                <Input
                  className='nui-pagination-jumper-input'
                  size='sm'
                  value={this.state.skipPageNo}
                  onChange={this.handleInputChange}
                />
                <span>页</span>
                <div className='nui-page-link' onClick={this.handleSkip}>
                  GO
                </div>
              </div>
            )}
          </div>
        )
      }
}