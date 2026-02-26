import { useQuery } from '@tanstack/react-query';
import { useActor } from './useActor';
import type { StoreInfo, Category, Product } from '../backend';

export function useStoreInfo() {
  const { actor, isFetching } = useActor();

  return useQuery<StoreInfo>({
    queryKey: ['storeInfo'],
    queryFn: async () => {
      if (!actor) {
        return {
          name: 'HealthFirst Pharmacy',
          address: '123 Wellness St, Care City',
          phone: '8902739480',
          hours: 'Mon-Fri: 7am-8pm, Sat-Sun: 7am-7pm',
        };
      }
      return actor.getStoreInfo();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useCategories() {
  const { actor, isFetching } = useActor();

  return useQuery<Category[]>({
    queryKey: ['categories'],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getCategories();
    },
    enabled: !!actor && !isFetching,
    staleTime: 5 * 60 * 1000,
  });
}

export function useProductsByCategory(category: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'category', category],
    queryFn: async () => {
      if (!actor) return [];
      return actor.getProductByCategory(category);
    },
    enabled: !!actor && !isFetching && category !== '',
    staleTime: 2 * 60 * 1000,
  });
}

export function useSearchProducts(searchTerm: string) {
  const { actor, isFetching } = useActor();

  return useQuery<Product[]>({
    queryKey: ['products', 'search', searchTerm],
    queryFn: async () => {
      if (!actor) return [];
      if (!searchTerm.trim()) return [];
      return actor.searchProductsByName(searchTerm);
    },
    enabled: !!actor && !isFetching && searchTerm.trim().length > 0,
    staleTime: 1 * 60 * 1000,
  });
}

export function useAllProducts() {
  const { actor, isFetching } = useActor();
  const { data: categories = [] } = useCategories();

  return useQuery<Product[]>({
    queryKey: ['products', 'all', categories.map(c => c.name).join(',')],
    queryFn: async () => {
      if (!actor) return [];
      if (categories.length === 0) return [];
      const results = await Promise.all(
        categories.map(cat => actor.getProductByCategory(cat.name))
      );
      return results.flat();
    },
    enabled: !!actor && !isFetching && categories.length > 0,
    staleTime: 2 * 60 * 1000,
  });
}
