"use client"

import { useEffect } from "react"
import type React from "react" // Added import for React

export default function SmoothScroll({ children }: { children: React.ReactNode }) {
  useEffect(() => {
    // Add smooth scrolling to all anchor links
    const handleClick = (e: MouseEvent) => {
      const target = e.target as HTMLElement
      if (target.tagName === "A") {
        const href = target.getAttribute("href")
        if (href?.startsWith("#")) {
          e.preventDefault()
          const element = document.querySelector(href)
          if (element) {
            element.scrollIntoView({
              behavior: "smooth",
              block: "start",
            })
          }
        }
      }
    }

    document.addEventListener("click", handleClick)
    return () => document.removeEventListener("click", handleClick)
  }, [])

  return <>{children}</>
}

