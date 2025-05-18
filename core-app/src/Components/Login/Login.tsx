import { useContext, type FormEvent, useState } from "react"
import styles from "./Login.module.css"
import userContext from "../../Context/userContext"
import { useNavigate } from "react-router-dom"
import { Bounce, toast, ToastContainer } from "react-toastify"

function Login() {
  const context = useContext(userContext)
  const navigate = useNavigate()

  const [email, setEmail] = useState<string>("")
  const [password, setPassword] = useState<string>("")
  const [passwordType, setPasswordType] = useState<"text" | "password">("password")

  const notify = (msg: string, type: "error" | "success") => {
    toast[type](msg, {
      position: "top-center",
      autoClose: type === "success" ? 500 : 2000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "light",
      transition: Bounce
    })
  }

  const { handleLogin } = context

  const togglePassword = () => {
    setPasswordType(prev => (prev === "text" ? "password" : "text"))
  }
  // Handle form submission
  const handleSubmit = (e: FormEvent<HTMLFormElement>) => {
    e.preventDefault()
    const result = handleLogin(email, password)
    if (result) {
      notify("Login successful", "success")
      setTimeout(() => {
        navigate("/")
      }, 1000)
    } else {
      notify("Invalid credentials", "error")
    }
  }

  return (
    <div className={styles.container}>
      <ToastContainer />

      <div className={styles.Heading}>MelodyHub</div>
      <form className={styles.formContainer} onSubmit={e => handleSubmit(e)}>
        <input
          type="text"
          data-testid="email-input"
          className={styles.inputBox}
          placeholder="Email"
          name="email"
          value={email}
          onChange={e => {
            setEmail(e.target.value)
          }}
        />
        <div>
          <input
            type={passwordType}
            data-testid="password-input"
            className={styles.passinputBox}
            placeholder="Password"
            value={password}
            onChange={e => {
              setPassword(e.target.value)
            }}
          />
          <div className={styles.showHidePass} onClick={togglePassword} data-testid="toggle-password">
            {passwordType === "text" ? "Hide" : "Show"} password
          </div>
        </div>
        <button className={styles.signInBtn} type="submit">
          Sign In
        </button>
      </form>
    </div>
  )
}

export default Login
