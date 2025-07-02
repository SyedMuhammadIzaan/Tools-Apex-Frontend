"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Calendar } from "lucide-react"

export default function CreateSalesProductPage() {
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Sales product created successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Sales Product</h1>
        <p className="text-gray-600">Set up a product for sale with special pricing</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Sale Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Sale Title *</label>
              <Input placeholder="e.g., Black Friday Sale" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Sale Type *</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select sale type" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="percentage">Percentage Discount</SelectItem>
                  <SelectItem value="fixed">Fixed Amount Off</SelectItem>
                  <SelectItem value="bogo">Buy One Get One</SelectItem>
                  <SelectItem value="bundle">Bundle Deal</SelectItem>
                </SelectContent>
              </Select>
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Sale Description</label>
            <Textarea placeholder="Describe the sale offer..." rows={3} />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Product Selection</h2>
          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium mb-2">Select Products *</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Choose products for sale" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="drill-kit">18V Cordless Drill Kit</SelectItem>
                  <SelectItem value="chainsaw">40V Brushless Chainsaw</SelectItem>
                  <SelectItem value="circular-saw">18V Circular Saw</SelectItem>
                  <SelectItem value="combo-kit">ONE+ 6-Tool Combo Kit</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Original Price ($) *</label>
                <Input type="number" placeholder="199.99" step="0.01" required />
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Sale Price ($) *</label>
                <Input type="number" placeholder="149.99" step="0.01" required />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Discount Percentage</label>
              <Input type="number" placeholder="25" min="0" max="100" />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Sale Duration</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Start Date *</label>
              <div className="relative">
                <Input type="datetime-local" required />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">End Date *</label>
              <div className="relative">
                <Input type="datetime-local" required />
                <Calendar className="absolute right-3 top-1/2 transform -translate-y-1/2 text-gray-400 h-4 w-4 pointer-events-none" />
              </div>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Sale Settings</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Maximum Quantity per Customer</label>
              <Input type="number" placeholder="5" min="1" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Total Stock for Sale</label>
              <Input type="number" placeholder="100" min="1" />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="featured" className="rounded" />
              <label htmlFor="featured" className="text-sm font-medium">
                Feature this sale on homepage
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="email" className="rounded" />
              <label htmlFor="email" className="text-sm font-medium">
                Send email notification to subscribers
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="active" className="rounded" defaultChecked />
              <label htmlFor="active" className="text-sm font-medium">
                Activate sale immediately
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500">
            Create Sale
          </Button>
        </div>
      </form>
    </div>
  )
}
