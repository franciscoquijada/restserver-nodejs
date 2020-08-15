require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const bodyParser = require('body-parser');

const app = express();

// parse application/x-www-form-urlencoded
app.use(bodyParser.urlencoded({ extended: false }));
// parse application/json
app.use(bodyParser.json());

app.use(require('./routes/usuarios'));

mongoose.connect('mongodb://localhost:27017/cafe', (err, res) => {
    if(err) throw err;
    console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log("Estoy corriendo en el puerto ", process.env.PORT);
});