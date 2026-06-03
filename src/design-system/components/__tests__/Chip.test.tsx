import { render, screen, fireEvent } from "@testing-library/react-native"

import { Chip } from "../Chip"

// Smoke test
test("renders without crashing", () => {
  render(<Chip label="NBA" onPress={jest.fn()} />)
})

// Unit tests — includes mock function and user action
describe("Chip", () => {
  it("displays the label text", () => {
    render(<Chip label="BOS" onPress={jest.fn()} />)
    expect(screen.getByText("BOS")).toBeTruthy()
  })

  it("calls onPress when tapped", () => {
    const onPress = jest.fn()
    render(<Chip label="LAL" onPress={onPress} />)

    fireEvent.press(screen.getByText("LAL"))

    expect(onPress).toHaveBeenCalledTimes(1)
  })

  it("does not call onPress before it is tapped", () => {
    const onPress = jest.fn()
    render(<Chip label="GSW" onPress={onPress} />)

    expect(onPress).not.toHaveBeenCalled()
  })

  it("renders in unselected state by default", () => {
    render(<Chip label="MIA" onPress={jest.fn()} />)
    expect(screen.getByText("MIA")).toBeTruthy()
  })

  it("renders in selected state when selected=true", () => {
    render(<Chip label="MIA" selected onPress={jest.fn()} />)
    expect(screen.getByText("MIA")).toBeTruthy()
  })
})
