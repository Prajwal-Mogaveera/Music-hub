import { useNavigate } from "react-router-dom"
import styles from "./Navbar.module.css"
import { useContext } from "react"
import userContext from "../../Context/userContext"
import GenericBtn from "../GenericBtn/GenericBtn"

function Navbar() {
  const context = useContext(userContext)
  const { user, handleSignOut, showAddSong, setShowAddSong } = context

  const navigate = useNavigate()
  const handleNavigation = (url: string) => {
    navigate(url)
  }

  const logout = () => {
    const result = handleSignOut()
    if (result) {
      navigate("/login")
    }
  }

  const handleAddSongClick = () => {
    setShowAddSong(!showAddSong)
  }

  return (
    <div className={`container d-flex justify-content-between align-items-center ${styles.container}`}>
      <div className={styles.title} onClick={() => handleNavigation("/")}>
        MelodyHub
      </div>
      <div className={styles.btnMain}>
        {user?.role === "admin" && <GenericBtn title="Add Songs" backgColor="black" height="28px" padding="3px 15px" fontsize="14px" handleClick={handleAddSongClick} />}
        {user?.name ? (
          <GenericBtn title="Sign Out" backgColor="black" height="28px" fontsize="14px" padding="3px 15px" handleClick={logout} />
        ) : (
          <GenericBtn
            title="Sign In"
            backgColor="black"
            height="28px"
            fontsize="14px"
            padding="3px 15px"
            handleClick={() => {
              handleNavigation("/login")
            }}
          />
        )}
      </div>
    </div>
  )
}

export default Navbar
