// Import de todos os modulos utilizados.
const User = require("../models/userModel")
const passwordMiddleware = require('../middleware/passwordMiddleware')
const jwt = require('jsonwebtoken')
const constant = require('../constant/constant')

//Service para Criar novo Usuário, (if) Parametros que são obrigatórios, Hash para Password(PasswordMiddleware) 
const createUser = async (name, email, password)=>{
    try{
        if(!name || !email || !password){
            return Promise.reject({error:"Name, Password or Emails is required",status:400})
        }
        const hash = await passwordMiddleware.genHash(password)

         const user= await User.create({email:email,name:name,password:hash})

        return Promise.resolve({data:{name:user.name, email:user.email, password:user.password, id:user._id},message:"Sucess to Create User",status:200})
    }catch(error){
        return Promise.reject({error:error.toString(),status:400})
    }
}

//Service para logar o usuário, (if) Parametros obrigatórios, função compare Hash
const loginUser = async(email, password)=>{
    try{
        if(!email || !password){
            return Promisse.reject({error: "Email and Password is required"})
        }
        const user = await User.findOne({
            email:email
        })
        const compare = await passwordMiddleware.compareHash(password, user.password)
        if(compare == false){
            return Promise.reject({error:"Invalid Password", status:401})
        }
        const token = jwt.sign({name:user.name, email:user.email, _id:user._id}, constant.jwtSecret)
        console.log(token)
        return Promise.resolve({data:{token:token, message:"Sucess To Login"}, status:200})
    }catch(error){
        return Promise.reject({error:error.toString(), status:400})
    }
}

//Service para deletar Usuário por id
const deleteUser = async(id)=>{
    try{
        const deleteUser = await User.deleteOne({_id:id})
        return Promise.resolve({data:deleteUser, message:"User deleted", status:200})

    }catch(error){
        return Promise.reject({error:error.toString(), status:400})
    }
}

//Service para consultar todos os usuários cadastrados no BD, (name:1) trás apenas nome.
const getUsers = async () =>{
    try{
        const getUsers = await User.find({}, {name:1})
        return Promise.resolve({data:getUsers, message:"Aqui está todos os usuários"})
    }catch(error){
        return Promise.reject({error:error.toString(), status:400})
    }
}

//Service para buscar usuário pelo e-mail, trás apenas os nomes. Find parametro email.
const getUserEmail = async(email)=>{
    try{
        const getUserEmail = await User.find({email:email}, {name:1})
        return Promise.resolve({data:getUserEmail, message:"Esse é o usuário", status:200})
    }catch(error){
        return Promise.reject({error:error.toString(), status:400})
    }
}

//Exportando funções para uso externo.
module.exports = {
    createUser,
    loginUser,
    deleteUser,
    getUsers,
    getUserEmail
}