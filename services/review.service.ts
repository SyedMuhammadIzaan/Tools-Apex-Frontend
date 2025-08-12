import { api } from '@/lib/apiClient';
import { Review } from '@/types';

export const createReview = async (payload: { name:string; rating: number; date:Date; comment: string,product:string }) => {
  // console.log("Payload from review",payload)
  const { data } = await api.post<Review>('/review/create-review', payload);
  return data;
};
export const getReviewById=async (reviewId:string)=>{
  // console.log("ReviewId",reviewId)
  const {data}=await api.get<Review>(`/review/${reviewId}`);
  return data;
}
export const getAllReviews = async () => {
  const { data } = await api.get<Review[]>('/review/');
  return data;
};

export const updateReviewById = async (reviewId: string, payload: Partial<Review>) => {
//  console.log("Payload",payload)
  const { data } = await api.put<Review>(`/review/${reviewId}`, payload);
  return data;
};

export const deleteReviewById = async (reviewId: string) => {
  const { data } = await api.delete<{ success: boolean }>(`/review/${reviewId}`);
  return data;
};
