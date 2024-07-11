export type Product = {
  productId: number;
  name: string;
  description: string;
  price: string;
  category: string;
  company: string;
  additionalInfo: {
    specifications: {
      [key: string]: string;
    };
  };
  images: string[];
}
export type DeliveryResponse = {
  available: boolean;
  estimatedDeliveryTime: number;
  deliveryCharges: number;
  notes: string;
}
export interface CategoryItem {
  title: string;
  discount: string;
  imgSrc: string;
}
export interface ProductCategoriesProps {
  categories: CategoryItem[];
}

export interface SeaechQuery {
  category?: string;
  name?: string
}
export interface FilterItem {
  name: string;
  count: number
}

export interface SearchFilter {
  criteria: string;
  values: FilterItem[]
}

export interface SearcProducthData {
  id: number;
  images: string[];
  brand: string;
  name: string;
  price: number;
  originalPrice?: number;
  discount?: number;
}

export interface SearchApiResponse {
  items: SearcProducthData[];
  totalItem: number;
  filters: SearchFilter[],
  minPrice: number,
  maxPrice: number,
  pageSize: number,
  currentPage: number,
  totalPage: number
}

export interface FilterSectionProps {
  filters: SearchFilter[];
}

export interface ProductCardProps {
  product: SearcProducthData;
}

export interface ProductListSectionProps {
  products: SearcProducthData[],
  total: number,
  pageSize: number,
  currentPage: number,
  totalPage: number,
  category?: string,
  q?: string;
}
