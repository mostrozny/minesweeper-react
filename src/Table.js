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
            const mine = Math.floor((Math.random() * 20) + 1);
            if (mine < 19) {
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
            } else if (liveNeighbours === 4) {
                return 4;
            }  else if (liveNeighbours === 5) {
                return 5;
            } else if (liveNeighbours === 6) {
                return 6;
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

    };



    //sprawdzam czy do okoła zera jest inne zero czy cyfra
    // jak jest cyfra to przerywam odsłanianie dookoła niej
    // a jak zero to ono też odsłania do okoła siebie

    searchZeros = (x, y) => {
        for (let i = y - 1; i < y + 2; i++) {
            for (let j = x - 1; j < x + 2; j++) {
                if (i !== y || j !== x) {
                    if (i >= 0 && i < this.state.rows && j >= 0 && j < this.state.columns) {
                        if (this.state.globalArray[this.index(j, i)] == 0) {
                            console.log("znalazlem");
                            //destrukturyzacja
                            const {index} = this;

                                    let neighboursId1 = "style"+index(y-1, x+1);
                                    const neighboursId2 = "style"+index(y, x+1);
                                    const neighboursId3 = "style"+index(y+1, x+1);
                                    const neighboursId4 = "style"+index(y-1, x);
                                 //   const neighboursId5 = index(x, y);
                                    const neighboursId6 = "style"+index(y+1, x);
                                    const neighboursId7 = "style"+index(y-1, x-1);
                                    const neighboursId8 = "style"+index(y, x-1);
                                    const neighboursId9 = "style"+index(y+1, x-1);
                            let array = [neighboursId1, neighboursId2, neighboursId3, neighboursId4, neighboursId6, neighboursId7, neighboursId8, neighboursId9];

                            for (let i=0; i<array.length; i++) {
                                this.refs[array[i]].classList.add("one");
                            }
                        //    const object = this.refs.style2;

                        }
                    }
                }
            }
        }
    }


    bigShow = (divId) => {
        const width = this.state.columns;
        const  x = divId % width;
        const y = (divId - x) / width;
        console.log(x, y);
        this.searchZeros(x, y);
    };

    componentWillMount () {
        this.drawMines();
            this.drawNewArray();
    }

    componentWillUnmount () {
        clearTimeout(this.idTimeout);
    }

    handleClick = (e, index) => {
        e.preventDefault();
        if (e.button === 0) {
            switch (e.target.id) {
                case "0":
                    console.log('Trafiles zera');
                    e.target.innerText = "0";
                    this.bigShow(index);
                    e.target.classList.add("one");
                    break;

                case "1":
                    console.log('Trafiles jedynki');
                    e.target.innerText = "1";
                    e.target.classList.add("one");
                    break;

                case "2":
                    console.log('Trafiles dwojki');
                    e.target.innerText = "2";
                    e.target.classList.add("one");
                    break;

                case "3":
                    console.log('Trafiles trojki');
                    e.target.innerText = "3";
                    e.target.classList.add("one");
                    break;

                case "4":
                    console.log('Trafiles czworke');
                    e.target.innerText = "4";
                    e.target.classList.add("one");
                    break;
                case "5":
                    console.log('Trafiles piatke');
                    e.target.innerText = "5";
                    e.target.classList.add("one");
                    break;
                case "6":
                    console.log('Trafiles szesc');
                    e.target.innerText = "6";
                    e.target.classList.add("one");
                    break;

                case "66":
                    console.log('MINA :(');
                    e.target.innerText = "X";
                    e.target.classList.add("mine");
                    break;
            }
        } else if (e.button === 2) {
            e.target.classList.add("achtung");
        }
    }


    render() {

            const divs = this.state.neighbours.map((div, index) => {
                return <div className="block" id={div} ref={"style"+index} key={index} onClick={(e) => this.handleClick(e, index)} onContextMenu={this.handleClick}>
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