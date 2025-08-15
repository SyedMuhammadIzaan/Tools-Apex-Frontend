import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface CartItem {
  _id: string;
  name: string;
  price: number;
  quantity: number;
}

interface InitialStatePropertyType {
  cart: CartItem[];
}

const initialState:InitialStatePropertyType={
    cart:[],
}

export const cartSlice = createSlice({
	name: "cart",
	initialState,
	reducers: {
		addToCart: (state, action: PayloadAction<CartItem>) => {
			state.cart.push(action.payload);
		},
		updateCartItem: (state, action: PayloadAction<CartItem>) => {
			const itemToUpdate = state.cart.find(
				(item) => item._id === action.payload._id
			);

			if (itemToUpdate) Object.assign(itemToUpdate, action.payload);
		},
		deleteCartItem: (state, action:PayloadAction<string>) => {
			state.cart = state.cart.filter((item) => item._id !== action.payload);
		},
		removeAll: (state) => {
			state.cart = [];
		},
	},
});

export const { addToCart, updateCartItem, deleteCartItem, removeAll } =
	cartSlice.actions;
export default cartSlice.reducer;
