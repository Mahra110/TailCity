"use client"

import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import { X, ShoppingBag } from "lucide-react"
import { useRouter } from "next/navigation"

interface ShoppingCartFormProps {
  isOpen: boolean
  onClose: () => void
  onContinueShopping?: () => void
}

export function ShoppingCartForm({ isOpen, onClose, onContinueShopping }: ShoppingCartFormProps) {
  const router = useRouter()

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
            <button
              onClick={onClose}
              className="absolute top-4 right-4 w-8 h-8 rounded-full bg-[#1A1A1A] flex items-center justify-center hover:bg-[#E1AD01] transition-colors group"
            >
              <X className="w-5 h-5 text-[#E1AD01] group-hover:text-black" />
            </button>

            <div className="text-center">
              <div className="w-16 h-16 rounded-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] flex items-center justify-center mx-auto mb-4">
                <ShoppingBag className="w-8 h-8 text-black" />
              </div>
              <h2 className="text-2xl mb-2 text-white">Added to Cart! 🎉</h2>
              <p className="text-[#D0D0D0] mb-6">Your item has been added to the shopping cart.</p>

              <div className="space-y-3">
                <Button
                  onClick={() => {
                    if (onContinueShopping) {
                      onContinueShopping()
                    }
                    onClose()
                  }}
                  className="w-full text-black rounded-xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg"
                >
                  Continue Shopping
                </Button>
                <Button
                  onClick={() => {
                    onClose()
                    router.push("/checkout")
                  }}
                  className="w-full text-black rounded-xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] shadow-lg"
                >
                  Proceed to Checkout
                </Button>
              </div>
            </div>
          </motion.div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}
