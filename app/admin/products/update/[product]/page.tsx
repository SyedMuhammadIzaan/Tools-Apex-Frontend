// "use client"
"use client"

import { useEffect, useState, ChangeEvent } from "react"
import { useRouter, useParams } from "next/navigation"
import { getProductById, updateProductById } from "@/services/product.service"
import { getAllCategories } from "@/services/category.service"
import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Textarea } from "@/components/ui/textarea"
import Image from "next/image"
import { Category, Product } from "@/types"

export default function UpdateProductPage() {
  const router = useRouter()
  const params = useParams()
  const productId = params?.product as string

  const [categories, setCategories] = useState<Category[]>([])
  const [formData, setFormData] = useState<{
    name: string
    sku: string
    price: number
    originalPrice: number
    discount:number
    rating:number
    reviewCount:number
    inStock:boolean
    category: string
    features: string[]
    included:string[]
    specification: Record<string, string>
    description: string
    mainImage: string
    images: string[]
  }>({
    name: "",
    sku: "",
    price: 0,
    originalPrice: 0,
    discount:0,
    rating:0,
    reviewCount:0,
    inStock:false,
    category: "",
    features: [""],
    included:[""],
    specification: {},
    description: "",
    mainImage: "",
    images: [],
  })

  useEffect(() => {
    async function fetchData() {
      const productRes = await getProductById(productId)
      const categoryRes = await getAllCategories()

      setCategories(categoryRes)

      const product = productRes.data
      setFormData({
        name: product.name || "",
        sku: product.sku || "",
        price: product.price || 0,
        originalPrice: product.originalPrice || 0,
        discount:product.discount || 0,
        rating:product.rating || 0,
        reviewCount:product.reviewCount || 0,
        inStock:product.inStock || false,
        category: product.category?._id || "",
        features: product.features || [""],
        included:product.included || [""],
        specification: product.specification || {},
        description: product.description || "",
        mainImage: product.mainImage || "",
        images: product.images || [],
      })
    }

    if (productId) fetchData()
  }, [productId])

  const handleChange = (e: ChangeEvent<HTMLInputElement | HTMLTextAreaElement | HTMLSelectElement>) => {
    const { name, value } = e.target
    setFormData(prev => ({ ...prev, [name]: value }))
  }

  const handleFeatureChange = (index: number, value: string) => {
    const newFeatures = [...formData.features]
    newFeatures[index] = value
    setFormData(prev => ({ ...prev, features: newFeatures }))
  }

  const handleAddFeature = () => {
    setFormData(prev => ({ ...prev, features: [...prev.features, ""] }))
  }

  const handleSpecChange = (key: string, value: string) => {
    setFormData(prev => ({
      ...prev,
      specification: {
        ...prev.specification,
        [key]: value,
      },
    }))
  }

  const handleAddSpec = () => {
    setFormData(prev => ({
      ...prev,
      specification: { ...prev.specification, "": "" }
    }))
  }

  const handleMainImageUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0]
    if (file) {
      const imageUrl = URL.createObjectURL(file)
      setFormData(prev => ({ ...prev, mainImage: imageUrl }))
    }
  }

  const handleImagesUpload = (e: ChangeEvent<HTMLInputElement>) => {
    const files = Array.from(e.target.files || [])
    const imageUrls = files.map(file => URL.createObjectURL(file))
    setFormData(prev => ({ ...prev, images: [...prev.images, ...imageUrls] }))
  }

  const handleUpdate = async (productId,formData) => {
    await updateProductById(productId, formData)
    router.push("/admin/products")
  }

  return (
    <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
      <h1 className="text-2xl font-bold">Update Product</h1>

      <Input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
      <Input name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} />
      <Input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} />
      <Input name="originalPrice" type="number" placeholder="Original Price" value={formData.originalPrice} onChange={handleChange} />
      <Input name="discount" type="number" placeholder="discount" value={formData.discount} onChange={handleChange} />
      <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded px-2 py-1">
        <option value="">Select Category</option>
        {categories.map(cat => (
          <option key={cat._id} value={cat._id}>{cat.name}</option>
        ))}
      </select>

      <div>
        <label className="block font-semibold">Features:</label>
        {formData.features.map((feature, index) => (
          <Input
            key={index}
            value={feature}
            onChange={(e) => handleFeatureChange(index, e.target.value)}
            className="my-1"
          />
        ))}
        <Button type="button" onClick={handleAddFeature}>+ Add Feature</Button>
      </div>

      <div>
        <label className="block font-semibold">Specifications:</label>
        {Object.entries(formData.specification).map(([key, val], i) => (
          <div key={i} className="flex gap-2 my-1">
            <Input
              value={key}
              onChange={(e) => {
                const newKey = e.target.value
                const updatedSpec = { ...formData.specification }
                const value = updatedSpec[key]
                delete updatedSpec[key]
                updatedSpec[newKey] = value
                setFormData(prev => ({ ...prev, specification: updatedSpec }))
              }}
              placeholder="Key"
            />
            <Input value={val} onChange={(e) => handleSpecChange(key, e.target.value)} placeholder="Value" />
          </div>
        ))}
        <Button type="button" onClick={handleAddSpec}>+ Add Spec</Button>
      </div>

      <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

      <div>
        <label className="block font-semibold">Main Image:</label>
        <Input type="file" accept="image/*" onChange={handleMainImageUpload} />
        {formData.mainImage && <Image src={formData.mainImage} alt="Main" width={100} height={100} />}
      </div>

      <div>
        <label className="block font-semibold">Additional Images:</label>
        <Input type="file" accept="image/*" multiple onChange={handleImagesUpload} />
        <div className="flex flex-wrap gap-2 mt-2">
          {formData.images.map((img, i) => (
            <Image key={i} src={img} alt={`Image ${i}`} width={100} height={100} />
          ))}
        </div>
      </div>

      <Button onClick={()=>{handleUpdate(productId,formData)}}>Update Product</Button>
    </div>
  )
}

