const Libro = require("../models/libro")

async function createBookAction(titulo, publicacion, autor, genero, precio, dueno, editorial){
   try{ 
    const newUser = new Libro({ titulo, publicacion, autor, genero, precio, dueno, editorial });
    await newUser.save()
    return true
   } catch (error){
    console.log(error)
    return false
   }
}

async function searchBooksAction(){
    try {
        const pipeline = [
            {$match: {visible: true}}
        ]
        return await Libro.aggregate(pipeline);
    } catch (error) {
        return null
    }
}

async function searchOneBookAction(title){
    try {
        const pipeline = [
            {
                $match: {
                    titulo: title,
                    visible: true
                }
            }
        ]
        return await Libro.aggregate(pipeline);
    } catch (error) {
        return null
    }
}

async function searchBookfilteredAction(genre = null, year = null, editorial = null, author = null, title = null, dueno = null){
    try {
        const pipeline = [
            {
                $match: {
                    genero: genre !== null ? { $regex: genre, $options: 'i' } : { $exists: true },
                    titulo: title !== null ? { $regex: title, $options: 'i' } : { $exists: true },
                    publicacion: year !== null ? parseInt(year) : { $exists: true },
                    editorial: editorial !== null ? { $regex: editorial, $options: 'i' } : { $exists: true },
                    autor: author !== null ? { $regex: author, $options: 'i' } : { $exists: true },
                    dueno: dueno !== null ? { $regex: dueno, $options: 'i' } : { $exists: true },
                    visible: true
                }
            }
        ]
        return await Libro.aggregate(pipeline);
    } catch (error) {
        console.log(error)
        return null
    }
}

async function updateBookAction(title, owner, updatedBook){
    try{
        await Libro.findOneAndUpdate({titulo: title, dueno: owner}, updatedBook)
        return true
    } catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    createBookAction,
    searchBooksAction,
    searchOneBookAction,
    searchBookfilteredAction,
    updateBookAction
}