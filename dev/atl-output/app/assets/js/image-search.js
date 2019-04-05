$(document).ready(function() {
/* VARIABLES */
	var imageCategoryTrigger = '.category__item > a';
	var imageCategoryActive = 'category--active';
	var imageTermTrigger = '.subcategory__term-item > a';
	var imageTermSelected = 'term--selected';
	var allSubcategoryTermsSelected = 'all-terms--selected';
	var imageResultsContainer = '.image-results__container';
	var activeImageContainer = document.querySelector('.container--active');
	var inactiveImageContainer = document.querySelector('.container--inactive');
	var activeImage = document.querySelector('.item--active');
	var inactiveImage = document.querySelector('.item--inactive');
	var resultsTermsTrigger = '.image-results__button-row button:nth-child(1)';
	var resultsTermsEscapeX = 'image-results__button--open' 
	var resultsTermsContainer = '.image-results__all-terms';
	var resultsTermsHidden = 'all-terms--inactive';
	var resultsTermsRevealed = 'all-terms--active';
			var activeArray = [];
		var inactiveArray = [];

	makeImageArrays();
	// changeLocation();
	// TweenMax.to('.item--inactive', 1 , {x:300});
	function makeImageArrays() {

		var activeContainer = $('.container--active');
		var children = activeContainer.children();
		console.log(children);
		// children = Array.prototype.slice.call(children, 0);
		console.log(children);
		var thisChild;
		console.log(activeContainer);
		console.log(activeContainer.children().length);
		for (var i = 0; i < children.length; i++) {
			thisChild = children[i];
			if ($(thisChild).hasClass('item--active')) {
				// console.log(i);

				activeArray.push(thisChild);
				// console.log($(thisChild).attr('data-item-num'));
				// console.log(thisChild.attributes.dataItemNum);
				// console.log(activeArray);
			}
			else if ($(thisChild).hasClass('item--inactive')) {
				// console.log(i);
				inactiveArray.push(thisChild);
				// console.log($(thisChild).attr('data-item-num'));
				// console.log(inactiveArray);

			}

			// inactiveArray.sort(compare($(thisChild)));
		};
		console.log(inactiveArray[0].attributes.dataItemNum);
		// activeArray.sort(compare(activeContainer.children()));
		// inactiveArray.sort(compare);
		changeLocation(inactiveArray);
	}

	function compare(a, b) {
		console.log("I am trying to sort");
		console.log("This is A: " + a);
		const itemNumA = a.attributes.dataItemNum;
		// console.log(itemNumA);
		const itemNumB = b.attributes.dataItemNum;
		let comparison = 0;
		if (itemNumA > itemNumB) {
			console.log("I am comparing greater than");
			comparison = 1;
			
		}
		else if (itemNumA < itemNumB) {
			comparison = -1;
			console.log("I am comparing lesser than");
		}
		// console.log(inactiveArray);
		console.log(comparison);
		return comparison;
		
	}
	/* https://codepen.io/MAW/pen/WQWJPV */
	function getBCR(element) {
		return element.getBoundingClientRect()
	};

	function changeLocation(moveArray) {
		var rectActive = getBCR(activeImageContainer);
		console.log(rectActive);
		var rectInactive =  getBCR(inactiveImageContainer);
		console.log(rectInactive);
		var activeChildLast = activeImageContainer.lastElementChild;
		console.log(activeChildLast);
		var inactiveChildLast = inactiveImageContainer.lastElementChild;
		console.log(inactiveChildLast);
		var myMove = ('.image--inactive');
		console.log(myMove);
		var movedItem = moveArray[0];
		var oldPosition = getBCR(movedItem);
		inactiveImageContainer.appendChild(movedItem); // move image to appropriate active/inactive containers
		var newPosition = getBCR(movedItem);
		TweenMax.from(movedItem, .5, {y:oldPosition.top-newPosition.top, x:oldPosition.left-newPosition.left, delay:0.5, ease:Back.easeOut}); // animated movement between active/inactive containers
		// TweenMax.to(movedItem, 2, {x: 100}); //animation







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

/* EVENTS */
	// $(imageResultsContainer).html(html);
	$('body').on('click', imageCategoryTrigger, function() {
		var that = this; // store which category link was clicked
		checkCategorySelected(that);
	});
	$('body').on('click', imageTermTrigger, function() {
		var that = this; // store which term was clicked
		checkTermSelected(that);
	})
	$('body').on('click', resultsTermsTrigger, function() {
		var that = this; // store which results item terms button was clicked
		checkResultsItemTermsState(that);
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
});