import express from "express";
import { PORT } from "../environment";
import { ordersRouter } from "../http/routes/order.routes";
import { errorHandler } from "../middlewares/errorHandler ";

// Initialize the Express application
export const app = express();

// Middleware
app.use(express.json());

// Routes
app.use("/pedidos", ordersRouter);

// Middleware de tratamento de erros (deve vir após as rotas)
app.use(errorHandler);

// Initialize an empty array for orders
export const orders: any[] = [];

// Start the server if not in test environment
if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
