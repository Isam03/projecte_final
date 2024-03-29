// API REST per el manteniment de verdures 
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
var moment = require('moment');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
const nodemailer = require('nodemailer');
const usuarioModel = require("./models/usuario");

const categoriaModel = require("./models/usuario");

const app = express();
require('./config/passport');
const port = 3000;
app.use(express.json());

mongoose.connect('mongodb+srv://isam:isam03@parking.ikyce.mongodb.net/quedaya',
    {
        useNewUrlParser: true,
        useUnifiedTopology: true
    });

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", () => {
    console.log("Connected successfully");
});

const transporter = nodemailer.createTransport({
    host: 'smtp.office365.com',
    port: 587,
    secure: false,
    auth: {
      user: 'quedaya@outlook.es',
      pass: '#institutcampalans@'
    }
  });

app.use(express.static(path.join(__dirname, 'www')));

require('./api')(app);

///////////////////////////////////////////////////
////////////////// VISTES ////////////////////
///////////////////////////////////////////////////

// // View engine setup
// app.set('view engine', 'html');
app.set('views', './www/views')
app.set('view engine', 'ejs')

app.use(express.urlencoded({ extended: false }));
app.use(session({
    secret: 'secret',
    resave: false,
    saveUninitialized: false,
}));
app.use(passport.initialize());
app.use(passport.session());
app.use(flash());

// // With middleware
// app.use('/api/actividades', function (req, res, next) {

//     next();
// });

app.use('/uploads', express.static('uploads'));

/// VISTA de INICIO
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3004/api/actividades');
        const data = response.data;

        const categoria = await axios.get('http://localhost:3004/api/categorias/');
        const dataCat = categoria.data;

        const rescla = await axios.get('http://localhost:3004/api/clasificaciones')
        const cla = rescla.data;

        const resusu = await axios.get('http://localhost:3004/api/usuarios')
        const usu = resusu.data;

        // const page = parseInt(req.query.page) - 1||0;
        // const limit = parseInt(req.query.limit) || 5;
        // const search = req.query.search || "";

        // let catOptions = [];

        // for (let i = 0; i <= dataCat.length; i++){
        //     catOptions.push(dataCat[i].titulo);
        // }

        // category === "All" ? (category = [...catOptions]) : (category = req.query.category.split(","));

        // let sortBy = {};
        // if(category[1]){
        //     sortBy[category[0]] = category[1];
        // }else{
        //     sortBy[category[0]] = "asc";
        // }

        if (req.isAuthenticated()) {
            res.render('index', { events: data, user: req.user, categoria: dataCat, clasificaciones: cla, usuario: usu });
        } else {
            res.render('index', { events: data, user: req.user, categoria: dataCat, clasificaciones: cla, usuario: usu});
        }


    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})


/// VISTA de LOGIN / REGISTRO
app.get('/login', (req, res) => {
    res.render('login')
})

// ENDPOINT LOGIN
app.post('/login', passport.authenticate('local', {
    failureRedirect: '/login',
    successRedirect: '/',
    failureFlash: true
}))

