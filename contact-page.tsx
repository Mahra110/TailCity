"use client"

import type React from "react"
import { Navigation } from "./navigation"
import { Footer } from "./footer"
import { Card, CardContent } from "./ui/card"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Button } from "./ui/button"
import { MapPin, Phone, Mail, Clock, MessageSquare, Send } from "lucide-react"
import { motion } from "framer-motion"
import { useState } from "react"
import { AnimatePresence } from "framer-motion"

export function ContactPage() {
  const [formData, setFormData] = useState({
    firstName: "",
    lastName: "",
    email: "",
    phone: "",
    subject: "",
    message: "",
  })
  const [showConfirmation, setShowConfirmation] = useState(false)

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    setShowConfirmation(true)
    setTimeout(() => {
      setShowConfirmation(false)
      setFormData({
        firstName: "",
        lastName: "",
        email: "",
        phone: "",
        subject: "",
        message: "",
      })
    }, 3000)
  }

  const contactInfo = [
    {
      icon: MapPin,
      title: "Visit Us",
      details: ["123 Pet Street", "Karachi, Pakistan"],
    },
    {
      icon: Phone,
      title: "Call Us",
      details: ["+92 300 1234567", "+92 21 12345678"],
    },
    {
      icon: Mail,
      title: "Email Us",
      details: ["hello@tailcity.com", "support@tailcity.com"],
    },
    {
      icon: Clock,
      title: "Working Hours",
      details: ["Mon - Fri: 9:00 AM - 8:00 PM", "Sat - Sun: 10:00 AM - 6:00 PM"],
    },
  ]

  const offices = [
    {
      city: "Karachi",
      address: "123 Pet Street, Clifton",
      phone: "+92 300 1234567",
      email: "karachi@tailcity.com",
    },
    {
      city: "Lahore",
      address: "456 Animal Avenue, Gulberg",
      phone: "+92 301 2345678",
      email: "lahore@tailcity.com",
    },
    {
      city: "Islamabad",
      address: "789 Companion Road, F-7",
      phone: "+92 302 3456789",
      email: "islamabad@tailcity.com",
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
              y: [0, -25, 0],
              rotate: [0, 8, -8, 0],
            }}
            transition={{ duration: 7, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-32 left-16 text-6xl opacity-10"
          >
            📧
          </motion.div>
          <motion.div
            animate={{
              y: [0, 30, 0],
              x: [0, 15, 0],
            }}
            transition={{ duration: 9, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute top-48 right-24 text-7xl opacity-10"
          >
            📞
          </motion.div>
          <motion.div
            animate={{
              y: [0, -20, 0],
              rotate: [0, -12, 12, 0],
            }}
            transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-36 left-1/4 text-6xl opacity-10"
          >
            💬
          </motion.div>
          <motion.div
            animate={{
              y: [0, 28, 0],
              x: [0, -12, 0],
            }}
            transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, ease: "easeInOut" }}
            className="absolute bottom-24 right-1/3 text-7xl opacity-10"
          >
            📍
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
                <MessageSquare className="w-5 h-5 mr-2 text-[#E1AD01]" />
                <span className="text-[#E1AD01]">Get in Touch</span>
              </motion.div>
              <h1 className="text-5xl md:text-6xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-6">
                We'd Love to Hear From You
              </h1>
              <p className="text-xl text-[#D0D0D0]">
                Have questions about adoption, our services, or anything else? Our team is here to help!
              </p>
            </motion.div>
          </div>
        </section>

        {/* Contact Info Cards */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
              {contactInfo.map((info, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ y: -5, scale: 1.02 }}
                >
                  <Card className="bg-[#2A2A2A] border-[#E1AD01]/20 hover:border-[#E1AD01]/40 transition-all">
                    <CardContent className="p-6 text-center">
                      <motion.div
                        className="w-16 h-16 rounded-full mx-auto mb-4 flex items-center justify-center bg-gradient-to-br from-[#E1AD01] to-[#FFD700] shadow-lg"
                        whileHover={{ rotate: 10, scale: 1.1 }}
                        transition={{ type: "spring", stiffness: 300 }}
                      >
                        <info.icon className="w-8 h-8 text-black" />
                      </motion.div>
                      <h3 className="text-white mb-3">{info.title}</h3>
                      {info.details.map((detail, idx) => (
                        <p key={idx} className="text-[#D0D0D0] text-sm">
                          {detail}
                        </p>
                      ))}
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Form & Office Locations */}
        <section className="py-16 relative z-10">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">
              {/* Contact Form */}
              <motion.div initial={{ opacity: 0, x: -20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-6">
                  Send Us a Message
                </h2>
                <Card className="bg-[#2A2A2A] border-[#E1AD01]/20">
                  <CardContent className="p-8">
                    <form onSubmit={handleFormSubmit} className="space-y-6">
                      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                        <div>
                          <label className="block text-sm text-[#D0D0D0] mb-2">First Name</label>
                          <Input
                            placeholder="John"
                            value={formData.firstName}
                            onChange={(e) => setFormData({ ...formData, firstName: e.target.value })}
                            required
                            className="bg-[#1A1A1A] border-[#E1AD01]/30 focus:border-[#E1AD01] text-white placeholder:text-[#D0D0D0]/50"
                          />
                        </div>
                        <div>
                          <label className="block text-sm text-[#D0D0D0] mb-2">Last Name</label>
                          <Input
                            placeholder="Doe"
                            value={formData.lastName}
                            onChange={(e) => setFormData({ ...formData, lastName: e.target.value })}
                            required
                            className="bg-[#1A1A1A] border-[#E1AD01]/30 focus:border-[#E1AD01] text-white placeholder:text-[#D0D0D0]/50"
                          />
                        </div>
                      </div>

                      <div>
                        <label className="block text-sm text-[#D0D0D0] mb-2">Email</label>
                        <Input
                          type="email"
                          placeholder="john@example.com"
                          value={formData.email}
                          onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                          required
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 focus:border-[#E1AD01] text-white placeholder:text-[#D0D0D0]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-[#D0D0D0] mb-2">Phone Number</label>
                        <Input
                          type="tel"
                          placeholder="+92 300 1234567"
                          value={formData.phone}
                          onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                          required
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 focus:border-[#E1AD01] text-white placeholder:text-[#D0D0D0]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-[#D0D0D0] mb-2">Subject</label>
                        <Input
                          placeholder="How can we help you?"
                          value={formData.subject}
                          onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                          required
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 focus:border-[#E1AD01] text-white placeholder:text-[#D0D0D0]/50"
                        />
                      </div>

                      <div>
                        <label className="block text-sm text-[#D0D0D0] mb-2">Message</label>
                        <Textarea
                          placeholder="Tell us more about your inquiry..."
                          rows={5}
                          value={formData.message}
                          onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                          required
                          className="bg-[#1A1A1A] border-[#E1AD01]/30 focus:border-[#E1AD01] text-white placeholder:text-[#D0D0D0]/50"
                        />
                      </div>

                      <motion.div whileHover={{ scale: 1.02 }} whileTap={{ scale: 0.98 }}>
                        <Button
                          type="submit"
                          className="w-full text-black py-3 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg"
                        >
                          <Send className="w-5 h-5 mr-2" />
                          Send Message
                        </Button>
                      </motion.div>
                    </form>
                  </CardContent>
                </Card>
              </motion.div>

              {/* Office Locations */}
              <motion.div initial={{ opacity: 0, x: 20 }} whileInView={{ opacity: 1, x: 0 }} viewport={{ once: true }}>
                <h2 className="text-3xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-6">
                  Our Locations
                </h2>

                {/* Office Cards */}
                <div className="space-y-4">
                  {offices.map((office, index) => (
                    <motion.div
                      key={index}
                      initial={{ opacity: 0, y: 20 }}
                      whileInView={{ opacity: 1, y: 0 }}
                      transition={{ delay: index * 0.1 }}
                      viewport={{ once: true }}
                      whileHover={{ x: 5 }}
                    >
                      <Card className="bg-[#2A2A2A] border-[#E1AD01]/20 hover:border-[#E1AD01]/40 transition-all">
                        <CardContent className="p-6">
                          <h3 className="text-white text-xl mb-3">{office.city}</h3>
                          <div className="space-y-2 text-sm text-[#D0D0D0]">
                            <div className="flex items-start">
                              <MapPin className="w-4 h-4 mr-2 mt-0.5 text-[#E1AD01]" />
                              <span>{office.address}</span>
                            </div>
                            <div className="flex items-center">
                              <Phone className="w-4 h-4 mr-2 text-[#E1AD01]" />
                              <span>{office.phone}</span>
                            </div>
                            <div className="flex items-center">
                              <Mail className="w-4 h-4 mr-2 text-[#E1AD01]" />
                              <span>{office.email}</span>
                            </div>
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>
              </motion.div>
            </div>
          </div>
        </section>

        {/* FAQ Section */}
        <section className="py-16 relative z-10">
          <div className="max-w-4xl mx-auto px-4 sm:px-6 lg:px-8">
            <motion.div
              className="text-center mb-12"
              initial={{ opacity: 0, y: 20 }}
              whileInView={{ opacity: 1, y: 0 }}
              viewport={{ once: true }}
            >
              <h2 className="text-3xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-4">
                Frequently Asked Questions
              </h2>
              <p className="text-[#D0D0D0]">Quick answers to common questions</p>
            </motion.div>

            <div className="space-y-4">
              {[
                {
                  question: "What are your adoption fees?",
                  answer:
                    "Adoption fees vary depending on the pet's age, breed, and medical needs. Contact us for specific pricing.",
                },
                {
                  question: "Do you provide veterinary services?",
                  answer:
                    "Yes, we partner with certified veterinarians across Pakistan to provide comprehensive pet healthcare.",
                },
                {
                  question: "Can I return a pet if it doesn't work out?",
                  answer:
                    "We have a 30-day trial period. If there are compatibility issues, we'll work with you to find the best solution.",
                },
                {
                  question: "Do you deliver pet supplies?",
                  answer:
                    "Yes, we offer delivery services for pet food, accessories, and supplies in major cities across Pakistan.",
                },
              ].map((faq, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, y: 20 }}
                  whileInView={{ opacity: 1, y: 0 }}
                  transition={{ delay: index * 0.1 }}
                  viewport={{ once: true }}
                  whileHover={{ x: 5 }}
                >
                  <Card className="bg-[#2A2A2A] border-[#E1AD01]/20 hover:border-[#E1AD01]/40 transition-all">
                    <CardContent className="p-6">
                      <h3 className="text-white mb-2">{faq.question}</h3>
                      <p className="text-[#D0D0D0]">{faq.answer}</p>
                    </CardContent>
                  </Card>
                </motion.div>
              ))}
            </div>
          </div>
        </section>

        {/* Confirmation Modal */}
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
                <h2 className="text-2xl text-white mb-2">Message Sent!</h2>
                <p className="text-[#D0D0D0]">Thank you for reaching out. We'll get back to you as soon as possible.</p>
              </motion.div>
            </motion.div>
          )}
        </AnimatePresence>
      </div>
      <Footer />
    </>
  )
}
