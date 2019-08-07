const express=require('express')
const app=express()
const mongoose=require('mongoose')

mongoose.connect("mongodb://127.0.0.1:27017/assignment",{ useNewUrlParser: true },(err)=>{
    if (err) {
        console.log("Error connect to mongoose ", err)
    } else {
        console.log("mongoose connected to server db  27017 ")
    }
})

const cors=require('cors')
const index=require("./routes/index")
app.use(cors())
app.use('/',index)


const PORT=process.env.PORT||5000
app.listen(PORT,()=>{console.log(`server listen on port ${PORT}`)})