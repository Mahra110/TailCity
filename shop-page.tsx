"use client"

import { useState } from "react"
import { motion } from "framer-motion"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Star, Search, Filter, ShoppingCart, Heart } from "lucide-react"
import { Input } from "./ui/input"
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuTrigger } from "./ui/dropdown-menu"
import { useRouter } from "next/navigation"
import { Navigation } from "./navigation"
import type { CartItem } from "./types/CartItem" // Declare the CartItem variable

interface ShopPageProps {
  addToCart: (item: CartItem) => void
  isGuest: boolean
}

export function ShopPage({ addToCart, isGuest }: ShopPageProps) {
  const [selectedCategory, setSelectedCategory] = useState("All")
  const [searchQuery, setSearchQuery] = useState("")
  const [sortBy, setSortBy] = useState("Featured")
  const [showGuestMessage, setShowGuestMessage] = useState(false)
  const router = useRouter()

  const products = [
    // Food & Treats
    {
      id: 1,
      name: "Premium Dog Food",
      category: "Food",
      price: "Rs 4,500",
      rating: 4.8,
      reviews: 234,
      image: "https://i.pinimg.com/1200x/6d/7c/0e/6d7c0e10cb729450915194403cb3786c.jpg",
      stock: "In Stock",
    },
    {
      id: 2,
      name: "Organic Cat Food",
      category: "Food",
      price: "Rs 3,800",
      rating: 4.9,
      reviews: 189,
      image: "https://i.pinimg.com/1200x/84/ab/40/84ab408dfab56874681a892d7aed5d89.jpg",
      stock: "In Stock",
    },
    {
      id: 3,
      name: "Healthy Dog Treats",
      category: "Food",
      price: "Rs 1,200",
      rating: 4.7,
      reviews: 156,
      image: "https://i.pinimg.com/1200x/91/2c/cd/912ccd0e55109b7ed38e3be874cd5603.jpg",
      stock: "In Stock",
    },

    // Toys
    {
      id: 4,
      name: "Interactive Dog Toy Set",
      category: "Toys",
      price: "Rs 1,950",
      rating: 4.9,
      reviews: 312,
      image: "https://i.pinimg.com/1200x/7d/5f/c3/7d5fc3a0b845c4daa2715c218a610b48.jpg",
      stock: "In Stock",
    },
    {
      id: 5,
      name: "Cat Feather Wand",
      category: "Toys",
      price: "Rs 850",
      rating: 4.8,
      reviews: 156,
      image: "https://i.pinimg.com/1200x/15/ba/3c/15ba3c3161030c3cfe3173b0c80f6b13.jpg",
      stock: "In Stock",
    },
    {
      id: 6,
      name: "Rubber Chew Toy",
      category: "Toys",
      price: "Rs 750",
      rating: 4.6,
      reviews: 98,
      image: "https://i.pinimg.com/1200x/c7/ef/bc/c7efbc8c8ca83636a2639fb15acb4179.jpg",
      stock: "Low Stock",
    },
    {
      id: 7,
      name: "Plush Squeaky Toys",
      category: "Toys",
      price: "Rs 1,350",
      rating: 4.7,
      reviews: 203,
      image: "https://i.pinimg.com/1200x/ed/cd/59/edcd5955b2046b14fcbce5040c4ee820.jpg",
      stock: "In Stock",
    },

    // Grooming
    {
      id: 8,
      name: "Professional Grooming Kit",
      category: "Grooming",
      price: "Rs 3,850",
      rating: 4.9,
      reviews: 267,
      image: "https://i.pinimg.com/736x/15/6b/ce/156bce1ab86ca4f4acba292baf52fb89.jpg",
      stock: "In Stock",
    },
    {
      id: 9,
      name: "Cat Brush Set",
      category: "Grooming",
      price: "Rs 1,650",
      rating: 4.7,
      reviews: 134,
      image: "https://i.pinimg.com/1200x/e3/ff/f7/e3fff7c3c13f7b96e165041dc5e6a569.jpg",
      stock: "In Stock",
    },
    {
      id: 10,
      name: "Pet Shampoo Bundle",
      category: "Grooming",
      price: "Rs 2,100",
      rating: 4.8,
      reviews: 189,
      image: "hhttps://i.pinimg.com/1200x/ec/dd/6b/ecdd6be2c8efa3bb321d1ddcd287d30e.jpg",
      stock: "In Stock",
    },
    {
      id: 11,
      name: "Nail Trimmer Set",
      category: "Grooming",
      price: "Rs 950",
      rating: 4.6,
      reviews: 112,
      image: "https://i.pinimg.com/1200x/b7/fe/7d/b7fe7d2eb4fed1c2a45b253b76161574.jpg",
      stock: "In Stock",
    },

    // Bedding
    {
      id: 12,
      name: "Cozy Pet Bed Large",
      category: "Beds",
      price: "Rs 5,550",
      rating: 4.9,
      reviews: 178,
      image: "https://i.pinimg.com/1200x/51/e4/22/51e42208cb6bf6d7a943020ee3fc7ebe.jpg",
      stock: "In Stock",
    },
    {
      id: 13,
      name: "Cat Sleeping Mat",
      category: "Beds",
      price: "Rs 2,200",
      rating: 4.7,
      reviews: 145,
      image: "https://i.pinimg.com/736x/02/bf/bb/02bfbb8ed3204a14538af07e4b608181.jpg",
      stock: "In Stock",
    },
    {
      id: 14,
      name: "Heated Pet Blanket",
      category: "Beds",
      price: "Rs 3,800",
      rating: 4.8,
      reviews: 167,
      image: "https://i.pinimg.com/1200x/f7/33/57/f733576888237cd41b3e1b7905108975.jpg",
      stock: "In Stock",
    },

    // Accessories
    {
      id: 15,
      name: "Premium Dog Collar",
      category: "Accessories",
      price: "Rs 1,450",
      rating: 4.8,
      reviews: 201,
      image: "https://i.pinimg.com/736x/cc/34/36/cc3436f96b88d7c7a02fba21c2d1c80e.jpg",
      stock: "In Stock",
    },
    {
      id: 16,
      name: "Retractable Leash",
      category: "Accessories",
      price: "Rs 2,350",
      rating: 4.9,
      reviews: 223,
      image: "https://i.pinimg.com/1200x/26/c7/07/26c7072755ab01a11c0b61ee0d98e8e4.jpg",
      stock: "In Stock",
    },
    {
      id: 17,
      name: "LED Safety Collar",
      category: "Accessories",
      price: "Rs 1,850",
      rating: 4.7,
      reviews: 134,
      image: "https://i.pinimg.com/1200x/fd/fb/d4/fdfbd4c2a7066276763df070646fa0d5.jpg",
      stock: "In Stock",
    },

    // Health
    {
      id: 18,
      name: "Stainless Steel Bowl Set",
      category: "Health",
      price: "Rs 2,800",
      rating: 4.8,
      reviews: 189,
      image: "https://i.pinimg.com/1200x/7e/c4/b0/7ec4b025b290b1a6d10a0e2ddce97b31.jpg",
      stock: "In Stock",
    },
    {
      id: 19,
      name: "Automatic Pet Feeder",
      category: "Health",
      price: "Rs 6,500",
      rating: 4.9,
      reviews: 256,
      image: "https://i.pinimg.com/736x/63/53/70/6353707641daaadab7aaccd0e584d82a.jpg",
      stock: "In Stock",
    },
    {
      id: 20,
      name: "Elevated Food Bowl",
      category: "Health",
      price: "Rs 3,200",
      rating: 4.7,
      reviews: 123,
      image: "https://i.pinimg.com/736x/7f/24/1d/7f241df5ea7b77cac9dc456194ec01ee.jpg",
      stock: "In Stock",
    },

  ]

  const categories = ["All", "Food", "Toys", "Beds", "Accessories", "Health", "Grooming"]

  const filteredProducts = products.filter((product) => {
    const matchesSearch = product.name.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesCategory = selectedCategory === "All" || product.category === selectedCategory
    return matchesSearch && matchesCategory
  })

  const handleAddToCart = (product: any) => {
    if (isGuest) {
      setShowGuestMessage(true)
      return
    }
    addToCart(product)
  }

  return (
    <div className="min-h-screen bg-[#1A1A1A]">
      {/* Navigation Component */}
      <Navigation />

      <div className="container mx-auto px-4 py-12">
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
                <ShoppingCart className="w-10 h-10 text-black" />
              </div>
            </motion.div>
            <h1 className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
              Pet Accessories Shop 🛍️
            </h1>
            <p className="text-xl text-[#D0D0D0] max-w-3xl mx-auto">
              Everything your furry friend needs - from food to toys, grooming to bedding! ✨
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
                  placeholder="Search for accessories, food, toys, and more... 🔍"
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
                    {selectedCategory}
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end" className="w-56 bg-[#2A2A2A] border-[#E1AD01]/30">
                  {categories.map((cat) => (
                    <DropdownMenuItem
                      key={cat}
                      onClick={() => setSelectedCategory(cat)}
                      className={
                        selectedCategory === cat ? "bg-[#E1AD01]/20 text-[#E1AD01]" : "text-white hover:bg-[#E1AD01]/10"
                      }
                    >
                      {cat}
                    </DropdownMenuItem>
                  ))}
                </DropdownMenuContent>
              </DropdownMenu>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <section className="relative py-12">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center mb-8">
              <h2 className="text-3xl text-white">
                {selectedCategory === "All" ? "All Accessories 🎁" : `${selectedCategory} 🛍️`}
              </h2>
              <p className="text-[#D0D0D0]">{filteredProducts.length} products available ✨</p>
            </div>

            <motion.div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {filteredProducts.map((product) => (
                <motion.div key={product.id}>
                  <Card className="group hover:shadow-2xl transition-all duration-300 rounded-2xl overflow-hidden border-2 border-[#E1AD01]/20 hover:border-[#E1AD01] bg-[#2A2A2A]">
                    <div className="relative h-64 bg-[#1A1A1A] overflow-hidden">
                      <ImageWithFallback
                        src={product.image || "/placeholder.svg"}
                        alt={product.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                      {/* Quick Action Button */}
                      <div className="absolute top-3 right-3 opacity-0 group-hover:opacity-100 transition-opacity">
                        <button className="w-10 h-10 bg-[#2A2A2A]/90 backdrop-blur-sm rounded-full flex items-center justify-center shadow-lg hover:bg-[#E1AD01] transition-colors">
                          <Heart className="w-5 h-5 text-[#E1AD01] hover:text-black" />
                        </button>
                      </div>
                      {/* Stock Badge */}
                      <div className="absolute top-3 left-3">
                        <span
                          className={`px-3 py-1 rounded-full text-xs border ${
                            product.stock === "In Stock"
                              ? "bg-green-500/20 text-green-400 border-green-500/30"
                              : "bg-orange-500/20 text-orange-400 border-orange-500/30"
                          }`}
                        >
                          {product.stock}
                        </span>
                      </div>
                    </div>
                    <CardContent className="p-5 bg-[#2A2A2A]">
                      <h3 className="text-lg mb-2 line-clamp-1 text-white">{product.name}</h3>
                      <div className="flex items-center gap-2 mb-3">
                        <div className="flex items-center">
                          <Star className="w-4 h-4 fill-current text-[#E1AD01]" />
                          <span className="text-sm ml-1 text-white">{product.rating}</span>
                        </div>
                        <span className="text-sm text-[#D0D0D0]">({product.reviews})</span>
                      </div>
                      <p className="text-2xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                        {product.price}
                      </p>
                      <Button
                        className="w-full text-black rounded-xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg"
                        onClick={() =>
                          handleAddToCart({
                            id: product.id,
                            name: product.name,
                            price: product.price,
                            image: product.image,
                            quantity: 1,
                            category: product.category,
                          })
                        }
                      >
                        <ShoppingCart className="w-4 h-4 mr-2" />
                        Add to Cart ✨
                      </Button>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </motion.div>

            {filteredProducts.length === 0 && (
              <motion.div className="text-center py-16">
                <div className="w-24 h-24 bg-[#2A2A2A] rounded-full flex items-center justify-center mx-auto mb-4 border-2 border-[#E1AD01]/30">
                  <Search className="w-12 h-12 text-[#E1AD01]" />
                </div>
                <h3 className="text-2xl text-white mb-2">No products found 🔍</h3>
                <p className="text-sm text-[#D0D0D0]">
                  Try adjusting your search or filter to find what you're looking for.
                </p>
              </motion.div>
            )}

            {showGuestMessage && (
              <motion.div className="text-center py-8">
                <h3 className="text-2xl text-white mb-2">Please log in to add items to your cart 🛒</h3>
                <Button
                  className="w-full text-black rounded-xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg"
                  onClick={() => router.push("/login")}
                >
                  Log In
                </Button>
              </motion.div>
            )}
          </div>
        </section>

        {/* Why Shop With Us */}
        <motion.section
          initial={{ opacity: 0, y: 20 }}
          whileInView={{ opacity: 1, y: 0 }}
          viewport={{ once: true }}
          className="relative py-16 border-t border-[#E1AD01]/20"
        >
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="text-center mb-12">
              <h2 className="text-4xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                Why Shop With Us? ✨
              </h2>
              <p className="text-[#D0D0D0] max-w-2xl mx-auto">Quality products, trusted brands, and happy pets 🐾</p>
            </div>
            <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
              {[
                { icon: "🎯", title: "Verified Products", desc: "100% authentic and safe" },
                { icon: "🚚", title: "Fast Delivery", desc: "Delivered within 3-5 days" },
                { icon: "💰", title: "Best Prices", desc: "Competitive pricing guaranteed" },
                { icon: "🔄", title: "Easy Returns", desc: "30-day return policy" },
              ].map((feature, idx) => (
                <motion.div
                  key={idx}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  viewport={{ once: true }}
                  transition={{ delay: idx * 0.1 }}
                  className="text-center"
                >
                  <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] shadow-lg flex items-center justify-center mx-auto mb-4 text-3xl">
                    {feature.icon}
                  </div>
                  <h3 className="mb-2 text-white">{feature.title}</h3>
                  <p className="text-sm text-[#D0D0D0]">{feature.desc}</p>
                </motion.div>
              ))}
            </div>
          </div>
        </motion.section>
      </div>
    </div>
  )
}
