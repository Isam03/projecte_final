const { json } = require("express");
const mongoose = require("mongoose");
const { ObjectId } = require("bson");

const ticketSchema = new mongoose.Schema({

    referencia: {
        type: String,
        required: false
    },
    titulo: {
        type: String,
        required: false
    },
    descripcion: {
        type: String,
        required: false
    },
    fecha: {
        type: String,
        required: false
    },
    hora: {
        type: String,
        required: false
    },
    precio: {
        type: Number,
        required: false
    },
    creado_por: {
        type: String,
        required: false
    },
    id_usuario: {
        type: ObjectId,
        required: false
    },
    id_actividad: {
        type: ObjectId,
        required: false
    }


});

const Ticket = mongoose.model("Ticket", ticketSchema);
  
module.exports = Ticket;