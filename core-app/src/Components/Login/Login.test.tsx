import { describe, expect, it, should, vi } from "vitest"
import Login from "./Login"
import { fireEvent, render, screen, waitFor } from "@testing-library/react"
import userContext from "../../Context/userContext"
import { MemoryRouter } from "react-router-dom"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

vi.mock("react-toastify", async () => {
  const actual = await vi.importActual("react-toastify") // Import the actual module
  return {
    ...actual, // Spread the actual exports
    toast: {
      success: vi.fn(),
      error: vi.fn()
    },
    ToastContainer: () => <div data-testid="toast-container" /> // Mock ToastContainer
  }
})

describe("Login Component", () => {
  const mockHandleSignOut = vi.fn()
  const mockSetShowAddSong = vi.fn()
  const mockHandleLogin = vi.fn()
  const mocckTogglePassword = vi.fn()

  const renderLogin = (user: any, showAddSong: boolean) => {
    render(
      <userContext.Provider
        value={{
          user,
          handleSignOut: mockHandleSignOut,
          showAddSong,
          setShowAddSong: mockSetShowAddSong,
          handleLogin: mockHandleLogin,
          notifySessionEnd: false
        }}
      >
        <MemoryRouter>
          <Login />
        </MemoryRouter>
      </userContext.Provider>
    )
  }

  it("should render the login form", () => {
    renderLogin(null, false)
    expect(screen.getByText("MelodyHub")).toBeInTheDocument()
  })

  it("should render input fields and login button", () => {
    renderLogin(null, false)
    expect(screen.getByTestId("email-input")).toBeInTheDocument()
    expect(screen.getByTestId("password-input")).toBeInTheDocument()
    expect(screen.getByRole("button", { name: "Sign In" })).toBeInTheDocument()
    expect(screen.getByTestId("toggle-password")).toBeInTheDocument()
  })

  it("should toggle password visibility", () => {
    renderLogin(null, false)
    const toggleBtn = screen.getByTestId("toggle-password")
    expect(screen.getByText("Show password")).toBeInTheDocument()
    fireEvent.click(toggleBtn)
    expect(screen.getByText("Hide password")).toBeInTheDocument()
  })

  it("should update input values on change", () => {
    renderLogin(null, false)
    const emailInput = screen.getByTestId("email-input")
    const passwordInput = screen.getByTestId("password-input")
    fireEvent.change(emailInput, { target: { value: "testEmail@gmail.com" } })
    expect(emailInput).toHaveValue("testEmail@gmail.com")
    fireEvent.change(passwordInput, { target: { value: "testPassword" } })
    expect(passwordInput).toHaveValue("testPassword")
  })

  it("should call handleLogin and navigate on form submit", async () => {
    mockHandleLogin.mockReturnValue(true) // Simulate successful login
    renderLogin(null, false)

    fireEvent.change(screen.getByTestId("email-input"), { target: { value: "testEmail@gmail.com" } })
    fireEvent.change(screen.getByTestId("password-input"), { target: { value: "testPassword" } })
    fireEvent.click(screen.getByRole("button", { name: "Sign In" }))

    expect(mockHandleLogin).toHaveBeenCalledWith("testEmail@gmail.com", "testPassword")

    // Wait for the navigate function to be called after the timeout
    waitFor(() => {
      expect(mockNavigate).toHaveBeenCalledWith("/")
    })
  })
})
