import "./globals.css"
import { Montserrat, Press_Start_2P } from "next/font/google"
import { ThemeProvider } from "./components/ThemeProvider"
import Header from "./components/Header"
import Footer from "./components/Footer"
import MusicPlayer from "./components/MusicPlayer"
import StartupAnimation from "./components/StartupAnimation"
import KorokChatbot from "./components/KorokChatbot"
import type React from "react" // Import React
import SmoothScroll from "./components/SmoothScroll"

const montserrat = Montserrat({ subsets: ["latin"], variable: "--font-montserrat" })
const pressStart2P = Press_Start_2P({
  weight: "400",
  subsets: ["latin"],
  variable: "--font-press-start-2p",
})

export const metadata = {
  title: "AL Studios",
  description: "Rethink Gaming",
    generator: 'v0.dev'
}

export default function RootLayout({
  children,
}: {
  children: React.ReactNode
}) {
  return (
    <html lang="en" suppressHydrationWarning>
      <body className={`${montserrat.variable} ${pressStart2P.variable} font-sans dark min-h-screen flex flex-col`}>
        <ThemeProvider>
          <SmoothScroll>
            <StartupAnimation />
            <div className="flex-grow flex flex-col">
              <div
                className="fixed inset-0 z-[-1] bg-cover bg-center bg-fixed"
                style={{
                  backgroundImage: `url('https://hebbkx1anhila5yf.public.blob.vercel-storage.com/carl-raw-m3hn2Kn5Bns-unsplash.jpg-Gyflq2UWicTgxNkqBdNRYpFtjoEbw2.jpeg')`,
                  backgroundBlendMode: "overlay",
                }}
              >
                <div className="absolute inset-0 bg-black/50 backdrop-blur-sm" />
              </div>
              <Header />
              <main className="relative flex-grow">{children}</main>
              <Footer />
              <MusicPlayer />
              <KorokChatbot />
            </div>
          </SmoothScroll>
        </ThemeProvider>
      </body>
    </html>
  )
}



import './globals.css'