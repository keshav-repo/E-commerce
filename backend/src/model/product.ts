export interface Product {
  productId: string;
  name: string;
  description: string;
  price: Number;
  category: string;
  company?: string;
  additionalInfo?: {
    specifications?: {
      [key: string]: string;
    };
  };
  images?: string[];
}
