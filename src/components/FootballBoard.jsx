import React from "react";
import { status } from "..";
import { Board } from "./Board";

export class FootballBoard extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      footballBoard: props.footballBoard,
      summaryBoard: [props.footballBoard[0]]
    };
    this.startLoop();
  }

  startLoop() {
    let time = 0;
    let slow = 5;
    const footballInterval = setInterval(() => {
      let newBoard = matchLogic(time++, this.state.footballBoard, this.props.footballBoard);
      let newState = summaryLogic(newBoard, this.state.summaryBoard);
      this.setState({
        footballBoard: newState[0],
        summaryBoard: newState[1]
      });
    }, 1000 * slow);

    setTimeout(() => clearInterval(footballInterval), 6000 * slow);
  }

  render() {
    let summary = (this.state.summaryBoard?.length > 1) ? (
      <React.Fragment>
        <h1>{'Summary'}</h1>
        <Board boardData={this.state.summaryBoard} />
      </React.Fragment>
    ) : '';

    let mainBoard = (this.state.footballBoard?.length > 1) ? (
      <React.Fragment>
        <h1>{'Matches'}</h1>
        <Board boardData={this.state.footballBoard} />
      </React.Fragment>
    ) : '';

    return (
      <React.Fragment>
        {mainBoard}
        {summary}
      </React.Fragment>
    );
  }
}

function matchLogic(loop, board, mainBoard) {
  switch(loop) {
    case 0: 
      board[1] = updateMatch(mainBoard[1], "18:00", '', 0);
      board[2] = updateMatch(mainBoard[2], "19:00", '', 0);
      board[3] = updateMatch(mainBoard[3], "HalfTime", '0-0', 2);
      board[4] = updateMatch(mainBoard[4], "0'", '0-0', 1);
      board[5] = updateMatch(mainBoard[5], "50'", '3-0', 3);
      break;
    case 1: 
      board[1] = updateMatch(mainBoard[1], "0'", '0-0', 1);
      board[2] = updateMatch(mainBoard[2], "19:00", '', 0);
      board[3] = updateMatch(mainBoard[3], "50'", '2-2', 3);
      board[4] = updateMatch(mainBoard[4], "HalfTime", '3-4', 2);
      board[5] = updateMatch(mainBoard[5], "15:00", '3-1', 4);
      break;
    case 2: 
      board[1] = updateMatch(mainBoard[1], "HalfTime", '0-3', 2);
      board[2] = updateMatch(mainBoard[2], "0'", '0-0', 1);
      board[3] = updateMatch(mainBoard[3], "16:00", '2-2', 4);
      board[4] = updateMatch(mainBoard[4], "50'", '4-4', 3);
      break;
    case 3: 
      board[1] = updateMatch(mainBoard[1], "50'", '0-4', 3);
      board[2] = updateMatch(mainBoard[2], "HalfTime", '8-0', 2);
      board[3] = updateMatch(mainBoard[4], "17:00", '6-6', 4);
      break;
    case 4: 
      board[1] = updateMatch(mainBoard[1], "18:00", '0-5', 4);
      board[2] = updateMatch(mainBoard[2], "50'", '9-0', 3);
      break;
    default:
      board[1] = updateMatch(mainBoard[2], "19:00", '10-2', 4);
      break;
  }

  return board;
}

function summaryLogic(board, summaryBoard) {
  board = board.filter((match) => {
    let notFinishedMatch = match[4] !== status[4];
    if(!notFinishedMatch && !summaryBoard?.includes(match)) summaryBoard.push(match);
    return notFinishedMatch;
  });
  return [board, summaryBoard.sort(summaryComparator)];
}

function updateMatch(match, time, score, statusIndex) {
  match[0] = time;
  match[3] = score;
  match[4] = status[statusIndex];
  return match;
}

function summaryComparator(a,b) {
  return totalScore(b[3]) - totalScore(a[3]);
}

function totalScore(score) {
  return score.split('-').reduce((accumulator, currentValue) =>
    parseInt(accumulator) + parseInt(currentValue)
  )
}
