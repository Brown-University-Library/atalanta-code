$(function () {
/* VARIABLES */
	/* emblem nav */
	var languageEnglishOrigBtn = 'option.dropdown--language:nth-of-type(1)';
	var languageEnglishNormBtn = 'option.dropdown--language:nth-of-type(2)';
	var languageLatinOrigBtn = 'option.dropdown--language:nth-of-type(3)';
	var languageLatinRegBtn = 'option.dropdown--language:nth-of-type(4)';
	var languageGermanBtn = 'option.dropdown--language:nth-of-type(5)';
	var layoutComparativeBtn = 'option.dropdown--layout:nth-of-type(1)';
	var layoutDigitalEditionBtn = 'option.dropdown--layout:nth-of-type(2)';
	var layoutBookBtn = 'option.dropdown--layout:nth-of-type(3)';
	/* emblem languages */
	var fullEnglishText = '.section--single .lang--english';
	var fullGermanText = '.section--single .lang--german';
	var fullLatinDiscourse = '.section--single .lang--latin._discourse--latin';
	var fullLatinText = '.section--single .lang--latin';
	var languageEnglishNormalized = '.lang--english.edition--normalized';
	var languageEnglishOriginal = '.lang--english.edition--original';
	var languageGerman = '.lang--german';
	var languageLatinOriginal = '.lang--latin.edition--original';
	var languageLatinRegularized = '.lang--latin.edition--regularized';
	var singleTranslation = '.section--single > div.translation';
	var singleOriginal = '.section--single > div.original';
	/* emblem sections */
	var facsimileFull = '.facsimile--full';
	var imageFull = '.image--full';
	var imageSectionRight = '.section__image.section--full.panel--right .image__picture.section--single';
	var musicFull = '.music--full';
	var sectionEmblem = '.emblem';
	var sectionFacsimile = '.section__facsimile';
	var sectionFull = '.section--full.panel--full';
	var sectionImage = '.section__image';
	var sectionMusic = '.section__music';
	var sectionSingle = '.section--single';
	/* grid */
	var gridHalf = 'grid--half';
	var gridLeft = 'grid--left';
	var gridRight = 'grid--right';

	var thisEmblemPage = '.emblem-page';
	var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	var myEmblemPage = $('.emblem-page').data("page");
	var startPage; // the number of first page of current emblem
	var newEmblemPageData;
	var viewer;

	/* emblem side nav */
	// var sideNav = '.wrapper-sidenav';
	// var mottoSideNav = 'ul.sidenav__options > li:nth-child(1)';
	// var imageSideNav = 'ul.sidenav__options > li:nth-child(2)';
	// var musicSideNav = 'ul.sidenav__options > li:nth-child(3)';
	// var epigramSideNav = 'ul.sidenav__options > li:nth-child(4)';
	// var discourseSideNav = 'ul.sidenav__options > li:nth-child(5)';
	// var sideNavOption = 'ul.sidenav__options > li';
	// var sideNavArrows = 'ul.sidenav__navigation li a';
	// var dataID = $('.emblem-page').data('id');
	// var myEmblem = dataID - 4;
	// var currentEmblemNum = myEmblem;
	// var prevEmblemNum = currentEmblemNum - 1;
	// var nextEmblemNum = currentEmblemNum + 1;
	// var prevBtn = '#sidenav__prev';
	// var nextBtn = '#sidenav__next';
	// var emblemNumTextArea = '#sidenav__titles';





/* INITIALIZE */
	onLoad(); // DISPLAY EMBLEM MENU AND DEFAULT OPTIONS ON PAGE LOAD

/* EVENTS */
	/* layout menu */
	$("#layout").selectmenu({
	  change: function(event, ui) {},
	  icons: { button: "custom-icon" }
	});	
	$( "#layout" ).on( "selectmenuchange", function( event, ui ) {
	  selectLayout(ui.item.value);
	});
	/* language menu */
	$("#language").selectmenu({
	  change: function(event, ui) {},
	  icons: { button: "custom-icon" }
	});	
	$("#language").on( "selectmenuchange", function( event, ui ) {
	  selectLanguage(ui.item.value);
	});
	
	// $(layoutComparativeBtn).click(function() { // COMPARATIVE LAYOUT SELECTED
	// 	selectLayoutComparative();
	// 	checkState();
	// 	return false;
	// });
	// $(layoutDigitalEditionBtn).click(function() { // DIGITAL EDITION LAYOUT SELECTED
	// 	selectLayoutDigitalEdition();
	// 	checkState();
	// 	return false;
	// });
	// $(layoutBookBtn).click(function() { // BOOK LAYOUT SELECTED
	// 	selectLayoutBook();
	// 	checkState();
	// 	return false;
	// });
	// /* language buttons */
	// $(languageEnglishOrigBtn).click(function() { // ENGLISH ORIGINAL TEXT SELECTED
	// 	if( $(languageEnglishOrigBtn).attr('data-language') === 'active' ) {
	// 	}
	// 	else if ( $(languageEnglishOrigBtn).attr('data-language') === 'inactive' ) {
	// 		selectLangEnglishOrig();
	// 		checkState();
	// 	}
	// 	else {
	// 		console.log("ERROR, no language is selected");
	// 	}
	// 	return false;
	// });
	// $(languageEnglishNormBtn).click(function() { // ENGLISH NORMALIZED TEXT SELECTED
	// 	if( $(languageEnglishNormBtn).attr('data-language') === 'active' ) {

	// 	}
	// 	else if ( $(languageEnglishNormBtn).attr('data-language') === 'inactive' ) {
	// 		selectLangEnglishNorm();
	// 		checkState();
	// 	}
	// 	else {
	// 		console.log("ERROR, no language is selected");
	// 	}
	// 	return false;
	// });
	// $(languageLatinOrigBtn).click(function() { // LATIN ORIGINAL TEXT SELECTED
	// 	if( $(languageLatinOrigBtn).attr('data-language') === 'active' ) {

	// 	}
	// 	else if ( $(languageLatinOrigBtn).attr('data-language') === 'inactive' ) {
	// 		selectLangLatinOrig();
	// 		checkState();
	// 	}
	// 	else {
	// 		console.log("ERROR, no language is selected");
	// 	}
	// 	return false;
	// });
	// $(languageLatinRegBtn).click(function() { // LATIN REGULARIZED TEXT SELECTED
	// 	if( $(languageLatinRegBtn).attr('data-language') === 'active' ) {

	// 	}
	// 	else if ( $(languageLatinRegBtn).attr('data-language') === 'inactive' ) {
	// 		selectLangLatinReg();
	// 		checkState();
	// 	}
	// 	else {
	// 		console.log("ERROR, no language is selected");
	// 	}
	// 	return false;
	// });
	// $(languageGermanBtn).click(function() { // GERMAN TEXT SELECTED
	// 	if( $(languageGermanBtn).attr('data-language') === 'active' ) {

	// 	}
	// 	else if ( $(languageGermanBtn).attr('data-language') === 'inactive' ) {
	// 		selectLangGerman();
	// 		checkState();
	// 	}
	// 	else {
	// 		console.log("ERROR, no language is selected");
	// 	}
	// 	return false;
	// });



/* FUNCTIONS */
	function checkState() {
		if ( $(layoutComparativeBtn).attr('data-layout')===('active') ) {
			showDigitalEditionRight();
			showFacsimileLeft();
			console.log("Comparative Layout is ACTIVE");
		}
		else if ( $(layoutDigitalEditionBtn).attr('data-layout')===('active') ) { // if digital edition layout is active
			showFull();
			console.log("Digital Edition Layout is ACTIVE");
		}
		else if ( $(layoutBookBtn).attr('data-layout')===('active') ) { // if book is active
			showFacsimileFull();
			console.log("Book Layout is ACTIVE");
		}
		else {
			console.log("NONE OF THE STATES APPLY!!!");
		}
		// getDataState();
	}
	function getDataState() {
		// var mySingleData = document.querySelector('.subnav > ul li:nth-child(1)');
		// console.log(mySingleData);
		// singleData = mySingleData.getAttribute("data-state");
		// mySingleData = $(singleViewBtn).attr('data-state');
		// singleData = mySingleData.
		// console.log(singleData);
		// var mySingleData = document.querySelector(singleViewBtn);
														//singleData = $(singleViewBtn).attr('data-state');
	// var doubleData;
	// var englishSingleData;
	// var latinSingleData;
	// var facsimileSingleData;
	// var englishDoubleData;
	// var latinDoubleData;
	// var facsimileDoubleData;
		// updateDataState();
	}
	function onLoad() {
		checkState();
	}
	function resetFacsimile() {
		console.log("I am in resetFacsimile()");
		$(sectionMusic).removeClass(gridLeft); // remove left grid placement to reveal full music
		$(sectionMusic).removeClass(gridRight); // remove right grid placement to reveal full music
		$(sectionMusic).removeClass('is-hidden'); // show music
		$(sectionImage).removeClass(gridLeft); // remove left grid placement to reveal full image
		$(sectionImage).removeClass(gridRight); // remove right grid placement to reveal full image
		$(sectionImage).removeClass('is-hidden'); // show image
		$(sectionFacsimile).addClass('is-hidden'); // hide facsimile wrapper
		$(sectionSingle).removeClass('is-hidden'); // show full/right panel content
		$(sectionSingle).removeClass('panel--right'); // rename right panel step 1 (remove right panel class)
		$(sectionSingle).addClass('panel--full'); // rename right panel step 2 (add full panel class)
		$(sectionFull).removeClass('is-hidden'); // show full/right panel content
		console.log("I AM RESETTING THE ZOOMING IMAGE VIEWER AND MUSIC/IMAGE GRIDS");
	}
		/* language selections */
	function selectLangEnglishOrig() {
		$(languageEnglishOrigBtn).attr('data-language', 'active'); // make English Original Button active
		$(languageEnglishOrigBtn).siblings().attr('data-language', 'inactive'); // make non English Original Buttons inactive
		switchTextToEnglishOrig();
	}
	function selectLangEnglishNorm() {
		$(languageEnglishNormBtn).attr('data-language', 'active'); // make English Normalized Button active
		$(languageEnglishNormBtn).siblings().attr('data-language', 'inactive'); // make non English Normalized Buttons inactive
		switchTextToEnglishNorm();
	}
	function selectLangGerman() {
		$(languageGermanBtn).attr('data-language', 'active'); // make Latin German Button active
		$(languageGermanBtn).siblings().attr('data-language', 'inactive'); // make non Latin German Buttons inactive
		switchTextToGerman();
	}
	function selectLangLatinOrig() {
		$(languageLatinOrigBtn).attr('data-language', 'active'); // make Latin Original Button active
		$(languageLatinOrigBtn).siblings().attr('data-language', 'inactive'); // make non Latin Original Buttons inactive
		switchTextToLatinOrig();
	}
	function selectLangLatinReg() {
		$(languageLatinRegBtn).attr('data-language', 'active'); // make Latin Regularized Button active
		$(languageLatinRegBtn).siblings().attr('data-language', 'inactive'); // make non Latin Regularized Buttons inactive
		switchTextToLatinReg();
	}
	function selectLanguage(value) {
		var values = {
			'english_original': function() {
				// console.log("english_original");
				selectLangEnglishOrig();
				// checkState();
			},
			'english_modern': function() {
				// console.log("english_modern");
				selectLangEnglishNorm();
				// checkState();
			},
			'latin_original': function() {
				// console.log("latin_original");
				selectLangLatinOrig();
				// checkState();
			},
			'latin_normal': function() {
				// console.log("latin_normal");
				selectLangLatinReg();
				// checkState();
			},
			'german': function() {
				// console.log("german");
				selectLangGerman();
				// checkState();
			}
		};
		return(values[value])();
	}
	/* page layout */
	function selectLayout(value) {
		var values = {
			'compare': function() {
				// console.log("compare");
				selectLayoutComparative();
				checkState();
			},
			'digital-edition': function() {
				// console.log("digital-edition");
				selectLayoutDigitalEdition();
				checkState();
			},
			'zooming-image': function() {
				// console.log("zooming-image");
				selectLayoutBook();
				checkState();
			}
		};
		return(values[value])();
	}
	function selectLayoutComparative() {
		$(layoutComparativeBtn).attr('data-layout', 'active'); // make comparative layout state active
		$(layoutComparativeBtn).siblings().attr('data-layout', 'inactive'); // make digital edition and book layout states inactive
	}
	function selectLayoutDigitalEdition() {
		$(layoutDigitalEditionBtn).attr('data-layout', 'active'); // make digital edition layout state active
		$(layoutDigitalEditionBtn).siblings().attr('data-layout', 'inactive'); // make comparative and book layout states inactive
	}
	function selectLayoutBook() {
		$(layoutBookBtn).attr('data-layout', 'active'); // make book layout state active
		$(layoutBookBtn).siblings().attr('data-layout', 'inactive'); // make comparative and digital edition layout states inactive
	}
	function showDigitalEditionRight() {
		resetFacsimile();
		$(sectionSingle).removeClass('panel--full'); // remove full width
		$(sectionSingle).addClass('panel--right'); // add to right half
	}
	function showFacsimileFull() {
		$(sectionMusic).addClass('is-hidden'); // hide music
		$(sectionImage).addClass('is-hidden'); // hide image
		$(facsimileFull).removeClass(gridHalf); // make facsimile full width
		$(sectionFacsimile).removeClass(gridLeft); // make facsimile full width
		$(sectionFacsimile).removeClass(gridRight); // make facsimile full width
		$(sectionFacsimile).removeClass('is-hidden'); // show facsimile wrapper
		$(sectionSingle).addClass('is-hidden'); // hide full/right panel wrapper
		$(sectionFull).addClass('is-hidden'); // hide full/right panel content
	}
	function showFacsimileLeft() {
		$(sectionMusic).removeClass('is-hidden'); // reveal music
		$(sectionMusic).addClass(gridRight); // place music on right half of grid
		$(sectionMusic).removeClass(gridLeft); // remove music from left half of grid
		$(sectionImage).removeClass('is-hidden'); // reveal image
		$(sectionImage).addClass(gridRight); // place image on right half of grid
		$(sectionImage).removeClass(gridLeft); // remove image from left half of grid
		$(facsimileFull).addClass(gridHalf); // make facsimile half width (required because of fixed position in grid)
		$(sectionFacsimile).removeClass(gridRight); // remove facsimile from right grid columns
		$(sectionFacsimile).addClass(gridLeft); // add facsimile to left grid columns
		$(sectionFacsimile).removeClass('is-hidden'); // show facsimile wrapper
		$(sectionFull).addClass('panel--right'); // rename full panel step 1 (add right panel name)
		$(sectionFull).removeClass('panel--full'); // rename full panel step 2 (remove full panel name)
		$(sectionSingle).removeClass('is-hidden'); // hide full/right panel wrapper
		$(imageSectionRight).removeClass('panel--left'); // kludge to show right image
		$(imageSectionRight).removeClass('is-hidden'); // kludge to show right image
	}
	function showFull() {
		resetFacsimile();
	}
	/* text original/translation switches */
	function showOriginalLanguage() {
		$(singleOriginal).removeClass('is-hidden'); // display Latin/German text block
		$(singleTranslation).addClass('is-hidden'); // hide English text block
	}
	function showTranslation() {
		$(singleTranslation).removeClass('is-hidden'); // display English text block
		$(singleOriginal).addClass('is-hidden'); // hide Latin/German text block
	}
	/* text switches */
	function switchTextToEnglishOrig() {
		console.log("I am switching text to English Original");
		$(fullLatinText).removeClass('is-hidden'); // make full Latin text visible
		$(fullEnglishText).addClass('edition--facsimile'); // switch English text to facsimile CSS
		$(fullEnglishText).removeClass('edition--normalized'); // remove normalized CSS from English text
		showTranslation();
	}
	function switchTextToEnglishNorm() {
		console.log("I am switching text to English Normalized");
		$(fullEnglishText).addClass('edition--normalized'); // switch English text to normalized CSS
		$(fullEnglishText).removeClass('edition--facsimile'); // remove facsimile CSS from English text
		showTranslation();
	}
	function switchTextToLatinOrig() {
		console.log("I am switching text to Latin Original");
		$(fullLatinText).removeClass('is-hidden'); // make full Latin text visible
		$(fullLatinText).addClass('edition--original'); // switch full Latin text to edition--original CSS
		$(fullLatinText).removeClass('edition--regularized'); // remove edition--regularized CSS from full Latin text
		$(fullGermanText).addClass('is-hidden'); // hide full German text	
		showOriginalLanguage();	
	}
	function switchTextToLatinReg() {
		console.log("I am switching text to Latin Regularized");
		$(fullLatinText).removeClass('is-hidden'); // make full Latin text visible
		$(fullLatinText).addClass('edition--regularized'); // switch full Latin text to edition--regularized CSS
		$(fullLatinText).removeClass('edition--original'); // remove edition--original CSS from full Latin text
		$(fullGermanText).addClass('is-hidden'); // hide full German text
		showOriginalLanguage();	
	}
	function switchTextToGerman() {
		console.log("I am switching text to German");
		$(fullGermanText).removeClass('is-hidden'); // make full German text visible
		$(fullLatinText).addClass('is-hidden'); // hide full Latin text
		$(fullLatinDiscourse).removeClass('is-hidden'); // make full Latin discourse visible
		$(fullLatinText).addClass('edition--regularized'); // switch full Latin text to edition--regularized CSS
		$(fullLatinText).removeClass('edition--original'); // remove edition--original CSS from full Latin text
		showOriginalLanguage();
	}
	function updateDataState() {
		var mySingleData = document.querySelector(singleViewBtn);
		mySingleData.setAttribute("data-state", singleData);
		var myTest = $(singleViewBtn).attr('data-state');
		console.log("my new data state is " + myTest);
	}
	function updateEmblemPageData() {
		var thisEmblemPageData = document.querySelector('.emblem-page');
		thisEmblemPageData.setAttribute("data-page", 'c');
		console.log("this emblem page is " + thisEmblemPageData.getAttribute('data-page'));
		newEmblemPageData = thisEmblemPageData.getAttribute('data-page');
		// getData();
	}

// var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
// 	var myEmblemPage = $('.emblem-page').data("page");
// 	var startPage // the number of first page of current emblem
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
		getData();
	});

	function getData() {
		var theseEmblemPageData = document.querySelector('.emblem-page');
		console.log("I'm getting data");
		myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
		myEmblemPage = theseEmblemPageData.getAttribute("data-page");
		console.log("my emblem page is" + myEmblemPage);
		processMyEmblemData();	
}
function processMyEmblemData() {
	if (myEmblemDataNum <= 3) { // handle front matter (not in sets of 4)
			startPage = myEmblemDataNum + 7;
			showPages();
		}
		else if (myEmblemDataNum === 4) { // handle front matter: preface
			startPage = myEmblemDataNum + 9;
			showPages();
		}
		else if ( myEmblemDataNum > 4 && myEmblemPage === 'a' ) {
			startPage = myEmblemDataNum * 4 - 1;
			showPages();
		}
		else if ( myEmblemDataNum > 4 && myEmblemPage === 'b' ) {
			startPage = myEmblemDataNum * 4;
			showPages();
		}
		else if ( myEmblemDataNum > 4 && myEmblemPage === 'c' ) {
			startPage = myEmblemDataNum * 4 + 1;
			showPages();
		}
		else if ( myEmblemDataNum > 4 && myEmblemPage === 'd' ) {
			startPage = myEmblemDataNum * 4 + 2;
			showPages();
		}
		// else if (myEmblemDataNum > 4) { // handle emblems (in sets of 4)
		// 	startPage = myEmblemDataNum * 4 - 1;
		// }	
}

