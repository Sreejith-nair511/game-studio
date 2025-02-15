"use client"

import { useState, useEffect } from "react"
import { Mail } from "lucide-react"
import { motion } from "framer-motion"

const newsItems = [
  {
    title: "Comet Knockout: New Multiplayer Mode",
    content: "Our latest update introduces an exciting 4v4 team battle mode. Get ready for cosmic chaos!",
    date: "2025-01-28",
  },
  {
    title: "AI-Powered NPCs Coming to Abyss",
    content: "Experience more immersive interactions with our new AI-driven non-player characters.",
    date: "2025-01-25",
  },
  {
    title: "Moonlight Vendetta: VR Support",
    content: "Step into the moonlit world like never before with our upcoming VR support update.",
    date: "2025-01-22",
  },
  {
    title: "Nixie Run: Mobile Release",
    content: "Take Nixie's adventure on the go! Now available on iOS and Android devices.",
    date: "2025-01-20",
  },
]

export default function Newsletter() {
  const [email, setEmail] = useState("")
  const [subscribed, setSubscribed] = useState(false)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Here you would typically send the email to your backend
    console.log("Subscribed with email:", email)
    setSubscribed(true)
    setEmail("")
  }

  useEffect(() => {
    // Add smooth scrolling to all elements
    document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
      anchor.addEventListener("click", function (e) {
        e.preventDefault()
        const href = this.getAttribute("href")
        if (href) {
          document.querySelector(href)?.scrollIntoView({
            behavior: "smooth",
          })
        }
      })
    })
  }, [])

  return (
    <div className="container mx-auto px-4 py-8">
      <motion.div
        initial={{ opacity: 0, y: 20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
        className="max-w-4xl mx-auto"
      >
        <h1 className="text-4xl font-press-start-2p mb-8 text-center text-white glow-text">The Hyrule Letter</h1>

        <div className="retro-panel mb-8">
          <h2 className="text-2xl font-press-start-2p text-white mb-4">Subscribe to Our Newsletter</h2>
          <p className="text-purple-300 mb-6">
            Stay updated with the latest news, game releases, and exclusive content from AL Studios.
          </p>

          <form onSubmit={handleSubmit} className="flex gap-4">
            <input
              type="email"
              placeholder="Enter your email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="flex-1 bg-black bg-opacity-50 border-2 border-purple-600 rounded p-2 text-white"
              required
            />
            <button type="submit" className="retro-button">
              Subscribe
            </button>
          </form>
          {subscribed && <p className="text-green-400 mt-2">Thanks for subscribing!</p>}
        </div>

        <div className="grid gap-6">
          {newsItems.map((item, index) => (
            <motion.div
              key={index}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: index * 0.1 }}
              className="retro-panel"
            >
              <div className="flex items-center gap-4 mb-4">
                <Mail className="text-purple-400" size={24} />
                <h3 className="text-xl font-press-start-2p text-white">{item.title}</h3>
              </div>
              <p className="text-gray-300 mb-2">{item.content}</p>
              <p className="text-sm text-purple-300">{item.date}</p>
            </motion.div>
          ))}
        </div>
      </motion.div>
    </div>
  )
}

