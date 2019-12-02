const mongoose = require('mongoose')
const Schema = mongoose.Schema

const taskSchema = new Schema({
    titulo: { type: String, required: true },
    subtitulo: { type: String },
    descricao: { type: String, require: true },
    user:{type:Schema.Types.ObjectId,required:true, ref:'User'}
})

module.exports = mongoose.model('Task', taskSchema)
