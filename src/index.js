import React from "react";
import ReactDOM from "react-dom";
import { FootballBoard } from "./components/FootballBoard";
import "./index.scss";

export const status = ['Not Started', '1st half', 'Halftime', '2nd half', 'Ended'];

const footballWordCupScoreBoard = [
  ["Time", "Home Team", "Away Team", "Score", "Status", "Interested"],
  ["18:00", "Mexico", "Canada", '', status[0], "No"],
  ["19:00", "Spain", "Brazil", '', status[0], "Yes"],
  ["0'", "Germany", "France", '0-0', status[1], "Yes"],
  ["17:00", "Uruguay", "Italy", '', status[0], "No"],
  ["Halftime", "Argentina", "Australia", "2-0", status[2], "No"]
];

ReactDOM.render(
  <FootballBoard footballBoard={footballWordCupScoreBoard}/>, 
  document.getElementById('root')
);