export class AppError extends Error {
  // Readonly property to store the HTTP status code associated with the error
  public readonly statusCode: number;

  // Constructor to initialize the error message and status code
  constructor(message: string, statusCode: number) {
    // Call the parent class (Error) constructor with the error message
    super(message);

    // Set the status code for the error
    this.statusCode = statusCode;

    // Necessary to maintain the correct stack trace when using the native Error
    Error.captureStackTrace(this, this.constructor);
  }
}
