const mongoose = require("../db/conn");

const CatModel = mongoose.model("Cat",({name:String,age:String}));

var dataList = (callback)=>{
    CatModel.find().then((data)=>{
        callback(data);
    })
}
var pageContent=(page,pageSize,callback)=>{
    CatModel.find().limit(Number(pageSize)).skip((page-1)*pageSize).then((data)=>{
        callback(data)
    })
}
var add = (name,age,callback)=>{
    new CatModel({name:name,age:age}).save().then(()=>{
        callback();
    })
} 
var del = (id,callback)=>{
    CatModel.remove({_id:id}).then(()=>{
        callback();
    })
}
var modify = (id,callback)=>{
    CatModel.find({_id:id}).then((data)=>{
        callback(data)
    })
}
var modifyOk = (id,name,age,callback)=>{
    CatModel.update({_id:id},{$set:{name:name,age:age}}).then(()=>{
        callback();
    })
}
var query = (kw,callback)=>{
    CatModel.find({name:new RegExp(kw)}).then((data)=>{
        callback(data)
    })
}
module.exports ={
    CatModel,
    dataList,
    pageContent,
    add,
    del,
    modify,
    modifyOk,
    query
}