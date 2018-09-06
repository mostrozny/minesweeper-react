import React, { Component } from 'react';
import { view } from 'react-easy-state'; // zeby store wiedzial ze zaszly zmiany
import appStore from './store.js';


class ScoreBoard extends Component {
    constructor(props) {
        super(props);

        this.state = {
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
                <div className="score">{appStore.points}</div>
                <div className="reset smile" />
                <div className="timer">{this.state.timer}</div>
            </div>
        );
    }
}

export default view(ScoreBoard);