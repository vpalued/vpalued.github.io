;(function($){
	//dialog

	function getDefaultData(){
		return {id:getID(),
				title:"标题",
				body:"内容为空"};
	}
	function getHTML(data){
		var defaultData = getDefaultData();
		var testData = 
		{
			id:getID(),
			title:"标题",
			body:"<h1>内容为空</h1>",
			footer:{cancel:"取消",ok:"确定"},
			event:{
				show: function(){
					console.log("show");
				},
				hide: function(){
					console.log("hide");
				},
				cancel: function(){
					console.log("cancel");
				},
				ok: function(){
					console.log("ok");
				}
			}
		};

		defaultData = $.extend(true, defaultData, testData);
		var dialogTemplate = '<div class="dialog-overlay" id= '+defaultData.id+'  role="dialog">'+
								'<div class="dialog-table-row">'+
									'<div class="dialog-table-cell">'+
										'<div class="dialog-content">'+
											'<div class="dialog-header">'+
												'<div class="dialog-title">'+
													'<span class="title">'+
													+ defaultData.title +
													'</span>'+
													'<a href="javascript:void(0)" class="close-btn" data-dialog data-action="hide" >'+
														'<i class="icon-cross "  ></i>'+
													'</a>'+
												'</div>'+
											'</div>'+
											'<div class="dialog-body">'+
												+ defaultData.body +
											'</div>'+
											'</div>';
		if(defaultData.footer){
			dialogTemplate += '<div class="dialog-footer">'+
									'<a class="col col-50 dialog-action action-left" data-dialog data-action="cancel">'+
										 defaultData.footer.cancel + 
									'</a>'+
									'<a class="col col-50 dialog-action action-right" data-dialog data-action="ok">'+
										 defaultData.footer.ok +
									'</a>'+
								'</div>';
		}
		dialogTemplate +='</div>'+
						'</div>'+
					'</div>'+
				'</div>';

		return dialogTemplate;
	}

	function getID(){
		var num = new Date();
		num = num.getTime();
		return "dialog_" + num;
	}

	$.Dialog = function(data){
        this.obj =  $(getHTML(data));
        this.data = data;
    };

   /* Dialog.prototype = {
        show : function(){
            var _this = this;
            var _obj = this.obj;
            var _data = this.data;
            _obj.dialog("show", _data.event.show);
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
    };*/


	//show hide
	$.fn.dialog = function(option, callback, time){
		var time = time || 300;
		$this = this;
		if(option==='show'){
			this.animate({top:'0px',opacity:'1'},time,function(){
				if(callback){
					callback();
				}
				// trigger the show event
				$this.trigger('dialog:show');
			})
			$('body').css('overflow','hidden')
		}
		else if(option==='hide'||option==='cancel'||option==='ok'){
			this.animate({top:'100%',opacity:'0'},time,function(){
				$this.css({top:'-100%'});
				if(callback){
					callback();
				}
				//trigger the hide event
				$this.trigger("dialog:" + option);
				if(option!='hide'){
					$this.trigger("dialog:hide");
				}
			})
			$('body').css('overflow','auto')
		}
	};

	//dialog dom ctrl
	$('body').on('tap','[data-dialog]',function(e){
		var modalId = $(this).data('dialog'),
			action = $(this).data('action');
		if (modalId==''){
			modalId = "#" + $(this).closest(".dialog-overlay").attr("id");
		}	
		if (action==''||modalId==''|| modalId == undefined) {
			return false;
		}
		if(action==='show'){
			$(modalId).dialog('show');
		}
		else if(action==='hide'||action==='cancel'||action==='ok'){
			$(modalId).dialog(action);
		}
		else{
			console.log("dialog属性值错误");
		}
	});
})(Zepto);