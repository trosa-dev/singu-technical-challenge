import { GetAllOrdersUseCase } from "./../../../application/use-cases/getAllOrders.useCase";
import { NextFunction, Request, Response } from "express";
import HttpStatus from "../../../shared/enums/httpStatus";
import { InMemoryOrderRepository } from "../../database/inMemoryOrderRepository";
import { CreateOrderUseCase } from "../../../application/use-cases/createOrderUseCase";
import { UpdateOrderStatusUseCase } from "../../../application/use-cases/updateOrderStatus.useCase";
import { AppError } from "../../../application/errors/appError";

const orderRepository = new InMemoryOrderRepository();

const createOrderUseCase = new CreateOrderUseCase(orderRepository);
const getAllOrdersUseCase = new GetAllOrdersUseCase(orderRepository);
const updateOrderStatusUseCase = new UpdateOrderStatusUseCase(orderRepository);

export class OrdersController {
  async createOrder(req: Request, res: Response): Promise<Response> {
    const order = await createOrderUseCase.execute(req.body.items);
    return res.status(HttpStatus.CREATED).send(order);
  }

  async getAllOrders(req: Request, res: Response): Promise<Response> {
    const orders = await getAllOrdersUseCase.execute();
    return res.status(HttpStatus.OK).send(orders);
  }

  async updateOrderStatus(req: Request, res: Response, next: NextFunction) {
    try {
      const id: string = req.params.id;
      const newStatus: string = req.body.newStatus;

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
