"use client"

import type React from "react"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { ArrowLeft, CreditCard, Truck, Shield } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Separator } from "@/components/ui/separator"
import Image from "next/image"
import Link from "next/link"

export default function CheckoutPage() {
  const [formData, setFormData] = useState({
    fullName: "",
    email: "",
    phoneNumber1: "",
    phoneNumber2: "",
    addressLine1: "",
    addressLine2: "",
    city: "",
    nearestLandmark: "",
    postalCode: "",
  })

  const [errors, setErrors] = useState<Record<string, string>>({})

  // Sample cart items (in real app, this would come from state management)
  const cartItems = [
    {
      id: "18v-cordless-drill-kit",
      name: "18V ONE+ Cordless Drill Kit",
      price: 149,
      quantity: 1,
      image: "/placeholder.svg?height=100&width=100",
    },
    {
      id: "40v-leaf-blower",
      name: "40V Leaf Blower",
      price: 129,
      quantity: 2,
      image: "/placeholder.svg?height=100&width=100",
    },
  ]

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  const handleInputChange = (field: string, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }))
    // Clear error when user starts typing
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: "" }))
    }
  }

  const validateForm = () => {
    const newErrors: Record<string, string> = {}

    if (!formData.fullName.trim()) {
      newErrors.fullName = "Full name is required"
    }
    if (!formData.phoneNumber1.trim()) {
      newErrors.phoneNumber1 = "Phone number is required"
    }
    if (!formData.addressLine1.trim()) {
      newErrors.addressLine1 = "Address is required"
    }
    if (!formData.city.trim()) {
      newErrors.city = "City is required"
    }
    if (!formData.postalCode.trim()) {
      newErrors.postalCode = "Postal code is required"
    }

    setErrors(newErrors)
    return Object.keys(newErrors).length === 0
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    if (validateForm()) {
      // Process order
      alert("Order placed successfully!")
    }
  }

  return (
    <div className="min-h-screen bg-gray-50">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/cart">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Back to Cart
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Checkout</h1>
        </div>

        <div className="grid lg:grid-cols-2 gap-12">
          {/* Checkout Form */}
          <div className="space-y-8">
            {/* Contact Information */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-6">Contact Information</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="fullName">Full Name *</Label>
                  <Input
                    id="fullName"
                    value={formData.fullName}
                    onChange={(e) => handleInputChange("fullName", e.target.value)}
                    placeholder="Enter your full name"
                    className={errors.fullName ? "border-red-500" : ""}
                  />
                  {errors.fullName && <p className="text-red-500 text-sm mt-1">{errors.fullName}</p>}
                </div>

                <div>
                  <Label htmlFor="email">Email Address</Label>
                  <Input
                    id="email"
                    type="email"
                    value={formData.email}
                    onChange={(e) => handleInputChange("email", e.target.value)}
                    placeholder="Enter your email (optional)"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="phoneNumber1">Phone Number 1 *</Label>
                    <Input
                      id="phoneNumber1"
                      type="tel"
                      value={formData.phoneNumber1}
                      onChange={(e) => handleInputChange("phoneNumber1", e.target.value)}
                      placeholder="Primary phone number"
                      className={errors.phoneNumber1 ? "border-red-500" : ""}
                    />
                    {errors.phoneNumber1 && <p className="text-red-500 text-sm mt-1">{errors.phoneNumber1}</p>}
                  </div>

                  <div>
                    <Label htmlFor="phoneNumber2">Phone Number 2</Label>
                    <Input
                      id="phoneNumber2"
                      type="tel"
                      value={formData.phoneNumber2}
                      onChange={(e) => handleInputChange("phoneNumber2", e.target.value)}
                      placeholder="Secondary phone (optional)"
                    />
                  </div>
                </div>
              </div>
            </div>

            {/* Shipping Address */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-6">Shipping Address</h2>

              <div className="space-y-4">
                <div>
                  <Label htmlFor="addressLine1">Address Line 1 *</Label>
                  <Input
                    id="addressLine1"
                    value={formData.addressLine1}
                    onChange={(e) => handleInputChange("addressLine1", e.target.value)}
                    placeholder="Street address, P.O. box, company name"
                    className={errors.addressLine1 ? "border-red-500" : ""}
                  />
                  {errors.addressLine1 && <p className="text-red-500 text-sm mt-1">{errors.addressLine1}</p>}
                </div>

                <div>
                  <Label htmlFor="addressLine2">Address Line 2</Label>
                  <Input
                    id="addressLine2"
                    value={formData.addressLine2}
                    onChange={(e) => handleInputChange("addressLine2", e.target.value)}
                    placeholder="Apartment, suite, unit, building, floor, etc. (optional)"
                  />
                </div>

                <div className="grid md:grid-cols-2 gap-4">
                  <div>
                    <Label htmlFor="city">City *</Label>
                    <Input
                      id="city"
                      value={formData.city}
                      onChange={(e) => handleInputChange("city", e.target.value)}
                      placeholder="Enter your city"
                      className={errors.city ? "border-red-500" : ""}
                    />
                    {errors.city && <p className="text-red-500 text-sm mt-1">{errors.city}</p>}
                  </div>

                  <div>
                    <Label htmlFor="postalCode">Postal Code *</Label>
                    <Input
                      id="postalCode"
                      value={formData.postalCode}
                      onChange={(e) => handleInputChange("postalCode", e.target.value)}
                      placeholder="Enter postal code"
                      className={errors.postalCode ? "border-red-500" : ""}
                    />
                    {errors.postalCode && <p className="text-red-500 text-sm mt-1">{errors.postalCode}</p>}
                  </div>
                </div>

                <div>
                  <Label htmlFor="nearestLandmark">Nearest Landmark</Label>
                  <Input
                    id="nearestLandmark"
                    value={formData.nearestLandmark}
                    onChange={(e) => handleInputChange("nearestLandmark", e.target.value)}
                    placeholder="Nearest landmark for easy delivery (optional)"
                  />
                </div>
              </div>
            </div>

            {/* Payment Method */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-6">Payment Method</h2>

              <div className="space-y-4">
                <div className="border border-gray-200 rounded-lg p-4">
                  <div className="flex items-center space-x-3">
                    <input type="radio" id="cod" name="payment" defaultChecked className="text-yellow-400" />
                    <label htmlFor="cod" className="flex items-center space-x-2 cursor-pointer">
                      <Truck className="h-5 w-5 text-gray-600" />
                      <span className="font-medium">Cash on Delivery</span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-600 mt-2 ml-6">Pay when your order is delivered to your doorstep</p>
                </div>

                <div className="border border-gray-200 rounded-lg p-4 opacity-50">
                  <div className="flex items-center space-x-3">
                    <input type="radio" id="card" name="payment" disabled className="text-yellow-400" />
                    <label htmlFor="card" className="flex items-center space-x-2 cursor-not-allowed">
                      <CreditCard className="h-5 w-5 text-gray-400" />
                      <span className="font-medium text-gray-400">Credit/Debit Card</span>
                    </label>
                  </div>
                  <p className="text-sm text-gray-400 mt-2 ml-6">Coming soon</p>
                </div>
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="space-y-6">
            {/* Order Items */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
                {cartItems.map((item) => (
                  <div key={item.id} className="flex items-center space-x-4">
                    <div className="relative">
                      <Image
                        src={item.image || "/placeholder.svg"}
                        alt={item.name}
                        width={60}
                        height={60}
                        className="rounded-lg object-cover"
                      />
                      <span className="absolute -top-2 -right-2 bg-yellow-400 text-black text-xs rounded-full h-5 w-5 flex items-center justify-center font-bold">
                        {item.quantity}
                      </span>
                    </div>
                    <div className="flex-1">
                      <h3 className="font-medium text-sm">{item.name}</h3>
                      <p className="text-gray-600 text-sm">Qty: {item.quantity}</p>
                    </div>
                    <div className="text-right">
                      <p className="font-semibold">${(item.price * item.quantity).toFixed(2)}</p>
                    </div>
                  </div>
                ))}
              </div>

              <Separator className="my-4" />

              <div className="space-y-2">
                <div className="flex justify-between">
                  <span>Subtotal</span>
                  <span>${subtotal.toFixed(2)}</span>
                </div>
                <div className="flex justify-between">
                  <span>Shipping</span>
                  <span>{shipping === 0 ? "FREE" : `$${shipping.toFixed(2)}`}</span>
                </div>
                <div className="flex justify-between">
                  <span>Tax</span>
                  <span>${tax.toFixed(2)}</span>
                </div>
                <Separator className="my-2" />
                <div className="flex justify-between text-xl font-bold">
                  <span>Total</span>
                  <span>${total.toFixed(2)}</span>
                </div>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
              <div className="grid grid-cols-1 gap-4">
                <div className="flex items-center space-x-3">
                  <Shield className="h-5 w-5 text-green-600" />
                  <span className="text-sm">Secure & encrypted checkout</span>
                </div>
                <div className="flex items-center space-x-3">
                  <Truck className="h-5 w-5 text-blue-600" />
                  <span className="text-sm">Free worldwide shipping</span>
                </div>
                <div className="flex items-center space-x-3">
                  <CreditCard className="h-5 w-5 text-purple-600" />
                  <span className="text-sm">30-day money back guarantee</span>
                </div>
              </div>
            </div>

            {/* Place Order Button */}
            <Button
              onClick={handleSubmit}
              className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold"
              size="lg"
            >
              Place Order - ${total.toFixed(2)}
            </Button>

            <p className="text-xs text-gray-500 text-center">
              By placing your order, you agree to our{" "}
              <Link href="/terms-of-service" className="underline">
                Terms of Service
              </Link>{" "}
              and{" "}
              <Link href="/privacy-policy" className="underline">
                Privacy Policy
              </Link>
            </p>
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
