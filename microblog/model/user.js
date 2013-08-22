/**
 * Created with JetBrains WebStorm.
 * User: zengwenbing
 * Date: 13-8-19
 * Time: 上午11:51
 * To change this template use File | Settings | File Templates.
 */
var Mongoose = require('./mongoose'),mongoose = Mongoose.mongoose,db = Mongoose.db;
db.on('error',function(error){
       console.log(error);
})
//操作就是概要和列举数据模型
function User(){
       this.init();
}

User.prototype.init = function(){
    //在模型初始化定义集合表
     this.userSchema = new mongoose.Schema({
                email   :  {type:String},
             userimage  : {type:String,default:"/images/userimage/180.jpg"},
              password  : {type:String,default:"123"},
              nick   :  {type:String,default:"匿名用户"},
             message   :  {type:String,default:"菜鸟入群，多多关照"},
                  sex   :  {type:String,default:0},
                  home  :  {type:String,default:0},
               issingle  :  {type:String,default:0},
                  live    :  {type:String,default:0},
           constellation  :   {type:String,default:"狮子座"}
        });
       this.userModel = db.model('m_users',this.userSchema);//对应着数据库模型
}
//查找唯一的用户名
User.prototype.findNameOne = function(email,callback){

        return this.userModel.find({email:email},function(err,results){

                        callback.call(null,err,results); //每次操作字符串关闭
        });
        //db.close();
}
User.prototype.find = function(obj,callback){
       return this.userModel.find(obj,function(err,results){
                        callback.call(null,err,results);
       })
}
//插入数据是不需要根据新的内容
User.prototype.insert = function(userObj,callback){
        return this.userModel.create(userObj,function(err,results){

                        callback.call(null,err,results);
        });
}
//修改记录
User.prototype.update = function(oldUserUpdates,newUserUpdates,callback){
        return this.userModel.update(oldUserUpdates,newUserUpdates,function(err,results){

                         callback.call(null,err,results);
        });
}
//删除记录
User.prototype.delete = function(oldUserUpdates,callback){
        return this.userModel.remove(oldUserUpdates,function(err,results){

                          callback.call(null,err,results);
        })
}
module.exports = User;
