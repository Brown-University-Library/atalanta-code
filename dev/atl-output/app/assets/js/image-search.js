$(function () {
/* VARIABLES */
	var imageCategoryTrigger = '.image-search__category > a';
	var imageCategory1 = 'catlist__actions';
	var imageCategory2 = 'catlist__architecture';
	var imageCategory3 = 'catlist__creatures';
	var imageCategory4 = 'catlist__nature';
	var imageCategory5 = 'catlist__people';
	var imageCategory6 = 'catlist__things';
	var imageCategory7 = 'catlist__traits';
	var resultsTermsTrigger = '.image-results__button-row button:nth-child(1)';
	var resultsTermsContainer = '.image-results__all-terms';
	var resultsTermsHidden = 'all-terms--inactive';
	var resultsTermsRevealed = 'all-terms--active';

/* EVENTS */
	$(imageCategoryTrigger).click(function() {
		var that = this;
		checkCategoryState(that);
	});
	$(resultsTermsTrigger).click(function() {
		// console.log("I CLICKED THE TERMS BUTTON");
		// console.log(resultsItemTermsTrigger);
		var that = this;
		var currentItem = $(that).parent().parent().parent();
		// console.log(currentItem);
		var currentItemTerms = currentItem.find(resultsTermsContainer);
		console.log(currentItemTerms);
		$(currentItemTerms).addClass(resultsTermsRevealed);
	});
/* FUNCTIONS */
	function checkCategoryState(selectedCategory) {
		if ( $(selectedCategory).parent().hasClass(imageCategory1) ) {
			console.log("I CLICKED CATEGORY 1!");
			revealSearchTerms(selectedCategory);
		}
		else if ( $(selectedCategory).parent().hasClass(imageCategory2) ) {
			console.log("I CLICKED CATEGORY 2!");
			revealSearchTerms(selectedCategory);
		}
		else if ( $(selectedCategory).parent().hasClass(imageCategory3) ) {
			console.log("I CLICKED CATEGORY 3!");
			revealSearchTerms(selectedCategory);
		}
		else if ( $(selectedCategory).parent().hasClass(imageCategory4) ) {
			console.log("I CLICKED CATEGORY 4!");
			revealSearchTerms(selectedCategory);
		}
		else if ( $(selectedCategory).parent().hasClass(imageCategory5) ) {
			console.log("I CLICKED CATEGORY 5!");
			revealSearchTerms(selectedCategory);
		}
		else if ( $(selectedCategory).parent().hasClass(imageCategory6) ) {
			console.log("I CLICKED CATEGORY 6!");
			revealSearchTerms(selectedCategory);
		}
		else if ( $(selectedCategory).parent().hasClass(imageCategory7) ) {
			console.log("I CLICKED CATEGORY 7!");
			revealSearchTerms(selectedCategory);
		}
		else {
			console.log("NO CATEGORY IS SELECTED");
		}
	}
	function resultsItemTermsClose() {
		
	}
	function resultsItemTermsOpen() {

	}
	function revealSearchTerms(activeCategory) {
		$(activeCategory).parent().siblings().removeClass('category--active');
		$(activeCategory).parent().addClass('category--active');
	}

});
