const UserModel = require("../models/userModel");

const registerVal = async(req,res,next) => {
    const {email,password} = req.body;

    if(password.length < 8){
        return res.status(400).send({"msg":"Password must be of minimum 8 characters!"})
    }

    if(!/\d/.test(password)){
        return res.status(400).send({"msg":"Password must contain at least one number!"})
    }

    if(!/[!@#$%^&*]/.test(password)){
        return res.status(400).send({"msg":"Password must contain a special character!"})
    }

    if(!/[A-Z]/.test(password)){
        return res.status(400).send({"msg":"Password must contain an uppercase character!"})
    }

    const existUser = await UserModel.findOne({email})
    if(existUser){
        return res.status(400).send({"msg":"User Already Exists!"})
    }
    
    next()
}

module.exports = registerVal;