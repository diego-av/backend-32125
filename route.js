const express = require("express");
const app = express();
const { Contenedor } = require("./contenedor");

const products = new Contenedor("./products.txt");
const getProducts = products.getAll();

app.get("/", (req, res) => {
  res.send("Hola");
});

app.get("/products", (req, res) => {
  res.send(getProducts);
});

app.get("/productRandom", (req, res) => {
  const random = getProducts[Math.floor(Math.random() * getProducts.length)];
  res.send(random);
});

const port = 8080;
const server = app.listen(port, () => {
  console.log(`Listening on port ${server.address().port}`);
});
server.on("error", (err) => console.log(err));
