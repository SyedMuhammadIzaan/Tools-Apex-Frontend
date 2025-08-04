import { api } from '@/lib/apiClient';
import { Review } from '@/types';

export const createReview = async (payload: { rating: number; comment: string }) => {
  const { data } = await api.post<Review>('/review/create-review', payload);
  return data;
};

export const getAllReviews = async () => {
  const { data } = await api.get<Review[]>('/review/');
  return data;
};

export const updateReviewById = async (id: string, payload: Partial<Review>) => {
  const { data } = await api.put<Review>(`/review/${id}`, payload);
  return data;
};

export const deleteReviewById = async (id: string) => {
  const { data } = await api.delete<{ success: boolean }>(`/review/${id}`);
  return data;
};
