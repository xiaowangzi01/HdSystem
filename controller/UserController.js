const UserModel = require("../model/UserModel");

const crypto = require('crypto');
const jwt =require("jsonwebtoken");
//注册
var register = (req,res)=>{
    const hash = crypto.createHmac('sha256', req.body.password)
                   .update('I love cupcakes')
                   .digest('hex');
    UserModel.register({name:req.body.name,password:hash},()=>{
        res.json({
            ret:true,
            data:true
        })
    })
}
//登陆
var login= (req,res)=>{
    let{name,password} = req.body;
    const hash = crypto.createHmac('sha256', password)
                   .update('I love cupcakes')
                   .digest('hex');
    UserModel.findUser({name,password:hash},(data)=>{
        if(data.length>0){
            //设置令牌
            var token = jwt.sign({name,time:new Date().getTime()},"haha",{expiresIn:1000});
            //设置cookie
            res.cookie("token",token)
            res.json({
                ret:true,
                data:true
            })
        }else{
            res.json({
                ret:true,
                data:false
            })
        }
    })
}
//判断用户名是否存在
var findUser = (req,res)=>{
    let{name} = req.body;
    UserModel.findUser({name},(data)=>{
        if(data.length>0){
            res.json({
                ret:true,
                data:true
            })
        }else{
            res.json({
                ret:true,
                data:false
            })
        }
    })
}
//退出
var quit = (req,res)=>{
    if(req.cookies.token){
        res.cookie("token","");
        res.json({
            ret:true,
            data:{
                logout:true
            }
        })
    }
}
module.exports ={
    register,
    login,
    findUser,
    quit
}