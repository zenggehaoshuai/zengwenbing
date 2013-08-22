/**
 * Created with JetBrains WebStorm.
 * User: zengwenbing
 * Date: 13-8-11
 * Time: 下午3:07
 * To change this template use File | Settings | File Templates.
 */
         var Person  = (function(){
         //所有方法都追加到这个对象里
         var personFrame = {};
         var logs = [];
         //给_personFrame添加命名空间,参数是数组或者字符串，扩展personFrame对象
         personFrame.register = function(strArr,callback){
                         strArr = strArr.indexOf(".") > 0 ? strArr.split(".") : [strArr];
                         var i,len = strArr.length;
                         var parent = this;
                         for(i = 0;i<len;i++){
                             (typeof parent[strArr[i]] === "undefined") && (parent[strArr[i]] = {});
                              parent =parent[strArr[i]];
                         }
                         if(callback){
                               callback.call(parent,this);//给予的参数是最原始的参数personFrame
                         }
                  return parent;
        };
        //给personFrame快捷的添加命名空间，参数是字符串 ,扩展personFrame对象
        personFrame.registerShort = function(str,callback){
              if(this.util.string.isString(str)){
                    this[str] = {};
                    return !callback ? this[str] : callback.call(this[str],this);
              }

        }
       //扩展对象函数
       personFrame.extend = function(source,extend,isFg){
           (typeof isFg === "undefined") && (isFg = true);
            var k;
            for(k in extend){
            if(isFg && !source[k]){
                   source[k] = extend[k];
              }
            }
            return source;
       }
       //遍历对象或者数组
      personFrame.each = function(obj,callback){
           if(this.util.object.isObject(obj)){
                var k;
                    for(k in obj){
                           if(callback.call(obj[k],k,obj[k],obj) === false){
                                 break;
                           }
                    }
           }
           else if(this.util.array.isArray(obj)){
                var i = 0,len = obj.length;
                for(;i<len;i++){
                     if(callback.call(obj[i],i,obj[i],obj) === false){
                          break;
                     }
                }
           }
      }
    //获取一个已存在的模块或者创建一个新的模块
    personFrame.get = function(uri,fn){
          if(this[uri]){
              if(fn){
                   fn.call(personFrame);
              }
              return this[uri];
          }
          else{
             this.loadJS(uri,fn);
          }
    }
    //定义加载js库
    personFrame.loadJS = function(uri,fn){

            var script = this.dom.C("script");
            this.dom.attr(script,{type:"text/javascript",src:"/javascripts/"+uri+".js"});
            script.onload = function(){fn.call(personFrame)}
            this.dom.after(document.head.childNodes[document.head.childNodes.length - 2],script);

}
     //引用命名空间函数
      personFrame.require = function(uri,fn){
            //依赖模块，仅支持/方式 ,如果为空就返回空对象不存在的用异步加载，存在的用同步加载
             return this.get(uri,fn);

      }
    return personFrame;
})();
          //添加一个工具辅助模块(util)
      Person.register("util",function(person){
            this.string = {
                 isString:function(string){
                     return typeof string === "string";
                 },
                 trim:function(str){
                     return str.replace(/^\s+|\s+$/g,"");
                 }

            }
            this.browser = {
                 isIE:/msie/i.test(navigator.userAgent),
                 isFirefox:/firefox/i.test(navigator.userAgent),
                 isChrome:/chrome/i.test(navigator.userAgent)
            }
            this.functions = {
                  isFunction:function(fun){
                       return typeof fun === "function";
                  }
            }
            this.array = {
                   isArray:function(arr){
                       return arr.constructor === Array;
                   }
            }
            this.object = {
                   isObject:function(obj){
                       return !person.util.array.isArray(obj) && typeof obj === "object";
                   },
                   parse:function(str){;
                          var strReg = /^\{([^\{\}]+)\}$/,resultsObj = {},strArr = [],onlyStrArr;
                                  str.replace(strReg,function(v1,v2){
                                        strArr = person.util.string.trim(v2).split(",");
                                  });
                                  person.each(strArr,function(k,v){
                                      resultsObj[v.split(":")[0]] = v.split(":")[1];
                                  })
                           return  resultsObj;
                      },
                   stringify:function(obj){
                        var resultStr = "{";
                         person.each(obj,function(k,v){
                                   resultStr += k+":"+v+","
                         })
                      return resultStr.replace(/\,$/,"")+"}";
                   }
            }

      })
