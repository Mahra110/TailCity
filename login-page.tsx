"use client"

import type React from "react"
import { motion } from "framer-motion"
import { useState } from "react"
import { authAPI, setToken, setStoredUser } from "../lib/api"
import { toast } from "sonner"
import { Card, CardContent } from "./ui/card"
import { Label } from "@/components/ui/label"
import { Input } from "@/components/ui/input"
import { Button } from "@/components/ui/button"
import { Mail, Lock, Eye, EyeOff } from "lucide-react"
import { useRouter } from "next/navigation"
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog"

interface LoginPageProps {
  setCurrentPage: (page: string) => void
  setIsLoggedIn: (isLoggedIn: boolean) => void
  setIsGuest?: (isGuest: boolean) => void
  setUser?: (user: any) => void
}

export function LoginPage({ setCurrentPage, setIsLoggedIn, setIsGuest, setUser }: LoginPageProps) {
  const [showPassword, setShowPassword] = useState(false)
  const [focusedField, setFocusedField] = useState<string | null>(null)
  const [loading, setLoading] = useState(false)
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const router = useRouter()
  const [showForgotPassword, setShowForgotPassword] = useState(false)
  const [resetEmail, setResetEmail] = useState("")
  const [resetLoading, setResetLoading] = useState(false)

  const handleLogin = async (e: React.FormEvent) => {
    e.preventDefault()
    setLoading(true)

    try {
      console.log("[v0] Logging in with:", { email })
      const response = await authAPI.login(email, password)
      console.log("[v0] Login response:", response)

      if (response.success) {
        const userData = response.user
        console.log("[v0] User data to store:", userData)

        localStorage.setItem("user", JSON.stringify(userData))
        localStorage.setItem("isLoggedIn", "true")
        localStorage.removeItem("isGuest")

        // Verify localStorage was set correctly
        const storedCheck = localStorage.getItem("user")
        console.log("[v0] Stored user check:", storedCheck)

        setToken(response.token)
        setStoredUser(userData)
        setIsLoggedIn(true)
        if (setUser) {
          console.log("[v0] Calling setUser with:", userData)
          setUser(userData)
        }
        if (setIsGuest) {
          setIsGuest(false)
        }

        // Force a re-render by dispatching custom event
        window.dispatchEvent(new CustomEvent("userUpdate", { detail: userData }))
        window.dispatchEvent(new Event("storage"))

        toast.success("Login successful!")

        // Small delay to ensure state updates before navigation
        setTimeout(() => {
          router.push("/")
        }, 100)
      }
    } catch (error: any) {
      console.error("[v0] Login error:", error)
      toast.error(error.message || "Login failed")
    } finally {
      setLoading(false)
    }
  }

  const handleGuestMode = () => {
    if (setIsGuest) {
      setIsGuest(true)
      localStorage.setItem("isGuest", "true")
    }
    localStorage.setItem("isLoggedIn", "false")
    setIsLoggedIn(false)
    toast.success("Logged in as guest")
    router.push("/")
  }

  const handleForgotPassword = async (e: React.FormEvent) => {
    e.preventDefault()
    setResetLoading(true)

    try {
      // Simulate password reset email
      await new Promise((resolve) => setTimeout(resolve, 1500))
      toast.success(`Password reset link sent to ${resetEmail}`)
      setShowForgotPassword(false)
      setResetEmail("")
    } catch (error: any) {
      toast.error("Failed to send reset link. Please try again.")
    } finally {
      setResetLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-[#1A1A1A] relative overflow-hidden">
      {/* ... existing animated background ... */}
      <motion.div
        className="absolute top-0 left-0 w-96 h-96 bg-gradient-to-br from-[#E1AD01]/25 to-[#FF6B9D]/15 rounded-full filter blur-3xl"
        animate={{
          x: [0, 60, -40, 0],
          y: [0, -40, 60, 0],
          scale: [1, 1.3, 0.8, 1],
        }}
        transition={{ duration: 12, repeat: Number.POSITIVE_INFINITY }}
      />
      <motion.div
        className="absolute bottom-0 right-0 w-96 h-96 bg-gradient-to-br from-[#FF6B9D]/25 to-[#E1AD01]/15 rounded-full filter blur-3xl"
        animate={{
          x: [0, -60, 40, 0],
          y: [0, 40, -60, 0],
          scale: [1, 0.8, 1.3, 1],
        }}
        transition={{ duration: 14, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
      />
      <motion.div
        className="absolute top-1/2 left-1/2 w-80 h-80 bg-gradient-to-br from-[#C4B5FD]/20 to-transparent rounded-full filter blur-3xl"
        animate={{
          rotate: [0, 360],
          scale: [1, 1.1, 1],
        }}
        transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
      />

      <div className="w-full max-w-6xl mx-auto grid md:grid-cols-2 gap-8 px-4 relative z-10">
        {/* ... existing left side image ... */}
        <motion.div
          initial={{ opacity: 0, x: -30 }}
          animate={{ opacity: 1, x: 0 }}
          transition={{ duration: 0.8 }}
          className="hidden md:flex items-center justify-center"
        >
          <div className="relative">
            <motion.div className="absolute -inset-4 rounded-3xl bg-gradient-to-r from-[#E1AD01]/50 to-[#FFD700]/50 blur-2xl opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
            <motion.img
              src="/cute-puppy-playing.jpg"
              alt="Cute pets playing"
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
                      rotate: [0, 8, -8, 0],
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
                    Welcome Back!
                  </motion.h1>
                  <p className="text-[#D0D0D0] text-sm font-medium">Your furry friends are waiting for you</p>
                </div>

                {/* Login Form */}
                <form onSubmit={handleLogin} className="space-y-6">
                  <motion.div animate={{ scale: focusedField === "email" ? 1.02 : 1 }}>
                    <Label htmlFor="email" className="text-[#D0D0D0] font-semibold text-sm">
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

                  <motion.div animate={{ scale: focusedField === "password" ? 1.02 : 1 }}>
                    <Label htmlFor="password" className="text-[#D0D0D0] font-semibold text-sm">
                      Password
                    </Label>
                    <div className="relative mt-2">
                      <Lock className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E1AD01]" />
                      <Input
                        id="password"
                        type={showPassword ? "text" : "password"}
                        placeholder="Enter your password"
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

                  <div className="flex items-center justify-between">
                    <label className="flex items-center cursor-pointer group">
                      <input
                        type="checkbox"
                        className="rounded border-[#E1AD01]/30 bg-[#1A1A1A] text-[#E1AD01] accent-[#E1AD01]"
                      />
                      <span className="ml-2 text-sm text-[#D0D0D0] group-hover:text-white transition-colors">
                        Remember me
                      </span>
                    </label>
                    <button
                      type="button"
                      onClick={() => setShowForgotPassword(true)}
                      className="text-sm text-[#E1AD01] hover:text-[#FFD700] transition-colors font-semibold"
                    >
                      Forgot Password?
                    </button>
                  </div>

                  <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }}>
                    <Button
                      type="submit"
                      disabled={loading}
                      className="w-full text-black rounded-xl py-6 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg font-bold text-base transition-all disabled:opacity-50"
                    >
                      {loading ? "Logging in..." : "Login to TailCity"}
                    </Button>
                  </motion.div>
                </form>

                <motion.div whileHover={{ scale: 1.03 }} whileTap={{ scale: 0.97 }} className="mt-4">
                  <Button
                    type="button"
                    onClick={handleGuestMode}
                    className="w-full text-[#E1AD01] bg-transparent border-2 border-[#E1AD01] rounded-xl py-6 hover:bg-[#E1AD01]/10 transition-all shadow-lg font-semibold"
                  >
                    Continue as Guest
                  </Button>
                </motion.div>

                {/* ... existing divider and signup link ... */}
                <div className="relative my-6">
                  <div className="absolute inset-0 flex items-center">
                    <div className="w-full border-t border-[#E1AD01]/20"></div>
                  </div>
                  <div className="relative flex justify-center text-sm">
                    <span className="px-4 bg-[#2A2A2A] text-[#D0D0D0]">New to TailCity?</span>
                  </div>
                </div>

                <div className="text-center">
                  <p className="text-[#D0D0D0] text-sm">
                    Don't have an account?{" "}
                    <motion.button
                      onClick={() => setCurrentPage("signup")}
                      className="text-[#E1AD01] hover:text-[#FFD700] transition-colors font-bold"
                      whileHover={{ scale: 1.08 }}
                      whileTap={{ scale: 0.95 }}
                    >
                      Sign Up Now
                    </motion.button>
                  </p>
                </div>
              </CardContent>
            </Card>
          </div>
        </motion.div>
      </div>

      <Dialog open={showForgotPassword} onOpenChange={setShowForgotPassword}>
        <DialogContent className="bg-[#2A2A2A] border-2 border-[#E1AD01]/40 text-white">
          <DialogHeader>
            <DialogTitle className="text-2xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
              Reset Your Password
            </DialogTitle>
            <DialogDescription className="text-[#D0D0D0]">
              Enter your email address and we'll send you a link to reset your password.
            </DialogDescription>
          </DialogHeader>
          <form onSubmit={handleForgotPassword} className="space-y-4 mt-4">
            <div>
              <Label htmlFor="reset-email" className="text-[#D0D0D0] font-semibold text-sm">
                Email Address
              </Label>
              <div className="relative mt-2">
                <Mail className="absolute left-3 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E1AD01]" />
                <Input
                  id="reset-email"
                  type="email"
                  placeholder="your@email.com"
                  value={resetEmail}
                  onChange={(e) => setResetEmail(e.target.value)}
                  className="pl-10 bg-[#1A1A1A] border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] rounded-xl text-white placeholder:text-[#D0D0D0]/50"
                  required
                />
              </div>
            </div>
            <div className="flex gap-3 pt-2">
              <Button
                type="button"
                onClick={() => setShowForgotPassword(false)}
                className="flex-1 bg-transparent border-2 border-[#E1AD01] text-[#E1AD01] hover:bg-[#E1AD01]/10 rounded-xl"
              >
                Cancel
              </Button>
              <Button
                type="submit"
                disabled={resetLoading}
                className="flex-1 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] text-black hover:from-[#FFD700] hover:to-[#E1AD01] rounded-xl font-semibold"
              >
                {resetLoading ? "Sending..." : "Send Reset Link"}
              </Button>
            </div>
          </form>
        </DialogContent>
      </Dialog>
    </div>
  )
}
