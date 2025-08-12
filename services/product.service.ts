import { api } from '@/lib/apiClient';
import { Product } from '@/types';

export type CreateProductDto = {
  name: string;
  price: number;
  originalPrice: number;
  discount: number;
  customerReview?:string[];
  rating: number;
  reviewCount: number;
  inStock: boolean;
  images: string[];
  description: string;
  features: string[];
  specification: Record<string, string>;
  included: string[];
  category?: string;
};
export type UpdateProductDto = Partial<CreateProductDto>;

export const createProduct = async (payload: CreateProductDto) => {
  console.log("Payload from Service",payload)
  const { data } = await api.post<Product>('/p/admin/create-product', payload);
  return data;
};

export const getAllProducts = async () => {
  const { data } = await api.get<Product[]>('/p/');
  return data;
};

// In your product service (services/product.service.ts)
export const getProductByName = async (name: string) => {
  // First decode the incoming slug (from URL) to get the original name
  console.log("decode name",name)
  const decodedName = decodeURIComponent(name);
  // Then encode it properly once for the API call
  const productName = encodeURIComponent(decodedName);  
  console.log("product Name is ",productName)
  const { data } = await api.get<Product>(`/p/${productName}`);
  return data;
};

export const getProductById=async (productId:string)=>{
  const {data}=await api.get<Product>(`/p/product/${productId}`);
  return data;
}

export const updateProductById = async (productId: string, payload: UpdateProductDto) => {
  const { data } = await api.put<Product>(`/p/product/${productId}`, payload);
  return data;
};

export const deleteProductById = async (productId: string) => {
  const { data } = await api.delete<{ success: boolean }>(`/p/product/${productId}`);
  return data;
};
