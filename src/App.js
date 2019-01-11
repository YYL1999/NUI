import React, { Component } from 'react';
import { Button,Icon ,Message} from './lib';

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
      </div>
    );
  }
}

export default App;