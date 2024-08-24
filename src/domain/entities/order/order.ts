import { Item } from "./enums/item.enum";
import { OrderStatus } from "./enums/order-status.enum";

// Interface defining the structure of an item in the order
export interface OrderItem {
  item: Item; // Name of the item
  quantity: number; // Quantity of the item ordered
}

// Class representing an order
export class Order {
  constructor(
    public id: string,
    public items: OrderItem[],
    public status: OrderStatus = OrderStatus.PENDING
  ) {}

  // Method to update the status of the order
  updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
  }
}
