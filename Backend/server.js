const express=require('express')
const app=express()
const cors=require('cors')
const index=require("./routes/index")
app.use(cors())
app.use('/',index)

const PORT=process.env.PORT||5000
app.listen(PORT,()=>{console.log(`server listen on port ${PORT}`)})