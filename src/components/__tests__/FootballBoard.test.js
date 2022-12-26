import { act, render, screen, waitForElementToBeRemoved, within } from "@testing-library/react";
import React from 'react';
import { status } from "../..";

import { FootballBoard } from "../FootballBoard";

const footballWordCupScoreBoard = [
  ["Time", "Home Team", "Away Team", "Score", "Status"],
  ["18:00", "Mexico", "Canada", '', status[0]],
  ["19:00", "Spain", "Brazil", '', status[0]],
  ["0'", "Germany", "France", '0-0', status[1]],
  ["17:00", "Uruguay", "Italy", '', status[0]],
  ["Halftime", "Argentina", "Australia", "2-0", status[2]]
];

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
    jest.useFakeTimers();
    render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);
    
    act(() => {
      jest.advanceTimersByTime(30000);
    })
    const match1 = screen.getByText("3-1");
    expect(match1).toBeInTheDocument();
    const match2 = screen.getByText("2-2");
    expect(match2).toBeInTheDocument();
    const match3 = screen.getByText("6-6");
    expect(match3).toBeInTheDocument();
    const match4 = screen.getByText("0-5");
    expect(match4).toBeInTheDocument();
    const match5 = screen.getByText("10-2");
    expect(match5).toBeInTheDocument();
  })
});

describe("Exercise rules", () => {

  test(`Start a game.
    When a game starts, it should capture (being initial score 0 – 0)`, () => {
    
  })

  test(`Finish game. 
    It will remove a match from the scoreboard.`, () => {
    
  })

  test(`Update score.
    Receiving the pair score; 
    home team score and away team score updates a game score.`, () => {
    
  })

  test(`Get a summary of games by total score. 
    Those games with the same total score will be returned ordered by the most recently added to our system.`, () => {
    jest.useFakeTimers();
    render(<FootballBoard footballBoard={footballWordCupScoreBoard}/>);

    act(() => {
      jest.advanceTimersByTime(30000);
    })
    const match1 = screen.getByText("3-1");
    expect(match1).toBeInTheDocument();
    const match2 = screen.getByText("2-2");
    expect(match2).toBeInTheDocument();
    const match3 = screen.getByText("6-6");
    expect(match3).toBeInTheDocument();
    const match4 = screen.getByText("0-5");
    expect(match4).toBeInTheDocument();
    const match5 = screen.getByText("10-2");
    expect(match5).toBeInTheDocument();
    
    // act(() => {
    //   jest.advanceTimersByTime(60000);
    // })

    // screen.debug();
    // const summaryTable = screen.getByTestId("summary");
    // const summaryRowList = within(summaryTable).getAllByRole("row");
    // expect(summaryRowList).toHaveLength(6);
    // expect(summaryRowList[0]).toHaveTextContent("Uruguay Italy")
    //   .toHaveTextContent("6-6")
    //   .toHaveTextContent("Ended");
    
    // ["18:00", "Mexico", "Canada", '', status[0]],
    // ["19:00", "Spain", "Brazil", '', status[0]],
    // ["0'", "Germany", "France", '0-0', status[1]],
    // ["17:00", "Uruguay", "Italy", '', status[0]],
    // ["Halftime", "Argentina", "Australia", "2-0", status[2]]

    // waitForElementToBeRemoved()
  })

})