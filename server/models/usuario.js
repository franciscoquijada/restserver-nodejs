const moongose = require('mongoose');
var uniqueValidator = require('mongoose-unique-validator');
let Schema = moongose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema({
    nombre: {
        type: String,
        required: [true, "El nombre es requerido"]
    },
    email: {
        type: String,
        required: [true, "El email es requerido"],
        unique: true
    },
    password: {
        type: String,
        required: [true, "El password es requerido"]
    },
    img: {
        type: String,
        required: false
    },
    role: {
        type: String,
        default: 'USER_ROLE',
        enum: rolesValidos
    },
    estado: {
        type: Boolean,
        default: true
    },
    google: {
        type: Boolean,
        default: false
    }
});

usuarioSchema.plugin(uniqueValidator, {message: 'El campo {PATH} debe ser unico'});

//Realizo exportacion de modulo estableciendole como nombre Usuario
module.exports = moongose.model('Usuario', usuarioSchema);