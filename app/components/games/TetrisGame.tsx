"use client"

import { useState, useEffect, useCallback } from "react"

const BOARD_WIDTH = 10
const BOARD_HEIGHT = 20
const EMPTY_CELL = 0

const TETROMINOS = [
  { shape: [[1, 1, 1, 1]], color: "cyan" },
  {
    shape: [
      [1, 1],
      [1, 1],
    ],
    color: "yellow",
  },
  {
    shape: [
      [1, 1, 1],
      [0, 1, 0],
    ],
    color: "purple",
  },
  {
    shape: [
      [1, 1, 1],
      [1, 0, 0],
    ],
    color: "orange",
  },
  {
    shape: [
      [1, 1, 1],
      [0, 0, 1],
    ],
    color: "blue",
  },
  {
    shape: [
      [1, 1, 0],
      [0, 1, 1],
    ],
    color: "red",
  },
  {
    shape: [
      [0, 1, 1],
      [1, 1, 0],
    ],
    color: "green",
  },
]

const createEmptyBoard = () =>
  Array(BOARD_HEIGHT)
    .fill(null)
    .map(() => Array(BOARD_WIDTH).fill(EMPTY_CELL))

export default function TetrisGame() {
  const [board, setBoard] = useState(createEmptyBoard())
  const [currentPiece, setCurrentPiece] = useState(null)
  const [gameOver, setGameOver] = useState(false)
  const [score, setScore] = useState(0)

  const spawnNewPiece = useCallback(() => {
    const randomPiece = TETROMINOS[Math.floor(Math.random() * TETROMINOS.length)]
    setCurrentPiece({
      shape: randomPiece.shape,
      color: randomPiece.color,
      x: Math.floor(BOARD_WIDTH / 2) - Math.floor(randomPiece.shape[0].length / 2),
      y: 0,
    })
  }, [])

  const moveDown = useCallback(() => {
    if (!currentPiece) return
    if (checkCollision(currentPiece.shape, currentPiece.x, currentPiece.y + 1)) {
      placePiece()
      return
    }
    setCurrentPiece((prev) => ({ ...prev, y: prev.y + 1 }))
  }, [currentPiece])

  const moveLeft = useCallback(() => {
    if (!currentPiece) return
    if (!checkCollision(currentPiece.shape, currentPiece.x - 1, currentPiece.y)) {
      setCurrentPiece((prev) => ({ ...prev, x: prev.x - 1 }))
    }
  }, [currentPiece, checkCollision])

  const moveRight = useCallback(() => {
    if (!currentPiece) return
    if (!checkCollision(currentPiece.shape, currentPiece.x + 1, currentPiece.y)) {
      setCurrentPiece((prev) => ({ ...prev, x: prev.x + 1 }))
    }
  }, [currentPiece, checkCollision])

  const rotate = useCallback(() => {
    if (!currentPiece) return
    const rotatedShape = currentPiece.shape[0].map((_, index) => currentPiece.shape.map((row) => row[index]).reverse())
    if (!checkCollision(rotatedShape, currentPiece.x, currentPiece.y)) {
      setCurrentPiece((prev) => ({ ...prev, shape: rotatedShape }))
    }
  }, [currentPiece, checkCollision])

  const checkCollision = (shape, x, y) => {
    for (let row = 0; row < shape.length; row++) {
      for (let col = 0; col < shape[row].length; col++) {
        if (
          shape[row][col] &&
          (board[y + row] === undefined ||
            board[y + row][x + col] === undefined ||
            board[y + row][x + col] !== EMPTY_CELL)
        ) {
          return true
        }
      }
    }
    return false
  }

  const placePiece = () => {
    const newBoard = board.map((row) => [...row])
    currentPiece.shape.forEach((row, y) => {
      row.forEach((cell, x) => {
        if (cell !== EMPTY_CELL) {
          newBoard[y + currentPiece.y][x + currentPiece.x] = currentPiece.color
        }
      })
    })
    setBoard(newBoard)
    clearLines(newBoard)
    spawnNewPiece()
  }

  const clearLines = (board) => {
    let linesCleared = 0
    const newBoard = board.filter((row) => {
      if (row.every((cell) => cell !== EMPTY_CELL)) {
        linesCleared++
        return false
      }
      return true
    })
    while (newBoard.length < BOARD_HEIGHT) {
      newBoard.unshift(Array(BOARD_WIDTH).fill(EMPTY_CELL))
    }
    setBoard(newBoard)
    setScore((prev) => prev + linesCleared * 100)
  }

  useEffect(() => {
    if (!currentPiece) {
      spawnNewPiece()
    }
    const interval = setInterval(moveDown, 1000)
    return () => clearInterval(interval)
  }, [currentPiece, moveDown, spawnNewPiece])

  useEffect(() => {
    const handleKeyPress = (e) => {
      if (gameOver) return
      switch (e.key) {
        case "ArrowLeft":
          moveLeft()
          break
        case "ArrowRight":
          moveRight()
          break
        case "ArrowDown":
          moveDown()
          break
        case "ArrowUp":
          rotate()
          break
      }
    }
    window.addEventListener("keydown", handleKeyPress)
    return () => window.removeEventListener("keydown", handleKeyPress)
  }, [gameOver, moveDown, moveLeft, moveRight, rotate])

  return (
    <div className="flex flex-col items-center">
      <div className="mb-4 text-xl font-bold">Score: {score}</div>
      <div
        className="grid gap-px bg-gray-800 p-1"
        style={{
          gridTemplateColumns: `repeat(${BOARD_WIDTH}, 1fr)`,
          width: `${BOARD_WIDTH * 20}px`,
          height: `${BOARD_HEIGHT * 20}px`,
        }}
      >
        {board.map((row, y) =>
          row.map((cell, x) => (
            <div
              key={`${y}-${x}`}
              className={`w-5 h-5 ${
                cell !== EMPTY_CELL
                  ? `bg-${cell}`
                  : currentPiece &&
                      y >= currentPiece.y &&
                      y < currentPiece.y + currentPiece.shape.length &&
                      x >= currentPiece.x &&
                      x < currentPiece.x + currentPiece.shape[0].length &&
                      currentPiece.shape[y - currentPiece.y][x - currentPiece.x]
                    ? `bg-${currentPiece.color}`
                    : "bg-gray-900"
              }`}
            />
          )),
        )}
      </div>
      {gameOver && <div className="mt-4 text-xl font-bold text-red-500">Game Over</div>}
    </div>
  )
}

