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