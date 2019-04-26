$(function () {
	var musicControlPosition = '.transport';
	var zoomingViewer
	var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	var startPage // the number of first page of current emblem
	var thumbnailNav = $('nav.digital-edition-nav'); // thumbnail navigation for digital edition
	var thumbnailPage // the number of the page in the digital edition matched to indexed thumbnails in nav
	var thumbnailNavTrigger = $('button.thumbnail-trigger');
	var centeredThumbnail = $('nav.digital-edition-nav .center'); // get the thumbnail element for the current page
	// var pageTiles = "../data/json/page-view.json"; // file path to page view dzi files
	// var bookTiles = "../data/json/book-view.json"; // file path to book view dzi files
	var pageTiles = "../data/json/pageView.json"; // file path to page view dzi files
	var bookTiles = "../data/json/bookView.json"; // file path to book view dzi files
	var pageView = $.getJSON(pageTiles, function(myJSON) { // get pageView.json file
		pageView = pageView.responseJSON; // get array of page view URLS
	})
	var bookView = $.getJSON(bookTiles, function() { // get bookView.json file
		bookView = bookView.responseJSON; // get array of book view URLS
	})
	.done(function() { // after all the image tiles are ready, display zoomable pages
		if (myEmblemDataNum <= 3) { // handle front matter (not in sets of 4)
			startPage = myEmblemDataNum + 7;
		}
		else if (myEmblemDataNum === 4) { // handle front matter: preface
			startPage = myEmblemDataNum + 9;
		}
		else if (myEmblemDataNum > 4) { // handle emblem pages in sets of 4
			startPage = myEmblemDataNum * 4;
		}
		// // should the book end at the last page or loop back to the beginning?

		var atalantaZoom = pageView; // current view mode (initially pageView)
		zoomingViewer = OpenSeadragon({
			id: "openseadragon-wrapper",
			tileSources: [atalantaZoom],
			initialPage: startPage, // start viewer at first page of current emblem
			autoResize: true, /***/
            showHomeControl: false, /***/
			animationTime: 1.5, /* smoother zooming with easing */
			sequenceMode: true, /* group an array of images */
			showReferenceStrip: false, /* thumbnails */
			// referenceStripScroll: 'vertical',
			showNavigator: false, /* mini map */
			toolbar: "openseadragon-wrapper",
			zoomInButton: "zoom-in",
			zoomOutButton: "zoom-out",
			homeButton: "home",
			fullPageButton: "full-page",
			previousButton: "previous",
			nextButton: "next"
		});
		
		// var pageIndex = this.pageIndex - (this.mode === 'book' ? 2 : 1);
		// 	if (this.mode === 'book')
	});

	/* digital edition thumbnail navigation */
	thumbnailPage = myEmblemDataNum - 1;
	const $owlCarousel = $(".owl-carousel").owlCarousel({
		items: 10,
		center: true,
		loop: true, 
		nav: true,
		dots: false,
		startPosition: thumbnailPage,
		responsive: {
			0: {
				items: 3
			},
			480: {
				items: 5
			},
			768: {
				items: 6
			},
			1100: {
				items: 8
			},
			1330: {
				items: 10
			},
			1600: {
				items: 12
			},
			2200: {
				items: 16
			}
		}
	});

	$(thumbnailNavTrigger).on("click", function() {
		console.log("I CLICKED THE THUMBNAIL NAV TRIGGER");
		animateThumbnailNav();
	});

	function animateThumbnailNav() {
		if ($(thumbnailNav).hasClass('de-nav--closed')) {
			openThumbnailNav();
		}
		else if ($(thumbnailNav).hasClass('de-nav--open')) {
			closeThumbnailNav();
		}
	}

	function closeThumbnailNav() {
		$(thumbnailNav).removeClass('de-nav--open');
		$(thumbnailNav).addClass('de-nav--closed');
	}

	function openThumbnailNav() {
		$(thumbnailNav).removeClass('de-nav--closed');
		$(thumbnailNav).addClass('de-nav--open');
	}

	/*** MOTTO WAYPOINT ***/
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__0'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4
				zoomingViewer.goToPage(myEmblemDataNum * 4);
			}
			else { // if scrolling back up the page
				
			}
		},
		offset: 150, // moving the trigger location from 0 at the top of the viewport
	})

	// /*** IMAGE WAYPOINT ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__1'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4
				zoomingViewer.goToPage(myEmblemDataNum * 4);
			}
			else if (direction === 'up') { // if scrolling back up the page

			}
			else {
				console.log("waypoints doesn't detect a scroll direction");
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})

	// /*** MUSIC WAYPOINT ***/
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__2'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			// var waypointElement = document.getElementById('basic-waypoint__2');
			// var sectionLanguage = $(waypointElement).data("lang");
			// console.log(sectionLanguage);
			// var myLanguage = $(element).data("lang");
			if(direction === 'down') { // if English && scrolling down the page, change zooming page to 1/4
				console.log("WAYPOINTS MUSIC DOWN");
				$(musicControlPosition).removeClass('is-unstuck');
				zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
				$(musicControlPosition).addClass('is-stuck');
				// $('.section__music').addClass('padding-hack');
			}
			/*
			if( (direction === 'down') && (sectionLanguage === 'en') ) { // if English && scrolling down the page, change zooming page to 1/4
				console.log("WAYPOINTS MUSIC DOWN");
				$(musicControlPosition).removeClass('is-unstuck');
				viewer.goToPage(myEmblemDataNum * 4 - 1);
				$(musicControlPosition).addClass('is-stuck');
				// $('.section__music').addClass('padding-hack');
			}
			else if( (direction === 'down') && (sectionLanguage === 'la') ) { // if Latin && scrolling down the page, change zooming page to 1/4
				console.log("WAYPOINTS MUSIC DOWN");
				$(musicControlPosition).removeClass('is-unstuck');
				viewer.goToPage(myEmblemDataNum * 4 - 1);
				$(musicControlPosition).addClass('is-stuck');
				// $('.section__music').addClass('padding-hack');
			}
			else if( (direction === 'down') && (sectionLanguage === 'de') ) { // if German && scrolling down the page, change zooming page to 1/4
				console.log("WAYPOINTS MUSIC DOWN");
				$(musicControlPosition).removeClass('is-unstuck');
				viewer.goToPage(myEmblemDataNum * 4 - 1);
				$(musicControlPosition).addClass('is-stuck');
				// $('.section__music').addClass('padding-hack');
			}
			*/
			else if (direction === 'up') { // if scrolling back up the page
				console.log("WAYPOINTS MUSIC UP");
				$(musicControlPosition).addClass('is-unstuck');
				zoomingViewer.goToPage(myEmblemDataNum * 4);
				$(musicControlPosition).removeClass('is-stuck');
				// $('.section__music').removeClass('padding-hack');
			}
			else {
				console.log("waypoints doesn't detect a scroll direction");
			}
		},
		offset: 100, // moving the trigger location from 0 at the top of the viewport
	})

	// /*** EPIGRAM WAYPOINT ENGLISH / LATIN ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__3'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			var waypointElement = document.getElementById('basic-waypoint__3');
			console.log(waypointElement);
			if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4 if Latin/English is active or 1/4 if German is active
				console.log("WAYPOINTS EPIGRAM DOWN");
				$(musicControlPosition).addClass('is-unstuck');
				zoomingViewer.goToPage(myEmblemDataNum * 4);
				$(musicControlPosition).removeClass('is-stuck');
				// $('.section__music').removeClass('padding-hack');
			}
			else { // if scrolling back up the page
				console.log("WAYPOINTS EPIGRAM UP");
				$(musicControlPosition).removeClass('is-unstuck');
				zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
				$(musicControlPosition).addClass('is-stuck');
				// $('.section__music').addClass('padding-hack');
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})

	// /*** DISCOURSE WAYPOINT 1 ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__4'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 3/4
				zoomingViewer.goToPage(myEmblemDataNum * 4 + 1);
			}
			else { // if scrolling back up the page
				zoomingViewer.goToPage(myEmblemDataNum * 4);
			}
		},
		offset: 280, // moving the trigger location from 0 at the top of the viewport
	})

	// /*** DISCOURSE WAYPOINT 2 ENGLISH ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__5'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 4/4
				zoomingViewer.goToPage(myEmblemDataNum * 4 + 2);
			}
			else { // if scrolling back up the page
				zoomingViewer.goToPage(myEmblemDataNum * 4 + 1);
			}
		},
		offset: 500, // moving the trigger location from 0 at the top of the viewport
	})
})

// BOOK PAGE NUMBERS W/O ZERO INDEX
// frontispiece = 9
// epigram = 10
// dedication = 11 - 13
// preface = 14 - 19
// emblem 1 = 20