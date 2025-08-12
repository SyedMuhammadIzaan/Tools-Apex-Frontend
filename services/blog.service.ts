import { api } from '@/lib/apiClient';
import { Blog } from '@/types';

// types.ts or blog.service.ts
export type CreateBlogDto = {
  title: string;
  author: string;
  description: string;
  excerpt: string;
  tag: string[];
  category: string;
  readTime: string;
  href: string;
  date: string;
  image: string;
  products?: string;
};


export const createBlog = async (payload: CreateBlogDto) => {
  const { data } = await api.post<Blog>('/b/admin/create-blog', payload);
  return data;
};

export const getBlogById=async(blogId:string)=>{
  const {data}=await api.get<Blog>(`/b/${blogId}`);
  return data
}

export const getAllBlogs = async () => {
  const { data } = await api.get<Blog[]>('/b/');
  return data;
};

export const updateBlogById = async (id: string, payload: Partial<Blog>) => {
  const { data } = await api.put<Blog>(`/b/blog/${id}`, payload);
  return data;
};

export const deleteBlogById = async (id: string) => {
  const { data } = await api.delete<{ success: boolean }>(`/b/blog/${id}`);
  return data;
};
