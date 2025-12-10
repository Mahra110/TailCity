"use client"

import { Navigation } from "./navigation"
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Heart, Users, Target, Shield, Sparkles } from "lucide-react"
import { motion } from "framer-motion"
import { Footer } from "./footer"

export function AboutPage() {
  const values = [
    {
      icon: Heart,
      title: "Compassion",
      description:
        "Every animal deserves love, care, and a safe home. We work tirelessly to match pets with caring families.",
    },
    {
      icon: Shield,
      title: "Trust",
      description:
        "We maintain the highest standards of care and transparency in all our adoption and veterinary services.",
    },
    {
      icon: Users,
      title: "Community",
      description: "Building a strong network of pet lovers, veterinarians, and advocates who share our passion.",
    },
    {
      icon: Target,
      title: "Excellence",
      description: "Providing top-quality services and resources to ensure the wellbeing of every pet in our care.",
    },
  ]

  const stats = [
    { number: "10,000+", label: "Happy Adoptions" },
    { number: "500+", label: "Partner Vets" },
    { number: "50,000+", label: "Community Members" },
    { number: "95%", label: "Success Rate" },
  ]

  const team = [
    {
      name: "Syeda Bisma Iqbal",
      role: "Founder",
      image: "/images/mypic2.jpg",
    },
    {
      name: "Mahnoor Zahra",
      role: "Operations Director",
      image: "/images/image.png",
    },
    {
      name: "Rohit Kumar",
      role: "Adoption Coordinator",
      image: "/professional-businessman-portrait.png",
    },
  ]

  return (
    <>
      {/* Navigation Component */}
      <Navigation />
      <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
        {/* Floating Decorative Elements */}
        <div className="absolute inset-0 overflow-hidden pointer-events-none">
          <motion.div
            animate={{
              y: [0, -28, 0],
              rotate: [0, 12, -12, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-24 left-12 text-6xl opacity-10"
          >
            ℹ️
          </motion.div>
          <motion.div
            animate={{
              y: [0, 32, 0],
              x: [0, 18, 0],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-44 right-16 text-7xl opacity-10"
          >
            🏆
          </motion.div>
          <motion.div
            animate={{
              y: [0, -22, 0],
              rotate: [0, -10, 10, 0],
            }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-40 left-1/4 text-6xl opacity-10"
          >
            💼
          </motion.div>
          <motion.div
            animate={{
              y: [0, 26, 0],
              x: [0, -14, 0],
            }}
            transition={{ duration: 11, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-28 right-1/3 text-7xl opacity-10"
          >
            🌟
          </motion.div>
        </div>

        {/* Hero Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center max-w-3xl mx-auto"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.6 }}
            >
              <motion.div
                className="inline-flex items-center px-4 py-2 rounded-full mb-6 border-2 border-[#E1AD01]/30 bg-[#E1AD01]/10"
                whileHover={{ scale: 1.05 }}
              >
                <Sparkles className="w-5 h-5 mr-2 text-[#E1AD01]" />
                <span className="text-[#E1AD01]">About TailCity</span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-6">
                Pakistan's Premier Pet Care Platform
              </h1>
              <p className="text-xl text-[#D0D0D0] leading-relaxed">
                TailCity is dedicated to connecting loving families with pets in need of homes. We provide comprehensive
                pet care services, expert veterinary support, and a thriving community of pet lovers across Pakistan.
              </p>
            </motion.div>
          </div>
        </section>

        {/* Stats Section */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="bg-gradient-to-r from-[#E1AD01] to-[#FFD700] rounded-3xl p-12">
              <div className="grid grid-cols-2 md:grid-cols-4 gap-8">
                {stats.map((stat, index) => (
                  <motion.div
                    key={index}
                    className="text-center"
                    initial={{ opacity: 0, scale: 0.8 }}
                    whileInView={{ opacity: 1, scale: 1 }}
                    transition={{ delay: index * 0.1 }}
                    viewport={{ once: true }}
                    whileHover={{ scale: 1.05 }}
                  >
                    <div className="text-4xl text-black mb-2">{stat.number}</div>
                    <div className="text-black/80">{stat.label}</div>
                  </motion.div>
                ))}
              </div>
            </div>
          </div>
        </section>

        {/* Values Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-4">
                Our Core Values
              </h2>
              <p className="text-[#D0D0D0] max-w-2xl mx-auto">The principles that guide everything we do at TailCity</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
              {values.map((value, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5 }}
                >
                  <Card className="bg-[#2A2A2A] border-[#E1AD01]/20 hover:border-[#E1AD01]/40 transition-all h-full">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-[#E1AD01] to-[#FFD700] shadow-lg"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <value.icon className="w-8 h-8 text-black" />
                      </motion.div>
                      <h3 className="text-white text-xl mb-3">{value.title}</h3>
                      <p className="text-[#D0D0D0]">{value.description}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Team Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-4">
                Meet Our Team
              </h2>
              <p className="text-[#D0D0D0] max-w-2xl mx-auto">Passionate professionals dedicated to animal welfare</p>
            </motion.div>
            <div className="grid grid-cols-1 md:grid-cols-3 gap-8 max-w-5xl mx-auto">
              {team.map((member, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -8 }}
                >
                  <Card className="bg-[#2A2A2A] border-[#E1AD01]/20 overflow-hidden hover:border-[#E1AD01]/40 transition-all">
                    <div className="h-64 bg-[#1A1A1A] overflow-hidden group">
                      <ImageWithFallback
                        src={member.image || "/placeholder.svg"}
                        alt={member.name}
                        className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500"
                      />
                    </div>
                    <CardContent className="p-6 text-center">
                      <h3 className="text-white text-xl mb-2">{member.name}</h3>
                      <p className="text-[#D0D0D0]">{member.role}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Story Section */}
        <section className="py-20 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-4xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-6">
                Our Story
              </h2>
            </motion.div>
            <motion.div
              className="space-y-6"
              initial={{ opacity: 0 }}
              whileInView={{ opacity: 1 }}
              viewport={{ once: true }}
            >
              <p className="text-[#D0D0D0] leading-relaxed text-lg">
                TailCity was born from a simple observation: too many loving pets in Pakistan were struggling to find
                homes, while countless families were seeking the perfect companion. Our founder, Dr. Sarah Ahmed, a
                veterinarian with over 15 years of experience, decided to bridge this gap.
              </p>
              <p className="text-[#D0D0D0] leading-relaxed text-lg">
                What started as a small rescue operation in Karachi has grown into Pakistan's largest pet adoption and
                care platform. We've expanded our services to include veterinary care, pet supplies, grooming services,
                and a vibrant community where pet parents can share experiences and advice.
              </p>
              <p className="text-[#D0D0D0] leading-relaxed text-lg">
                Today, TailCity operates across major cities in Pakistan, partnering with local shelters, veterinarians,
                and pet care professionals. Our technology platform makes it easier than ever to adopt a pet, find
                quality veterinary care, and access everything you need for your furry friend's wellbeing.
              </p>
            </motion.div>
          </div>
        </section>
      </div>
      {/* Footer Component */}
      <Footer />
    </>
  )
}
