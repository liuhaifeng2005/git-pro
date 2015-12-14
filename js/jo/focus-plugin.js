/*
*焦点图插件 by lhf
*2015.03.5
*
*/
define(function(require,exports,module){

return function(jquery){
    (function($) {
        $.fn.pri= function() {
        console.log($("a").attr("href"));
        // 代码区域。
        };
        $.fn.pri3= function() {
        console.log("这是另外一个插件pri3");
        // 代码区域。
        };
        //焦点图插件
        $.fn.foucsFn = function(){
            return this.each(function(){
                var $wrap = $(this),
                $pre=$wrap.find('.pre'),
                $next=$wrap.find('.next'),
                $imgWrap = $wrap.find('.LY-FCS-IMGS'),  // 大图容器ul
                imgLis = $wrap.find('.LY-FCS-IMGS').get(0).getElementsByTagName('li'),  // 大图容器li
                index = 0,  // 当前显示的索引
                maxIndex = imgLis.length-1,
                beforeNodeIndex = 2,  // 第一个图片
                afterNodeIndex = 0,  // 最后一个图片
                timer = false,  // 自动切换的计数器
                interval = 5000, // 设置切换的时间间隔
                $as = $wrap.find('.LY-FCS-IMGS li'),
                $w = $as.width(),
                $h = $as.height(),
                strLI="";
                for(i=1;i<=imgLis.length;i++){
                    strLI+='<li class="transitionAll">'+i+'</li>'
                }
                $wrap.find('.LY-FCS-BTNS').html(strLI);
                
                var $btns = $wrap.find('.LY-FCS-BTNS li'); // 切换的按钮
                if(!$as.length)return;
                var $fstLink = $as.eq(0).find("a"); 
                var $a = $('<a href="javascript:;" class="fstLink"><a/>').insertBefore($wrap.find('.banner div:first'))
                .attr('href', $fstLink.attr('href')).attr('title',$fstLink.attr('title')).attr('target',$fstLink.attr('target'));  
                if( $a.attr('href').indexOf('javascript:void(0)')>-1 ){
                    $a.css('cursor','default');
                }else{
                    $a.css('cursor','pointer');
                }
                // 开始的时候需要在首尾插入两张图片，所以宽度是lengt+2
                 $imgWrap.css({width:(imgLis.length+2)*$w});
                // 根据当前的图片数量设置在首尾插入不同的图片
                if( imgLis.length == 0 ){
                    return;
                }else if( imgLis.length == 1 ){
                beforeNodeIndex = afterNodeIndex = 0;
                }else if( imgLis.length == 2 ){
                    beforeNodeIndex = 1;
                    afterNodeIndex = 0;
                }else if( imgLis.length == 3 ){
                    beforeNodeIndex = 2;
                    afterNodeIndex = 0;
                }else if( imgLis.length == 4 ){
                    beforeNodeIndex = 3;
                    afterNodeIndex = 0;
                }else if( imgLis.length == 5){
                    beforeNodeIndex = 4;
                    afterNodeIndex = 0;
                }
                // 在首尾插入图片
                $imgWrap.get(0).appendChild( imgLis[afterNodeIndex].cloneNode(true) );
                $imgWrap.get(0).insertBefore( imgLis[beforeNodeIndex].cloneNode(true), imgLis[0] );
                // 移除按钮上的高亮样式并给当前显示的图片按钮加高亮
                $btns.removeClass('click').eq(index).addClass('click');
                // 执行图片切换
                var slideTo = function(i){
                    if(i > maxIndex){
                        i = 0;
                    };
                    if(i < 0){
                     i = maxIndex;
                    };
                    if(i==index)return;
                    $btns.eq( index ).removeClass( 'click' ); 
                    index = i; 
                    $imgWrap.animate( {left : -(index+1) * $w + 'px'} ,{easing: 'easeInOutQuad', duration:500});   
                    $btns.eq( index ).addClass( 'click' );
                    var $lk = $as.eq(index).find("a");
                    $a.attr('href', $lk.attr('href')).attr('title',$lk.attr('title')).attr('target',$lk.attr('target'));
                    if( $a.attr('href').indexOf('javascript:void(0)')>-1 ){
                        $a.css('cursor','default');
                    }else{
                        $a.css('cursor','pointer');
                    }
                }
                timer = setInterval(function(){ 
                    slideTo((index+1)%imgLis.length);
                }, interval);
                // 按钮点击事件
                $btns.each(function(i){             
                    $(this).click(function(){
                    if( index == i )return;
                    if( $imgWrap.is(":animated") )return;
                    clearInterval(timer);
                    slideTo(i);
                    timer = setInterval(function(){  
                        slideTo((index+1)%imgLis.length);
                    }, interval);
                    }); 
                });
                $pre.click(function(){
                    var i =$btns.index($wrap.find(".click"));
                    if( i == 0 ){
                        i=5;    
                    };
                    if( $imgWrap.is(":animated") )return;
                    clearInterval(timer);
                    slideTo(i-1);
                    timer = setInterval(function(){  
                        slideTo((index+1)%imgLis.length);
                    }, interval);
                }); 
                $next.click(function(){
                    var i =$btns.index($wrap.find(".click"));
                    if( i == 4 ){
                        i=-1;   
                    }
                    if( $imgWrap.is(":animated") )return;
                    clearInterval(timer);
                    slideTo(i+1);
                    timer = setInterval(function(){  
                        slideTo((index+1)%imgLis.length);
                    }, interval);
                }); 
                $a.hover(function(){
                    clearInterval(timer);
                }, function(){
                    timer = setInterval(function(){ 
                    slideTo((index+1)%imgLis.length);
                }, interval);
                });
            })
        };

         //横向切换焦点图插件
        $.fn.slideshow = function(){
            return this.each(function(){
                var currentIndex = 0,
                $currentDom = $(this),
                $slideContent,
                $currentItem,
                totalCount=$currentDom.find(".slideItem").length,   //总li个数
                animateDuration = 400,
                lf=$currentDom.find(".slideItem").width(),
                slideShowing = false;
                var init = function(){
                    $slideContent = $currentDom.children(".slideshowContent");
                    for (i=0; i <totalCount; i++) {
                        $slideContent.children(".slideItem").eq(i).attr("data-index",i);
                        if (i == 0) {
                            $currentDom.find(".slideTriggerList").append('<li class="slideTriggerItem fL curt" data-index="'+i+'"></li>');
                        } else {
                            $currentDom.find(".slideTriggerList").append('<li class="slideTriggerItem fL" data-index="'+i+'"></li>');
                        }
                    };
                    $currentItem = $slideContent.children(".slideItem[data-index="+currentIndex+"]").css("z-index", "1");
                    $currentDom.find(".slideNextBtn").click(function(){
                        nextPage();
                    });
                    $currentDom.find(".slidePrevBtn").click(function(){
                       prevPage();
                    });
                    $currentDom.find(".slideTriggerItem").click(function(){
                        if(!$(this).hasClass("curt")){
                            turnToPage(parseInt($(this).attr("data-index")));
                        }
                    });         
                };
                //下一页
                var nextPage = function() {
                    var currentIndex = getCurrentIndex();
                    if (currentIndex<totalCount-1) {
                        turnToPage(currentIndex+1);
                    } else {
                        turnToPage(0);
                    }
                };
                //上一页
                var prevPage = function(){
                    var currentIndex = getCurrentIndex();
                    if (currentIndex>0) {
                        turnToPage(currentIndex-1);
                    } else {
                        turnToPage(totalCount-1);
                    }
                };
                //转到特定页
                var turnToPage = function(pageIndex){
                    var currentIndex = getCurrentIndex();
                    $slideContent.children(".slideItem").css("z-index","0");
                    $currentItem.css("z-index", "1");
                    var turnNext = pageIndex>currentIndex?true:false;
                    if(pageIndex==0&&currentIndex==totalCount-1){
                        turnNext =true;
                    }
                    if(currentIndex<1&&pageIndex==totalCount-1){
                        turnNext =false
                    }
                    currentIndex = pageIndex;
                    if (turnNext) {
                        $currentItem.stop(true,true).animate({"left": -lf}, {easing: 'easeInOutQuad', duration:animateDuration});
                        $currentItem = $slideContent.children(".slideItem[data-index="+currentIndex+"]");
                        $currentItem.css("z-index", "1");
                        $currentItem.css("left", lf).stop(true,true).animate({"left": "0px"}, {easing: 'easeInOutQuad', duration:animateDuration});
                    } else {
                        $currentItem.stop(true,true).animate({"left": lf}, {easing: 'easeInOutQuad', duration:animateDuration});
                        $currentItem = $slideContent.children(".slideItem[data-index="+currentIndex+"]");
                        $currentItem.css("z-index", "1");
                        $currentItem.css("left", -lf).stop(true,true).animate({"left": "0px"}, {easing: 'easeInOutQuad', duration:animateDuration});
                    }
                    $currentDom.find(".slideTriggerItem").removeClass("curt");
                    $currentDom.find(".slideTriggerItem").eq(currentIndex).addClass("curt");  
                };
                var getCurrentIndex = function(){
                   var currentIndex =  $currentDom.find(".slideTriggerList").children("li").index($currentDom.find(".curt"));
                    return currentIndex;
                };
                init();          
            })
        };      

        //原位不动焦点图切换插件
        $.fn.foucsShow = function(){
            return this.each(function(){
                var currentIndex = 0,
                $currentDom = $(this),
                $slideContent = $currentDom.find(".banner-items"),
                $slideBtnList = $currentDom.find(".focus-btn"),
                $slideContentLi = $slideContent.children("li"),
                totalCount=$slideContentLi.length,   //总li个数
                $slideBtn,
                timer,
                animateDuration = 400,
                interval = 5000;
                var init = function(){
                    $slideContent.children("li").eq(currentIndex).show();
                    $slideContent.children("li").eq(currentIndex).css("z-index","1");
                    var str="";
                    for (i=0; i <totalCount; i++) {
                        if(i==0){
                            str+= '<li class="curt">0</li>';
                        }else{
                            str+= '<li>'+i+'</li>'
                        }  
                    };
                    $slideBtnList.html(str);
                    $slideBtn = $slideBtnList.children("li"); 
                    $slideContent.css('height',$slideContentLi.find("img").height()+'px'); 
                };
                init();  
                //得到当前页面
               var getCurrentIndex = function(){
                   var currentIndex = $slideBtn.index($slideBtnList.find(".curt"));
                    return currentIndex;
                };
                //转到特定页
                var turnToPage = function(pageIndex){
                    $slideBtn.removeClass("curt");
                    $slideBtn.eq(pageIndex).addClass("curt");
                    $slideContentLi.css("z-index", "0");
                    $slideContentLi.eq(pageIndex).css("z-index", "1");
                    $slideContentLi.hide();

                    if(pageIndex+1==totalCount){
                         $slideContentLi.eq(0).show();
                    }else{
                        $slideContentLi.eq(pageIndex-1).show();
                    }
                    $slideContentLi.eq(pageIndex).fadeIn(200);
                };
               timer  = setInterval(function(){
                    var  pageIndex = getCurrentIndex();
                    if(pageIndex+1>=totalCount){
                        turnToPage(0);
                    }else{
                        turnToPage(pageIndex+1);
                    }
                }, interval);

                $currentDom.hover(function(){
                    clearInterval(timer);
                },function(){
                    timer  = setInterval(function(){
                    var  pageIndex = getCurrentIndex();
                    if(pageIndex+1>=totalCount){
                        turnToPage(0);
                    }else{
                        turnToPage(pageIndex+1);
                    }
                }, interval);
                })
                $slideBtn.on("click",function(){
                    if(!$(this).hasClass("curt")){
                        $slideBtn.removeClass("curt");
                        $(this).addClass("curt");
                        var pageIndex = getCurrentIndex();
                        turnToPage(pageIndex);
                    }
                    
                })
            })
        };

        //上下滚动焦点图插件
        $.fn.scrollerShow = function(){
            return this.each(function(){
                var $currentDom = $(this),
                $scrollerNav = $currentDom.find(".carousel_nav"),
                $scrollerLi = $scrollerNav.children("li"),
                $scrollerCon = $currentDom.find(".carousel_con"),
                animateDuration = 500;
                //转到特定页
                $scrollerLi.mouseover(function(){
                    var currentIndex = $(this).index();
                    $(this).parent(".carousel_nav").next().stop(false,false).animate({"top": -currentIndex*496},animateDuration);
                });
            })
        };

        //tab切换
        $.fn.tabPlugin = function(){
            return this.each(function(){
                var obj = $(this),
                tabTit = obj.find(".tab-tit-items").children(".tab-tit-item"),
                tabcont=obj.find(".tab-con");
                var init = function(){
                    tabTit.eq(0).addClass("current");
                    tabcont.eq(0).addClass("show");
                }
                tabTit.click(function(){
                    var index = $(this).index();
                    $(this).parents(".tab-tit-items").children(".tab-tit-item").removeClass("current");
                    $(this).addClass("current");
                    $(this).parents(".tab-box").find(".tab-con").removeClass("show");
                    $(this).parents(".tab-box").find(".tab-con").eq(index).addClass("show");
                });
                init();
            })  
        };
        //tab切换
        $.fn.tabPlugins = function(){
            return this.each(function(){
                var obj = $(this),
                tabTit = obj.find(".tab-tits").children(".tab-tit"),
                tabcont=obj.find(".tab-cont");
                var init = function(){
                    tabTit.eq(0).addClass("current");
                    tabcont.eq(0).addClass("show");
                }
                tabTit.click(function(){
                    var index = $(".tab-tit").index($(this));
                    $(this).parents(".tab-tits").children(".tab-tit").removeClass("current");
                    $(this).addClass("current");
                    $(this).parents(".tab-wrap").find(".tab-cont").removeClass("show");
                    $(this).parents(".tab-wrap").find(".tab-cont").eq(index).addClass("show");
                });
                init();
            })  
        };
        //商品详情也焦点图
        $.fn.proPreview = function(){
            return this.each(function(){
                var obj = $(this),
                ul = obj.children(".pro_thumb"),
                li=ul.children("li"),
                img = obj.children(".pro_main_pic").children("img");
                var init = function(){
                    img.attr("src",li.eq(0).children("img").attr("data-src"));
                    li.eq(0).addClass("selected");
                }
                li.mouseover(function(){
                    var index = $(this).index();
                    $(this).parent("ul").children("li").removeClass("selected");
                    $(this).addClass("selected");
                    img.attr("src",li.eq(index).children("img").attr("data-src"));
                });
                init();
            })  
        };


    })(jquery);
}
 
 });

    

    
