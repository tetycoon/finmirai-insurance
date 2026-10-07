import type { Metadata } from "next";
import { notFound } from "next/navigation";
import { ProductPageTemplate } from "@/components/product/ProductPageTemplate";
import { getProduct, personalProducts, productHref } from "@/content/products";
import { buildMetadata } from "@/lib/seo";

type Props = { params: Promise<{ slug: string }> };

export const dynamicParams = false;

export function generateStaticParams() {
  return personalProducts.map((p) => ({ slug: p.slug }));
}

export async function generateMetadata({ params }: Props): Promise<Metadata> {
  const product = getProduct("personal", (await params).slug);
  if (!product) return {};
  return buildMetadata({ title: product.metaTitle, description: product.metaDescription, path: productHref(product), image: product.image.src });
}

export default async function PersonalProductPage({ params }: Props) {
  const product = getProduct("personal", (await params).slug);
  if (!product) notFound();
  return <ProductPageTemplate product={product} />;
}
