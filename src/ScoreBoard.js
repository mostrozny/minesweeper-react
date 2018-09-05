import React, { Component } from 'react';
import { view, store } from 'react-easy-state';
import Table from './Tables';


class ScoreBoard extends Component {
    state = store({
        timer: 0,
        score: 100,
    })


    componentDidMount () {
        let time = 0;
        this.idInterval = setInterval(() => {
            time++;
            this.setState({
                timer: time,
            })
        }, 1000);

    }

    componentWillUnmount () {
        clearInterval(this.idInterval);
    }



    render() {
        return (
            <div className="scoreBoard" >
                <div className="score">{this.state.score}</div>
                <div className="reset smile" />
                <div className="timer">{this.state.timer}</div>
            </div>
        );
    }
}

export default view(ScoreBoard);