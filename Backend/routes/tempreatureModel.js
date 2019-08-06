const mongoose=require('mongoose')
const Schema = mongoose.Schema;
const tempreature=new Schema({
    ts:{type:Date,
        unique:true,
        required:'Date/Time is required'},
    
    val:{type:Number,
        required:'Tempreature is required'}
},{
    timestamps: {
        createdAt: 'createdAt',
        lastUpdated: 'lastUpdated'
    }
})

module.exports=mongoose.model('tempreature',tempreature)