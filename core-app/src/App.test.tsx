import { render, screen } from "@testing-library/react"
import { describe, it, expect } from "vitest"
import App from "./App"

describe("App Component", () => {
  it("should navigate to the login page", () => {
    render(<App />)
    expect(screen.getByText("Sign In")).toBeInTheDocument()
  })
})
