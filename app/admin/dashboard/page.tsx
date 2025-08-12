"use client"
import { getAllBlogs } from "@/services/blog.service"
import { getAllCategories } from "@/services/category.service"
import { getAllProducts } from "@/services/product.service"
import { getAllReviews } from "@/services/review.service"
import { Blog, Category, Product, Review } from "@/types"
import { Package, Tag, Star, FileText, Users, TrendingUp } from "lucide-react"
import { useEffect, useState } from "react"

type StatsType = {
  name: string;
  value: string | number;
  icon: any;
  change: string;
  changeType: "increase" | "decrease";
};

export default function AdminDashboard() {
  const [stats, setStats] = useState<StatsType[]>([])
  const [products, setProducts] = useState<number>(0);
  const [reviews, setReviews] = useState<number>(0);
  const [categories, setCategories] = useState<number>(0);
  const [blogs, setBlogs] = useState<number>(0);

   useEffect(() => {
    const fetchData = async () => {
      try {
        const [productsRes, reviewsRes, blogsRes, categoriesRes] = await Promise.all([
          getAllProducts(),
          getAllReviews(),
          getAllBlogs(),
          getAllCategories()
        ]);

        setProducts(productsRes?.data?.length || 0);
        setReviews(reviewsRes?.data?.length || 0);
        setBlogs(blogsRes?.length || 0);
        setCategories(categoriesRes?.length || 0);  // assuming it's an array too

      } catch (error) {
        console.log("Error fetching dashboard data", error);
      }
    };

    fetchData();
  }, []);

  // This useEffect updates stats after all individual counts are set
  useEffect(() => {
    setStats([
      { name: "Total Products", value: products, icon: Package, change: "+12%", changeType: "increase" },
      { name: "Categories", value: categories, icon: Tag, change: "+5%", changeType: "increase" },
      { name: "Reviews", value: reviews, icon: Star, change: "+18%", changeType: "increase" },
      { name: "Blog Posts", value: blogs, icon: FileText, change: "+3%", changeType: "increase" },
      { name: "Active Users", value: "12,345", icon: Users, change: "+8%", changeType: "increase" },
      { name: "Revenue", value: "$89,432", icon: TrendingUp, change: "+15%", changeType: "increase" },
    ]);
  }, [products, categories, reviews, blogs]);
  // console.log("products COunt", productsCount);
  // const stats = [
  //   { name: "Total Products", value: "1,234", icon: Package, change: "+12%", changeType: "increase" },
  //   { name: "Sales Products", value: "89", icon: Tag, change: "+5%", changeType: "increase" },
  //   { name: "Reviews", value: "5,678", icon: Star, change: "+18%", changeType: "increase" },
  //   { name: "Blog Posts", value: "45", icon: FileText, change: "+3%", changeType: "increase" },
  //   { name: "Active Users", value: "12,345", icon: Users, change: "+8%", changeType: "increase" },
  //   { name: "Revenue", value: "$89,432", icon: TrendingUp, change: "+15%", changeType: "increase" },
  // ]

  const recentActivity = [
    { action: "New product created", item: "18V Cordless Drill", time: "2 hours ago" },
    { action: "Review added", item: "40V Chainsaw", time: "4 hours ago" },
    { action: "Blog post published", item: "Tool Maintenance Guide", time: "6 hours ago" },
    { action: "Sale product updated", item: "Impact Driver Kit", time: "8 hours ago" },
  ]

  return (
    <div className="space-y-6">
      <div>
        <h1 className="text-3xl font-bold text-gray-900">Dashboard</h1>
        <p className="text-gray-600">Welcome back! Here&apos;s what&apos;s happening with your store.</p>
      </div>

      {/* Stats Grid */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
        {stats.map((stat) => (
          <div key={stat.name} className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-gray-600">{stat.name}</p>
                <p className="text-3xl font-bold text-gray-900">{stat.value}</p>
              </div>
              <div className="p-3 bg-yellow-100 rounded-full">
                <stat.icon className="h-6 w-6 text-yellow-600" />
              </div>
            </div>
            <div className="mt-4 flex items-center">
              <span className="text-sm font-medium text-green-600">{stat.change}</span>
              <span className="text-sm text-gray-500 ml-2">from last month</span>
            </div>
          </div>
        ))}
      </div>

      {/* Recent Activity */}
      <div className="grid lg:grid-cols-2 gap-6">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
          <div className="space-y-4">
            {recentActivity.map((activity, index) => (
              <div key={index} className="flex items-center space-x-3">
                <div className="w-2 h-2 bg-yellow-400 rounded-full"></div>
                <div className="flex-1">
                  <p className="text-sm font-medium text-gray-900">{activity.action}</p>
                  <p className="text-sm text-gray-600">{activity.item}</p>
                </div>
                <span className="text-xs text-gray-500">{activity.time}</span>
              </div>
            ))}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h3 className="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
          <div className="grid grid-cols-2 gap-4">
            <a
              href="/admin/products/create"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Package className="h-8 w-8 text-yellow-600 mb-2" />
              <p className="font-medium">Create Product</p>
            </a>
            <a
              href="/admin/categories/create"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Tag className="h-8 w-8 text-yellow-600 mb-2" />
              <p className="font-medium">Add Categories</p>
            </a>
            <a
              href="/admin/reviews/create"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <Star className="h-8 w-8 text-yellow-600 mb-2" />
              <p className="font-medium">Add Review</p>
            </a>
            <a
              href="/admin/blogs/create"
              className="p-4 border border-gray-200 rounded-lg hover:bg-gray-50 transition-colors"
            >
              <FileText className="h-8 w-8 text-yellow-600 mb-2" />
              <p className="font-medium">Write Blog</p>
            </a>
          </div>
        </div>
      </div>
    </div>
  )
}