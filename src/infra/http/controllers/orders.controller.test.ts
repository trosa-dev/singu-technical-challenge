import { CreateOrderUseCase } from "../../../application/use-cases/orders/createOrder/createOrder.useCase";
import { GetAllOrdersUseCase } from "../../../application/use-cases/orders/getAllOrders/getAllOrders.useCase";
import { UpdateOrderStatusUseCase } from "../../../application/use-cases/orders/updateOrderStatus/updateOrderStatus.useCase";
import { AppError } from "../../../application/errors/appError";
import HttpStatus from "../../../shared/enums/httpStatus";
import { responseMessages } from "../../../constants/messages/responseMessages";
import { OrdersController } from "./orders.controller";

// Mocks
jest.mock(
  "../../../application/use-cases/orders/createOrder/createOrder.useCase"
);
jest.mock(
  "../../../application/use-cases/orders/getAllOrders/getAllOrders.useCase"
);
jest.mock(
  "../../../application/use-cases/orders/updateOrderStatus/updateOrderStatus.useCase"
);

describe("OrdersController", () => {
  let ordersController: OrdersController;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockRequest: any;
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let mockResponse: any;
  let mockNext: jest.Mock;

  beforeEach(() => {
    ordersController = new OrdersController();
    mockRequest = {};
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      send: jest.fn(),
      json: jest.fn(),
    };
    mockNext = jest.fn();
  });

  describe("createOrder", () => {
    it("should create an order and return 201 status", async () => {
      const mockOrder = { id: "1", items: ["item1", "item2"] };
      (CreateOrderUseCase.prototype.execute as jest.Mock).mockResolvedValue(
        mockOrder
      );

      mockRequest.body = { itens: ["item1", "item2"] };

      await ordersController.createOrder(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.CREATED);
      expect(mockResponse.send).toHaveBeenCalledWith(mockOrder);
    });

    it("should call next with AppError if thrown", async () => {
      const mockError = new AppError("Test error", 400);
      (CreateOrderUseCase.prototype.execute as jest.Mock).mockRejectedValue(
        mockError
      );

      mockRequest.body = { itens: ["item1", "item2"] };

      await ordersController.createOrder(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it("should return 500 status for non-AppError", async () => {
      (CreateOrderUseCase.prototype.execute as jest.Mock).mockRejectedValue(
        new Error("Test error")
      );

      mockRequest.body = { itens: ["item1", "item2"] };

      await ordersController.createOrder(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: responseMessages.ERROR.INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe("getAllOrders", () => {
    it("should get all orders and return 200 status", async () => {
      const mockOrders = [
        { id: "1", items: ["item1"] },
        { id: "2", items: ["item2"] },
      ];
      (GetAllOrdersUseCase.prototype.execute as jest.Mock).mockResolvedValue(
        mockOrders
      );

      await ordersController.getAllOrders(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.send).toHaveBeenCalledWith(mockOrders);
    });

    it("should call next with AppError if thrown", async () => {
      const mockError = new AppError("Test error", 400);
      (GetAllOrdersUseCase.prototype.execute as jest.Mock).mockRejectedValue(
        mockError
      );

      await ordersController.getAllOrders(mockRequest, mockResponse, mockNext);

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it("should return 500 status for non-AppError", async () => {
      (GetAllOrdersUseCase.prototype.execute as jest.Mock).mockRejectedValue(
        new Error("Test error")
      );

      await ordersController.getAllOrders(mockRequest, mockResponse, mockNext);

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: responseMessages.ERROR.INTERNAL_SERVER_ERROR,
      });
    });
  });

  describe("updateOrderStatus", () => {
    it("should update order status and return 200 status", async () => {
      const mockUpdatedOrder = { id: "1", status: "completed" };
      (
        UpdateOrderStatusUseCase.prototype.execute as jest.Mock
      ).mockResolvedValue(mockUpdatedOrder);

      mockRequest.params = { id: "1" };
      mockRequest.body = { status: "completed" };

      await ordersController.updateOrderStatus(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.OK);
      expect(mockResponse.send).toHaveBeenCalledWith(mockUpdatedOrder);
    });

    it("should call next with AppError if thrown", async () => {
      const mockError = new AppError("Test error", 400);
      (
        UpdateOrderStatusUseCase.prototype.execute as jest.Mock
      ).mockRejectedValue(mockError);

      mockRequest.params = { id: "1" };
      mockRequest.body = { status: "completed" };

      await ordersController.updateOrderStatus(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockNext).toHaveBeenCalledWith(mockError);
    });

    it("should return 500 status for non-AppError", async () => {
      (
        UpdateOrderStatusUseCase.prototype.execute as jest.Mock
      ).mockRejectedValue(new Error("Test error"));

      mockRequest.params = { id: "1" };
      mockRequest.body = { status: "completed" };

      await ordersController.updateOrderStatus(
        mockRequest,
        mockResponse,
        mockNext
      );

      expect(mockResponse.status).toHaveBeenCalledWith(
        HttpStatus.INTERNAL_SERVER_ERROR
      );
      expect(mockResponse.json).toHaveBeenCalledWith({
        message: responseMessages.ERROR.INTERNAL_SERVER_ERROR,
      });
    });
  });
});
