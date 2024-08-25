import { OrderStatus } from "../../domain/entities/order/enums/order-status.enum";
import { Order } from "../../domain/entities/order/order";
import { OrderRepository } from "../../domain/repositories/orderRepository";

export class InMemoryOrderRepository implements OrderRepository {
  private orders: Order[] = [];

  async create(order: Order): Promise<Order> {
    this.orders.push(order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return [...this.orders];
  }

  async findById(id: string): Promise<Order | null> {
    const order = this.orders.find((o) => o.id === id);
    return order || null;
  }

  async updateStatus(
    id: string,
    newStatus: OrderStatus
  ): Promise<Order | null> {
    const index = this.orders.findIndex((o) => o.id === id);

    if (index === -1) {
      return null;
    }

    this.orders[index].status = newStatus;

    return this.orders[index];
  }
}
