var express = require("express"),app = express(),http = require('http'),io = require("socket.io");
var path = require("path");
app.set("views",path.join(__dirname,"views"));
app.set("view engine","ejs");
app.use(app.router);
app.use(express.static(path.join(__dirname,"public")));
var server = http.createServer(app);


app.get("/socket",function(req,res){
   /*  res.setHeader("Access-Control-Allow-Origin:*");
     res.setHeader("Access-Control-Allow-Methods:POST,GET");
     res.setHeader("Access-Control-Allow-Credentials:true"); */
     res.json(JSON.parse("{\"name:\":\"zengge\"}"));
})



//
var querystring = require("querystring");
var a = {name:"曾"};//会将特殊字符编码
console.log(querystring.stringify(a).length);
//一般存时间戳是排序的，利于其他语言转换x
//前端和黑客
/*
* 1,sql注入和xss注入
浏览器等待就没事做
//所谓异步就是浏览器单独开启一个线程，过程在这个线程中执行，这样浏览器就不会等待阻塞
//IE7之前不支持xmlhttprequest而是activexobject('microsoft.xmlhttp')
//内容类型是出现请求体
aop主要就是把一些与业务无关但又被多个模块使用的功能分离处理
//aop一个当一个提交表单，响应速度又与网络速度有关，当一个低速环境下提交的时候，用户可能心急不停的提交表单

//通知就是一个功能
 //node只能应付i/o密集型场景，cpu密集型场景完败于apache
 //运用web服务器啊，操作文件系统和数据库
 //web服务器单开一个线程，在处理cpu密集新任务的时候

* */







