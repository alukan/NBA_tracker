import React from "react"
import { render, screen } from "@testing-library/react-native"

import { Badge } from "../Badge"

// Smoke test
it("renders without crashing", () => {
  render(<Badge label="LIVE" color="red" />)
})

describe("Badge", () => {
  it("displays the label text", () => {
    render(<Badge label="FINAL" color="gray" />)
    expect(screen.getByText("FINAL")).toBeTruthy()
  })

  it("applies the provided color", () => {
    render(<Badge label="UPCOMING" color="#00ff00" />)
    const element = screen.getByText("UPCOMING")
    // Style is a nested array from StyleSheet composition; flatten to check
    const flatStyle = JSON.stringify(element.props.style)
    expect(flatStyle).toContain("#00ff00")
  })
})
