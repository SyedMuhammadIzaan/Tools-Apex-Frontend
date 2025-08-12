import { notFound } from 'next/navigation';
import { getProductByName } from '@/services/product.service';
import ProductDetailClient from './ProductDetailClient';

export default async function ProductPage({ params }: { params: { slug: string } }) {
  try {
    const product = await getProductByName(params.slug);
    if (!product) return notFound();
    return <ProductDetailClient product={product} />;
  } catch (error) {
    console.error('Failed to load product:', error);
    return notFound();
  }
}
