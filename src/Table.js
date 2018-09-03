import React, { Component } from 'react';

class Table extends Component {
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

        for (let i=0; i<columns*rows; i++) {
            const mine = Math.floor((Math.random() * 10) + 1);
            if (mine < 9) {
                divs.push(0);
            } else {
                divs.push(66)
            }
        }

        this.setState({
            globalArray: divs
        });

        console.log(this.state.globalArray)
    };

    index = (x, y) => {
        return this.state.columns*x + y;
    };

    searchNeighbors = (x, y) => {
        let liveNeighbours = 0;
        for (let i = y - 1; i < y + 2; i++) {
            for (let j = x - 1; j < x + 2; j++) {
                if (i !== y || j !== x) {
                    if (i >= 0 && i < this.state.columns && j >= 0 && j < this.state.rows) {
                        if (this.state.globalArray[this.index(j, i)] == 66) {

                            liveNeighbours++;
                        }
                    }
                }
            }
        }

        if (this.state.globalArray[this.index(x, y)] == 0) {
            if (liveNeighbours === 0) {
                return 0;
            } else if (liveNeighbours === 1) {
                return 1;
            } else if (liveNeighbours === 2) {
                return 2;
            } else if (liveNeighbours === 3) {
                return 3;
            } else if (liveNeighbours > 3) {
                return 4;
            }
        } else if (this.state.globalArray[this.index(x, y)] == 66) {
            return 66
        }
    };

    drawNeighbors = () => {
        const arr = [];
        //for(let global=0; global<this.state.columns*this.state.rows; global++){
        for (let j = 0; j<this.state.columns; j++) {
             for (let i = 0; i<this.state.rows; i++) {
                 arr.push(this.searchNeighbors(i, j));
            }
        }

        console.log(arr);
        return arr;
    }

    drawNewArray = () => {
        this.setState({
            globalArray: this.drawNeighbors(),
        })

    }

    componentWillMount () {


        this.idTimeout = setTimeout(() => {
            this.drawNewArray();
        }, 10000)
    }

    componentWillUnmount () {
        clearTimeout(this.idTimeout);
    }


    render() {
            
            const divs = this.state.globalArray.map((div, index) => {
                return <div className="block" id={div} key={index}>{div}</div>
            });
        return (
            <div className="containerBlocks" >
                {divs}

            </div>
        );
    }
}

export default Table;