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

router.get('/displayallcategories',function(req,res){

    pool.query("select * from categories",function(error,result){
        
        if(error)
        {  console.log(error)
           res.status(500).json({result:[]})
        }
        else
        {  console.log(result)
           res.status(200).json({result:result})
        }
    })
})
router.post('/editcategoryicon',upload.single("icon"),function(req,res){
    
    pool.query("update categories set icon=? where categoryid=?",[req.filename,req.body.categoryid],function(error,result){
       
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {
           res.status(200).json({result:true,msg:"Record Edited"})
        }
    })  
})

router.post('/editcategory',function(req,res){
    
    pool.query("update categories set categoryname=? where categoryid=?",[req.body.categoryname,req.body.categoryid],function(error,result){
       
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {
           res.status(200).json({result:true,msg:"Record Edited"})
        }
    })  
})


router.post('/deletecategory',function(req,res){
    pool.query("delete from categories where categoryid=?",[req.body.categoryid],function(error,result){
        
        if(error)
        {  console.log(error)
           res.status(500).json({result:false,msg:"Server Error"})
        }
        else
        {
           res.status(200).json({result:true,msg:"Deleted"})
        }
    })
})







module.exports = router;
