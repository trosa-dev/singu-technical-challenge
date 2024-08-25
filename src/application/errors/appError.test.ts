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
    const appError = new AppError(
      "Test error",
      HttpStatus.INTERNAL_SERVER_ERROR
    );
    expect(appError.stack).toBeDefined();
  });
});
