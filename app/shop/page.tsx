import Image from "next/image"

const products = [
  {
    name: "Comet Knockout",
    price: "Free",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/comet%20knockout%20-SZUvi3qN72lNPi5SoOSIdLQQF5jwzE.jpeg",
    description: "Fast-paced cosmic battle arena",
    status: "Coming Soon",
  },
  {
    name: "Abyss",
    price: "Free",
    image: "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/abyss-zRHjRS9O2orCSAxNRWKgzB3QSvIaKB.png",
    description: "Explore the depths of a cyberpunk world",
    status: "Released",
    downloadUrl: "https://al-studioss.itch.io/abyss",
  },
  {
    name: "Moonlight Vendetta",
    price: "Free",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/moonlight%20vendetta-lxM4PcILfRQs7swUdLKSZNuXDxZg8r.jpeg",
    description: "A tale of revenge under the moonlight",
    status: "Coming Soon",
  },
  {
    name: "Nixie Run",
    price: "Free",
    image:
      "https://hebbkx1anhila5yf.public.blob.vercel-storage.com/nixie%20run%20.jpg-NMOCDor7Yuy6u2NHNsMu3dmT6BPcK0.jpeg",
    description: "Run and jump with Nixie in this adorable adventure",
    status: "Coming Soon",
  },
]

export default function Shop() {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-4xl font-press-start-2p mb-8 text-center text-white glow-text">Game Store</h1>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {products.map((product, index) => (
          <div key={index} className="retro-panel p-4 hover:scale-105 transition-transform duration-300">
            <div className="relative h-48 mb-4">
              <Image
                src={product.image || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover rounded-lg"
              />
            </div>
            <h2 className="text-xl font-press-start-2p text-white mb-2">{product.name}</h2>
            <p className="text-purple-300 mb-2">{product.description}</p>
            <p className="text-cyan-400 font-press-start-2p">{product.price}</p>
            {product.status === "Released" ? (
              <a
                href={product.downloadUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="retro-button mt-4 w-full block text-center"
              >
                Download Now
              </a>
            ) : (
              <p className="text-yellow-400 mt-4 text-center font-press-start-2p">{product.status}</p>
            )}
          </div>
        ))}
      </div>
    </div>
  )
}

