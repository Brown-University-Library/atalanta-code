$(function () {
	var languageEnglishOrigBtn = 'option.dropdown--language:nth-of-type(1)';
	var languageEnglishNormBtn = 'option.dropdown--language:nth-of-type(2)';
	var languageLatinOrigBtn = 'option.dropdown--language:nth-of-type(3)';
	var languageLatinRegBtn = 'option.dropdown--language:nth-of-type(4)';
	var languageGermanBtn = 'option.dropdown--language:nth-of-type(5)';
	var layoutComparativeBtn = 'option.dropdown--layout:nth-of-type(1)';
	var layoutDigitalEditionBtn = 'option.dropdown--layout:nth-of-type(2)';
	var layoutBookBtn = 'option.dropdown--layout:nth-of-type(3)';
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
	var containerFacsimile = '.section__facsimile';
	var containerEmblem = '.emblem';
	var panelLeft = 'panel--left';
	var panelRight = 'panel--right';
	var panelFull = 'panel--full';
	var facsimileFull = '.facsimile--full';
	var sectionFacsimile = '.section__facsimile';
	var sectionImage = '.section__image';
	var sectionMusic = '.section__music';
	var gridHalf = 'grid--half';
	var gridLeft = 'grid--left';
	var gridRight = 'grid--right';
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

	onLoad(); // DISPLAY EMBLEM MENU AND DEFAULT OPTIONS ON PAGE LOAD

	$("#layout").selectmenu({ // layout menu
	  change: function(event, ui) {},
	  icons: { button: "custom-icon" }
	});	
	$( "#layout" ).on( "selectmenuchange", function( event, ui ) {
	  selectLayout(ui.item.value);
	});
	$("#language").selectmenu({ // language menu
	  change: function(event, ui) {},
	  icons: { button: "custom-icon" }
	});	
	$("#language").on( "selectmenuchange", function( event, ui ) {
	  selectLanguage(ui.item.value);
	});

	thumbnailPage = emblemPage - 1; // digital edition thumbnail nav
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
			console.log("NONE OF THE STATES APPLY!!!");
		}
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
	function getScrollingDuration() {
		let myMusicHeight = $('.cmn').height();
		let myDuration = myMusicHeight * .93;
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
				selectLangEnglishOrig();
			},
			'english_modern': function() {
				selectLangEnglishNorm();
			},
			'latin_original': function() {
				selectLangLatinOrig();
			},
			'latin_normal': function() {
				selectLangLatinReg();
			},
			'german': function() {
				selectLangGerman();
			}
		};
		return(values[value])();
	}
	function selectLayout(value) { // emblem page views / layouts
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
	function showOriginalLanguage() {
		$(textOriginal).removeClass('is-hidden'); // display Latin/German text block
		$(textTranslation).addClass('is-hidden'); // hide English text block
	}
	function showTranslation() {
		$(textTranslation).removeClass('is-hidden'); // display English text block
		$(textOriginal).addClass('is-hidden'); // hide Latin/German text block
	}

	function subnavHide() {
		$(emblemNav).removeClass('is-visible');
		$(emblemNav).addClass('is-hidden');
	}
	function subnavReveal() {
		$(emblemNav).removeClass('is-hidden');
		$(emblemNav).addClass('is-visible');
	}

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
			console.log("I am on a laptop or something");
		}
	}

	function updateDataState() {
		var mySingleData = document.querySelector(singleViewBtn);
		mySingleData.setAttribute("data-state", singleData);
		var myTest = $(singleViewBtn).attr('data-state');
		console.log("my new data state is " + myTest);
	}
});