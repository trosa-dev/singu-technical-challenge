import { Order, OrderItem } from "../../../../domain/entities/order/order";
import { OrderRepository } from "../../../../domain/repositories/orderRepository";
import HttpStatus from "../../../../shared/enums/httpStatus";
import { AppError } from "../../../errors/appError";

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(items: OrderItem[]): Promise<Order> {
    if (!items || items.length === 0) {
      throw new AppError(
        "An order must have at least 1 item",
        HttpStatus.BAD_REQUEST
      );
    }

    const order = new Order(items, Date.now().toString());
    return this.orderRepository.create(order);
  }
}
