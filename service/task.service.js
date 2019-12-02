const Task = require("../models/taskModel")
const passwordMiddleware = require('../middleware/passwordMiddleware')
const jwt = require('jsonwebtoken')
const constant = require('../constant/constant')

//Service para Criar nova Tarefa
const createTask = async (titulo, subtitulo, descricao, id) => {
    try {
        if (!titulo || !subtitulo || !descricao) {
            return Promise.reject({ error: "Titulo e Descrição são obrigatórios!" })
        }
        const task = await Task.create({ titulo: titulo, subtitulo: subtitulo, descricao: descricao, user: id })
        return Promise.resolve({ data: { titulo: task.titulo, subtitulo: task.subtitulo, descricao: task.descricao }, message: "Sucess to Create Task", status: 200 })
    }catch(error){
        return Promise.reject({error: error.toString(), status:400})
    }
}

module.exports = {
    createTask,
}