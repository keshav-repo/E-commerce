export interface ProductEntity {
    productId?: number;
    name: string;
    price: Number;
    category: string;
    company?: string;
    description: string;
    additionalInfo?: {
        specifications?: {
            [key: string]: string;
        };
    };
    createdAt?: Date;
    updatedAt?: Date;
    images?: string[];
}
