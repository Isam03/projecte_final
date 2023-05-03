const { json } = require("express");
const mongoose = require("mongoose");
const passportLocalMongoose = require('passport-local-mongoose');

const UsuarioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    email: {
        type: String,
        required: true
    },
    password: {
        type: String,
        required: true
    },
    dni: {
        type: String,
        required: true
    },
    fecha_nacimiento: {
        type: Date,
        required: true
    },
    rol: {
        type: Number,
        required: true
    }


});


UsuarioSchema.plugin(passportLocalMongoose);

const Usuario = mongoose.model("usuarios", UsuarioSchema);

module.exports = Usuario;
