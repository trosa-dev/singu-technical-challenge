import { MockOrderRepository } from "../../../../../tests/mocks/mockOrderRepository";
import { Item } from "../../../../domain/entities/order/enums/item.enum";
import { CreateOrderUseCase } from "../createOrder/createOrder.useCase";
import { GetAllOrdersUseCase } from "./getAllOrders.useCase";

describe("GetAllOrdersUseCase", () => {
  let createOrderUseCase: CreateOrderUseCase;
  let getAllOrdersUseCase: GetAllOrdersUseCase;
  let mockOrderRepository: MockOrderRepository;

  beforeEach(() => {
    mockOrderRepository = new MockOrderRepository();
    createOrderUseCase = new CreateOrderUseCase(mockOrderRepository);
    getAllOrdersUseCase = new GetAllOrdersUseCase(mockOrderRepository);
  });

  it("should return an empty list when there are no orders", async () => {
    const result = await getAllOrdersUseCase.execute();

    expect(result).toEqual([]);
  });

  it("should return a list with orders when there are orders", async () => {
    await Promise.all([
      createOrderUseCase.execute([{ itemName: Item.DESSERT, quantity: 1 }]),
      createOrderUseCase.execute([{ itemName: Item.SUSHI, quantity: 2 }]),
    ]);

    const orders = await getAllOrdersUseCase.execute();

    expect(orders.length).toEqual(2);
  });
});
