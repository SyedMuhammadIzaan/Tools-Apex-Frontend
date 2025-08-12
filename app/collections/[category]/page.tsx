import CollectionPage from "@/components/collection-page"
import Header from "@/components/header"
import Footer from "@/components/footer"
import { notFound } from "next/navigation"

// Sample collection data
const collections = {
  "power-tools": {
    id: "power-tools",
    name: "Power Tools",
    description:
      "Professional-grade power tools for every project. From drilling and cutting to sanding and grinding, our comprehensive collection delivers the performance and reliability you need.",
    heroImage: "/placeholder.svg?height=400&width=1200",
    products: [
      {
        id: "18v-cordless-drill-kit",
        name: "18V ONE+ Cordless Drill Kit",
        price: 149,
        originalPrice: 199,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 1247,
        badge: "Best Seller",
      },
      {
        id: "one-plus-6-tool-combo",
        name: "ONE+ 6-Tool Combo Kit",
        price: 349,
        originalPrice: 499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 2156,
        badge: "Great Value",
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
        id: "18v-impact-driver",
        name: "18V Impact Driver",
        price: 89,
        originalPrice: 129,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 1089,
        badge: "New",
      },
      {
        id: "18v-angle-grinder",
        name: "18V Angle Grinder",
        price: 119,
        originalPrice: 149,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 523,
        badge: "",
      },
      {
        id: "18v-reciprocating-saw",
        name: "18V Reciprocating Saw",
        price: 129,
        originalPrice: 169,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 789,
        badge: "",
      },
    ],
  },
  "outdoor-power": {
    id: "outdoor-power",
    name: "Outdoor Power",
    description:
      "Transform your outdoor space with our powerful lawn and garden equipment. From mowing and trimming to clearing and cleanup, we have the tools to keep your yard looking its best.",
    heroImage: "/placeholder.svg?height=400&width=1200",
    products: [
      {
        id: "40v-brushless-chainsaw",
        name: "40V Brushless Chainsaw",
        price: 229,
        originalPrice: 299,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 892,
        badge: "Professional",
      },
      {
        id: "40v-leaf-blower",
        name: "40V Leaf Blower",
        price: 129,
        originalPrice: 179,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 743,
        badge: "Lightweight",
      },
      {
        id: "40v-string-trimmer",
        name: "40V String Trimmer",
        price: 149,
        originalPrice: 199,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 1156,
        badge: "Versatile",
      },
      {
        id: "40v-hedge-trimmer",
        name: "40V Hedge Trimmer",
        price: 179,
        originalPrice: 229,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 445,
        badge: "Precision",
      },
    ],
  },
  "land-mowers": {
    id: "land-mowers",
    name: "Land Mowers",
    description:
      "Professional lawn care equipment for every yard size. From compact push mowers to powerful riding mowers, achieve a perfect cut every time.",
    heroImage: "/placeholder.svg?height=400&width=1200",
    products: [
      {
        id: "40v-self-propelled-mower",
        name: "40V Self-Propelled Mower",
        price: 399,
        originalPrice: 499,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 1523,
        badge: "Self-Propelled",
      },
      {
        id: "40v-push-mower",
        name: "40V Push Mower",
        price: 299,
        originalPrice: 379,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 987,
        badge: "Eco-Friendly",
      },
      {
        id: "riding-mower-42",
        name: '42" Riding Mower',
        price: 1299,
        originalPrice: 1599,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 234,
        badge: "Premium",
      },
      {
        id: "zero-turn-mower",
        name: "Zero Turn Mower",
        price: 2499,
        originalPrice: 2999,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 156,
        badge: "Professional",
      },
    ],
  },
  "rotary-tillers": {
    id: "rotary-tillers",
    name: "Rotary Tilers",
    description:
      "Heavy-duty soil preparation tools for gardens and landscaping. Break new ground with confidence using our powerful and reliable tilling equipment.",
    heroImage: "/placeholder.svg?height=400&width=1200",
    products: [
      {
        id: "gas-rear-tine-tiller",
        name: "Gas Rear-Tine Tiller",
        price: 899,
        originalPrice: 1199,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 445,
        badge: "Heavy Duty",
      },
      {
        id: "electric-cultivator",
        name: "Electric Cultivator",
        price: 199,
        originalPrice: 249,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 678,
        badge: "Compact",
      },
      {
        id: "gas-front-tine-tiller",
        name: "Gas Front-Tine Tiller",
        price: 599,
        originalPrice: 749,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 523,
        badge: "Versatile",
      },
      {
        id: "40v-cordless-tiller",
        name: "40V Cordless Tiller",
        price: 349,
        originalPrice: 429,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.4,
        reviews: 289,
        badge: "Cordless",
      },
    ],
  },
  recreation: {
    id: "recreation",
    name: "Recreation",
    description:
      "Take the fun anywhere with cordless coolers, speakers, inflators and more. Gear built for the job-site that’s just as great for game day.",
    heroImage: "/placeholder.svg?height=400&width=1200",
    products: [
      {
        id: "18v-bluetooth-speaker",
        name: "18V Bluetooth Speaker",
        price: 59,
        originalPrice: 79,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 812,
        badge: "Top Pick",
      },
      {
        id: "18v-inflator",
        name: "18V High-Pressure Inflator",
        price: 69,
        originalPrice: 89,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 654,
        badge: "Portable",
      },
      {
        id: "18v-led-lantern",
        name: "18V Hybrid LED Lantern",
        price: 49,
        originalPrice: 69,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.9,
        reviews: 932,
        badge: "Bright",
      },
      {
        id: "18v-cooler",
        name: "18V/120V Cordless Cooler",
        price: 279,
        originalPrice: 329,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 418,
        badge: "New",
      },
    ],
  },
  "more-tools": {
    id: "more-tools",
    name: "More Tools",
    description:
      "Discover specialty tools, accessories, and exclusive bundles that don’t fit into our primary categories - perfect additions to any workshop.",
    heroImage: "/placeholder.svg?height=400&width=1200",
    products: [
      {
        id: "18v-hot-glue-gun",
        name: "18V Cordless Hot Glue Gun",
        price: 49,
        originalPrice: 69,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.7,
        reviews: 287,
        badge: "Handy",
      },
      {
        id: "18v-soldering-station",
        name: "18V Soldering Station",
        price: 79,
        originalPrice: 99,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.8,
        reviews: 164,
        badge: "Pro",
      },
      {
        id: "18v-rotary-tool",
        name: "18V Rotary Tool Kit",
        price: 99,
        originalPrice: 129,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.6,
        reviews: 422,
        badge: "Versatile",
      },
      {
        id: "18v-workshop-blower",
        name: "18V Workshop Blower",
        price: 59,
        originalPrice: 79,
        image: "/placeholder.svg?height=300&width=300",
        rating: 4.5,
        reviews: 198,
        badge: "Compact",
      },
    ],
  },
}

interface CollectionPageProps {
  params: Promise<{ category: string }>
}

export default async function CollectionPageRoute({ params }: CollectionPageProps) {
  const { category } = await params
  const collection = collections[category as keyof typeof collections]

  if (!collection) {
    notFound()
  }

  return (
    <div className="min-h-screen bg-white">
      <Header />
      <CollectionPage collection={collection} />
      <Footer />
    </div>
  )
}

export async function generateStaticParams() {
  return Object.keys(collections).map((category) => ({
    category,
  }))
}
