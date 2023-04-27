const { json } = require("express");
const mongoose = require("mongoose");

const CategoriaSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }


});

const Categoria = mongoose.model("categorias", CategoriaSchema);

module.exports = Categoria;
