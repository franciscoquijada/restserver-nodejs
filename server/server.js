require('./config/config');

const express = require('express');
const mongoose = require('mongoose');
const morgan = require("morgan");
const bodyParser = require('body-parser');
const cookieParser = require("cookie-parser");
const cors = require("cors");

const app = express();

app.use(cors());
app.use(morgan("dev"));
app.use(bodyParser.urlencoded({ extended: false }));
app.use(bodyParser.json());
app.use(cookieParser());

app.use(require('./routes/index'));

mongoose.connect(process.env.URLDB,
    {
        useNewUrlParser: true,
        useCreateIndex: true
    }, (err, res) => {
    if(err) throw err;
    console.log('Base de datos online');
});

app.listen(process.env.PORT, () => {
    console.log("Estoy corriendo en el puerto ", process.env.PORT);
});