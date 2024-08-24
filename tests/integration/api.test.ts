import request from "supertest";
import { app } from "../../src/infra/config/expressApp";
import { OrderStatus } from "../../src/domain/entities/order/enums/order-status.enum";
import { Item } from "../../src/domain/entities/order/enums/item.enum";
import HttpStatus from "../../src/shared/enums/httpStatus";

describe("Orders API", () => {
  const newOrder = {
    items: [
      { name: Item.PIZZA, quantity: 1 },
      { name: Item.SUSHI, quantity: 2 },
    ],
  };

  it("should create a new order", async () => {
    const response = await request(app).post("/orders").send(newOrder);

    expect(response.status).toBe(HttpStatus.CREATED);
    expect(response.body).toHaveProperty("id");
    expect(response.body.items).toEqual(newOrder.items);
    expect(response.body.status).toBe(OrderStatus.PENDING);
  });

  it("should return all orders", async () => {
    await request(app).post("/orders").send(newOrder);

    const response = await request(app).get("/orders");

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.length).toBe(2);
    expect(response.body[0].items).toEqual(newOrder.items);
  });

  it("should update the status of an existing order", async () => {
    const createResponse = await request(app).post("/orders").send(newOrder);

    const orderId = createResponse.body.id;
    const response = await request(app)
      .put(`/orders/${orderId}/status`)
      .send({ status: OrderStatus.IN_PREPARATION });

    expect(response.status).toBe(HttpStatus.OK);
    expect(response.body.status).toBe(OrderStatus.IN_PREPARATION);
  });

  it("should return 404 when trying to update the status of a non-existent order", async () => {
    const response = await request(app)
      .put(`/orders/999/status`)
      .send({ status: OrderStatus.READY });

    expect(response.status).toBe(HttpStatus.NOT_FOUND);
    expect(response.body).toHaveProperty("message", "Pedido não encontrado");
  });
});
