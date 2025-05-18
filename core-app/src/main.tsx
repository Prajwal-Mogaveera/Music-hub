import { StrictMode } from "react"
import { createRoot } from "react-dom/client"
import App from "./App.tsx"
import UserState from "./Context/UserState.tsx"

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <UserState>
      <App />
    </UserState>
  </StrictMode>
)
