import React, { Component } from 'react';

class ScoreBoard extends Component {
    constructor(props) {
        super(props);


        this.state = {
            score: 0,
            timer: 0,
        }
    }

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

export default ScoreBoard;