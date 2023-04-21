const actividades = require('./actividades');
const actividadModel = require("./models/actividad");
const moment = require('moment');
const { response } = require('express');

module.exports = (app) => {
    //GET endpoint /actividades
    app.get('/api/actividades', async (req, res) => {

        const actividades = await actividadModel.find({});

       try {
            res.status(200).send(actividades);
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
}