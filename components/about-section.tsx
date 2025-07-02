import Image from "next/image"

export default function AboutSection() {
  const stats = [
    { number: "25+", label: "Years of Excellence" },
    { number: "500K+", label: "Satisfied Customers" },
    { number: "1000+", label: "Professional Tools" },
    { number: "50+", label: "Service Centers" },
  ]

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="grid lg:grid-cols-2 gap-12 items-center">
          <div className="space-y-8">
            <div>
              <h2 className="text-4xl lg:text-5xl font-bold mb-6">
                About <span className="text-yellow-400">TOOLS APEX</span>
              </h2>
              <div className="w-20 h-1 bg-yellow-400 mb-6" />
            </div>

            <div className="space-y-6 text-lg text-gray-300 leading-relaxed">
              <p>
                For over two decades, <strong className="text-white">TOOLS APEX</strong> has been at the forefront of
                professional tool innovation, delivering cutting-edge equipment that empowers professionals and DIY
                enthusiasts alike to achieve exceptional results.
              </p>

              <p>
                Our commitment to quality, durability, and performance has made us a trusted name in the industry. From
                our revolutionary ONE+ battery system to our extensive range of outdoor power equipment, we continue to
                push the boundaries of what&apos;s possible in tool technology.
              </p>

              <p>
                At TOOLS APEX, we believe that the right tools don&apos;t just complete jobs – they inspire confidence,
                enhance creativity, and transform the way you work. Every product in our lineup is designed with the
                user in mind, combining professional-grade performance with intuitive operation.
              </p>

              <p>
                We&apos;re committed to quality.
              </p>
            </div>

            <div className="grid grid-cols-2 md:grid-cols-4 gap-6">
              {stats.map((stat) => (
                <div key={stat.label} className="text-center">
                  <div className="text-3xl font-bold text-yellow-400 mb-2">{stat.number}</div>
                  <div className="text-sm text-gray-400">{stat.label}</div>
                </div>
              ))}
            </div>

            <div className="flex flex-col sm:flex-row gap-4">
              
            </div>
          </div>

          <div className="relative">
            <div className="relative overflow-hidden rounded-lg">
              <Image
                src="/placeholder.svg?height=600&width=500"
                alt="Tools Apex workshop"
                width={500}
                height={600}
                className="w-full h-96 lg:h-[500px] object-cover"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-black/40 to-transparent" />
            </div>

            {/* Floating card */}
            <div className="absolute -bottom-6 -left-6 bg-yellow-400 text-black p-6 rounded-lg shadow-xl max-w-xs">
              <h4 className="font-bold text-lg mb-2">Innovation Driven</h4>
              <p className="text-sm">
                Continuously developing new technologies to make your work easier, faster, and more efficient.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
