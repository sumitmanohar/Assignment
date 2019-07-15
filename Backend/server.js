const express=require('express')
const app=express()
const index=require("./routes/index")
app.use('/',index)

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{console.log(`server listen on port ${PORT}`)})