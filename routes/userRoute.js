const express = require("express")
const userRouter =  express.Router()
const bcrypt = require("bcrypt");
const UserModel = require("../models/userModel");
const registerVal = require("../middleware/registerMid");
const jwt = require("jsonwebtoken")
require("dotenv").config()



userRouter.post("/register",registerVal,async(req,res)=>{
    const {password} = req.body;
    try {
        const newPassword = await bcrypt.hash(password,10)
        const user = await UserModel.create({...req.body,password:newPassword})
        res.status(200).send({"msg":"User registered successfully",user})
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.post("/login",async(req,res)=>{
    const {email,password} = req.body;
    try {
        const user = await UserModel.findOne({email})
        if(!user){
            res.status(400).send({"msg":"Invalid Credentials!"})
        }
        const comparePassword = await bcrypt.compare(password,user.password)
        if(!comparePassword){
            res.status(400).send({"msg":"Invalid Credentials!"})
        }else{
            const token = jwt.sign({userId:user._id,username:user.username},process.env.secretKey,{expiresIn:"1d"});
            res.status(200).send({"msg":"User LoggedIn Successfully",token,name:user.username})
        }
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

userRouter.get("/",async(req,res)=>{
    try {
        const users = await UserModel.find()
        res.status(200).send(users)
    } catch (error) {
        res.status(400).send({"msg":error.message})
    }
})

module.exports = userRouter;