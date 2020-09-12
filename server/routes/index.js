const express = require("express");
const app = express();

app.use(require('./tiendas'));
app.use(require('./productos'));
app.use(require('./productos'));
app.use(require('./categorias'));
app.use(require('./usuarios'));
app.use(require('./login'));


module.exports = app;