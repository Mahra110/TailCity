"use client"

import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Heart, ArrowRight, User } from "lucide-react"
import { motion } from "motion/react"
import { Navigation } from "./navigation"
import { Footer } from "./footer"
import { LostAndFoundPage } from "./lost-and-found-page"
import { useState } from "react"

export function CommunityPage() {
  const [activeSection, setActiveSection] = useState<"community" | "lostfound">("community")

  const testimonials = [
    {
      name: "Sarah Martinez",
      pet: "Golden Retriever - Buddy",
      avatar: "👩‍🦰",
      rating: 5,
      review:
        "Found the perfect companion through TailCity. The adoption process was smooth, caring, and professional. Buddy has brought so much joy to our family!",
    },
    {
      name: "John Davidson",
      pet: "Persian Cat - Luna",
      avatar: "👨‍💼",
      rating: 5,
      review:
        "Excellent veterinary services! Dr. Chen took great care of Luna during her surgery. The staff was compassionate and kept us informed every step of the way.",
    },
    {
      name: "Emily Chen",
      pet: "Beagle - Charlie",
      avatar: "👩‍🔬",
      rating: 5,
      review:
        "The grooming services are top-notch. Charlie always comes home looking and smelling amazing. Highly recommend their bathing and haircut packages!",
    },
    {
      name: "Michael Brown",
      pet: "Siamese Cat - Bella",
      avatar: "👨‍🏫",
      rating: 5,
      review:
        "TailCity made adopting Bella so easy. The team was knowledgeable and genuinely cared about finding the right match for our family. Couldn't be happier!",
    },
    {
      name: "Lisa Thompson",
      pet: "Labrador - Max",
      avatar: "👩‍💻",
      rating: 5,
      review:
        "The pet shop has everything we need and more! Quality products at fair prices, plus the staff always gives great advice on pet care.",
    },
    {
      name: "David Wilson",
      pet: "Maine Coon - Simba",
      avatar: "👨‍⚕️",
      rating: 5,
      review:
        "Our experience with TailCity has been exceptional from day one. From adoption to regular vet visits, the care and attention to detail is outstanding.",
    },
  ]

  const blogPosts = [
    {
      title: "10 Essential Tips for First-Time Dog Owners",
      excerpt:
        "Bringing home your first puppy? Here's everything you need to know to start your journey as a dog parent on the right paw...",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600",
      date: "December 5, 2024",
      readTime: "5 min read",
    },
    {
      title: "Understanding Cat Behavior: A Complete Guide",
      excerpt:
        "Learn to decode your feline friend's body language and vocalizations. Discover what your cat is really trying to tell you...",
      image: "https://images.unsplash.com/photo-1514888286974-6c03e2ca1dba?w=600",
      date: "December 3, 2024",
      readTime: "7 min read",
    },
    {
      title: "The Benefits of Regular Vet Check-ups",
      excerpt:
        "Prevention is better than cure. Discover why routine veterinary visits are crucial for your pet's long-term health and wellbeing...",
      image: "https://images.unsplash.com/photo-1553688738-a278b9f063e0?w=600",
      date: "November 28, 2024",
      readTime: "4 min read",
    },
    {
      title: "Choosing the Right Food for Your Pet",
      excerpt:
        "Nutrition plays a vital role in your pet's health. Learn how to select the best food based on age, breed, and specific dietary needs...",
      image: "https://images.unsplash.com/photo-1589924691995-400dc9ecc119?w=600",
      date: "November 25, 2024",
      readTime: "6 min read",
    },
    {
      title: "How to Prepare Your Home for a New Pet",
      excerpt:
        "Getting ready to welcome a new furry family member? Follow our comprehensive checklist to pet-proof your home and ensure a smooth transition...",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600",
      date: "November 20, 2024",
      readTime: "5 min read",
    },
    {
      title: "The Importance of Pet Socialization",
      excerpt:
        "Proper socialization helps pets become confident and well-adjusted. Discover techniques and timeline for socializing your dog or cat...",
      image: "https://images.unsplash.com/photo-154819997303cce0bbc87b?w=600",
      date: "November 15, 2024",
      readTime: "6 min read",
    },
  ]

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -30, 0],
              rotate: [0, 10, -10, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-20 left-10 text-6xl opacity-10"
          >
            👥
          </motion.div>
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, 20, 0],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-40 right-20 text-7xl opacity-10"
          >
            💬
          </motion.div>
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-40 left-1/4 text-6xl opacity-10"
          >
            ⭐
          </motion.div>
          <motion.div
            animate={{
              y: [0, 25, 0],
              x: [0, -15, 0],
            }}
            transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-20 right-1/3 text-7xl opacity-10"
          >
            📖
          </motion.div>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
          {/* Header */}
          <motion.div
            className="text-center mb-16"
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.6 }}
          >
            <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-4">
              Community Highlights
            </h1>
            <p className="text-[#D0D0D0] max-w-2xl mx-auto text-lg">
              Stories, experiences, and helpful tips from our vibrant pet-loving community.
            </p>
          </motion.div>

          <div className="flex justify-center gap-4 mb-12">
            <Button
              onClick={() => setActiveSection("community")}
              className={`px-8 py-3 rounded-full transition-all ${
                activeSection === "community"
                  ? "bg-gradient-to-r from-[#E1AD01] to-[#FFD700] text-black"
                  : "bg-[#2A2A2A] text-[#D0D0D0] border border-[#E1AD01]/30 hover:border-[#E1AD01]"
              }`}
            >
              Community Stories
            </Button>
            <Button
              onClick={() => setActiveSection("lostfound")}
              className={`px-8 py-3 rounded-full transition-all ${
                activeSection === "lostfound"
                  ? "bg-gradient-to-r from-[#E1AD01] to-[#FFD700] text-black"
                  : "bg-[#2A2A2A] text-[#D0D0D0] border border-[#E1AD01]/30 hover:border-[#E1AD01]"
              }`}
            >
              Lost & Found
            </Button>
          </div>

          {activeSection === "community" ? (
            <>
              {/* Testimonials Section */}
              <div className="mb-20">
                <motion.div
                  className="flex items-center justify-between mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                    What Pet Parents Say
                  </h2>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="rounded-full border-[#E1AD01]/30 text-[#E1AD01] hover:bg-[#E1AD01]/10 hover:border-[#E1AD01]/60 bg-transparent"
                    >
                      View All
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {testimonials.map((testimonial, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="bg-[#2A2A2A] border-[#E1AD01]/20 hover:border-[#E1AD01]/40 transition-all h-full">
                        <CardContent className="p-6">
                          <div className="flex items-center mb-4">
                            <div className="w-14 h-14 rounded-full flex items-center justify-center text-2xl mr-4 bg-gradient-to-br from-[#E1AD01]/20 to-[#FFD700]/20 border border-[#E1AD01]/30">
                              {testimonial.avatar}
                            </div>
                            <div className="flex-1">
                              <h3 className="text-white">{testimonial.name}</h3>
                              <p className="text-sm text-[#D0D0D0]">{testimonial.pet}</p>
                            </div>
                          </div>
                          <div className="flex mb-3">
                            {[...Array(testimonial.rating)].map((_, i) => (
                              <Heart key={i} className="w-5 h-5 fill-[#E1AD01] text-[#E1AD01]" />
                            ))}
                          </div>
                          <p className="text-[#D0D0D0] italic leading-relaxed">"{testimonial.review}"</p>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Blog Posts Section */}
              <div>
                <motion.div
                  className="flex items-center justify-between mb-8"
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  viewport={{ once: true }}
                >
                  <h2 className="text-3xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                    Latest From Our Blog
                  </h2>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      variant="outline"
                      className="rounded-full border-[#E1AD01]/30 text-[#E1AD01] hover:bg-[#E1AD01]/10 hover:border-[#E1AD01]/60 bg-transparent"
                    >
                      View All Posts
                      <ArrowRight className="w-4 h-4 ml-2" />
                    </Button>
                  </motion.div>
                </motion.div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                  {blogPosts.map((post, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ y: -5 }}
                    >
                      <Card className="bg-[#2A2A2A] border-[#E1AD01]/20 hover:border-[#E1AD01]/40 transition-all overflow-hidden group h-full">
                        <div className="h-56 bg-[#1A1A1A] overflow-hidden">
                          <ImageWithFallback
                            src={post.image || "/placeholder.svg"}
                            alt={post.title}
                            className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                          />
                        </div>
                        <CardContent className="p-6">
                          <div className="flex items-center text-sm text-[#D0D0D0]/70 mb-3">
                            <span>{post.date}</span>
                            <span className="mx-2">•</span>
                            <span>{post.readTime}</span>
                          </div>
                          <h3 className="text-white text-lg mb-3">{post.title}</h3>
                          <p className="text-[#D0D0D0] mb-4 leading-relaxed">{post.excerpt}</p>
                          <motion.button className="text-[#E1AD01] flex items-center group/btn" whileHover={{ x: 5 }}>
                            Read More
                            <ArrowRight className="w-4 h-4 ml-1 group-hover/btn:translate-x-1 transition-transform" />
                          </motion.button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </div>

              {/* Join Community Section */}
              <motion.div
                className="mt-20 rounded-3xl p-12 text-center bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] border border-[#E1AD01]/20"
                initial={{ opacity: 0, scale: 0.9 }}
                whileInView={{ opacity: 1, scale: 1 }}
                viewport={{ once: true }}
                transition={{ duration: 0.6 }}
              >
                <motion.div
                  className="w-16 h-16 rounded-full mx-auto mb-6 flex items-center justify-center bg-gradient-to-br from-[#E1AD01] to-[#FFD700] shadow-lg"
                  whileHover={{ scale: 1.1, rotate: 10 }}
                  transition={{ type: "spring", stiffness: 300 }}
                >
                  <User className="w-8 h-8 text-black" />
                </motion.div>
                <h2 className="text-3xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-4">
                  Join Our Community
                </h2>
                <p className="text-[#D0D0D0] mb-8 max-w-2xl mx-auto">
                  Share your pet stories, get advice from fellow pet parents, and stay updated with the latest tips and
                  trends in pet care.
                </p>
                <div className="flex flex-col sm:flex-row gap-4 justify-center">
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      className="text-black rounded-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg"
                    >
                      Share Your Story
                    </Button>
                  </motion.div>
                  <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }}>
                    <Button
                      size="lg"
                      variant="outline"
                      className="rounded-full border-[#E1AD01]/30 text-[#E1AD01] hover:bg-[#E1AD01]/10 hover:border-[#E1AD01]/60 bg-transparent"
                    >
                      Subscribe to Newsletter
                    </Button>
                  </motion.div>
                </div>
              </motion.div>
            </>
          ) : (
            <LostAndFoundPage />
          )}
        </div>
      </div>
      <Footer />
    </>
  )
}
