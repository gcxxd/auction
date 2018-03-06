var express = require('express');
var data = require('../mock.json');
var router = express.Router();

var products = data.product;
var comments =data.comments;
/* GET home page. */
router.get('/', function(req, res, next) {
  let result = products;
  let params = req.query;
  if(params.title){
    console.log('1')
    result=result.filter((p)=>p.title.indexOf(params.title)!==-1);
  }
  if(params.price && result.length>0){
    console.log('12')
    result=result.filter((p)=>p.price<=parseInt(params.price));
  }
  /*if(params.category!=-1 && result.length>0){
    console.log('13')
    result=result.filter((p)=>p.categories.indexOf(params.category)!==-1);
  }*/

  
  res.json(result);
});
router.get('/:id', function(req, res, next) {
  let productId=req.params.id;
  let arr=[];
  for(key in products){
    console.log(key);
    if(products[key].id == productId){
      res.json(products[key]);
    }
  };
  
});
router.get('/:id/comments',function(req,res,next){
  let productId=req.params.id;
  let arr=[];
  for(key in comments){
    console.log(key);
    if(comments[key].productId == productId){
      arr.push(comments[key]);
    }
  }
  res.json(arr);
});
module.exports = router;
