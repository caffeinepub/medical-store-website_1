import type { Principal } from "@icp-sdk/core/principal";
export interface Some<T> {
    __kind__: "Some";
    value: T;
}
export interface None {
    __kind__: "None";
}
export type Option<T> = Some<T> | None;
export interface StoreInfo {
    hours: string;
    name: string;
    address: string;
    phone: string;
}
export interface Category {
    name: string;
    description: string;
}
export interface Product {
    name: string;
    description: string;
    available: boolean;
    category: string;
    price: bigint;
}
export interface backendInterface {
    getCategories(): Promise<Array<Category>>;
    getProductByCategory(category: string): Promise<Array<Product>>;
    getStoreInfo(): Promise<StoreInfo>;
    searchProductsByName(searchTerm: string): Promise<Array<Product>>;
}