// import { useEffect, useState } from "react"
// import { useRouter, useParams } from "next/navigation"
// import { getProductById, updateProductById } from "@/services/product.service"
// import { getAllCategories } from "@/services/category.service"
// import { Button } from "@/components/ui/button"
// import { Input } from "@/components/ui/input"
// import { Textarea } from "@/components/ui/textarea"
// import Image from "next/image"
// import { Category, Product } from "@/types"
// // import { getResizeHandleElementIndex } from "react-resizable-panels"

// type Specification = {
//   [key: string]: string;
// }


// export default function UpdateProductPage() {
//   const router = useRouter()
//   const params = useParams()
//   const productId = params?.product as string
//   const [product, setProduct] = useState({}); // single product
//   const [categories, setCategories] = useState<Category[]>([])
//   const [formData, setFormData] = useState<{
//     name: string;
//     sku: string;
//     price: number;
//     originalPrice: number;
//     category: string;
//     features: string[];
//     specification: Record<string, string>;
//     description: string;
//     mainImage: string;
//     images: string[];
//   }>({
//     name: "",
//     sku: "",
//     price: 0,
//     originalPrice: 0,
//     category:"",
//     features: [""],
//     specification: {}, // ✅ now typed
//     description: "",
//     mainImage: "",
//     images: [],
//   });


//   useEffect(() => {
//     async function fetchData() {
//       const productData = await getProductById(productId)
//       const categories = await getAllCategories()
//       setProduct(productData.data)
//       console.log("Response",productData.data)
//       console.log("Product",product)
//       setCategories(categories)

//       setFormData({
//         name: productData.data.name || "",
//         sku: productData.data.sku || "",
//         price: productData.data.price || 0,
//         originalPrice: productData.data.originalPrice || 0,
//         category: productData.data.category?._id || "", // 👈 now matches Record<string, string>
//         features: productData.data.features || [""],
//         specification: productData.data.specification || {},
//         description: productData.data.description || "",
//         mainImage: productData.data.mainImage || "",
//         images: productData.data.images || [],
//       });

