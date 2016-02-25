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