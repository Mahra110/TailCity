"use client"

import type React from "react"
import { Share2 } from "lucide-react" // Import Share2 component

import { useState } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Search, MapPin, Calendar, Heart, AlertCircle, CheckCircle, X, Phone, Mail } from "lucide-react"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Card, CardContent } from "./ui/card"
import { Badge } from "./ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "./ui/tabs"
import { ImageWithFallback } from "./figma/ImageWithFallback"

export function LostAndFoundPage() {
  const [activeTab, setActiveTab] = useState("lost")
  const [showReportForm, setShowReportForm] = useState<"lost" | "found" | null>(null)
  const [formData, setFormData] = useState({
    petName: "",
    petType: "",
    breed: "",
    location: "",
    date: "",
    description: "",
    contactPhone: "",
    contactEmail: "",
  })
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [selectedOwner, setSelectedOwner] = useState<any>(null)

  const lostPets = [
    {
      id: 1,
      name: "Max",
      type: "Dog",
      breed: "Golden Retriever",
      location: "Central Park, NYC",
      date: "Nov 5, 2025",
      description: "Male, 3 years old, wearing a blue collar",
      image: "https://images.unsplash.com/photo-1633722715463-d30f4f325e24?w=400",
      status: "lost",
      ownerName: "John Smith",
      ownerPhone: "+1-555-123-4567",
      ownerEmail: "john@email.com",
    },
    {
      id: 2,
      name: "Luna",
      type: "Cat",
      breed: "Siamese",
      location: "Brooklyn Heights",
      date: "Nov 7, 2025",
      description: "Female, blue eyes, very friendly",
      image: "https://images.unsplash.com/photo-1513360371669-4adf3dd7dff8?w=400",
      status: "lost",
      ownerName: "Sarah Johnson",
      ownerPhone: "+1-555-234-5678",
      ownerEmail: "sarah@email.com",
    },
    {
      id: 3,
      name: "Charlie",
      type: "Dog",
      breed: "Beagle",
      location: "Queens, NY",
      date: "Nov 3, 2025",
      description: "Male, brown and white, microchipped",
      image: "https://images.unsplash.com/photo-1505628346881-b72b27e84530?w=400",
      status: "lost",
      ownerName: "Mike Davis",
      ownerPhone: "+1-555-345-6789",
      ownerEmail: "mike@email.com",
    },
  ]

  const foundPets = [
    {
      id: 4,
      name: "Unknown",
      type: "Cat",
      breed: "Tabby",
      location: "Manhattan",
      date: "Nov 8, 2025",
      description: "Found near Times Square, wearing a red collar",
      image: "https://images.unsplash.com/photo-1574158228041-f3b2795255f1?w=400",
      status: "found",
    },
    {
      id: 5,
      name: "Unknown",
      type: "Dog",
      breed: "Mixed Breed",
      location: "Bronx",
      date: "Nov 6, 2025",
      description: "Small dog, black and white, very scared",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=400",
      status: "found",
    },
  ]

  const reunited = [
    {
      id: 6,
      name: "Bella",
      type: "Dog",
      breed: "Labrador",
      location: "Staten Island",
      date: "Nov 2, 2025",
      description: "Reunited with owner! Thank you TailCity community!",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=400",
      status: "reunited",
    },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.1,
      },
    },
  }

  const itemVariants = {
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

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
    setTimeout(() => {
      setShowReportForm(null)
      setShowConfirmation(false)
    }, 3000)
    setFormData({
      petName: "",
      petType: "",
      breed: "",
      location: "",
      date: "",
      description: "",
      contactPhone: "",
      contactEmail: "",
    })
  }

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)" }}
    >
      {/* ... existing background blobs ... */}
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

      {/* Hero Section */}
      <motion.div
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.6 }}
        className="relative py-16 border-b border-[#E1AD01]/20"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center relative z-10">
            <motion.div
              initial={{ scale: 0 }}
              animate={{ scale: 1 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="inline-block mb-4"
            >
              <Heart className="w-16 h-16 mx-auto text-[#E1AD01]" />
            </motion.div>
            <h1 className="text-4xl md:text-5xl mb-4 text-white" style={{ fontWeight: 800 }}>
              Lost & Found
            </h1>
            <p className="text-xl text-[#D0D0D0] max-w-2xl mx-auto">
              Helping reunite pets with their families. Every pet deserves to go home.
            </p>
          </div>
        </div>
      </motion.div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        {/* Report Section */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.3 }}
          className="grid md:grid-cols-2 gap-6 mb-12"
        >
          <Card className="border-2 border-[#E1AD01]/30 hover:border-[#E1AD01] transition-all duration-300 hover:shadow-lg bg-[#2A2A2A]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-red-500/20 flex items-center justify-center">
                  <AlertCircle className="w-6 h-6 text-red-500" />
                </div>
                <h3 className="text-xl text-white">Report Lost Pet</h3>
              </div>
              <p className="text-[#D0D0D0] mb-4">
                Lost your beloved pet? Report it here and let our community help find them.
              </p>
              <Button
                onClick={() => setShowReportForm("lost")}
                className="w-full bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600 text-white"
              >
                Report Lost Pet
              </Button>
            </CardContent>
          </Card>

          <Card className="border-2 border-[#E1AD01]/30 hover:border-[#E1AD01] transition-all duration-300 hover:shadow-lg bg-[#2A2A2A]">
            <CardContent className="p-6">
              <div className="flex items-center gap-3 mb-4">
                <div className="w-12 h-12 rounded-full bg-green-500/20 flex items-center justify-center">
                  <CheckCircle className="w-6 h-6 text-green-500" />
                </div>
                <h3 className="text-xl text-white">Report Found Pet</h3>
              </div>
              <p className="text-[#D0D0D0] mb-4">Found a pet? Help them get back home by reporting it here.</p>
              <Button
                onClick={() => setShowReportForm("found")}
                className="w-full bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600 text-white"
              >
                Report Found Pet
              </Button>
            </CardContent>
          </Card>
        </motion.div>

        {/* ... existing search bar and tabs ... */}
        <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.4 }} className="mb-8">
          <div className="relative">
            <Search className="absolute left-4 top-1/2 transform -translate-y-1/2 w-5 h-5 text-[#E1AD01]" />
            <Input
              placeholder="Search by pet name, breed, or location..."
              className="pl-12 py-6 rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] bg-[#2A2A2A] text-white placeholder:text-[#D0D0D0]/60 shadow-sm"
            />
          </div>
        </motion.div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="mb-8">
          <TabsList className="grid w-full grid-cols-3 bg-[#2A2A2A] p-1 rounded-xl border border-[#E1AD01]/20">
            <TabsTrigger
              value="lost"
              className="rounded-lg data-[state=active]:bg-[#E1AD01] data-[state=active]:text-black data-[state=active]:shadow text-white"
            >
              Lost Pets ({lostPets.length})
            </TabsTrigger>
            <TabsTrigger
              value="found"
              className="rounded-lg data-[state=active]:bg-[#E1AD01] data-[state=active]:text-black data-[state=active]:shadow text-white"
            >
              Found Pets ({foundPets.length})
            </TabsTrigger>
            <TabsTrigger
              value="reunited"
              className="rounded-lg data-[state=active]:bg-[#E1AD01] data-[state=active]:text-black data-[state=active]:shadow text-white"
            >
              Reunited ({reunited.length})
            </TabsTrigger>
          </TabsList>

          <TabsContent value="lost">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
            >
              {lostPets.map((pet) => (
                <motion.div key={pet.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-[#E1AD01]/20 hover:border-[#E1AD01] bg-[#2A2A2A]">
                    <div className="relative">
                      <ImageWithFallback
                        src={pet.image || "/placeholder.svg"}
                        alt={pet.name}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-red-500 text-white">Lost</Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl mb-2 text-white">{pet.name}</h3>
                      <p className="text-[#D0D0D0] mb-3">{pet.breed}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-[#D0D0D0]">
                          <MapPin className="w-4 h-4 text-[#E1AD01]" />
                          {pet.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#D0D0D0]">
                          <Calendar className="w-4 h-4 text-[#E1AD01]" />
                          {pet.date}
                        </div>
                      </div>
                      <p className="text-sm text-[#D0D0D0] mb-4">{pet.description}</p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedOwner(pet)}
                          className="flex-1 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] text-black hover:from-[#FFD700] hover:to-[#E1AD01] text-sm py-2"
                        >
                          Contact Owner
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="found">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
            >
              {foundPets.map((pet) => (
                <motion.div key={pet.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-[#E1AD01]/20 hover:border-[#E1AD01] bg-[#2A2A2A]">
                    <div className="relative">
                      <ImageWithFallback
                        src={pet.image || "/placeholder.svg"}
                        alt={pet.name}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-green-500 text-white">Found</Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl mb-2 text-white">{pet.name}</h3>
                      <p className="text-[#D0D0D0] mb-3">{pet.breed}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-[#D0D0D0]">
                          <MapPin className="w-4 h-4 text-[#E1AD01]" />
                          {pet.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#D0D0D0]">
                          <Calendar className="w-4 h-4 text-[#E1AD01]" />
                          {pet.date}
                        </div>
                      </div>
                      <p className="text-sm text-[#D0D0D0] mb-4">{pet.description}</p>
                      <div className="flex gap-2">
                        <Button
                          onClick={() => setSelectedOwner(pet)}
                          className="flex-1 bg-gradient-to-r from-green-500 to-emerald-500 text-white hover:from-emerald-500 hover:to-green-500 text-sm py-2"
                        >
                          Claim Pet
                        </Button>
                      </div>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>

          <TabsContent value="reunited">
            <motion.div
              variants={containerVariants}
              initial="hidden"
              animate="visible"
              className="grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-6"
            >
              {reunited.map((pet) => (
                <motion.div key={pet.id} variants={itemVariants}>
                  <Card className="overflow-hidden hover:shadow-xl transition-all duration-300 border-2 border-[#E1AD01]/20 hover:border-[#E1AD01] bg-[#2A2A2A]">
                    <div className="relative">
                      <ImageWithFallback
                        src={pet.image || "/placeholder.svg"}
                        alt={pet.name}
                        className="w-full h-64 object-cover"
                      />
                      <Badge className="absolute top-3 left-3 bg-purple-500 text-white">Reunited</Badge>
                    </div>
                    <CardContent className="p-6">
                      <h3 className="text-xl mb-2 text-white">{pet.name}</h3>
                      <p className="text-[#D0D0D0] mb-3">{pet.breed}</p>
                      <div className="space-y-2 mb-4">
                        <div className="flex items-center gap-2 text-sm text-[#D0D0D0]">
                          <MapPin className="w-4 h-4 text-[#E1AD01]" />
                          {pet.location}
                        </div>
                        <div className="flex items-center gap-2 text-sm text-[#D0D0D0]">
                          <Calendar className="w-4 h-4 text-[#E1AD01]" />
                          {pet.date}
                        </div>
                      </div>
                      <p className="text-sm text-[#D0D0D0] mb-4">{pet.description}</p>
                      <Button
                        variant="outline"
                        className="w-full border-[#E1AD01]/30 hover:border-[#E1AD01] text-[#E1AD01] hover:bg-[#E1AD01]/10 bg-transparent"
                      >
                        <Heart className="w-4 h-4 mr-2 text-red-500" />
                        Share Success Story
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>
          </TabsContent>
        </Tabs>

        {/* ... existing tips section ... */}
        <motion.div
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ delay: 0.6 }}
          className="mt-12 bg-gradient-to-r from-[#2A2A2A] to-[#1A1A1A] rounded-2xl p-8 border border-[#E1AD01]/20"
        >
          <h2 className="text-2xl mb-6 text-center text-white">Tips for Finding Your Lost Pet</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E1AD01]/20 flex items-center justify-center mx-auto mb-4">
                <Search className="w-8 h-8 text-[#E1AD01]" />
              </div>
              <h3 className="mb-2 text-white">Act Quickly</h3>
              <p className="text-sm text-[#D0D0D0]">Search your neighborhood immediately and alert your neighbors</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E1AD01]/20 flex items-center justify-center mx-auto mb-4">
                <Share2 className="w-8 h-8 text-[#E1AD01]" />
              </div>
              <h3 className="mb-2 text-white">Spread the Word</h3>
              <p className="text-sm text-[#D0D0D0]">Use social media and local community groups to share information</p>
            </div>
            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-[#E1AD01]/20 flex items-center justify-center mx-auto mb-4">
                <Heart className="w-8 h-8 text-[#E1AD01]" />
              </div>
              <h3 className="mb-2 text-white">Stay Positive</h3>
              <p className="text-sm text-[#D0D0D0]">Many pets are reunited with their owners. Don't give up hope!</p>
            </div>
          </div>
        </motion.div>
      </div>

      <AnimatePresence>
        {showReportForm && (
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
              className="bg-[#2A2A2A] rounded-2xl border-2 border-[#E1AD01]/30 w-full max-w-2xl max-h-96 overflow-y-auto"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-white">
                    {showReportForm === "lost" ? "Report Lost Pet" : "Report Found Pet"}
                  </h2>
                  <button
                    onClick={() => setShowReportForm(null)}
                    className="p-2 hover:bg-[#E1AD01]/10 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6 text-[#E1AD01]" />
                  </button>
                </div>

                <form onSubmit={handleFormSubmit} className="space-y-4">
                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#D0D0D0] mb-2">Pet Name *</label>
                      <Input
                        required
                        value={formData.petName}
                        onChange={(e) => setFormData({ ...formData, petName: e.target.value })}
                        placeholder="e.g., Max, Luna"
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#D0D0D0] mb-2">Pet Type *</label>
                      <Input
                        required
                        value={formData.petType}
                        onChange={(e) => setFormData({ ...formData, petType: e.target.value })}
                        placeholder="e.g., Dog, Cat"
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60"
                      />
                    </div>
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#D0D0D0] mb-2">Breed</label>
                      <Input
                        value={formData.breed}
                        onChange={(e) => setFormData({ ...formData, breed: e.target.value })}
                        placeholder="e.g., Golden Retriever"
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#D0D0D0] mb-2">
                        Date {showReportForm === "lost" ? "Lost" : "Found"} *
                      </label>
                      <Input
                        required
                        type="date"
                        value={formData.date}
                        onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-sm text-[#D0D0D0] mb-2">Location *</label>
                    <Input
                      required
                      value={formData.location}
                      onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                      placeholder="e.g., Central Park, NYC"
                      className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60"
                    />
                  </div>

                  <div>
                    <label className="block text-sm text-[#D0D0D0] mb-2">Description *</label>
                    <Textarea
                      required
                      value={formData.description}
                      onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                      placeholder="Describe the pet's appearance, color, distinguishing marks..."
                      className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60 min-h-24"
                    />
                  </div>

                  <div className="grid md:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm text-[#D0D0D0] mb-2">Phone Number *</label>
                      <Input
                        required
                        type="tel"
                        value={formData.contactPhone}
                        onChange={(e) => setFormData({ ...formData, contactPhone: e.target.value })}
                        placeholder="Your phone number"
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60"
                      />
                    </div>
                    <div>
                      <label className="block text-sm text-[#D0D0D0] mb-2">Email *</label>
                      <Input
                        required
                        type="email"
                        value={formData.contactEmail}
                        onChange={(e) => setFormData({ ...formData, contactEmail: e.target.value })}
                        placeholder="Your email"
                        className="bg-[#1A1A1A] border-[#E1AD01]/30 text-white placeholder:text-[#D0D0D0]/60"
                      />
                    </div>
                  </div>

                  <div className="flex gap-3 pt-4">
                    <Button
                      type="button"
                      onClick={() => setShowReportForm(null)}
                      variant="outline"
                      className="flex-1 border-[#E1AD01]/30 hover:bg-[#E1AD01]/10 text-white"
                    >
                      Cancel
                    </Button>
                    <Button
                      type="submit"
                      className={`flex-1 text-white ${
                        showReportForm === "lost"
                          ? "bg-gradient-to-r from-red-500 to-pink-500 hover:from-red-600 hover:to-pink-600"
                          : "bg-gradient-to-r from-green-500 to-emerald-500 hover:from-green-600 hover:to-emerald-600"
                      }`}
                    >
                      {showReportForm === "lost" ? "Report Lost Pet" : "Report Found Pet"}
                    </Button>
                  </div>
                </form>
              </div>
            </motion.div>
          </motion.div>
        )}
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
              <h2 className="text-2xl text-white mb-2">Report Submitted!</h2>
              <p className="text-[#D0D0D0]">
                Thank you for helping. Our community will help reunite this pet with its family.
              </p>
            </motion.div>
          </motion.div>
        )}
        {selectedOwner && (
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
              className="bg-[#2A2A2A] rounded-2xl border-2 border-[#E1AD01]/30 w-full max-w-md"
            >
              <div className="p-6">
                <div className="flex items-center justify-between mb-6">
                  <h2 className="text-2xl text-white">Pet Owner Details</h2>
                  <button
                    onClick={() => setSelectedOwner(null)}
                    className="p-2 hover:bg-[#E1AD01]/10 rounded-lg transition-all"
                  >
                    <X className="w-6 h-6 text-[#E1AD01]" />
                  </button>
                </div>

                <div className="space-y-4">
                  <div>
                    <h3 className="text-[#D0D0D0] text-sm font-semibold mb-2">Pet Information</h3>
                    <div className="bg-[#1A1A1A] rounded-lg p-4">
                      <p className="text-white">
                        <strong>{selectedOwner.name}</strong> - {selectedOwner.breed}
                      </p>
                      <p className="text-[#D0D0D0] text-sm mt-1">Status: {selectedOwner.status.toUpperCase()}</p>
                      <p className="text-[#D0D0D0] text-sm">{selectedOwner.description}</p>
                    </div>
                  </div>

                  <div>
                    <h3 className="text-[#D0D0D0] text-sm font-semibold mb-2">Owner Information</h3>
                    <div className="bg-[#1A1A1A] rounded-lg p-4 space-y-3">
                      <div className="flex items-center gap-2">
                        <Phone className="w-4 h-4 text-[#E1AD01]" />
                        <div>
                          <p className="text-[#D0D0D0] text-xs">Phone</p>
                          <p className="text-white text-sm">{selectedOwner.ownerPhone}</p>
                        </div>
                      </div>
                      <div className="flex items-center gap-2">
                        <Mail className="w-4 h-4 text-[#E1AD01]" />
                        <div>
                          <p className="text-[#D0D0D0] text-xs">Email</p>
                          <p className="text-white text-sm">{selectedOwner.ownerEmail}</p>
                        </div>
                      </div>
                    </div>
                  </div>

                  <Button
                    onClick={() => setSelectedOwner(null)}
                    className="w-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] text-black hover:from-[#FFD700] hover:to-[#E1AD01]"
                  >
                    Close
                  </Button>
                </div>
              </div>
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}
