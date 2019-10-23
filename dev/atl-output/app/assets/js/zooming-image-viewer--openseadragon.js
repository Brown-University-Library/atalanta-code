$(function () {
	var musicControlPosition = '.transport';
	var zoomingViewer
	var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	var startPage // the number of first page of current emblem
	var pageTiles = "../data/json/pageView.json"; // file path to page view dzi files
	var bookTiles = "../data/json/bookView.json"; // file path to book view dzi files
	var waypointMotto = '.section__motto';
	var waypointMottoGerman = '.section__motto ._motto--german';
	var waypointImage = '.section__image';
	var waypointMusic = '.section__music';
	var waypointEpigram = '.section__epigram';
	var waypointEpigramGerman = '.section__motto ._epigram--german';
	var waypointDiscourse1 = '.section__discourse';
	var waypointDiscourseEnglish2
	var waypointDiscourseLatin2
	var waypointDedication1 = '.section__dedication';
	var waypointDedication2 = '.section__dedication .ab:nth-of-type(2)';
	var waypointDedication3
	var germanEpigramWaypoint
	var englishEpigramWaypoint

	$.get(pageTiles, function(data) { // after all the image tiles are ready, display zoomable pages
		if (myEmblemDataNum <= 3) { // handle front matter (not in sets of 4)
	      startPage = myEmblemDataNum + 7;
	    }
	    else if (myEmblemDataNum === 4) { // handle front matter: preface
	      startPage = myEmblemDataNum + 9;
	    }
	    else if (myEmblemDataNum > 4) { // handle emblem pages in sets of 4
	      startPage = myEmblemDataNum * 4;
	    }
		zoomingViewer = OpenSeadragon({
			id: "openseadragon-wrapper",
			tileSources: data,
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
	});

	if(myEmblemDataNum === 1) { // FRONTISPIECE

	}
	if(myEmblemDataNum === 2) { // AUTHOR'S EPIGRAM

	}
	else if(myEmblemDataNum === 3) { // DEDICATION
	var waypoint = new Waypoint({
		element: document.querySelector(waypointDedication1), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 4/4
				console.log("hit dedication 1 waypoint down");
				zoomingViewer.goToPage(myEmblemDataNum + 7);
			}
			else { // if scrolling back up the page
				console.log("hit dedication 1 waypoint up");
				// zoomingViewer.goToPage(myEmblemDataNum + 6);
			}
		},
		offset: 0, // moving the trigger location from 0 at the top of the viewport
	})
	var waypoint = new Waypoint({
			element: document.querySelector(waypointDedication2), // tells waypoint which DOM element's position to observe on scroll
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if(direction === 'down') { // if scrolling down the page, change zooming page to 4/4
					console.log(waypointDedication2);
					console.log("hit dedication 2 Latin waypoint down");
					zoomingViewer.goToPage(myEmblemDataNum + 9);
				}
				else { // if scrolling back up the page
					console.log("hit dedication 2 Latin waypoint up");
					zoomingViewer.goToPage(myEmblemDataNum + 8);
				}
			},
			offset: 200, // moving the trigger location from 0 at the top of the viewport
		})
	/*if($('.section__dedication div.original').hasClass('is-shown')) {
		console.log("THIS SHOULD WORK");

		var waypointDedication2 = '.section__dedication .page';
		var waypoint = new Waypoint({
			element: document.querySelector(waypointDedication2), // tells waypoint which DOM element's position to observe on scroll
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if(direction === 'down') { // if scrolling down the page, change zooming page to 4/4
					console.log("hit dedication 2 Latin waypoint down");
					zoomingViewer.goToPage(myEmblemDataNum + 9);
				}
				else { // if scrolling back up the page
					console.log("hit dedication 2 Latin waypoint up");
					zoomingViewer.goToPage(myEmblemDataNum + 8);
				}
			},
			offset: 200, // moving the trigger location from 0 at the top of the viewport
		})
	}
	if($('.section__dedication div.translation').hasClass('is-shown')) {
		console.log("THIS SHOULD ALSO WORK");
		var waypointDedication2 = '.section__dedication .ab:nth-of-type(2)';
		var waypoint = new Waypoint({
			element: document.querySelector(waypointDedication2), // tells waypoint which DOM element's position to observe on scroll
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if(direction === 'down') { // if scrolling down the page, change zooming page to 4/4
					console.log("hit dedication 2 English waypoint down");
					zoomingViewer.goToPage(myEmblemDataNum + 8);
				}
				else { // if scrolling back up the page
					console.log("hit dedication 2 English waypoint up");
					zoomingViewer.goToPage(myEmblemDataNum + 7);
				}
			},
			offset: 200, // moving the trigger location from 0 at the top of the viewport
		})
	}
	*/

	

	}
	else if(myEmblemDataNum === 4) { // PREFACE

	}
	else { // EMBLEMS 1—50
			/*** ENGLISH / LATIN MOTTO WAYPOINT ***/
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.querySelector(waypointMotto), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4
				console.log("hit motto waypoint down");
				zoomingViewer.goToPage(myEmblemDataNum * 4);
			}
			else { // if scrolling back up the page
				console.log("hit motto waypoint up");
			}
		},
		offset: 150, // moving the trigger location from 0 at the top of the viewport
	})


	/*** GERMAN MOTTO WAYPOINT ***/
	/*
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.querySelector('.section__motto .original.is-shown ._motto--german'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4
				zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
			}
			else { // if scrolling back up the page
				
			}
		},
		offset: 150, // moving the trigger location from 0 at the top of the viewport
	})
	*/

	// /*** IMAGE WAYPOINT ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.querySelector(waypointImage), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4
				console.log("hit image waypoint down");
				zoomingViewer.goToPage(myEmblemDataNum * 4);
			}
			else if (direction === 'up') { // if scrolling back up the page
				console.log("hit image waypoint up");
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
		element: document.querySelector(waypointMusic), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if English && scrolling down the page, change zooming page to 1/4
				console.log("hit music waypoint down");
				zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
			}
			else if (direction === 'up') { // if scrolling back up the page
				console.log("hit music waypoint up");
				zoomingViewer.goToPage(myEmblemDataNum * 4);
			}
			else {
				console.log("waypoints doesn't detect a scroll direction");
			}
		},
		offset: 100, // moving the trigger location from 0 at the top of the viewport
	})


	// /*** EPIGRAM WAYPOINT ENGLISH / LATIN ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	englishEpigramWaypoint = new Waypoint({
		element: document.querySelector(waypointEpigram), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4 if Latin/English is active or 1/4 if German is active
				console.log("hit epigram waypoint down");
				zoomingViewer.goToPage(myEmblemDataNum * 4);
			}
			else if (direction === 'up') { // if scrolling back up the page
				console.log("hit epigram waypoint up");
				zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
			}
			else {
				console.log("waypoints doesn't detect a scroll direction");
			}
		},
		offset: 350 // moving the trigger location from 0 at the top of the viewport
	})

	// /*** EPIGRAM WAYPOINT GERMAN ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	germanEpigramWaypoint = new Waypoint({
		element: document.querySelector(waypointEpigramGerman), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4 if Latin/English is active or 1/4 if German is active
				console.log("hit German epigram waypoint down");
				zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
			}
			else if (direction === 'up') { // if scrolling back up the page
				console.log("hit German epigram waypoint up");
				zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
			}
			else {
				console.log("waypoints doesn't detect a scroll direction");
			}
		},
		enabled: false,
		offset: 350 // moving the trigger location from 0 at the top of the viewport
	})

	// /*** DISCOURSE WAYPOINT 1 ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.querySelector(waypointDiscourse1), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, change zooming page to 3/4
				console.log("hit discourse waypoint down");
				zoomingViewer.goToPage(myEmblemDataNum * 4 + 1);
			}
			else { // if scrolling back up the page
				console.log("hit discourse waypoint up");
				zoomingViewer.goToPage(myEmblemDataNum * 4);
			}
		},
		offset: 150, // moving the trigger location from 0 at the top of the viewport
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
	}





})

// BOOK PAGE NUMBERS W/O ZERO INDEX
// frontispiece = 9
// epigram = 10
// dedication = 11 - 13
// preface = 14 - 19
// emblem 1 = 20