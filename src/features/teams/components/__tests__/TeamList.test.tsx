import { render, screen, fireEvent } from "@testing-library/react-native"

import { TeamList } from "../TeamList"

// Smoke test
test("renders without crashing", () => {
  render(<TeamList onSelect={jest.fn()} />)
})

describe("TeamList", () => {
  it("renders team city names", () => {
    render(<TeamList onSelect={jest.fn()} />)
    // FlatList renders the first batch of items; Atlanta and Boston are near the top
    expect(screen.getByText("Atlanta")).toBeTruthy()
    expect(screen.getByText("Boston")).toBeTruthy()
  })

  it("calls onSelect with the team when a row is tapped", () => {
    const onSelect = jest.fn()
    render(<TeamList onSelect={onSelect} />)
    fireEvent.press(screen.getAllByText("Boston")[0])
    expect(onSelect).toHaveBeenCalledTimes(1)
    expect(onSelect).toHaveBeenCalledWith(
      expect.objectContaining({ abbr: "BOS" }),
    )
  })
})
