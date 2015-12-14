define(function(require,exports,module){
var $ = jQuery = require('jquery');
var login = window.login || {};
$(function(){//首页导航
	var publicFun = require('./public');
	$(".tools-item .login-btn").click(function(){//登录弹窗
		publicFun.showDialog("loginDialog");
		$("#loginDialog").find(".reg-box").removeClass("show");
		$("#loginDialog").find(".login-box").addClass("show");
		$("#loginDialog").find(".hd").children("li").removeClass("curt");
		$("#loginDialog").find(".hd").children("li").eq(1).addClass("curt");
	});
	$(".tools-item .regist-btn").click(function(){//登录弹窗
		publicFun.showDialog("loginDialog");
		$("#loginDialog").find(".login-box").removeClass("show");
		$("#loginDialog").find(".reg-box").addClass("show");
		$("#loginDialog").find(".hd").children("li").removeClass("curt");
		$("#loginDialog").find(".hd").children("li").eq(0).addClass("curt");
	});
	$("#loginDialog").find(".hd").children("li").click(function(){
		var index = $(this).index();
		$("#loginDialog").find(".hd").children("li").removeClass("curt");
		$(this).addClass("curt");
		if(index==0){
			$("#loginDialog").find(".login-box").removeClass("show");
			$("#loginDialog").find(".reg-box").addClass("show");
		}else{
			$("#loginDialog").find(".reg-box").removeClass("show");
			$("#loginDialog").find(".login-box").addClass("show");
		}
	});

	$(".nav .set-user").click(function(e){
		publicFun.showPlace(-35,104,$(this),"setUserFloat");
		e.stopPropagation();
	});
	$("#setUserFloat a").click(function(){
		$("#setUserFloat").hide();
	});

})
module.exports = login;
});

