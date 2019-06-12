const SURROUNDING_CHARACTERS = 75;
const MERGE_DISTANCE = SURROUNDING_CHARACTERS * 2;

var sectionNames = {
    'fugue-de':     "Fugue (German)",
    'epigram-de':   "Epigram (German)",
    'image-la':     "Title (Latin)",
    'epigram-la':   "Epigram (Latin)",
    'discourse-la': "Discourse (Latin)",
    'title-en':     "Title (English)",
    'epigram-en':   "Epigram (English)",
    'discourse-en': "Discourse (English)",
};

var essaySectionNames = {
    'title':        "Title",
    'subtitle':     "Subtitle",
    'author':       "Author",
    'body':         "Body",
    'footnotes':    "Footnotes",
}

$("#ataSearch").submit(function(ev) {
    ev.preventDefault();

    $('#results div').hide();
    var searchTerm = $('input', this).val();
    results = doSearch(searchTerm);
    console.log('results', results);
    $('main').html(pageTemplate(results));
    $('main').removeAttr("id");
    $('main').removeAttr("class");
    $('main').removeAttr("data-id");
    $('main').removeAttr("data-page");
    $('body').removeAttr("class");
});

//searchfunction.js throws this event when it's done loading the search index.
window.addEventListener('atalantaSearchLoad', event => {
    if ( "ready" == event.detail.state ) {
        //Success. We're ready to search; go ahead and set up your UI.
        $("#ataSearch").show();
    } else {
        console.log("Failed to start search:", event);
        //There was a problem loading the data we need to do the search. 
        //event.detail.error may have details.
    }
});