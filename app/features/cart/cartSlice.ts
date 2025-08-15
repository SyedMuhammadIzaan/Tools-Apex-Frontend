import { createSlice } from "@reduxjs/toolkit";

interface InitialStatePropertyType {
	cart: string[];
}

const initialState: InitialStatePropertyType = {
	cart = [],
};

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action) => {
			state.cart.push(action.payload);
		},
		updateCartItem: (state, action) => {
			const id = state.cart.find((item) => {
				item._id === action.payload._id;
			});
			if (id) Object.assign(id, action.payload);
		},
		deleteCartItem: (state, action) => {
			state.cart = state.cart.filter((items) => {
				items._id !== action.payload;
			});
		},
		removeAll: (state) => {
			state.cart = [];
		},
	},
});

export const {addToCart,updateCartItem,deleteCartItem,removeAll}=cartSlice.actions;
export default cartSlice.reducer;
