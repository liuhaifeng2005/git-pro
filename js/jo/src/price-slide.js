define(function(require,exports,module){
var $ = jQuery = require('jquery');
require('./jquery-ui.min')($);
var priceSlide = window.priceSlide || {};
$(function(){//短租公寓价格滑动模块
	$( "#slider-range" ).slider({
      range: true,
      min: 100,
      max: 500,
      values: [ 120, 500 ],
      slide: function( event, ui ) {
      	if(ui.values[ 1 ]==500){
      		 $( "#priceNum" ).text( ui.values[ 0 ] +
      "以上" );
      	}else{
      		$( "#priceNum" ).text( "$" + ui.values[ 0 ] + " - $" + ui.values[ 1 ] );
      	}
      }
    });
    $( "#priceNum" ).text("$"+ $( "#slider-range" ).slider( "values", 0 ) +
      "以上" );
    
})
module.exports = priceSlide;
});

