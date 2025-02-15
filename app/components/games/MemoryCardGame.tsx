"use client"

import { useState, useEffect } from "react"
import { motion } from "framer-motion"

const CARD_PAIRS = 8
const ICONS = ["🐶", "🐱", "🐭", "🐹", "🐰", "🦊", "🐻", "🐼", "🐨", "🐯", "🦁", "🐮", "🐷", "🐸", "🐵", "🐔"]

interface Card {
  id: number
  icon: string
  isFlipped: boolean
  isMatched: boolean
}

export default function MemoryCardGame() {
  const [cards, setCards] = useState<Card[]>([])
  const [flippedCards, setFlippedCards] = useState<number[]>([])
  const [moves, setMoves] = useState(0)
  const [isGameOver, setIsGameOver] = useState(false)

  useEffect(() => {
    initializeGame()
  }, [])

  const initializeGame = () => {
    const shuffledIcons = ICONS.sort(() => Math.random() - 0.5).slice(0, CARD_PAIRS)
    const gameCards: Card[] = [...shuffledIcons, ...shuffledIcons]
      .sort(() => Math.random() - 0.5)
      .map((icon, index) => ({
        id: index,
        icon,
        isFlipped: false,
        isMatched: false,
      }))
    setCards(gameCards)
    setFlippedCards([])
    setMoves(0)
    setIsGameOver(false)
  }

  const handleCardClick = (clickedCardId: number) => {
    if (flippedCards.length === 2 || cards[clickedCardId].isFlipped || cards[clickedCardId].isMatched) return

    const newFlippedCards = [...flippedCards, clickedCardId]
    setFlippedCards(newFlippedCards)

    const newCards = cards.map((card) => (card.id === clickedCardId ? { ...card, isFlipped: true } : card))
    setCards(newCards)

    if (newFlippedCards.length === 2) {
      setMoves((prevMoves) => prevMoves + 1)
      const [firstCardId, secondCardId] = newFlippedCards
      if (cards[firstCardId].icon === cards[secondCardId].icon) {
        setCards((prevCards) =>
          prevCards.map((card) =>
            card.id === firstCardId || card.id === secondCardId ? { ...card, isMatched: true } : card,
          ),
        )
        setFlippedCards([])
      } else {
        setTimeout(() => {
          setCards((prevCards) =>
            prevCards.map((card) =>
              card.id === firstCardId || card.id === secondCardId ? { ...card, isFlipped: false } : card,
            ),
          )
          setFlippedCards([])
        }, 1000)
      }
    }

    if (newCards.every((card) => card.isMatched)) {
      setIsGameOver(true)
    }
  }

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-bold">Moves: {moves}</div>
      <div className="grid grid-cols-4 gap-4">
        {cards.map((card) => (
          <motion.div
            key={card.id}
            className={`w-16 h-16 flex items-center justify-center text-3xl cursor-pointer rounded-lg ${
              card.isFlipped || card.isMatched ? "bg-purple-500" : "bg-gray-300"
            }`}
            onClick={() => handleCardClick(card.id)}
            animate={{ rotateY: card.isFlipped || card.isMatched ? 180 : 0 }}
            transition={{ duration: 0.3 }}
          >
            {(card.isFlipped || card.isMatched) && (
              <motion.div initial={{ opacity: 0 }} animate={{ opacity: 1 }} transition={{ delay: 0.15 }}>
                {card.icon}
              </motion.div>
            )}
          </motion.div>
        ))}
      </div>
      {isGameOver && (
        <div className="mt-4 text-xl font-bold text-green-500">Congratulations! You won in {moves} moves!</div>
      )}
      <button
        className="mt-4 px-4 py-2 bg-purple-500 text-white rounded hover:bg-purple-600 transition-colors"
        onClick={initializeGame}
      >
        New Game
      </button>
    </div>
  )
}

