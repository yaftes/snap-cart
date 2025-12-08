import { eq } from "drizzle-orm";
import { Cart } from "@/src/entities/models/cart";
import { CartItem } from "@/src/entities/models/cart_item";
import { ICartRepository } from "@/src/application/repositories/cart/cart_repository_interface";
import db from "@/drizzle";
import { cartItemsTable, cartTable } from "@/drizzle/schema";

export class CartRepository implements ICartRepository {

  async getCartByUserId(userId: string): Promise<Cart | null> {
    try {
      const result = await db
        .select()
        .from(cartTable)
        .where(eq(cartTable.user_id, userId));

      if (result.length === 0) return null;

      const c = result[0];
      return null;
    } catch (error) {
      throw new Error("Failed to fetch cart");
    }
  }

  async createCart(userId: string): Promise<Cart> {
    try {
      const [c] = await db
        .insert(cartTable)
        .values({ user_id : userId })
        .returning();

      return c;
      
    } catch (error) {
        
      throw new Error("Failed to create cart");
    }
  }


  async addItem(cartId: string, productId: string, quantity: number): Promise<CartItem> {
    try {
      const [item] = await db
        .insert(cartItemsTable)
        .values({cart_id : cartId,product_id: productId, quantity })
        .returning();

      return item;

    } catch (error) {
      throw new Error("Failed to add item to cart");
    }
  }

  async updateItemQuantity(itemId: string, quantity: number): Promise<CartItem> {
    try {
      const [item] = await db
        .update(cartItemsTable)
        .set({ quantity })
        .where(eq(cartItemsTable.id, itemId))
        .returning();

      return item;
    } catch (error) {
      throw new Error("Failed to update cart item");
    }
  }

  async removeItem(itemId: string): Promise<void> {
    try {
      await db
        .delete(cartItemsTable)
        .where(eq(cartItemsTable.id, itemId));
    } catch (error) {
      console.error("Error in removeItem:", error);
      throw new Error("Failed to remove item from cart");
    }
  }

  async getCartItems(cartId: string): Promise<CartItem[]> {
    try {
      const result = await db
        .select()
        .from(cartItemsTable)
        .where(eq(cartItemsTable.cart_id, cartId));

      return result.map(
        (item) => item
      );
    } catch (error) {

      throw new Error("Failed to fetch cart items");
    }
  }
}
