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
	var fullEnglishText = '.lang--english';
	var fullGermanText = '.lang--german';
	var fullLatinDiscourse = '.lang--latin._discourse--latin';
	var fullLatinText = '.lang--latin';
	var languageEnglishNormalized = '.lang--english.edition--normalized';
	var languageEnglishOriginal = '.lang--english.edition--original';
	var languageGerman = '.lang--german';
	var languageLatinOriginal = '.lang--latin.edition--original';
	var languageLatinRegularized = '.lang--latin.edition--regularized';
	var textTranslation = 'section > div.translation';
	var textOriginal = 'section > div.original';
	/* emblem containers */
	var containerFacsimile = '.section__facsimile';
	var containerEmblem = '.emblem';
	var panelLeft = 'panel--left';
	var panelRight = 'panel--right';
	var panelFull = 'panel--full';
	/* emblem sections */
	var facsimileFull = '.facsimile--full';
	var sectionFacsimile = '.section__facsimile';
	var sectionImage = '.section__image';
	var sectionMusic = '.section__music';
	/* emblem grid */
	var gridHalf = 'grid--half';
	var gridLeft = 'grid--left';
	var gridRight = 'grid--right';
	/* other */
	var musicNotation = '.cmn';
	var playButton = '.atalanta-notation-start';
	var pauseButton = '.atalanta-notation-stop';
	var muteVoice1 = '.atalanta-notation-mute-track:nth-of-type(1)';
	var muteVoice2 = '.atalanta-notation-mute-track:nth-of-type(2)';
	var muteVoice3 = '.atalanta-notation-mute-track:nth-of-type(3)';
	var emblemPage = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	var thumbnailNav = $('nav.digital-edition-nav'); // thumbnail navigation for digital edition
	var thumbnailPage // the number of the page in the digital edition matched to indexed thumbnails in nav
	var thumbnailNavTrigger = $('button.thumbnail-trigger'); // thumbnail nav drawer button
	var centeredThumbnail = $('nav.digital-edition-nav .center'); // get the thumbnail element for the current page
	var emblemNav = '.subnav-v3'; // emblem sub navigation
	var hamburgerMenuBtn = 'nav.topnav button';
	var hamburgerMenuBtnClosed = 'topnav__hamburger--closed';
	var hamburgerMenuBtnOpen = 'topnav__hamburger--open';
	var hamburgerMenu = '.topnav > ul';
	let myMusic;
	let myMusicControls;

			var musicControlPosition = '.transport';
	var zoomingViewer
	var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	var startPage // the number of first page of current emblem
	var currentPage
	var currentLanguage
	var pageTiles = "../data/json/pageView.json"; // file path to page view dzi files
	var bookTiles = "../data/json/bookView.json"; // file path to book view dzi files
	var waypointFrontispiece = ".section__frontispiece";
	var waypointAuthorEpigram = '.section__author-epigram';
	var waypointDedication1 = '.section__dedication';
	var waypointDedicationBEnglish = $('.pb.atalanta-fugiens:eq(0)');
	var waypointDedicationCEnglish = $('.pb.atalanta-fugiens:eq(1)');
	var waypointDedicationALatin = $('.pb.atalanta-fugiens:eq(2)');
	var waypointDedicationBLatin = $('.pb.atalanta-fugiens:eq(3)');
	var waypointDedicationCLatin = $('.pb.atalanta-fugiens:eq(4)');
	var waypointPreface1 = '.section__preface';
	var waypointPrefaceCEnglish = $('.pb.atalanta-fugiens:eq(1)');
	var waypointPrefaceDEnglish = $('.pb.atalanta-fugiens:eq(2)');
	var waypointPrefaceEEnglish = $('.pb.atalanta-fugiens:eq(3)');
	var waypointPrefaceFEnglish = $('.pb.atalanta-fugiens:eq(4)');
	var waypointPrefaceBLatin = $('.pb.atalanta-fugiens:eq(6)');
	var waypointPrefaceCLatin = $('.pb.atalanta-fugiens:eq(7)');
	var waypointPrefaceDLatin = $('.pb.atalanta-fugiens:eq(8)');
	var waypointPrefaceELatin = $('.pb.atalanta-fugiens:eq(9)');
	var waypointMotto = '._motto--english';
	var waypointMottoGerman = '._motto--german';
	var waypointImage = '.section__image';
	var waypointMusic = '.section__music';
	var waypointEpigram = '.section__epigram';
	var waypointDiscourse1 = '.section__discourse';
	var waypointDiscourseEnglish2 = '._discourse--english .discourse-p2';
	var waypointDiscourseLatin2 = '._discourse--latin .discourse-p2';
	var waypointFront1
	var waypointFront2
	var waypointFront3
	var waypointFront4
	var waypointFront5
	var waypointFront6
	var waypointFront7
	var waypointFront8
	var waypointFront9
	var waypointFront10
	var waypointFront11
	var waypointFront12
	var waypointFront13
	var waypointFront14
	var waypointFrontP2E
	var waypointFrontP2L
	var waypointFrontP3E
	var waypointFrontP3L
	var waypointFrontP4E
	var waypointFrontP4L
	var waypointFrontP5E
	var waypointFrontP5L
	var waypointFrontD2E
	var waypointFrontD2L
	var waypointFrontD3E
	var waypointFrontD3L
	var waypoint1A
	var waypoint1B
	var waypoint2
	var waypoint3
	var waypoint4
	var waypoint5
	var waypoint6
	var waypoint7
	var waypointD2E
	var waypointD2L
	var scrollPos = 0;
	var waypointDedication1 = '.section__dedication';
	var waypointDedication2 = '.section__dedication .page:nth-of-type(2)';
	var waypointDedication3 = '.section__dedication .page:nth-of-type(3)';
	// var germanEpigramWaypoint;
	// var englishEpigramWaypoint;

	// var dedicationLatinPage1 = document.querySelector(".section__dedication .page:nth-of-type(1)");
	// var dedicationLatinPage2 = document.querySelector(".section__dedication .page:nth-of-type(2)");
	// var dedicationLatinPage3 = document.querySelector(".section__dedication .page:nth-of-type(3)");

	// function addWaypoints() {
	// 	dedicationLatinPage1.setAttribute("id", "basic-waypoint__dedication1");
	// 	dedicationLatinPage2.setAttribute("id", "basic-waypoint__dedication2");
	// 	dedicationLatinPage3.setAttribute("id", "basic-waypoint__dedication3");
	// }



	// var thisEmblemPage = '.emblem-page';
	// var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	// var myEmblemPage = $('.emblem-page').data("page");
	// var startPage; // the number of first page of current emblem
	// var newEmblemPageData;
	// var viewer;

	// var thisEmblemPage = '.emblem-page';
	// var myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
	// var myEmblemPage = $('.emblem-page').data("page");
	// var startPage; // the number of first page of current emblem
	// var newEmblemPageData;
	// var viewer;


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

