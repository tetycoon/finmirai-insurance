import Image from "next/image";
import Link from "next/link";
import { productHref, type Product } from "@/content/products";
import { Icon } from "./Icon";

export function ProductCard({ product, withImage = false }: { product: Product; withImage?: boolean }) {
  return (
    <Link
      href={productHref(product)}
      className="group relative flex h-full flex-col overflow-hidden rounded-2xl border border-navy-100 bg-white transition duration-300 ease-out hover:-translate-y-1 hover:border-gold-300 hover:shadow-lift"
    >
      {/* Gold line sweeps across the top on hover */}
      <span
        aria-hidden
        className="absolute inset-x-0 top-0 z-10 h-[3px] origin-left scale-x-0 bg-gradient-to-r from-gold-400 to-gold-300 transition-transform duration-500 ease-out group-hover:scale-x-100"
      />
      {withImage ? (
        <div className="relative aspect-[16/10] overflow-hidden bg-navy-100">
          <Image
            src={product.image.src}
            alt={product.image.alt}
            fill
            sizes="(min-width: 1024px) 33vw, (min-width: 640px) 50vw, 100vw"
            className="object-cover transition duration-700 ease-out group-hover:scale-[1.05]"
          />
        </div>
      ) : null}
      <div className="flex flex-1 flex-col p-6">
        <span className="flex h-11 w-11 items-center justify-center rounded-xl bg-navy-50 text-navy-800 ring-1 ring-navy-100 transition duration-300 group-hover:-rotate-6 group-hover:bg-navy-900 group-hover:text-gold-300 group-hover:ring-navy-900">
          <Icon name={product.icon} className="h-[22px] w-[22px]" />
        </span>
        <h3 className="mt-4 text-lg font-bold text-navy-900">{product.name}</h3>
        <p className="mt-2 flex-1 text-[0.9375rem] leading-relaxed text-navy-600">{product.cardSummary}</p>
        <span className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-navy-800 transition-colors group-hover:text-gold-700">
          Learn more
          <Icon name="arrowRight" className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
        </span>
      </div>
    </Link>
  );
}
