"use client"

import type React from "react"
import { useState, useEffect } from "react";
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select"
import { Product } from "@/types";
import { getAllProducts } from "@/services/product.service";
import { Upload } from "lucide-react";
import { createCategory } from "@/services/category.service";


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


export default function CreateCategoriesPage() {

  const [products, setProducts] = useState<Product[]>([]);
  const [categoryName, setCategoryName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState<string>("")
  const [imageArray, setImageArray] = useState<string[]>([]);
  useEffect(() => {
    const getAllProduct = async () => {
      try {
        const {data} = await getAllProducts()
        setProducts(data)
      } catch (error) {
        console.log("Couldn't get Products")
      }
    }
    getAllProduct();
  }, [])
  const handleImageChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    if (!files) return;

    const base64Array: string[] = [];

    for (let i = 0; i < files.length; i++) {
      try {
        const base64 = await convertToBase64(files[i]);
        base64Array.push(base64);
      } catch (error) {
        console.error("Image conversion failed:", error);
      }
    }

    setImageArray(base64Array); // Save to state
  };
  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    try {
      const payload = {
        name: categoryName,
        products: selectedProduct,
        image: imageArray, // now contains base64 strings
      };
      const response = await createCategory(payload);
      alert("Category Created Successfully")
    } catch (error) {
      console.error("Error creating category:", error)
      alert("Failed to create category")
    }
  }


  return (
    <div className="max-w-4xl mx-auto">
      <div className="mb-6">
        <h1 className="text-3xl font-bold text-gray-900">Create Category</h1>
      </div>

      <form onSubmit={handleSubmit} className="space-y-8">
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Category Information</h2>
          <div className="grid md:grid-cols-2 gap-6">
            <div>
              <label className="block text-sm font-medium mb-2">Name*</label>
              <Input name="categoryName"
                value={categoryName}
                onChange={(e) => setCategoryName(e.target.value)} required />
            </div>
            {/* <div>
              <label className="block text-sm font-medium mb-2">P_ID*</label>
              <Input name="productId" placeholder="75682695d1f104748afdf7f8" required />
            </div> */}
            <div>
              <label className="block text-sm font-medium mb-2">P_ID*</label>
              <Select value={selectedProduct} onValueChange={setSelectedProduct}>
                <SelectTrigger>
                  <SelectValue placeholder="Select Product" />
                </SelectTrigger>
                <SelectContent>
                  {products.map((product) => (
                    <SelectItem key={product._id} value={product._id}>
                      {product.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
            </div>
          </div>
        </div>
        <div className="bg-white p-6 rounded-lg shadow-sm border border-gray-200">
          <h2 className="text-xl font-semibold mb-4">Image</h2>
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

        <div className="flex justify-end space-x-4">
          <Button type="button" variant="outline">
            Save as Draft
          </Button>
          <Button type="submit" className="bg-yellow-400 text-black hover:bg-yellow-500">
            Create Sale
          </Button>
        </div>
      </form>
    </div>
  )
}
