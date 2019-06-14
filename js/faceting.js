const DEBUG = false;
const SUBCATEGORY_SELECTOR = 'li.subcategory__item';
const SUBCATEGORY_LABEL = 'div.subcategory__label';
const SELECTED_TERM_SELECTOR = 'li.term--selected';
const TERM_DATA_ATTRIBUTE = 'data-emblems';
const TERM_NAME_SELECTOR = 'span.image-term';
const TERM_COUNT_SELECTOR = 'span.image-term__number';
const FILTER_LIST_SELECTOR = 'nav.image-search-filters';
const MAIN_CATEGORY_SELECTOR = 'li.category__item';

var _allemblems = Array.apply(0, Array(51))
                      .map((el, i) => i);

var activeEmblems = function() {
    var embs = []

    $(SUBCATEGORY_SELECTOR).each((i, subcat) => {
        //For each subcategory, add to the `embs` array..
        embs.push(
            //..an array of unique emblem #s selected by that subcategory's filters.
            $(SELECTED_TERM_SELECTOR, subcat).map((i, el) => {
                outp = $(el).attr('data-emblems').split(',');
                outp = _.uniq(outp).map(e=>{ return parseInt(e); });
                return outp;
        }));
    });

    //Ignore subcategories with no terms selected.
    embs = embs.filter(arr => arr.length > 0);
    
    //Get the intersect--all emblems selected in every category with any options.
    embs = _.intersection(...embs);

    return embs;
}

var inactiveEmblems = function() {
    //Return a list of all emblems that aren't active.
    return  _.difference(_allemblems, activeEmblems());
}

var activeFilters = function() {
    outp = [];

    $(MAIN_CATEGORY_SELECTOR).has(SELECTED_TERM_SELECTOR).map((i, catel) => {
        console.log('category', catel);
        var thiscat = {
            name: $(catel).children('a').text(),
            subcategories: []
        };

        $(SUBCATEGORY_SELECTOR, catel).has(SELECTED_TERM_SELECTOR).map((i, scatel) => {
            console.log('subcategory', scatel);
            var thisscat = {
                name: $(scatel).children(SUBCATEGORY_LABEL).text(),
                terms: []
            };

            $(SELECTED_TERM_SELECTOR, scatel).map((i, termel) => {
                console.log('term', termel);
                thisscat['terms'].push({
                    name: $(termel).find(TERM_NAME_SELECTOR).text(),
                    count: $(termel).find(TERM_COUNT_SELECTOR).text(),
                    id: $(termel).attr('data-id'),
                });
            });

            thiscat['subcategories'].push(thisscat);
        });
        
        outp.push(thiscat);
    })

    console.log('activeFilters', outp);
    return outp;
}

if ( DEBUG ) {
    $('html').on('click', SELECTED_TERM_SELECTOR, ev => {
        console.log(activeEmblems());
        console.log(inactiveEmblems());
        console.log(activeFilters());
    });
}