var express = require('express');
var router = express.Router();
const CatController = require("../controller/CatController");
const jwt =require("jsonwebtoken");
/* GET home page. */
router.get('/', function(req, res, next) {
  res.render('index', { title: 'Express' });
});
router.use(function(req,res,next){
  if(req.url!=="/users/login"&&req.url!=="/users/register"&&req.url!=="/users/findregister"){
    //验证token
    jwt.verify(req.cookies.token,"haha",(err,decode)=>{
      if(!err){
        next();
      }else{
        res.json({
          msg:"read token fail"
        })
      }
    })
  }else{
    next();
  }
  
})
router.get("/page/:page/:pageSize",CatController.pageContent);
router.get("/add/:name/:age",CatController.add);
router.get("/del/:id",CatController.del);
router.get("/modifyItem/:id",CatController.modify);
router.get("/modifyok/:id/:name/:age",CatController.modifyOk);
router.get("/query/:kw",CatController.query)
router.post("/upload",CatController.upload)
module.exports = router;