/* digital edition thumbnail navigation */
	thumbnailPage = emblemPage - 1;
	const $owlCarousel = $(".owl-carousel").owlCarousel({
		center: true,
		dots: false,
		items: 10,
		loop: true, 
		nav: true,
		navText: [
			'<svg id="icon_arrow-left-lineart" data-name="icon_arrow-left-lineart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.6 250.2"><title>export_icon_arrow-left-lineart</title><polyline points="126.9 1.8 3.5 125.1 126.9 248.5" fill="none" stroke="#dc4929" stroke-miterlimit="10" stroke-width="5"/></svg>',
			'<svg id="icon_arrow-right-lineart" data-name="icon_arrow-right-lineart" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 128.6 250.2"><title>export_icon_arrow-right-lineart</title><polyline points="1.8 248.5 125.1 125.1 1.8 1.8" fill="none" stroke="#dc4929" stroke-miterlimit="10" stroke-width="5"/></svg>'
		],
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
		},
		startPosition: thumbnailPage
	});
	$(thumbnailNavTrigger).on("click", function() {
		thumbnailNavAnimate();
	});



/* FUNCTIONS */
	function checkState() {
		if ( $(layoutComparativeBtn).attr('data-layout')===('active') ) {
			showFacsimileLeft();
			showDigitalEditionRight();	
		}
		else if ( $(layoutDigitalEditionBtn).attr('data-layout')===('active') ) { // if digital edition layout is active
			showDigitalEditionFull();
		}
		else if ( $(layoutBookBtn).attr('data-layout')===('active') ) { // if book is active
			showFacsimileFull();
		}
		else {
			console.log("NONE OF THE LAYOUTS APPLY!!!");
		}
		// getDataState();
	}
	function createScrollingScene() {
		myMusic = document.querySelector(".section__music");
		myMusicControls = document.querySelector(".ata-music > .transport");
		const controller = new ScrollMagic.Controller();
		const scene = new ScrollMagic.Scene({
			offset: -104,
			triggerElement: myMusic,
			triggerHook: 0,
			duration: getScrollingDuration, // this creates an endless callback over getScrollingDuration(), but the height/duration of the digital edition music isn't consistent otherwise
			reverse: true
		}).addTo(controller)
		.refresh()
		.on("enter", function(e) {
			$(myMusicControls).addClass('is-stuck');
		})
		.on("leave", function(e) {
			$(myMusicControls).removeClass('is-stuck');
		});
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
	function getScrollingDuration() {
		let myMusicHeight = $('.cmn').height();
		// console.log("my music div height = " + myMusicHeight);
		let myDuration = myMusicHeight * .93;
		// console.log(myDuration + " is my sticky scrolling duration / approx. px height of the music-page notation SVG");
		return myDuration;
	}
	function musicAccessibility() {
		$(musicNotation).attr('aria-hidden', 'true');
	}
	function onLoad() {
		checkState();
		if (emblemPage >= 5) {
			musicAccessibility();
			createScrollingScene();
		}
	}
	/* language selections */
	function selectLangEnglishOrig() {
		console.log("THIS");
		$(languageEnglishOrigBtn).attr('data-language', 'active'); // make English Original Button active
		$(languageEnglishOrigBtn).siblings().attr('data-language', 'inactive'); // make non English Original Buttons inactive
		switchTextToEnglishOrig();
	}
	function selectLangEnglishNorm() {
		console.log("THIS");
		$(languageEnglishNormBtn).attr('data-language', 'active'); // make English Normalized Button active
		$(languageEnglishNormBtn).siblings().attr('data-language', 'inactive'); // make non English Normalized Buttons inactive
		switchTextToEnglishNorm();
	}
	function selectLangGerman() {
		console.log("THIS");
		$(languageGermanBtn).attr('data-language', 'active'); // make Latin German Button active
		$(languageGermanBtn).siblings().attr('data-language', 'inactive'); // make non Latin German Buttons inactive
		switchTextToGerman();
	}
	function selectLangLatinOrig() {
		console.log("THIS");
		$(languageLatinOrigBtn).attr('data-language', 'active'); // make Latin Original Button active
		$(languageLatinOrigBtn).siblings().attr('data-language', 'inactive'); // make non Latin Original Buttons inactive
		switchTextToLatinOrig();
	}
	function selectLangLatinReg() {
		console.log("THIS");
		$(languageLatinRegBtn).attr('data-language', 'active'); // make Latin Regularized Button active
		$(languageLatinRegBtn).siblings().attr('data-language', 'inactive'); // make non Latin Regularized Buttons inactive
		switchTextToLatinReg();
	}
	function selectLanguage(value) {
		console.log(value);
		console.log("IS");
		var values = {
			'english_original': function() {
				selectLangEnglishOrig();
				// checkState();
			},
			'english_modern': function() {
				selectLangEnglishNorm();
				// checkState();
			},
			'latin_original': function() {
				selectLangLatinOrig();
				// checkState();
			},
			'latin_normal': function() {
				selectLangLatinReg();
				// checkState();
			},
			'german': function() {
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
				selectLayoutComparative();
				checkState();
			},
			'digital-edition': function() {
				selectLayoutDigitalEdition();
				checkState();
			},
			'zooming-image': function() {
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
	function showDigitalEditionFull() {
		$(containerEmblem).removeClass(panelRight); // remove right half placement
		$(containerEmblem).addClass(panelFull); // allow full width placement
		$(containerEmblem).removeClass('is-hidden'); // show emblem wrapper if hidden
		$(containerFacsimile).addClass('is-hidden'); // hide facsimile wrapper if visible
	}
	function showDigitalEditionRight() {
		$(containerEmblem).removeClass(panelFull);
		$(containerEmblem).addClass(panelRight);
		$(containerEmblem).removeClass('is-hidden'); // show emblem wrapper if hidden
	}
	function showFacsimileFull() {
		$(containerFacsimile).removeClass(panelLeft);
		$(containerFacsimile).addClass(panelFull);
		$(facsimileFull).removeClass(gridHalf); // make facsimile full width
		$(containerFacsimile).removeClass('is-hidden');
		$(containerEmblem).addClass('is-hidden');
	}
	function showFacsimileLeft() {
		$(containerFacsimile).removeClass(panelFull); // remove full width facsimile
		$(containerFacsimile).addClass(panelLeft); // make facsimile half width (required because of fixed position in grid)
		$(facsimileFull).addClass(gridHalf); // make facsimile half the window width;
		$(containerFacsimile).removeClass('is-hidden'); // show facsimile wrapper
	}
	/* text original/translation switches */
	function showOriginalLanguage() {
		console.log("PROBLEM");
		$(textOriginal).removeClass('is-hidden'); // display Latin/German text block
		$(textOriginal).addClass('is-shown'); // display Latin/German text block
		$(textTranslation).addClass('is-hidden'); // hide English text block
		$(textTranslation).removeClass('is-shown'); // hide English text block
	}
	function showTranslation() {
		console.log("PROBLEM");
		$(textTranslation).removeClass('is-hidden'); // display English text block
		$(textTranslation).addClass('is-shown'); // display English text block
		$(textOriginal).addClass('is-hidden'); // hide Latin/German text block
		$(textOriginal).removeClass('is-shown'); // hide Latin/German text block
	}
	/* emblem subnav */
	function subnavHide() {
		$(emblemNav).removeClass('is-visible');
		$(emblemNav).addClass('is-hidden');
	}
	function subnavReveal() {
		$(emblemNav).removeClass('is-hidden');
		$(emblemNav).addClass('is-visible');
	}
	/* text switches */
	function switchTextToEnglishOrig() {
		console.log("THE");
		$(fullLatinText).removeClass('is-hidden'); // make full Latin text visible
		$(fullEnglishText).addClass('edition--facsimile'); // switch English text to facsimile CSS
		$(fullEnglishText).removeClass('edition--normalized'); // remove normalized CSS from English text
		showTranslation();
	}
	function switchTextToEnglishNorm() {
		console.log("THE");
		$(fullEnglishText).addClass('edition--normalized'); // switch English text to normalized CSS
		$(fullEnglishText).removeClass('edition--facsimile'); // remove facsimile CSS from English text
		showTranslation();
	}
	function switchTextToLatinOrig() {
		console.log("THE");
		$(fullLatinText).removeClass('is-hidden'); // make full Latin text visible
		$(fullLatinText).addClass('edition--original'); // switch full Latin text to edition--original CSS
		$(fullLatinText).removeClass('edition--regularized'); // remove edition--regularized CSS from full Latin text
		$(fullGermanText).addClass('is-hidden'); // hide full German text	
		showOriginalLanguage();	
	}
	function switchTextToLatinReg() {
		console.log("THE");
		$(fullLatinText).removeClass('is-hidden'); // make full Latin text visible
		$(fullLatinText).addClass('edition--regularized'); // switch full Latin text to edition--regularized CSS
		$(fullLatinText).removeClass('edition--original'); // remove edition--original CSS from full Latin text
		$(fullGermanText).addClass('is-hidden'); // hide full German text
		showOriginalLanguage();	
	}
	function switchTextToGerman() {
		console.log("THE");
		$(fullGermanText).removeClass('is-hidden'); // make full German text visible
		$(fullLatinText).addClass('is-hidden'); // hide full Latin text
		$(fullLatinDiscourse).removeClass('is-hidden'); // make full Latin discourse visible
		$(fullLatinText).addClass('edition--regularized'); // switch full Latin text to edition--regularized CSS
		$(fullLatinText).removeClass('edition--original'); // remove edition--original CSS from full Latin text
		showOriginalLanguage();
	}
	function thumbnailNavAnimate() {
		if ($(thumbnailNav).hasClass('de-nav--closed')) {
			thumbnailNavOpen();
			setTimeout(subnavHide, 250);
		}
		else if ($(thumbnailNav).hasClass('de-nav--open')) {
			thumbnailNavClose();
			subnavReveal();
		}
	}
	function thumbnailNavClose() {
		$(thumbnailNav).removeClass('de-nav--open');
		$(thumbnailNav).addClass('de-nav--closed');
	}
	function thumbnailNavOpen() {
		$(thumbnailNav).removeClass('de-nav--closed');
		$(thumbnailNav).addClass('de-nav--open');
	}
	function WidthChange(jsMediaQuery) {
		if(jsMediaQuery.matches) { // run on mobile devices/window widths
			setTimeout(function(){
				$('select#layout').val('digital-edition').selectmenu('refresh'); //change initial layout select menu option to digital edition
			}, 100);
			selectLayoutDigitalEdition(); // change page layout to digital edition
			checkState(); // make necessary page updates based on layout selection
		}
		else {
			// console.log("I am on a laptop or something");
		}
	}
	function updateDataState() {
		var mySingleData = document.querySelector(singleViewBtn);
		mySingleData.setAttribute("data-state", singleData);
		var myTest = $(singleViewBtn).attr('data-state');
		console.log("my new data state is " + myTest);
	}
	// function updateEmblemPageData() {
	// 	var thisEmblemPageData = document.querySelector('.emblem-page');
	// 	thisEmblemPageData.setAttribute("data-page", 'c');
	// 	console.log("this emblem page is " + thisEmblemPageData.getAttribute('data-page'));
	// 	newEmblemPageData = thisEmblemPageData.getAttribute('data-page');
	// 	// getData();
	// }

// 	function getData() {
// 		var theseEmblemPageData = document.querySelector('.emblem-page');
// 		console.log("I'm getting data");
// 		myEmblemDataNum = $('.emblem-page').data("id"); // get the data ID for the current emblem page
// 		myEmblemPage = theseEmblemPageData.getAttribute("data-page");
// 		console.log("my emblem page is" + myEmblemPage);
// 		processMyEmblemData();	
// }

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
	if(myEmblemDataNum === 3) { // DEDICATION (frontispiece and author's epigram are single pages anyway)
		waypointFront1 = $(waypointDedication1).waypoint({ // tells waypoint which DOM element's position to observe on scroll
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if(direction === 'down') { // if scrolling down the page, change zooming page to 4/4
					zoomingViewer.goToPage(myEmblemDataNum + 7);
				}
				else { // if scrolling back up the page

				}
			},
			offset: 0
		})
		$(waypointDedicationBEnglish).addClass('page-divider').html("");
		waypointFront2 = $(waypointDedicationBEnglish).waypoint({
			handler: function(direction) {
				if($('.section__dedication > div.original').hasClass('is-shown')) {
					// if latin is hidden, then enable english
				}
				else {
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 8);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 7);
					}
				}
			},
			offset: 480
		})
		waypointFrontD2E = waypointFront2[0];

		$(waypointDedicationCEnglish).addClass('page-divider').html("");
		waypointFront3 = $(waypointDedicationCEnglish).waypoint({
			handler: function(direction) {
				if($('.section__dedication > div.original').hasClass('is-shown')) {
					// if latin is hidden, then enable english
				}
				else {	
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 9);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 8);
					}
				}
			},
			offset: 480
		})
		waypointFrontD3E = waypointFront3[0];

		$(waypointDedicationBLatin).addClass('page-divider').html("");
		waypointFront4 = $(waypointDedicationBLatin).waypoint({
			handler: function(direction) {
				if($('.section__dedication > div.original').hasClass('is-shown')) {
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 8);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 7);
					}
				}
				else {
					// if latin is visible, then disable english
				}
			},
			offset: 480
		})
		waypointFrontD2L = waypointFront4[0];

		$(waypointDedicationCLatin).addClass('page-divider').html("");
		waypointFront5 = $(waypointDedicationCLatin).waypoint({
			handler: function(direction) {
				if($('.section__dedication > div.original').hasClass('is-shown')) {
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 9);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 8);
					}
				}
				else {
					// if latin is visible, then disable english
				}
			},
			offset: 500
		})
		waypointFrontD3L = waypointFront5[0];

		// enable/disable english/latin waypoints by selected language
		$("#language").on( "selectmenuchange", function( event, ui ) {
		  if(ui.item.value == 'latin_original') {
			  	waypointFrontD2E.disable();
			  	waypointFrontD3E.disable();
			  	waypointFrontD2L.enable();
			  	waypointFrontD3L.enable();
		  }
		  else if(ui.item.value == 'latin_normal') {
				waypointFrontD2E.disable();
				waypointFrontD3E.disable();
			  	waypointFrontD2L.enable();
			  	waypointFrontD3L.enable();
		  }
		  else if(ui.item.value == 'english_original') {
			  	waypointFrontD2L.disable();
			  	waypointFrontD3L.disable();
			  	waypointFrontD2E.enable();
			  	waypointFrontD3E.enable();
		  }
		  else if(ui.item.value == 'english_modern') {
		  		waypointFrontD2L.disable();
		  		waypointFrontD3L.disable();
			  	waypointFrontD2E.enable();
			  	waypointFrontD3E.enable();
		  }
		});
	}
	else if(myEmblemDataNum === 4) { // PREFACE
		waypointFront6 = $(waypointPreface1).waypoint({ // tells waypoint which DOM element's position to observe on scroll
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if(direction === 'down') { // if scrolling down the page, change zooming page to 4/4
					zoomingViewer.goToPage(myEmblemDataNum + 9);
				}
				else { // if scrolling back up the page

				}
			},
			offset: 0
		})

		$(waypointPrefaceCEnglish).addClass('page-divider').html("");
		waypointFront7 = $(waypointPrefaceCEnglish).waypoint({
			handler: function(direction) {
				if($('.section__preface > div.original').hasClass('is-shown')) {
					// if latin is hidden, then enable english
				}
				else {
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 10);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 9);
					}
				}
			},
			offset: 450
		})
		waypointFrontP2E = waypointFront7[0];

		$(waypointPrefaceDEnglish).addClass('page-divider').html("");
		waypointFront8 = $(waypointPrefaceDEnglish).waypoint({
			handler: function(direction) {
				if($('.section__preface > div.original').hasClass('is-shown')) {
					// if latin is hidden, then enable english
				}
				else {	
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 11);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 10);
					}
				}
			},
			offset: 450
		})
		waypointFrontP3E = waypointFront8[0];

		$(waypointPrefaceEEnglish).addClass('page-divider').html("");
		waypointFront9 = $(waypointPrefaceEEnglish).waypoint({
			handler: function(direction) {
				if($('.section__preface > div.original').hasClass('is-shown')) {
					// if latin is hidden, then enable english
				}
				else {	
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 12);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 11);
					}
				}
			},
			offset: 450
		})
		waypointFrontP4E = waypointFront9[0];

		$(waypointPrefaceFEnglish).addClass('page-divider').html("");
		waypointFront10 = $(waypointPrefaceFEnglish).waypoint({
			handler: function(direction) {
				if($('.section__preface > div.original').hasClass('is-shown')) {
					// if latin is hidden, then enable english
				}
				else {	
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 13);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 12);
					}
				}
			},
			offset: 450
		})
		waypointFrontP5E = waypointFront10[0];

		$(waypointPrefaceBLatin).addClass('page-divider').addClass('red').html("");
		waypointFront11 = $(waypointPrefaceBLatin).waypoint({
			handler: function(direction) {
				if($('.section__preface > div.original').hasClass('is-shown')) {
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 10);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 9);
					}
				}
				else {
					// if latin is visible, then disable english
				}
			},
			offset: 450
		})
		waypointFrontP2L = waypointFront11[0];

		$(waypointPrefaceCLatin).addClass('page-divider').html("");
		waypointFront12 = $(waypointPrefaceCLatin).waypoint({
			handler: function(direction) {
				if($('.section__preface > div.original').hasClass('is-shown')) {
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 11);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 10);
					}

				}
				else {
					// if latin is visible, then disable english
				}
			},
			offset: 450
		})
		waypointFrontP3L = waypointFront12[0];

		$(waypointPrefaceDLatin).addClass('page-divider').html("");
		waypointFront13 = $(waypointPrefaceDLatin).waypoint({
			handler: function(direction) {
				if($('.section__preface > div.original').hasClass('is-shown')) {
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 12);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 11);
					}
					
				}
				else {
					// if latin is visible, then disable english
				}
			},
			offset: 450
		})
		waypointFrontP4L = waypointFront13[0];

		$(waypointPrefaceELatin).addClass('page-divider').html("");
		waypointFront14 = $(waypointPrefaceELatin).waypoint({
			handler: function(direction) {
				if($('.section__preface > div.original').hasClass('is-shown')) {
					if(direction === 'down') {
						zoomingViewer.goToPage(myEmblemDataNum + 13);
					}
					else {
						zoomingViewer.goToPage(myEmblemDataNum + 12);
					}
				}
				else {
					// if latin is visible, then disable english
				}
			},
			offset: 450
		})
		waypointFrontP5L = waypointFront14[0];

		// enable/disable english/latin waypoints by selected language
		$("#language").on( "selectmenuchange", function( event, ui ) {
		  if(ui.item.value == 'latin_original') {
			  	waypointFrontP2E.disable();
			  	waypointFrontP3E.disable();
			  	waypointFrontP4E.disable();
			  	waypointFrontP5E.disable();
			  	waypointFrontP2L.enable();
			  	waypointFrontP3L.enable();
			  	waypointFrontP4L.enable();
			  	waypointFrontP5L.enable();
		  }
		  else if(ui.item.value == 'latin_normal') {
				waypointFrontP2E.disable();
				waypointFrontP3E.disable();
				waypointFrontP4E.disable();
			  	waypointFrontP5E.disable();
			  	waypointFrontP2L.enable();
			  	waypointFrontP3L.enable();
			  	waypointFrontP4L.enable();
			  	waypointFrontP5L.enable();
		  }
		  else if(ui.item.value == 'english_original') {
			  	waypointFrontP2L.disable();
			  	waypointFrontP3L.disable();
			  	waypointFrontP4L.disable();
			  	waypointFrontP5L.disable();
			  	waypointFrontP2E.enable();
			  	waypointFrontP3E.enable();
			  	waypointFrontP4E.enable();
			  	waypointFrontP5E.enable();
		  }
		  else if(ui.item.value == 'english_modern') {
		  		waypointFrontP2L.disable();
		  		waypointFrontP3L.disable();
		  		waypointFrontP4L.disable();
			  	waypointFrontP5L.disable();
			  	waypointFrontP2E.enable();
			  	waypointFrontP3E.enable();
			  	waypointFrontP4E.enable();
			  	waypointFrontP5E.enable();
		  }
		});
	}
	else if(myEmblemDataNum >= 5) { // EMBLEMS 1—50
		/*** MOTTO WAYPOINT ENGLISH / LATIN ***/
		// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
		waypoint1A = $(waypointMotto).waypoint({
			//element: document.querySelector(waypointMotto), // tells waypoint which DOM element's position to observe on scroll
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
					if($('.section__motto .original.is-shown ._motto--latin').hasClass('is-hidden')) { // german is visible
						zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
					}
					else { // german is not visible
				// if(scrollPos < 10){
					// if($('.section__motto div.original').hasClass('is-shown')) { // if latin is visible, then disable
					// 	console.log("showing english motto");
					// 	currentPage = myEmblemDataNum * 4;
					// 	zoomingViewer.goToPage(myEmblemDataNum * 4);
					// 	console.log("current page is " + currentPage);
					// }
					// else if($('.section__motto div.translation').hasClass('is-shown')) {
					// 	currentPage = myEmblemDataNum * 4;
						zoomingViewer.goToPage(myEmblemDataNum * 4);
						// console.log("current page is " + currentPage);
						// waypoint.refreshAll();
					}
				// }
						// if(scrollPos < 100){
						// 	zoomingViewer.goToPage(myEmblemDataNum * 4);
						// }
					// }
			},
			offset: 150 // moving the trigger location from 0 at the top of the viewport
		})


	// waypoint1B = $(waypointMottoGerman).waypoint({
	// 	//element: document.querySelector(waypointMotto), // tells waypoint which DOM element's position to observe on scroll
	// 	handler: function(direction) { // triggered when the top of the element hits the top of the viewport
	// 			// if($('.section__motto .original.is-shown ._motto--latin').hasClass('is-hidden')) { // german is visible
	// 				if(scrollPos < 10){
	// 					zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
	// 				}

	// 			// }
	// 			// else { // german is not visible
	// 			// 	zoomingViewer.goToPage(myEmblemDataNum * 4);
	// 			// }
	// 	},
	// 	enabled: false,
	// 	offset: 150 // moving the trigger location from 0 at the top of the viewport
	// })



		// /*** IMAGE WAYPOINT ***/
		// // instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
		waypoint2 = $(waypointImage).waypoint({
			//element: document.querySelector(waypointImage), // tells waypoint which DOM element's position to observe on scroll
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4
					console.log("hit image waypoint down");
					zoomingViewer.goToPage(myEmblemDataNum * 4);
				}
				else if (direction === 'up') { // if scrolling back up the page
					console.log("hit image waypoint up");
					if($('.section__motto .original.is-shown ._motto--latin').hasClass('is-hidden')) { // german is visible
						zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
						console.log("show german after image");
					}
					else { // german motto page
						zoomingViewer.goToPage(myEmblemDataNum * 4);
						console.log("show latin after image");
					}
				}
				else {
					console.log("waypoints doesn't detect a scroll direction");
				}
			},
			offset: 135, // moving the trigger location from 0 at the top of the viewport
		})

		// /*** MUSIC WAYPOINT ***/
		waypoint3 = $(waypointMusic).waypoint({
			element: document.querySelector(waypointMusic), // tells waypoint which DOM element's position to observe on scroll
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if(direction === 'down') { // if English && scrolling down the page, change zooming page to 1/4
					console.log("hit music waypoint down");
					// if($('.section__epigram .original.is-shown ._epigram--latin').hasClass('is-hidden')) { // if german epigram is visible
					// 	zoomingViewer.goToPage(myEmblemDataNum * 4);
					// }
					// else { //everything else
					// 	zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
					// }
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


		// /*** EPIGRAM WAYPOINT ***/
		waypoint4 = $(waypointEpigram).waypoint({
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if(direction === 'down') { // if scrolling down the page, change zooming page to 2/4 if Latin/English is active or 1/4 if German is active
					console.log("hit epigram waypoint down");
					if($('.section__epigram .original.is-shown ._epigram--latin').hasClass('is-hidden')) { //if german is visible
						zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
						console.log("german shown");				}
					else {
						zoomingViewer.goToPage(myEmblemDataNum * 4);
						console.log("german not-shown");
					}
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

		// /*** DISCOURSE WAYPOINT 1 ***/
		waypoint5 = $(waypointDiscourse1).waypoint({
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if(direction === 'down') { // if scrolling down the page, change zooming page to 3/4
					console.log("hit discourse 1 waypoint down");
					zoomingViewer.goToPage(myEmblemDataNum * 4 + 1);
				}
				else if (direction === 'up') { // if scrolling back up the page
					console.log("hit discourse 1 waypoint up");
					if($('.section__epigram .original.is-shown ._epigram--latin').hasClass('is-hidden')) { //if german is visible
						zoomingViewer.goToPage(myEmblemDataNum * 4 - 1);
					}
					else { // if german is not visible
						zoomingViewer.goToPage(myEmblemDataNum * 4);
					}
				}
				else {
					console.log("waypoints doesn't detect a scroll direction");
				}
			},
			offset: 150, // moving the trigger location from 0 at the top of the viewport
		})

		/*** DISCOURSE WAYPOINT 2 ENGLISH ***/
		waypoint6 = $(waypointDiscourseEnglish2).waypoint({
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if($('.section__discourse .original').hasClass('is-shown')) { // if latin is visible, then disable
					console.log("disabling english discourse 2");
				}
				else {
					console.log("enabling english discourse 2");
					if (scrollPos > 60) {
						if(direction === 'down') { // if scrolling down the page, change zooming page to 4/4
							zoomingViewer.goToPage(myEmblemDataNum * 4 + 2);
						}
						else { // if scrolling back up the page
							zoomingViewer.goToPage(myEmblemDataNum * 4 + 1);
					 	}
					}

				}
			},
			offset: 500 // moving the trigger location from 0 at the top of the viewport
		})
		waypointD2E = waypoint6[0];

		/*** DISCOURSE WAYPOINT 2 LATIN ***/
		waypoint7 = $(waypointDiscourseLatin2).waypoint({
			handler: function(direction) { // triggered when the top of the element hits the top of the viewport
				if($('.section__discourse .translation').hasClass('is-shown')) { // if english is visible, then disable
					console.log("disabling latin discourse 2");
				}
				else {
					console.log("enabling latin discourse 2");
					if (scrollPos > 60) {
						if(direction === 'down') { // if scrolling down the page, change zooming page to 4/4
							zoomingViewer.goToPage(myEmblemDataNum * 4 + 2);
						}
						else { // if scrolling back up the page
							zoomingViewer.goToPage(myEmblemDataNum * 4 + 1);
						}
					}
				}
			},
			offset: 500 // moving the trigger location from 0 at the top of the viewport
		})
		waypointD2L = waypoint7[0];

		$("#language").on( "selectmenuchange", function( event, ui ) {
		  console.log(ui.item.value);
		  if(ui.item.value == 'latin_original') {
		  	// currentLanguage = 'latin';
		  	// if((currentLanguage == 'english') || (currentLanguage == 'latin')) {
		  		// console.log(currentLanguage);
			  	waypointD2E.disable();
			  	waypointD2L.enable();
		  	// }
		  }
		  else if(ui.item.value == 'latin_normal') {
				waypointD2E.disable();
			  	waypointD2L.enable();
		  }
		  else if(ui.item.value == 'english_original') {
		  	// currentLanguage = 'english';
		  	// if((currentLanguage == 'english') || (currentLanguage == 'latin')) {
			  	// console.log(currentLanguage);
			  	waypointD2L.disable();
			  	waypointD2E.enable();
			  // };
		  }
		  else if(ui.item.value == 'english_modern') {
		  		waypointD2L.disable();
			  	waypointD2E.enable();
		  }
		});

		$(window).scroll(function (event) { // calculate scroll position so enabling discourse 2 happens locally
		    var scrollPosition = $(window).scrollTop();
		    var pageHeight = $(document).height();
		    var browserWindowHeight = $(window).height();

		    scrollPos = (scrollPosition / (pageHeight - browserWindowHeight)) * 100;
		    console.log("the scroll position is" + scrollPos);
		});
	}
});