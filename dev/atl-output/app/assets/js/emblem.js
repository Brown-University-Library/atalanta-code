$(function () {
/* VARIABLES */
	/* emblem nav */
	var layoutComparativeBtn = 'li.dropdown--layout:nth-child(1)';
	var layoutDigitalEditionBtn = 'li.dropdown--layout:nth-child(2)';
	var layoutBookBtn = 'li.dropdown--layout:nth-child(3)';
	var singleNav = '.subnav > ul li:nth-child(n + 2):nth-child(-n + 4)';
	var doubleNav = '.subnav > ul li:nth-last-child(-n + 3)';
	var singleViewBtn = '.subnav > ul li:nth-child(1)';
	var doubleViewBtn = '.subnav > ul li:nth-child(5)';
	var englishSingleView = '.subnav > ul li:nth-child(2)';
	var latinSingleView = '.subnav > ul li:nth-child(3)';
	var facsimileSingleView = '.subnav > ul li:nth-child(4)';
	var englishDoubleView = '.subnav > ul li:nth-child(6)';
	var latinDoubleView = '.subnav > ul li:nth-child(7)';
	var facsimileDoubleView = '.subnav > ul li:nth-child(8)';
	var singleData;
	var doubleData;
	var englishSingleData;
	var latinSingleData;
	var facsimileSingleData;
	var englishDoubleData;
	var latinDoubleData;
	var facsimileDoubleData;
	/* emblem languages */
	var textTranslated = '.section--single div.translation';
	var textOriginal = '.section--single div.original';

	// var singleTranslation = '.section--single div.translation';
	// var singleOriginal = '.section--single div.original';
	// var doubleTranslation = '.section--double div.translation';
	// var doubleOriginal = '.section--double div.original';

	var languageEnglishOriginal = '.lang--english.edition--original';
	var languageEnglishNormalized = '.lang--english.edition--normalized';
	var languageLatinOriginal = '.lang--latin.edition--original';
	var languageLatinRegularized = '.lang--latin.edition--regularized';
	var languageGerman = '.lang--german';
	// var fullEnglishText = '.panel--full .lang--english';
	// var leftEnglishText = '.panel--left .lang--english';
	// var rightEnglishText = '.panel--right .lang--english';
	// var fullLatinText = '.panel--full .lang--latin';
	// var leftLatinText = '.panel--left .lang--latin';
	// var rightLatinText = '.panel--right .lang--latin';
	// var fullGermanText = '.panel--full .lang--german';
	// var leftGermanText = '.panel--left .lang--german';
	// var rightGermanText = '.panel--right .lang--german';
	// var fullLatinDiscourse = '.panel--full .lang--latin._discourse--latin';
	// var leftLatinDiscourse = '.panel--left .lang--latin._discourse--latin';
	// var rightLatinDiscourse = '.panel--right .lang--latin._discourse--latin';
	/* switches */
	var leftFacsimileSwitch = '.left .facsimile-normalized-switch ul li:nth-child(1)';
	var rightFacsimileSwitch = '.right .facsimile-normalized-switch ul li:nth-child(1)';
	var leftNormalizedSwitch = '.left .facsimile-normalized-switch ul li:nth-child(2)';
	var rightNormalizedSwitch = '.right .facsimile-normalized-switch ul li:nth-child(2)';
	var leftLatinSwitch = '.left .latin-german-switch ul li:nth-child(1)';
	var rightLatinSwitch = '.right .latin-german-switch ul li:nth-child(1)';
	var leftGermanSwitch = '.left .latin-german-switch ul li:nth-child(2)';
	var rightGermanSwitch = '.right .latin-german-switch ul li:nth-child(2)';

	/* emblem side nav */
	var sideNav = '.wrapper-sidenav';
	var mottoSideNav = 'ul.sidenav__options > li:nth-child(1)';
	var imageSideNav = 'ul.sidenav__options > li:nth-child(2)';
	var musicSideNav = 'ul.sidenav__options > li:nth-child(3)';
	var epigramSideNav = 'ul.sidenav__options > li:nth-child(4)';
	var discourseSideNav = 'ul.sidenav__options > li:nth-child(5)';
	var sideNavOption = 'ul.sidenav__options > li';
	var sideNavArrows = 'ul.sidenav__navigation li a';
	var dataID = $('.emblem-page').data('id');
	var myEmblem = dataID - 4;
	var currentEmblemNum = myEmblem;
	var prevEmblemNum = currentEmblemNum - 1;
	var nextEmblemNum = currentEmblemNum + 1;
	var prevBtn = '#sidenav__prev';
	var nextBtn = '#sidenav__next';
	var emblemNumTextArea = '#sidenav__titles';

	/* emblem sections */
	var imageSectionRight = '.section__image.section--full.panel--right .image__picture.section--single';
	/* new variables (grid) */
	var sectionSingle = '.section--single';
	var sectionDouble = '.section--double';
	var sectionFull = '.section--full.panel--full'
	var sectionFullLeft = '.section--full.panel--left';
	var sectionFullRight = '.section--full.panel--right';
	var sectionFacsimile = '.section__facsimile';
	var facsimileFull = '.facsimile--full';
	var sectionImage = '.section__image';
	var imageFull = '.image--full';
	var sectionMusic = '.section__music';
	var musicFull = '.music--full';
	/* newer variables (grid2) */
	var gridLeft = 'grid--left';
	var gridRight = 'grid--right';
	var gridHalf = 'grid--half';
	var sectionEmblem = '.emblem';

/* INITIALIZE */
	onLoad(); // DISPLAY EMBLEM MENU AND DEFAULT OPTIONS ON PAGE LOAD

/* EVENTS */
	/* layouts */
	$(layoutComparativeBtn).click(function() { // PROCESS COMPARATIVE LAYOUT
		processLayoutComparative();
		checkState();
		return false;
	});
	$(layoutDigitalEditionBtn).click(function() { // PROCESS DIGITAL EDITION LAYOUT
		processLayoutDigitalEdition();
		checkState();
		return false;
	});
	$(layoutBookBtn).click(function() { // PROCESS BOOK LAYOUT
		processLayoutBook();
		checkState();
		return false;
	});
	function processLayoutComparative() {
		$(layoutComparativeBtn).attr('data-state', 'active'); // make comparative layout state active
		$(layoutComparativeBtn).siblings().attr('data-state', 'inactive'); // make digital edition and book layout states inactive
	}
	function processLayoutDigitalEdition() {
		$(layoutDigitalEditionBtn).attr('data-state', 'active'); // make digital edition layout state active
		$(layoutDigitalEditionBtn).siblings().attr('data-state', 'inactive'); // make comparative and book layout states inactive
	}
	function processLayoutBook() {
		$(layoutBookBtn).attr('data-state', 'active'); // make book layout state active
		$(layoutBookBtn).siblings().attr('data-state', 'inactive'); // make comparative and digital edition layout states inactive
	}
	/* pages */
	// $(doubleViewBtn).click(function() { // PROCESS COMPARATIVE VIEW PAGE
	// 	processComparativeView();
	// 	return false;
	// });
	// $(singleViewBtn).click(function() { // PROCESS SINGLE VIEW PAGE
	// 	processSingleView()
	// 	return false;
	// });
	/* languages */
	$(englishSingleView).click(function() { // ACTIVATE SINGLE ENGLISH
		processEnglishSingle();
		return false;
	});
	$(latinSingleView).click(function() { // ACTIVATE SINGLE LATIN
		processLatinSingle();
		return false;
	});
	$(facsimileSingleView).click(function() { // ACTIVATE SINGLE FACSIMILE
		processFacsimileSingle();
		return false;
	});
	$(englishDoubleView).click(function() { // ACTIVATE DOUBLE ENGLISH
		processEnglishDouble();
		return false;
	});
	$(latinDoubleView).click(function() { // ACTIVATE DOUBLE LATIN
		processLatinDouble();
		return false;
	});
	$(facsimileDoubleView).click(function() { // ACTIVATE DOUBLE FACSIMILE
		processFacsimileDouble();
		return false;

	});
	/* text switches */
	$(leftNormalizedSwitch).click(function() { // SELECT LEFT & FULL NORMALIZED SWITCH
		if($(leftNormalizedSwitch).hasClass('is-selected')) {

		}
		else {
			$(leftNormalizedSwitch).addClass('is-selected'); // highlight English normalized switch
			$(leftFacsimileSwitch).removeClass('is-selected'); // remove highlight from English facsimile switch
			$(fullEnglishText).addClass('edition--normalized'); // switch English text to normalized CSS
			$(fullEnglishText).removeClass('edition--facsimile'); // remove facsimile CSS from English text
			$(leftEnglishText).addClass('edition--normalized'); // switch English text to normalized CSS
			$(leftEnglishText).removeClass('edition--facsimile'); // remove facsimile CSS from English text
		}
		return false;
	});
	$(rightNormalizedSwitch).click(function() { // SELECT RIGHT NORMALIZED SWITCH
		if($(rightNormalizedSwitch).hasClass('is-selected')) {

		}
		else {
			$(rightNormalizedSwitch).addClass('is-selected'); // highlight English normalized switch
			$(rightFacsimileSwitch).removeClass('is-selected'); // remove highlight from English facsimile switch
			$(rightEnglishText).addClass('edition--normalized'); // switch English text to normalized CSS
			$(rightEnglishText).removeClass('edition--facsimile'); // remove facsimile CSS from English text
		}
		return false;
	});
	$(leftFacsimileSwitch).click(function() { // SELECT LEFT & FULL FACSIMILE SWITCH
		if($(leftFacsimileSwitch).hasClass('is-selected')) {

		}
		else {
			$(leftFacsimileSwitch).addClass('is-selected'); // highlight English facsimile switch
			$(leftNormalizedSwitch).removeClass('is-selected'); // remove highlight from English normalized switch
			$(fullEnglishText).addClass('edition--facsimile'); // switch English text to facsimile CSS
			$(fullEnglishText).removeClass('edition--normalized'); // remove normalized CSS from English text
			$(leftEnglishText).addClass('edition--facsimile'); // switch English text to facsimile CSS
			$(leftEnglishText).removeClass('edition--normalized'); // remove normalized CSS from English text
		}
		return false;
	});
	$(rightFacsimileSwitch).click(function() { // SELECT RIGHT FACSIMILE SWITCH
		if($(rightFacsimileSwitch).hasClass('is-selected')) {

		}
		else {
			$(rightFacsimileSwitch).addClass('is-selected'); // highlight English facsimile switch
			$(rightNormalizedSwitch).removeClass('is-selected'); // remove highlight from English normalized switch
			$(rightEnglishText).addClass('edition--facsimile'); // switch English text to facsimile CSS
			$(rightEnglishText).removeClass('edition--normalized'); // remove normalized CSS from English text
		}
		return false;
	});
	$(leftGermanSwitch).click(function() { // SELECT LEFT & FULL GERMAN SWITCH
		if($(leftGermanSwitch).hasClass('is-selected')) {

		}
		else {
			$(leftGermanSwitch).addClass('is-selected'); // highlight german switch on left side
			$(leftLatinSwitch).removeClass('is-selected'); // remove highlight from latin on left side
			$(fullGermanText).removeClass('is-hidden'); // make full German text visible
			$(fullLatinText).addClass('is-hidden'); // hide full Latin text
			$(fullLatinDiscourse).removeClass('is-hidden'); // make full Latin discourse visible
			$(leftGermanText).removeClass('is-hidden'); // make left German text visible
			$(leftLatinText).addClass('is-hidden'); // hide left Latin text
			$(leftLatinDiscourse).removeClass('is-hidden'); // make left Latin discourse visible
		}
		return false;
	});
	$(rightGermanSwitch).click(function() { // SELECT RIGHT GERMAN SWITCH
		if($(rightGermanSwitch).hasClass('is-selected')) {

		}
		else {
			$(rightGermanSwitch).addClass('is-selected'); // highlight german switch on left side
			$(rightLatinSwitch).removeClass('is-selected'); // remove highlight from latin on right side
			$(fullGermanText).removeClass('is-hidden'); // make full German text visible
			$(fullLatinText).addClass('is-hidden'); // hide full Latin text
			$(fullLatinDiscourse).removeClass('is-hidden'); // make full Latin discourse visible
			$(rightGermanText).removeClass('is-hidden'); // make right German text visible
			$(rightLatinText).addClass('is-hidden'); // hide right Latin text
			$(rightLatinDiscourse).removeClass('is-hidden'); // make right Latin discourse visible
		}
		return false;
	});
	$(leftLatinSwitch).click(function() { // SELECT LEFT & FULL LATIN SWITCH
		if($(leftLatinSwitch).hasClass('is-selected')) {

		}
		else {
			$(leftLatinSwitch).addClass('is-selected'); // highlight Latin switch on left side
			$(leftGermanSwitch).removeClass('is-selected'); // remove highlight from German on left side
			$(fullLatinText).removeClass('is-hidden'); // make full Latin text visible
			$(fullGermanText).addClass('is-hidden'); // hide full German text
			$(leftLatinText).removeClass('is-hidden'); // make left Latin text visible
			$(leftGermanText).addClass('is-hidden'); // hide left German text
		}
		return false;
	});
	$(rightLatinSwitch).click(function() { // SELECT RIGHT LATIN SWITCH
		if($(rightLatinSwitch).hasClass('is-selected')) {

		}
		else {
			$(rightLatinSwitch).addClass('is-selected'); // highlight Latin switch on right side
			$(rightGermanSwitch).removeClass('is-selected'); // remove highlight from German on right side
			$(fullLatinText).removeClass('is-hidden'); // make full Latin text visible
			$(fullGermanText).addClass('is-hidden'); // hide full German text
			$(rightLatinText).removeClass('is-hidden'); // make right Latin text visible
			$(rightGermanText).addClass('is-hidden'); // hide right German text
		}
	});
/* FUNCTIONS */
	function checkState() {
		if ( $(layoutComparativeBtn).attr('data-state')===('active') ) {
			showDigitalEditionRight();
			showFacsimileLeft();
			console.log("Comparative Layout is ACTIVE");
		}
		else if ( $(layoutDigitalEditionBtn).attr('data-state')===('active') ) { // if digital edition layout is active
			showFull();
			console.log("Digital Edition Layout is ACTIVE");
		}
		else if ( $(layoutBookBtn).attr('data-state')===('active') ) { // if book is active
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
	function updateDataState() {
		var mySingleData = document.querySelector(singleViewBtn);
		mySingleData.setAttribute("data-state", singleData);
		var myTest = $(singleViewBtn).attr('data-state');
		console.log("my new data state is " + myTest);
	}
	function onLoad() {
		checkState();
	}
	function processEnglishOriginal() {
		if ( $(languageEnglishOriginal).attr("data-state")===("active") ) {

		}
		else if ( $(languageEnglishOriginal).attr("data-state")===("inactive") ) {
			$(languageEnglishOriginal).attr('data-state','active');
		}
		checkState();
	}
	function processEnglishNormalized() {
		if ( $(languageEnglishNormalized).attr("data-state")===("active") ) {

		}
		else if ( $(languageEnglishNormalized).attr("data-state")===("inactive") ) {
			$(languageEnglishNormalized).attr('data-state','active');
		}
		checkState();
	}
	function processLatinOriginal() {
		if ( $(languageLatinOriginal).attr("data-state")===("active") ) {

		}
		else if ( $(languageLatinOriginal).attr("data-state")===("inactive") ) {
			$(languageLatinOriginal).attr('data-state','active');
		}
		checkState();
	}
	function processLatinRegularized() {
		if ( $(languageLatinRegularized).attr("data-state")===("active") ) {

		}
		else if ( $(languageLatinRegularized).attr("data-state")===("inactive") ) {
			$(languageLatinRegularized).attr('data-state','active');
		}
		checkState();
	}
	function processGerman() {
		if ( $(languageEGerman.attr("data-state")===("active") ) {

		}
		else if ( $(languageGerman).attr("data-state")===("inactive") ) {
			$(languageGerman).attr('data-state','active');
		}
		checkState();
	}

	function processEnglishDouble() {
		if ($(englishDoubleView).attr("data-state")===("active")) {

			
		}
		else if ($(englishDoubleView).attr("data-state")===("inactive")) {
			// $(doubleNav).attr('data-state','inactive');
			$(englishDoubleView).attr('data-state','active');
		}
		checkState();
				
		resetLanguagesOnRight(); // hide all full-width text or left half text, except image and music sections
		showTranslationDouble(); // show english text in right half
		if( $(englishDoubleView).hasClass('is-active') ) {

		}
		else {
			// $(doubleNav).removeClass('is-active'); // remove highlight from other options in double nav
			$(englishDoubleView).addClass('is-active'); // highlight selected view option in nav
		}
	}
	function processEnglishSingle() {
		if ($(englishSingleView).attr("data-state")===("active")) {

			
		}
		else if ($(englishSingleView).attr("data-state")===("inactive")) {
			// $(singleNav).attr('data-state','inactive');
			$(englishSingleView).attr('data-state','active');
		}
		checkState();

		resetLanguagesOnLeft(); // hide all full-width text or left half text, except image and music sections
		showTranslation(); // show english text in full-width or left half
		if( $(englishSingleView).hasClass('is-active') ) { 

		}
		else {
			// $(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
			$(englishSingleView).addClass('is-active'); // highlight selected view option in single nav
		}
	}
	function processFacsimileDouble() {
		if ($(facsimileDoubleView).attr("data-state")===("active")) {
			
		}
		else if ($(facsimileDoubleView).attr("data-state")===("inactive")) {
			// $(doubleNav).attr('data-state','inactive');
			$(facsimileDoubleView).attr('data-state','active');
		}
		checkState();		
		if( $(facsimileDoubleView).hasClass('is-active') ) {

		}
		else { 
			// $(doubleNav).removeClass('is-active'); // remove highlight from other options in double nav
			$(facsimileDoubleView).addClass('is-active'); // highlight selected view option in nav
		}
	}
	function processFacsimileSingle() {
		if ($(facsimileSingleView).attr("data-state")===("active")) {
			
		}
		else if ($(facsimileSingleView).attr("data-state")===("inactive")) {
			// $(singleNav).attr('data-state','inactive');
			$(facsimileSingleView).attr('data-state','active');
		}
		checkState();
		if( $(facsimileSingleView).hasClass('is-active') ) {

		}
		else {
			// $(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
			$(facsimileSingleView).addClass('is-active'); // highlight selected view option in nav
		}
	}
	function processLatinDouble() {
		if ($(latinDoubleView).attr("data-state")===("active")) {

			
		}
		else if ($(latinDoubleView).attr("data-state")===("inactive")) {
			// $(doubleNav).attr('data-state','inactive');
			$(latinDoubleView).attr('data-state','active');
		}
		checkState();
		resetLanguagesOnRight(); // hide all full-width text or left half text, except image and music sections
		showOriginalLanguageDouble(); // show latin text in right half
		if( $(latinDoubleView).hasClass('is-active') ) {

		}
		else {
			// $(doubleNav).removeClass('is-active'); // remove highlight from other options in double nav
			$(latinDoubleView).addClass('is-active'); // highlight selected view option in nav
		}
	}
	function processLatinSingle() {
		if ($(latinSingleView).attr("data-state")===("active")) {

			
		}
		else if ($(latinSingleView).attr("data-state")===("inactive")) {
			// $(singleNav).attr('data-state','inactive');
			$(latinSingleView).attr('data-state','active');
		}
		checkState();
		resetLanguagesOnLeft(); // hide all full-width text or left half text, except image and music sections
		showOriginalLanguage(); // show latin text in full-width or left half
		if( $(latinSingleView).hasClass('is-active') ) {

		}
		else {
			// $(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
			$(latinSingleView).addClass('is-active'); // highlight selected view option in single nav
		}
	}
	function resetFacsimile() {
		// console.log("I am in resetFacsimile()");
		$(sectionMusic).removeClass(gridLeft); // remove left grid placement to reveal full music
		$(sectionMusic).removeClass(gridRight); // remove right grid placement to reveal full music
		$(sectionMusic).removeClass('is-hidden'); // show music
		$(sectionImage).removeClass(gridLeft); // remove left grid placement to reveal full image
		$(sectionImage).removeClass(gridRight); // remove right grid placement to reveal full image
		$(sectionImage).removeClass('is-hidden'); // show image
		$(sectionFacsimile).addClass('is-hidden'); // hide facsimile wrapper
		$(sectionSingle).removeClass('is-hidden'); // show full/left panel content
		$(sectionSingle).removeClass('panel--left'); // rename left panel step 1 (remove left panel class)
		$(sectionSingle).addClass('panel--full'); // rename left panel step 2 (add full panel class)
		$(sectionFullLeft).addClass('panel--full'); 
		$(sectionFullLeft).removeClass('panel--left');
		$(sectionFull).removeClass('is-hidden');
		$(sectionFullRight).addClass('is-hidden');
		console.log("THIS IS HAPPENING");
	}
	// function resetLanguagesOnLeft() {		
	// 	$(singleTranslation).addClass('is-hidden'); // hide full-width/left-half english text
	// 	$(singleOriginal).addClass('is-hidden'); // hide full-width/left-half original language text
	// }
	// function resetLanguagesOnRight() {
	// 	$(doubleTranslation).addClass('is-hidden'); // hide all english text in right half
	// 	$(doubleOriginal).addClass('is-hidden'); // hide all latin/german text in right half
	// }
	function showDigitalEditionRight() {
		// console.log("I am in showHalves()");
		resetFacsimile();
		$(sectionSingle).removeClass('panel--full'); // switch from full to left and right halves
		$(sectionSingle).addClass('panel--left');
		$(sectionDouble).removeClass('is-hidden');
		$(sectionFullRight).addClass('is-hidden');
	}
	function showFacsimileFull() {
		// console.log("I am in showFacsimileFull()");
		$(sectionMusic).addClass('is-hidden'); // hide music
		$(sectionImage).addClass('is-hidden'); // hide image
		$(facsimileFull).removeClass(gridHalf); // make facsimile full width
		$(sectionFacsimile).removeClass(gridLeft); // make facsimile full width
		$(sectionFacsimile).removeClass(gridRight); // make facsimile full width
		$(sectionFacsimile).removeClass('is-hidden'); // show facsimile wrapper
		$(sectionSingle).addClass('is-hidden'); // hide full/left panel wrapper
		$(sectionDouble).addClass('is-hidden'); // hide right panel wrapper
		$(sectionFull).addClass('is-hidden'); // hide full/left panel content
		$(sectionFullRight).addClass('is-hidden'); // hide right panel content
		$(sideNav).addClass('is-hidden'); // hide sidenav when facsimile is active
	}
	function showFacsimileLeft() {
		// console.log("I am in showFacsimileLeft()");
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
		$(sectionFullRight).removeClass('is-hidden');  // show right half
		$(sectionSingle).removeClass('is-hidden'); // hide full/right panel wrapper
		// $(sectionFullLeft).addClass('is-hidden'); // hide full/left panel content
		$(imageSectionRight).removeClass('panel--left'); // kludge to show right image
		$(imageSectionRight).removeClass('is-hidden'); // kludge to show right image
	}
	function showFull() {
		// console.log("I am in showFull()");
		resetFacsimile();
		$(sectionDouble).addClass('is-hidden'); // show full / left half only
		$(sideNav).removeClass('is-hidden'); // show sidenav in single page view
	}
	function showOriginalLanguage() {
		$(singleOriginal).removeClass('is-hidden'); // display default latin text
	}
	function showOriginalLanguageDouble() {
		$(doubleOriginal).removeClass('is-hidden'); // show latin/german text in right half of whole emblem container
	}
	function showTranslation() {
		$(singleTranslation).removeClass('is-hidden'); // display english text
	}
	function showTranslationDouble() {
		$(doubleTranslation).removeClass('is-hidden'); // show latin/german text in double half
	}

/* SIDENAV */
//http://jennamolby.com/how-to-display-dynamic-content-on-a-page-using-url-parameters/
	function sideNavHighlightDiscourse() {
		$(discourseSideNav).siblings().removeClass('sidenav--is-active');
		$(discourseSideNav).addClass('sidenav--is-active');
	}
	function sideNavHighlightEpigram() {
		$(epigramSideNav).siblings().removeClass('sidenav--is-active');
		$(epigramSideNav).addClass('sidenav--is-active');
	}
	function sideNavHighlightImage() {
		$(imageSideNav).siblings().removeClass('sidenav--is-active');
		$(imageSideNav).addClass('sidenav--is-active');
	}
	function sideNavHighlightMotto() {
		$(mottoSideNav).siblings().removeClass('sidenav--is-active');
		$(mottoSideNav).addClass('sidenav--is-active');
	}

	function sideNavHighlightMusic() {
		$(musicSideNav).siblings().removeClass('sidenav--is-active');
		$(musicSideNav).addClass('sidenav--is-active');
	}
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
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__0'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
				sideNavHighlightMotto();
			}
			else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				
			}
		},
		offset: 150, // moving the trigger location from 0 at the top of the viewport
	})

	/*** IMAGE WAYPOINT ***/
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__1'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
				sideNavHighlightImage();
			}
			else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				sideNavHighlightMotto();
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})

	/*** MUSIC WAYPOINT ***/
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__2'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
				sideNavHighlightMusic();
			}
			else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				sideNavHighlightImage();
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})

	/*** EPIGRAM WAYPOINT ***/
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__3'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
				sideNavHighlightEpigram();
			}
			else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				sideNavHighlightMusic();
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})

	/*** DISCOURSE WAYPOINT ***/
	// instantiate the global Waypoint class and pass an options object to it. the two paramaters required are element and handler
	var waypoint = new Waypoint({
		element: document.getElementById('basic-waypoint__4'), // tells waypoint which DOM element's position to observe on scroll
		handler: function(direction) { // triggered when the top of the element hits the top of the viewport
			if(direction === 'down') { // if scrolling down the page, animate to the next part of the image
				sideNavHighlightDiscourse();
			}
			else { // if scrolling back up the page, animate to the previous part of the image and fade the current text out
				sideNavHighlightEpigram();
			}
		},
		offset: 300, // moving the trigger location from 0 at the top of the viewport
	})



});
