"use client"

import { useState } from "react"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { Minus, Plus, Trash2, ShoppingBag, ArrowLeft } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import Image from "next/image"
import Link from "next/link"

export default function CartPage() {
  const [cartItems, setCartItems] = useState([
    {
      id: "18v-cordless-drill-kit",
      name: "18V ONE+ Cordless Drill Kit",
      price: 149,
      originalPrice: 199,
      quantity: 1,
      image: "/placeholder.svg?height=200&width=200",
    },
    {
      id: "40v-leaf-blower",
      name: "40V Leaf Blower",
      price: 129,
      originalPrice: 179,
      quantity: 2,
      image: "/placeholder.svg?height=200&width=200",
    },
  ])

  const updateQuantity = (id: string, newQuantity: number) => {
    if (newQuantity === 0) {
      setCartItems(cartItems.filter((item) => item.id !== id))
    } else {
      setCartItems(cartItems.map((item) => (item.id === id ? { ...item, quantity: newQuantity } : item)))
    }
  }

  const removeItem = (id: string) => {
    setCartItems(cartItems.filter((item) => item.id !== id))
  }

  const subtotal = cartItems.reduce((sum, item) => sum + item.price * item.quantity, 0)
  const shipping = subtotal > 100 ? 0 : 15
  const tax = subtotal * 0.08
  const total = subtotal + shipping + tax

  if (cartItems.length === 0) {
    return (
      <div className="min-h-screen bg-white">
        <Header />
        <div className="container mx-auto px-4 py-16">
          <div className="text-center max-w-md mx-auto">
            <ShoppingBag className="h-24 w-24 text-gray-300 mx-auto mb-6" />
            <h1 className="text-3xl font-bold text-gray-900 mb-4">Your Cart is Empty</h1>
            <p className="text-gray-600 mb-8">
              Looks like you haven&apos;t added any items to your cart yet. Start shopping to fill it up!
            </p>
            <Button asChild className="bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
              <Link href="/">Continue Shopping</Link>
            </Button>
          </div>
        </div>
        <Footer />
      </div>
    )
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />

      <div className="container mx-auto px-4 py-8">
        <div className="flex items-center mb-8">
          <Button asChild variant="ghost" className="mr-4">
            <Link href="/">
              <ArrowLeft className="h-4 w-4 mr-2" />
              Continue Shopping
            </Link>
          </Button>
          <h1 className="text-3xl font-bold text-gray-900">Shopping Cart</h1>
        </div>

        <div className="grid lg:grid-cols-3 gap-8">
          {/* Cart Items */}
          <div className="lg:col-span-2">
            <div className="bg-white border border-gray-200 rounded-lg overflow-hidden">
              <div className="p-6 border-b border-gray-200">
                <h2 className="text-xl font-semibold">Cart Items ({cartItems.length})</h2>
              </div>

              <div className="divide-y divide-gray-200">
                {cartItems.map((item) => (
                  <div key={item.id} className="p-6">
                    <div className="flex items-center space-x-4">
                      <div className="flex-shrink-0">
                        <Image
                          src={item.image || "/placeholder.svg"}
                          alt={item.name}
                          width={100}
                          height={100}
                          className="rounded-lg object-cover"
                        />
                      </div>

                      <div className="flex-1 min-w-0">
                        <h3 className="text-lg font-semibold text-gray-900 mb-2">
                          <Link href={`/products/${item.id}`} className="hover:text-yellow-600">
                            {item.name}
                          </Link>
                        </h3>

                        <div className="flex items-center space-x-2 mb-4">
                          <span className="text-2xl font-bold text-green-600">${item.price}</span>
                          {item.originalPrice > item.price && (
                            <span className="text-lg text-gray-400 line-through">${item.originalPrice}</span>
                          )}
                        </div>

                        <div className="flex items-center justify-between">
                          <div className="flex items-center space-x-2">
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity - 1)}
                              className="h-8 w-8"
                            >
                              <Minus className="h-4 w-4" />
                            </Button>
                            <Input
                              type="number"
                              value={item.quantity}
                              onChange={(e) => updateQuantity(item.id, Number.parseInt(e.target.value) || 1)}
                              className="w-16 text-center"
                              min="1"
                            />
                            <Button
                              variant="outline"
                              size="icon"
                              onClick={() => updateQuantity(item.id, item.quantity + 1)}
                              className="h-8 w-8"
                            >
                              <Plus className="h-4 w-4" />
                            </Button>
                          </div>

                          <Button
                            variant="ghost"
                            size="sm"
                            onClick={() => removeItem(item.id)}
                            className="text-red-600 hover:text-red-800 hover:bg-red-50"
                          >
                            <Trash2 className="h-4 w-4 mr-1" />
                            Remove
                          </Button>
                        </div>
                      </div>

                      <div className="text-right">
                        <div className="text-xl font-bold text-gray-900">
                          ${(item.price * item.quantity).toFixed(2)}
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>

          {/* Order Summary */}
          <div className="lg:col-span-1">
            <div className="bg-gray-50 border border-gray-200 rounded-lg p-6 sticky top-4">
              <h2 className="text-xl font-semibold mb-6">Order Summary</h2>

              <div className="space-y-4 mb-6">
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
                <div className="border-t border-gray-300 pt-4">
                  <div className="flex justify-between text-xl font-bold">
                    <span>Total</span>
                    <span>${total.toFixed(2)}</span>
                  </div>
                </div>
              </div>

              {shipping > 0 && (
                <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-4 mb-6">
                  <p className="text-sm text-yellow-800">
                    Add ${(100 - subtotal).toFixed(2)} more to get FREE shipping!
                  </p>
                </div>
              )}

              <Button
                asChild
                className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold mb-4"
                size="lg"
              >
                <Link href="/checkout">Proceed to Checkout</Link>
              </Button>

              <Button variant="outline" className="w-full bg-transparent" size="lg">
                Continue Shopping
              </Button>

              <div className="mt-6 text-center">
                <div className="flex items-center justify-center space-x-2 text-sm text-gray-600">
                  <span>🔒</span>
                  <span>Secure checkout</span>
                </div>
                <p className="text-xs text-gray-500 mt-2">Your payment information is encrypted and secure</p>
              </div>
            </div>
          </div>
        </div>

        {/* Recommended Products */}
        <div className="mt-16">
          <h2 className="text-2xl font-bold text-gray-900 mb-8">You Might Also Like</h2>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "18v-impact-driver",
                name: "18V Impact Driver",
                price: 89,
                originalPrice: 129,
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                id: "18v-circular-saw",
                name: "18V Circular Saw",
                price: 99,
                originalPrice: 159,
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                id: "40v-string-trimmer",
                name: "40V String Trimmer",
                price: 149,
                originalPrice: 199,
                image: "/placeholder.svg?height=200&width=200",
              },
              {
                id: "18v-battery-pack",
                name: "18V 4.0Ah Battery Pack",
                price: 79,
                originalPrice: 99,
                image: "/placeholder.svg?height=200&width=200",
              },
            ].map((product) => (
              <div
                key={product.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-shadow"
              >
                <Image
                  src={product.image || "/placeholder.svg"}
                  alt={product.name}
                  width={200}
                  height={200}
                  className="w-full h-48 object-cover"
                />
                <div className="p-4">
                  <h3 className="font-semibold text-sm mb-2">{product.name}</h3>
                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-green-600">${product.price}</span>
                      <span className="text-sm text-gray-400 line-through">${product.originalPrice}</span>
                    </div>
                  </div>
                  <Button size="sm" className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                    Add to Cart
                  </Button>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <Footer />
    </div>
  )
}
