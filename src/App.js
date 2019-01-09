import React, { Component } from 'react';
import { Button } from './lib';

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
          loading
        >按钮</Button>
      </div>
    );
  }
}

export default App;