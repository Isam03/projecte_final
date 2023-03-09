const express = require('express');
const path = require('path');
const app = express();
const responsables = require('./responsables');
const tasques = require('./tasques');
const moment = require('moment');
const port = 3000;
// app.use(express.static('www'));
app.use(express.json());
app.use(express.static(path.join(__dirname,'www')));

app.get('/api', (req, res) => {
    res.status(200).json({ responsables });
});

app.post('/api', (req, res) => {
    const newResponsable = {
      id: req.body._id,
      nombre: req.body.nombre,
      apellido: req.body.apellido,
      nombreUsuario: req.body.nombreUsuario
  };
 
  responsables.push(newResponsable);
  res.status(200).json({ responsables });

  const newTasca = {
    id: req.body._id,
    titulo: req.body.titulo,
    titulo_corto: req.body.titulo_corto,
    descripcion: req.body.descripcion,
    color: req.body.color,
    fecha_creacion: req.body.fecha_creacion,
    fecha_finalizacion: req.body.fecha_finalizacion,
    responsable: req.body.responsable,
    posicion: req.body.posicion
  };

  tasques.push(newTasca);
  res.status(200).json({ tasques });

});

app.listen(port, () => {
    console.log(`Servidor arrencat, escoltant el port ${port}`);
});



