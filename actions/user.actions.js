const Usuario = require("../models/usuario")

async function getAllUsersAction() {
    try {
        return await Usuario.find();
    } catch (error) {
        return error
    }
}

async function getUserAction(username) {
    try {
        const pipeline = [
            {$match: {usuario: username}}
        ]
        return await Usuario.aggregate(pipeline);
    } catch (error) {
        return null
    }
}

async function getUserIdAction(username) {
    try {
        const pipeline = [
            {$match: {usuario: username}}
        ]
        return await Usuario.aggregate(pipeline);
    } catch (error) {
        return null
    }
}

async function createUserAction(nombre, apellido, usuario, contrasena){
    try{
        const newUser = new Usuario({ nombre, apellido, usuario, contrasena });
        await newUser.save()
        return true
    } catch(error){
        console.log(error)
        return false
    }
}

async function updateUserAction(updatedUser, usuarioToUpdate){
    try{
        const filter = {usuario : usuarioToUpdate}
        await Usuario.findOneAndUpdate(filter, updatedUser)
        return true
    } catch(error){
        console.log(error)
        return false
    }
}

module.exports = {
    getAllUsersAction,
    getUserAction,
    getUserIdAction,
    createUserAction,
    updateUserAction
}