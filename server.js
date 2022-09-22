const express = require("express");
const products = require("./module/route");
const app = express();
const PORT = process.env.PORT || 8080;

app.use(express.static("public"));
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

app.use("/api/products", products);

const server = app.listen(PORT, () => {
  console.log(`Listening on port ${server.address().port}`);
});
