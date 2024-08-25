import { AppError } from "../errors/appError";
import { MockOrderRepository } from "../../../tests/mocks/mockOrderRepository";
import { Item } from "../../domain/entities/order/enums/item.enum";
import { CreateOrderUseCase } from "./createOrderUseCase";

describe("CreateOrderUseCase", () => {
  let mockOrderRepository: MockOrderRepository;
  let createOrderUseCase: CreateOrderUseCase;

  beforeEach(() => {
    mockOrderRepository = new MockOrderRepository();
    createOrderUseCase = new CreateOrderUseCase(mockOrderRepository);
  });

  it("deve criar um pedido com itens válidos", async () => {
    createOrderUseCase.execute([{ itemName: Item.DESSERT, quantity: 2 }]);
  });

  it("deve criar um pedido com itens válidos", async () => {
    try {
      await createOrderUseCase.execute([]);

      fail("O teste falhou porque a exceção não foi lançada");
    } catch (error) {
      expect(error).toBeInstanceOf(AppError);
      expect((error as AppError).message).toBe(
        "An order must have at least 1 item"
      );
    }
  });
});
