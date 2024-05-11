const mongoose = require("mongoose")

const schemaUser = new mongoose.Schema({
    nombre: {type: String, required: [true]},
    apellido: {type: String, required: [true]},
    usuario: {type: String, required: [true]},
    contrasena: {type: String, required: [true]},
    visible: {type: Boolean, default: true}
})

const model = mongoose.model("Usuario", schemaUser)

module.exports = model