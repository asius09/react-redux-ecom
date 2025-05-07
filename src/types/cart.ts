import { ProductItem } from "./product.ts";

export interface CartItem extends ProductItem {
  quantity: number;
}
