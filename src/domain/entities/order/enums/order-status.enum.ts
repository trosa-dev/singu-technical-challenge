// Enum defining the possible states of an order
export enum OrderStatus {
  PENDING = "pendente", // Initial state when the order is created
  IN_PREPARATION = "em preparação", // Order is being prepared
  READY = "pronto", // Order is ready for delivery or pickup
  DELIVERED = "entregue", // Order has been delivered to the customer
}
