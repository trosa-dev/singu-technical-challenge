import { OrderStatus } from "../../domain/entities/order/enums/order-status.enum";
import { Order } from "../../domain/entities/order/order";
import { OrderRepository } from "../../domain/repositories/orderRepository";
import HttpStatus from "../../shared/enums/httpStatus";
import { AppError } from "../errors/appError";

export class UpdateOrderStatusUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(id: string, newStatus: string): Promise<Order> {
    if (!Object.values(OrderStatus).includes(newStatus as OrderStatus)) {
      throw new Error(`Invalid status: ${newStatus}`);
    }

    const updatedOrder = await this.orderRepository.updateStatus(
      id,
      newStatus as OrderStatus
    );

    if (updatedOrder === null) {
      throw new AppError("Order não existe", HttpStatus.NOT_FOUND);
    }

    return updatedOrder;
  }
}
