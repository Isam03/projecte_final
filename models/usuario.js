const { json } = require("express");
const mongoose = require("mongoose");
const bcrypt = require('bcryptjs');

const UsuarioSchema = new mongoose.Schema({

    nombre: {
        type: String,
        required: false
    },
    apellido: {
        type: String,
        required: false
    },
    nombreUsuario: {
        type: String,
        unique: true,
        required: false
    },
    email: {
        type: String,
        unique: true,
        required: false
    },
    password: {
        type: String,
        required: false
    },
    dni: {
        type: String,
        required: false
    },
    fecha_nacimiento: {
        type: Date,
        required: false
    },
    rol: {
        type: Number,
        required: false,
        default: 2
    },
    foto_perfil: {
        type: String,
        required: false,
    }

});

UsuarioSchema.pre('save', async function(next) {
    try {
        // check method of registration
        const user = this;
        if (!user.isModified('password')) next();
        // generate salt
        const salt = await bcrypt.genSalt(10);
        // hash the password
        const hashedPassword = await bcrypt.hash(this.password, salt);
        // replace plain text password with hashed password
        this.password = hashedPassword;
        next();
    } catch (error) {
        return next(error);
    }
});

// UsuarioSchema.methods.encryptPassword = async password=>{
//     const salt = await bcrypt.genSalt(10);
//     return await bcrypt.hash(password,salt);
// };

UsuarioSchema.methods.matchPassword = async function(password){
    return await bcrypt.compare(password, this.password);
}

const Usuario = mongoose.model("usuarios", UsuarioSchema);

module.exports = Usuario;
