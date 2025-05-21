import { lazy, Suspense, useContext, useEffect } from "react"
import Navbar from "./Components/Navbar/Navbar"
import Login from "./Components/Login/Login"
import { BrowserRouter as Router, Routes, Route } from "react-router-dom"
import userContext from "./Context/userContext"
import styles from "./App.module.css"
import ErrorBoundaryComponent from "./Components/ErrorBoundaryComponent/ErrorBoundaryComponent"

type MusicLibraryProps = {
  showAddSongForm: boolean
  userRole: "admin" | "user"
}

const MusicLibrary = lazy(() => import("musicLibrary/MusicLibrary")) as React.LazyExoticComponent<React.ComponentType<MusicLibraryProps>>

function App() {
  const context = useContext(userContext)
  const { user, notifySessionEnd, showAddSong, setShowAddSong } = context

  useEffect(() => {
    const handleCloseAddSong = () => {
      setShowAddSong(false)
    }
    window.addEventListener("closeAddSong", handleCloseAddSong)

    return () => {
      window?.removeEventListener("closeAddSong", handleCloseAddSong)
    }
  }, [])

  useEffect(() => {
    if (notifySessionEnd) {
      localStorage.removeItem("token")
      alert("Session expired. Please login again.")
      window.location.href = "/login"
    }
  }, [notifySessionEnd])

  return (
    <>
      <Router>
        <ErrorBoundaryComponent>
          <Navbar />
          <Suspense fallback={<div className={styles.fallbackUiStyle}>Loading songs for you...</div>}>
            <Routes>
              <Route path="/" element={<MusicLibrary showAddSongForm={showAddSong} userRole={user?.role || "user"} />} />
              <Route path="/login" element={<Login />} />
            </Routes>
          </Suspense>
        </ErrorBoundaryComponent>
      </Router>
    </>
  )
}

export default App
