"use client"

import { useState, useRef, useEffect } from "react"
import Image from "next/image"
import { motion, AnimatePresence } from "framer-motion"
import { Send, X } from "lucide-react"

interface Message {
  text: string
  isUser: boolean
  timestamp: Date
}

const GREETINGS = [
  "Ya ha ha! Found me! 🌱",
  "Hello, fellow adventurer! 🎮",
  "Ready to play some games? 🎲",
  "Ooh, a visitor! How exciting! ✨",
]

const TEAM_INFO = {
  sreejith: {
    role: "Lead Developer",
    description:
      "Sreejith is our Lead Developer, passionate about creating gaming experiences. He's an avgeek, petrolhead, and game developer with sheer human grit.",
  },
  nikhil: {
    role: "Game Developer & Multiplayer Lead",
    description: "Nikhil leads our multiplayer development and creates engaging gaming experiences.",
  },
  shibasish: {
    role: "Media Head & Marketing",
    description: "Shibasish handles our media and marketing, specializing in content creation and programming.",
  },
  navyatha: {
    role: "Creative Lead & Designer",
    description: "K Lakshmi Navyatha is our Creative Lead and Designer, translating dreams into art.",
  },
  sanjana: {
    role: "Art Lead",
    description: "Sanjana is our Art Lead, focused on creating visually captivating game experiences.",
  },
  tarani: {
    role: "Beta Tester & Character Design",
    description: "Tarani handles beta testing and character design, bringing creativity to our games.",
  },
  nithin: {
    role: "Game Developer",
    description: "Nithin is a passionate game developer creating engaging experiences.",
  },
  rohith: {
    role: "Backend Developer",
    description: "Rohith specializes in server-side technologies and database management.",
  },
  limnisha: {
    role: "UI/UX Designer",
    description: "Limnisha creates intuitive and visually appealing user interfaces for our games.",
  },
}

const GAME_INFO = {
  abyss: {
    name: "Abyss",
    description:
      "A laid-back platformer which encompasses mario, shovel knight and other legacy platformers. Made using Godot engine, this project ensured a good command of the engine and its programming language.",
    status: "Released",
    downloadUrl: "https://al-studioss.itch.io/abyss",
    features: ["Classic platformer gameplay", "Pixel art graphics", "Multiple levels", "Inspired by classic games"],
  },
  "comet knockout": {
    name: "Comet Knockout",
    description: "Fast-paced cosmic battle arena where players compete in intense space combat.",
    status: "Coming Soon",
    features: ["Multiplayer battles", "Space combat mechanics", "Various power-ups", "Multiple game modes"],
  },
}

const RESPONSES = {
  hello: ["Ya ha ha! Hello there, fellow adventurer! 🌿", "Hi friend! Ready for some gaming fun? 🎮"],
  help: ["Need help? I can tell you about our games, upcoming events, or even share some gaming tips! Just ask! 🎯"],
  games: [
    "We've got several exciting games! Abyss is available to play now, while Comet Knockout, Moonlight Vendetta, and Nixie Run are coming soon. You can also try our web games like Snake, Quiz, and Minesweeper right on our website! 🎮",
  ],
  team: ["Our team is full of passionate gamers and creators! Want to know more about a specific role? 👥"],
  events: [
    "Exciting times ahead! We've got a game jam next month and a big update for Comet Knockout coming soon. Stay tuned! 🎉",
  ],
  tips: [
    "Here's a pro tip: In Comet Knockout, try using the gravity wells to slingshot around obstacles. It's a game-changer! 💫",
  ],
  default: [
    "Hmm... that's an interesting question! Let me think... 🤔",
    "Ya ha ha! You're full of surprises! Tell me more about that. 🌟",
  ],
  team_member: (name: string) => {
    const member = TEAM_INFO[name.toLowerCase()]
    return member
      ? `${member.description} Their role is ${member.role}. 👤`
      : "I don't have information about that team member. Would you like to know about our other team members?"
  },
  game_info: (name: string) => {
    const game = GAME_INFO[name.toLowerCase()]
    if (!game) return "I don't have information about that game. Would you like to know about our other games?"

    let response = `${game.name} is ${game.description} `
    if (game.status === "Released") {
      response += `You can download it now at ${game.downloadUrl} 🎮`
    } else {
      response += `The game is currently ${game.status}. Stay tuned! 🎯`
    }
    return response
  },
  features: (name: string) => {
    const game = GAME_INFO[name.toLowerCase()]
    if (!game) return "I don't have information about that game's features."
    return `${game.name} features include: ${game.features.join(", ")} 🎮`
  },
  about: [
    "AL Studios is a passionate game development studio dedicated to creating engaging gaming experiences. We have a team of 9 talented individuals working on various exciting projects! Want to know more about our team members or games? Just ask! 🎯",
  ],
  contact: [
    "You can reach us through our social media: Instagram (@alstudio.in), LinkedIn (AL Studios), or visit our itch.io page (al-studioss.itch.io). You can also use the contact form on our website! 📧",
  ],
}

