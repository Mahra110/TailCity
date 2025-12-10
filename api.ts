// Client-side storage helpers
export function getToken() {
  if (typeof window === "undefined") return null
  return localStorage.getItem("authToken")
}

export function setToken(token: string) {
  if (typeof window === "undefined") return
  localStorage.setItem("authToken", token)
}

export function removeToken() {
  if (typeof window === "undefined") return
  localStorage.removeItem("authToken")
}

export function getStoredUser() {
  if (typeof window === "undefined") return null
  const user = localStorage.getItem("user")
  return user ? JSON.parse(user) : null
}

export function setStoredUser(user: any) {
  if (typeof window === "undefined") return
  localStorage.setItem("user", JSON.stringify(user))
}

export function removeStoredUser() {
  if (typeof window === "undefined") return
  localStorage.removeItem("user")
}

// Mock data storage
const mockUsers = [
  {
    id: 1,
    fullname: "Demo User",
    email: "demo@tailcity.com",
    phone: "+92 300 1234567",
    password: "demo123",
  },
]

// Authentication APIs - using only localStorage and mock data
export const authAPI = {
  login: async (email: string, password: string) => {
    const user = mockUsers.find((u) => u.email === email && u.password === password)
    if (user) {
      const mockToken = "mock-token-" + Date.now()
      setToken(mockToken)
      setStoredUser(user)
      return {
        success: true,
        token: mockToken,
        user,
        message: "Login successful",
      }
    }

    throw new Error("Invalid email or password")
  },

  register: async (fullname: string, email: string, phone: string, password: string) => {
    // Check if user already exists
    if (mockUsers.find((u) => u.email === email)) {
      throw new Error("Email already registered")
    }

    const newUser = {
      id: mockUsers.length + 1,
      fullname,
      email,
      phone,
      password,
    }
    mockUsers.push(newUser)
    setStoredUser(newUser)

    return {
      success: true,
      user: newUser,
      message: "Registration successful",
    }
  },
}

// Services APIs - using mock data
export const servicesAPI = {
  getAll: async () => {
    return { success: true, services: [] }
  },

  bookService: async (service_id: number, date: string, notes: string) => {
    return { success: true, message: "Service booked successfully" }
  },

  getBookings: async () => {
    return { success: true, bookings: [] }
  },
}

// Orders APIs - using localStorage only
export const ordersAPI = {
  getOrders: async () => {
    const orders = localStorage.getItem("orders")
    return { success: true, orders: orders ? JSON.parse(orders) : [] }
  },

  createOrder: async (items: any, total: number, address: string, phone: string) => {
    const orders = localStorage.getItem("orders")
    const orderList = orders ? JSON.parse(orders) : []
    const newOrder = {
      id: Date.now(),
      items,
      total,
      address,
      phone,
      createdAt: new Date().toISOString(),
    }
    orderList.push(newOrder)
    localStorage.setItem("orders", JSON.stringify(orderList))
    return { success: true, order: newOrder }
  },
}

// User APIs - using localStorage and mock data
export const userAPI = {
  getProfile: async () => {
    const user = getStoredUser()
    return { success: true, user: user || null }
  },

  getPurchaseHistory: async () => {
    const orders = localStorage.getItem("orders")
    return { success: true, orders: orders ? JSON.parse(orders) : [] }
  },

  updateProfile: async (userData: any) => {
    const user = getStoredUser()
    const updated = { ...user, ...userData }
    setStoredUser(updated)
    return { success: true, user: updated }
  },
}
