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

	// var browserHeight = $(window).height(),
	// 	elementPosition = $('#btn-shuffle').offset().top,
	// 	elementTrigger = elementPosition - browserHeight,
	// 	myElement = $('.image-search__results-viz').offset().top;

	var heroPlaceholder = $('h1.hero__heading').html();
	console.log("--", heroPlaceholder, "--")


	$("#btn-shuffle").on("click", function() {
	   
	});
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
	
	$('html').on('click', 'span.selected-filter', ev => {
		console.log('clicky.', ev.currentTarget);
		var tid = $(ev.currentTarget).attr('data-id');
		$('li.subcategory__term-item a[data-id="'+tid+'"]').click();
	});
	
	function makeImageArrays() {
		var activeArray = [];
		var inactiveArray = [];
		var imageResultsWrapper = $('.image-results__wrapper');
		var imageItems = imageResultsWrapper.children().children();
		// children = Array.prototype.slice.call(children, 0);
		var thisChild;
		// console.log(activeContainer);
		console.log(imageItems.length);
		for (var i = 0; i < imageItems.length; i++) {
			thisChild = imageItems[i];
			if ($(thisChild).hasClass('item--active')) {
				activeArray.push(thisChild);
			}
			else if ($(thisChild).hasClass('item--inactive')) {
				inactiveArray.push(thisChild);
			}

			// inactiveArray.sort(compare($(thisChild)));
		};
		console.log(inactiveArray.length);
		console.log(activeArray.length);
		console.log(inactiveArray[0].attributes.dataItemNum);
		// activeArray.sort(compare(activeContainer.children()));
		// inactiveArray.sort(compare);
		setTimeout(function() { changeLocation(activeArray, inactiveArray) },500); // delay start of active/inactive container transfers in DOM and animation so users have a moment to see the illuminated/darkened images in situ
	}


	/* https://codepen.io/MAW/pen/WQWJPV */
	function changeLocation(moveActiveArray, moveInactiveArray) {
		var animation = new TimelineLite();
		var rectActive = getBCR(activeImageContainer);
		var rectInactive =  getBCR(inactiveImageContainer);
		
		// var activeChildLast = activeImageContainer.lastElementChild;
		// console.log(activeChildLast);
		// var inactiveChildLast = inactiveImageContainer.lastElementChild;
		// console.log(inactiveChildLast);
		var myActiveArray = moveActiveArray;
		var myInactiveArray = moveInactiveArray;
			for (var i = 0; i < myInactiveArray.length; i++) {
				var oldPosition = getBCR(myInactiveArray[i]);
				inactiveImageContainer.appendChild(myInactiveArray[i]);
				var newPosition = getBCR(myInactiveArray[i]);
				TweenMax.from(myInactiveArray[i], 0.5, {y:oldPosition.top-newPosition.top, x:oldPosition.left-newPosition.left, ease:Back.easeOut});
			}
			for (var i = 0; i < myActiveArray.length; i++) {
				var oldPosition = getBCR(myActiveArray[i]);
				activeImageContainer.appendChild(myActiveArray[i]);
				var newPosition = getBCR(myActiveArray[i]);
				TweenMax.from(myActiveArray[i], 0.5, {y:oldPosition.top-newPosition.top, x:oldPosition.left-newPosition.left, ease:Back.easeOut});
			}
			scaleOnDisplay();



		// var oldPosition = getBCR(movedItem);
		// inactiveImageContainer.appendChild(movedItem); // move image to appropriate active/inactive containers
		// var newPosition = getBCR(movedItem);
		// animation.from(movedItem, 0.5, {y:oldPosition.top-newPosition.top, x:oldPosition.left-newPosition.left, ease:Back.easeOut}) // animated movement between active/inactive containers
		// 			.from(allImageItems, 0.5, {css: {scale:.01}, delay:0.2, ease:Quad.easeinOut}); // ease out scale of all images
		


		// if ($('div').hasClass(myMove)) {
		// 	console.log("OK!");
		// 	inactiveImageContainer.appendChild(inactiveImage);
		// 	TweenMax.to(inactiveImage, 2, {y: 10});
		// }
		// var activeContents = activeImageContainer.classList;
		// console.log(activeContents);
		// var inactiveContents = inactiveImageContainer.classList;
		// activeContents.appendChild(activeImage);
		// inactiveContents.appendChild(inactiveImage);
		// TweenMax.set(inactiveImage, {x: 0, y: 0});
	}
	function getBCR(element) {
		return element.getBoundingClientRect()
	};
	function scaleOnDisplay() {
		var allImageItems = '.image-results__item';
		TweenMax.from(allImageItems, 0.5, {css: {scale:.01}, delay:0.2, ease:Quad.easeinOut}); // ease out scale of all images
	}
	// function compare(a, b) {
	// 	console.log("I am trying to sort");
	// 	console.log("This is A: " + a);
	// 	const itemNumA = a.attributes.dataItemNum;
	// 	// console.log(itemNumA);
	// 	const itemNumB = b.attributes.dataItemNum;
	// 	let comparison = 0;
	// 	if (itemNumA > itemNumB) {
	// 		console.log("I am comparing greater than");
	// 		comparison = 1;
			
	// 	}
	// 	else if (itemNumA < itemNumB) {
	// 		comparison = -1;
	// 		console.log("I am comparing lesser than");
	// 	}
	// 	// console.log(inactiveArray);
	// 	console.log(comparison);
	// 	return comparison;
	// }

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
		console.log("I CLOSED THE CATEGORIES");
	}
	function categoriesReveal(activeCategory) {
		$(activeCategory).siblings().removeClass(imageCategoryActive); // hide the last active category
		$(activeCategory).addClass(imageCategoryActive); // reveal the current selected category
	}
	function termSelect(unselectedTerm, lastSelectedCategory) {
		var currentUnselectedTerm = $(unselectedTerm);
		var currentUnselectedCategory = $(lastSelectedCategory);
		$(currentUnselectedTerm).addClass(imageTermSelected); // add selected term class
		console.log("I SELECTED A TERM");
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
});


