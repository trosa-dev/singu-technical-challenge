import { Router } from "express";
import { ordersController } from "../controllers/orders.controller";

export const ordersRouter = Router();

ordersRouter.post("/", (req, res) => ordersController.createOrder(req, res));
ordersRouter.get("/", (req, res) => ordersController.getAllOrders(req, res));
ordersRouter.put("/:id/status", (req, res) =>
  ordersController.updateOrderStatus(req, res)
);

export default ordersRouter;
