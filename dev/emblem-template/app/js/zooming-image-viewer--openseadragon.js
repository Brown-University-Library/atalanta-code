$(function () {
	var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	var startPage // the number of first page of current emblem
	var pageTiles = "../data/pageView.json"; // file path to page view dzi files
	console.log("This is pageTiles " + pageTiles);
	var bookTiles = "../data/bookView.json"; // file path to book view dzi files
	var pageView = $.getJSON(pageTiles, function(myJSON) { // get pageView.json file
		pageView = pageView.responseJSON; // get array of page view URLS
	})
	var bookView = $.getJSON(bookTiles, function() { // get bookView.json file
		bookView = bookView.responseJSON; // get array of book view URLS
	})
	.done(function() { // after all the image tiles are ready, display zoomable pages
		if (myEmblemDataNum <= 4) { // handle front matter (not in sets of 4)
			startPage = myEmblemDataNum + 3;
		}
		else if (myEmblemDataNum > 4) { // handle emblems (in sets of 4)
			startPage = myEmblemDataNum * 4 - 7;
		}
		var atalantaZoom = pageView; // current view mode (initially pageView)
		var viewer = OpenSeadragon({
			id: "openseadragon-wrapper",
			// tileSources: [atalantaZoom],
			tileSources: [atalantaZoom],
			initialPage: startPage, // start viewer at first page of current emblem
			autoResize: true, /***/
            showHomeControl: false, /***/
			animationTime: 1.5, /* smoother zooming with easing */
			sequenceMode: true, /* group an array of images */
			showReferenceStrip: false, /* thumbnails */
			// referenceStripScroll: 'vertical',
			showNavigator: true, /* mini map */
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
});