import { render, screen, fireEvent } from "@testing-library/react-native"

import { type Game } from "@shared"

import { GameCard } from "../GameCard"

const upcomingGame: Game = {
  id: "1",
  homeTeam: "LAL",
  awayTeam: "BOS",
  homeScore: null,
  awayScore: null,
  date: "Jun 4",
  time: "7:30 PM",
  isoDate: "2026-06-04T23:30:00Z",
  status: "upcoming",
}

const finalGame: Game = {
  id: "2",
  homeTeam: "LAL",
  awayTeam: "BOS",
  homeScore: 110,
  awayScore: 105,
  date: "Jun 3",
  time: "7:30 PM",
  isoDate: "2026-06-03T23:30:00Z",
  status: "final",
}

// Smoke test
test("renders without crashing", () => {
  render(<GameCard game={upcomingGame} />)
})

describe("GameCard", () => {
  it("displays team abbreviations", () => {
    render(<GameCard game={upcomingGame} />)
    expect(screen.getByText("BOS")).toBeTruthy()
    expect(screen.getByText("LAL")).toBeTruthy()
  })

  it("calls onPress with the game when tapped", () => {
    const onPress = jest.fn()
    render(<GameCard game={upcomingGame} onPress={onPress} />)
    fireEvent.press(screen.getByText("BOS"))
    expect(onPress).toHaveBeenCalledTimes(1)
    expect(onPress).toHaveBeenCalledWith(upcomingGame)
  })

  it("shows scores for a final game", () => {
    render(<GameCard game={finalGame} />)
    expect(screen.getByText("110")).toBeTruthy()
    expect(screen.getByText("105")).toBeTruthy()
  })

  it("hides scores in spoiler-free mode", () => {
    render(<GameCard game={finalGame} spoilerFreeMode />)
    expect(screen.queryByText("110")).toBeNull()
    expect(screen.getByText("tap")).toBeTruthy()
  })
})
