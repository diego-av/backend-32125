const fs = require("fs");

class Container {
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
      const searchId = contentFile.find((el) => el.id === parseInt(id));
      return searchId;
    } catch (error) {
      console.log(error);
    }
  }

  async getAll() {
    try {
      const contentFile = await this.read();
      return contentFile;
    } catch (error) {
      console.log("Error al traer todos los productos. " + error);
    }
  }

  async deleteById(id) {
    try {
      const contentFile = await this.read();
      const deleteId = contentFile.filter((el) => el.id !== parseInt(id));
      console.log(deleteId);
      await fs.promises.writeFile(this.ruta, JSON.stringify(deleteId, null, 2));
      return deleteId;
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

const container = new Container("./products.txt");

module.exports = { Container, container };

// Container.save({ product: "Goma", price: 123.45, id: 4 });
// Container.getById(1);
// Container.getAll();
// Container.deleteById(2);
// Container.deleteAll();
