const { json } = require("express");
const mongoose = require("mongoose");

const TascaSchema = new mongoose.Schema({
    titulo: {
        type: String
    },
    titulo_corto: {
        type: String
    },
    descripcion: {
        type: String
    },
    color: {
        type: String
    },
    fecha_creacion: {
        type: String
    },
    fecha_finalizacion: {
        type: String
    },
    responsable: {
        type: Array
    },
    posicion: {
        type: String
    }

});

const Tasca = mongoose.model("tasques", TascaSchema);

module.exports = Tasca;
