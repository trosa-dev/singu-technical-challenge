import request from "supertest";
import { app } from "../../src/infra/config/expressApp";

describe("Orders API", () => {
  it("should create a new order", async () => {
    const newOrder = { items: ["item1", "item2"] };

    const response = await request(app).post("/orders").send(newOrder);

    expect(response.status).toBe(201);
    expect(response.body).toHaveProperty("id");
    expect(response.body.items).toEqual(newOrder.items);
    expect(response.body.status).toBe("pendente");
  });

  it("should return all orders", async () => {
    const newOrder = { items: ["item1", "item2"] };
    await request(app).post("/orders").send(newOrder);

    const response = await request(app).get("/orders");

    expect(response.status).toBe(200);

    expect(response.body.length).toBe(2);
    expect(response.body[0].items).toEqual(newOrder.items);
  });

  it("should update the status of an existing order", async () => {
    const newOrder = { items: ["item1", "item2"] };
    const createResponse = await request(app).post("/orders").send(newOrder);

    const orderId = createResponse.body.id;
    const response = await request(app)
      .put(`/orders/${orderId}/status`)
      .send({ status: "completed" });

    expect(response.status).toBe(200);
    expect(response.body.status).toBe("completed");
  });

  it("should return 404 when trying to update the status of a non-existent order", async () => {
    const response = await request(app)
      .put(`/orders/999/status`)
      .send({ status: "completed" });

    expect(response.status).toBe(404);
    expect(response.body).toHaveProperty("message", "Pedido não encontrado");
  });
});
