const Task = require('../models/taskModel')
const TaskService = require('../service/task.service')
const jwt = require('../middleware/getToken')

//Controller para Create Tarefa, User ID = ID do usuário. JWT token do usuário, recebido ao logar.
const createControllerTask = async(req,res)=>{
    try{
        const token = jwt.decodeJWT(req.headers.authorization)
        console.log(token)
        const createTask = await TaskService.createTask(req.body.titulo, req.body.subtitulo, req.body.descricao, token._id)
        res.send({data:createTask.data, message:createTask.message}).status(createTask.status)
    }catch(error){
        console.log("Erro!")
        res.status(400).send(error.error)
    }
} 

module.exports = {
    createControllerTask,
}