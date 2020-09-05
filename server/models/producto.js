const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

var productoSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
            maxlength: 50,
            unique: [true, "El nombre debe ser unico"],
        },
        precioUnitario: {
            type: Number,
            required: [true, "El precio es obligatorio"],
            trim: true,
            maxlength: 32
        },
        descripcion: {
            type: String,
            required: false,
            maxlength: 3000
        },
        disponible: {
            type: Boolean,
            required: true,
            default: true
        },
        categoria: {
            type: ObjectId,
            ref: 'Categoria',
            required: true
        },
        usuario: {
            type: ObjectId,
            ref: 'Usuario'
        }
    },
    { timestamps: true }
);

module.exports = mongoose.model('Producto', productoSchema);