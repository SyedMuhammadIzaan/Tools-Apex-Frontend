"use client";

import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { getBlogById, updateBlogById } from "@/services/blog.service";
import { useParams } from "next/navigation";
import React, { useEffect, useState } from "react";
import { getAllCategories } from "@/services/category.service";
import { Category } from "@/types";
import { useRouter } from "next/navigation";

const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
        const reader = new FileReader();
        reader.readAsDataURL(file);
        reader.onload = () => {
            if (typeof reader.result === "string") resolve(reader.result);
            else reject("Conversion failed");
        };
        reader.onerror = reject;
    });
};

const UpdateBlog = () => {
    const router=useRouter();
    const params = useParams();
    const blogId = params?.blog as string;
    const [allCategory, setAllCategory] = useState<Category[]>([]);

    const [form, setForm] = useState({
        title: "",
        author: "",
        image: "",
        tag: "",
        excerpt: "",
        category: "",
        readTime: "",
        href: "",
        description: "",
        date: "",
    });

    useEffect(() => {
        const fetchBlogById = async () => {
            try {
                const { data } = await getBlogById(blogId);
                setForm({
                    title: data.title || "",
                    author: data.author || "",
                    image: data.image || "",
                    tag: data.tag || "",
                    excerpt:data.excerpt || "",
                    category: data.category || "",
                    readTime: data.readTime || "",
                    href: data.href || "",
                    description: data.description || "",
                    date: data.date ? new Date(data.date).toISOString().split("T")[0] : "",
                });
            } catch (error) {
                console.error("Fetch blog error:", error);
            }
        };
        const fetchAllCategory = async () => {
            try {
                const res = await getAllCategories();
                setAllCategory(res)
                console.log("data", res)
            } catch (error) {
                console.error("Fetch category error:", error);

            }
        }
        fetchBlogById();
        fetchAllCategory();
    }, [blogId]);
    // console.log("Alll Catgeory", allCategory)
    const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
        const { name, value } = e.target;
        setForm(prev => ({ ...prev, [name]: value }));
    };

    const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
        const file = e.target.files?.[0];
        if (file) {
            try {
                const base64 = await convertToBase64(file);
                setForm(prev => ({ ...prev, image: base64 }));
            } catch (error) {
                console.error("Image conversion failed:", error);
            }
        }
    };

    const handleSubmit = async () => {
        try {
            const payload = {
                ...form,
                date: new Date(form.date), // ✅ convert string to Date
            };
            await updateBlogById(blogId, payload);
            alert("Blog updated successfully!");
            router.push("/admin/blogs");
        } catch (error) {
            console.error("Update error:", error);
            alert("Failed to update blog.");
        }
    };

    return (
        <div className="max-w-4xl mx-auto">
            <h1 className="text-3xl font-bold mb-6">Update Blog Post</h1>

            <div className="space-y-5">
                <div>
                    <label className="block text-sm font-medium mb-1">Title</label>
                    <Input name="title" value={form.title} onChange={handleChange} placeholder="Enter blog title" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Author</label>
                    <Input name="author" value={form.author} onChange={handleChange} placeholder="Author name" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Description</label>
                    <Textarea name="description" value={form.description} onChange={handleChange} placeholder="Blog content..." />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Tag</label>
                    <Input name="tag" value={form.tag} onChange={handleChange} placeholder="Blog tag or keyword (e.g., tech, news)" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Category</label>
                    <Select value={form.category} onValueChange={(value) => setForm(prev => ({ ...prev, category: value }))}>
                        <SelectTrigger>
                            <SelectValue placeholder="Select a category" />
                        </SelectTrigger>
                        <SelectContent>
                            {allCategory.map((cat) => (
                                <SelectItem key={cat._id} value={cat._id}>
                                    {cat.name}
                                </SelectItem>
                            ))}
                        </SelectContent>
                    </Select>
                </div>


                <div>
                    <label className="block text-sm font-medium mb-1">Excerpt *</label>
                    <Input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Comma-separated product IDs" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Read Time</label>
                    <Input name="readTime" value={form.readTime} onChange={handleChange} placeholder="e.g., 3 min read" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">URL Slug</label>
                    <Input name="href" value={form.href} onChange={handleChange} placeholder="e.g., update-blog-2025" />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Date</label>
                    <Input type="date" name="date" value={form.date} onChange={handleChange} />
                </div>

                <div>
                    <label className="block text-sm font-medium mb-1">Blog Image</label>
                    <Input type="file" accept="image/*" onChange={handleImageUpload} />
                    {form.image && (
                        <img src={form.image} alt="Preview" className="mt-4 w-48 h-auto rounded border" />
                    )}
                </div>

                <Button className="bg-blue-700 hover:bg-blue-800" onClick={handleSubmit}>
                    Update Blog
                </Button>
            </div>
        </div>
    );
};

export default UpdateBlog;
