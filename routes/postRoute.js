const express = require("express");
const authMid = require("../middleware/authMid");
const BlogModel = require("../models/blogModel");
const postRouter =  express.Router()

postRouter.get("/blogs",async(req,res)=>{

    const {q} = req.query;

    try {
        if(q){
            const blogs = await BlogModel.find({title : { $regex : q , $options : "i" }})
            res.status(200).send(blogs)
        }else{
            const blogs = await BlogModel.find(req.query)
            res.status(200).send(blogs)
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

postRouter.get("/blogs",async(req,res)=>{
    const {title,category} = req.query;
    try {

 
     const blogs = await BlogModel.find({ title,category })
     res.status(200).send(blogs)
    } catch (error) {
     res.status(400).send({"msg":error.message})
    }
 })

postRouter.get("/blogs",authMid,async(req,res)=>{
   const {sort,order} = req.query;
   try {
    let sortField = sort;
    let sortorder = 1;

    if(order == "desc"){
        sortorder = -1
    }

    const blogs = await BlogModel.find().sort({ [sortField] : sortorder });
    res.status(200).send(blogs)
   } catch (error) {
    res.status(400).send({"msg":error.message})
   }
})

postRouter.post("/blogs",authMid,async(req,res)=>{
   
    try {
     const blogs = await BlogModel.create({...req.body,creator:req.userId,username:req.username})
     res.status(200).send({"msg":"Blog Posted Successfully",blogs})
    } catch (error) {
     res.status(400).send({"msg":error.message})
    }
 })

 postRouter.patch("/blogs/:id",authMid,async(req,res)=>{
   const id = req.params.id
    try {
    const blog = await BlogModel.findById(id)
    if(req.userId == blog.creator.toString()){
        const blogs = await BlogModel.findByIdAndUpdate({_id:id},req.body,{new:true})
        res.status(200).send({"msg":"Blog Updated Successfully",blogs})

    }else{
        res.status(400).send({"msg":"You are not allowed to update!"})
    }
    } catch (error) {
     res.status(400).send({"msg":error.message})
    }
 })
 
 postRouter.delete("/blogs/:id",authMid,async(req,res)=>{
    const id = req.params.id
     try {
     const blog = await BlogModel.findById(id)
     if(req.userId == blog.creator.toString()){
         const blogs = await BlogModel.findByIdAndDelete({_id:id})
         res.status(200).send({"msg":"Blog Deleted Successfully"})
 
     }else{
         res.status(400).send({"msg":"You are not allowed to delete!"})
     }
     } catch (error) {
      res.status(400).send({"msg":error.message})
     }
  })


module.exports = postRouter;
