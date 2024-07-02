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
