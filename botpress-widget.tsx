"use client"

import { useEffect } from "react"

export function BotpressWidget() {
  useEffect(() => {
    const loadBotpress = async () => {
      try {
        console.log("[v0] Starting Botpress load")

        // Load inject script
        if (!(window as any).botpress) {
          const script1 = document.createElement("script")
          script1.src = "https://cdn.botpress.cloud/webchat/v3.4/inject.js"
          script1.async = true
          document.head.appendChild(script1)

          // Wait a bit for inject script to load
          await new Promise((resolve) => setTimeout(resolve, 1000))
        }

        // Load config script
        const script2 = document.createElement("script")
        script2.src = "https://files.bpcontent.cloud/2025/07/01/15/20250701150843-CF2DVRO3.js"
        script2.defer = true
        document.head.appendChild(script2)

        console.log("[v0] Botpress scripts loaded to head")
      } catch (error) {
        console.error("[v0] Error loading Botpress:", error)
      }
    }

    loadBotpress()
  }, [])

  return null
}
