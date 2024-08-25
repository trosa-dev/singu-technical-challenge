import { Router } from "express";
import { OrdersController } from "../controllers/orders.controller";

export const ordersRouter = Router();

const ordersController = new OrdersController();

ordersRouter.post("/", ordersController.createOrder);
ordersRouter.get("/", ordersController.getAllOrders);
ordersRouter.put("/:id/status", ordersController.updateOrderStatus);

export default ordersRouter;
