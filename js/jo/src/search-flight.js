define(function(require,exports,module){
var $ = jQuery = require('jquery');
var publicFun = require('./public');
var searchFlight = window.searchFlight || {};
$(function(){//航班查询
  
 if($(".serch-wrap").length>0){
    $(".close-float").click(function(){
      $("#searchDialog").hide();
      $(".mask").hide();
      $(".i-plane-box").removeClass("i-plane-box");
      $("#searchDialog .search-wrap").show();
      $("#searchDialog .result-wrap").hide();
    });
    $("#searchDialog .sub-btn").click(function(){//点击提交搜索
      $("#searchDialog .search-wrap").hide();
      $("#searchDialog .result-wrap").show();
    });
    $("#searchDialog .ok-btn").click(function(){//点击提交搜索
      $("#searchDialog").hide();
      $(".mask").hide();
      $(".i-plane-box").addClass("choice-result");
      $(".i-plane-box").html('<table><tr><td width="20%" align="center">航班</td><td width="50%"><span>MU8665</span>北京-巴黎<br><span class="red">到达时间</span>2015-11-12 05:50<br><span  class="red">到达机场</span>巴黎戴高乐机场</td><td width="30%" align="right"><img src="../static/images/ju29.jpg" alt="" class="change-flight"></td></tr></table>');
      $(".i-plane-box").parent("ul").find(".sub-btn").parent("li").addClass("mt20");
      $(".i-plane-box").removeClass("i-plane-box");
      $("#searchDialog .search-wrap").show();
      $("#searchDialog .result-wrap").hide();

    });
    $(".i-plane").click(function(e){
      $(this).parent("li").addClass("i-plane-box")
      publicFun.showDialog("searchDialog");
      $(this).addClass("i-times");
      e.stopPropagation();
    });
    $("body").on("click",".choice-result .change-flight",function(e){
      $(this).parents("li").addClass("i-plane-box")
      publicFun.showDialog("searchDialog");
      $(this).addClass("i-times");
      e.stopPropagation();
    });
  }

  //更多服务 时间选择浮层
  if($(".i-time").length>0){
    $(".i-time").click(function(e){
      publicFun.showPlace(0,46,$(this),"timeDialog");
      $(this).addClass("i-times");
      e.stopPropagation();
    });
    $("#timeDialog dd").click(function(){
      $(".i-times input").val($(this).text());
      $(".i-times").removeClass("i-times");
      $("#timeDialog").hide();
    });
  }

});
module.exports = searchFlight;
});

