"use client"

import { useState,useEffect } from "react"
import Image from "next/image"
import { Star, Heart, Share2, ShoppingCart, Truck, Shield, RotateCcw, Award } from "lucide-react"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs"

interface Product {
  id: string
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  inStock: boolean
  sku: string
  category: string
  images: string[]
  description: string
  features: string[]
  specifications: Record<string, string>
  included: string[]
}

interface ProductDetailProps {
  product: Product
}

export default function ProductDetail({ productName }: ProductDetailProps) {
  const [product, setProduct] = useState<Product | null>(null);
  // console.log("Product Detail Page",productName)
  const [selectedImage,setSelectedImage]=useState(0);
  const [quantity,setQuantity]=useState(1);
  
  useEffect(()=>{
    const getSingleProduct=async (pName)=>{
     try {
        const productData=await getProductByName(pName)
        console.log("SingleProduct",productData)
        setSingleProductData(productData)
     } catch (error) {
      console.log("Product Not Found",error)
     }
    }
    getProduct(productName)
  },[])
  const savings = product.originalPrice - product.price


  return (
    <div className="bg-white text-black">
      {/* Breadcrumb */}
      <div className="bg-gray-50 py-4">
        <div className="container mx-auto px-4">
          <nav className="text-sm text-gray-600">
            <span>Home</span> / <span>{product.category}</span> / <span className="text-black">{product.name}</span>
          </nav>
        </div>
      </div>

      <div className="container mx-auto px-4 py-8">
        <div className="grid lg:grid-cols-2 gap-12">
          {/* Product Images */}
          <div className="space-y-4">
            <div className="relative aspect-square bg-gray-100 rounded-lg overflow-hidden">
              <Image
                src={product.images[selectedImage] || "/placeholder.svg"}
                alt={product.name}
                fill
                className="object-cover"
                priority
              />
              {product.discount > 0 && (
                <Badge className="absolute top-4 left-4 bg-red-600 text-white font-bold text-lg px-3 py-1">
                  {product.discount}% OFF
                </Badge>
              )}
            </div>

            <div className="grid grid-cols-4 gap-2">
              {product.images.map((image, index) => (
                <button
                  key={index}
                  onClick={() => setSelectedImage(index)}
                  className={`aspect-square bg-gray-100 rounded-lg overflow-hidden border-2 transition-colors ${
                    selectedImage === index ? "border-yellow-400" : "border-transparent"
                  }`}
                >
                  <Image
                    src={image || "/placeholder.svg"}
                    alt={`${product.name} view ${index + 1}`}
                    width={100}
                    height={100}
                    className="w-full h-full object-cover"
                  />
                </button>
              ))}
            </div>
          </div>

          {/* Product Info */}
          <div className="space-y-6">
            <div>
              <h1 className="text-3xl lg:text-4xl font-bold mb-2">{product.name}</h1>
              <p className="text-gray-600 mb-4">SKU: {product.sku}</p>

              <div className="flex items-center space-x-4 mb-4">
                <div className="flex items-center">
                  {[...Array(5)].map((_, i) => (
                    <Star
                      key={i}
                      className={`h-5 w-5 ${
                        i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                      }`}
                    />
                  ))}
                  <span className="ml-2 text-sm text-gray-600">
                    {product.rating} ({product.reviewCount} reviews)
                  </span>
                </div>
              </div>

              <div className="flex items-center space-x-4 mb-6">
                <span className="text-4xl font-bold text-green-600">${product.price}</span>
                {product.originalPrice > product.price && (
                  <>
                    <span className="text-2xl text-gray-400 line-through">${product.originalPrice}</span>
                    <Badge className="bg-green-100 text-green-800">Save ${savings}</Badge>
                  </>
                )}
              </div>

              <p className="text-lg text-gray-700 leading-relaxed mb-6">{product.description}</p>
            </div>

            {/* Stock Status */}
            <div className="flex items-center space-x-2">
              <div className={`w-3 h-3 rounded-full ${product.inStock ? "bg-green-500" : "bg-red-500"}`} />
              <span className={`font-semibold ${product.inStock ? "text-green-600" : "text-red-600"}`}>
                {product.inStock ? "In Stock" : "Out of Stock"}
              </span>
            </div>

            {/* Quantity and Add to Cart */}
            <div className="space-y-4">
              <div className="flex items-center space-x-4">
                <label className="font-semibold">Quantity:</label>
                <div className="flex items-center border border-gray-300 rounded">
                  <button
                    onClick={() => setQuantity(Math.max(1, quantity - 1))}
                    className="px-3 py-2 hover:bg-gray-100"
                  >
                    -
                  </button>
                  <span className="px-4 py-2 border-x border-gray-300">{quantity}</span>
                  <button onClick={() => setQuantity(quantity + 1)} className="px-3 py-2 hover:bg-gray-100">
                    +
                  </button>
                </div>
              </div>

              <div className="flex flex-col sm:flex-row gap-4">
                <Button
                  size="lg"
                  className="flex-1 bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-lg py-3"
                  disabled={!product.inStock}
                >
                  <ShoppingCart className="mr-2 h-5 w-5" />
                  Add to Cart - ${(product.price * quantity).toFixed(2)}
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300">
                  <Heart className="mr-2 h-4 w-4" />
                  Save
                </Button>
                <Button size="lg" variant="outline" className="border-gray-300">
                  <Share2 className="mr-2 h-4 w-4" />
                  Share
                </Button>
              </div>
            </div>

            {/* Trust Signals */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-4 py-6 border-t border-gray-200">
              <div className="flex items-center space-x-2">
                <Truck className="h-5 w-5 text-green-600" />
                <span className="text-sm">Free Shipping</span>
              </div>
              <div className="flex items-center space-x-2">
                <Shield className="h-5 w-5 text-blue-600" />
                <span className="text-sm">3-Year Warranty</span>
              </div>
              <div className="flex items-center space-x-2">
                <RotateCcw className="h-5 w-5 text-purple-600" />
                <span className="text-sm">30-Day Returns</span>
              </div>
              <div className="flex items-center space-x-2">
                <Award className="h-5 w-5 text-yellow-600" />
                <span className="text-sm">Pro Quality</span>
              </div>
            </div>
          </div>
        </div>

        {/* Product Details Tabs */}
        <div className="mt-16">
          <Tabs defaultValue="features" className="w-full">
            <TabsList className="grid w-full grid-cols-4">
              <TabsTrigger value="features">Features</TabsTrigger>
              <TabsTrigger value="specifications">Specifications</TabsTrigger>
              <TabsTrigger value="included">What&apos;s Included</TabsTrigger>
              <TabsTrigger value="reviews">Reviews</TabsTrigger>
            </TabsList>

            <TabsContent value="features" className="mt-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Key Features</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.features.map((feature, index) => (
                    <div key={index} className="flex items-start space-x-3">
                      <div className="w-2 h-2 bg-yellow-400 rounded-full mt-2 flex-shrink-0" />
                      <span className="text-gray-700">{feature}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="specifications" className="mt-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Technical Specifications</h3>
                <div className="grid md:grid-cols-2 gap-6">
                  {Object.entries(product.specifications).map(([key, value]) => (
                    <div key={key} className="flex justify-between py-2 border-b border-gray-200">
                      <span className="font-semibold text-gray-700">{key}:</span>
                      <span className="text-gray-600">{value}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="included" className="mt-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">What&apos;s in the Box</h3>
                <div className="grid md:grid-cols-2 gap-4">
                  {product.included.map((item, index) => (
                    <div key={index} className="flex items-center space-x-3">
                      <div className="w-2 h-2 bg-green-500 rounded-full flex-shrink-0" />
                      <span className="text-gray-700">{item}</span>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>

            <TabsContent value="reviews" className="mt-8">
              <div className="bg-gray-50 p-8 rounded-lg">
                <h3 className="text-2xl font-bold mb-6">Customer Reviews</h3>
                <div className="space-y-6">
                  {[
                    {
                      name: "John D.",
                      rating: 5,
                      date: "Dec 20, 2024",
                      comment:
                        "Excellent drill! Very powerful and the battery lasts a long time. Highly recommend for both professionals and DIYers.",
                    },
                    {
                      name: "Sarah M.",
                      rating: 5,
                      date: "Dec 18, 2024",
                      comment:
                        "Love this tool! The LED light is super helpful and the grip is comfortable even during long projects.",
                    },
                    {
                      name: "Mike R.",
                      rating: 4,
                      date: "Dec 15, 2024",
                      comment:
                        "Great value for the price. Works well for all my home improvement projects. The ONE+ system is fantastic.",
                    },
                  ].map((review, index) => (
                    <div key={index} className="border-b border-gray-200 pb-4">
                      <div className="flex items-center justify-between mb-2">
                        <div className="flex items-center space-x-2">
                          <span className="font-semibold">{review.name}</span>
                          <div className="flex">
                            {[...Array(5)].map((_, i) => (
                              <Star
                                key={i}
                                className={`h-4 w-4 ${
                                  i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                }`}
                              />
                            ))}
                          </div>
                        </div>
                        <span className="text-sm text-gray-500">{review.date}</span>
                      </div>
                      <p className="text-gray-700">{review.comment}</p>
                    </div>
                  ))}
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </div>

        {/* Customer Reviews Section */}
        <div className="mt-16">
          <div className="bg-gray-50 p-8 rounded-lg">
            <div className="flex flex-col lg:flex-row gap-12">
              {/* Reviews Summary */}
              <div className="lg:w-1/3">
                <h3 className="text-3xl font-bold mb-6">Customer Reviews</h3>
                <div className="text-center mb-6">
                  <div className="text-5xl font-bold text-yellow-600 mb-2">{product.rating}</div>
                  <div className="flex justify-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-6 w-6 ${
                          i < Math.floor(product.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                  </div>
                  <p className="text-gray-600">Based on {product.reviewCount} reviews</p>
                </div>

                {/* Rating Breakdown */}
                <div className="space-y-2">
                  {[5, 4, 3, 2, 1].map((rating) => {
                    const percentage = rating === 5 ? 75 : rating === 4 ? 20 : rating === 3 ? 3 : rating === 2 ? 1 : 1
                    return (
                      <div key={rating} className="flex items-center space-x-2">
                        <span className="text-sm w-8">{rating}★</span>
                        <div className="flex-1 bg-gray-200 rounded-full h-2">
                          <div className="bg-yellow-400 h-2 rounded-full" style={{ width: `${percentage}%` }} />
                        </div>
                        <span className="text-sm text-gray-600 w-12">{percentage}%</span>
                      </div>
                    )
                  })}
                </div>

                <Button className="w-full mt-6 bg-yellow-400 text-black hover:bg-yellow-500">Write a Review</Button>
              </div>

              {/* Individual Reviews */}
              <div className="lg:w-2/3">
                <div className="space-y-6">
                  {[
                    {
                      name: "John D.",
                      rating: 5,
                      date: "Dec 20, 2024",
                      verified: true,
                      title: "Excellent drill for the price!",
                      comment:
                        "I've been using this drill for 3 months now and it's been fantastic. The battery life is impressive and it has enough power for all my DIY projects. The LED light is a nice touch too. Highly recommend!",
                      helpful: 24,
                    },
                    {
                      name: "Sarah M.",
                      rating: 5,
                      date: "Dec 18, 2024",
                      verified: true,
                      title: "Perfect for home projects",
                      comment:
                        "Love this tool! The grip is comfortable even during long projects and the variable speed control is very responsive. Great value for money. The ONE+ system is genius - one battery for all tools!",
                      helpful: 18,
                    },
                    {
                      name: "Mike R.",
                      rating: 4,
                      date: "Dec 15, 2024",
                      verified: true,
                      title: "Good quality, great battery system",
                      comment:
                        "Solid drill with good build quality. The 24-position clutch works well and prevents overdriving screws. Only minor complaint is it's a bit heavier than expected, but the performance makes up for it.",
                      helpful: 12,
                    },
                    {
                      name: "Lisa K.",
                      rating: 5,
                      date: "Dec 12, 2024",
                      verified: true,
                      title: "Professional quality at home price",
                      comment:
                        "As a contractor, I'm impressed with the build quality. It feels solid and performs well on job sites. The keyless chuck is smooth and the LED light is bright enough to work in dark spaces.",
                      helpful: 31,
                    },
                    {
                      name: "David T.",
                      rating: 4,
                      date: "Dec 10, 2024",
                      verified: true,
                      title: "Great starter kit",
                      comment:
                        "Perfect for someone just getting into DIY. The kit has everything you need to get started. Battery charges quickly and lasts a long time. Would definitely buy TOOLS APEX again.",
                      helpful: 9,
                    },
                  ].map((review, index) => (
                    <div key={index} className="bg-white p-6 rounded-lg border border-gray-200">
                      <div className="flex items-start justify-between mb-3">
                        <div>
                          <div className="flex items-center space-x-2 mb-1">
                            <span className="font-semibold">{review.name}</span>
                            {review.verified && (
                              <Badge className="bg-green-100 text-green-800 text-xs">Verified Purchase</Badge>
                            )}
                          </div>
                          <div className="flex items-center space-x-2">
                            <div className="flex">
                              {[...Array(5)].map((_, i) => (
                                <Star
                                  key={i}
                                  className={`h-4 w-4 ${
                                    i < review.rating ? "text-yellow-400 fill-current" : "text-gray-300"
                                  }`}
                                />
                              ))}
                            </div>
                            <span className="text-sm text-gray-500">{review.date}</span>
                          </div>
                        </div>
                      </div>

                      <h4 className="font-semibold mb-2">{review.title}</h4>
                      <p className="text-gray-700 mb-4 leading-relaxed">{review.comment}</p>

                      <div className="flex items-center justify-between text-sm">
                        <button className="text-gray-600 hover:text-gray-800 flex items-center space-x-1">
                          <span>👍</span>
                          <span>Helpful ({review.helpful})</span>
                        </button>
                        <button className="text-gray-600 hover:text-gray-800">Report</button>
                      </div>
                    </div>
                  ))}
                </div>

                <div className="text-center mt-8">
                  <Button variant="outline" className="border-gray-300">
                    Load More Reviews
                  </Button>
                </div>
              </div>
            </div>
          </div>
        </div>

        {/* Related Products Section */}
        <div className="mt-16">
          <h3 className="text-3xl font-bold mb-8 text-center">You Might Also Like</h3>
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              {
                id: "18v-impact-driver",
                name: "18V Impact Driver",
                price: 89,
                originalPrice: 129,
                image: "/placeholder.svg?height=300&width=300",
                rating: 4.8,
                reviews: 1089,
                badge: "Best Seller",
              },
              {
                id: "18v-circular-saw",
                name: "18V Circular Saw",
                price: 99,
                originalPrice: 159,
                image: "/placeholder.svg?height=300&width=300",
                rating: 4.7,
                reviews: 634,
                badge: "Sale",
              },
              {
                id: "18v-battery-pack",
                name: "18V 4.0Ah Battery Pack",
                price: 79,
                originalPrice: 99,
                image: "/placeholder.svg?height=300&width=300",
                rating: 4.9,
                reviews: 2341,
                badge: "Essential",
              },
              {
                id: "18v-charger",
                name: "18V Fast Charger",
                price: 49,
                originalPrice: 69,
                image: "/placeholder.svg?height=300&width=300",
                rating: 4.6,
                reviews: 876,
                badge: "Upgrade",
              },
            ].map((relatedProduct) => (
              <div
                key={relatedProduct.id}
                className="bg-white border border-gray-200 rounded-lg overflow-hidden hover:shadow-lg transition-all duration-300 group"
              >
                <div className="relative aspect-square">
                  <Image
                    src={relatedProduct.image || "/placeholder.svg"}
                    alt={relatedProduct.name}
                    fill
                    className="object-cover group-hover:scale-105 transition-transform duration-300"
                  />
                  {relatedProduct.badge && (
                    <Badge className="absolute top-3 left-3 bg-yellow-400 text-black font-semibold text-xs">
                      {relatedProduct.badge}
                    </Badge>
                  )}
                  {relatedProduct.originalPrice > relatedProduct.price && (
                    <Badge className="absolute top-3 right-3 bg-red-600 text-white font-bold text-xs">
                      {Math.round(
                        ((relatedProduct.originalPrice - relatedProduct.price) / relatedProduct.originalPrice) * 100,
                      )}
                      % OFF
                    </Badge>
                  )}
                </div>

                <div className="p-4">
                  <div className="flex items-center mb-2">
                    {[...Array(5)].map((_, i) => (
                      <Star
                        key={i}
                        className={`h-3 w-3 ${
                          i < Math.floor(relatedProduct.rating) ? "text-yellow-400 fill-current" : "text-gray-300"
                        }`}
                      />
                    ))}
                    <span className="ml-1 text-xs text-gray-600">({relatedProduct.reviews})</span>
                  </div>

                  <h4 className="font-semibold text-sm mb-2 group-hover:text-yellow-600 transition-colors line-clamp-2">
                    {relatedProduct.name}
                  </h4>

                  <div className="flex items-center justify-between mb-3">
                    <div className="flex items-center space-x-1">
                      <span className="text-lg font-bold text-green-600">${relatedProduct.price}</span>
                      {relatedProduct.originalPrice > relatedProduct.price && (
                        <span className="text-sm text-gray-400 line-through">${relatedProduct.originalPrice}</span>
                      )}
                    </div>
                  </div>

                  <div className="flex flex-col gap-2">
                    <Button
                      size="sm"
                      className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold text-xs"
                    >
                      Add to Cart
                    </Button>
                    <Button size="sm" variant="outline" className="w-full border-gray-300 text-xs">
                      Quick View
                    </Button>
                  </div>
                </div>
              </div>
            ))}
          </div>

          <div className="text-center mt-8">
            <Button
              size="lg"
              variant="outline"
              className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
            >
              View All {product.category}
            </Button>
          </div>
        </div>
      </div>
    </div>
  )
}
