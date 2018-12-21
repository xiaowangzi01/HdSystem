const mongoose = require("../db/conn");

const UserModel = mongoose.model("user",({name:String,password:String}));

var findUser = (userInfo,callback)=>{
    UserModel.find(userInfo).then((data)=>{
        callback(data);
    })
}

var register = (userInfo,callback)=>{
    new UserModel(userInfo).save().then(()=>{
        callback();
    })
}

module.exports={
    findUser,
    register
}