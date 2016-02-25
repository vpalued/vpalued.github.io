;(function($,vera){
	$('body').on('touchstart','[data-hover]',function(e){
		$(e.target).addClass('touching')
	});

	$('body').on('touchend','[data-hover]',function(e){
		$(e.target).removeClass('touching')
	});
})(Zepto,vera)