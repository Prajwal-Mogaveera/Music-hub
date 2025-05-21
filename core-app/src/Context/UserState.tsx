import { useEffect, useState } from "react"
import userContext from "./userContext"
import users from "../../utils/usersInfo"
import jwtEncode from "jwt-encode"
import { jwtDecode } from "jwt-decode"
const secret = import.meta.env.VITE_SECRET

type userType = {
  name: string
  role: "admin" | "user"
  email: string
}

type user = {
  name: string
  email: string
  password: string
  role: string
}

function UserState({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<userType>({ name: "", role: "user", email: "" })
  const [showAddSong, setShowAddSong] = useState<boolean>(false)
  const [notifySessionEnd, setNotifySessionEnd] = useState<boolean>(false)

  const handleLogin = (email: string, password: string) => {
    const findUser = users?.find((user: user) => user.email === email.toLowerCase() && user.password === password)
    if (findUser) {
      const payload = { name: findUser.name, role: findUser.role, email: findUser.email }
      const token = jwtEncode(payload, secret)
      localStorage.setItem("token", token)
      handleSettingUser()
      return true
    }
    return false
  }

  const handleSignOut = () => {
    localStorage.removeItem("token")
    setUser({ name: "", role: "user", email: "" })
    setShowAddSong(false)
    return true
  }

  const handleSettingUser = () => {
    const token = localStorage.getItem("token")
    if (token) {
      try {
        const decoded: userType = jwtDecode(token)
        setUser(decoded)
      } catch (error) {
        setNotifySessionEnd(true)
      }
    }
  }

  useEffect(() => {
    handleSettingUser()
  }, [])
  return <userContext.Provider value={{ user, handleLogin, notifySessionEnd, handleSignOut, showAddSong, setShowAddSong }}>{children}</userContext.Provider>
}

export default UserState
