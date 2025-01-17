export interface Product {
  productId: number;
  name: string;
  description: string;
  price: Number;
  category: string;
  company?: string;
  gender?: string;
  color?: string;
  additionalInfo?: {
    specifications?: {
      [key: string]: string;
    };
  };
  images?: string[];
}
