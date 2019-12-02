const UserService = require('../service/user.service')
const jwt = require('../middleware/getToken')

//Controller de Criação do Usuário, não utiliza jwt para criação
const createControllerUser = async (req,res) =>{
    try{
        const createService = await UserService.createUser(req.body.name, req.body.password, req.body.email)
        res.send({data:createService.data, message:createService.message}).status(createService.status)
    
    }catch(error){
        res.status(400).send(error.error)
    }
}

//Controller para Login do Usuário, somente email e password necessários.
const loginControllerUser = async(req,res)=>{
    try{
        const loginService = await UserService.loginUser(req.body.email, req.body.password)
        res.send({data:loginService.data, message:loginService.message}).status(loginService.status)
    }catch(error){
        res.status(400).send(error.error)
    }
}

//Controller para deletar Usuario pelo ID do mesmo.
const deleteControllerUser = async(req,res)=>{
    try{
        const deleteService = await UserService.deleteUser(req.params.id)
        res.send({data:deleteService.data, message:deleteService.message}).status(deleteService.status)
    }catch(error){
        res.status(400).send(error.error)
    }
}

//Controller para buscar Usuário pelo EMAIL do mesmo

const getEmailControllerUser = async(req,res)=>{
    try{
        const getService = await UserService.getUserEmail(req.params.email)
        res.send({data:getService.data, message:getService.message}).status(getService.status)
    }catch(error){
        res.status(400).send(error.error)
    }
}

//Controller para buscar todos os usuários.

const getUsers = async(req, res)=>{
    try{
        const getUsers = await UserService.getUsers()
        res.send({data: getUsers.data, message: getUsers.message}).status(getUsers.status)
    }
    catch(error){
        return Promise.reject({ error: error.toString(), status:400})
    }
}



module.exports = {
    createControllerUser,
    loginControllerUser,
    deleteControllerUser,
    getEmailControllerUser,
    getUsers,
    
}