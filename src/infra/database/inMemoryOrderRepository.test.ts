import { Order } from "../../domain/entities/order/order";
import { Item } from "../../domain/entities/order/enums/item.enum";
import { OrderStatus } from "../../domain/entities/order/enums/order-status.enum";
import { InMemoryOrderRepository } from "./inMemoryOrderRepository";

describe("InMemoryOrderRepository", () => {
  let repository: InMemoryOrderRepository;
  let mockOrder1: Order;
  let mockOrder2: Order;

  beforeEach(() => {
    repository = new InMemoryOrderRepository();

    const orderItems = [
      { itemName: Item.PIZZA, quantity: 2 },
      { itemName: Item.SUSHI, quantity: 1 },
    ];

    mockOrder1 = new Order(orderItems, "id-1");
    mockOrder2 = new Order(orderItems, "id-2");
  });

  describe("create", () => {
    it("should add a new order and return it", async () => {
      const result = await repository.create(mockOrder1);
      expect(result).toEqual(mockOrder1);
      expect(await repository.findById("id-1")).toEqual(mockOrder1);
    });
  });

  describe("findAll", () => {
    it("should return all orders", async () => {
      await Promise.all([
        repository.create(mockOrder1),
        repository.create(mockOrder2),
      ]);

      const result = await repository.findAll();
      expect(result).toHaveLength(2);
      expect(result).toContainEqual(mockOrder1);
      expect(result).toContainEqual(mockOrder2);
    });

    it("should return an empty array when there are no orders", async () => {
      const result = await repository.findAll();
      expect(result).toEqual([]);
    });
  });

  describe("findById", () => {
    it("should return the order with the given id", async () => {
      await repository.create(mockOrder1);
      const result = await repository.findById("id-1");
      expect(result).toEqual(mockOrder1);
    });

    it("should return null if the order is not found", async () => {
      const result = await repository.findById("nonexistent");
      expect(result).toBeNull();
    });
  });

  describe("update", () => {
    it("should update an existing order and return it", async () => {
      const order = await repository.create(mockOrder1);

      const updatedOrder = (await repository.updateStatus(
        order.id,
        OrderStatus.DELIVERED
      )) as Order;

      expect(updatedOrder.status).toEqual(OrderStatus.DELIVERED);
      expect(await repository.findById("id-1")).toEqual(updatedOrder);
    });

    /*it("should throw an error if the order to update is not found", async () => {
      const nonexistentOrder = new Order("nonexistent", []);
      await expect(repository.updateStatus(nonexistentOrder)).rejects.toThrow(
        "Order not found"
      );
    });*/
  });
});
