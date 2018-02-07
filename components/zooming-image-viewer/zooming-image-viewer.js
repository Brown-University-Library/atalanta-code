$(document).ready(function(){ // prepare and display zoomable scans of book pages
		var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
		var startPage = myEmblemDataNum * 4 + 4; // the number of first page of current emblem
		console.log(startPage);
		var pageTiles = "/data/page-view.json"; // file path to page view dzi files
		console.log("This is pageTiles " + pageTiles);
		var bookTiles = "/data/book-view.json"; // file path to book view dzi files
		var pageView = $.getJSON(pageTiles, function(myJSON) { // get pageView.json file
			pageView = pageView.responseJSON; // get array of page view URLS
		})
		.done(function() { // after all the image tiles are ready, display zoomable pages
			var atalantaZoom = pageView; // current view mode (initially pageView)
			var viewer = OpenSeadragon({
				id: "openseadragon-wrapper",
				tileSources: [atalantaZoom],
				initialPage: startPage, // start viewer at first page of current emblem
				autoResize: true, /***/
	            showHomeControl: false, /***/
				animationTime: 1.5, /* smoother zooming with easing */
				sequenceMode: true, /* group an array of images */
				showReferenceStrip: false, /* thumbnails */
				showNavigator: true, /* mini map */
				toolbar: "openseadragon-wrapper",
				zoomInButton: "zoom-in",
				zoomOutButton: "zoom-out",
				homeButton: "home",
				fullPageButton: "full-page",
				previousButton: "previous",
				nextButton: "next"
			});
		});
	})