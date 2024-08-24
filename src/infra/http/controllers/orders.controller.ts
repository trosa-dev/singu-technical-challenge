import { Request, Response } from "express";
import { orders } from "../../config/expressApp";

class OrdersController {
  createOrder(req: Request, res: Response): Response {
    const pedido = {
      id: Date.now().toString(),
      items: req.body.items,
      status: "pendente",
    };
    orders.push(pedido);
    return res.status(201).send(pedido);
  }

  getAllOrders(req: Request, res: Response): Response {
    return res.status(200).send(orders);
  }

  updateOrderStatus(req: Request, res: Response): Response {
    const pedido = orders.find((p: any) => p.id === req.params.id);
    if (pedido) {
      pedido.status = req.body.status;
      return res.status(200).send(pedido);
    } else {
      return res.status(404).send({ message: "Pedido não encontrado" });
    }
  }
}

const ordersController = new OrdersController();
export { ordersController };
