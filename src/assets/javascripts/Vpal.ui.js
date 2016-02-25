/**
** vpal ui js 
** version 1.0.0
** auther wikies.wan
*/
;(function($){
	if(typeof $ === 'undefined'){
		console.error('vpal needs zepto.js');
	}
	if(typeof window.Vpal==='undefined'){
		Vpal = {};
	}
	var util = {};
	util.arrIndexOf = function(arr,e){
		for(var i=0;i<arr.length;i++){
			if(e===arr[i]){
				return i;
			}
		}
		return -1;
	}
	function Vpalmobileui(){
		this.version = '1.0.0'
	}
	Vpalmobileui.prototype.checkbox = new Checkbox();
	$.checkbox = new Checkbox();

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
		$.checkbox.toggle(this);
	});

	
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
	Vpalmobileui.prototype.modal = new Modal();

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


	//loading show hide
	var Loading = function(){
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
    $.loading = function(option){
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



 

	$('body').on('touchstart','[data-hover]',function(e){
		$(e.target).addClass('touching')
	});

	$('body').on('touchend','[data-hover]',function(e){
		$(e.target).removeClass('touching')
	});








	window.vpalmobileui = window.VMU = new Vpalmobileui();
	Vpal.ui = new Vpalmobileui();
})(Zepto);




















