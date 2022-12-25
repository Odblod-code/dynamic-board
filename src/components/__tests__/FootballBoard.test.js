import { render, screen } from "@testing-library/react";
import React from 'react';
import { status } from "../..";
import { Board } from "../Board";

import { FootballBoard } from "../FootballBoard";

const footballWordCupScoreBoard = [
  ["Time", "Home Team", "Away Team", "Score", "Status"],
  ["18:00", "Mexico", "Canada", '', status[0]],
  ["19:00", "Spain", "Brazil", '', status[0]],
  ["0'", "Germany", "France", '0-0', status[1]],
  ["17:00", "Uruguay", "Italy", '', status[0]],
  ["Halftime", "Argentina", "Australia", "2-0", status[2]]
];

beforeEach(() => {
  jest.useFakeTimers();
});

describe("Board", () => {

  test('renders correctly', () => {
    render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);

    const header = screen.getByRole("row", {
      name: "Time Home Team Away Team Score Status"
    });
    expect(header).toBeInTheDocument();
    
    const match1 = screen.getByRole("row", {
      name: "18:00 Mexico Canada Not Started"
    });
    expect(match1).toBeInTheDocument();
    
    const match2 = screen.getByRole("row", {
      name: "19:00 Spain Brazil Not Started"
    });
    expect(match2).toBeInTheDocument();
    
    const match3 = screen.getByRole("row", {
      name: "0' Germany France 0-0 1st half"
    });
    expect(match3).toBeInTheDocument();
    
    const match4 = screen.getByRole("row", {
      name: "17:00 Uruguay Italy Not Started"
    });
    expect(match4).toBeInTheDocument();
    
    const match5 = screen.getByRole("row", {
      name: "Halftime Argentina Australia 2-0 Halftime"
    });
    expect(match5).toBeInTheDocument();
  });

  test('match logic works', async () => {
    const board = new FootballBoard({footballBoard: footballWordCupScoreBoard});
    expect(board.state.footballBoard).toBe(footballWordCupScoreBoard);
    expect(board.state.footballBoard.length).toBe(6);
    expect(board.state.summaryBoard).toStrictEqual([footballWordCupScoreBoard[0]]);
    
    jest.advanceTimersByTime(15000);
    expect(board.state.summaryBoard.length).toBe(3);
  })
});