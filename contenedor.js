const fs = require("fs");

class Contenedor {
  constructor(ruta) {
    this.ruta = ruta;
  }

  async read() {
    try {
      const content = await fs.promises.readFile(this.ruta, "utf-8");
      const contentParse = JSON.parse(content);
      return contentParse;
    } catch (error) {
      console.log("Error al leer el archivo. " + error);
    }
  }
  async save(obj) {
    try {
      const contentFile = await this.read();
      if (contentFile.length !== 0) {
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify(
            [
              ...contentFile,
              {
                ...obj,
                id: contentFile[contentFile.length - 1].id + 1,
              },
            ],
            null,
            2
          ),
          "utf-8"
        );
        console.log("Producto guardado");
      } else {
        await fs.promises.writeFile(
          this.ruta,
          JSON.stringify([{ ...obj, id: 1 }]),
          "utf-8"
        );
        console.log("Producto guardado.");
      }
    } catch (error) {
      console.log("Error al querer guardar el producto. " + error);
    }
  }

  async getById(id) {
    try {
      const contentFile = await this.read();
      let searchId = contentFile.find((el) => el.id === id);
      console.log(searchId);
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const contentFile = await this.read();
      console.log("Productos encontrados: " + JSON.stringify(contentFile));
    } catch (error) {
      console.log("Error al traer todos los productos. " + error);
    }
  }

  async deleteById(id) {
    try {
      const contentFile = await this.read();
      let deleteId = contentFile.filter((el) => el.id !== id);
      console.log(deleteId);
      await fs.promises.writeFile(this.ruta, JSON.stringify(deleteId, null, 2));
    } catch (error) {
      console.log(error);
    }
  }

  async deleteAll() {
    try {
      await fs.promises.writeFile(this.ruta, JSON.stringify([], null, 2));
      console.log("Sin productos");
    } catch (error) {
      console.log(error);
    }
  }
}

const contenedor = new Contenedor("./products.txt");

module.exports = { Contenedor, contenedor };

// Contenedor.save({ product: "Escuadra", price: 123.45, id: 1 });
// contenedor.getById(2);
// contenedor.getAll();
// contenedor.deleteById(2);
// contenedor.deleteAll();
