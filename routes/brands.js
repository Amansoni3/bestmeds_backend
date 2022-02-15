var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.post('/addbrands',upload.single("icon"),function(req,res){

    pool.query("insert into brands (categoryid, subcategoryid, brandname,status, icon) values (?,?,?,?,?)",[req.body.categoryid,req.body.subcategoryid,req.body.brandname,req.body.status,req.filename],function(error,result){
        
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

router.get('/displayallbrands',function(req, res, next) {
    pool.query("select B.*,(select C.categoryname from categories C where C.categoryid=B.categoryid) as categoryname,(select SC.subcategoryname from subcategories SC where SC.categoryid=B.categoryid) as subcategoryname  from brands B",function(error,result){
      if(error)
      {   console.log(error)
          res.status(500).json({result:[]})
      }
      else
      {
        res.status(200).json({result:result})
      }
  })
  });

  router.post('/editbrandicon',upload.single("icon"),function(req,res){
    
    pool.query("update brands set icon=? where brandid=?",[req.filename,req.body.brandid],function(error,result){
       
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

router.post('/editbrand',function(req,res){
    
  pool.query("update brands set categoryid = ? , subcategoryid = ?, brandname = ?, status = ? where brandid=?",[req.body.categoryid,req.body.subcategoryid,req.body.brandname,req.body.status,req.body.brandid],function(error,result){
     
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

router.post('/deletebrands',function(req,res){

  pool.query("delete from brands where brandid=?",[req.body.brandid],function(error,result){
      
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