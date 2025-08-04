// "use client"
import ProductDetail from "@/components/product-detail"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"
// import { useEffect, useState } from "react"
import { Product } from "@/types"
import { getProductByName } from "@/services/product.service"

// Sample product data - in a real app, this would come from a database
const products = {
  "18v-cordless-drill-kit": {
    id: "18v-cordless-drill-kit",
    name: "18V ONE+ Cordless Drill Kit",
    price: 149,
    originalPrice: 199,
    discount: 25,
    rating: 4.8,
    reviewCount: 1247,
    inStock: true,
    sku: "TA-CD18-001",
    category: "Power Tools",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description:
      "The 18V ONE+ Cordless Drill Kit delivers professional performance with exceptional versatility. Perfect for drilling, driving, and fastening applications.",
    features: [
      "24-position clutch prevents overdriving screws",
      "2-speed gearbox for drilling and driving versatility",
      "1/2 inch single sleeve keyless chuck",
      "LED light illuminates work area",
      "Ergonomic grip for comfort during extended use",
      "Compatible with 200+ ONE+ tools",
    ],
    specifications: {
      "Chuck Size": "1/2 inch",
      "Speed Range": "0-400 / 0-1,500 RPM",
      "Max Torque": "515 in-lbs",
      Battery: "18V ONE+ Lithium-ion",
      Weight: "3.5 lbs",
      Warranty: "3 Years",
    },
    included: [
      "18V ONE+ Cordless Drill",
      "18V ONE+ 1.5Ah Battery",
      "18V ONE+ Charger",
      "Belt Clip",
      "Operator's Manual",
    ],
  },
  "40v-brushless-chainsaw": {
    id: "40v-brushless-chainsaw",
    name: "40V Brushless Chainsaw",
    price: 229,
    originalPrice: 299,
    discount: 23,
    rating: 4.6,
    reviewCount: 892,
    inStock: true,
    sku: "TA-CS40-002",
    category: "Outdoor Power",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description:
      "Professional-grade 40V brushless chainsaw delivers gas-like power without the hassle. Perfect for pruning, cutting firewood, and storm cleanup.",
    features: [
      "Brushless motor for 2X longer runtime",
      "14-inch Oregon bar and chain",
      "Tool-free chain tensioning",
      "Automatic oiler keeps chain lubricated",
      "Wrap-around handle for comfortable grip",
      "Safety features include chain brake",
    ],
    specifications: {
      "Bar Length": "14 inches",
      "Chain Speed": "49.2 ft/sec",
      "Oil Tank": "6.76 fl oz",
      Battery: "40V Lithium-ion",
      Weight: "8.8 lbs",
      Warranty: "5 Years",
    },
    included: ["40V Brushless Chainsaw", "14-inch Oregon Bar", "Oregon Chain", "Scabbard", "Operator's Manual"],
  },
  "40v-leaf-blower": {
    id: "40v-leaf-blower",
    name: "40V Leaf Blower",
    price: 129,
    originalPrice: 179,
    discount: 28,
    rating: 4.5,
    reviewCount: 743,
    inStock: true,
    sku: "TA-LB40-003",
    category: "Outdoor Power",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description:
      "Power through leaves and debris with the lightweight 40 V Leaf Blower. Brushless motor technology provides gas-like performance without the noise, fumes or maintenance.",
    features: [
      "Brushless motor for extended runtime",
      "Up to 500 CFM & 110 MPH air speed",
      "Variable-speed trigger with turbo boost",
      "Ergonomic, lightweight design (under 8 lbs)",
      "Compatible with all 40 V TOOLS APEX batteries",
    ],
    specifications: {
      "Max Air Volume": "500 CFM",
      "Max Air Speed": "110 MPH",
      "Noise Level": "65 dB",
      Battery: "40 V Lithium-ion",
      Weight: "7.8 lbs",
      Warranty: "5 Years",
    },
    included: ["40 V Leaf Blower", "40 V 4.0 Ah Battery", "40 V Fast Charger", "Operator's Manual"],
  },
  "one-plus-6-tool-combo": {
    id: "one-plus-6-tool-combo",
    name: "ONE+ 6-Tool Combo Kit",
    price: 349,
    originalPrice: 499,
    discount: 30,
    rating: 4.9,
    reviewCount: 2156,
    inStock: true,
    sku: "TA-CK6-003",
    category: "Power Tools",
    images: [
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
      "/placeholder.svg?height=600&width=600",
    ],
    description:
      "Complete your workshop with this comprehensive 6-tool combo kit. Everything you need for drilling, cutting, sanding, and more.",
    features: [
      "6 essential tools in one kit",
      "All tools powered by ONE+ 18V battery",
      "Professional-grade performance",
      "Includes 2 batteries and charger",
      "Convenient carrying bag included",
      "Save over $150 vs buying separately",
    ],
    specifications: {
      "Tools Included": "6 Tools",
      "Battery Voltage": "18V ONE+",
      "Batteries Included": "2 x 1.5Ah",
      Charger: "18V ONE+ Charger",
      "Carrying Case": "Heavy-duty bag",
      Warranty: "3 Years",
    },
    included: [
      "18V Cordless Drill",
      "18V Circular Saw",
      "18V Reciprocating Saw",
      "18V Multi-Tool",
      "18V LED Work Light",
      "18V Bluetooth Speaker",
      "2 x 18V 1.5Ah Batteries",
      "18V Charger",
      "Heavy-duty Carrying Bag",
    ],
  },
}

interface ProductPageProps {
  params: { slug: string }
}

export default async function ProductPage({ params }: ProductPageProps) {
  const { slug } = params
  const decodeSlug= decodeURIComponent(slug)
  // console.log("Slug",decodeSlug)
  const [singleProduct,setSingleProduct]=useState<Product[]>([]);

  // useEffect(()=>{
  //   const getSingleProduct=async (productName:string)=>{
  //     const p=await getProductByName(productName);
  //     setSingleProduct(p);
  //   }
  //   getSingleProduct(slug);
  // },[])
  // console.log("Single Product",singleProduct)
  const product = products[slug as keyof typeof products]
  // console.log("Product Typeof",product)

  try{
    const product=await getProductByName(decodeSlug)
    
      if (!product) {
        notFound()
      }

      
      return (
        <div className="min-h-screen bg-white">
        <Header />
        <ProductDetail product={singleProduct} />
        <Footer />
    </div>
  )
}catch(error){
  console.error("Error fetching Product",error);
  notFound()
}
}

export async function generateStaticParams() {
  return Object.keys(singleProduct).map((slug) => ({
    slug,
  }))
}
