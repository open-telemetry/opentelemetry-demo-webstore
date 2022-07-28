import { Cart, OrderItem, OrderResult, Product } from '../protos/demo';

export interface IProductCartItem {
  productId: string;
  quantity: number;
  product: Product;
}

export interface IProductCheckoutItem extends OrderItem {
  item: IProductCartItem;
}

export interface IProductCheckout extends OrderResult {
  items: IProductCheckoutItem[];
}

export interface IProductCart extends Cart {
  items: IProductCartItem[];
}
