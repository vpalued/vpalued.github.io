;(function(vera){
    if(typeof window.vera === 'undefined'){
        window.vera = {};
    }
    vera.validate = new Validate();

    function Validate(){
        
    }
    //银行卡
    Validate.prototype.bankcardNo = function (val){
        var reg = /^[1-9]\d{15}\d{0,3}\D{0}$/; //16-19
        var reg = /^[1-9]\d{13}\d{0,5}\D{0}$/; //14-19

        if(val.length === 0){
            return {
                result:false,
                msg:'请输入卡号'
            };
        }
        if(!reg.test(val)){
            return {
                result:false,
                msg:'请输入正确的卡号(14-19位)'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    
	//用户名
	Validate.prototype.fullname = function (val){
    	var reg = /^[\u4e00-\u9fa5•，]+$|^[\u4e00-\u9fa5.,]+$/;
        
        if(val.length === 0){
            return {
            	result:false,
            	msg:'请输入姓名！'
            };
        }
        if(!reg.test(val)){
            return {
            	result:false,
            	msg:'请输入格式正确的中文姓名！'
            };
        }
        return {
        	result:true,
        	msg:''
        };
    }
	//身份证 
	Validate.prototype.iDCard = function (idCard) {
        
        var regIdCard = /^(^[1-9]\d{7}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])\d{3}$)|(^[1-9]\d{5}[1-9]\d{3}((0\d)|(1[0-2]))(([0|1|2]\d)|3[0-1])((\d{4})|\d{3}[Xx])$)$/;

        if (!regIdCard.test(idCard)) {
            return {
            	result:false,
            	msg:'请输入正确的身份证号！'
            };
        }

        if (idCard.length == 18) {
            var idCardWi = [7, 9, 10, 5, 8, 4, 2, 1, 6, 3, 7, 9, 10, 5, 8, 4, 2]; //将前17位加权因子保存在数组里
            var idCardY = [1, 0, 10, 9, 8, 7, 6, 5, 4, 3, 2]; //这是除以11后，可能产生的11位余数、验证码，也保存成数组
            var idCardWiSum = 0; //用来保存前17位各自乖以加权因子后的总和
            for (var i = 0; i < 17; i++) {
                idCardWiSum += idCard.substring(i, i + 1) * idCardWi[i];
            }

            var idCardMod = idCardWiSum % 11;//计算出校验码所在数组的位置
            var idCardLast = idCard.substring(17);//得到最后一位身份证号码

            //如果等于2，则说明校验码是10，身份证号码最后一位应该是X
            if (idCardMod == 2) {
                if (idCardLast == "X" || idCardLast == "x") {
                    return {
		            	result:true,
		            	msg:''
		            };
                } else {
                    return {
	            	result:false,
	            	msg:'请输入正确的身份证号！'
	            };
                }
            } else {
                //用计算出的验证码与最后一位身份证号码匹配，如果一致，说明通过，否则是无效的身份证号码
                if (idCardLast == idCardY[idCardMod]) {
                    return {
		            	result:true,
		            	msg:''
		            };
                } else {
                    return {
		            	result:false,
		            	msg:'请输入正确的身份证号！'
		            };
                }
            }
        }
        return {
        	result:true,
        	msg:''
        };
    }
	//cvv2
	Validate.prototype.cvv2 = function (val){
        var reg = /^\d{3}$/;

        if(!reg.test(val)){
            return {
                result:false,
                msg:'请输入卡背面末尾3位数'
            };
        }
        return {
        	result:true,
        	msg:''
        };
    }
	//信用卡有效期    
	Validate.prototype.exptime = function (val){
        var reg  = /^\d{4}$/
        if(!reg.test(val)){
            return {
            	result:false,
            	msg:'请输入4数的有效期，格式如：08/25,输入0825'
            };
        }
        return {
        	result:true,
        	msg:''
        };
    }
	//手机号码     
	Validate.prototype.mobileNo = function (val){
        var reg = /^[1][3,4,5,7,8][0-9]{9}$/;
        if(!reg.test(val)){
            return {
	        	result:false,
	        	msg:'请输入11位的手机号码'
	        };
        }
        return {
        	result:true,
        	msg:''
        };
    }

    //验证码
    Validate.prototype.authCode = function (val){
        var reg = /^\d{6}$/;

        if(val.length <= 0){
            return {
	        	result:false,
	        	msg:'请输入短信验证码'
	        };
        }

        if(!reg.test(val)){
            return {
	        	result:false,
	        	msg:'请输入6位短信验证码'
	        };
        }
        return {
        	result:true,
        	msg:''
        };
    }
    //密码长度校验
    Validate.prototype.passport = function(val){
        if(val.length<6||val.length>20){
            return {
                result:false,
                msg:'请输入合法长度的密码'
            };
        }
        return {
            result:true,
            msg:''
        };
    }
    Validate.prototype.email = function (val) {
        var reg = /^[\w-]+(\.[\w-]+)*@[\w-]+(\.[\w-]+)+$/;
        return reg.test(val);
    }
    
})(vera);

