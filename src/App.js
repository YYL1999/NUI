import React, { Component } from 'react';
import { Button,Icon } from './lib';

class App extends Component {
  myClick() {
    console.log('click');
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

      </div>
    );
  }
}

export default App;