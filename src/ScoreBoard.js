import React, {Component} from 'react';
import {view} from 'react-easy-state';
import appStore from './store.js';


class ScoreBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
            timer: 0,
        }
    }


    componentDidMount() {
        let time = 0;
        this.idInterval = setInterval(() => {
            time++;
            this.setState({
                timer: time,
            })
        }, 1000);

    }

    componentWillUnmount() {
        clearInterval(this.idInterval);
    }


    render() {
        const gameOverClearInterval = () => {
            if (appStore.gameOver === true) {
                clearInterval(this.idInterval)
            }
        };
        gameOverClearInterval();

        const gameEmots = () => {
            if (appStore.icon === "smile") {
                return "reset smile"
            } else if (appStore.icon === "gameover") {
                return "reset gameover"
            } else if (appStore.icon === "idk") {
                return "reset idk"
            } else if (appStore.icon === "winner") {
                gameOverClearInterval();
                return "reset winner"
            }
        };

        return (
            <div className="scoreBoard">
                <div className="score">{appStore.points}</div>
                <div className={gameEmots()}/>
                <div className="timer">{this.state.timer}</div>
            </div>
        );
    }
}

export default view(ScoreBoard);