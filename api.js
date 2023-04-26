const actividades = require('./actividades');
const usuarios = require('./usuarios');
const actividadModel = require("./models/actividad");
const usuarioModel = require("./models/usuario");
const moment = require('moment');
const { response } = require('express');

module.exports = (app) => {


    ///////////////////////////////////////////////////
    ////////////////// ACTIVIDADES ////////////////////
    ///////////////////////////////////////////////////

    //GET endpoint /actividades
    app.get('/api/actividades', async (req, res) => {

        const actividades = await actividadModel.find({});

       try {
            res.status(200).send(actividades);
       } catch (error) {
            res.status(500).send(error);
       }
    });

    app.get('/api/actividad/:id', async (req, res) => {

        const actividad = await actividadModel.findOne({_id: req.params.id});

       try {
            res.status(200).send(actividad);
       } catch (error) {
            res.status(500).send(error);
       }
    });

   
    //POST endpoint /actividades
    app.post('/api/actividad', async (req, res) => {
        const actividades = new actividadModel(req.body);
        
        try {
            await actividades.save(); 
            const actv = await actividadModel.find({});
            res.status(200).send(actv);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    //PUT endopint /actividad/id (sirve para editar un objeto a partir del ID)
    app.put('/api/actividad/:id', async (req, res) => {

        const actividad = await actividadModel.findOne({_id: req.params.id});
        try {
            actividad.id = req.body._id,
            actividad.titulo = req.body.titulo,
            actividad.descripcion = req.body.descripcion,
            actividad.id_categoria = req.body.id_categoria,
            actividad.foto = req.body.foto,
            actividad.fecha = req.body.fecha,
            actividad.horario = req.body.horario,
            actividad.duracion = req.body.duracion,
            actividad.precio = req.body.precio,
            actividad.correoContacto = req.body.correoContacto,
            actividad.telefonoContacto = req.body.telefonoContacto,
            actividad.creado_por = req.body.creado_por,
            actividad.coords = req.body.coords,
            actividad.id_widgetCompra = req.body.id_widgetCompra,
            actividad.id_clasificacion = req.body.id_clasificacion
            await actividad.save(); 
            const resp = await actividadModel.find({});

            res.status(200).send(resp);

        } catch (error) {
            res.status(500).send(error);
        }
    });

    //DELETE enpoint /actividad/id
    app.delete('/api/actividad/:id', async (req, res) => {

        const actividad = await actividadModel.deleteOne({_id: req.params.id});
        try {
            const resp = await actividadModel.find({});

            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    ///////////////////////////////////////////////////
    //////////////////// USUARIOS /////////////////////
    ///////////////////////////////////////////////////

    //GET endpoint /actividades
    app.get('/api/usuarios', async (req, res) => {

        const usuarios = await usuarioModel.find({});

       try {
            res.status(200).send(usuarios);
       } catch (error) {
            res.status(500).send(error);
       }
    });

    //GET endpoint /usuario/id 
    app.get('/api/usuario/:id', async (req, res) => {

        const usuario = await usuarioModel.findOne({_id: req.params.id});

       try {
            res.status(200).send(usuario);
       } catch (error) {
            res.status(500).send(error);
       }
    });

   
    //POST endpoint /actividades
    app.post('/api/usuario', async (req, res) => {
        const usuarios = new usuarioModel(req.body);
        
        try {
            await usuarios.save(); 
            const resp = await usuarioModel.find({});
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //PUT endopint /actividad/id (sirve para editar un objeto a partir del ID)
    app.put('/api/usuario/:id', async (req, res) => {

        const usuario = await usuarioModel.findOne({_id: req.params.id});
        try {
            usuario.id = req.body._id,
            usuario.nombre = req.body.nombre,
            usuario.apellido = req.body.apellido,
            usuario.email = req.body.email,
            usuario.password = req.body.password,
            usuario.dni = req.body.dni,
            usuario.fecha_nacimiento = req.body.fecha_nacimiento,
            usuario.rol = req.body.rol

            await usuario.save(); 
            const resp = await usuarioModel.find({});

            res.status(200).send(resp);

        } catch (error) {
            res.status(500).send(error);
        }
    });

    //DELETE enpoint /actividad/id
    app.delete('/api/usuario/:id', async (req, res) => {

        const usuario = await usuarioModel.deleteOne({_id: req.params.id});
        try {
            const resp = await usuarioModel.find({});

            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });


}