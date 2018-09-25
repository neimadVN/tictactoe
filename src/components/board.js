import React from 'react';
import '../index.css';

import Square from './square.js';

class Board extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      squares: Array(9).fill(null),
      xIsNext: true
    };
  }

  arrangeBoard() {
    const rendingBoard = [];

    const winLine = this.props.winLine;
    let SquareInd = 0;

    for (let r = 0; r < 3; r++) {
      const squaresRow = [];

      for (let c = 0; c < 3; c++) {
        const isOnWinLine = winLine.includes(SquareInd);
        const CurrSquare = this.renderSquare(SquareInd, isOnWinLine);

        squaresRow.push(CurrSquare);
        SquareInd++;
      }

      rendingBoard.push(
        <div key={r.toString()} className="board-row">
          {squaresRow}
        </div>
      );
    }

    return rendingBoard;
  }

  renderSquare(i, isOnWinLine) {
    return <Square
      key={i}
      isOnWinLine={isOnWinLine}
      value={this.props.squares[i]}
      onClick={() => this.props.onClick(i)}
    />;
  }

  render() {
    const rendingBoard = this.arrangeBoard();

    return (
      <div>
        {rendingBoard}
      </div>
    );
  }
}

export default Board;