//     }
//     if (productId) fetchData()
//   }, [productId])

//   const handleChange = (e: any) => {
//     const { name, value } = e.target
//     setFormData(prev => ({ ...prev, [name]: value }))
//   }

//   const handleFeatureChange = (index: number, value: string) => {
//     const newFeatures = [...formData.features]
//     newFeatures[index] = value
//     setFormData(prev => ({ ...prev, features: newFeatures }))
//   }

//   const handleAddFeature = () => {
//     setFormData(prev => ({ ...prev, features: [...prev.features, ""] }))
//   }

//   const handleSpecChange = (key: string, value: string) => {
//     setFormData(prev => ({
//       ...prev,
//       specification: {
//         ...prev.specification,
//         [key]: value,
//       },
//     }));
//   };

//   const handleAddSpec = () => {
//     setFormData(prev => ({
//       ...prev,
//       specification: { ...prev.specification, "": "" }
//     }))
//   }

//   const handleUpdate = async (productId: string) => {
//     await updateProductById(productId, formData)
//     router.push("/admin/products")
//   }

//   return (
//     <div className="max-w-4xl mx-auto px-4 py-8 space-y-4">
//       <h1 className="text-2xl font-bold">Update Product</h1>

//       <Input name="name" placeholder="Product Name" value={formData.name} onChange={handleChange} />
//       <Input name="sku" placeholder="SKU" value={formData.sku} onChange={handleChange} />
//       <Input name="price" type="number" placeholder="Price" value={formData.price} onChange={handleChange} />
//       <Input name="originalPrice" type="number" placeholder="Original Price" value={formData.originalPrice} onChange={handleChange} />
//       <select name="category" value={formData.category} onChange={handleChange} className="w-full border rounded px-2 py-1">
//         <option value="">Select Category</option>
//         {categories.map(cat => (
//           <option key={cat._id} value={cat._id}>{cat.name}</option>
//         ))}
//       </select>

//       <div>
//         <label className="block font-semibold">Features:</label>
//         {formData.features.map((feature, index): JSX.Element => (
//           <Input
//             key={index}
//             value={feature}
//             onChange={(e) => handleFeatureChange(index, e.target.value)}
//             className="my-1"
//           />
//         ))}

//         <Button type="button" onClick={handleAddFeature}>+ Add Feature</Button>
//       </div>

//       <div>
//         <label className="block font-semibold">Specifications:</label>
//         {Object.entries(formData.specification).map(([key, val], i) => (
//           <div key={i} className="flex gap-2 my-1">
//             <Input value={key} onChange={(e) => {
//               const newKey = e.target.value
//               const newSpec = { ...formData.specification }
//               const val = newSpec[key]
//               delete newSpec[key]
//               newSpec[newKey] = val
//               setFormData(prev => ({ ...prev, specification: newSpec }))
//             }} placeholder="Key" />
//             <Input value={val} onChange={(e) => handleSpecChange(key, e.target.value)} placeholder="Value" />
//           </div>
//         ))}
//         <Button type="button" onClick={handleAddSpec}>+ Add Spec</Button>
//       </div>

//       <Textarea name="description" placeholder="Description" value={formData.description} onChange={handleChange} />

//       <div>
//         <label className="block font-semibold">Main Image:</label>
//         {formData.mainImage && <Image src={formData.mainImage} alt="Main" width={100} height={100} />}
//       </div>

//       <div>
//         <label className="block font-semibold">Images:</label>
//         <div className="flex flex-wrap gap-2">
//           {formData.images.map((img, i) => (
//             <Image key={i} src={img.toString()} alt={`Image ${i}`} width={100} height={100} />
//           ))}
//         </div>
//       </div>

//       <Button onClick={handleUpdate}>Update Product</Button>
//     </div>
//   )
// }
