import { Link } from '@tanstack/react-router';
import { Pill, Leaf, Sparkles, Stethoscope, ArrowRight, Package } from 'lucide-react';
import type { Category } from '../backend';
import { Skeleton } from '@/components/ui/skeleton';

interface CategoriesGridProps {
  categories: Category[];
  isLoading?: boolean;
}

const categoryIcons: Record<string, React.ElementType> = {
  Medicines: Pill,
  Vitamins: Leaf,
  'Personal Care': Sparkles,
  'Medical Devices': Stethoscope,
};

const categoryColors: Record<string, { bg: string; icon: string; border: string }> = {
  Medicines: { bg: 'bg-blue-50', icon: 'text-blue-500', border: 'border-blue-100' },
  Vitamins: { bg: 'bg-green-50', icon: 'text-green-500', border: 'border-green-100' },
  'Personal Care': { bg: 'bg-pink-50', icon: 'text-pink-500', border: 'border-pink-100' },
  'Medical Devices': { bg: 'bg-purple-50', icon: 'text-purple-500', border: 'border-purple-100' },
};

const defaultColors = { bg: 'bg-primary/10', icon: 'text-primary', border: 'border-primary/20' };

export default function CategoriesGrid({ categories, isLoading }: CategoriesGridProps) {
  return (
    <section className="py-20 bg-background">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {/* Section Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center gap-2 bg-primary/10 text-accent-foreground rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
            <Package size={14} className="text-primary" />
            Categories
          </div>
          <h2 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
            Browse by Category
          </h2>
          <p className="text-muted-foreground text-base max-w-xl mx-auto">
            Find exactly what you need from our wide range of healthcare products.
          </p>
        </div>

        {/* Grid */}
        {isLoading ? (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {Array.from({ length: 4 }).map((_, i) => (
              <Skeleton key={i} className="h-40 rounded-2xl" />
            ))}
          </div>
        ) : categories.length === 0 ? (
          <div className="text-center py-16">
            <Package size={48} className="mx-auto text-muted-foreground/40 mb-4" />
            <p className="text-muted-foreground font-medium">No categories available yet.</p>
          </div>
        ) : (
          <div className="grid grid-cols-2 sm:grid-cols-2 lg:grid-cols-4 gap-4 sm:gap-6">
            {categories.map((category) => {
              const Icon = categoryIcons[category.name] ?? Package;
              const colors = categoryColors[category.name] ?? defaultColors;
              return (
                <Link
                  key={category.name}
                  to="/products"
                  search={{ category: category.name }}
                  className="group"
                >
                  <div className={`relative bg-card rounded-2xl p-6 border ${colors.border} shadow-card hover:shadow-card-hover transition-all duration-200 hover:-translate-y-1 cursor-pointer h-full flex flex-col`}>
                    <div className={`${colors.bg} w-12 h-12 rounded-xl flex items-center justify-center mb-4`}>
                      <Icon size={22} className={colors.icon} />
                    </div>
                    <h3 className="font-display font-bold text-foreground text-base mb-1.5">
                      {category.name}
                    </h3>
                    <p className="text-muted-foreground text-xs leading-relaxed flex-1">
                      {category.description}
                    </p>
                    <div className="flex items-center gap-1 mt-4 text-primary text-xs font-semibold group-hover:gap-2 transition-all">
                      <span>Browse</span>
                      <ArrowRight size={12} />
                    </div>
                  </div>
                </Link>
              );
            })}
          </div>
        )}
      </div>
    </section>
  );
}
