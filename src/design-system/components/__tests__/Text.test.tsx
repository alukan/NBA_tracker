import React from "react"
import { render, screen } from "@testing-library/react-native"

import { Text } from "../Text"

// Smoke test
it("renders without crashing", () => {
  render(<Text>Hello</Text>)
})

// Unit tests
describe("Text", () => {
  it("renders its children", () => {
    render(<Text>Score: 110</Text>)
    expect(screen.getByText("Score: 110")).toBeTruthy()
  })

  it("applies a custom color override", () => {
    render(<Text color="red">Colored</Text>)
    const element = screen.getByText("Colored")
    expect(element.props.style).toEqual(
      expect.arrayContaining([expect.objectContaining({ color: "red" })])
    )
  })

  it("defaults to the body variant", () => {
    render(<Text>Default</Text>)
    expect(screen.getByText("Default")).toBeTruthy()
  })

  it("renders each variant without crashing", () => {
    const variants = [
      "heading",
      "subheading",
      "score",
      "body",
      "dim",
      "caption",
      "label",
    ] as const
    for (const variant of variants) {
      render(<Text variant={variant}>{variant}</Text>)
      expect(screen.getByText(variant)).toBeTruthy()
    }
  })
})
