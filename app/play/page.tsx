"use client"

import { useState } from "react"
import { motion, AnimatePresence } from "framer-motion"
import Image from "next/image"
import { Gamepad2, X } from "lucide-react"
import BackButton from "../components/BackButton"
import SnakeGame from "../components/games/SnakeGame"
import QuizGame from "../components/games/QuizGame"
import MinesweeperGame from "../components/games/MinesweeperGame"
import TetrisGame from "../components/games/TetrisGame"
import MemoryCardGame from "../components/games/MemoryCardGame"

const games = [
  {
    id: "abyss",
    name: "Abyss",
    description: "Explore the depths of a cyberpunk world",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abyss-zRHjRS9O2orCSAxNRWKgzB3QSvIaKB.png",
    color: "from-blue-500 to-blue-700",
    type: "external",
  },
  {
    id: "snake",
    name: "Snake",
    description: "Classic snake game",
    image: "/images/snake-game.jpg",
    color: "from-green-500 to-green-700",
    type: "web",
  },
  {
    id: "quiz",
    name: "Quiz Game",
    description: "Test your knowledge",
    image: "/images/quiz-game.jpg",
    color: "from-yellow-500 to-yellow-700",
    type: "web",
  },
  {
    id: "minesweeper",
    name: "Minesweeper",
    description: "Classic puzzle game",
    image: "/images/minesweeper-game.jpg",
    color: "from-red-500 to-red-700",
    type: "web",
  },
  {
    id: "tetris",
    name: "Tetris",
    description: "Classic block-stacking puzzle game",
    image: "/images/tetris-game.jpg",
    color: "from-cyan-500 to-cyan-700",
    type: "web",
  },
  {
    id: "memory",
    name: "Memory Card",
    description: "Test your memory with this card-matching game",
    image: "/images/memory-card-game.jpg",
    color: "from-purple-500 to-purple-700",
    type: "web",
  },
  {
    id: "comet-knockout",
    name: "Comet Knockout",
    description: "Fast-paced cosmic battle arena",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comet%20knockout%20-SZUvi3qN72lNPi5SoOSIdLQQF5jwzE.jpeg",
    color: "from-purple-500 to-purple-700",
    type: "external",
    comingSoon: true,
  },
  {
    id: "moonlight-vendetta",
    name: "Moonlight Vendetta",
    description: "A tale of revenge under the moonlight",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moonlight%20vendetta-lxM4PcILfRQs7swUdLKSZNuXDxZg8r.jpeg",
    color: "from-indigo-500 to-indigo-700",
    type: "external",
    comingSoon: true,
  },
  {
    id: "nixie-run",
    name: "Nixie Run",
    description: "Run and jump with Nixie in this adorable adventure",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nixie%20run%20.jpg-NMOCDor7Yuy6u2NHNsMu3dmT6BPcK0.jpeg",
    color: "from-cyan-500 to-cyan-700",
    type: "external",
    comingSoon: true,
  },
]

export default function Play() {
  const [activeGame, setActiveGame] = useState<string | null>(null)
  const [isLoading, setIsLoading] = useState(false)

  const launchGame = (gameId: string) => {
    const game = games.find((g) => g.id === gameId)
    if (game && !game.comingSoon) {
      setIsLoading(true)
      setActiveGame(gameId)
      setTimeout(() => setIsLoading(false), 1000) // Simulating game load time
    }
  }

  const renderGame = (gameId: string) => {
    switch (gameId) {
      case "snake":
        return <SnakeGame />
      case "quiz":
        return <QuizGame />
      case "minesweeper":
        return <MinesweeperGame />
      case "tetris":
        return <TetrisGame />
      case "memory":
        return <MemoryCardGame />
      default:
        return <div>Game not found</div>
    }
  }

  return (
    <div className="container mx-auto px-4 py-8">
      <BackButton />

      <motion.h1
        className="text-4xl font-press-start-2p text-center text-white glow-text mb-12"
        initial={{ opacity: 0, y: -20 }}
        animate={{ opacity: 1, y: 0 }}
        transition={{ duration: 0.5 }}
      >
        Arcade Zone
      </motion.h1>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-6">
        {games.map((game, index) => (
          <motion.div
            key={game.id}
            initial={{ opacity: 0, y: 20 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: index * 0.1 }}
          >
            <motion.div
              className={`retro-panel h-64 flex flex-col items-center justify-end cursor-pointer overflow-hidden relative bg-gradient-to-br ${game.color}`}
              whileHover={{ scale: 1.05 }}
              onClick={() => launchGame(game.id)}
            >
              <Image
                src={game.image || "/placeholder.svg"}
                alt={game.name}
                layout="fill"
                objectFit="cover"
                className="opacity-50"
              />
              <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-center">
                <h2 className="text-2xl font-press-start-2p text-white mb-2 glow-text">{game.name}</h2>
                <p className="text-white text-center mb-4">{game.description}</p>
                <motion.button
                  className={`retro-button flex items-center gap-2 ${game.comingSoon ? "opacity-50 cursor-not-allowed" : ""}`}
                  whileHover={game.comingSoon ? {} : { scale: 1.1 }}
                  whileTap={game.comingSoon ? {} : { scale: 0.9 }}
                  disabled={game.comingSoon}
                >
                  <Gamepad2 size={16} />
                  {game.comingSoon ? "Coming Soon" : game.type === "web" ? "Play Now" : "Launch Game"}
                </motion.button>
              </div>
            </motion.div>
          </motion.div>
        ))}
      </div>

      <AnimatePresence>
        {activeGame && (
          <motion.div
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            exit={{ opacity: 0 }}
            className="fixed inset-0 bg-black/80 flex items-center justify-center z-50"
          >
            <motion.div
              initial={{ scale: 0.9, opacity: 0 }}
              animate={{ scale: 1, opacity: 1 }}
              exit={{ scale: 0.9, opacity: 0 }}
              className="bg-gray-900 p-8 rounded-lg w-full max-w-4xl relative"
            >
              <button
                onClick={() => setActiveGame(null)}
                className="absolute top-4 right-4 text-white hover:text-red-500 transition-colors"
              >
                <X size={24} />
              </button>
              {isLoading ? (
                <div className="flex flex-col items-center justify-center h-96">
                  <div className="w-16 h-16 border-t-4 border-blue-500 border-solid rounded-full animate-spin mb-4"></div>
                  <p className="text-white text-xl">Loading game...</p>
                </div>
              ) : (
                <div className="h-96 flex items-center justify-center">{renderGame(activeGame)}</div>
              )}
            </motion.div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  )
}

