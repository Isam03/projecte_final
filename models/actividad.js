const { json } = require("express");
const mongoose = require("mongoose");

const ActividadSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: true
    },
    descripcion: {
        type: String,
        required: true
    },
    id_categoria: {
        type: Number,
        required: true
    },
    foto: {
        type: String
    },
    fechahora: {
        type: String,
        required: true
    },
    duracion: {
        type: String,
        required: true
    },
    precio: {
        type: String,
        required: true
    },
    correoContacto: {
        type: String,
        required: true
    },
    telefonoContacto: {
        type: String,
        required: true
    },
    creado_por: {
        type: String,
        required: true
    },
    coords: {
        type: String,
        required: true
    },
    id_widgetCompra: {
        type: Number,
        required: true
    },
    id_clasificacion: {
        type: Number,
        required: true
    },


});

const Actividad = mongoose.model("actividades", ActividadSchema);

module.exports = Actividad;
