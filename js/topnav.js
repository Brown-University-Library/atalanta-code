$(function () { 	
	$('.toc').on('mouseenter', function(){
		$('.toc-wrapper').css('background-color', 'hsla(0, 0%, 10%, .8)');
		$('body').css('overflow', 'hidden');
	});
	$('.toc').on('mouseleave', function(){
		$('.toc-wrapper').css('background-color', 'hsla(0, 0%, 90%, .3)');
		$('body').css('overflow', 'visible');
	});
	$('.toc-wrapper').click(function() {
		$(this).css('display', 'none');
	})
	$('.my-trigger').click(function() {
		$('.toc-wrapper').css('display', 'block');
		$('.toc-wrapper').addClass('move-in');
		$('.toc-wrapper').removeClass('move-out');
	});
	$('.toc__items').click(function() {
		$('.toc-wrapper').css('display', 'none');
		$('.toc-wrapper').addClass('move-out');
		$('.toc-wrapper').removeClass('move-in');
	});
});