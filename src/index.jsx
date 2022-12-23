import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

const status = ['Not Started', '1st half', 'Halftime', '2nd half', 'Ended']

const footballWordCupScoreBoard = [
  ["Time", "Home Team", "Away Team", "Score", "Status"],
  ["18:00", "Mexico", "Canada", '', status[0]],
  ["19:00", "Spain", "Brazil", '', status[0]],
  ["10'", "Germany", "France", '0-0', status[1]],
  ["17:00", "Uruguay", "Italy", '', status[0]],
  ["Halftime", "Argentina", "Australia", "2-0", status[2]]
];
 

export class Board extends React.Component {

  render() {
    const rowResult = [];
  
    this.props.boardData?.forEach((data, i) => {
      rowResult.push(
        <Row key={i} labelList={data} isHeader={i===0}/>
      );
    });
    return (
      <table className="dynamic-board">
        <tbody>
          {rowResult}
        </tbody>
      </table>
    )
  }
}

class Row extends React.Component {

  render() {
    const labelResult = [];
    this.props.labelList.forEach((label, i) => {
      labelResult.push(
        (this.props.isHeader) ? <th key={i}>{label}</th> : <td key={i}>{label}</td>
      );
    });
  
    return (
      <tr className="row">
        {labelResult}
      </tr>
    )
  }
}

class FootballBoard extends React.Component {

  constructor(props){
    super(props);
    this.state = {
      footballBoard: props.footballBoard,
      summaryBoard: []
    }
    this.startLoop();
  } 

  startLoop() {
    let time = 0;
    const footballInterval = setInterval(() => {
      let newBoard = matchLogic(time++, this.state.footballBoard);
      let newState = summaryLogic(newBoard, this.state.summaryBoard);
      this.setState({
        footballBoard: newState[0],
        summaryBoard: newState[1]
      })
    }, 1000);

    setTimeout(() => clearInterval(footballInterval), 6000);
  }
  

  render() {
    let summary = (this.state.summaryBoard?.length > 0) ? (
      <React.Fragment>
        <h1>{'Summary'}</h1>
        <Board boardData={this.state.summaryBoard}/>
      </React.Fragment>
    ) : '';

    let mainBoard = (this.state.footballBoard?.length > 1) ? (
      <React.Fragment>
        <h1>{'Matches'}</h1>
        <Board boardData={this.state.footballBoard}/>
      </React.Fragment>
    ) : '';

    

    return (
      <React.Fragment>
        {mainBoard}
        {summary}
      </React.Fragment>
    )
  }
}

const elementRef = document.getElementById("root");

if(elementRef) {
    const root = ReactDOM.createRoot(elementRef);
    root.render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);
}

function matchLogic(loop, board) {
  switch(loop) {
    case 0: 
      board[1] = updateMatch(footballWordCupScoreBoard[1], "18:00", '', 0);
      board[2] = updateMatch(footballWordCupScoreBoard[2], "19:00", '', 0);
      board[3] = updateMatch(footballWordCupScoreBoard[3], "HalfTime", '0-0', 2);
      board[4] = updateMatch(footballWordCupScoreBoard[4], "10'", '0-2', 1);
      board[5] = updateMatch(footballWordCupScoreBoard[5], "50'", '3-0', 3);
      break;
    case 1: 
      board[1] = updateMatch(footballWordCupScoreBoard[1], "10'", '0-1', 1);
      board[2] = updateMatch(footballWordCupScoreBoard[2], "19:00", '', 0);
      board[3] = updateMatch(footballWordCupScoreBoard[3], "50'", '2-2', 3);
      board[4] = updateMatch(footballWordCupScoreBoard[4], "HalfTime", '3-4', 2);
      board[5] = updateMatch(footballWordCupScoreBoard[5], "15:00", '3-1', 4);
      break;
    case 2: 
      board[1] = updateMatch(footballWordCupScoreBoard[1], "HalfTime", '0-3', 2);
      board[2] = updateMatch(footballWordCupScoreBoard[2], "10'", '2-0', 1);
      board[3] = updateMatch(footballWordCupScoreBoard[3], "16:00", '2-2', 4);
      board[4] = updateMatch(footballWordCupScoreBoard[4], "50'", '4-4', 3);
      break;
    case 3: 
      board[1] = updateMatch(footballWordCupScoreBoard[1], "50'", '0-4', 3);
      board[2] = updateMatch(footballWordCupScoreBoard[2], "HalfTime", '8-0', 2);
      board[3] = updateMatch(footballWordCupScoreBoard[4], "17:00", '6-6', 4);
      break;
    case 4: 
      board[1] = updateMatch(footballWordCupScoreBoard[1], "18:00", '0-5', 4);
      board[2] = updateMatch(footballWordCupScoreBoard[2], "50'", '9-0', 3);
      break;
    default:
      board[1] = updateMatch(footballWordCupScoreBoard[2], "19:00", '10-2', 4);
      break;
  }

  return board;
}

function updateMatch(match, time, score, statusIndex) {
  match[0] = time;
  match[3] = score;
  match[4] = status[statusIndex];
  return match;
}

function summaryLogic(board, summaryBoard) {
  let newBoard = board.filter((match) => {
    
    return match[4] !== status[4];
  });
  console.log(newBoard);
  return [newBoard, summaryBoard];
}