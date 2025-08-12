import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import {
  getAllBlogs,
  createBlog,
  updateBlogById,
  deleteBlogById,
  getBlogById,
} from '@/services/blog.service';
import type { Blog } from '@/types';

export const useBlogs = () => {
  const queryClient = useQueryClient();

  const {
    data: blogs,
    isLoading,
    isError,
    error,
  } = useQuery<Blog[]>({
    queryKey: ['blogs'],
    queryFn: getAllBlogs,
  });

  const create = useMutation({
    mutationFn: createBlog,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const getSingle = useMutation({
      mutationFn: ({ blogId }: { blogId:string }) => getBlogById(blogId),
      onSuccess: () => {
        queryClient.invalidateQueries({ queryKey: ["blogs"] });
      },
    });

  const update = useMutation({
    mutationFn: ({ id, payload }: { id: string; payload: Partial<Blog> }) =>
      updateBlogById(id, payload),
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  const remove = useMutation({
    mutationFn: deleteBlogById,
    onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ['blogs'] });
    },
  });

  return {
    blogs,
    isLoading,
    isError,
    error,
    create,
    getSingle,
    update,
    remove,
  };
};
