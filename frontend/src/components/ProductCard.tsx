import { Badge } from '@/components/ui/badge';
import { ShoppingBag, CheckCircle, XCircle } from 'lucide-react';
import type { Product } from '../backend';

interface ProductCardProps {
  product: Product;
}

function formatPrice(price: bigint): string {
  const num = Number(price);
  return new Intl.NumberFormat('en-IN', {
    style: 'currency',
    currency: 'INR',
    minimumFractionDigits: 0,
    maximumFractionDigits: 2,
  }).format(num / 100);
}

export default function ProductCard({ product }: ProductCardProps) {
  return (
    <div className="bg-card rounded-2xl border border-border shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-0.5 flex flex-col overflow-hidden group">
      {/* Card Top Accent */}
      <div className="h-1.5 bg-gradient-to-r from-primary/60 to-primary w-full" />

      <div className="p-5 flex flex-col flex-1">
        {/* Category + Availability */}
        <div className="flex items-center justify-between mb-3">
          <span className="text-xs font-semibold text-primary bg-primary/10 px-2.5 py-1 rounded-full">
            {product.category}
          </span>
          {product.available ? (
            <span className="flex items-center gap-1 text-xs font-medium text-green-600">
              <CheckCircle size={12} />
              In Stock
            </span>
          ) : (
            <span className="flex items-center gap-1 text-xs font-medium text-destructive">
              <XCircle size={12} />
              Out of Stock
            </span>
          )}
        </div>

        {/* Product Name */}
        <h3 className="font-display font-bold text-foreground text-base leading-snug mb-2 group-hover:text-primary transition-colors">
          {product.name}
        </h3>

        {/* Description */}
        {product.description && (
          <p className="text-muted-foreground text-xs leading-relaxed mb-4 flex-1 line-clamp-2">
            {product.description}
          </p>
        )}

        {/* Price */}
        <div className="flex items-center justify-between mt-auto pt-3 border-t border-border">
          <span className="font-display font-bold text-lg text-foreground">
            {formatPrice(product.price)}
          </span>
          <div className="w-8 h-8 rounded-xl bg-primary/10 flex items-center justify-center group-hover:bg-primary transition-colors">
            <ShoppingBag size={14} className="text-primary group-hover:text-primary-foreground transition-colors" />
          </div>
        </div>
      </div>
    </div>
  );
}
