import { Cart } from "@/src/entities/models/cart";
import { CartItem } from "@/src/entities/models/cart_item";

export interface ICartRepository {
  getCartByUserId(userId: string): Promise<Cart | null>;
  createCart(userId: string): Promise<Cart>;
  addItem(cartId: string, productId: string, quantity: number): Promise<CartItem>;
  updateItemQuantity(itemId: string, quantity: number): Promise<CartItem>;
  removeItem(itemId: string): Promise<void>;
  getCartItems(cartId: string): Promise<CartItem[]>;
}
