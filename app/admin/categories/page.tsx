"use client"
import { useRouter } from "next/navigation"
import { Button } from '@/components/ui/button'
import { DataTable } from '@/components/ui/data-table'
import type { Category, CategoryColumnType } from '@/types'
import React, { useState, useEffect } from 'react'
import { Pencil, Trash2 } from "lucide-react"
import { deleteCategoryById, getAllCategories } from "@/services/category.service"

const handleDelete = async (id: string) => {
    try {
        await deleteCategoryById(id);
    } catch (error) {
        console.log("Couldn't Delete the Category")
    }
}

const Category = () => {
    const router = useRouter()
    const [categories, setCategories] = useState<Category[]>([])
    const [loading, setLoading] = useState(true)

    const categoryColumns: CategoryColumnType[] = [
        {
            header: "ID",
            accessor: "_id",
            cell: (value: string) => <span className="font-medium">{value}</span>
        }
        ,
        // {
        //     header: "Product",
        //     accessor: "category",
        //     cell: (value: { _id: string; name: string }) => (
        //         <span className="font-medium">{value?.name}</span>
        //     ),
        // }
        ,
        {
            header: "Category Name",
            accessor: 'name' as const,
            cell: (value: string) => <span className="font-medium">{value}</span>,
        },
        {
            header: "Actions",
            accessor: "_id",
            cell: (value: string) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/categories/update/${value}`)}
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
    ];
    useEffect(() => {
        const fetchCategories = async () => {
            try {
                const response = await getAllCategories()
                setCategories(response)
            } catch (error) {
                console.error("Error fetching categories:", error)
            } finally {
                setLoading(false)
            }
        }
        fetchCategories()
    }, [])
    console.log("Categories",categories)
    if (loading) {
        return <div>Loading...</div>
    }

    const handleClick = () => {
        router.push("/admin/categories/create")
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Products</h1>
            <div className="flex justify-end">
                <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleClick}>
                    Create Category
                </Button>
            </div>
            <DataTable
                data={categories}
                columns={categoryColumns}
                className="border rounded-lg shadow-sm"
            />
        </div>
    )
}

export default Category