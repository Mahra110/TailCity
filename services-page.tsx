"use client"

import type React from "react"

import { Navigation } from "./navigation"
import { Footer } from "./footer"
import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "motion/react"
import { Button } from "./ui/button"
import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import {
  Star,
  Clock,
  CheckCircle2,
  Award,
  Calendar,
  Home,
  Sparkles,
  MapPin,
  Users,
  Footprints,
  Shield,
  Lightbulb,
  ChevronRight,
  TrendingUp,
  Target,
  Gem,
} from "lucide-react"
import { Badge } from "./ui/badge"
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogDescription } from "./ui/dialog"
import { Input } from "./ui/input"
import { Label } from "./ui/label"
import { Textarea } from "./ui/textarea"
import { servicesAPI } from "../lib/api"
import { toast } from "sonner"
import { getStoredUser } from "../lib/api"

type ServiceCategory = "daycare" | "grooming" | "walking" | "tips" | null

interface BookingFormData {
  fullName: string
  contact: string
  petName: string
  petType: string
  preferredDate: string
  preferredTime: string
  address: string
  notes: string
}

interface Service {
  id: number
  name: string
  category: string
  description: string
  price: number
  provider_id: number
  provider_name: string
  status: string
  created_at: string
}

const DEMO_SERVICES = {
  success: true,
  services: {
    daycare: [
      {
        id: 1,
        name: "Pawsitive Care Center",
        description: "Premium daycare with outdoor play areas and professional staff",
        image: "/dog-daycare-facility-with-toys.jpg",
        features: ["Indoor/Outdoor play", "Professional staff", "Socialization activities"],
        price_per_day: 500,
        rating: 4.8,
      },
      {
        id: 2,
        name: "Happy Paws Daycare",
        description: "Comfortable daycare with experienced caretakers",
        image: "/happy-dogs-playing-daycare.jpg",
        features: ["Expert care", "Play activities", "Safe environment"],
        price_per_day: 450,
        rating: 4.6,
      },
      {
        id: 3,
        name: "Furry Friends Center",
        description: "Family-friendly daycare with personal attention",
        image: "/pets-playing-together-daycare.jpg",
        features: ["Personal attention", "Group play", "Daily updates"],
        price_per_day: 550,
        rating: 4.9,
      },
    ],
    grooming: [
      {
        id: 1,
        name: "Basic Grooming",
        description: "Bath and nail trimming",
        image: "/dog-grooming-bath.jpg",
        duration: "2 hours",
        price: 800,
        rating: 4.5,
      },
      {
        id: 2,
        name: "Full Grooming",
        description: "Bath, grooming, nail trim and styling",
        image: "/professional-dog-grooming.jpg",
        duration: "3 hours",
        price: 1500,
        rating: 4.7,
      },
      {
        id: 3,
        name: "Spa Treatment",
        description: "Luxury spa with massage and conditioning",
        image: "/dog-spa-treatment-luxury.jpg",
        duration: "4 hours",
        price: 2500,
        rating: 4.9,
      },
    ],
    walking: [
      {
        id: 1,
        name: "30-min Walk",
        description: "Quick neighborhood walk",
        image: "/dog-walking-park.png",
        duration: "30 minutes",
        price: 300,
        rating: 4.6,
      },
      {
        id: 2,
        name: "60-min Walk",
        description: "Extended walk with exercise",
        image: "/dogs-exercising-walk.jpg",
        duration: "60 minutes",
        price: 500,
        rating: 4.8,
      },
      {
        id: 3,
        name: "Adventure Walk",
        description: "Trail walk with exploration",
        image: "/dog-hiking-adventure-trail.jpg",
        duration: "90 minutes",
        price: 750,
        rating: 4.9,
      },
    ],
  },
}

