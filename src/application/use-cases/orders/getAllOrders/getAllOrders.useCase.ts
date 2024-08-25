import { Order } from "../../../../domain/entities/order/order";
import { OrderRepository } from "../../../../domain/repositories/orderRepository";

export class GetAllOrdersUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(): Promise<Order[]> {
    return this.orderRepository.findAll();
  }
}
