const express = require("express");
const { Router } = express;
const { Container } = require("./container");

const router = Router();
const products = new Container("./products.txt");

router.get("/", async (req, res) => {
  const result = await products.getAll();
  res.json(result);
});

router.get("/:id", async (req, res) => {
  const { id } = req.params;
  const productId = await products.getById(id);
  res.json(productId);
});

router.post("/", async (req, res) => {
  const saveProduct = await products.save(req.body);
  res.json(saveProduct);
});

// router.put("/:id", async (req, res) => {
//   const { id } = req.params;
//   const { name, price } = req.body;
//   const prod = {
//     name: name,
//     price: price,
//   };
//   const productId = await products.getById(id);
//   res.json(productId);
// });

router.delete("/:id", async (req, res) => {
  const { id } = req.params;
  const deleteProduct = await products.deleteById(id);
  res.json(deleteProduct);
});

module.exports = router;
