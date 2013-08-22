//对话框模块
Person.registerShort("dialog",function(person){
    var defaultSettings = {
        "isModel":false
    }
        this.init = function(dialogSettings){
               this.dialogSettings = person.extend(defaultSettings,dialogSettings);
               this.location();
               return this;
        }
      //显示遮罩层
        this.showMask = function(){
              var maskHTML = "<div id='mask' style='background:#000;opacity:.3;z-index:10001;position:fixed;top:0;left:0;width:"+document.documentElement.offsetWidth+"px;height:"+document.documentElement.offsetHeight+"px'></div>";
              return person.dom.CHtml(maskHTML);
        }
         this.show = function(){
                 //拼接dialog的html，清除回车换行空格
                 var DIALOGHTMLARRA = [],self = this;
                 DIALOGHTMLARRA.push('<div class="dialog clearfix" id="'+this.dialogSettings.id+'"></div>');
                 var dialog = person.dom.E(this.dialogSettings.id);
                 if(!dialog){
                     dialog = person.dom.CHtml(DIALOGHTMLARRA.join(''));
                      person.dom.html(dialog,'<div class="title"><span>登录</span></div><a href="javascript:;" class="dClose" id="dClose" title="关闭"></a><div class="content clearfix"><div class="left fl"><form action="/login" method="post"><div class="item"><label for="email">电子邮件</label> <div class="text"><input class="innerText" id="email" name="email" /></div></div><div class="item"><label for="password">登录密码</label><div class="text"><input type="password" class="innerText" id="password" name="password" /></div></div><div class="item loginItem"><input class="btn blueBtn loginBtn" type="submit" value="登 录" /><a class="lostPass" target="_blank" href="aq.liutime.com/security.html">忘记密码？</a></div></form></div><div class="right fr"><div class="item">还没注册?赶快来吧!</div><div class="item regBtn"><a href="/reg.html" class="btn greenBtn" target="_blank" >立即注册</a></div></div></div></div>');
                  }
                 if(this.dialogSettings.isModel){
                             person.dom.append(this.showMask(),document.body);
                  }

                 person.dom.append(dialog,document.body);
                 person.event.on(person.dom.E('dClose'),"click",function(){
                         self.hide();
                  })
                 return this;
         }
         this.hide = function(){
                 var dialog = person.dom.E(this.dialogSettings.id);
                 if(dialog){
                     person.dom.remove(dialog).remove(person.dom.E("mask"));


                 }

                 return this;
         }
        this.location = function(){

                 if(typeof window.innerWidth != "undefined"){

                                          var width = window.innerWidth;
                                          var height = window.innerHeight;

                                          var bgX = window.pageXOffset;
                                          var bgY = window.pageYOffset;

                                          this.dialogSettings.left = (bgX + ((width - parseInt(this.dialogSettings.width)) / 2)) + "px";
                                          this.dialogSettings.top = (bgY + ((height - parseInt(this.dialogSettings.height)) / 2)) + "px";


              }else{
                                        var dde = document.documentElement;
                                        var dWidth = dde.offsetWidth;
                                        var dHeight = dde.offsetHeight;
                                        var dbgX = dde.scrollLeft;
                                        var dbgY = dde.scrollTop;
                                        this.dialogSettings.left =  (dbgX+((dWidth - parseInt(this.dialogSettings.width)) / 2)) + "px";
                                        this.dialogSettings.top = (dbgY+((dHeight - parseInt(this.dialogSettings.height)) / 2)) + "px";



              }


        }
})

