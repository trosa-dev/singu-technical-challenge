// Enum defining the possible states of an order
export enum OrderStatus {
  PENDING = "pendente", // Initial Order status
  READY = "pronto", // Order is ready for delivery or pickup
  DELIVERED = "entregue", // Order has been delivered to the customer
}
