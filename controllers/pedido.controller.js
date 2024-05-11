const {verifyAccessToken} = require('../controllers/user.controller.js')
const {searchBookfilteredAction} = require('../actions/books.actions.js')
const {updatePedidoAction, getOnePedido, createPedidoAction, searchPedidosAction, searchPedidofilteredAction} = require('../actions/pedidos.actions.js')

async function createPedido(req, res) {
    try{
      try {
        const { comprador, libros } = req.body;
        const {jwt} = req.headers
        const {success, data} = verifyAccessToken(jwt)
        if(success){
            const bookList = []
            let total = 0
            array = libros.split(",")
            for (let i = 0; i < array.length; i++) {
                const book = await searchBookfilteredAction(null, null, null, null, array[i], data.id)
                bookList[i] = book[0]
                console.log(book[0])
                total += book[0].precio
            }
            book = createPedidoAction(data.id, comprador, bookList, total)
            if(book){
                res.status(201).json({message: "Succesfuly created"});
            }
            res.status(501).json({message: "Error creating book"})
        } else {
          res.status(401).json({message: "No autorizado"});
        }
      } catch (error) {
        res.status(500).json({ message: error.message });
      }
    } catch (error){
  
    }
  }

async function searchPedidos(req, res){
    try{
        const {jwt} = req.headers
        const {success, data} = verifyAccessToken(jwt)
        if(success){
            bookList = await searchPedidosAction(data.id)
            res.status(200).json(bookList)
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    } catch(error){
      res.status(501).json({message: "Internal Error"})
    }
  }

async function searchPedidosFiltered(req, res){
    try{
        const {jwt} = req.headers
        const {success, data} = verifyAccessToken(jwt)
        const {date_init, date_fin, state} = req.query
        if(success){
            bookList = await searchPedidofilteredAction(data.id, date_init, date_fin, state)
            res.status(200).json(bookList)
        } else {
            res.status(401).json({message: "Unauthorized"})
        }
    } catch(error){
      res.status(501).json({message: "Internal Error"})
    }
  }

async function updatePedido(req, res){
    try{
      const {jwt} = req.headers
      const {success, data} = verifyAccessToken(jwt)
      const {id} = req.body
      if(success){
        const pedido = await getOnePedido(id)
        if(data.id === pedido.vendedor){
          const propperty = {estado: "cancelado"}
          foundpedido = await updatePedidoAction(id, propperty)
          res.status(201).json({message: "Cancelled correctly"})
        } else if(data.id === pedido.comprador){
          const propperty = {estado: "completado"}
          foundpedido = await updatePedidoAction(id, propperty)
          res.status(201).json({message: "Completed correctly"})
        } else{
          res.status(401).json({message: "Unauthorized"})
        }
      } else {
        res.status(401).json({message: "Unauthorized"})
      }
    } catch(error){
      res.status(501).json({message: "Internal Error"})
    }
  }

async function deletePedido(req, res){
    try{
      const {jwt} = req.headers
      const {success} = verifyAccessToken(jwt)
      const {id} = req.body
      if(success){
        const propperty = {visible: false}
        foundpedido = await updatePedidoAction(id, propperty)
        res.status(201).json({message: "Deleted correctly"})
      } else {
        res.status(401).json({message: "Unauthorized"})
      }
    } catch(error){
      res.status(501).json({message: "Internal Error"})
    }
  }

module.exports = {
    createPedido,
    searchPedidos,
    searchPedidosFiltered,
    updatePedido,
    deletePedido
}