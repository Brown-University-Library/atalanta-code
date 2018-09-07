$(function () {
	var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	var startPage = 0; // the number of first page of current emblem
	var currentPageSingle = 0;
	var myCurrentPageSingle = 0;
	var currentPageBook = 0;
	var pageTiles = "../data/pageView.json"; // file path to page view dzi files
	console.log("This is pageTiles " + pageTiles);
	var bookTiles = "../data/bookView.json"; // file path to book view dzi files
	var nextPageBtn = $('#next');
	var prevPageBtn = $('#previous');
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
		currentPageSingle = startPage;
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
	console.log("the current page is " + currentPageSingle);
	console.log("my emblem number is " + myEmblemDataNum);
	$(nextPageBtn).click(function(){
		console.log("I clicked the next page");
		currentPageSingle = currentPageSingle + 1;
		console.log("now the current page is " + currentPageSingle);
		if(currentPageSingle <= 7) {
			myCurrentPageSingle = currentPageSingle - 3;
			console.log("my new current page is " + myCurrentPageSingle);
		}
		else if(currentPageSingle > 7) {
			myCurrentPageSingle = Math.floor(currentPageSingle / 4) + 3;
			console.log("my new current page is " + myCurrentPageSingle);
		}
		updatePage();
	});
	function updatePage(){
		var testing = document.getElementById('myPage');
		console.log("my element is " + testing);
		testing.setAttribute("data-id", myCurrentPageSingle);
		checkUpdate();
	}
	function checkUpdate(){
		var testing2 = document.getElementById('myPage');
		var myNewEmblemDataNum = testing2.getAttribute('data-id');
		console.log("now my emblem number is " + myNewEmblemDataNum);
	}

		// 	var mySingleData = document.querySelector(singleViewBtn);
		// mySingleData.setAttribute("data-state", singleData);
});



// data 1 = page 4 								| x - 3
// data 2 = page 5									| x - 3
// data 3 = page 6									| x - 3
// data 4 = page 7									| x - 3
// data 5 = page 8, page 9, page 10, page 11		| x - 3, x - 4, x - 5, x - 6	| x/4 = 2, x/4 = 2.1, x/4 = 2.2 x/4 = 2.3 floor/modulo??? + 3
// data 6 = page 12, page 13, page 14, page 15		| x - 6, x - 7, x - 8, x - 9	| x/4 = 3, x/4 = 3.1, x/4 = 3.2, x/4 = 3.3 

// pageNum/4 + 3;