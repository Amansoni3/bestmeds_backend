var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')

router.get('/fetchallcategories',function(req,res){

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

router.get('/displayallsubcategories',function(req,res){

    pool.query("select S.*,(select C.categoryname from categories C where C.categoryid = S.categoryid) as categoryname from subcategories S",function(error,result){
        
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


router.post('/addsubcategories',upload.single("icon"),function(req,res){

    pool.query("insert into subcategories (categoryid, subcategoryname, description, icon) values (?,?,?,?)",[req.body.categoryid,req.body.subcategoryname,req.body.description,req.filename],function(error,result){
        
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

router.post('/editsubcategoryicon',upload.single("icon"),function(req,res){
    
    pool.query("update subcategories set icon=? where subcategoryid=?",[req.filename,req.body.subcategoryid],function(error,result){
       
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

router.post('/editsubcategory',function(req,res){
    
    pool.query("update subcategories set categoryid = ? , subcategoryname = ?, description = ? where subcategoryid=?",[req.body.categoryid,req.body.subcategoryname,req.body.description,req.body.subcategoryid],function(error,result){
       
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

router.post('/deletesubcategory',function(req,res){

    pool.query("delete from subcategories where subcategoryid=?",[req.body.subcategoryid],function(error,result){
        
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

router.post('/fetchallsubcategoriesbycategoryid',function(req,res){

    pool.query("select * from subcategories where categoryid = ?",[req.body.categoryid],function(error,result){
        
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







module.exports = router;