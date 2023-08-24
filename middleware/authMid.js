const jwt = require("jsonwebtoken")
const authMid = async(req,res,next) => {
    const {email,password} = req.body;
    const token = req.headers.authorization?.split(" ")[1]
    
    if(!token){
        res.status(400).send({"msg":"Access Token Not Found!"})
    }else{
        jwt.verify(token,process.env.secretKey,async(err,decoded)=>{
            if(err){
                res.staus(400).send({"msg":err.message})
            }else{
                req.userId = decoded.userId
                req.username = decoded.username
                next()
            }
        })
    }



}

module.exports = authMid;