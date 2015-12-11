define(function(require,exports,module){
var $ = jquery = require('./jquery-1.11.3');
var publicFun = require('./public');
var shortRent = window.shortRent || {};
$(function(){//短租公寓价格滑动模块
  
    $(".support-items li").mouseover(function(){
      var obj = $(this),txt = obj.attr("data-item");
      if(txt==""||txt==undefined){
        $("#supportDialog").hide();
      }else{
        publicFun.showPlace(0,30,$(this),"supportDialog");
        $("#supportDialog").find(".txt").text(txt);
      } 
    });
    $(".support-items li").mouseout(function(){
      $("#supportDialog").hide();
      $("#supportDialog").find(".txt").text("");
    });
    //访客评价百分比
    $(".guests-comment li").each(function(){
      var obj = $(this),pert = obj.attr("data-pert");
      obj.find(".pert").css({"width" : pert+"%"});
    });

    // 查看大图
    (function(){
      $(".photos img").click(function(){
        var imgObj = $(this),
        index = imgObj.index(),
        photoViewer = imgObj.parents("td").find(".photo-viewer")
        li = photoViewer.find("li");
        curtLi = li.eq(index),
        img = curtLi.find("img");
        $(".photos img").removeClass("curt");
        imgObj.addClass("curt");
        photoViewer.show();
        li.hide();
        img.attr("src",curtLi.attr("data-src"));
        curtLi.show();
      });
      $(".photo-viewer .next").click(function(e){
        var obj = $(this),
         td=obj.parents("td"),
        photos = td.children(".photos"),
        img = photos.children("img"),
        index = photos.children(".curt").index(),
        count = img.length,
        li = obj.parents(".photo-viewer").find("li");
        if(index==count-1){
          index = 0
        }else{
          index = index +1;
        }
        li.eq(index).find("img").attr("src",li.eq(index).attr("data-src"));
        img.removeClass("curt");
        img.eq(index).addClass("curt");
        li.hide();
        li.eq(index).show()
        e.stopPropagation();
      });
      $(".photo-viewer .pre").click(function(e){
        var obj = $(this),
         td=obj.parents("td"),
        photos = td.children(".photos"),
        img = photos.children("img"),
        index =photos.children(".curt").index(),
        count = img.length,
        li = obj.parents(".photo-viewer").find("li");
        if(index==0){
          index = parseInt(count)-1;
        }else{
          index = index-1;
        }
        li.eq(index).find("img").attr("src",li.eq(index).attr("data-src"));
        img.removeClass("curt");
        img.eq(index).addClass("curt");
        li.hide();
        li.eq(index).show();
        e.stopPropagation();
      });
      $(".photo-viewer").click(function(e){
        $(this).hide();
         e.stopPropagation();
      });
    })()
    
    
})
module.exports = shortRent;
});

