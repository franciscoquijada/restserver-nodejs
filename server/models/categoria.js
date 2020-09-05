const mongoose = require('mongoose');
const Schema = mongoose.Schema;
const Usuario = require('../models/usuario');
const { ObjectId } = mongoose.Schema;

let categoriaSchema = new Schema(
    {
        nombre: {
            type: String,
            trim: true,
            required: true,
            maxlength: 32,
            unique: true
        },
        disponible: {
            type: Boolean,
            required: false,
            default: true
        },
        descripcion: {
            type: String,
            trim: true,
            unique: true,
            required: true
        },
        usuario: {
            type: ObjectId,
            ref: Usuario
        }
    },
    { timestamps: true });

module.exports = mongoose.model('Categoria', categoriaSchema);