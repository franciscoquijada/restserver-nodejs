var mongoose = require('mongoose');
var Schema = mongoose.Schema;

var productoSchema = new Schema({
    nombre: {type: String, required: [true, "El nombre es obligatorio"]},
    precioUnitario: {type: Number, required: [true, "El precio es obligatorio"]},
    descripcion: {type: String, required: false},
    disponible: {type: Boolean, required: true, default: true},
    categoria: {type: Schema.Types.ObjectId, ref: 'Categoria', required: true},
    usuario: {type: Schema.Types.ObjectId, ref: 'Usuario'}
});

module.exports = mongoose.model('Producto', productoSchema);