const generateResponse = (input: string) => {
  const lowercaseInput = input.toLowerCase()
  for (const [name, info] of Object.entries(GAME_INFO)) {
    if (lowercaseInput.includes(name)) {
      if (lowercaseInput.includes("feature") || lowercaseInput.includes("what can")) {
        return RESPONSES.features(name)
      }
      return RESPONSES.game_info(name)
    }
  }
  for (const [name, info] of Object.entries(TEAM_INFO)) {
    if (lowercaseInput.includes(name)) {
      return RESPONSES.team_member(name)
    }
  }
  if (lowercaseInput.includes("hello") || lowercaseInput.includes("hi"))
    return RESPONSES.hello[Math.floor(Math.random() * RESPONSES.hello.length)]
  if (lowercaseInput.includes("help")) return RESPONSES.help[0]
  if (lowercaseInput.includes("game")) return RESPONSES.games[0]
  if (lowercaseInput.includes("team")) return RESPONSES.team[0]
  if (lowercaseInput.includes("event")) return RESPONSES.events[0]
  if (lowercaseInput.includes("tip") || lowercaseInput.includes("advice")) return RESPONSES.tips[0]
  if (lowercaseInput.includes("about")) return RESPONSES.about[0]
  if (lowercaseInput.includes("contact")) return RESPONSES.contact[0]
  return RESPONSES.default[Math.floor(Math.random() * RESPONSES.default.length)]
}

export default function KorokChatbot() {
  const [isOpen, setIsOpen] = useState(false)
  const [messages, setMessages] = useState<Message[]>([])
  const [inputValue, setInputValue] = useState("")
  const [isTyping, setIsTyping] = useState(false)
  const messagesEndRef = useRef<HTMLDivElement>(null)

  useEffect(() => {
    if (isOpen && messages.length === 0) {
      const greeting = GREETINGS[Math.floor(Math.random() * GREETINGS.length)]
      setTimeout(() => {
        setMessages([{ text: greeting, isUser: false, timestamp: new Date() }])
      }, 500)
    }
  }, [isOpen, messages.length]) // Added messages.length to dependencies

  useEffect(() => {
    messagesEndRef.current?.scrollIntoView({ behavior: "smooth" })
  }, [messages])

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    if (!inputValue.trim()) return

    const userMessage = { text: inputValue, isUser: true, timestamp: new Date() }
    setMessages((prev) => [...prev, userMessage])
    setInputValue("")
    setIsTyping(true)

    // Simulate response
    setTimeout(() => {
      const response = generateResponse(inputValue)
      setMessages((prev) => [...prev, { text: response, isUser: false, timestamp: new Date() }])
      setIsTyping(false)
    }, 1000)
  }

  return (
    <div className="fixed bottom-4 right-4 z-40">
      <AnimatePresence>
        {isOpen && (
          <motion.div
            initial={{ opacity: 0, scale: 0.95, y: 20 }}
            animate={{ opacity: 1, scale: 1, y: 0 }}
            exit={{ opacity: 0, scale: 0.95, y: 20 }}
            className="mb-4 retro-panel w-80"
          >
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-lg font-press-start-2p text-white">Korok Helper</h3>
              <motion.button whileHover={{ scale: 1.1 }} whileTap={{ scale: 0.9 }} onClick={() => setIsOpen(false)}>
                <X className="text-purple-400 hover:text-purple-300" />
              </motion.button>
            </div>

            <div className="h-64 overflow-y-auto mb-4 p-2 rounded bg-black/30">
              {messages.map((message, index) => (
                <motion.div
                  key={index}
                  initial={{ opacity: 0, x: message.isUser ? 20 : -20 }}
                  animate={{ opacity: 1, x: 0 }}
                  className={`mb-2 flex ${message.isUser ? "justify-end" : "justify-start"}`}
                >
                  <div
                    className={`max-w-[80%] p-2 rounded ${
                      message.isUser ? "bg-purple-600/80 text-white" : "bg-black/50 text-purple-300"
                    }`}
                  >
                    {message.text}
                  </div>
                </motion.div>
              ))}
              {isTyping && (
                <div className="flex gap-2 text-purple-400">
                  <span className="animate-bounce">.</span>
                  <span className="animate-bounce delay-100">.</span>
                  <span className="animate-bounce delay-200">.</span>
                </div>
              )}
              <div ref={messagesEndRef} />
            </div>

            <form onSubmit={handleSubmit} className="flex gap-2">
              <input
                type="text"
                value={inputValue}
                onChange={(e) => setInputValue(e.target.value)}
                placeholder="Ask me anything..."
                className="flex-1 bg-black/30 border border-purple-600/30 rounded p-2 text-white focus:outline-none focus:border-purple-600"
              />
              <motion.button
                type="submit"
                whileHover={{ scale: 1.1 }}
                whileTap={{ scale: 0.9 }}
                className="retro-button"
              >
                <Send size={18} />
              </motion.button>
            </form>
          </motion.div>
        )}
      </AnimatePresence>

      <motion.button
        whileHover={{ scale: 1.1 }}
        whileTap={{ scale: 0.9 }}
        onClick={() => setIsOpen(!isOpen)}
        className="w-16 h-16 rounded-full bg-purple-600/80 shadow-lg hover:bg-purple-700/80 transition-colors duration-300 backdrop-blur-sm"
      >
        <Image
          src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/chatbot%20(2)-0Uj4VSKMJGWd3MWhWI17dNbQ0ajivw.gif"
          alt="Korok Chat"
          width={64}
          height={64}
          className="rounded-full"
        />
      </motion.button>
    </div>
  )
}

