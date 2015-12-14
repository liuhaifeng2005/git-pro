define(function(require,exports,module){
var $ = jQuery = require('jquery');
var publicFun = require('./public');
var personal = window.personal || {};
$(function(){
  
    $(".tools .del").click(function(){//删除按钮
      $(this).parents("li").remove();
    });
    // 选择下拉框
    $(".select-label").click(function(e){
      var obj = $(this),selectBox = obj.find(".select-box");
      if(!selectBox.hasClass("show")){
        selectBox.addClass("show");
        e.stopPropagation();
      }
    });
    $(".select-box li").click(function(e){
      var obj = $(this);
      obj.parents(".select-label").children("span").text(obj.text());
      obj.parents(".select-box").removeClass("show");
      e.stopPropagation();
    });
    
})
module.exports = personal;
});

