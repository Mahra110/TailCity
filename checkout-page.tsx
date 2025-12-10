"use client"

import type React from "react"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { RadioGroup, RadioGroupItem } from "./ui/radio-group"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Wallet, CheckCircle2, MapPin, ShoppingBag, Truck, Shield, Sparkles, Package } from "lucide-react"
import type { CartItem } from "../App"
import type { User } from "../App"
import { ordersAPI } from "../lib/api"
import { toast } from "sonner"

interface CheckoutPageProps {
  cartItems: CartItem[]
  setCurrentPage: (page: string) => void
  clearCart: () => void
  user: User | null
}

export function CheckoutPage({ cartItems, setCurrentPage, clearCart, user }: CheckoutPageProps) {
  const [paymentMethod, setPaymentMethod] = useState("cod")
  const [isProcessing, setIsProcessing] = useState(false)
  const [orderPlaced, setOrderPlaced] = useState(false)

  const [formData, setFormData] = useState({
    fullName: user?.fullname || "",
    email: user?.email || "",
    phone: user?.phone || "",
    address: "",
    city: "",
    postalCode: "",
    notes: "",
  })

  const calculateTotal = () => {
    return cartItems.reduce((total, item) => {
      const priceString = typeof item.price === "string" ? item.price : String(item.price)
      const numericPrice = Number.parseFloat(priceString.replace(/[Rs\s,]/g, ""))
      return total + numericPrice * item.quantity
    }, 0)
  }

  const total = calculateTotal()
  const deliveryFee = total > 5000 ? 0 : 200
  const finalTotal = total + deliveryFee

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    // Validate required fields
    if (!formData.fullName.trim()) {
      toast.error("Please enter your full name")
      return
    }
    if (!formData.email.trim()) {
      toast.error("Please enter your email address")
      return
    }
    if (!formData.phone.trim()) {
      toast.error("Please enter your phone number")
      return
    }
    if (!formData.address.trim()) {
      toast.error("Please enter your delivery address")
      return
    }
    if (!formData.city.trim()) {
      toast.error("Please enter your city")
      return
    }

    setIsProcessing(true)

    try {
      const orderItems = cartItems.map((item) => ({
        product_id: item.id,
        quantity: item.quantity,
        price: Number(String(item.price).replace(/[Rs\s,]/g, "")),
      }))

      const response = await ordersAPI.createOrder(orderItems, finalTotal, formData.address, formData.phone)

      if (response.success) {
        setOrderPlaced(true)
        toast.success("Order placed successfully!")

        // Redirect after 3 seconds
        setTimeout(() => {
          clearCart()
          setCurrentPage("dashboard")
        }, 3000)
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to place order")
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  if (orderPlaced) {
    return (
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)" }}>
        <div className="fixed inset-0 pointer-events-none overflow-hidden">
          <motion.div
            animate={{
              scale: [1, 1.2, 1],
              rotate: [0, 90, 0],
            }}
            transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20"
            style={{
              background: "radial-gradient(circle, #E1AD01 0%, #FFD700 100%)",
              filter: "blur(80px)",
            }}
          />
        </div>

        <div className="relative max-w-2xl mx-auto px-4 py-20">
          <motion.div
            initial={{ scale: 0, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ type: "spring", duration: 0.6 }}
            className="text-center"
          >
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1, rotate: 360 }}
              transition={{ delay: 0.2, type: "spring", duration: 0.8 }}
              className="w-24 h-24 mx-auto mb-6 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] rounded-full flex items-center justify-center"
            >
              <CheckCircle2 className="w-12 h-12 text-black" />
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-4xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent"
            >
              Order Placed Successfully!
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-[#D0D0D0] text-lg mb-8"
            >
              Thank you for your order! We'll send you a confirmation email shortly.
            </motion.p>

            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="space-y-4"
            >
              <Card className="bg-[#2A2A2A] border-[#E1AD01]/20">
                <CardContent className="p-6">
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E1AD01]/20 flex items-center justify-center">
                        <Package className="w-5 h-5 text-[#E1AD01]" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white">Order Number</p>
                        <p className="text-[#E1AD01]">#TL{Math.random().toString().slice(2, 8)}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-[#E1AD01]/20 flex items-center justify-center">
                        <Truck className="w-5 h-5 text-[#E1AD01]" />
                      </div>
                      <div className="flex-1 text-left">
                        <p className="text-white">Estimated Delivery</p>
                        <p className="text-[#E1AD01]">3-5 Business Days</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>

              <p className="text-[#D0D0D0] text-sm">Redirecting to your dashboard...</p>
            </motion.div>
          </motion.div>
        </div>
      </div>
    )
  }

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)" }}>
        <div className="max-w-2xl mx-auto px-4 py-20 text-center">
          <ShoppingBag className="w-16 h-16 mx-auto text-[#E1AD01]/40 mb-4" />
          <h2 className="text-2xl text-white mb-4">Your cart is empty</h2>
          <p className="text-[#D0D0D0] mb-6">Add some items to your cart to checkout</p>
          <Button
            className="bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black"
            onClick={() => setCurrentPage("shop")}
          >
            Continue Shopping
          </Button>
        </div>
      </div>
    )
  }

  return (
    <div className="min-h-screen" style={{ background: "linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)" }}>
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -top-40 -right-40 w-[500px] h-[500px] rounded-full opacity-20"
          style={{
            background: "radial-gradient(circle, #E1AD01 0%, #FFD700 100%)",
            filter: "blur(80px)",
          }}
        />
        <motion.div
          animate={{
            scale: [1, 1.3, 1],
            x: [0, -30, 0],
            y: [0, 40, 0],
            rotate: [0, -120, 0],
          }}
          transition={{ duration: 25, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          className="absolute bottom-20 left-20 w-[450px] h-[450px] rounded-full opacity-15"
          style={{
            background: "radial-gradient(circle, #FFB6D9 0%, #FFA07A 100%)",
            filter: "blur(70px)",
          }}
        />
      </div>

      {/* Header */}
      <motion.div
        initial={{ y: -20, opacity: 0 }}
        animate={{ y: 0, opacity: 1 }}
        className="relative border-b border-[#E1AD01]/20 bg-[#1A1A1A]/50 backdrop-blur-sm"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <div className="flex items-center gap-3 mb-2">
            <Sparkles className="w-8 h-8 text-[#E1AD01]" />
            <h1 className="text-4xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
              Checkout
            </h1>
          </div>
          <p className="text-[#D0D0D0]">Complete your order and get your items delivered!</p>
        </div>
      </motion.div>

      <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
          {/* Left Column - Forms */}
          <div className="lg:col-span-2 space-y-6">
            {/* Delivery Information */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.1 }}>
              <Card className="bg-[#2A2A2A] border-[#E1AD01]/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl text-white mb-6 flex items-center gap-2">
                    <MapPin className="w-6 h-6 text-[#E1AD01]" />
                    Delivery Information
                  </h2>
                  <form onSubmit={handleSubmit} className="space-y-4">
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="fullName" className="text-[#D0D0D0]">
                          Full Name *
                        </Label>
                        <Input
                          id="fullName"
                          name="fullName"
                          required
                          value={formData.fullName}
                          onChange={handleInputChange}
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                          placeholder="Enter your full name"
                        />
                      </div>
                      <div>
                        <Label htmlFor="phone" className="text-[#D0D0D0]">
                          Phone Number *
                        </Label>
                        <Input
                          id="phone"
                          name="phone"
                          required
                          value={formData.phone}
                          onChange={handleInputChange}
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                          placeholder="+92 300 1234567"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="email" className="text-[#D0D0D0]">
                        Email *
                      </Label>
                      <Input
                        id="email"
                        name="email"
                        type="email"
                        required
                        value={formData.email}
                        onChange={handleInputChange}
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                        placeholder="your.email@example.com"
                      />
                    </div>

                    <div>
                      <Label htmlFor="address" className="text-[#D0D0D0]">
                        Delivery Address *
                      </Label>
                      <Textarea
                        id="address"
                        name="address"
                        required
                        value={formData.address}
                        onChange={handleInputChange}
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                        placeholder="House/Flat No, Street, Area"
                        rows={3}
                      />
                    </div>

                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                      <div>
                        <Label htmlFor="city" className="text-[#D0D0D0]">
                          City *
                        </Label>
                        <Input
                          id="city"
                          name="city"
                          required
                          value={formData.city}
                          onChange={handleInputChange}
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                          placeholder="Karachi, Lahore, etc."
                        />
                      </div>
                      <div>
                        <Label htmlFor="postalCode" className="text-[#D0D0D0]">
                          Postal Code
                        </Label>
                        <Input
                          id="postalCode"
                          name="postalCode"
                          value={formData.postalCode}
                          onChange={handleInputChange}
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                          placeholder="75500"
                        />
                      </div>
                    </div>

                    <div>
                      <Label htmlFor="notes" className="text-[#D0D0D0]">
                        Order Notes (Optional)
                      </Label>
                      <Textarea
                        id="notes"
                        name="notes"
                        value={formData.notes}
                        onChange={handleInputChange}
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                        placeholder="Any special instructions?"
                        rows={2}
                      />
                    </div>

                    <button type="submit" style={{ display: "none" }} />
                  </form>
                </CardContent>
              </Card>
            </motion.div>

            {/* Payment Method */}
            <motion.div initial={{ x: -20, opacity: 0 }} animate={{ x: 0, opacity: 1 }} transition={{ delay: 0.2 }}>
              <Card className="bg-[#2A2A2A] border-[#E1AD01]/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl text-white mb-6 flex items-center gap-2">
                    <Wallet className="w-6 h-6 text-[#E1AD01]" />
                    Payment Method
                  </h2>
                  <RadioGroup value={paymentMethod} onValueChange={setPaymentMethod}>
                    <div className="space-y-3">
                      <motion.label
                        whileHover={{ scale: 1.02 }}
                        className={`flex items-center gap-4 p-4 rounded-xl border-2 cursor-pointer transition-all ${
                          paymentMethod === "cod"
                            ? "border-[#E1AD01] bg-[#E1AD01]/10"
                            : "border-[#E1AD01]/20 hover:border-[#E1AD01]/40"
                        }`}
                      >
                        <RadioGroupItem value="cod" id="cod" />
                        <div className="flex items-center gap-3 flex-1">
                          <div className="w-10 h-10 rounded-full bg-[#E1AD01]/20 flex items-center justify-center">
                            <Wallet className="w-5 h-5 text-[#E1AD01]" />
                          </div>
                          <div>
                            <p className="text-white">Cash on Delivery</p>
                            <p className="text-sm text-[#D0D0D0]">Pay when you receive</p>
                          </div>
                        </div>
                      </motion.label>
                    </div>
                  </RadioGroup>
                </CardContent>
              </Card>
            </motion.div>
          </div>

          {/* Right Column - Order Summary */}
          <div className="lg:col-span-1">
            <motion.div
              initial={{ x: 20, opacity: 0 }}
              animate={{ x: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="sticky top-24"
            >
              <Card className="bg-[#2A2A2A] border-[#E1AD01]/20">
                <CardContent className="p-6">
                  <h2 className="text-2xl text-white mb-6 flex items-center gap-2">
                    <ShoppingBag className="w-6 h-6 text-[#E1AD01]" />
                    Order Summary
                  </h2>

                  <div className="space-y-4 mb-6 max-h-[400px] overflow-y-auto">
                    {cartItems.map((item) => (
                      <div key={item.id} className="flex gap-3">
                        <ImageWithFallback
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          className="w-6 h-6 object-cover rounded-lg border-2 border-[#E1AD01]/30"
                        />
                        <div className="flex-1">
                          <p className="text-white text-sm">{item.name}</p>
                          <p className="text-[#D0D0D0] text-xs">Qty: {item.quantity}</p>
                          <p className="text-[#E1AD01] text-sm">{item.price}</p>
                        </div>
                      </div>
                    ))}
                  </div>

                  <div className="border-t border-[#E1AD01]/20 pt-4 space-y-3">
                    <div className="flex justify-between text-[#D0D0D0]">
                      <span>Subtotal:</span>
                      <span>Rs {total.toLocaleString()}</span>
                    </div>
                    <div className="flex justify-between text-[#D0D0D0]">
                      <span>Delivery Fee:</span>
                      <span className={deliveryFee === 0 ? "text-green-400" : ""}>
                        {deliveryFee === 0 ? "FREE" : `Rs ${deliveryFee}`}
                      </span>
                    </div>
                    {total > 5000 && (
                      <p className="text-xs text-green-400 flex items-center gap-1">
                        <CheckCircle2 className="w-3 h-3" />
                        You saved Rs 200 on delivery!
                      </p>
                    )}
                    <div className="border-t border-[#E1AD01]/20 pt-3 flex justify-between text-white text-lg">
                      <span>Total:</span>
                      <span className="text-[#E1AD01]">Rs {finalTotal.toLocaleString()}</span>
                    </div>
                  </div>

                  <Button
                    onClick={() => {
                      const form = document.querySelector("form")
                      if (form) form.dispatchEvent(new Event("submit", { bubbles: true }))
                    }}
                    disabled={isProcessing}
                    className="w-full mt-6 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black shadow-lg py-6"
                  >
                    {isProcessing ? (
                      <>
                        <motion.div
                          animate={{ rotate: 360 }}
                          transition={{ duration: 1, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                          className="w-5 h-5 border-2 border-black border-t-transparent rounded-full mr-2"
                        />
                        Processing...
                      </>
                    ) : (
                      <>
                        <Shield className="w-5 h-5 mr-2" />
                        Place Order
                      </>
                    )}
                  </Button>

                  <div className="mt-4 flex items-center justify-center gap-2 text-xs text-[#D0D0D0]">
                    <Shield className="w-4 h-4 text-[#E1AD01]" />
                    <span>Secure checkout - Your data is safe</span>
                  </div>
                </CardContent>
              </Card>
            </motion.div>
          </div>
        </div>
      </div>
    </div>
  )
}
