"use client"

import type React from "react"

import { useEffect, useState } from "react"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Upload, X } from "lucide-react"
import { createProduct } from "@/services/product.service"
import { getAllCategories } from "@/services/category.service"

const convertToBase64 = (file: File): Promise<string> => {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();

    reader.readAsDataURL(file);

    reader.onload = () => {
      if (typeof reader.result === "string") {
        resolve(reader.result);
      } else {
        reject("Conversion failed");
      }
    };

    reader.onerror = (error) => {
      reject(error);
    };
  });
};

export default function CreateProductPage() {
  const [category, setCategory] = useState<string>("")
  const [features, setFeatures] = useState<string[]>([""])
  const [included, setIncluded] = useState<string[]>([""])
  const [specifications, setSpecifications] = useState<{ key: string; value: string }[]>([{ key: "", value: "" }])
  const [images, setImages] = useState<string[]>([]);
  const [mainImage, setMainImage] = useState<string>("");
  const [categories, setAllCategories] = useState([])

  useEffect(() => {
    const getAllCategory = async () => {
      const response = await getAllCategories();
      setAllCategories(response)
    }
    getAllCategory()
  }, [])
  const addFeature = () => {
    setFeatures([...features, ""])
  }
  const addIncluded = () => {
    setIncluded([...included, ""])
  }
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const base64Array: string[] = [];
    const files = e.target.files
    if (files) {
      for (let i = 0; i < files.length; i++) {
        try {
          const base64 = await convertToBase64(files[i]);
          base64Array.push(base64);
        } catch (error) {
          console.error("Image conversion failed:", error);
        }
      }
      setImages(base64Array)
    }
  }
  const handleMainImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      let base64Image: string = "";

      for (let i = 0; i < e.target.files.length; i++) {
        try {
          const base64 = await convertToBase64(e.target.files[i]);
          base64Image = base64;
        } catch (error) {
          console.error("Image conversion failed:", error);
        }
      }
      setMainImage(base64Image)
    }

  }

  const updateFeature = (index: number, value: string) => {
    const newFeatures = [...features]
    newFeatures[index] = value
    setFeatures(newFeatures)
  }
  const updateInclude = (index: number, value: string) => {
    const newInclude = [...included]
    newInclude[index] = value
    setIncluded(newInclude)
  }

  const removeFeature = (index: number) => {
    setFeatures(features.filter((_, i) => i !== index))
  }
  const removeInclude = (index: number) => {
    setIncluded(included.filter((_, i) => i !== index))
  }

  const addSpecification = () => {
    setSpecifications([...specifications, { key: "", value: "" }])
  }

  const updateSpecification = (index: number, field: "key" | "value", value: string) => {
    const newSpecs = [...specifications]
    newSpecs[index][field] = value
    setSpecifications(newSpecs)
  }

  const removeSpecification = (index: number) => {
    setSpecifications(specifications.filter((_, i) => i !== index))
  }
  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    const form = e.currentTarget as HTMLFormElement;
    try {
      const objectSpec = specifications.reduce((acc, curr) => {
        if (curr.key && curr.value) {
          acc[curr.key] = curr.value;
        }
        return acc;
      }, {} as Record<string, string>);
      const productData = {
        name: form.pName?.value,
        sku: form.sku.value,
        category,
        // brand: form.brand.value,
        description: form.description.value,
        price: parseFloat(form.price.value),
        originalPrice: parseFloat(form.originalPrice.value),
        inStock: form.inStock.value === "true",
        discount: parseFloat(form.discount.value),
        // customerReview: form.customerReview.value,
        rating: parseFloat(form.rating.value),
        reviewCount: parseInt(form.reviewCount?.value || "0"),

        mainImage, // base64 string
        images,    // array of base64 strings

        features,
        included,
        specification: objectSpec
      };

      const response = await createProduct(productData);
      alert("Product created successfully!");
    } catch (error) {
      console.error("Error creating product:", error);
      alert("Failed to create product");
    }
  };

  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create New Product</h1>
        <p className="text-gray-600">Add a new product to your catalog</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Basic Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Product Name *</label>
              <Input name="pName" placeholder="e.g., 18V Cordless Drill Kit" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">SKU *</label>
              <Input name="sku" placeholder="e.g., TA-CD18-001" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Category *</label>
              <Select value={category} onValueChange={setCategory}>
                <SelectTrigger>
                  <SelectValue placeholder="Select category" />
                </SelectTrigger>
                <SelectContent>
                  {categories?.map((cat:any) => (
                    <SelectItem key={cat._id} value={cat._id}>
                      {cat.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Brand</label>
              <Input name="brand" placeholder="TOOLS APEX" defaultValue="TOOLS APEX" />
            </div>
          </div>
          <div className="mt-6">
            <label className="block text-sm font-medium mb-2">Description *</label>
            <Textarea name="description" placeholder="Detailed product description..." rows={4} required />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Pricing & Inventory</h2>
          <div className="grid md:grid-cols-3 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Price ($) *</label>
              <Input name="price" type="number" placeholder="149.99" step="0.01" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Original Price ($)</label>
              <Input name="originalPrice" type="number" placeholder="199.99" step="0.01" />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Stock</label>
              <select name="inStock">
                <option value="true">In Stock</option>
                <option value="false">Out of Stock</option>
              </select>
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Review *</label>
              <Input name="review" type="number" placeholder="5" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Rating *</label>
              <Input name="rating" type="number" placeholder="5" required />
            </div>
            <div>
              <label className="block text-sm font-medium mb-2">Discount*</label>
              <Input name="discount" type="number" placeholder="%" required />
            </div>
            {/* <div>
              <label className="block text-sm font-medium mb-2">Review Count*</label>
              <Input name="reviewCount" type="number" placeholder="500" required />
            </div> */}
            {/* <div>
              <label className="block text-sm font-medium mb-2">Customer Review</label>
              <Input name="customerReview" type="text" placeholder="686c14b294ab8192943302" />
            </div> */}
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Product Main Image</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleMainImageChange}
              className="mt-4 block mx-auto"
            />
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Product Images</h2>
          <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
            <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
            <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
            <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
            <input
              type="file"
              multiple
              accept="image/*"
              onChange={handleImageChange}
              className="mt-4 block mx-auto"
            />
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Features</h2>
          <div className="space-y-3">
            {features.map((feature, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  name="feature"
                  value={feature}
                  onChange={(e) => updateFeature(index, e.target.value)}
                  placeholder="Enter product feature"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeFeature(index)}
                  disabled={features.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addFeature}>
              Add Feature
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Included</h2>
          <div className="space-y-3">
            {included.map((included, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  name="included"
                  value={included}
                  onChange={(e) => updateInclude(index, e.target.value)}
                  placeholder="Enter product included"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeInclude(index)}
                  disabled={included.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addIncluded}>
              Add
            </Button>
          </div>
        </div>

        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Specifications</h2>
          <div className="space-y-3">
            {specifications.map((spec, index) => (
              <div key={index} className="flex items-center space-x-2">
                <Input
                  name="specification"
                  value={spec.key}
                  onChange={(e) => updateSpecification(index, "key", e.target.value)}
                  placeholder="Specification name"
                  className="flex-1"
                />
                <Input
                  value={spec.value}
                  onChange={(e) => updateSpecification(index, "value", e.target.value)}
                  placeholder="Specification value"
                  className="flex-1"
                />
                <Button
                  type="button"
                  variant="outline"
                  size="icon"
                  onClick={() => removeSpecification(index)}
                  disabled={specifications.length === 1}
                >
                  <X className="h-4 w-4" />
                </Button>
              </div>
            ))}
            <Button type="button" variant="outline" onClick={addSpecification}>
              Add Specification
            </Button>
          </div>
        </div>

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500">
            Create Product
          </Button>
        </div>
      </form>
    </div>
  )
}