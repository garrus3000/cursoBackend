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
                fs.writeFileSync( `./${this.fileName}`, JSON.stringify(_products));
                return producto.id;
            } 
            else {
                const _products = [];
                producto.id = 1;
                _products.push(producto);
                fs.writeFileSync( `./${this.fileName}`, JSON.stringify(_products));
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
                fs.writeFileSync( `./${this.fileName}`, JSON.stringify(_products));
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

const contenedor = new Contenedor("productos.txt");

(async function () {
    await contenedor.save("Pizza", 1200, "https://progsoft.net/images/lorem-pizza-8e6f0d64f7f428b88a6bb1453d7aed4f7cffd3d9.jpg");
    await contenedor.save("Hamburguesa", 1000, "https://media.istockphoto.com/photos/juicy-hamburger-on-white-background-picture-id1206323282");
    console.log("Return id del metodo save(), id:", await contenedor.save("Gaseosa", 600, "https://pbs.twimg.com/media/Dr1W4DgWsAAsfCz.jpg"));
    try {
        console.log("Lista completa de productos: ", await contenedor.getAll());
        const producto = await contenedor.getById(1);
        console.log(`Producto filtrado por "id: ${producto.id}" `, producto);
        await contenedor.deleteById(2);
        console.log("Lista completa de productos: ", await contenedor.getAll());
        console.log(await contenedor.getById(2));
        await contenedor.deleteAll();
        console.log("Lista completa de productos: ", await contenedor.getAll());
    } catch (error) {
        console.log(error);
    }
})();
