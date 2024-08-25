import { MockOrderRepository } from "../../../../../tests/mocks/mockOrderRepository";
import { Item } from "../../../../domain/entities/order/enums/item.enum";
import { AppError } from "../../../errors/appError";
import { CreateOrderUseCase } from "./createOrder.useCase";

describe("CreateOrderUseCase", () => {
  let mockOrderRepository: MockOrderRepository;
  let createOrderUseCase: CreateOrderUseCase;

  beforeEach(() => {
    mockOrderRepository = new MockOrderRepository();
    createOrderUseCase = new CreateOrderUseCase(mockOrderRepository);
  });

  it("should create an order with valid items", async () => {
    await createOrderUseCase.execute([{ itemName: Item.DESSERT, quantity: 2 }]);
  });

  it("should throw an error when creating an order with no items", async () => {
    try {
      await createOrderUseCase.execute([]);

      fail("The test failed because the exception was not thrown");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe(
        "An order must have at least 1 item"
      );
    }
  });
});
