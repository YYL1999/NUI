import React, { Component } from 'react';
import { Button,Icon ,Switch,Divider,Tag,Breadcrumb,Dropdown,Pagination,Notification,Upload,Loading} from './lib';
import './color.scss'
const DropdownMenu=Dropdown.Menu
const DropdownTrigger=Dropdown.Trigger
const DropdownMenuItem=Dropdown.MenuItem
const DropdownMenuDivider=Dropdown.MenuDivider
class App extends Component {
  constructor(){
    super()
    this.state={
      totalPage:12999,
      activePage: 88,
      type: 'wave'
    }
  }
  myClick() {
    console.log('click');
  }
   onSelectHandle = pageNo => {
   this.setState({
      activePage: pageNo,
    })
  }
  handleShowLoading = e => {
    console.log(this,"a",e)
    this.setState({
      type: e.currentTarget.name,
    })
    Loading.show()
  }
   handleShowInfo = () => {
    Notification.info({
      closeable: false,
      title: '通知',
      message:
        '这是一个没有关闭按钮的信息提醒的样式，提示注意信息填是否符合要求。',
    })
  }
   handleShowSuccess = () => {
    Notification.success({
      title: '成功',
      message:
        '这是一个成功信息的样式，提示信息已经全部填写完成。此条通知会显示5s',
      duration: 5000,
    })
  }
   handleShowWarning = () => {
    Notification.warning({
      title: '警告',
      message: '请注意，前方有狗熊！',
      closeable:false
    })
  }
   handleShowError = () => {
    Notification.error({
      title: '错误',
      message: '很遗憾，您的小四轮爆胎了！',
    })
  }
  handleChange =(e) => {
    console.log(e.currentTarget.value)
  }
  render() {
    
    return (
      <div className="App" >
      <Upload
        placeholder="请上传资质证明"
        style={{ width: 464 }}
        onChange={this.handleChange}
      />
        <Button 
          onClick={this.myClick}
          type="primary"
          round
         
        >按钮ss</Button>
        <Icon type="next" /> next<br/>
        <Icon type="before"/> before
        <Switch defaultChecked  />
        <Switch disabled={true} defaultChecked />
        <div>
    Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>
  </div>,
  <Pagination
    onSelect={this.onSelectHandle}
    scope={2}
    totalPage={this.state.totalPage}
    activePage={this.state.activePage}
    showQuickJumper
/>

  <div>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <Divider />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <Divider>With Text</Divider>
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
    <Divider dashed />
    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Sed nonne merninisti licere mihi ista probare, quae sunt a te dicta? Refert tamen, quo modo.</p>
  </div>
  <div>
      <Tag>标签一</Tag>
      <Tag type="gray">标签二</Tag>
      <Tag type="primary">标签三</Tag>
      <Tag type="success">标签四</Tag>
      <Tag type="warning">标签五</Tag>
      <Tag type="danger">标签六</Tag>
    </div>
    <div className="slider">
    <div  className="slider__progress" ></div>
    <input
      className="slider__inner"
      
      type="range"

    />
  
  </div>
  <Button  type="primary" onClick={this.handleShowSuccess}>信息</Button>
  <Breadcrumb className="no-padding">
  <a href="#">首页</a>
  <a href="#">二级菜单</a>
  <span>当前页面</span>
</Breadcrumb>
<Notification />
<Dropdown>
            <DropdownTrigger>
              <Button type="primary">下拉菜单</Button>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownMenuItem >
                菜单一
              </DropdownMenuItem>
              <DropdownMenuItem >
                菜单二
              </DropdownMenuItem>
              <DropdownMenuItem >
                菜单三
              </DropdownMenuItem>
              <DropdownMenuDivider />
              <DropdownMenuItem >
                菜单四
              </DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>
          <Dropdown>
            <DropdownTrigger>
              <a href="#dropdown">下拉菜单</a>
            </DropdownTrigger>
            <DropdownMenu>
              <DropdownMenuItem >
                菜单一
              </DropdownMenuItem>
              <DropdownMenuItem >
                菜单二
              </DropdownMenuItem>
              <DropdownMenuItem >
                菜单三
              </DropdownMenuItem>
              <DropdownMenuDivider />
              <DropdownMenuItem >
                菜单四
              </DropdownMenuItem>
            </DropdownMenu>
          </Dropdown>
          <Button type="primary" name="fountain" onClick={this.handleShowLoading}>
        喷泉-fountain
      </Button>
      <Button name="wave" onClick={this.handleShowLoading}>
        水波-wave
      </Button>
      <Loading type={this.state.type} loadingMsg={this.state.type} closeable />
      </div>
    );
  }
}

export default App;