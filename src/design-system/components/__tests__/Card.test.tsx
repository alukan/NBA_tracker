import React from "react"
import { render, screen, fireEvent } from "@testing-library/react-native"

import { Card } from "../Card"
import { Text } from "../Text"
import { Badge } from "../Badge"

// Smoke test
it("renders without crashing", () => {
  render(
    <Card>
      <Text>Content</Text>
    </Card>
  )
})

// Unit test
describe("Card", () => {
  it("renders its children", () => {
    render(
      <Card>
        <Text>Hello from Card</Text>
      </Card>
    )
    expect(screen.getByText("Hello from Card")).toBeTruthy()
  })

  it("calls onPress when tapped", () => {
    const onPress = jest.fn()
    render(
      <Card onPress={onPress}>
        <Text>Tap me</Text>
      </Card>
    )

    fireEvent.press(screen.getByText("Tap me"))

    expect(onPress).toHaveBeenCalledTimes(1)
  })
})

// Integration test — Card composing multiple design-system components together
describe("Card integration", () => {
  it("renders a Badge and Text inside a Card and fires onPress", () => {
    const onPress = jest.fn()
    render(
      <Card onPress={onPress}>
        <Badge label="LIVE" color="red" />
        <Text variant="heading">Lakers vs Celtics</Text>
        <Text variant="score">110 – 108</Text>
      </Card>
    )

    expect(screen.getByText("LIVE")).toBeTruthy()
    expect(screen.getByText("Lakers vs Celtics")).toBeTruthy()
    expect(screen.getByText("110 – 108")).toBeTruthy()

    fireEvent.press(screen.getByText("Lakers vs Celtics"))
    expect(onPress).toHaveBeenCalledTimes(1)
  })
})
