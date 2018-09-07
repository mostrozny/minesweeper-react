import React, {Component} from 'react';
import {view} from 'react-easy-state';
import appStore from './store.js';


class Tables extends Component {
    constructor(props) {
        super(props);

        this.state = {
            columns: 10,
            rows: 10,
            globalArray: [],
            neighbours: [],
        }
    }

    drawMines = () => {
        const columns = this.state.columns;
        const rows = this.state.rows;

        let divs = this.state.globalArray;

        for (let i = 0; i < columns * rows; i++) {
            const mine = Math.floor((Math.random() * 20) + 1);
            if (mine < 18) {
                divs.push(0);
            } else {
                divs.push(66)
            }
        }

        this.setState({
            globalArray: divs
        });
    };

    index = (x, y) => {
        return this.state.columns * x + y;
    };

    searchNeighbors = (x, y) => {
        let neighbours = 0;
        for (let i = y - 1; i < y + 2; i++) {
            for (let j = x - 1; j < x + 2; j++) {
                if (i !== y || j !== x) {
                    if (i >= 0 && i < this.state.rows && j >= 0 && j < this.state.columns) {
                        if (this.state.globalArray[this.index(j, i)] === 66) {
                            neighbours++;
                        }
                    }
                }
            }
        }

        if (this.state.globalArray[this.index(x, y)] === 0) {
            if (neighbours === 0) {
                return 0;
            } else if (neighbours === 1) {
                return 1;
            } else if (neighbours === 2) {
                return 2;
            } else if (neighbours === 3) {
                return 3;
            } else if (neighbours === 4) {
                return 4;
            } else if (neighbours === 5) {
                return 5;
            } else if (neighbours === 6) {
                return 6;
            }
        } else if (this.state.globalArray[this.index(x, y)] === 66) {
            return 66
        }
    };

    drawNeighbors = () => {
        const arr = [];
        for (let j = 0; j < this.state.columns; j++) {
            for (let i = 0; i < this.state.rows; i++) {
                arr.push(this.searchNeighbors(i, j));
            }
        }
        return arr;
    }

    drawNewArray = () => {
        this.setState({
            neighbours: this.drawNeighbors(),
        })
    };


    //sprawdzam czy do okoła zera jest inne zero czy cyfra
    // jak jest cyfra to przerywam odsłanianie dookoła niej
    // a jak zero to ono też odsłania do okoła siebie

    searchZeros = (x, y) => {
        for (let i = y - 1; i < y + 2; i++) {
            for (let j = x - 1; j < x + 2; j++) {
                if (i !== y || j !== x) {
                    if (i >= 0 && i < this.state.rows && j >= 0 && j < this.state.columns) {
                        if (this.state.globalArray[this.index(j, i)] === 0) {
                            const {index} = this;
                            let neighboursId1 = "style" + index(y - 1, x + 1);
                            const neighboursId2 = "style" + index(y, x + 1);
                            const neighboursId3 = "style" + index(y + 1, x + 1);
                            const neighboursId4 = "style" + index(y - 1, x);
                            const neighboursId6 = "style" + index(y + 1, x);
                            const neighboursId7 = "style" + index(y - 1, x - 1);
                            const neighboursId8 = "style" + index(y, x - 1);
                            const neighboursId9 = "style" + index(y + 1, x - 1);

                            let array = [neighboursId1, neighboursId2, neighboursId3, neighboursId4, neighboursId6, neighboursId7, neighboursId8, neighboursId9];

                            for (let i = 0; i < array.length; i++) {
                                this.refs[array[i]].classList.add("one");
                                this.refs[array[i]].innerText = this.refs[array[i]].id
                            }
                        }
                    }
                }
            }
        }
    };

    bigShow = (divId) => {
        const width = this.state.columns;
        //get x and y from divId
        const x = divId % width;
        const y = (divId - x) / width;

        (y > 0 && y < this.state.rows - 1 && x > 0 && x < this.state.columns - 1) ? this.searchZeros(x, y) : console.log("top/bottom");
    };

    componentDidMount() {
        this.drawMines();
        this.drawNewArray();
    };

    handleMouseDown = () => {
        appStore.icon = "idk"
    };

    handleClick = (e, index) => {
        e.preventDefault();
        if (appStore.points > 140) {
            appStore.icon = "winner"
        } else {
            appStore.icon = "smile";
        }

        if (e.button === 0) {
            switch (e.target.id) {
                case "0":
                    if (e.target.classList.contains("one") === false) {
                        e.target.innerText = "0";
                        this.bigShow(index);
                        e.target.classList.add("one");
                        appStore.points = appStore.points + 8;
                    }
                    break;

                case "1":
                    if (e.target.classList.contains("one") === false) {
                        e.target.innerText = "1";
                        e.target.classList.add("one");
                        appStore.points = appStore.points + 1;
                    }
                    break;

                case "2":
                    if (e.target.classList.contains("one") === false) {
                        e.target.innerText = "2";
                        e.target.classList.add("one");
                        appStore.points = appStore.points + 2;
                    }
                    break;

                case "3":
                    if (e.target.classList.contains("one") === false) {
                        e.target.innerText = "3";
                        e.target.classList.add("one");
                        appStore.points = appStore.points + 3;
                    }
                    break;

                case "4":
                    if (e.target.classList.contains("one") === false) {
                        e.target.innerText = "4";
                        e.target.classList.add("one");
                        appStore.points = appStore.points + 4;
                    }
                    break;
                case "5":
                    if (e.target.classList.contains("one") === false) {
                        e.target.innerText = "5";
                        e.target.classList.add("one");
                        appStore.points = appStore.points + 5;
                    }
                    break;
                case "6":
                    if (e.target.classList.contains("one") === false) {
                        e.target.innerText = "6";
                        e.target.classList.add("one");
                        appStore.points = appStore.points + 6;
                    }
                    break;

                case "66":
                    if (e.target.classList.contains("mine") === false) {
                        e.target.innerText = "X";
                        e.target.classList.add("mine");
                        appStore.gameOver = true;
                        appStore.icon = "gameover";
                    }
                    break;
            }
        } else if (e.button === 2) {
            e.target.classList.add("achtung");
        }
    };


    render() {
        const divs = this.state.neighbours.map((div, index) => {
            return <div className="block" id={div} ref={"style" + index} key={index}
                        onClick={(e) => this.handleClick(e, index)} onMouseDown={this.handleMouseDown}
                        onContextMenu={this.handleClick}>
            </div>
        });

        return (
            <div className="containerBlocks">
                {divs}
            </div>
        );
    }
}

export default view(Tables);