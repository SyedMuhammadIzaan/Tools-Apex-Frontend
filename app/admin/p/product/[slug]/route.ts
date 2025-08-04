import { NextResponse } from 'next/server';
import { getProductByName } from '@/services/product.service';

export async function GET(
  request: Request,
  { params }: { params: { slug: string } }
) {
  try {
    const product = await getProductByName(params.slug);
    if (!product) {
      return NextResponse.json({ error: 'Product not found' }, { status: 404 });
    }
    return NextResponse.json(product);
  } catch (error) {
    return NextResponse.json(
      { error: 'Internal Server Error' },
      { status: 500 }
    );
  }
}