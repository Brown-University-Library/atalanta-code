$(function () {
/* VARIABLES */
	// var mustache = require("mustache");
	// var html = mustache.to_html(imageItemTemplate, imageItem);
	// var imageItem = {
	// 	imageArrayNum: "0",
	// 	imageSrc: "../assets/img/emblem-images_cropped/320/emblem00.320.jpg",
	// 	imageLabel: "Frontispiece",
	// 	emblemLink: "../atalanta-fugiens/frontispiece.html",
	// }
	// var imageItemTemplate = "<div class="image-results__item item--active" data-item-num={{imageArrayNum}}><img class="image-results__image image--active" src={{imageSrc}} /><div class="image-results__details"><div class="image-results__label">{{imageLabel}}</div><div class="image-results__button-row"><button class="image-results__button results__button--terms"><span class="label">Terms</span><span class="icon">X</span></button><a class="image-results__button results__button--edition" href={{emblemLink}}><span class="label">Emblem</span><span class="icon"></span></a><button class="image-results__button results__button--collections"><span class="label">Collection</span><span class="icon"></span></button></div><div class="image-results__all-terms"></div></div></div>"; 
	var imageCategoryTrigger = '.image-search__category > a';
	var imageCategoryActive = 'category--active';
	var imageResultsContainer = '.image-results__container';
	var resultsTermsTrigger = '.image-results__button-row button:nth-child(1)';
	var resultsTermsEscapeX = 'image-results__button--open' 
	var resultsTermsContainer = '.image-results__all-terms';
	var resultsTermsHidden = 'all-terms--inactive';
	var resultsTermsRevealed = 'all-terms--active';

/* EVENTS */
	// $(imageResultsContainer).html(html);
	$(imageCategoryTrigger).click(function() {
		var that = this; // store which category link was clicked
		checkCategorySelected(that);
	});
	$(resultsTermsTrigger).click(function() {
		var that = this; // store which results item terms button was clicked
		checkResultsItemTermsState(that);
	});
/* FUNCTIONS */
	function checkCategorySelected(selectedCategory) {
		var currentCategory = $(selectedCategory).parent(); // store which category is selected
		// console.log(currentCategory);
		revealSearchTerms(currentCategory);
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
	function revealSearchTerms(activeCategory) {
		$(activeCategory).siblings().removeClass(imageCategoryActive); // hide the last active category
		$(activeCategory).addClass(imageCategoryActive); // reveal the current selected category
	}
});