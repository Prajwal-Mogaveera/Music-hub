import { render, screen } from "@testing-library/react"
import { describe, it, expect, vi } from "vitest"
import ErrorBoundaryComponent from "./ErrorBoundaryComponent"

function BuggyComponent() {
  throw new Error("Test error")
  return <div>Buggy Component</div>
}

describe("ErrorBoundaryComponent", () => {
  it("should render the fallback UI when an error is thrown", () => {
    render(
      <ErrorBoundaryComponent>
        <BuggyComponent />
      </ErrorBoundaryComponent>
    )

    // Check if the fallback UI is displayed
    expect(screen.getByText("Something went wrong:")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Try again" })).toBeInTheDocument()
  })

  it("should reload the page when the 'Try again' button is clicked", () => {
    // Backup the original location object
    const originalLocation = window.location

    // Replace window.location with a mock
    delete (window as any).location // overriding the location object
    window.location = {
      ...originalLocation,
      reload: vi.fn()
    } as any

    render(
      <ErrorBoundaryComponent>
        <BuggyComponent />
      </ErrorBoundaryComponent>
    )

    const tryAgainButton = screen.getByRole("button", { name: "Try again" })
    tryAgainButton.click()

    expect(window.location.reload).toHaveBeenCalled()
  })
})
