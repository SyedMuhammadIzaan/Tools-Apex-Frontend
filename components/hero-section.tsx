"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight } from "lucide-react"
import { Button } from "@/components/ui/button"
import Image from "next/image"

export default function HeroSection() {
  const [currentSlide, setCurrentSlide] = useState(0)

  const slides = [
    {
      title: "TOOLS APEX DAYS ARE BACK",
      subtitle: "Incredible savings on professional-grade tools",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Shop All TOOLS APEX DAYS Savings",
    },
    {
      title: "GET A FREE ONE+ TOOL",
      subtitle: "WHEN YOU BUY ONE OF THESE",
      image: "/placeholder.svg?height=600&width=1200",
      cta: "Learn More",
    },
  ]

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % slides.length)
  }

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + slides.length) % slides.length)
  }

  return (
    <section className="relative bg-black text-white overflow-hidden">
      <div className="relative h-[600px] lg:h-[700px]">
        {slides.map((slide, index) => (
          <div
            key={index}
            className={`absolute inset-0 transition-opacity duration-500 ${
              index === currentSlide ? "opacity-100" : "opacity-0"
            }`}
          >
            <div className="relative h-full">
              <Image
                src={slide.image || "/placeholder.svg"}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
              />
              <div className="absolute inset-0 bg-black/40" />

              <div className="absolute inset-0 flex items-center">
                <div className="container mx-auto px-4">
                  <div className="max-w-2xl mx-auto text-center">
                    <h1 className="text-4xl lg:text-6xl font-bold mb-4">
                      <span className="text-white">{"EXPLORE OUR"} </span>
                      <span className="bg-yellow-400 text-black px-2 py-1 inline-block">COLLECTIONS</span>
                      <span className="text-white"> {""}</span>
                    </h1>
                    <p className="text-xl lg:text-2xl mb-8 text-gray-200">{slide.subtitle}</p>
                  </div>
                </div>
              </div>
            </div>
          </div>
        ))}

        {/* Navigation Arrows */}
        <Button
          variant="ghost"
          size="icon"
          className="absolute left-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 hover:bg-black/50"
          onClick={prevSlide}
        >
          <ChevronLeft className="h-8 w-8" />
        </Button>
        <Button
          variant="ghost"
          size="icon"
          className="absolute right-4 top-1/2 transform -translate-y-1/2 text-white hover:text-yellow-400 hover:bg-black/50"
          onClick={nextSlide}
        >
          <ChevronRight className="h-8 w-8" />
        </Button>

        {/* Slide Indicators */}
        <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2">
          {slides.map((_, index) => (
            <button
              key={index}
              className={`w-3 h-3 rounded-full transition-colors ${
                index === currentSlide ? "bg-yellow-400" : "bg-white/50"
              }`}
              onClick={() => setCurrentSlide(index)}
            />
          ))}
        </div>
      </div>

      {/* Featured Products Heading */}
      {/* <div className="bg-black text-white text-center py-8">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl lg:text-4xl font-bold">
            FEATURED <span className="text-yellow-400">PRODUCTS</span>
          </h2>
        </div>
      </div> */}

      {/* Featured Products Strip */}
      {/* <div className="bg-gray-900 py-8">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-4">
            {[
              { name: "18V Drill Kit", price: "$149", originalPrice: "$199" },
              { name: "Circular Saw", price: "$99", originalPrice: "$129" },
              { name: "Impact Driver", price: "$179", originalPrice: "$229" },
              { name: "Tool Combo Kit", price: "$299", originalPrice: "$399" },
            ].map((product, index) => (
              <div key={index} className="bg-black p-4 rounded-lg text-center">
                <Image
                  src="/placeholder.svg?height=150&width=150"
                  alt={product.name}
                  width={150}
                  height={150}
                  className="mx-auto mb-2"
                />
                <h3 className="font-semibold mb-2">{product.name}</h3>
                <div className="flex items-center justify-center space-x-2">
                  <span className="text-yellow-400 font-bold text-lg">${product.price}</span>
                  <span className="text-gray-400 line-through text-sm">{product.originalPrice}</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div> */}
    </section>
  )
}
