const moongose = require('mongoose');
const uniqueValidator = require('mongoose-unique-validator');
let Schema = moongose.Schema;

let rolesValidos = {
    values: ['ADMIN_ROLE', 'USER_ROLE'],
    message: '{VALUE} no es un rol valido'
};

let usuarioSchema = new Schema(
    {
        nombre: {
            type: String,
            trim: true,
            required: [true, "El nombre es requerido"],
            maxlength: 50
        },
        email: {
            type: String,
            trim: true,
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
    },
    { timestamps: true }
);

usuarioSchema.methods.toJSON = function() {

    let user = this;
    let userObject = user.toObject();
    delete userObject.password;
    return userObject;
}

usuarioSchema.plugin(uniqueValidator, {message: 'El campo {PATH} debe ser unico'});

//Realizo exportacion de modulo estableciendole como nombre Usuario
module.exports = moongose.model('Usuario', usuarioSchema);