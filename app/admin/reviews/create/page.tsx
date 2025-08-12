"use client"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"
import { Star } from "lucide-react"
import { createReview } from "@/services/review.service"
import { getAllProducts } from "@/services/product.service"
import { Product } from "@/types"

export default function CreateReviewPage() {
  const [rating, setRating] = useState(0)
  const [hoveredRating, setHoveredRating] = useState(0)
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [products, setProducts] = useState<Product[]>([])
  const [reviewStatus, setReviewStatus] = useState<string>("approved")
  const [name, setName] = useState("")
  const [comment, setComment] = useState("")
  const [date, setDate] = useState(new Date().toISOString().split("T")[0])

  useEffect(() => {
    const fetchAllProducts = async () => {
      try {
        const { data } = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.log("Error fetching products", error)
      }
    }
    fetchAllProducts()
  }, [])


  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    console.log("Selected Product",selectedProduct)
    try {
      await createReview({
        name,
        rating,
        comment,
        date: new Date(date),
        product:selectedProduct,
      })
      alert("Review created successfully!")
      setName("")
      setComment("")
      setRating(0)
      setSelectedProduct("")
      setDate(new Date().toISOString().split("T")[0])
    } catch (error) {
      console.error("Failed to create review", error)
    }
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
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Review Status</label>
              <Select value={reviewStatus} onValueChange={setReviewStatus}>
                <SelectTrigger>
                  <SelectValue placeholder="Select status" />
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
              <Input
                name="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                placeholder="e.g., John D."
                required
              />
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
                        star <= (hoveredRating || rating)
                          ? "text-yellow-400 fill-current"
                          : "text-gray-300"
                      }`}
                    />
                  </button>
                ))}
                <span className="ml-2 text-sm text-gray-600">
                  {rating > 0
                    ? `${rating} star${rating > 1 ? "s" : ""}`
                    : "Select rating"}
                </span>
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review Content *</label>
              <Textarea
                name="comment"
                value={comment}
                onChange={(e) => setComment(e.target.value)}
                placeholder="Write the detailed review content..."
                rows={6}
                required
              />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Review Date</label>
              <Input
                name="date"
                type="date"
                value={date}
                onChange={(e) => setDate(e.target.value)}
              />
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button
            type="submit"
            className="bg-yellow-400 text-black hover:bg-yellow-500"
          >
            Create Review
          </Button>
        </div>
      </form>
    </div>
  )
}
