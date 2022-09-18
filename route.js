const express = require("express");
const app = express();
const { Container, container } = require("./contenedor");
const PORT = process.env.PORT || 8080;

const products = new Container("./products.txt");

app.get("/products", async (req, res) => {
  const result = await products.getAll();
  res.json(result);
});

app.get("/randomProduct", async (req, res) => {
  const result = await products.getAll();
  const random = result[Math.floor(Math.random() * result.length)];
  res.send(random);
});

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});
server.on("error", (err) => console.log(err));
