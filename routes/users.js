var express = require('express');
var router = express.Router();

var UserController = require("../controller/UserController");
/* GET users listing. */
router.get('/', function(req, res, next) {
  res.send('respond with a resource');
});

router.post("/register",UserController.register);
router.post("/findregister",UserController.findUser);
router.post("/login",UserController.login)
router.post("/quit",UserController.quit)
module.exports = router;
