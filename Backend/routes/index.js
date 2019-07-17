const express=require('express')
const router=express.Router()
const multer=require('multer')
var async = require("async");
var fs = require('fs');

var storage = multer.diskStorage({
    destination: function (req, file, cb) {
      cb(null, 'public/files')
    },
    filename: function (req, file, cb) {
      cb(null, file.fieldname + '-' + Date.now())
    }
  })
   
  var upload = multer({ storage: storage })

router.post('/fileUpload',upload.single('thermometer'),(req,res,next)=>{
    const file = req.file
    if (!file) {
      const error = new Error('Please upload a file')
      error.httpStatusCode = 400
      return next(error)
    }
      res.send({msg:'File Upload Successfully'})
})


router.get('/chart',(req,res,next)=>{
  var obj;
fs.readFile('THERM0001.json', 'utf8', function (err, data) {
  if (err) throw err;
  obj = JSON.parse(data);
  var monthRecord=[{month:'Jan',value:0,count:0},{month:'Feb',value:0,count:0},{month:'Mar',value:0,count:0},
  {month:'Apr',value:0,count:0},{month:'May',value:0,count:0},{month:'Jun',value:0,count:0},
  {month:'July',value:0,count:0},{month:'Aug',value:0,count:0},{month:'Sep',value:0,count:0},
  {month:'Oct',value:0,count:0},{month:'Nov',value:0,count:0},{month:'Dec',value:0,count:0}]
  async.eachSeries(obj,(value,call)=>{
    
    var now =new Date(value.ts)
    if (now.getMonth() == 11) {
      var current = new Date(now.getFullYear() + 1, 0, 1);
  } else {
      var current = new Date(now.getFullYear(), now.getMonth() + 1, 1);
  }
  if(current.getMonth()==1){
    call(true)
  }
  if(current.getMonth()==0){
    monthRecord[11].value += value.val; 
    monthRecord[11].count++
  }else{
    monthRecord[current.getMonth()-1].value += value.val; 
    monthRecord[current.getMonth()-1].count++
  }
    call()
  })
  monthRecord.splice(0,1)
  res.send({data:monthRecord})
  
  
});
})


module.exports=router