"use client"

import { useState, useEffect } from "react"
import { motion, AnimatePresence } from "framer-motion"
import { Montserrat } from "next/font/google"

const montserrat = Montserrat({ subsets: ["latin"] })

export default function StartupAnimation() {
  const [show, setShow] = useState(true)
  const [loadingProgress, setLoadingProgress] = useState(0)
  const [showPixelArt, setShowPixelArt] = useState(false)

  useEffect(() => {
    const navbar = document.querySelector("header")
    if (navbar) navbar.style.display = "none"

    // Faster loading progress
    const interval = setInterval(() => {
      setLoadingProgress((prev) => {
        if (prev >= 100) {
          clearInterval(interval)
          return 100
        }
        return prev + 4 // Increased increment for faster loading
      })
    }, 30) // Reduced interval time

    const pixelArtTimer = setTimeout(() => setShowPixelArt(true), 500) // Reduced delay

    const timer = setTimeout(() => {
      setShow(false)
      if (navbar) navbar.style.display = "block"
      document.body.style.overflow = "auto"
    }, 3000) // Reduced total animation time

    document.body.style.overflow = "hidden"

    return () => {
      clearTimeout(timer)
      clearTimeout(pixelArtTimer)
      clearInterval(interval)
      document.body.style.overflow = "auto"
      if (navbar) navbar.style.display = "block"
    }
  }, [])

  return (
    <AnimatePresence>
      {show && (
        <motion.div
          className="fixed inset-0 z-50 bg-black flex items-center justify-center"
          initial={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.3 }} // Faster exit animation
        >
          <div className="relative flex flex-col items-center justify-center">
            <motion.div
              initial={{ opacity: 0, scale: 0.8 }}
              animate={{ opacity: 1, scale: 1 }}
              transition={{ duration: 0.3 }} // Faster intro animation
              className="relative w-48 h-48 mb-8"
            >
              <img
                src="https://hebbkx1anhila5yf.public.blob.vercel-storage.com/Screenshot_2025-01-27_135026-removebg-preview-URWVQNshdl5wnyapSLYq56u1eUyXXi.png"
                alt="AL Studios"
                className="w-full h-full object-contain pixelated"
              />
            </motion.div>

            {showPixelArt && (
              <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={{ opacity: 1, y: 0 }}
                transition={{ duration: 0.3 }} // Faster animation
                className="mb-8"
              >
                <div className="pixel-art-character w-16 h-16 bg-purple-600 animate-bounce"></div>
              </motion.div>
            )}

            <motion.div
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2, duration: 0.3 }} // Reduced delay and duration
              className={`${montserrat.className} text-center`}
            >
              <h1 className="text-3xl font-bold text-white mb-2 retro-text">AL Studios</h1>
              <p className="text-gray-400 text-lg retro-text">Rethink Gaming</p>
            </motion.div>

            <motion.div
              className="w-64 h-8 bg-gray-700 rounded-lg mt-8 overflow-hidden border-4 border-white"
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.3 }} // Reduced delay
            >
              <motion.div
                className="h-full bg-purple-600 rounded-lg"
                initial={{ width: "0%" }}
                animate={{ width: `${loadingProgress}%` }}
                transition={{ duration: 0.1 }}
              />
            </motion.div>
            <p className="text-white mt-2 text-sm retro-text">LOADING... {loadingProgress}%</p>
          </div>
        </motion.div>
      )}
    </AnimatePresence>
  )
}

