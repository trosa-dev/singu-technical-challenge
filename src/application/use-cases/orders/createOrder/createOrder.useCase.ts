import { responseMessages } from "../../../../constants/messages/responseMessages";
import { Order, OrderItem } from "../../../../domain/entities/order/order";
import { OrderRepository } from "../../../../domain/repositories/orderRepository";
import HttpStatus from "../../../../shared/enums/httpStatus";
import { AppError } from "../../../errors/appError";

export class CreateOrderUseCase {
  constructor(private orderRepository: OrderRepository) {}

  async execute(items: OrderItem[]): Promise<Order> {
    if (!items || items.length === 0) {
      throw new AppError(
        responseMessages.ERROR.NO_ITEMS_IN_ORDER,
        HttpStatus.BAD_REQUEST
      );
    }

    const id = Date.now().toString();

    const existingOrder = await this.orderRepository.findById(id);

    if (existingOrder) {
      throw new AppError(
        responseMessages.ERROR.ID_ALREADY_EXISTS,
        HttpStatus.BAD_REQUEST
      );
    }

    const order = new Order(items, id);
    return this.orderRepository.create(order);
  }
}
