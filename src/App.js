import React, { Component } from 'react';
import { Button,Icon ,Message,Switch,Divider,Tag} from './lib';

class App extends Component {
  myClick() {
    console.log('click');
    console.log(Message)
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
        <Message></Message>
        <Switch defaultChecked  />
        <Switch disabled={true} defaultChecked />
        <div>
    Text
    <Divider type="vertical" />
    <a href="#">Link</a>
    <Divider type="vertical" />
    <a href="#">Link</a>
  </div>,
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
      </div>
    );
  }
}

export default App;