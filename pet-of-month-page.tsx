import { Card, CardContent } from "./ui/card"
import { ImageWithFallback } from "./figma/ImageWithFallback"
import { Award, Calendar, Heart, User } from "lucide-react"
import { motion } from "motion/react"

export function PetOfMonthPage() {
  const currentPetOfMonth = {
    name: "Max",
    breed: "Golden Retriever",
    age: "4 years",
    owner: "Jennifer Smith",
    month: "December 2024",
    story:
      "Max is an exceptional therapy dog who has touched the lives of hundreds of patients at local hospitals and nursing homes. His gentle demeanor and intuitive nature make him perfect for bringing comfort to those who need it most. Max recently completed advanced therapy dog certification and now visits pediatric wards three times a week. His favorite activities include swimming, playing fetch, and making new friends. Max's owner, Jennifer, says 'Max has an incredible gift for knowing exactly when someone needs a friend. Watching him work his magic never gets old.'",
    image: "https://images.unsplash.com/photo-1648799834307-97650bbf7298?w=800",
    achievements: [
      "Certified Therapy Dog",
      "500+ hospital visits",
      "Featured in Local News",
      "Community Hero Award 2024",
    ],
  }

  const previousWinners = [
    {
      name: "Bella",
      breed: "Persian Cat",
      month: "November 2024",
      image: "https://images.unsplash.com/photo-1574158622682-e40e69881006?w=400",
    },
    {
      name: "Charlie",
      breed: "Beagle",
      month: "October 2024",
      image: "https://images.unsplash.com/photo-1551717743499-59959800b1f6?w=400",
    },
    {
      name: "Luna",
      breed: "Siamese Cat",
      month: "September 2024",
      image: "https://images.unsplash.com/photo-1513245543132-31f507417b26?w=400",
    },
    {
      name: "Rocky",
      breed: "German Shepherd",
      month: "August 2024",
      image: "https://images.unsplash.com/photo-1568572933382-74d440642117?w=400",
    },
    {
      name: "Daisy",
      breed: "Labrador",
      month: "July 2024",
      image: "https://images.unsplash.com/photo-1558788353-f76d92427f16?w=400",
    },
    {
      name: "Simba",
      breed: "Maine Coon",
      month: "June 2024",
      image: "https://images.unsplash.com/photo-1571566882372-1598d88abd90?w=400",
    },
  ]

  return (
    <div
      className="min-h-screen overflow-hidden"
      style={{ background: "linear-gradient(180deg, #1A1A1A 0%, #0F0F0F 100%)" }}
    >
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

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8 relative z-10">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="flex items-center justify-center mb-4">
            <Award className="w-12 h-12 mr-3 text-[#E1AD01]" />
            <h1 className="text-5xl font-bold text-white">Pet of the Month</h1>
          </div>
          <p className="text-[#D0D0D0] max-w-2xl mx-auto text-lg">
            Celebrating exceptional pets and their amazing stories.
          </p>
        </div>

        {/* Featured Pet of Month */}
        <Card className="mb-12 rounded-3xl overflow-hidden shadow-2xl border-2 border-[#E1AD01]/20 bg-[#2A2A2A]">
          <div className="grid grid-cols-1 lg:grid-cols-2">
            <div className="h-96 lg:h-auto bg-gray-900">
              <ImageWithFallback
                src={currentPetOfMonth.image || "/placeholder.svg"}
                alt={currentPetOfMonth.name}
                className="w-full h-full object-cover"
              />
            </div>
            <div className="p-8 lg:p-12 flex flex-col justify-center bg-[#2A2A2A]">
              <div className="flex items-center mb-4">
                <Award className="w-8 h-8 mr-2 text-[#E1AD01]" />
                <span className="font-semibold text-[#E1AD01]">{currentPetOfMonth.month}</span>
              </div>
              <h2 className="text-4xl font-bold text-white mb-2">{currentPetOfMonth.name}</h2>
              <p className="text-xl text-[#D0D0D0] mb-2">
                {currentPetOfMonth.breed} • {currentPetOfMonth.age}
              </p>
              <div className="flex items-center text-[#D0D0D0] mb-6">
                <User className="w-5 h-5 mr-2" />
                <span>Owner: {currentPetOfMonth.owner}</span>
              </div>

              <div className="mb-6">
                <h3 className="font-semibold text-white mb-3">Story</h3>
                <p className="text-[#D0D0D0] leading-relaxed">{currentPetOfMonth.story}</p>
              </div>

              <div>
                <h3 className="font-semibold text-white mb-3">Achievements</h3>
                <div className="grid grid-cols-2 gap-2">
                  {currentPetOfMonth.achievements.map((achievement, index) => (
                    <div key={index} className="flex items-center">
                      <Heart className="w-4 h-4 mr-2 fill-current text-[#E1AD01]" />
                      <span className="text-sm text-[#D0D0D0]">{achievement}</span>
                    </div>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </Card>

        {/* Previous Winners */}
        <div className="mb-8">
          <h2 className="text-3xl font-bold text-white mb-8 text-center">Previous Winners</h2>
          <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-6">
            {previousWinners.map((winner, index) => (
              <Card
                key={index}
                className="hover:shadow-xl transition-shadow rounded-2xl overflow-hidden border-2 border-[#E1AD01]/20 hover:border-[#E1AD01] bg-[#2A2A2A]"
              >
                <div className="h-48 bg-gray-900">
                  <ImageWithFallback
                    src={winner.image || "/placeholder.svg"}
                    alt={winner.name}
                    className="w-full h-full object-cover"
                  />
                </div>
                <CardContent className="p-4">
                  <h3 className="font-semibold text-white mb-1">{winner.name}</h3>
                  <p className="text-sm text-[#D0D0D0] mb-1">{winner.breed}</p>
                  <div className="flex items-center text-xs text-[#E1AD01]">
                    <Calendar className="w-3 h-3 mr-1" />
                    {winner.month}
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </div>
    </div>
  )
}
