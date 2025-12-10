"use client"

import { createContext, useContext, useState, useEffect, type ReactNode } from "react"
import { useRouter } from "next/navigation"
import { toast } from "sonner"

export interface CartItem {
  id: number
  name: string
  price: string
  image: string
  quantity: number
  category?: string
}

export interface User {
  id: number
  fullname: string
  email: string
  phone: string
}

interface AppContextType {
  isLoggedIn: boolean
  setIsLoggedIn: (value: boolean) => void
  isGuest: boolean
  setIsGuest: (value: boolean) => void
  user: User | null
  setUser: (user: User | null) => void
  cartItems: CartItem[]
  addToCart: (item: CartItem) => void
  removeFromCart: (itemId: number) => void
  updateCartQuantity: (itemId: number, quantity: number) => void
  clearCart: () => void
  cartCount: number
  handleLogout: () => void
}

const AppContext = createContext<AppContextType | undefined>(undefined)

export function AppProvider({ children }: { children: ReactNode }) {
  const [isLoggedIn, setIsLoggedIn] = useState(false)
  const [isGuest, setIsGuest] = useState(false)
  const [user, setUser] = useState<User | null>(null)
  const [cartItems, setCartItems] = useState<CartItem[]>([])
  const [loading, setLoading] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loadUserData = () => {
      const storedUser = localStorage.getItem("user")
      const storedIsLoggedIn = localStorage.getItem("isLoggedIn")
      const storedIsGuest = localStorage.getItem("isGuest")
      const storedCart = localStorage.getItem("cartItems")

      console.log("[v0] Loading user data:", { storedUser, storedIsLoggedIn, storedIsGuest })

      if (storedIsLoggedIn === "true" && storedUser) {
        const parsedUser = JSON.parse(storedUser)
        console.log("[v0] Setting user from localStorage:", parsedUser)
        setIsLoggedIn(true)
        setUser(parsedUser)
        setIsGuest(false)
      } else if (storedIsGuest === "true") {
        setIsGuest(true)
        setIsLoggedIn(false)
        setUser(null)
      } else {
        // If not logged in or guest, redirect to login
        if (window.location.pathname !== "/login" && window.location.pathname !== "/signup") {
          router.push("/login")
        }
      }

      if (storedCart) {
        setCartItems(JSON.parse(storedCart))
      }

      setLoading(false)
    }

    // Load initial data
    loadUserData()

    const handleUserUpdate = (e: CustomEvent) => {
      console.log("[v0] User update event received:", e.detail)
      if (e.detail) {
        setUser(e.detail)
        setIsLoggedIn(true)
        setIsGuest(false)
      } else {
        loadUserData()
      }
    }

    // Listen for storage changes (when login/signup updates localStorage from different tabs)
    const handleStorageChange = (e: StorageEvent) => {
      if (e.key === "user" || e.key === "isLoggedIn" || e.key === "isGuest") {
        console.log("[v0] Storage changed:", e.key, e.newValue)
        loadUserData()
      }
    }

    window.addEventListener("userUpdate", handleUserUpdate as EventListener)
    window.addEventListener("storage", handleStorageChange)

    return () => {
      window.removeEventListener("userUpdate", handleUserUpdate as EventListener)
      window.removeEventListener("storage", handleStorageChange)
    }
  }, [router])

  useEffect(() => {
    if (!loading) {
      localStorage.setItem("cartItems", JSON.stringify(cartItems))
    }
  }, [cartItems, loading])

  const addToCart = (item: CartItem) => {
    if (isGuest || !isLoggedIn) {
      toast.error("Please login to add items to cart", {
        description: "Guest users cannot make purchases. Sign in to continue.",
        duration: 3000,
      })
      router.push("/login")
      return
    }

    setCartItems((prevItems) => {
      const existingItem = prevItems.find((i) => i.id === item.id)
      if (existingItem) {
        toast.success("Item quantity updated in cart")
        return prevItems.map((i) => (i.id === item.id ? { ...i, quantity: i.quantity + 1 } : i))
      }
      toast.success("Item added to cart successfully")
      return [...prevItems, { ...item, quantity: 1 }]
    })
  }

  const removeFromCart = (itemId: number) => {
    setCartItems((prevItems) => prevItems.filter((item) => item.id !== itemId))
    toast.success("Item removed from cart")
  }

  const updateCartQuantity = (itemId: number, quantity: number) => {
    if (quantity <= 0) {
      removeFromCart(itemId)
      return
    }
    setCartItems((prevItems) => prevItems.map((item) => (item.id === itemId ? { ...item, quantity } : item)))
  }

  const clearCart = () => {
    setCartItems([])
    localStorage.removeItem("cartItems")
    toast.success("Cart cleared successfully")
  }

  const handleLogout = () => {
    localStorage.removeItem("user")
    localStorage.removeItem("isLoggedIn")
    localStorage.removeItem("isGuest")
    localStorage.removeItem("cartItems")
    setIsLoggedIn(false)
    setIsGuest(false)
    setUser(null)
    setCartItems([])
    router.push("/login")
    toast.success("Logged out successfully")
  }

  const cartCount = cartItems.reduce((total, item) => total + item.quantity, 0)

  if (loading) {
    return (
      <div className="min-h-screen bg-[#1A1A1A] flex items-center justify-center">
        <div className="text-[#E1AD01] text-xl">Loading...</div>
      </div>
    )
  }

  return (
    <AppContext.Provider
      value={{
        isLoggedIn,
        setIsLoggedIn,
        isGuest,
        setIsGuest,
        user,
        setUser,
        cartItems,
        addToCart,
        removeFromCart,
        updateCartQuantity,
        clearCart,
        cartCount,
        handleLogout,
      }}
    >
      {children}
    </AppContext.Provider>
  )
}

export function useApp() {
  const context = useContext(AppContext)
  if (context === undefined) {
    throw new Error("useApp must be used within an AppProvider")
  }
  return context
}

export { useApp as useAppContext }
