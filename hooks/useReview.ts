import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getAllReviews,
	createReview,
	updateReviewById,
	deleteReviewById,
	getReviewById,
} from "@/services/review.service";
import type { Review } from "@/types";

export const useReviews = () => {
	const queryClient = useQueryClient();

	const {
		data: reviews,
		isLoading,
		isError,
		error,
	} = useQuery<Review[]>({
		queryKey: ["reviews"],
		queryFn: getAllReviews,
	});

	const create = useMutation({
		mutationFn: createReview,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews"] });
		},
	});
	const useReviewById = (reviewId: string, enabled: true) => {
		useQuery({
			queryKey: ["reviews", reviewId],
			queryFn: () => getReviewById(reviewId),
			enabled: !!reviewId && enabled,
		});
	};
	const update = useMutation({
		mutationFn: ({ reviewId, payload }: { reviewId: string; payload: Partial<Review> }) =>
			updateReviewById(reviewId, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews"] });
		},
	});

	const remove = useMutation({
		mutationFn: deleteReviewById,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["reviews"] });
		},
	});

	return {
		reviews,
		isLoading,
		isError,
		error,
		create,
		useReviewById,
		update,
		remove,
	};
};