//添加ajax处理
       Person.registerShort("ajax",function(Person){
                           //使用get请求
                             this.get = function(url,data,type,callback){
                                         //假如没有传入参数
                                      if(Person.util.functions.isFunction(data)){
                                            callback = data;
                                            data = null;
                                      }
                                      return this.request({
                                          type:'GET',
                                          url:url,
                                          data:data,
                                          success:callback,
                                          dataType:type
                                      });

                             }
                             //完整的ajax请求
                             this.request = function(ajaxSettings){
                                    ajaxSettings = ajaxSettings || {};
                                            var defaultAjaxSettings = {
                                                 url:"",
                                                 type:"GET",
                                                 contentType:"application/x-www-form-urlencoded",
                                                 data:null,
                                                 dataType:"JSON",
                                                 xhr:(function(){
                                                       if(window.XMLHttpRequest){
                                                            return function(){
                                                                 return new window.XMLHttpRequest();
                                                            }
                                                       }else if(window.ActiveXObject){
                                                            return function(){
                                                                   return new ActiveXObject("Microsoft.XMLHTTP");
                                                            }
                                                       }
                                                 })()
                                            }

                                            var s = Person.extend(ajaxSettings,defaultAjaxSettings),
                                                xhr = s.xhr(),
                                                onreadystatechange = xhr.onreadystatechange = function(isTimeout){
                                                                  if(xhr.readyState === 4){
                                                                        //服务器已经成功接收信息
                                                                        if(xhr.status === 200){
                                                                             //服务器已经成功响应信息
                                                                            s.success.call(null,eval("("+xhr.responseText+")"));
                                                                        }
                                                                  };
                                                }
                                 //设置请求参数
                                 xhr.open(s.type, s.url);
                                 xhr.send(s.data);
                                 return xhr;

                             }
       })
