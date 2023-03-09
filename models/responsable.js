const mongoose = require("mongoose");

const ResponsableSchema = new mongoose.Schema({
    nombre: {
        type: String,
        required: true
    },
    apellido: {
        type: String,
        required: true
    },
    nombreUsuario: {
        type: String,
        required: true
    }
});

const Responsable = mongoose.model("responsables", ResponsableSchema);

module.exports = Responsable;
