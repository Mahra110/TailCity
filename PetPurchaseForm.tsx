"use client"

import type React from "react"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { X, ShoppingCart, CheckCircle } from "lucide-react"

interface PetPurchaseFormProps {
  isOpen: boolean
  onClose: () => void
  petName: string
  petPrice: string
  petBreed: string
}

export function PetPurchaseForm({ isOpen, onClose, petName, petPrice, petBreed }: PetPurchaseFormProps) {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phone: "",
    address: "",
  })
  const [isSubmitted, setIsSubmitted] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setIsSubmitted(true)
    setTimeout(() => {
      setIsSubmitted(false)
      onClose()
      setFormData({ fullName: "", email: "", phone: "", address: "" })
    }, 2000)
  }

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    setFormData({ ...formData, [e.target.name]: e.target.value })
  }

  return (
    <AnimatePresence>
      {isOpen && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          className="fixed inset-0 bg-black/60 backdrop-blur-sm flex items-center justify-center z-50 p-4"
          onClick={onClose}
        >
          <motion.div
            initial={{ scale: 0.9, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            exit={{ scale: 0.9, opacity: 0 }}
            className="bg-[#2A2A2A] rounded-2xl p-8 max-w-md w-full shadow-2xl border-2 border-[#E1AD01]/30 relative"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close Button */}
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#E1AD01] transition-colors group"
            >
              <X className="w-5 h-5 text-[#E1AD01] group-hover:text-black" />
            </button>

            {!isSubmitted ? (
              <>
                <div className="text-center mb-6">
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] flex items-center justify-center mx-auto mb-4">
                    <ShoppingCart className="w-8 h-8 text-black" />
                  </div>
                  <h2 className="text-2xl mb-2 text-white">Purchase {petName}</h2>
                  <p className="text-[#D0D0D0] text-sm">Breed: {petBreed}</p>
                  <p className="text-2xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mt-2">
                    {petPrice}
                  </p>
                </div>

                <form onSubmit={handleSubmit} className="space-y-4">
                  <div>
                    <Label htmlFor="fullName" className="text-white mb-2 block">
                      Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleChange}
                      required
                      className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                      placeholder="Enter your full name"
                    />
                  </div>

                  <div>
                    <Label htmlFor="email" className="text-white mb-2 block">
                      Email
                    </Label>
                    <Input
                      id="email"
                      name="email"
                      type="email"
                      value={formData.email}
                      onChange={handleChange}
                      required
                      className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                      placeholder="your@email.com"
                    />
                  </div>

                  <div>
                    <Label htmlFor="phone" className="text-white mb-2 block">
                      Phone Number
                    </Label>
                    <Input
                      id="phone"
                      name="phone"
                      type="tel"
                      value={formData.phone}
                      onChange={handleChange}
                      required
                      className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                      placeholder="+92 XXX XXXXXXX"
                    />
                  </div>

                  <div>
                    <Label htmlFor="address" className="text-white mb-2 block">
                      Delivery Address
                    </Label>
                    <Input
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleChange}
                      required
                      className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white focus:border-[#E1AD01]"
                      placeholder="Your complete address"
                    />
                  </div>

                  <Button
                    type="submit"
                    className="w-full text-black rounded-xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg py-6"
                  >
                    Confirm Purchase ✨
                  </Button>
                </form>
              </>
            ) : (
              <motion.div initial={{ scale: 0 }} animate={{ scale: 1 }} className="text-center py-8">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1, rotate: 360 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="w-20 h-20 rounded-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] flex items-center justify-center mx-auto mb-4"
                >
                  <CheckCircle className="w-10 h-10 text-black" />
                </motion.div>
                <h3 className="text-2xl text-white mb-2">Purchase Successful! 🎉</h3>
                <p className="text-[#D0D0D0]">We'll contact you shortly for delivery.</p>
              </motion.div>
            )}
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
