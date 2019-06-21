$(document).ready(function() {
/* VARIABLES */
	var imageCategoryTrigger = '.category__item > a';
	var imageCategoryActive = 'category--active';
	var imageTermTrigger = '.subcategory__term-item > a';
	var imageTermSelected = 'term--selected';
	var allSubcategoryTermsSelected = 'all-terms--selected';
	var resultsVizBtn = 'a.tooltip';
	var imageResultsContainer = '.image-results__container';
	var activeImageContainer = document.querySelector('.container--active');
	var inactiveImageContainer = document.querySelector('.container--inactive');
	var activeImage = document.querySelector('.item--active');
	var inactiveImage = document.querySelector('.item--inactive');
	var resultsTermsTrigger = '.image-results__button-row button:nth-child(1)';
	var resultsTermsEscapeX = 'image-results__button--open';
	var resultsTermsContainer = '.image-results__all-terms';
	var resultsTermsHidden = 'all-terms--inactive';
	var resultsTermsRevealed = 'all-terms--active';

	var heroPlaceholder = $('h1.hero__heading').html();

	$(resultsVizBtn).on('click', function() {
		var container = '.image-results__container';
		var that = this;
		console.log(that);
		var jumpLink = $(that).attr('data-href');
		console.log(jumpLink);
		TweenMax.to(window, 1, {scrollTo:{y:jumpLink, offsetY:180, ease:Power2.easeOut}});
		// if (myElement >= elementTrigger) {
		// 	console.log(elementPosition);
		// 	console.log("I need to be sticky!!!!!");
		// 	$('.image-search__results-viz').addClass('stickyyy');

		// };
	});
	
	$('html').on('click', 'a[href="#"]', ev => {
		return false;
	});

	$('html').on('click', 'span.selected-filter', ev => {
		console.log('clicky.', ev.currentTarget);
		var tid = $(ev.currentTarget).attr('data-id');
		$('li.subcategory__term-item a[data-id="'+tid+'"]').click();
	});
	
	function makeImageArrays() {
		var imageResultsWrapper = $('.image-results__wrapper');
		var imageItems = imageResultsWrapper.children().children();
		var thisChild;
		for (var i = 0; i < imageItems.length; i++) {
			thisChild = imageItems[i];
			if ($(thisChild).hasClass('item--active')) {
				$(thisChild).css("display", "flex");
			}
			else if ($(thisChild).hasClass('item--inactive')) {
				$(thisChild).css("display", "none");
			}
		};
		setTimeout(scaleOnDisplay, 10);
	}
	function scaleOnDisplay() {
		var allImageItems = '.image-results__item';
		TweenMax.from(allImageItems, 0.5, {css: {scale:.01}, delay:0.2, ease:Quad.easeinOut}); // ease out scale of all images
	}
	function resetGrid() {
		$('div.image-results__item').removeClass('item--inactive').addClass('item--active');
		$('.item--active').css("display", "flex");
	}

/* EVENTS */
	// $(imageResultsContainer).html(html);
	$('body').on('click', imageCategoryTrigger, function() {
		var that = this; // store which category link was clicked
		checkCategorySelected(that);
	});
	$('body').on('click', imageTermTrigger, function() {
		var that = this; // store which term was clicked
		checkTermSelected(that);
		updateEmblemView();
	})
	$('body').on('click', resultsTermsTrigger, function() {
		var that = this; // store which results item terms button was clicked
		checkResultsItemTermsState(that);
	});

	$('body').on('click', 'button#reset-button', ev => {
		$('li.'+imageTermSelected).removeClass(imageTermSelected);
		updateEmblemView();
		setTimeout(resetGrid, 500);
	});
	
/* FUNCTIONS */
	function checkCategorySelected(selectedCategory) {
		var currentCategory = $(selectedCategory).parent(); // store which category is selected
		// console.log(currentCategory);
		categoriesReveal(currentCategory);
	}
	function checkResultsItemTermsState(resultsItemSelected) {
		var resultsItemState = $(resultsItemSelected);
		if ( $(resultsItemState).hasClass(resultsTermsEscapeX) ) { // if terms are open, call close
			resultsItemTermsClose(resultsItemState);
		}
		else { //if terms are closed, call open
			resultsItemTermsOpen(resultsItemState);
		}
	}
	function checkTermSelected(selectedImageTerm) {
		var currentTerm = $(selectedImageTerm).parent(); // store which image term is selected
		var currentCategory = $(selectedImageTerm).parent().parent().parent().parent().parent(); // figure out which category the current search term belongs to
		if ( $(currentTerm).hasClass(imageTermSelected) ) { // if term is selected, deselect and close category
			termUnselect(currentTerm, currentCategory);
		}
		else { // if term is not selected, select and close category
			termSelect(currentTerm, currentCategory);
		}
	}
	function resultsItemTermsClose(selectedResultsItem) {
		var currentItem = $(selectedResultsItem).parent().parent().parent();
		// console.log(currentItem);
		var currentItemTerms = currentItem.find(resultsTermsContainer);
		var currentItemTermsBtn = currentItem.find(resultsTermsTrigger);
		// console.log(currentItemTerms);
		$(currentItemTerms).removeClass(resultsTermsRevealed);
		$(currentItemTermsBtn).removeClass(resultsTermsEscapeX);
	}
	function resultsItemTermsOpen(selectedResultsItem) {
		var currentItem = $(selectedResultsItem).parent().parent().parent();
		// console.log(currentItem);
		var currentItemTerms = currentItem.find(resultsTermsContainer);
		var currentItemTermsBtn = currentItem.find(resultsTermsTrigger);
		// console.log(currentItemTerms);
		$(currentItemTerms).addClass(resultsTermsRevealed);
		$(currentItemTermsBtn).addClass(resultsTermsEscapeX);
	}
	function categoriesHide(activeCategory) {
		$(activeCategory).removeClass(imageCategoryActive); // hide the last active category
	}
	function categoriesReveal(activeCategory) {
		$(activeCategory).siblings().removeClass(imageCategoryActive); // hide the last active category
		$(activeCategory).addClass(imageCategoryActive); // reveal the current selected category
	}
	function termSelect(unselectedTerm, lastSelectedCategory) {
		var currentUnselectedTerm = $(unselectedTerm);
		var currentUnselectedCategory = $(lastSelectedCategory);
		$(currentUnselectedTerm).addClass(imageTermSelected); // add selected term class
		categoriesHide(currentUnselectedCategory);
	}
	function termUnselect(selectedTerm, newSelectedCategory) {
		var currentSelectedTerm = $(selectedTerm);
		var currentSelectedCategory = $(newSelectedCategory);
		$(currentSelectedTerm).removeClass(imageTermSelected); // remove selected term class
		categoriesHide(currentSelectedCategory);
	}

	var updateEmblemView = function() {
		var actives = activeEmblems(); //Array of emblem numbers. Not zero-padded strings.
		var filts = activeFilters();

		var filtnums = filts.map(cat => {
			return cat.subcategories.map(sc => {
				return sc.terms.map(trm => { return trm.id })
			})
		}).flat(2);
		window.history.pushState({}, '', '#terms='+filtnums.sort((a, b) => {return a-b;}).join(','));

		if ( filts.length == 0 ) {
			//No filters are selected.
			$('h1.hero__heading').html(heroPlaceholder);
			filterList = '';
		} else {
			//Breadcrumbs — Create an <li><a> element containing the selected term and add 
			//to/remove from ul.filters__list (ex: line 57) 
			var filterList = filterselectionTemplate( { filterData: filts } );
			//Hero — Replace the text in h1.hero__heading with the number of results (line 67)
			var resultsLabel = actives.length === 1 ? " result" : " results";
			$('h1.hero__heading').text(actives.length + resultsLabel);
		}

		$('.filters__list').html(filterList);
		
		//Visualization — Add/remove the class "image--active" from the corresponding 
		//<li> in ul.results-viz__items (ex: line 72)
		var linkcls = 'image--active';
		$('ul.results-viz__items li').removeClass(linkcls);

		//Image Results — Add the class "item--active" and remove the class 
		//"item--inactive" from the corresponding div.image-results__item when a term is 
		//added/removed and the filters apply to that image. Remove the class "item--active" 
		//and add "item--inactive" from the corresponding div.image-results__item when a term 
		//is added/removed and the filters do not apply to that image (ex: lines 170 and 149)
		$('div.image-results__item').removeClass('item--active').addClass('item--inactive');

		actives.forEach(el => {
			var imgid = '#image'+el;
			var linksel = 'a[data-href="'+imgid+'"]';
			$(linksel).parents('li').addClass(linkcls);

			$('div.image-results__item'+imgid).removeClass('item--inactive').addClass('item--active');
		}, this);
		
		makeImageArrays();
	}

	if ( window.location.hash.startsWith('#terms=') ) {
		(() => {
			embs = window.location.hash.replace('#terms=', '').split(',');
			$('li.subcategory__term-item').filter((i, el) => {
				return embs.includes($(el).attr('data-id'));
			}).addClass(imageTermSelected);
			updateEmblemView();
		})();
	}
});