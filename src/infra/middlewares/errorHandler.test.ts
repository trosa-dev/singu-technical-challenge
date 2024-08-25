import { Request, Response, NextFunction } from "express";
import HttpStatus from "../../shared/enums/httpStatus";
import { AppError } from "../../application/errors/appError";
import { errorHandler } from "./errorHandler ";

describe("errorHandler middleware", () => {
  let mockRequest: Partial<Request>;
  let mockResponse: Partial<Response>;
  let nextFunction: NextFunction = jest.fn();

  beforeEach(() => {
    mockRequest = {
      originalUrl: "/test-url",
    };
    mockResponse = {
      status: jest.fn().mockReturnThis(),
      json: jest.fn(),
    };
    jest.clearAllMocks();
  });

  it("should handle AppError and send appropriate response", () => {
    const appError = new AppError("Test error", HttpStatus.BAD_REQUEST);
    const expectedResponse = {
      success: false,
      message: "Test error",
      timestamp: expect.any(String),
      path: "/test-url",
    };

    errorHandler(
      appError,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(mockResponse.status).toHaveBeenCalledWith(HttpStatus.BAD_REQUEST);
    expect(mockResponse.json).toHaveBeenCalledWith(
      expect.objectContaining(expectedResponse)
    );
  });

  it("should call next() for non-AppError errors", () => {
    const error = new Error("Regular error");

    errorHandler(
      error,
      mockRequest as Request,
      mockResponse as Response,
      nextFunction
    );

    expect(nextFunction).toHaveBeenCalled();
    expect(mockResponse.status).not.toHaveBeenCalled();
    expect(mockResponse.json).not.toHaveBeenCalled();
  });
});
