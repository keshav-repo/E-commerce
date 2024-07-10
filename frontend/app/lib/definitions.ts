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
