const { ObjectId } = require("bson");
const { json } = require("express");
const mongoose = require("mongoose");

const ActividadSchema = new mongoose.Schema({

    titulo: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: false
    },
    id_categoria: {
        type: ObjectId,
        required: false
    },
    foto: {
        type: String
    },
    fechahora: {
        type: String,
        required: false
    },
    duracion: {
        type: String,
        required: false
    },
    precio: {
        type: String,
        required: false
    },
    correoContacto: {
        type: String,
        required: false
    },
    telefonoContacto: {
        type: String,
        required: false
    },
    creado_por: {
        type: String,
        required: false
    },
    coords: {
        type: String,
        required: false
    },
    id_widgetCompra: {
        type: Number,
        required: false
    },
    id_clasificacion: {
        type: ObjectId,
        required: false
    },
    numvisitas:{
        type: Number,
        required: false
    }


});

const Actividad = mongoose.model("actividades", ActividadSchema);

module.exports = Actividad;
