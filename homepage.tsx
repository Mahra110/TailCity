"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { PetPurchaseForm } from "./PetPurchaseForm"
import { ShoppingCartForm } from "./ShoppingCartForm"
import { ArrowRight, ShoppingCart, Star, Shield, Users, Award, Heart } from "lucide-react"
import { useAppContext } from "../contexts/AppContext"
import { Navigation } from "./navigation"
import { Footer } from "./footer"

interface HomepageProps {
  setCurrentPage: (page: string) => void
  setShowLoginDialog?: (show: boolean) => void
}

export function Homepage({ setCurrentPage }: HomepageProps) {
  const router = window.location.href
  const { addToCart } = useAppContext()
  const [showPurchaseForm, setShowPurchaseForm] = useState(false)
  const [selectedPet, setSelectedPet] = useState<any>(null)
  const [showCartModal, setShowCartModal] = useState(false)

  const featuredPets = [
    {
      id: 1,
      name: "Buddy",
      breed: "Golden Retriever",
      price: "Rs 45,000",
      age: "3 months",
      image: "https://i.pinimg.com/736x/82/7e/30/827e308ef504b7ec75c9ccb499852438.jpg",
    },
    {
      id: 2,
      name: "Luna",
      breed: "Persian Cat",
      price: "Rs 35,000",
      age: "2 months",
      image: "https://i.pinimg.com/1200x/61/f0/7c/61f07c1fd70d98a7b3f81d01e1f68f40.jpg",
    },
    {
      id: 3,
      name: "Charlie",
      breed: "Beagle Puppy",
      price: "Rs 38,000",
      age: "4 months",
      image: "https://i.pinimg.com/736x/67/a7/a9/67a7a915feffd48f44ff9e9cb5544ea3.jpg",
    },
    {
      id: 4,
      name: "Bella",
      breed: "Siamese Cat",
      price: "Rs 32,000",
      age: "2 months",
      image: "https://i.pinimg.com/736x/90/6e/f2/906ef2856570fbd4735aedae949fa6c1.jpg",
    },
  ]

  const accessories = [
    {
      id: 1,
      name: "Premium Dog Food",
      price: "Rs 4,500",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600",
      emoji: "🍖",
      badge: "Best Seller",
      color: "#FFB6D9",
    },
    {
      id: 2,
      name: "Cozy Pet Bed",
      price: "Rs 3,800",
      image: "https://images.unsplash.com/photo-1625122430745-339dc0fadd0d?w=600",
      emoji: "🛏️",
      badge: "New",
      color: "#C4B5FD",
    },
    {
      id: 3,
      name: "Interactive Toys",
      price: "Rs 2,200",
      image: "https://images.unsplash.com/photo-1591769295440-811ad766ab3?w=600",
      emoji: "🎾",
      badge: "Popular",
      color: "#98D8C8",
    },
    {
      id: 4,
      name: "Travel Carrier",
      price: "Rs 5,500",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600",
      emoji: "🎒",
      badge: "Featured",
      color: "#FFD7BE",
    },
  ]

  const features = [
    {
      icon: Shield,
      title: "100% Safe & Verified",
      description: "All pets are health-checked by experts",
      color: "#98D8C8",
    },
    {
      icon: Users,
      title: "Premium Care",
      description: "Top-quality products for your pets",
      color: "#FFB6D9",
    },
    {
      icon: Users,
      title: "10K+ Happy Families",
      description: "Join Pakistan's pet community",
      color: "#C4B5FD",
    },
    {
      icon: Award,
      title: "Best Service 2024",
      description: "Award-winning pet platform",
      color: "#E1AD01",
    },
  ]

  const stats = [
    {
      value: "10,000+",
      label: "Happy Pets",
      color: "#E1AD01",
    },
    {
      value: "500+",
      label: "Expert Vets",
      color: "#FFB6D9",
    },
    {
      value: "4.9/5",
      label: "Rating",
      color: "#98D8C8",
    },
    {
      value: "98%",
      label: "Satisfaction",
      color: "#C4B5FD",
    },
  ]

  const playingPets = [
    {
      image: "https://i.pinimg.com/1200x/82/68/51/826851244471ea289059cff569cfd77b.jpg",
    },
    {
      image: "https://i.pinimg.com/1200x/e1/58/58/e1585890b8ff7845a1a9c01bb241ad1d.jpg",
    },
    {
      image: "https://i.pinimg.com/1200x/f0/23/6c/f0236cda6f72cc556f754fcc1c87701e.jpg",
    },
    {
      image: "https://i.pinimg.com/1200x/88/56/e2/8856e2e69b5aeeca654141c67852367c.jpg",
    },
  ]

  const featuredVets = [
    {
      id: 1,
      name: "Dr. Sarah Johnson",
      specialization: "General Practice",
      experience: "12 years",
      rating: 5,
      image: "https://images.unsplash.com/photo-1553688738-a278b9f063e0?w=400",
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
      location: "Lahore, DHA",
      patients: "2500+",
    },
    {
      id: 3,
      name: "Dr. Emily Davis",
      specialization: "Exotic Animals",
      experience: "10 years",
      rating: 5,
      image: "https://images.unsplash.com/photo-1559839734-2b71ea197ec2?w=400",
      location: "Islamabad, F-7",
      patients: "1500+",
    },
    {
      id: 4,
      name: "Dr. James Wilson",
      specialization: "Dentistry",
      experience: "8 years",
      rating: 5,
      image: "https://images.unsplash.com/photo-1622253692010-f3b2795255f1?w=400",
      location: "Karachi, Clifton",
      patients: "1200+",
    },
  ]

  const communityTestimonials = [
    {
      name: "Sarah Martinez",
      pet: "Golden Retriever - Buddy",
      avatar: "👩‍🦰",
      rating: 5,
      review:
        "Found the perfect companion through TailCity. The adoption process was smooth, caring, and professional!",
    },
    {
      name: "John Davidson",
      pet: "Persian Cat - Luna",
      avatar: "👨‍💼",
      rating: 5,
      review: "Excellent veterinary services! Dr. Chen took great care of Luna during her surgery.",
    },
    {
      name: "Emily Chen",
      pet: "Beagle - Charlie",
      avatar: "👩‍🔬",
      rating: 5,
      review: "The grooming services are top-notch. Charlie always comes home looking amazing!",
    },
    {
      name: "Michael Brown",
      pet: "Siamese Cat - Bella",
      avatar: "👨‍🏫",
      rating: 5,
      review: "TailCity made adopting Bella so easy. The team genuinely cared about finding the right match!",
    },
  ]

  return (
    <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden text-white">
      {/* Navigation component at the top */}
      <Navigation />

      {/* Vibrant Animated Background Blobs with Dark Theme */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden">
        <motion.div
          animate={{
            scale: [1, 1.2, 1],
            x: [0, 40, 0],
            y: [0, -30, 0],
            rotate: [0, 90, 0],
          }}
          transition={{ duration: 20, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute -top-0 -right-40 w-[500px] h-[500px] rounded-full opacity-20"
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
        <motion.div
          animate={{
            scale: [1, 1.15, 1],
            x: [0, 25, 0],
            rotate: [0, 60, 0],
          }}
          transition={{ duration: 22, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 4 }}
          className="absolute top-1/2 right-1/4 w-[400px] h-[400px] rounded-full opacity-18"
          style={{
            background: "radial-gradient(circle, #C4B5FD 0%, #E6E6FA 100%)",
            filter: "blur(65px)",
          }}
        />
      </div>

      {/* Hero Section */}
      <section className="min-h-screen relative flex items-center justify-center px-4 sm:px-6 lg:px-8 overflow-hidden">
        {/* Animated Floating Emojis */}
        <motion.div
          animate={{
            y: [0, -25, 0],
            rotate: [0, 10, 0],
          }}
          transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
          className="absolute top-20 right-10 text-6xl opacity-15 pointer-events-none"
        >
          🐾
        </motion.div>
        <motion.div
          animate={{
            y: [0, -20, 0],
            rotate: [0, -10, 0],
          }}
          transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 1 }}
          className="absolute bottom-20 left-10 text-5xl opacity-12 pointer-events-none"
        >
          ❤️
        </motion.div>
        <motion.div
          animate={{
            y: [0, -15, 0],
            scale: [1, 1.2, 1],
          }}
          transition={{ duration: 3, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut", delay: 2 }}
          className="absolute top-1/2 left-1/4 text-4xl opacity-10 pointer-events-none"
        >
          ✨
        </motion.div>

        <div className="max-w-7xl mx-auto w-full relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Content */}
            <motion.div initial={{ opacity: 0, x: -30 }} animate={{ opacity: 1, x: 0 }} transition={{ duration: 0.8 }}>
              {/* Animated Badge */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.2 }}
                whileHover={{ scale: 1.05 }}
                className="inline-flex items-center gap-2 px-5 py-2 rounded-full mb-6 shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                  border: "3px solid rgba(255,255,255,0.1)",
                }}
              >
                <motion.div
                  animate={{ rotate: [0, 10, -10, 0] }}
                  transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                >
                  <Star className="w-4 h-4 text-white" />
                </motion.div>
                <span className="text-white text-sm" style={{ fontWeight: 600 }}>
                  Pakistan's #1 Pet Platform
                </span>
                <motion.span
                  animate={{ scale: [1, 1.2, 1] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="text-lg"
                >
                  🎉
                </motion.span>
              </motion.div>

              {/* Heading with Animated Words */}
              <motion.h1
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.3 }}
                className="mb-5 leading-tight"
                style={{
                  fontSize: "clamp(2.5rem, 6vw, 3.5rem)",
                  color: "#FFFFFF",
                  fontWeight: 800,
                  fontFamily: "Poppins, sans-serif",
                  letterSpacing: "-0.02em",
                }}
              >
                Find Your
                <br />
                <motion.span
                  style={{
                    background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 50%, #FFA07A 100%)",
                    WebkitBackgroundClip: "text",
                    WebkitTextFillColor: "transparent",
                    backgroundClip: "text",
                    fontWeight: 800,
                  }}
                  animate={{
                    backgroundPosition: ["0% 50%", "100% 50%", "0% 50%"],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY }}
                >
                  Perfect Friend
                </motion.span>
                <br />
                <span style={{ color: "#F5F5F5" }}>Today!</span>
              </motion.h1>

              <motion.p
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.4 }}
                className="mb-8 leading-relaxed"
                style={{ fontSize: "1.1rem", color: "#D0D0D0", fontWeight: 500 }}
              >
                Discover adorable companions, premium pet care, and join Pakistan's most trusted pet-loving community!
              </motion.p>

              <div className="flex flex-col sm:flex-row gap-3">
                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    className="rounded-full shadow-xl border-3 text-white px-8 py-6 group overflow-hidden relative"
                    style={{
                      background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                      border: "2px solid rgba(255,255,255,0.1)",
                    }}
                    onClick={() => (window.location.href = "/marketplace")}
                  >
                    <motion.div
                      className="absolute inset-0 bg-white"
                      initial={{ x: "-100%" }}
                      whileHover={{ x: "100%" }}
                      transition={{ duration: 0.5 }}
                      style={{ opacity: 0.2 }}
                    />
                    <Star className="w-5 h-5 mr-2 relative z-10" />
                    <span className="relative z-10">Buy a New Friend Today</span>
                  </Button>
                </motion.div>

                <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                  <Button
                    size="lg"
                    variant="outline"
                    className="rounded-full px-8 py-6 border-2 hover:bg-amber-900/20 transition-colors bg-transparent"
                    style={{
                      borderColor: "#E1AD01",
                      color: "#E1AD01",
                      background: "rgba(26, 26, 26, 0.5)",
                    }}
                    onClick={() => setCurrentPage("services")}
                  >
                    Explore Services
                    <motion.div
                      animate={{ x: [0, 5, 0] }}
                      transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                      className="inline-block ml-2"
                    >
                      <ArrowRight className="w-5 h-5" />
                    </motion.div>
                  </Button>
                </motion.div>
              </div>

              {/* Animated Mini Stats */}
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ delay: 0.6 }}
                className="flex flex-wrap gap-6 mt-8"
              >
                {[
                  { value: "10K+", label: "Happy Pets" },
                  { value: "4.9", label: "Rating" },
                  { value: "98%", label: "Satisfaction" },
                ].map((stat, idx) => (
                  <motion.div key={idx} whileHover={{ scale: 1.05, y: -3 }} className="flex items-center gap-2">
                    <div>
                      <div className="text-xl" style={{ color: "#E1AD01", fontWeight: 700 }}>
                        {stat.value}
                      </div>
                      <div className="text-xs" style={{ color: "#808080" }}>
                        {stat.label}
                      </div>
                    </div>
                  </motion.div>
                ))}
              </motion.div>
            </motion.div>

            {/* Right Side - Animated Pets Grid */}
            <motion.div
              initial={{ opacity: 0, x: 30 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ duration: 0.8, delay: 0.2 }}
              className="relative -mt-8"
            >
              <div className="grid grid-cols-2 gap-2 relative">
                {playingPets.map((pet, index) => (
                  <motion.div
                    key={index}
                    initial={{ opacity: 0, scale: 0.8 }}
                    animate={{ opacity: 1, scale: 1 }}
                    transition={{ delay: 0.3 + index * 0.1, duration: 0.5 }}
                    whileHover={{
                      scale: 1.08,
                      rotate: index % 2 === 0 ? 3 : -3,
                      zIndex: 10,
                    }}
                    className="relative rounded-3xl overflow-hidden shadow-2xl border-3 group cursor-pointer"
                    style={{
                      borderColor: "#E1AD01",
                      borderWidth: "3px",
                    }}
                  >
                    <motion.div
                      animate={{
                        y: [0, -8, 0],
                      }}
                      transition={{
                        duration: 3 + index * 0.5,
                        repeat: Number.POSITIVE_INFINITY,
                        delay: index * 0.3,
                        ease: "easeInOut",
                      }}
                      className="h-56 relative"
                    >
                      <ImageWithFallback
                        src={pet.image || "/placeholder.svg"}
                        alt={`Cute pet ${index + 1}`}
                        className="w-full h-full object-cover transition-transform duration-500 group-hover:scale-110"
                      />

                      <div className="absolute inset-0 bg-gradient-to-t from-[#E1AD01]/60 via-transparent to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
                    </motion.div>
                  </motion.div>
                ))}

                {/* Glowing orbs around the grid */}
                <motion.div
                  className="absolute -top-10 -left-10 w-24 h-24 rounded-full blur-3xl"
                  style={{ background: "rgba(225, 173, 1, 0.3)" }}
                  animate={{
                    scale: [1, 1.3, 1],
                    opacity: [0.5, 0.8, 0.5],
                  }}
                  transition={{ duration: 4, repeat: Number.POSITIVE_INFINITY }}
                />
                <motion.div
                  className="absolute -bottom-10 -right-10 w-32 h-32 rounded-full blur-3xl"
                  style={{ background: "rgba(225, 173, 1, 0.4)" }}
                  animate={{
                    scale: [1, 1.2, 1],
                    opacity: [0.4, 0.7, 0.4],
                  }}
                  transition={{ duration: 5, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
                />
              </div>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Features Section - Dark */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <h2
              className="mb-3"
              style={{ fontSize: "2.5rem", color: "#FFFFFF", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
            >
              Why Choose TailCity?
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#D0D0D0", fontSize: "1.1rem", fontWeight: 500 }}>
              Pakistan's most trusted platform for pet care
            </p>
          </motion.div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {features.map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -8, scale: 1.03 }}
              >
                <Card
                  className="rounded-2xl border-0 shadow-xl hover:shadow-2xl transition-all overflow-hidden relative group h-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(45, 45, 45, 0.9) 0%, rgba(26, 26, 26, 0.9) 100%)",
                    border: "1px solid rgba(225, 173, 1, 0.2)",
                  }}
                >
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-100 transition-opacity duration-300"
                    style={{
                      background: "#E1AD01",
                    }}
                  />

                  <CardContent className="p-6 text-center relative z-10">
                    <motion.div
                      whileHover={{ rotate: 360, scale: 1.2 }}
                      transition={{ duration: 0.6 }}
                      className="w-16 h-16 rounded-2xl mx-auto mb-4 flex items-center justify-center shadow-lg group-hover:shadow-xl transition-shadow"
                      style={{
                        background: "#E1AD01",
                      }}
                    >
                      <feature.icon className="w-8 h-8 text-white" />
                    </motion.div>
                    <h3
                      className="mb-2 group-hover:text-white transition-colors"
                      style={{ color: "#FFFFFF", fontWeight: 600, fontSize: "1.1rem" }}
                    >
                      {feature.title}
                    </h3>
                    <p
                      className="text-sm leading-relaxed group-hover:text-white/90 transition-colors"
                      style={{ color: "#B0B0B0", fontWeight: 500 }}
                    >
                      {feature.description}
                    </p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section - Dark */}
      <section className="py-12">
        <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, scale: 0.95 }}
            whileInView={{ opacity: 1, scale: 1 }}
            viewport={{ once: true }}
            className="rounded-3xl shadow-2xl p-8 overflow-hidden relative"
            style={{
              background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)",
              border: "4px solid #E1AD01",
            }}
          >
            {/* Animated Background Pattern */}
            <div className="absolute inset-0 opacity-5">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="w-full h-full"
                style={{
                  backgroundImage: "radial-gradient(circle, #E1AD01 1px, transparent 1px)",
                  backgroundSize: "30px 30px",
                }}
              />
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 relative z-10">
              {stats.map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 10 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  whileHover={{ scale: 1.1, y: -5 }}
                  className="text-center"
                >
                  <div
                    className="text-3xl mb-1"
                    style={{ color: stat.color, fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
                  >
                    {stat.value}
                  </div>
                  <div className="text-sm" style={{ color: "#B0B0B0", fontWeight: 500 }}>
                    {stat.label}
                  </div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Featured Pets Section - Dark */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #FFB6D9 0%, #FFA07A 100%)",
                border: "3px solid rgba(255,255,255,0.1)",
              }}
            >
              <Star className="w-5 h-5 text-white" />
              <span className="text-white" style={{ fontWeight: 600 }}>
                Adorable Companions
              </span>
            </motion.div>

            <h2
              className="mb-4"
              style={{ fontSize: "2.5rem", color: "#FFFFFF", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
            >
              Meet Your New
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 50%, #FFA07A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Best Friend
              </span>
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#D0D0D0", fontSize: "1.1rem", fontWeight: 500 }}>
              Verified, healthy, and waiting for their forever home!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredPets.map((pet, idx) => (
              <motion.div
                key={pet.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 60px rgba(225, 173, 1, 0.4)",
                }}
              >
                <Card
                  className="rounded-2xl overflow-hidden border-0 shadow-xl transition-all group relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)",
                    border: "1px solid rgba(225, 173, 1, 0.2)",
                  }}
                >
                  <div className="relative h-48 overflow-hidden">
                    <ImageWithFallback
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Age Tag */}
                    <div className="absolute bottom-3 right-3">
                      <div
                        className="px-3 py-1 rounded-full text-xs backdrop-blur-md shadow-lg"
                        style={{
                          background: "rgba(225, 173, 1, 0.9)",
                          color: "white",
                          fontWeight: 600,
                        }}
                      >
                        {pet.age}
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-4" style={{ background: "rgba(26, 26, 26, 0.5)" }}>
                    <h3
                      className="mb-1"
                      style={{
                        fontSize: "1.25rem",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {pet.name}
                    </h3>
                    <p className="text-sm mb-3" style={{ color: "#B0B0B0", fontWeight: 500 }}>
                      {pet.breed}
                    </p>

                    <div className="flex items-center justify-between mb-3">
                      <span className="text-2xl" style={{ color: "#E1AD01", fontWeight: 700 }}>
                        {pet.price}
                      </span>
                      <div className="flex items-center gap-1">
                        {[...Array(5)].map((_, i) => (
                          <Star key={i} className="w-3 h-3 fill-current text-amber-400" />
                        ))}
                      </div>
                    </div>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="w-full rounded-xl py-5 text-black shadow-lg hover:shadow-xl transition-all"
                        style={{
                          background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                          fontWeight: 600,
                        }}
                        onClick={() => {
                          setSelectedPet(pet)
                          setShowPurchaseForm(true)
                        }}
                      >
                        Buy Now
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full px-10 py-6 shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                  color: "black",
                  fontWeight: 600,
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
                onClick={() => (window.location.href = "/marketplace")}
              >
                View All Adorable Pets
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block ml-2"
                >
                  <ArrowRight className="w-5 h-5" />
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Shop Section - Dark & Colorful */}
      <section className="py-16">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #C4B5FD 0%, #E6E6FA 100%)",
                border: "3px solid rgba(255,255,255,0.1)",
              }}
            >
              <ShoppingCart className="w-5 h-5 text-white" />
              <span className="text-white" style={{ fontWeight: 600 }}>
                Premium Products
              </span>
            </motion.div>

            <h2
              className="mb-4"
              style={{ fontSize: "2.5rem", color: "#FFFFFF", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
            >
              Everything Your
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 50%, #FFA07A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Pet Needs
              </span>
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#D0D0D0", fontSize: "1.1rem", fontWeight: 500 }}>
              Top-quality food, toys, and accessories!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {accessories.map((item, idx) => (
              <motion.div
                key={item.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card
                  className="rounded-2xl overflow-hidden border-0 shadow-xl hover:shadow-2xl transition-all group relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)",
                    border: "1px solid rgba(225, 173, 1, 0.2)",
                  }}
                >
                  {/* Colorful Gradient Overlay on Hover */}
                  <motion.div
                    className="absolute inset-0 opacity-0 group-hover:opacity-20 transition-opacity pointer-events-none z-10"
                    style={{
                      background: `linear-gradient(135deg, ${item.color} 0%, #E1AD01 100%)`,
                    }}
                  />

                  <div className="relative h-56 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <ImageWithFallback
                      src={item.image || "/placeholder.svg"}
                      alt={item.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Animated Badge */}
                    <div className="absolute top-3 left-3">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="px-3 py-1 rounded-full text-xs shadow-lg"
                        style={{
                          background: `linear-gradient(135deg, ${item.color} 0%, #E1AD01 100%)`,
                          color: "white",
                          fontWeight: 600,
                        }}
                      >
                        {item.badge}
                      </motion.div>
                    </div>

                    {/* Animated Emoji */}
                    <motion.span
                      className="absolute bottom-3 right-3 text-4xl drop-shadow-lg"
                      animate={{
                        rotate: [0, 10, -10, 0],
                        scale: [1, 1.15, 1],
                      }}
                      transition={{ duration: 2.5, repeat: Number.POSITIVE_INFINITY }}
                    >
                      {item.emoji}
                    </motion.span>
                  </div>

                  <CardContent className="p-5" style={{ background: "rgba(26, 26, 26, 0.5)" }}>
                    <h3
                      className="mb-2 line-clamp-2"
                      style={{ fontSize: "1rem", color: "#FFFFFF", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
                    >
                      {item.name}
                    </h3>
                    <p
                      className="text-2xl mb-3"
                      style={{ color: "#E1AD01", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
                    >
                      {item.price}
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="w-full rounded-xl py-5 text-white shadow-lg hover:shadow-xl transition-all"
                        style={{
                          background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                        }}
                        onClick={() => {
                          addToCart({
                            id: item.id,
                            name: item.name,
                            price: item.price,
                            image: item.image,
                            quantity: 1,
                            category: "Accessories",
                          })
                          setShowCartModal(true)
                        }}
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full px-10 py-6 shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                  color: "white",
                  border: "2px solid rgba(255,255,255,0.1)",
                }}
                onClick={() => (window.location.href = "/shop")}
              >
                <ShoppingCart className="w-5 h-5 mr-2" />
                Shop All Products
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Community Testimonials Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: 5 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                border: "3px solid rgba(255,255,255,0.1)",
              }}
            >
              <Heart className="w-5 h-5 text-white fill-white" />
              <span className="text-white" style={{ fontWeight: 600 }}>
                Community Love
              </span>
            </motion.div>

            <h2
              className="mb-4"
              style={{ fontSize: "2.5rem", color: "#FFFFFF", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
            >
              What Pet Parents
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 50%, #FFA500 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Are Saying
              </span>
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#D0D0D0", fontSize: "1.1rem", fontWeight: 500 }}>
              Real stories from our amazing pet-loving community!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {communityTestimonials.map((testimonial, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{ y: -10, scale: 1.02 }}
              >
                <Card
                  className="rounded-2xl overflow-hidden border-0 shadow-xl transition-all h-full"
                  style={{
                    background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)",
                    border: "1px solid rgba(225, 173, 1, 0.3)",
                  }}
                >
                  <CardContent className="p-6">
                    <div className="flex items-center mb-4">
                      <div
                        className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mr-4"
                        style={{
                          background: "linear-gradient(135deg, rgba(225, 173, 1, 0.2), rgba(255, 215, 0, 0.2))",
                          border: "2px solid rgba(225, 173, 1, 0.4)",
                        }}
                      >
                        {testimonial.avatar}
                      </div>
                      <div className="flex-1">
                        <h3 className="text-white font-semibold">{testimonial.name}</h3>
                        <p className="text-sm text-[#D0D0D0]">{testimonial.pet}</p>
                      </div>
                    </div>
                    <div className="flex mb-3">
                      {[...Array(testimonial.rating)].map((_, i) => (
                        <Heart key={i} className="w-4 h-4 fill-[#E1AD01] text-[#E1AD01]" />
                      ))}
                    </div>
                    <p className="text-[#D0D0D0] italic leading-relaxed text-sm">"{testimonial.review}"</p>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full px-10 py-6 shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                  color: "#000000",
                  border: "2px solid rgba(255,255,255,0.1)",
                  fontWeight: 600,
                }}
                onClick={() => (window.location.href = "/community")}
              >
                Join Our Community
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block ml-2"
                >
                  →
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Featured Vets Section */}
      <section className="py-20 relative overflow-hidden">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="text-center mb-12"
          >
            <motion.div
              whileHover={{ scale: 1.05, rotate: -5 }}
              className="inline-flex items-center gap-3 px-6 py-3 rounded-full mb-6 shadow-xl"
              style={{
                background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                border: "3px solid rgba(255,255,255,0.1)",
              }}
            >
              <Star className="w-5 h-5 text-white" />
              <span className="text-white" style={{ fontWeight: 600 }}>
                Expert Care
              </span>
            </motion.div>

            <h2
              className="mb-4"
              style={{ fontSize: "2.5rem", color: "#FFFFFF", fontWeight: 700, fontFamily: "Poppins, sans-serif" }}
            >
              Meet Our
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 50%, #FFA500 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Certified Vets
              </span>
            </h2>
            <p className="max-w-2xl mx-auto" style={{ color: "#D0D0D0", fontSize: "1.1rem", fontWeight: 500 }}>
              Professional, caring veterinarians dedicated to your pet's health!
            </p>
          </motion.div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6 mb-10">
            {featuredVets.map((vet, idx) => (
              <motion.div
                key={vet.id}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                whileHover={{
                  y: -10,
                  scale: 1.02,
                  boxShadow: "0 20px 60px rgba(225, 173, 1, 0.4)",
                }}
              >
                <Card
                  className="rounded-2xl overflow-hidden border-0 shadow-xl transition-all group relative"
                  style={{
                    background: "linear-gradient(135deg, rgba(45, 45, 45, 0.95) 0%, rgba(26, 26, 26, 0.95) 100%)",
                    border: "1px solid rgba(225, 173, 1, 0.3)",
                  }}
                >
                  <div className="relative h-64 overflow-hidden bg-gradient-to-br from-gray-800 to-gray-900">
                    <ImageWithFallback
                      src={vet.image || "/placeholder.svg"}
                      alt={vet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />

                    {/* Experience Badge */}
                    <div className="absolute top-3 left-3">
                      <motion.div
                        animate={{ scale: [1, 1.08, 1] }}
                        transition={{ duration: 2, repeat: Number.POSITIVE_INFINITY }}
                        className="px-3 py-1 rounded-full text-xs shadow-lg"
                        style={{
                          background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                          color: "white",
                          fontWeight: 600,
                        }}
                      >
                        ✓ Verified
                      </motion.div>
                    </div>

                    {/* Rating */}
                    <div className="absolute bottom-3 right-3">
                      <div
                        className="px-3 py-1 rounded-full text-xs backdrop-blur-md shadow-lg flex items-center gap-1"
                        style={{
                          background: "rgba(225, 173, 1, 0.9)",
                          color: "white",
                          fontWeight: 600,
                        }}
                      >
                        <Star className="w-3 h-3 fill-current" />
                        {vet.rating}.0
                      </div>
                    </div>
                  </div>

                  <CardContent className="p-5" style={{ background: "rgba(26, 26, 26, 0.5)" }}>
                    <h3
                      className="mb-1"
                      style={{
                        fontSize: "1.25rem",
                        color: "#FFFFFF",
                        fontWeight: 700,
                        fontFamily: "Poppins, sans-serif",
                      }}
                    >
                      {vet.name}
                    </h3>
                    <p className="text-sm mb-1" style={{ color: "#E1AD01", fontWeight: 600 }}>
                      {vet.specialization}
                    </p>
                    <p className="text-xs mb-3" style={{ color: "#B0B0B0" }}>
                      {vet.experience} • {vet.patients} patients
                    </p>
                    <p className="text-xs mb-4" style={{ color: "#D0D0D0" }}>
                      📍 {vet.location}
                    </p>

                    <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                      <Button
                        className="w-full rounded-xl py-5 shadow-lg hover:shadow-xl transition-all"
                        style={{
                          background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                          color: "#000000",
                          fontWeight: 600,
                        }}
                        onClick={() => (window.location.href = "/vets")}
                      >
                        Book Appointment
                      </Button>
                    </motion.div>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </div>

          <div className="text-center">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
              <Button
                size="lg"
                className="rounded-full px-10 py-6 shadow-xl"
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                  color: "#000000",
                  border: "2px solid rgba(255,255,255,0.1)",
                  fontWeight: 600,
                }}
                onClick={() => (window.location.href = "/vets")}
              >
                View All Veterinarians
                <motion.div
                  animate={{ x: [0, 5, 0] }}
                  transition={{ duration: 1.5, repeat: Number.POSITIVE_INFINITY }}
                  className="inline-block ml-2"
                >
                  →
                </motion.div>
              </Button>
            </motion.div>
          </div>
        </div>
      </section>

      {/* Call to Action - Join Community */}
      <section
        className="py-28 relative overflow-hidden"
        style={{
          background: "linear-gradient(135deg, rgba(26, 26, 26, 0.98) 0%, rgba(45, 45, 45, 0.98) 100%)",
        }}
      >
        <div className="absolute inset-0 opacity-10">
          <div className="absolute top-0 left-0 w-full h-full bg-gradient-to-br from-[#E1AD01] via-transparent to-[#FFD700]" />
        </div>

        <div className="container mx-auto px-6 relative z-10 text-center">
          <motion.div
            initial={{ opacity: 0, y: 30 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            transition={{ duration: 0.6 }}
          >
            <h2
              className="text-5xl md:text-6xl mb-6"
              style={{
                fontWeight: 800,
                color: "white",
                textShadow: "0px 4px 20px rgba(225, 173, 1, 0.4)",
              }}
            >
              Join Pakistan's Largest
              <br />
              <span
                style={{
                  background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 50%, #FFA07A 100%)",
                  WebkitBackgroundClip: "text",
                  WebkitTextFillColor: "transparent",
                }}
              >
                Pet Community
              </span>
            </h2>

            <p
              className="mb-10 max-w-2xl mx-auto leading-relaxed"
              style={{ color: "#D0D0D0", fontSize: "1.1rem", fontWeight: 500 }}
            >
              Connect with thousands of pet lovers, find verified companions, and expert care!
            </p>

            <div className="flex flex-col sm:flex-row gap-4 justify-center mb-12">
              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  className="rounded-full px-12 py-7 shadow-2xl"
                  style={{
                    background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                    color: "white",
                    border: "2px solid rgba(255,255,255,0.1)",
                  }}
                  onClick={() => window.scrollTo({ top: 0, behavior: "smooth" })}
                >
                  Get Started Today
                </Button>
              </motion.div>

              <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                <Button
                  size="lg"
                  variant="outline"
                  className="rounded-full px-12 py-7 border-3 hover:bg-amber-900/20 transition-colors bg-transparent"
                  style={{
                    borderColor: "#E1AD01",
                    color: "#E1AD01",
                    background: "rgba(26, 26, 26, 0.5)",
                  }}
                  onClick={() => setCurrentPage("about")}
                >
                  Learn More
                  <ArrowRight className="w-5 h-5 ml-2" />
                </Button>
              </motion.div>
            </div>

            {/* Stats */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-8 max-w-4xl mx-auto">
              {[
                { number: "50,000+", label: "Happy Pet Parents" },
                { number: "10,000+", label: "Pets Adopted" },
                { number: "500+", label: "Verified Sellers" },
                { number: "24/7", label: "Customer Support" },
              ].map((stat, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div
                    className="text-4xl font-bold mb-2"
                    style={{
                      background: "linear-gradient(135deg, #E1AD01 0%, #FFD700 100%)",
                      WebkitBackgroundClip: "text",
                      WebkitTextFillColor: "transparent",
                    }}
                  >
                    {stat.number}
                  </div>
                  <div className="text-gray-400 text-sm">{stat.label}</div>
                </motion.div>
              ))}
            </div>
          </motion.div>
        </div>
      </section>

      {/* Pet Purchase Form */}
      {showPurchaseForm && selectedPet && (
        <PetPurchaseForm
          isOpen={showPurchaseForm}
          onClose={() => {
            setShowPurchaseForm(false)
            setSelectedPet(null)
          }}
          petName={selectedPet.name}
          petPrice={selectedPet.price}
          petBreed={selectedPet.breed}
        />
      )}

      {/* Shopping Cart Form */}
      {showCartModal && <ShoppingCartForm onClose={() => setShowCartModal(false)} />}

      <Footer />
    </div>
  )
}
