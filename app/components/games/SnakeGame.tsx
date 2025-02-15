"use client"

import { useState, useEffect, useRef } from "react"

const GRID_SIZE = 20
const CELL_SIZE = 20
const INITIAL_SNAKE = [{ x: 10, y: 10 }]
const INITIAL_DIRECTION = { x: 1, y: 0 }
const INITIAL_FOOD = { x: 15, y: 15 }

export default function SnakeGame() {
  const [snake, setSnake] = useState(INITIAL_SNAKE)
  const [direction, setDirection] = useState(INITIAL_DIRECTION)
  const [food, setFood] = useState(INITIAL_FOOD)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)
  const canvasRef = useRef<HTMLCanvasElement>(null)

  useEffect(() => {
    const handleKeyPress = (e: KeyboardEvent) => {
      switch (e.key) {
        case "ArrowUp":
          if (direction.y === 0) setDirection({ x: 0, y: -1 })
          break
        case "ArrowDown":
          if (direction.y === 0) setDirection({ x: 0, y: 1 })
          break
        case "ArrowLeft":
          if (direction.x === 0) setDirection({ x: -1, y: 0 })
          break
        case "ArrowRight":
          if (direction.x === 0) setDirection({ x: 1, y: 0 })
          break
      }
    }

    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [direction])

  useEffect(() => {
    if (gameOver) return

    const moveSnake = () => {
      const newSnake = [...snake]
      const head = { ...newSnake[0] }
      head.x += direction.x
      head.y += direction.y

      if (head.x < 0 || head.x >= GRID_SIZE || head.y < 0 || head.y >= GRID_SIZE) {
        setGameOver(true)
        return
      }

      if (newSnake.some((segment) => segment.x === head.x && segment.y === head.y)) {
        setGameOver(true)
        return
      }

      newSnake.unshift(head)

      if (head.x === food.x && head.y === food.y) {
        setScore((prevScore) => prevScore + 1)
        setFood({
          x: Math.floor(Math.random() * GRID_SIZE),
          y: Math.floor(Math.random() * GRID_SIZE),
        })
      } else {
        newSnake.pop()
      }

      setSnake(newSnake)
    }

    const gameLoop = setInterval(moveSnake, 100)
    return () => clearInterval(gameLoop)
  }, [snake, direction, food, gameOver])

  useEffect(() => {
    const canvas = canvasRef.current
    if (!canvas) return

    const ctx = canvas.getContext("2d")
    if (!ctx) return

    const drawGame = () => {
      // Clear the canvas
      ctx.fillStyle = "black"
      ctx.fillRect(0, 0, canvas.width, canvas.height)

      // Draw snake
      ctx.fillStyle = "green"
      snake.forEach((segment) => {
        ctx.fillRect(segment.x * CELL_SIZE, segment.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)
      })

      // Draw food
      ctx.fillStyle = "red"
      ctx.fillRect(food.x * CELL_SIZE, food.y * CELL_SIZE, CELL_SIZE, CELL_SIZE)

      // Draw score
      ctx.fillStyle = "white"
      ctx.font = "20px Arial"
      ctx.fillText(`Score: ${score}`, 10, 30)

      if (gameOver) {
        ctx.fillStyle = "white"
        ctx.font = "40px Arial"
        ctx.fillText("Game Over", canvas.width / 2 - 100, canvas.height / 2)
      }
    }

    drawGame()
  }, [snake, food, score, gameOver])

  return (
    <div className="flex flex-col items-center">
      <canvas
        ref={canvasRef}
        width={GRID_SIZE * CELL_SIZE}
        height={GRID_SIZE * CELL_SIZE}
        className="border border-white"
      />
      {gameOver && (
        <button
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          onClick={() => {
            setSnake(INITIAL_SNAKE)
            setDirection(INITIAL_DIRECTION)
            setFood(INITIAL_FOOD)
            setGameOver(false)
            setScore(0)
          }}
        >
          Restart
        </button>
      )}
    </div>
  )
}

