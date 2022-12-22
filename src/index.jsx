import React from "react";
import ReactDOM from "react-dom/client";
import "./index.scss";

var loop = 0;
const status = ['Not Started', '1st half', 'Halftime', '2nd half', 'Ended']

var footballWordCupScoreBoard = [
  ["Time", "Home Team", "Away Team", "Score", "Status"],
  ["HalfTime", "Mexico", "Canada", "0-4", "HalfTime"],
  ["22:00", "Spain", "Brazil", "6-0", "Not started"],
  ["10'", "Germany", "France", "0-1", "1st half"],
  ["50'", "Uruguay", "Italy", "0-3", "2nd half"],
  ["12:00", "Argentina", "Australia", "3-1", "Ended"]
];

function updateMatch(match, time, score, statusIndex) {
  match[0] = time;
  match[3] = score;
  match[4] = status[statusIndex];
  return match;
}

var matchInterVal = setInterval(function() {
  switch(loop) {
    case 0: 
      footballWordCupScoreBoard[1]  = updateMatch(footballWordCupScoreBoard[1], 'HalfTime', '0-4', 1);
      break;
    case 1: 
      footballWordCupScoreBoard[1]  = updateMatch(footballWordCupScoreBoard[1], 'HalfTime', '0-4', 2);
      break;
    case 2: 
      footballWordCupScoreBoard[1]  = updateMatch(footballWordCupScoreBoard[1], 'HalfTime', '0-4', 3);
      break;
    default:
      footballWordCupScoreBoard[1]  = updateMatch(footballWordCupScoreBoard[1], 'HalfTime', '0-4', 4);
      clearInterval(matchInterVal);
      break;
  }
  console.log(footballWordCupScoreBoard[1]);
  loop++;
}, 5000);

export const Board = ({boardData}) => {
  const rowResult = [];

  boardData.forEach((data, i) => {
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

const Row = ({labelList, isHeader}) => {
  const labelResult = [];

  labelList.forEach((label, i) => {
    labelResult.push(
      (isHeader) ? <th key={i}>{label}</th> : <td key={i}>{label}</td>
    );
  });

  return (
    <tr className="row">
      {labelResult}
    </tr>
  )
}

const FootballBoard = ({footballBoard}) => {
  return (
    <div>
      <h1>{'Matches'}</h1>
      <Board boardData={footballBoard}/>
      <h1>{'Summary'}</h1>
      <Board boardData={footballBoard}/>
    </div>
  )
}

const elementRef = document.getElementById("root");

if(elementRef) {
    const root = ReactDOM.createRoot(elementRef);
    root.render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);
}