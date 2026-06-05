import { render, screen, fireEvent } from "@testing-library/react-native"

import { TeamSelector } from "../TeamSelector"

// Smoke test
test("renders without crashing", () => {
  render(<TeamSelector selected={null} onSelect={jest.fn()} />)
})

describe("TeamSelector", () => {
  it("renders the section label", () => {
    render(<TeamSelector selected={null} onSelect={jest.fn()} />)
    expect(screen.getByText("Favorite Team")).toBeTruthy()
  })

  it("calls onSelect with the team abbreviation when a chip is pressed", () => {
    const onSelect = jest.fn()
    render(<TeamSelector selected={null} onSelect={onSelect} />)
    fireEvent.press(screen.getByText("LAL"))
    expect(onSelect).toHaveBeenCalledWith("LAL")
  })
})
