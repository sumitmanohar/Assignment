const express=require('express')
const router=express.Router()
const multer=require('multer')
var async = require("async");
var fs = require('fs');
const path = require("path");
const tempreatureModel=require('./tempreatureModel')


var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      var dir = 'public/files';
      if (!fs.existsSync(dir))
          fs.mkdirSync(dir);
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now() + '.' + file.originalname.split('.')[file.originalname.split('.').length - 1])
    }
  })
   
  var upload = multer({ 
    storage: storage,
    fileFilter: function (req, file, callback) {
      if (['json'].indexOf(file.originalname.split('.')[file.originalname.split('.').length - 1]) === -1) {
          return callback(new Error('Wrong extension type'));
      }
      callback(null, true);
  }
 }).single('thermometer')

router.post('/fileUpload',(req,res,next)=>{

    upload(req,res,(err)=>{
      if (err) {
        res.json({
            error_code: 1,
            err_desc: err
        });
        return;
    }
    if (!req.file) {
        res.json({
            error_code: 1,
            err_desc: "No file passed"
        });
        return;
    }   

    fs.readFile(path.resolve(__dirname,`../${req.file.path}`),'utf8',(err,data)=>{
      if (err) throw err;
      var result=JSON.parse(data)
      console.log(result.length)
      if(result.length>0){
        async.eachSeries(result,(value,call)=>{
        if(value.ts && value.val){
          let data=new tempreatureModel({
            ts:value.ts,
            val:value.val
          })
          data.save((err,savedata)=>{
            if(err){
              console.log(err.code,err)
              if(err.code===11000){
                if((err.errmsg).indexOf('ts_1')!=-1){
                  call("record already present")
                }
              }
            }else{
              console.log("saved ....")
              call()
            }

          })
        }else{
          call("please enter the correct value")
        }
        })
      }
    })

    })
    // if (!file) {
    //   const error = new Error('Please upload a file')
    //   error.httpStatusCode = 400
    //   return next(error)
    // }
    //   res.send({msg:'File Upload Successfully'})
})


router.get('/chart',(req,res,next)=>{

tempreatureModel.aggregate([{
  $group:{
  _id:{month:{$month:'$ts'},year:{$year:'$ts'}},
   volume:{$sum:"$val"},
   count:{$sum:1}
}
},
{
  $project:{
    meanValue:{$divide:["$volume","$count"]}
  }
}
],(err,result)=>{
  if (err) { res.json(500, err); }
  res.send(result)
})









//   var obj;

// fs.readFile('THERM0001.json', 'utf8', function (err, data) {
//   if (err) throw err;
//   obj = JSON.parse(data);
//   var monthRecord=[{month:'Jan',value:0,count:0},{month:'Feb',value:0,count:0},{month:'Mar',value:0,count:0},
//   {month:'Apr',value:0,count:0},{month:'May',value:0,count:0},{month:'Jun',value:0,count:0},
//   {month:'July',value:0,count:0},{month:'Aug',value:0,count:0},{month:'Sep',value:0,count:0},
//   {month:'Oct',value:0,count:0},{month:'Nov',value:0,count:0},{month:'Dec',value:0,count:0}]
//   async.eachSeries(obj,(value,call)=>{
    
//     var now =new Date(value.ts)
//     if (now.getMonth() == 11) {
//       var current = new Date(now.getFullYear() + 1, 0, 1);
//   } else {
//       var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
//   }
//   if(current.getMonth()==1){
//     call(true)
//   }
//   if(current.getMonth()==0){
//     monthRecord[11].value += value.val; 
//     monthRecord[11].count++
//   }else{
//     monthRecord[current.getMonth()-1].value += value.val; 
//     monthRecord[current.getMonth()-1].count++
//   }
//     call()
//   })
//   monthRecord.splice(0,1)
//   res.send({data:monthRecord})
  
  
// });
})


module.exports=router