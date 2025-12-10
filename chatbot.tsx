"use client"

import { useEffect } from "react"

export function Chatbot() {
  useEffect(() => {
    const handleError = (event: ErrorEvent) => {
      // Suppress "Script error" from cross-origin scripts (Botpress)
      if (event.message === "Script error." || event.message === "Script error") {
        event.preventDefault()
        return true
      }
      // Also suppress Botpress init errors
      if (event.message && event.message.includes("Cannot read properties of undefined (reading 'init')")) {
        event.preventDefault()
        return true
      }
    }

    window.addEventListener("error", handleError)

    // Load Botpress webchat scripts sequentially to ensure proper initialization
    const script1 = document.createElement("script")
    script1.src = "https://cdn.botpress.cloud/webchat/v3.4/inject.js"
    script1.async = false // Load synchronously to ensure proper order
    script1.crossOrigin = "anonymous"

    // Only load the config script after the main library has loaded
    script1.onload = () => {
      const script2 = document.createElement("script")
      script2.src = "https://files.bpcontent.cloud/2025/07/01/15/20250701150843-CF2DVRO3.js"
      script2.crossOrigin = "anonymous"
      document.body.appendChild(script2)
    }

    document.body.appendChild(script1)

    return () => {
      window.removeEventListener("error", handleError)
      // Clean up scripts
      const scripts = document.querySelectorAll('script[src*="botpress"]')
      scripts.forEach((script) => {
        if (script.parentNode) {
          script.parentNode.removeChild(script)
        }
      })
    }
  }, [])

  return null
}
