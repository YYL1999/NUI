import React, { Component } from 'react';
import { Button,Icon ,Message,Switch,Divider} from './lib';

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

      </div>
    );
  }
}

export default App;