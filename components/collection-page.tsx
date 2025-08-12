"use client"

import { useState } from "react"
import Image from "next/image"
import Link from "next/link"
import { Star, Grid, List } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  image: string
  rating: number
  reviews: number
  badge: string
}

interface Collection {
  id: string
  name: string
  description: string
  heroImage: string
  products: Product[]
}

interface CollectionPageProps {
  collection: Collection
}

export default function CollectionPage({ collection }: CollectionPageProps) {
  const [sortBy, setSortBy] = useState("featured")
  const [viewMode, setViewMode] = useState<"grid" | "list">("grid")

  const sortedProducts = [...collection.products].sort((a, b) => {
    switch (sortBy) {
      case "price-low":
        return a.price - b.price
      case "price-high":
        return b.price - a.price
      case "rating":
        return b.rating - a.rating
      case "name":
        return a.name.localeCompare(b.name)
      default:
        return 0
    }
  })

  return (
    <div className="bg-white text-black">
      {/* Hero Section */}
      <div className="relative h-96 bg-gray-900">
        <Image
          src={collection.heroImage || "/placeholder.svg"}
          alt={collection.name}
          fill
          className="object-cover opacity-60"
        />
        <div className="absolute inset-0 flex items-center justify-center">
          <div className="text-center text-white max-w-4xl px-4">
            <h1 className="text-5xl lg:text-6xl font-bold mb-6">{collection.name}</h1>
            <p className="text-xl lg:text-2xl leading-relaxed">{collection.description}</p>
          </div>
        </div>
      </div>

      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> / <span>Collections</span> / <span className="text-black">{collection.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        {/* Filters and Sort */}
        <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-8">
          <div className="flex items-center space-x-4">
            <span className="text-gray-600">{collection.products.length} products</span>
          </div>

          <div className="flex items-center space-x-4">
            <Select value={sortBy} onValueChange={setSortBy}>
              <SelectTrigger className="w-48">
                <SelectValue placeholder="Sort by" />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="featured">Featured</SelectItem>
                <SelectItem value="price-low">Price: Low to High</SelectItem>
                <SelectItem value="price-high">Price: High to Low</SelectItem>
                <SelectItem value="rating">Highest Rated</SelectItem>
                <SelectItem value="name">Name A-Z</SelectItem>
              </SelectContent>
            </Select>

            <div className="flex border border-gray-300 rounded">
              <Button
                variant={viewMode === "grid" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("grid")}
                className="rounded-r-none"
              >
                <Grid className="h-4 w-4" />
              </Button>
              <Button
                variant={viewMode === "list" ? "default" : "ghost"}
                size="sm"
                onClick={() => setViewMode("list")}
                className="rounded-l-none"
              >
                <List className="h-4 w-4" />
              </Button>
            </div>
          </div>
        </div>

        {/* Products Grid */}
        <div
          className={
            viewMode === "grid" ? "grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-8" : "space-y-6"
          }
        >
          {sortedProducts.map((product) => (
            <div
              key={product.id}
              className={`bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group ${
                viewMode === "list" ? "flex" : ""
              }`}
            >
              <div className={`relative ${viewMode === "list" ? "w-48 flex-shrink-0" : "aspect-square"}`}>
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  fill
                  className="object-cover group-hover:scale-105 transition-transform duration-300"
                />
                {product.badge && (
                  <Badge className="absolute top-3 left-3 bg-yellow-400 text-black font-semibold">
                    {product.badge}
                  </Badge>
                )}
                {product.originalPrice > product.price && (
                  <Badge className="absolute top-3 right-3 bg-red-600 text-white font-bold">
                    {Math.round(((product.originalPrice - product.price) / product.originalPrice) * 100)}% OFF
                  </Badge>
                )}
              </div>

              <div className={`p-6 ${viewMode === "list" ? "flex-1" : ""}`}>
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-4 w-4 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({product.reviews})</span>
                </div>

                <h3 className="font-bold text-lg mb-3 group-hover:text-yellow-600 transition-colors">
                  <Link href={`/products/${product.id}`}>{product.name}</Link>
                </h3>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-green-600">${product.price}</span>
                    {product.originalPrice > product.price && (
                      <span className="text-lg text-gray-400 line-through">${product.originalPrice}</span>
                    )}
                  </div>
                  {product.originalPrice > product.price && (
                    <span className="text-green-600 font-semibold text-sm">
                      Save ${product.originalPrice - product.price}
                    </span>
                  )}
                </div>

                <div className="flex flex-col sm:flex-row gap-2">
                  <Button asChild className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                    <Link href={`/products/${product.id}`}>View Details</Link>
                  </Button>
                  <Button variant="outline" className="border-gray-300">
                    Add to Cart
                  </Button>
                </div>
              </div>
            </div>
          ))}
        </div>

        {/* Call to Action */}
        <div className="mt-16 bg-gray-900 text-white p-12 rounded-lg text-center">
          <h2 className="text-3xl font-bold mb-4">Need Help Choosing?</h2>
          <p className="text-xl text-gray-300 mb-8 max-w-2xl mx-auto">
            Our tool experts are here to help you find the perfect equipment for your specific needs and budget.
          </p>
          <div className="flex flex-col sm:flex-row gap-4 justify-center">
            <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
              Contact an Expert
            </Button>
            <Button size="lg" variant="outline" className="border-white text-white hover:bg-white hover:text-black">
              Tool Finder Quiz
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
