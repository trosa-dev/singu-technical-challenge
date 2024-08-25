import { OrderStatus } from "../../src/domain/entities/order/enums/order-status.enum";
import { Order } from "../../src/domain/entities/order/order";
import { OrderRepository } from "../../src/domain/repositories/orderRepository";

export class MockOrderRepository implements OrderRepository {
  private orders: Order[] = [];

  async create(order: Order): Promise<Order> {
    this.orders.push(order);
    return order;
  }

  async findAll(): Promise<Order[]> {
    return this.orders;
  }

  async findById(id: string): Promise<Order | null> {
    return this.orders.find((order) => order.id === id) || null;
  }

  async updateStatus(
    id: string,
    newStatus: OrderStatus
  ): Promise<Order | null> {
    const index = this.orders.findIndex((o) => o.id === id);
    if (index !== -1) {
      this.orders[index].status = newStatus;
      return this.orders[index];
    }
    return null;
  }
}