export function ServicesPage() {
  const [selectedCategory, setSelectedCategory] = useState<ServiceCategory>(null)
  const [isBookingModalOpen, setIsBookingModalOpen] = useState(false)
  const [selectedService, setSelectedService] = useState<any>(null)
  const [showConfirmation, setShowConfirmation] = useState(false)
  const [isProcessing, setIsProcessing] = useState(false)
  const [services, setServices] = useState<any>([])
  const [loading, setLoading] = useState(false)
  const user = getStoredUser()

  const [formData, setFormData] = useState<BookingFormData>({
    fullName: user?.fullname || "",
    contact: "",
    petName: "",
    petType: "",
    preferredDate: "",
    preferredTime: "",
    address: "",
    notes: "",
  })

  useEffect(() => {
    const fetchServices = async () => {
      try {
        setLoading(true)
        const response = await servicesAPI.getAll()
        if (response.success) {
          setServices(response.services)
        }
      } catch (error) {
        console.error("Error fetching services:", error)
        setServices(DEMO_SERVICES.services)
        console.log("[v0] Using demo services data")
      } finally {
        setLoading(false)
      }
    }

    fetchServices()
  }, [])

  const handleBookNow = (service: any) => {
    if (!user) {
      toast.error("Please login to book a service")
      return
    }

    setSelectedService(service)
    setIsBookingModalOpen(true)
    setShowConfirmation(false)
  }

  const handleFormSubmit = async (e: React.FormEvent) => {
    e.preventDefault()

    if (!user) {
      toast.error("Please login to book a service")
      return
    }

    setIsProcessing(true)

    try {
      const bookingDate = `${formData.preferredDate}T${formData.preferredTime}:00`
      const response = await servicesAPI.bookService(
        selectedService.id,
        bookingDate,
        formData.notes || `Pet: ${formData.petName} (${formData.petType}), Contact: ${formData.contact}`,
      )

      if (response.success) {
        setShowConfirmation(true)
        toast.success("Service booked successfully!")

        // Reset form and close after 3 seconds
        setTimeout(() => {
          setFormData({
            fullName: user?.fullname || "",
            contact: "",
            petName: "",
            petType: "",
            preferredDate: "",
            preferredTime: "",
            address: "",
            notes: "",
          })
          setIsBookingModalOpen(false)
          setShowConfirmation(false)
        }, 3000)
      }
    } catch (error: any) {
      toast.error(error.message || "Failed to book service")
      setIsProcessing(false)
    }
  }

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    })
  }

  const demoDaycareServices = [
    {
      id: 1,
      name: "Pawsome Daycare Center",
      category: "daycare",
      description: "Premium daycare with indoor & outdoor play areas",
      price: 1500,
      provider_name: "DHA Phase 5, Lahore",
      status: "verified",
      image: "https://images.unsplash.com/photo-1601758228041-f3b2795255f1?w=600&q=80",
      features: ["Play Area", "Garden", "AC Rooms", "24/7 CCTV"],
    },
    {
      id: 2,
      name: "Happy Tails Pet Haven",
      category: "daycare",
      description: "Caring environment with trained staff",
      price: 1200,
      provider_name: "Gulberg III, Lahore",
      status: "verified",
      image: "https://images.unsplash.com/photo-1548767797-d8c844163c4c?w=600&q=80",
      features: ["Spacious Rooms", "Playtime", "Meals Included", "Regular Updates"],
    },
    {
      id: 3,
      name: "Fluffy Friends Daycare",
      category: "daycare",
      description: "Luxury facilities for pampered pets",
      price: 2000,
      provider_name: "Bahria Town, Lahore",
      status: "verified",
      image: "https://images.unsplash.com/photo-1560807707-8cc77767d783?w=600&q=80",
      features: ["Swimming Pool", "Spa", "Grooming", "Pet Cameras"],
    },
    {
      id: 4,
      name: "Cozy Paws Retreat",
      category: "daycare",
      description: "Home-like atmosphere for your pets",
      price: 1000,
      provider_name: "Model Town, Lahore",
      status: "verified",
      image: "https://images.unsplash.com/photo-1587300003388-59208cc962cb?w=600&q=80",
      features: ["Cozy Spaces", "Socialization", "Music Therapy", "Nap Time"],
    },
    {
      id: 5,
      name: "Whiskers & Wags Center",
      category: "daycare",
      description: "Mixed pet daycare with separate areas",
      price: 1300,
      provider_name: "Johar Town, Lahore",
      status: "verified",
      image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&q=80",
      features: ["Cat Area", "Dog Area", "Activities", "Fresh Food"],
    },
    {
      id: 6,
      name: "Playful Pups Paradise",
      category: "daycare",
      description: "Active daycare with agility training",
      price: 1800,
      provider_name: "Cantt, Lahore",
      status: "verified",
      image: "https://images.unsplash.com/photo-1576201836106-db1758fd1c97?w=600&q=80",
      features: ["Agility Course", "Training", "Large Yard", "Professional Staff"],
    },
  ]

  const demoGroomingServices = [
    {
      id: 7,
      name: "Full Spa Package",
      category: "grooming",
      description: "Complete grooming with spa treatment",
      price: 3500,
      provider_name: "Premium Groomer",
      status: "available",
      duration: "3-4 hours",
      image: "https://images.unsplash.com/photo-1582279388783-33d6c2c50b61?w=600&q=80",
      features: ["Aromatherapy Bath", "Deep Conditioning", "Relaxing Massage", "Nail Trim"],
    },
    {
      id: 8,
      name: "Basic Grooming",
      category: "grooming",
      description: "Essential grooming services",
      price: 1500,
      provider_name: "Standard Groomer",
      status: "available",
      duration: "1-2 hours",
      image: "https://images.unsplash.com/photo-1544378730-d0df92f5f87a?w=600&q=80",
      features: ["Bath", "Brush", "Nail Trim", "Ear Cleaning"],
    },
    {
      id: 9,
      name: "Luxury Spa Treatment",
      category: "grooming",
      description: "Premium spa experience for pets",
      price: 5000,
      provider_name: "Elite Groomer",
      status: "available",
      duration: "4-5 hours",
      image: "https://images.unsplash.com/photo-1583337130417-3346a1be7dee?w=600&q=80",
      features: ["Hydrotherapy", "Massage", "Conditioning", "Pawdicure"],
    },
    {
      id: 10,
      name: "Quick Wash & Dry",
      category: "grooming",
      description: "Fast and efficient cleaning",
      price: 800,
      provider_name: "Express Groomer",
      status: "available",
      duration: "30-45 mins",
      image: "https://images.unsplash.com/photo-1537151608828-ea2b11777ee8?w=600&q=80",
      features: ["Quick Wash", "Blow Dry", "Brush Out", "Deodorizer"],
    },
    {
      id: 11,
      name: "Haircut & Styling",
      category: "grooming",
      description: "Professional grooming and styling",
      price: 2500,
      provider_name: "Style Expert",
      status: "available",
      duration: "2-3 hours",
      image: "https://images.unsplash.com/photo-1517849845537-4d257902454a?w=600&q=80",
      features: ["Custom Cut", "Styling", "Shampoo", "Finishing Spray"],
    },
    {
      id: 12,
      name: "Teeth & Nails Care",
      category: "grooming",
      description: "Dental and nail care service",
      price: 1200,
      provider_name: "Health Specialist",
      status: "available",
      duration: "45-60 mins",
      image: "https://images.unsplash.com/photo-1555169062-01346847731?w=600&q=80",
      features: ["Teeth Cleaning", "Nail Trim", "Paw Massage", "Breath Freshener"],
    },
    {
      id: 13,
      name: "Flea & Tick Treatment",
      category: "grooming",
      description: "Specialized pest control grooming",
      price: 2000,
      provider_name: "Pest Control Expert",
      status: "available",
      duration: "1-2 hours",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
      features: ["Medicated Bath", "Treatment", "Prevention", "Follow-up"],
    },
    {
      id: 14,
      name: "Puppy/Kitten First Groom",
      category: "grooming",
      description: "Gentle introduction to grooming",
      price: 1000,
      provider_name: "Gentle Groomer",
      status: "available",
      duration: "1 hour",
      image: "https://images.unsplash.com/photo-1591956894019-be16fc95a0d3?w=600&q=80",
      features: ["Gentle Bath", "Soft Brush", "Nail Check", "Treats Included"],
    },
  ]

  const demoWalkingServices = [
    {
      id: 15,
      name: "Daily Walk Package",
      category: "walking",
      description: "30-minute daily walks around your neighborhood",
      price: 500,
      provider_name: "Professional Walker",
      status: "available",
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1548199973-03cce0bbc87b?w=600&q=80",
      features: ["Neighborhood Walk", "Light Exercise", "Photo Updates", "Water Break"],
    },
    {
      id: 16,
      name: "Power Walk",
      category: "walking",
      description: "60-minute energetic walk with jogging",
      price: 800,
      provider_name: "Fitness Walker",
      status: "available",
      duration: "60 min",
      image: "https://images.unsplash.com/photo-1518021815818-a0eb4a67e5ad?w=600&q=80",
      features: ["Park Visit", "Jogging Session", "Play Time", "GPS Tracking"],
    },
    {
      id: 17,
      name: "Group Walk",
      category: "walking",
      description: "Socialization walk with other friendly dogs",
      price: 400,
      provider_name: "Group Coordinator",
      status: "available",
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1541364983171-a8ba01e95cfc?w=600&q=80",
      features: ["Social Time", "Multiple Dogs", "Supervised Play", "Affordable"],
    },
    {
      id: 18,
      name: "Park Adventure",
      category: "walking",
      description: "Extended park visit with off-leash time",
      price: 1200,
      provider_name: "Adventure Guide",
      status: "available",
      duration: "90 min",
      image: "https://images.unsplash.com/photo-1544197150-b99a580bb7a8?w=600&q=80",
      features: ["Park Access", "Off-Leash Time", "Fetch Games", "Full Report"],
    },
    {
      id: 19,
      name: "Senior Dog Stroll",
      category: "walking",
      description: "Gentle walk for older or less active dogs",
      price: 600,
      provider_name: "Senior Care Specialist",
      status: "available",
      duration: "30 min",
      image: "https://images.unsplash.com/photo-1596854372407-baba8f6baada?w=600&q=80",
      features: ["Slow Pace", "Frequent Breaks", "Extra Care", "Loving Attention"],
    },
    {
      id: 20,
      name: "Puppy Training Walk",
      category: "walking",
      description: "Walk combined with basic training",
      price: 900,
      provider_name: "Training Walker",
      status: "available",
      duration: "45 min",
      image: "https://images.unsplash.com/photo-1561037404-61cd46aa615b?w=600&q=80",
      features: ["Leash Training", "Commands", "Socialization", "Patience Building"],
    },
  ]

  const allDaycareServices = services.daycare?.length > 0 ? services.daycare : demoDaycareServices

  const allGroomingServices = services.grooming?.length > 0 ? services.grooming : demoGroomingServices

  const allWalkingServices = services.walking?.length > 0 ? services.walking : demoWalkingServices

  const categories = [
    {
      id: "daycare" as ServiceCategory,
      title: "Pet Daycare",
      icon: Home,
      description: "Safe and fun daycare centers",
      count: allDaycareServices.length + " Centers", // Use combined services count
      emoji: "🏠",
      gradient: "from-blue-400 via-blue-500 to-indigo-500",
    },
    {
      id: "grooming" as ServiceCategory,
      title: "Pet Grooming",
      icon: Sparkles,
      description: "Professional grooming & spa",
      count: allGroomingServices.length + " Services", // Use combined services count
      emoji: "✨",
      gradient: "from-pink-400 via-rose-500 to-pink-500",
    },
    {
      id: "walking" as ServiceCategory,
      title: "Dog Walking",
      icon: Footprints,
      description: "Daily walks & exercise",
      count: allWalkingServices.length + " Packages", // Use combined services count
      emoji: "🐾",
      gradient: "from-green-400 via-emerald-500 to-teal-500",
    },
    {
      id: "tips" as ServiceCategory,
      title: "Pet Care Tips",
      icon: Lightbulb,
      description: "Expert advice & guides",
      count: "50+ Tips",
      emoji: "💡",
      gradient: "from-amber-400 via-orange-500 to-amber-500",
    },
  ]

  // Pet Care Tips
  const petCareTips = [
    {
      id: 1,
      category: "Essential Pet Care",
      icon: Home,
      emoji: "🏠",
      image: "https://images.unsplash.com/photo-1450778869180-41d0601e046e?w=600&q=80",
      gradient: "from-blue-500 via-cyan-500 to-teal-500",
      tips: [
        {
          icon: "🏃‍♂️",
          title: "Daily Exercise is Crucial",
          description:
            "Dogs need 30-120 minutes of exercise daily depending on breed and age. Cats benefit from 15-30 minutes of active play. Regular physical activity prevents obesity, reduces anxiety, and promotes cardiovascular health.",
        },
        {
          icon: "🍽️",
          title: "Premium Nutrition Matters",
          description:
            "Invest in high-quality pet food with real meat as the first ingredient. Avoid fillers, artificial colors, and by-products. Consult your vet for breed-specific dietary recommendations and portion control.",
        },
        {
          icon: "🦷",
          title: "Dental Health Prevents Disease",
          description:
            "Brush your pet's teeth 2-3 times weekly using pet-safe toothpaste. Dental disease can lead to serious health issues affecting the heart, liver, and kidneys. Annual dental cleanings are recommended.",
        },
        {
          icon: "💉",
          title: "Preventive Veterinary Care",
          description:
            "Schedule annual wellness exams, even if your pet seems healthy. Early detection of issues like kidney disease, diabetes, or arthritis significantly improves treatment outcomes and quality of life.",
        },
        {
          icon: "🧠",
          title: "Mental Enrichment Activities",
          description:
            "Provide puzzle feeders, interactive toys, and training sessions. Mental stimulation is as important as physical exercise. Bored pets often develop destructive behaviors and anxiety.",
        },
        {
          icon: "✂️",
          title: "Regular Grooming Schedule",
          description:
            "Establish a consistent grooming routine including brushing, bathing, nail trimming, and ear cleaning. This prevents matting, skin infections, and allows early detection of lumps, parasites, or skin issues.",
        },
      ],
    },
    {
      id: 2,
      category: "Health & Wellness",
      icon: Shield,
      emoji: "💚",
      image: "https://images.unsplash.com/photo-15554628866-0f72752e6a02?w=600&q=80",
      gradient: "from-pink-500 via-rose-500 to-red-500",
      tips: [
        {
          icon: "🧼",
          title: "Hygiene Maintenance",
          description:
            "Clean food and water bowls daily to prevent bacterial growth. Wash bedding weekly in hot water. Regular bathing (every 4-8 weeks for dogs) maintains healthy skin and coat. Over-bathing can strip natural oils.",
        },
        {
          icon: "🛏️",
          title: "Orthopedic Bedding",
          description:
            "Provide supportive, comfortable bedding especially for senior pets or those with arthritis. Memory foam beds help distribute weight and reduce pressure on joints, promoting better sleep and mobility.",
        },
        {
          icon: "💧",
          title: "Hydration is Essential",
          description:
            "Ensure fresh water is always available. Dehydration can cause kidney problems, urinary issues, and overheating. Consider a pet water fountain to encourage drinking, as many pets prefer running water.",
        },
        {
          icon: "💉",
          title: "Vaccination Protocol",
          description:
            "Follow your veterinarian's recommended vaccination schedule. Core vaccines prevent deadly diseases like rabies, distemper, and parvovirus. Non-core vaccines depend on lifestyle and geographic risk factors.",
        },
        {
          icon: "⚖️",
          title: "Weight Management",
          description:
            "Monitor your pet's body condition score monthly. Obesity shortens lifespan by 2+ years and increases risk of diabetes, arthritis, and heart disease. Feed measured portions and limit treats to 10% of daily calories.",
        },
        {
          icon: "🚑",
          title: "Emergency Preparedness",
          description:
            "Keep a pet first aid kit with bandages, antiseptic, tweezers, and emergency contacts. Know the location of the nearest 24-hour emergency vet. Learn pet CPR and the Heimlich maneuver.",
        },
      ],
    },
    {
      id: 3,
      category: "Training & Behavior",
      icon: Target,
      emoji: "🎯",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=600&q=80",
      gradient: "from-green-500 via-emerald-500 to-teal-500",
      tips: [
        {
          icon: "🤝",
          title: "Critical Socialization Period",
          description:
            "Puppies have a critical socialization window between 3-14 weeks. Expose them to various people, animals, environments, sounds, and surfaces. Proper socialization prevents fear-based aggression and anxiety disorders.",
        },
        {
          icon: "🎓",
          title: "Positive Reinforcement Training",
          description:
            "Reward desired behaviors immediately with treats, praise, or play. Never use physical punishment which damages trust and causes fear. Consistency and patience are key - training is a lifelong process.",
        },
        {
          icon: "🧘‍♀️",
          title: "Stress Reduction Techniques",
          description:
            "Recognize stress signals like panting, pacing, or hiding. Provide safe spaces, calming music, and pheromone diffusers. Maintain consistent routines as sudden changes increase anxiety levels.",
        },
        {
          icon: "🎪",
          title: "Environmental Enrichment",
          description:
            "Rotate toys weekly to maintain novelty. Use food puzzles to make meals mentally challenging. Create obstacle courses or hide treats for scent work. Boredom leads to destructive behaviors.",
        },
        {
          icon: "👥",
          title: "Supervised Social Interactions",
          description:
            "Arrange playdates with compatible, vaccinated pets. Dog parks require careful monitoring and understanding of canine body language. Not all pets enjoy group interactions - respect individual preferences.",
        },
        {
          icon: "❤️",
          title: "Quality Bonding Time",
          description:
            "Dedicate 15-30 minutes daily for one-on-one interaction without distractions. This strengthens your bond, reduces anxiety, and allows you to notice subtle health or behavior changes early.",
        },
      ],
    },
    {
      id: 4,
      category: "Nutrition Science",
      icon: Gem,
      emoji: "🥗",
      image: "https://images.unsplash.com/photo-1623387641168-d9803ddd3f35?w=600&q=80",
      gradient: "from-amber-500 via-orange-500 to-red-500",
      tips: [
        {
          icon: "🍖",
          title: "Protein Quality Matters",
          description:
            "Choose foods with named meat sources (chicken, beef, salmon) as the first ingredient. Avoid generic terms like 'meat meal' or 'animal by-products.' High-quality protein supports muscle maintenance and immune function.",
        },
        {
          icon: "📊",
          title: "Read Nutrition Labels",
          description:
            "Look for AAFCO certification ensuring complete and balanced nutrition. Check guaranteed analysis for minimum protein (22-32% for dogs, 26-40% for cats) and fat content. Avoid foods with excessive fillers.",
        },
        {
          icon: "🚫",
          title: "Toxic Food Awareness",
          description:
            "Never feed chocolate, grapes, raisins, onions, garlic, xylitol, or macadamia nuts. These cause serious health emergencies. Keep trash secured and educate family members about dangerous foods.",
        },
        {
          icon: "⏰",
          title: "Feeding Schedule Consistency",
          description:
            "Feed adult pets twice daily at consistent times to regulate digestion and metabolism. Free feeding can lead to obesity. Puppies and kittens need 3-4 smaller meals. Remove uneaten food after 15-20 minutes.",
        },
        {
          icon: "💊",
          title: "Supplement Wisely",
          description:
            "Most quality pet foods provide complete nutrition. Consult your vet before adding supplements. Omega-3s, glucosamine, and probiotics may benefit specific conditions when properly dosed.",
        },
        {
          icon: "🌡️",
          title: "Life Stage Nutrition",
          description:
            "Nutritional needs change with age. Puppies/kittens need higher calories and protein. Senior pets benefit from joint support and lower calories. Transition foods gradually over 7-10 days to prevent digestive upset.",
        },
      ],
    },
  ]

  const stats = [
    { icon: Users, value: "10,000+", label: "Happy Pets", emoji: "🐾" },
    { icon: Award, value: "500+", label: "Certified Experts", emoji: "⭐" },
    { icon: Star, value: "4.9/5", label: "Average Rating", emoji: "💯" },
    { icon: TrendingUp, value: "98%", label: "Satisfaction", emoji: "😊" },
  ]

  const containerVariants = {
    hidden: { opacity: 0 },
    visible: {
      opacity: 1,
      transition: {
        staggerChildren: 0.08,
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

  const floatingAnimation = {
    y: [0, -10, 0],
    transition: {
      duration: 3,
      repeat: Number.POSITIVE_INFINITY,
      ease: "easeInOut",
    },
  }

  return (
    <>
      <Navigation />
      <div className="min-h-screen bg-[#1A1A1A] relative overflow-hidden">
        {/* Hero Section */}
        <motion.section
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          className="relative py-16 overflow-hidden bg-gradient-to-br from-[#2A2A2A] via-[#1A1A1A] to-[#2A2A2A]"
        >
          {/* Animated Background Blobs */}
          <div className="absolute inset-0 overflow-hidden opacity-10">
            <motion.div
              animate={{ x: [0, 50, 0], y: [0, 30, 0] }}
              transition={{ duration: 8, repeat: Number.POSITIVE_INFINITY }}
              className="absolute top-20 right-20 w-96 h-96 bg-gradient-to-br from-[#E1AD01] to-pink-500 rounded-full blur-3xl"
            />
            <motion.div
              animate={{ x: [0, -50, 0], y: [0, -30, 0] }}
              transition={{ duration: 10, repeat: Number.POSITIVE_INFINITY, delay: 1 }}
              className="absolute bottom-40 left-20 w-80 h-80 bg-gradient-to-br from-pink-500 to-[#E1AD01] rounded-full blur-3xl"
            />
          </div>

          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
            <motion.h1
              initial={{ scale: 0, rotate: -180 }}
              animate={{ scale: 1, rotate: 0 }}
              transition={{ delay: 0.2, type: "spring", stiffness: 200 }}
              className="text-5xl md:text-6xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold"
            >
              Premium Pet Care Services
            </motion.h1>

            <motion.p
              initial={{ y: 20, opacity: 0 }}
              animate={{ y: 0, opacity: 1 }}
              transition={{ delay: 0.3 }}
              className="text-lg md:text-xl text-[#D0D0D0] max-w-3xl mx-auto mb-10 leading-relaxed"
            >
              Complete pet care solutions - daycare, grooming, walks, and expert tips for your beloved friends
            </motion.p>

            {selectedCategory && (
              <motion.div initial={{ opacity: 0, y: 10 }} animate={{ opacity: 1, y: 0 }}>
                <Button
                  onClick={() => setSelectedCategory(null)}
                  className="bg-[#2A2A2A] text-[#E1AD01] hover:bg-[#E1AD01]/10 rounded-full px-8 py-5 text-base shadow-2xl border-2 border-[#E1AD01]/30 hover:border-[#E1AD01] transition-all"
                >
                  ← Back to Services
                </Button>
              </motion.div>
            )}
          </div>
        </motion.section>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16">
          <AnimatePresence mode="wait">
            {!selectedCategory ? (
              // Category Selection View - COMPACT
              <motion.div
                key="categories"
                variants={containerVariants}
                initial="hidden"
                animate="visible"
                exit={{ opacity: 0 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold">
                    Choose Your Service
                  </h2>
                  <p className="text-[#D0D0D0] text-lg max-w-2xl mx-auto">Select a category to explore our services</p>
                </div>

                <div className="grid md:grid-cols-2 gap-6 mb-16">
                  {categories.map((category, idx) => (
                    <motion.div
                      key={category.id}
                      variants={itemVariants}
                      whileHover={{ y: -6, scale: 1.01 }}
                      whileTap={{ scale: 0.98 }}
                    >
                      <Card
                        className="cursor-pointer overflow-hidden border-2 border-[#E1AD01]/20 hover:border-[#E1AD01]/60 hover:shadow-2xl transition-all duration-300 h-full group bg-[#2A2A2A] rounded-2xl"
                        onClick={() => setSelectedCategory(category.id)}
                      >
                        <div className={`h-1 bg-gradient-to-r from-[#E1AD01] to-[#FFD700]`}></div>
                        <CardContent className="p-8">
                          <div className="flex items-center justify-between mb-4">
                            <div className="text-5xl">{category.emoji}</div>
                            <Badge className="bg-gradient-to-r from-[#E1AD01]/20 to-[#FFD700]/20 text-[#E1AD01] hover:from-[#E1AD01]/30 hover:to-[#FFD700]/30 px-3 py-1 text-xs rounded-full border-2 border-[#E1AD01]/30">
                              {category.count}
                            </Badge>
                          </div>
                          <h3 className="text-2xl mb-2 text-white group-hover:text-[#E1AD01] transition-colors font-bold">
                            {category.title}
                          </h3>
                          <p className="text-[#D0D0D0] text-sm mb-4">{category.description}</p>
                          <div className="flex items-center text-[#E1AD01] group-hover:translate-x-2 transition-transform text-sm">
                            <span className="mr-2">Explore</span>
                            <ChevronRight className="w-4 h-4" />
                          </div>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </div>

                {/* Why Choose Us */}
                <motion.div
                  variants={itemVariants}
                  className="bg-gradient-to-br from-[#2A2A2A] to-[#1A1A1A] rounded-3xl p-12 border-2 border-[#E1AD01]/30 shadow-xl"
                >
                  <div className="text-center mb-12">
                    <h2 className="text-4xl md:text-5xl mb-4 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold">
                      Why Choose TailCity?
                    </h2>
                    <p className="text-[#D0D0D0] text-lg">
                      We're committed to providing the best care for your furry friends!
                    </p>
                  </div>
                  <div className="grid md:grid-cols-3 gap-8">
                    {[
                      {
                        title: "Verified & Trusted",
                        desc: "All providers are verified, insured, and background-checked for your peace of mind",
                      },
                      {
                        title: "Certified Experts",
                        desc: "Our team consists of certified professionals with years of loving pet care experience",
                      },
                      {
                        title: "Genuine Care",
                        desc: "We treat every pet with love and attention as if they were our own family members",
                      },
                      {
                        title: "Quick Booking",
                        desc: "Easy online booking system with instant confirmation and helpful reminders",
                      },
                      {
                        title: "Customized Plans",
                        desc: "Tailored services to meet your pet's specific needs and unique preferences",
                      },
                      {
                        title: "Premium Quality",
                        desc: "High-quality products and state-of-the-art facilities for the best results",
                      },
                    ].map((feature, idx) => (
                      <motion.div
                        key={idx}
                        whileHover={{ y: -8 }}
                        className="bg-[#1A1A1A] rounded-2xl p-8 text-center shadow-lg border-2 border-[#E1AD01]/20 hover:border-[#E1AD01]/40 transition-all"
                      >
                        <div className="text-5xl mb-4">
                          {(() => {
                            switch (feature.title) {
                              case "Verified & Trusted":
                                return "🛡️"
                              case "Certified Experts":
                                return "⭐"
                              case "Genuine Care":
                                return "❤️"
                              case "Quick Booking":
                                return "⚡"
                              case "Customized Plans":
                                return "🎯"
                              case "Premium Quality":
                                return "💎"
                              default:
                                return ""
                            }
                          })()}
                        </div>
                        <h3 className="text-xl mb-3 text-white font-bold">{feature.title}</h3>
                        <p className="text-[#D0D0D0] leading-relaxed">{feature.desc}</p>
                      </motion.div>
                    ))}
                  </div>
                </motion.div>
              </motion.div>
            ) : selectedCategory === "daycare" ? (
              // Pet Daycare View - COMPACT
              <motion.div
                key="daycare"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold">
                    Pet Daycare Centers
                  </h2>
                  <p className="text-[#D0D0D0] text-lg max-w-2xl mx-auto">
                    Safe and comfortable daycare centers for your beloved pets
                  </p>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {allDaycareServices.map((center: any) => (
                    <motion.div key={center.id} variants={itemVariants} whileHover={{ y: -5 }}>
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-[#E1AD01]/20 hover:border-[#E1AD01]/60 h-full rounded-2xl bg-[#2A2A2A]">
                        <div className="relative h-40">
                          <ImageWithFallback
                            src={center.image || "/placeholder.svg?height=160&width=300&query=pet daycare"}
                            alt={center.name}
                            className="w-full h-full object-cover"
                          />
                          {center.status === "verified" && (
                            <div className="absolute top-2 right-2">
                              <CheckCircle2 className="w-6 h-6 text-[#E1AD01]" />
                            </div>
                          )}
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold mb-2 text-white">{center.name}</h3>
                          <div className="flex items-center gap-1 text-[#D0D0D0] text-sm mb-3">
                            <MapPin className="w-4 h-4 text-[#E1AD01]" />
                            <span>{center.provider_name}</span> {/* Using provider_name for location */}
                          </div>
                          <div className="flex items-baseline gap-2 mb-4">
                            <span className="text-2xl font-bold bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent">
                              Rs {center.price.toLocaleString()}
                            </span>
                            <span className="text-[#D0D0D0] text-xs">/day</span>{" "}
                            {/* Hardcoded duration as it's not in Service interface */}
                          </div>
                          <div className="grid grid-cols-2 gap-2 mb-4">
                            {(center.features || ["Play Area", "Garden", "AC Rooms", "24/7 CCTV"]).map(
                              (feature: string, idx: number) => (
                                <div key={idx} className="text-xs bg-[#1A1A1A] text-[#D0D0D0] rounded-lg p-2">
                                  {feature}
                                </div>
                              ),
                            )}
                          </div>
                          <Button
                            onClick={() => handleBookNow(center)}
                            className="w-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black text-sm rounded-lg py-4 font-bold"
                          >
                            Book Now
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : selectedCategory === "grooming" ? (
              // Pet Grooming View - COMPACT
              <motion.div
                key="grooming"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold">
                    Pet Grooming Services
                  </h2>
                  <p className="text-[#D0D0D0] text-lg max-w-2xl mx-auto">Professional grooming and spa treatments</p>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 lg:grid-cols-4 gap-4"
                >
                  {allGroomingServices.map((service: any) => (
                    <motion.div key={service.id} variants={itemVariants} whileHover={{ y: -4 }}>
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-[#E1AD01]/20 hover:border-[#E1AD01]/60 h-full rounded-2xl bg-[#2A2A2A]">
                        <div className="relative h-36">
                          <ImageWithFallback
                            src={service.image || "/placeholder.svg?height=144&width=200&query=pet grooming"}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-5">
                          <h3 className="text-base font-bold mb-2 text-white">{service.name}</h3>
                          <div className="flex items-center gap-1 text-[#D0D0D0] text-xs mb-3">
                            <Clock className="w-3 h-3 text-[#E1AD01]" />
                            <span>{service.duration || service.description.substring(0, 30)}</span>
                          </div>
                          <div className="text-lg font-bold bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-3">
                            Rs {service.price.toLocaleString()}
                          </div>
                          <div className="space-y-1 mb-4">
                            {(service.features || ["Premium Bath", "Conditioning", "Styling"])
                              .slice(0, 3)
                              .map((feature: string, idx: number) => (
                                <div key={idx} className="text-xs text-[#D0D0D0] bg-[#1A1A1A] rounded p-1.5">
                                  {feature}
                                </div>
                              ))}
                          </div>
                          <Button
                            onClick={() => handleBookNow(service)}
                            className="w-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black text-xs rounded-lg py-3 font-bold"
                          >
                            Book
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : selectedCategory === "walking" ? (
              // Dog Walking View - COMPACT
              <motion.div
                key="walking"
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold">
                    Dog Walking Services
                  </h2>
                  <p className="text-[#D0D0D0] text-lg max-w-2xl mx-auto">
                    Active and fun walks for your furry friends
                  </p>
                </div>

                <motion.div
                  variants={containerVariants}
                  initial="hidden"
                  animate="visible"
                  className="grid md:grid-cols-2 lg:grid-cols-3 gap-6"
                >
                  {allWalkingServices.map((service: any) => (
                    <motion.div key={service.id} variants={itemVariants} whileHover={{ y: -5 }}>
                      <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-[#E1AD01]/20 hover:border-[#E1AD01]/60 h-full rounded-2xl bg-[#2A2A2A]">
                        <div className="relative h-40">
                          <ImageWithFallback
                            src={service.image || "/placeholder.svg?height=160&width=300&query=dog walking"}
                            alt={service.name}
                            className="w-full h-full object-cover"
                          />
                        </div>
                        <CardContent className="p-6">
                          <h3 className="text-lg font-bold mb-2 text-white">{service.name}</h3>
                          <p className="text-[#D0D0D0] text-sm mb-3">{service.description}</p>
                          <div className="text-2xl font-bold bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-4">
                            Rs {service.price.toLocaleString()}
                          </div>
                          <div className="space-y-1.5 mb-4">
                            {(service.features || ["Neighborhood Walk", "Light Exercise", "Photo Updates"]).map(
                              (feature: string, idx: number) => (
                                <div key={idx} className="text-sm text-[#D0D0D0] bg-[#1A1A1A] rounded p-2">
                                  {feature}
                                </div>
                              ),
                            )}
                          </div>
                          <Button
                            onClick={() => handleBookNow(service)}
                            className="w-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black text-sm rounded-lg py-4 font-bold"
                          >
                            Book Walk
                          </Button>
                        </CardContent>
                      </Card>
                    </motion.div>
                  ))}
                </motion.div>
              </motion.div>
            ) : (
              // Services list view - Now fetches from backend
              <motion.div
                key={selectedCategory}
                initial={{ opacity: 0, x: 20 }}
                animate={{ opacity: 1, x: 0 }}
                exit={{ opacity: 0, x: -20 }}
              >
                <div className="text-center mb-12">
                  <h2 className="text-4xl md:text-5xl mb-3 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold">
                    {selectedCategory === "daycare"
                      ? "Pet Daycare Centers"
                      : selectedCategory === "grooming"
                        ? "Pet Grooming Services"
                        : "Dog Walking Services"}
                  </h2>
                  <p className="text-[#D0D0D0] text-lg max-w-2xl mx-auto">
                    {selectedCategory === "daycare"
                      ? "Safe and comfortable daycare centers for your beloved pets"
                      : selectedCategory === "grooming"
                        ? "Professional grooming and spa treatments"
                        : "Active and fun walks for your furry friends"}
                  </p>
                </div>

                {loading ? (
                  <div className="text-center py-12">
                    <p className="text-[#D0D0D0]">Loading services...</p>
                  </div>
                ) : (
                  <motion.div
                    variants={containerVariants}
                    initial="hidden"
                    animate="visible"
                    className={`grid ${
                      selectedCategory === "grooming"
                        ? "md:grid-cols-2 lg:grid-cols-4 gap-4"
                        : "md:grid-cols-2 lg:grid-cols-3 gap-6"
                    }`}
                  >
                    {services &&
                      Object.entries(services)
                        .filter(([key]) => key === selectedCategory)
                        .map(([key, value]: [string, any]) =>
                          value.map((service: any) => (
                            <motion.div key={service.id} variants={itemVariants} whileHover={{ y: -4 }}>
                              <Card className="overflow-hidden hover:shadow-2xl transition-all duration-300 border-2 border-[#E1AD01]/20 hover:border-[#E1AD01]/60 h-full rounded-2xl bg-[#2A2A2A]">
                                <div className="relative h-40 bg-gradient-to-br from-[#E1AD01]/20 to-[#FFD700]/20 flex items-center justify-center">
                                  <div className="text-6xl">
                                    {selectedCategory === "daycare"
                                      ? "🏠"
                                      : selectedCategory === "grooming"
                                        ? "✨"
                                        : "🚶"}
                                  </div>
                                </div>
                                <CardContent className="p-6">
                                  <h3 className="text-lg font-bold mb-2 text-white">{service.name}</h3>
                                  <p className="text-[#D0D0D0] text-sm mb-3">{service.description}</p>
                                  <div className="text-2xl font-bold bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent mb-4">
                                    Rs {service.price.toLocaleString()}
                                  </div>
                                  <Button
                                    onClick={() => handleBookNow(service)}
                                    className="w-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black text-sm rounded-lg py-4 font-bold"
                                  >
                                    Book Now
                                  </Button>
                                </CardContent>
                              </Card>
                            </motion.div>
                          )),
                        )}
                  </motion.div>
                )}
              </motion.div>
            )}
          </AnimatePresence>
        </div>

        {/* CTA Section */}
        {!selectedCategory && (
          <motion.section
            initial={{ opacity: 0, y: 20 }}
            whileInView={{ opacity: 1, y: 0 }}
            viewport={{ once: true }}
            className="py-20 relative overflow-hidden"
            style={{
              background: "linear-gradient(135deg, #FEF3C7 0%, #FED7AA 50%, #FDE68A 100%)",
            }}
          >
            <div className="absolute inset-0 opacity-10">
              <motion.div
                animate={{ rotate: 360 }}
                transition={{ duration: 50, repeat: Number.POSITIVE_INFINITY, ease: "linear" }}
                className="absolute top-10 right-10 text-9xl"
              >
                🌟
              </motion.div>
            </div>

            <div className="max-w-3xl mx-auto px-4 sm:px-6 lg:px-8 text-center relative z-10">
              <div className="text-7xl mb-6">🎉</div>
              <h2 className="text-4xl md:text-5xl mb-5 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold">
                Ready to Book?
              </h2>
              <p className="text-lg text-[#4A4A4A] mb-8 max-w-2xl mx-auto leading-relaxed">
                Give your pet the professional care they deserve! Our expert team is ready to make your furry friend
                super happy! 🐾
              </p>
              <Button
                onClick={() => handleBookNow("General Service")}
                className="bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black rounded-full px-12 py-6 text-xl shadow-2xl hover:shadow-3xl transition-all transform hover:scale-105"
              >
                <Calendar className="w-6 h-6 mr-3" />
                Book Now!
              </Button>
            </div>
          </motion.section>
        )}

        {/* Booking Modal */}
        <Dialog open={isBookingModalOpen} onOpenChange={setIsBookingModalOpen}>
          <DialogContent className="max-w-2xl max-h-[90vh] overflow-y-auto rounded-3xl border-2 border-[#E1AD01]/40 bg-gradient-to-b from-[#2A2A2A] to-[#1A1A1A]">
            {!showConfirmation ? (
              <>
                <DialogHeader>
                  <div className="text-5xl text-center mb-4">📅</div>
                  <DialogTitle className="text-3xl text-center bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold">
                    Book Your Service
                  </DialogTitle>
                  <DialogDescription className="text-center text-base text-[#D0D0D0]">
                    Booking for: <span className="text-[#E1AD01]">{selectedService?.name}</span>
                  </DialogDescription>
                </DialogHeader>

                <form onSubmit={handleFormSubmit} className="space-y-4 mt-6">
                  {/* Full Name */}
                  <div className="space-y-2">
                    <Label htmlFor="fullName" className="text-base flex items-center gap-2 text-white">
                      👤 Full Name
                    </Label>
                    <Input
                      id="fullName"
                      name="fullName"
                      value={formData.fullName}
                      onChange={handleInputChange}
                      placeholder="Enter your full name"
                      required
                      className="rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] py-5 text-base bg-[#1A1A1A] text-white placeholder:text-[#D0D0D0]/50"
                    />
                  </div>

                  {/* Email / Phone */}
                  <div className="space-y-2">
                    <Label htmlFor="contact" className="text-base flex items-center gap-2 text-white">
                      📧 Email or Phone Number
                    </Label>
                    <Input
                      id="contact"
                      name="contact"
                      value={formData.contact}
                      onChange={handleInputChange}
                      placeholder="email@example.com or +92-XXX-XXXXXXX"
                      required
                      className="rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] py-5 text-base bg-[#1A1A1A] text-white placeholder:text-[#D0D0D0]/50"
                    />
                  </div>

                  {/* Pet Name & Type */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="petName" className="text-base flex items-center gap-2 text-white">
                        🐾 Pet Name
                      </Label>
                      <Input
                        id="petName"
                        name="petName"
                        value={formData.petName}
                        onChange={handleInputChange}
                        placeholder="e.g. Bella"
                        required
                        className="rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] py-5 text-base bg-[#1A1A1A] text-white placeholder:text-[#D0D0D0]/50"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="petType" className="text-base flex items-center gap-2 text-white">
                        🐕 Pet Type
                      </Label>
                      <Input
                        id="petType"
                        name="petType"
                        value={formData.petType}
                        onChange={handleInputChange}
                        placeholder="e.g. Dog, Cat, Bird"
                        required
                        className="rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] py-5 text-base bg-[#1A1A1A] text-white placeholder:text-[#D0D0D0]/50"
                      />
                    </div>
                  </div>

                  {/* Preferred Date & Time */}
                  <div className="grid md:grid-cols-2 gap-4">
                    <div className="space-y-2">
                      <Label htmlFor="preferredDate" className="text-base flex items-center gap-2 text-white">
                        📅 Preferred Date
                      </Label>
                      <Input
                        id="preferredDate"
                        name="preferredDate"
                        type="date"
                        value={formData.preferredDate}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] py-5 text-base bg-[#1A1A1A] text-white"
                      />
                    </div>
                    <div className="space-y-2">
                      <Label htmlFor="preferredTime" className="text-base flex items-center gap-2 text-white">
                        ⏰ Preferred Time
                      </Label>
                      <Input
                        id="preferredTime"
                        name="preferredTime"
                        type="time"
                        value={formData.preferredTime}
                        onChange={handleInputChange}
                        required
                        className="rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] py-5 text-base bg-[#1A1A1A] text-white"
                      />
                    </div>
                  </div>

                  {/* Address / Location */}
                  <div className="space-y-2">
                    <Label htmlFor="address" className="text-base flex items-center gap-2 text-white">
                      📍 Address / Location
                    </Label>
                    <Textarea
                      id="address"
                      name="address"
                      value={formData.address}
                      onChange={handleInputChange}
                      placeholder="Enter your complete address"
                      required
                      rows={3}
                      className="rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] text-base bg-[#1A1A1A] text-white placeholder:text-[#D0D0D0]/50"
                    />
                  </div>

                  {/* Additional Notes */}
                  <div className="space-y-2">
                    <Label htmlFor="notes" className="text-base flex items-center gap-2 text-white">
                      📝 Additional Notes
                    </Label>
                    <Textarea
                      id="notes"
                      name="notes"
                      value={formData.notes}
                      onChange={handleInputChange}
                      placeholder="Any special instructions or requirements?"
                      rows={4}
                      className="rounded-xl border-2 border-[#E1AD01]/30 focus:border-[#E1AD01] text-base bg-[#1A1A1A] text-white placeholder:text-[#D0D0D0]/50"
                    />
                  </div>

                  {/* Submit Button */}
                  <Button
                    type="submit"
                    disabled={isProcessing}
                    className="w-full bg-gradient-to-r from-[#E1AD01] to-[#FFD700] hover:from-[#FFD700] hover:to-[#E1AD01] text-black rounded-xl py-5 text-base shadow-lg disabled:opacity-50"
                  >
                    {isProcessing ? "Booking..." : "Submit Booking"}
                  </Button>
                </form>
              </>
            ) : (
              <div className="py-8 text-center">
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ type: "spring", stiffness: 200 }}
                  className="text-7xl mb-4"
                >
                  🎉
                </motion.div>
                <motion.h3
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.2 }}
                  className="text-2xl mb-3 bg-gradient-to-r from-[#E1AD01] to-[#FFD700] bg-clip-text text-transparent font-bold"
                >
                  Your booking has been received!
                </motion.h3>
                <motion.p
                  initial={{ y: 20, opacity: 0 }}
                  animate={{ y: 0, opacity: 1 }}
                  transition={{ delay: 0.3 }}
                  className="text-lg text-[#D0D0D0]"
                >
                  Our team will contact you soon. 📞
                </motion.p>
                <motion.div
                  initial={{ scale: 0 }}
                  animate={{ scale: 1 }}
                  transition={{ delay: 0.5 }}
                  className="mt-6 flex justify-center gap-4"
                >
                  <CheckCircle2 className="w-12 h-12 text-[#E1AD01]" />
                </motion.div>
              </div>
            )}
          </DialogContent>
        </Dialog>
      </div>
      <Footer />
    </>
  )
}
