const {verifyAccessToken} = require('../controllers/user.controller.js')
const {updateBookAction, createBookAction, searchBooksAction, searchOneBookAction, searchBookfilteredAction} = require("../actions/books.actions.js")

async function createBook(req, res) {
  try{
    try {
      const { titulo, autor, publicacion, genero, precio, editorial } = req.body;
      const {jwt} = req.headers
      const {success, data} = verifyAccessToken(jwt)
      if(success){
        book = createBookAction(titulo, publicacion, autor, genero, precio, data.id, editorial)
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

async function searchBooks(req, res){
  try{
    bookList = await searchBooksAction()
    res.status(200).json(bookList)
  } catch(error){
    res.status(501).json({message: "Internal Error"})
  }
}

async function searchFilteredBook(req, res){
  try{
    const {jwt} = req.headers
    const {success} = verifyAccessToken(jwt)
    const {genero, year, editorial, autor, titulo} = req.query
    if(success){
      foundBook = await searchBookfilteredAction(genero, year, editorial, autor, titulo)
      res.status(201).json(foundBook)
    } else {
      res.status(401).json({message: "Unauthorized"})
    }
  } catch(error){
    res.status(501).json({message: "Internal Error"})
  }
}

async function searchOneBook(req, res){
  try{
    const {jwt} = req.headers
    const {success} = verifyAccessToken(jwt)
    const {titulo} = req.query
    if(success){
      foundBook = await searchOneBookAction(titulo)
      console.log(foundBook)
      res.status(201).json(foundBook)
    } else {
      res.status(401).json({message: "Unauthorized"})
    }
  } catch(error){
    res.status(501).json({message: "Internal Error"})
  }
}

async function updateBook(req, res){
  try{
    const {jwt} = req.headers
    const {success, data} = verifyAccessToken(jwt)
    if(success){
      const bookToUpdate = req.body.bookToUpdate
      delete req.body.bookToUpdate

      if(req.body.precio){
        req.body.precio = parseInt(req.body.precio)
      }

      if(req.body.publicacion){
        req.body.publicacion = parseInt(req.body.publicacion)
      }

      foundBook = await updateBookAction(bookToUpdate, data.id, req.body)
      res.status(201).json({message: "Updated correctly"})
    } else {
      res.status(401).json({message: "Unauthorized"})
    }
  } catch(error){
    res.status(501).json({message: "Internal Error"})
  }
}

async function deleteBook(req, res){
  try{
    const {jwt} = req.headers
    const {success, data} = verifyAccessToken(jwt)
    const {titulo} = req.query
    if(success){
      const propperty = {visible: false}
      foundBook = await updateBookAction(titulo, data.id, propperty)
      res.status(201).json({message: "Deleted correctly"})
    } else {
      res.status(401).json({message: "Unauthorized"})
    }
  } catch(error){
    res.status(501).json({message: "Internal Error"})
  }
}

module.exports = {
    createBook,
    searchBooks,
    searchFilteredBook,
    searchOneBook,
    updateBook,
    deleteBook
}