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
			// var leftEnglishGroup = '.left-english-text';
			// var rightEnglishGroup = '.right-english-text';
			// var leftOriginalGroup = '.left-latin-german-text';
			// var rightOriginalGroup = '.right-latin-german-text';
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
			// var wholeEmblemWrapper = '.emblem__full';
			// var leftEmblem = '.emblem__left';
			// var rightEmblem = '.emblem__right';
			// var leftEmblemText = '.emblem__left .emblem';
			// var rightEmblemText = '.emblem__right .emblem';
			// var leftFacsimile = '.emblem__left .facsimile-wrapper';
			// var rightTranslation = '.emblem__right .translation';
			// var rightOriginal = '.emblem__right .original';
			/* emblem sections */
			var imageSectionRight = '.section__image.section--full.panel--right .image__picture.section--single';
			// var musicSection = '.emblem__full .music';



			/* new variables */
			var sectionSingle = '.section--single';
			var sectionDouble = '.section--double';
			var sectionFull = '.section--full.panel--full'
			var sectionFullLeft = '.section--full.panel--left';
			var sectionFullRight = '.section--full.panel--right';
			var sectionFacsimile = '.section__facsimile';
			var facsimileFull = '.facsimile--full';
			var facsimileLeft = '.facsimile--left';
			var facsimileRight = '.facsimile--right';
/* INITIALIZE */
			onLoad(); // DISPLAY EMBLEM MENU AND DEFAULT OPTIONS ON PAGE LOAD

