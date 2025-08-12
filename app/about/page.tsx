import Header from "@/components/header"
import Footer from "@/components/footer"
import { Award, Users, Globe, Lightbulb } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function AboutPage() {
  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">About TOOLS APEX</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Empowering professionals and DIY enthusiasts with innovative tools for over 25 years.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Our Story */}
        <div className="grid lg:grid-cols-2 gap-12 items-center mb-16">
          <div>
            <h2 className="text-3xl font-bold mb-6">Our Story</h2>
            <div className="space-y-4 text-gray-700">
              <p>
                Founded in 1999, TOOLS APEX began with a simple mission: to create professional-grade tools that deliver
                exceptional performance without the premium price tag. What started as a small workshop in Ohio has
                grown into one of America&apos;s most trusted tool brands.
              </p>
              <p>
                Our breakthrough came with the introduction of the ONE+ battery system in 2005, revolutionizing how
                professionals and DIY enthusiasts approach their projects. Today, the ONE+ platform powers over 200
                tools, making it the most versatile battery system in the industry.
              </p>
              <p>
                We&apos;ve never lost sight of our core values: innovation, quality, and affordability. Every tool we create
                is designed to help you work smarter, not harder.
              </p>
            </div>
          </div>
          <div>
            <Image
              src="/placeholder.svg?height=400&width=600"
              alt="TOOLS APEX factory"
              width={600}
              height={400}
              className="rounded-lg"
            />
          </div>
        </div>

        {/* Values */}
        <div className="grid md:grid-cols-4 gap-8 mb-16">
          <div className="text-center">
            <Award className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Quality</h3>
            <p className="text-gray-600">Every tool meets our rigorous quality standards</p>
          </div>
          <div className="text-center">
            <Lightbulb className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Innovation</h3>
            <p className="text-gray-600">Continuously pushing the boundaries of tool technology</p>
          </div>
          <div className="text-center">
            <Users className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Community</h3>
            <p className="text-gray-600">Supporting professionals and DIYers worldwide</p>
          </div>
          <div className="text-center">
            <Globe className="h-12 w-12 text-yellow-400 mx-auto mb-4" />
            <h3 className="font-bold text-lg mb-2">Sustainability</h3>
            <p className="text-gray-600">Committed to environmental responsibility</p>
          </div>
        </div>

        {/* Leadership Team */}
        <div className="mb-16">
          <h2 className="text-3xl font-bold text-center mb-12">Leadership Team</h2>
          <div className="grid md:grid-cols-3 gap-8">
            {[
              {
                name: "John Smith",
                role: "Chief Executive Officer",
                image: "/placeholder.svg?height=300&width=300",
                bio: "25+ years in tool manufacturing and innovation",
              },
              {
                name: "Sarah Johnson",
                role: "Chief Technology Officer",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Leading our R&D and product development teams",
              },
              {
                name: "Mike Davis",
                role: "Chief Operations Officer",
                image: "/placeholder.svg?height=300&width=300",
                bio: "Ensuring quality and efficiency in all operations",
              },
            ].map((leader, index) => (
              <div key={index} className="text-center">
                <Image
                  src={leader.image || "/placeholder.svg"}
                  alt={leader.name}
                  width={300}
                  height={300}
                  className="w-48 h-48 rounded-full mx-auto mb-4 object-cover"
                />
                <h3 className="font-bold text-lg">{leader.name}</h3>
                <p className="text-yellow-600 font-semibold mb-2">{leader.role}</p>
                <p className="text-gray-600">{leader.bio}</p>
              </div>
            ))}
          </div>
        </div>

        {/* Call to Action */}
        <div className="bg-gray-900 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Join the TOOLS APEX Family</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Discover why millions of professionals and DIY enthusiasts trust TOOLS APEX for their projects.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
              Shop Now
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Find a Dealer
            </Button>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
