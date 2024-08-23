const express = require("express");

const app = express();
app.use(express.json());

const pedidos: any = [];

app.post("/pedidos", (req: any, res: any) => {
  const pedido = {
    id: Date.now().toString(),
    itens: req.body.itens,
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

app.listen(3000, () => {
  console.log("Server is running on port 3000");
});

module.exports = app;
