/**
 * Created with JetBrains WebStorm.
 * User: zengwenbing
 * Date: 13-8-13
 * Time: 下午6:41
 * To change this template use File | Settings | File Templates.
 */
var User = require('../../model/user');
var user = new User;  //把连接的表完成
module.exports = exports = {
                 doLogin:function(req,res){
                        var email = req.body.email.trim(),password = req.body.password.trim();
                        user.findNameOne(email,function(err,results){
                             //findOne查找的是数组
                            var resultsLen = results.length;
                            if(resultsLen > 0){
                                 //登录成功返回session
                                 req.session.email = email;
                                //删除添加查询都是一样只是修改不同
                                 user.find({email:email},function(error,results){
                                      if(error) return res.redirect('/');
                                      //传入个人对象
                                      var userinfo = results[0];
                                     //mongodb的多表关联一般用
                                      res.render("personHomePage",userinfo);//不需要注册的直接渲染
                                 })

                              }else{
                                 res.redirect('/');
                              }

                        })
                 },
                 doReg :function(req,res){
                       //定义一个验证码
                       req.session.code = "nw76a";
                       var body = req.body,email = body.email.trim(),password = body.password.trim(),nick = body.nick.trim(),code = body.code.trim();
                       if(code != req.session.code){
                            return res.redirect('/reg.html');
                       }
                       user.insert({email:email,password:password,nick:nick},function(err,results){
                            if(err) return res.redirect('/');
                            //insert就是返回一个json
                            else res.redirect("/person/"+results["_id"]+"");
                       })
                 },
                 personHomePage:function(req,res){
                       var id = req.params.id,email = req.session.email;
                       user.find({"_id":id},function(err,results){
                            if(err) res.rendirect("/");
                            else res.render("personHomePage");
                       })
                 }
}
