$(function () {
/* VARIABLES */
	var hamburgerMenuBtn = 'nav.topnav button';
	var hamburgerMenuBtnClosed = 'topnav__hamburger--closed';
	var hamburgerMenuBtnOpen = 'topnav__hamburger--open';
	var hamburgerMenu = '.topnav > ul';
	var animationMenuSlideIn = 'topnav--slide-in';
	var animationMenuSlideOut = 'topnav--slide-out';
	var topnavSearchBtn = '.topnav__search button';
	var searchModalOpened = 'topnav__search--open';
	var searchModalClosed = 'topnav__search--closed';
	var searchModal = 'div.search__modal';
	var animationSearchSlideIn = 'search__modal--slide-in';
	var animationSearchSlideOut = 'search__modal--slide-out';
	var xCloseBtn = 'button.x-close';
	var xCloseBtnSVG = 'button.x-close > svg';
	var searchURL = '../search/search.html?q='
	var searchQueryInput = 'input#search__bar__field';
	var submitSearchBtn = '.search__modal button.submit';
	var $documentElement = $('html, body');
	var	$wrapper = $('.main');
	var	scrollTop;

/* EVENTS */
	/* topnav mobile menu */
	$(hamburgerMenuBtn).click(function() {
		if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnClosed)) {
			hamburgerMenuOpen();
		}
		else if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnOpen)) {
			hamburgerMenuClose();
		}
		else {
			console.log("THE HAMBURGER MENU HAS NO CLASS");
		}
	});

	/* search topnav button */
	$(topnavSearchBtn).click(function(event) {
		if( $(topnavSearchBtn).hasClass(searchModalClosed) ) {
			searchTextClear();
			searchModalOpen();
		}
		else if( $(topnavSearchBtn).hasClass(searchModalOpened) ) {
			searchModalClose();
		}
		else {
			console.log("THE SEARCH BUTTON HAS NO STATE");
		}
		event.preventDefault();
	});

	/* X button to close search modal */
	$(xCloseBtnSVG).click(function(e) {
		e.stopPropagation();
		e.preventDefault();
	});
	$(xCloseBtn).click(function() {
		searchModalClose();
	});

	/* close search modal on ESC key */
	$(document).keydown(function(event) {
		if(event.keyCode == 27) {
			searchModalClose();
		}
	});
	
	/* submit on enter key */
	$('#ataSearch').submit(function(event){
		searchModalClose();
		event.preventDefault();
	});

/* FUNCTIONS */
	function hamburgerMenuClose() {
		$(hamburgerMenuBtn).removeClass(hamburgerMenuBtnOpen);
		$(hamburgerMenuBtn).addClass(hamburgerMenuBtnClosed);
		$(hamburgerMenu).removeClass(animationMenuSlideIn);
		$(hamburgerMenu).addClass(animationMenuSlideOut);
	}
	function hamburgerMenuOpen() {
		$(hamburgerMenuBtn).removeClass(hamburgerMenuBtnClosed);
		$(hamburgerMenuBtn).addClass(hamburgerMenuBtnOpen);
		$(hamburgerMenu).removeClass(animationMenuSlideOut);
		$(hamburgerMenu).addClass(animationMenuSlideIn);
		searchModalClose();
	}
	function searchModalClose() {
		$(topnavSearchBtn).removeClass(searchModalOpened);
		$(topnavSearchBtn).addClass(searchModalClosed);
		$(searchModal).attr('aria-hidden', 'true');
		$(searchModal).addClass(animationSearchSlideOut);
		$(searchModal).removeClass(animationSearchSlideIn);
		// $('body').removeClass('no-scroll');
	}
	function searchModalOpen() {
		$(topnavSearchBtn).removeClass(searchModalClosed);
		$(topnavSearchBtn).addClass(searchModalOpened);
		$(searchModal).attr('aria-hidden', 'false');
		$(searchModal).addClass(animationSearchSlideIn);
		$(searchModal).removeClass(animationSearchSlideOut);
		$(searchQueryInput).focus();
		// $('body').addClass('no-scroll');
	}
	/* clear text from search input field */
	function searchTextClear() {
		$(searchQueryInput).val('');
	}
	// function updateURLwithSearchQuery() {
	// 	var searchInput = $(searchQueryInput).val();
	// 	var searchQueryURL =  searchURL + searchInput; 
	// 	window.open(searchQueryURL, '_self');
	// }
});