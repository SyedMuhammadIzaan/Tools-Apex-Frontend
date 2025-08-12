"use client";

import {
	createProduct,
	deleteProductById,
	getAllProducts,
	getProductByName,
	updateProductById,
  getProductById,
} from "@/services/product.service";
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";

export const useProducts = () =>
	useQuery({
		queryKey: ["products"],
		queryFn: getAllProducts,
	});

export const useProductByName = (productName: string, enabled = true) =>
	useQuery({
		queryKey: ["product", productName],
		queryFn: () => getProductByName(productName),
		enabled: !!productName && enabled,
	});

export const useCreateProduct = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: createProduct,
		onSuccess: () => {
			qc.invalidateQueries({ queryKey: ["products"] });
		},
	});
};

export const useProductById=(productId:string,enabled:true)=>{
  useQuery({
    queryKey:["product",productId],
    queryFn:()=> getProductById(productId),
    enabled: !!productId && enabled
  })
}
export const useUpdateProduct = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: ({ id, payload }: { id: string; payload: any }) =>
			updateProductById(id, payload),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
	});
};

export const useDeleteProduct = () => {
	const qc = useQueryClient();
	return useMutation({
		mutationFn: (id: string) => deleteProductById(id),
		onSuccess: () => qc.invalidateQueries({ queryKey: ["products"] }),
	});
};
