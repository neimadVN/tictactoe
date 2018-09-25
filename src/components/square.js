import React from 'react';
import '../index.css';

function Square(props) {
  const isOnWinLine = props.isOnWinLine;

  if (isOnWinLine) {
    return (
      <button className="square square-winline" onClick={props.onClick}>
        {props.value}
      </button>
    );
  } else {
    return (
      <button className="square" onClick={props.onClick}>
        {props.value}
      </button>
    );
  }
}

export default Square;