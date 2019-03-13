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
		var that = this; // store which category link was clicked
		checkCategorySelected(that);
	});
	$(resultsTermsTrigger).click(function() {
		var that = this; // store which results item terms button was clicked
		resultsItemTermsOpen(that);
	});
/* FUNCTIONS */
	function checkCategorySelected(selectedCategory) {
		var currentCategory = $(selectedCategory).parent(); // store which category is selected
		// console.log(currentCategory);
		revealSearchTerms(currentCategory);
	}
	function resultsItemTermsClose() {
		
	}
	function resultsItemTermsOpen(selectedResultsItem) {
		var currentItem = $(selectedResultsItem).parent().parent().parent();
		// console.log(currentItem);
		var currentItemTerms = currentItem.find(resultsTermsContainer);
		// console.log(currentItemTerms);
		$(currentItemTerms).addClass(resultsTermsRevealed);
	}
	function revealSearchTerms(activeCategory) {
		$(activeCategory).siblings().removeClass('category--active'); // hide the last active category
		$(activeCategory).addClass('category--active'); // reveal the current selected category
	}

});