// ENDPOINT REGISTER
app.post('/register', async (req, res) => {
    const usuario = req.body;
  
    try {
      await axios.post('http://localhost:3004/api/usuario', usuario)
      res.status(200).redirect('/login');;
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
});

// ENDPOINT CREAR ACTIVIDAD
app.post('/crear/actividad', async (req, res) => {
    const actividad = req.body;

    
  
    try {
      await axios.post('http://localhost:3004/api/actividad', actividad)
      res.status(200).redirect('/admin');;
    } catch (error) {
      console.error(error);
      res.status(500).send('Server Error');
    }
});

// app.get('/protected', (req, res) => {
//     if (req.isAuthenticated()) {
//         // Render the protected page
//         res.render('user/panel', { user: req.user });
//     } else {
//         // Redirect the user to the login page
//         res.redirect('/login');
//     }
// });

app.get('/profile', async (req, res) => {
    if (req.isAuthenticated()) {
        const categoria = await axios.get('http://localhost:3004/api/categorias/');
        const dataCat = categoria.data;

        const rescla = await axios.get('http://localhost:3004/api/clasificaciones')
        const cla = rescla.data;

        const resusu = await axios.get('http://localhost:3004/api/usuarios')
        const usu = resusu.data;
        // Render the protected page
        const images = await axios.get('http://localhost:3004/api/images');
        const data = images.data;
        res.render('user/profile', { user: req.user, imagens: data, categoria: dataCat, clasificaciones: cla, usuario: usu });
    } else {
        // Redirect the user to the login page
        res.redirect('/login');
    }
});


app.get('/logout', function (req, res, next) {
    req.logout(function (err) {
        if (err) { return next(err); }
        req.flash('success_msg', 'You are logged out');
        res.redirect('/');
    });
});

/// VISTA de EVENTO
app.get('/event/:id', async (req, res) => {
    const resev = await axios.get('http://localhost:3004/api/actividad/' + req.params.id);
    const data = resev.data;
    const rescat = await axios.get('http://localhost:3004/api/categorias')
    const cat = rescat.data;
    const resusu = await axios.get('http://localhost:3004/api/usuarios')
    const usu = resusu.data;
    const rescla = await axios.get('http://localhost:3004/api/clasificaciones')
    const cla = rescla.data;
    let usr;
    if (req.isAuthenticated()) {
        usr = req.user;
    }
    res.render('event/event', { event: data, categoria: cat, usuario: usu, user: usr, clasificaciones: cla, moment })
})


/// VISTA de CREAR EVENTO
app.get('/event/create', (req, res) => {
    res.render('event/crear')
})


/// VISTA de CATEGORIAS
app.get('/category/:id', async (req, res) => {
    const resAct = await axios.get('http://localhost:3004/api/actividades');
    const resCat = await axios.get('http://localhost:3004/api/categoria/' + req.params.id);
    const dataAct = resAct.data;
    const dataCat = resCat.data;
    const rescate = await axios.get('http://localhost:3004/api/categorias')
    const cat = rescate.data;
    const resusu = await axios.get('http://localhost:3004/api/usuarios')
    const usu = resusu.data;
    const rescla = await axios.get('http://localhost:3004/api/clasificaciones')
    const cla = rescla.data;
    let usr;
    if (req.isAuthenticated()) {
        usr = req.user;
    }
    res.render('category', { events: dataAct, categoria: cat, usuario: usu, clasificaciones: cla, categorias: dataCat, user: usr })
})


/// VISTA de Busqueda
app.get('/search', async (req, res) => {
    const search = async (query) => {
        try {
          const response = await axios.post('http://localhost:3004/api/search', { q: query });
          const data = response.data;
          res.render('search', {events: data})
        } catch (error) {
          console.error(error);
        }
      }
    
})

    // ENDPOINT SOLICITUD CREACION EVENTO (MAIL)
    app.post('/send', async (req, res) => {

        let html = '<b>Titulo: </b>' + req.body.titulo + '<br>' + 
        '<b>Descripcion: </b>' + req.body.descripcion + '<br>' +
        '<b>Imagen(url): </b>' + req.body.imagenUrl + '<br>' +
        '<b>Categoria: </b>' +req.body.categoria+ '<br>' +
        '<b>Clasificacion: </b>' +req.body.clasificacion+ '<br>' +
        '<b>Fecha y hora: </b>' +req.body.fechahora+ '<br>' +
        '<b>Correo: </b>' +req.body.correoContacto+ '<br>' +
        '<b>Telefono: </b>' +req.body.telefonoContacto+ '<br>' +
        '<b>Coordenadas: </b>' +req.body.coords + '<br>';
        '<b>Precio: </b>' +req.body.precio + '<br>';
        '<b>Solicitante: </b>' +req.body.creado_por + '<br>';

        const mailOptions = {
            from: '"QuedaYa" <quedaya@outlook.es>',
            to: 'agarrig5@institutcampalans.net',
            subject: 'Solicitud creacion de evento',
            html: html
          };
        
          // Send the email
          transporter.sendMail(mailOptions, function(error, info){
            if (error) {
              console.log(error);
            } else {
              console.log('Email sent: ' + info.response);
            }
          });
        
        res.redirect('/');
    });

    /// VISTA PANEL DE ADMINISTRACION
    app.get('/admin', async (req, res) => {
        const resev = await axios.get('http://localhost:3004/api/actividades/');
        const data = resev.data;
        const rescat = await axios.get('http://localhost:3004/api/categorias')
        const cat = rescat.data;
        const resusu = await axios.get('http://localhost:3004/api/usuarios')
        const usu = resusu.data;
        const rescla = await axios.get('http://localhost:3004/api/clasificaciones')
        const cla = rescla.data;
        let usr = req.user;
        if (req.isAuthenticated() && (req.user.rol == 0)) {
            res.render('user/admin', { event: data, categoria: cat, usuario: usu, user: usr, clasificaciones: cla, moment })
        }else {
            res.redirect('/');
        }
        
    })

// VISTA CHECKOUT
app.get('/success', async(req,res) =>{
    res.render('event/success');
});

app.post('/checkout', async(req,res) =>{
    const ticket = req.body;
    try {
        await axios.post('http://localhost:3004/api/compra', ticket)
        res.status(200).render('event/checkout');
    } catch (error) {
        res.status(500).send('Server checkout error');
    }
});

app.post('/webhook', express.json({type: 'application/json'}), (request, response) => {
    const event = request.body;
  
    // Handle the event
    switch (event.type) {
      case 'payment_intent.succeeded':
        const paymentIntent = event.data.object;
        // Then define and call a method to handle the successful payment intent.
        // handlePaymentIntentSucceeded(paymentIntent);
        break;
      case 'payment_method.attached':
        const paymentMethod = event.data.object;
        // Then define and call a method to handle the successful attachment of a PaymentMethod.
        // handlePaymentMethodAttached(paymentMethod);
        break;
      // ... handle other event types
      default:
        console.log(`Unhandled event type ${event.type}`);
    }
  
    // Return a response to acknowledge receipt of the event
    response.json({received: true});
  });

app.listen(port, () => {
    console.log(`Servidor arrancat, escoltant el port ${port}`);
}); 