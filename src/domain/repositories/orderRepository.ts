import { OrderStatus } from "../entities/order/enums/order-status.enum";
import { Order } from "../entities/order/order";

export interface OrderRepository {
  create(order: Order): Promise<Order>;
  findAll(): Promise<Order[]>;
  findById(id: string): Promise<Order | null>;
  updateStatus(id: string, status: OrderStatus): Promise<Order | null>;
}
