const mongoose = require("mongoose")

const blogSchema = new mongoose.Schema({
    username : {type:String},
    title : {type:String, required : true},
    content : {type:String, required : true},
    creator : {type:mongoose.Schema.Types.ObjectId,ref:"user"},
    category : {type:String,enum:["Business", "Tech", "Lifestyle","Entertainment"], required:true},
    date:{type:Date,default:Date.now,required:true},
    likes : {type:[String],default:[]},
    comments : {type:[],default:[]}
})

const BlogModel = mongoose.model("blog",blogSchema)

module.exports = BlogModel;