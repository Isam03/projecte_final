const express = require('express');
const path = require('path');
const app = express();
const actividades = require('./actividades');
const usuarios = require('./usuarios');
const clasificaciones = require('./clasificaciones');
const categorias = require('./categorias');
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

  const newUsuario = {

    id: req.body._id,
    nombre: req.body.nombre,
    apellido: req.body.apellido,
    email: req.body.email,
    password: req.body.password,
    dni: req.body.dni,
    fecha_nacimiento: req.body.fecha_nacimiento,
    rol: req.body.rol

  };

  usuarios.push(newUsuario);
  res.status(200).json({ usuarios });

  const newClasificacion = {
    
    id: req.body._id,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion,
    pic: req.body.pic

  }

  clasificaciones.push(newClasificacion);
  res.status(200).json({ clasificaciones });

  const newCategoria = {

    id: req.body._id,
    titulo: req.body.titulo,
    descripcion: req.body.descripcion

  }

  categorias.push(newCategoria);
  res.status(200).json({ categorias });



});

app.listen(port, () => {
    console.log(`Servidor arrencat, escoltant el port ${port}`);
});



