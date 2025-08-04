"use client"
import Image from "next/image"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import Link from "next/link"
import { useEffect, useState } from "react";
import { Product } from "@/types";
import { getAllProducts } from "@/services/product.service";

export default function SavingsSection() {
  const [products,setAllProducts]=useState<Product[]>([]);
  useEffect(()=>{
    const fetchAllProducts=async ()=>{
      const allProducts=await getAllProducts();
      setAllProducts(allProducts?.data);
    }
    fetchAllProducts();
  },[])
  console.log("Hey Products",products)
  // const saleItems = [
  //   {
  //     id: "18v-cordless-drill-kit",
  //     name: "18V ONE+ Cordless Drill Kit",
  //     originalPrice: 199,
  //     salePrice: 149,
  //     discount: 25,
  //     image: "/placeholder.svg?height=300&width=300",
  //     rating: 4.8,
  //     reviews: 1247,
  //   },
  //   {
  //     id: "40v-brushless-chainsaw",
  //     name: "40V Brushless Chainsaw",
  //     originalPrice: 299,
  //     salePrice: 229,
  //     discount: 23,
  //     image: "/placeholder.svg?height=300&width=300",
  //     rating: 4.6,
  //     reviews: 892,
  //   },
  //   {
  //     id: "18v-circular-saw",
  //     name: "18V Circular Saw",
  //     originalPrice: 159,
  //     salePrice: 99,
  //     discount: 38,
  //     image: "/placeholder.svg?height=300&width=300",
  //     rating: 4.7,
  //     reviews: 634,
  //   },
  //   {
  //     id: "one-plus-6-tool-combo-kit",
  //     name: "ONE+ 6-Tool Combo Kit",
  //     originalPrice: 499,
  //     salePrice: 349,
  //     discount: 30,
  //     image: "/placeholder.svg?height=300&width=300",
  //     rating: 4.9,
  //     reviews: 2156,
  //   },
  //   {
  //     id: "40v-leaf-blower",
  //     name: "40V Leaf Blower",
  //     originalPrice: 179,
  //     salePrice: 129,
  //     discount: 28,
  //     image: "/placeholder.svg?height=300&width=300",
  //     rating: 4.5,
  //     reviews: 743,
  //   },
  //   {
  //     id: "18v-impact-driver",
  //     name: "18V Impact Driver",
  //     originalPrice: 129,
  //     salePrice: 89,
  //     discount: 31,
  //     image: "/placeholder.svg?height=300&width=300",
  //     rating: 4.8,
  //     reviews: 1089,
  //   },
  // ]

  return (
    <section className="bg-gray-900 text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            <span className="text-yellow-400">SAVINGS</span> THAT POWER YOUR PROJECTS
          </h2>
          <p className="text-xl text-gray-300 max-w-2xl mx-auto">
            Discover incredible deals on professional-grade tools. Limited time offers on our most popular equipment.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {products?.map((item) => (
            <div
              key={item._id}
              className="bg-black rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative">
                <Image
                  src={item?.mainImage || "/placeholder.svg"}
                  alt={item.name}
                  width={300}
                  height={300}
                  className="w-full h-64 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-red-600 text-white font-bold">{item.discount}% OFF</Badge>
              </div>

              <div className="p-6">
                <h3 className="font-semibold text-lg mb-2 group-hover:text-yellow-400 transition-colors">
                  <Link href={`/products/${item._id}`}>{item.name}</Link>
                </h3>

                <div className="flex items-center mb-3">
                  <div className="flex text-yellow-400 text-sm">
                    {[...Array(5)].map((_, i) => (
                      <span key={i} className={i < Math.floor(item.rating) ? "★" : "☆"}>
                        ★
                      </span>
                    ))}
                  </div>
                  <span className="text-gray-400 text-sm ml-2">({item.reviewCount})</span>
                </div>

                <div className="flex items-center justify-between mb-4">
                  <div className="flex items-center space-x-2">
                    <span className="text-2xl font-bold text-yellow-400">${item.price}</span>
                    <span className="text-gray-400 line-through">${item.originalPrice}</span>
                  </div>
                  <span className="text-green-400 font-semibold">Save ${item.originalPrice - item.price}</span>
                </div>

                <Button asChild className="w-full bg-yellow-400 text-black hover:bg-yellow-500 font-semibold">
                  <Link href={`/p/product/${item.name}`}>View Details</Link>
                </Button>
              </div>
            </div>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            size="lg"
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            View All Sale Items
          </Button>
        </div>
      </div>
    </section>
  )
}
