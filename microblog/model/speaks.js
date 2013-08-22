var common = require('./common');
var Mongoose = require('./mongoose'),mongoose = Mongoose.mongoose,db = Mongoose.db;
db.on("error",function(error){
    console.log(error);
})
function Speaks(){
     this.init();//初始化集合结构
}
module.exports = Speaks;
Speaks.prototype.init = function(){
    this.speakSchema = new mongoose.Schema({
         email:{type:String},
         speakTitle:{type:String},
         speakContent:{type:String},
         speakTime:{type:String,default:common.date.getShortDateTimeString(new Date)}

    });
    this.speakModel = db.model("m_speaks",this.speakSchema);
}
//根据用户姓名，返回所发说说
Speaks.prototype.findEmail = function(email,callback){
                  return this.speakModel.find({email:email},function(err,results){
                           callback.call(null,err,results);
                  })
}
//根据用户姓名，返回所发说说
Speaks.prototype.speakCount = function(email,callback){
                 return this.speakModel.find({email:email},function(err,count){
                           callback.call(null,err,count.length);
                 })
}