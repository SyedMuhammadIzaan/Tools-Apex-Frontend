"use client"

import type React from "react"

import { useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, Eye } from "lucide-react"

export default function CreateBlogPage() {
  const [content, setContent] = useState("")
  const [tags, setTags] = useState<string[]>([])
  const [newTag, setNewTag] = useState("")

  const addTag = () => {
    if (newTag.trim() && !tags.includes(newTag.trim())) {
      setTags([...tags, newTag.trim()])
      setNewTag("")
    }
  }

  const removeTag = (tagToRemove: string) => {
    setTags(tags.filter((tag) => tag !== tagToRemove))
  }

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    alert("Blog post created successfully!")
  }

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Blog Post</h1>
        <p className="text-gray-600">Write and publish a new blog article</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Post Information</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Post Title *</label>
              <Input placeholder="e.g., 10 Essential Power Tools Every DIY Enthusiast Needs" required />
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">URL Slug</label>
              <Input placeholder="essential-power-tools-diy" />
            </div>

            <div className="grid md:grid-cols-2 gap-6">
              <div>
                <label className="block text-sm font-medium mb-2">Category *</label>
                <Select>
                  <SelectTrigger>
                    <SelectValue placeholder="Select category" />
                  </SelectTrigger>
                  <SelectContent>
                    <SelectItem value="diy-tips">DIY Tips</SelectItem>
                    <SelectItem value="maintenance">Maintenance</SelectItem>
                    <SelectItem value="technology">Technology</SelectItem>
                    <SelectItem value="safety">Safety</SelectItem>
                    <SelectItem value="reviews">Product Reviews</SelectItem>
                    <SelectItem value="guides">How-to Guides</SelectItem>
                  </SelectContent>
                </Select>
              </div>
              <div>
                <label className="block text-sm font-medium mb-2">Author *</label>
                <Input placeholder="Author name" required />
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Excerpt *</label>
              <Textarea placeholder="Brief description of the blog post..." rows={3} required />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Featured Image</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Upload featured image</p>
            <p className="text-sm text-gray-500">Recommended size: 1200x600px</p>
            <Button type="button" variant="outline" className="mt-4 bg-transparent">
              Choose Image
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Content</h2>
          <div className="space-y-4">
            <Textarea
              value={content}
              onChange={(e) => setContent(e.target.value)}
              placeholder="Write your blog post content here..."
              rows={15}
              className="font-mono"
              required
            />
            <div className="flex justify-between items-center text-sm text-gray-500">
              <span>{content.length} characters</span>
              <span>Estimated read time: {Math.max(1, Math.ceil(content.split(" ").length / 200))} min</span>
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Tags & SEO</h2>
          <div className="space-y-6">
            <div>
              <label className="block text-sm font-medium mb-2">Tags</label>
              <div className="flex items-center space-x-2 mb-2">
                <Input
                  value={newTag}
                  onChange={(e) => setNewTag(e.target.value)}
                  placeholder="Add a tag"
                  onKeyPress={(e) => e.key === "Enter" && (e.preventDefault(), addTag())}
                />
                <Button type="button" onClick={addTag} variant="outline">
                  Add
                </Button>
              </div>
              <div className="flex flex-wrap gap-2">
                {tags.map((tag) => (
                  <span
                    key={tag}
                    className="bg-yellow-100 text-yellow-800 px-2 py-1 rounded-full text-sm flex items-center"
                  >
                    {tag}
                    <button
                      type="button"
                      onClick={() => removeTag(tag)}
                      className="ml-1 text-yellow-600 hover:text-yellow-800"
                    >
                      ×
                    </button>
                  </span>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-sm font-medium mb-2">Meta Description</label>
              <Textarea placeholder="SEO meta description..." rows={2} maxLength={160} />
            </div>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Publishing Options</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Status</label>
              <Select defaultValue="draft">
                <SelectTrigger>
                  <SelectValue />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="draft">Draft</SelectItem>
                  <SelectItem value="published">Published</SelectItem>
                  <SelectItem value="scheduled">Scheduled</SelectItem>
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Publish Date</label>
              <Input type="datetime-local" defaultValue={new Date().toISOString().slice(0, 16)} />
            </div>
          </div>
          <div className="mt-6 space-y-4">
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="featured-post" className="rounded" />
              <label htmlFor="featured-post" className="text-sm font-medium">
                Feature this post on homepage
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="allow-comments" className="rounded" defaultChecked />
              <label htmlFor="allow-comments" className="text-sm font-medium">
                Allow comments
              </label>
            </div>
            <div className="flex items-center space-x-2">
              <input type="checkbox" id="send-newsletter" className="rounded" />
              <label htmlFor="send-newsletter" className="text-sm font-medium">
                Send to newsletter subscribers
              </label>
            </div>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            <Eye className="mr-2 h-4 w-4" />
            Preview
          </Button>
          <Button type="button" variant="outline">
            Save Draft
          </Button>
          <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500">
            Publish Post
          </Button>
        </div>
      </form>
    </div>
  )
}