/* EVENTS */
			/* pages */
			$(doubleViewBtn).click(function() { // DISPLAY SPLIT EMBLEM
				isActiveDouble();// highlight side-by-side view button
				
				$(this).attr('data-state','active');
				$(singleViewBtn).attr('data-state','inactive');
				checkState();
				//CHECK FACSIMILE
				// console.log("I clicked on double view!");
				// isActiveDouble(); // highlight double view
				// if( $(facsimileSingleView).hasClass('is-active') ) { // display left facsimile if it is stored
				// 	showFacsimile();
				// }
				// else if( $(facsimileDoubleView).hasClass('is-active') ) { // display right facsimile if it is stored
				// 	showRightFacsimile();
				// }
				// else { // display emblem halves in whole emblem container if no facsimile is stored
				// 	splitWholeEmblem();
				// }
				return false;
			});
			$(singleViewBtn).click(function() { // DISPLAY SINGLE EMBLEM
				isActiveSingle();// highlight single view button
				
				$(this).attr('data-state', 'active');
				$(doubleViewBtn).attr('data-state', 'inactive');


				// if ($(englishSingleView).attr("data-state")===("active")) {
				// 	console.log("I'm an active one!");
				// 	$(englishSingleView).attr('data-state','inactive');
				// }
				checkState();
				//CHECK FACSIMILE
				// isActiveSingle(); // highlight single view
				// rejoinWholeEmblem(); //replace left/right halves with full-width in whole emblem container
				// if( $(facsimileSingleView).hasClass('is-active') ) { // display whole facsimile if left facsimile is active when switching from double to single view
				// 	showFacsimile();
				// }
				// else if( $(englishSingleView).hasClass('is-active') ) { // display whole english text
				// 	showTranslation();
				// }
				// else {  // display latin text in full-width or left half
				// 	showOriginalLanguage();
				// }

				return false;
			});
			/* languages */
			$(englishSingleView).click(function() { // ACTIVATE SINGLE ENGLISH
				if ($(englishSingleView).attr("data-state")===("active")) {

					
				}
				else if ($(englishSingleView).attr("data-state")===("inactive")) {
					$(singleNav).attr('data-state','inactive');
					$(this).attr('data-state','active');
				}
				checkState();
/////////////////////
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
			$(latinSingleView).click(function() { // ACTIVATE SINGLE LATIN
				if ($(latinSingleView).attr("data-state")===("active")) {

					
				}
				else if ($(latinSingleView).attr("data-state")===("inactive")) {
					$(singleNav).attr('data-state','inactive');
					$(this).attr('data-state','active');
				}
				checkState();
/////////////////////////
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
			$(facsimileSingleView).click(function() { // ACTIVATE SINGLE FACSIMILE
				if ($(facsimileSingleView).attr("data-state")===("active")) {
					
				}
				else if ($(facsimileSingleView).attr("data-state")===("inactive")) {
					$(singleNav).attr('data-state','inactive');
					$(this).attr('data-state','active');
				}
				checkState();
///////////////////////////

				if( $(this).hasClass('is-active') ) {

				}
				else {
					$(singleNav).removeClass('is-active'); // remove highlight from other options in single nav
					$(this).addClass('is-active'); // highlight selected view option in nav
					showFacsimile(); // display full-width or left half facsimile
				}
				return false;
			});
			$(englishDoubleView).click(function() { // ACTIVATE DOUBLE ENGLISH
				if ($(englishDoubleView).attr("data-state")===("active")) {

					
				}
				else if ($(englishDoubleView).attr("data-state")===("inactive")) {
					$(doubleNav).attr('data-state','inactive');
					$(this).attr('data-state','active');
				}
				checkState();
/////////////////////				
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
			$(latinDoubleView).click(function() { // ACTIVATE DOUBLE LATIN
				if ($(latinDoubleView).attr("data-state")===("active")) {

					
				}
				else if ($(latinDoubleView).attr("data-state")===("inactive")) {
					$(doubleNav).attr('data-state','inactive');
					$(this).attr('data-state','active');
				}


				checkState();
/////////////////////
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
			$(facsimileDoubleView).click(function() { // ACTIVATE DOUBLE FACSIMILE
				if ($(facsimileDoubleView).attr("data-state")===("active")) {
					
				}
				else if ($(facsimileDoubleView).attr("data-state")===("inactive")) {
					$(doubleNav).attr('data-state','inactive');
					$(this).attr('data-state','active');
				}
				checkState();
////////////////////				
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
			/* text switches */
			$(leftNormalizedSwitch).click(function() { // SELECT LEFT NORMALIZED SWITCH
					$(leftNormalizedSwitch).addClass('is-selected'); // highlight german switch on left side
					$(leftFacsimileSwitch).removeClass('is-selected'); // remove highlight from latin on left side
					return false;
			});
			$(rightNormalizedSwitch).click(function() { // SELECT RIGHT NORMALIZED SWITCH
					$(rightNormalizedSwitch).addClass('is-selected'); // highlight german switch on right side
					$(rightFacsimileSwitch).removeClass('is-selected'); // remove highlight from latin on right side
					return false;
			});
			$(leftFacsimileSwitch).click(function() { // SELECT LEFT FACSIMILE SWITCH
					$(leftFacsimileSwitch).addClass('is-selected'); // highlight Latin switch on left side
					$(leftNormalizedSwitch).removeClass('is-selected'); // remove highlight from German on left side
					return false;
			});
			$(rightFacsimileSwitch).click(function() { // SELECT RIGHT FACSIMILE SWITCH
					$(rightFacsimileSwitch).addClass('is-selected'); // highlight Latin switch on right side
					$(rightNormalizedSwitch).removeClass('is-selected'); // remove highlight from German on right side
					return false;
			});
			$(leftGermanSwitch).click(function() { // SELECT LEFT GERMAN SWITCH
					$(leftGermanSwitch).addClass('is-selected'); // highlight german switch on left side
					$(leftLatinSwitch).removeClass('is-selected'); // remove highlight from latin on left side
					return false;
			});
			$(rightGermanSwitch).click(function() { // SELECT RIGHT GERMAN SWITCH
					$(rightGermanSwitch).addClass('is-selected'); // highlight german switch on right side
					$(rightLatinSwitch).removeClass('is-selected'); // remove highlight from latin on right side
					return false;
			});
			$(leftLatinSwitch).click(function() { // SELECT LEFT LATIN SWITCH
					$(leftLatinSwitch).addClass('is-selected'); // highlight Latin switch on left side
					$(leftGermanSwitch).removeClass('is-selected'); // remove highlight from German on left side
					return false;
			});
			$(rightLatinSwitch).click(function() { // SELECT RIGHT LATIN SWITCH
					$(rightLatinSwitch).addClass('is-selected'); // highlight Latin switch on right side
					$(rightGermanSwitch).removeClass('is-selected'); // remove highlight from German on right side
					return false;
			});
/* FUNCTIONS */
			function showFull() {
				resetFacsimile();
				$(sectionDouble).addClass('is-hidden'); // show full / left half only
			}
			function showHalves() {
				resetFacsimile();
				$(sectionSingle).removeClass('panel--full'); // switch from full to left and right halves
				$(sectionSingle).addClass('panel--left');
				$(sectionDouble).removeClass('is-hidden');
				$(sectionFullRight).addClass('is-hidden');
			}
			function showHalvesSplit() {
				resetFacsimile();
				$(sectionSingle).removeClass('panel--full'); // switch from full to left and right halves
				$(sectionSingle).addClass('panel--left'); // assign left half to single
				$(sectionDouble).removeClass('is-hidden'); // show left half
				$(sectionFull).addClass('panel--left'); // rename full panel step 1 (add left panel name)
				$(sectionFull).removeClass('panel--full'); // rename full panel step 2 (remove full panel name)
				$(sectionFullRight).removeClass('is-hidden'); // show right half
			}
			function showFacsimileFull() {
				$(sectionFacsimile).removeClass('is-hidden'); // show facsimile wrapper
				$(facsimileFull).removeClass('is-hidden'); // show full facsimile
				$(facsimileFull).siblings().addClass('is-hidden'); // hide left and right facsimiles
				$(sectionSingle).addClass('is-hidden'); // hide full/left panel wrapper
				$(sectionDouble).addClass('is-hidden'); // hide right panel wrapper
				$(sectionFull).addClass('is-hidden'); // hide full/left panel content
				$(sectionFullRight).addClass('is-hidden'); // hide right panel content
			}
			function showFacsimileSplit() {
				$(sectionFacsimile).removeClass('is-hidden'); // show facsimile wrapper
				$(facsimileLeft).removeClass('is-hidden'); // show left facsimile content
				$(facsimileRight).removeClass('is-hidden'); // show right facsimile content
				$(facsimileFull).addClass('is-hidden'); // hide full facsimile content
				$(sectionSingle).addClass('is-hidden'); // hide full/left panel wrapper
				$(sectionDouble).addClass('is-hidden'); // hide right panel wrapper
				$(sectionFull).addClass('is-hidden'); // hide full/left panel content
				$(sectionFullRight).addClass('is-hidden'); // hide right panel content
			}
			function showFacsimileLeft() {
				$(sectionFacsimile).removeClass('is-hidden'); // show facsimile wrapper
				$(facsimileLeft).removeClass('is-hidden'); // show left facsimile content
				$(facsimileLeft).siblings().addClass('is-hidden'); // hide all facsimile content except left
				$(sectionFull).addClass('panel--left'); // rename full panel step 1 (add left panel name)
				$(sectionFull).removeClass('panel--full'); // rename full panel step 2 (remove full panel name)
				$(sectionFullRight).removeClass('is-hidden');  // show right half
				$(sectionSingle).addClass('is-hidden'); // hide full/left panel wrapper
				$(sectionFullLeft).addClass('is-hidden'); // hide full/left panel content
				$(imageSectionRight).removeClass('panel--left'); // kludge to show right image
				$(imageSectionRight).removeClass('is-hidden'); // kludge to show right image
			}
			function showFacsimileRight() {
				$(sectionFacsimile).removeClass('is-hidden'); // show facsimile wrapper
				$(facsimileRight).removeClass('is-hidden'); // show right facsimile content
				$(facsimileRight).siblings().addClass('is-hidden'); // hide all facsimile content except right
				$(sectionFull).addClass('panel--left'); // rename full panel step 1 (add left panel class)
				$(sectionFull).removeClass('panel--full'); // rename full panel step 1 (add left panel class)
				$(sectionFullLeft).removeClass('is-hidden'); // show left half
				$(sectionDouble).addClass('is-hidden'); // hide right panel wrapper
				$(sectionFullRight).addClass('is-hidden'); // hide right panel content

			}
			function resetFacsimile() {
				$(sectionFacsimile).addClass('is-hidden'); // hide facsimile wrapper
				$(sectionSingle).removeClass('is-hidden'); // show full/left panel content
				$(sectionSingle).removeClass('panel--left'); // rename left panel step 1 (remove left panel class)
				$(sectionSingle).addClass('panel--full'); // rename left panel step 2 (add full panel class)
				$(sectionFullLeft).addClass('panel--full'); 
				$(sectionFullLeft).removeClass('panel--left');
				$(sectionFull).removeClass('is-hidden');
				$(sectionFullRight).addClass('is-hidden');
			}
			function checkState() {
				// if single and english are active
				if ( $(singleViewBtn).attr('data-state')===('active') && $(englishSingleView).attr('data-state')===('active') ) {
					showFull();
					console.log("Single English is ACTIVE");
				}
				// if single and latin are active
				else if ( $(singleViewBtn).attr('data-state')===('active') && $(latinSingleView).attr('data-state')===('active') ) {
					showFull();
					console.log("Single Latin is ACTIVE");
				}
				// if single and facsimile are active
				else if ( $(singleViewBtn).attr('data-state')===('active') && $(facsimileSingleView).attr('data-state')===('active') ) {
					showFacsimileFull();
					console.log("Single Facsimile is ACTIVE");
				}
				// if double and SingleEnglish and DoubleEnglish are active
				else if ( $(doubleViewBtn).attr('data-state')===('active') && $(englishSingleView).attr('data-state')===('active') && $(englishDoubleView).attr('data-state')===('active') ) {
					showHalves();
					// showHalvesSplit();
					console.log("Single English is ACTIVE and Double English is ACTIVE");
				}
				// if double and SingleEnglish and DoubleLatin are active
				else if ( $(doubleViewBtn).attr('data-state')===('active') && $(englishSingleView).attr('data-state')===('active') && $(latinDoubleView).attr('data-state')===('active') ) {
					showHalves();
					console.log("Single English is ACTIVE and Double Latin is ACTIVE");
				}
				// if double and SingleEnglish and DoubleFacsimile are active
				else if ( $(doubleViewBtn).attr('data-state')===('active') && $(englishSingleView).attr('data-state')===('active') && $(facsimileDoubleView).attr('data-state')===('active') ) {
					showHalves();
					showFacsimileRight();
					console.log("Single English is ACTIVE and Double Facsimile is ACTIVE");
				}
				// if double and SingleLatin and DoubleEnglish are active
				else if ( $(doubleViewBtn).attr('data-state')===('active') && $(latinSingleView).attr('data-state')===('active') && $(englishDoubleView).attr('data-state')===('active') ) {
					showHalves();
					console.log("Single Latin is ACTIVE and Double English is ACTIVE");
				}
				// if double and SingleLatin and DoubleLatin are active
				else if ( $(doubleViewBtn).attr('data-state')===('active') && $(latinSingleView).attr('data-state')===('active') && $(latinDoubleView).attr('data-state')===('active') ) {
					showHalves();
					// showHalvesSplit();
					console.log("Single Latin is ACTIVE and Double Latin is ACTIVE");
				}
				// if double and SingleLatin and DoubleFacsimile are active
				else if ( $(doubleViewBtn).attr('data-state')===('active') && $(latinSingleView).attr('data-state')===('active') && $(facsimileDoubleView).attr('data-state')===('active') ) {
					showHalves();
					showFacsimileRight();
					console.log("Single Latin is ACTIVE and Double Facsimile is ACTIVE");
				}
				// if double and SingleFacsimile and DoubleEnglish are active
				else if ( $(doubleViewBtn).attr('data-state')===('active') && $(facsimileSingleView).attr('data-state')===('active') && $(englishDoubleView).attr('data-state')===('active') ) {
					showHalves();
					showFacsimileLeft();
					console.log("Single Facsimile is ACTIVE and Double English is ACTIVE");
				}
				// if double and SingleFacsimile and DoubleLatin are active
				else if ( $(doubleViewBtn).attr('data-state')===('active') && $(facsimileSingleView).attr('data-state')===('active') && $(latinDoubleView).attr('data-state')===('active') ) {
					showHalves();
					showFacsimileLeft();
					console.log("Single Facsimile is ACTIVE and Double Latin is ACTIVE");
				}
				// if double and SingleFacsimile and DoubleFacsimile are active
				else if ( $(doubleViewBtn).attr('data-state')===('active') && $(facsimileSingleView).attr('data-state')===('active') && $(facsimileDoubleView).attr('data-state')===('active') ) {
					showHalves();
					showFacsimileSplit();
					console.log("Single Facsimile is ACTIVE and Double Facsimile is ACTIVE");
				}
			}
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
				$(rightTranslation).addClass('is-hidden'); // hide right emblem english text
				$(rightOriginal).addClass('is-hidden'); // hide right emblem latin/german text
			}
			function showTranslation() {
				$(singleTranslation).removeClass('is-hidden'); // display english text
			}
			function showTranslationDouble() {
				$(doubleTranslation).removeClass('is-hidden'); // show latin/german text in double half
			}
			function showOriginalLanguage() {
				$(singleOriginal).removeClass('is-hidden'); // display default latin text
			}
			function showOriginalLanguageDouble() {
				$(doubleOriginal).removeClass('is-hidden'); // show latin/german text in right half of whole emblem container
			}
			function showFacsimile() {
				storeFacsimileWhole(); // mark whole facsimile as active, even though the wrapper and its contents may be hidden
				storeFacsimileLeft(); // mark left facsimile as active, even though the wrapper and its contents may be hidden
			}
			function showRightFacsimile() { // show right facsimile and hide right emblem text  
					storeFacsimileRight();
			}
			function storeFacsimileWhole() {
				$(singleFacsimile).removeClass('is-hidden'); // show full-width facsimile
				$(singleEmblem).addClass('is-hidden'); // hide whole emblem	
			}
		});