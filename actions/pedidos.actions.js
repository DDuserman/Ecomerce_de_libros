const Pedido = require("../models/pedido")

const today = new Date().toISOString().split('T')[0].substring(0,4) + new Date().toISOString().split('T')[0].substring(5,7) + new Date().toISOString().split('T')[0].substring(8,10)

async function createPedidoAction(vendedor, comprador, libros, total_price){
    try{ 
     const newUser = new Pedido({ vendedor, comprador, libros, total_price });
     await newUser.save()
     return true
    } catch (error){
     console.log(error)
     return false
    }
 }

async function searchPedidosAction(vendedor){
    try {
        const pipeline = [
            {$match: 
                {
                    vendedor: vendedor,
                    visible: true
                }
            }
        ]
        return await Pedido.aggregate(pipeline);
    } catch (error) {
        console.log(error)
        return null
    }
}

async function searchPedidofilteredAction(vendedor, date_init = 0, date_fin = today, estado = null){
    try {
        console.log(vendedor, date_init, date_fin, estado)
        const pipeline = [
            {
                $match: {
                    vendedor: vendedor,
                    estado: estado !== null ? { $regex: estado, $options: 'i' } : { $exists: true },
                    creacion: { 
                        $gte: parseInt(date_init),
                        $lte: parseInt(date_fin)
                    },
                    visible: true
                }
              }
        ]
        return await Pedido.aggregate(pipeline);
    } catch (error) {
        console.log(error)
        return null
    }
}

async function updatePedidoAction(id, updatePedido){
    try{
        await Pedido.findOneAndUpdate({_id: id}, updatePedido)
        return true
    } catch(error){
        console.log(error)
        return false
    }
}

async function getOnePedido(id){
    try{
        return await Pedido.findById(id)
    } catch(error){
        console.log(error)
        return false
    }
}

 module.exports = {
    createPedidoAction,
    searchPedidosAction,
    searchPedidofilteredAction,
    updatePedidoAction,
    getOnePedido
}