const express = require('express');
const app = express();
const PORT = 8080;

const Contenedor = require('./contenedor');
const productos = new Contenedor("productos.txt");

app.get("/productos", (req, res, next) => {
    productos.getAll().then((prod) => res.send(prod));
});

app.get("/productoRandom", (req, res, next) => {
    productos
        .getAll()
        .then((prod) =>
            res.send(prod[Math.floor(Math.random() * prod.length)])
        );
});

app.listen(PORT, () => {
    console.log(`Escuchando el Servidor en el puerto ${PORT}`);
});