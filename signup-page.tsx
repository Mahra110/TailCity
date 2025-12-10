"use client"

import type React from "react"
import { motion } from "framer-motion"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { useState } from "react"
import { authAPI, setToken, setStoredUser } from "../lib/api"
import { toast } from "sonner"
import { Eye, EyeOff, Mail, Lock, User, Phone } from "lucide-react"
import { Card, CardContent } from "@/components/ui/card"
import { useRouter } from "next/navigation"

interface SignupPageProps {
  setCurrentPage: (page: string) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setUser?: (user: any) => void
}

export function SignupPage({ setCurrentPage, setIsLoggedIn, setUser }: SignupPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [showConfirmPassword, setShowConfirmPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [fullname, setFullname] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirmPassword, setConfirmPassword] = useState("")
  const router = useRouter()

  const handleSignup = async (e: React.FormEvent) => {
    e.preventDefault()

    if (password !== confirmPassword) {
      toast.error("Passwords do not match")
      return
    }

    setLoading(true)

    try {
      console.log("[v0] Signing up with:", { fullname, email, phone })
      const response = await authAPI.register(fullname, email, phone, password)
      console.log("[v0] Register response:", response)

      if (response.success) {
        toast.success("Registration successful! Logging you in...")

        const loginResponse = await authAPI.login(email, password)
        console.log("[v0] Login response after signup:", loginResponse)

        if (loginResponse.success) {
          const userData = loginResponse.user
          console.log("[v0] User data to store:", userData)

          localStorage.setItem("user", JSON.stringify(userData))
          localStorage.setItem("isLoggedIn", "true")
          localStorage.removeItem("isGuest")

          const storedCheck = localStorage.getItem("user")
          console.log("[v0] Stored user check:", storedCheck)

          setToken(loginResponse.token)
          setStoredUser(userData)
          setIsLoggedIn(true)
          if (setUser) {
            console.log("[v0] Calling setUser with:", userData)
            setUser(userData)
          }

          window.dispatchEvent(new CustomEvent("userUpdate", { detail: userData }))
          window.dispatchEvent(new Event("storage"))

          setTimeout(() => {
            router.push("/")
          }, 100)
        }
      }
    } catch (error: any) {
      console.error("[v0] Signup error:", error)
      toast.error(error.message || "Registration failed")
    } finally {
      setLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center py-12 bg-[#1A1A1A] relative overflow-hidden">
      {/* Animated background */}
      <motion.div
        className="absolute top-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF6B9D]/25 to-[#E1AD01]/15 rounded-full filter blur-3xl"
        animate={{
          x: [0, -70, 40, 0],
          y: [0, 50, -50, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-0 left-0 w-96 h-96 bg-gradient-to-br from-[#E1AD01]/25 to-[#FF6B9D]/15 rounded-full filter blur-3xl"
        animate={{
          x: [0, 70, -40, 0],
          y: [0, -50, 50, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/3 w-80 h-80 bg-gradient-to-br from-[#C4B5FD]/20 to-transparent rounded-full filter blur-3xl"
        animate={{
          rotate: [360, 0],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-4 relative z-10">
        {/* Left side image */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex items-center justify-center"
        >
          <div className="relative">
            <motion.div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#FF6B9D]/50 to-[#E1AD01]/50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.img
              src="/happy-pets-together.jpg"
              alt="Happy pets together"
              className="rounded-3xl shadow-2xl relative"
              animate={{ y: [0, -15, 0] }}
              transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
              whileHover={{ scale: 1.05 }}
            />
            <motion.div
              className="absolute inset-0 rounded-3xl bg-gradient-to-t from-[#1A1A1A] via-transparent to-transparent"
              animate={{ opacity: [0.2, 0.4, 0.2] }}
              transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY }}
            />
          </div>
        </motion.div>

        {/* Right side - Form */}
        <motion.div
          initial={{ opacity: 0, x: 30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="flex items-center justify-center"
        >
          <div className="max-w-md w-full">
            <Card className="bg-[#2A2A2A]/95 border-2 border-[#E1AD01]/40 rounded-3xl shadow-2xl backdrop-blur-sm hover:border-[#E1AD01]/70 transition-all duration-300 hover:shadow-[0_0_40px_rgba(225,173,1,0.3)]">
              <CardContent className="p-8">
                <div className="text-center mb-8">
                  <motion.div
                    className="w-20 h-20 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-[#E1AD01] to-[#FFD700] shadow-xl"
                    animate={{
                      scale: [1, 1.1, 1],
                      rotate: [0, -8, 8, 0],
                    }}
                    transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
                  >
                    <img
                      src="/images/white-20and-20black-20illustrative-20pets-20store-20logo-20-282-29.png"
                      alt="TailCity"
                      className="w-14 h-14 rounded-full"
                    />
                  </motion.div>
                  <motion.h1
                    className="text-4xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-3 font-bold"
                    animate={{ y: [0, -3, 0] }}
                    transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                  >
                    Join TailCity!
                  </motion.h1>
                  <p className="text-[#D0D0D0] text-sm font-medium">Start your amazing pet journey today</p>
                </div>

                {/* Signup Form */}
                <form onSubmit={handleSignup} className="space-y-5">
                  {/* Full Name */}
                  <motion.div animate={{ scale: focusedField === "fullname" ? 1.02 : 1 }}>
                    <Label htmlFor="fullname" className="text-[#D0D0D0] text-sm font-semibold">
                      Full Name
                    </Label>
                    <div className="relative mt-2">
                      <User className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E1AD01]" />
                      <Input
                        id="fullname"
                        type="text"
                        placeholder="John Doe"
                        value={fullname}
                        onChange={(e) => setFullname(e.target.value)}
                        className="pl-10 bg-[#1A1A1A] border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] rounded-xl text-white placeholder:text-[#D0D0D0]/50 transition-all focus:shadow-[0_0_20px_rgba(225,173,1,0.3)]"
                        onFocus={() => setFocusedField("fullname")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Email Address */}
                  <motion.div animate={{ scale: focusedField === "email" ? 1.02 : 1 }}>
                    <Label htmlFor="email" className="text-[#D0D0D0] text-sm font-semibold">
                      Email Address
                    </Label>
                    <div className="relative mt-2">
                      <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E1AD01]" />
                      <Input
                        id="email"
                        type="email"
                        placeholder="your@email.com"
                        value={email}
                        onChange={(e) => setEmail(e.target.value)}
                        className="pl-10 bg-[#1A1A1A] border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] rounded-xl text-white placeholder:text-[#D0D0D0]/50 transition-all focus:shadow-[0_0_20px_rgba(225,173,1,0.3)]"
                        onFocus={() => setFocusedField("email")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Phone Number */}
                  <motion.div animate={{ scale: focusedField === "phone" ? 1.02 : 1 }}>
                    <Label htmlFor="phone" className="text-[#D0D0D0] text-sm font-semibold">
                      Phone Number
                    </Label>
                    <div className="relative mt-2">
                      <Phone className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E1AD01]" />
                      <Input
                        id="phone"
                        type="tel"
                        placeholder="+92 300 1234567"
                        value={phone}
                        onChange={(e) => setPhone(e.target.value)}
                        className="pl-10 bg-[#1A1A1A] border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] rounded-xl text-white placeholder:text-[#D0D0D0]/50 transition-all focus:shadow-[0_0_20px_rgba(225,173,1,0.3)]"
                        onFocus={() => setFocusedField("phone")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                    </div>
                  </motion.div>

                  {/* Password */}
                  <motion.div animate={{ scale: focusedField === "password" ? 1.02 : 1 }}>
                    <Label htmlFor="password" className="text-[#D0D0D0] text-sm font-semibold">
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E1AD01]" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Create a strong password"
                        value={password}
                        onChange={(e) => setPassword(e.target.value)}
                        className="pl-10 pr-10 bg-[#1A1A1A] border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] rounded-xl text-white placeholder:text-[#D0D0D0]/50 transition-all focus:shadow-[0_0_20px_rgba(225,173,1,0.3)]"
                        onFocus={() => setFocusedField("password")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-125 transition-transform"
                      >
                        {showPassword ? (
                          <EyeOff className="w-5 h-5 text-[#E1AD01]" />
                        ) : (
                          <Eye className="w-5 h-5 text-[#E1AD01]" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Confirm Password */}
                  <motion.div animate={{ scale: focusedField === "confirmPassword" ? 1.02 : 1 }}>
                    <Label htmlFor="confirmPassword" className="text-[#D0D0D0] text-sm font-semibold">
                      Confirm Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E1AD01]" />
                      <Input
                        id="confirmPassword"
                        type={showConfirmPassword ? "text" : "password"}
                        placeholder="Confirm your password"
                        value={confirmPassword}
                        onChange={(e) => setConfirmPassword(e.target.value)}
                        className="pl-10 pr-10 bg-[#1A1A1A] border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] rounded-xl text-white placeholder:text-[#D0D0D0]/50 transition-all focus:shadow-[0_0_20px_rgba(225,173,1,0.3)]"
                        onFocus={() => setFocusedField("confirmPassword")}
                        onBlur={() => setFocusedField(null)}
                        required
                      />
                      <button
                        type="button"
                        onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                        className="absolute right-3 top-1/2 transform -translate-y-1/2 hover:scale-125 transition-transform"
                      >
                        {showConfirmPassword ? (
                          <EyeOff className="w-5 h-5 text-[#E1AD01]" />
                        ) : (
                          <Eye className="w-5 h-5 text-[#E1AD01]" />
                        )}
                      </button>
                    </div>
                  </motion.div>

                  {/* Terms of Service and Privacy Policy */}
                  <div className="flex items-start">
                    <input
                      type="checkbox"
                      className="rounded border-[#E1AD01]/30 bg-[#1A1A1A] text-[#E1AD01] mt-1 accent-[#E1AD01]"
                      required
                    />
                    <span className="ml-2 text-xs text-[#D0D0D0]">
                      I agree to the{" "}
                      <button type="button" className="text-[#E1AD01] hover:text-[#FFD700] transition-colors font-bold">
                        Terms of Service
                      </button>{" "}
                      and{" "}
                      <button type="button" className="text-[#E1AD01] hover:text-[#FFD700] transition-colors font-bold">
                        Privacy Policy
                      </button>
                    </span>
                  </div>

                  {/* Create Account Button */}
                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full text-black rounded-xl py-6 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg font-bold text-base transition-all disabled:opacity-50"
                    >
                      {loading ? "Creating Account..." : "Create Account"}
                    </Button>
                  </motion.div>
                </form>

                {/* Divider and Login Link */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E1AD01]/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#2A2A2A] text-[#D0D0D0]">Already a member?</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[#D0D0D0] text-sm">
                    Already have an account?{" "}
                    <motion.button
                      onClick={() => setCurrentPage("login")}
                      className="text-[#E1AD01] hover:text-[#FFD700] transition-colors font-bold"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Login Now
                    </motion.button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>
    </div>
  )
}
