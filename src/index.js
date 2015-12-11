define(function(require,exports,module){
var $ = jquery = require('./jquery-1.11.3');
/*------------------------------------------------------------------
initialize!!
------------------------------------------------------------------*/
$(function(){
	//调用公共函数类
	var publicFun = require('./public');
	
	//日历插件
	require('./calendar')($);
	if($(".stay-city").length>0){//选择城市目的地
		$(".stay-city").click(function(e){
			publicFun.showPlace(0,50,$(this),"citysDialog");
			$(this).addClass("stay-citys");
			e.stopPropagation();
		});
		$("#citysDialog .city-box span").click(function(){
			$(".stay-citys input").val($(this).text());
			$(".stay-citys").removeClass("stay-citys");
			$("#citysDialog").hide();
		});
	}
	if($(".choice-num").length>0){
		$(".choice-num").click(function(e){
			publicFun.showPlace(0,46,$(this),"choiceStayNum");
			e.stopPropagation();
		});
		$("#choiceStayNum dd").click(function(){
			$(".choice-num input").val($(this).text());
			$("#choice-num").hide();
		});
	}
	
	//点击清空输入框
	publicFun.clearInputvalue();
	//登录模块
	var login = require('./login');
	//短租公寓滑动模块
	var priceSlide = require('./price-slide');
	
	require('./jquery.easing.min')($); //缓动函数
	require('./focus-plugin')($); //焦点图插件集合
	if(document.getElementById('bannerSlider')){//首页焦点图
		$('#bannerSlider').slideshow(); 
		(function(){
			var bannerSlider=""
			$('#bannerSlider').hover(function() {
		    	clearInterval(bannerSlider);
			},function() {
				var obj=$("#bannerSlider").find(".slideNextBtn");
		    	bannerSlider = setInterval(function() {
		        	obj.trigger("click");
		    }, 3500);
			}).trigger("mouseleave");
		})()
	};

	if(document.getElementById('indexFoucs')){// 首页焦点图
		$('#indexFoucs').foucsShow(); 
	};
	
	if($(".section .support-items").length>0){
		//短租公寓配套设施浮层
		var shortRent = require('./short-rent');
	}
	//tab切换
	
	if($(".tab-box").length>0){
		$(".tab-box").tabPlugin();
	}
	if($(".tab-wrap").length>0){
		$(".tab-wrap").tabPlugins();
	}
	
	// 航班查询浮层
	var searchFlight = require('./search-flight');
	//个人中心
	var personal = require('./personal');
	

});


});

