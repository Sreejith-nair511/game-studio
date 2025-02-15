"use client"

import { useState, useEffect } from "react"
import Image from "next/image"

const games = [
  {
    name: "Comet Knockout",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comet%20knockout%20-SZUvi3qN72lNPi5SoOSIdLQQF5jwzE.jpeg",
    genre: "Action",
    description: "Fast-paced cosmic battle arena",
    status: "coming soon",
  },
  {
    name: "Abyss",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abyss-zRHjRS9O2orCSAxNRWKgzB3QSvIaKB.png",
    genre: "Adventure",
    description: "Explore the depths of a cyberpunk world",
    status: "released",
    downloadUrl: "https://al-studioss.itch.io/abyss",
  },
  {
    name: "Moonlight Vendetta",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moonlight%20vendetta-lxM4PcILfRQs7swUdLKSZNuXDxZg8r.jpeg",
    genre: "RPG",
    description: "A tale of revenge under the moonlight",
    status: "coming soon",
  },
  {
    name: "Nixie Run",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nixie%20run%20.jpg-NMOCDor7Yuy6u2NHNsMu3dmT6BPcK0.jpeg",
    genre: "Platformer",
    description: "Run and jump with Nixie in this adorable adventure",
    status: "coming soon",
  },
]

export default function GameCarousel() {
  const [currentIndex, setCurrentIndex] = useState(0)

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % games.length)
    }, 3000) // Change slide every 3 seconds

    return () => clearInterval(timer)
  }, []) // Removed games.length dependency

  return (
    <div className="relative w-full overflow-hidden">
      <div className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-in-out"
          style={{
            transform: `translateX(-${currentIndex * 100}%)`,
            width: `${games.length * 100}%`,
          }}
        >
          {games.map((game, index) => (
            <div key={index} className="w-full flex-shrink-0">
              <div className="retro-panel p-2 flex items-center space-x-3 m-2">
                <div className="w-1/5 flex-shrink-0">
                  <div className="relative w-20 h-20 overflow-hidden rounded-lg">
                    <Image
                      src={game.image || "/placeholder.svg"}
                      alt={game.name}
                      fill
                      className="object-cover rounded-lg transition-transform duration-300 hover:scale-110"
                    />
                  </div>
                </div>
                <div className="w-4/5">
                  <h3 className="font-press-start-2p text-sm text-white mb-1 truncate">{game.name}</h3>
                  <p className="text-purple-300 text-xs mb-1">{game.genre}</p>
                  <p className="text-purple-300 text-xs line-clamp-2">{game.description}</p>
                  {game.status === "released" ? (
                    <a
                      href={game.downloadUrl}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="text-cyan-400 text-xs hover:underline"
                    >
                      Download Now
                    </a>
                  ) : (
                    <p className="text-yellow-400 text-xs">Coming Soon</p>
                  )}
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  )
}

