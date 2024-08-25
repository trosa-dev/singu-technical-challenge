import HttpStatus from "../../shared/enums/httpStatus";
import { AppError } from "./appError";

describe("AppError", () => {
  it("should create an instance with the correct message and status code", () => {
    const errorMessage = "Test error message";
    const statusCode = HttpStatus.BAD_REQUEST;
    const appError = new AppError(errorMessage, statusCode);

    expect(appError).toBeInstanceOf(AppError);
    expect(appError).toBeInstanceOf(Error);
    expect(appError.message).toBe(errorMessage);
    expect(appError.statusCode).toBe(statusCode);
  });

  it("should have a stack trace", () => {
    const appError = new AppError("Test error", 500);
    expect(appError.stack).toBeDefined();
  });

  it("should maintain instanceof relationship", () => {
    const appError = new AppError("Test error", 500);
    expect(appError instanceof AppError).toBe(true);
    expect(appError instanceof Error).toBe(true);
  });
});
