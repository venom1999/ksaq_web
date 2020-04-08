$(function(){
	//回到顶端
	var backtop = $('.backtop');
	$(backtop).hide();
	$(window).scroll(function(){
		if ($(window).scrollTop()>100) {
			$(backtop).fadeIn(1500);
		}
		else{
			$(backtop).fadeOut();
		};
	});
	$(".backtop").on('click',function(){
		document.documentElement.scrollTop=0; 
		document.body.scrollTop=0; 
		console.log('backtop')
	});
	// 关联显示
//	var navli = $('.nav-li');
//	var relateDiv = $('.main-content');
//	console.log(relateDiv.length);
//	console.log(navli.length);
//	for (var i=0;i<navli.length;i++){
//		navli[i].index = i;
//		navli[i].onclick = function(){
//			for (var j=0;j<relateDiv.length;j++){
//			relateDiv[j].style.display = 'none';
//			relateDiv[this.index].style.display = 'block';
//		   }
//	    }
//	}
  $('.nav-li span').click(function(){
		
		$('.nav-li span').removeClass('underline-span');
		$(this).addClass('underline-span');
	});
	//导航toggle
	$('.toggle-ul').click(function () {
	    $(this).next('ul').toggle();
	    var child_span = $(this).children('span');
	    if ($(child_span).hasClass('glyphicon glyphicon-chevron-down')) {
	        $(child_span).removeClass('glyphicon glyphicon-chevron-down');
	        $((child_span)).addClass('glyphicon glyphicon-chevron-right');
	    } else {
	        $(child_span).removeClass('glyphicon glyphicon-chevron-right');
	        $(child_span).addClass('glyphicon glyphicon-chevron-down');
	    }
	});

	$("#openMore").mouseover(function () {
	    $("#openMoreModal").show();
	  
	});
	$("#openMore").mouseout(function () {
	    $("#openMoreModal").hide();
	});
	//滑过或点击切换显示效果
	// $('.change-style').on('mouseover',function(){
	// 	$('.change-style').removeClass('hovercur');
	// 	$(this).addClass('hovercur');
	// });
	// $('.change-style').on('click',function(){
	// 	$('.change-style').removeClass('clickcur');
	// 	$(this).addClass('clickcur');
	// });
	// $('.left-nav').on('mouseout',function(){
	// 	$('.change-style').removeClass('hovercur');
	// })
});
