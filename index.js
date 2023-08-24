const express = require("express")
const app =  express()
require("dotenv").config()
const cors = require("cors")
const connection = require("./db")
const userRouter = require("./routes/userRoute")
const postRouter = require("./routes/postRoute")

app.use(express.json())
app.use(cors())
app.use("/users",userRouter)
app.use("/posts",postRouter)

app.get("/",(req,res)=>{
    res.status(200).send("Welcome To Home Page")
})

app.listen(process.env.PORT || 5000 , async()=>{
    try {
        await connection;
        console.log("Connected to DB")
    } catch (error) {
        console.log(error)
    }
    console.log(`Server is listening on Port ${process.env.PORT}`)
})



