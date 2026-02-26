import { Link } from '@tanstack/react-router';
import { ArrowRight, Star } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Skeleton } from '@/components/ui/skeleton';
import ProductCard from './ProductCard';
import type { Product } from '../backend';

interface FeaturedProductsProps {
  products: Product[];
  isLoading?: boolean;
}

export default function FeaturedProducts({ products, isLoading }: FeaturedProductsProps) {
  const featured = products.slice(0, 8);

  return (
    <section className="py-20 bg-muted/30">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="flex flex-col sm:flex-row sm:items-end justify-between gap-4 mb-12">
          <div>
            <div className="inline-flex items-center gap-2 bg-primary/10 text-accent-foreground rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Star size={14} className="text-primary" />
              Featured
            </div>
            <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-2">
              Popular Products
            </h2>
            <p className="text-muted-foreground text-base">
              Top picks from our pharmacy shelves.
            </p>
          </div>
          <Link to="/products" search={{ category: undefined }}>
            <Button variant="outline" className="gap-2 rounded-xl border-primary/30 text-primary hover:bg-primary/10 font-semibold flex-shrink-0">
              View All Products
              <ArrowRight size={14} />
            </Button>
          </Link>
        </div>

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          </div>
        ) : featured.length === 0 ? (
          <div className="text-center py-16 bg-card rounded-2xl border border-border">
            <Star size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground font-medium text-lg mb-2">No products yet</p>
            <p className="text-muted-foreground text-sm">Products will appear here once added to the store.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {featured.map((product, idx) => (
              <ProductCard key={`${product.name}-${idx}`} product={product} />
            ))}
          </div>
        )}
      </div>
    </section>
  );
}
