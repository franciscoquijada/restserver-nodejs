const mongoose = require('mongoose');
const { ObjectId } = mongoose.Schema;

var tiendaSchema = new mongoose.Schema(
    {
        nombre: {
            type: String,
            required: [true, "El nombre es obligatorio"],
            trim: true,
            maxlength: 50,
            unique: [true, "El nombre debe ser unico"],
        },
        direccion: {
            type: String,
            trim: true,
            maxlength: 300
        },
    },
    { timestamps: true }
);

module.exports = mongoose.model('Tienda', tiendaSchema);