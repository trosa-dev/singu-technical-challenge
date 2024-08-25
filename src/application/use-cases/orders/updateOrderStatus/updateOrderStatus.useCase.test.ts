import { OrderStatus } from "../../../../domain/entities/order/enums/order-status.enum";
import { AppError } from "../../../errors/appError";
import { MockOrderRepository } from "../../../../../tests/mocks/mockOrderRepository";
import { CreateOrderUseCase } from "../createOrder/createOrder.useCase";
import { UpdateOrderStatusUseCase } from "./updateOrderStatus.useCase";
import { Item } from "../../../../domain/entities/order/enums/item.enum";

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
    await expect(
      updateOrderStatusUseCase.execute("1", "INVALID_STATUS")
    ).rejects.toThrow("Invalid status: INVALID_STATUS");
  });

  it("should throw AppError with 'Order does not exist' message when order does not exist", async () => {
    const promise = updateOrderStatusUseCase.execute(
      "INVALID_ID",
      OrderStatus.READY
    );

    await Promise.all([
      expect(promise).rejects.toThrow(AppError),
      expect(promise).rejects.toThrow("Order does not exist"),
    ]);
  });
});
