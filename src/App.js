import React, { Component } from 'react';
import Recipes from './recipes';
import logo from './logo.svg';
import 'normalize.css';
import './App.css';

class App extends Component {
  constructor(props){
    super(props);
    this.state = {recipes: []};
  }

  render() {
    return (
      <div className="App">
        <div className="App-header">
          <img src={logo} className="App-logo" alt="logo" />
          <h2>React Recipe Box</h2>
        </div>
        <Recipes display={this.state.recipes}/>
      </div>
    );
  }
}

export default App;
