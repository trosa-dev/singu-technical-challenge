const express = require("express");

const app = express();
app.use(express.json());

let pedidos = [];

app.post("/pedidos", (req, res) => {
	const pedido = {
		id: Date.now().toString(),
		itens: req.body.itens,
		status: "pendente",
	};
	pedidos.push(pedido);
	res.status(201).send(pedido);
});

app.get("/pedidos", (req, res) => {
	res.status(200).send(pedidos);
});

app.put("/pedidos/:id/status", (req, res) => {
	const pedido = pedidos.find((p) => p.id === req.params.id);
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
