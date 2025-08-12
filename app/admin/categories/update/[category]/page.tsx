"use client";

import React, { useEffect, useState } from "react";
import { Upload } from "lucide-react";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Select, SelectTrigger, SelectValue, SelectContent, SelectItem } from "@/components/ui/select";
import { getCatgeoryById, updateCategoryById } from "@/services/category.service";
import { getAllProducts } from "@/services/product.service";
import { useParams } from "next/navigation";

const EditCategory = () => {
  const { category } = useParams();

  const [categoryName, setCategoryName] = useState("");
  const [selectedProduct, setSelectedProduct] = useState("");
  const [imagePreview, setImagePreview] = useState<string>("");
  const [imageFile, setImageFile] = useState<File | null>(null);
  const [productList, setProductList] = useState([]);

  // Get existing category by ID
  useEffect(() => {
    if (category) {
      getCatgeoryById(category as string).then((res) => {
        const cat = res?.data;
        setCategoryName(cat.name);
        setSelectedProduct(cat.products);
        setImagePreview(Array.isArray(cat.image) ? cat.image[0] : cat.image);
      });
    }
  }, [category]);
  console.log("category NAme",categoryName)
  // Load product list
  useEffect(() => {
    getAllProducts().then((res) => {
      setProductList(res.data || []);
    });
  }, []);

  // Handle image change
  const handleImageChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      setImageFile(file);
      const reader = new FileReader();
      reader.onloadend = () => {
        setImagePreview(reader.result as string);
      };
      reader.readAsDataURL(file);
    }
  };

  // Submit form
  const handleSubmit = async () => {
    if (!categoryName || !selectedProduct || !imagePreview) {
      alert("Please fill all fields.");
      return;
    }

    const payload = {
      name: categoryName,
      products: selectedProduct,
      image: [imagePreview], // as array if needed by backend
    };

    await updateCategoryById(category as string, payload);
    alert("Category updated!");
  };

  return (
    <div className="max-w-xl mx-auto mt-10 space-y-6 p-6 bg-white shadow rounded-lg">
      <h2 className="text-xl font-bold">Edit Category</h2>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Category Name</label>
        <Input
          value={categoryName}
          onChange={(e) => setCategoryName(e.target.value)}
          placeholder="Enter category name"
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-gray-700 mb-1">Select Product</label>
        <Select value={selectedProduct} onValueChange={setSelectedProduct}>
          <SelectTrigger>
            <SelectValue placeholder="Select a product" />
          </SelectTrigger>
          <SelectContent>
            {productList.map((prod: any) => (
              <SelectItem key={prod._id} value={prod._id}>
                {prod.name}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      <div className="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center">
        <Upload className="h-12 w-12 text-gray-400 mx-auto mb-4" />
        <p className="text-gray-600 mb-2">Click to upload or drag and drop</p>
        <p className="text-sm text-gray-500">PNG, JPG, GIF up to 10MB</p>
        <input type="file" accept="image/*" onChange={handleImageChange} className="mt-4 block mx-auto" />

        {imagePreview && (
          <div className="mt-4">
            <p className="text-sm text-gray-500 mb-2">Preview:</p>
            <img
              src={imagePreview}
              alt="Preview"
              className="mx-auto w-32 h-32 object-cover rounded shadow"
            />
          </div>
        )}
      </div>

      <Button className="bg-yellow-400 text-black hover:bg-yellow-500" onClick={handleSubmit}>Update Category</Button>
    </div>
  );
};

export default EditCategory;
