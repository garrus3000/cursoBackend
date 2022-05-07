const fs = require("fs");

class Contenedor {
    constructor(fileName) {
        this.fileName = fileName;
    }
    async save(title, price, thumbnail) {
        const producto = {
            id: null,
            title: title,
            price: price,
            thumbnail: thumbnail,
        };
        try {
            if (fs.existsSync(this.fileName)) {
                const contenido = await fs.promises.readFile( `./${this.fileName}`, "utf-8" );
                const _products = JSON.parse(contenido);
                producto.id = _products.length + 1;
                _products.push(producto);
                fs.writeFileSync( `./${this.fileName}`, JSON.stringify(_products, null, 2));
                return producto.id;
            } 
            else {
                const _products = [];
                producto.id = 1;
                _products.push(producto);
                fs.writeFileSync( `./${this.fileName}`, JSON.stringify(_products, null, 2));
                return producto.id;
            }
        } catch (error) {
            console.log(error);
        }
    }
    async getById(id) {
        const contenido = await fs.promises.readFile( `./${this.fileName}`, "utf-8" );
        try {
            const _products = JSON.parse(contenido);
            const idFiltrado = _products.find((producto) => producto.id == id);
            if (idFiltrado != undefined) {
            return idFiltrado;
            }
            else {
                return null;
            }
        } catch (error) {
            console.log("Error getById: ", error);
        }
    }
    async getAll() {
        const contenido = await fs.promises.readFile( `./${this.fileName}`, "utf-8" );
        try {
            const _products = JSON.parse(contenido);
            return _products;
        } catch (error) {
            console.log("Error getAll :", error);
        }
    }
    async deleteById(id) {
        const contenido = await fs.promises.readFile( `./${this.fileName}`, "utf-8" );
        try {
            const _products = JSON.parse(contenido);
            const producto = _products.find((producto) => producto.id == id);
            const index = _products.indexOf(producto);
            if (index === -1) {
                return undefined;
            }
            else {
                _products.splice(index, 1);
                fs.writeFileSync( `./${this.fileName}`, JSON.stringify(_products, null, 2));
            }
        } catch (error) {
            console.log("Error deleteById: ", error);
        }
    }
    async deleteAll() {
        try {
            fs.writeFileSync(`./${this.fileName}`, "[]");
        } catch (error) {
            console.log("Error deleteAll: ", error);
        }
    }
}

module.exports = Contenedor;