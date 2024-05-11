const express = require('express');
const cors = require('cors');
const mongoose = require('mongoose');
const app = express();
const {createUser, getAllUsers, login, getOneUser, updateUser, deleteUser} = require("./controllers/user.controller.js") 
const {searchBooks, createBook, searchOneBook, searchFilteredBook, updateBook, deleteBook} = require("./controllers/libro.controller.js")
const {createPedido, searchPedidos, searchPedidosFiltered, updatePedido, deletePedido} = require("./controllers/pedido.controller.js")

mongoose.connect(
    "mongodb+srv://admin:AOeq9P6spTZha4nn@cluster0.enxvygh.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
).then(() => console.log("conexión lograda")
).catch((err) => {
    console.log('There was an error with connection!');
    console.log(err);
    }
);

app.use(cors());
app.use(express.json());

app.get("/", (req,res) => {
    res.status(200).json({});
})

app.post("/create_user", createUser)

app.get("/get_all_users", getAllUsers)

app.get("/get_one_users", getOneUser)

app.post("/login", login)

app.patch("/update_user", updateUser)

app.patch("/delete_user", deleteUser)

app.post("/create_book", createBook)

app.get("/get_all_books", searchBooks)

app.get("/get_one_book", searchOneBook)

app.get("/get_filtered_book", searchFilteredBook)

app.post("/create_pedido", createPedido)

app.get("/get_all_pedidos", searchPedidos)

app.get("/get_filtered_pedidos", searchPedidosFiltered)

app.patch("/update_book", updateBook)

app.patch("/delete_book", deleteBook)

app.patch("/update_pedido", updatePedido)

app.patch("/delete_pedido", deletePedido)

try {
    app.listen(8080);    
} catch (error) {
    console.log(error)
}
