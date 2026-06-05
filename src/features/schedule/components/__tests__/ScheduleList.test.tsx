import { render, screen } from "@testing-library/react-native"
import type React from "react"

import { ScheduleList } from "../ScheduleList"

jest.mock("../../../../hooks/useScheduleSections", () => ({
  useScheduleSections: jest.fn(() => ({
    sections: [],
    isLoading: false,
    error: null,
    refreshing: false,
    onRefresh: jest.fn(),
    onEndReached: jest.fn(),
    isLoadingMore: false,
  })),
}))

function getMock() {
  return jest.requireMock<{ useScheduleSections: jest.Mock }>(
    "../../../../hooks/useScheduleSections",
  ).useScheduleSections
}

beforeEach(() => {
  getMock().mockReset()
  getMock().mockImplementation(() => ({
    sections: [],
    isLoading: false,
    error: null,
    refreshing: false,
    onRefresh: jest.fn(),
    onEndReached: jest.fn(),
    isLoadingMore: false,
  }))
})

// Smoke test
test("renders without crashing", () => {
  render(<ScheduleList selectedTeam={null} />)
})

describe("ScheduleList", () => {
  it("shows empty state when there are no games", () => {
    render(<ScheduleList selectedTeam={null} />)
    expect(screen.getByText("No games found.")).toBeTruthy()
  })

  it("shows a loading spinner while fetching", () => {
    getMock().mockReturnValueOnce({
      sections: [],
      isLoading: true,
      error: null,
      refreshing: false,
      onRefresh: jest.fn(),
      onEndReached: jest.fn(),
      isLoadingMore: false,
    })
    const { UNSAFE_getAllByType } = render(<ScheduleList selectedTeam={null} />)
    const { ActivityIndicator } = jest.requireActual<{
      ActivityIndicator: React.ComponentType
    }>("react-native")
    expect(UNSAFE_getAllByType(ActivityIndicator).length).toBeGreaterThan(0)
  })

  it("shows an error message when fetch fails", () => {
    getMock().mockReturnValueOnce({
      sections: [],
      isLoading: false,
      error: "Network error",
      refreshing: false,
      onRefresh: jest.fn(),
      onEndReached: jest.fn(),
      isLoadingMore: false,
    })
    render(<ScheduleList selectedTeam={null} />)
    expect(screen.getByText("Network error")).toBeTruthy()
  })
})
