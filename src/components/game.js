import React from 'react';
import '../index.css';

import Board from './board.js';
import Segment from './UISegment/UISegment.js';

const COLUMNS = 3;
const ROWS = 3;

class Game extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      history: [{
        squares: Array(9).fill(null),
      }],
      xIsNext: true,
      stepNumber: 0,
      segmentList: ['ascd', 'desc'],
      selectedSegment: 'desc'
    };
  }


  handleClick(i) {
    const history = this.state.history.slice(0, this.state.stepNumber + 1);
    const current = history[history.length - 1];
    const squares = current.squares.slice();
    if (calculateWinner(squares) || squares[i]) {
      return;
    }
    squares[i] = this.state.xIsNext ? 'X' : 'O';
    this.setState({
      history: history.concat([{
        squares: squares,
        hitSquare: i,
        hitMark: squares[i]
      }]),
      stepNumber: history.length,
      xIsNext: !this.state.xIsNext
    });
  }

  jumpTo(step) {
    this.setState({
      stepNumber: step,
      xIsNext: (step % 2) === 0,
    });
  }

  render() {
    const history = this.state.history;
    const current = history[this.state.stepNumber];
    const winObject = calculateWinner(current.squares);

    const winner = winObject ? winObject.winner : null;
    const winLine = winObject ? winObject.winLine : [];

    const moves = history.map((step, move) => {
      const moveRow = Math.floor(step.hitSquare / COLUMNS);
      const moveCol = step.hitSquare % ROWS;

      const desc = move ?
        step.hitMark + ' - (' + moveCol + ',' + moveRow + ')' :
        'Go to game start';

      let moveButton = '';
      if (move === this.state.stepNumber) {
        moveButton = (<button className="move-btn current-move" onClick={() => { this.jumpTo(move); }}>
          {desc}
        </button>);
      } else {
        moveButton = (<button className="move-btn" onClick={() => { this.jumpTo(move); }}>
          {desc}
        </button>);
      }
      return (
        <li key={move}>
          {moveButton}
        </li>
      );
    });

    let status;
    if (winner) {
      status = 'Winner: ' + winner;
    } else if (this.state.stepNumber === 9) {
      status = 'Game DRAW!!!';
    } else {
      status = 'Next player: ' + (this.state.xIsNext ? 'X' : 'O');
    }

    const movesList = this.state.selectedSegment !== 'desc' ?
                      <ol>{moves}</ol> :
                      <ol className="list-reverse">{moves}</ol>;

    return (
      <div className="game">
        <div className="game-board">
          <Board
            winLine={winLine}
            squares={current.squares}
            onClick={(i) => this.handleClick(i)}
          />
        </div>
        <div className="game-info">
          <div>{status}</div>
          <div>
            <span>Sort: </span>
            <Segment
              segmentList={this.state.segmentList}
              selectedSegment={this.state.selectedSegment}
              onClick={(newSelectedSegment) => {
                this.setState({
                  selectedSegment : newSelectedSegment
                });
              }}
            />
          </div>
          {movesList}
        </div>
      </div>
    );
  }
}


function calculateWinner(squares) {
  const lines = [
    [0, 1, 2],
    [3, 4, 5],
    [6, 7, 8],
    [0, 3, 6],
    [1, 4, 7],
    [2, 5, 8],
    [0, 4, 8],
    [2, 4, 6],
  ];
  for (let i = 0; i < lines.length; i++) {
    const [a, b, c] = lines[i];
    if (squares[a] && squares[a] === squares[b] && squares[a] === squares[c]) {
      const winObject = {
        'winLine': lines[i],
        'winner': squares[a]
      };
      return winObject;
    }
  }
  return null;
}

export default Game;