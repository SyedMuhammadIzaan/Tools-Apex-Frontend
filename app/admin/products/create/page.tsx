"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"

export default function CreateProductPage() {
  const [features, setFeatures] = useState<string[]>([""])
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }])

  const addFeature = () => {
    setFeatures([...features, ""])
  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }])
  }

  const updateSpecification = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specifications]
    newSpecs[index][field] = value
    setSpecifications(newSpecs)
  }

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    // Handle form submission
    alert("Product created successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
        <p className="text-gray-600">Add a new product to your catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <Input placeholder="e.g., 18V Cordless Drill Kit" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SKU *</label>
              <Input placeholder="e.g., TA-CD18-001" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <Select>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="power-tools">Power Tools</SelectItem>
                  <SelectItem value="outdoor-power">Outdoor Power</SelectItem>
                  <SelectItem value="recreation">Recreation</SelectItem>
                  <SelectItem value="cleaning">Cleaning</SelectItem>
                  <SelectItem value="storage">Storage</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Brand</label>
              <Input placeholder="TOOLS APEX" defaultValue="TOOLS APEX" />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea placeholder="Detailed product description..." rows={4} required />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Pricing & Inventory</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price ($) *</label>
              <Input type="number" placeholder="149.99" step="0.01" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Original Price ($)</label>
              <Input type="number" placeholder="199.99" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stock Quantity *</label>
              <Input type="number" placeholder="100" required />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            <Button type="button" variant="outline" className="mt-4 bg-transparent">
              Choose Files
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Enter product feature"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  disabled={features.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature}>
              Add Feature
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>
          <div className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  value={spec.key}
                  onChange={(e) => updateSpecification(index, "key", e.target.value)}
                  placeholder="Specification name"
                  className="flex-1"
                />
                <Input
                  value={spec.value}
                  onChange={(e) => updateSpecification(index, "value", e.target.value)}
                  placeholder="Specification value"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                  disabled={specifications.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSpecification}>
              Add Specification
            </Button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500">
            Create Product
          </Button>
        </div>
      </form>
    </div>
  )
}
