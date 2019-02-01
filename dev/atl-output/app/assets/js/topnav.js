$(function () {
/* VARIABLES */
	var hamburgerMenuBtn = 'nav.topnav button';
	var hamburgerMenuBtnClosed = 'topnav__hamburger--closed';
	var hamburgerMenuBtnOpen = 'topnav__hamburger--open';
	var hamburgerMenu = '.topnav > ul';
	var animationMenuSlideIn = 'topnav--slide-in';
	var animationMenuSlideOut = 'topnav--slide-out';
	var topnavSearchBtn = '.topnav__search button';
	var searchModalOpen = 'topnav__search--open';
	var searchModalClosed = 'topnav__search--closed';
	var searchModal = 'div.search__modal';
	var animationSearchSlideIn = 'search__modal--slide-in';
	var animationSearchSlideOut = 'search__modal--slide-out';
	var xCloseBtn = 'button.x-close';
	var xCloseBtnSVG = 'button.x-close > svg';
	var $documentElement = $('html, body'),
		$wrapper = $('.main'),
		scrollTop;

/* EVENTS */
	/* topnav mobile menu */
	$(hamburgerMenuBtn).click(function() {
		if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnClosed)) {
			$(hamburgerMenuBtn).removeClass(hamburgerMenuBtnClosed);
			$(hamburgerMenuBtn).addClass(hamburgerMenuBtnOpen);
			$(hamburgerMenu).removeClass(animationMenuSlideOut);
			$(hamburgerMenu).addClass(animationMenuSlideIn);
		}
		else if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnOpen)) {
			$(hamburgerMenuBtn).removeClass(hamburgerMenuBtnOpen);
			$(hamburgerMenuBtn).addClass(hamburgerMenuBtnClosed);
			$(hamburgerMenu).removeClass(animationMenuSlideIn);
			$(hamburgerMenu).addClass(animationMenuSlideOut);
		}
		else {
			console.log("THE HAMBURGER MENU HAS NO CLASS");
		}
	});

	/* search topnav button and search bar submit */
	$(topnavSearchBtn).click(function(event) {
		if( $(topnavSearchBtn).hasClass(searchModalClosed) ) {
			$(topnavSearchBtn).removeClass(searchModalClosed);
			$(topnavSearchBtn).addClass(searchModalOpen);
			$(searchModal).attr('aria-hidden', 'false');
			$(searchModal).addClass(animationSearchSlideIn);
			$(searchModal).removeClass(animationSearchSlideOut);
			$('body').addClass('no-scroll');
			lockBody();
		}
		else if( $(topnavSearchBtn).hasClass(searchModalOpen) ) {
			$(topnavSearchBtn).removeClass(searchModalOpen);
			$(topnavSearchBtn).addClass(searchModalClosed);
			$(searchModal).attr('aria-hidden', 'true');
			$(searchModal).addClass(animationSearchSlideOut);
			$(searchModal).removeClass(animationSearchSlideIn);
			$('body').removeClass('no-scroll');
			unlockBody();
		}
		else {
			console.log("THE SEARCH BUTTON HAS NO STATE");
		}
		event.preventDefault();
	});
	$(xCloseBtnSVG).click(function(e) {
		e.stopPropagation();
		e.preventDefault();
	});
	$(xCloseBtn).click(function() {
		console.log("I am clicking the search close button");
		$(topnavSearchBtn).removeClass(searchModalOpen);
		$(topnavSearchBtn).addClass(searchModalClosed);
		$(searchModal).attr('aria-hidden', 'true');
		$(searchModal).addClass(animationSearchSlideOut);
		$(searchModal).removeClass(animationSearchSlideIn);
		$('body').removeClass('no-scroll');
		unlockBody();
	});
	$('input:text').focus(function() {
		$(this).val('');
	});
	$(document).keydown(function(event) {
		if(event.keyCode == 27) {
			$(topnavSearchBtn).removeClass(searchModalOpen);
			$(topnavSearchBtn).addClass(searchModalClosed);
			$(searchModal).attr('aria-hidden', 'true');
			$(searchModal).addClass(animationSearchSlideOut);
			$(searchModal).removeClass(animationSearchSlideIn);
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