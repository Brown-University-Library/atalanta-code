$(document).ready(function(){
	$('.toc').on('mouseenter', function(){
		$('.toc-wrapper').css('background-color', 'hsla(283, 100%, 50%, .5)');
		$('body').css('overflow', 'hidden');
	});
	$('.toc').on('mouseleave', function(){
		$('.toc-wrapper').css('background-color', 'hsla(183, 100%, 50%, .5)');
		$('body').css('overflow', 'visible');
	});
	$('.toc-wrapper').click(function() {
		$(this).css('display', 'none');
	})
	$('.my-trigger').click(function() {
		console.log("the menu is sliding in");
		$('.toc-wrapper').css('display', 'block');
		$('.toc-wrapper').addClass('move-in');
		$('.toc-wrapper').removeClass('move-out');
	});
	$('.edition').click(function() {
		console.log("the menu is sliding out");
		$('.toc-wrapper').css('display', 'none');
		$('.toc-wrapper').addClass('move-out');
		$('.toc-wrapper').removeClass('move-in');
	});
})