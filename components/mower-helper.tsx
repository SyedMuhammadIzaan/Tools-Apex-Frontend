"use client"

import { useState } from "react"
import { X } from "lucide-react"
import { Button } from "@/components/ui/button"
import Link from "next/link"

export default function MowerHelper() {
  const [isVisible, setIsVisible] = useState(true)

  if (!isVisible) return null

  return (
    <div className="fixed bottom-4 left-4 z-50 max-w-sm">
      <div className="bg-yellow-400 text-black p-4 rounded-lg shadow-lg relative">
        <Button
          variant="ghost"
          size="icon"
          className="absolute top-2 right-2 text-black hover:bg-black/10"
          onClick={() => setIsVisible(false)}
        >
          <X className="h-4 w-4" />
        </Button>

        <div className="pr-8">
          <h3 className="font-bold text-lg mb-2">{"ROBERT H ."}</h3>
          <p className="text-sm mb-4">{"Ordered a product from LAND MOWERS category 8mins ago . "}</p>
          <Button asChild className="bg-black text-yellow-400 hover:bg-gray-800 font-semibold" size="sm">
            <Link href="/collections/land-mowers">{"Shop LAND MOWERS"}</Link>
          </Button>
        </div>
      </div>
    </div>
  )
}
