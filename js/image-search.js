$(document).ready(function() {
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
	var imageCategoryTrigger = '.category__item > a';
	var imageCategoryActive = 'category--active';
	var imageTermTrigger = '.subcategory__term-item > a';
	var imageTermSelected = 'term--selected';
	var allSubcategoryTermsSelected = 'all-terms--selected';
	var imageResultsContainer = '.image-results__container';
	var resultsTermsTrigger = '.image-results__button-row button:nth-child(1)';
	var resultsTermsEscapeX = 'image-results__button--open' 
	var resultsTermsContainer = '.image-results__all-terms';
	var resultsTermsHidden = 'all-terms--inactive';
	var resultsTermsRevealed = 'all-terms--active';

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
		searchTermsReveal(currentCategory);
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
			termUnselect(currentTerm);
		}
		else { // if term is not selected, select and close category
			termSelect(currentTerm);
		}
		searchTermsHide(currentCategory);
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
	function searchTermsHide(activeCategory) {
		$(activeCategory).removeClass(imageCategoryActive); // hide the last active category
	}
	function searchTermsReveal(activeCategory) {
		$(activeCategory).siblings().removeClass(imageCategoryActive); // hide the last active category
		$(activeCategory).addClass(imageCategoryActive); // reveal the current selected category
	}
	function termSelect(unselectedTerm) {
		var currentUnselectedTerm = $(unselectedTerm);
		$(currentUnselectedTerm).addClass(imageTermSelected); // add selected term class
	}
	function termUnselect(selectedTerm) {
		var currentSelectedTerm = $(selectedTerm);
		$(currentSelectedTerm).removeClass(imageTermSelected); // remove selected term class
	}
});