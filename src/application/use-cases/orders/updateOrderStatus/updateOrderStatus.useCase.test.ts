import { OrderStatus } from "../../../../domain/entities/order/enums/order-status.enum";
import { AppError } from "../../../errors/appError";
import { MockOrderRepository } from "../../../../../tests/mocks/mockOrderRepository";
import { CreateOrderUseCase } from "../createOrder/createOrder.useCase";
import { UpdateOrderStatusUseCase } from "./updateOrderStatus.useCase";
import { Item } from "../../../../domain/entities/order/enums/item.enum";
import { responseMessages } from "../../../../constants/messages/responseMessages";

describe("UpdateOrderStatusUseCase", () => {
  let mockOrderRepository: MockOrderRepository;
  let createOrderUseCase: CreateOrderUseCase;
  let updateOrderStatusUseCase: UpdateOrderStatusUseCase;

  beforeEach(() => {
    mockOrderRepository = new MockOrderRepository();
    createOrderUseCase = new CreateOrderUseCase(mockOrderRepository);
    updateOrderStatusUseCase = new UpdateOrderStatusUseCase(
      mockOrderRepository
    );
  });

  it("should update order status successfully", async () => {
    const order = await createOrderUseCase.execute([
      { itemName: Item.DESSERT, quantity: 1 },
    ]);

    const updatedOrder = await updateOrderStatusUseCase.execute(
      order.id,
      OrderStatus.READY
    );

    expect(updatedOrder.status).toBe(OrderStatus.READY);
  });

  it("should throw an error for invalid status", async () => {
    try {
      await updateOrderStatusUseCase.execute("1", "INVALID_STATUS");

      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe(
        responseMessages.ERROR.INVALID_ORDER_STATUS
      );
    }
  });

  it("should throw AppError with 'Order does not exist' message when order does not exist", async () => {
    try {
      await updateOrderStatusUseCase.execute("INVALID_ID", OrderStatus.READY);

      fail("Expected an error to be thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe(
        responseMessages.ERROR.ORDER_NOT_FOUND
      );
    }
  });
});
