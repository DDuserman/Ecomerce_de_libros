const mongoose = require("mongoose")

const schema = mongoose.Schema({
    vendedor: {type: String, required: [true]},
    comprador: {type: String, required: [true]},
    libros: {type: Array, required: [true]},
    total_price: {type: Number, required: [true]},
    visible: {type: Boolean, default: true},
    estado: {type: String, default: "en progreso"},
    creacion: {type: Number, default: new Date().toISOString().split('T')[0].substring(0,4) + new Date().toISOString().split('T')[0].substring(5,7) + new Date().toISOString().split('T')[0].substring(8,10)}
})

const model =  mongoose.model("Pedido", schema)

module.exports = model