export type ID = string;

export interface User {
	_id: ID;
	name: string;
	email: string;
	isVerified: boolean;
	role?: "admin" | "customer";
}

export interface AuthResponse {
	token: string;
	user: User;
}
export interface LoginDto {
	email: string;
	password: string;
}
export interface SignupDto {
	name: string;
	email: string;
	password: string;
	currentPassword: string;
	isVerified: boolean;
}

export interface Product {
	_id: string;
	name: string;
	mainImage: string;
	price: number;
	originalPrice: number;
	discount: number;
	rating: number;
	reviewCount: number;
	customerReview?:string[];
	inStock: boolean;
	sku: string;
	images: string[];
	description: string;
	features: string[];
	specification: Record<string, string>;
	included: String[];
	category: Record<string, string>;
}

export interface Blog{
	_id:string;
	title:string;
	author:string;
	image:string;
	tag:string[];
	excerpt:string;
	description:string;
	category:string;
	readTime:string;
	href:string;
	date:Date;
	createdAt?:Date;
}

export interface Category{
	_id:string;
	name:string;
	product:string[];
	image:string[];
}
export interface ProductColumnType<T=any> {
	header: string;
	id?:string;
	accessor: keyof Product;
	cell: (value: T) => React.JSX.Element;
}


export interface CategoryColumnType<T=any>{
	header:string;
	accessor:keyof Category;
	cell:(value:T)=>React.JSX.Element;
}

export interface Category {
	_id: ID;
	name: string;
	image: string[];
	products: string[];
}

export interface BlogColumnType<T=any>{
	header:string;
	accessor:keyof Blog;
	cell:(value:T)=>React.JSX.Element;
}

export interface Review {
	_id: ID;
	name:string;
	rating: number;
	date:Date;
	comment: string;
	product:string;
}

export interface ReviewColumnType<T=any>{
	header:string;
	accessor:keyof Review;
	cell:(value:T)=>React.JSX.Element;
}