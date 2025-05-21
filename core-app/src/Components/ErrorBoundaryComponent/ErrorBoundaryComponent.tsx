import * as React from "react"
import { ErrorBoundary, type FallbackProps } from "react-error-boundary"
import styles from "./ErrorBoundaryComponent.module.css"

function ErrorFallback({ error }: FallbackProps) {
  console.error(error)
  return (
    <div className={`container d-flex flex-column justify-content-center align-items-center ${styles.errorContainer}`}>
      <p>Something went wrong:</p>
      <button className={styles.btn} onClick={() => window.location.reload()}>
        Try again
      </button>
    </div>
  )
}

function ErrorBoundaryComponent({ children }: { children: React.ReactNode }) {
  return <ErrorBoundary FallbackComponent={ErrorFallback}>{children}</ErrorBoundary>
}

export default ErrorBoundaryComponent
