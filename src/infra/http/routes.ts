import { Router } from "express";
import { orders } from "../config/expressApp";

export const router = Router();

router.post("/", (req: any, res: any) => {
  const pedido = {
    id: Date.now().toString(),
    items: req.body.items,
    status: "pendente",
  };
  orders.push(pedido);
  res.status(201).send(pedido);
});

router.get("/", (req: any, res: any) => {
  res.status(200).send(orders);
});

router.put("/:id/status", (req: any, res: any) => {
  const pedido = orders.find((p: any) => p.id === req.params.id);
  if (pedido) {
    pedido.status = req.body.status;
    res.status(200).send(pedido);
  } else {
    res.status(404).send({ message: "Pedido não encontrado" });
  }
});
