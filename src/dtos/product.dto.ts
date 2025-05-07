export interface CreateProductDto{
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
}
export interface UpdateProductDto{
    name?: string;
    description?: string;
    price?: number;
    stock?: number;
    imageUrl?: string;
}

export interface ProductResponseDto{
    id: string;
    name: string;
    description: string;
    price: number;
    stock: number;
    imageUrl?: string;
    createdAt: Date;
}