"use client"
import { useRouter } from "next/navigation"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import { deleteProductById, getAllProducts } from '@/services/product.service'
import type { Product, ProductColumnType } from '@/types'
import React, { useState, useEffect } from 'react'
import { Pencil, Trash2 } from "lucide-react"


interface ProductDataType {
  id?: string
  name: string
  price: number
  originalPrice: number
  discount: number
  rating: number
  reviewCount: number
  inStock: boolean
  images: string[]
  description: string
  features: string[]
  specification: Record<string, string> // Changed from 'specification' to 'specifications'
  included: string[]
  category: string
}

const handleDelete = async (id) => {
  try{
    await deleteProductById(id);
  }catch(error){
    console.log("Couldn't Delete the Product")
  }
}

const Product = () => {
  const router = useRouter()
  const [products, setProducts] = useState<Product[]>([])
  const [loading, setLoading] = useState(true)

  const productColumns: ProductColumnType[] = [
    // {
    //   header: "ID",
    //   accessor: "_id",
    //   cell: (value: string) => <span className="font-medium">{value}</span>
    // }
    ,
    {
      header: "Category",
      accessor: "category",
      cell: (value: { _id: string; name: string }) => (
        <span className="font-medium">{value?.name}</span>
      ),
    }
    ,
    {
      header: "Product Name",
      accessor: 'name' as const,
      cell: (value: string) => <span className="font-medium">{value}</span>,
    },
    {
      header: "Current Price",
      accessor: "price" as const,
      cell: (value: number) => <span>$`${value.toFixed(2)}`</span>,
    },
    // {
    //   header: "Original Price",
    //   accessor: "originalPrice" as const,
    //   cell: (value: number) => `$${value.toFixed(2)}`,
    // },
    {
      header: "Discount",
      accessor: "discount" as const,
      cell: (value: number) => <span>`${value}%`</span>,
    },
    {
      header: "Stock Status",
      accessor: "inStock" as const,
      cell: (value: boolean) => (
        <span className={value ? "text-green-500" : "text-red-500"}>
          {value ? "In Stock" : "Out of Stock"}
        </span>
      ),
    },
    // {
    //   header: "Features",
    //   accessor: "features" as const,
    //   cell: (value: string[]) => (
    //     <ul className="list-disc list-inside">
    //       {value.slice(0, 2).map((feature, i) => (
    //         <li key={i}>{feature}</li>
    //       ))}
    //       {value.length > 2 && <li>+{value.length - 2} more</li>}
    //     </ul>
    //   ),
    // },
    {
      header: "Specifications",
      accessor: "specification" as const,
      cell: (value: Record<string, string>) => (
        <div className="max-w-xs truncate">
          {Object.entries(value)
            .slice(0, 2)
            .map(([key, val]) => (
              <div key={key}>
                <span className="font-medium">{key}:</span> {val}
              </div>
            ))}
        </div>
      ),
    },
    {
      header: "Actions",
      accessor: "_id",
      cell: (value:string) => (
        <div className="flex gap-2">
          <Button
            variant="outline"
            size="sm"
            onClick={() => router.push(`/admin/products/update/${value}`)}
          >
            <Pencil className="w-4 h-4 mr-1" /> Edit
          </Button>
          <Button
            variant="destructive"
            size="sm"
            onClick={() => handleDelete(`${value}`)}
          >
            <Trash2 className="w-4 h-4 mr-1" /> Delete
          </Button>
        </div>
      ),
    },
  ]
  useEffect(() => {
    const fetchProducts = async () => {
      try {
        const { data } = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.error("Error fetching products:", error)
      } finally {
        setLoading(false)
      }
    }
    fetchProducts()
  }, [])
  

  if (loading) {
    return <div>Loading products...</div>
  }

  const handleClick = () => {
    router.push("/admin/products/create")
  }
  return (
    <div className="p-6">
      <h1 className="text-2xl font-bold mb-4">Products</h1>
      <div className="flex justify-end">
        <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleClick}>
          Create Product
        </Button>
      </div>
      <DataTable
        data={products}
        columns={productColumns}
        className="border rounded-lg shadow-sm"
      />
    </div>
  )
}

export default Product