//添加一个dom处理模块(dom)
        Person.registerShort("dom",function(person){
             //选择dom元素
              this.E = function(id){
                    return person.util.string.isString(id) ? document.getElementById(id):id;
              }
             //创建dom元素  id = text 创建文本节点，id=buffer 创建文档碎片，反之则创建元素节点
             this.C = function(id){
                   id = id.toLowerCase();
                   return id === "text" ? document.createTextNode("") : id === "buffer" ? document.createDocumentFragment() : document.createElement(id);
             }
            this.getCurrentStyle = function(ele){
                           return ele.getCurrentStyle ? ele.getCurrentStyle : document.defaultView.getComputedStyle(ele,null);
            }
            //根据html创造dom对象
            this.CHtml = function(html){

                  if(/^<\/?[^>]+>/i.test(html)){
                        var tagReg = /^<([a-z]+)([^>]+)>/i,styleSheetReg = /style=([^<>]+)/;
                        var tagName = tagReg.exec(html)[1],stylesheets = (styleSheetReg.exec(html)? styleSheetReg.exec(html)[1]:html).replace(/['"]/g,"").split(";").join(","),attributes = person.util.string.trim(tagReg.exec(html.replace(styleSheetReg,""))[2]).replace(/['"]/g,"").split(/\s+/g).join(',').replace(/=/g,":");
                         var tag = this.C(tagName);
                         var attrs = person.util.object.parse("{"+attributes+"}");
                         var csss =  person.util.object.parse("{"+stylesheets.replace(/style/,"")+"}");
                         this.attr(tag,attrs);
                         this.css(tag,csss);
                         return tag;

                  }
                 return this;
            }
            //将元素添加到指定元素的末尾
            this.append = function(childEle,parentEle){
                          if(person.util.string.isString(childEle)){
                                  //如果是普通字符串
                                parentEle.appendChild(this.E(childEle));
                          }else{
                                parentEle.appendChild(childEle);
                          }
                    return this;
            }
            //删除指定的元素
            this.remove = function(ele){
                  ele.parentNode.removeChild(ele);
                  return this;
            }

            //添加到当前元素的后面
            this.after = function(element,currentEle){
                   element.parentNode.insertBefore(currentEle,element);
                   return this;
            }
            //获取和赋予html
            this.html = function(ele){
                      var args = Array.prototype.slice.call(arguments,1);
                      if(args.length < 1){
                           return ele.innerHTML;
                      }
                      ele.innerHTML = args[0];
                      return this;
            }
            //获取text
            this.text = function(ele){
                     var args = Array.prototype.slice.call(arguments,1);
                     var textReg = /<\/?[^>]+>/gi;
                     if(args.length < 1){
                          return person.util.string.trim(this.html(ele).replace(textReg,"").split(/\s+/).join(""));
                     }
                     this.html(ele,args[0]);
                     return this;
            }
            //获取和赋予属性节点
            this.attr = function(element){
                            var args = Array.prototype.slice.call(arguments,1);
                            if(args.length < 2){
                                 var obj = args[0];
                                if(person.util.object.isObject(obj)){
                                       person.each(obj,function(k,v){
                                            element.setAttribute(k,v);
                                       })
                                }else if(person.util.string.isString(obj)){
                                          return element.getAttribute(obj);
                                }
                            }else{
                                 element.setAttribute(args[0],args[1]);
                            }
                    return this;
            }
            //获取和赋予css样式
            this.css = function(element){
                 var args = Array.prototype.slice.call(arguments,1);
                                 if(args.length < 2){
                                     var obj = args[0];
                                     if(person.util.object.isObject(obj)){
                                         //如果赋予的是对象
                                         person.each(obj,function(k,v){

                                              element.style[k] = v;
                                         })
                                     }else if(person.util.string.isString(obj)){
                                          //如果赋予的是字符串
                                           return   this.getCurrentStyle(element)[obj];
                                     }
                                 }else{
                                      element.style[args[0]] = args[1];
                                 }
                return this;
            }
             //dom样式操作
             this.addClass = function(element,className){
                      element = this.E(element);
                      var classArray = className.split(/\s+/),classResult = typeof element.className === "undefined" ? "" : element.className;
                      var i = 0,len = classArray.length;
                      for(;i<len;i++){
                            //后面追加当前不存在的样式
                           if(classResult.indexOf(classArray[i]) < 0){
                                classResult += (classResult?" " : "") + classArray[i];
                           }
                      }
                      element.className = classResult;
                      return this;

             }
            //dom修改样式
            this.removeClass = function(element,className){
                              element = this.E(element);
                              var oldClassName = element.className;
                              oldClassName = oldClassName.replace(className,"");
                              element.className = oldClassName;
                             return this;
            }
            //dom判断是否存在样式
            this.hasClass = function(element,className){
                              element = this.E(element);
                              //文本节点是没有样式的
                              if(!element || !element.className) return false;

                              var classNameArray = person.util.string.trim(className).split(/\s+/);
                              var i = 0,len = classNameArray.length;
                              var oldClassName = element.className.split(/\s+/).join(" ");
                              var classRegExp = null;
                             //要匹配的元素是否与原先的有相同                         有一个新的样式没有匹配到，就return false
                              while(len--){
                                        classRegExp = new RegExp(""+classNameArray[len]+"","i");
                                        if(!classRegExp.test(oldClassName)) return false;
                              }
                              return true;
            }
            //返回当前dom的序号 类似jquery 的$.index()
            this.index = function(element,cont){
                if (!cont) {
                    cont = 0
                }
                if(element.previousSibling && element.previousSibling.nodeType == 1){
                     return this.index(element,cont+1);
                }else if(element.previousSibling && element.previousSibling.nodeType != 1 ){
                     return this.index(element,cont);
                }else{
                                           return cont;
                }



            }


        })
     //注册事件处理模块
      Person.registerShort("event",function(person){
          var listeners = {};
          //绑定事件的基本
          this.bind = (function(){
              return (window.attachEvent)?function(ele,eventType,eventCallback){
                                    ele.attachEvent('on'+eventType,eventCallback);
              }:function(ele,eventType,eventCallback){
                                    ele.addEventListener(eventType,eventCallback,false);
              }
          })();
         //删除事件绑定
          this.remove = (function(){
              return (window.attachEvent)?function(ele,eventType,eventCallback){
                  ele.detachEvent('on'+eventType,eventCallback);
              }:function(ele,eventType,eventCallback){

                  ele.removeEventListener(eventType,eventCallback,false);
              }
          })();
               this.on = function(ele,events,callback){
                   var self = this;
                   if(person.util.array.isArray(events)){
                          person.each(events,function(k,v){
                                  self.on(ele,v,callback);
                          })
                   }else{
                        if(!listeners[ele.id]){
                             listeners[ele.id] = [];
                        }
                        listeners[ele.id].push({events:events,callback:callback});
                        this.bind(ele,events,callback);
                   }
                   return this;
               };
          //对同一个元素的事件只能设定一个回调函数
               this.once = function(ele,events,callback){
                     var self = this,k;
                    for(k in listeners){

                         person.each(listeners[k],function(k1,v){
                               if(v.events === events){
                                     listeners[k].splice(k1,1);
                                     self.remove(ele,events,callback);
                               }
                         })
                    }
                    this.on(ele,events,callback);
                    return listeners;
               }

      })



