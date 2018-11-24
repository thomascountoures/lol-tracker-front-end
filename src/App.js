import React, { Component } from 'react';
import SummonerApp from './components/summoner_app';
import './App.css';

class App extends Component {
  render() {
    return (
      <div className="App">
        
        { /* base container and app */ }
        <div className="container">        
            <h2>LoL Summon3r S34rch</h2>
            <span className="author">By Thomas Countoures</span>
            <SummonerApp />  
        </div>
       
    </div>
    );
  }
}

export default App;
