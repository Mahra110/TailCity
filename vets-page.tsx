"use client"

import type React from "react"
import { Navigation } from "./navigation"
import { Footer } from "./footer"
import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Heart, Phone, Mail, Calendar, Award, Clock, Stethoscope, Shield, MapPin, Star, X } from "lucide-react"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"

interface VetsPageProps {
  isLoggedIn?: boolean
}

export function VetsPage({ isLoggedIn }: VetsPageProps) {
  const [hoveredVet, setHoveredVet] = useState<number | null>(null)
  const [showBookingForm, setShowBookingForm] = useState<number | null>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [showEmergencyPopup, setShowEmergencyPopup] = useState<"call" | "tips" | null>(null)
  const [bookingData, setBookingData] = useState({
    petName: "",
    petType: "",
    issue: "",
    date: "",
    time: "",
    phone: "",
  })
  const [showGuestMessage, setShowGuestMessage] = useState(false)

  const vets = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "General Practice",
      experience: "12 years",
      rating: 5,
      image: "https://images.unsplash.com/photo-1553688738-a278b9f063e0?w=400",
      phone: "+92 300 1234567",
      email: "sarah.j@tailcity.com",
      location: "Karachi, Gulshan",
      patients: "2000+",
    },
    {
      id: 2,
      name: "Dr. Mike Chen",
      specialization: "Surgery Specialist",
      experience: "15 years",
      rating: 5,
      image: "https://images.unsplash.com/photo-1612349317150-e413f6a5b16d?w=400",
      phone: "+92 301 2345678",
      email: "mike.c@tailcity.com",
      location: "Lahore, DHA",
      patients: "2500+",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialization: "Exotic Animals",
      experience: "10 years",
      rating: 5,
      image: "https://images.unsplash.com/photo-15598397342b71ea197ec2?w=400",
      phone: "+92 302 3456789",
      email: "emily.d@tailcity.com",
      location: "Islamabad, F-7",
      patients: "1500+",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialization: "Dentistry",
      experience: "8 years",
      rating: 5,
      image: "https://images.unsplash.com/photo-1622253692010-333f2da6031d?w=400",
      phone: "+92 303 4567890",
      email: "james.w@tailcity.com",
      location: "Karachi, Clifton",
      patients: "1200+",
    },
    {
      id: 5,
      name: "Dr. Lisa Brown",
      specialization: "Internal Medicine",
      experience: "14 years",
      rating: 5,
      image: "https://images.unsplash.com/photo-1594824476967-48c8b964273f?w=400",
      phone: "+92 304 5678901",
      email: "lisa.b@tailcity.com",
      location: "Rawalpindi, Bahria",
      patients: "2200+",
    },
    {
      id: 6,
      name: "Dr. David Martinez",
      specialization: "Emergency Care",
      experience: "11 years",
      rating: 5,
      image: "https://images.unsplash.com/photo-1537368910025-700350fe46c7?w=400",
      phone: "+92 305 6789012",
      email: "david.m@tailcity.com",
      location: "Multan, Cantt",
      patients: "1800+",
    },
  ]

  const floatingAnimation = {
    y: [0, -15, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: [0.42, 0, 0.58, 1],
    },
  }

  const handleBookingSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
    setShowBookingForm(null)
    setBookingData({
      petName: "",
      petType: "",
      issue: "",
      date: "",
      time: "",
      phone: "",
    })
  }

  const handleBookAppointment = (vetId: number) => {
    if (!isLoggedIn) {
      setShowGuestMessage(true)
      return
    }
    setShowBookingForm(vetId)
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-24 overflow-hidden bg-gradient-to-br from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A]"
        >
          {/* Floating Elements */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute top-20 right-20 text-8xl"
            >
              🩺
            </motion.div>
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.div
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-6"
            >
              <div className="w-24 h-24 rounded-3xl bg-gradient-to-br from-[#E1AD01] to-[#FFD700] flex items-center justify-center mx-auto shadow-2xl">
                <Stethoscope className="w-12 h-12 text-black" />
              </div>
            </motion.div>

            <motion.h1
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-5xl md:text-7xl mb-6 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent"
            >
              Meet Our Trusted Vets 🩺
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.4 }}
              className="text-xl md:text-2xl text-[#D0D0D0] max-w-3xl mx-auto mb-12 leading-relaxed"
            >
              Experienced, compassionate professionals dedicated to providing the best care for your beloved pets! 🐾✨
            </motion.p>

            {/* Stats */}
            <motion.div
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.5 }}
              className="grid grid-cols-2 md:grid-cols-4 gap-6 max-w-5xl mx-auto"
            >
              {[
                { emoji: "🩺", value: "6+", label: "Expert Vets" },
                { emoji: "⭐", value: "5.0", label: "Rating" },
                { emoji: "🐾", value: "10K+", label: "Pets Treated" },
                { emoji: "🏥", value: "24/7", label: "Emergency" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  whileHover={{ scale: 1.05, y: -5 }}
                  className="bg-[#2A2A2A] rounded-3xl p-6 shadow-xl border-2 border-[#E1AD01]/20 hover:border-[#E1AD01]/40 transition-all"
                >
                  <div className="text-5xl mb-3">{stat.emoji}</div>
                  <div className="text-3xl mb-2 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                    {stat.value}
                  </div>
                  <div className="text-sm text-[#D0D0D0]">{stat.label}</div>
                </motion.div>
              ))}
            </motion.div>
          </div>
        </motion.section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-20">
          {/* Vets Grid */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {vets.map((vet, idx) => (
              <motion.div
                key={vet.id}
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10 }}
                onHoverStart={() => setHoveredVet(vet.id)}
                onHoverEnd={() => setHoveredVet(null)}
              >
                <Card className="bg-[#2A2A2A] border-2 border-[#E1AD01]/20 hover:border-[#E1AD01]/60 transition-all rounded-3xl overflow-hidden shadow-xl h-full">
                  <div className="relative h-64 overflow-hidden">
                    <ImageWithFallback
                      src={vet.image || "/placeholder.svg"}
                      alt={vet.name}
                      className="w-full h-full object-cover transition-transform duration-500"
                      style={{ transform: hoveredVet === vet.id ? "scale(1.1)" : "scale(1)" }}
                    />
                    <motion.div
                      className="absolute top-4 right-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] rounded-full px-4 py-2 shadow-lg"
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      transition={{ delay: idx * 0.1 + 0.2 }}
                    >
                      <div className="flex items-center gap-1">
                        {[...Array(vet.rating)].map((_, i) => (
                          <Star key={i} className="w-4 h-4 text-black fill-black" />
                        ))}
                      </div>
                    </motion.div>
                  </div>

                  <CardContent className="p-6">
                    <h3 className="text-2xl text-white mb-2">{vet.name}</h3>
                    <div className="flex items-center gap-2 mb-3">
                      <Award className="w-4 h-4 text-[#E1AD01]" />
                      <p className="text-[#E1AD01]">{vet.specialization}</p>
                    </div>

                    <div className="space-y-2 mb-4 text-sm text-[#D0D0D0]">
                      <div className="flex items-center gap-2">
                        <Clock className="w-4 h-4 text-[#E1AD01]" />
                        <span>{vet.experience} experience</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <MapPin className="w-4 h-4 text-[#E1AD01]" />
                        <span>{vet.location}</span>
                      </div>
                      <div className="flex items-center gap-2">
                        <Heart className="w-4 h-4 text-[#E1AD01]" />
                        <span>{vet.patients} happy pets</span>
                      </div>
                    </div>

                    {/* Contact Info */}
                    <div className="space-y-2 mb-4 text-sm bg-[#1A1A1A] rounded-xl p-3 border border-[#E1AD01]/10">
                      <div className="flex items-center gap-2 text-[#D0D0D0]">
                        <Phone className="w-4 h-4 text-[#E1AD01]" />
                        <span>{vet.phone}</span>
                      </div>
                      <div className="flex items-center gap-2 text-[#D0D0D0]">
                        <Mail className="w-4 h-4 text-[#E1AD01]" />
                        <span className="truncate">{vet.email}</span>
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        onClick={() => handleBookAppointment(vet.id)}
                        className="w-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black shadow-lg rounded-full"
                      >
                        <Calendar className="w-4 h-4 mr-2" />
                        Book Appointment
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          {/* Emergency Section */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.6 }}
            className="mt-20 bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-12 text-center border-2 border-[#E1AD01]/30 shadow-2xl relative overflow-hidden"
          >
            {/* Decorative Elements */}
            <motion.div
              animate={{ rotate: 360 }}
              transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
              className="absolute top-10 right-10 text-6xl opacity-20"
            >
              🚑
            </motion.div>

            <div className="relative z-10">
              <motion.div
                animate={{ scale: [1, 1.1, 1] }}
                transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                className="text-7xl mb-6"
              >
                🚨
              </motion.div>
              <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                Need Emergency Care?
              </h2>
              <p className="text-[#D0D0D0] text-lg mb-8 max-w-2xl mx-auto">
                Our veterinarians are available 24/7 for emergencies. Don't hesitate to reach out if your pet needs
                immediate attention! 🏥
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center items-center">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setShowEmergencyPopup("call")}
                    size="lg"
                    className="bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black shadow-lg rounded-full px-8"
                  >
                    <Phone className="w-5 h-5 mr-2" />
                    Call Emergency Line
                  </Button>
                </motion.div>
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    onClick={() => setShowEmergencyPopup("tips")}
                    size="lg"
                    variant="outline"
                    className="bg-transparent border-2 border-[#E1AD01] text-[#E1AD01] hover:bg-[#E1AD01]/10 rounded-full px-8"
                  >
                    <Shield className="w-5 h-5 mr-2" />
                    View Emergency Tips
                  </Button>
                </motion.div>
              </div>
            </div>
          </motion.div>

          {/* Why Choose Our Vets */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.7 }}
            className="mt-20"
          >
            <div className="text-center mb-12">
              <div className="text-7xl mb-6">🏆</div>
              <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                Why Choose Our Vets?
              </h2>
              <p className="text-[#D0D0D0] text-xl">Professional care with a personal touch ✨</p>
            </div>

            <div className="grid md:grid-cols-3 gap-8">
              {[
                {
                  emoji: "🎓",
                  title: "Certified Experts",
                  desc: "All our vets are certified professionals with years of specialized training and experience",
                },
                {
                  emoji: "❤️",
                  title: "Compassionate Care",
                  desc: "We treat every pet with love and attention, providing comfort in every visit",
                },
                {
                  emoji: "🔬",
                  title: "Modern Equipment",
                  desc: "State-of-the-art diagnostic tools and treatment facilities for accurate care",
                },
                {
                  emoji: "📱",
                  title: "Easy Booking",
                  desc: "Quick online appointment scheduling with instant confirmation and reminders",
                },
                {
                  emoji: "💊",
                  title: "Complete Services",
                  desc: "From routine checkups to surgeries, we provide comprehensive veterinary care",
                },
                {
                  emoji: "🌟",
                  title: "Trusted Reviews",
                  desc: "5-star ratings from thousands of satisfied pet parents across Pakistan",
                },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  animate={{ opacity: 1, y: 0 }}
                  transition={{ delay: 0.8 + idx * 0.1 }}
                  whileHover={{ y: -8, scale: 1.02 }}
                  className="bg-[#2A2A2A] rounded-2xl p-8 text-center shadow-lg border-2 border-[#E1AD01]/20 hover:border-[#E1AD01]/40 transition-all"
                >
                  <div className="text-6xl mb-4">{feature.emoji}</div>
                  <h3 className="text-2xl mb-3 text-white">{feature.title}</h3>
                  <p className="text-[#D0D0D0] leading-relaxed">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>

        <AnimatePresence>
          {showBookingForm && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#2A2A2A] rounded-2xl border-2 border-[#E1AD01]/30 w-full max-w-md max-h-96 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl text-white">Book Appointment</h2>
                    <button
                      onClick={() => setShowBookingForm(null)}
                      className="p-2 hover:bg-[#E1AD01]/10 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5 text-[#E1AD01]" />
                    </button>
                  </div>

                  <form onSubmit={handleBookingSubmit} className="space-y-3">
                    <div>
                      <label className="block text-xs text-[#D0D0D0] mb-1">Pet Name *</label>
                      <Input
                        required
                        value={bookingData.petName}
                        onChange={(e) => setBookingData({ ...bookingData, petName: e.target.value })}
                        placeholder="Your pet's name"
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#D0D0D0] mb-1">Pet Type *</label>
                      <Input
                        required
                        value={bookingData.petType}
                        onChange={(e) => setBookingData({ ...bookingData, petType: e.target.value })}
                        placeholder="Dog, Cat, etc."
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60 text-sm"
                      />
                    </div>
                    <div>
                      <label className="block text-xs text-[#D0D0D0] mb-1">Health Issue *</label>
                      <Textarea
                        required
                        value={bookingData.issue}
                        onChange={(e) => setBookingData({ ...bookingData, issue: e.target.value })}
                        placeholder="Describe the issue..."
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60 text-sm min-h-16"
                      />
                    </div>
                    <div className="grid grid-cols-2 gap-3">
                      <div>
                        <label className="block text-xs text-[#D0D0D0] mb-1">Date *</label>
                        <Input
                          required
                          type="date"
                          value={bookingData.date}
                          onChange={(e) => setBookingData({ ...bookingData, date: e.target.value })}
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white text-sm"
                        />
                      </div>
                      <div>
                        <label className="block text-xs text-[#D0D0D0] mb-1">Time *</label>
                        <Input
                          required
                          type="time"
                          value={bookingData.time}
                          onChange={(e) => setBookingData({ ...bookingData, time: e.target.value })}
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white text-sm"
                        />
                      </div>
                    </div>
                    <div>
                      <label className="block text-xs text-[#D0D0D0] mb-1">Phone *</label>
                      <Input
                        required
                        type="tel"
                        value={bookingData.phone}
                        onChange={(e) => setBookingData({ ...bookingData, phone: e.target.value })}
                        placeholder="Your phone number"
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60 text-sm"
                      />
                    </div>

                    <div className="flex gap-3 pt-3">
                      <Button
                        type="button"
                        onClick={() => setShowBookingForm(null)}
                        className="flex-1 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black"
                      >
                        Cancel
                      </Button>
                      <Button
                        type="submit"
                        className="flex-1 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black"
                      >
                        Book Now
                      </Button>
                    </div>
                  </form>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showConfirmation && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#2A2A2A] rounded-2xl border-2 border-green-500/30 w-full max-w-sm text-center p-8"
              >
                <motion.div
                  animate={{ scale: [1, 1.1, 1] }}
                  transition={{ duration: 1, repeat: 2 }}
                  className="text-6xl mb-4"
                >
                  ✓
                </motion.div>
                <h2 className="text-2xl text-white mb-2">Appointment Confirmed!</h2>
                <p className="text-[#D0D0D0] mb-6">
                  Your appointment has been successfully booked. You will receive a confirmation via SMS and email
                  shortly.
                </p>
                <Button
                  onClick={() => setShowConfirmation(false)}
                  className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-emerald-500 hover:to-green-500 text-white"
                >
                  Done
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEmergencyPopup === "call" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#2A2A2A] rounded-2xl border-2 border-red-500/30 w-full max-w-sm text-center p-8"
              >
                <div className="text-6xl mb-4">🚑</div>
                <h2 className="text-2xl text-white mb-4">Emergency Hotline</h2>
                <div className="bg-[#1A1A1A] rounded-lg p-4 mb-6 border border-[#E1AD01]/20">
                  <p className="text-sm text-[#D0D0D0] mb-2">Call Now:</p>
                  <p className="text-2xl text-[#E1AD01] font-bold">+92 300 EMERGENCY (3736247)</p>
                </div>
                <p className="text-[#D0D0D0] mb-6 text-sm">
                  Our team is ready to help 24/7. Have your pet information ready when you call.
                </p>
                <Button
                  onClick={() => setShowEmergencyPopup(null)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white"
                >
                  Close
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showEmergencyPopup === "tips" && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#2A2A2A] rounded-2xl border-2 border-[#E1AD01]/30 w-full max-w-md max-h-96 overflow-y-auto"
              >
                <div className="p-6">
                  <div className="flex items-center justify-between mb-4">
                    <h2 className="text-xl text-white">Emergency Tips</h2>
                    <button
                      onClick={() => setShowEmergencyPopup(null)}
                      className="p-2 hover:bg-[#E1AD01]/10 rounded-lg transition-all"
                    >
                      <X className="w-5 h-5 text-[#E1AD01]" />
                    </button>
                  </div>
                  <div className="space-y-4 text-sm">
                    <div>
                      <h3 className="text-[#E1AD01] font-semibold mb-2">If Your Pet Is Choking:</h3>
                      <p className="text-[#D0D0D0]">
                        Clear the airway, keep them calm, and seek immediate veterinary help
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[#E1AD01] font-semibold mb-2">Severe Bleeding:</h3>
                      <p className="text-[#D0D0D0]">Apply pressure with clean cloth and get to the vet immediately</p>
                    </div>
                    <div>
                      <h3 className="text-[#E1AD01] font-semibold mb-2">Poisoning:</h3>
                      <p className="text-[#D0D0D0]">
                        Call poison control immediately with the suspected toxin information
                      </p>
                    </div>
                    <div>
                      <h3 className="text-[#E1AD01] font-semibold mb-2">Trauma/Accidents:</h3>
                      <p className="text-[#D0D0D0]">Keep pet calm and immobilized, rush to nearest emergency clinic</p>
                    </div>
                    <div>
                      <h3 className="text-[#E1AD01] font-semibold mb-2">Difficulty Breathing:</h3>
                      <p className="text-[#D0D0D0]">This is life-threatening - seek emergency care immediately</p>
                    </div>
                  </div>
                  <Button
                    onClick={() => setShowEmergencyPopup(null)}
                    className="w-full mt-6 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black"
                  >
                    Got It
                  </Button>
                </div>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>

        <AnimatePresence>
          {showGuestMessage && (
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              className="fixed inset-0 bg-black/80 flex items-center justify-center z-50 p-4"
            >
              <motion.div
                initial={{ scale: 0.9, opacity: 0 }}
                animate={{ scale: 1, opacity: 1 }}
                exit={{ scale: 0.9, opacity: 0 }}
                className="bg-[#2A2A2A] rounded-2xl border-2 border-red-500/30 w-full max-w-sm text-center p-8"
              >
                <div className="text-6xl mb-4">🔒</div>
                <h2 className="text-2xl text-white mb-4">Login Required</h2>
                <p className="text-[#D0D0D0] mb-6 text-sm">Please log in to book an appointment for your pet.</p>
                <Button
                  onClick={() => setShowGuestMessage(false)}
                  className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-pink-500 hover:to-red-500 text-white"
                >
                  Login
                </Button>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}
