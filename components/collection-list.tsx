import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"

export default function CollectionList() {
  const collections = [
    {
      name: "LAND MOWERS",
      description:
        "Professional lawn care equipment for every yard size. From compact push mowers to powerful riding mowers.",
      image: "/placeholder.svg?height=400&width=600",
      href: "/collections/land-mowers",
      features: [
        "Self-Propelled Options",
        "Mulching Capability",
        "Easy Start Technology",
        "Adjustable Cutting Heights",
      ],
    },
    {
      name: "ROTARY TILERS",
      description: "Heavy-duty soil preparation tools for gardens and landscaping. Break new ground with confidence.",
      image: "/placeholder.svg?height=400&width=600",
      href: "/collections/rotary-tilers",
      features: ["Powerful Engines", "Adjustable Tilling Width", "Forward & Reverse", "Durable Steel Tines"],
    },
  ]

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            SPECIALIZED <span className="text-yellow-400">COLLECTIONS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Explore our curated collections of specialized outdoor power equipment designed for specific tasks and
            professional results.
          </p>
        </div>

        <div className="space-y-16">
          {collections.map((collection, index) => (
            <div
              key={collection.name}
              className={`flex flex-col lg:flex-row items-center gap-12 ${
                index % 2 === 1 ? "lg:flex-row-reverse" : ""
              }`}
            >
              <div className="flex-1">
                <div className="relative overflow-hidden rounded-lg group">
                  <Image
                    src={collection.image || "/placeholder.svg"}
                    alt={collection.name}
                    width={600}
                    height={400}
                    className="w-full h-80 object-cover group-hover:scale-110 transition-transform duration-500"
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/60 to-transparent" />
                </div>
              </div>

              <div className="flex-1 space-y-6">
                <h3 className="text-3xl lg:text-4xl font-bold">
                  <span className="text-yellow-400">{collection.name.split(" ")[0]}</span>{" "}
                  <span className="text-white">{collection.name.split(" ")[1]}</span>
                </h3>

                <p className="text-lg text-gray-300 leading-relaxed">{collection.description}</p>

                <div className="grid grid-cols-2 gap-3">
                  {collection.features.map((feature) => (
                    <div key={feature} className="flex items-center space-x-2">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full" />
                      <span className="text-sm text-gray-300">{feature}</span>
                    </div>
                  ))}
                </div>

                <div className="flex flex-col sm:flex-row gap-4">
                  <Button asChild size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                    <Link href={collection.href}>Shop {collection.name}</Link>
                  </Button>
                  
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  )
}
