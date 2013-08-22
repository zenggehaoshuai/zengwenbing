var indexAction = require("../controllers/index"),
     userAction = require("../controllers/user"),
     ringAction = require("../controllers/ring"),
     talentAction = require("../controllers/talent"),
     someoneAction = require("../controllers/someone"),
     circleAction = require("../controllers/circle"),
     shareAction = require("../controllers/share"),
     talkAction = require("../controllers/talk");

module.exports = function(app){
     //登录
    app.post("/login",userAction.doLogin);
     //首页
    app.get("/",indexAction.index);
     //注册
    app.post("/reg",userAction.doReg);
    //个人主页
    app.get("/person/:id",userAction.personHomePage);
    //圈子
   /* app.get("/ring",ringAction.index);
    //达人
    app.get("/talent",talentAction.index);
    //找人
    app.get("/someone",someoneAction.index);
    //node.js开发
    app.get("/nodejs",circleAction.nodejsIndex);
    //web前端开发
    app.get("/web",circleAction.webIndex);
    //mongodb数据库
    app.get("/database",circleAction.databaseIndex);
    //js开发
    app.get("/js",circleAction.jsIndex);
    //生活大爆炸
    app.get("/life",circleAction.lifeIndex);
    //讨论
    app.get("/talk",talkAction.index);
    app.post("/talk",talkAction.doPost);
    //大家都关注的用户
    app.get("/followuser",userAction.followUser);
    //详细的用户信息
    app.get("/")         */





}