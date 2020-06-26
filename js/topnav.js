$(function () {
/* VARIABLES */
	var topNav = 'nav.topnav';
	var hamburgerMenuBtn = 'nav.topnav > button';
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
	var searchForm = '#ataSearch';
	var searchQueryInput = 'input#search__bar__field';

/* EVENTS */
	/* topnav mobile menu */
	$(hamburgerMenuBtn).click(function() {
		if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnClosed)) {
			hamburgerMenuOpen();
			searchModalClose();
		}
		else if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnOpen)) {
			hamburgerMenuClose();
		}
		else {
			// console.log("THE HAMBURGER MENU HAS NO CLASS");
		}
	});

	/* search topnav button */
	$(topnavSearchBtn).click(function(event) {
		if( $(topnavSearchBtn).hasClass(searchModalClosed) ) {
			hamburgerMenuClose();
			$(searchModal).addClass('search__modal--open');
			searchTextClear();
			setTimeout(searchModalOpen, 150);
		}
		else if( $(topnavSearchBtn).hasClass(searchModalOpened) ) {
			searchModalClose();
		}
		else {
			// console.log("THE SEARCH BUTTON HAS NO STATE");
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
	$(searchForm).submit(function(event){
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
		// searchModalClose();
	}
	function searchModalClose() {
		var topnavHeight = $(topNav).height();
		var searchModalHeight = $(searchModal).height();
		var searchModalPosition = searchModalHeight + topnavHeight;
		searchModalPosition = -Math.abs(searchModalPosition);

		$(topnavSearchBtn).removeClass(searchModalOpened);
		$(topnavSearchBtn).addClass(searchModalClosed);
		$(searchModal).attr('aria-hidden', 'true');

		TweenMax.to(searchModal, .2, {top: searchModalPosition, ease:Power2.easeOut});
		setTimeout(function() { 
			$(searchModal).removeClass('search__modal--open')
		}, 300);
		// $('body').removeClass('no-scroll');
	}
	function searchModalOpen() {
		var topnavHeight = $(topNav).height();
		var searchModalHeight = $(searchModal).height();

		$(topnavSearchBtn).removeClass(searchModalClosed);
		$(topnavSearchBtn).addClass(searchModalOpened);
		$(searchModal).attr('aria-hidden', 'false');
		
		TweenMax.to(searchModal, .4, {height: searchModalHeight, top: topnavHeight, ease:Power2.easeOutIn});
		
		$(searchQueryInput).focus();
		// $('body').addClass('no-scroll');
	}
	/* clear text from search input field */
	function searchTextClear() {
		$(searchQueryInput).val('');
	}

	/* Copy DOI to Clipboard */
	$(document).on('click', '[data-lightbox]', lity);
	$('.btn--doi').click(function(e) {
		var text = $(this).attr('data-copy');
		var el = $(this);
		copyToClipboard(text, el);
	});
	function copyToClipboard(text, el) {
		var copyTest = document.queryCommandSupported('copy');

		if (copyTest === true) {
				var copyTextArea = document.createElement("textarea");
				copyTextArea.classList.add("doi-text");
				copyTextArea.value = text;
				document.body.appendChild(copyTextArea);
				copyTextArea.select();
				document.execCommand('copy');
				removeDoiHack(copyTextArea);
		} else {
		// Fallback if browser doesn't support .execCommand('copy')
			window.prompt("Copy to clipboard: Ctrl+C or Command+C, Enter", text);
		}
	}
	function removeDoiHack(DOIhackTextArea) {
		document.body.removeChild(DOIhackTextArea);
	}
});