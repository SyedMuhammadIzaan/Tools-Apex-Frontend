"use client"

import { useState } from "react"
import { ChevronLeft, ChevronRight, Star } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function TestimonialsSection() {
  const [currentTestimonial, setCurrentTestimonial] = useState(0)

  const testimonials = [
    {
      id: 1,
      name: "Marcus Thompson",
      role: "Satisfied Customer Of TOOLS APEX",

      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "I&apos;ve been using TOOLS APEX equipment for over 10 years, and they never disappoint me with their product quality.",
    },
    {
      id: 2,
      name: "Sarah Mitchell",
      role: "Satisfied Customer Of TOOLS APEX",

      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "As someone who loves tackling home improvement projects, TOOLS APEX tools have been game-changers. They&apos;re powerful enough for serious work but user-friendly for beginners. The quality is outstanding and the prices are fair.",
    },
    {
      id: 3,
      name: "David Rodriguez",
      role: "Satisfied Customer Of TOOLS APEX",

      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "The outdoor power equipment from TOOLS APEX is simply the best. Our crew relies on their mowers, trimmers, and blowers daily. They&apos;re durable, reliable, and perform consistently even in tough conditions.",
    },
    {
      id: 4,
      name: "Jennifer Lee",
      role: "Satisfied Customer Of TOOLS APEX",

      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "Precision and reliability are crucial in my woodworking projects. TOOLS APEX power tools deliver both consistently. The battery life is impressive, and the tools feel well-balanced and comfortable during long work sessions.",
    },
    {
      id: 5,
      name: "Robert Johnson",
      role: "Satisfied Customer Of TOOLS APEX",
       
      image: "/placeholder.svg?height=100&width=100",
      rating: 5,
      text: "We maintain over 50 parks with TOOLS APEX equipment. The durability and performance are exceptional. When you&apos;re responsible for public spaces, you need tools you can count on - and these deliver every time.",
    },
  ]

  const nextTestimonial = () => {
    setCurrentTestimonial((prev) => (prev + 1) % testimonials.length)
  }

  const prevTestimonial = () => {
    setCurrentTestimonial((prev) => (prev - 1 + testimonials.length) % testimonials.length)
  }

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            WHAT OUR <span className="text-yellow-400">CUSTOMERS SAY</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Don&apos;t just take our word for it. Hear from professionals and DIY enthusiasts who trust TOOLS APEX for their
            projects.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="relative bg-gray-900 rounded-lg p-8 lg:p-12">
            <div className="flex flex-col items-center text-center">
              <div className="flex-1 text-center lg:text-left">
                <div className="flex justify-center lg:justify-start mb-4">
                  {[...Array(testimonials[currentTestimonial].rating)].map((_, i) => (
                    <Star key={i} className="h-5 w-5 text-yellow-400 fill-current" />
                  ))}
                </div>

                <blockquote className="text-lg lg:text-xl text-gray-300 mb-6 italic leading-relaxed">
                  &quot;{testimonials[currentTestimonial].text}&quot;
                </blockquote>

                <div>
                  <h4 className="font-bold text-xl text-white mb-1">{testimonials[currentTestimonial].name}</h4>
                  <p className="text-yellow-400 font-semibold">{testimonials[currentTestimonial].role}</p>
                  <p className="text-gray-400 text-sm">{testimonials[currentTestimonial].company}</p>
                </div>
              </div>
            </div>

            {/* Navigation */}
            <div className="flex items-center justify-between mt-8">
              <Button
                variant="ghost"
                size="icon"
                onClick={prevTestimonial}
                className="text-white hover:text-yellow-400 hover:bg-yellow-400/10"
              >
                <ChevronLeft className="h-6 w-6" />
              </Button>

              <div className="flex space-x-2">
                {testimonials.map((_, index) => (
                  <button
                    key={index}
                    onClick={() => setCurrentTestimonial(index)}
                    className={`w-3 h-3 rounded-full transition-colors ${
                      index === currentTestimonial ? "bg-yellow-400" : "bg-gray-600"
                    }`}
                  />
                ))}
              </div>

              <Button
                variant="ghost"
                size="icon"
                onClick={nextTestimonial}
                className="text-white hover:text-yellow-400 hover:bg-yellow-400/10"
              >
                <ChevronRight className="h-6 w-6" />
              </Button>
            </div>
          </div>

          {/* Stats */}
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 mt-12">
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">4.8/5</div>
              <div className="text-gray-400 text-sm">Average Rating</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">50K+</div>
              <div className="text-gray-400 text-sm">Reviews</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">96%</div>
              <div className="text-gray-400 text-sm">Recommend Us</div>
            </div>
            <div className="text-center">
              <div className="text-3xl font-bold text-yellow-400 mb-2">500K+</div>
              <div className="text-gray-400 text-sm">Happy Customers</div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
