const express = require('express');
const path = require('path');
const app = express();
const actividades = require('./actividades');
const moment = require('moment');
const port = 3000;
// app.use(express.static('www'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'www')));

app.get('/api', (req, res) => {
    res.status(200).json({ actividades });
});

app.post('/api', (req, res) => {
  const newActividad = {
    id: req.body._id,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    id_categoria: req.body.id_categoria,
    foto: req.body.foto,
    fecha: req.body.fecha,
    horario: req.body.horario,
    duracion: req.body.duracion,
    precio: req.body.precio,
    correoContacto: req.body.correoContacto,
    telefonoContacto: req.body.telefonoContacto,
    creado_por: req.body.creado_por,
    coords: req.body.coords,
    id_widgetCompra: req.body.id_widgetCompra,
    id_clasificacion: req.body.id_clasificacion
  };
 
  actividades.push(newActividad);
  res.status(200).json({ actividades });

});

app.listen(port, () => {
    console.log(`Servidor arrencat, escoltant el port ${port}`);
});



