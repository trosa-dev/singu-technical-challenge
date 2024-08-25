import { Item } from "./enums/item.enum";
import { OrderStatus } from "./enums/order-status.enum";

// Interface defining the structure of an item in the order
export interface OrderItem {
  itemName: Item; // Name of the item
  quantity: number; // Quantity of the item ordered
}

// Class representing an order
export class Order {
  public id: string;
  public status: OrderStatus;

  constructor(
    public itens: OrderItem[],
    id: string = Date.now().toString(),
    status: OrderStatus = OrderStatus.PENDING
  ) {
    this.id = id || crypto.randomUUID();
    this.status = status;
  }

  // Method to update the status of the order
  updateStatus(newStatus: OrderStatus): void {
    this.status = newStatus;
  }
}
