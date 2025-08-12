"use client";
import Image from "next/image"
import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Badge } from "@/components/ui/badge"
import { Calendar, User, ArrowRight } from "lucide-react"
import type { Blog } from "@/types";
import {getAllBlogs} from "@/services/blog.service";
import { useState,useEffect } from "react";

export default function BlogSection() {
  const [blog,setAllBlogs]=useState<Blog[]>([]);
  useEffect(()=>{
    const fetchAllBlog=async ()=>{
      const blogs=await getAllBlogs();
      setAllBlogs(blogs) 
    }
    fetchAllBlog()
  },[])
  console.log("Blog",blog)

  // const blogPosts = [
  //   {
  //     id: 1,
  //     title: "10 Essential Power Tools Every DIY Enthusiast Needs",
  //     excerpt:
  //       "Discover the must-have power tools that will transform your DIY projects and help you tackle any home improvement task with confidence.",
  //     image: "/placeholder.svg?height=300&width=400",
  //     category: "DIY Tips",
  //     author: "Mike Johnson",
  //     date: "Dec 15, 2024",
  //     readTime: "5 min read",
  //     href: "/blog/essential-power-tools-diy",
  //   },
  //   {
  //     id: 2,
  //     title: "Maintaining Your Lawn Mower: A Complete Seasonal Guide",
  //     excerpt:
  //       "Keep your lawn mower running smoothly all season long with our comprehensive maintenance checklist and expert tips.",
  //     image: "/placeholder.svg?height=300&width=400",
  //     category: "Maintenance",
  //     author: "Sarah Davis",
  //     date: "Dec 12, 2024",
  //     readTime: "7 min read",
  //     href: "/blog/lawn-mower-maintenance-guide",
  //   },
  //   {
  //     id: 3,
  //     title: "Battery Technology: The Future of Cordless Tools",
  //     excerpt:
  //       "Explore the latest advances in battery technology and how they're revolutionizing the cordless tool industry.",
  //     image: "/placeholder.svg?height=300&width=400",
  //     category: "Technology",
  //     author: "David Chen",
  //     date: "Dec 10, 2024",
  //     readTime: "6 min read",
  //     href: "/blog/battery-technology-future",
  //   },
  //   {
  //     id: 4,
  //     title: "Safety First: Essential Workshop Safety Guidelines",
  //     excerpt:
  //       "Learn the fundamental safety practices every workshop should follow to prevent accidents and create a secure working environment.",
  //     image: "/placeholder.svg?height=300&width=400",
  //     category: "Safety",
  //     author: "Lisa Rodriguez",
  //     date: "Dec 8, 2024",
  //     readTime: "4 min read",
  //     href: "/blog/workshop-safety-guidelines",
  //   },
  // ]

  return (
    <section className="bg-black text-white py-16">
      <div className="container mx-auto px-4">
        <div className="text-center mb-12">
          <h2 className="text-4xl lg:text-5xl font-bold mb-4">
            LATEST FROM OUR <span className="text-yellow-400">BLOG</span>
          </h2>
          <p className="text-xl text-gray-300 max-w-3xl mx-auto">
            Stay updated with the latest tips, guides, and industry insights from our team of tool experts and
            professionals.
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {blog?.map((post,index) => (
            <article
              key={index}
              className="bg-gray-900 rounded-lg overflow-hidden hover:transform hover:scale-105 transition-all duration-300 group"
            >
              <div className="relative">
                <Image
                  src={post?.image || "/placeholder.svg"}
                  alt={post.title}
                  width={400}
                  height={300}
                  className="w-full h-48 object-cover group-hover:scale-110 transition-transform duration-300"
                />
                <Badge className="absolute top-4 left-4 bg-yellow-400 text-black font-semibold">{post?.category[0]}</Badge>
              </div>

              <div className="p-6">
                <div className="flex items-center text-sm text-gray-400 mb-3 space-x-4">
                  <div className="flex items-center space-x-1">
                    <User className="h-4 w-4" />
                    <span>{post.author}</span>
                  </div>
                  <div className="flex items-center space-x-1">
                    <Calendar className="h-4 w-4" />
                    <span>{post?.date}</span>
                  </div>
                </div>

                <h3 className="font-bold text-lg mb-3 group-hover:text-yellow-400 transition-colors line-clamp-2">
                  {post.title}
                </h3>

                <p className="text-gray-300 text-sm mb-4 line-clamp-3">{post?.excerpt}</p>

                <div className="flex items-center justify-between">
                  <span className="text-xs text-gray-500">{post.readTime}</span>
                  <Button
                    asChild
                    variant="ghost"
                    size="sm"
                    className="text-yellow-400 hover:text-yellow-300 hover:bg-yellow-400/10 p-0"
                  >
                    <Link href={post.href} className="flex items-center space-x-1">
                      <span>Read More</span>
                      <ArrowRight className="h-4 w-4" />
                    </Link>
                  </Button>
                </div>
              </div>
            </article>
          ))}
        </div>

        <div className="text-center mt-12">
          <Button
            asChild
            size="lg"
            variant="outline"
            className="border-yellow-400 text-yellow-400 hover:bg-yellow-400 hover:text-black"
          >
            <Link href="/blog">View All Articles</Link>
          </Button>
        </div>
      </div>
    </section>
  )
}
