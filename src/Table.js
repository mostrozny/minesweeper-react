import React, { Component } from 'react';

class Table extends Component {
    constructor(props) {
        super(props);


        this.state = {
            columns: 10,
            rows: 12,
            globalArray: []
        }
    }

    drawMines = () => {
        const columns = this.state.columns;
        const rows = this.state.rows;

        let divs = this.state.globalArray;

        for (let i=0; i<columns*rows; i++) {
            const mine = Math.floor((Math.random() * 10) + 1);
            if (mine < 9) {
                divs.push(`0`);
            } else {
                divs.push(`1`)
            }
        }

        this.setState({
            globalArray: divs
        });

        console.log(this.state.globalArray)
    };



    componentWillMount () {
        this.drawMines();
    }

    render() {

            const divs = this.state.globalArray.map((div, index) => {
                return <div className="block" id={div} key={index}>{div}</div>
            });


        return (
            <div>
                {divs}
            </div>
        );
    }
}

export default Table;