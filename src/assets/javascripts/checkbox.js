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