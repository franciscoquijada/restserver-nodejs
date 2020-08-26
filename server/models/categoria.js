const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Usuario = require('../models/usuario');

let categoriaSchema = new Schema({
    descripcion: {type: String, unique: true, required: [true]},
    usuario: {type: Schema.Types.ObjectId, ref: Usuario}
});

module.exports = mongoose.model('Categoria', categoriaSchema);