function showPages() {
	console.log("my start page is" + startPage);
	console.log("I'm refreshing the viewer");
	var atalantaZoom = pageView; // current view mode (initially pageView)
	viewer = OpenSeadragon({
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
	console.log(viewer);

}

/* SIDENAV */
//http://jennamolby.com/how-to-display-dynamic-content-on-a-page-using-url-parameters/
	// function sideNavHighlightDiscourse() {
	// 	$(discourseSideNav).siblings().removeClass('sidenav--is-active');
	// 	$(discourseSideNav).addClass('sidenav--is-active');
	// }
	// function sideNavHighlightEpigram() {
	// 	$(epigramSideNav).siblings().removeClass('sidenav--is-active');
	// 	$(epigramSideNav).addClass('sidenav--is-active');
	// }
	// function sideNavHighlightImage() {
	// 	$(imageSideNav).siblings().removeClass('sidenav--is-active');
	// 	$(imageSideNav).addClass('sidenav--is-active');
	// }
	// function sideNavHighlightMotto() {
	// 	$(mottoSideNav).siblings().removeClass('sidenav--is-active');
	// 	$(mottoSideNav).addClass('sidenav--is-active');
	// }

	// function sideNavHighlightMusic() {
	// 	$(musicSideNav).siblings().removeClass('sidenav--is-active');
	// 	$(musicSideNav).addClass('sidenav--is-active');
	// }
	// function sideNavSetNum() {
	// 	if (dataID === 1) {
	// 		$(prevBtn).addClass('is-hidden'); // do not display previous button on first emblem
	// 		$(nextBtn).removeClass('is-hidden'); // display next button
	// 		$(nextBtn).attr("href", "author-epigram.html"); // update the next button to link to the next emblem
	// 		$(emblemNumTextArea).text("Frontispiece"); // update the emblem title to reflect the current emblem number
	// 	}
	// 	else if (dataID === 2) {
	// 		$(prevBtn).attr("href", "frontispiece.html"); // update the previous button to link to the previous emblem
	// 		$(nextBtn).attr("href", "dedication.html"); // update the next button to link to the next emblem
	// 		$(emblemNumTextArea).text("Author's Epigram"); // update the emblem title to reflect the current emblem number	
	// 	}
	// 	else if (dataID === 3) {
	// 		$(prevBtn).attr("href", "author-epigram.html"); // update the previous button to link to the previous emblem
	// 		$(nextBtn).attr("href", "preface.html"); // update the next button to link to the next emblem
	// 		$(emblemNumTextArea).text("Dedication"); // update the emblem title to reflect the current emblem number
	// 	}
	// 	else if (dataID === 4) {
	// 		$(prevBtn).attr("href", "dedication.html"); // update the previous button to link to the previous emblem
	// 		$(nextBtn).attr("href", "emblem01.html"); // update the next button to link to the next emblem
	// 		$(emblemNumTextArea).text("Preface"); // update the emblem title to reflect the current emblem number
	// 	}
	// 	else if (dataID === 5) {
	// 		$(prevBtn).attr("href", "preface.html"); // update the previous button to link to the previous emblem
	// 		$(nextBtn).attr("href", "emblem" + nextEmblemNum + ".html"); // update the next button to link to the next emblem
	// 		$(emblemNumTextArea).text("Emblem " + currentEmblemNum); // update the emblem title to reflect the current emblem number
	// 	}
	// 	else if (dataID > 5 && dataID < 55) {
	// 		$(prevBtn).attr("href", "emblem" + prevEmblemNum + ".html"); // update the previous button to link to the previous emblem
	// 		$(nextBtn).attr("href", "emblem" + nextEmblemNum + ".html"); // update the next button to link to the next emblem
	// 		$(emblemNumTextArea).text("Emblem " + currentEmblemNum); // update the emblem title to reflect the current emblem number
	// 	}
	// 	else if (dataID === 55) {
	// 		$(prevBtn).attr("href", "emblem" + prevEmblemNum + ".html"); // update the previous button to link to the previous emblem
	// 		$(nextBtn).addClass('is-hidden'); // do not display next button
	// 		$(emblemNumTextArea).text("Emblem " + currentEmblemNum); // update the emblem title to reflect the current emblem number
	// 	}	
	// }
		

	/*** MOTTO WAYPOINT ***/
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	// var waypoint = new Waypoint({
	// 	element: document.getElementById('basic-waypoint__0'), // tells waypoint which DOM element's position to observe on scroll
	// 	handler: function(direction) { // triggered when the top of the element hits the top of the viewport
	// 		if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
	// 			sideNavHighlightMotto();
	// 		}
	// 		else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				
	// 		}
	// 	},
	// 	offset: 150, // moving the trigger location from 0 at the top of the viewport
	// })

	// /*** IMAGE WAYPOINT ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__1'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
				updateEmblemPageData();
				viewer.goToPage(myEmblemDataNum * 4);
			}
			else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				// sideNavHighlightMotto();
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})

	// /*** MUSIC WAYPOINT ***/
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__2'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
				// sideNavHighlightMusic();
				updateEmblemPageData();
				viewer.goToPage(myEmblemDataNum * 4 - 1);	
			}
			else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				// sideNavHighlightImage();
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})

	// /*** EPIGRAM WAYPOINT ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__3'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
				// sideNavHighlightEpigram();
				updateEmblemPageData();
				viewer.goToPage(myEmblemDataNum * 4);	
			}
			else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				// sideNavHighlightMusic();
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})

	// /*** DISCOURSE WAYPOINT ***/
	// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__4'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
				// sideNavHighlightDiscourse();
				updateEmblemPageData();
				viewer.goToPage(myEmblemDataNum * 4 + 1);
			}
			else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				// sideNavHighlightEpigram();
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})



});
