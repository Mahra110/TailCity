"use client"

import { CheckoutPage } from "@/components/checkout-page"
import { useRouter } from "next/navigation"
import { useEffect, useState } from "react"

export default function Checkout() {
  const router = useRouter()
  const [cartItems, setCartItems] = useState([])
  const [user, setUser] = useState(null)

  useEffect(() => {
    const storedCart = localStorage.getItem("cartItems")
    const storedUser = localStorage.getItem("user")

    if (storedCart) {
      setCartItems(JSON.parse(storedCart))
    }

    if (storedUser) {
      setUser(JSON.parse(storedUser))
    }
  }, [])

  const setCurrentPage = (page: string) => {
    router.push(`/${page === "home" ? "" : page}`)
  }

  const clearCart = () => {
    localStorage.removeItem("cartItems")
    setCartItems([])
  }

  return <CheckoutPage cartItems={cartItems} setCurrentPage={setCurrentPage} clearCart={clearCart} user={user} />
}
