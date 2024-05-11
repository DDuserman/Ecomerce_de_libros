const mongoose = require("mongoose")

const schema = mongoose.Schema({
    titulo: {type: String, required: [true]},
    publicacion: {type: Number, required: [true]},
    autor: {type: String, required: [true]},
    genero: {type: String, required: [true]},
    precio: {type: Number, required: [true]},
    dueno: {type: String, required: [true]},
    editorial: {type: String, required: [true]},
    visible: {type: Boolean, default: true}
})

const model =  mongoose.model("Libro", schema)

module.exports = model