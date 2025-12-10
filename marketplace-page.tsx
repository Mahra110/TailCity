"use client"

import { useEffect, useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { PetPurchaseForm } from "./PetPurchaseForm"
import { Star, Search, Filter, Heart, Eye } from "lucide-react"
import { Input } from "./ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Navigation } from "./navigation"
import { Footer } from "./footer"

export function MarketplacePage() {
  const [selectedCategory, setSelectedCategory] = useState("all")
  const [searchQuery, setSearchQuery] = useState("")
  const [selectedPet, setSelectedPet] = useState<{
    name: string
    price: string
    breed: string
  } | null>(null)
  const [isGuest, setIsGuest] = useState(true)
  const router = useRouter()

  useEffect(() => {
    const loginStatus = localStorage.getItem("isLoggedIn")
    if (loginStatus === "true") {
      setIsGuest(false)
    } else {
      setIsGuest(true)
    }
  }, [])

  const [showGuestMessage, setShowGuestMessage] = useState(false)

  const categories = [
    { id: "all", label: "All Pets" },
    { id: "dogs", label: "Dogs" },
    { id: "cats", label: "Cats" },
    { id: "birds", label: "Birds" },
    { id: "rabbits", label: "Rabbits" },
    { id: "fish", label: "Fish" },
    { id: "turtles", label: "Turtles" },
    { id: "hamsters", label: "Hamsters" },
  ]

  const pets = [
    {
      id: 1,
      name: "Golden Retriever Puppy",
      category: "dogs",
      age: "3 months",
      gender: "Male",
      price: "Rs 45,000",
      rating: 4.9,
      reviews: 156,
      image: "https://i.pinimg.com/736x/31/bb/6d/31bb6d05430afc60e73c5d1a1323d158.jpg",
      location: "Karachi",
      breed: "Golden Retriever",
    },
    {
      id: 2,
      name: "Persian Cat",
      category: "cats",
      age: "6 months",
      gender: "Female",
      price: "Rs 35,000",
      rating: 4.8,
      reviews: 134,
      image: "https://i.pinimg.com/1200x/61/f0/7c/61f07c1fd70d98a7b3f81d01e1f68f40.jpg",
      location: "Lahore",
      breed: "Persian",
    },
    {
      id: 3,
      name: "Beagle Puppy",
      category: "dogs",
      age: "4 months",
      gender: "Male",
      price: "Rs 38,000",
      rating: 4.7,
      reviews: 98,
      image: "https://i.pinimg.com/736x/72/eb/a2/72eba27aa7d23faee392850af8107a86.jpg",
      location: "Islamabad",
      breed: "Beagle",
    },
    {
      id: 4,
      name: "Siamese Kitten",
      category: "cats",
      age: "2 months",
      gender: "Female",
      price: "Rs 28,000",
      rating: 4.9,
      reviews: 142,
      image: "https://i.pinimg.com/736x/90/6e/f2/906ef2856570fbd4735aedae949fa6c1.jpg",
      location: "Karachi",
      breed: "Siamese",
    },
    {
      id: 5,
      name: "German Shepherd",
      category: "dogs",
      age: "5 months",
      gender: "Male",
      price: "Rs 55,000",
      rating: 5.0,
      reviews: 203,
      image: "https://i.pinimg.com/736x/1c/5d/73/1c5d73605cbb1d7cf0d2a76e1d345330.jpg",
      location: "Rawalpindi",
      breed: "German Shepherd",
    },
    {
      id: 6,
      name: "British Shorthair",
      category: "cats",
      age: "4 months",
      gender: "Male",
      price: "Rs 42,000",
      rating: 4.8,
      reviews: 167,
      image: "https://i.pinimg.com/736x/9a/85/32/9a85328f087e5f5bbd1b5d9790570c81.jpg",
      location: "Lahore",
      breed: "British Shorthair",
    },
    {
      id: 7,
      name: "Labrador Puppy",
      category: "dogs",
      age: "3 months",
      gender: "Female",
      price: "Rs 40,000",
      rating: 4.9,
      reviews: 189,
      image: "https://i.pinimg.com/1200x/62/5d/b5/625db590aca340080b32443d29c55783.jpg",
      location: "Faisalabad",
      breed: "Labrador",
    },
    {
      id: 8,
      name: "Cockatiel",
      category: "birds",
      age: "8 months",
      gender: "Male",
      price: "Rs 12,000",
      rating: 4.6,
      reviews: 76,
      image: "https://i.pinimg.com/1200x/4a/91/fd/4a91fddd2204089262510847ddeb9721.jpg",
      location: "Karachi",
      breed: "Cockatiel",
    },
    {
      id: 9,
      name: "Holland Lop Rabbit",
      category: "rabbits",
      age: "6 months",
      gender: "Female",
      price: "Rs 8,500",
      rating: 4.7,
      reviews: 54,
      image: "https://i.pinimg.com/1200x/e2/20/7f/e2207fb38047dafd27b039bf05c73943.jpg",
      location: "Multan",
      breed: "Holland Lop",
    },
    {
      id: 10,
      name: "Goldfish Set",
      category: "fish",
      age: "3 months",
      gender: "Mixed",
      price: "Rs 3,500",
      rating: 4.5,
      reviews: 89,
      image: "https://i.pinimg.com/1200x/30/fb/4b/30fb4b7c6aed05a725b80566d0abff3c.jpg",
      location: "Lahore",
      breed: "Goldfish",
    },
    {
      id: 11,
      name: "Syrian Hamster",
      category: "hamsters",
      age: "2 months",
      gender: "Male",
      price: "Rs 2,800",
      rating: 4.6,
      reviews: 67,
      image: "https://i.pinimg.com/736x/cf/46/3b/cf463bea9d0134db46ce834eea958fbf.jpg",
      location: "Karachi",
      breed: "Syrian",
    },
    {
      id: 12,
      name: "Red-eared Slider",
      category: "turtles",
      age: "1 year",
      gender: "Female",
      price: "Rs 5,500",
      rating: 4.4,
      reviews: 43,
      image: "https://i.pinimg.com/1200x/4d/da/ac/4ddaac7ac870fb2f21d0f7e32eefc2f2.jpg",
      location: "Islamabad",
      breed: "Red-eared Slider",
    },
  ]

  const filteredPets = pets.filter((pet) => {
    const matchesCategory = selectedCategory === "all" || pet.category === selectedCategory
    const matchesSearch =
      pet.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      pet.category.toLowerCase().includes(searchQuery.toLowerCase())
    return matchesCategory && matchesSearch
  })

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants: any = {
    hidden: { y: 20, opacity: 0 },
    visible: {
      y: 0,
      opacity: 1,
      transition: {
        type: "spring",
        stiffness: 100,
      },
    },
  }

  const handleBuyNow = (pet: any) => {
    if (isGuest) {
      setShowGuestMessage(true)
      return
    }
    setSelectedPet(pet)
  }

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)" }}
    >
      <Navigation />

      {/* Animated Background Blobs */}
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

      {/* Hero Banner */}
      <motion.section
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        className="relative py-20 overflow-hidden border-b border-[#E1AD01]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
          <motion.div
            initial={{ scale: 0 }}
            animate={{ scale: 1, rotate: 360 }}
            transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
            className="inline-block mb-6"
          >
            <div className="w-20 h-20 rounded-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] flex items-center justify-center mx-auto shadow-2xl">
              <Heart className="w-10 h-10 text-black" />
            </div>
          </motion.div>
          <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
            Find Your Perfect Pet 🐾
          </h1>
          <p className="text-xl text-[#D0D0D0] max-w-3xl mx-auto">
            Browse through our verified pets and bring home a new family member today! ✨
          </p>
        </div>
      </motion.section>

      {/* Search and Filter Bar */}
      <div className="bg-[#1A1A1A]/80 backdrop-blur-sm border-b border-[#E1AD01]/20 sticky top-0 z-40">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-6">
          <div className="flex flex-col md:flex-row gap-4">
            {/* Search Bar */}
            <div className="flex-1 relative">
              <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 text-[#E1AD01] w-5 h-5" />
              <Input
                placeholder="Search for pets by name, breed, or type... 🔍"
                value={searchQuery}
                onChange={(e) => setSearchQuery(e.target.value)}
                className="pl-12 py-6 rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] bg-[#2A2A2A] text-white placeholder:text-[#D0D0D0]/60 hover:bg-[#2A2A2A]/80 transition-colors"
              />
            </div>

            {/* Category Filter Dropdown */}
            <DropdownMenu>
              <DropdownMenuTrigger asChild>
                <Button
                  variant="outline"
                  className="px-6 py-6 rounded-xl border-2 border-[#E1AD01]/30 hover:border-[#E1AD01] transition-all bg-[#2A2A2A] text-white min-w-[200px]"
                >
                  <Filter className="w-5 h-5 mr-2 text-[#E1AD01]" />
                  {categories.find((c) => c.id === selectedCategory)?.label}
                </Button>
              </DropdownMenuTrigger>
              <DropdownMenuContent align="end" className="w-56 bg-[#2A2A2A] border-[#E1AD01]/30">
                {categories.map((cat) => (
                  <DropdownMenuItem
                    key={cat.id}
                    onClick={() => setSelectedCategory(cat.id)}
                    className={
                      selectedCategory === cat.id
                        ? "bg-[#E1AD01]/20 text-[#E1AD01]"
                        : "text-white hover:bg-[#E1AD01]/10"
                    }
                  >
                    {cat.label}
                  </DropdownMenuItem>
                ))}
              </DropdownMenuContent>
            </DropdownMenu>
          </div>
        </div>
      </div>

      {/* Pets Grid */}
      <section className="relative py-12">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center mb-8">
            <h2 className="text-3xl text-white">
              {selectedCategory === "all"
                ? "All Pets 🐾"
                : `${categories.find((c) => c.id === selectedCategory)?.label} 🎯`}
            </h2>

            <p className="text-[#D0D0D0]">{filteredPets.length} pets available ✨</p>
          </div>

          <motion.div
            variants={containerVariants}
            initial="hidden"
            animate="visible"
            className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6"
          >
            {filteredPets.map((pet) => (
              <motion.div key={pet.id} variants={itemVariants}>
                <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-2 border-[#E1AD01]/20 hover:border-[#E1AD01] bg-[#2A2A2A]">
                  <div className="relative h-64 bg-[#1A1A1A] overflow-hidden">
                    <ImageWithFallback
                      src={pet.image || "/placeholder.svg"}
                      alt={pet.name}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                    />
                    {/* Quick Action Buttons */}
                    <div className="absolute top-3 right-3 flex flex-col gap-2 opacity-0 group-hover:opacity-100 transition-opacity">
                      <button className="w-10 h-10 bg-[#2A2A2A]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#E1AD01] transition-colors">
                        <Heart className="w-5 h-5 text-[#E1AD01] hover:text-black" />
                      </button>
                      <button className="w-10 h-10 bg-[#2A2A2A]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#E1AD01] transition-colors">
                        <Eye className="w-5 h-5 text-[#E1AD01] hover:text-black" />
                      </button>
                    </div>
                    {/* Category Badge */}
                    <div className="absolute top-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs bg-[#2A2A2A]/90 backdrop-blur-sm text-[#E1AD01] border border-[#E1AD01]/30 capitalize">
                        {pet.category}
                      </span>
                    </div>
                    {/* Location Badge */}
                    <div className="absolute bottom-3 left-3">
                      <span className="px-3 py-1 rounded-full text-xs bg-gradient-to-r from-[#E1AD01] to-[#FFD700] text-black shadow-lg">
                        📍 {pet.location}
                      </span>
                    </div>
                  </div>
                  <CardContent className="p-5 bg-[#2A2A2A]">
                    <h3 className="text-xl mb-2 line-clamp-1 text-white">{pet.name}</h3>
                    <div className="flex items-center gap-3 mb-3 text-sm text-[#D0D0D0]">
                      <span>{pet.age}</span>
                      <span>•</span>
                      <span>{pet.gender}</span>
                    </div>
                    <div className="flex items-center gap-2 mb-3">
                      <div className="flex items-center">
                        <Star className="w-4 h-4 fill-current text-[#E1AD01]" />
                        <span className="text-sm ml-1 text-white">{pet.rating}</span>
                      </div>
                      <span className="text-sm text-[#D0D0D0]">({pet.reviews} reviews)</span>
                    </div>
                    <p className="text-2xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                      {pet.price}
                    </p>
                    <Button
                      className="w-full text-black rounded-xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg"
                      onClick={() => handleBuyNow(pet)}
                    >
                      <Heart className="w-4 h-4 mr-2" />
                      Buy Now ✨
                    </Button>
                  </CardContent>
                </Card>
              </motion.div>
            ))}
          </motion.div>

          {filteredPets.length === 0 && (
            <motion.div initial={{ opacity: 0, y: 20 }} animate={{ opacity: 1, y: 0 }} className="text-center py-16">
              <div className="w-24 h-24 bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#E1AD01]/30">
                <Search className="w-12 h-12 text-[#E1AD01]" />
              </div>
              <h3 className="text-2xl text-white mb-2">No pets found 🔍</h3>
              <p className="text-[#D0D0D0]">Try adjusting your search or filter to find what you're looking for.</p>
            </motion.div>
          )}
        </div>
      </section>

      {/* Why Adopt From Us */}
      <motion.section
        initial={{ opacity: 0, y: 20 }}
        whileInView={{ opacity: 1, y: 0 }}
        viewport={{ once: true }}
        className="py-16 bg-gradient-to-r from-orange-50 to-pink-50"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-12">
            <h2 className="text-4xl mb-4">Why Adopt From TailCity?</h2>
            <p className="text-gray-600 max-w-2xl mx-auto">
              We ensure every pet is healthy, verified, and ready for their forever home
            </p>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
            {[
              { icon: "✅", title: "Verified Sellers", desc: "All sellers are verified and trusted" },
              { icon: "🏥", title: "Health Certified", desc: "Every pet comes with health certificate" },
              { icon: "💝", title: "After-Sale Support", desc: "Continuous support after adoption" },
              { icon: "🔒", title: "Secure Payments", desc: "100% secure and protected transactions" },
            ].map((feature, idx) => (
              <motion.div
                key={idx}
                initial={{ opacity: 0, y: 20 }}
                whileInView={{ opacity: 1, y: 0 }}
                viewport={{ once: true }}
                transition={{ delay: idx * 0.1 }}
                className="text-center"
              >
                <div className="w-16 h-16 rounded-full bg-white shadow-lg flex items-center justify-center mx-auto mb-4 text-3xl">
                  {feature.icon}
                </div>
                <h3 className="mb-2">{feature.title}</h3>
                <p className="text-sm text-gray-600">{feature.desc}</p>
              </motion.div>
            ))}
          </div>
        </div>
      </motion.section>

      {showGuestMessage && (
        <motion.div
          initial={{ opacity: 0, y: -20 }}
          animate={{ opacity: 1, y: 0 }}
          className="fixed inset-0 bg-[#1A1A1A]/80 flex items-center justify-center z-50"
        >
          <div className="bg-[#2A2A2A] rounded-lg p-8 text-center">
            <h2 className="text-2xl mb-4 text-white">Login Required</h2>
            <p className="text-[#D0D0D0] mb-6">Please log in to purchase pets.</p>
            <Button
              className="w-full text-black rounded-xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg"
              onClick={() => router.push("/login")}
            >
              Go to Login
            </Button>
          </div>
        </motion.div>
      )}

      <PetPurchaseForm
        isOpen={selectedPet !== null}
        onClose={() => setSelectedPet(null)}
        petName={selectedPet?.name || ""}
        petPrice={selectedPet?.price || ""}
        petBreed={selectedPet?.breed || ""}
      />

      <Footer />
    </div>
  )
}
