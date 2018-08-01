$(function () {
/* VARIABLES */
/* emblem nav */
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
/* emblem languages */
var singleEmblem = '.emblem__full .section--single';
var singleTranslation = '.section--single .translation';
var singleOriginal = '.section--single .original';
var singleFacsimile = '.emblem__full .facsimile';
var doubleEmblem = '.emblem__full .section--double';
var doubleTranslation = '.section--double .translation';
var doubleOriginal = '.section--double .original';
var leftEnglishGroup = '.left-english-text';
var rightEnglishGroup = '.right-english-text';
var leftOriginalGroup = '.left-latin-german-text';
var rightOriginalGroup = '.right-latin-german-text';
var leftFacsimileSwitch = '.left .facsimile-normalized-switch ul li:nth-child(1)';
var leftNormalizedSwitch = '.left .facsimile-normalized-switch ul li:nth-child(2)';
var rightFacsimileSwitch = '.right .facsimile-normalized-switch ul li:nth-child(1)';
var rightNormalizedSwitch = '.right .facsimile-normalized-switch ul li:nth-child(2)';
var leftLatinSwitch = '.left .latin-german-switch ul li:nth-child(1)';
var leftGermanSwitch = '.left .latin-german-switch ul li:nth-child(2)';
var rightLatinSwitch = '.right .latin-german-switch ul li:nth-child(1)';
var rightGermanSwitch = '.right .latin-german-switch ul li:nth-child(2)';
/* emblem side nav */
// var mottoSideNav = 'ul.sidenav__options > a li:nth-child(1)';
// var imageSideNav = 'ul.sidenav__options > a li:nth-child(2)';
// var musicSideNav = 'ul.sidenav__options > a li:nth-child(3)';
// var epigramSideNav = 'ul.sidenav__options > a li:nth-child(4)';
// var discourseSideNav = 'ul.sidenav__options > a li:nth-child(5)';
/* emblem halves */
var wholeEmblemWrapper = '.emblem__full';
var leftEmblem = '.emblem__left';
var rightEmblem = '.emblem__right';
var leftEmblemText = '.emblem__left .emblem';
var rightEmblemText = '.emblem__right .emblem';
var leftFacsimile = '.emblem__left .facsimile-wrapper';
var rightFacsimile = '.emblem__right .facsimile-wrapper';
var rightTranslation = '.emblem__right .translation';
var rightOriginal = '.emblem__right .original';
/* emblem sections */
var imageSection = '.emblem__full .image';
var musicSection = '.emblem__full .music';

/* INITIALIZE */
onLoad(); // display emblem menu and default options on page load

/* EVENTS */
/* pages */
$(doubleViewBtn).click(function() { // display split emblem
	console.log("I clicked on double view!");
	isActiveDouble(); // highlight double view
	if( $(facsimileSingleView).hasClass('is-active') ) { // display left facsimile if it is stored
		showFacsimile();
	}
	else if( $(facsimileDoubleView).hasClass('is-active') ) { // display right facsimile if it is stored
		showRightFacsimile();
	}
	else { // display emblem halves in whole emblem container if no facsimile is stored
		splitWholeEmblem();
	}
	return false;
});
$(singleViewBtn).click(function() { // display single emblem
	isActiveSingle(); // highlight single view
	rejoinWholeEmblem(); //replace left/right halves with full-width in whole emblem container
	if( $(facsimileSingleView).hasClass('is-active') ) { // display whole facsimile if left facsimile is active when switching from double to single view
		showFacsimile();
	}
	else if( $(englishSingleView).hasClass('is-active') ) { // display whole english text
		showTranslation();
	}
	else {  // display latin text in full-width or left half
		showOriginalLanguage();
	}
	return false;
});
/* languages */
$(englishSingleView).click(function() { // activate single english
	resetLanguagesOnLeft(); // hide all full-width text or left half text, except image and music sections
	showTranslation(); // show english text in full-width or left half
	if( $(this).hasClass('is-active') ) { 

	}
	else {
		$(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
		$(this).addClass('is-active'); // highlight selected view option in single nav
	}
	return false;
});
$(latinSingleView).click(function() { // activate single latin
	resetLanguagesOnLeft(); // hide all full-width text or left half text, except image and music sections
	showOriginalLanguage(); // show latin text in full-width or left half
	if( $(this).hasClass('is-active') ) {

	}
	else {
		$(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
		$(this).addClass('is-active'); // highlight selected view option in single nav
	}
	return false;
});
$(facsimileSingleView).click(function() { // activate single facsimile 
	if( $(this).hasClass('is-active') ) {

	}
	else {
		$(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
		$(this).addClass('is-active'); // highlight selected view option in nav
		showFacsimile(); // display full-width or left half facsimile
	}
	return false;
});
$(englishDoubleView).click(function() { // activate double english
	resetLanguagesOnRight(); // hide all full-width text or left half text, except image and music sections
	showTranslationDouble(); // show english text in right half
	if( $(this).hasClass('is-active') ) {

	}
	else {
		$(doubleNav).removeClass('is-active'); // remove highlight from other options in double nav
		$(this).addClass('is-active'); // highlight selected view option in nav
	}
	return false;
});
$(latinDoubleView).click(function() { // activate double latin
	resetLanguagesOnRight(); // hide all full-width text or left half text, except image and music sections
	showOriginalLanguageDouble(); // show latin text in right half
	if( $(this).hasClass('is-active') ) {

	}
	else {
		$(doubleNav).removeClass('is-active'); // remove highlight from other options in double nav
		$(this).addClass('is-active'); // highlight selected view option in nav
	}
	return false;
});
$(facsimileDoubleView).click(function() { // activate double facsimile
	if( $(this).hasClass('is-active') ) {

	}
	else { 
		$(doubleNav).removeClass('is-active'); // remove highlight from other options in double nav
		$(this).addClass('is-active'); // highlight selected view option in nav
		showRightFacsimile();
		if( $(leftEmblem).hasClass('is-hidden') ) {
			$(leftFacsimile).addClass('is-hidden'); // reset and hide left facsimile if the left panel is also hidden
		}
	}
	return false;
});
$(leftNormalizedSwitch).click(function() { // select left normalized switch
		$(leftNormalizedSwitch).addClass('is-selected'); // highlight german switch on left side
		$(leftFacsimileSwitch).removeClass('is-selected'); // remove highlight from latin on left side
		return false;
});
$(rightNormalizedSwitch).click(function() { // select right normalized switch
		$(rightNormalizedSwitch).addClass('is-selected'); // highlight german switch on right side
		$(rightFacsimileSwitch).removeClass('is-selected'); // remove highlight from latin on right side
		return false;
});
$(leftFacsimileSwitch).click(function() { // select left facsimile switch
		$(leftFacsimileSwitch).addClass('is-selected'); // highlight Latin switch on left side
		$(leftNormalizedSwitch).removeClass('is-selected'); // remove highlight from German on left side
		return false;
});
$(rightFacsimileSwitch).click(function() { // select right facsimile switch
		$(rightFacsimileSwitch).addClass('is-selected'); // highlight Latin switch on right side
		$(rightNormalizedSwitch).removeClass('is-selected'); // remove highlight from German on right side
		return false;
});
$(leftGermanSwitch).click(function() { // select left german switch
		$(leftGermanSwitch).addClass('is-selected'); // highlight german switch on left side
		$(leftLatinSwitch).removeClass('is-selected'); // remove highlight from latin on left side
		return false;
});
$(rightGermanSwitch).click(function() { // select right german switch
		$(rightGermanSwitch).addClass('is-selected'); // highlight german switch on right side
		$(rightLatinSwitch).removeClass('is-selected'); // remove highlight from latin on right side
		return false;
});
$(leftLatinSwitch).click(function() { // select left latin switch
		$(leftLatinSwitch).addClass('is-selected'); // highlight Latin switch on left side
		$(leftGermanSwitch).removeClass('is-selected'); // remove highlight from German on left side
		return false;
});
$(rightLatinSwitch).click(function() { // select right latin switch
		$(rightLatinSwitch).addClass('is-selected'); // highlight Latin switch on right side
		$(rightGermanSwitch).removeClass('is-selected'); // remove highlight from German on right side
		return false;
});
/* FUNCTIONS */
function onLoad() {
	$(doubleNav).toggleClass('is-hidden'); // hide last 3 language options for double view
	$(singleViewBtn).toggleClass('is-active'); // make "Single View" button active
	$(englishSingleView).toggleClass('is-active'); // highlight english translation as default single text
	$(latinDoubleView).toggleClass('is-active'); // highlight latin as default double text
	// $('ul.sidenav__options a:nth-child(1)').toggleClass('is-active'); // highlight motto in sidenav menu
	$('.wrapper-vertical-divider').toggleClass('is-disabled'); // hide vertical line that divides text sections
	console.log("352: I loaded the page");
}
// I need to take a deep look at the *pages* event listeners and these two functions below. Are they repeating themselves???
function isActiveSingle() { // make full-width emblem when single view is active
	if( $(singleViewBtn).hasClass('is-active') ) {
		console.log("357: single view is already active");
	}
	else {
		$(doubleNav).addClass('is-hidden'); // hide last 3 language options for double view
		$(doubleViewBtn).removeClass('is-active'); // remove highlight from double view button
		$(singleViewBtn).addClass('is-active'); // add highlight to single view button
		$(imageSection).removeClass('double'); // end half width image section
		$(imageSection).addClass('single'); // begin full width image section
		$(musicSection).removeClass('double'); // end half width music section
		$(musicSection).addClass('single'); // begin full width music section
		console.log("367: i'm making single view active in isActiveSingle()");

	}
}
function isActiveDouble() { // split whole emblem into left/right halves
	if( $(doubleViewBtn).hasClass('is-active') ) {
		console.log("373: double view is already active!!!");
	}
	else if( !$(doubleViewBtn).hasClass('is-active') && $(doubleNav).hasClass('is-hidden') ) { 
		$(doubleNav).removeClass('is-hidden'); // reveal last 3 language options for double view
		$(singleViewBtn).removeClass('is-active'); // remove highlight from single view button
		$(doubleViewBtn).addClass('is-active'); // add highlight to double view button
		$(imageSection).removeClass('single'); // end full width image section
		$(imageSection).addClass('double'); // begin half width image section
		$(musicSection).removeClass('single'); // end full width music section
		$(musicSection).addClass('double'); // begin half width music section
		console.log("383: i'm making double view active in isActiveDouble()");
	}
}
function splitWholeEmblem() {
	$(doubleEmblem).removeClass('is-hidden'); //replace full-width with left/right halves in whole emblem container
}
function rejoinWholeEmblem() {
	$(doubleEmblem).addClass('is-hidden'); //replace left/right halves with full-width in whole emblem container
}
function resetLanguagesOnLeft() {
	$(singleEmblem).removeClass('is-hidden'); // show full-width emblem
	$(singleFacsimile).addClass('is-hidden'); // hide full-width/left-half facsimile
	$(singleTranslation).addClass('is-hidden'); // hide full-width/left-half english text
	$(singleOriginal).addClass('is-hidden'); // hide full-width/left-half original language text
}
function resetLanguagesOnRight() {
	$(doubleEmblem).removeClass('is-hidden'); // show right half in whole emblem container
	$(doubleTranslation).addClass('is-hidden'); // hide all english text in right half
	$(doubleOriginal).addClass('is-hidden'); // hide all latin/german text in right half
	$(rightFacsimile).addClass('is-hidden'); // hide right facsimile
	$(rightTranslation).addClass('is-hidden'); // hide right emblem english text
	$(rightOriginal).addClass('is-hidden'); // hide right emblem latin/german text
}
function showTranslation() {
	$(singleTranslation).removeClass('is-hidden'); // display english text
	storeTranslationLeft(); // mark english text to be visible in left container of split facsimile view
	if( $(singleViewBtn).hasClass('is-active') ) {
		hideFacsimileHalves(); // hide split facsimile view
	}
}
function showTranslationDouble() {
	$(doubleTranslation).removeClass('is-hidden'); // show latin/german text in double half
	storeTranslationRight(); // mark english text to be visible in right container of split facsimile view
}
function showOriginalLanguage() {
	$(singleOriginal).removeClass('is-hidden'); // display default latin text
	storeOriginalLeft(); // mark default latin text to be visible in left container of split facsimile view
	if( $(singleViewBtn).hasClass('is-active') ) {
		hideFacsimileHalves(); // hide split facsimile view		
	}
}
function showOriginalLanguageDouble() {
	$(doubleOriginal).removeClass('is-hidden'); // show latin/german text in right half of whole emblem container
	storeOriginalLanguageRight(); // mark latin text to be visible in right container of split facsimile view
}
function showFacsimile() {
	storeFacsimileWhole(); // mark whole facsimile as active, even though the wrapper and its contents may be hidden
	storeFacsimileLeft(); // mark left facsimile as active, even though the wrapper and its contents may be hidden
	if( $(singleViewBtn).hasClass('is-active') ) { // make facsimile 100vh
		hideFacsimileHalves(); // show whole container emblem and hide left/right container emblems
	}
	// do I need an else if that applies to left facs when double view is active???
	else if( $(doubleViewBtn).hasClass('is-active') ) {
		hideFacsimileWhole(); // show split container emblems / hide whole container emblem
	}
}
function showRightFacsimile() { // show right facsimile and hide right emblem text  
		hideFacsimileWhole();
		storeFacsimileRight();
}
function storeTranslationLeft() {
	$('.emblem__left > .emblem').removeClass('is-hidden'); // show left emblem
	$('.emblem__left > .emblem').siblings().addClass('is-hidden'); // hide left facsimile
	$(leftEnglishGroup).removeClass('is-hidden'); // show left english text
	$(leftEnglishGroup).siblings().addClass('is-hidden'); // hide left original text
}
function storeTranslationRight() {
	$('.emblem__right > .emblem').removeClass('is-hidden'); // show right emblem
	$('.emblem__right > .emblem').siblings().addClass('is-hidden'); // hide right facsimile
	$(rightEnglishGroup).removeClass('is-hidden'); // show right english text
	$(rightEnglishGroup).siblings().addClass('is-hidden'); // hide right original text
}
function storeOriginalLeft() {
	$('.emblem__left > .emblem').removeClass('is-hidden'); // show left emblem
	$('.emblem__left > .emblem').siblings().addClass('is-hidden'); // hide left facsimile
	$(leftOriginalGroup).removeClass('is-hidden'); // show left latin text
}
function storeOriginalLanguageRight() {
	$('.emblem__right > .emblem').removeClass('is-hidden'); // show right emblem
	$('.emblem__right > .emblem').siblings().addClass('is-hidden'); // hide right facsimile
	$(rightOriginalGroup).removeClass('is-hidden'); // show right latin/german text
	$(rightOriginalGroup).siblings().addClass('is-hidden'); // hide right latin/german text
}
function storeFacsimileWhole() {
	$(singleFacsimile).removeClass('is-hidden'); // show full-width facsimile
	$(singleEmblem).addClass('is-hidden'); // hide whole emblem	
}
function storeFacsimileLeft() {
	$(leftFacsimile).removeClass('is-hidden'); // show left facsimile
	$(leftFacsimile).siblings().addClass('is-hidden'); // hide left emblem text
}
function storeFacsimileRight() {
	$(rightFacsimile).removeClass('is-hidden'); // show right facsimile
	$(rightFacsimile).siblings().addClass('is-hidden'); // hide right emblem text
}
function hideFacsimileHalves() {
	$(wholeEmblemWrapper).removeClass('is-hidden'); // show whole emblem
	$(leftEmblem).addClass('is-hidden'); // hide left emblem
	$(rightEmblem).addClass('is-hidden'); // hide right emblem
}
function hideFacsimileWhole() { // ***this has to happen whenever facsimile is selected in split view
	$(wholeEmblemWrapper).addClass('is-hidden'); // hide whole emblem
	$(leftEmblem).removeClass('is-hidden'); // show left emblem
	$(rightEmblem).removeClass('is-hidden'); // show right emblem
}
});