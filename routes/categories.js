var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/addcategories',upload.single("icon"),function(req,res){

    pool.query("insert into categories (categoryname,icon) values (?,?)",[req.body.categoryname,req.filename],function(error,result){
        console.log('Query',req.body)
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {  console.log(result)
           res.status(200).json({result:true,msg:"Record Submitted"})
        }
    })
})




module.exports = router;
