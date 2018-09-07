$(function () {
	var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	var startPage = 0; // the number of first page of current emblem
	var currentPageSingle = 0;
	var myCurrentPageSingle = 0;
	var currentPageBook = 0;
	// var pageTiles = "../data/json/page-view.json"; // file path to page view dzi files
	// var bookTiles = "../data/json/book-view.json"; // file path to book view dzi files
	var pageTiles = "../data/json/pageView.json"; // file path to page view dzi files
	var bookTiles = "../data/json/bookView.json"; // file path to book view dzi files
	var nextPageBtn = $('#next');
	var prevPageBtn = $('#previous');
	var pageView = $.getJSON(pageTiles, function(myJSON) { // get pageView.json file
		pageView = pageView.responseJSON; // get array of page view URLS
	})
	var bookView = $.getJSON(bookTiles, function() { // get bookView.json file
		bookView = bookView.responseJSON; // get array of book view URLS
	})
	.done(function() { // after all the image tiles are ready, display zoomable pages
		// $(nextPageBtn).attr("href", "../atalanta-fugiens/dedication.html");
		if (myEmblemDataNum <= 3) { // handle front matter (not in sets of 4)
			startPage = myEmblemDataNum + 7;
			console.log("startPage is " + startPage);
		}
		else if (myEmblemDataNum === 4) { // handle front matter: preface
			startPage = myEmblemDataNum + 9;
			console.log("startPage is " + startPage);
		}
		else if (myEmblemDataNum > 4) { // handle emblems (in sets of 4)
			startPage = myEmblemDataNum * 4 - 1;
			console.log("startPage is " + startPage);
		}
		// if (startPage === 8) {
		// 	$(nextPageBtn).attr("href", "../atalanta-fugiens/author-epigram.html");
		// 	$(prevPageBtn).attr("href", "../atalanta-fugiens/atl-toc.html");
		// }
		// else if (startPage === 9) {
		// 	$(nextPageBtn).attr("href", "../atalanta-fugiens/dedication.html");
		// 	$(prevPageBtn).attr("href", "../atalanta-fugiens/frontispiece.html");
		// }
		currentPageSingle = startPage;
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

	$(nextPageBtn).click(function(){
		currentPageSingle = currentPageSingle + 1; // advance zooming page image by 1
		console.log("my current page is " + currentPageSingle);
		if (currentPageSingle === 8) {
			console.log("I should be on the frontispiece");
			window.location.href = "../atalanta-fugiens/frontispiece.html";
		}
		else if (currentPageSingle === 9) {
			console.log("I should be on the epigram");
			window.location.href = "../atalanta-fugiens/author-epigram.html";
		}
		else if (currentPageSingle === 10) {
			console.log("I should be on the dedication");
			window.location.href = "../atalanta-fugiens/dedication.html";
		}
		else if (currentPageSingle === 13) {
			console.log("I should be on the preface");
			window.location.href = "../atalanta-fugiens/preface.html";
		}
		else if (currentPageSingle === 19) {
			console.log("I should be on the emblem");
			window.location.href = "../atalanta-fugiens/emblem01.html";
		}
		// console.log("my emblem number is " + myEmblemDataNum);
		// console.log("I clicked the next page");
		// console.log("the page was " + currentPageSingle);
		// currentPageSingle = currentPageSingle + 1; // advance zooming page image by 1
		// console.log("now the current page is " + currentPageSingle);
		// if(currentPageSingle <= 8) { // handle book cover
		// 	myCurrentPageSingle = 0; // tie book cover to introduction/toc
		// 	console.log("my new emblem number is " + myCurrentPageSingle);
		// }
		// else if(currentPageSingle > 8 && currentPageSingle <= 10) { // handle frontispiece and epigram
		// 	myCurrentPageSingle = currentPageSingle - 8; // new emblem data number should = myCurrentPageSingle
		// 	console.log("my new current page is " + myCurrentPageSingle);
		// }
		// else if(currentPageSingle > 10 && currentPageSingle <=13) { // handle dedication
		// 	myCurrentPageSingle = 3;
		// 	console.log("my dedication page is " + myCurrentPageSingle);
		// }
		// else if(currentPageSingle > 13 && currentPageSingle <=19) { // handle preface
		// 	myCurrentPageSingle = 4;
		// 	console.log("my preface page is " + myCurrentPageSingle);
		// }
		// else if(currentPageSingle > 19) { // handle emblems
		// 	myCurrentPageSingle = Math.floor(currentPageSingle / 4);
		// 	console.log("my first emblem page is " + myCurrentPageSingle);
		// }
		// updatePage();
	});
	$(prevPageBtn).click(function(){
		currentPageSingle = currentPageSingle - 1; // subtract zooming page image by 1
		console.log("my current page is " + currentPageSingle);
		if (currentPageSingle === 8) {
			console.log("I should be on the frontispiece");
			window.location.href = "../atalanta-fugiens/frontispiece.html";
		}
		else if (currentPageSingle === 9) {
			console.log("I should be on the epigram");
			window.location.href = "../atalanta-fugiens/author-epigram.html";
		}
		else if (currentPageSingle === 12) {
			console.log("I should be on the dedication");
			window.location.href = "../atalanta-fugiens/dedication.html";
		}
		else if (currentPageSingle === 18) {
			console.log("I should be on the preface");
			window.location.href = "../atalanta-fugiens/preface.html";
		}
		else if (currentPageSingle === 22) {
			console.log("I should be on the emblem");
			window.location.href = "../atalanta-fugiens/emblem01.html";
		}
	});
	// function updatePage(){
	// 	var testing = document.getElementById('emblem-data');
	// 	console.log("my element is " + testing);
	// 	testing.setAttribute("data-id", myCurrentPageSingle);
	// 	window.history.replaceState('/atalanta-fugiens', '/atalanta-fugiens', '/atalanta-fugiens/dedication.html');

	// 	checkUpdate();
	// 	return false;
	// }
	// function checkUpdate(){
	// 	var testing2 = document.getElementById('emblem-data');
	// 	var myNewEmblemDataNum = testing2.getAttribute('data-id');
	// 	console.log("now my emblem number is " + myNewEmblemDataNum);
	// }

		// 	var mySingleData = document.querySelector(singleViewBtn);
		// mySingleData.setAttribute("data-state", singleData);
});

// frontispiece = page9 data1				x - 8
// epigram = page10 data2					x - 8
// dedication = pages11 - 13 data 3			x - 8, x - 9, x - 10
// preface = pages14 - 19 data 4			x - 10, x - 11, x - 12, x - 13, x - 14, x - 15
// emblem 1 = pages20-23 data 5				x - 15, x - 16, x - 17, x - 18	

