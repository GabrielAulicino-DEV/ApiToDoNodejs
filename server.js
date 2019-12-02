//Import de todos os módulos utilizados e funções de outras pastas.
const express = require('express') 
const bodyParser = require('body-parser')
const jwt = require("express-jwt")
const mongodb = require("./database/index")
const constants = require("./constant/constant")
const UserController = require('./controller/user.controller')
const TaskController = require('./controller/task.controller')

const app = express()

app.use(bodyParser.urlencoded({ extended: true }))
app.use(bodyParser.json())

const port = process.env.PORT || 8001

app.get('/', (req, res) => {
    return res.send("hiii :D")
})

// //JWT utilizado para decodificar senha.
// app.use(jwt({ secret: constants.jwtSecret }).unless({ path: ["/user/create", '/user/login'] }))

//Rotas para Usuário, Create, Login, Delete, Get(Para todos usuários), GetAll(Para usuário por email)
app.post('/user/create', UserController.createControllerUser)
app.post('/user/login', UserController.loginControllerUser)
app.delete('/user/:id', UserController.deleteControllerUser)
app.get('/user/:email', UserController.getEmailControllerUser)
app.get('/users', UserController.getUsers)

//Rotas para Tarefas Criar, Editar, Deletar
app.post('/task/', TaskController.createControllerTask)






app.listen(port, () => {
    console.log(`Listening port ${port}`)
    mongodb()
})