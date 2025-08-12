import { api } from '@/lib/apiClient';
import { Category } from '@/types';

export const createCategory = async (payload: { name: string,products:string,image:string[] }) => {
  // console.log("Payload",payload)
  const { data } = await api.post<Category>('/c/create-category', payload);
  return data;
};

export const getCatgeoryById=async(categoryId:string)=>{
  const {data}=await api.get<Category>(`/c/${categoryId}`);
  return data
}

export const getAllCategories = async () => {
  const { data } = await api.get<Category[]>('/c/');
  return data;
};

export const updateCategoryById = async (id: string, payload: { name?: string }) => {
  const { data } = await api.put<Category>(`/c/${id}`, payload);
  return data;
};

export const deleteCategoryById = async (id: string) => {
  const { data } = await api.delete<{ success: boolean }>(`/c/${id}`);
  return data;
};
