const {getAllUsersAction, getUserAction, getUserIdAction, createUserAction, updateUserAction} = require("../actions/user.actions")
const argon2 = require('argon2');
const jwt = require('jsonwebtoken');

// Function to generate JWT
function generateAccessToken(id) {
  const payload = {
    id: id,
  };
  
  const secret = '7lw8mhq0860nk1g06wczbn5w0';
  const options = { expiresIn: '24h' };

  return jwt.sign(payload, secret, options);
}

function verifyAccessToken(token) {
  const secret = '7lw8mhq0860nk1g06wczbn5w0';

  try {
    const decoded = jwt.verify(token, secret);
    return { success: true, data: decoded };
  } catch (error) {
    return { success: false, error: error.message };
  }
}

// Controller to handle creating a new user
async function createUser (req, res) {
    try {
      const { nombre, apellido, usuario, contrasena } = req.body;
      const hashedPassword = await argon2.hash(contrasena);
      user = createUserAction(nombre, apellido, usuario, hashedPassword)
      res.status(201).json(generateAccessToken(usuario));
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  };

async function login(req, res){
  try {
    const { usuario, contrasena } = req.body
    const foundUser = await getUserAction(usuario)
    if (foundUser !== null){
      if (await argon2.verify(foundUser[0].contrasena, contrasena)){
        res.status(201).json(generateAccessToken(usuario))
      }
      else{
        res.status(401).json({ message: "No autorizado" })
      }
    }
  } catch(error){
    res.status(401).json({ message: "Unauthorized"} )
  }
}

async function getAllUsers(req, res) {
    try {
      const {jwt} = req.headers
      const {success} = verifyAccessToken(jwt)
      if(success){
        users = await getAllUsers()
        for (let i = 0; i < users.length; i++) {
          users[i] = {
            "nombre": users[i].nombre,
            "apellido": users[i].apellido,
            "usuario": users[i].usuario
          }
        }
        res.status(200).json(users);
      } else {
        res.status(401).json({message: "No autorizado"});
      }
    } catch (error) {
      res.status(500).json({ message: error.message });
    }
  }

async function getOneUser(req, res){
  try {
    const {jwt} = req.headers
    const {success} = verifyAccessToken(jwt)
    const {username} = req.query
    console.log(username)
    if(success){
      users = await getUser(username)
      console.log(users)
      for (let i = 0; i < users.length; i++) {
        users[i] = {
          "nombre": users[i].nombre,
          "apellido": users[i].apellido,
          "usuario": users[i].usuario
        }
      }
      res.status(200).json(users);
    } else {
      res.status(401).json({message: "No autorizado"});
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function updateUser(req, res){
  try {
    const {jwt} = req.headers
    const {success, data} = verifyAccessToken(jwt)

    if(success){
      if (req.body.contrasena){
        const hashedPassword = await argon2.hash(req.body.contrasena)
        req.body.contrasena = hashedPassword
      }
      if (req.body.visible){
        if(req.body.visible === "false"){
          req.body.visible = false
        } else {
          if(req.body.visible === "true"){
            req.body.visible = true
          } else {
            delete req.body.visible
          }
        }
      }
      
      const updatedUser = await updateUserAction(req.body, data.id)
      
      if(updatedUser){
        res.status(201).json({message: "Updated correctly"});
      } else {
        res.status(501).json({message: "Something went wrong"});
      }
    } else {
      res.status(401).json({message: "Not authorized"})
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

async function deleteUser(req, res){
  try {
    const {jwt} = req.headers
    const {success} = verifyAccessToken(jwt)
    const {username} = req.query
    if(success){
      const propperty = {visible: false}
      const updatedUser = await updateUserAction(propperty, username)
      
      if(updatedUser){
        res.status(201).json({message: "Deleted correctly"});
      } else {
        res.status(501).json({message: "Something went wrong"});
      }
    } else {
      res.status(401).json({message: "Not authorized"})
    }
  } catch (error) {
    res.status(500).json({ message: error.message });
  }
}

module.exports = {
    createUser,
    getAllUsers,
    login,
    getOneUser,
    updateUser,
    verifyAccessToken,
    deleteUser
}