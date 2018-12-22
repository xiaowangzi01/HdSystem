const mongoose = require("../db/conn");

const UserModel = mongoose.model("user",({name:String,password:String}));
//查找用户是否存在
var findUser = (userInfo,callback)=>{
    UserModel.find(userInfo).then((data)=>{
        callback(data);
    })
}
//注册
var register = (userInfo,callback)=>{
    new UserModel(userInfo).save().then(()=>{
        callback();
    })
}

module.exports={
    findUser,
    register
}