var express = require('express');
var router = express.Router();
var pool = require('./pool')
var upload = require('./multer')


router.post('/fetchallbrands', function (req, res) {

    pool.query("select * from brands where subcategoryid = ?", [req.body.subcategoryid], function (error, result) {

        if (error) {
            console.log(error)
            res.status(500).json({ result: [] })
        }
        else {
            console.log(result)
            res.status(200).json({ result: result })
        }
    })
})

router.post('/addproducts', upload.single("icon"), function (req, res) {

    pool.query("insert into products (categoryid, subcategoryid,brandid,productname, description,price,offerprice,offertype,stock,status,salesstatus,rating, icon) values (?,?,?,?,?,?,?,?,?,?,?,?,?)", [req.body.categoryid, req.body.subcategoryid,req.body.brand,req.body.productname, req.body.description,req.body.price,req.body.offerprice,req.body.offertype,req.body.stock,req.body.status,req.body.salesstatus,req.body.rating, req.filename], function (error, result) {

        console.log('Query', req.body)

        if (error) {
            console.log(error)
            res.status(500).json({ result: false, msg: "Server Error" })
        }
        else {
            console.log(result)
            res.status(200).json({ result: true, msg: "Record Submitted" })
        }
    })
})

router.get('/displayallproducts',function(req, res, next) {

    pool.query("select P.* ,(select C.categoryname from categories C where C.categoryid=P.categoryid) as categoryname,(select SC.subcategoryname from subcategories SC where SC.subcategoryid=P.subcategoryid) as subcategoryname,(select B.brandname from brands B where B.brandid=P.brandid) as brandname from products P",function(error,result){
     
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








module.exports = router;