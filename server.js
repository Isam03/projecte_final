// API REST per el manteniment de verdures 
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
var moment = require('moment');
const session = require('express-session');
const flash = require('connect-flash');
const passport = require('passport');
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

/// VISTA de INICIO
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3004/api/actividades');
        const data = response.data;

        const categoria = await axios.get('http://localhost:3004/api/categorias/');
        const dataCat = categoria.data;

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
            // Render the protected page
            res.render('index', { events: data, user: req.user, categoria: dataCat });
        } else {
            // Redirect the user to the login page
            res.render('index', { events: data, user: req.user, categoria: dataCat });
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

app.post('/register', async (req, res) => {
    const usuario = req.body;

    try {
        await axios.post('https://localhost:3004/api/usuario', usuario);
    } catch (error) {
        res.status(500).send('Server Error');
    }
});

app.get('/protected', (req, res) => {
    if (req.isAuthenticated()) {
        // Render the protected page
        res.render('user/panel', { user: req.user });
    } else {
        // Redirect the user to the login page
        res.redirect('/login');
    }
});

app.get('/profile', (req, res) => {
    if (req.isAuthenticated()) {
        // Render the protected page
        res.render('user/profile', { user: req.user });
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

    res.render('event/event', { event: data, categoria: cat })
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

    res.render('category', { events: dataAct, categoria: dataCat })
})



app.listen(port, () => {
    console.log(`Servidor arrancat, escoltant el port ${port}`);
}); 