import Header from "@/components/header"
import Footer from "@/components/footer"
import { Search, Filter, Grid } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import Image from "next/image"

export default function ToolFinderPage() {
  const tools = [
    {
      name: "18V Cordless Drill",
      category: "Power Tools",
      price: 149,
      image: "/placeholder.svg?height=200&width=200",
      features: ["Variable Speed", "LED Light", "Keyless Chuck"],
    },
    {
      name: "40V Chainsaw",
      category: "Outdoor Power",
      price: 229,
      image: "/placeholder.svg?height=200&width=200",
      features: ["Brushless Motor", "14-inch Bar", "Tool-free Chain"],
    },
    {
      name: "18V Circular Saw",
      category: "Power Tools",
      price: 99,
      image: "/placeholder.svg?height=200&width=200",
      features: ["Laser Guide", "Bevel Capacity", "Dust Port"],
    },
  ]

  return (
    <div className="min-h-screen bg-white">
      <Header />

      {/* Hero Section */}
      <div className="bg-gray-900 text-white py-16">
        <div className="container mx-auto px-4 text-center">
          <h1 className="text-4xl lg:text-5xl font-bold mb-4">Tool Finder</h1>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Find the perfect tool for your project. Search by category, price, or specific features.
          </p>
        </div>
      </div>

      <div className="container mx-auto px-4 py-16">
        {/* Search and Filters */}
        <div className="bg-gray-50 p-8 rounded-lg mb-12">
          <div className="grid md:grid-cols-4 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Search Tools</label>
              <div className="relative">
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4" />
                <Input placeholder="Search by name or model..." className="pl-10" />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Category</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="All Categories" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">All Categories</SelectItem>
                  <SelectItem value="power-tools">Power Tools</SelectItem>
                  <SelectItem value="outdoor-power">Outdoor Power</SelectItem>
                  <SelectItem value="recreation">Recreation</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Price Range</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Any Price" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="all">Any Price</SelectItem>
                  <SelectItem value="0-50">$0 - $50</SelectItem>
                  <SelectItem value="50-100">$50 - $100</SelectItem>
                  <SelectItem value="100-200">$100 - $200</SelectItem>
                  <SelectItem value="200+">$200+</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="flex items-end">
              <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">
                <Filter className="mr-2 h-4 w-4" />
                Find Tools
              </Button>
            </div>
          </div>
        </div>

        {/* Results */}
        <div className="flex items-center justify-between mb-8">
          <h2 className="text-2xl font-bold">Search Results ({tools.length} tools found)</h2>
          <div className="flex items-center space-x-4">
            <Select defaultValue="featured">
              <SelectTrigger className="w-48">
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>
            <Button variant="outline" size="icon">
              <Grid className="h-4 w-4" />
            </Button>
          </div>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {tools.map((tool, index) => (
            <div
              key={index}
              className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
            >
              <Image
                src={tool.image || "/placeholder.svg"}
                alt={tool.name}
                width={200}
                height={200}
                className="w-full h-48 object-cover"
              />
              <div className="p-6">
                <div className="text-sm text-gray-500 mb-1">{tool.category}</div>
                <h3 className="font-bold text-lg mb-2">{tool.name}</h3>
                <div className="text-2xl font-bold text-green-600 mb-4">${tool.price}</div>
                <div className="space-y-1 mb-4">
                  {tool.features.map((feature, i) => (
                    <div key={i} className="flex items-center text-sm text-gray-600">
                      <div className="w-1 h-1 bg-yellow-400 rounded-full mr-2" />
                      {feature}
                    </div>
                  ))}
                </div>
                <Button className="w-full bg-yellow-400 text-black hover:bg-yellow-500">View Details</Button>
              </div>
            </div>
          ))}
        </div>
      </div>

      <Footer />
    </div>
  )
}
