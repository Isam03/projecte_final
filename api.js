const actividades = require('./actividades');
const usuarios = require('./usuarios');
const categorias = require('./categorias');
const clasificaciones = require('./clasificaciones');
const actividadModel = require("./models/actividad");
const usuarioModel = require("./models/usuario");
const categoriaModel = require("./models/categoria");
const clasificacionModel = require("./models/clasificacion");
const imagenModel = require("./models/imagen");
const ticketModel = require("./models/ticket");
const cors = require('cors');
const moment = require('moment');
const multer = require('multer');
const stripe = require('stripe')('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')
const { response } = require('express');

module.exports = (app) => {

    const storage = multer.diskStorage({
        destination: (req, file, cb) => {
            cb(null, 'uploads');
        },
        filename: (req, file, cb) => {
            cb(null, file.originalname);
        },
    });

    const upload = multer({ storage });

    app.use(cors({
        origin: 'http://localhost:3000',
        optionsSuccessStatus: 200
    }));

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

        const actividad = await actividadModel.findOne({ _id: req.params.id });

        actividad.numvisitas += 1;

        await actividad.save();

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

        const actividad = await actividadModel.findOne({ _id: req.params.id });
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

        const actividad = await actividadModel.deleteOne({ _id: req.params.id });
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

    //GET endpoint /usuarios
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

        const usuario = await usuarioModel.findOne({ _id: req.params.id });

        try {
            res.status(200).send(usuario);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    //POST endpoint /usuario
    app.post('/api/usuario', async (req, res) => {
<<<<<<< Updated upstream
        const usuarios = new usuarioModel(req.body);

        try {
            await usuarios.save();
=======
        
        try {
            const usuarios = new usuarioModel(req.body);
            await usuarios.save(); 
>>>>>>> Stashed changes
            const resp = await usuarioModel.find({});
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //PUT endopint /usuario/id (sirve para editar un objeto a partir del ID)
    // app.put('/api/usuario/:id', async (req, res) => {

    //     const usuario = await usuarioModel.findOne({ _id: req.params.id });
    //     try {
    //         usuario.id = req.body._id,
    //             usuario.nombre = req.body.nombre,
    //             usuario.apellido = req.body.apellido,
    //             usuario.email = req.body.email,
    //             usuario.password = req.body.password,
    //             usuario.dni = req.body.dni,
    //             usuario.fecha_nacimiento = req.body.fecha_nacimiento,
    //             usuario.rol = req.body.rol

    //         await usuario.save();
    //         const resp = await usuarioModel.find({});

    //         res.status(200).send(resp);

    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    // });

    // Endpoint para actualizar la foto de perfil del usuario
    app.put('/usuarios/:id/foto-perfil', (req, res) => {
        const userId = req.params.id;
        const imagePath = req.body.path; // Suponiendo que se envía el path de la imagen en el cuerpo de la solicitud

        // Buscar la imagen correspondiente al path recibido
        Imagen.findOne({ path: imagePath }, (err, imagen) => {
            if (err) {
                // Manejar el error
                return res.status(500).send(err);
            }

            if (!imagen) {
                // Si no se encuentra la imagen, enviar una respuesta con error
                return res.status(404).send({ message: 'No se encontró la imagen' });
            }

            const userIdFromImage = imagen.id_usuario;

            // Buscar al usuario correspondiente al id recibido
            Usuario.findById(userId, (err, usuario) => {
                if (err) {
                    // Manejar el error
                    return res.status(500).send(err);
                }

                if (!usuario) {
                    // Si no se encuentra el usuario, enviar una respuesta con error
                    return res.status(404).send({ message: 'No se encontró el usuario' });
                }

                // Actualizar el campo foto_perfil del usuario con el path recibido
                usuario.foto_perfil = imagePath;

                // Guardar el usuario actualizado en la base de datos
                usuario.save((err, usuarioActualizado) => {
                    if (err) {
                        // Manejar el error
                        return res.status(500).send(err);
                    }

                    // Enviar una respuesta con el usuario actualizado
                    res.send(usuarioActualizado);
                });
            });
        });
    });


    //DELETE enpoint /usuario/id
    app.delete('/api/usuario/:id', async (req, res) => {

        const usuario = await usuarioModel.deleteOne({ _id: req.params.id });
        try {
            const resp = await usuarioModel.find({});

            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //////////////////////////////////////////////////
    ////////////////// CATEGORIAS ////////////////////
    //////////////////////////////////////////////////

    //GET endpoint /categorias
    app.get('/api/categorias', async (req, res) => {

        const categorias = await categoriaModel.find({});

        try {
            res.status(200).send(categorias);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //GET endpoint /categoria by ID
    app.get('/api/categoria/:id', async (req, res) => {

        const categoria = await categoriaModel.findOne({ _id: req.params.id });

        try {
            res.status(200).send(categoria);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //POST endpoint /categoria
    app.post('/api/categoria', async (req, res) => {
        const categorias = new categoriaModel(req.body);

        try {
            await categorias.save();
            const resp = await categoriaModel.find({});
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //PUT endopint /categoria/id (sirve para editar un objeto a partir del ID)
    app.put('/api/categoria/:id', async (req, res) => {

        const categoria = await categoriaModel.findOne({ _id: req.params.id });
        try {

            categoria.id = req.body._id,
                categoria.titulo = req.body.titulo,
                categoria.descripcion = req.body.descripcion

            await categoria.save();
            const resp = await categoriaModel.find({});

            res.status(200).send(resp);

        } catch (error) {
            res.status(500).send(error);
        }
    });

    //DELETE enpoint /categoria/id
    app.delete('/api/categoria/:id', async (req, res) => {

        const categoria = await categoriaModel.deleteOne({ _id: req.params.id });
        try {
            const resp = await categoriaModel.find({});

            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });


    //////////////////////////////////////////////////
    //////////////// CLASIFICACIONES /////////////////
    //////////////////////////////////////////////////

    //GET endpoint /clasificaciones
    app.get('/api/clasificaciones', async (req, res) => {

        const clasificaciones = await clasificacionModel.find({});

        try {
            res.status(200).send(clasificaciones);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //POST endpoint /clasificacion
    app.post('/api/clasificacion', async (req, res) => {
        const clasificaciones = new clasificacionModel(req.body);

        try {
            await clasificaciones.save();
            const resp = await clasificacionModel.find({});
            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    //PUT endopint /clasificacion/id (sirve para editar un objeto a partir del ID)
    app.put('/api/clasificacion/:id', async (req, res) => {

        const clasificacion = await clasificacionModel.findOne({ _id: req.params.id });
        try {

            clasificacion.id = req.body._id,
                clasificacion.titulo = req.body.titulo,
                clasificacion.descripcion = req.body.descripcion,
                clasificacion.valor = req.body.valor

            await clasificacion.save();
            const resp = await clasificacionModel.find({});

            res.status(200).send(resp);

        } catch (error) {
            res.status(500).send(error);
        }
    });

    //DELETE enpoint /clasificacion/id
    app.delete('/api/clasificacion/:id', async (req, res) => {

        const clasificacion = await clasificacionModel.deleteOne({ _id: req.params.id });
        try {
            const resp = await clasificacionModel.find({});

            res.status(200).send(resp);
        } catch (error) {
            res.status(500).send(error);
        }
    });

    // SEARCH endpoint

    app.get('/search', async (req, res) => {
        try {
            const search = req.query.q;

            const actividades = await actividadModel.find({ titulo: { $regex: new RegExp(search, "i") } })

            res.status(200).send(actividades)
        } catch (error) {
            res.status(500).send(error);
        }
    })


    /// IMAGENES endpoint
    app.post('/api/upload', upload.single('imagefield'), async (req, res) => {
        try {
            const imagen = new imagenModel({
                filename: req.file.originalname,
                path: req.file.filename,
                id_usuario: req.body.id_usuario,
                rol: req.body.rol
            });
            await imagen.save();

            res.redirect('/profile');
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });

    app.get('/api/images', async (req, res) => {
        try {
            const images = await imagenModel.find().lean();

            // render the view and pass the images data to it
            res.send(images);
        } catch (error) {
            console.error(error);
            res.status(500).send(error);
        }
    });


    



    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////
    ////////////////      CHECK OUT       /////////////////////
    ///////////////////////////////////////////////////////////
    ///////////////////////////////////////////////////////////

    // app.post('/api/comprar/', async(req, res) => {
    //     try {
    //         const ticket = new ticketModel(req.body);
    //         await ticket.save();
    //         res.status(200).send(resp);
    //     } catch (error) {
    //         res.status(500).send(error);
    //     }
    // });

    
    app.post('/create-checkout-session', async (req, res) => {
        const session = await stripe.checkout.sessions.create({
          line_items: [
            {
                price_data: {
                  currency: "eur",
                  product_data: {
                      name: req.body.titulo,
                      description: req.body.descripcion,
                      metadata: {
                        fecha: req.body.fecha,
                        hora: req.body.hora,
                        creado_por: req.body.creado_por,
                        referencia: req.body.referencia
                      }
                  },
                  unit_amount: req.body.precio,
                },
                quantity: 1,
                product: req.body.id_actividad // Replace <product_id> with the actual product ID
              },
          ],
          mode: 'payment',
          success_url: 'http://localhost:3000/success',
          cancel_url: 'http://localhost:3000/',
        });
      
        res.redirect(303, session.url);
      });


    let port = 3004;

    app.listen(port, () => {
        console.log(`Servidor arrancat, escoltant el port ${port}`);
    });
}