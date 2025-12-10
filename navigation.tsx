"use client"
import { useState } from "react"
import Link from "next/link"
import { usePathname, useRouter } from "next/navigation"
import { motion, AnimatePresence } from "framer-motion"
import { Button } from "./ui/button"
import {
  Home,
  ShoppingCart,
  Heart,
  Calendar,
  Users,
  Info,
  Phone,
  Menu,
  X,
  ChevronDown,
  User,
  LogOut,
  Settings,
  Package,
} from "lucide-react"
import { Sheet, SheetContent, SheetDescription, SheetHeader, SheetTitle, SheetTrigger } from "./ui/sheet"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { useApp } from "@/contexts/AppContext"

export function Navigation() {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false)
  const [hoveredMenu, setHoveredMenu] = useState<string | null>(null)
  const [isCartOpen, setIsCartOpen] = useState(false)
  const [showLoginDropdown, setShowLoginDropdown] = useState(false)
  const pathname = usePathname()
  const router = useRouter()

  const { cartCount, cartItems, removeFromCart, updateCartQuantity, clearCart, isGuest, user, handleLogout } = useApp()

  const menuItems = [
    { name: "Home", path: "/", icon: Home },
    {
      name: "Marketplace",
      path: "/marketplace",
      icon: ShoppingCart,
      dropdown: [
        { name: "Pets", path: "/marketplace" },
        { name: "Accessories", path: "/shop" },
      ],
    },
    { name: "Services", path: "/services", icon: Calendar },
    { name: "Vets", path: "/vets", icon: Heart },
    { name: "Community", path: "/community", icon: Users },
    { name: "About", path: "/about", icon: Info },
    { name: "Contact", path: "/contact", icon: Phone },
  ]

  const cartTotal = cartItems.reduce((sum, item) => {
    const price = Number.parseFloat(item.price.replace(/[^0-9.-]+/g, ""))
    return sum + price * item.quantity
  }, 0)

  return (
    <nav className="bg-[#1A1A1A]/95 backdrop-blur-md border-b border-[#E1AD01]/20 sticky top-0 z-50 shadow-lg">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-20">
          {/* Logo */}
          <Link href="/" className="flex items-center space-x-3 group">
            <motion.div whileHover={{ scale: 1.05 }} whileTap={{ scale: 0.95 }} className="relative">
              <div className="absolute inset-0 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] rounded-full blur opacity-50 group-hover:opacity-75 transition-opacity" />
              <div className="relative w-12 h-12 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] rounded-full flex items-center justify-center shadow-xl">
                <ImageWithFallback
                  src="/images/white-20and-20black-20illustrative-20pets-20store-20logo-20-282-29.png"
                  alt="TailCity"
                  className="w-10 h-10 rounded-full"
                />
              </div>
            </motion.div>
            <span className="text-2xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent tracking-tight">
              TailCity
            </span>
          </Link>

          {/* Desktop Menu */}
          <div className="hidden lg:flex items-center space-x-1">
            {menuItems.map((item) => (
              <div
                key={item.name}
                className="relative"
                onMouseEnter={() => item.dropdown && setHoveredMenu(item.name)}
                onMouseLeave={() => setHoveredMenu(null)}
              >
                <Link href={item.path}>
                  <Button
                    variant="ghost"
                    className={`
                      relative px-4 py-2 rounded-lg transition-all duration-300
                      ${
                        pathname === item.path
                          ? "text-[#E1AD01] bg-[#E1AD01]/10"
                          : "text-white hover:text-[#E1AD01] hover:bg-[#E1AD01]/5"
                      }
                    `}
                  >
                    <item.icon className="w-4 h-4 mr-2" />
                    {item.name}
                    {item.dropdown && <ChevronDown className="w-4 h-4 ml-1" />}
                    {pathname === item.path && (
                      <motion.div
                        layoutId="activeTab"
                        className="absolute bottom-0 left-0 right-0 h-0.5 bg-gradient-to-r from-[#E1AD01] to-[#FFD700]"
                      />
                    )}
                  </Button>
                </Link>

                {/* Dropdown Menu */}
                <AnimatePresence>
                  {item.dropdown && hoveredMenu === item.name && (
                    <motion.div
                      initial={{ opacity: 0, y: -10 }}
                      animate={{ opacity: 1, y: 0 }}
                      exit={{ opacity: 0, y: -10 }}
                      className="absolute top-full left-0 mt-2 w-48 bg-[#2A2A2A] border border-[#E1AD01]/20 rounded-xl shadow-2xl overflow-hidden"
                    >
                      {item.dropdown.map((subItem) => (
                        <Link key={subItem.name} href={subItem.path}>
                          <Button
                            variant="ghost"
                            className="w-full justify-start px-4 py-3 text-white hover:bg-[#E1AD01]/10 hover:text-[#E1AD01] rounded-none"
                          >
                            {subItem.name}
                          </Button>
                        </Link>
                      ))}
                    </motion.div>
                  )}
                </AnimatePresence>
              </div>
            ))}
          </div>

          {/* Right Side Actions */}
          <div className="flex items-center space-x-4">
            {/* Cart Icon */}
            <Sheet open={isCartOpen} onOpenChange={setIsCartOpen}>
              <SheetTrigger asChild>
                <motion.button
                  className="relative p-2 rounded-full hover:bg-[#E1AD01]/10 transition-all duration-300 border border-transparent hover:border-[#E1AD01]/30"
                  whileHover={{ scale: 1.1 }}
                  whileTap={{ scale: 0.95 }}
                >
                  <ShoppingCart className="w-6 h-6 text-[#E1AD01]" />
                  {cartCount > 0 && (
                    <motion.div
                      initial={{ scale: 0 }}
                      animate={{ scale: 1 }}
                      className="absolute -top-1 -right-1 w-5 h-5 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] rounded-full flex items-center justify-center shadow-lg"
                    >
                      <span className="text-black text-xs font-bold">{cartCount}</span>
                    </motion.div>
                  )}
                </motion.button>
              </SheetTrigger>
              <SheetContent className="w-full sm:max-w-lg overflow-y-auto bg-[#1A1A1A] border-l border-[#E1AD01]/20">
                <SheetHeader>
                  <SheetTitle className="text-2xl bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                    Shopping Cart
                  </SheetTitle>
                  <SheetDescription className="text-[#D0D0D0]">
                    {cartItems.length === 0 ? "Your cart is empty" : `${cartItems.length} items in your cart`}
                  </SheetDescription>
                </SheetHeader>

                <div className="mt-8 space-y-4">
                  {cartItems.length === 0 ? (
                    <div className="text-center py-12">
                      <ShoppingCart className="w-16 h-16 mx-auto text-[#E1AD01]/50 mb-4" />
                      <p className="text-[#D0D0D0]">Your cart is empty</p>
                      <Button
                        onClick={() => {
                          setIsCartOpen(false)
                          router.push("/shop")
                        }}
                        variant="outline"
                        className="mt-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] text-black"
                      >
                        Start Shopping
                      </Button>
                    </div>
                  ) : (
                    <>
                      {cartItems.map((item) => (
                        <div
                          key={item.id}
                          className="flex gap-4 p-4 bg-[#2A2A2A] rounded-lg border border-[#E1AD01]/20"
                        >
                          <ImageWithFallback
                            src={item.image || "/placeholder.svg"}
                            alt={item.name}
                            width={16}
                            height={16}
                            className="w-4 h-4 object-cover rounded flex-shrink-0"
                          />
                          <div className="flex-1 min-w-0">
                            <h4 className="text-white font-medium text-sm truncate">{item.name}</h4>
                            <p className="text-[#E1AD01] text-sm">{item.price}</p>
                            <div className="flex items-center gap-2 mt-2">
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(item.id, item.quantity - 1)}
                                className="h-7 w-7 p-0 border-[#E1AD01]/30 text-xs"
                              >
                                -
                              </Button>
                              <span className="text-white text-sm min-w-[20px] text-center">{item.quantity}</span>
                              <Button
                                size="sm"
                                variant="outline"
                                onClick={() => updateCartQuantity(item.id, item.quantity + 1)}
                                className="h-7 w-7 p-0 border-[#E1AD01]/30 text-xs"
                              >
                                +
                              </Button>
                              <Button
                                size="sm"
                                variant="ghost"
                                onClick={() => removeFromCart(item.id)}
                                className="ml-auto text-red-500 hover:text-red-400 text-xs"
                              >
                                Remove
                              </Button>
                            </div>
                          </div>
                        </div>
                      ))}

                      <div className="border-t border-[#E1AD01]/20 pt-4 mt-4">
                        <div className="flex justify-between text-lg mb-4">
                          <span className="text-white">Total:</span>
                          <span className="text-[#E1AD01] font-bold">Rs {cartTotal.toLocaleString()}</span>
                        </div>
                        <div className="space-y-2">
                          <Button
                            onClick={() => {
                              setIsCartOpen(false)
                              router.push("/shop")
                            }}
                            className="w-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] text-black hover:from-[#FFD700] hover:to-[#E1AD01]"
                          >
                            Continue Shopping
                          </Button>
                          <Button
                            onClick={() => {
                              setIsCartOpen(false)
                              router.push("/checkout")
                            }}
                            className="w-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] text-black hover:from-[#FFD700] hover:to-[#E1AD01]"
                          >
                            Proceed to Checkout
                          </Button>
                          <Button
                            onClick={() => clearCart()}
                            variant="ghost"
                            className="w-full text-red-500 hover:text-red-400 hover:bg-red-500/10"
                          >
                            Clear Cart
                          </Button>
                        </div>
                      </div>
                    </>
                  )}
                </div>
              </SheetContent>
            </Sheet>

            {/* User Menu */}
            <div className="relative">
              <motion.button
                onClick={() => setShowLoginDropdown(!showLoginDropdown)}
                className="p-2 rounded-full hover:bg-[#E1AD01]/10 transition-all duration-300 border border-transparent hover:border-[#E1AD01]/30"
                whileHover={{ scale: 1.05 }}
                whileTap={{ scale: 0.95 }}
              >
                <User className="w-6 h-6 text-[#E1AD01]" />
              </motion.button>

              <AnimatePresence>
                {showLoginDropdown && (
                  <motion.div
                    initial={{ opacity: 0, y: -10 }}
                    animate={{ opacity: 1, y: 0 }}
                    exit={{ opacity: 0, y: -10 }}
                    className="absolute right-0 mt-2 w-64 bg-[#2A2A2A] border border-[#E1AD01]/20 rounded-xl shadow-2xl overflow-hidden"
                  >
                    {user ? (
                      <>
                        <div className="p-4 border-b border-[#E1AD01]/20">
                          <p className="text-white font-medium">{user.fullname}</p>
                          <p className="text-[#D0D0D0] text-sm">{user.email}</p>
                        </div>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowLoginDropdown(false)
                            router.push("/dashboard")
                          }}
                          className="w-full justify-start px-4 py-3 text-white hover:bg-[#E1AD01]/10 hover:text-[#E1AD01] rounded-none"
                        >
                          <Settings className="w-4 h-4 mr-2" />
                          Dashboard
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowLoginDropdown(false)
                            router.push("/dashboard")
                          }}
                          className="w-full justify-start px-4 py-3 text-white hover:bg-[#E1AD01]/10 hover:text-[#E1AD01] rounded-none"
                        >
                          <Package className="w-4 h-4 mr-2" />
                          My Orders
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowLoginDropdown(false)
                            handleLogout()
                          }}
                          className="w-full justify-start px-4 py-3 text-red-500 hover:bg-red-500/10 hover:text-red-400 rounded-none"
                        >
                          <LogOut className="w-4 h-4 mr-2" />
                          Logout
                        </Button>
                      </>
                    ) : (
                      <>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowLoginDropdown(false)
                            router.push("/login")
                          }}
                          className="w-full justify-start px-4 py-3 text-white hover:bg-[#E1AD01]/10 hover:text-[#E1AD01] rounded-none"
                        >
                          Login
                        </Button>
                        <Button
                          variant="ghost"
                          onClick={() => {
                            setShowLoginDropdown(false)
                            router.push("/signup")
                          }}
                          className="w-full justify-start px-4 py-3 text-white hover:bg-[#E1AD01]/10 hover:text-[#E1AD01] rounded-none"
                        >
                          Sign Up
                        </Button>
                      </>
                    )}
                  </motion.div>
                )}
              </AnimatePresence>
            </div>

            {/* Mobile Menu Button */}
            <button onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)} className="lg:hidden p-2 text-[#E1AD01]">
              {isMobileMenuOpen ? <X className="w-6 h-6" /> : <Menu className="w-6 h-6" />}
            </button>
          </div>
        </div>

        {/* Mobile Menu */}
        <AnimatePresence>
          {isMobileMenuOpen && (
            <motion.div
              initial={{ opacity: 0, height: 0 }}
              animate={{ opacity: 1, height: "auto" }}
              exit={{ opacity: 0, height: 0 }}
              className="lg:hidden pb-4 border-t border-[#E1AD01]/20 mt-2"
            >
              {menuItems.map((item) => (
                <div key={item.name}>
                  <Link href={item.path} onClick={() => setIsMobileMenuOpen(false)}>
                    <Button
                      variant="ghost"
                      className={`w-full justify-start text-left py-3 ${
                        pathname === item.path
                          ? "text-[#E1AD01] bg-[#E1AD01]/10"
                          : "text-white hover:text-[#E1AD01] hover:bg-[#E1AD01]/5"
                      }`}
                    >
                      <item.icon className="w-5 h-5 mr-3" />
                      {item.name}
                    </Button>
                  </Link>
                  {item.dropdown && (
                    <div className="ml-8 space-y-1">
                      {item.dropdown.map((subItem) => (
                        <Link key={subItem.name} href={subItem.path} onClick={() => setIsMobileMenuOpen(false)}>
                          <Button variant="ghost" className="w-full justify-start text-left py-2 text-[#D0D0D0]">
                            {subItem.name}
                          </Button>
                        </Link>
                      ))}
                    </div>
                  )}
                </div>
              ))}
            </motion.div>
          )}
        </AnimatePresence>
      </div>
    </nav>
  )
}
