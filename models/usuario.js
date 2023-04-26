const { json } = require("express");
const mongoose = require("mongoose");

const UsuarioSchema = new mongoose.Schema({
    // titulo: req.body.titulo,
    // descripcion: req.body.descripcion,
    // id_categoria: req.body.id_categoria,
    // foto: req.body.foto,
    // fecha: req.body.fecha,
    // horario: req.body.horario,
    // duracion: req.body.duracion,
    // precio: req.body.precio,
    // correoContacto: req.body.correoContacto,
    // telefonoContacto: req.body.telefonoContacto,
    // creado_por: req.body.creado_por,
    // coords: req.body.coords,
    // id_widgetCompra: req.body.id_widgetCompra,
    // id_clasificacion: req.body.id_clasificacion

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

const Usuario = mongoose.model("usuarios", UsuarioSchema);

module.exports = Usuario;
