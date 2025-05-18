import { render, screen, fireEvent } from "@testing-library/react"
import { describe, expect, it, vi } from "vitest"
import { MemoryRouter } from "react-router-dom"
import userContext from "../../Context/userContext"
import Navbar from "./Navbar"

const mockNavigate = vi.fn()

vi.mock("react-router-dom", async () => {
  const actual = await vi.importActual("react-router-dom")
  return {
    ...actual,
    useNavigate: () => mockNavigate
  }
})

describe("Navbar Component", () => {
  const mockHandleSignOut = vi.fn()
  const mockSetShowAddSong = vi.fn()
  const mockHandleLogin = vi.fn()

  const renderNavbar = (user: any, showAddSong: boolean) => {
    render(
      <userContext.Provider
        value={{
          user,
          handleSignOut: mockHandleSignOut,
          showAddSong,
          setShowAddSong: mockSetShowAddSong,
          handleLogin: mockHandleLogin
        }}
      >
        <MemoryRouter>
          <Navbar />
        </MemoryRouter>
      </userContext.Provider>
    )
  }

  it("should render the title and buttons correctly for an admin user", () => {
    renderNavbar({ name: "Admin", role: "admin" }, false)

    expect(screen.getByText("MelodyHub")).toBeInTheDocument()
    expect(screen.getByText("Add Songs")).toBeInTheDocument()
    expect(screen.getByText("Sign Out")).toBeInTheDocument()
  })

  it("should render the title and Sign In button for a guest user", () => {
    renderNavbar(null, false)

    expect(screen.getByText("MelodyHub")).toBeInTheDocument()
    expect(screen.getByText("Sign In")).toBeInTheDocument()
  })

  it("should navigate to the home page when the title is clicked", () => {
    renderNavbar({ name: "User", role: "user" }, false)

    fireEvent.click(screen.getByText("MelodyHub"))
    expect(mockNavigate).toHaveBeenCalledWith("/")
  })

  it("should toggle the Add Songs form when Add Songs button is clicked", () => {
    renderNavbar({ name: "Admin", role: "admin" }, false)

    fireEvent.click(screen.getByText("Add Songs"))
    expect(mockSetShowAddSong).toHaveBeenCalledWith(true)
  })

  it("should call handleSignOut and navigate to login when Sign Out is clicked", () => {
    mockHandleSignOut.mockReturnValue(true)
    renderNavbar({ name: "User", role: "user" }, false)

    fireEvent.click(screen.getByText("Sign Out"))
    expect(mockHandleSignOut).toHaveBeenCalled()
    expect(mockNavigate).toHaveBeenCalledWith("/login")
  })

  it("should navigate to login when Sign In is clicked", () => {
    renderNavbar(null, false)

    fireEvent.click(screen.getByText("Sign In"))
    expect(mockNavigate).toHaveBeenCalledWith("/login")
  })
})
