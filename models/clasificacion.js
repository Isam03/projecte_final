const { json } = require("express");
const mongoose = require("mongoose");

const ClasificacionSchema = new mongoose.Schema({

    identificador: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    }


});

const Clasificacion = mongoose.model("clasificaciones", ClasificacionSchema);

module.exports = Clasificacion;
