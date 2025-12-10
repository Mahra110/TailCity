"use client"

import { Mail, Phone, MapPin, Facebook, Twitter, Instagram, Sparkles } from "lucide-react"
import { motion } from "motion/react"
import Link from "next/link"

interface FooterProps {
  setCurrentPage?: (page: string) => void
}

export function Footer({ setCurrentPage }: FooterProps) {
  const quickLinks = [
    { id: "home", label: "Home", href: "/" },
    { id: "marketplace", label: "Marketplace", href: "/marketplace" },
    { id: "shop", label: "Accessories", href: "/shop" },
    { id: "services", label: "Services", href: "/services" },
    { id: "vets", label: "Vets", href: "/vets" },
    { id: "pet-of-month", label: "Pet of Month", href: "/pet-of-month" },
    { id: "lost-found", label: "Lost & Found", href: "/lost-found" },
    { id: "about", label: "About", href: "/about" },
    { id: "contact", label: "Contact", href: "/contact" },
  ]

  return (
    <footer className="bg-gradient-to-b from-[#1A1A1A] to-[#0A0A0A] border-t border-[#E1AD01]/20 relative overflow-hidden">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12 relative z-10">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-8">
          {/* Left Column - Logo & Mission */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5 }}
            viewport={{ once: true }}
          >
            <div className="flex items-center mb-4">
              <motion.div
                className="w-12 h-12 rounded-full flex items-center justify-center mr-3 bg-gradient-to-br from-[#E1AD01] to-[#FFD700] shadow-lg overflow-hidden"
                whileHover={{ scale: 1.1, rotate: 10 }}
                transition={{ type: "spring", stiffness: 300 }}
              >
                <img
                  src="/images/white-20and-20black-20illustrative-20pets-20store-20logo-20-282-29.png"
                  alt="TailCity"
                  className="w-10 h-10 rounded-full"
                />
              </motion.div>
              <span className="text-2xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                TailCity
              </span>
            </div>
            <p className="text-[#D0D0D0] leading-relaxed">
              Connecting hearts, one paw at a time. We're dedicated to helping pets find loving homes and providing
              comprehensive care services for all your furry friends.
            </p>
            <div className="mt-4 flex items-center gap-2">
              <Sparkles className="w-4 h-4 text-[#E1AD01]" />
              <span className="text-sm text-[#E1AD01]">Making pet care magical since 2025</span>
            </div>
          </motion.div>

          {/* Middle Column - Quick Links */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.1 }}
            viewport={{ once: true }}
          >
            <h4 className="bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-4">
              Quick Links
            </h4>
            <ul className="space-y-2">
              {quickLinks.map((link, idx) => (
                <motion.li
                  key={link.id}
                  initial={{ opacity: 0, x: -20 }}
                  whileInView={{ opacity: 1, x: 0 }}
                  transition={{ delay: idx * 0.05 }}
                  viewport={{ once: true }}
                >
                  <Link href={link.href}>
                    <motion.span
                      className="text-[#D0D0D0] hover:text-white transition-all duration-300 group cursor-pointer inline-block"
                      whileHover={{ x: 5 }}
                    >
                      <span className="group-hover:text-[#E1AD01]">{link.label}</span>
                    </motion.span>
                  </Link>
                </motion.li>
              ))}
            </ul>
          </motion.div>

          {/* Right Column - Contact Info */}
          <motion.div
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            transition={{ duration: 0.5, delay: 0.2 }}
            viewport={{ once: true }}
          >
            <h4 className="bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-4">
              Contact Us
            </h4>
            <div className="space-y-3">
              <motion.div className="flex items-start group cursor-pointer" whileHover={{ x: 5 }}>
                <Mail className="w-5 h-5 mr-3 mt-0.5 text-[#E1AD01] group-hover:text-[#FFD700] transition-colors" />
                <div>
                  <p className="text-[#D0D0D0] group-hover:text-white transition-colors">hello@tailcity.com</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start group cursor-pointer" whileHover={{ x: 5 }}>
                <Phone className="w-5 h-5 mr-3 mt-0.5 text-[#E1AD01] group-hover:text-[#FFD700] transition-colors" />
                <div>
                  <p className="text-[#D0D0D0] group-hover:text-white transition-colors">+92 300 1234567</p>
                </div>
              </motion.div>
              <motion.div className="flex items-start group cursor-pointer" whileHover={{ x: 5 }}>
                <MapPin className="w-5 h-5 mr-3 mt-0.5 text-[#E1AD01] group-hover:text-[#FFD700] transition-colors" />
                <div>
                  <p className="text-[#D0D0D0] group-hover:text-white transition-colors">123 Pet Street</p>
                  <p className="text-[#D0D0D0] group-hover:text-white transition-colors">Pet City, PC 12345</p>
                </div>
              </motion.div>
            </div>

            {/* Social Icons */}
            <div className="flex space-x-3 mt-6">
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#E1AD01] to-[#FFD700] shadow-lg"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Facebook className="w-5 h-5 text-black" />
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#E1AD01] to-[#FFD700] shadow-lg"
                whileHover={{ scale: 1.15, rotate: -5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Instagram className="w-5 h-5 text-black" />
              </motion.button>
              <motion.button
                className="w-10 h-10 rounded-full flex items-center justify-center bg-gradient-to-br from-[#E1AD01] to-[#FFD700] shadow-lg"
                whileHover={{ scale: 1.15, rotate: 5 }}
                whileTap={{ scale: 0.95 }}
              >
                <Twitter className="w-5 h-5 text-black" />
              </motion.button>
            </div>
          </motion.div>
        </div>

        {/* Bottom Line */}
        <motion.div
          className="pt-8 border-t border-[#E1AD01]/20 text-center"
          initial={{ opacity: 0 }}
          whileInView={{ opacity: 1 }}
          transition={{ duration: 0.5, delay: 0.3 }}
          viewport={{ once: true }}
        >
          <p className="text-[#D0D0D0] text-sm flex items-center justify-center gap-2 flex-wrap">
            <span>© 2025 TailCity. All Rights Reserved.</span>
            <span className="hidden sm:inline">•</span>
            <span className="flex items-center gap-1">
              Made with <span className="text-[#E1AD01] inline">💛</span> for pets
            </span>
          </p>
        </motion.div>
      </div>
    </footer>
  )
}
