import { Instagram, Linkedin, Gamepad } from "lucide-react"
import Link from "next/link"

export default function JoinCommunity() {
  const socials = [
    { name: "Instagram", icon: Instagram, url: "https://www.instagram.com/alstudio.in", color: "hover:text-[#E4405F]" },
    {
      name: "LinkedIn",
      icon: Linkedin,
      url: "https://www.linkedin.com/company/al-studios-in",
      color: "hover:text-[#0077B5]",
    },
    { name: "itch.io", icon: Gamepad, url: "https://al-studioss.itch.io/", color: "hover:text-[#FA5C5C]" },
  ]

  return (
    <div className="retro-panel">
      <h2 className="text-2xl font-press-start-2p text-white mb-6">Join Our Community</h2>
      <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
        {socials.map((social) => (
          <Link
            key={social.name}
            href={social.url}
            className={`flex flex-col items-center p-4 rounded-lg bg-black/30 
                       transition-all duration-300 hover:scale-105 ${social.color}`}
          >
            <social.icon size={32} className="mb-2" />
            <span className="text-sm font-press-start-2p">{social.name}</span>
          </Link>
        ))}
      </div>
    </div>
  )
}

