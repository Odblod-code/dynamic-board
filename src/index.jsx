import React from "react";
import { createRoot } from "react-dom/client";
import { FootballBoard } from "./component/FootballBoard";
import "./index.scss";

export const status = ['Not Started', '1st half', 'Halftime', '2nd half', 'Ended'];

const footballWordCupScoreBoard = [
  ["Time", "Home Team", "Away Team", "Score", "Status"],
  ["18:00", "Mexico", "Canada", '', status[0]],
  ["19:00", "Spain", "Brazil", '', status[0]],
  ["10'", "Germany", "France", '0-0', status[1]],
  ["17:00", "Uruguay", "Italy", '', status[0]],
  ["Halftime", "Argentina", "Australia", "2-0", status[2]]
];

createRoot(document.getElementById('root')).render(
  <FootballBoard footballBoard={footballWordCupScoreBoard}/>
)