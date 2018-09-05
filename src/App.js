import React, { Component } from 'react';
import Table from "./Tables";
import ScoreBoard from "./ScoreBoard";

class App extends Component {
  render() {
    return (
      <div className="container">
        <div className="AppMain">
        <ScoreBoard/>
          <Table />
        </div>
      </div>
    );
  }
}

export default App;
