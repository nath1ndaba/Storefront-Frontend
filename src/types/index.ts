export interface Product {
  id?: number;
  name?: string;
  description?: string;
  price?: number;
  imageUrl?: string;
  category?: number;
  stockQuantity?: number;
  sku?: string;
}

export interface CartItem {
  id?: number;
  productId?: number;
  productName?: string;
  productImageUrl?: string;
  quantity?: number;
  unitPrice?: number;
  subtotal?: number;
}

export interface Cart {
  id?: number;
  sessionId?: string;
  items?: CartItem[];
  totalAmount?: number;
  totalItems?: number;
}