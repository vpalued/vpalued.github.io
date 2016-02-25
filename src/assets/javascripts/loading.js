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