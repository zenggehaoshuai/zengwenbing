Person.register("component.autoCheckForm",function(person){
      this.checkFunc = {
           isEmpty:{
                 validate:function(val){
                       return val != "";
                 },
                 printMsg:"请输入一个非空值"
           },
           isDefault:{
                 validate:function(val){
                       return val != "default";
                 },
                 printMsg:"未选择值"
           },
           isChecked:{
                 validate:function(val){
                       return val;
                 },
                 printMsg:"请选择值"
           },
           isEmail:{
                 validate:function(val){
                       return /^([0-9]+[\_\.]?)@([a-zA-Z]+[\_\.]?)\.[a-zA-Z]{2,3}$/.test(val);
                 },
                 printMsg:"请输入一个格式正确的email"
           }
      },

      this.checkConfig = {
           fullName:"isEmpty",
               tel : "isEmpty",
               email: "isEmail"
      }
      this.showInfoFunc = {
             fullName:function(msg){
                  alert(msg);
             },
             tel:function(msg){
                  alert(msg);
             },
             email:function(msg){
                  alert(msg);
             }
      },
      this.errorMessage = [];
      this.successMessage = [];
      this.check = function(data){
               var k,checkType,checker,result;
               for(k in data){
                    if(data.hasOwnProperty(k)){
                          checkType = this.checkConfig[k];
                          checker =   this.checkFunc[checkType];
                          if(!checkType){
                               continue;//不存在当前验证字段
                          }
                          if(!checker){
                               throw new Error("请指定"+checkType+"字段的验证规则");
                          }
                          result = checker.validate(data[k]);
                          if(!result){
                               this.errorMessage.push(k+checker.printMsg);
                               if(this.showInfoFunc[k]){
                                               this.showInfoFunc[k](k+checker.printMsg);
                               }
                          }else{
                               this.successMessage.push(k+"验证成功");
                                if(this.showInfoFunc[k]){
                                                this.showInfoFunc[k](k+"验证成功");
                                }
                          }


                    }
               }
      };
      this.hasError = function(){
          return this.errorMessage.length > 0;
      }


})
