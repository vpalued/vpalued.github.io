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