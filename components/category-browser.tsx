"use client"
import { getAllCategories } from "@/services/category.service"
import Image from "next/image"
import Link from "next/link"
import { useEffect, useState } from "react"
import type { Category } from "@/types";

export default function CategoryBrowser() {
  const [categories, setAllCategories] = useState<Category[]>([])
  useEffect(() => {
    const fetchCategories = async () => {
      const category = await getAllCategories();
      setAllCategories(category);
    };
    fetchCategories();
  }, []);

  // console.log("Categories", categories)
  // const categories = [
  //   {
  //     name: "Land Mowers",
  //     image: "/placeholder.svg?height=200&width=200",
  //     href: "/collections/land-mowers",
  //   },
  //   {
  //     name: "Rotary Tillers",
  //     image: "/placeholder.svg?height=200&width=200",
  //     href: "/collections/rotary-tillers",
  //   },
  //   {
  //     name: "More Tools",
  //     image: "/placeholder.svg?height=200&width=200",
  //     href: "/collections/more-tools",
  //   },

  // ]

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <h2 className="text-3xl lg:text-4xl font-bold text-center mb-12">BROWSE CATEGORIES FOR EVERY PURPOSE</h2>

        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-3 gap-8">
          {categories?.map((category) => {
            console.log("Category", category)
            return (

              <Link
                key={category.name}
                href={`/collections/${category.name.toLowerCase().replace(/\s+/g, '-')}`
                }
                className="group text-center hover:transform hover:scale-105 transition-all duration-300"
              >
                <div className="relative mb-4">
                  <div className="w-32 h-32 lg:w-40 lg:h-40 mx-auto rounded-full overflow-hidden bg-gray-800 border-4 border-yellow-400 group-hover:border-yellow-300">
                    <Image
                      src={category.image[0] || "/placeholder.svg"}
                      alt={category.name}
                      width={160}
                      height={160}
                      className="w-full h-full object-cover group-hover:scale-110 transition-transform duration-300"
                    />
                  </div>
                </div>
                <h3 className="text-lg font-semibold group-hover:text-yellow-400 transition-colors">{category.name}</h3>
              </Link>
            )
          })}
        </div>
      </div>
    </section >
  )
}
