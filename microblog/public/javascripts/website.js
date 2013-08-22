/**
 * Created with JetBrains WebStorm.
 * User: zengwenbing
 * Date: 13-8-18
 * Time: 下午2:54
 * To change this template use File | Settings | File Templates.
 */
var WebSite = (function(){
   var person = Person,DOM = person.require('dom'),Util = person.require('util'),Ajax = person.require('ajax'),Event = person.require('event');
    return {
         init:function(){

            //一个事件对应一个回调方法
            var self = this,E = DOM.E,loginBtn = E('login');

            //登录功能
            self.bindEvents(loginBtn,["click"],function(){

                  self.showDialog();
            })

            //关闭登录按钮

         },

        bindEvents :function(elem,event,callback){

            Event.on(elem,event,callback);

        },

          //调出对话框
         showDialog:function(){
            person.require('dialog',function(){
                   this.dialog.init({id:"myDialog",isModel:true}).show();
             },false)

          }
     }
})();

