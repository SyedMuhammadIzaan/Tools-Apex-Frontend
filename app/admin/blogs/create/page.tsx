"use client";

import { useEffect, useState } from "react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Textarea } from "@/components/ui/textarea";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Upload, Eye } from "lucide-react";
import { getAllCategories } from "@/services/category.service";
import { createBlog } from "@/services/blog.service";
import { Category } from "@/types";

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

export default function CreateBlogPage() {
  const [tags, setTags] = useState<string[]>([]);
  const [newTag, setNewTag] = useState("");
  const [allCategory, setAllCategory] = useState<Category[]>([]);
  const [image, setImage] = useState<string>("");
  const [form, setForm] = useState({
    title: "",
    author: "",
    description: "",
    excerpt:"",
    tag:[],
    category: "",
    readTime: "",
    href: "",
    date: new Date().toISOString().slice(0, 16),
  });

  useEffect(() => {
    const fetchAllCategory = async () => {
      try {
        const res = await getAllCategories();
        setAllCategory(res);
      } catch (error) {
        console.error("Fetch category error:", error);
      }
    };
    fetchAllCategory();
  }, []);

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()]);
      setNewTag("");
    }
  };

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove));
  };

  const handleImageUpload = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      try {
        const base64 = await convertToBase64(file);
        setImage(base64);
      } catch (error) {
        console.error("Image conversion failed:", error);
      }
    }
  };

  const handleChange = (e: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>) => {
    const { name, value } = e.target;
    setForm((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async () => {
    try {
      await createBlog({ ...form, image, tag: tags });
      alert("Blog created successfully!");
    } catch (error) {
      console.error("Create blog error:", error);
      alert("Failed to create blog.");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Blog Post</h1>
      </div>

      <div className="space-y-6 bg-white p-6 rounded-lg shadow-sm border border-gray-200">
        <div>
          <label className="block text-sm font-medium mb-2">Title</label>
          <Input name="title" value={form.title} onChange={handleChange} placeholder="Blog title" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">URL Slug</label>
          <Input name="href" value={form.href} onChange={handleChange} placeholder="unique-url-slug" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Author</label>
          <Input name="author" value={form.author} onChange={handleChange} placeholder="Author name" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Category</label>
          <Select onValueChange={(val) => setForm((prev) => ({ ...prev, category: val }))}>
            <SelectTrigger>
              <SelectValue placeholder="Select category" />
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
          <label className="block text-sm font-medium mb-2">Description</label>
          <Textarea
            name="description"
            value={form.description}
            onChange={handleChange}
            placeholder="Brief description of the blog"
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Related Products</label>
          <Input name="excerpt" value={form.excerpt} onChange={handleChange} placeholder="Comma-separated IDs" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Read Time</label>
          <Input name="readTime" value={form.readTime} onChange={handleChange} placeholder="e.g., 5 min read" />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Publish Date</label>
          <Input
            type="datetime-local"
            name="date"
            value={form.date}
            onChange={handleChange}
          />
        </div>
        <div>
          <label className="block text-sm font-medium mb-2">Image</label>
          <Input type="file" accept="image/*" onChange={handleImageUpload} />
          {image && <img src={image} alt="Preview" className="mt-4 w-48 h-auto rounded border" />}
        </div>

        <div>
          <label className="block text-sm font-medium mb-2">Tags</label>
          <div className="flex gap-2 mb-2">
            <Input
              value={newTag}
              onChange={(e) => setNewTag(e.target.value)}
              onKeyDown={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
              placeholder="Add a tag"
            />
            <Button type="button" onClick={addTag}>Add</Button>
          </div>
          <div className="flex flex-wrap gap-2">
            {tags.map((tag) => (
              <span key={tag} className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm flex items-center">
                {tag}
                <button onClick={() => removeTag(tag)} className="ml-1">×</button>
              </span>
            ))}
          </div>
        </div>
      </div>

      <div className="flex justify-end mt-6">
        <Button onClick={handleSubmit} className="bg-yellow-400 text-black hover:bg-yellow-500">
          Publish Blog
        </Button>
      </div>
    </div>
  );
}
