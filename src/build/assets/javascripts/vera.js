;(function($){
    if(typeof window.vera === 'undefined'){
        window.vera = {};
    }
    window._ = vera;
   
})(Zepto);


;(function($,vera){
	//button loading 
	$.fn.button = function(option){
		var text = '';
		if(typeof option === 'undefined'){
			return false;
		}
		if(option.disabled){
			text = this.text();
			this.attr('data-text',text).removeClass('btn-red').addClass('btn-diasbled').text('安全加载中...');
		}
		else {
			text = this.data('text');
			this.removeClass('btn-diasbled').addClass('btn-red').text(text);
		}

	};

	$.fn.buttonLoading = function(action,callback){
		//返回btn是否处于loading状态
		if(typeof action==='undefined'){
			if(this.hasClass('btn-animate')&&!this.hasClass('btn-animate-remove')){
				return true;
			}
			else{
				return false;
			}
			
		}

		//设置或者取消btn的loading状态
		if(action==='show'){
			if(this.hasClass('btn-animate-remove')){
				this.removeClass('btn-animate-remove');
			}
			else{
				this.addClass('btn-animate');
			}
		}
		else if(action==='hide'){
			this.addClass('btn-animate-remove');
		}
		if(typeof callback ==='function'){
			callback();
		}
	}
})(Zepto,vera)
;(function($,vera){
	vera.checkbox = new Checkbox();

	//checkbox
	function Checkbox(){
		//checkbox checkkbox-default checkkbox-selected checkkbox-disabled
		var self = this;
		self.get = function(selector){
			var val = $(selector).hasClass('checkkbox-selected');
			return val;
		};
		self.set = function(selector,value){
			if($(selector).hasClass('checkkbox-disabled')){
				return false;
			}
			if(value){ // true
				$(selector).removeClass('checkkbox-default').addClass('checkkbox-selected');
			}
			else{
				$(selector).removeClass('checkkbox-selected').addClass('checkkbox-default');
			}
		};
		self.toggle = function(selector){
			if($(selector).hasClass('checkkbox-disabled')){
				return false;
			}
			if($(selector).hasClass('checkkbox-default')){
				$(selector).removeClass('checkkbox-default').addClass('checkkbox-selected');
			}
			else{
				$(selector).removeClass('checkkbox-selected').addClass('checkkbox-default');
			}
		};
	}
	$('[role="checkbox"]').tap(function(){
		vera.checkbox.toggle(this);
	});

})(Zepto,vera)
;(function(vera){
    if(typeof window.vera === 'undefined'){
        window.vera = {};
    }
    vera.clearSpace = clearSpace;
    vera.formatInput = formatInput;

     //清除字符串内部的空格
    function clearSpace(str){
        var result = [], len = str.length;
        for(var i = 0; i < len; i++){
            if (str[i] == ' ') {
                continue;
            }
            result.push(str[i]);
        }
        return result.join('');
    }
    
    /**
    用户输入内容格式化
    参数:  str    String  用户输入内容
    格式:  stpe   String  格式化方式,'card_split'(default) 'mobile_split' idcard_split'
    */
    function formatInput (str, type) {
        type = type || 'card_split';
        var seg = [4,4,4,4,4,4];
        var maxlen = 50;
        switch(type){
            case 'card_split':
                seg = [4,4,4,4,4];
                maxlen = 19;
                break;
            case 'mobile_split':
                seg = [3,4,4];
                maxlen = 11;
                break;
            case 'idcard_split':
                seg = [6,8,4];
                maxlen = 18;
                break;
            default :
                break;
        }

        str = clearSpace(str).substr(0, maxlen);
        var start = 0;
        var result = [];
        for(var j = 0; j < seg.length; j++){
            var count = seg[j];
            var tmpstr = str.substr(start, count);
            if(tmpstr.length <= 0){
                break;
            }

            start = start + count;

            result.push(tmpstr);

            if(j == seg.length - 1){
                tmpstr = str.substr(start);
                if(tmpstr.length > 0){
                    result.push(tmpstr);
                }
            }

        }

        return result.join(' ');
    }
    
    
})(vera);


