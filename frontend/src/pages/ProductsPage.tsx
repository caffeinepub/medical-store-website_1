import { useState, useEffect, useMemo } from 'react';
import { useSearch } from '@tanstack/react-router';
import { Package, SearchX } from 'lucide-react';
import { useCategories, useProductsByCategory, useSearchProducts, useAllProducts } from '../hooks/useQueries';
import ProductCard from '../components/ProductCard';
import CategoryFilter from '../components/CategoryFilter';
import SearchBar from '../components/SearchBar';
import { Skeleton } from '@/components/ui/skeleton';
import type { Product } from '../backend';

export default function ProductsPage() {
  const search = useSearch({ from: '/products' });
  const initialCategory = (search as { category?: string }).category ?? '';

  const [selectedCategory, setSelectedCategory] = useState<string>(initialCategory);
  const [searchTerm, setSearchTerm] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');

  // Debounce search
  useEffect(() => {
    const timer = setTimeout(() => setDebouncedSearch(searchTerm), 350);
    return () => clearTimeout(timer);
  }, [searchTerm]);

  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: allProducts = [], isLoading: allLoading } = useAllProducts();
  const { data: categoryProducts = [], isLoading: categoryLoading } = useProductsByCategory(
    selectedCategory && !debouncedSearch ? selectedCategory : ''
  );
  const { data: searchResults = [], isLoading: searchLoading } = useSearchProducts(debouncedSearch);

  const isLoading = allLoading || categoryLoading || searchLoading || categoriesLoading;

  const displayedProducts: Product[] = useMemo(() => {
    if (debouncedSearch.trim()) {
      // Filter search results by category if one is selected
      if (selectedCategory) {
        return searchResults.filter(p => p.category === selectedCategory);
      }
      return searchResults;
    }
    if (selectedCategory) {
      return categoryProducts;
    }
    return allProducts;
  }, [debouncedSearch, selectedCategory, searchResults, categoryProducts, allProducts]);

  const handleCategorySelect = (cat: string) => {
    setSelectedCategory(cat);
  };

  return (
    <main className="min-h-screen bg-background">
      {/* Page Header */}
      <div className="bg-gradient-to-br from-primary/10 via-secondary/30 to-background border-b border-border">
        <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <div className="max-w-2xl">
            <div className="inline-flex items-center gap-2 bg-primary/10 text-accent-foreground rounded-full px-4 py-1.5 text-sm font-semibold mb-4">
              <Package size={14} className="text-primary" />
              Our Products
            </div>
            <h1 className="font-display text-3xl sm:text-4xl font-bold text-foreground mb-3">
              Browse All Products
            </h1>
            <p className="text-muted-foreground text-base">
              Explore our complete range of medicines, vitamins, personal care, and medical devices.
            </p>
          </div>
        </div>
      </div>

      <div className="container mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Filters Row */}
        <div className="flex flex-col sm:flex-row gap-4 mb-8">
          <div className="flex-1">
            <SearchBar
              value={searchTerm}
              onChange={setSearchTerm}
              placeholder="Search by product name..."
            />
          </div>
          <div className="flex-shrink-0">
            {categoriesLoading ? (
              <div className="flex gap-2">
                {Array.from({ length: 4 }).map((_, i) => (
                  <Skeleton key={i} className="h-8 w-24 rounded-full" />
                ))}
              </div>
            ) : (
              <CategoryFilter
                categories={categories}
                selected={selectedCategory}
                onSelect={handleCategorySelect}
              />
            )}
          </div>
        </div>

        {/* Results Count */}
        {!isLoading && (
          <p className="text-sm text-muted-foreground mb-6">
            {displayedProducts.length === 0
              ? 'No products found'
              : `Showing ${displayedProducts.length} product${displayedProducts.length !== 1 ? 's' : ''}${selectedCategory ? ` in "${selectedCategory}"` : ''}${debouncedSearch ? ` for "${debouncedSearch}"` : ''}`}
          </p>
        )}

        {/* Products Grid */}
        {isLoading ? (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5">
            {Array.from({ length: 8 }).map((_, i) => (
              <Skeleton key={i} className="h-52 rounded-2xl" />
            ))}
          </div>
        ) : displayedProducts.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24 text-center">
            <div className="w-16 h-16 bg-muted rounded-2xl flex items-center justify-center mb-5">
              <SearchX size={28} className="text-muted-foreground" />
            </div>
            <h3 className="font-display font-bold text-foreground text-xl mb-2">No products found</h3>
            <p className="text-muted-foreground text-sm max-w-sm">
              {debouncedSearch
                ? `No products match "${debouncedSearch}". Try a different search term.`
                : selectedCategory
                ? `No products in the "${selectedCategory}" category yet.`
                : 'No products have been added to the store yet.'}
            </p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4 gap-5 animate-fade-in">
            {displayedProducts.map((product, idx) => (
              <ProductCard key={`${product.name}-${idx}`} product={product} />
            ))}
          </div>
        )}
      </div>
    </main>
  );
}
