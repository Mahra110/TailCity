"use client"

import { Card, CardContent } from "./ui/card"
import { Button } from "./ui/button"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { User, Heart, ShoppingCart, Calendar, Settings, LogOut, Package, MessageSquare } from "lucide-react"
import { useState, useEffect } from "react"
import { userAPI } from "../lib/api"
import type { User as UserType } from "../App"

interface UserDashboardProps {
  setCurrentPage: (page: string) => void
  user: UserType | null
  onLogout: () => void
}

export function UserDashboard({ setCurrentPage, user, onLogout }: UserDashboardProps) {
  const [orders, setOrders] = useState([])
  const [loading, setLoading] = useState(true)

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const response = await userAPI.getPurchaseHistory()
        if (response.success) {
          setOrders(response.orders)
        }
      } catch (error) {
        console.error("Failed to fetch orders:", error)
        // Use mock data if API fails
        setOrders([
          { id: "ORD-001", item: "Premium Dog Food", date: "Dec 15, 2024", status: "Delivered", amount: "Rs 4,500" },
          { id: "ORD-002", item: "Cat Scratching Post", date: "Dec 10, 2024", status: "Delivered", amount: "Rs 3,200" },
          { id: "ORD-003", item: "Pet Carrier Bag", date: "Dec 5, 2024", status: "In Transit", amount: "Rs 2,800" },
        ])
      } finally {
        setLoading(false)
      }
    }

    fetchOrders()
  }, [])

  const userStats = [
    { icon: Heart, label: "Adopted Pets", value: "2", color: "#E1AD01" },
    { icon: ShoppingCart, label: "Orders", value: "0", color: "#E1AD01" },
    { icon: Calendar, label: "Appointments", value: "3", color: "#E1AD01" },
    { icon: Package, label: "Saved Items", value: "8", color: "#E1AD01" },
  ]

  const myPets = [
    {
      name: "Buddy",
      breed: "Golden Retriever",
      adopted: "Jan 2024",
      image: "https://images.unsplash.com/photo-1754499265678-8d5572e61fb2?w=400",
    },
    {
      name: "Luna",
      breed: "Persian Cat",
      adopted: "Mar 2024",
      image: "https://images.unsplash.com/photo-1724286014482-ca026cf24420?w=400",
    },
  ]

  const upcomingAppointments = [
    { service: "Grooming - Full Groom", date: "Dec 20, 2024", time: "10:00 AM", pet: "Buddy" },
    { service: "Vet Checkup", date: "Dec 25, 2024", time: "2:00 PM", pet: "Luna" },
  ]

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="mb-8 rounded-2xl p-8 shadow-lg bg-gradient-to-r from-[#2A2A2A] to-[#1F1F1F] border-2 border-[#E1AD01]/30">
          <div className="flex items-center justify-between">
            <div className="flex items-center gap-4">
              <div className="w-20 h-20 rounded-full flex items-center justify-center text-3xl shadow-lg bg-gradient-to-r from-[#E1AD01] to-[#FFD700]">
                <User className="w-10 h-10 text-black" />
              </div>
              <div>
                <h1 className="text-3xl font-bold bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                  Welcome back, {user?.fullname || "Guest"}!
                </h1>
                <p className="text-[#D0D0D0]">{user?.email}</p>
              </div>
            </div>
            <div className="flex gap-3">
              <Button
                variant="outline"
                className="border-2 border-[#E1AD01]/40 bg-transparent text-[#E1AD01] hover:bg-[#E1AD01]/10 rounded-lg"
                onClick={() => setCurrentPage("home")}
              >
                <Settings className="w-5 h-5 mr-2" />
                Settings
              </Button>
              <Button
                variant="outline"
                className="border-2 border-red-500/40 bg-transparent text-red-500 hover:bg-red-500/10 rounded-lg"
                onClick={onLogout}
              >
                <LogOut className="w-5 h-5 mr-2" />
                Logout
              </Button>
            </div>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-4 gap-6 mb-8">
          {userStats.map((stat, idx) => (
            <Card
              key={idx}
              className="border-2 border-[#E1AD01]/30 bg-[#2A2A2A] hover:border-[#E1AD01] transition-all rounded-2xl"
            >
              <CardContent className="p-6">
                <div className="flex items-center justify-between">
                  <div>
                    <p className="text-[#D0D0D0] text-sm mb-1">{stat.label}</p>
                    <p className="text-3xl font-bold text-white">{stat.value}</p>
                  </div>
                  <div className="w-12 h-12 rounded-full flex items-center justify-center bg-gradient-to-r from-[#E1AD01] to-[#FFD700]">
                    <stat.icon className="w-6 h-6 text-black" />
                  </div>
                </div>
              </CardContent>
            </Card>
          ))}
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column */}
          <div className="lg:col-span-2 space-y-8">
            <Card className="border-2 border-[#E1AD01]/30 bg-[#2A2A2A] rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">My Pets</h2>
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  {myPets.map((pet, idx) => (
                    <Card key={idx} className="border-2 border-[#E1AD01]/20 bg-[#1A1A1A] rounded-xl overflow-hidden">
                      <div className="h-48 bg-[#1F1F1F]">
                        <ImageWithFallback
                          src={pet.image || "/placeholder.svg"}
                          alt={pet.name}
                          className="w-full h-full object-cover"
                        />
                      </div>
                      <CardContent className="p-4">
                        <h3 className="font-bold text-white text-lg">{pet.name}</h3>
                        <p className="text-[#D0D0D0] text-sm">{pet.breed}</p>
                        <p className="text-[#A0A0A0] text-xs mt-2">Adopted: {pet.adopted}</p>
                        <Button className="w-full mt-4 text-black rounded-lg bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] font-semibold">
                          View Profile
                        </Button>
                      </CardContent>
                    </Card>
                  ))}
                </div>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E1AD01]/30 bg-[#2A2A2A] rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-2xl font-bold text-white mb-6">Recent Orders</h2>
                {loading ? (
                  <p className="text-[#D0D0D0]">Loading orders...</p>
                ) : orders.length === 0 ? (
                  <p className="text-[#D0D0D0]">No orders yet. Start shopping!</p>
                ) : (
                  <div className="space-y-4">
                    {orders.slice(0, 3).map((order: any, idx: number) => (
                      <div
                        key={idx}
                        className="flex items-center justify-between p-4 bg-[#1A1A1A] border border-[#E1AD01]/20 rounded-xl"
                      >
                        <div className="flex-1">
                          <div className="flex items-center gap-3 mb-1">
                            <Package className="w-5 h-5 text-[#E1AD01]" />
                            <p className="font-semibold text-white">{order.item || "Order " + order.id}</p>
                          </div>
                          <p className="text-sm text-[#D0D0D0]">Order ID: {order.id}</p>
                          <p className="text-sm text-[#A0A0A0]">
                            {order.date || new Date(order.created_at).toLocaleDateString()}
                          </p>
                        </div>
                        <div className="text-right">
                          <p className="font-bold text-white">{order.amount || "Rs " + order.total}</p>
                          <span
                            className={`text-xs px-3 py-1 rounded-full ${
                              order.status === "Delivered"
                                ? "bg-green-500/20 text-green-400"
                                : "bg-yellow-500/20 text-yellow-400"
                            }`}
                          >
                            {order.status || "Pending"}
                          </span>
                        </div>
                      </div>
                    ))}
                  </div>
                )}
                <Button
                  variant="outline"
                  className="w-full mt-4 border-2 border-[#E1AD01]/40 bg-transparent text-[#E1AD01] hover:bg-[#E1AD01]/10 rounded-lg"
                >
                  View All Orders
                </Button>
              </CardContent>
            </Card>
          </div>

          {/* Right Column */}
          <div className="space-y-8">
            <Card className="border-2 border-[#E1AD01]/30 bg-[#2A2A2A] rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">Upcoming Appointments</h2>
                <div className="space-y-4">
                  {upcomingAppointments.map((appointment, idx) => (
                    <div key={idx} className="p-4 rounded-xl border-2 border-[#E1AD01]/20 bg-[#1A1A1A]">
                      <div className="flex items-start gap-3 mb-3">
                        <Calendar className="w-5 h-5 mt-1 text-[#E1AD01]" />
                        <div className="flex-1">
                          <p className="font-semibold text-white mb-1">{appointment.service}</p>
                          <p className="text-sm text-[#D0D0D0]">{appointment.pet}</p>
                        </div>
                      </div>
                      <div className="text-sm text-[#A0A0A0] ml-8">
                        <p>{appointment.date}</p>
                        <p>{appointment.time}</p>
                      </div>
                    </div>
                  ))}
                </div>
                <Button
                  className="w-full mt-4 text-black rounded-lg bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] font-semibold"
                  onClick={() => setCurrentPage("services")}
                >
                  Book New Service
                </Button>
              </CardContent>
            </Card>

            <Card className="border-2 border-[#E1AD01]/30 bg-[#2A2A2A] rounded-2xl">
              <CardContent className="p-6">
                <h2 className="text-xl font-bold text-white mb-6">Quick Actions</h2>
                <div className="space-y-3">
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-[#E1AD01]/40 bg-transparent text-[#E1AD01] hover:bg-[#E1AD01]/10 rounded-lg"
                    onClick={() => setCurrentPage("home")}
                  >
                    <Heart className="w-5 h-5 mr-2" />
                    Adopt a Pet
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-[#E1AD01]/40 bg-transparent text-[#E1AD01] hover:bg-[#E1AD01]/10 rounded-lg"
                    onClick={() => setCurrentPage("shop")}
                  >
                    <ShoppingCart className="w-5 h-5 mr-2" />
                    Shop Products
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-[#E1AD01]/40 bg-transparent text-[#E1AD01] hover:bg-[#E1AD01]/10 rounded-lg"
                    onClick={() => setCurrentPage("vets")}
                  >
                    <Calendar className="w-5 h-5 mr-2" />
                    Book Vet Visit
                  </Button>
                  <Button
                    variant="outline"
                    className="w-full justify-start border-2 border-[#E1AD01]/40 bg-transparent text-[#E1AD01] hover:bg-[#E1AD01]/10 rounded-lg"
                    onClick={() => setCurrentPage("community")}
                  >
                    <MessageSquare className="w-5 h-5 mr-2" />
                    Community
                  </Button>
                </div>
              </CardContent>
            </Card>
          </div>
        </div>
      </div>
    </div>
  )
}
