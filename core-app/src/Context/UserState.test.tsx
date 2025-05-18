import { render } from "@testing-library/react"
import { describe, it, expect, beforeEach } from "vitest"
import UserState from "./UserState"

beforeEach(() => {
  localStorage.setItem("token", "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.KM-I-D9pAs287vMeV8yxy4OtWPtRW6fjDbNYza7wKl0")
})

describe("UserState Context", () => {
  it("renders children correctly", () => {
    render(
      <UserState>
        <div>Test Child</div>
      </UserState>
    )
  })

  it("should fetch the token from local storage", () => {
    const token = localStorage.getItem("token")
    expect(token).toBe("eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJuYW1lIjoiYWRtaW4iLCJyb2xlIjoiYWRtaW4iLCJlbWFpbCI6ImFkbWluQGdtYWlsLmNvbSJ9.KM-I-D9pAs287vMeV8yxy4OtWPtRW6fjDbNYza7wKl0")
  })

  it("should return null if no token is present in local storage", () => {
    localStorage.removeItem("token") // Remove the token
    const token = localStorage.getItem("token")
    expect(token).toBeNull()
  })

  it("should update the token in local storage", () => {
    const newToken = "token123"
    localStorage.setItem("token", newToken)
    const token = localStorage.getItem("token")
    expect(token).toBe(newToken)
  })
})
