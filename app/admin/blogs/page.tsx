"use client"
import React, { useEffect, useState } from 'react'
import { Button } from '@/components/ui/button';
import { DataTable } from '@/components/ui/data-table';
import { useRouter } from "next/navigation";
import type { Blog, BlogColumnType } from '@/types';
import { Pencil, Trash2 } from 'lucide-react';
import { deleteBlogById, getAllBlogs } from '@/services/blog.service';
const Blog = () => {
    const router = useRouter();
    const [blogs, setBlogs] = useState<Blog[]>([]);
    const [loading, setLoading] = useState<boolean>(true);

    const blogColumns: BlogColumnType[] = [
        {
            header: "ID",
            accessor: "_id",
            cell: (value: string) => <span>{value}</span>
        },
        {
            header: "Publish Date",
            accessor: "createdAt",
            cell: (value: string) => <span>{value}</span>
        },
        {
            header: "Title",
            accessor: "title",
            cell: (value: string) => <span className="font-medium">{value}</span>
        },
        {
            header: "Auhtor",
            accessor: "author",
            cell: (value: string) => <span className=''>{value}</span>
        },
        {
            header: "Actions",
            accessor: "_id",
            cell: (value: string) => (
                <div className="flex gap-2">
                    <Button
                        variant="outline"
                        size="sm"
                        onClick={() => router.push(`/admin/blogs/update/${value}`)}
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
        const fetchBlog = async () => {
            try {
                const response = await getAllBlogs();
                setBlogs(response)
            } catch (error) {
                console.log("Error fetching Blog", error)
            } finally {
                setLoading(false)
            }
        }
        fetchBlog();
    }, [])
    const handleClick = () => {
        router.push("/admin/blogs/create")
    }
    const handleDelete = async (id: string) => {
        try {
            await deleteBlogById(id)
            alert("Blog Deleted");
        } catch (error) {
            console.log("Couldn't Delete the Blog");
        }
    }
    if (loading) {
        return <div>Loading blogs...</div>
    }
    return (
        <div className="p-6">
            <h1 className="text-2xl font-bold mb-4">Blogs</h1>
            <div className="flex justify-end">
                <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleClick}>
                    Create Blog
                </Button>
            </div>
            <DataTable data={blogs} columns={blogColumns} className="border rounded-lg shadow-sm" />
        </div>
    )
}

export default Blog