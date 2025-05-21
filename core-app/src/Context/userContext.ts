import { createContext } from "react"

type userType = {
  name: string
  role: "admin" | "user"
  email: string
}

interface contextType {
  user: userType
  handleLogin: (email: string, password: string) => boolean
  handleSignOut: () => boolean
  showAddSong: boolean
  setShowAddSong: (val: boolean) => void
  notifySessionEnd: boolean
}

const userContext = createContext<contextType>({
  user: { name: "", role: "user", email: "" },
  handleLogin: () => true,
  handleSignOut: () => true,
  showAddSong: false,
  setShowAddSong: () => {},
  notifySessionEnd: false
})

export default userContext
