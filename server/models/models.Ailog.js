
const mongoose=require('mongoose')


const ailogScheme=new mongoose.Schema({
    product:{
  type: mongoose.Schema.Types.ObjectId,
  ref: "Product",
  required: true
},
    prompt:{type:String,required:true},
    result:{type:Object},
    createdTime:{type:Date,default:Date.now}   
})

const ailogmodel=mongoose.model("aiLogs",ailogScheme)

module.exports=ailogmodel