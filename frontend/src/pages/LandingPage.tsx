import { useStoreInfo, useCategories, useAllProducts } from '../hooks/useQueries';
import HeroSection from '../components/HeroSection';
import AboutUsSection from '../components/AboutUsSection';
import CategoriesGrid from '../components/CategoriesGrid';
import FeaturedProducts from '../components/FeaturedProducts';

export default function LandingPage() {
  const { data: storeInfo, isLoading: storeLoading } = useStoreInfo();
  const { data: categories = [], isLoading: categoriesLoading } = useCategories();
  const { data: products = [], isLoading: productsLoading } = useAllProducts();

  return (
    <main>
      <HeroSection storeInfo={storeInfo} />
      <AboutUsSection storeInfo={storeInfo} />
      <CategoriesGrid categories={categories} isLoading={categoriesLoading} />
      <FeaturedProducts products={products} isLoading={productsLoading} />
    </main>
  );
}
