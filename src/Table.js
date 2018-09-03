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
                    if (i >= 0 && i < this.state.rows && j >= 0 && j < this.state.columns) {
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
            neighbours: this.drawNeighbors(),
        })

    }

    componentWillMount () {
        this.drawMines();
            this.drawNewArray();
    }

    componentWillUnmount () {
        clearTimeout(this.idTimeout);
    }

    handleClick = (e) => {
        console.log(e.target);
        switch (e.target.id) {
            case "0": console.log('Trafiles zera');
                e.target.innerText = "0";
                e.target.classList.add("one");
            break;

            case "1": console.log('Trafiles jedynki');
               e.target.innerText = "1";
                e.target.classList.add("one");
            break;

            case "2": console.log('Trafiles dwojki');
                e.target.innerText = "2";
                e.target.classList.add("one");
            break;

            case "3": console.log('Trafiles trojki');
                e.target.innerText = "3";
                e.target.classList.add("one");
            break;

            case "4": console.log('Trafiles czworke');
                e.target.innerText = "4";
                e.target.classList.add("one");
            break;

            case "66": console.log('MINA :(');
                e.target.innerText = "X";
                e.target.classList.add("mine");
            break;

        }
    }


    render() {

            const divs = this.state.neighbours.map((div, index) => {
                return <div onClick={this.handleClick} className="block" id={div} key={index}>
                </div>
            });
        return (
            <div className="containerBlocks" >
                {divs}
            </div>
        );
    }
}

export default Table;