import React, { Component } from 'react';
import Table from "./Tables";
import ScoreBoard from "./ScoreBoard";
import GameOver from "./GameOver";
import { view } from 'react-easy-state';
import appStore from "./store";



class App extends Component {

    gameOver = () => {
        if (appStore.gameOver === true)
        {
            return <GameOver />
        }
    }

  render() {
    return (
      <div className="container">
        <div className="AppMain">
        <ScoreBoard/>
          <Table />
            {this.gameOver()}
        </div>
      </div>
    );
  }
}

export default view(App);
