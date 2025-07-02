"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Star } from "lucide-react"

export default function CreateReviewPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Review created successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Review</h1>
        <p className="text-gray-600">Add a customer review for a product</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Review Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product *</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drill-kit">18V Cordless Drill Kit</SelectItem>
                  <SelectItem value="chainsaw">40V Brushless Chainsaw</SelectItem>
                  <SelectItem value="circular-saw">18V Circular Saw</SelectItem>
                  <SelectItem value="combo-kit">ONE+ 6-Tool Combo Kit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Review Status</label>
              <Select defaultValue="approved">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="pending">Pending</SelectItem>
                  <SelectItem value="approved">Approved</SelectItem>
                  <SelectItem value="rejected">Rejected</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Customer Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Customer Name *</label>
              <Input placeholder="e.g., John D." required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Customer Email</label>
              <Input type="email" placeholder="john@example.com" />
            </div>
          </div>
          <div className="mt-6">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="verified" className="rounded" />
              <label htmlFor="verified" className="text-sm font-medium">
                Verified Purchase
              </label>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Review Content</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Rating *</label>
              <div className="flex items-center space-x-1">
                {[1, 2, 3, 4, 5].map((star) => (
                  <button
                    key={star}
                    type="button"
                    onClick={() => setRating(star)}
                    onMouseEnter={() => setHoveredRating(star)}
                    onMouseLeave={() => setHoveredRating(0)}
                    className="p-1"
                  >
                    <Star
                      className={`h-8 w-8 ${
                        star <= (hoveredRating || rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating > 0 ? `${rating} star${rating > 1 ? "s" : ""}` : "Select rating"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review Title *</label>
              <Input placeholder="e.g., Excellent drill for the price!" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review Content *</label>
              <Textarea placeholder="Write the detailed review content..." rows={6} required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review Date</label>
              <Input type="date" defaultValue={new Date().toISOString().split("T")[0]} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Additional Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Helpful Votes</label>
              <Input type="number" placeholder="0" min="0" defaultValue="0" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Purchase Date</label>
              <Input type="date" />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="featured-review" className="rounded" />
              <label htmlFor="featured-review" className="text-sm font-medium">
                Feature this review
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="send-notification" className="rounded" />
              <label htmlFor="send-notification" className="text-sm font-medium">
                Send notification to customer
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500">
            Create Review
          </Button>
        </div>
      </form>
    </div>
  )
}