;(function($,vera){
	$('body').on('touchstart','[data-hover]',function(e){
		$(e.target).addClass('touching')
	});

	$('body').on('touchend','[data-hover]',function(e){
		$(e.target).removeClass('touching')
	});
})(Zepto,vera)
;(function($,vera){
	//input del
	$('body').on('focus','.v-ipt',function(e){
		var target = e.target;
		$(target).siblings('.del').removeClass('hide');
	}).on('blur','.v-ipt',function(e){
		var target = e.target;
		setTimeout(function(){
			$(target).siblings('.del').addClass('hide');
		},300);
	});
	$('body').on('input','.v-ipt',function(e){
		var target = e.target;
		$(target).siblings('.del').removeClass('hide');	
	});
	$('body').on('tap','.del',function(e){
		var target = e.target;
		$(target).addClass('hide').siblings('.v-ipt').val('');
	});
})(Zepto,vera)
;(function($,vera){
	
	//loading show hide
	function Loading(){
		var html = '<div class="loading">'+
						'<div class="loading-holder">'+
							'<div class="logo"></div>'+
							'<div class="text">'+
								'为您安全加载中'+
								'<div class="loading-style">'+
									'<span></span>'+
									'<span></span>'+
									'<span></span>'+
								'</div>'+
							'</div>'+
						'</div>'+
					'</div>';
        this.obj =  $(html);
    };

    Loading.prototype = {
        show : function(){
            var _this = this;
            var _obj = this.obj;
            _obj.appendTo("body").fadeIn(100);
        },
        hide : function(){
            var _fn = this.fn;
            var _obj = this.obj;
        	_obj.appendTo("body").fadeOut(100,function(){
        		_obj.remove();
        	});
        }
    };
    var loading = new Loading();
    vera.loading = function(option){
        if(typeof option==='undefined'){
        	return false;
        }
        if(option==='show'){
        	loading.show();
        }
        else if(option==='hide'){
        	loading.hide();
        }
    }
})(Zepto,vera)
;(function($,vera){
	//modal
	function Modal(){
		var self = this;
		self.show = function(selector){
			$(selector).animate({left:0}, 300,'ease-out');
		}
		self.hide = function(selector){
			$(selector).animate({left:'110%'}, 300,'ease-out');
		}
	}
	vera.modal = new Modal();
	
	//modal
	//show hide
	$.fn.modal = function(option){
		if(option==='show'){
			this.animate({left:0}, 300,'ease-out');
		}
		else if(option==='hide'){
			this.animate({left:'110%'}, 300,'ease-out');
			$('body').css('overflow','auto')
		}
	};

	//modal dom ctrl
	$('body').on('tap','[data-modal]',function(e){
		var target = e.target,
			modalId = $(target).data('modal'),
			action = $(target).data('action');
		if (modalId==''){
			return false;
		}	
		if (action=='') {
			return false;
		}
		if(action==='show'){
			$(modalId).modal('show');
		}
		else if(action=='hide'){
			$(modalId).modal('hide');
		}
		
	});
})(Zepto,vera)
;(function($,vera){
	//tabs controller
	$('body').on('tap','.tab',function(e){
		var target = e.target,
			tabVal = $(target).data('tab'),
			$pannelLeft = $('[data-pannel="left"]'),
			$pannelRight = $('[data-pannel="right"]');
		if(tabVal===undefined){
			return false;
		}	
		$(target).addClass('active').siblings('.tab').removeClass('active');
		if(tabVal==='left'){
			$pannelLeft.removeClass('hide');
			$pannelRight.addClass('hide');
		}
		else{
			$pannelLeft.addClass('hide');
			$pannelRight.removeClass('hide');
		}
	});
})(Zepto,vera)
;(function($,vera){
	//trace
	var Trace = function(text,fn){
        this.obj =  $('<div class="trace">'+text+'</div>');
        this.fn = fn;
    };

    Trace.prototype = {
        show : function(){
            var _this = this;
            var _obj = this.obj;
            _obj.appendTo("body").fadeIn(100);
        },
        hide : function(){
            var _fn = this.fn;
            var _obj = this.obj;
        	_obj.appendTo("body").fadeOut(100,function(){
        		_obj.remove();
        	});
            if(_fn){
                _fn();
            }
        }
    };
    $.trace = function(text,fn,myTime){
        myTime = myTime || 3000;
        var trace = new Trace( text,fn );
        trace.show();
        var timeout = setTimeout( function(){
            trace.hide();
            clearTimeout(timeout);
        },myTime );
    }
})(Zepto,vera)
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

