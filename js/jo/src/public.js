define(function(require,exports,module){
var $ = jQuery = require('jquery');
var jo = window.jo || {};
// 延迟加载列表数组
jo.lazyDataArray = [];
//顶通搜索条数组
jo.searchDataArray = [];
// 返回页面卷起高度
jo.getScrollTop = function () {
	return (document.body.scrollTop ? document.body.scrollTop : document.documentElement.scrollTop) || 0; 
};
// 获取客户端可视范围
jo.getClientSize = function() {
	if(window.innerHeight) {
		return {
			width: window.innerWidth,
			height: window.innerHeight
		}
	} else {
		if(document.documentElement && document.documentElement.clientHeight) {
			return {
				width: document.documentElement.clientWidth,
				height: document.documentElement.clientHeight
			}
		} else {
			return {
				width: document.body.clientWidth,
				height: document.body.clientHeight
			}
		}
	}
}
// 平滑滚动
jo.pageSlide = function(obj, gap, time) {
	var h = $("#" + obj).offset().top - gap;
	$("body, html").stop(true, true).animate({"scrollTop": h}, time);
}
//tab切换
jo.tabContent = function(obj){

	var tabTit = obj.children(".tab_tit").children("li");
	var tabcont=obj.children(".tabcont");
	tabTit.click(function(){
		var index = tabTit.index(this);
		TabSelect(index);
	});
	function TabSelect(index){
		tabTit.removeClass("current");
		tabcont.removeClass("show");
		tabTit.eq(index).addClass("current");
		tabcont.eq(index).addClass("show");
	}
	var init = function(){
		tabTit.eq(0).addClass("current");
		tabcont.eq(0).addClass("show");
	}
	init();
}
// 初始化函数
jo.pageInit = function() {
	// 记录每一个延迟加载模块高度
	var lazyImgLength = $(".lazy_box").length;
	for(var i = 0; i < lazyImgLength; i++) {
		jo.lazyDataArray.push($(".lazy_box").eq(i).offset().top);
	}
	if(document.getElementById('siteHeader')){
		jo.searchDataArray.push($("#siteHeader").offset().top);
	}
	
}
// 页面滚动
jo.scrollFix = function() {
	//页面懒加载
	for(var i = 0; i < jo.lazyDataArray.length; i++) {
		if(jo.lazyDataArray[i] <= (jo.getScrollTop())+jo.getClientSize().height-200) {
			for (var j = 0; j < $(".lazy_box").eq(i).find(".lazy_img").length; j++) {
				$(".lazy_box").eq(i).find(".lazy_img").eq(j).attr("src",$(".lazy_box").eq(i).find(".lazy_img").eq(j).attr("data_src"));
			};
		}
	}
	//顶通搜索条滚动效果
	/*if(document.getElementById('siteHeader')){
		if(jo.searchDataArray[0] <= (jo.getScrollTop())+jo.getClientSize().height){
			$("#siteHeader").addClass("site_header_fixed");
			console.log(jo.searchDataArray[0]+"+---+"+(jo.getScrollTop()+jo.getClientSize().height)+"++++++");
		}else{
			$("#siteHeader").removeClass("site_header_fixed");
			console.log("****************");
		}
	}*/
	if(document.getElementById('siteHeader')){
		if(jo.searchDataArray[0] <= jo.getScrollTop()){
			$("#siteHeader").addClass("site_header_fixed");
		}else{
			$("#siteHeader").removeClass("site_header_fixed");
		}
	}
}


//输入框清空
jo.clearInputvalue = function(){
	var val= "";
	$(".clear_input").focus(function(){
		val = $(this).val();
		$(this).val("");
	});
	$(".clear_input").blur(function(){
		if($(this).val()==""){
			$(this).val(val);
		}
	});
}

//对话框中央位置
/*jo.showDialog = function(objC){
	var objW = $(window); 
	var brsW = objW.width();
	var brsH = objW.height();
	var sclL = objW.scrollLeft();
	var sclT = objW.scrollTop();
	var curW = objC.width();
	var curH = objC.height();
	var left = sclL + (brsW - curW) / 2;
	var top = sclT + (brsH - curH) / 2;
	objC.css({ "left": left, "top": top });
	objC.show();
}*/

jo.showDialog=function(elem){
	var obj = $("#"+elem);
	console.log($(window).width()+"---"+obj.width())
    obj.css({ 
        top: ($(window).height() - obj.height())/2,
        left: ($(window).width() - obj.width())/2
    });
    obj.show();
    $(".mask").show();
}


// 对话框相对元素位置 偏移l=left t= top 
jo.showPlace = function(l,t,obj,elem){
	var wzs=document.getElementById(elem);
    var lt=0, tp=0;
    lt+=obj.offset().left;
	tp += obj.offset().top;
	wzs.style.display="block";	
	wzs.style.left=lt-l+"px";
	wzs.style.top=tp+t+"px";		
}
// 对话框相对元素位置 偏移l=left t= top 
jo.close_place = function(obj){
	if(obj.hasClass("hc")){
		obj.removeClass("hc");
	}else{
		obj.hide();
	}		
}
$(function(){
	$(".close-btn").click(function(){
		$(".mask").hide();
		$(".float-box").hide();
	});
	$(".mask").click(function(){
		$(".mask").hide();
		$(".float-box").hide();
	});
});
$(document).on("click",function(e){
	var target  = $(e.target);
	if(target.closest("#citysDialog").length == 0){
		$("#citysDialog").hide();
	};

	$("#choiceStayNum").hide();
	$("#timeDialog").hide();
	//$("#citysDialog").hide();
	$("#supportDialog").hide();

	if(target.closest(".select-box").length == 0){
		$(".select-box").removeClass("show");
	};
	
	if(target.closest("#setUserFloat").length == 0){
		$("#setUserFloat").hide();
	};

	e.stopPropagation();
});




module.exports = jo;

});