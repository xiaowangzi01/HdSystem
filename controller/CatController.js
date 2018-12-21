const CatModel = require("../model/CatModel");
const formidable = require('formidable');
const fs = require("fs")
//分页
var pageContent = (req,res)=>{
    CatModel.dataList((da)=>{
        CatModel.pageContent(req.params.page,req.params.pageSize,(data)=>{
        res.json({
            list:data,
            count:Math.ceil(da.length/req.params.pageSize)
        })
    })
    })
    
}
//添加
var add = (req,res)=>{
    CatModel.add(req.params.name,Number(req.params.age),()=>{
        res.json({
            ret:true,
            data:true
        })
    })
}
var del = (req,res)=>{
    CatModel.del(req.params.id,()=>{
        res.json({
            ret:true,
            data:true
        })
    })
}
//修改
var modify = (req,res)=>{
    CatModel.modify(req.params.id,(data)=>{
        res.json(data)
    })
}
var modifyOk = (req,res)=>{
    CatModel.modifyOk(req.params.id,req.params.name,Number(req.params.age),()=>{
        res.json({
            ret:true,
            data:true
        })
    })
}
var query = (req,res)=>{
    CatModel.query(req.params.kw,(data)=>{
        res.json({
            list:data
        })
    })
}
upload = (req,res)=>{
    var form = new formidable.IncomingForm();
    form.uploadDir = "./public/upload";
    form.parse(req,function(err,feilds,files){
       if(!files.wj) return;
        fs.rename(files.wj.path,"./public/upload/"+files.wj.name,()=>{
            console.log("upload success");
        })
        res.json({
            path:"/upload/"+files.wj.name
        })
    });
}
module.exports={
    CatModel,
    pageContent,
    add,
    del,
    modify,
    modifyOk,
    query,
    upload
}