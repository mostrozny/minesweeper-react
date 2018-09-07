import React, { Component } from 'react';
import { view } from 'react-easy-state'; // zeby store wiedzial ze zaszly zmiany
import appStore from './store.js';

class GameOver extends Component {
    render() {
        return (
                <div className="GameOver">

                </div>
        );
    }
}

export default view(GameOver);