import { Request, Response } from "express";
import { orders } from "../../config/expressApp";
import { OrderStatus } from "../../../domain/entities/order/enums/order-status.enum";
import HttpStatus from "../../../shared/enums/httpStatus";

class OrdersController {
  createOrder(req: Request, res: Response): Response {
    const order = {
      id: Date.now().toString(),
      items: req.body.items,
      status: OrderStatus.PENDING,
    };
    orders.push(order);
    return res.status(HttpStatus.CREATED).send(order);
  }

  getAllOrders(req: Request, res: Response): Response {
    return res.status(HttpStatus.OK).send(orders);
  }

  updateOrderStatus(req: Request, res: Response): Response {
    const pedido = orders.find((p: any) => p.id === req.params.id);
    if (pedido) {
      pedido.status = req.body.status;
      return res.status(HttpStatus.OK).send(pedido);
    } else {
      return res
        .status(HttpStatus.NOT_FOUND)
        .send({ message: "Pedido não encontrado" });
    }
  }
}

const ordersController = new OrdersController();
export { ordersController };
