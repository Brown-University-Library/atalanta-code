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
	/* other */
	var musicNotation = '.music-pages';
	var playButton = '.atalanta-notation-start';
	var pauseButton = '.atalanta-notation-stop';
	var muteVoice1 = '.atalanta-notation-mute-track:nth-of-type(1)';
	var muteVoice2 = '.atalanta-notation-mute-track:nth-of-type(2)';
	var muteVoice3 = '.atalanta-notation-mute-track:nth-of-type(3)';
	var hamburgerMenuBtn = 'nav.topnav button';
	var hamburgerMenuBtnClosed = 'topnav__hamburger--closed';
	var hamburgerMenuBtnOpen = 'topnav__hamburger--open';
	var hamburgerMenu = '.topnav > ul';


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

/* APPLY ACCESSIBILITY FIXES AFTER ALL DYNAMIC CONTENT LOADS */
$(window).on('load', function() {
	setTimeout(function(){
		// console.log("ALL ASSETS ARE LOADED!!!!")
		musicAccessibility();
	}, 3000);
	
});
$(hamburgerMenuBtn).click(function() {
	if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnClosed)) {
		console.log("I AM OPENING THE HAMBURGER MENU");
		$(hamburgerMenuBtn).removeClass('topnav__hamburger--closed');
		$(hamburgerMenuBtn).addClass('topnav__hamburger--open');
		$(hamburgerMenu).removeClass('topnav--slide-out');
		$(hamburgerMenu).addClass('topnav--slide-in');
	}
	else if($(hamburgerMenuBtn).hasClass(hamburgerMenuBtnOpen)) {
		console.log("I AM CLOSING THE HAMBURGER MENU");
		$(hamburgerMenuBtn).removeClass('topnav__hamburger--open');
		$(hamburgerMenuBtn).addClass('topnav__hamburger--closed');
		$(hamburgerMenu).removeClass('topnav--slide-in');
		$(hamburgerMenu).addClass('topnav--slide-out');
	}
	else {
		console.log("THE HAMBURGER MENU HAS NO CLASS");
	}
});

// $('.topnav__hamburger--closed').click(function() {
// 	console.log("I OPENED THE HAMBURGER MENU");
// 	$(hamburgerMenuBtn).addClass('topnav__hamburger--open');
// 	$(hamburgerMenuBtn).removeClass('topnav__hamburger--closed');
// 	$(hamburgerMenu).removeClass('topnav--slide-out');
// 	$(hamburgerMenu).addClass('topnav--slide-in');
// });
// $('.topnav__hamburger--open').click(function() {
// 	console.log("I CLOSED THE HAMBURGER MENU");
// 	$(hamburgerMenuBtn).removeClass('topnav__hamburger--open');
// 	$(hamburgerMenuBtn).addClass('topnav__hamburger--closed');
// 	$(hamburgerMenu).removeClass('topnav--slide-in');
// 	$(hamburgerMenu).addClass('topnav--slide-out');
// });

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
	function musicAccessibility() {
		$(musicNotation).attr('aria-hidden', 'true');
		$(playButton).attr('aria-label', 'Play Music');
		$(pauseButton).attr('aria-label', 'Pause Music');
		$(muteVoice1).attr('aria-label', 'Play or Mute Voice 1');
		$(muteVoice2).attr('aria-label', 'Play or Mute Voice 2');
		$(muteVoice3).attr('aria-label', 'Play or Mute Voice 3');
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