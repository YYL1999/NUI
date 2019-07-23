import React, { Component } from 'react';
import { Button,Icon ,Switch,Divider,Tag,Breadcrumb,Dropdown,Pagination} from './lib';
import './color.scss'
const DropdownMenu=Dropdown.Menu
const DropdownTrigger=Dropdown.Trigger
const DropdownMenuItem=Dropdown.MenuItem
const DropdownMenuDivider=Dropdown.MenuDivider
class App extends Component {
  constructor(){
    super()
    this.state={
      totalPage:10,
      activePage: 2,
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

  render() {
    
    return (
      <div className="App" >
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
   lastContent="上一页"
   nextContent="下一页"
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
  <Breadcrumb className="no-padding">
  <a href="#">首页</a>
  <a href="#">二级菜单</a>
  <span>当前页面</span>
</Breadcrumb>
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
      </div>
    );
  }
}

export default App;