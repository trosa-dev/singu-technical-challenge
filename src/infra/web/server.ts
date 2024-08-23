import express from "express";
import { PORT } from "../environment";

export const app = express();
app.use(express.json());

export const pedidos: any = [];

app.post("/pedidos", (req: any, res: any) => {
  const pedido = {
    id: Date.now().toString(),
    items: req.body.items,
    status: "pendente",
  };
  pedidos.push(pedido);
  res.status(201).send(pedido);
});

app.get("/pedidos", (req: any, res: any) => {
  res.status(200).send(pedidos);
});

app.put("/pedidos/:id/status", (req: any, res: any) => {
  const pedido = pedidos.find((p: any) => p.id === req.params.id);
  if (pedido) {
    pedido.status = req.body.status;
    res.status(200).send(pedido);
  } else {
    res.status(404).send({ message: "Pedido não encontrado" });
  }
});

if (process.env.NODE_ENV !== "test") {
  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
}
