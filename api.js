const responsables = require('./responsables');
const responsableModel = require("./models/responsable");
const tascaModel = require("./models/tasca");
const moment = require('moment');
const { response } = require('express');

module.exports = (app) => {
    //Obtenir el llistat de responsables
    //GET al endpoint /responsables
    app.get('/api/responsables', async (req, res) => {

        const responsables = await responsableModel.find({});

       try {
            res.status(200).send(responsables);
       } catch (error) {
            res.status(500).send(error);
       }
    });

    //Afegir una nou responsable
    //POST al endpoint /responsables
    //En el BODY li pasarem el responsable que volem afegir
    app.post('/api/responsables', async (req, res) => {
        const responsables = new responsableModel(req.body);
        
        try {
            await responsables.save(); // Això retorna la última verdura.
            const resp = await responsableModel.find({});   // Demano la colecció actualitzada per retornar-la.
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //Elimina una verdura
    //DELETE al endpoint api/verdures/:id
    app.delete('/api/responsables/:id', async (req, res) => {

        const responsable = await responsableModel.deleteOne({_id: req.params.id});
        try {
            const resp = await responsableModel.find({});   // Demano la colecció actualitzada per retornar-la.
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // *****************************************************************************************************************
    // *****************************************************************************************************************
    // *****************************************************************************************************************
    // PART TASQUES

    //Obtenir el llistat de responsables
    //GET al endpoint /responsables
    app.get('/api/tasques', async (req, res) => {

        const tasques = await tascaModel.find({});

       try {
            res.status(200).send(tasques);
       } catch (error) {
            res.status(500).send(error);
       }
    });

    //Afegir una nou responsable
    //POST al endpoint /responsables
    //En el BODY li pasarem el responsable que volem afegir
    app.post('/api/tasques', async (req, res) => {
        const tasques = new tascaModel(req.body);
        
        try {
            await tasques.save(); // Això retorna la última verdura.
            const resp = await tascaModel.find({});   // Demano la colecció actualitzada per retornar-la.
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //Modifica una verdura
    //PUT al endpoint api/verdures/:id
    //En el Body li pasarem la verdura que volem modificar

    // app.put('/api/tasques/:id', async (req, res) => {

    //     const tasca = await tascaModel.findOne({_id: req.params.id});
    //     try {
    //         tasca.posicion = req.body.posicion;
    //         await tasca.save(); // Això retorna la última verdura.
    //         const resp = await tascaModel.find({});   // Demano la colecció actualitzada per retornar-la.
    //         res.status(200).send(resp);
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    // });

    app.put('/api/tasques/:id', async (req, res) => {

        const tasca = await tascaModel.findOne({_id: req.params.id});
        try {

            tasca.titulo = req.body.titulo;
            tasca.titulo_corto = req.body.titulo_corto;
            tasca.descripcion = req.body.descripcion;
            tasca.color = req.body.color;
            tasca.fecha_creacion = req.body.fecha_creacion;
            tasca.fecha_finalizacion = req.body.fecha_finalizacion;
            tasca.responsable = req.body.responsable;
            tasca.posicion = req.body.posicion;
            await tasca.save(); // Això retorna la última verdura.
            const resp = await tascaModel.find({});   // Demano la colecció actualitzada per retornar-la.
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //Elimina una verdura
    //DELETE al endpoint api/verdures/:id
    app.delete('/api/tasques/:id', async (req, res) => {

        const tasca = await tascaModel.deleteOne({_id: req.params.id});
        try {
            const resp = await tascaModel.find({});   // Demano la colecció actualitzada per retornar-la.
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });
}