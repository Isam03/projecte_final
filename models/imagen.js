const { json } = require("express");
const mongoose = require("mongoose");

const imagenSchema = new mongoose.Schema({

    filename: {
        type: String,
        required: false
    },
    path: {
        type: String,
        required: false
    },
    id_usuario: {
        type: String,
        required: false
    },
    id_actividad: {
        type: String,
        required: false
    },
    rol: {
        type: String,
        required: false
    }



}, { strict: false });

const Imagen = mongoose.model("Imagen", imagenSchema);
  
module.exports = Imagen;
