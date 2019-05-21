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
	var musicNotation = '.music-pages';
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


	// $('.loop').owlCarousel({
	// 	center: true,
	// 	items:2,
	// 	loop:true,
	// 	margin:10,
	// 	responsive:{
	// 		600:{
	// 			items:4
	// 		}
	// 	}
	// });
	// $('.nonloop').owlCarousel({
	// 	center: true,
	// 	items:2,
	// 	loop:false,
	// 	margin:10,
	// 	responsive:{
	// 		600:{
	// 			items:4
	// 		}
	// 	}
	// });

/* APPLY ACCESSIBILITY FIXES AFTER ALL DYNAMIC CONTENT LOADS */
$(window).on('load', function() {
	// setTimeout(function(){
	// 	// console.log("ALL ASSETS ARE LOADED!!!!")
	// 	musicAccessibility();
	// 	createScrollingScene();
	// }, 1500);
	
});

/* EVENTS */
	/* layout menu */
	$("#layout").selectmenu({
	  change: function(event, ui) {},
	  icons: { button: "custom-icon" }
	});	
	$("#layout").on( "selectmenuchange", function( event, ui ) {
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
			console.log("I AM IN CHECK STATE()");
			console.log("Comparative Layout is ACTIVE");
			showFacsimileLeft();
			showDigitalEditionRight();
		}
		else if ( $(layoutDigitalEditionBtn).attr('data-layout')===('active') ) { // if digital edition layout is active
			showDigitalEditionFull();
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
	function createScrollingScene() {
		console.log("I AM IN THE STICKY FUNCTION");
		myMusic = document.querySelector(".section__music");
		myMusicControls = document.querySelector(".ata-music > .transport");
		const controller = new ScrollMagic.Controller();
		const scene = new ScrollMagic.Scene({
			offset: -100,
			triggerElement: myMusic,
			triggerHook: 0,
			duration: getScrollingDuration(),
			reverse: true
		}).addTo(controller)
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
		let myDuration = (myMusic.offsetHeight - myMusicControls.offsetHeight) * 1.5;
		console.log(myDuration + " is my sticky scrolling duration / approx. px height of the music-page notation SVG");
		return myDuration;
	}
	function musicAccessibility() {
		$(musicNotation).attr('aria-hidden', 'true');
		$(playButton).attr('aria-label', 'Play Music');
		$(pauseButton).attr('aria-label', 'Pause Music');
		$(muteVoice1).attr('aria-label', 'Play or Mute Voice 1');
		$(muteVoice2).attr('aria-label', 'Play or Mute Voice 2');
		$(muteVoice3).attr('aria-label', 'Play or Mute Voice 3');
	}
	function onLoad() {
		console.log("I AM IN ONLOAD()");
		checkState();
		setTimeout(function(){
			// console.log("ALL ASSETS ARE LOADED!!!!")
			musicAccessibility();
			createScrollingScene();
		}, 1500);
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
		console.log(value);
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
		$(textOriginal).removeClass('is-hidden'); // display Latin/German text block
		$(textTranslation).addClass('is-hidden'); // hide English text block
	}
	function showTranslation() {
		$(textTranslation).removeClass('is-hidden'); // display English text block
		$(textOriginal).addClass('is-hidden'); // hide Latin/German text block
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

/* SIDENAV */
//http://jennamolby.com/how-to-display-dynamic-content-on-a-page-using-url-parameters/
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
});