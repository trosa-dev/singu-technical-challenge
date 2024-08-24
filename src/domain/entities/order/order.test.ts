import { Item } from "./enums/item.enum";
import { OrderStatus } from "./enums/order-status.enum";
import { Order, OrderItem } from "./order";

describe("Order", () => {
  const id = Date.now().toString();
  const mockItems: OrderItem[] = [
    { item: Item.BURGER, quantity: 2 },
    { item: Item.SANDWICH, quantity: 1 },
  ];

  const order = new Order(id, mockItems);

  it("should create an order with the given id and items", () => {
    expect(order).toBeInstanceOf(Order);
    expect(order.id).toBe(id);
    expect(order.items).toEqual(mockItems);
  });

  it("should update status correctly", () => {
    order.updateStatus(OrderStatus.DELIVERED);
    expect(order.status).toBe(OrderStatus.DELIVERED);
  });
});
