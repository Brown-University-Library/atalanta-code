$(function () {
/* VARIABLES */
	var hamburgerMenuBtn = 'nav.topnav button';
	var hamburgerMenuBtnClosed = 'topnav__hamburger--closed';
	var hamburgerMenuBtnOpen = 'topnav__hamburger--open';
	var hamburgerMenu = '.topnav > ul';
	var $documentElement = $('html, body'),
		$wrapper = $('.main'),
		scrollTop;

/* EVENTS */
	/* topnav mobile menu */
	$(hamburgerMenuBtn).click(function() {
		if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnClosed)) {
			$(hamburgerMenuBtn).removeClass('topnav__hamburger--closed');
			$(hamburgerMenuBtn).addClass('topnav__hamburger--open');
			$(hamburgerMenu).removeClass('topnav--slide-out');
			$(hamburgerMenu).addClass('topnav--slide-in');
		}
		else if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnOpen)) {
			$(hamburgerMenuBtn).removeClass('topnav__hamburger--open');
			$(hamburgerMenuBtn).addClass('topnav__hamburger--closed');
			$(hamburgerMenu).removeClass('topnav--slide-in');
			$(hamburgerMenu).addClass('topnav--slide-out');
		}
		else {
			console.log("THE HAMBURGER MENU HAS NO CLASS");
		}
	});

	/* search topnav button and search bar submit */
	$('.topnav__search button').click(function(event) {
		if( $('.topnav__search button').hasClass('topnav__search--closed') ) {
			$('.topnav__search button').removeClass('topnav__search--closed');
			$('.topnav__search button').addClass('topnav__search--open');
	$('div.search__modal').attr('aria-hidden', 'false');
			$('div.search__modal').addClass('search__modal--slide-in');
			$('div.search__modal').removeClass('search__modal--slide-out');
			$('body').addClass('no-scroll');
			console.log("I am opening the search bar");
			lockBody();
		}
		else if( $('.topnav__search button').hasClass('topnav__search--open') ) {
			console.log("The search bar is already closed");
			$('.topnav__search button').removeClass('topnav__search--open');
			$('.topnav__search button').addClass('topnav__search--closed');
	$('div.search__modal').attr('aria-hidden', 'true');
			$('div.search__modal').addClass('search__modal--slide-out');
			$('div.search__modal').removeClass('search__modal--slide-in');
			$('body').removeClass('no-scroll');
			unlockBody();
		}
		else {
			console.log("THE SEARCH BUTTON HAS NO STATE");
		}
		event.preventDefault();
	});
	$('button.x-close > svg').click(function(e) {
		e.stopPropagation();
		e.preventDefault();
	});
	$('button.x-close').click(function() {
		console.log("I am clicking the search close button");
		$('.topnav__search button').removeClass('topnav__search--open');
		$('.topnav__search button').addClass('topnav__search--closed');
$('div.search__modal').attr('aria-hidden', 'true');
		$('div.search__modal').addClass('search__modal--slide-out');
		$('div.search__modal').removeClass('search__modal--slide-in');
		$('body').removeClass('no-scroll');
		unlockBody();
	});
	$('input:text').focus(function() {
		$(this).val('');
	});
	$(document).keydown(function(event) {
		if(event.keyCode == 27) {
			$('.topnav__search button').removeClass('topnav__search--open');
			$('.topnav__search button').addClass('topnav__search--closed');
$('div.search__modal').attr('aria-hidden', 'true');
			$('div.search__modal').addClass('search__modal--slide-out');
			$('div.search__modal').removeClass('search__modal--slide-in');
			$('body').removeClass('no-scroll');
			unlockBody();
		}
	});

/* FUNCTIONS */
	/* prevent body scroll behind modal on iOS */
	/* https://codepen.io/jerrylow/pen/yJeyoG */
	function lockBody() {
		if(window.pageYOffset) {
			scrollTop = window.pageYOffset;
			$wrapper.css({
				top: - (scrollTop)
			});
		}
		$documentElement.css({
			height: "100%",
			overflow: "hidden"
		});
	}
	function unlockBody() {
		$documentElement.css({
			height: "",
			overflow: ""
		});
		$wrapper.css({
			top: ""
		});
		window.scrollTo(0, scrollTop);
		window.setTimeout(function() {
			scrollTop = null;
		}, 0);
	}
});