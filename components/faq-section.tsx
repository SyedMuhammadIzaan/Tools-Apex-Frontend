"use client"

import { useState } from "react"
import { ChevronDown, ChevronUp } from "lucide-react"
import { Button } from "@/components/ui/button"

export default function FAQSection() {
  const [openItems, setOpenItems] = useState<number[]>([])

  const toggleItem = (index: number) => {
    setOpenItems((prev) => (prev.includes(index) ? prev.filter((item) => item !== index) : [...prev, index]))
  }

  const faqs = [
    {
      question: "What is the delivery time?",
      answer:
        "Our orders tooks 4-5 calendar days to process and 12-15 calendar days to deliver at your doorsteps safely.",
    },
    {
      question: "What if i found my product damaged?",
      answer:
        "We offer 30 days hassle free return time period to our all valuable customers if the product was not found in its original condition.",
    },
    {
      question: "Do you offer professional discounts?",
      answer:
        " Contact our professional sales team or visit your local dealer to learn about our Pro Program benefits and volume discounts.",
    },
    {
      question: "Contact us?",
      answer:
        "Email : salestoolsapex@gmail.com.",
    },
    {
      question: "Can I use other brand batteries with your tools?",
      answer:
        "For safety and performance reasons, we recommend using only genuine batteries with our tools. Genuine are specifically designed and tested to work optimally with our tools and using other brands may void your warranty.",
    },
     
  ]

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            FREQUENTLY ASKED <span className="text-yellow-400">QUESTIONS</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Find answers to common questions about our tools, warranties, and services. Can&apos;t find what you&apos;re looking
            for? Contact our support team.
          </p>
        </div>

        <div className="max-w-4xl mx-auto">
          <div className="space-y-4">
            {faqs.map((faq, index) => (
              <div key={index} className="bg-black rounded-lg border border-gray-800">
                <button
                  onClick={() => toggleItem(index)}
                  className="w-full px-6 py-4 text-left flex items-center justify-between hover:bg-gray-800 transition-colors rounded-lg"
                >
                  <h3 className="font-semibold text-lg pr-4">{faq.question}</h3>
                  {openItems.includes(index) ? (
                    <ChevronUp className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  ) : (
                    <ChevronDown className="h-5 w-5 text-yellow-400 flex-shrink-0" />
                  )}
                </button>

                {openItems.includes(index) && (
                  <div className="px-6 pb-4">
                    <div className="border-t border-gray-800 pt-4">
                      <p className="text-gray-300 leading-relaxed">{faq.answer}</p>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </div>

          <div className="text-center mt-12">
            <div className="bg-black p-8 rounded-lg border border-gray-800">
              <h3 className="text-2xl font-bold mb-4">Still have questions?</h3>
              <p className="text-gray-300 mb-6">
                Our customer support team is here to help you find the right tools and answers for your projects.
              </p>
              <div className="flex flex-col sm:flex-row gap-4 justify-center">
                <Button size="lg" className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                  Contact Support
                </Button>
                
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>
  )
}
