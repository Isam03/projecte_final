// API REST per el manteniment de verdures 
const express = require('express');
const path = require('path');
const mongoose = require('mongoose');
const axios = require('axios');
var moment = require('moment');

const app = express();
const port = 3000;
app.use(express.json());

mongoose.connect('mongodb+srv://isam:isam03@parking.ikyce.mongodb.net/quedaya',
{
    useNewUrlParser: true,
    useUnifiedTopology: true
});

const db = mongoose.connection;
db.on("error", console.error.bind(console, "connection error: "));
db.once("open", ()=>{
    console.log("Connected successfully");
});

app.use(express.static(path.join(__dirname,'www')));
require('./api')(app);

///////////////////////////////////////////////////
////////////////// VISTES ////////////////////
///////////////////////////////////////////////////

// // View engine setup
// app.set('view engine', 'html');
app.set('views', './www/views')
app.set('view engine', 'ejs')

// // With middleware
// app.use('/api/actividades', function (req, res, next) {
    
//     next();
// });

/// VISTA de INICIO
app.get('/', async (req, res) => {
    try {
        const response = await axios.get('http://localhost:3004/api/actividades');
        const data = response.data;
        res.render('index', {events: data});
    } catch (error) {
        console.error(error);
        res.status(500).send('Server Error');
    }
})

/// VISTA de LOGIN / REGISTRO
app.get('/login', (req, res) => {
    res.render('login')
})

/// VISTA de EVENTO
app.get('/event', (req, res) => {
    res.render('event/event')
})

/// VISTA de CREAR EVENTO
app.get('/event/create', (req, res) => {
    res.render('event/crear')
})




app.listen(port, () => {
    console.log(`Servidor arrancat, escoltant el port ${port}`);
}); 