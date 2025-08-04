import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import {
	getAllCategories,
	createCategory,
	updateCategoryById,
	deleteCategoryById,
	getCatgeoryById,
} from "@/services/category.service";
import type { Category } from "@/types";

export const useCategories = () => {
	const queryClient = useQueryClient();

	const {
		data: categories,
		isLoading,
		isError,
		error,
	} = useQuery<Category[]>({
		queryKey: ["categories"],
		queryFn: getAllCategories,
	});

	const create = useMutation({
		mutationFn: createCategory,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});

	const getSingle = useMutation({
		mutationFn: ({ categoryId }: { categoryId:string }) => getCatgeoryById(categoryId),
		onSuccess: () => {
      queryClient.invalidateQueries({ queryKey: ["categories"] });
    },
	});
	const update = useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: Partial<Category> }) =>
			updateCategoryById(id, payload),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});

	const remove = useMutation({
		mutationFn: deleteCategoryById,
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ["categories"] });
		},
	});

	return {
		categories,
		isLoading,
		isError,
		error,
		create,
    getSingle,
		update,
		remove,
	};
};
