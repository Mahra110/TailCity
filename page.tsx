"use client"

import { LoginPage } from "@/components/login-page"
import { useRouter } from "next/navigation"
import { useApp } from "@/contexts/AppContext"

export default function Login() {
  const router = useRouter()
  const { setIsLoggedIn, setIsGuest, setUser } = useApp()

  const setCurrentPage = (page: string) => {
    router.push(`/${page === "home" ? "" : page}`)
  }

  return (
    <LoginPage
      setCurrentPage={setCurrentPage}
      setIsLoggedIn={setIsLoggedIn}
      setIsGuest={setIsGuest}
      setUser={setUser}
    />
  )
}
