"use client"

import { useState, useEffect } from "react"

const GRID_SIZE = 10
const NUM_MINES = 15

type Cell = {
  isMine: boolean
  isRevealed: boolean
  isFlagged: boolean
  neighborMines: number
}

const createBoard = (): Cell[][] => {
  const board = Array(GRID_SIZE)
    .fill(null)
    .map(() =>
      Array(GRID_SIZE)
        .fill(null)
        .map(() => ({
          isMine: false,
          isRevealed: false,
          isFlagged: false,
          neighborMines: 0,
        })),
    )

  // Place mines
  let minesPlaced = 0
  while (minesPlaced < NUM_MINES) {
    const x = Math.floor(Math.random() * GRID_SIZE)
    const y = Math.floor(Math.random() * GRID_SIZE)
    if (!board[y][x].isMine) {
      board[y][x].isMine = true
      minesPlaced++
    }
  }

  // Calculate neighbor mines
  for (let y = 0; y < GRID_SIZE; y++) {
    for (let x = 0; x < GRID_SIZE; x++) {
      if (!board[y][x].isMine) {
        let count = 0
        for (let dy = -1; dy <= 1; dy++) {
          for (let dx = -1; dx <= 1; dx++) {
            const ny = y + dy
            const nx = x + dx
            if (ny >= 0 && ny < GRID_SIZE && nx >= 0 && nx < GRID_SIZE && board[ny][nx].isMine) {
              count++
            }
          }
        }
        board[y][x].neighborMines = count
      }
    }
  }

  return board
}

export default function MinesweeperGame() {
  const [board, setBoard] = useState<Cell[][]>(createBoard())
  const [gameOver, setGameOver] = useState(false)
  const [win, setWin] = useState(false)

  useEffect(() => {
    checkWinCondition()
  }, [gameOver]) //Fixed dependency

  const checkWinCondition = () => {
    const allNonMinesRevealed = board.every((row) => row.every((cell) => cell.isMine || cell.isRevealed))
    if (allNonMinesRevealed) {
      setWin(true)
      setGameOver(true)
    }
  }

  const revealCell = (x: number, y: number) => {
    if (gameOver || board[y][x].isRevealed || board[y][x].isFlagged) return

    const newBoard = [...board]
    newBoard[y][x].isRevealed = true

    if (newBoard[y][x].isMine) {
      setGameOver(true)
    } else if (newBoard[y][x].neighborMines === 0) {
      // Reveal neighboring cells
      for (let dy = -1; dy <= 1; dy++) {
        for (let dx = -1; dx <= 1; dx++) {
          const ny = y + dy
          const nx = x + dx
          if (ny >= 0 && ny < GRID_SIZE && nx >= 0 && nx < GRID_SIZE) {
            revealCell(nx, ny)
          }
        }
      }
    }

    setBoard(newBoard)
  }

  const toggleFlag = (x: number, y: number) => {
    if (gameOver || board[y][x].isRevealed) return

    const newBoard = [...board]
    newBoard[y][x].isFlagged = !newBoard[y][x].isFlagged
    setBoard(newBoard)
  }

  const restartGame = () => {
    setBoard(createBoard())
    setGameOver(false)
    setWin(false)
  }

  return (
    <div className="flex flex-col items-center">
      <div className="grid gap-1 mb-4">
        {board.map((row, y) => (
          <div key={y} className="flex gap-1">
            {row.map((cell, x) => (
              <button
                key={`${x}-${y}`}
                className={`w-8 h-8 flex items-center justify-center border ${
                  cell.isRevealed ? (cell.isMine ? "bg-red-500" : "bg-gray-300") : "bg-gray-200 hover:bg-gray-100"
                }`}
                onClick={() => revealCell(x, y)}
                onContextMenu={(e) => {
                  e.preventDefault()
                  toggleFlag(x, y)
                }}
              >
                {cell.isRevealed
                  ? cell.isMine
                    ? "💣"
                    : cell.neighborMines > 0
                      ? cell.neighborMines
                      : ""
                  : cell.isFlagged
                    ? "🚩"
                    : ""}
              </button>
            ))}
          </div>
        ))}
      </div>
      {gameOver && (
        <div className="text-center">
          <h2 className="text-2xl font-bold mb-4">{win ? "Congratulations! You won!" : "Game Over"}</h2>
          <button onClick={restartGame} className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600">
            Play Again
          </button>
        </div>
      )}
    </div>
  )
}

