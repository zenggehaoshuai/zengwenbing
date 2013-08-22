var Common = {
        date:{
             monthArray : [
                 {
                     num:0,str:"Jan",
                     num:1,str:"Feb",
                     num:2,str:"Mar",
                     num:3,str:"Apr",
                     num:4,str:"May",
                     num:5,str:"June",
                     num:6,str:"July",
                     num:7,str:"Aug",
                     num:8,str:"Sept",
                     num:9,str:"Oct",
                     num:10,str:"Nov",
                     num:11,str:"Dec"
                 }
             ] ,
            getEnglishDateString:function(date){ //如 apr.
                    var year = date.getFullYear(),month = date.getMonth(),day = date.getDate();
                    return this.monghArray[0][month].str+day+"  "+year;
            },
            getShortDateString:function(date){
                    var year = date.getFullYear(),month = ((date.getMonth() + 1)) < 10 ? ("0"+(date.getMonth() + 1)):(date.getMonth() + 1) ,day = date.getDate() < 10 ? ("0"+date.getDate()):date.getDate();
                    return year+"-"+month+"-"+day;

            },
            getShortDateTimeString:function(date){
                var year = date.getFullYear(),month = ((date.getMonth() + 1)) < 10 ? ("0"+(date.getMonth() + 1)):(date.getMonth() + 1) ,day = date.getDate()  < 10 ? ("0"+date.getDate()):date.getDate(),hour = date.getHours()  < 10 ? ("0"+date.getHours()):date.getHours(),minutes = date.getMinutes()  < 10 ? ("0"+date.getMinutes()):date.getMinutes(),seconds = date.getSeconds()  < 10 ? ("0"+date.getSeconds()):date.getSeconds()
                return year+"-"+month+"-"+day+" "+hour+":"+minutes+":"+seconds;
            }
        },
        xss:{
             clearSpecial:function(str){
                   var specialExp = "";
                   if(str.indexOf("<")) {
                        specialExp = /</;
                        str = str.replace(specialExp,"&lt;");
                   }
                 if(str.indexOf(">")) {
                     specialExp = />/;
                     str = str.replace(specialExp,"&gt;");
                 }
                   return str;
             }
        }
}
module.exports = Common;