import { NextFunction, Request, Response } from "express";
import HttpStatus from "../../../shared/enums/httpStatus";
import { InMemoryOrderRepository } from "../../database/inMemoryOrderRepository";
import { AppError } from "../../../application/errors/appError";
import { CreateOrderUseCase } from "../../../application/use-cases/orders/createOrder/createOrder.useCase";
import { GetAllOrdersUseCase } from "../../../application/use-cases/orders/getAllOrders/getAllOrders.useCase";
import { UpdateOrderStatusUseCase } from "../../../application/use-cases/orders/updateOrderStatus/updateOrderStatus.useCase";

const orderRepository = new InMemoryOrderRepository();

const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);

export class OrdersController {
  async createOrder(req: Request, res: Response): Promise<Response> {
    const order = await createOrderUseCase.execute(req.body.itens);
    return res.status(HttpStatus.CREATED).send(order);
  }

  async getAllOrders(req: Request, res: Response): Promise<Response> {
    const orders = await getAllOrdersUseCase.execute();
    return res.status(HttpStatus.OK).send(orders);
  }

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const newStatus: string = req.body.status;

      const updatedOrder = await updateOrderStatusUseCase.execute(
        id,
        newStatus
      );
      return res.status(HttpStatus.OK).send(updatedOrder);
    } catch (error: any) {
      if (error instanceof AppError) {
        next(error);
      } else {
        res.status(500).json({ message: "Internal Server Error" });
      }
    }
  }
}
